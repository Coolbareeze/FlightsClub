// Placeholder per-departure-city fares shown on each destination page
// (/flights/[slug]) so visitors flying from outside London can see roughly
// what to expect before requesting a quote.
//
// There is no live fares API here — every price is derived deterministically
// from the single "From price" that's already set per destination in
// /admin/destinations, so it stays consistent across reloads and moves
// automatically whenever that admin price is updated. This is explicitly a
// placeholder (Ahmed's own words: "extrapolate placeholder, i will update
// later") — swap this out for real per-route fares (ideally its own
// "departure city price" admin field) once real data is available.
export interface DepartureFare {
  city: string;
  price: number | null; // null => no computed fare, shows a "Get prices" CTA instead
  stops: 'Direct' | '1+ stops' | null;
}

// Major UK departure cities we currently sell from — mirrors the UK entries
// in lib/data/airports.ts. Feel free to trim/reorder; the grid just maps
// over this list.
const UK_DEPARTURE_CITIES = [
  'London',
  'Manchester',
  'Birmingham',
  'Edinburgh',
  'Glasgow',
  'Bristol',
  'Newcastle',
  'Belfast',
];

function hashStr(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  return hash;
}

export function getDepartureFares(slug: string, basePrice: number): DepartureFare[] {
  return UK_DEPARTURE_CITIES.map((city) => {
    // London is the reference city — it's what the admin-set "From price" on
    // the destination already represents, so keep it exact and always direct.
    if (city === 'London') {
      return { city, price: basePrice, stops: 'Direct' as const };
    }

    const hash = hashStr(`${slug}-${city}`);

    // ~30% of regional cities show a "Get prices" CTA instead of a number —
    // stands in for routes without a convenient direct/1-stop option.
    if (hash % 10 >= 7) {
      return { city, price: null, stops: null };
    }

    const markup = 15 + (hash % 180); // +£15 to +£194 vs the London fare
    const isDirect = hash % 3 !== 0; // roughly 2 in 3 shown as direct
    return { city, price: basePrice + markup, stops: (isDirect ? 'Direct' : '1+ stops') as const };
  });
}
