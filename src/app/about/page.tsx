import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";
import PageHero from "@/components/shared/PageHero";
import TrustBadges from "@/components/home/TrustBadges";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${siteConfig.businessName}, a locally owned painting contractor serving the Tri-Cities, WA.`,
  alternates: { canonical: `${siteConfig.siteUrl}/about` },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title={`About ${siteConfig.businessName}`} />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="relative block h-40 w-40">
              <Image src="/assets/pierce-stacked-logo.png" alt={siteConfig.businessName} fill className="object-contain" />
            </span>
            <div className="mt-6 flex flex-col gap-4 text-charcoal/80">
              <p>
                {siteConfig.businessName} is a locally owned, owner-operated painting contractor based
                in the Tri-Cities. For {siteConfig.yearsInBusiness} years, we&rsquo;ve painted homes and
                small businesses across {siteConfig.serviceAreaLabel} — no subcontractors passed off as
                our own crew, no upselling, just careful prep and a finish that holds up.
              </p>
              <p>
                We keep every job focused on three things: protecting your property, communicating
                clearly about scope and timeline, and applying paint the right way — properly prepped
                surfaces first, quality coats second.
              </p>
              <p>
                Whether it&rsquo;s a single room, a full exterior repaint, cabinet refinishing, or a
                commercial space that needs to stay open during the work, we scope the job honestly and
                walk through it with you before anything gets started.
              </p>
            </div>
            <Link
              href={siteConfig.primaryCta.href}
              className="mt-8 inline-flex rounded-full bg-orange px-6 py-3 text-sm font-bold text-white hover:bg-orange-dark"
            >
              {siteConfig.primaryCta.label}
            </Link>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/photos/exterior-trim-detail.png"
                alt="Careful cut-in painting along exterior trim and window casing"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 -left-6 hidden h-16 w-40 opacity-95 sm:block"
            >
              <Image src="/assets/pierce-green-roller-stroke.png" alt="" fill className="object-contain" />
            </span>
          </div>
        </Container>
      </section>
      <TrustBadges />
    </>
  );
}
