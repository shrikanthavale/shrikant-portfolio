"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BlogCard from "@/app/components/BlogCard";
import type { Post } from "@/app/lib/getPosts";

type BlogPreviewClientProps = {
  posts: Post[];
};

const TAG_ACCENTS = {
  cyan: {
    active: "border-sky-500 bg-sky-500 text-white",
    inactive:
      "border-sky-200/90 bg-sky-50/80 text-sky-700 hover:border-sky-400 hover:text-sky-800 dark:border-sky-700/70 dark:bg-sky-900/35 dark:text-sky-200 dark:hover:border-sky-500 dark:hover:text-sky-100",
  },
  amber: {
    active: "border-amber-500 bg-amber-500 text-white",
    inactive:
      "border-amber-200/90 bg-amber-50/80 text-amber-700 hover:border-amber-400 hover:text-amber-800 dark:border-amber-700/70 dark:bg-amber-900/35 dark:text-amber-200 dark:hover:border-amber-500 dark:hover:text-amber-100",
  },
  rose: {
    active: "border-rose-500 bg-rose-500 text-white",
    inactive:
      "border-rose-200/90 bg-rose-50/80 text-rose-700 hover:border-rose-400 hover:text-rose-800 dark:border-rose-700/70 dark:bg-rose-900/35 dark:text-rose-200 dark:hover:border-rose-500 dark:hover:text-rose-100",
  },
} as const;

const ACCENT_ORDER = ["cyan", "amber", "rose"] as const;

function pickAccentKey(seed: string) {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash + seed.charCodeAt(index) * (index + 1)) % 997;
  }
  return ACCENT_ORDER[hash % ACCENT_ORDER.length];
}

export default function BlogPreviewClient({ posts }: BlogPreviewClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => {
      post.tags?.forEach((tag) => tags.add(tag));
    });
    return ["all", ...Array.from(tags).sort((a, b) => a.localeCompare(b))];
  }, [posts]);

  const activeTag = useMemo(() => {
    const requestedTag = searchParams.get("tag");
    if (!requestedTag || !availableTags.includes(requestedTag)) {
      return "all";
    }
    return requestedTag;
  }, [searchParams, availableTags]);

  const filteredPosts = useMemo(() => {
    if (activeTag === "all") return posts;
    return posts.filter((post) => post.tags?.includes(activeTag));
  }, [posts, activeTag]);

  const handleTagSelect = (tag: string) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    if (tag === "all") {
      nextParams.delete("tag");
    } else {
      nextParams.set("tag", tag);
    }

    const query = nextParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {availableTags.map((tag) => {
          const isActive = activeTag === tag;
          const accent = TAG_ACCENTS[pickAccentKey(tag)];
          return (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagSelect(tag)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-all duration-200 ${
                isActive
                  ? accent.active
                  : accent.inactive
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} variant="detailed" />
        ))}
      </div>
    </>
  );
}
