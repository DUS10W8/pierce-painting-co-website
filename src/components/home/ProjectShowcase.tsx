import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import { galleryProjects } from "@/lib/site-config";

const featured = galleryProjects.filter((p) => !p.isPlaceholder).slice(0, 4);

export default function ProjectShowcase() {
  return (
    <section className="py-20 sm:py-24 bg-cream-soft" aria-labelledby="work-heading">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Recent Work"
            title="A look at real Pierce Pro Painting projects"
          />
          <Link href="/gallery" className="text-sm font-bold text-orange-dark hover:underline">
            View the full gallery →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((project) => (
            <figure
              key={project.id}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-forest/10"
            >
              <Image
                src={project.image}
                alt={project.description}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-dark/90 to-transparent p-4 text-sm font-semibold text-cream">
                {project.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
