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
  title: 'City Breaks | Short Stays in World-Class Cities',
  description: 'Discover boutique city break packages to Paris, Rome, Istanbul, Dubai and beyond — flights and hotels bundled with Flights Club UK.',
  path: '/city-breaks',
});

export const dynamic = 'force-dynamic';

export default async function CityBreaksPage() {
  const packages = await getPackagesByCategory('city');

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'City Breaks', path: '/city-breaks' }]} />
      <PageHero
        eyebrow="City Breaks"
        title="Short Stays in the World’s Great Cities"
        description="From a long weekend in Paris to a cultural escape to Rome — beautifully located hotels, minimum fuss."
        image="https://picsum.photos/seed/city-breaks-hero/1920/1080"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'City Breaks' }]}
      />
      <PackageGridSection pkgs={packages} />
      <FAQSection faqs={generalFaqs} />
      <CTABanner />
    </>
  );
}
