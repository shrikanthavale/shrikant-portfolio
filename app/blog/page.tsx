import { Suspense } from "react";
import Link from "next/link";
import BlogPreviewClient from "@/app/components/BlogPreviewClient";
import { getPosts } from "@/app/lib/getPosts";

export default function BlogIndexPage() {
  const posts = getPosts();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <section className="border-b border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/#blog"
            className="text-sm font-medium text-sky-700 transition hover:text-sky-600 dark:text-sky-300 dark:hover:text-sky-200"
          >
            ← Back to home
          </Link>
          <h1 className="heading-gradient text-xl font-bold sm:text-2xl">All blogs</h1>
        </div>
      </section>

      <section className="section-ambient border-b border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-gradient text-3xl font-bold tracking-tight sm:text-5xl">Blog library</h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-gray-400">
              Explore all articles on backend architecture, distributed systems, and practical engineering patterns.
            </p>
          </div>
          <Suspense fallback={null}>
            <BlogPreviewClient posts={posts} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
