"use client";

import Image from "next/image";
import { useState } from "react";
import { fullEvent, eventChapters, formatTimestamp, thumbUrl } from "@/data/talks";

/**
 * The complete 4h22m recording with a chapter list. Picking a chapter (re)loads the player at that
 * timestamp. Nothing from YouTube loads until the first play.
 */
export function FullEventPlayer() {
  const [start, setStart] = useState<number | null>(null); // null = poster showing, not yet playing

  const src =
    `https://www.youtube-nocookie.com/embed/${fullEvent.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1` +
    (start ? `&start=${start}` : "");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
      <div className="lg:col-span-2 relative w-full aspect-video overflow-hidden bg-black border border-[#222222]">
        {start === null ? (
          <button
            type="button"
            onClick={() => setStart(0)}
            aria-label={`Play: ${fullEvent.title}`}
            className="group absolute inset-0 w-full h-full cursor-pointer"
          >
            <Image
              src={thumbUrl(fullEvent.videoId)}
              alt={fullEvent.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-300" aria-hidden="true" />
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#e62b1e] shadow-2xl shadow-black/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            >
              <svg className="w-7 h-7 md:w-8 md:h-8 ml-1 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="absolute bottom-4 left-4 text-[0.6rem] font-bold tracking-[0.18em] uppercase text-white/90 bg-black/50 px-2.5 py-1.5 rounded-sm">
              Full event · {fullEvent.duration}
            </span>
          </button>
        ) : (
          <iframe
            key={start}
            src={src}
            title={fullEvent.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 w-full h-full"
          />
        )}
      </div>

      <div className="lg:col-span-1 bg-[#111111] border border-[#222222] flex flex-col lg:max-h-[calc((100vw-6rem)*2/3*9/16)] lg:min-h-0">
        <p className="px-5 pt-5 pb-3 text-[0.6rem] font-bold tracking-[0.18em] uppercase text-white/50 border-b border-[#222222]">
          Chapters
        </p>
        <ol className="overflow-y-auto divide-y divide-[#1c1c1c]">
          {eventChapters.map((c) => {
            const active = start !== null && start === c.start;
            return (
              <li key={c.start}>
                <button
                  type="button"
                  onClick={() => setStart(c.start)}
                  className={`w-full flex items-start gap-3 px-5 py-3 text-left transition-colors duration-150 ${
                    active ? "bg-[#e62b1e]/15" : "hover:bg-white/5"
                  }`}
                >
                  <span className={`text-[0.7rem] tabular-nums font-semibold w-14 flex-shrink-0 pt-0.5 ${active ? "text-[#e62b1e]" : "text-white/40"}`}>
                    {formatTimestamp(c.start)}
                  </span>
                  <span className={`text-sm leading-snug ${active ? "text-white font-semibold" : "text-white/80"}`}>
                    {c.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
