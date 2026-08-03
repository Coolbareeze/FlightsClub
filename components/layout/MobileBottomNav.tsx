'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Plane, Palmtree, Phone, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SITE } from '@/lib/constants';

const items = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/flights', label: 'Flights', icon: Plane },
  { href: '/holiday-packages', label: 'Holidays', icon: Palmtree },
  { href: '/site-map', label: 'Explore', icon: Search },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-navy-100 bg-white/95 backdrop-blur md:hidden dark:border-white/10 dark:bg-navy-900/95">
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn('flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium', active ? 'text-gold' : 'text-navy-500 dark:text-white/60')}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        );
      })}
      <a href={SITE.phoneHref} className="flex flex-1 flex-col items-center gap-1 bg-navy py-2.5 text-[11px] font-medium text-white">
        <Phone className="h-5 w-5" />
        Call Us
      </a>
    </nav>
  );
}
