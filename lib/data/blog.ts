import type { BlogPost } from '@/types';

export const blogPosts: BlogPost[] = [
  {
    slug: 'best-time-to-visit-maldives',
    title: 'The Best Time to Visit the Maldives (And When to Avoid)',
    excerpt: 'Dry season, monsoon season and everything in between — here’s exactly when to book your overwater escape.',
    category: 'Beach Holidays',
    image: 'https://picsum.photos/seed/blog-maldives/1200/800',
    author: 'Flights Club UK Editorial',
    date: '2026-06-12',
    readTime: '6 min read',
    content: [
      'The Maldives enjoys a tropical climate with two distinct seasons: a dry season from December to April and a wetter, monsoon-influenced season from May to November.',
      'For guaranteed sunshine and calm seas, December through March is the gold standard — expect low humidity, minimal rainfall and excellent visibility for diving and snorkelling.',
      'Travelling between May and November brings lower prices and lusher scenery, with short, dramatic showers rather than continuous rain. Surfers in particular favour this period for bigger swells.',
      'Whichever season you choose, our consultants can match the right resort, board basis and transfer type to your travel dates — speak to the team before you book.',
    ],
  },
  {
    slug: 'dubai-weekend-itinerary',
    title: 'The Perfect 48 Hours in Dubai',
    excerpt: 'From Burj Khalifa sunsets to desert dinners under the stars, here’s how to make the most of a short Dubai break.',
    category: 'City Breaks',
    image: 'https://picsum.photos/seed/blog-dubai/1200/800',
    author: 'Flights Club UK Editorial',
    date: '2026-05-28',
    readTime: '5 min read',
    content: [
      'Day one starts high: book a sunset slot at the Burj Khalifa observation deck before dinner at one of Downtown Dubai’s waterfront restaurants overlooking the Dubai Fountain.',
      'On day two, swap skyscrapers for sand dunes with a late-afternoon desert safari, including dune bashing, camel rides and a traditional Bedouin-style BBQ dinner.',
      'Round off your trip with a morning at the Dubai Mall or a stroll through the historic Al Fahidi district for a different side of the city entirely.',
      'Our Dubai holiday packages bundle flights, four and five-star hotels and private transfers — ask about adding the desert safari as an extra.',
    ],
  },
  {
    slug: 'atol-protection-explained',
    title: 'ATOL Protection Explained: What It Means for Your Holiday',
    excerpt: 'Understand exactly how ATOL protects your money and your holiday if things don’t go to plan.',
    category: 'Travel Advice',
    image: 'https://picsum.photos/seed/blog-atol/1200/800',
    author: 'Flights Club UK Editorial',
    date: '2026-04-15',
    readTime: '4 min read',
    content: [
      'ATOL (Air Travel Organiser’s Licence) is a UK Civil Aviation Authority scheme that protects your money if your travel company stops trading before or during your holiday.',
      'When you book a package holiday with Flights Club UK, you will receive an ATOL Certificate confirming your protection and setting out what it covers.',
      'This means if we were to cease trading, ATOL would help arrange a refund or, if you are already abroad, help you continue your holiday and get home as planned.',
      'Always check that your travel agent displays an ATOL number — ours is proudly listed on every page of this website and every booking confirmation.',
    ],
  },
  {
    slug: 'family-holiday-packing-checklist',
    title: 'The Ultimate Family Holiday Packing Checklist',
    excerpt: 'Never forget a passport, plug adapter or sun cream again with our tried-and-tested family packing list.',
    category: 'Family Holidays',
    image: 'https://picsum.photos/seed/blog-family/1200/800',
    author: 'Flights Club UK Editorial',
    date: '2026-03-02',
    readTime: '7 min read',
    content: [
      'Start with documents: passports valid for at least six months, printed booking confirmations, travel insurance details and any required visas.',
      'Pack a dedicated “first day” bag with swimwear, sun cream and a change of clothes so you can head straight to the pool on arrival.',
      'For younger children, bring familiar snacks, entertainment for the flight and a basic first aid kit with any regular medication.',
      'Finally, photograph your luggage and its contents before you fly — it makes any insurance claim far simpler if bags are delayed or lost.',
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
