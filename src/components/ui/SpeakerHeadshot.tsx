"use client";

import Image from "next/image";
import { useState } from "react";
import { speakerInitials } from "@/data/speakers";

interface SpeakerHeadshotProps {
  src: string | null;
  name: string;
  /** Responsive sizes hint for next/image. */
  sizes?: string;
  /** Set true only for above-the-fold cards; everything else lazy-loads. */
  priority?: boolean;
  /** CSS font-size for the initials fallback (override for small avatars). */
  initialsFontSize?: string;
}

/**
 * Fills its (relative, aspect-ratio'd) parent. Renders the headshot with object-cover so every
 * photo is centered and uniform regardless of source crop, and falls back to a tasteful initials
 * avatar when there is no image or the image fails to load, so the layout never breaks.
 */
export function SpeakerHeadshot({ src, name, sizes, priority = false, initialsFontSize }: SpeakerHeadshotProps) {
  const [errored, setErrored] = useState(false);
  const showImage = Boolean(src) && !errored;

  if (showImage) {
    return (
      <Image
        src={src as string}
        alt={name}
        fill
        sizes={sizes ?? "(max-width: 768px) 50vw, 25vw"}
        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        priority={priority}
        loading={priority ? undefined : "lazy"}
        onError={() => setErrored(true)}
      />
    );
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1f1f1f] to-[#0a0a0a]"
      aria-hidden="true"
    >
      <span
        className="font-extrabold text-white/85 tracking-tight"
        style={{ fontSize: initialsFontSize ?? "clamp(2rem, 6vw, 3.5rem)" }}
      >
        {speakerInitials(name)}
      </span>
    </div>
  );
}
