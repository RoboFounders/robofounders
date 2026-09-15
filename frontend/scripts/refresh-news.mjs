#!/usr/bin/env node
// Automated ingestion (Phase 1b).
//
// Runs on a schedule (see .github/workflows/refresh-news.yml) to pull recent
// posts from every approved + enabled account in public/data/news-sources.json
// and refresh public/data/news-posts.json.
//
// Design goals:
//   - Secrets stay server-side (this never runs in the browser).
//   - SAFE NO-OP: if no provider/credentials are configured, it exits 0 without
//     touching the feed, so CI stays green and the curated feed is preserved.
//   - Cheap by default: uses `since_id` so X only returns posts newer than the
//     newest one already saved. If nobody posted, X returns [] and the run
//     costs ~$0 and writes nothing.
//   - Deletions: incremental `since_id` runs only ADD new posts. Run with
//     NEWS_FULL_SYNC=1 periodically to fully re-sync an account and drop
//     upstream-deleted posts. Accounts that are never refreshed (e.g. purely
//     curated ones) are always kept.
//   - Fewer calls: caches each account's numeric X user id back into
//     news-sources.json after the first lookup, so later runs skip the
//     username -> id call entirely.
//
// Configure via environment variables:
//   NEWS_PROVIDER        "x" | "twitterapi_io" | "none" (default: none)
//   X_BEARER_TOKEN       required when NEWS_PROVIDER=x
//   TWITTERAPI_IO_KEY    required when NEWS_PROVIDER=twitterapi_io
//   NEWS_MAX_PER_ACCOUNT max posts to keep per account (default 10)
//   NEWS_FULL_SYNC       "1" to bypass since_id and full-resync (detects deletions)

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const SOURCES = resolve(here, "../public/data/news-sources.json");
const OUT = resolve(here, "../public/data/news-posts.json");

const PROVIDER = (process.env.NEWS_PROVIDER || "none").toLowerCase();
const MAX = Number(process.env.NEWS_MAX_PER_ACCOUNT || 10);
const FULL_SYNC = /^(1|true|yes)$/i.test(process.env.NEWS_FULL_SYNC || "");
const APPROVED = new Set(["owner", "granted", "approved"]);

const readJson = async (p) => JSON.parse(await readFile(p, "utf8"));
const readJsonSafe = async (p) => {
  try {
    return await readJson(p);
  } catch {
    return [];
  }
};

// Highest X tweet id already stored for an account, used as `since_id` so the
// API only returns posts newer than what we have (snowflake ids need BigInt).
function latestIdFor(existing, accountId) {
  let max = null;
  for (const p of existing) {
    if (p?.source?.accountId !== accountId) continue;
    const m = /^x_(\d+)$/.exec(p.id || "");
    if (!m) continue;
    if (max === null || BigInt(m[1]) > BigInt(max)) max = m[1];
  }
  return max; // string id or null
}

function normalize({ src, id, text, media, url, createdAt }) {
  return {
    id,
    type: "x_post",
    author: {
      name: src.displayName,
      handle: src.handle,
      avatarUrl: src.avatarUrl || "",
      profileUrl: src.profileUrl || (src.handle ? `https://x.com/${src.handle}` : ""),
      verified: src.verified ?? true,
    },
    source: { label: src.sourceLabel, platform: "x", accountId: src.accountId },
    category: src.category || "News",
    text: text || "",
    media: Array.isArray(media) ? media : [],
    originalUrl: url,
    createdAt: createdAt || new Date().toISOString(),
    fetchedAt: new Date().toISOString(),
    permissionStatus: src.permission,
  };
}

// ---- Provider: official X API (v2) --------------------------------------
// Cost note (2026): reads are pay-per-use (~$0.005/post). `since_id` (below)
// means empty runs return 0 posts and cost ~$0; keep MAX small and the
// schedule modest so busy days stay cheap too.
// Resolve the numeric X user id for an account. Uses the cached `userId` from
// news-sources.json when present (no API call); otherwise looks it up once and
// records it in `learned` so main() can persist it for next time.
async function resolveUserId(src, headers, learned) {
  if (src.userId) return src.userId;
  const res = await fetch(
    `https://api.x.com/2/users/by/username/${encodeURIComponent(src.handle)}`,
    { headers }
  );
  if (!res.ok) throw new Error(`user lookup ${res.status}`);
  const id = (await res.json())?.data?.id;
  if (!id) throw new Error("no user id");
  learned.set(src.accountId, id);
  return id;
}

