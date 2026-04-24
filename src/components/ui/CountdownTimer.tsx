"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: string; // ISO date string e.g. "2026-05-11T23:59:00"
  expiredMessage?: string;
  /** "banner" = tight single-line for the apply banner; "hero" = subtle for the hero; "block" = large display */
  variant?: "banner" | "hero" | "block";
}

function getTimeLeft(targetDate: string): TimeLeft | null {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function CountdownTimer({
  targetDate,
  expiredMessage = "Deadline passed",
  variant = "block",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft(targetDate));
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) return null;

  if (!timeLeft) {
    return (
      <span className="text-sm font-bold text-white/60">{expiredMessage}</span>
    );
  }

  if (variant === "banner") {
    return (
      <span className="font-mono font-bold text-white tabular-nums">
        {timeLeft.days}d {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m{" "}
        {pad(timeLeft.seconds)}s
      </span>
    );
  }

  if (variant === "hero") {
    return (
      <div className="flex items-center gap-4 text-white/50 text-xs">
        <span className="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-white/30">
          Event in
        </span>
        {[
          { val: timeLeft.days, unit: "days" },
          { val: timeLeft.hours, unit: "hrs" },
          { val: timeLeft.minutes, unit: "min" },
          { val: timeLeft.seconds, unit: "sec" },
        ].map(({ val, unit }) => (
          <div key={unit} className="flex items-baseline gap-1">
            <span className="font-mono font-bold text-white/70 text-sm tabular-nums">
              {pad(val)}
            </span>
            <span className="text-[0.55rem] uppercase tracking-widest text-white/30">
              {unit}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // block variant
  return (
    <div className="grid grid-cols-4 gap-3 md:gap-4">
      {[
        { val: timeLeft.days, unit: "Days" },
        { val: timeLeft.hours, unit: "Hours" },
        { val: timeLeft.minutes, unit: "Min" },
        { val: timeLeft.seconds, unit: "Sec" },
      ].map(({ val, unit }) => (
        <div
          key={unit}
          className="bg-[#111111] border border-[#222222] p-4 md:p-5 text-center"
        >
          <p className="font-mono font-black text-white tabular-nums"
             style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", lineHeight: 1 }}>
            {pad(val)}
          </p>
          <p className="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-[#9a9a9a] mt-2">
            {unit}
          </p>
        </div>
      ))}
    </div>
  );
}
