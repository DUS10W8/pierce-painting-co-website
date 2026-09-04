"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { testimonials } from "@/lib/site-config";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);

  if (testimonials.length === 0) {
    return (
      <section className="py-20 sm:py-24" aria-labelledby="reviews-heading">
        <Container>
          <SectionHeading eyebrow="Reviews" title="What customers are saying" />
          <div className="mt-10 mx-auto flex max-w-xl flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-forest/20 bg-cream-soft px-8 py-14 text-center">
            <span className="relative h-16 w-16">
              <Image src="/assets/pierce-testimonial-quote-graphic.png" alt="" fill className="object-contain" />
            </span>
            <p className="text-charcoal/70">
              Reviews are coming soon — we&rsquo;re just getting Pierce Pro Painting LLC&rsquo;s online
              presence started. Check back after a few projects wrap up.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  const current = testimonials[index];

  function go(delta: number) {
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length);
  }

  return (
    <section
      className="py-20 sm:py-24 bg-cream-soft"
      aria-labelledby="reviews-heading"
      aria-roledescription="carousel"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
    >
      <Container>
        <SectionHeading eyebrow="Reviews" title="What customers are saying" />
        <div className="relative mx-auto mt-10 max-w-2xl">
          <span className="relative mx-auto mb-4 block h-10 w-10">
            <Image src="/assets/pierce-testimonial-quote-graphic.png" alt="" fill className="object-contain" />
          </span>
          <blockquote className="text-center text-lg font-medium text-forest-dark" aria-live="polite">
            &ldquo;{current.quote}&rdquo;
            <footer className="mt-4 text-sm font-semibold text-charcoal/70">
              {current.author}
              {current.location ? `, ${current.location}` : ""}
            </footer>
          </blockquote>

          {testimonials.length > 1 ? (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-forest/20 text-forest-dark hover:bg-forest/5"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-forest/20 text-forest-dark hover:bg-forest/5"
              >
                →
              </button>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
