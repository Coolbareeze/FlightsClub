import type { Metadata } from 'next';
import { CheckCircle2, Clock, FileCheck2, Globe } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { VisaEnquiryForm } from '@/components/forms/VisaEnquiryForm';
import { FAQSection } from '@/components/sections/FAQSection';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { visaFaqs } from '@/lib/data/faqs';

export const metadata: Metadata = buildMetadata({
  title: 'Visa Services | Fast, Guided Visa Applications',
  description: 'Expert visa assistance for 190+ destinations including the UAE, USA, Schengen area and Pakistan. Document checks, appointment booking and tracking.',
  path: '/visa-services',
});

const steps = [
  { icon: FileCheck2, title: 'Document Check', description: 'We review your documents against the exact requirements for your destination.' },
  { icon: Clock, title: 'Application Submission', description: 'Your application is prepared and submitted with full accuracy and speed.' },
  { icon: Globe, title: 'Appointment Booking', description: 'We arrange biometric or embassy appointments where required.' },
  { icon: CheckCircle2, title: 'Tracking & Delivery', description: 'We track your application status and notify you the moment it’s ready.' },
];

export default function VisaServicesPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Visa Services', path: '/visa-services' }]} />
      <PageHero
        eyebrow="Visa Services"
        title="Visa Applications, Handled With Precision"
        description="From tourist visas to complex multi-country itineraries — our visa team guides every application from document check to approval."
        image="https://picsum.photos/seed/visa-hero/1920/1080"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Visa Services' }]}
      />

      <section className="section-pad bg-white dark:bg-navy-950">
        <Container>
          <SectionHeading eyebrow="How It Works" title="Your Visa Application, In Four Simple Steps" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="relative rounded-xl2 border border-navy-100 bg-surface p-6 dark:border-white/10 dark:bg-navy-800">
                <span className="font-heading text-4xl font-extrabold text-navy-100 dark:text-white/10">0{i + 1}</span>
                <s.icon className="mt-2 h-7 w-7 text-gold" />
                <h3 className="mt-4 font-heading text-base font-bold text-navy dark:text-white">{s.title}</h3>
                <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">{s.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad bg-surface dark:bg-navy-900">
        <Container className="max-w-2xl">
          <SectionHeading eyebrow="Start Your Application" title="Submit a Visa Enquiry" />
          <div className="mt-10 rounded-xl2 border border-navy-100 bg-white p-6 shadow-soft md:p-8 dark:border-white/10 dark:bg-navy-800">
            <VisaEnquiryForm />
          </div>
        </Container>
      </section>

      <FAQSection faqs={visaFaqs} title="Visa Services FAQs" />
    </>
  );
}
