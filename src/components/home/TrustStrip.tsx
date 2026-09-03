import { siteConfig } from "@/lib/site-config";
import Container from "@/components/shared/Container";

const items = [
  `${siteConfig.yearsInBusiness} years serving the Tri-Cities`,
  "Locally owned & operated",
  "Free, no-pressure estimates",
  "Residential & commercial",
];

export default function TrustStrip() {
  return (
    <div className="border-y border-forest/10 bg-cream-soft py-4">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center text-sm font-semibold text-forest-dark">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-orange" />
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
