import type { Metadata } from "next";
import Link from "next/link";
import { schedule, scheduleTentative, type ScheduleItem } from "@/data/schedule";
import { siteConfig } from "@/data/site";
import { talkForSpeaker } from "@/data/talks";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "The running order for TEDxHuntingValley on August 22, 2026 at Gund Auditorium, University School, as it happened: a student session and an adult session, twelve talks in all, every one now online.",
  alternates: { canonical: "/schedule" },
};

const KIND_LABEL: Record<ScheduleItem["kind"], string> = {
  opening: "Opening",
  talk: "Talk",
  performance: "Performance",
  break: "Break",
  closing: "Closing",
};

function ItemRow({ item }: { item: ScheduleItem }) {
  const muted = item.kind !== "talk";
  const talk = item.speakerId ? talkForSpeaker(item.speakerId) : undefined;
  return (
    <li className="flex gap-4 md:gap-6 py-4 border-t border-[#eee]">
      <div className="w-24 md:w-32 shrink-0">
        <span className={`text-sm font-semibold tabular-nums ${item.time ? "text-[#0a0a0a]" : "text-[#9a9a9a]"}`}>
          {item.time ?? "TBA"}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className={`font-semibold ${muted ? "text-[#777777]" : "text-[#0a0a0a]"}`}>{item.title}</span>
          <span className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[#b0b0b0]">
            {KIND_LABEL[item.kind]}
          </span>
        </div>
        {item.detail && <p className="text-sm text-[#777777] mt-0.5 italic">&ldquo;{item.detail}&rdquo;</p>}
      </div>
      {talk && (
        <div className="shrink-0 self-center">
          <Link
            href={`/talks#${talk.speakerId}`}
            className="inline-flex items-center gap-1.5 text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[#e62b1e] hover:underline"
            aria-label={`Watch ${item.title}'s talk`}
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch
            <span className="hidden sm:inline text-[#b0b0b0] font-semibold normal-case tracking-normal tabular-nums">{talk.duration}</span>
          </Link>
        </div>
      )}
    </li>
  );
}

export default function SchedulePage() {
  return (
    <>
      <div className="bg-[#0a0a0a] pt-32 pb-14 md:pt-40 md:pb-16 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#e62b1e]" aria-hidden="true" />
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
          <span className="inline-flex items-center gap-3 mb-6">
            <span className="inline-block w-8 h-0.5 bg-[#e62b1e]" aria-hidden="true" />
            <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[#e62b1e]">Schedule</span>
          </span>
          <h1
            className="text-white font-extrabold mb-5 max-w-3xl"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em", lineHeight: 1.0 }}
          >
            The day, as it happened.
          </h1>
          <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
            {siteConfig.date} at {siteConfig.venueName}, {siteConfig.school}. Doors at 12:30, six
            student talks, an intermission and reception, then six adult talks. Every talk below
            links to its recording.
          </p>
        </div>
      </div>

      <section className="bg-white py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-8 lg:px-12">
          {scheduleTentative && (
            <div className="mb-10 flex items-start gap-3 rounded-sm border border-[#f0d9d6] bg-[#fdf3f2] p-4">
              <span className="mt-1 w-2 h-2 rounded-full bg-[#e62b1e] shrink-0" aria-hidden="true" />
              <p className="text-sm text-[#7a2b25] leading-relaxed">
                This is the draft running order. Times may shift slightly, and talk titles are added
                here as each speaker confirms.
              </p>
            </div>
          )}

          <div className="space-y-14">
            {schedule.map((session) => (
              <div key={session.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-2xl font-extrabold text-[#0a0a0a]">{session.name}</h2>
                  <span className="text-sm font-semibold text-[#777777] tabular-nums">
                    {session.window ?? "Time to be announced"}
                  </span>
                </div>
                <p className="text-xs text-[#9a9a9a] mb-2">Admission was by {session.ticket}</p>
                <ul>
                  {session.items.map((item, i) => (
                    <ItemRow key={`${session.id}-${i}`} item={item} />
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 pt-10 border-t border-[#eee]">
            <p className="text-[#555555] mb-4">Missed it, or want to see it again? The whole day is online.</p>
            <Link
              href="/talks"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#e62b1e] text-white font-bold text-sm rounded-sm hover:bg-[#c9231a] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch the talks
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
