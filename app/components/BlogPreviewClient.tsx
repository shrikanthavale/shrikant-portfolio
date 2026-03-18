"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Post } from "@/app/lib/getPosts";

type BlogPreviewClientProps = {
  posts: Post[];
};

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
          return (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagSelect(tag)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-all duration-200 ${
                isActive
                  ? "border-sky-500 bg-sky-500 text-white"
                  : "border-slate-300/90 bg-white/70 text-slate-600 hover:border-sky-400 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:border-sky-500 dark:hover:text-sky-200"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="glass-card glass-card-hover flex h-full flex-col rounded-2xl p-6 shadow-sm hover:border-sky-300 dark:hover:border-sky-700"
          >
            <p className="text-xs font-medium tracking-wide text-slate-500 dark:text-slate-400">{post.date}</p>
            <h3 className="mt-2 text-xl font-bold leading-snug text-slate-900 sm:text-2xl dark:text-white">{post.title}</h3>
            <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600 dark:text-gray-400">{post.excerpt}</p>
            {post.tags && post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={`${post.slug}-${tag}`}
                    className="rounded-full border border-slate-300/90 bg-white/60 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-6 flex items-center justify-end text-xs text-slate-500 dark:text-slate-400">
              <Link
                href={post.href}
                className="inline-flex items-center rounded-md border border-sky-200 bg-sky-50 px-3 py-1.5 font-medium text-sky-700 shadow-sm transition-all duration-200 hover:scale-105 hover:border-sky-500 hover:bg-sky-500 hover:text-white dark:border-sky-800/60 dark:bg-sky-900/20 dark:text-sky-300 dark:hover:border-sky-400 dark:hover:bg-sky-500"
              >
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
