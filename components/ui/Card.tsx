import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('rounded-xl2 border border-navy-100/60 bg-white shadow-soft dark:border-white/10 dark:bg-navy-800', className)}
      {...props}
    />
  );
}
