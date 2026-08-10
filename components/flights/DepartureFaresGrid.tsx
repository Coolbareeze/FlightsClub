import { formatGBP } from '@/lib/utils';
import { getDepartureFares } from '@/lib/copy/departureFares';

interface DepartureFaresGridProps {
  slug: string;
  basePrice: number;
}

// Every card links to the sticky quote form (#quote-form) further up the
// page — the point isn't to be a live comparison tool, it's to nudge every
// visitor, wherever they're flying from, toward requesting a quote.
export function DepartureFaresGrid({ slug, basePrice }: DepartureFaresGridProps) {
  const fares = getDepartureFares(slug, basePrice);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {fares.map((fare) => (
        <a
          key={fare.city}
          href="#quote-form"
          className="card-lift block rounded-xl2 border border-navy-100 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-navy-800"
        >
          <p className="font-heading text-lg font-bold text-navy dark:text-white">{fare.city}</p>
          {fare.price !== null ? (
            <div className="mt-3 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs text-navy-700/60 dark:text-white/50">Flights from</p>
                {fare.stops && <p className="mt-1 text-xs text-navy-700/50 dark:text-white/40">{fare.stops}</p>}
              </div>
              <p className="font-heading text-2xl font-extrabold text-navy dark:text-white">{formatGBP(fare.price)}</p>
            </div>
          ) : (
            <p className="mt-3 text-sm font-semibold text-gold-dark">Get prices</p>
          )}
        </a>
      ))}
    </div>
  );
}
