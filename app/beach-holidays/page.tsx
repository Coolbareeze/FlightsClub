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
  title: 'Beach Holidays | Sun, Sand & Five-Star Shores',
  description: 'Book beach holidays to Phuket, the Maldives, Antalya and more — all-inclusive resorts with flights and transfers included.',
  path: '/beach-holidays',
});

export default function BeachHolidaysPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Beach Holidays', path: '/beach-holidays' }]} />
      <PageHero
        eyebrow="Beach Holidays"
        title="Sun, Sand and Five-Star Shores"
        description="From the turquoise coast of Turkey to the islands of Thailand — beach escapes for every kind of traveller."
        image="https://picsum.photos/seed/beach-hero/1920/1080"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Beach Holidays' }]}
      />
      <PackageGridSection pkgs={getPackagesByCategory('beach')} />
      <FAQSection faqs={generalFaqs} />
      <CTABanner />
    </>
  );
}
