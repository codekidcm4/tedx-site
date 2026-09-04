"use client";

import Image from "next/image";
import { useState } from "react";
import { thumbUrl } from "@/data/talks";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  /** Seconds to start from. */
  start?: number;
  className?: string;
  /** Sizes hint for the poster image. */
  sizes?: string;
  priority?: boolean;
}

/**
 * Click-to-play YouTube facade. Renders the HD poster with a play button and only loads the
 * player iframe once someone actually presses play, so a page with a dozen videos stays fast and
 * loads nothing from YouTube until asked. Uses the privacy-enhanced embed domain.
 */
export function YouTubeEmbed({ videoId, title, start, className = "", sizes, priority = false }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const src =
    `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1` +
    (start ? `&start=${start}` : "");

  return (
    <div className={`relative w-full aspect-video overflow-hidden bg-black ${className}`}>
      {playing ? (
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play: ${title}`}
          className="group absolute inset-0 w-full h-full cursor-pointer"
        >
          <Image
            src={thumbUrl(videoId)}
            alt={title}
            fill
            sizes={sizes ?? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"}
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-300" aria-hidden="true" />
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] rounded-full bg-[#e62b1e] shadow-2xl shadow-black/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7 ml-1 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
