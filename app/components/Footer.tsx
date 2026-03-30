import Link from "next/link";
import { Code2, TerminalSquare } from "lucide-react";
import { siteConfig } from "@/app/site.config";
import { GithubIcon, LinkedinIcon } from "@/app/components/BrandIcons";

const iconMap = { Github: GithubIcon, Linkedin: LinkedinIcon, Code2, TerminalSquare };

export default function Footer() {
  const { person, social, footer } = siteConfig;

  return (
    <footer id="contact" className="section-ambient section-ambient-alt border-t border-slate-200 bg-slate-100 dark:border-gray-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div>
          <div>
            <h3 className="heading-gradient text-xl font-bold sm:text-2xl">Quick links</h3>
            <div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-3">
              {footer.quickLinks.map((group) => (
                <div key={group.heading}>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{group.heading}</p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-gray-400">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        {link.href.startsWith("#") ? (
                          <a className="text-link-subtle hover:text-slate-900 dark:hover:text-slate-100" href={link.href}>
                            {link.label}
                          </a>
                        ) : (
                          <Link className="text-link-subtle hover:text-slate-900 dark:hover:text-slate-100" href={link.href}>
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Social</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-gray-400">
                  {social.map((s) => {
                    const Icon = iconMap[s.icon as keyof typeof iconMap];
                    return (
                      <li key={s.label}>
                        <a
                          className="inline-flex items-center gap-2 whitespace-nowrap transition-colors hover:text-slate-900 dark:hover:text-slate-100"
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          {s.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-300 pt-6 text-center text-sm text-slate-500 dark:border-slate-800">
          <p>© {new Date().getFullYear()} {person.name}. {footer.copyright}</p>
          <p className="mt-1">
            ⭐ Like this portfolio? Build yours →{" "}
            <a
              href={footer.templateRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:underline dark:text-indigo-400"
            >
              Use the template
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
