import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/shared/Container";
import PageHero from "@/components/shared/PageHero";
import ContactForm from "@/components/shared/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Request a Free Estimate",
  description:
    "Request a free painting estimate from Pierce Pro Painting LLC, serving Kennewick, Richland, Pasco, and Benton City, WA.",
  alternates: { canonical: `${siteConfig.siteUrl}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Request a free estimate"
        description="A few quick questions and you're done — we'll follow up to talk through the details."
      />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 rounded-2xl border border-forest/12 bg-cream-soft p-5">
              <span className="relative h-10 w-10 shrink-0">
                <Image src="/assets/pierce-contact-icon-phone.png" alt="" fill className="object-contain" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/60">Call or Text</p>
                <a href={siteConfig.phone.href} className="text-lg font-bold text-forest-dark hover:text-orange-dark">
                  {siteConfig.phone.display}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-forest/12 bg-cream-soft p-5">
              <span className="relative h-10 w-10 shrink-0">
                <Image src="/assets/pierce-contact-icon-email.png" alt="" fill className="object-contain" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/60">Email</p>
                <a href={siteConfig.email.href} className="text-lg font-bold text-forest-dark hover:text-orange-dark">
                  {siteConfig.email.display}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-forest/12 bg-cream-soft p-5">
              <span className="relative h-10 w-10 shrink-0">
                <Image src="/assets/pierce-contact-icon-location.png" alt="" fill className="object-contain" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/60">Service Area</p>
                <p className="text-lg font-bold text-forest-dark">{siteConfig.serviceAreaLabel}</p>
              </div>
            </div>
            <p className="text-sm text-charcoal/70">{siteConfig.hoursNote}</p>
          </div>

          <ContactForm />
        </Container>
      </section>
    </>
  );
}
