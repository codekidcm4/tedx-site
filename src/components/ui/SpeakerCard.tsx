import Link from "next/link";
import { cn } from "@/lib/utils";
import { SpeakerHeadshot } from "@/components/ui/SpeakerHeadshot";
import type { Speaker } from "@/data/speakers";

interface SpeakerCardProps {
  speaker: Speaker;
  /** "compact" = home-page preview (links to /speakers). "full" = speakers page (bio visible). */
  variant?: "compact" | "full";
  /** Where "Watch the talk" goes (full variant only). Omit to hide the button. */
  watchHref?: string;
  /** Talk length, shown next to the watch button. */
  watchDuration?: string;
  className?: string;
}

function TypeLabel({ type }: { type: Speaker["type"] }) {
  return (
    <span className="inline-block text-[0.6rem] font-bold tracking-[0.15em] uppercase text-[#e62b1e] mb-2">
      {type === "student" ? "Student Speaker" : "Speaker"}
    </span>
  );
}

export function SpeakerCard({ speaker, variant = "full", watchHref, watchDuration, className }: SpeakerCardProps) {
  const hasTalk = Boolean(speaker.talkTitle);

  // ── Compact: image-forward card with an overlay, used in the home preview grid ──
  if (variant === "compact") {
    return (
      <Link
        href="/speakers"
        className={cn(
          "group relative block overflow-hidden border border-[#e0e0e0] aspect-[3/4] transition-all duration-300 hover:border-[#e62b1e]/40 hover:shadow-xl",
          className
        )}
        aria-label={`${speaker.name}, view all speakers`}
      >
        <SpeakerHeadshot src={speaker.image} name={speaker.name} sizes="(max-width: 768px) 50vw, 25vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 z-10 p-5">
          <TypeLabel type={speaker.type} />
          <h3 className="text-white font-bold text-lg leading-snug">{speaker.name}</h3>
          {speaker.role && <p className="text-white/70 text-xs mt-1 line-clamp-2">{speaker.role}</p>}
          {hasTalk && (
            <p className="text-white/60 text-xs mt-2 italic line-clamp-2">&ldquo;{speaker.talkTitle}&rdquo;</p>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e62b1e] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true" />
      </Link>
    );
  }

  // ── Full: headshot on top, name / role / talk / bio visible below ──
  return (
    <article
      id={speaker.id}
      className={cn(
        "group flex h-full flex-col overflow-hidden border border-[#e0e0e0] bg-white scroll-mt-28 transition-all duration-300 hover:border-[#e62b1e]/40 hover:shadow-lg",
        className
      )}
    >
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#f0f0f0]">
        <SpeakerHeadshot src={speaker.image} name={speaker.name} sizes="(max-width: 768px) 50vw, 33vw" />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <TypeLabel type={speaker.type} />
        <h3 className="text-[#0a0a0a] font-bold text-lg leading-snug">{speaker.name}</h3>
        {speaker.role && <p className="text-[#555555] text-sm mt-1">{speaker.role}</p>}
        {hasTalk && (
          <div className="mt-3 border-l-2 border-[#e62b1e] pl-3">
            <p className="text-[0.6rem] font-bold tracking-[0.12em] uppercase text-[#9a9a9a]">Talk</p>
            <p className="text-[#0a0a0a] text-sm font-semibold italic">&ldquo;{speaker.talkTitle}&rdquo;</p>
          </div>
        )}
        {speaker.bio ? (
          <p className="text-[#555555] text-sm leading-relaxed mt-3">{speaker.bio}</p>
        ) : (
          <p className="text-[#9a9a9a] text-sm italic mt-3">Bio coming soon.</p>
        )}
        <div className="mt-auto pt-5">
          {watchHref ? (
            <Link
              href={watchHref}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0a0a0a] text-white text-xs font-bold tracking-wide rounded-sm hover:bg-[#e62b1e] transition-colors duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch the talk
              {watchDuration && <span className="text-white/50 font-semibold tabular-nums">{watchDuration}</span>}
            </Link>
          ) : (
            <div className="w-6 h-0.5 bg-[#e62b1e] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true" />
          )}
        </div>
      </div>
    </article>
  );
}
