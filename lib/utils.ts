import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatGBP(value: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value);
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Self-hosted images pasted into the admin panel as a full absolute URL
// (e.g. https://www.flightsclubuk.co.uk/images/destinations/antigua.jpg)
// make next/image's optimizer perform a real outbound HTTPS request back to
// the same server to fetch them. On this host that self-referencing request
// fails server-side (500 from /_next/image), even though the file itself is
// reachable directly. Stripping the site's own origin down to a root-relative
// path (/images/destinations/antigua.jpg) makes next/image read the file
// straight off disk instead — no network round-trip, no failure. Genuinely
// external URLs (Unsplash, Pexels, picsum, etc.) are left untouched.
const OWN_ORIGINS = ['https://www.flightsclubuk.co.uk', 'https://flightsclubuk.co.uk'];

export function normalizeImageUrl(url: string | null | undefined): string {
  if (!url) return '';
  for (const origin of OWN_ORIGINS) {
    if (url.startsWith(origin + '/')) return url.slice(origin.length);
  }
  return url;
}
