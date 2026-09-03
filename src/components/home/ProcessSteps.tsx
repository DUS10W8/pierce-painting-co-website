"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { processSteps } from "@/lib/site-config";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}

export default function ProcessSteps() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    function onScroll() {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const total = rect.height + viewportH;
      const passed = viewportH - rect.top;
      const pct = Math.min(100, Math.max(0, (passed / total) * 100));
      setProgress(pct);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  const displayProgress = reducedMotion ? 100 : progress;

  return (
    <section className="py-20 sm:py-24 bg-cream-soft" aria-labelledby="process-heading">
      <Container>
        <SectionHeading eyebrow="How It Works" title="A straightforward four-step process" />

        <div ref={sectionRef} className="relative mt-16">
          {/* Desktop: horizontal line */}
          <div className="hidden lg:block absolute left-0 right-0 top-10 h-1.5 rounded-full bg-forest/10">
            <div
              className="h-full rounded-full bg-orange transition-[width] duration-150 ease-out"
              style={{ width: `${displayProgress}%` }}
            />
          </div>
          {/* Mobile/tablet: vertical line */}
          <div className="lg:hidden absolute left-10 top-0 bottom-0 w-1.5 rounded-full bg-forest/10">
            <div
              className="w-full rounded-full bg-orange transition-[height] duration-150 ease-out"
              style={{ height: `${displayProgress}%` }}
            />
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-4">
            {processSteps.map((step) => (
              <li key={step.step} className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-4 lg:text-center">
                <span className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-cream-soft ring-4 ring-cream-soft">
                  <span className="relative h-16 w-16">
                    <Image src={step.image} alt="" fill className="object-contain" />
                  </span>
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-orange-dark">
                    Step {step.step}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-forest-dark">{step.title}</h3>
                  <p className="mt-1 text-sm text-charcoal/70">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
