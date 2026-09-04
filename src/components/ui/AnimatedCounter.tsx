"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 2000,
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const animatedRef = useRef(false); // run the count-up once, the first time it scrolls into view
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (value === 0) return; // nothing to animate; the initial 0 is already correct

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || animatedRef.current) return;
        animatedRef.current = true;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * value));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
}