async function fetchFromX(src, sinceId, learned) {
  const token = process.env.X_BEARER_TOKEN;
  if (!token) throw new Error("X_BEARER_TOKEN is not set");
  const headers = { Authorization: `Bearer ${token}` };

  const userId = await resolveUserId(src, headers, learned);

  const params = new URLSearchParams({
    max_results: String(Math.min(Math.max(MAX, 5), 100)),
    "tweet.fields": "created_at",
    expansions: "attachments.media_keys",
    "media.fields": "url,preview_image_url,type",
    exclude: "replies,retweets",
  });
  // since_id makes the call incremental: X returns only posts newer than this.
  if (sinceId) params.set("since_id", sinceId);
  const tlRes = await fetch(
    `https://api.x.com/2/users/${userId}/tweets?${params.toString()}`,
    { headers }
  );
  if (!tlRes.ok) throw new Error(`timeline ${tlRes.status}`);
  const body = await tlRes.json();
  const mediaByKey = new Map((body.includes?.media || []).map((m) => [m.media_key, m]));

  return (body.data || []).map((t) => {
    const media = (t.attachments?.media_keys || [])
      .map((k) => mediaByKey.get(k))
      .filter(Boolean)
      .map((m) => ({
        type: m.type === "photo" ? "image" : "video",
        url: m.url || m.preview_image_url || "",
        alt: src.displayName,
      }))
      .filter((m) => m.url);
    return normalize({
      src,
      id: `x_${t.id}`,
      text: t.text,
      media,
      url: `https://x.com/${src.handle}/status/${t.id}`,
      createdAt: t.created_at,
    });
  });
}

// ---- Provider: third-party (cheaper, ToS-gray) --------------------------
// Stub: wire up your chosen provider (e.g. TwitterAPI.io) here. Left as a
// clearly-marked no-op so the scaffold ships without committing to a vendor.
async function fetchFromTwitterApiIo(src, sinceId) {
  if (!process.env.TWITTERAPI_IO_KEY) throw new Error("TWITTERAPI_IO_KEY is not set");
  // A real impl would pass `sinceId` through as the provider's since/cursor param.
  void sinceId;
  console.warn(`twitterapi_io provider not implemented yet — skipping @${src.handle}`);
  return [];
}

async function fetchForSource(src, sinceId, learned) {
  if (PROVIDER === "x") return fetchFromX(src, sinceId, learned);
  if (PROVIDER === "twitterapi_io") return fetchFromTwitterApiIo(src, sinceId);
  return [];
}

async function main() {
  if (PROVIDER === "none") {
    console.log("NEWS_PROVIDER=none — nothing to refresh (curated feed left intact).");
    return;
  }

  const sources = await readJson(SOURCES);
  const approved = sources.filter((s) => s && s.enabled && APPROVED.has(s.permission) && s.handle);
  if (approved.length === 0) {
    console.log("No approved + enabled sources — nothing to do.");
    return;
  }

  const existing = await readJsonSafe(OUT);
  const refreshed = new Set();
  const fresh = [];
  const learned = new Map(); // accountId -> numeric X user id resolved this run

  for (const src of approved) {
    // since_id = newest tweet we already have, so X returns only newer posts
    // (or [] when nothing is new). NEWS_FULL_SYNC=1 forces a full re-fetch.
    const sinceId = FULL_SYNC ? null : latestIdFor(existing, src.accountId);
    try {
      const posts = (await fetchForSource(src, sinceId, learned)).slice(0, MAX);
      if (posts.length > 0) {
        refreshed.add(src.accountId);
        fresh.push(...posts);
        console.log(`@${src.handle}: ${posts.length} new post(s)${sinceId ? ` since ${sinceId}` : ""}`);
      } else {
        console.log(`@${src.handle}: no new posts${sinceId ? ` since ${sinceId}` : ""}`);
      }
    } catch (e) {
      // Keep this account's existing posts on failure (don't wipe on a blip).
      console.warn(`refresh failed for @${src.handle}: ${e.message}`);
    }
  }

  // Persist any newly-resolved user ids so future runs skip the username lookup.
  if (learned.size > 0) {
    for (const s of sources) {
      const id = learned.get(s.accountId);
      if (id) s.userId = id;
    }
    await writeFile(SOURCES, JSON.stringify(sources, null, 2) + "\n", "utf8");
    console.log(`Cached ${learned.size} X user id(s) into news-sources.json`);
  }

  if (refreshed.size === 0) {
    console.log("No new posts — feed left intact (zero-cost run).");
    return;
  }

  // Incremental (default): append the new posts to what we already have.
  // Full sync: replace refreshed accounts' posts so upstream deletions drop out.
  const base = FULL_SYNC ? existing.filter((p) => !refreshed.has(p?.source?.accountId)) : existing;
  const merged = [...base, ...fresh];

  // De-dupe by id, newest first.
  const seen = new Set();
  const deduped = merged
    .filter((p) => p && p.id && !seen.has(p.id) && seen.add(p.id))
    .sort((a, b) => (Date.parse(b.createdAt) || 0) - (Date.parse(a.createdAt) || 0));

  await writeFile(OUT, JSON.stringify(deduped, null, 2) + "\n", "utf8");
  console.log(`Wrote ${deduped.length} post(s) (${refreshed.size} account(s) updated${FULL_SYNC ? ", full sync" : ""}).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
