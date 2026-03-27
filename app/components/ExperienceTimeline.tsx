"use client";

import { BriefcaseBusiness, GraduationCap, MapPin, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type TimelineEntry = {
  title: string;
  accent: "cyan" | "amber" | "rose";
  kind: "work" | "education";
  stage: string;
  location: string;
  period: string;
  role: string;
  narrative: string;
  tags: string[];
  highlights: string[];
};

const timelineEntries: TimelineEntry[] = [
  {
    title: "Secondary Certificate Examination (10th Standard)",
    accent: "rose",
    kind: "education",
    stage: "School Foundation",
    location: "Kalwa, India",
    period: "2001-2002",
    role: "New English School Kalwa",
    narrative:
      "Completed secondary education with strong results and built a disciplined foundation for technical learning.",
    tags: ["Secondary Education", "Science", "Mathematics"],
    highlights: [
      "Achieved 83% in the Secondary Certificate Examination.",
      "Built early strength in analytical and quantitative subjects.",
      "Established a strong base for engineering-focused studies.",
    ],
  },
  {
    title: "Higher Secondary Education (Science)",
    accent: "rose",
    kind: "education",
    stage: "Pre-Engineering",
    location: "Thane, India",
    period: "2002-2004",
    role: "New English Junior College",
    narrative:
      "Focused on science-stream coursework to prepare for formal engineering education and analytical problem-solving.",
    tags: ["Higher Secondary", "Science", "Pre-Engineering"],
    highlights: [
      "Completed higher secondary education with 75% marks.",
      "Focused on core science subjects relevant to engineering pathways.",
      "Prepared for undergraduate computer engineering curriculum.",
    ],
  },
  {
    title: "Bachelor's Degree in Computer Engineering",
    accent: "rose",
    kind: "education",
    stage: "Undergraduate Engineering",
    location: "Mumbai, India",
    period: "2004-2008",
    role: "Mumbai University",
    narrative:
      "Completed core computer engineering training and built a strong base in software development fundamentals.",
    tags: ["Computer Engineering", "Software Engineering", "Programming"],
    highlights: [
      "Graduated with 71% and consistent academic performance.",
      "Built engineering fundamentals across programming, systems, and software design.",
      "Developed a practical base for backend and enterprise application development.",
    ],
  },
  {
    title: "Infosys",
    accent: "amber",
    kind: "work",
    stage: "Early Career",
    location: "Pune, India",
    period: "2008-2011",
    role: "Software Developer",
    narrative:
      "Started as a software trainee in Java technologies and progressed into enterprise software delivery.",
    tags: ["Java", "Training", "Enterprise Projects"],
    highlights: [
      "Completed foundational training in advanced Java and enterprise development practices.",
      "Contributed to multiple project workstreams across the software delivery lifecycle.",
      "Built core engineering discipline in coding standards, testing, and collaboration.",
    ],
  },
  {
    title: "Amdocs",
    accent: "cyan",
    kind: "work",
    stage: "Product Customization",
    location: "Pune, India",
    period: "2011-2012",
    role: "Software Developer",
    narrative:
      "Customized product-based solutions to address customer-specific requirements in telecom systems.",
    tags: ["Java", "Customization", "Product Engineering"],
    highlights: [
      "Implemented customer-specific adaptations for existing enterprise product modules.",
      "Worked with functional teams to translate requirements into software changes.",
      "Maintained delivery quality while working with evolving product constraints.",
    ],
  },
  {
    title: "Health and Well-being",
    accent: "amber",
    kind: "work",
    stage: "Career Break",
    location: "Pune, India",
    period: "2012",
    role: "Career Break",
    narrative:
      "Took a short planned break for recovery after a leg injury, then returned to full-time software development.",
    tags: ["Recovery", "Resilience", "Career Continuity"],
    highlights: [
      "Focused on recovery from a broken left femur bone.",
      "Returned to engineering with renewed long-term focus.",
      "Resumed career momentum toward enterprise backend roles.",
    ],
  },
  {
    title: "Capgemini",
    accent: "cyan",
    kind: "work",
    stage: "Enterprise Delivery",
    location: "Mumbai, India",
    period: "2012-2013",
    role: "Software Developer",
    narrative:
      "Delivered software development, configuration, and release management for J2EE enterprise applications.",
    tags: ["Java", "J2EE", "Release Management"],
    highlights: [
      "Developed and configured enterprise application modules in the Java/J2EE stack.",
      "Supported release activities to improve deployment consistency.",
      "Worked across development and configuration tasks in a delivery-focused team.",
    ],
  },
  {
    title: "Master's Degree in Mobile Computing",
    accent: "rose",
    kind: "education",
    stage: "Advanced Specialization",
    location: "Hagenberg, Austria",
    period: "2013-2015",
    role: "Hagenberg Campus - FH Upper Austria",
    narrative:
      "Specialized in mobile computing and communication systems while gaining international academic and engineering exposure.",
    tags: ["Mobile Computing", "Engineering", "Communication Systems"],
    highlights: [
      "Graduated with a 1.29 grade, reflecting strong graduate performance.",
      "Deepened systems thinking through advanced mobile and communication-focused coursework.",
      "Expanded technical and cultural perspective through graduate study in Austria.",
    ],
  },
  {
    title: "NTS Retail",
    accent: "amber",
    kind: "work",
    stage: "Summer Internship",
    location: "Linz, Austria",
    period: "2014",
    role: "Summer Intern",
    narrative:
      "Built and configured system and integration testing frameworks using modern testing approaches.",
    tags: ["Internship", "Integration Testing", "Automation"],
    highlights: [
      "Configured system and integration testing workflows for application validation.",
      "Worked with modern testing tooling during a focused internship period.",
      "Gained practical experience in test engineering in an enterprise context.",
    ],
  },
  {
    title: "ETM Professional Control",
    accent: "amber",
    kind: "work",
    stage: "Quality Engineering",
    location: "Linz, Austria",
    period: "2015",
    role: "Software Test Engineer (Part-Time)",
    narrative:
      "Validated control script framework behavior through focused testing and structured bug tracking.",
    tags: ["Software Testing", "Bug Tracking", "Quality"],
    highlights: [
      "Tested control script framework capabilities in a part-time engineering role.",
      "Improved product reliability through structured defect discovery and tracking.",
      "Strengthened practical quality engineering and validation practices.",
    ],
  },
  {
    title: "Eurofunk Kappacher GmbH",
    accent: "cyan",
    kind: "work",
    stage: "Critical Systems",
    location: "Hagenberg, Austria",
    period: "2015-2018",
    role: "Software Developer",
    narrative:
      "Built backend services for emergency-response systems where reliability and response time were critical.",
    tags: ["Java", "Spring Boot", "RabbitMQ", "Redis", "Robot Framework"],
    highlights: [
      "Built distributed backend services for emergency-response systems.",
      "Implemented secure Spring APIs for operator-facing capabilities.",
      "Automated integration testing with Robot Framework, Cypress, and API suites.",
    ],
  },
  {
    title: "Eurofunk Kappacher GmbH",
    accent: "cyan",
    kind: "work",
    stage: "Independent Delivery",
    location: "Pune, India (Remote)",
    period: "2018-Present",
    role: "Software Developer (Freelance)",
    narrative:
      "Continued delivering distributed emergency-response backend systems remotely, with focus on reliability and practical engineering outcomes.",
    tags: ["Spring", "Microservices", "RabbitMQ", "Redis", "Remote Delivery"],
    highlights: [
      "Delivered backend features for real-world emergency operation workflows.",
      "Implemented microservice communication patterns with RabbitMQ and Redis.",
      "Sustained long-term freelance delivery for mission-critical domains.",
    ],
  },
];

const timelineEntriesLatestFirst = [...timelineEntries].reverse();

const entryKindMeta: Record<
  TimelineEntry["kind"],
  { label: string; icon: LucideIcon; chipClassName: string; markerClassName: string }
> = {
  work: {
    label: "Experience",
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
      const lastMidpoint = itemMidpoints.at(-1);

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

      frame = globalThis.requestAnimationFrame(updateActiveItem);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame !== 0) {
        globalThis.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const activeEntry = timelineEntriesLatestFirst[activeIndex];
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
          <h2 className="heading-gradient mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Career Journey</h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-gray-400">
            From academic foundations to building real-world systems at scale.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base dark:text-slate-400">
            {"Foundation -> Enterprise systems -> Distributed depth -> Mission-critical delivery."}
          </p>
        </div>

        <div ref={timelineRef} className={`experience-timeline ${activeAccentClassName} mt-12 md:mt-14`}>

          <div className="experience-timeline__line" aria-hidden="true" />
          <div className="experience-timeline__line experience-timeline__line--active" aria-hidden="true" />

          <ol className="space-y-12 md:space-y-0">
            {timelineEntriesLatestFirst.map((entry, index) => {
              const visibleHighlights = entry.highlights.slice(0, 3);
              const visibleTags = entry.tags.slice(0, 5);
              const hiddenTagCount = entry.tags.length - visibleTags.length;

              let stateClass: string;
              if (index === activeIndex) {
                stateClass = "is-active";
              } else if (index < activeIndex) {
                stateClass = "is-past";
              } else {
                stateClass = "is-upcoming";
              }

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
                              <kindMeta.icon className="h-4.5 w-4.5 text-slate-700 dark:text-slate-200" />
                            </div>

                            <div className="min-w-0">
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">{entry.title}</h3>
                              <div className="mt-1 flex flex-wrap items-center gap-2">
                                <p className="experience-timeline__role text-base font-medium text-slate-600 dark:text-slate-300">{entry.role}</p>
                                <span className="inline-flex items-center rounded-full border border-slate-300/85 bg-white/75 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
                                  {entry.stage}
                                </span>
                              </div>
                              <p className="mt-1.5 flex items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-sky-700 dark:text-sky-300">
                                <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                                {entry.location}
                              </p>
                              <span
                                className={`mt-2 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] ${kindMeta.chipClassName}`}
                              >
                                <kindMeta.icon className="h-3 w-3" aria-hidden="true" />
                                {kindMeta.label}
                              </span>
                            </div>

                            </div>

                          <p className="experience-timeline__summary mt-5 text-[0.98rem] font-semibold leading-6 text-slate-800 dark:text-slate-100">{entry.narrative}</p>

                          <div className="experience-timeline__tag-list mt-6" aria-label={`${entry.title} areas`}>
                            {visibleTags.map((tag) => (
                              <span key={tag} className="experience-timeline__tag">
                                {tag}
                              </span>
                            ))}
                            {hiddenTagCount > 0 && <span className="experience-timeline__tag">+{hiddenTagCount}</span>}
                          </div>

                          <ul className="experience-timeline__highlights mt-7 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-gray-300">
                            {visibleHighlights.map((point, pointIndex) => (
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