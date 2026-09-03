import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/shared/Container";
import PageHero from "@/components/shared/PageHero";
import ServiceCard from "@/components/shared/ServiceCard";
import { services, siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.shortDescription,
    alternates: { canonical: `${siteConfig.siteUrl}/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow="Service" title={service.name} description={service.heroDescription} />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[auto_1fr] lg:items-start">
          <span className="relative mx-auto h-28 w-28 shrink-0 lg:mx-0">
            <Image src={service.icon} alt="" fill className="object-contain" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-forest-dark">What&rsquo;s included</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {service.details.map((detail) => (
                <li key={detail} className="flex items-start gap-3 text-sm text-charcoal/80">
                  <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                  {detail}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={siteConfig.primaryCta.href}
                className="rounded-full bg-orange px-6 py-3 text-sm font-bold text-white hover:bg-orange-dark"
              >
                {siteConfig.primaryCta.label}
              </Link>
              <a
                href={siteConfig.phone.href}
                className="rounded-full border-2 border-forest/20 px-6 py-3 text-sm font-bold text-forest-dark hover:border-forest/40"
              >
                Call {siteConfig.phone.display}
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-cream-soft">
        <Container>
          <h2 className="text-xl font-bold text-forest-dark">Other services</h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-3">
            {related.map((s) => (
              <li key={s.slug}>
                <ServiceCard service={s} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
