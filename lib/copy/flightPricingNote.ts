// Six variants of the "why don't you show a live price" explainer shown on
// every /flights/[slug] destination page. With 119+ destinations all
// rendering the same page template, using one fixed sentence everywhere
// would mean 119 pages carrying near-identical body copy — a pattern search
// engines can read as thin/templated content. Rotating between a handful of
// genuinely different phrasings (chosen deterministically per destination,
// so it's stable on every render/deploy) keeps each page's copy distinct
// without hand-writing bespoke paragraphs for every single destination.
const VARIANTS: ((city: string, price: string) => string)[] = [
  (city, price) =>
    `Fares to ${city} change by the hour, so we don't publish a live price here — the ${price} figure above reflects what customers have recently paid for this route. Fill in your travel dates below and a flight specialist will send you real fare options, usually within 1 working hour.`,
  (city, price) =>
    `We don't quote a live fare for ${city} on this page, since prices move constantly with demand and availability. The ${price}pp shown is based on recent bookings — share your dates below and one of our consultants will come back with current options within 1 working hour.`,
  (city, price) =>
    `Like most routes, ${city} fares shift throughout the day, so what you see above (${price}pp) is a recent-price guide rather than a live quote. Tell us when you'd like to travel and a specialist will find the best fare currently available, typically within 1 working hour.`,
  (city, price) =>
    `Rather than show a fare that could be out of date by the time you book, we've listed what customers have recently paid to fly to ${city} (from ${price}pp). Send your dates through the form below and we'll come back with live options within 1 working hour.`,
  (city, price) =>
    `Airline pricing for ${city} changes constantly, so the ${price}pp figure above is a recent guide price, not a live fare. Our consultants track fares across multiple airlines daily — request a quote below and expect a reply within 1 working hour.`,
  (city, price) =>
    `We keep the ${price}pp shown here updated with what recent travellers have paid to fly to ${city}, rather than a live price that could change before you book. Get in touch with your dates below and a flight specialist will confirm current options within 1 working hour.`,
];

export function flightPricingNote(slug: string, city: string, price: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  const variant = VARIANTS[hash % VARIANTS.length];
  return variant(city, price);
}
