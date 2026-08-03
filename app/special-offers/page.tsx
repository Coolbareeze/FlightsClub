import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PackageCard } from '@/components/home/PackageCard';
import { OfferCountdown } from '@/components/sections/OfferCountdown';
import { CTABanner } from '@/components/home/CTABanner';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { packages } from '@/lib/data/packages';

export const metadata: Metadata = buildMetadata({
  title: 'Special Offers | Limited-Time Flight & Holiday Deals',
  description: 'Explore limited-time flight and holiday deals from Flights Club UK — updated weekly, all ATOL protected.',
  path: '/special-offers',
});

export default function SpecialOffersPage() {
  const deal = packages[0];

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Special Offers', path: '/special-offers' }]} />
      <PageHero
        eyebrow="Special Offers"
        title="Limited-Time Fares & Holiday Deals"
        description="Hand-selected offers, refreshed weekly by our travel desk. Once they’re gone, they’re gone."
        image="https://picsum.photos/seed/offers-hero/1920/1080"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Special Offers' }]}
      />

      <section className="bg-white py-10 dark:bg-navy-950">
        <Container>
          <div className="flex flex-col items-center justify-between gap-6 rounded-xl2 border border-gold/30 bg-gold/5 p-6 sm:flex-row">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gold-dark">Deal of the Week</p>
              <p className="mt-1 font-heading text-lg font-bold text-navy dark:text-white">{deal.title} — from £{deal.price}pp</p>
            </div>
            <OfferCountdown target={new Date(Date.now() + 4 * 86400000).toISOString()} />
          </div>
        </Container>
      </section>

      <section className="section-pad bg-white dark:bg-navy-950">
        <Container>
          <SectionHeading eyebrow="This Week’s Deals" title="Offers Selected by Our Travel Desk" align="left" className="mx-0 text-left" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg, i) => <PackageCard key={pkg.slug} pkg={pkg} index={i} />)}
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
