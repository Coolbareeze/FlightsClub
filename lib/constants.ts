export const SITE = {
  name: 'Flights Club UK',
  legalName: 'Flights Club UK Ltd',
  domain: 'flightsclubuk.co.uk',
  url: 'https://www.flightsclubuk.co.uk',
  description:
    'Flights Club UK is a premium ATOL-protected travel agency offering cheap flights, luxury holiday packages, city breaks and expert visa services from the United Kingdom.',
  phone: '020 3944 9994',
  phoneHref: 'tel:+442039449994',
  whatsapp: '+442039449994',
  email: 'info@flightsclubuk.co.uk',
  address: {
    line1: '40 Arundel Gardens',
    line2: 'Ilford',
    postcode: 'IG3 9SX',
    city: 'London',
    country: 'United Kingdom',
  },
  hours: {
    weekday: 'Mon – Fri: 09:00 – 20:00',
    saturday: 'Saturday: 10:00 – 18:00',
    sunday: 'Sunday: 10:00 – 16:00',
  },
  social: {
    facebook: 'https://facebook.com/flightsclubuk',
    instagram: 'https://instagram.com/flightsclubuk',
    twitter: 'https://twitter.com/flightsclubuk',
    linkedin: 'https://linkedin.com/company/flightsclubuk',
    tiktok: 'https://tiktok.com/@flightsclubuk',
  },
  founded: 2011,
  currencySymbol: '£',
};

interface NavChild {
  label: string;
  href: string;
  description: string;
}

interface NavLink {
  label: string;
  href: string;
  children?: NavChild[];
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Flights', href: '/flights' },
  {
    label: 'Holidays',
    href: '/holiday-packages',
    children: [
      { label: 'Holiday Packages', href: '/holiday-packages', description: 'All-inclusive escapes, handpicked' },
      { label: 'City Breaks', href: '/city-breaks', description: 'Short stays in world capitals' },
      { label: 'Beach Holidays', href: '/beach-holidays', description: 'Sun, sand and five-star shores' },
      { label: 'Luxury Holidays', href: '/luxury-holidays', description: 'Exceptional stays, curated service' },
      { label: 'Family Holidays', href: '/family-holidays', description: 'Holidays built for every generation' },
    ],
  },
  {
    label: 'Services',
    href: '/why-choose-us',
    children: [
      { label: 'Business Travel', href: '/business-travel', description: 'Corporate accounts & travel management' },
      { label: 'Visa Services', href: '/visa-services', description: 'Fast, guided visa applications' },
      { label: 'Travel Insurance', href: '/travel-insurance', description: 'Comprehensive cover, every trip' },
    ],
  },
  { label: 'Special Offers', href: '/special-offers' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

// Major UK departure airports, used for the "From" autocomplete on the
// flight search widget. Static list (not DB-backed) since routes/fares
// per-airport aren't modelled yet — see README "Future Integrations".
export const UK_AIRPORTS = [
  { code: 'LHR', name: 'London Heathrow' },
  { code: 'LGW', name: 'London Gatwick' },
  { code: 'STN', name: 'London Stansted' },
  { code: 'LTN', name: 'London Luton' },
  { code: 'LCY', name: 'London City' },
  { code: 'MAN', name: 'Manchester' },
  { code: 'BHX', name: 'Birmingham' },
  { code: 'EDI', name: 'Edinburgh' },
  { code: 'GLA', name: 'Glasgow' },
  { code: 'BRS', name: 'Bristol' },
  { code: 'NCL', name: 'Newcastle' },
  { code: 'LPL', name: 'Liverpool' },
  { code: 'LBA', name: 'Leeds Bradford' },
  { code: 'BFS', name: 'Belfast International' },
  { code: 'ABZ', name: 'Aberdeen' },
  { code: 'CWL', name: 'Cardiff' },
  { code: 'EMA', name: 'East Midlands' },
  { code: 'SOU', name: 'Southampton' },
];

export const TRUST_BADGES = [
  { label: 'ATOL Protected', sub: 'Licence No. 11856' },
  { label: 'IATA Registered', sub: 'Global airline access' },
  { label: '24/7 Support', sub: 'Real people, real help' },
  { label: 'Secure Payments', sub: '256-bit SSL encryption' },
];
