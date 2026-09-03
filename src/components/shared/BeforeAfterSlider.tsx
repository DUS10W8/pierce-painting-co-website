"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl bg-forest/10 touch-none"
      onMouseMove={(e) => {
        if (dragging.current) updateFromClientX(e.clientX);
      }}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
    >
      {/* After image: full width, base layer */}
      <Image src={afterSrc} alt="After" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />

      {/* Before image: clipped to the slider position, same full-size image on top */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image src={beforeSrc} alt="Before" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-forest-dark/80 px-3 py-1 text-xs font-bold text-cream">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-orange/90 px-3 py-1 text-xs font-bold text-white">
        {afterLabel}
      </span>

      <div className="absolute inset-y-0 flex w-0 items-center justify-center" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 w-0.5 bg-cream" />
        <button
          type="button"
          role="slider"
          aria-label="Before and after comparison"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onMouseDown={() => (dragging.current = true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
            if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
          }}
          className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-orange text-white shadow-lg focus-visible:outline-cream"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M6 4l-4 5 4 5M12 4l4 5-4 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
