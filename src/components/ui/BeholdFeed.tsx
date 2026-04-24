"use client";

import { useEffect } from "react";

interface BeholdFeedProps {
  feedId: string;
}

export function BeholdFeed({ feedId }: BeholdFeedProps) {
  useEffect(() => {
    if (document.querySelector('script[src="https://w.behold.so/widget.js"]')) return;
    const script = document.createElement("script");
    script.src = "https://w.behold.so/widget.js";
    script.type = "module";
    document.head.appendChild(script);
  }, []);

  return (
    // @ts-expect-error: behold-widget is a custom web component
    <behold-widget feed-id={feedId} />
  );
}
