import Link from "next/link";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { speakers } from "@/data/speakers";
import { watchUrl, type Talk } from "@/data/talks";

interface TalkCardProps {
  talk: Talk;
  /** Show the one-line hook under the title (used on /talks). */
  showBlurb?: boolean;
  className?: string;
}

/**
 * One published talk: click-to-play video on top, then title, speaker, and links. The article id is
 * the speaker id so /talks#<speaker-id> lands on the right card from anywhere on the site.
 */
export function TalkCard({ talk, showBlurb = false, className = "" }: TalkCardProps) {
  const speaker = speakers.find((s) => s.id === talk.speakerId);
  const name = speaker?.name ?? talk.speakerId;
  const firstName = name.split(" ")[0];

  return (
    <article
      id={talk.speakerId}
      className={`group flex h-full flex-col overflow-hidden border border-[#e0e0e0] bg-white scroll-mt-28 transition-all duration-300 hover:border-[#e62b1e]/40 hover:shadow-lg ${className}`}
    >
      <YouTubeEmbed videoId={talk.videoId} title={`${talk.title} | ${name}`} />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-[#e62b1e]">
            {speaker?.type === "student" ? "Student Speaker" : "Speaker"}
          </span>
          <span className="text-[0.65rem] font-semibold tabular-nums text-[#9a9a9a]">{talk.duration}</span>
        </div>
        <h3 className="text-[#0a0a0a] font-bold leading-snug">{talk.title}</h3>
        <p className="text-sm text-[#555555] mt-1.5">
          <span className="font-semibold text-[#0a0a0a]">{name}</span>
          {speaker?.role && <span className="text-[#9a9a9a]"> &middot; {speaker.role}</span>}
        </p>
        {showBlurb && <p className="text-sm text-[#555555] leading-relaxed mt-3">{talk.blurb}</p>}
        <div className="mt-auto pt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href={watchUrl(talk.videoId)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold tracking-wide uppercase text-[#e62b1e] hover:underline"
          >
            Watch on YouTube
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <Link
            href={`/speakers#${talk.speakerId}`}
            className="text-[0.65rem] font-bold tracking-wide uppercase text-[#9a9a9a] hover:text-[#0a0a0a] transition-colors"
          >
            About {firstName}
          </Link>
        </div>
      </div>
    </article>
  );
}
