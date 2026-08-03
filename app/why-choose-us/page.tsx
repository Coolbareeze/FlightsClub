import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/layout/PageHero';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { TestimonialsCarousel } from '@/components/home/TestimonialsCarousel';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTABanner } from '@/components/home/CTABanner';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { generalFaqs } from '@/lib/data/faqs';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Award, ShieldCheck, Star } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Why Choose Us | ATOL Protected, Trusted UK Travel Agency',
  description: 'Discover why thousands of UK travellers trust Flights Club UK — ATOL protection, IATA registration, best price guarantee and 24/7 expert support.',
  path: '/why-choose-us',
});

const trust = [
  { icon: ShieldCheck, title: 'ATOL Protected — Licence No. 11856', description: 'Your money and holiday are fully protected under the UK Civil Aviation Authority scheme.' },
  { icon: Award, title: 'IATA Registered Agency', description: 'Direct access to global airline inventory and negotiated fares through official IATA accreditation.' },
  { icon: Star, title: '4.9/5 Average Rating', description: 'Rated excellent by over 3,200 verified customers on independent review platforms.' },
];

export default function WhyChooseUsPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Why Choose Us', path: '/why-choose-us' }]} />
      <PageHero
        eyebrow="Why Choose Us"
        title="The Flights Club UK Standard"
        description="A premium standard of protection, transparency and personal service — on every single booking."
        image="https://picsum.photos/seed/why-hero/1920/1080"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Why Choose Us' }]}
      />

      <section className="section-pad bg-white dark:bg-navy-950">
        <Container>
          <SectionHeading eyebrow="Trust & Recognition" title="Accreditations That Matter" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {trust.map((t) => (
              <div key={t.title} className="rounded-xl2 border border-navy-100 bg-surface p-7 dark:border-white/10 dark:bg-navy-800">
                <t.icon className="h-9 w-9 text-gold" />
                <h3 className="mt-4 font-heading text-base font-bold text-navy dark:text-white">{t.title}</h3>
                <p className="mt-2 text-sm text-navy-700/70 dark:text-white/60">{t.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <WhyChooseUsSection />
      <TestimonialsCarousel />
      <FAQSection faqs={generalFaqs} />
      <CTABanner />
    </>
  );
}
