import {
  BarChart3,
  BrainCircuit,
  Coffee,
  Cpu,
  Database,
  FileCode2,
  Layers3,
  FileText,
  Gauge,
  GitBranch,
  Globe,
  HardDrive,
  Leaf,
  Paintbrush,
  Play,
  Radio,
  ServerCog,
  ShieldCheck,
  Triangle,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

type ProjectCardProps = {
  title: string;
  role?: string;
  description: string;
  context?: string;
  outcomes?: string[];
  tags: string[];
  detailsHref?: string;
  detailsLabel?: string;
  variant?: "compact" | "detailed";
  preface?: string;
};

const CARD_ACCENTS = {
  cyan: {
    preface: "text-sky-700 dark:text-sky-300",
    cardHover: "hover:border-sky-300 dark:hover:border-sky-700",
    outcomeWrap: "border-sky-200/80 bg-sky-50/45 dark:border-sky-900/70 dark:bg-sky-900/20",
    outcomeDot: "bg-sky-500",
    cta:
      "border-sky-200 bg-sky-50 text-sky-700 hover:border-sky-500 hover:bg-sky-500 hover:text-white hover:shadow-sky-500/20 dark:border-sky-800/60 dark:bg-sky-900/20 dark:text-sky-300 dark:hover:border-sky-400 dark:hover:bg-sky-500 dark:hover:shadow-sky-500/10",
  },
  amber: {
    preface: "text-amber-700 dark:text-amber-300",
    cardHover: "hover:border-amber-300 dark:hover:border-amber-700",
    outcomeWrap: "border-amber-200/80 bg-amber-50/45 dark:border-amber-900/70 dark:bg-amber-900/20",
    outcomeDot: "bg-amber-500",
    cta:
      "border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-500 hover:bg-amber-500 hover:text-white hover:shadow-amber-500/20 dark:border-amber-800/60 dark:bg-amber-900/20 dark:text-amber-300 dark:hover:border-amber-400 dark:hover:bg-amber-500 dark:hover:shadow-amber-500/10",
  },
  rose: {
    preface: "text-rose-700 dark:text-rose-300",
    cardHover: "hover:border-rose-300 dark:hover:border-rose-700",
    outcomeWrap: "border-rose-200/80 bg-rose-50/45 dark:border-rose-900/70 dark:bg-rose-900/20",
    outcomeDot: "bg-rose-500",
    cta:
      "border-rose-200 bg-rose-50 text-rose-700 hover:border-rose-500 hover:bg-rose-500 hover:text-white hover:shadow-rose-500/20 dark:border-rose-800/60 dark:bg-rose-900/20 dark:text-rose-300 dark:hover:border-rose-400 dark:hover:bg-rose-500 dark:hover:shadow-rose-500/10",
  },
} as const;

const ACCENT_ORDER = ["cyan", "amber", "rose"] as const;

function pickAccentKey(seed: string) {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash + (seed.codePointAt(index) ?? 0) * (index + 1)) % 997;
  }
  return ACCENT_ORDER[hash % ACCENT_ORDER.length];
}

