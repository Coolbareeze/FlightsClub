import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { destinations } from '@/lib/data/destinations';
import { blogPosts } from '@/lib/data/blog';

export const metadata: Metadata = buildMetadata({ title: 'Sitemap', description: 'A full overview of every page on the Flights Club UK website.', path: '/site-map' });

const groups = [
  { title: 'Company', links: [{ label: 'Home', href: '/' }, { label: 'About Us', href: '/about-us' }, { label: 'Why Choose Us', href: '/why-choose-us' }, { label: 'Contact', href: '/contact' }, { label: 'Blog', href: '/blog' }] },
  { title: 'Travel', links: [{ label: 'Flights', href: '/flights' }, { label: 'Holiday Packages', href: '/holiday-packages' }, { label: 'City Breaks', href: '/city-breaks' }, { label: 'Beach Holidays', href: '/beach-holidays' }, { label: 'Luxury Holidays', href: '/luxury-holidays' }, { label: 'Family Holidays', href: '/family-holidays' }, { label: 'Special Offers', href: '/special-offers' }] },
  { title: 'Services', links: [{ label: 'Business Travel', href: '/business-travel' }, { label: 'Visa Services', href: '/visa-services' }, { label: 'Travel Insurance', href: '/travel-insurance' }] },
  { title: 'Legal', links: [{ label: 'Privacy Policy', href: '/privacy-policy' }, { label: 'Terms & Conditions', href: '/terms' }, { label: 'Cookie Policy', href: '/cookie-policy' }] },
];

export default function SiteMapPage() {
  return (
    <div className="pt-32">
      <Container className="pb-20">
        <h1 className="font-heading text-3xl font-bold text-navy md:text-4xl dark:text-white">Sitemap</h1>
        <p className="mt-3 text-sm text-navy-700/60 dark:text-white/50">Every page on the Flights Club UK website.</p>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <div key={g.title}>
              <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-gold-dark">{g.title}</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-navy-700/75 dark:text-white/60">
                {g.links.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-navy dark:hover:text-white">{l.label}</Link></li>)}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-gold-dark">Destinations</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-700/75 dark:text-white/60">
              {destinations.slice(0, 8).map((d) => <li key={d.slug}><Link href={`/flights?to=${d.slug}`} className="hover:text-navy dark:hover:text-white">{d.city}</Link></li>)}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-gold-dark">Blog Posts</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-700/75 dark:text-white/60">
              {blogPosts.map((p) => <li key={p.slug}><Link href={`/blog/${p.slug}`} className="hover:text-navy dark:hover:text-white">{p.title}</Link></li>)}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
