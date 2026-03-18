import { Suspense } from "react";
import BlogPreviewClient from "@/app/components/BlogPreviewClient";
import SubpageTopBar from "@/app/components/SubpageTopBar";
import { getPosts } from "@/app/lib/getPosts";

export default function BlogIndexPage() {
  const posts = getPosts();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <SubpageTopBar leftLabel="Blog" rightHref="/#blog" />

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
