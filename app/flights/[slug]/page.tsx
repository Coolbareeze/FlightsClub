import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CheckCircle2, MapPin, PlaneTakeoff, ShieldCheck } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { QuoteRequestForm } from '@/components/forms/QuoteRequestForm';
import { DepartureFaresGrid } from '@/components/flights/DepartureFaresGrid';
import { PopularDestinationsGrid } from '@/components/home/PopularDestinationsGrid';
import { FAQSection } from '@/components/sections/FAQSection';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { getAllDestinations, getDestinationBySlug } from '@/lib/data/destinations';
import { generalFaqs } from '@/lib/data/faqs';
import { formatGBP } from '@/lib/utils';
import { flightPricingNote } from '@/lib/copy/flightPricingNote';

export const dynamic = 'force-dynamic';

// This is the indexable, canonical page for each destination — unlike
// /flights?to=<slug>, which is the live search-results view the widget
// redirects to. Google needs a real static-feeling URL per destination to
// rank for "flights to <city>" queries; a query-string results page won't
// reliably get indexed or ranked on its own.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) return {};
  return buildMetadata({
    title: `Cheap Flights to ${destination.city} from the UK | from ${formatGBP(destination.fromPrice)}`,
    description: `Compare and book cheap flights from the UK to ${destination.city}, ${destination.country} with Flights Club UK. Fares from ${formatGBP(destination.fromPrice)}pp, ATOL protected, expert consultants find you the best price.`,
    path: `/flights/${destination.slug}`,
    image: destination.image,
  });
}

export default async function DestinationFlightsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [destination, allDestinations] = await Promise.all([getDestinationBySlug(slug), getAllDestinations()]);
  if (!destination) notFound();

  const related = allDestinations.filter((d) => d.region === destination.region && d.slug !== destination.slug).slice(0, 5);

  return (
    <div className="pt-32">
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Flights', path: '/flights' },
          { name: destination.city, path: `/flights/${destination.slug}` },
        ]}
      />

      <Container>
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl3 shadow-premium">
              <Image src={destination.image} alt={`${destination.city}, ${destination.country}`} fill priority className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 via-navy-950/35 to-transparent px-5 pb-4 pt-14">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-white/70">Flights to {destination.city} from</p>
                    <p className="font-heading text-2xl font-extrabold text-white sm:text-3xl">
                      {formatGBP(destination.fromPrice)} <span className="text-sm font-medium text-white/70">pp</span>
                    </p>
                  </div>
                  <span className="eyebrow bg-white/15 text-white backdrop-blur">ATOL Protected</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-navy-700/60 dark:text-white/50">
              <MapPin className="h-4 w-4 text-gold" /> {destination.city}, {destination.country}
            </div>
            <h1 className="mt-2 font-heading text-3xl font-bold text-navy md:text-4xl dark:text-white">
              Cheap Flights to {destination.city}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-navy-700/75 dark:text-white/65">{destination.blurb}</p>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                { icon: PlaneTakeoff, label: `From ${formatGBP(destination.fromPrice)}pp` },
                { icon: ShieldCheck, label: 'ATOL Protected' },
                { icon: CheckCircle2, label: 'Best Price Guarantee' },
              ].map((f) => (
                <div key={f.label} className="rounded-xl2 border border-navy-100 bg-surface p-4 text-center dark:border-white/10 dark:bg-navy-800">
                  <f.icon className="mx-auto h-5 w-5 text-gold" />
                  <p className="mt-2 text-xs font-medium text-navy-700/80 dark:text-white/60">{f.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="font-heading text-lg font-bold text-navy dark:text-white">Flying to {destination.city}</h2>
              <p className="mt-3 text-sm leading-relaxed text-navy-700/75 dark:text-white/65">
                {flightPricingNote(destination.slug, destination.city, formatGBP(destination.fromPrice))}
              </p>
            </div>

            <div className="mt-10">
              <h2 className="font-heading text-lg font-bold text-navy dark:text-white">Compare Fares by UK Departure Airport</h2>
              <p className="mt-2 text-sm leading-relaxed text-navy-700/75 dark:text-white/65">
                Not flying from London? Here&rsquo;s a guide price to {destination.city} from other major UK airports — tap any city to request an exact quote.
              </p>
              <div className="mt-5">
                <DepartureFaresGrid slug={destination.slug} basePrice={destination.fromPrice} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div id="quote-form" className="sticky top-28 scroll-mt-28 rounded-xl2 border border-navy-100 bg-white p-6 shadow-premium dark:border-white/10 dark:bg-navy-800">
              <div className="flex items-end justify-between border-b border-navy-100 pb-5 dark:border-white/10">
                <div>
                  <p className="text-xs text-navy-700/60 dark:text-white/50">Flights to {destination.city} from</p>
                  <p className="font-heading text-3xl font-extrabold text-navy dark:text-white">{formatGBP(destination.fromPrice)}</p>
                  <p className="text-xs text-navy-700/60 dark:text-white/50">per person</p>
                </div>
                <span className="eyebrow">ATOL Protected</span>
              </div>
              <div className="mt-6">
                <QuoteRequestForm defaultDestination={`${destination.city}, ${destination.country}`} />
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20 border-t border-navy-100 pt-14 dark:border-white/10">
            <SectionHeading align="left" eyebrow="Nearby Destinations" title="You May Also Like" className="mx-0 text-left" />
            <PopularDestinationsGrid destinations={related} />
          </div>
        )}
      </Container>

      <div className="mt-20">
        <FAQSection faqs={generalFaqs} />
      </div>
      <div className="h-20" />
    </div>
  );
}
