import Link from "next/link";
import Container from "@/components/shared/Container";
import { siteConfig } from "@/lib/site-config";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-orange py-16 sm:py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Ready to talk about your project?
        </h2>
        <p className="max-w-xl text-white/90">
          Reach out for a free, no-pressure estimate — we&rsquo;ll walk through scope, timeline, and
          color choices together.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={siteConfig.primaryCta.href}
            className="rounded-full bg-forest-dark px-7 py-3.5 text-base font-bold text-cream shadow-lg transition-transform hover:scale-[1.03]"
          >
            {siteConfig.primaryCta.label}
          </Link>
          <a
            href={siteConfig.phone.href}
            className="rounded-full border-2 border-white px-7 py-3.5 text-base font-bold text-white hover:bg-white/10"
          >
            Call {siteConfig.phone.display}
          </a>
        </div>
      </Container>
    </section>
  );
}
