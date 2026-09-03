import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-dark text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "url(/assets/pierce-seamless-brand-pattern.png)",
          backgroundSize: "420px",
          backgroundRepeat: "repeat",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="relative block h-12 w-48">
              <Image
                src="/assets/pierce-footer-logo.png"
                alt={siteConfig.businessName}
                fill
                className="object-contain object-left"
              />
            </span>
            <p className="mt-4 text-sm text-cream/75 max-w-xs">{siteConfig.description}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2">
            <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-orange">Site</h3>
            {siteConfig.nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-cream/85 hover:text-orange">
                {item.label}
              </Link>
            ))}
            <Link href="/privacy" className="text-sm text-cream/85 hover:text-orange">
              Privacy Policy
            </Link>
          </nav>

          <div className="flex flex-col gap-3">
            <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-orange">Contact</h3>
            <div className="flex items-center gap-3">
              <span className="relative h-5 w-5 shrink-0">
                <Image src="/assets/pierce-contact-icon-phone.png" alt="" fill className="object-contain" />
              </span>
              <a href={siteConfig.phone.href} className="text-sm text-cream/90 hover:text-orange">
                {siteConfig.phone.display}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="relative h-5 w-5 shrink-0">
                <Image src="/assets/pierce-contact-icon-email.png" alt="" fill className="object-contain" />
              </span>
              <a href={siteConfig.email.href} className="text-sm text-cream/90 hover:text-orange">
                {siteConfig.email.display}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="relative h-5 w-5 shrink-0">
                <Image src="/assets/pierce-contact-icon-location.png" alt="" fill className="object-contain" />
              </span>
              <span className="text-sm text-cream/90">{siteConfig.serviceAreaLabel}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="mb-1 text-sm font-bold uppercase tracking-wide text-orange">Follow Along</h3>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-cream/90 hover:text-orange"
            >
              Facebook
            </a>
            <Link
              href={siteConfig.primaryCta.href}
              className="mt-2 inline-flex w-fit rounded-full bg-orange px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-dark"
            >
              {siteConfig.primaryCta.label}
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center gap-3 border-t border-cream/15 pt-6 text-xs text-cream/60 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.businessName} All rights reserved.
          </p>
          <p>Serving {siteConfig.serviceArea.map((c) => c.name).join(", ")}.</p>
        </div>
      </div>
    </footer>
  );
}
