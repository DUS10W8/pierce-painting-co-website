import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import PageHero from "@/components/shared/PageHero";
import GalleryGrid from "@/components/shared/GalleryGrid";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Project Gallery",
  description: "Real Pierce Pro Painting LLC projects across the Tri-Cities, filterable by category.",
  alternates: { canonical: `${siteConfig.siteUrl}/gallery` },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Our Work" title="Project gallery" description="Filter by category to see relevant work." />
      <section className="py-16 sm:py-20">
        <Container>
          <GalleryGrid />
        </Container>
      </section>
    </>
  );
}
