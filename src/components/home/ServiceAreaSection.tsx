import Image from "next/image";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export default function ServiceAreaSection() {
  return (
    <section className="py-20 sm:py-24" aria-labelledby="area-heading">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading align="left" eyebrow="Where We Work" title="Proudly serving the Tri-Cities" />
          <p className="mt-4 max-w-md text-charcoal/75">
            {siteConfig.hoursNote}
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {siteConfig.serviceArea.map((city) => (
              <li
                key={city.name}
                className="flex items-center gap-2 rounded-full border border-forest/15 bg-cream-soft px-4 py-2 text-sm font-semibold text-forest-dark"
              >
                <span className="relative h-4 w-4">
                  <Image src="/assets/pierce-branded-map-pin.png" alt="" fill className="object-contain" />
                </span>
                {city.name}, {city.state}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative rounded-2xl bg-forest-dark p-10 text-center overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage: "url(/assets/pierce-seamless-brand-pattern.png)",
              backgroundSize: "300px",
              backgroundRepeat: "repeat",
            }}
          />
          <div className="relative flex flex-col items-center gap-4">
            <span className="relative h-24 w-24">
              <Image src="/assets/pierce-branded-map-pin.png" alt="" fill className="object-contain" />
            </span>
            <p className="text-xl font-bold text-cream">{siteConfig.serviceAreaLabel}</p>
            <p className="max-w-xs text-sm text-cream/75">
              Not seeing your town? Call and ask — service area is growing.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
