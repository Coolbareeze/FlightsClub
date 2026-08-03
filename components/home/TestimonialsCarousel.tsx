'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { testimonials } from '@/lib/data/testimonials';

export function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', () => setSelected(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <section className="section-pad bg-surface dark:bg-navy-900">
      <Container>
        <SectionHeading eyebrow="Customer Stories" title="What Our Travellers Say" description="Real reviews from real Flights Club UK customers." />

        <div className="relative mt-14">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t) => (
                <div key={t.name} className="min-w-0 flex-[0_0_100%] px-2 md:flex-[0_0_60%] lg:flex-[0_0_44%]">
                  <div className="mx-auto flex h-full max-w-md flex-col rounded-xl2 border border-navy-100 bg-white p-8 shadow-soft dark:border-white/10 dark:bg-navy-800">
                    <Quote className="h-8 w-8 text-gold/40" />
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-navy-700/80 dark:text-white/70">“{t.quote}”</p>
                    <div className="mt-6 flex items-center gap-3 border-t border-navy-100 pt-5 dark:border-white/10">
                      <Image src={t.avatar} alt={t.name} width={44} height={44} className="rounded-full object-cover" />
                      <div>
                        <p className="font-heading text-sm font-bold text-navy dark:text-white">{t.name}</p>
                        <p className="text-xs text-navy-700/60 dark:text-white/50">{t.location} — {t.trip}</p>
                      </div>
                      <div className="ml-auto flex">
                        {[...Array(t.rating)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button onClick={scrollPrev} aria-label="Previous testimonial" className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-100 text-navy transition-colors hover:bg-navy hover:text-white dark:border-white/15 dark:text-white">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => scrollTo(i)} aria-label={`Go to testimonial ${i + 1}`} className={`h-2 rounded-full transition-all ${selected === i ? 'w-6 bg-gold' : 'w-2 bg-navy-200 dark:bg-white/20'}`} />
              ))}
            </div>
            <button onClick={scrollNext} aria-label="Next testimonial" className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-100 text-navy transition-colors hover:bg-navy hover:text-white dark:border-white/15 dark:text-white">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
