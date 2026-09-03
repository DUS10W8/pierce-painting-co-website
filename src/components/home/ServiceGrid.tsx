import { services } from "@/lib/site-config";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ServiceCard from "@/components/shared/ServiceCard";

export default function ServiceGrid() {
  return (
    <section className="pt-4 pb-20 sm:pt-6 sm:pb-24" aria-labelledby="services-heading">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="Painting services built around your project"
          description="From a single accent wall to a full commercial repaint, every job starts with the same careful prep and clear communication."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
