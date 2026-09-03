"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-cream-soft/95 backdrop-blur border-b border-forest/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label={`${siteConfig.businessName} home`}>
          {/* Compact logo on small screens, primary horizontal logo from md up */}
          <span className="relative block h-10 w-10 sm:hidden">
            <Image
              src="/assets/pierce-logo-mark.png"
              alt={siteConfig.businessName}
              fill
              className="object-contain"
              priority
            />
          </span>
          <span className="relative hidden h-10 w-40 sm:block lg:hidden">
            <Image
              src="/assets/pierce-small-size-logo.png"
              alt={siteConfig.businessName}
              fill
              className="object-contain object-left"
              priority
            />
          </span>
          <span className="relative hidden lg:block h-12 w-56">
            <Image
              src="/assets/pierce-primary-horizontal-logo.png"
              alt={siteConfig.businessName}
              fill
              className="object-contain object-left"
              priority
            />
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-7">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-semibold transition-colors hover:text-orange-dark ${
                  active ? "text-orange-dark" : "text-forest-dark"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={siteConfig.phone.href}
            className="text-sm font-semibold text-forest-dark hover:text-orange-dark"
          >
            {siteConfig.phone.display}
          </a>
          <Link
            href={siteConfig.primaryCta.href}
            className="rounded-full bg-orange px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-transform hover:scale-[1.03] hover:bg-orange-dark"
          >
            {siteConfig.primaryCta.label}
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md border border-forest/20 text-forest-dark"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="lg:hidden border-t border-forest/10 bg-cream-soft px-5 py-4"
        >
          <ul className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-base font-semibold text-forest-dark hover:bg-forest/5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-col gap-3">
            <a href={siteConfig.phone.href} className="text-base font-semibold text-forest-dark">
              Call {siteConfig.phone.display}
            </a>
            <Link
              href={siteConfig.primaryCta.href}
              onClick={() => setOpen(false)}
              className="rounded-full bg-orange px-5 py-3 text-center text-base font-bold text-white"
            >
              {siteConfig.primaryCta.label}
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
