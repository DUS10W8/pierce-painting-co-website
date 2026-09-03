import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import PageHero from "@/components/shared/PageHero";
import ServiceCard from "@/components/shared/ServiceCard";
import { services, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Painting Services",
  description:
    "Interior, exterior, cabinet, commercial painting, deck & fence staining, and pressure washing across the Tri-Cities.",
  alternates: { canonical: `${siteConfig.siteUrl}/services` },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Painting services for every part of your property"
        description="Every project — big or small — starts with the same careful prep and clear communication."
      />
      <section className="py-16 sm:py-20">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
