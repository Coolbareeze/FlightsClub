'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { FlightSearchWidget } from './FlightSearchWidget';

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-navy pb-28 pt-36">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://picsum.photos/seed/hero-poster/1920/1080"
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      >
        <source src="/videos/hero-flight.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-900/60 to-navy-950" />
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 animate-float rounded-full bg-royal-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 animate-float rounded-full bg-gold/15 blur-3xl [animation-delay:2s]" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 flex items-center justify-center gap-2"
          >
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />)}
            </div>
            <span className="text-xs font-medium text-white/70">4.9/5 from 3,200+ verified UK travellers</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-balance font-heading text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
          >
            Extraordinary Travel,<br />
            <span className="bg-gold-gradient bg-clip-text text-transparent">Effortlessly Arranged</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-balance text-base text-white/70 md:text-lg"
          >
            Flights Club UK curates premium flights and holidays across 190+ countries — backed by ATOL protection,
            expert consultants and a genuine best price guarantee.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mx-auto mt-12 max-w-5xl"
        >
          <FlightSearchWidget />
        </motion.div>
      </Container>
    </section>
  );
}
