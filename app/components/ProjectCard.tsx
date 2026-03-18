import {
  BarChart3,
  Coffee,
  Cpu,
  Database,
  Layers3,
  FileText,
  Gauge,
  GitBranch,
  HardDrive,
  Leaf,
  Radio,
  ServerCog,
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
  variant?: "compact" | "index" | "detailed";
};

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
}: ProjectCardProps) {
  const isDetailed = variant === "detailed";
  const isIndex = variant === "index";

  return (
    <article className="glass-card glass-card-hover flex h-full flex-col justify-between rounded-2xl p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:border-sky-300 dark:hover:border-sky-700">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
          {isDetailed ? "Project narrative" : isIndex ? "Project overview" : "Case study"}
        </p>
        <h3 className="mt-3 text-xl font-bold leading-tight text-slate-900 sm:text-2xl dark:text-white">{title}</h3>
        {role && <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{role}</p>}
        <p className={`mt-4 text-sm leading-7 text-slate-600 dark:text-gray-400 ${isDetailed ? "" : isIndex ? "line-clamp-3" : "line-clamp-4"}`}>
          {description}
        </p>

        {(isDetailed || isIndex) && context && (
          <p className={`mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400 ${isIndex ? "line-clamp-3" : ""}`}>{context}</p>
        )}
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
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-900/60">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Selected outcomes</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-gray-400">
            {outcomes.slice(0, 2).map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {isIndex && outcomes?.length ? (
        <div className="mt-6 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden="true" />
          <span className="line-clamp-2">{outcomes[0]}</span>
        </div>
      ) : null}

      {detailsHref && (
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
            {isDetailed ? "Open full case study" : isIndex ? "Open project page" : "Open project narrative"}
          </p>
          <Link
            href={detailsHref}
            className="inline-flex items-center rounded-md border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700 shadow-sm transition-all duration-200 hover:scale-105 hover:border-sky-500 hover:bg-sky-500 hover:text-white dark:border-sky-800/60 dark:bg-sky-900/20 dark:text-sky-300 dark:hover:border-sky-400 dark:hover:bg-sky-500"
          >
            {detailsLabel} →
          </Link>
        </div>
      )}
    </article>
  );
}
