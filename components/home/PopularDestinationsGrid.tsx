'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Destination } from '@/types';

export function PopularDestinationsGrid({ destinations }: { destinations: Destination[] }) {
  return (
    <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {destinations.map((d, i) => (
        <motion.div
          key={d.slug}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: (i % 5) * 0.08 }}
        >
          <Link href={`/flights?to=${d.slug}`} className="card-lift group relative block aspect-[3/4] overflow-hidden rounded-xl2 shadow-soft">
            <Image
              src={d.image}
              alt={`${d.city}, ${d.country}`}
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="font-heading text-base font-bold text-white">{d.city}</p>
              <p className="text-xs text-white/70">from £{d.fromPrice}</p>
            </div>
            <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
