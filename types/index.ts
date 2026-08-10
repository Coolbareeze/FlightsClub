export interface Destination {
  id?: number;
  slug: string;
  city: string;
  country: string;
  image: string;
  fromPrice: number;
  blurb: string;
  region: 'uk' | 'europe' | 'middleeast' | 'africa' | 'asia' | 'americas' | 'oceania';
}

export interface HolidayPackage {
  id?: number;
  slug: string;
  title: string;
  destination: string;
  country: string;
  image: string;
  duration: string;
  nights: number;
  price: number;
  originalPrice?: number;
  airline: string;
  hotel: string;
  hotelStars: number;
  board: string;
  transfers: boolean;
  category: 'beach' | 'city' | 'luxury' | 'family' | 'honeymoon';
  highlights: string[];
}

export interface Airline {
  name: string;
  slug: string;
  // Optional path to an official logo file, e.g. '/images/airlines/emirates.svg'.
  // Leave unset until the real (licensed) logo asset is supplied — see
  // public/images/airlines/README.txt. Falls back to a text/monogram badge.
  logo?: string;
}

export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  quote: string;
  trip: string;
  avatar: string;
}

export interface Service {
  title: string;
  slug: string;
  description: string;
  icon: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
