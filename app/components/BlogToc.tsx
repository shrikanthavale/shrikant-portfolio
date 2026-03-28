"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export default function BlogToc({ items }: Readonly<{ items: TocItem[] }>) {
  const [open, setOpen] = useState(false);

  if (items.length < 2) return null;

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
      {/* Mobile toggle button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between bg-slate-50 px-5 py-3.5 md:hidden dark:bg-slate-900/60"
        aria-expanded={open}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
          On this page
        </span>
        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 dark:text-slate-500 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* Desktop header (always visible) */}
      <div className="hidden border-b border-slate-100 bg-slate-50 px-5 py-3.5 md:block dark:border-slate-800 dark:bg-slate-900/60">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
          On this page
        </p>
      </div>

      {/* TOC items */}
      <nav
        aria-label="Table of contents"
        className={`${open ? "block" : "hidden"} md:block`}
      >
        <ul className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block py-2.5 text-sm transition-colors hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-950/30 dark:hover:text-indigo-300 ${
                  item.level === 3
                    ? "pl-9 text-slate-500 dark:text-slate-400"
                    : "pl-5 text-slate-600 dark:text-slate-300"
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
