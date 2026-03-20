# Shrikant Havale - Portfolio

Modern developer portfolio showcasing backend engineering expertise, system design, and real-world projects.

## Tech Stack

- Next.js
- Tailwind CSS
- TypeScript
- Markdown-based blog content

## Features

- Modern responsive UI
- Dynamic blog system (Markdown-based)
- Real-world backend case studies
- System design and architecture showcase

## Structure

- `app/components` -> reusable UI components
- `app/data` -> blog and content
- `app/lib` -> utility functions

## Highlights

- Event-driven architecture design
- Microservices and distributed systems
- Kafka, Redis, and scalable backend patterns

## Run Locally

```bash
npm install
npm run dev
```

## Contact Form Setup (Resend)

The contact section posts to `POST /api/contact` and sends email using Resend.

Create a `.env.local` file with:

```bash
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
```

Notes:

- `CONTACT_FROM_EMAIL` can use `onboarding@resend.dev` for testing.
- For production, configure your own verified sending domain in Resend and update `CONTACT_FROM_EMAIL`.
- The route includes basic anti-spam protection (honeypot + simple rate limiting).
- Turnstile is optional. If both Turnstile keys are set, widget + server verification are enforced.

## Development Workflow

Install dependencies:

```bash
npm install
```

Run the local quality checks before opening a PR:

```bash
npm run lint
npm run typecheck
npm run build
```

Optional formatting commands:

```bash
npm run format:check
npm run format
```

## Pre-commit Checks

This repository uses Husky + lint-staged.

- On commit, staged JavaScript/TypeScript files are linted with autofix.
- On commit, staged JSON/Markdown/CSS/YAML files are formatted with Prettier.
- Commit messages are validated with commitlint (Conventional Commits).

If the hook fails, fix the reported issues and re-run the commit.

## Pull Request Checklist

Before requesting review, confirm:

- The branch builds successfully locally.
- Lint passes with `npm run lint`.
- Type checks pass with `npm run typecheck`.
- Production build passes with `npm run build`.
- UI changes were tested on desktop and mobile viewport sizes.
- New behavior includes tests where relevant, or rationale is documented in the PR.
- No secrets or environment-specific values were committed.

CI runs the same core quality gates (`lint`, `typecheck`, `build`) on push and pull requests.

## Commit Message Convention

Use Conventional Commits for clearer history and easier release notes.

Recommended format:

```text
type(scope): short summary
```

Common types:

- `feat`: new feature
- `fix`: bug fix
- `docs`: documentation-only change
- `refactor`: code restructuring without behavior change
- `test`: adding or updating tests
- `chore`: maintenance work (tooling, config, dependencies)

Examples:

```text
feat(blog): add tag-based filtering for preview cards
fix(theme): avoid setState in effect for mount guard
chore(ci): add lint typecheck and build workflow
docs(readme): add pull request checklist
```

## Release Flow

This repository uses a lightweight, quality-gated workflow:

- Keep `main` protected and always deployable.
- Create short-lived branches from `main` for each change.
- Open a pull request for every branch.
- Merge with **Squash and merge** after CI passes.

Suggested branch naming:

- `feat/short-description`
- `fix/short-description`
- `chore/short-description`

Recommended daily flow:

```bash
git checkout main
git pull
git checkout -b feat/your-change

# work, then commit
git add -A
git commit -m "feat(scope): short summary"
git push -u origin feat/your-change
```

After merge, keep local branches clean:

```bash
git checkout main
git pull
git branch -d feat/your-change
```

Recommended GitHub repository settings:

- Allow squash merging: enabled
- Allow merge commits: disabled
- Allow rebase merging: disabled
- Automatically delete head branches: enabled

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