const TECH_BADGE_META: Record<string, { icon: LucideIcon; tone: string }> = {
  Java: { icon: Coffee, tone: "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700/50 dark:bg-amber-500/10 dark:text-amber-100" },
  "Spring Boot": { icon: Leaf, tone: "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700/50 dark:bg-emerald-500/10 dark:text-emerald-100" },
  Kafka: { icon: Workflow, tone: "border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-700/50 dark:bg-indigo-500/10 dark:text-indigo-100" },
  RabbitMQ: { icon: Radio, tone: "border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-700/50 dark:bg-orange-500/10 dark:text-orange-100" },
  Redis: { icon: Database, tone: "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-700/50 dark:bg-rose-500/10 dark:text-rose-100" },
  PostgreSQL: { icon: HardDrive, tone: "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-700/50 dark:bg-sky-500/10 dark:text-sky-100" },
  Prometheus: { icon: BarChart3, tone: "border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-700/50 dark:bg-orange-500/10 dark:text-orange-100" },
  Grafana: { icon: Gauge, tone: "border-fuchsia-300 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-700/50 dark:bg-fuchsia-500/10 dark:text-fuchsia-100" },
  Logging: { icon: FileText, tone: "border-cyan-300 bg-cyan-50 text-cyan-700 dark:border-cyan-700/50 dark:bg-cyan-500/10 dark:text-cyan-100" },
  "CI/CD": { icon: GitBranch, tone: "border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-700/50 dark:bg-violet-500/10 dark:text-violet-100" },
  "Eclipse RCP": { icon: Layers3, tone: "border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-700/50 dark:bg-indigo-500/10 dark:text-indigo-100" },
  Oracle: { icon: HardDrive, tone: "border-red-300 bg-red-50 text-red-700 dark:border-red-700/50 dark:bg-red-500/10 dark:text-red-100" },
  Db2: { icon: ServerCog, tone: "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700/50 dark:bg-blue-500/10 dark:text-blue-100" },
  "Robot Framework": { icon: Workflow, tone: "border-teal-300 bg-teal-50 text-teal-700 dark:border-teal-700/50 dark:bg-teal-500/10 dark:text-teal-100" },
  Microservices: { icon: Cpu, tone: "border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100" },
  "Next.js": { icon: Globe, tone: "border-zinc-500 bg-zinc-100 text-zinc-800 dark:border-zinc-500 dark:bg-zinc-800/80 dark:text-zinc-100" },
  TypeScript: { icon: FileCode2, tone: "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-700/50 dark:bg-blue-500/10 dark:text-blue-100" },
  "Tailwind CSS": { icon: Paintbrush, tone: "border-teal-300 bg-teal-50 text-teal-700 dark:border-teal-700/50 dark:bg-teal-500/10 dark:text-teal-100" },
  "GitHub Actions": { icon: Play, tone: "border-slate-300 bg-slate-100 text-slate-600 dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-300" },
  SonarCloud: { icon: ShieldCheck, tone: "border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-700/50 dark:bg-orange-500/10 dark:text-orange-100" },
  Vercel: { icon: Triangle, tone: "border-zinc-500 bg-zinc-100 text-zinc-800 dark:border-zinc-500 dark:bg-zinc-800/80 dark:text-zinc-100" },
  "Claude Code": { icon: BrainCircuit, tone: "border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-700/50 dark:bg-violet-500/10 dark:text-violet-100" },
};

export default function ProjectCard({
  title,
  role,
  description,
  context,
  outcomes,
  tags,
  detailsHref,
  detailsLabel = "View project details",
  variant = "compact",
  preface,
}: Readonly<ProjectCardProps>) {
  const isDetailed = variant === "detailed";
  const accentKey = pickAccentKey(title);
  const accent = CARD_ACCENTS[accentKey];
  const prefaceLabel = preface ?? (isDetailed ? "Project narrative" : "Case study");

  return (
    <article className={`glass-card glass-card-hover flex h-full flex-col justify-between rounded-2xl p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 ${accent.cardHover}`}>
      <div>
        <p className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${accent.preface}`}>
          {prefaceLabel}
        </p>
        <h3 className="mt-3 text-xl font-bold leading-tight text-slate-900 sm:text-2xl dark:text-white">{title}</h3>
        {role && <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{role}</p>}
        <p className={`mt-4 text-sm leading-7 text-slate-600 dark:text-gray-400 ${isDetailed ? "" : "line-clamp-4"}`}>{description}</p>

        {isDetailed && context && (
          <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">{context}</p>
        )}

        {!isDetailed && outcomes?.length ? (
          <p className="mt-4 rounded-lg border border-slate-200/80 bg-slate-50/70 px-3 py-2 text-xs font-medium leading-5 text-slate-600 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
            Impact: {outcomes[0]}
          </p>
        ) : null}
      </div>

      <div className="mt-7 flex flex-wrap gap-2 sm:gap-2.5">
        {tags.map((tag) => {
          const meta = TECH_BADGE_META[tag] ?? {
            icon: Cpu,
            tone: "border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100",
          };
          const Icon = meta.icon;

          return (
            <span
              key={tag}
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold tracking-normal sm:gap-1.5 sm:px-3 sm:tracking-wide ${meta.tone}`}
            >
              <Icon className="h-3 w-3 shrink-0 opacity-95 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
              <span>{tag}</span>
            </span>
          );
        })}
      </div>

      {isDetailed && outcomes?.length ? (
        <div className={`mt-6 rounded-2xl border p-4 ${accent.outcomeWrap}`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Selected outcomes</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-gray-400">
            {outcomes.slice(0, 2).map((item) => (
              <li key={item} className="flex gap-2">
                <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${accent.outcomeDot}`} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {detailsHref && (
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
            {isDetailed ? "Open full case study" : "Open project narrative"}
          </p>
          <Link
            href={detailsHref}
            className={`inline-flex items-center rounded-md border px-3 py-1.5 text-xs font-medium shadow-sm transition-all duration-200 hover:scale-[1.03] hover:shadow-md ${accent.cta}`}
          >
            {detailsLabel} →
          </Link>
        </div>
      )}
    </article>
  );
}
