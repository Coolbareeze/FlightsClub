'use client';

import { cn } from '@/lib/utils';

export function Marquee({ children, className, reverse }: { children: React.ReactNode; className?: string; reverse?: boolean }) {
  return (
    <div className={cn('group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]', className)}>
      <div
        className={cn('flex shrink-0 animate-marquee items-center gap-16 group-hover:[animation-play-state:paused]', reverse && '[animation-direction:reverse]')}
      >
        {children}
      </div>
      <div
        className={cn('flex shrink-0 animate-marquee items-center gap-16 group-hover:[animation-play-state:paused]', reverse && '[animation-direction:reverse]')}
        aria-hidden
      >
        {children}
      </div>
    </div>
  );
}
