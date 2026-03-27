"use client";

import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { Github, Linkedin } from "lucide-react";

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
  const canSubmit = status !== "submitting" && (!turnstileSiteKey || Boolean(form.turnstileToken));

  const updateField = (field: keyof FormState, value: string) => {
    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
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

  const statusClass =
    status === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-900/20 dark:text-emerald-300"
      : status === "error"
        ? "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/70 dark:bg-rose-900/20 dark:text-rose-300"
        : "border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400";

  return (
    <section id="contact" className="section-ambient border-t border-slate-200 bg-white/85 dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="heading-gradient text-3xl font-bold tracking-tight sm:text-5xl">Let&apos;s build scalable systems together</h2>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg sm:leading-9 dark:text-gray-400">
            I design resilient backend systems, distributed architectures, and high-throughput event-driven platforms.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
          <div className="lg:order-2">
            <div className="mt-6 rounded-xl border border-slate-200 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-900/40">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">To help me respond faster, please include:</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                <li>- Project context or role details</li>
                <li>- Expected timeline</li>
                <li>- Relevant links or references</li>
              </ul>
            </div>

            <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="/Havale_Shrikant.pdf"
                download
                className="inline-flex w-full items-center justify-center rounded-md bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-sky-500/30 transition-all duration-200 hover:scale-[1.03] hover:shadow-md hover:shadow-sky-400/40 sm:w-auto"
              >
                Download Resume
              </a>
              <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:items-center">
                <a
                  href="https://github.com/shrikanthavale"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:scale-[1.03] hover:border-sky-500 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:text-sky-300 sm:w-auto"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/shrikanthavale/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:scale-[1.03] hover:border-sky-500 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:text-sky-300 sm:w-auto"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:order-1 lg:border-r lg:border-slate-200/70 lg:pr-10 dark:lg:border-slate-800/80">
            <form
              id="contact-form"
              onSubmit={onSubmit}
              className="glass-card rounded-2xl border border-slate-200 p-6 shadow-sm shadow-sky-950/10 backdrop-blur-sm dark:border-slate-800"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-1">
                  <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Your name</span>
                  <input
                    required
                    maxLength={80}
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none ring-0 transition-all duration-200 focus:border-sky-500 focus:shadow-[0_0_0_4px_rgba(14,165,233,0.12)] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-sky-400 dark:focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12)]"
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
                    className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none ring-0 transition-all duration-200 focus:border-sky-500 focus:shadow-[0_0_0_4px_rgba(14,165,233,0.12)] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-sky-400 dark:focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12)]"
                  />
                </label>

                <label className="sm:col-span-2">
                  <span className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Message</span>
                  <textarea
                    required
                    rows={6}
                    maxLength={3000}
                    placeholder="Tell me a bit about the project, role, or problem you want to discuss."
                    value={form.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    className="min-h-40 w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-3 text-sm text-slate-700 outline-none ring-0 transition-all duration-200 placeholder:text-slate-400 focus:border-sky-500 focus:shadow-[0_0_0_4px_rgba(14,165,233,0.12)] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-sky-400 dark:focus:shadow-[0_0_0_4px_rgba(56,189,248,0.12)]"
                  />
                </label>

                {/* Honeypot field for basic bot filtering */}
                <label className="hidden" aria-hidden="true">
                  Website{" "}
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

              <div className="mt-5 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                <button
                  type="submit"
                  disabled={!canSubmit}
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
                    "Send message"
                  )}
                </button>
                <p className="text-xs text-slate-500 dark:text-slate-400">Usually responds within 24 hours</p>
              </div>

              {status !== "idle" && (
                <p
                  role="status"
                  aria-live="polite"
                  className={`mt-3 rounded-md border px-3 py-2 text-sm ${statusClass}`}
                >
                  {statusMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
