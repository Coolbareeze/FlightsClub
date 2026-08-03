'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, Phone, Search, X } from 'lucide-react';
import { NAV_LINKS, SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { SearchModal } from './SearchModal';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled ? 'py-2' : 'py-4'
        )}
      >
        <div
          className={cn(
            'mx-auto flex max-w-[1360px] items-center justify-between gap-6 rounded-full px-5 transition-all duration-500 md:px-7',
            scrolled
              ? 'glass-panel bg-white/80 py-2.5 shadow-glass mx-4 lg:mx-auto dark:bg-navy-900/80'
              : 'bg-transparent py-3'
          )}
        >
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span
              className={cn(
                'font-heading text-xl font-extrabold tracking-tight transition-colors',
                scrolled ? 'text-navy dark:text-white' : 'text-white'
              )}
            >
              Flights Club <span className="text-gold">UK</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setOpenMega(link.label)}
                onMouseLeave={() => link.children && setOpenMega(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center gap-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors',
                    scrolled ? 'text-navy hover:bg-navy-50 dark:text-white/90 dark:hover:bg-white/10' : 'text-white/95 hover:bg-white/10'
                  )}
                >
                  {link.label}
                  {link.children && <ChevronDown className="h-3.5 w-3.5" />}
                </Link>

                <AnimatePresence>
                  {link.children && openMega === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3"
                    >
                      <div className="rounded-xl2 border border-navy-100 bg-white p-3 shadow-premium dark:border-white/10 dark:bg-navy-800">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-xl px-4 py-3 transition-colors hover:bg-navy-50 dark:hover:bg-white/5"
                          >
                            <p className="font-heading text-sm font-semibold text-navy dark:text-white">{child.label}</p>
                            <p className="mt-0.5 text-xs text-navy-700/70 dark:text-white/60">{child.description}</p>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className={cn('flex h-10 w-10 items-center justify-center rounded-full transition-colors', scrolled ? 'text-navy hover:bg-navy-50 dark:text-white' : 'text-white hover:bg-white/10')}
            >
              <Search className="h-4.5 w-4.5" />
            </button>
            <ThemeToggle light={!scrolled} />
            <a href={SITE.phoneHref} className="btn-gold ml-1 !px-5 !py-2.5 text-xs">
              <Phone className="h-3.5 w-3.5" /> {SITE.phone}
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className={cn('flex h-10 w-10 items-center justify-center rounded-full lg:hidden', scrolled ? 'text-navy dark:text-white' : 'text-white')}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-navy-950/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-white p-6 dark:bg-navy-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-heading text-lg font-extrabold text-navy dark:text-white">Flights Club <span className="text-gold">UK</span></span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="rounded-full p-2 text-navy dark:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 overflow-y-auto">
                {NAV_LINKS.map((link) => (
                  <div key={link.label} className="border-b border-navy-100 py-2 dark:border-white/10">
                    <Link href={link.href} onClick={() => setMobileOpen(false)} className="block py-2 font-heading text-base font-semibold text-navy dark:text-white">
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="ml-3 flex flex-col gap-1 pb-2">
                        {link.children.map((c) => (
                          <Link key={c.href} href={c.href} onClick={() => setMobileOpen(false)} className="py-1.5 text-sm text-navy-700/80 dark:text-white/70">
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <a href={SITE.phoneHref} className="btn-gold mt-6 w-full">
                <Phone className="h-4 w-4" /> Call {SITE.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
