"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site";

interface NotifyFormProps {
  /** mailto subject line used when no configuredUrl is set. */
  subject: string;
  /** Button / submit label. */
  cta: string;
  /** Shown after a successful submit. */
  successMessage: string;
  /**
   * When set (e.g. a Google Form or ticketing URL in siteConfig), the form becomes a single
   * button that links straight to it. When null, it captures an email and composes a message
   * to the organizers as a no-backend fallback. Swapping the config value flips it live.
   */
  configuredUrl?: string | null;
  /** Accent theme for placement on dark vs light backgrounds. */
  theme?: "dark" | "light";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NotifyForm({ subject, cta, successMessage, configuredUrl, theme = "dark" }: NotifyFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const dark = theme === "dark";
  const fieldId = `notify-${subject.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
  const inputClasses = dark
    ? "bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-white/60"
    : "bg-white border-[#e0e0e0] text-[#0a0a0a] placeholder-[#9a9a9a] focus:border-[#e62b1e]";

  // Configured endpoint: render a direct link button (real list / ticketing).
  if (configuredUrl) {
    return (
      <a
        href={configuredUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e62b1e] text-white font-bold text-sm tracking-wide rounded-sm hover:bg-[#c9231a] transition-colors duration-200"
      >
        {cta}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setError(true);
      return;
    }
    setError(false);
    const body = `Please add me to the TEDxHuntingValley list.%0D%0A%0D%0AEmail: ${encodeURIComponent(
      email
    )}`;
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p
        className={dark ? "text-white/80 text-sm leading-relaxed" : "text-[#555555] text-sm leading-relaxed"}
        role="status"
        aria-live="polite"
      >
        {successMessage} Your email app should open with a message ready to send to{" "}
        <span className="font-semibold">{siteConfig.email}</span>. If it does not, write to us there directly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md" noValidate>
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor={fieldId} className="sr-only">
          Email address
        </label>
        <input
          id={fieldId}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-invalid={error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className={`flex-1 px-4 py-3 text-sm rounded-sm border outline-none transition-colors duration-200 ${inputClasses}`}
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#e62b1e] text-white font-bold text-sm tracking-wide rounded-sm hover:bg-[#c9231a] transition-colors duration-200 whitespace-nowrap"
        >
          {cta}
        </button>
      </div>
      {error && (
        <p id={`${fieldId}-error`} className="mt-2 text-xs text-[#e62b1e] font-semibold" role="alert">
          Please enter a valid email address.
        </p>
      )}
    </form>
  );
}
