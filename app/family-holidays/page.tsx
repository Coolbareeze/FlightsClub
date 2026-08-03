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
  title: 'Family Holidays | Built for Every Generation',
  description: 'Family-friendly all-inclusive holidays with kids clubs, waterparks and spacious rooms — book with Flights Club UK.',
  path: '/family-holidays',
});

export const dynamic = 'force-dynamic';

export default async function FamilyHolidaysPage() {
  const packages = await getPackagesByCategory('family');

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Family Holidays', path: '/family-holidays' }]} />
      <PageHero
        eyebrow="Family Holidays"
        title="Holidays Built for Every Generation"
        description="Kids clubs, family rooms and ultra all-inclusive dining — holidays where everyone from toddlers to grandparents is looked after."
        image="https://picsum.photos/seed/family-hero/1920/1080"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Family Holidays' }]}
      />
      <PackageGridSection pkgs={packages} />
      <FAQSection faqs={generalFaqs} />
      <CTABanner />
    </>
  );
}
