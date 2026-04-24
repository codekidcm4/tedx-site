"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0a0a0a]"
      aria-label="Hero section"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #e62b1e 0%, transparent 50%), radial-gradient(circle at 80% 20%, #e62b1e 0%, transparent 40%)`,
        }}
        aria-hidden="true"
      />

      {/* Vertical rule accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e62b1e]"
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 w-full pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="max-w-4xl">
          {/* Event badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
            <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">
              TEDxHuntingValley &mdash; August 22, 2026
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-white font-extrabold mb-6 leading-[1.0]"
            style={{ fontSize: "clamp(2.75rem, 8vw, 6rem)", letterSpacing: "-0.03em" }}
          >
            The Invisible Engine:{" "}
            <span className="text-[#e62b1e]">The Forces We Forget</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/65 text-lg md:text-xl leading-relaxed max-w-2xl mb-10"
          >
            Cleveland&apos;s first independent community TEDx in over a decade. Student and adult
            speakers. One stage. Ideas that reach 44 million people.
          </motion.p>

          {/* Event info row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-12 text-sm text-white/55"
          >
            <span>August 22, 2026</span>
            <span className="w-px h-3 bg-white/20 hidden sm:block" aria-hidden="true" />
            <span>Gund Auditorium, University School</span>
            <span className="w-px h-3 bg-white/20 hidden sm:block" aria-hidden="true" />
            <span>Hunting Valley, Ohio</span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#e62b1e] text-white font-bold text-sm tracking-wide rounded-sm hover:bg-[#c9231a] transition-all duration-200 shadow-lg shadow-red-900/30"
            >
              Apply to Speak
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold text-sm tracking-wide rounded-sm hover:bg-white/10 transition-all duration-200"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-0.5 h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
