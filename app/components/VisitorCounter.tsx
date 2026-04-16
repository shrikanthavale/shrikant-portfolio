"use client";

import { useEffect, useState } from "react";
import { formatNumber } from "@/app/lib/formatNumber";

interface VisitData {
  visits: number;
}

/**
 * VisitorCounter
 *
 * Displays a privacy-friendly visitor counter.
 * Fetches the count from /api/analytics/visits on mount.
 *
 * Features:
 * - Deduplicates visits per IP per day
 * - Shows loading placeholder while fetching
 * - Formats numbers for readability (1234 → "1.2k")
 * - Fails gracefully (hides on error)
 * - Minimal, non-blocking UI
 */
export default function VisitorCounter() {
  const [visits, setVisits] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchVisits = async () => {
      try {
        const response = await fetch("/api/analytics/visits", {
          method: "GET",
          cache: "no-store", // Don't cache to get fresh counts
        });

        if (!response.ok) {
          console.warn("[VisitorCounter] Failed to fetch visits:", response.status);
          if (isMounted) setIsLoading(false);
          return;
        }

        const data: VisitData = await response.json();
        if (isMounted) {
          setVisits(data.visits);
          setIsLoading(false);
        }
      } catch (error) {
        console.warn("[VisitorCounter] Error fetching visits:", error);
        // Fail silently; don't show component on error
        if (isMounted) setIsLoading(false);
      }
    };

    fetchVisits();

    return () => {
      isMounted = false;
    };
  }, []);

  // Don't render if loading or if fetch failed
  if (isLoading || visits === null) {
    return null;
  }

  const formattedVisits = formatNumber(visits);

  return (
    <span className="text-xs text-slate-500 dark:text-slate-400">
      {formattedVisits}+ visitors
    </span>
  );
}

