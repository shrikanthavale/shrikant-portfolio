import React from "react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// @ts-expect-error: remark-slug has no types but works fine
import remarkSlug from "remark-slug";
import SubpageTopBar from "@/app/components/SubpageTopBar";
import { getPostBySlug, getPostSlugs } from "@/app/lib/getPosts";
import type { Metadata } from "next";

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
  // Safe: bounded character classes, no nested quantifiers
  let result = value;
  result = result.replaceAll(/`[^`]{1,200}`/g, "");           // inline code
  result = result.replaceAll(/\[([^\]]{1,200})\]\([^)]{0,500}\)/g, "$1"); // links
  result = result.replaceAll(/[*_~]+/g, "");                   // bold/italic
  result = result.replaceAll(/<[^>]{0,200}>/g, "");            // html tags
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
  if (content.length > 100_000) return []; // Defensive: skip TOC for huge content
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

// Markdown components moved out for best practices
const MarkdownP = ({ children, ...rest }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p {...rest} className={"mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-200 " + (rest.className ?? "")}>{children}</p>
);

const MarkdownUl = ({ children, ...rest }: React.HTMLAttributes<HTMLUListElement>) => (
  <ul {...rest} className={"mt-4 list-disc space-y-2 pl-6 marker:text-slate-500 dark:marker:text-slate-400 " + (rest.className ?? "")}>{children}</ul>
);

const MarkdownOl = ({ children, ...rest }: React.OlHTMLAttributes<HTMLOListElement>) => (
  <ol {...rest} className={"mt-4 list-decimal space-y-2 pl-6 marker:text-slate-500 dark:marker:text-slate-400 " + (rest.className ?? "")}>{children}</ol>
);

const MarkdownBlockquote = ({ children, ...rest }: React.BlockquoteHTMLAttributes<HTMLElement>) => (
  <blockquote {...rest} className={"mt-5 border-l-2 border-slate-300 pl-4 text-slate-600 dark:border-slate-700 dark:text-slate-300 " + (rest.className ?? "")}>{children}</blockquote>
);

const MarkdownA = ({ href, children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a href={href ?? "#"} {...rest} className={"font-medium text-sky-700 underline decoration-sky-500/40 underline-offset-4 transition hover:text-sky-600 dark:text-sky-300 dark:decoration-sky-400/40 dark:hover:text-sky-200 " + (rest.className ?? "")}>{children}</a>
);

const MarkdownCode = ({ className, children, ...rest }: { className?: string; children?: React.ReactNode } & React.HTMLAttributes<HTMLElement>) => {
  const isBlock = Boolean(className);
  if (isBlock) {
    return (
      <code {...rest} className={"block overflow-x-auto rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100 " + (className ?? "")}>{children}</code>
    );
  }
  return (
    <code {...rest} className={"rounded bg-slate-200 px-1.5 py-0.5 text-[0.92em] text-slate-800 dark:bg-slate-800 dark:text-slate-100 " + (className ?? "")}>{children}</code>
  );
};

const MarkdownHr = (props: React.HTMLAttributes<HTMLHRElement>) => <hr {...props} className={"my-8 border-slate-300 dark:border-slate-800 " + (props.className ?? "")} />;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  return params.then(async ({ slug }) => {
    const post = getPostBySlug(slug);

    if (!post) {
      return { title: "Post not found" };
    }

    const { siteUrl } = await import("@/app/lib/config");

    return {
      title: post.title,  // layout.tsx template adds "| Shrikant Havale" automatically
      description: post.excerpt,
      alternates: {
        canonical: `${siteUrl}/blog/${slug}`,
      },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        publishedTime: post.date,
        authors: ["Shrikant Havale"],
        tags: post.tags,
        url: `${siteUrl}/blog/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
      },
    };
  });
}

export default async function BlogPostPage({ params }: Readonly<BlogPostPageProps>) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const readMinutes = estimateReadingTime(post.content);
  const tocItems = extractTocItems(post.content);
  const isArchitecturePost = slug === "scaling-event-driven-systems";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <SubpageTopBar leftLabel="← All blogs" leftHref="/blog" maxWidthClass="max-w-3xl" />
      <article className="mx-auto max-w-3xl px-6 py-20">
        <header className="border-b border-slate-200 pb-6 dark:border-slate-800">
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
              remarkPlugins={[remarkGfm, remarkSlug]}
              components={{
                p: MarkdownP,
                ul: MarkdownUl,
                ol: MarkdownOl,
                blockquote: MarkdownBlockquote,
                a: MarkdownA,
                code: MarkdownCode,
                hr: MarkdownHr,
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
