import Image from 'next/image';
import { CheckCircle2, PlaneTakeoff, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { QuoteRequestForm } from '@/components/forms/QuoteRequestForm';
import type { Destination } from '@/types';

interface FlightSearchResultsProps {
  match: Destination | null;
  from: string;
  to: string;
  depart: string;
  ret: string;
  passengers: string;
  cabin: string;
  tripType: string;
}

// There's no live GDS/flight-pricing API behind this site (by design — see
// the project's data-sourcing notes), so a "search" can't return live fares.
// What it CAN do is tell the customer honestly what we found, and hand them
// straight into a pre-filled quote request so a consultant follows up with
// real prices — matching the "let our consultants secure the best price"
// promise made elsewhere on this page, instead of silently showing nothing.
export function FlightSearchResults({ match, from, to, depart, ret, passengers, cabin, tripType }: FlightSearchResultsProps) {
  return (
    <section className="section-pad bg-navy-50/60 dark:bg-navy-900/40">
      <Container>
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2">
            {match ? (
              <div className="overflow-hidden rounded-xl3 border border-navy-100 bg-white shadow-soft dark:border-white/10 dark:bg-navy-800">
                <div className="relative h-48 w-full">
                  <Image src={match.image} alt={`${match.city}, ${match.country}`} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-heading text-xl font-bold text-white">{match.city}, {match.country}</p>
                    <p className="text-sm text-white/75">from £{match.fromPrice} per person</p>
                  </div>
                </div>
                <div className="space-y-3 p-6">
                  <p className="flex items-center gap-2 text-sm font-semibold text-navy dark:text-white">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" /> We fly to {match.city} — here's your search
                  </p>
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div><dt className="text-navy-400">From</dt><dd className="font-medium text-navy dark:text-white">{from || '—'}</dd></div>
                    <div><dt className="text-navy-400">To</dt><dd className="font-medium text-navy dark:text-white">{match.city}, {match.country}</dd></div>
                    <div><dt className="text-navy-400">Depart</dt><dd className="font-medium text-navy dark:text-white">{depart || '—'}</dd></div>
                    {tripType !== 'One Way' && <div><dt className="text-navy-400">Return</dt><dd className="font-medium text-navy dark:text-white">{ret || '—'}</dd></div>}
                    <div><dt className="text-navy-400">Passengers</dt><dd className="font-medium text-navy dark:text-white">{passengers || '—'}</dd></div>
                    <div><dt className="text-navy-400">Cabin</dt><dd className="font-medium text-navy dark:text-white">{cabin || '—'}</dd></div>
                  </dl>
                  <p className="pt-1 text-xs leading-relaxed text-navy-500 dark:text-white/50">
                    Fares change by the hour, so we don't show a live price here — fill in the form and one of our flight
                    specialists will send you real fare options for these exact dates within 2 working hours.
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-xl3 border border-navy-100 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-navy-800">
                <p className="flex items-center gap-2 text-sm font-semibold text-navy dark:text-white">
                  <Sparkles className="h-4 w-4 shrink-0 text-gold" /> No set package for &ldquo;{to}&rdquo; yet
                </p>
                <p className="mt-2 text-sm leading-relaxed text-navy-500 dark:text-white/60">
                  We don't have a ready-made page for that route, but our consultants book flights to destinations well
                  beyond the ones listed on this site. Send us your details below and a flight specialist will get back
                  to you with real fare options — usually within 2 working hours.
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div><dt className="text-navy-400">From</dt><dd className="font-medium text-navy dark:text-white">{from || '—'}</dd></div>
                  <div><dt className="text-navy-400">To</dt><dd className="font-medium text-navy dark:text-white">{to || '—'}</dd></div>
                  <div><dt className="text-navy-400">Depart</dt><dd className="font-medium text-navy dark:text-white">{depart || '—'}</dd></div>
                  {tripType !== 'One Way' && <div><dt className="text-navy-400">Return</dt><dd className="font-medium text-navy dark:text-white">{ret || '—'}</dd></div>}
                </dl>
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center gap-2">
              <PlaneTakeoff className="h-5 w-5 text-gold" />
              <h2 className="font-heading text-xl font-bold text-navy dark:text-white">Get a Personalised Quote</h2>
            </div>
            <QuoteRequestForm
              defaultOrigin={from}
              defaultDestination={match ? `${match.city}, ${match.country}` : to}
              defaultDepartDate={depart}
              defaultPassengers={passengers}
              defaultCabin={cabin}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
