import Link from "next/link";

type SubpageTopBarProps = {
  leftLabel: string;
  leftHref?: string;
  rightLabel?: string;
  rightHref?: string;
  maxWidthClass?: string;
};

export default function SubpageTopBar({
  leftLabel,
  leftHref,
  rightLabel = "Home",
  rightHref = "/",
  maxWidthClass = "max-w-6xl",
}: SubpageTopBarProps) {
  const leftContent = leftHref ? (
    <Link href={leftHref} className="text-sm font-medium text-sky-700 transition hover:text-sky-600 dark:text-sky-300 dark:hover:text-sky-200">
      {leftLabel}
    </Link>
  ) : (
    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{leftLabel}</span>
  );

  return (
    <section className="border-b border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-950/90">
      <div className={`mx-auto flex ${maxWidthClass} items-center justify-between px-6 py-4`}>
        {leftContent}
        <Link href={rightHref} className="text-sm font-medium text-slate-500 transition hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-200">
          {rightLabel}
        </Link>
      </div>
    </section>
  );
}