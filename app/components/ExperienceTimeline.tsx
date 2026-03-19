"use client";

import { useEffect, useRef, useState } from "react";

function BrandMark({ company }: { company: string }) {
  if (company === "Eurofunk Kappacher GmbH") {
    return (
      <svg viewBox="0 0 64 64" className="experience-timeline__brand-svg" aria-hidden="true" focusable="false">
        <rect x="8" y="8" width="48" height="48" rx="16" className="experience-timeline__brand-surface" />
        <path d="M22 24h20M22 32h14M22 40h20" className="experience-timeline__brand-stroke" />
        <circle cx="44" cy="32" r="6" className="experience-timeline__brand-accent" />
      </svg>
    );
  }

  if (company === "Capgemini") {
    return (
      <svg viewBox="0 0 64 64" className="experience-timeline__brand-svg" aria-hidden="true" focusable="false">
        <rect x="8" y="8" width="48" height="48" rx="16" className="experience-timeline__brand-surface" />
        <path d="M21 37c0-7.5 7-13 15-13 5 0 9.5 1.7 12 4.6-1.4 5.8-6.3 11.4-14.4 11.4-5.3 0-9.6-1.5-12.6-3z" className="experience-timeline__brand-accent-fill" />
        <path d="M20 27c2.7-2.2 7.3-3.8 12.2-3.8 4.9 0 9.1 1.5 11.8 4" className="experience-timeline__brand-stroke" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" className="experience-timeline__brand-svg" aria-hidden="true" focusable="false">
      <rect x="8" y="8" width="48" height="48" rx="16" className="experience-timeline__brand-surface" />
      <path d="M21 22h22v6H21zM21 30h14v14H21zM39 30h4v14h-4z" className="experience-timeline__brand-accent-fill" />
      <path d="M21 22h22M28 30v14M21 37h14" className="experience-timeline__brand-stroke" />
    </svg>
  );
}

const experiences = [
  {
    company: "Eurofunk Kappacher GmbH",
    accent: "cyan",
    location: "Hagenberg, Austria",
    period: "2015-2018",
    role: "Software Developer - Operation Control and Management Systems",
    narrative: "Built distributed emergency-response capabilities where reliability, response time, and operational clarity mattered at system scale.",
    technologies: ["Java", "Spring", "RabbitMQ", "Redis", "Robot Framework"],
    highlights: [
      "Built backend services for distributed emergency-response workflows.",
      "Implemented Spring-based APIs to expose secure backend functionality.",
      "Used RabbitMQ and Redis for resilient inter-service messaging and communication.",
      "Automated integration tests with Robot Framework, reducing manual testing effort by 50%.",
    ],
  },
  {
    company: "Capgemini",
    accent: "amber",
    location: "Mumbai, India",
    period: "2012-2013",
    role: "Consultant - Post Sales Car Maintenance Application",
    narrative: "Worked on enterprise product delivery with migration-heavy workflows, balancing feature planning, compatibility, and data movement.",
    technologies: ["Java", "Eclipse RCP", "Oracle", "IBM Db2", "Product Delivery"],
    highlights: [
      "Designed and implemented modules compatible with the Eclipse RCP ecosystem.",
      "Supported data migration from Oracle Database to IBM Db2.",
      "Worked with product owners and cross-functional teams on feature and design planning.",
    ],
  },
  {
    company: "Infosys Technologies Limited",
    accent: "rose",
    location: "Pune, India",
    period: "2008-2012",
    role: "System Engineer - Admin Console for Customer Care Application",
    narrative: "Focused on simplifying internal operations by reshaping complex admin tooling into something support teams could use with less friction.",
    technologies: ["Java", "Admin Systems", "Support Tooling", "UX Simplification"],
    highlights: [
      "Remodeled an admin console to simplify system behavior management.",
      "Reduced operational complexity and reliance on specialized database handling skills.",
      "Lowered training overhead by improving usability for support teams.",
    ],
  },
];

const progressClassNames = ["timeline-progress-0", "timeline-progress-50", "timeline-progress-100"];

export default function ExperienceTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    let frame = 0;

    const updateActiveItem = () => {
      const viewportFocus = window.innerHeight * 0.42;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((item, index) => {
        if (!item) {
          return;
        }

        const rect = item.getBoundingClientRect();
        const itemMidpoint = rect.top + rect.height / 2;
        const distance = Math.abs(itemMidpoint - viewportFocus);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex((currentIndex) => (currentIndex === closestIndex ? currentIndex : closestIndex));
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

  const activeExperience = experiences[activeIndex];
  const progressClassName = progressClassNames[activeIndex] ?? progressClassNames[progressClassNames.length - 1];
  const activeAccentClassName = `timeline-accent-${activeExperience.accent}`;

  return (
    <section
      id="experience"
      className="section-ambient section-ambient-alt border-t border-slate-200 bg-slate-50/60 dark:border-gray-800 dark:bg-slate-950/70"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-sky-700 dark:text-sky-300">Career path</p>
          <h2 className="heading-gradient mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Experience timeline</h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-gray-400">
            A more editorial view of the roles, systems, and outcomes across the last few chapters of my engineering work.
          </p>
        </div>

        <div className={`experience-timeline ${progressClassName} ${activeAccentClassName} mt-14 md:mt-18`}>
          <div className={`experience-timeline__sticky-badge ${activeAccentClassName}`} aria-live="polite">
            <span className="experience-timeline__sticky-label">Now reading</span>
            <strong className="experience-timeline__sticky-period">{activeExperience.period}</strong>
            <span className="experience-timeline__sticky-company">{activeExperience.company}</span>
          </div>

          <div className="experience-timeline__line" aria-hidden="true" />
          <div className="experience-timeline__line experience-timeline__line--active" aria-hidden="true" />

          <ol className="space-y-12 md:space-y-0">
            {experiences.map((item, index) => {
              const stateClass =
                index === activeIndex
                  ? "is-active"
                  : index < activeIndex
                    ? "is-past"
                    : "is-upcoming";

              return (
                <li
                  key={`${item.company}-${item.period}`}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  className={`experience-timeline__item timeline-accent-${item.accent} ${stateClass}`}
                >
                  <div className="experience-timeline__grid">
                    <div className={`experience-timeline__content ${index % 2 === 0 ? "md:col-start-1" : "md:col-start-3"}`}>
                      <article className="glass-card experience-timeline__card rounded-[1.9rem] p-6 sm:p-8 md:sticky md:top-36">
                        <div className="experience-timeline__card-shell">
                          <div className="experience-timeline__brand-row">
                            <div className="experience-timeline__brand-mark" aria-hidden="true">
                              <BrandMark company={item.company} />
                            </div>

                            <div className="min-w-0">
                              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-sky-700 dark:text-sky-300">
                                {item.location}
                              </p>
                              <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">{item.company}</h3>
                            </div>

                            <span className="experience-timeline__period-chip">{item.period}</span>
                          </div>

                          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                            {item.role}
                          </p>

                          <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-200">{item.narrative}</p>

                          <div className="experience-timeline__tag-list mt-6" aria-label={`${item.company} technologies`}>
                            {item.technologies.map((technology) => (
                              <span key={technology} className="experience-timeline__tag">
                                {technology}
                              </span>
                            ))}
                          </div>

                          <ul className="mt-7 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-gray-300">
                            {item.highlights.map((point, pointIndex) => (
                              <li key={point} className={`experience-timeline__highlight experience-timeline__highlight--${pointIndex + 1} flex gap-3`}>
                                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400" aria-hidden="true" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </article>
                    </div>

                    <div className="experience-timeline__marker-column" aria-hidden="true">
                      <div className="experience-timeline__marker-ring">
                        <div className="experience-timeline__marker-dot" />
                      </div>
                      <span className="experience-timeline__year">{item.period}</span>
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