/**
 * CENTRAL SITE CONFIGURATION
 * ---------------------------------------------------------------
 * Every editable piece of business content lives here. Update this
 * file to change phone numbers, service area, copy, nav links, etc.
 * across the whole site without touching component code.
 *
 * Fields marked `PLACEHOLDER` are not real business information —
 * they must be replaced before the fields are relied upon publicly.
 * Nothing here was invented for fields the business hasn't confirmed;
 * those fields are simply omitted (see notes below).
 * ---------------------------------------------------------------
 */

export const siteConfig = {
  businessName: "Pierce Painting Co.",
  shortName: "Pierce Painting",
  tagline: "Tri-Cities painting, done with care.",
  description:
    "Pierce Painting Co. is a locally owned painting contractor serving Kennewick, Richland, Pasco, and Benton City, Washington. Interior, exterior, cabinet, and commercial painting with careful preparation and clear communication.",

  // PLACEHOLDER: update once the production domain is live and deployed.
  siteUrl: "https://www.piercepaintingco.com",

  phone: {
    display: "(509) 802-4309",
    href: "tel:+15098024309",
  },

  // PLACEHOLDER: mailbox does not exist yet (pending domain + Zoho Mail setup).
  // Update once info@piercepaintingco.com is live, or remove this field from
  // any component that renders it if the business prefers phone-only contact
  // until then.
  email: {
    display: "info@piercepaintingco.com",
    href: "mailto:info@piercepaintingco.com",
    isPlaceholder: true,
  },

  social: {
    facebook: "https://www.facebook.com/profile.php?id=61594091693071",
  },

  yearsInBusiness: 5,

  // Only cities the business has explicitly confirmed. Do not add more
  // without approval — see project instructions.
  serviceArea: [
    { name: "Kennewick", state: "WA" },
    { name: "Richland", state: "WA" },
    { name: "Pasco", state: "WA" },
    { name: "Benton City", state: "WA" },
  ],
  serviceAreaLabel: "Tri-Cities, Washington",

  // No physical storefront — this is a service-area business.
  hasStorefront: false,

  // No confirmed hours yet. Components should invite visitors to request
  // a time rather than display invented business hours.
  hoursNote: "Call, text, or request an estimate online and we'll find a time that works for you.",

  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Service Area", href: "/service-area" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
  ],

  primaryCta: { label: "Request a Free Estimate", href: "/contact" },
  secondaryCta: { label: "View Our Work", href: "/gallery" },
} as const;

export type ServiceSlug =
  | "interior-painting"
  | "exterior-painting"
  | "cabinet-painting"
  | "commercial-painting"
  | "deck-fence-staining"
  | "pressure-washing-prep";

export interface Service {
  slug: ServiceSlug;
  name: string;
  shortDescription: string;
  icon: string;
  photo: string;
  photoPosition?: string;
  heroDescription: string;
  details: string[];
  category: GalleryCategory;
}

