import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export default function AnnouncementBar() {
  return (
    <div className="bg-forest-dark text-cream text-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-5 py-2 text-center sm:px-8">
        <span className="relative hidden h-5 w-28 shrink-0 sm:block">
          <Image src="/assets/pierce-primary-logo-one-color-white.png" alt="" fill className="object-contain object-left" />
        </span>
        <span>
          Now booking in {siteConfig.serviceAreaLabel} —{" "}
          <a href={siteConfig.phone.href} className="font-semibold underline underline-offset-2 hover:text-orange">
            {siteConfig.phone.display}
          </a>
        </span>
      </div>
    </div>
  );
}
