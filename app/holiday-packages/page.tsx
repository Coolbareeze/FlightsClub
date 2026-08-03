import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/layout/PageHero';
import { PackageGridSection } from '@/components/sections/PackageGridSection';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTABanner } from '@/components/home/CTABanner';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { packages } from '@/lib/data/packages';
import { generalFaqs } from '@/lib/data/faqs';

export const metadata: Metadata = buildMetadata({
  title: 'Holiday Packages | All-Inclusive & ATOL Protected',
  description: 'Browse handpicked, ATOL-protected holiday packages including flights, hotels and transfers. Beach, city, luxury and family holidays from Flights Club UK.',
  path: '/holiday-packages',
});

export default function HolidayPackagesPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Holiday Packages', path: '/holiday-packages' }]} />
      <PageHero
        eyebrow="Holiday Packages"
        title="All-Inclusive Holidays, Perfectly Packaged"
        description="Flights, hotels and transfers bundled into a single, fully protected booking — handpicked by our travel consultants."
        image="https://picsum.photos/seed/packages-hero/1920/1080"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Holiday Packages' }]}
      />
      <PackageGridSection pkgs={packages} />
      <WhyChooseUsSection />
      <FAQSection faqs={generalFaqs} />
      <CTABanner />
    </>
  );
}
