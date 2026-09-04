import Image from "next/image";

export default function SectionDivider() {
  return (
    <div aria-hidden="true" className="bg-cream-soft py-2 sm:py-4">
      <div className="relative mx-auto aspect-[1995/438] w-[90%] max-w-[640px] sm:max-w-[832px]">
        <Image
          src="/assets/pierce-orange-stroke-trimmed.png"
          alt=""
          fill
          sizes="(min-width: 640px) 832px, 90vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}
