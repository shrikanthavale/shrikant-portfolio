import fs from "fs";
import path from "path";

export type Post = {
  title: string;
  excerpt: string;
  date: string;
  href: string;
  slug: string;
  content: string;
  tags?: string[];
  source?: string;
};

const postsDir = path.join(process.cwd(), "app", "data", "posts");

function parseFrontMatter(fileContents: string): Record<string, string> {
  const match = fileContents.match(/---\s*([\s\S]*?)---/);
  const frontMatter = match ? match[1] : "";

  const meta: Record<string, string> = {};
  frontMatter.split(/\r?\n/).forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) return;
    meta[key.trim()] = rest.join(":").trim().replace(/^\"|\"$/g, "");
  });

  return meta;
}

function extractBody(fileContents: string): string {
  return fileContents.replace(/^---[\s\S]*?---\s*/m, "").trim();
}

function toPost(fileName: string): Post {
  const filePath = path.join(postsDir, fileName);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const meta = parseFrontMatter(fileContents);
  const content = extractBody(fileContents);
  const slug = fileName.replace(/\.mdx?$/, "");
  const fallbackExcerpt = content.slice(0, 140).trim();
  const tags = (meta.tags ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return {
    title: meta.title ?? "Untitled",
    excerpt: meta.excerpt ?? fallbackExcerpt,
    date: meta.date ?? "",
    slug,
    href: `/blog/${slug}`,
    content,
    tags: tags.length > 0 ? tags : undefined,
    source: meta.source ? meta.source.trim() : undefined,
  };
}

export function getPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDir);

  return fileNames
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((fileName) => toPost(fileName))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const mdPath = path.join(postsDir, `${slug}.md`);
  const mdxPath = path.join(postsDir, `${slug}.mdx`);

  if (fs.existsSync(mdPath)) return toPost(`${slug}.md`);
  if (fs.existsSync(mdxPath)) return toPost(`${slug}.mdx`);

  return null;
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}
