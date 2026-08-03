'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { services } from '@/lib/data/services';

const pageSlugs = new Set(['flights', 'holiday-packages', 'visa-services', 'travel-insurance', 'business-travel']);

function hrefFor(slug: string) {
  return pageSlugs.has(slug) ? `/${slug}` : `/contact?service=${slug}`;
}

export function ServicesGrid() {
  return (
    <section className="section-pad bg-white dark:bg-navy-950">
      <Container>
        <SectionHeading eyebrow="End-to-End Service" title="Everything Your Journey Needs, In One Place" description="Twelve dedicated services, one trusted travel team." />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = (Icons as any)[s.icon] ?? Icons.Compass;
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <Link href={hrefFor(s.slug)} className="card-lift group flex h-full flex-col gap-4 rounded-xl2 border border-navy-100 bg-surface p-6 dark:border-white/10 dark:bg-navy-800">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold transition-colors group-hover:bg-gold-gradient group-hover:text-navy">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-navy dark:text-white">{s.title}</h3>
                    <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">{s.description}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
