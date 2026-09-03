import Image from "next/image";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { trustBadges } from "@/lib/site-config";

export default function TrustBadges() {
  return (
    <section className="py-20 sm:py-24" aria-labelledby="trust-heading">
      <Container>
        <SectionHeading eyebrow="Why Pierce Painting" title="What you can count on" />
        <ul className="mt-12 grid gap-6 sm:grid-cols-3">
          {trustBadges.map((badge) => (
            <li
              key={badge.title}
              className="flex flex-col items-center gap-3 rounded-2xl border border-forest/12 bg-cream-soft p-8 text-center"
            >
              <span className="relative h-20 w-20">
                <Image src={badge.image} alt="" fill className="object-contain" />
              </span>
              <h3 className="text-base font-bold text-forest-dark">{badge.title}</h3>
              <p className="text-sm text-charcoal/70">{badge.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