export const services: Service[] = [
  {
    slug: "interior-painting",
    name: "Interior Painting",
    shortDescription:
      "Walls, ceilings, and trim finished cleanly, with furniture and floors protected the whole time.",
    icon: "/assets/pierce-service-icon-interior-painting.png",
    photo: "/photos/interior-fresh-coat.png",
    photoPosition: "25% 45%",
    heroDescription:
      "A fresh interior without the disruption. We mask and protect every surface, keep the job site tidy day to day, and apply coats built to hold up in daily-use rooms.",
    details: [
      "Walls, ceilings, trim, doors, and built-ins",
      "Furniture, flooring, and fixtures fully protected before we start",
      "Careful patching and sanding so the final coat looks smooth, not just painted",
      "Daily cleanup — your home stays livable throughout the project",
    ],
    category: "interior",
  },
  {
    slug: "exterior-painting",
    name: "Exterior Painting",
    shortDescription:
      "Siding, trim, and doors prepped and coated to hold up against Tri-Cities sun, wind, and winters.",
    icon: "/assets/pierce-service-icon-exterior-painting.png",
    photo: "/photos/hero-painter-arrival.png",
    heroDescription:
      "Exterior work lives or dies on preparation. We scrape, sand, prime bare wood, and caulk gaps before a single finish coat goes on, so the result lasts through the seasons.",
    details: [
      "Siding, trim, fascia, soffits, and entry doors",
      "Scraping, sanding, and spot-priming of bare or failing surfaces",
      "Caulking and minor wood repair before painting",
      "Landscaping and walkways protected during the job",
    ],
    category: "exterior",
  },
  {
    slug: "cabinet-painting",
    name: "Cabinet Painting",
    shortDescription:
      "Kitchen and bathroom cabinets refinished in place of a full, costly remodel.",
    icon: "/assets/pierce-service-icon-cabinet-painting.png",
    photo: "/photos/cabinet-door-refinished.png",
    photoPosition: "center 30%",
    heroDescription:
      "Cabinet refinishing is detail work — doors and drawers are labeled, cleaned, and sprayed or hand-finished for a smooth, durable result that holds up to daily kitchen use.",
    details: [
      "Doors, drawer fronts, and cabinet boxes",
      "Degreasing and sanding for proper paint adhesion",
      "Hardware removed, labeled, and reinstalled (or upgraded on request)",
      "Durable finishes chosen for kitchens and bathrooms",
    ],
    category: "cabinets",
  },
  {
    slug: "commercial-painting",
    name: "Commercial Painting",
    shortDescription:
      "Offices, rentals, and storefronts painted on a schedule that works around your business.",
    icon: "/assets/pierce-service-icon-commercial-painting.png",
    photo: "/photos/commercial-office-repaint.png",
    photoPosition: "center 25%",
    heroDescription:
      "We work around your hours — early mornings, evenings, or weekends — so your business keeps running while the space gets a fresh, professional finish.",
    details: [
      "Offices, retail spaces, and rental turnovers",
      "Scheduling around business hours and tenant move-in/move-out dates",
      "Clear, single point of communication for property managers",
      "Consistent, professional finish across multiple units or rooms",
    ],
    category: "commercial",
  },
  {
    slug: "deck-fence-staining",
    name: "Deck & Fence Staining",
    shortDescription:
      "Sealing and staining that protects wood from sun, wind, and winter moisture.",
    icon: "/assets/pierce-service-icon-deck-fence-staining.png",
    photo: "/photos/deck-staining-detail.png",
    heroDescription:
      "Decks and fences take the brunt of Eastern Washington weather. We clean, prep, and apply a stain or sealer suited to how the structure is used and how much sun it gets.",
    details: [
      "Decks, fences, pergolas, and other exterior wood structures",
      "Cleaning and light sanding before stain or sealer is applied",
      "Product choice suited to sun exposure and foot traffic",
      "Hardware and landscaping protected during the job",
    ],
    category: "decks-fences",
  },
  {
    slug: "pressure-washing-prep",
    name: "Pressure Washing & Prep",
    shortDescription:
      "Surface cleaning and preparation that sets up every paint job for a finish that lasts.",
    icon: "/assets/pierce-service-icon-pressure-washing-prep.png",
    photo: "/photos/pressure-washing-prep.png",
    photoPosition: "70% center",
    heroDescription:
      "Paint only lasts as long as the surface underneath it is properly prepared. Pressure washing removes dirt, chalking, and mildew so primer and paint bond the way they're supposed to.",
    details: [
      "Siding, decks, fences, and walkways",
      "Removal of dirt, chalking paint residue, and mildew before painting",
      "Pressure and technique adjusted to the surface material",
      "Available as a standalone service or bundled with a paint project",
    ],
    category: "preparation",
  },
];

export type GalleryCategory =
  | "interior"
  | "exterior"
  | "cabinets"
  | "commercial"
  | "decks-fences"
  | "preparation";

export const galleryCategories: { value: GalleryCategory; label: string }[] = [
  { value: "interior", label: "Interior" },
  { value: "exterior", label: "Exterior" },
  { value: "cabinets", label: "Cabinets" },
  { value: "commercial", label: "Commercial" },
  { value: "decks-fences", label: "Decks & Fences" },
  { value: "preparation", label: "Preparation" },
];

export interface GalleryProject {
  id: string;
  title: string;
  category: GalleryCategory;
  image: string;
  isPlaceholder: boolean;
  description: string;
}

