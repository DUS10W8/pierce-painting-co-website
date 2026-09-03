# Pierce Painting Co. Website

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build for production

```bash
npm run build
npm run start
```

## Deploy (free)

The easiest free option is [Vercel](https://vercel.com) (built by the Next.js
team, generous free tier): push this folder to a GitHub repo, import it in
Vercel, and it deploys automatically with image optimization included.

## Editing site content

Almost everything on the site — phone number, email, service area, services,
process steps, trust badges, gallery projects, testimonials — is controlled
from **`src/lib/site-config.ts`**. Edit that one file for most content
changes; you shouldn't need to touch component code.

## Before this goes live — required follow-ups

1. **Domain** — `siteUrl` in `site-config.ts` is a placeholder
   (`https://www.piercepaintingco.com`). Update it to the real deployed URL
   once a domain is live, so canonical URLs / Open Graph / sitemap are correct.
2. **Email** — `email.isPlaceholder` is `true` because
   `info@piercepaintingco.com` doesn't exist yet (pending the Zoho Mail setup
   from the earlier project step). Update once it's live.
3. **Estimate form delivery** — `src/app/api/estimate/route.ts` currently
   validates and *logs* submissions server-side only. It does **not** email
   or text anyone yet. Wire it to a real provider (Resend, Postmark, or Zoho
   SMTP) before relying on the form to reach the business.
4. **Reviews** — `testimonials` in `site-config.ts` is intentionally empty;
   no real reviews were supplied. Add real ones as they come in — the
   Testimonials component automatically switches from its "coming soon"
   state to a working carousel once the array is populated.
5. **Before/after photos** — same situation: `beforeAfterProjects` is empty
   because no confirmed before/after pair was supplied. Add one (with
   `beforeImage`/`afterImage`) once available.
6. **Photography** — `public/photos/` currently holds the four AI-generated
   preview-style images supplied with this project (not verified real job
   photos). Swap in real project photography as it becomes available —
   just replace the files and/or update `galleryProjects` in
   `site-config.ts`.
7. **Hours, license/insurance, employee names** — intentionally omitted
   everywhere on the site because they weren't confirmed. Add copy for these
   once the business has real answers — don't invent them.

## Project structure

- `src/app/` — routes (App Router)
- `src/components/layout/` — header, footer, announcement bar, sticky mobile CTA
- `src/components/home/` — homepage-only sections
- `src/components/shared/` — reusable across pages (service cards, forms, sliders, gallery)
- `src/lib/site-config.ts` — all editable content
- `src/lib/schema.ts` — LocalBusiness JSON-LD
- `public/assets/` — supplied brand graphics (logos, icons, badges, favicons)
- `public/photos/` — real/preview photography
