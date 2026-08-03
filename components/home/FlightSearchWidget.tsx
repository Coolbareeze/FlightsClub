'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftRight, CalendarDays, Plane, Search, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const tripTypes = ['Return', 'One Way', 'Multi-City'] as const;

export function FlightSearchWidget({ floating = true }: { floating?: boolean }) {
  const router = useRouter();
  const [tripType, setTripType] = useState<(typeof tripTypes)[number]>('Return');
  const [origin, setOrigin] = useState('London (LHR)');
  const [destination, setDestination] = useState('Dubai (DXB)');
  const [depart, setDepart] = useState('');
  const [ret, setRet] = useState('');
  const [passengers, setPassengers] = useState('1 Adult');
  const [cabin, setCabin] = useState('Economy');

  const swap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ from: origin, to: destination, depart, ret, passengers, cabin, tripType });
    router.push(`/flights?${params.toString()}`);
  };

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
            <input value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full bg-transparent text-sm font-medium outline-none dark:text-white" />
          </div>
          <button
            type="button"
            onClick={swap}
            aria-label="Swap origin and destination"
            className="absolute -right-3 top-9 z-10 hidden h-8 w-8 items-center justify-center rounded-full border border-navy-100 bg-white text-navy shadow-soft md:flex dark:border-white/15 dark:bg-navy-800 dark:text-white"
          >
            <ArrowLeftRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="md:col-span-2">
          <label className="mb-1.5 block text-xs font-semibold text-navy-700/70 dark:text-white/60">To</label>
          <div className="flex items-center gap-2 rounded-xl border border-navy-100 bg-white px-3.5 py-3 dark:border-white/15 dark:bg-navy-900">
            <Plane className="h-4 w-4 shrink-0 rotate-90 text-gold" />
            <input value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full bg-transparent text-sm font-medium outline-none dark:text-white" />
          </div>
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
