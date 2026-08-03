import type { Metadata } from 'next';
import Image from 'next/image';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { CTABanner } from '@/components/home/CTABanner';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { Compass, Heart, ShieldCheck, Target } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'About Us | Our Story, Mission & Team',
  description: 'Learn about Flights Club UK — an ATOL-protected, London-based travel agency delivering premium flights and holidays since 2011.',
  path: '/about-us',
});

const values = [
  { icon: ShieldCheck, title: 'Trust', description: 'Every promise backed by ATOL protection and transparent pricing.' },
  { icon: Heart, title: 'Care', description: 'Every itinerary treated as if it were our own family’s holiday.' },
  { icon: Target, title: 'Precision', description: 'Meticulous attention to every detail, from fare to final transfer.' },
  { icon: Compass, title: 'Expertise', description: 'Decades of combined industry knowledge across our consultant team.' },
];

const team = [
  { name: 'Fahad Malik', role: 'Founder & Managing Director', image: 'https://picsum.photos/seed/team-fahad/400/500' },
  { name: 'Rebecca Hart', role: 'Head of Holidays', image: 'https://picsum.photos/seed/team-rebecca/400/500' },
  { name: 'Usman Javed', role: 'Head of Flights', image: 'https://picsum.photos/seed/team-usman/400/500' },
  { name: 'Sophie Anderson', role: 'Customer Experience Lead', image: 'https://picsum.photos/seed/team-sophie/400/500' },
];

const stats = [
  { value: 15, suffix: '+', label: 'Years of Experience' },
  { value: 190, suffix: '+', label: 'Countries Served' },
  { value: 120, suffix: 'k+', label: 'Customers' },
  { value: 250, suffix: 'k+', label: 'Flights Booked' },
];

export default function AboutUsPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about-us' }]} />
      <PageHero
        eyebrow="About Flights Club UK"
        title="Fifteen Years of Crafting Exceptional Journeys"
        description="From a small Ilford office to a trusted name in UK travel — our story is one of relentless care for every traveller."
        image="https://picsum.photos/seed/about-hero/1920/1080"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
      />

      <section className="section-pad bg-white dark:bg-navy-950">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl3 shadow-premium">
            <Image src="https://picsum.photos/seed/about-office/1000/800" alt="Flights Club UK office team" fill className="object-cover" />
          </div>
          <div>
            <SectionHeading align="left" eyebrow="Our Story" title="Built on a Simple Idea: Travel Should Feel Effortless" className="mx-0 text-left" />
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-navy-700/80 md:text-base dark:text-white/65">
              <p>Flights Club UK was founded in {2026 - 15} in Ilford, London, with a simple mission: make premium travel accessible, transparent and genuinely stress-free for UK travellers.</p>
              <p>What began as a small team of flight specialists has grown into a full-service travel agency, arranging flights, holidays, visas and insurance for over 120,000 customers across the UK.</p>
              <p>Today, our consultants combine deep destination knowledge with access to over 500 airlines and thousands of hotel partners — always backed by full ATOL protection.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad bg-surface dark:bg-navy-900">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-xl2 border border-navy-100 bg-white p-8 dark:border-white/10 dark:bg-navy-800">
              <h3 className="font-heading text-xl font-bold text-navy dark:text-white">Our Mission</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-700/70 dark:text-white/60">To deliver premium, dependable travel experiences that feel personal — from the first enquiry to the moment you arrive home.</p>
            </div>
            <div className="rounded-xl2 border border-navy-100 bg-white p-8 dark:border-white/10 dark:bg-navy-800">
              <h3 className="font-heading text-xl font-bold text-navy dark:text-white">Our Vision</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-700/70 dark:text-white/60">To be the UK’s most trusted independent travel agency — known equally for exceptional value and exceptional care.</p>
            </div>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl2 border border-navy-100 bg-white p-6 text-center dark:border-white/10 dark:bg-navy-800">
                <v.icon className="mx-auto h-8 w-8 text-gold" />
                <h4 className="mt-4 font-heading text-sm font-bold text-navy dark:text-white">{v.title}</h4>
                <p className="mt-1.5 text-xs text-navy-700/70 dark:text-white/60">{v.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad bg-navy-gradient">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-heading text-3xl font-extrabold text-gold md:text-4xl"><AnimatedCounter value={s.value} suffix={s.suffix} /></p>
                <p className="mt-1.5 text-xs text-white/60 md:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad bg-white dark:bg-navy-950">
        <Container>
          <SectionHeading eyebrow="Meet The Team" title="The People Behind Your Journey" />
          <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {team.map((m) => (
              <div key={m.name} className="text-center">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-[220px] overflow-hidden rounded-xl2 shadow-soft">
                  <Image src={m.image} alt={m.name} fill className="object-cover" />
                </div>
                <p className="mt-4 font-heading text-sm font-bold text-navy dark:text-white">{m.name}</p>
                <p className="text-xs text-navy-700/60 dark:text-white/50">{m.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
