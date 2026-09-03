import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";
import PageHero from "@/components/shared/PageHero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Service Area",
  description: `${siteConfig.businessName} serves ${siteConfig.serviceArea.map((c) => c.name).join(", ")}, Washington.`,
  alternates: { canonical: `${siteConfig.siteUrl}/service-area` },
};

export default function ServiceAreaPage() {
  return (
    <>
      <PageHero
        eyebrow="Service Area"
        title="Where we work"
        description={siteConfig.hoursNote}
      />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <ul className="grid gap-4 sm:grid-cols-2">
            {siteConfig.serviceArea.map((city) => (
              <li
                key={city.name}
                className="flex items-center gap-3 rounded-2xl border border-forest/12 bg-cream-soft p-5"
              >
                <span className="relative h-8 w-8 shrink-0">
                  <Image src="/assets/pierce-branded-map-pin.png" alt="" fill className="object-contain" />
                </span>
                <div>
                  <p className="font-bold text-forest-dark">{city.name}</p>
                  <p className="text-xs text-charcoal/60">{city.state}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="relative overflow-hidden rounded-2xl bg-forest-dark p-10 text-center">
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
              <p className="max-w-sm text-sm text-cream/75">
                Not seeing your town listed? Give us a call — the service area is still growing, and
                nearby jobs are often still in reach.
              </p>
              <a
                href={siteConfig.phone.href}
                className="mt-2 rounded-full bg-orange px-6 py-3 text-sm font-bold text-white hover:bg-orange-dark"
              >
                Call {siteConfig.phone.display}
              </a>
            </div>
          </div>
        </Container>

        <Container className="mt-14 text-center">
          <Link
            href={siteConfig.primaryCta.href}
            className="inline-flex rounded-full border-2 border-forest/20 px-6 py-3 text-sm font-bold text-forest-dark hover:border-forest/40"
          >
            {siteConfig.primaryCta.label}
          </Link>
        </Container>
      </section>
    </>
  );
}
