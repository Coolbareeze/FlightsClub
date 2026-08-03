import type { Metadata } from 'next';
import { Building2, ClipboardList, Globe2, HeadphonesIcon, LineChart, ShieldCheck } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CorporateTravelForm } from '@/components/forms/CorporateTravelForm';
import { FAQSection } from '@/components/sections/FAQSection';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Business Travel | Corporate Accounts & Travel Management',
  description: 'Dedicated corporate travel accounts with 24/7 support, consolidated billing and duty-of-care reporting. Built for UK businesses of every size.',
  path: '/business-travel',
});

const features = [
  { icon: Building2, title: 'Dedicated Account Manager', description: 'A single point of contact who knows your travel policy inside out.' },
  { icon: LineChart, title: 'Consolidated Reporting', description: 'Clear monthly spend reports across every traveller and department.' },
  { icon: ShieldCheck, title: 'Duty of Care', description: 'Real-time traveller tracking and emergency support wherever your team flies.' },
  { icon: HeadphonesIcon, title: '24/7 Travel Support', description: 'Round-the-clock assistance for delays, rebookings and last-minute changes.' },
  { icon: ClipboardList, title: 'Custom Travel Policy', description: 'Booking rules and approval flows tailored to your company.' },
  { icon: Globe2, title: 'Global Rate Access', description: 'Negotiated corporate fares across 500+ airlines and hotel partners.' },
];

const businessFaqs = [
  { question: 'Is there a minimum number of travellers to open a corporate account?', answer: 'No — we work with businesses of all sizes, from sole traders to large enterprises with hundreds of travellers.' },
  { question: 'Can you consolidate billing across multiple departments?', answer: 'Yes, we offer consolidated monthly invoicing with reporting broken down by department, traveller or cost centre.' },
  { question: 'Do you offer out-of-hours emergency support?', answer: 'Yes, all corporate accounts include 24/7 emergency assistance for travel disruption.' },
];

export default function BusinessTravelPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Business Travel', path: '/business-travel' }]} />
      <PageHero
        eyebrow="Business Travel"
        title="Corporate Travel Management, Simplified"
        description="From single business trips to company-wide travel programmes — dedicated support that keeps your team moving."
        image="https://picsum.photos/seed/business-hero/1920/1080"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Business Travel' }]}
      />

      <section className="section-pad bg-white dark:bg-navy-950">
        <Container>
          <SectionHeading eyebrow="Corporate Benefits" title="Everything Growing Businesses Need" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl2 border border-navy-100 bg-surface p-6 dark:border-white/10 dark:bg-navy-800">
                <f.icon className="h-8 w-8 text-gold" />
                <h3 className="mt-4 font-heading text-base font-bold text-navy dark:text-white">{f.title}</h3>
                <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">{f.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad bg-surface dark:bg-navy-900">
        <Container className="max-w-2xl">
          <SectionHeading eyebrow="Get Started" title="Request a Corporate Account" />
          <div className="mt-10 rounded-xl2 border border-navy-100 bg-white p-6 shadow-soft md:p-8 dark:border-white/10 dark:bg-navy-800">
            <CorporateTravelForm />
          </div>
        </Container>
      </section>

      <FAQSection faqs={businessFaqs} title="Business Travel FAQs" />
    </>
  );
}
