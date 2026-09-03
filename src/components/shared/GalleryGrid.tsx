"use client";

import Image from "next/image";
import { useState } from "react";
import { galleryCategories, galleryProjects, type GalleryCategory } from "@/lib/site-config";

export default function GalleryGrid() {
  const [active, setActive] = useState<GalleryCategory | "all">("all");

  const filtered =
    active === "all" ? galleryProjects : galleryProjects.filter((p) => p.category === active);

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActive("all")}
          aria-pressed={active === "all"}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            active === "all"
              ? "bg-forest-dark text-cream"
              : "border border-forest/20 text-forest-dark hover:bg-forest/5"
          }`}
        >
          All Projects
        </button>
        {galleryCategories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setActive(cat.value)}
            aria-pressed={active === cat.value}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              active === cat.value
                ? "bg-forest-dark text-cream"
                : "border border-forest/20 text-forest-dark hover:bg-forest/5"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <li key={project.id} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-forest/10">
            <Image
              src={project.image}
              alt={project.description}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                project.isPlaceholder ? "opacity-70" : ""
              }`}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-dark/90 to-transparent p-4">
              <p className="text-sm font-bold text-cream">{project.title}</p>
              {project.isPlaceholder ? (
                <p className="text-xs text-cream/70">Photos coming soon</p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-charcoal/60">No projects in this category yet.</p>
      ) : null}
    </div>
  );
}
