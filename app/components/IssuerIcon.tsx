import { SiGithub, SiSpring } from "react-icons/si";
import type { IconType } from "react-icons";

function OracleIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="#F80000" xmlns="http://www.w3.org/2000/svg">
      <title>Oracle</title>
      <path d="M16.412 4.412a7.589 7.589 0 0 1 0 15.176H7.59a7.589 7.589 0 0 1 0-15.176zm-.59 2.356H8.178a5.233 5.233 0 0 0 0 10.464h7.644a5.233 5.233 0 0 0 0-10.464z" />
    </svg>
  );
}

type IconEntry = { Icon: IconType; color: string } | { custom: React.ReactNode };

const issuerIconMap: Record<string, IconEntry> = {
  Oracle: { custom: <OracleIcon /> },
  GitHub: { Icon: SiGithub, color: "#181717" },
  Broadcom: { Icon: SiSpring, color: "#6DB33F" },
};

export default function IssuerIcon({ issuer }: Readonly<{ issuer: string }>) {
  const entry = issuerIconMap[issuer];

  if (entry) {
    const content =
      "custom" in entry ? (
        entry.custom
      ) : (
        <entry.Icon size={20} color={entry.color} />
      );
    return (
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
        aria-hidden="true"
      >
        {content}
      </span>
    );
  }

  // Fallback: styled initials
  const initials = issuer
    .split(/[\s(,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-[11px] font-bold text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
      aria-hidden="true"
      title={issuer}
    >
      {initials}
    </span>
  );
}
