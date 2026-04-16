import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/analytics/visits
 *
 * Increments a global visit counter, deduplicating visits per IP per day.
 * Also tracks monthly visits.
 * Uses Vercel KV for storage with 24-hour TTL on deduplication keys.
 *
 * Returns: { visits: number, monthlyVisits: number }
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

    // Get month for monthly counter: YYYY-MM
    const yearMonth = today.slice(0, 7); // "2026-04"

    // Check if this visitor has already been counted today
    const hasVisitedToday = await kv.exists(dedupeKey);

    if (!hasVisitedToday) {
      // New visit for this IP today: increment counters and set dedup key
      await Promise.all([
        kv.incr("visits:total"), // Increment global counter
        kv.incr(`visits:${yearMonth}`), // Increment monthly counter
        kv.setex(dedupeKey, 86400, "1"), // Set dedup key with 24h TTL
      ]);
    }

    // Get current totals
    const visits = (await kv.get<number>("visits:total")) ?? 0;
    const monthlyVisits = (await kv.get<number>(`visits:${yearMonth}`)) ?? 0;

    return NextResponse.json({ visits, monthlyVisits }, { status: 200 });
  } catch (error) {
    // Log error but don't expose details; fail gracefully
    console.error("[API /analytics/visits] Error:", error);
    // Return safe response with 0 visits on error
    return NextResponse.json({ visits: 0, monthlyVisits: 0 }, { status: 500 });
  }
}

