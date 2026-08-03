import type { HolidayPackage } from '@/types';

export const packages: HolidayPackage[] = [
  {
    slug: 'maldives-overwater-escape',
    title: 'Maldives Overwater Villa Escape',
    destination: 'Maldives', country: 'Maldives',
    image: 'https://picsum.photos/seed/maldives-villa/1200/900',
    duration: '7 nights', nights: 7, price: 1899, originalPrice: 2299,
    airline: 'Emirates', hotel: 'Velaa Private Island', hotelStars: 5, board: 'All-Inclusive', transfers: true,
    category: 'luxury',
    highlights: ['Private overwater villa with plunge pool', 'Return seaplane transfers', 'Daily spa credit'],
  },
  {
    slug: 'dubai-city-luxury',
    title: 'Dubai Skyline & Desert Luxury',
    destination: 'Dubai', country: 'United Arab Emirates',
    image: 'https://picsum.photos/seed/dubai-hotel/1200/900',
    duration: '5 nights', nights: 5, price: 799, originalPrice: 999,
    airline: 'Emirates', hotel: 'Address Downtown', hotelStars: 5, board: 'Bed & Breakfast', transfers: true,
    category: 'city',
    highlights: ['Burj Khalifa views', 'Desert safari with BBQ dinner', 'Private airport transfers'],
  },
  {
    slug: 'bali-honeymoon-retreat',
    title: 'Bali Honeymoon Retreat',
    destination: 'Bali', country: 'Indonesia',
    image: 'https://picsum.photos/seed/bali-villa/1200/900',
    duration: '10 nights', nights: 10, price: 1449, originalPrice: 1699,
    airline: 'Singapore Airlines', hotel: 'Ubud Private Pool Villas', hotelStars: 5, board: 'Half Board', transfers: true,
    category: 'honeymoon',
    highlights: ['Private infinity pool villa', 'Couples spa ritual', 'Sunrise Mount Batur trek'],
  },
  {
    slug: 'antalya-family-sun',
    title: 'Antalya Family All-Inclusive',
    destination: 'Antalya', country: 'Turkey',
    image: 'https://picsum.photos/seed/antalya-resort/1200/900',
    duration: '7 nights', nights: 7, price: 599, originalPrice: 749,
    airline: 'Turkish Airlines', hotel: 'Rixos Premium Belek', hotelStars: 5, board: 'Ultra All-Inclusive', transfers: true,
    category: 'family',
    highlights: ['Kids club & waterpark', 'Ultra all-inclusive dining', 'Direct flights from London'],
  },
  {
    slug: 'paris-city-break',
    title: 'Paris Boutique City Break',
    destination: 'Paris', country: 'France',
    image: 'https://picsum.photos/seed/paris-hotel/1200/900',
    duration: '3 nights', nights: 3, price: 349, originalPrice: 429,
    airline: 'British Airways', hotel: 'Le Marais Boutique Hotel', hotelStars: 4, board: 'Room Only', transfers: false,
    category: 'city',
    highlights: ['Central Marais location', 'Seine river cruise included', 'Skip-the-line Louvre tickets'],
  },
  {
    slug: 'phuket-beach-bliss',
    title: 'Phuket Beach Bliss',
    destination: 'Phuket', country: 'Thailand',
    image: 'https://picsum.photos/seed/phuket-resort/1200/900',
    duration: '9 nights', nights: 9, price: 1199, originalPrice: 1449,
    airline: 'Qatar Airways', hotel: 'Amari Phuket', hotelStars: 5, board: 'Bed & Breakfast', transfers: true,
    category: 'beach',
    highlights: ['Beachfront resort', 'Phi Phi Islands day trip', 'Free room upgrade on booking'],
  },
];

export function getPackagesByCategory(category: HolidayPackage['category']) {
  return packages.filter((p) => p.category === category);
}
