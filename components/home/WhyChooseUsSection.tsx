import { BadgeCheck, Headset, Lock, ShieldCheck, Sparkles, Users2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const points = [
  { icon: ShieldCheck, title: 'ATOL Protected', description: 'Every package holiday is fully financially protected under the ATOL scheme.' },
  { icon: Headset, title: '24/7 Support', description: 'Real UK-based consultants, available around the clock before and during your trip.' },
  { icon: BadgeCheck, title: 'Best Price Guarantee', description: 'Find it cheaper elsewhere and we’ll do everything we can to beat it.' },
  { icon: Lock, title: 'Secure Payment', description: '256-bit SSL encryption protects every transaction, every time.' },
  { icon: Sparkles, title: 'Experienced Consultants', description: 'Average 12+ years’ industry experience across our travel team.' },
  { icon: Users2, title: 'Thousands of Happy Customers', description: 'Rated 4.9/5 by over 3,200 verified UK travellers.' },
];

const stats = [
  { value: 15, suffix: '+', label: 'Years of Experience' },
  { value: 190, suffix: '+', label: 'Countries Served' },
  { value: 120, suffix: 'k+', label: 'Happy Customers' },
  { value: 250, suffix: 'k+', label: 'Flights Booked' },
];

export function WhyChooseUsSection() {
  return (
    <section className="section-pad relative overflow-hidden bg-navy-gradient">
      <Container className="relative">
        <SectionHeading light eyebrow="Why Flights Club UK" title="Trust Built Over Fifteen Years of Travel Expertise" description="A premium standard of service, from first enquiry to touchdown." />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((p) => (
            <div key={p.title} className="glass-panel rounded-xl2 p-6">
              <p.icon className="h-8 w-8 text-gold" />
              <h3 className="mt-4 font-heading text-base font-bold text-white">{p.title}</h3>
              <p className="mt-1.5 text-sm text-white/65">{p.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-3xl font-extrabold text-gold md:text-4xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1.5 text-xs text-white/60 md:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
