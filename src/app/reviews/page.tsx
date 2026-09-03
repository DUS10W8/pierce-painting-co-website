import type { Metadata } from "next";
import Testimonials from "@/components/home/Testimonials";
import PageHero from "@/components/shared/PageHero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Reviews",
  description: `Customer reviews for ${siteConfig.businessName}.`,
  alternates: { canonical: `${siteConfig.siteUrl}/reviews` },
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero eyebrow="Reviews" title="What customers are saying" />
      <Testimonials />
    </>
  );
}
