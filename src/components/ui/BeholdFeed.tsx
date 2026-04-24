"use client";

import Script from "next/script";

interface BeholdFeedProps {
  feedId: string;
}

export function BeholdFeed({ feedId }: BeholdFeedProps) {
  return (
    <>
      <Script src="https://w.behold.so/widget.js" strategy="lazyOnload" />
      {/* @ts-expect-error custom web component */}
      <behold-widget feed-id={feedId} />
    </>
  );
}
