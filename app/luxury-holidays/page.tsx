import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/layout/PageHero';
import { PackageGridSection } from '@/components/sections/PackageGridSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTABanner } from '@/components/home/CTABanner';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { getPackagesByCategory } from '@/lib/data/packages';
import { generalFaqs } from '@/lib/data/faqs';

export const metadata: Metadata = buildMetadata({
  title: 'Luxury Holidays | Exceptional Stays, Curated Service',
  description: 'Five-star luxury holidays including private villas, overwater suites and personal concierge service — curated by Flights Club UK.',
  path: '/luxury-holidays',
});

export default function LuxuryHolidaysPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Luxury Holidays', path: '/luxury-holidays' }]} />
      <PageHero
        eyebrow="Luxury Holidays"
        title="Exceptional Stays, Personally Curated"
        description="Private villas, overwater suites and white-glove service — for travellers who expect nothing less than exceptional."
        image="https://picsum.photos/seed/luxury-hero/1920/1080"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Luxury Holidays' }]}
      />
      <PackageGridSection pkgs={getPackagesByCategory('luxury')} />
      <FAQSection faqs={generalFaqs} />
      <CTABanner />
    </>
  );
}
