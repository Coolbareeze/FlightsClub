import type { Metadata } from 'next';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactForm } from '@/components/forms/ContactForm';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us | Speak to a Travel Consultant',
  description: 'Get in touch with Flights Club UK — call, WhatsApp, live chat or visit our Ilford office. We reply to enquiries within one working hour.',
  path: '/contact',
});

const cards = [
  { icon: Phone, title: 'Call Us', value: SITE.phone, href: SITE.phoneHref },
  { icon: MessageCircle, title: 'WhatsApp', value: 'Message our team', href: `https://wa.me/${SITE.whatsapp.replace('+', '')}` },
  { icon: Mail, title: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: MapPin, title: 'Visit Us', value: `${SITE.address.line1}, ${SITE.address.city}`, href: 'https://maps.google.com/?q=40+Arundel+Gardens+Ilford+IG3+9SX' },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]} />
      <PageHero
        eyebrow="Contact Us"
        title="Talk to a Real Travel Consultant"
        description="Whether it’s a quick question or a complex itinerary, our team responds fast — call, message or visit us in Ilford."
        image="https://picsum.photos/seed/contact-hero/1920/1080"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <section className="section-pad bg-white dark:bg-navy-950">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c) => (
              <a key={c.title} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="card-lift rounded-xl2 border border-navy-100 bg-surface p-6 text-center dark:border-white/10 dark:bg-navy-800">
                <c.icon className="mx-auto h-7 w-7 text-gold" />
                <p className="mt-3 font-heading text-sm font-bold text-navy dark:text-white">{c.title}</p>
                <p className="mt-1 text-xs text-navy-700/60 dark:text-white/50">{c.value}</p>
              </a>
            ))}
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <SectionHeading align="left" eyebrow="Send a Message" title="Get a Free, No-Obligation Quote" className="mx-0 text-left" />
              <div className="mt-8 rounded-xl2 border border-navy-100 bg-surface p-6 shadow-soft md:p-8 dark:border-white/10 dark:bg-navy-800">
                <ContactForm />
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-xl2 border border-navy-100 shadow-soft dark:border-white/10">
                <iframe
                  title="Flights Club UK office location"
                  src="https://www.google.com/maps?q=40+Arundel+Gardens,+Ilford,+IG3+9SX&output=embed"
                  width="100%"
                  height="280"
                  loading="lazy"
                  style={{ border: 0 }}
                />
              </div>
              <div className="mt-6 rounded-xl2 border border-navy-100 bg-surface p-6 dark:border-white/10 dark:bg-navy-800">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gold" />
                  <p className="font-heading text-sm font-bold text-navy dark:text-white">Opening Hours</p>
                </div>
                <ul className="mt-4 space-y-1.5 text-sm text-navy-700/70 dark:text-white/60">
                  <li>{SITE.hours.weekday}</li>
                  <li>{SITE.hours.saturday}</li>
                  <li>{SITE.hours.sunday}</li>
                </ul>
                <p className="mt-4 text-xs text-navy-700/50 dark:text-white/40">{SITE.address.line1}, {SITE.address.line2}, {SITE.address.postcode}, {SITE.address.city}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
