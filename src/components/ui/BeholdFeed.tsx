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

  // The widget fills this wrapper full-width; the min-height reserves space so the section reads
  // as a substantial module while the feed loads (and avoids a collapsed, tiny look).
  // Tile size / column count is configured in the Behold dashboard (Design settings).
  return (
    <div className="w-full min-h-[360px]">
      {/* @ts-expect-error: behold-widget is a custom web component */}
      <behold-widget feed-id={feedId} />
    </div>
  );
}
