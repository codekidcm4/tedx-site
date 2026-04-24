"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Speaker } from "@/data/speakers";

interface SpeakerCardProps {
  speaker: Speaker;
  className?: string;
}

export function SpeakerCard({ speaker, className }: SpeakerCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  if (speaker.status === "coming-soon" || !speaker.name) {
    return (
      <div
        className={cn(
          "group relative overflow-hidden border border-[#e0e0e0] bg-[#f9f9f9] aspect-[3/4] flex flex-col justify-end p-6 transition-all duration-300 hover:border-[#e62b1e]/30 hover:shadow-lg",
          className
        )}
      >
        {/* Placeholder silhouette */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-28 h-28 rounded-full bg-[#e0e0e0] flex items-center justify-center">
            <svg
              className="w-14 h-14 text-[#9a9a9a]"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>
        </div>

        {/* Bottom info */}
        <div className="relative z-10">
          <span className="inline-block text-[0.6rem] font-bold tracking-[0.15em] uppercase text-[#e62b1e] mb-3">
            {speaker.type === "student" ? "Student Speaker" : "Speaker"}
          </span>
          <p className="text-sm font-semibold text-[#555555] tracking-wide">
            Coming Soon
          </p>
        </div>

        {/* Hover accent */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e62b1e] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className={cn(
          "group relative overflow-hidden border border-[#e0e0e0] aspect-[3/4] flex flex-col justify-end transition-all duration-300 hover:border-[#e62b1e]/40 hover:shadow-xl cursor-pointer text-left w-full",
          className
        )}
        aria-label={`View ${speaker.name}'s speaker profile`}
      >
        {/* Speaker image */}
        {speaker.image ? (
          <Image
            src={speaker.image}
            alt={speaker.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Content */}
        <div className="relative z-10 p-5">
          <span className="inline-block text-[0.6rem] font-bold tracking-[0.15em] uppercase text-[#e62b1e] mb-2">
            {speaker.type === "student" ? "Student Speaker" : "Speaker"}
          </span>
          <h3 className="text-white font-bold text-lg leading-snug mb-1">
            {speaker.name}
          </h3>
          {speaker.role && (
            <p className="text-white/70 text-sm">{speaker.role}</p>
          )}
          {speaker.talkTitle && (
            <p className="text-white/60 text-xs mt-2 italic line-clamp-2">
              &ldquo;{speaker.talkTitle}&rdquo;
            </p>
          )}
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e62b1e] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </button>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${speaker.name} speaker profile`}
        >
          <div
            className="bg-white max-w-lg w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[#555555] hover:text-[#0a0a0a] transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <span className="inline-block text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#e62b1e] mb-3">
              {speaker.type === "student" ? "Student Speaker" : "Speaker"}
            </span>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-1">{speaker.name}</h2>
            {speaker.role && (
              <p className="text-[#555555] text-sm mb-4">
                {speaker.role}
                {speaker.organization ? `, ${speaker.organization}` : ""}
              </p>
            )}
            {speaker.talkTitle && (
              <div className="border-l-2 border-[#e62b1e] pl-4 mb-4">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#9a9a9a] mb-1">Talk</p>
                <p className="text-[#0a0a0a] font-semibold italic">&ldquo;{speaker.talkTitle}&rdquo;</p>
              </div>
            )}
            {speaker.bio && (
              <p className="text-[#555555] text-sm leading-relaxed">{speaker.bio}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
