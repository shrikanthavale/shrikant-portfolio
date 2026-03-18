import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getPostSlugs } from "@/app/lib/getPosts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

const architectureNotes = [
  "API Gateway handles authentication, routing, and rate limiting",
  "Payment Service publishes events to Kafka for async processing",
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
  return value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/[*_~]/g, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function estimateReadingTime(content: string): number {
  const plain = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/[>#*_\-]/g, " ");
  const words = plain.split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

function extractTocItems(content: string): TocItem[] {
  const matches = content.matchAll(/^(##|###)\s+(.+)$/gm);
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

function getNodeText(children: React.ReactNode): string {
  return React.Children.toArray(children)
    .map((child) => {
      if (typeof child === "string") return child;
      if (typeof child === "number") return String(child);
      if (React.isValidElement<{ children?: React.ReactNode }>(child)) {
        return getNodeText(child.props.children);
      }
      return "";
    })
    .join("");
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: BlogPostPageProps) {
  return params.then(({ slug }) => {
    const post = getPostBySlug(slug);

    if (!post) {
      return { title: "Post not found" };
    }

    return {
      title: `${post.title} | Blog`,
      description: post.excerpt,
    };
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const readMinutes = estimateReadingTime(post.content);
  const tocItems = extractTocItems(post.content);
  const headingIds = new Map<string, number>();
  const isArchitecturePost = slug === "scaling-event-driven-systems";

  const getHeadingId = (text: string): string => {
    const baseId = slugify(stripMarkdownInline(text));
    const count = headingIds.get(baseId) ?? 0;
    headingIds.set(baseId, count + 1);
    return count > 0 ? `${baseId}-${count + 1}` : baseId;
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <article className="mx-auto max-w-3xl px-6 py-20">
        <Link href="/#blog" className="text-sm font-medium text-sky-700 transition hover:text-sky-600 dark:text-sky-300 dark:hover:text-sky-200">
          ← Back to blog
        </Link>
        <header className="mt-6 border-b border-slate-200 pb-6 dark:border-slate-800">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {formatDate(post.date)}
            <span className="px-2 text-slate-400 dark:text-slate-600">•</span>
            {readMinutes} min read
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{post.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">{post.excerpt}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {post.tags?.map((tag) => (
              <span
                key={`${post.slug}-${tag}`}
                className="rounded-full border border-slate-300/90 bg-white/70 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
            {post.source === "original" && (
              <span className="rounded-full border border-slate-300/90 bg-white/70 px-2.5 py-1 text-[11px] font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-400">
                Source: original
              </span>
            )}
            {post.source && post.source !== "original" && (
              <a
                href={post.source}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[11px] font-medium text-sky-700 transition hover:border-sky-500 hover:bg-sky-500 hover:text-white dark:border-sky-800/60 dark:bg-sky-900/20 dark:text-sky-300 dark:hover:border-sky-400 dark:hover:bg-sky-500"
              >
                Source article
              </a>
            )}
          </div>
        </header>
        {isArchitecturePost && (
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {architectureNotes.map((note) => (
              <div
                key={note}
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-900/40 dark:text-gray-400"
              >
                {note}
              </div>
            ))}
          </div>
        )}
        <div className="mt-8 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-8">
          {tocItems.length > 0 && (
            <nav
              aria-label="Table of contents"
              className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24 lg:mb-0 dark:border-slate-800 dark:bg-slate-900/40"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">On this page</p>
              <ul className="mt-3 space-y-2">
                {tocItems.map((item) => (
                  <li key={item.id} className={item.level === 3 ? "pl-4" : "pl-0"}>
                    <a href={`#${item.id}`} className="text-sm text-slate-600 transition hover:text-sky-700 dark:text-slate-300 dark:hover:text-sky-200">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <div className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => {
                  const id = getHeadingId(getNodeText(children));
                  return (
                    <h2 id={id} className="mt-9 scroll-mt-24 text-2xl font-semibold tracking-tight text-slate-900 first:mt-0 dark:text-white">
                      {children}
                    </h2>
                  );
                },
                h3: ({ children }) => {
                  const id = getHeadingId(getNodeText(children));
                  return (
                    <h3 id={id} className="mt-7 scroll-mt-24 text-xl font-semibold text-slate-900 dark:text-white">
                      {children}
                    </h3>
                  );
                },
                p: ({ children }) => <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-200">{children}</p>,
                ul: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-slate-500 dark:marker:text-slate-400">{children}</ul>,
                ol: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-6 marker:text-slate-500 dark:marker:text-slate-400">{children}</ol>,
                blockquote: ({ children }) => (
                  <blockquote className="mt-5 border-l-2 border-slate-300 pl-4 text-slate-600 dark:border-slate-700 dark:text-slate-300">{children}</blockquote>
                ),
                a: ({ href, children }) => (
                  <a href={href ?? "#"} className="font-medium text-sky-700 underline decoration-sky-500/40 underline-offset-4 transition hover:text-sky-600 dark:text-sky-300 dark:decoration-sky-400/40 dark:hover:text-sky-200">
                    {children}
                  </a>
                ),
                code: ({ className, children }) => {
                  const isBlock = Boolean(className);

                  if (isBlock) {
                    return (
                      <code className="block overflow-x-auto rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100">
                        {children}
                      </code>
                    );
                  }

                  return (
                    <code className="rounded bg-slate-200 px-1.5 py-0.5 text-[0.92em] text-slate-800 dark:bg-slate-800 dark:text-slate-100">{children}</code>
                  );
                },
                hr: () => <hr className="my-8 border-slate-300 dark:border-slate-800" />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </main>
  );
}
