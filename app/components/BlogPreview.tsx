import Link from "next/link";
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
