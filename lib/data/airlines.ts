import type { Airline } from '@/types';

// Logo paths point at files that don't exist yet — see
// public/images/airlines/README.txt for the exact filenames expected and
// where to get official logo assets. Until a file is added, the component
// gracefully falls back to a text/monogram badge, so this is safe to ship
// as-is and fill in logos one at a time.
export const airlines: Airline[] = [
  { name: 'British Airways', slug: 'british-airways', logo: '/images/airlines/british-airways.svg' },
  { name: 'Emirates', slug: 'emirates', logo: '/images/airlines/emirates.svg' },
  { name: 'Qatar Airways', slug: 'qatar-airways', logo: '/images/airlines/qatar-airways.svg' },
  { name: 'Turkish Airlines', slug: 'turkish-airlines', logo: '/images/airlines/turkish-airlines.svg' },
  { name: 'Etihad Airways', slug: 'etihad', logo: '/images/airlines/etihad.svg' },
  { name: 'Lufthansa', slug: 'lufthansa', logo: '/images/airlines/lufthansa.svg' },
  { name: 'KLM', slug: 'klm', logo: '/images/airlines/klm.svg' },
  { name: 'Virgin Atlantic', slug: 'virgin-atlantic', logo: '/images/airlines/virgin-atlantic.svg' },
  { name: 'Saudia', slug: 'saudia', logo: '/images/airlines/saudia.svg' },
  { name: 'Ethiopian Airlines', slug: 'ethiopian-airlines', logo: '/images/airlines/ethiopian-airlines.svg' },
  { name: 'Singapore Airlines', slug: 'singapore-airlines', logo: '/images/airlines/singapore-airlines.svg' },
  { name: 'Air France', slug: 'air-france', logo: '/images/airlines/air-france.svg' },
];
