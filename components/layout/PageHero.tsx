'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';

interface Crumb { label: string; href?: string }

export function PageHero({ eyebrow, title, description, image, crumbs }: { eyebrow: string; title: string; description: string; image: string; crumbs: Crumb[] }) {
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-navy pt-32">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/70 to-navy-950/40" />
      <Container className="relative pb-16">
        <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-white/60" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-white/90">{c.label}</span>}
              {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3" />}
            </span>
          ))}
        </nav>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="eyebrow border-white/30 bg-white/10 text-gold-light">{eyebrow}</span>
          <h1 className="mt-4 max-w-2xl text-balance text-4xl font-bold text-white md:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-5 max-w-xl text-balance text-base text-white/75 md:text-lg">{description}</p>
        </motion.div>
      </Container>
    </section>
  );
}
