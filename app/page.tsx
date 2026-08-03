import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { TrustBar } from '@/components/home/TrustBar';
import { PopularDestinations } from '@/components/home/PopularDestinations';
import { HolidayPackagesSection } from '@/components/home/HolidayPackagesSection';
import { AirlinesSlider } from '@/components/home/AirlinesSlider';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { TestimonialsCarousel } from '@/components/home/TestimonialsCarousel';
import { TravelInspiration } from '@/components/home/TravelInspiration';
import { CTABanner } from '@/components/home/CTABanner';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { buildMetadata } from '@/lib/seo';
import { getAllDestinations } from '@/lib/data/destinations';
import { getAllPackages } from '@/lib/data/packages';

export const metadata: Metadata = buildMetadata({
  title: 'Flights Club UK | Premium Flights, Holidays & Visa Services',
  description: 'ATOL-protected UK travel agency offering cheap flights, luxury holiday packages, city breaks, visa services and 24/7 expert support. Get a free quote today.',
  path: '/',
});

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [destinations, packages] = await Promise.all([getAllDestinations(), getAllPackages()]);

  return (
    <>
      <Hero />
      <TrustBar />
      <PopularDestinations destinations={destinations} />
      <HolidayPackagesSection packages={packages} />
      <AirlinesSlider />
      <ServicesGrid />
      <WhyChooseUsSection />
      <TestimonialsCarousel />
      <TravelInspiration />
      <CTABanner />
      <NewsletterSection />
    </>
  );
}
