import { siteConfig } from "./site-config";

/** LocalBusiness JSON-LD, injected in the root layout. */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HousePainter",
    name: siteConfig.businessName,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phone.display,
    areaServed: siteConfig.serviceArea.map((c) => ({
      "@type": "City",
      name: `${c.name}, ${c.state}`,
    })),
    sameAs: [siteConfig.social.facebook],
  };
}
