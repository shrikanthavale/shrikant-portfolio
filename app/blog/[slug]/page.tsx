import React from "react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import Link from "next/link";
import SubpageTopBar from "@/app/components/SubpageTopBar";
import BlogToc from "@/app/components/BlogToc";
import BlogTocSidebar from "@/app/components/BlogTocSidebar";
import type { TocItem } from "@/app/components/BlogToc";
import { getPostBySlug, getPostSlugs, getPosts } from "@/app/lib/getPosts";
import type { Metadata } from "next";
import { siteConfig } from "@/app/site.config";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

const architectureNotes = [
  "API Gateway handles authentication, routing, and rate limiting",
  "Payment Service publishes events to RabbitMQ for async processing",
  "Worker services consume events for validation and settlement",
  "Redis is used for caching and idempotency handling",
  "Database ensures transactional consistency",
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function stripMarkdownInline(value: string): string {
  // Safe: bounded character classes, no nested quantifiers
  let result = value;
  result = result.replaceAll(/`[^`]{1,200}`/g, "");
  result = result.replaceAll(/\[([^\]]{1,200})]\([^)]{0,500}\)/g, "$1");
  result = result.replaceAll(/[*_~]+/g, "");
  result = result.replaceAll(/<[^>]{0,200}>/g, "");
  return result.trim();
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replaceAll(/[^a-z0-9\s-]/g, "")
    .trim()
    .replaceAll(/\s+/g, "-");
}

function estimateReadingTime(content: string): number {
  const plain = content
    .replaceAll(/```[\s\S]*?```/g, " ")
    .replaceAll(/`[^`]+`/g, " ")
    .replaceAll(/[>#*_-]/g, " ");
  const words = plain.split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

// The following regex is safe because blog content is trusted and not attacker-controlled.
function extractTocItems(content: string): TocItem[] {
  if (content.length > 100_000) return [];
  const matches = content.matchAll(/^(##|###)\s+([^\r\n]{1,200})$/gm);
  const seen = new Map<string, number>();

  return Array.from(matches).map((match) => {
    const level = match[1] === "###" ? 3 : 2;
    const text = stripMarkdownInline(match[2]);
    const baseId = slugify(text);
    const count = seen.get(baseId) ?? 0;
    seen.set(baseId, count + 1);

    return {
      id: count > 0 ? `${baseId}-${count + 1}` : baseId,
      text,
      level,
    };
  });
}

// ─── Markdown components ──────────────────────────────────────────────────────

const MarkdownPre: React.FC<React.HTMLAttributes<HTMLPreElement>> = ({ children }) => (
  <>{children}</>
);

const MarkdownCode = ({
  className,
  children,
  ...rest
}: { className?: string; children?: React.ReactNode } & React.HTMLAttributes<HTMLElement>) => {
  if (className) {
    const lang = className.replace("language-", "");
    return (
      <div className="my-7 overflow-hidden rounded-xl bg-[#1e1e2e]">
        {lang && (
          <div className="flex items-center justify-end border-b border-white/[0.07] px-5 py-2.5">
            <span className="font-mono text-xs text-slate-400">{lang}</span>
          </div>
        )}
        <pre className="overflow-x-auto p-5">
          <code className="text-sm leading-relaxed text-slate-100">{children}</code>
        </pre>
      </div>
    );
  }
  return (
    <code
      {...rest}
      className="rounded bg-indigo-50 px-1.5 py-0.5 font-mono text-[0.875em] text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300"
    >
      {children}
    </code>
  );
};

const MarkdownH2 = ({ children, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    {...rest}
    className={
      "mt-12 scroll-mt-24 text-2xl font-bold tracking-tight text-slate-900 dark:text-white " +
      (rest.className ?? "")
    }
  >
    {children}
  </h2>
);

const MarkdownH3 = ({ children, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    {...rest}
    className={
      "mt-8 scroll-mt-24 text-lg font-semibold text-slate-800 dark:text-slate-100 " +
      (rest.className ?? "")
    }
  >
    {children}
  </h3>
);

const MarkdownP = ({ children, ...rest }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    {...rest}
    className={
      "mt-6 text-[1.0625rem] leading-[1.75] text-slate-700 dark:text-slate-300 " +
      (rest.className ?? "")
    }
  >
    {children}
  </p>
);

const MarkdownUl = ({ children, ...rest }: React.HTMLAttributes<HTMLUListElement>) => (
  <ul
    {...rest}
    className={
      "mt-6 space-y-3 pl-6 text-[1.0625rem] leading-[1.75] text-slate-700 marker:text-indigo-400 dark:text-slate-300 dark:marker:text-indigo-500 " +
      (rest.className ?? "")
    }
  >
    {children}
  </ul>
);

const MarkdownOl = ({ children, ...rest }: React.OlHTMLAttributes<HTMLOListElement>) => (
  <ol
    {...rest}
    className={
      "mt-6 list-decimal space-y-3 pl-6 text-[1.0625rem] leading-[1.75] text-slate-700 marker:text-indigo-400 dark:text-slate-300 dark:marker:text-indigo-500 " +
      (rest.className ?? "")
    }
  >
    {children}
  </ol>
);

const MarkdownBlockquote = ({
  children,
  ...rest
}: React.BlockquoteHTMLAttributes<HTMLElement>) => (
  <blockquote
    {...rest}
    className={
      "my-7 border-l-4 border-indigo-400 pl-5 text-slate-600 italic dark:border-indigo-600 dark:text-slate-400 " +
      (rest.className ?? "")
    }
  >
    {children}
  </blockquote>
);

const MarkdownA = ({ href, children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    href={href ?? "#"}
    {...rest}
    className={
      "font-medium text-indigo-700 underline decoration-indigo-400/50 underline-offset-4 transition hover:text-indigo-600 dark:text-indigo-300 dark:decoration-indigo-500/40 dark:hover:text-indigo-200 " +
      (rest.className ?? "")
    }
  >
    {children}
  </a>
);

const MarkdownHr = (props: React.HTMLAttributes<HTMLHRElement>) => (
  <hr
    {...props}
    className={"my-10 border-slate-200 dark:border-slate-800 " + (props.className ?? "")}
  />
);

const MarkdownImg = ({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const href = typeof src === "string" ? src : "";
  return (
  <span className="my-10 block">
    <a href={href} target="_blank" rel="noopener noreferrer" title="Click to open full size">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src ?? ""}
        alt={alt ?? ""}
        className="w-full cursor-zoom-in rounded-xl border border-slate-200 shadow-sm transition-opacity hover:opacity-90 dark:border-slate-700"
      />
    </a>
    {alt && (
      <span className="mt-3 block text-center text-[0.8125rem] italic leading-relaxed text-slate-500 dark:text-slate-400">
        {alt}
      </span>
    )}
  </span>
  );
};

const MarkdownTable = ({ children, ...rest }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="my-7 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
    <table
      {...rest}
      className={"w-full border-collapse text-sm " + (rest.className ?? "")}
    >
      {children}
    </table>
  </div>
);

const MarkdownTh = ({ children, ...rest }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    {...rest}
    className={
      "border-b border-slate-200 bg-slate-50 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400 " +
      (rest.className ?? "")
    }
  >
    {children}
  </th>
);

const MarkdownTd = ({ children, ...rest }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td
    {...rest}
    className={
      "border-b border-slate-100 px-4 py-3 text-slate-700 dark:border-slate-800 dark:text-slate-300 " +
      (rest.className ?? "")
    }
  >
    {children}
  </td>
);

// ─── Route exports ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getPostBySlug(slug);

    if (!post) {
      return { title: "Post not found" };
    }

    return {
      title: post.title,
      description: post.excerpt,
      alternates: {
        canonical: `${siteConfig.seo.url}/blog/${slug}`,
      },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        publishedTime: post.date,
        authors: ["Shrikant Havale"],
        tags: post.tags,
        url: `${siteConfig.seo.url}/blog/${slug}`,
        images: [{ url: "/profile.jpg", width: 500, height: 500, alt: "Shrikant Havale" }],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: ["/profile.jpg"],
      },
    };
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: Readonly<BlogPostPageProps>) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const readMinutes = estimateReadingTime(post.content);
  const tocItems = extractTocItems(post.content);
  const isArchitecturePost = slug === "scaling-event-driven-systems";

  const allPosts = getPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <SubpageTopBar leftLabel="← All blogs" leftHref="/blog" maxWidthClass="max-w-[1100px]" />

      <div className="mx-auto max-w-[1100px] px-6 py-16 sm:py-24">
        <div className="lg:flex lg:items-start lg:gap-12">

        {/* ── Content column ── */}
        <div className="min-w-0 lg:max-w-[680px] lg:flex-1">

        {/* ── Header ── */}
        <header>
          {/* Title */}
          <h1 className="text-[2rem] font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-[2.75rem] dark:text-white">
            {post.title}
          </h1>

          {/* Tag pills */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={`${post.slug}-tag-${tag}`}
                  className="rounded-full border border-indigo-200/70 bg-indigo-50/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.07em] text-indigo-600 dark:border-indigo-800/50 dark:bg-indigo-950/40 dark:text-indigo-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Excerpt */}
          <p className="mt-6 max-w-[60ch] text-[1.125rem] leading-relaxed text-slate-500 dark:text-slate-400">
            {post.excerpt}
          </p>

          {/* Meta row — indigo left-border accent */}
          <div className="mt-7 border-l-2 border-indigo-400 pl-3 dark:border-indigo-600">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-400 dark:text-slate-500">
              <span>{formatDate(post.date)}</span>
              <span aria-hidden="true">·</span>
              <span>{readMinutes} min read</span>
              {post.source === "original" && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Original</span>
                </>
              )}
              {post.source === "thesis" && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Master&apos;s Thesis</span>
                </>
              )}
              {post.source && post.source !== "original" && post.source !== "thesis" && (
                <>
                  <span aria-hidden="true">·</span>
                  <a
                    href={post.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Source article ↗
                  </a>
                </>
              )}
            </div>
          </div>
        </header>

        {/* ── Table of contents (inline — hidden on desktop where sidebar takes over) ── */}
        <div className="mt-10 lg:hidden">
          <BlogToc items={tocItems} />
        </div>

        {/* ── Architecture context cards (specific post) ── */}
        {isArchitecturePost && (
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {architectureNotes.map((note) => (
              <div
                key={note}
                className="rounded-xl border border-indigo-100 bg-indigo-50/60 px-4 py-3 text-sm leading-relaxed text-indigo-900 dark:border-indigo-900/40 dark:bg-indigo-950/30 dark:text-indigo-200"
              >
                {note}
              </div>
            ))}
          </div>
        )}

        {/* ── Article body ── */}
        <article className="mt-12">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug]}
            components={{
              pre: MarkdownPre,
              code: MarkdownCode,
              h2: MarkdownH2,
              h3: MarkdownH3,
              p: MarkdownP,
              ul: MarkdownUl,
              ol: MarkdownOl,
              blockquote: MarkdownBlockquote,
              a: MarkdownA,
              hr: MarkdownHr,
              table: MarkdownTable,
              th: MarkdownTh,
              td: MarkdownTd,
              img: MarkdownImg,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        {/* ── Footer ── */}
        <footer className="mt-16 border-t border-slate-200 pt-10 dark:border-slate-800">
          {/* Tags reprise */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={`${post.slug}-footer-${tag}`}
                  className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Prev / Next navigation */}
          {(previousPost ?? nextPost) && (
            <nav
              aria-label="Post navigation"
              className="mt-8 grid gap-4 sm:grid-cols-2"
            >
              {previousPost ? (
                <Link
                  href={previousPost.href}
                  className="group flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-5 transition hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-indigo-700/60 dark:hover:bg-indigo-950/30"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    ← Previous
                  </span>
                  <span className="mt-1 line-clamp-2 text-sm font-medium text-slate-700 group-hover:text-indigo-700 dark:text-slate-300 dark:group-hover:text-indigo-300">
                    {previousPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextPost ? (
                <Link
                  href={nextPost.href}
                  className="group flex flex-col items-end gap-1 rounded-xl border border-slate-200 bg-white p-5 text-right transition hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-indigo-700/60 dark:hover:bg-indigo-950/30"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    Next →
                  </span>
                  <span className="mt-1 line-clamp-2 text-sm font-medium text-slate-700 group-hover:text-indigo-700 dark:text-slate-300 dark:group-hover:text-indigo-300">
                    {nextPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          )}

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="text-sm font-medium text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              ← Back to all posts
            </Link>
          </div>
        </footer>

        </div>{/* end content column */}

        {/* ── TOC sidebar (desktop only) ── */}
        {tocItems.length >= 2 && (
          <aside className="hidden lg:block lg:w-[220px] lg:shrink-0 lg:sticky lg:top-24 lg:self-start">
            <BlogTocSidebar items={tocItems} />
          </aside>
        )}

        </div>{/* end flex row */}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: {
              "@type": "Person",
              name: "Shrikant Havale",
              url: siteConfig.seo.url,
            },
            url: `${siteConfig.seo.url}/blog/${slug}`,
          }),
        }}
      />
    </main>
  );
}
