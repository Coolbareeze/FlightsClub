import type { Metadata } from 'next';
import { HeartPulse, Luggage, PlaneTakeoff, ShieldCheck } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { HolidayEnquiryForm } from '@/components/forms/HolidayEnquiryForm';
import { FAQSection } from '@/components/sections/FAQSection';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { insuranceFaqs } from '@/lib/data/faqs';

export const metadata: Metadata = buildMetadata({
  title: 'Travel Insurance | Comprehensive Cover for Every Trip',
  description: 'Single-trip and annual multi-trip travel insurance from trusted UK insurers, arranged by Flights Club UK for total peace of mind.',
  path: '/travel-insurance',
});

const cover = [
  { icon: HeartPulse, title: 'Medical Emergencies', description: 'Cover for emergency medical treatment and repatriation, worldwide.' },
  { icon: Luggage, title: 'Baggage & Belongings', description: 'Protection against lost, stolen or delayed luggage.' },
  { icon: PlaneTakeoff, title: 'Cancellation & Delay', description: 'Reimbursement if your trip is cancelled or significantly delayed.' },
  { icon: ShieldCheck, title: 'Personal Liability', description: 'Cover if you’re held responsible for injury or damage while travelling.' },
];

export default function TravelInsurancePage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Travel Insurance', path: '/travel-insurance' }]} />
      <PageHero
        eyebrow="Travel Insurance"
        title="Comprehensive Cover, Genuine Peace of Mind"
        description="Single-trip and annual policies from trusted UK insurers — arranged alongside your flights or holiday booking."
        image="https://picsum.photos/seed/insurance-hero/1920/1080"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Travel Insurance' }]}
      />

      <section className="section-pad bg-white dark:bg-navy-950">
        <Container>
          <SectionHeading eyebrow="What’s Covered" title="Protection for Every Stage of Your Trip" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cover.map((c) => (
              <div key={c.title} className="rounded-xl2 border border-navy-100 bg-surface p-6 text-center dark:border-white/10 dark:bg-navy-800">
                <c.icon className="mx-auto h-8 w-8 text-gold" />
                <h3 className="mt-4 font-heading text-sm font-bold text-navy dark:text-white">{c.title}</h3>
                <p className="mt-1.5 text-xs text-navy-700/70 dark:text-white/60">{c.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad bg-surface dark:bg-navy-900">
        <Container className="max-w-2xl">
          <SectionHeading eyebrow="Get Covered" title="Request an Insurance Quote" />
          <div className="mt-10 rounded-xl2 border border-navy-100 bg-white p-6 shadow-soft md:p-8 dark:border-white/10 dark:bg-navy-800">
            <HolidayEnquiryForm />
          </div>
        </Container>
      </section>

      <FAQSection faqs={insuranceFaqs} title="Travel Insurance FAQs" />
    </>
  );
}
