"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";
import { services } from "@/lib/site-config";

export default function ServiceRecommender() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="recommender-heading">
      <Container>
        <h2 id="recommender-heading" className="text-center text-2xl font-extrabold text-forest-dark sm:text-3xl">
          What are you looking to improve?
        </h2>
        <p className="mt-2 text-center text-charcoal/70">Pick a starting point — we&rsquo;ll take it from there.</p>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="flex h-full flex-col items-center gap-3 rounded-2xl border border-forest/12 bg-cream-soft p-4 text-center transition-colors hover:border-orange/50 hover:bg-orange/5"
              >
                <span className="relative h-12 w-12">
                  <Image src={s.icon} alt="" fill className="object-contain" />
                </span>
                <span className="text-xs font-semibold text-forest-dark">{s.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
