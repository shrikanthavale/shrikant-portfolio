import Link from "next/link";
import BlogCard from "@/app/components/BlogCard";
import { getPosts } from "@/app/lib/getPosts";

export default function BlogPreview() {
  const posts = getPosts().slice(0, 3);

  return (
    <section id="blog" className="section-ambient border-t border-slate-200 bg-slate-50/70 dark:border-gray-800 dark:bg-slate-900/20">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="heading-gradient text-3xl font-bold tracking-tight sm:text-5xl">Blog preview</h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-gray-400">
            Thoughts on backend architecture, scaling systems, and practical engineering patterns.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} variant="compact" />
          ))}
        </div>

        <div className="mt-8 text-center">
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
