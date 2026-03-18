"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { Github, Linkedin } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "Tech Stack", href: "#tech" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    const updateActiveSection = () => {
      // Use a viewport anchor below the sticky navbar so active state tracks the section in focus.
      const viewportAnchor = window.innerHeight * 0.32;
      const currentSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= viewportAnchor && rect.bottom > viewportAnchor;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
        return;
      }

      if (window.scrollY < sections[0].offsetTop) {
        setActiveSection(sections[0].id);
        return;
      }

      const lastSection = sections[sections.length - 1];
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) {
        setActiveSection(lastSection.id);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
        <a
          href="#hero"
          title="Senior Backend Engineer"
          className="flex flex-col leading-tight text-slate-900 dark:text-white"
        >
          <span className="text-xl font-bold tracking-wide">Shrikant Havale</span>
          <span className="text-xs font-medium tracking-wide text-slate-500 dark:text-gray-400">Senior Backend Engineer</span>
        </a>
        <nav className="hidden items-center gap-4 text-[13px] font-medium text-slate-600 lg:gap-5 lg:text-sm md:flex dark:text-slate-200">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.slice(1);

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-sky-500 after:transition-transform after:duration-200 ${
                  isActive
                    ? "text-slate-900 after:scale-x-100 dark:text-white"
                    : "hover:text-slate-900 after:scale-x-0 dark:hover:text-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://github.com/shrikanthavale"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 bg-white/80 text-slate-700 shadow-sm transition-all duration-200 hover:scale-105 hover:border-sky-500 hover:bg-sky-500 hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:bg-sky-500"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/shrikanthavale/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 bg-white/80 text-slate-700 shadow-sm transition-all duration-200 hover:scale-105 hover:border-sky-500 hover:bg-sky-500 hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:bg-sky-500"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
          </a>
          <ThemeToggle />
          <a
            href="#contact"
            className="rounded-md bg-sky-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm shadow-sky-500/30 transition-all duration-200 hover:scale-105 hover:bg-sky-500 hover:shadow-md hover:shadow-sky-400/40 sm:px-4 sm:py-2 sm:text-sm dark:bg-sky-500 dark:hover:bg-sky-400"
          >
            Let&apos;s talk
          </a>
        </div>
      </div>
    </header>
  );
}
