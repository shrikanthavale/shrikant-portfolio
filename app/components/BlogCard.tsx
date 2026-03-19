import Link from "next/link";
import type { Post } from "@/app/lib/getPosts";

type BlogCardProps = {
  post: Post;
  variant?: "compact" | "detailed";
};

const CARD_ACCENTS = {
  cyan: {
    preface: "text-sky-700 dark:text-sky-300",
    cardHover: "hover:border-sky-300 dark:hover:border-sky-700",
    tag: "border-sky-300/80 bg-sky-50/70 text-sky-700 dark:border-sky-700/70 dark:bg-sky-900/30 dark:text-sky-200",
    focusWrap: "border-sky-200/80 bg-sky-50/45 dark:border-sky-900/70 dark:bg-sky-900/20",
    cta:
      "border-sky-200 bg-sky-50 text-sky-700 hover:border-sky-500 hover:bg-sky-500 hover:text-white hover:shadow-sky-500/20 dark:border-sky-800/60 dark:bg-sky-900/20 dark:text-sky-300 dark:hover:border-sky-400 dark:hover:bg-sky-500 dark:hover:shadow-sky-500/10",
  },
  amber: {
    preface: "text-amber-700 dark:text-amber-300",
    cardHover: "hover:border-amber-300 dark:hover:border-amber-700",
    tag: "border-amber-300/80 bg-amber-50/70 text-amber-700 dark:border-amber-700/70 dark:bg-amber-900/30 dark:text-amber-200",
    focusWrap: "border-amber-200/80 bg-amber-50/45 dark:border-amber-900/70 dark:bg-amber-900/20",
    cta:
      "border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-500 hover:bg-amber-500 hover:text-white hover:shadow-amber-500/20 dark:border-amber-800/60 dark:bg-amber-900/20 dark:text-amber-300 dark:hover:border-amber-400 dark:hover:bg-amber-500 dark:hover:shadow-amber-500/10",
  },
  rose: {
    preface: "text-rose-700 dark:text-rose-300",
    cardHover: "hover:border-rose-300 dark:hover:border-rose-700",
    tag: "border-rose-300/80 bg-rose-50/70 text-rose-700 dark:border-rose-700/70 dark:bg-rose-900/30 dark:text-rose-200",
    focusWrap: "border-rose-200/80 bg-rose-50/45 dark:border-rose-900/70 dark:bg-rose-900/20",
    cta:
      "border-rose-200 bg-rose-50 text-rose-700 hover:border-rose-500 hover:bg-rose-500 hover:text-white hover:shadow-rose-500/20 dark:border-rose-800/60 dark:bg-rose-900/20 dark:text-rose-300 dark:hover:border-rose-400 dark:hover:bg-rose-500 dark:hover:shadow-rose-500/10",
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

export default function BlogCard({ post, variant = "compact" }: BlogCardProps) {
  const isDetailed = variant === "detailed";
  const accentKey = pickAccentKey(post.slug || post.title);
  const accent = CARD_ACCENTS[accentKey];

  return (
    <article className={`glass-card glass-card-hover flex h-full flex-col justify-between rounded-2xl p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 ${accent.cardHover}`}>
      <div>
        <p className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${accent.preface}`}>
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
              className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${accent.tag}`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {isDetailed && (
        <div className={`mt-6 rounded-2xl border p-4 ${accent.focusWrap}`}>
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
          className={`inline-flex items-center rounded-md border px-3 py-1.5 font-medium shadow-sm transition-all duration-200 hover:scale-[1.03] hover:shadow-md ${accent.cta}`}
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}