// Only project photography that's ready to represent the business is used
// here. Categories without a photo yet use the branded placeholder graphic
// rather than an invented "finished project" image — swap in new photos as
// they become available. Order matters: the homepage teaser (ProjectShowcase)
// shows the first four entries, so they're arranged for category variety.
export const galleryProjects: GalleryProject[] = [
  {
    id: "exterior-trim-detail",
    title: "Exterior trim and window casing",
    category: "exterior",
    image: "/photos/exterior-trim-detail.png",
    isPlaceholder: false,
    description: "Careful cut-in work on trim and window casing during an exterior repaint.",
  },
  {
    id: "interior-fresh-coat",
    title: "Interior wall painting",
    category: "interior",
    image: "/photos/interior-fresh-coat.png",
    isPlaceholder: false,
    description: "Clean cut-in and roller work on an interior wall, floors and trim fully protected.",
  },
  {
    id: "cabinet-refinish-detail",
    title: "Cabinet door refinishing",
    category: "cabinets",
    image: "/photos/cabinet-door-refinished.png",
    isPlaceholder: false,
    description: "A refinished cabinet door ready for reinstall as part of a kitchen refresh.",
  },
  {
    id: "commercial-office-repaint",
    title: "Commercial office repaint",
    category: "commercial",
    image: "/photos/commercial-office-repaint.png",
    isPlaceholder: false,
    description: "Repainting an office space with masking and drop cloths in place around the work area.",
  },
  {
    id: "hero-painter-arrival",
    title: "On site for an exterior project",
    category: "exterior",
    image: "/photos/hero-painter-arrival.png",
    isPlaceholder: false,
    description: "Arriving on site to begin exterior painting work.",
  },
  {
    id: "deck-staining-detail",
    title: "Cedar deck staining",
    category: "decks-fences",
    image: "/photos/deck-staining-detail.png",
    isPlaceholder: false,
    description: "Hand-applying stain to cedar deck boards for lasting weather protection.",
  },
  {
    id: "pressure-washing-prep",
    title: "Pre-paint pressure washing",
    category: "preparation",
    image: "/photos/pressure-washing-prep.png",
    isPlaceholder: false,
    description: "Pressure washing siding to remove dirt and chalking before priming and painting.",
  },
];

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  image: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Request an Estimate",
    description:
      "Tell us about the project — a few details online or a quick call is all it takes to get started.",
    image: "/assets/pierce-process-step-1-request-estimate.png",
  },
  {
    step: 2,
    title: "Plan the Project & Colors",
    description:
      "We walk through scope, timeline, and color choices together before any work begins.",
    image: "/assets/pierce-process-step-2-color-project-planning.png",
  },
  {
    step: 3,
    title: "Preparation & Painting",
    description:
      "Surfaces are properly prepped, surroundings protected, and coats applied with care.",
    image: "/assets/pierce-process-step-3-preparation-painting.png",
  },
  {
    step: 4,
    title: "Final Walkthrough",
    description:
      "We review the finished work together and make sure every detail meets expectations.",
    image: "/assets/pierce-process-step-4-final-walkthrough.png",
  },
];

export interface TrustBadge {
  title: string;
  description: string;
  image: string;
}

export const trustBadges: TrustBadge[] = [
  {
    title: "Quality Workmanship",
    description: "Proper prep and careful application for a finish built to last.",
    image: "/assets/pierce-quality-workmanship-badge.png",
  },
  {
    title: "Clean & Careful Service",
    description: "Your property protected and the job site kept tidy every day.",
    image: "/assets/pierce-clean-careful-service-badge.png",
  },
  {
    title: "Clear Communication",
    description: "You'll know the plan, the timeline, and what to expect at every step.",
    image: "/assets/pierce-clear-communication-badge.png",
  },
];

export interface Testimonial {
  quote: string;
  author: string;
  location?: string;
}

// No reviews have been supplied yet. Do not invent testimonials — the
// Testimonials component renders an honest empty state when this is empty.
export const testimonials: Testimonial[] = [];

export interface BeforeAfterProject {
  id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
  // True when this pair illustrates the kind of result to expect rather than
  // documenting one specific completed customer job. The UI must label an
  // example pair as such — never present it as a verified customer project.
  isExample: boolean;
}

// This pair illustrates the kind of transformation to expect — it is not a
// documented before/after from a specific completed customer job, and the
// homepage section labels it that way. Replace with a real customer pair
// (matching the same before/after framing and orientation) as soon as one
// exists, and flip isExample to false at that point.
export const beforeAfterProjects: BeforeAfterProject[] = [
  {
    id: "exterior-siding-example",
    title: "Exterior siding — before and after",
    beforeImage: "/photos/exterior-siding-before.png",
    afterImage: "/photos/exterior-siding-after.png",
    isExample: true,
  },
];
