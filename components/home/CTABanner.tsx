import Link from 'next/link';
import { Phone, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SITE } from '@/lib/constants';

export function CTABanner() {
  return (
    <section className="bg-white py-14 dark:bg-navy-950">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 rounded-xl3 bg-navy-gradient p-8 text-center shadow-premium md:flex-row md:p-10 md:text-left">
          <div className="flex items-center gap-4">
            <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-navy md:flex">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-white md:text-2xl">Ready to plan your next trip?</h3>
              <p className="mt-1 text-sm text-white/65">Speak to a travel consultant today for a free, no-obligation quote.</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={SITE.phoneHref} className="btn-gold"><Phone className="h-4 w-4" /> Call an Expert</a>
            <Link href="/contact" className="btn-outline !border-white/25 !bg-white/5 !text-white hover:!bg-white/15">Request a Callback</Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
