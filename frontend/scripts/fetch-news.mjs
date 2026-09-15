#!/usr/bin/env node
// Manual / curated ingestion (Phase 1a).
//
// Joins the approved-accounts config (public/data/news-sources.json) with a
// human-edited list of curated posts (scripts/curated-posts.json), enforces
// approved-only, normalizes to the feed schema, sorts newest-first, and writes
// public/data/news-posts.json.
//
// Usage:
//   yarn news              # build the feed from curated-posts.json
//   yarn news --hydrate    # also pull missing text/author from X oEmbed
//
// Add a post:    append an entry to scripts/curated-posts.json, then run `yarn news`.
// Add an account: add it to public/data/news-sources.json with `enabled: true`
//                 and `permission: "owner"` or `"granted"`.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const SOURCES = resolve(here, "../public/data/news-sources.json");
const CURATED = resolve(here, "./curated-posts.json");
const OUT = resolve(here, "../public/data/news-posts.json");

const APPROVED = new Set(["owner", "granted", "approved"]);
const hydrate = process.argv.includes("--hydrate");

const readJson = async (p) => JSON.parse(await readFile(p, "utf8"));

const statusId = (url = "") => (url.match(/status(?:es)?\/(\d+)/) || [])[1] || null;

const slugify = (s = "") =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);

const stripHtml = (html = "") =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

async function oembed(url) {
  const endpoint = `https://publish.twitter.com/oembed?omit_script=1&dnt=true&url=${encodeURIComponent(url)}`;
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(`oEmbed ${res.status}`);
  return res.json();
}

async function main() {
  const [sources, curated] = await Promise.all([readJson(SOURCES), readJson(CURATED)]);
  const byId = new Map(sources.map((s) => [s.accountId, s]));
  const isApproved = (s) => s && s.enabled && APPROVED.has(s.permission);

  const posts = [];
  let skipped = 0;

  for (const entry of curated) {
    const src = byId.get(entry.accountId);
    if (!isApproved(src)) {
      skipped++;
      console.warn(`skip: "${entry.accountId}" is not an approved + enabled source`);
      continue;
    }

    let text = entry.text || "";
    let authorName = src.displayName;
    if (hydrate && entry.url && !text) {
      try {
        const data = await oembed(entry.url);
        text = stripHtml(data.html);
        authorName = data.author_name || authorName;
      } catch (e) {
        console.warn(`hydrate failed for ${entry.url}: ${e.message}`);
      }
    }

    const id =
      entry.id ||
      (statusId(entry.url) ? `x_${statusId(entry.url)}` : `c-${slugify(entry.url || text)}`);

    posts.push({
      id,
      type: "x_post",
      author: {
        name: authorName,
        handle: src.handle,
        avatarUrl: src.avatarUrl || "",
        profileUrl: src.profileUrl || (src.handle ? `https://x.com/${src.handle}` : ""),
        verified: src.verified ?? true,
      },
      source: { label: src.sourceLabel, platform: "x", accountId: src.accountId },
      category: entry.category || src.category || "News",
      text,
      media: Array.isArray(entry.media) ? entry.media : [],
      originalUrl: entry.url || src.profileUrl,
      createdAt: entry.createdAt || new Date().toISOString(),
      fetchedAt: new Date().toISOString(),
      permissionStatus: src.permission,
    });
  }

  posts.sort((a, b) => (Date.parse(b.createdAt) || 0) - (Date.parse(a.createdAt) || 0));

  await writeFile(OUT, JSON.stringify(posts, null, 2) + "\n", "utf8");
  console.log(`Wrote ${posts.length} post(s) to public/data/news-posts.json${skipped ? ` (skipped ${skipped})` : ""}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
