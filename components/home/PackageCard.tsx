'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BedDouble, CalendarRange, Plane, Star } from 'lucide-react';
import { formatGBP } from '@/lib/utils';
import type { HolidayPackage } from '@/types';

export function PackageCard({ pkg, index = 0 }: { pkg: HolidayPackage; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="card-lift overflow-hidden rounded-xl2 border border-navy-100/60 bg-white shadow-soft dark:border-white/10 dark:bg-navy-800"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={pkg.image} alt={pkg.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
        {pkg.originalPrice && (
          <span className="absolute left-3 top-3 rounded-full bg-success px-3 py-1 text-xs font-bold text-white shadow-soft">
            Save {formatGBP(pkg.originalPrice - pkg.price)}
          </span>
        )}
        <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-navy">
          {[...Array(pkg.hotelStars)].map((_, i) => <Star key={i} className="h-3 w-3 fill-gold text-gold" />)}
        </span>
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold-dark">{pkg.destination}, {pkg.country}</p>
        <h3 className="mt-1.5 font-heading text-lg font-bold text-navy dark:text-white">{pkg.title}</h3>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-navy-700/70 dark:text-white/60">
          <span className="flex items-center gap-1.5"><CalendarRange className="h-3.5 w-3.5 text-gold" /> {pkg.duration}</span>
          <span className="flex items-center gap-1.5"><Plane className="h-3.5 w-3.5 text-gold" /> {pkg.airline}</span>
          <span className="flex items-center gap-1.5"><BedDouble className="h-3.5 w-3.5 text-gold" /> {pkg.board}</span>
        </div>
        <div className="mt-5 flex items-end justify-between border-t border-navy-100 pt-4 dark:border-white/10">
          <div>
            {pkg.originalPrice && <p className="text-xs text-navy-400 line-through">{formatGBP(pkg.originalPrice)}</p>}
            <p className="font-heading text-2xl font-extrabold text-navy dark:text-white">{formatGBP(pkg.price)}</p>
            <p className="text-[11px] text-navy-700/60 dark:text-white/50">per person</p>
          </div>
          <Link href={`/holiday-packages/${pkg.slug}`} className="btn-primary !px-5 !py-2.5 text-xs">View Deal</Link>
        </div>
      </div>
    </motion.div>
  );
}
