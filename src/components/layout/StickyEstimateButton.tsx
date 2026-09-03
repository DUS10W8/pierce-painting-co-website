"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

/**
 * Compact sticky "Free Estimate" button shown on mobile only, after the
 * visitor scrolls past the hero. Stays clear of form fields and content by
 * only rendering on scroll and using safe-area padding.
 */
export default function StickyEstimateButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 480);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden"
      style={{ pointerEvents: "none" }}
    >
      <Link
        href={siteConfig.primaryCta.href}
        style={{ pointerEvents: "auto" }}
        className="w-full max-w-sm rounded-full bg-orange px-6 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-forest-dark/20 transition-transform active:scale-95"
      >
        {siteConfig.primaryCta.label}
      </Link>
    </div>
  );
}
