import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FlightSearchWidget } from '@/components/home/FlightSearchWidget';
import { PopularDestinationsGrid } from '@/components/home/PopularDestinationsGrid';
import { FlightSearchResults } from '@/components/flights/FlightSearchResults';
import { AirlinesSlider } from '@/components/home/AirlinesSlider';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTABanner } from '@/components/home/CTABanner';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { getAllDestinations, getDestinationBySlug } from '@/lib/data/destinations';
import { generalFaqs } from '@/lib/data/faqs';
import type { Destination } from '@/types';

export const metadata: Metadata = buildMetadata({
  title: 'Cheap Flights | Compare & Book Flights from the UK',
  description: 'Search and compare cheap flights from the UK to 190+ destinations worldwide with Flights Club UK. ATOL protected, best price guarantee, 24/7 support.',
  path: '/flights',
});

export const dynamic = 'force-dynamic';

type SearchParams = Promise<{
  from?: string;
  to?: string;
  toSlug?: string;
  depart?: string;
  ret?: string;
  passengers?: string;
  cabin?: string;
  tripType?: string;
}>;

export default async function FlightsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const destinations = await getAllDestinations();

  // A "search" was submitted if there's a destination to look up — either
  // the search widget's toSlug, or a slug/city typed directly (e.g. the
  // homepage grid links here as /flights?to=<slug>).
  const hasSearch = Boolean(params.to || params.toSlug);
  let match: Destination | null = null;
  if (hasSearch) {
    if (params.toSlug) {
      match = await getDestinationBySlug(params.toSlug);
    }
    if (!match && params.to) {
      // params.to may be a raw slug ("marrakech") or a display string
      // ("Marrakech, Morocco") depending on which link/form produced it.
      const cityGuess = params.to.split(',')[0].trim().toLowerCase();
      match =
        destinations.find((d) => d.slug === params.to) ??
        destinations.find((d) => d.city.toLowerCase() === cityGuess) ??
        null;
    }
  }

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

      {hasSearch && (
        <FlightSearchResults
          match={match}
          from={params.from ?? ''}
          to={match ? match.city : (params.to ?? '')}
          depart={params.depart ?? ''}
          ret={params.ret ?? ''}
          passengers={params.passengers ?? '1 Adult'}
          cabin={params.cabin ?? 'Economy'}
          tripType={params.tripType ?? 'Return'}
        />
      )}

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
