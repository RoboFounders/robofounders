// Data-access layer for the Robotics News feed.
//
// The UI never talks to X (or any source) directly. It reads a normalized feed
// file (`public/data/news-posts.json`) produced by the ingestion step
// (manual `scripts/fetch-news.mjs` now, scheduled `scripts/refresh-news.mjs`
// later). This module is the single seam the source swaps behind.

import useSWR from "swr";

const base = process.env.PUBLIC_URL || "";

// Public artifacts served statically from `public/`.
export const NEWS_FEED_URL = `${base}/data/news-posts.json`;
export const NEWS_SOURCES_URL = `${base}/data/news-sources.json`;

// How often the client re-checks for new posts (the "auto-update" UX).
export const NEWS_REFRESH_MS = 5 * 60 * 1000; // 5 minutes

// Only these permission states are ever rendered (defense-in-depth; the
// ingestion step is already responsible for approved-only content).
const APPROVED = new Set(["approved", "owner", "granted"]);

export async function fetchJson(url) {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

// Keep only well-formed, approved posts and return them newest-first.
export function normalizePosts(raw) {
  const list = Array.isArray(raw) ? raw : Array.isArray(raw?.posts) ? raw.posts : [];
  return list
    .filter((p) => p && p.id && p.originalUrl && p.author?.name)
    .filter((p) => !p.permissionStatus || APPROVED.has(p.permissionStatus))
    .map((p) => ({
      ...p,
      media: Array.isArray(p.media) ? p.media : [],
      createdAtMs: Date.parse(p.createdAt || "") || 0,
    }))
    .sort((a, b) => b.createdAtMs - a.createdAtMs);
}

// React hook: fetch + auto-refresh the feed. SWR needs no provider.
export function useNewsPosts() {
  const { data, error, isLoading, mutate } = useSWR(NEWS_FEED_URL, fetchJson, {
    refreshInterval: NEWS_REFRESH_MS,
    revalidateOnFocus: true,
  });

  return {
    posts: data ? normalizePosts(data) : [],
    isLoading,
    error,
    refresh: mutate,
  };
}
