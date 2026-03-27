import Link from "next/link";
import type { Post } from "@/app/lib/getPosts";

type BlogCardProps = {
  post: Post;
  variant?: "compact" | "detailed";
};

const BLOG_STYLES = {
  preface: "text-slate-600 dark:text-slate-300",
  cardHover: "hover:border-slate-300 dark:hover:border-slate-700",
  tag: "border-slate-300/80 bg-slate-100/80 text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/70 dark:text-slate-200",
  focusWrap: "border-slate-200 bg-slate-100/70 dark:border-slate-800 dark:bg-slate-900/70",
  cta:
    "border-slate-300 bg-white text-slate-700 hover:border-sky-500 hover:bg-sky-500 hover:text-white hover:shadow-sky-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:bg-sky-500 dark:hover:shadow-sky-500/10",
} as const;

export default function BlogCard({ post, variant = "compact" }: Readonly<BlogCardProps>) {
  const isDetailed = variant === "detailed";

  return (
    <article className={`glass-card glass-card-hover flex h-full flex-col justify-between rounded-2xl p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 ${BLOG_STYLES.cardHover}`}>
      <div>
        <p className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${BLOG_STYLES.preface}`}>
          {isDetailed ? "Technical article" : "Article preview"}
        </p>
        <h3 className="mt-3 text-xl font-bold leading-snug text-slate-900 sm:text-2xl dark:text-white">{post.title}</h3>
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{post.date}</p>
        <p className={`mt-4 text-sm leading-7 text-slate-600 dark:text-gray-400 ${isDetailed ? "" : "line-clamp-4"}`}>{post.excerpt}</p>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="mt-7 flex flex-wrap gap-2 sm:gap-2.5">
          {post.tags.slice(0, isDetailed ? 4 : 3).map((tag) => (
            <span
              key={`${post.slug}-${tag}`}
              className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${BLOG_STYLES.tag}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {isDetailed && (
        <div className={`mt-6 rounded-2xl border p-4 ${BLOG_STYLES.focusWrap}`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Article focus</p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
            Practical notes on backend engineering decisions, tradeoffs, and implementation patterns drawn from real system design concerns.
          </p>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-200 pt-5 text-xs dark:border-slate-800">
        <p className="font-medium uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
          {isDetailed ? "Open full article" : "Read article"}
        </p>
        <Link
          href={post.href}
          className={`inline-flex items-center rounded-md border px-3 py-1.5 font-medium shadow-sm transition-all duration-200 hover:scale-[1.03] hover:shadow-md ${BLOG_STYLES.cta}`}
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}