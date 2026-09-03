import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/site-config";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-forest/12 bg-cream-soft transition-colors hover:border-orange/40">
      <div className="relative aspect-[4/3] overflow-hidden bg-forest/10">
        <Image
          src={service.photo}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: service.photoPosition ?? "center" }}
        />
        <span className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-full bg-cream-soft/95 shadow-sm">
          <span className="relative h-6 w-6">
            <Image src={service.icon} alt="" fill className="object-contain" />
          </span>
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-forest-dark">{service.name}</h3>
        <p className="mt-2 text-sm text-charcoal/75">{service.shortDescription}</p>
        <Link
          href={`/services/${service.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-orange-dark focus-visible:outline-orange"
        >
          Learn More
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
