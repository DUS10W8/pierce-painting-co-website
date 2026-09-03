import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";
import { siteConfig } from "@/lib/site-config";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-16">
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="relative h-56 w-56 sm:h-72 sm:w-72">
          <Image
            src="/assets/pierce-404-page-illustration.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </span>
        <h1 className="text-3xl font-extrabold text-forest-dark sm:text-4xl">Page not found</h1>
        <p className="max-w-md text-charcoal/70">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Let&rsquo;s get you
          back on track.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-forest-dark px-6 py-3 text-sm font-bold text-cream hover:bg-forest"
          >
            Back to Home
          </Link>
          <Link
            href={siteConfig.primaryCta.href}
            className="rounded-full bg-orange px-6 py-3 text-sm font-bold text-white hover:bg-orange-dark"
          >
            {siteConfig.primaryCta.label}
          </Link>
        </div>
      </Container>
    </section>
  );
}
