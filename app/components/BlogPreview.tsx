import Link from "next/link";
import BlogCard from "@/app/components/BlogCard";
import { getPosts } from "@/app/lib/getPosts";

export default function BlogPreview() {
  const allPosts = getPosts();
  const posts = allPosts.slice(0, 3);

  return (
    <section id="blog" className="section-ambient border-t border-slate-200 bg-slate-50/70 dark:border-gray-800 dark:bg-slate-900/20">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="flex flex-col gap-8 rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/50 lg:flex-row lg:items-end lg:justify-between lg:p-8">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">Writing and notes</p>
            <h2 className="heading-gradient mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Latest writing</h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-gray-400">
              Articles on backend architecture, scaling systems, and practical implementation patterns behind the kind of work shown in the project case studies.
            </p>
          </div>

          <div className="min-w-fit rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/80">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Library view</p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-gray-400">
              Showing {posts.length} recent articles from {allPosts.length} total posts.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} variant="compact" />
          ))}
        </div>

        <div className="mt-8 flex justify-center lg:justify-start">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-sky-500/30 transition-all duration-200 hover:scale-105 hover:bg-sky-500 hover:shadow-md hover:shadow-sky-400/40"
          >
            View all blogs
          </Link>
        </div>
      </div>
    </section>
  );
}
