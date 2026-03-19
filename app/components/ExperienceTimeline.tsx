"use client";

import { BriefcaseBusiness, GraduationCap, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type TimelineEntry = {
  title: string;
  accent: "cyan" | "amber" | "rose";
  kind: "work" | "education";
  location: string;
  period: string;
  role: string;
  narrative: string;
  tags: string[];
  highlights: string[];
};

const timelineEntries: TimelineEntry[] = [
  {
    title: "BSc in Computer Science",
    accent: "rose",
    kind: "education",
    location: "Mumbai, India",
    period: "2004-2008",
    role: "Mumbai University",
    narrative:
      "Built strong software engineering foundations and graduated with distinction in the final year.",
    tags: ["Computer Science", "Algorithms", "Programming"],
    highlights: [
      "Graduated with distinction in the final year.",
      "Built a strong base in algorithms, programming, and system design.",
      "Developed an early interest in backend systems and applied problem-solving.",
    ],
  },
  {
    title: "Infosys Technologies Limited",
    accent: "amber",
    kind: "work",
    location: "Pune, India",
    period: "2008-2012",
    role: "System Engineer - Customer Care Admin Console",
    narrative:
      "Redesigned internal admin tooling to simplify daily operations for customer support teams.",
    tags: ["Java", "Admin Systems", "Support Tooling"],
    highlights: [
      "Remodeled the admin console to simplify system behavior management.",
      "Reduced operational complexity and dependence on specialized database workflows.",
      "Lowered training overhead by improving day-to-day usability for support teams.",
    ],
  },
  {
    title: "Capgemini",
    accent: "cyan",
    kind: "work",
    location: "Mumbai, India",
    period: "2012-2013",
    role: "Consultant - Post-Sales Maintenance Platform",
    narrative:
      "Delivered enterprise features and migration workstreams with product and engineering teams.",
    tags: ["Java", "Eclipse RCP", "Oracle", "IBM Db2"],
    highlights: [
      "Designed and implemented modules within the Eclipse RCP ecosystem.",
      "Supported data migration from Oracle Database to IBM Db2.",
      "Worked with product owners and cross-functional teams on release planning.",
    ],
  },
  {
    title: "MSc in Mobile Computing",
    accent: "rose",
    kind: "education",
    location: "Austria",
    period: "2013-2015",
    role: "University of Applied Sciences",
    narrative:
      "Expanded into communication technologies and mobile systems with international academic exposure.",
    tags: ["Mobile Computing", "Communication Tech", "Distributed Systems"],
    highlights: [
      "Specialized in communication technologies and application systems.",
      "Strengthened distributed systems thinking through coursework and applied projects.",
      "Gained international academic exposure in Austria.",
    ],
  },
  {
    title: "Eurofunk Kappacher GmbH",
    accent: "cyan",
    kind: "work",
    location: "Hagenberg, Austria",
    period: "2015-2018",
    role: "Software Developer - Emergency Response Systems",
    narrative:
      "Built backend services for emergency-response systems where reliability and response time were critical.",
    tags: ["Java", "Spring", "RabbitMQ", "Redis"],
    highlights: [
      "Built backend services for distributed emergency-response workflows.",
      "Implemented Spring APIs to expose secure backend functionality.",
      "Used RabbitMQ and Redis for resilient inter-service messaging.",
    ],
  },
];

const entryKindMeta: Record<
  TimelineEntry["kind"],
  { label: string; icon: LucideIcon; chipClassName: string; markerClassName: string }
> = {
  work: {
    label: "Professional experience",
    icon: BriefcaseBusiness,
    chipClassName:
      "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-700/80 dark:bg-sky-900/30 dark:text-sky-200",
    markerClassName: "bg-sky-500",
  },
  education: {
    label: "Education",
    icon: GraduationCap,
    chipClassName:
      "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-700/80 dark:bg-violet-900/30 dark:text-violet-200",
    markerClassName: "bg-violet-500",
  },
};

export default function ExperienceTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const activeIndexRef = useRef(0);
  const lastProgressRef = useRef(0);

  useEffect(() => {
    let frame = 0;

    const updateActiveItem = () => {
      const viewportFocus = window.innerHeight * 0.42;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;
      const itemMidpoints: number[] = [];
      const itemDistances: number[] = [];

      itemRefs.current.forEach((item, index) => {
        if (!item) {
          return;
        }

        const rect = item.getBoundingClientRect();
        const itemMidpoint = rect.top + rect.height / 2;
        itemMidpoints.push(itemMidpoint);
        const distance = Math.abs(itemMidpoint - viewportFocus);
        itemDistances[index] = distance;

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      const currentIndex = activeIndexRef.current;
      const currentDistance = itemDistances[currentIndex] ?? Number.POSITIVE_INFINITY;
      const shouldSwitch = currentIndex !== closestIndex && closestDistance + 26 < currentDistance;

      if (shouldSwitch || !Number.isFinite(currentDistance)) {
        activeIndexRef.current = closestIndex;
        setActiveIndex(closestIndex);
      }

      const firstMidpoint = itemMidpoints[0];
      const lastMidpoint = itemMidpoints[itemMidpoints.length - 1];

      if (typeof firstMidpoint === "number" && typeof lastMidpoint === "number") {
        const nextProgress =
          firstMidpoint === lastMidpoint
            ? 100
            : Math.min(100, Math.max(0, ((viewportFocus - firstMidpoint) / (lastMidpoint - firstMidpoint)) * 100));

        if (Math.abs(nextProgress - lastProgressRef.current) > 0.2) {
          timelineRef.current?.style.setProperty("--timeline-progress", `${nextProgress}%`);
          lastProgressRef.current = nextProgress;
        }
      }

      frame = 0;
    };

    const requestUpdate = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(updateActiveItem);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const activeEntry = timelineEntries[activeIndex];
  const activeAccentClassName = `timeline-accent-${activeEntry.accent}`;

  return (
    <section
      id="experience"
      className="section-ambient section-ambient-alt border-t border-slate-200 bg-slate-50/60 dark:border-gray-800 dark:bg-slate-950/70"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-sky-700 dark:text-sky-300">
            Career and education journey
          </p>
          <h2 className="heading-gradient mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Unified timeline</h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-gray-400">
            A single chronological view connecting academic foundations and professional delivery milestones.
          </p>
        </div>

        <div ref={timelineRef} className={`experience-timeline ${activeAccentClassName} mt-12 md:mt-14`}>

          <div className="experience-timeline__line" aria-hidden="true" />
          <div className="experience-timeline__line experience-timeline__line--active" aria-hidden="true" />

          <ol className="space-y-12 md:space-y-0">
            {timelineEntries.map((entry, index) => {
              const stateClass =
                index === activeIndex
                  ? "is-active"
                  : index < activeIndex
                    ? "is-past"
                    : "is-upcoming";

              const kindMeta = entryKindMeta[entry.kind];

              return (
                <li
                  key={`${entry.title}-${entry.period}`}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  className={`experience-timeline__item timeline-accent-${entry.accent} ${stateClass}`}
                >
                  <div className="experience-timeline__grid">
                    <div className={`experience-timeline__content ${index % 2 === 0 ? "md:col-start-1" : "md:col-start-3"}`}>
                      <article className="glass-card experience-timeline__card rounded-[1.9rem] p-6 sm:p-8">
                        <div className="experience-timeline__card-shell">
                          <div className="experience-timeline__brand-row">
                            <div className="experience-timeline__brand-mark" aria-hidden="true">
                              <kindMeta.icon className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                            </div>

                            <div className="min-w-0">
                              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-sky-700 dark:text-sky-300">
                                {entry.location}
                              </p>
                              <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">{entry.title}</h3>
                            </div>

                            <span className="experience-timeline__period-chip">{entry.period}</span>
                          </div>

                          <div className="mt-6 flex flex-wrap items-center gap-2">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${kindMeta.chipClassName}`}
                            >
                              <kindMeta.icon className="h-3.5 w-3.5" aria-hidden="true" />
                              {kindMeta.label}
                            </span>
                            <p className="experience-timeline__role text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{entry.role}</p>
                          </div>

                          <p className="experience-timeline__narrative mt-4 text-base leading-7 text-slate-700 dark:text-slate-200">{entry.narrative}</p>

                          <div className="experience-timeline__tag-list mt-6" aria-label={`${entry.title} areas`}>
                            {entry.tags.map((tag) => (
                              <span key={tag} className="experience-timeline__tag">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <ul className="experience-timeline__highlights mt-7 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-gray-300">
                            {entry.highlights.map((point, pointIndex) => (
                              <li key={point} className={`experience-timeline__highlight experience-timeline__highlight--${pointIndex + 1} flex gap-3`}>
                                <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${kindMeta.markerClassName}`} aria-hidden="true" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </article>
                    </div>

                    <div className="experience-timeline__marker-column" aria-hidden="true">
                      <div className="experience-timeline__marker-ring">
                        <div className={`experience-timeline__marker-dot ${kindMeta.markerClassName}`} />
                      </div>
                      <span className="experience-timeline__year">{entry.period}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}