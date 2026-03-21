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

## Contact Form Setup (Hostinger SMTP or Resend)

The contact section posts to `POST /api/contact`.

The API now supports two providers:

- SMTP (recommended if you already have Hostinger email settings)
- Resend (fallback)

If SMTP variables are present, SMTP is used first.
If SMTP is not configured, it falls back to Resend.

Create a `.env.local` file with:

```bash
CONTACT_TO_EMAIL=you@example.com
# Hostinger SMTP (used first if configured)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@yourdomain.com
SMTP_PASS=your_email_password
CONTACT_FROM_EMAIL=Portfolio Contact <your_email@yourdomain.com>

# Optional fallback: Resend
RESEND_API_KEY=your_resend_api_key

# Optional anti-spam
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
```

Notes:

- Yes, you can test this on localhost. SMTP will send real emails from your Hostinger mailbox even in local development.
- For Hostinger, `SMTP_PORT=587` with `SMTP_SECURE=false` is the common setup (STARTTLS).
- Some Hostinger plans may require app passwords or mailbox-specific passwords.
- If you use Resend fallback for testing, `CONTACT_FROM_EMAIL` can be `onboarding@resend.dev`.
- The route includes basic anti-spam protection (honeypot + simple rate limiting).
- Turnstile is optional. If both Turnstile keys are set, widget + server verification are enforced.

## Deployment SMTP Health Check

This repository includes a protected endpoint that sends a deployment health email
through the same SMTP/Resend path used by the contact form:

- `POST /api/ops/deploy-health`

The endpoint requires an auth header:

- `x-deploy-health-token: <DEPLOY_HEALTH_TOKEN>`

Set this secret in Vercel environment variables:

```bash
DEPLOY_HEALTH_TOKEN=long_random_token_value
```

GitHub Actions workflow `.github/workflows/deploy-smtp-health.yml` calls this endpoint
after successful `main` CI runs.

Add these GitHub repository secrets:

```bash
DEPLOY_HEALTH_URL=https://your-domain.com/api/ops/deploy-health
DEPLOY_HEALTH_TOKEN=the_same_token_as_vercel
```

If the health check email cannot be sent, the workflow fails.

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
