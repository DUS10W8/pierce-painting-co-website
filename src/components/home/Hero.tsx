import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import Container from "@/components/shared/Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-forest-dark">
      <Image
        src="/assets/pierce-homepage-hero-desktop-2400x1350.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-dark via-forest-dark/85 to-forest-dark/40" />

      <Container className="relative py-24 sm:py-28 lg:py-32">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-cream/10 px-4 py-1.5 text-sm font-semibold text-cream ring-1 ring-cream/25">
            Serving {siteConfig.serviceAreaLabel}
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
            A painting crew that treats your property like their own.
          </h1>
          <span aria-hidden="true" className="relative mt-2 block h-4 w-40 opacity-90">
            <Image src="/assets/pierce-orange-roller-stroke.png" alt="" fill className="object-contain object-left" />
          </span>
          <p className="mt-5 max-w-xl text-lg text-cream/85">
            {siteConfig.businessName} handles interior, exterior, cabinet, and commercial painting
            across the Tri-Cities — with careful prep, a clean job site, and straightforward
            communication from the first call to the final walkthrough.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={siteConfig.primaryCta.href}
              className="rounded-full bg-orange px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-black/20 transition-transform hover:scale-[1.03] hover:bg-orange-dark"
            >
              {siteConfig.primaryCta.label}
            </Link>
            <Link
              href={siteConfig.secondaryCta.href}
              className="rounded-full border-2 border-cream/40 px-7 py-3.5 text-base font-bold text-cream transition-colors hover:border-cream hover:bg-cream/10"
            >
              {siteConfig.secondaryCta.label}
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <span className="relative h-14 w-14 shrink-0 rounded-full bg-cream p-2 shadow-md">
              <Image
                src="/assets/pierce-free-estimate-badge.png"
                alt=""
                fill
                className="object-contain p-1"
              />
            </span>
            <p className="text-sm text-cream/80">
              Free, no-pressure estimates — {siteConfig.yearsInBusiness} years painting homes and
              businesses across the Tri-Cities.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
