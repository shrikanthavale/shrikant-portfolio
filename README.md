# Developer Portfolio Template

A production-grade developer portfolio template built with Next.js, TypeScript, Tailwind CSS v4, and Vercel.

[![Performance](https://img.shields.io/badge/Performance-100-brightgreen)](https://www.shrikant-havale.in)
[![Accessibility](https://img.shields.io/badge/Accessibility-96-brightgreen)](https://www.shrikant-havale.in)
[![Best Practices](https://img.shields.io/badge/Best%20Practices-100-brightgreen)](https://www.shrikant-havale.in)
[![SEO](https://img.shields.io/badge/SEO-100-brightgreen)](https://www.shrikant-havale.in)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=shrikanthavale_shrikant-portfolio&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=shrikanthavale_shrikant-portfolio)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=shrikanthavale_shrikant-portfolio&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=shrikanthavale_shrikant-portfolio)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=shrikanthavale_shrikant-portfolio&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=shrikanthavale_shrikant-portfolio)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=shrikanthavale_shrikant-portfolio&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=shrikanthavale_shrikant-portfolio)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=shrikanthavale_shrikant-portfolio&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=shrikanthavale_shrikant-portfolio)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=shrikanthavale_shrikant-portfolio&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=shrikanthavale_shrikant-portfolio)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=shrikanthavale_shrikant-portfolio&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=shrikanthavale_shrikant-portfolio)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=shrikanthavale_shrikant-portfolio&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=shrikanthavale_shrikant-portfolio)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=shrikanthavale_shrikant-portfolio&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=shrikanthavale_shrikant-portfolio)

---

## Features

- **Single-file configuration** — all personal data lives in `app/site.config.ts`
- **Dark / light theme** — system-aware with manual toggle via `next-themes`
- **Blog system** — Markdown files with YAML frontmatter, tag support, syntax highlighting
- **Project showcase** — typed data file with individual project detail pages
- **Career journey timeline** — animated scroll-driven timeline from a typed data file
- **Certifications page** — filterable grid driven by a data file
- **Contact form** — rate-limited, honeypot-protected, Cloudflare Turnstile support, dual email provider (SMTP + Resend fallback)
- **CI/CD pipeline** — GitHub Actions: commitlint → ESLint → TypeScript → build → Playwright E2E → Lighthouse CI → SonarCloud
- **SEO optimized** — sitemap, robots.txt, Open Graph, Twitter cards, JSON-LD schema

---

## Quick Start

```bash
# 1. Fork and clone
git clone https://github.com/shrikanthavale/shrikant-portfolio
cd shrikant-portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your email credentials (see Configuration below)

# 4. Fill in your personal details
# Edit app/site.config.ts (see Configuration below)

# 5. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Configuration

Everything you need to personalise is in **`app/site.config.ts`**. Edit this file once and the entire site updates.

### `person` — your identity

```ts
person: {
  name: "Your Name",
  title: "Your Job Title",
  location: "Your City, Country",
  currentEmployer: "Your Company",
  profilePhoto: "/profile.jpg",       // place your photo in /public
  knowsAbout: ["Java", "Spring Boot"], // skills for JSON-LD schema
}
```

### `social` — all social profiles

```ts
social: [
  { label: "GitHub", href: "https://github.com/you", icon: "Github", navbarVisible: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/you", icon: "Linkedin", navbarVisible: true },
  { label: "Stack Overflow", href: "...", icon: "Code2", navbarVisible: false },
  { label: "HackerRank", href: "...", icon: "TerminalSquare", navbarVisible: false },
];
```

`navbarVisible: true` — shown in the navbar icon row and the contact section buttons.
`navbarVisible: false` — shown in the footer social list only.

### `navbar` — navigation links and CTA

```ts
navbar: {
  cta: { label: "Let's talk", href: "#contact" },
  navItems: [
    { label: "Home",      href: "#hero" },
    { label: "Projects",  href: "#projects" },
    { label: "Tech Stack", href: "#tech" },
    { label: "Blog",      href: "#blog" },
    { label: "Contact",   href: "#contact" },
  ],
}
```

### `hero` — landing section

Controls the tagline, headline, bio, credentials badge, CTA buttons, service cards, and stat grid.

### `contact` — contact section

Controls the section heading, subheading, hint box, message placeholder, response time label, and the success message shown after form submission.

### `footer` — quick links

The `quickLinks` array drives the footer link columns. Hash links (`#section`) render as `<a>` tags; path links (`/page`) render as Next.js `<Link>` tags automatically.

### `seo` — metadata and Open Graph

```ts
seo: {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com",
  siteName: "Your Name Portfolio",
  description: "...",
  ogDescription: "...",
  ogImage: "/profile.jpg",
  keywords: ["Your Name", "Backend Engineer", ...],
  googleVerification: "your_google_verification_token",
}
```

### `resume` — resume download

```ts
resume: {
  path: "/YourResume.pdf",  // place the file in /public
}
```

---

## Content

Beyond `site.config.ts`, four data files hold all section content. Replace them with your own.

### Projects — `app/data/projects.ts`

A typed array of `Project` objects. Each entry generates both a card on the home page and a full detail page at `/projects/[slug]`.

```ts
{
  slug: "your-project",
  title: "Project Title",
  description: "Short description shown on the card.",
  tags: ["Java", "RabbitMQ"],
  // ... see existing entries for the full shape
}
```

### Certifications — `app/data/certifications.ts`

A typed array of `Certification` objects shown on the `/certifications` page.

```ts
{
  title: "Certification Name",
  issuer: "Issuing Body",
  date: "2024",
  credentialId: "ABC123",
  verifyUrl: "https://...",
}
```

### Career Journey — `app/data/journey.ts`

A typed array of `TimelineEntry` objects rendered as the animated scroll timeline on `/journey`.

```ts
{
  title: "Company or Degree",
  kind: "work" | "education",
  accent: "cyan" | "amber" | "rose",
  stage: "Short stage label",
  location: "City, Country",
  period: "2020-2023",
  role: "Your Role",
  narrative: "One sentence summary.",
  tags: ["Java", "Spring"],
  highlights: ["Key achievement 1", "Key achievement 2"],
}
```

### Blog Posts — `app/data/posts/`

Each post is a `.md` or `.mdx` file with YAML frontmatter:

```yaml
---
title: "Your Post Title"
date: "2024-06-01"
excerpt: "A short summary shown on the blog listing."
tags: ["java", "microservices"]
---
Your post content in Markdown...
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values.

| Variable                         | Required           | Purpose                                  |
| -------------------------------- | ------------------ | ---------------------------------------- |
| `CONTACT_TO_EMAIL`               | Yes                | Recipient for contact form emails        |
| `SMTP_HOST`                      | One of SMTP/Resend | Hostinger (or other) SMTP host           |
| `SMTP_PORT`                      | One of SMTP/Resend | Usually `587`                            |
| `SMTP_USER`                      | One of SMTP/Resend | SMTP login email                         |
| `SMTP_PASS`                      | One of SMTP/Resend | SMTP password                            |
| `CONTACT_FROM_EMAIL`             | One of SMTP/Resend | Sender display address                   |
| `RESEND_API_KEY`                 | One of SMTP/Resend | Resend API key (fallback if SMTP absent) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | No                 | Cloudflare Turnstile site key            |
| `TURNSTILE_SECRET_KEY`           | No                 | Cloudflare Turnstile secret key          |
| `DEPLOY_HEALTH_TOKEN`            | No                 | Auth token for `/api/ops/deploy-health`  |
| `NEXT_PUBLIC_SITE_URL`           | No                 | Overrides the default site URL           |

SMTP is used when `SMTP_HOST`, `SMTP_USER`, and `SMTP_PASS` are all set. Otherwise Resend is used. Turnstile is optional — omit both keys to disable the widget entirely.

---

## Deployment

### Vercel (recommended)

1. Push your fork to GitHub.
2. Go to [vercel.com](https://vercel.com), import the repository.
3. Add all environment variables from `.env.local` in the Vercel project settings.
4. Deploy — Vercel detects Next.js automatically.

### Deployment Health Check (optional)

A protected endpoint at `POST /api/ops/deploy-health` sends a test email through the same SMTP/Resend path used by the contact form. It verifies email delivery is working after each production deploy.

To enable it:

1. Add `DEPLOY_HEALTH_TOKEN` to your Vercel environment variables.
2. Add these secrets to your GitHub repository:

```bash
DEPLOY_HEALTH_URL=https://your-domain.com/api/ops/deploy-health
DEPLOY_HEALTH_TOKEN=the_same_token_as_vercel
```

The GitHub Actions workflow `.github/workflows/deploy-smtp-health.yml` calls this endpoint automatically after successful `main` CI runs.

---

## Contributing / Development

### Development Workflow

Install dependencies:

```bash
npm install
```

Run quality checks before opening a PR:

```bash
npm run lint
npm run typecheck
npm run build
```

Optional formatting:

```bash
npm run format:check
npm run format
```

### Pre-commit Checks

This repository uses Husky + lint-staged.

- Staged JavaScript/TypeScript files are linted with autofix.
- Staged JSON/Markdown/CSS/YAML files are formatted with Prettier.
- Commit messages are validated with commitlint (Conventional Commits).

If the hook fails, fix the reported issues and re-run the commit.

### Pull Request Checklist

Before requesting review, confirm:

- The branch builds successfully locally.
- Lint passes with `npm run lint`.
- Type checks pass with `npm run typecheck`.
- Production build passes with `npm run build`.
- UI changes were tested on desktop and mobile viewport sizes.
- New behaviour includes tests where relevant, or rationale is documented in the PR.
- No secrets or environment-specific values were committed.

CI runs the same core quality gates (`lint`, `typecheck`, `build`) on push and pull requests.

### Commit Message Convention

Use Conventional Commits for clearer history.

```text
type(scope): short summary
```

Common types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

```text
feat(blog): add tag-based filtering for preview cards
fix(theme): avoid setState in effect for mount guard
chore(ci): add lint typecheck and build workflow
docs(readme): add pull request checklist
```

### Release Flow

- Keep `main` protected and always deployable.
- Create short-lived branches from `main` for each change.
- Open a pull request for every branch.
- Merge with **Squash and merge** after CI passes.

Suggested branch naming: `feat/short-description`, `fix/short-description`, `chore/short-description`.

Recommended GitHub repository settings:

- Allow squash merging: enabled
- Allow merge commits: disabled
- Allow rebase merging: disabled
- Automatically delete head branches: enabled
