'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  light?: boolean;
}

export function SectionHeading({ eyebrow, title, description, align = 'center', className, light }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}
    >
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <h2 className={cn('mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem]', light && 'text-white')}>
        {title}
      </h2>
      {description && (
        <p className={cn('mt-4 text-balance text-base leading-relaxed text-navy-700/80 md:text-lg', light && 'text-white/75')}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
