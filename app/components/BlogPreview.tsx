import { Suspense } from "react";
import { getPosts } from "@/app/lib/getPosts";
import BlogPreviewClient from "./BlogPreviewClient";

export default function BlogPreview() {
  const posts = getPosts();

  return (
    <section id="blog" className="section-ambient border-t border-slate-200 bg-slate-50/70 dark:border-gray-800 dark:bg-slate-900/20">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="heading-gradient text-3xl font-bold tracking-tight sm:text-5xl">Blog preview</h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-gray-400">
            Thoughts on backend architecture, scaling systems, and practical engineering patterns.
          </p>
        </div>
        <Suspense fallback={null}>
          <BlogPreviewClient posts={posts} />
        </Suspense>
      </div>
    </section>
  );
}
