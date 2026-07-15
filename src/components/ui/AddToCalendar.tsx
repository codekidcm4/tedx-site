import { siteConfig } from "@/data/site";

// All-day entry for Aug 22, 2026 (doors/start times are not finalized; update to timed values
// here and in /public/tedxhuntingvalley.ics once confirmed).
const GOOGLE_CAL_URL = (() => {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "TEDxHuntingValley",
    dates: "20260822/20260823",
    details:
      "The Invisible Engine: The Forces We Forget. Cleveland's first independent community TEDx in over a decade. Twelve voices on one stage. https://tedxhuntingvalley.com",
    location: `${siteConfig.venue}, ${siteConfig.addressFull}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
})();

const CalIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

interface AddToCalendarProps {
  theme?: "dark" | "light";
}

export function AddToCalendar({ theme = "light" }: AddToCalendarProps) {
  const dark = theme === "dark";
  const base =
    "inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-sm border transition-colors duration-200";
  const styles = dark
    ? "border-white/25 text-white hover:bg-white/10"
    : "border-[#e0e0e0] text-[#0a0a0a] hover:border-[#0a0a0a]";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a href={GOOGLE_CAL_URL} target="_blank" rel="noopener noreferrer" className={`${base} ${styles}`}>
        <CalIcon />
        Google Calendar
      </a>
      <a href="/tedxhuntingvalley.ics" download className={`${base} ${styles}`}>
        <CalIcon />
        Apple / .ics
      </a>
    </div>
  );
}
