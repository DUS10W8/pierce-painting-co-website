import Image from "next/image";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import BeforeAfterSlider from "@/components/shared/BeforeAfterSlider";
import { beforeAfterProjects } from "@/lib/site-config";

export default function BeforeAfterFeature() {
  const project = beforeAfterProjects[0];

  return (
    <section className="py-20 sm:py-24 bg-cream-soft" aria-labelledby="before-after-heading">
      <Container>
        <SectionHeading
          eyebrow="See The Difference"
          title={project?.isExample ? "The kind of difference to expect" : "Real before-and-after results"}
          description={
            project
              ? project.isExample
                ? "An example of the transformation careful prep and a fresh coat can make — drag the slider, or use the arrow keys, to compare."
                : "Drag the slider — or use the arrow keys — to compare."
              : "We're building out this section with real before-and-after photos as projects wrap up."
          }
        />
        <div className="mt-10 mx-auto max-w-3xl">
          {project ? (
            <>
              <BeforeAfterSlider beforeSrc={project.beforeImage} afterSrc={project.afterImage} />
              {project.isExample ? (
                <p className="mt-4 text-center text-xs text-charcoal/50">
                  Illustrative example, not a specific completed customer project.
                </p>
              ) : null}
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-forest/20 bg-cream px-8 py-14 text-center">
              <span className="relative h-20 w-20">
                <Image src="/assets/pierce-project-gallery-placeholder.png" alt="" fill className="object-contain" />
              </span>
              <p className="max-w-sm text-sm text-charcoal/70">
                Before-and-after photos coming soon. In the meantime, take a look at the{" "}
                <a href="/gallery" className="font-semibold text-orange-dark hover:underline">
                  project gallery
                </a>{" "}
                for real completed work.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
