# Flights Club UK — Website

A premium, custom-designed Next.js website for **Flights Club UK**, a London-based ATOL-protected travel agency. Built to compete visually and functionally with Expedia, Booking.com, TravelUp and lastminute.com while feeling like a bespoke luxury aviation brand (Emirates × Apple × British Airways).

Verified: `npm run build` compiles clean with zero TypeScript errors and all routes build successfully (static where possible, server-rendered where content is DB-backed).

## Tech Stack

- **Next.js 16** (App Router + Turbopack, SSR + SSG, `next/image`, `next/font`)
- **TypeScript** (strict mode)
- **Tailwind CSS** (custom design tokens for the brand's colour, type and shadow system)
- **Framer Motion** (page/section animations, micro-interactions)
- **React Hook Form + Zod** (all form validation)
- **Embla Carousel** (testimonials)
- **Lucide React** (icon set)

**Note on linting:** Next.js 16 removed the built-in `next lint` command and no longer runs ESLint during `next build`. `eslint`/`eslint-config-next` were dropped from `devDependencies` to avoid a peer-dependency conflict (eslint-config-next 16.x requires ESLint 9's flat config, and pulling that in was out of scope for this fix). To re-add linting later: `npm i -D eslint@^9 eslint-config-next@16` and create an `eslint.config.mjs` per [Next's ESLint docs](https://nextjs.org/docs/app/api-reference/config/eslint).

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

## Project Structure

```
app/                      Routes (App Router) — one folder per page
  api/                    Mock form-submission API routes (contact, quote, newsletter)
  blog/[slug]/            Blog post template
  holiday-packages/[slug] Package detail template
  sitemap.ts, robots.ts   Auto-generated sitemap.xml / robots.txt
components/
  ui/                     Design-system primitives (Button, Card, Accordion, Field, ...)
  layout/                 Header, Footer, mega menu, floating actions, cookie banner...
  home/                   Homepage sections (Hero, search widget, destinations, ...)
  forms/                  Contact / Quote / Holiday / Visa / Corporate forms
  sections/               Reusable page sections (FAQ, package grid, countdown)
  seo/                    JSON-LD schema components (TravelAgency, FAQ, Breadcrumb)
lib/
  data/                   Destinations, packages, airlines, testimonials, blog, FAQs
  constants.ts            Brand/company constants, nav structure, trust badges
  seo.ts                  Metadata builder helper
  utils.ts                cn(), formatGBP(), slugify()
types/                    Shared TypeScript interfaces
public/                   Static assets (see placeholder notes below)
```

## Brand & Design System

See **BRAND_GUIDE.md** for the full colour system, typography scale and component
patterns. Design tokens live in `tailwind.config.ts` (colours: `navy`, `royal`,
`gold`, `sky`, `success`; fonts: `font-heading` = Manrope, `font-body` = Inter).

## Logo & Placeholder Assets

Per the project brief, **no logo was generated**. The header, footer and favicon
currently render the wordmark "Flights Club **UK**" in Manrope. When the final
logo is supplied:

1. Add `logo.svg` (and a light/dark variant if needed) to `public/images/`.
2. Replace the wordmark `<span>` in `components/layout/Header.tsx` and
   `components/layout/Footer.tsx` with an `<Image>` of the logo.
3. Generate `favicon.ico`, `apple-touch-icon.png` and social share images
   (`og-default.jpg`, 1200×630) from the logo and place them per Next.js's
   [metadata file conventions](https://nextjs.org/docs/app/api-reference/file-conventions/metadata).

All destination, package, team and blog images currently use `picsum.photos`
seeded placeholders (defined in `lib/data/*.ts`) so the project builds and
previews immediately without any external asset dependency. Swap these for
licensed photography before launch — see `public/images/README.txt`.

The homepage hero expects a looping background video at
`public/videos/hero-flight.mp4` (falls back gracefully to the poster image if
absent) — see `public/videos/README.txt`.

## Forms & Backend Integration

Six forms (Contact, Quote Request, Holiday Enquiry, Visa Enquiry, Corporate
Travel, Newsletter) are fully built with React Hook Form + Zod validation,
success animations and a honeypot field on the contact form for basic spam
protection. They currently POST to mock Next.js API routes in `app/api/*`
that validate the payload and return `{ ok: true }`.

To go live, wire these routes to:

- A transactional email provider (Resend, SendGrid, Postmark) or CRM webhook
- Rate limiting + CAPTCHA (e.g. Cloudflare Turnstile) in front of the handlers
- Mailchimp/Klaviyo for the newsletter endpoint

## Admin Panel (Manage Packages & Destinations)

The site includes a built-in, password-protected admin panel at **`/admin`** for
adding, editing and deleting Holiday Packages and Destinations — no external
CMS or extra account needed. It's backed by a MySQL database (the one already
included free with Hostinger Business Web Hosting).

### 1. Create the MySQL database in Hostinger

1. In **hPanel** → **Databases** → **MySQL Databases**.
2. Create a new database, e.g. `u123456789_fcuk`. Hostinger auto-generates the
   full database name/username with your account prefix — note both.
3. Create a database user (or use the auto-created one) and set a strong password.
4. Note the **database host** — on Hostinger this is usually `localhost` when
   the app and database are on the same account, but check the MySQL Databases
   page; it will show the exact host to use.

### 2. Set environment variables

Copy `.env.example` to `.env.local` for local development, and add the same
variables in Hostinger under your Node.js app → **Environment variables**
(so they apply to the live deployment):

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=u123456789_fcuk
DB_USER=u123456789_fcuk
DB_PASSWORD=your-db-password
ADMIN_PASSWORD=choose-a-strong-password
ADMIN_SESSION_SECRET=a-long-random-string
```

Generate `ADMIN_SESSION_SECRET` with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

After adding/changing env vars in Hostinger, **restart the Node.js app** for them to take effect.

### 3. Log in and load starter content

1. Visit `https://flightsclubuk.co.uk/admin`.
2. Log in with the password you set as `ADMIN_PASSWORD`.
3. On the **Dashboard**, click **Run now** under "Load starter content." This
   creates the `packages` and `destinations` tables if they don't exist yet
   and inserts the sample packages/destinations as starting content — no
   terminal needed. It runs entirely on the server, which is why it works
   even though Hostinger's shared MySQL databases generally aren't reachable
   from your own computer (`DB_HOST=localhost` only resolves correctly from
   the server itself). Safe to click more than once — it upserts by slug
   rather than duplicating rows.

   (Alternative for local development: `npm run db:seed` does the same thing
   from your machine, but only works if `DB_HOST` in your `.env.local`
   points at a database reachable from your computer — e.g. Remote MySQL
   enabled in hPanel, not `localhost`.)

### 4. Manage content

**Holiday Packages** and **Destinations** each have a list view with
Add / Edit / Delete. Changes go live immediately — the public site reads
directly from the same database (pages are server-rendered per request).

### Notes

- If the database is ever unreachable, the public site **degrades gracefully**
  rather than crashing: destination/package sections simply render empty
  instead of throwing, and the error is logged server-side only.
- `/admin/*` and `/api/admin/*` are protected by `proxy.ts` (Next.js's
  middleware layer), which checks a signed, HttpOnly session cookie set on
  login. There's no way to reach the CRUD screens or APIs without the
  `ADMIN_PASSWORD`.
- To change the admin password, just update `ADMIN_PASSWORD` in Hostinger's
  environment variables and restart the app — existing sessions are
  invalidated since the cookie is verified against the current secret/password
  each request.

## SEO

- Per-page `generateMetadata` / `metadata` exports (title, description, canonical, OG, Twitter cards)
- JSON-LD: `TravelAgency`, `FAQPage`, `BreadcrumbList` schemas (`components/seo/JsonLd.tsx`)
- Auto-generated `sitemap.xml` and `robots.txt` (`app/sitemap.ts`, `app/robots.ts`)
- Semantic heading hierarchy, descriptive `alt` text on all `next/image` usage
- Human-readable HTML sitemap at `/site-map`

## Future Integrations (architecture-ready)

The codebase is structured so these can be dropped in without restructuring:

| Category | Providers |
|---|---|
| Flight/GDS APIs | Travelport, Amadeus, Duffel, Skyscanner |
| Hotel APIs | Hotelbeds, TBO Holidays |
| Payments | Stripe, PayPal, Worldpay |
| Reviews | Google Reviews API |
| Messaging | WhatsApp Business API, live chat widget |
| Marketing | Mailchimp, GA4, GTM, Meta Pixel, Microsoft Clarity |

Add these as environment variables in `.env.local` (never commit secrets) and
wire them into the relevant `app/api/*` route handlers or a new `lib/integrations/` folder.

## Security

- Security headers set in `next.config.mjs` (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- Zod input validation + sanitisation on every form
- Honeypot field on the contact form
- `/api/*` disallowed in `robots.txt`
- HTTPS enforced at the hosting layer (see Deployment)

**Still to add for production:** CSRF tokens on state-changing routes, rate
limiting (e.g. `@upstash/ratelimit`) and CAPTCHA on public forms.

## Accessibility

Semantic landmarks, visible focus states (`:focus-visible`), `aria-label`s on
icon-only buttons, keyboard-operable mega menu/search modal/accordion, and
colour contrast chosen against WCAG AA against the navy/white/gold palette.

## Deployment (Vercel — recommended)

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Next.js** (auto-detected). No extra build config needed.
4. Add environment variables for any integrations you've connected (email API keys, analytics IDs, etc.).
5. Attach the `flightsclubuk.co.uk` domain under Project → Settings → Domains.
6. Deploy — Vercel handles SSR, image optimisation and edge caching automatically.

**Alternative hosts:** any Node.js host that supports Next.js (Netlify, Render, AWS Amplify, self-hosted Node server via `npm run build && npm run start`).

## Known Limitations / Next Steps

- Placeholder imagery (picsum.photos) throughout — replace before launch
- Forms are wired to mock API routes, not a live email/CRM backend
- No logo/favicon supplied yet (by design, per brief)
- Dark mode toggle is implemented (class-based, persisted to `localStorage`) but not deeply audited on every component
- Packages and Destinations are editable via the built-in `/admin` panel (MySQL-backed) — see **Admin Panel** above. Other content (blog posts, testimonials, FAQs, airlines) still lives in typed data files under `lib/data/` for now; the same admin-panel pattern can be extended to these if needed.
