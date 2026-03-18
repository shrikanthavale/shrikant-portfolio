"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useIsMounted();

  if (!mounted) {
    return (
      <button
        type="button"
        className="rounded-md border border-slate-300 bg-white/70 px-2.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:scale-105 hover:border-sky-500 hover:bg-sky-500 hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:bg-sky-500 sm:px-3"
        aria-label="Toggle theme"
      >
        <span aria-hidden="true" className="text-base leading-none">T</span>
        <span className="sr-only sm:not-sr-only sm:ml-2">Theme</span>
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center rounded-md border border-slate-300 bg-white/80 px-2.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:scale-105 hover:border-sky-500 hover:bg-sky-500 hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:bg-sky-500 sm:gap-2 sm:px-3"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <span aria-hidden="true" className="text-base leading-none">{isDark ? "L" : "D"}</span>
      <span className="sr-only sm:not-sr-only">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
