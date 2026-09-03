import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.businessName,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fff9ed",
    theme_color: "#005b3c",
    icons: [
      { src: "/assets/pierce-android-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/assets/pierce-android-icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/assets/pierce-pwa-maskable-icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
