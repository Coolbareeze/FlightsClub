'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftRight, CalendarDays, MapPin, Plane, Search, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AIRPORTS } from '@/lib/data/airports';
import type { Destination } from '@/types';

const UK_AIRPORTS = AIRPORTS.filter((a) => a.country === 'United Kingdom' || a.country === 'Ireland');

const tripTypes = ['Return', 'One Way', 'Multi-City'] as const;

export function FlightSearchWidget({ floating = true }: { floating?: boolean }) {
  const router = useRouter();
  const [tripType, setTripType] = useState<(typeof tripTypes)[number]>('Return');

  const [origin, setOrigin] = useState('London (LHR)');
  const [originOpen, setOriginOpen] = useState(false);
  const originBlurTimeout = useRef<ReturnType<typeof setTimeout>>();

  const [destination, setDestination] = useState('Dubai, United Arab Emirates');
  const [destinationSlug, setDestinationSlug] = useState<string | null>('dubai');
  const [destinationOpen, setDestinationOpen] = useState(false);
  const destinationBlurTimeout = useRef<ReturnType<typeof setTimeout>>();

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [depart, setDepart] = useState('');
  const [ret, setRet] = useState('');
  const [passengers, setPassengers] = useState('1 Adult');
  const [cabin, setCabin] = useState('Economy');

  // Load the live destinations list once, in the background, so the "To"
  // field can filter results as soon as the user starts typing — no need
  // to wait for a search submit or open a separate modal.
  useEffect(() => {
    fetch('/api/destinations')
      .then((res) => res.json())
      .then((data) => setDestinations(data.destinations ?? []))
      .catch(() => setDestinations([]));
  }, []);

  const swap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ from: origin, to: destination, depart, ret, passengers, cabin, tripType });
    if (destinationSlug) params.set('toSlug', destinationSlug);
    router.push(`/flights?${params.toString()}`);
  };

  const airportResults =
    origin.length > 0
      ? UK_AIRPORTS.filter(
          (a) =>
            a.city.toLowerCase().includes(origin.toLowerCase()) ||
            a.name.toLowerCase().includes(origin.toLowerCase()) ||
            a.code.toLowerCase().includes(origin.toLowerCase())
        ).slice(0, 8)
      : UK_AIRPORTS.slice(0, 8);

  // "To" searches the full worldwide airport list, not just our curated
  // destinations, so customers can find literally any major city/airport —
  // not only the ~100 we've written package/destination pages for. If a
  // result happens to match one of our own destinations we show its price;
  // otherwise it's just a plain airport result.
  const destinationResults =
    destination.length > 0
      ? AIRPORTS.filter(
          (a) =>
            a.city.toLowerCase().includes(destination.toLowerCase()) ||
            a.country.toLowerCase().includes(destination.toLowerCase()) ||
            a.name.toLowerCase().includes(destination.toLowerCase()) ||
            a.code.toLowerCase().includes(destination.toLowerCase())
        ).slice(0, 8)
      : AIRPORTS.slice(0, 8);

  const priceFor = (city: string) => destinations.find((d) => d.city.toLowerCase() === city.toLowerCase())?.fromPrice;

  return (
    <div className={cn('w-full rounded-xl3 border border-white/15 bg-white/95 p-5 shadow-premium backdrop-blur-xl md:p-7 dark:bg-navy-800/95', floating && '')}>
      <div className="mb-5 flex flex-wrap gap-2">
        {tripTypes.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTripType(t)}
            className={cn(
              'rounded-full px-4 py-1.5 text-xs font-semibold transition-colors',
              tripType === t ? 'bg-navy text-white' : 'bg-navy-50 text-navy-700 hover:bg-navy-100 dark:bg-white/10 dark:text-white/70'
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <form onSubmit={onSearch} className="grid grid-cols-1 gap-3 md:grid-cols-6">
        <div className="relative md:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold text-navy-700/70 dark:text-white/60">From</label>
          <div className="flex items-center gap-2 rounded-xl border border-navy-100 bg-white px-3.5 py-3 dark:border-white/15 dark:bg-navy-900">
            <Plane className="h-4 w-4 shrink-0 text-gold" />
            <input
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              onFocus={() => {
                clearTimeout(originBlurTimeout.current);
                setOriginOpen(true);
              }}
              onBlur={() => {
                originBlurTimeout.current = setTimeout(() => setOriginOpen(false), 150);
              }}
              autoComplete="off"
              placeholder="Departure airport"
              className="w-full bg-transparent text-sm font-medium outline-none dark:text-white"
            />
          </div>
          <button
            type="button"
            onClick={swap}
            aria-label="Swap origin and destination"
            className="absolute -right-3 top-9 z-10 hidden h-8 w-8 items-center justify-center rounded-full border border-navy-100 bg-white text-navy shadow-soft md:flex dark:border-white/15 dark:bg-navy-800 dark:text-white"
          >
            <ArrowLeftRight className="h-3.5 w-3.5" />
          </button>

          {originOpen && airportResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-20 mt-1.5 max-h-64 overflow-y-auto rounded-xl border border-navy-100 bg-white p-1.5 shadow-premium dark:border-white/15 dark:bg-navy-800">
              {airportResults.map((a) => (
                <button
                  key={a.code}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setOrigin(`${a.city} (${a.code})`);
                    setOriginOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-navy-50 dark:hover:bg-white/5"
                >
                  <span className="font-medium text-navy dark:text-white">{a.city} <span className="font-normal text-navy-400">— {a.name}</span></span>
                  <span className="text-xs text-navy-400">{a.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative md:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold text-navy-700/70 dark:text-white/60">To</label>
          <div className="flex items-center gap-2 rounded-xl border border-navy-100 bg-white px-3.5 py-3 dark:border-white/15 dark:bg-navy-900">
            <Plane className="h-4 w-4 shrink-0 rotate-90 text-gold" />
            <input
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setDestinationSlug(null);
              }}
              onFocus={() => {
                clearTimeout(destinationBlurTimeout.current);
                setDestinationOpen(true);
              }}
              onBlur={() => {
                destinationBlurTimeout.current = setTimeout(() => setDestinationOpen(false), 150);
              }}
              autoComplete="off"
              placeholder="Where do you want to go?"
              className="w-full bg-transparent text-sm font-medium outline-none dark:text-white"
            />
          </div>

          {destinationOpen && (
            <div className="absolute left-0 right-0 top-full z-20 mt-1.5 max-h-64 overflow-y-auto rounded-xl border border-navy-100 bg-white p-1.5 shadow-premium dark:border-white/15 dark:bg-navy-800">
              {destinationResults.length > 0 ? (
                destinationResults.map((a) => {
                  const price = priceFor(a.city);
                  return (
                    <button
                      key={a.code}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setDestination(`${a.city}, ${a.country}`);
                        const match = destinations.find((d) => d.city.toLowerCase() === a.city.toLowerCase());
                        setDestinationSlug(match?.slug ?? null);
                        setDestinationOpen(false);
                      }}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-navy-50 dark:hover:bg-white/5"
                    >
                      <span className="flex items-center gap-2 font-medium text-navy dark:text-white">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" /> {a.city}, {a.country}
                        <span className="font-normal text-navy-400">({a.code})</span>
                      </span>
                      <span className="text-xs text-navy-400">{price ? `from £${price}` : ''}</span>
                    </button>
                  );
                })
              ) : (
                <p className="px-3 py-4 text-center text-xs text-navy-400">No destinations found for “{destination}”.</p>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-navy-700/70 dark:text-white/60">Depart</label>
          <div className="flex items-center gap-2 rounded-xl border border-navy-100 bg-white px-3.5 py-3 dark:border-white/15 dark:bg-navy-900">
            <CalendarDays className="h-4 w-4 shrink-0 text-gold" />
            <input type="date" value={depart} onChange={(e) => setDepart(e.target.value)} className="w-full bg-transparent text-sm font-medium outline-none dark:text-white" />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-navy-700/70 dark:text-white/60">Return</label>
          <div className="flex items-center gap-2 rounded-xl border border-navy-100 bg-white px-3.5 py-3 dark:border-white/15 dark:bg-navy-900">
            <CalendarDays className="h-4 w-4 shrink-0 text-gold" />
            <input type="date" disabled={tripType === 'One Way'} value={ret} onChange={(e) => setRet(e.target.value)} className="w-full bg-transparent text-sm font-medium outline-none disabled:opacity-40 dark:text-white" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:col-span-6 lg:col-span-4 lg:grid-cols-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-navy-700/70 dark:text-white/60">Passengers</label>
            <div className="flex items-center gap-2 rounded-xl border border-navy-100 bg-white px-3.5 py-3 dark:border-white/15 dark:bg-navy-900">
              <Users className="h-4 w-4 shrink-0 text-gold" />
              <select value={passengers} onChange={(e) => setPassengers(e.target.value)} className="w-full bg-transparent text-sm font-medium outline-none dark:text-white">
                {['1 Adult', '2 Adults', '2 Adults, 1 Child', '2 Adults, 2 Children', 'Group (5+)'].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-navy-700/70 dark:text-white/60">Cabin</label>
            <div className="flex items-center gap-2 rounded-xl border border-navy-100 bg-white px-3.5 py-3 dark:border-white/15 dark:bg-navy-900">
              <select value={cabin} onChange={(e) => setCabin(e.target.value)} className="w-full bg-transparent text-sm font-medium outline-none dark:text-white">
                {['Economy', 'Premium Economy', 'Business', 'First'].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" className="btn-gold col-span-2 lg:col-span-2">
            <Search className="h-4 w-4" /> Search Flights
          </button>
        </div>
      </form>
    </div>
  );
}
