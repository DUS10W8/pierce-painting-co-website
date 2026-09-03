import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import ServiceGrid from "@/components/home/ServiceGrid";
import ServiceRecommender from "@/components/home/ServiceRecommender";
import ProjectShowcase from "@/components/home/ProjectShowcase";
import TrustBadges from "@/components/home/TrustBadges";
import ProcessSteps from "@/components/home/ProcessSteps";
import BeforeAfterFeature from "@/components/home/BeforeAfterFeature";
import Testimonials from "@/components/home/Testimonials";
import ServiceAreaSection from "@/components/home/ServiceAreaSection";
import FinalCTA from "@/components/home/FinalCTA";
import SectionDivider from "@/components/shared/SectionDivider";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  alternates: { canonical: siteConfig.siteUrl },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServiceRecommender />
      <ServiceGrid />
      <ProjectShowcase />
      <TrustBadges />
      <ProcessSteps />
      <SectionDivider />
      <BeforeAfterFeature />
      <Testimonials />
      <ServiceAreaSection />
      <FinalCTA />
    </>
  );
}
