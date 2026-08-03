import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { SITE } from '@/lib/constants';
import { Container } from '@/components/ui/Container';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

const popularRoutes = [
  { label: 'London to Dubai', href: '/flights?from=london&to=dubai' },
  { label: 'London to New York', href: '/flights?from=london&to=new-york' },
  { label: 'London to Lahore', href: '/flights?from=london&to=lahore' },
  { label: 'Manchester to Istanbul', href: '/flights?from=manchester&to=istanbul' },
  { label: 'London to Bangkok', href: '/flights?from=london&to=bangkok' },
  { label: 'Birmingham to Karachi', href: '/flights?from=birmingham&to=karachi' },
];

const quickLinks = [
  { label: 'About Us', href: '/about-us' },
  { label: 'Why Choose Us', href: '/why-choose-us' },
  { label: 'Special Offers', href: '/special-offers' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Sitemap', href: '/site-map' },
];

const serviceLinks = [
  { label: 'Flight Booking', href: '/flights' },
  { label: 'Holiday Packages', href: '/holiday-packages' },
  { label: 'Business Travel', href: '/business-travel' },
  { label: 'Visa Services', href: '/visa-services' },
  { label: 'Travel Insurance', href: '/travel-insurance' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
];

export function Footer() {
  return (
    <footer className="bg-navy-gradient text-white">
      <Container className="section-pad">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
          <div>
            <span className="font-heading text-xl font-extrabold">Flights Club <span className="text-gold">UK</span></span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              A premium, ATOL-protected UK travel agency delivering exceptional flights, holidays and travel services since {SITE.founded}.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social media"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-gold">Quick Links</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {quickLinks.map((l) => (
                <li key={l.href}><Link href={l.href} className="transition-colors hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-gold">Popular Routes</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {popularRoutes.map((l) => (
                <li key={l.href}><Link href={l.href} className="transition-colors hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-gold">Services</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {serviceLinks.map((l) => (
                <li key={l.href}><Link href={l.href} className="transition-colors hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-gold">Stay Inspired</h3>
            <p className="mt-5 text-sm text-white/70">Exclusive fares and holiday offers, straight to your inbox.</p>
            <div className="mt-4">
              <NewsletterForm compact />
            </div>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {SITE.address.line1}, {SITE.address.line2}, {SITE.address.postcode}</li>
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 shrink-0 text-gold" /> <a href={SITE.phoneHref} className="hover:text-white">{SITE.phone}</a></li>
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 shrink-0 text-gold" /> <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl2 border border-white/10">
            <iframe
              title="Flights Club UK office location"
              src="https://www.google.com/maps?q=40+Arundel+Gardens,+Ilford,+IG3+9SX&output=embed"
              width="100%"
              height="220"
              loading="lazy"
              style={{ border: 0, filter: 'grayscale(0.2) invert(0.92) contrast(0.9)' }}
            />
          </div>
          <div className="flex flex-col justify-center gap-3 text-sm text-white/70">
            <p className="font-heading font-semibold text-white">Opening Hours</p>
            <p>{SITE.hours.weekday}</p>
            <p>{SITE.hours.saturday}</p>
            <p>{SITE.hours.sunday}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/55 md:flex-row">
          <p>&copy; {new Date().getFullYear()} {SITE.legalName}. All rights reserved. ATOL Protected — Licence No. 11856.</p>
          <div className="flex gap-6">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white">{l.label}</Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
