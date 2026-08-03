# Flights Club UK — Brand & Style Guide

Positioning: **Emirates × Apple × British Airways.** Luxury, trustworthy,
minimal, international. Every surface should feel considered — no stock
travel-agency clichés, no bright gradients, no clutter.

## Logo

No logo has been generated for this project — the final logo will be supplied
separately and should be dropped into `public/images/logo.svg`, then wired
into `components/layout/Header.tsx` and `components/layout/Footer.tsx` in
place of the current wordmark. Until then, the site uses a typographic
wordmark: **Flights Club** in white/navy + **UK** in gold, set in Manrope
Extrabold.

## Colour System

Defined in `tailwind.config.ts`. Use Tailwind utility classes (`bg-navy`,
`text-gold`, etc.) — never hard-code hex values in components.

| Token | Hex | Usage |
|---|---|---|
| `navy` (DEFAULT) | `#071B33` | Primary brand colour — headers, footers, dark sections, headings |
| `royal` | `#0A4D8C` | Secondary blue — gradients, links, secondary CTAs |
| `gold` | `#C89A2B` | Accent — CTAs, prices, icons, highlights. Use sparingly for maximum impact |
| `sky` | `#3AA8FF` | Accent blue — small highlights, hover glows |
| `success` | `#00A86B` | Confirmations, savings badges, success states |
| `surface` | `#F7F8FA` | Light section backgrounds |
| `ink` | `#1B1F23` | Body text on light backgrounds |
| `white` | `#FFFFFF` | Base, text on dark backgrounds |

**Gradients:** `bg-navy-gradient` (135°, navy → deep navy → royal) for dark
sections; `bg-gold-gradient` for primary CTA buttons and price accents. Avoid
any other gradient combinations — this is a deliberately restrained palette.

**Dark mode:** class-based (`dark:` variants throughout), toggled via the
header moon/sun icon and persisted to `localStorage`.

## Typography

| Role | Font | Tailwind class |
|---|---|---|
| Headings (h1–h6, display) | **Manrope** (weights 700–800) | `font-heading` |
| Body copy | **Inter** (weights 400–600) | `font-body` (default) |
| Buttons | Manrope/Inter Semibold | inherited via `.btn-*` utility classes |

Loaded via `next/font/google` in `app/layout.tsx` (self-hosted at build time,
zero layout shift, no external font requests at runtime).

**Scale:** Headings use `text-3xl` → `text-6xl` depending on hierarchy, always
paired with `text-balance` for clean line-wrapping and generous
`leading-[1.08]`–`leading-relaxed`. Body copy sits at `text-sm`/`text-base`
with `/60`–`/80` opacity variants of navy or white for secondary text.

## Spacing & Shape

- **Section rhythm:** `.section-pad` = `py-20 md:py-28` — use for every major
  page section for consistent vertical rhythm.
- **Corners:** `rounded-xl2` (1.25rem) for cards, `rounded-xl3` (1.75rem) for
  hero panels/CTAs, `rounded-full` for buttons and pills. No sharp corners
  anywhere in the UI.
- **Shadows:** `shadow-soft` (default card elevation), `shadow-premium`
  (hover/prominent elements), `shadow-gold` (gold CTA glow), `shadow-glass`
  (glassmorphism nav). Never use default Tailwind shadows — always the
  brand-tuned soft shadows.

## Components

Reusable primitives live in `components/ui/`:

- **Buttons** (`.btn-primary`, `.btn-gold`, `.btn-outline`) — pill-shaped,
  ripple micro-interaction on click, `active:scale-[0.98]` press feedback.
- **Cards** — `rounded-xl2`, `shadow-soft`, `.card-lift` utility for hover
  translate + shadow-premium.
- **Glassmorphism** — reserved for the sticky navigation bar and dark-section
  overlay panels only (`.glass-panel`). Not used decoratively elsewhere.
- **Eyebrow labels** — `.eyebrow` (gold pill, uppercase, tracked) precedes
  every section heading for consistent hierarchy.

## Motion

Framer Motion throughout, tuned to a single easing curve:
`cubic-bezier(0.22, 1, 0.36, 1)` ("premium ease") for slide/fade entrances,
0.6–0.8s duration. Scroll-triggered reveals use `whileInView` with
`viewport={{ once: true }}` so animations never replay distractingly.
Counters animate via `framer-motion`'s spring value on scroll-into-view.
Floating decorative blur orbs use the Tailwind `animate-float` keyframe
(6s ease-in-out loop) — used sparingly, only in hero sections.

## Imagery

Full-bleed, high-contrast travel photography with a navy gradient overlay
(`from-navy-950 via-navy-900/70 to-navy-950/40`) for text legibility on hero
and page-header sections. Destination/package cards use a 3:4 or 4:3 crop
with a bottom gradient scrim for caption legibility. Never crop faces awkwardly
or use low-contrast, washed-out photography — every image should read as
premium editorial, not stock.

## Voice & Tone

Confident, warm, precise. Short sentences for CTAs ("Get a Free Quote", "Call
an Expert"). Slightly longer, reassuring sentences for trust copy (ATOL,
security, support). Avoid exclamation marks and hard-sell language — the
brand persuades through quality and clarity, not urgency gimmicks (the one
exception being the Special Offers countdown, used sparingly and honestly).
