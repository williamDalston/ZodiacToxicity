"use client";

import { useState, useEffect, useRef } from "react";

interface ToxicityCounterProps {
  targetScore: number;
  color: string;
  label: string;
}

export default function ToxicityCounter({ targetScore, color, label }: ToxicityCounterProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 2000;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out for dramatic slowdown near end
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * targetScore));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [hasAnimated, targetScore]);

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div
      ref={ref}
      className="flex flex-col items-center animate-score-pulse"
      role="img"
      aria-label={`Toxicity score: ${displayScore} percent, ${label}`}
    >
      <div className="relative w-56 h-56 md:w-72 md:h-72">
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90" aria-hidden="true">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="10"
          />
          {/* Progress arc */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-100"
            style={{
              filter: `drop-shadow(0 0 10px ${color})`,
            }}
          />
        </svg>
        {/* Score in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center" aria-live="polite" aria-atomic="true">
          <span
            className="text-5xl md:text-7xl font-black tabular-nums"
            style={{
              color,
              fontFamily: "var(--font-space-grotesk)",
              textShadow: `0 0 30px ${color}60`,
            }}
          >
            {displayScore}%
          </span>
        </div>
      </div>
      <span
        className="text-xl md:text-2xl font-bold mt-4 uppercase tracking-[0.2em]"
        style={{
          color,
          fontFamily: "var(--font-space-grotesk)",
          textShadow: `0 0 20px ${color}40`,
        }}
      >
        {label}
      </span>
    </div>
  );
}
