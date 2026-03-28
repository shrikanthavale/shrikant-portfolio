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
    <div className="border-y border-slate-200 py-5 dark:border-slate-800">
      {/* Mobile toggle button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between md:hidden"
        aria-expanded={open}
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
          On this page
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 dark:text-slate-500 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* Desktop label (always visible) */}
      <p className="hidden text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 md:block dark:text-slate-500">
        On this page
      </p>

      {/* TOC items */}
      <nav
        aria-label="Table of contents"
        className={`${open ? "block" : "hidden"} md:block`}
      >
        <ul className="mt-3 space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block py-1 text-sm transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${
                  item.level === 3
                    ? "pl-4 text-slate-400 dark:text-slate-500"
                    : "text-slate-500 dark:text-slate-400"
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
