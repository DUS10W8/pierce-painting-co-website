import type { Metadata, Viewport } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import StickyEstimateButton from "@/components/layout/StickyEstimateButton";
import { siteConfig } from "@/lib/site-config";
import { getLocalBusinessSchema } from "@/lib/schema";

export const viewport: Viewport = {
  themeColor: "#005b3c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.businessName} | Tri-Cities Painting Contractor`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/assets/favicon-package/pierce-favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon-package/pierce-favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-package/pierce-favicon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/assets/pierce-apple-touch-icon-180.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.businessName,
    title: `${siteConfig.businessName} | Tri-Cities Painting Contractor`,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    images: [
      {
        url: "/assets/pierce-social-sharing-preview-1200x630.png",
        width: 1200,
        height: 630,
        alt: siteConfig.businessName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.businessName} | Tri-Cities Painting Contractor`,
    description: siteConfig.description,
    images: ["/assets/pierce-social-sharing-preview-1200x630.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-cream text-charcoal antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalBusinessSchema()) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyEstimateButton />
      </body>
    </html>
  );
}
