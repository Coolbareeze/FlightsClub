import type { Airline } from '@/types';

// Logo files live in public/images/airlines/. If a file is ever removed,
// the component gracefully falls back to a text/monogram badge — see
// public/images/airlines/README.txt.
export const airlines: Airline[] = [
  { name: 'British Airways', slug: 'british-airways', logo: '/images/airlines/british-airways.png' },
  { name: 'Emirates', slug: 'emirates', logo: '/images/airlines/emirates.png' },
  { name: 'Qatar Airways', slug: 'qatar-airways', logo: '/images/airlines/qatar-airways.png' },
  { name: 'Turkish Airlines', slug: 'turkish-airlines', logo: '/images/airlines/turkish-airlines.png' },
  { name: 'Etihad Airways', slug: 'etihad', logo: '/images/airlines/etihad.png' },
  { name: 'Lufthansa', slug: 'lufthansa', logo: '/images/airlines/lufthansa.png' },
  { name: 'KLM', slug: 'klm', logo: '/images/airlines/klm.png' },
  { name: 'Virgin Atlantic', slug: 'virgin-atlantic', logo: '/images/airlines/virgin-atlantic.png' },
  { name: 'Saudia', slug: 'saudia', logo: '/images/airlines/saudia.png' },
  { name: 'Ethiopian Airlines', slug: 'ethiopian-airlines', logo: '/images/airlines/ethiopian-airlines.png' },
  { name: 'Singapore Airlines', slug: 'singapore-airlines', logo: '/images/airlines/singapore-airlines.png' },
  { name: 'Air France', slug: 'air-france', logo: '/images/airlines/air-france.png' },
];
