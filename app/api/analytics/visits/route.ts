import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/analytics/visits
 *
 * Increments a global visit counter, deduplicating visits per IP per day.
 * Uses Vercel KV for storage with 24-hour TTL on deduplication keys.
 *
 * Returns: { visits: number }
 */
export async function GET(request: NextRequest) {
  try {
    // Extract real IP address (handles proxies like Vercel, CloudFlare)
    let ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-real-ip") ||
      "";

    // Fallback: generate unique anonymous ID to avoid undercounting
    if (!ip) {
      ip = `anon-${Math.random().toString(36).slice(2, 11)}`;
    }

    // Create a deduplication key: visit:{ip}:{YYYY-MM-DD}
    // Use en-CA locale for stable YYYY-MM-DD format
    const today = new Date().toLocaleDateString("en-CA");
    const dedupeKey = `visit:${ip}:${today}`;

    // Check if this visitor has already been counted today
    const hasVisitedToday = await kv.exists(dedupeKey);

    if (!hasVisitedToday) {
      // New visit for this IP today: increment counter and set dedup key
      await Promise.all([
        kv.incr("visits:total"), // Increment global counter
        kv.setex(dedupeKey, 86400, "1"), // Set dedup key with 24h TTL
      ]);
    }

    // Get current total visit count
    const visits = (await kv.get<number>("visits:total")) ?? 0;

    return NextResponse.json({ visits }, { status: 200 });
  } catch (error) {
    // Log error but don't expose details; fail gracefully
    console.error("[API /analytics/visits] Error:", error);
    // Return a safe response with 0 visits on error
    return NextResponse.json({ visits: 0 }, { status: 500 });
  }
}

