"use client";

import { useEffect, useRef, useState } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const alignClass = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignClass} max-w-2xl gap-3`}>
      {eyebrow ? (
        <span
          className={`text-sm font-semibold uppercase tracking-wide ${
            light ? "text-orange" : "text-orange-dark"
          }`}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        ref={ref}
        className={`paint-reveal ${revealed ? "is-revealed" : ""} text-3xl sm:text-4xl font-extrabold leading-tight ${
          light ? "text-cream" : "text-forest-dark"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`text-base sm:text-lg ${light ? "text-cream/85" : "text-charcoal/75"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
