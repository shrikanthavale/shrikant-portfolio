"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BlogCard from "@/app/components/BlogCard";
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
          <BlogCard key={post.slug} post={post} variant="detailed" />
        ))}
      </div>
    </>
  );
}
