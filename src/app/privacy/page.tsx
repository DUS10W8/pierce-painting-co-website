import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/shared/Container";
import PageHero from "@/components/shared/PageHero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for the ${siteConfig.businessName} website.`,
  alternates: { canonical: `${siteConfig.siteUrl}/privacy` },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="py-16 sm:py-20">
        <Container className="prose max-w-3xl">
          <span className="relative mb-6 block h-10 w-52">
            <Image src="/assets/pierce-primary-logo-one-color-green.png" alt="" fill className="object-contain object-left opacity-80" />
          </span>
          <div className="flex flex-col gap-6 text-charcoal/80">
            <p className="text-sm text-charcoal/60">
              PLACEHOLDER — this is a starting-point privacy policy, not reviewed by an attorney.
              Replace this page with a policy your business has confirmed before relying on it.
            </p>
            <div>
              <h2 className="text-lg font-bold text-forest-dark">Information We Collect</h2>
              <p className="mt-2">
                When you submit the estimate request form on this site, we collect the information you
                provide — such as your name, phone number, email address, city, project details, and an
                optional photo — so we can respond to your request.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-forest-dark">How We Use Information</h2>
              <p className="mt-2">
                Information submitted through this site is used only to respond to your estimate
                request and to communicate with you about your project. It is not sold to third
                parties.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-forest-dark">Contact</h2>
              <p className="mt-2">
                Questions about this policy can be directed to{" "}
                <a href={siteConfig.phone.href} className="font-semibold text-orange-dark">
                  {siteConfig.phone.display}
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
