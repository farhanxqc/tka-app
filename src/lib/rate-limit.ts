import type { NextRequest } from "next/server";

export interface RateLimitResult {
  limited: boolean;
  retryAfterSec: number;
}

const buckets = new Map<string, number[]>();

export function rateLimit(
  key: string,
  limit = 20,
  windowMs = 60_000
): RateLimitResult {
  const now = Date.now();
  const cutoff = now - windowMs;
  const hits = (buckets.get(key) ?? []).filter((t) => t > cutoff);

  if (hits.length >= limit) {
    buckets.set(key, hits);
    const retryAfterSec = Math.ceil((hits[0] + windowMs - now) / 1000);
    return { limited: true, retryAfterSec };
  }

  hits.push(now);
  buckets.set(key, hits);
  return { limited: false, retryAfterSec: 0 };
}

export function readIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}