import Image from "next/image";
import Container from "@/components/shared/Container";

export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-forest-dark py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "url(/assets/pierce-seamless-brand-pattern.png)",
          backgroundSize: "360px",
          backgroundRepeat: "repeat",
        }}
      />
      <span className="pointer-events-none absolute right-6 top-6 hidden h-10 w-44 opacity-90 sm:block lg:right-10 lg:top-10">
        <Image src="/assets/pierce-primary-logo-reversed-full-color.png" alt="" fill className="object-contain object-right" />
      </span>
      <Container className="relative">
        {eyebrow ? (
          <span className="text-sm font-semibold uppercase tracking-wide text-orange">{eyebrow}</span>
        ) : null}
        <h1 className="mt-2 text-3xl font-extrabold text-cream sm:text-4xl lg:text-5xl">{title}</h1>
        {description ? <p className="mt-4 max-w-2xl text-cream/85">{description}</p> : null}
      </Container>
    </section>
  );
}
