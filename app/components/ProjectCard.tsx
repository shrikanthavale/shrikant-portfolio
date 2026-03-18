import {
  BarChart3,
  Coffee,
  Cpu,
  Database,
  FileText,
  Gauge,
  GitBranch,
  HardDrive,
  Leaf,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

type ProjectCardProps = {
  title: string;
  description: string;
  tags: string[];
  detailsHref?: string;
  detailsLabel?: string;
};

const TECH_BADGE_META: Record<string, { icon: LucideIcon; tone: string }> = {
  Java: { icon: Coffee, tone: "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700/50 dark:bg-amber-500/10 dark:text-amber-100" },
  "Spring Boot": { icon: Leaf, tone: "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700/50 dark:bg-emerald-500/10 dark:text-emerald-100" },
  Kafka: { icon: Workflow, tone: "border-indigo-300 bg-indigo-50 text-indigo-700 dark:border-indigo-700/50 dark:bg-indigo-500/10 dark:text-indigo-100" },
  Redis: { icon: Database, tone: "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-700/50 dark:bg-rose-500/10 dark:text-rose-100" },
  PostgreSQL: { icon: HardDrive, tone: "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-700/50 dark:bg-sky-500/10 dark:text-sky-100" },
  Prometheus: { icon: BarChart3, tone: "border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-700/50 dark:bg-orange-500/10 dark:text-orange-100" },
  Grafana: { icon: Gauge, tone: "border-fuchsia-300 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-700/50 dark:bg-fuchsia-500/10 dark:text-fuchsia-100" },
  Logging: { icon: FileText, tone: "border-cyan-300 bg-cyan-50 text-cyan-700 dark:border-cyan-700/50 dark:bg-cyan-500/10 dark:text-cyan-100" },
  "CI/CD": { icon: GitBranch, tone: "border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-700/50 dark:bg-violet-500/10 dark:text-violet-100" },
};

export default function ProjectCard({ title, description, tags, detailsHref, detailsLabel = "View project details" }: ProjectCardProps) {
  return (
    <article className="glass-card glass-card-hover flex h-full flex-col justify-between rounded-2xl p-6 shadow-sm hover:border-sky-300 dark:hover:border-sky-700">
      <div>
        <h3 className="text-xl font-bold leading-tight text-slate-900 sm:text-2xl dark:text-white">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-gray-400">{description}</p>
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
      {detailsHref && (
        <div className="mt-6 flex justify-end">
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
