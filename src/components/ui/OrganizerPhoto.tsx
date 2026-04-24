"use client";

import Image from "next/image";
import { useState } from "react";

interface OrganizerPhotoProps {
  src: string;
  alt: string;
}

export function OrganizerPhoto({ src, alt }: OrganizerPhotoProps) {
  const [errored, setErrored] = useState(false);

  if (errored) return null;

  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={533}
      className="w-full h-full object-cover object-top"
      onError={() => setErrored(true)}
    />
  );
}
