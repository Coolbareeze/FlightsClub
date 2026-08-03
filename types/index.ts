export interface Destination {
  slug: string;
  city: string;
  country: string;
  image: string;
  fromPrice: number;
  blurb: string;
  region: 'uk' | 'europe' | 'middleeast' | 'asia' | 'americas' | 'oceania';
}

export interface HolidayPackage {
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
