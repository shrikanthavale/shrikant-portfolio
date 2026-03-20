"use client";

import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { Github, Linkedin, Mail } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  message: string;
  website: string;
  turnstileToken: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
  website: "",
  turnstileToken: "",
};

export default function ContactSection() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (turnstileSiteKey && !form.turnstileToken) {
      setStatus("error");
      setStatusMessage("Please complete the anti-spam check.");
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setStatusMessage(payload.message ?? "Unable to send your message. Please try again.");
        return;
      }

      setStatus("success");
      setStatusMessage("Thanks for reaching out. I will get back to you within 24 hours.");
      setForm(initialState);
    } catch {
      setStatus("error");
      setStatusMessage("Something went wrong while sending your message. Please try again.");
    }
  };

  return (
    <section id="contact" className="section-ambient border-t border-slate-200 bg-white/85 dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-sky-700 dark:text-sky-300">Drop me a line</p>
          <h2 className="heading-gradient mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Let&apos;s build scalable systems together</h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-slate-300">
            I specialize in backend engineering, distributed systems, and event-driven architecture for resilient and high-scale products.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contact-form"
              className="inline-flex items-center rounded-md bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-sky-500/30 transition-all duration-200 hover:scale-[1.03] hover:shadow-md hover:shadow-sky-400/40"
            >
              Contact Me
            </a>
            <a
              href="/Havale_Shrikant.pdf"
              download
              className="inline-flex items-center rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:scale-[1.03] hover:border-sky-500 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:text-sky-300"
            >
              Download Resume
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <div>
            <form
              id="contact-form"
              onSubmit={onSubmit}
              className="glass-card rounded-2xl border border-slate-200 p-6 shadow-sm backdrop-blur-sm dark:border-slate-800"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-1">
                  <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Your name</span>
                  <input
                    required
                    maxLength={80}
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-sky-400"
                  />
                </label>

                <label className="sm:col-span-1">
                  <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Your email</span>
                  <input
                    required
                    type="email"
                    maxLength={120}
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-sky-400"
                  />
                </label>

                <label className="sm:col-span-2">
                  <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Message</span>
                  <textarea
                    required
                    rows={6}
                    maxLength={3000}
                    value={form.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    className="w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-sky-400"
                  />
                </label>

                {/* Honeypot field for basic bot filtering */}
                <label className="hidden" aria-hidden="true">
                  Website
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(event) => updateField("website", event.target.value)}
                  />
                </label>

                {turnstileSiteKey && (
                  <div className="sm:col-span-2">
                    <Turnstile
                      siteKey={turnstileSiteKey}
                      onSuccess={(token: string) => updateField("turnstileToken", token)}
                      onExpire={() => updateField("turnstileToken", "")}
                      onError={() => updateField("turnstileToken", "")}
                      options={{ theme: "auto", size: "normal" }}
                    />
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center rounded-md bg-gradient-to-r from-sky-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-sky-500/30 transition-all duration-200 hover:scale-[1.03] hover:shadow-md hover:shadow-sky-400/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <>
                      <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
                <p className="text-xs text-slate-500 dark:text-slate-400">Usually responds within 24 hours</p>
              </div>

              {status !== "idle" && (
                <p
                  className={`mt-3 text-sm ${
                    status === "success"
                      ? "text-emerald-700 dark:text-emerald-300"
                      : status === "error"
                        ? "text-rose-700 dark:text-rose-300"
                        : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {statusMessage}
                </p>
              )}
            </form>
          </div>

          <aside className="glass-card rounded-2xl border border-slate-200 p-6 shadow-sm backdrop-blur-sm dark:border-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Contact Information</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Open to backend engineering roles and system design opportunities.
            </p>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href="mailto:shrikant.havale@yahoo.com"
                  className="inline-flex items-center gap-2 text-slate-700 transition-colors hover:text-sky-700 dark:text-slate-200 dark:hover:text-sky-300"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  shrikant.havale@yahoo.com
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/shrikanthavale"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-700 transition-colors hover:text-sky-700 dark:text-slate-200 dark:hover:text-sky-300"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  github.com/shrikanthavale
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/shrikanthavale/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-700 transition-colors hover:text-sky-700 dark:text-slate-200 dark:hover:text-sky-300"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  linkedin.com/in/shrikanthavale
                </a>
              </li>
            </ul>
          </aside>
        </div>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white/70 p-4 text-center text-sm font-medium text-slate-700 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200">
          9+ years experience • Distributed systems • Event-driven architecture
        </div>
      </div>
    </section>
  );
}
