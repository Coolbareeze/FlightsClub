import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FlightSearchWidget } from '@/components/home/FlightSearchWidget';
import { PopularDestinationsGrid } from '@/components/home/PopularDestinationsGrid';
import { AirlinesSlider } from '@/components/home/AirlinesSlider';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTABanner } from '@/components/home/CTABanner';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { getAllDestinations } from '@/lib/data/destinations';
import { generalFaqs } from '@/lib/data/faqs';

export const metadata: Metadata = buildMetadata({
  title: 'Cheap Flights | Compare & Book Flights from the UK',
  description: 'Search and compare cheap flights from the UK to 190+ destinations worldwide with Flights Club UK. ATOL protected, best price guarantee, 24/7 support.',
  path: '/flights',
});

export const dynamic = 'force-dynamic';

export default async function FlightsPage() {
  const destinations = await getAllDestinations();

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Flights', path: '/flights' }]} />
      <PageHero
        eyebrow="Flight Booking"
        title="Cheap Flights to Every Corner of the World"
        description="Compare live fares across 500+ airlines and let our consultants secure the best possible price for your journey."
        image="https://picsum.photos/seed/flights-hero/1920/1080"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Flights' }]}
      />

      <section className="relative bg-navy pb-24">
        <Container className="-mt-8">
          <FlightSearchWidget />
        </Container>
      </section>

      <section className="section-pad bg-white dark:bg-navy-950">
        <Container>
          <SectionHeading eyebrow="Popular Routes" title="Direct Flights From the UK" align="left" className="mx-0 text-left" />
          <PopularDestinationsGrid destinations={destinations.slice(0, 15)} />
        </Container>
      </section>

      <AirlinesSlider />
      <WhyChooseUsSection />
      <FAQSection faqs={generalFaqs} />
      <CTABanner />
    </>
  );
}
