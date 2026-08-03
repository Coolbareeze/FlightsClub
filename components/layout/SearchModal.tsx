'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import type { Destination } from '@/types';

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!open || loaded) return;
    fetch('/api/destinations')
      .then((res) => res.json())
      .then((data) => setDestinations(data.destinations ?? []))
      .catch(() => setDestinations([]))
      .finally(() => setLoaded(true));
  }, [open, loaded]);

  const results =
    query.length > 1
      ? destinations
          .filter((d) => d.city.toLowerCase().includes(query.toLowerCase()) || d.country.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 6)
      : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-navy-950/70 p-4 pt-24 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-xl rounded-xl2 bg-white p-2 shadow-premium dark:bg-navy-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-navy-100 px-4 py-3 dark:border-white/10">
              <Search className="h-5 w-5 text-navy-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations — e.g. Dubai, Lahore, Maldives"
                className="w-full bg-transparent text-sm outline-none placeholder:text-navy-400 dark:text-white"
              />
              <button onClick={onClose} aria-label="Close search"><X className="h-5 w-5 text-navy-400" /></button>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {results.map((d) => (
                <Link
                  key={d.slug}
                  href={`/flights?to=${d.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm hover:bg-navy-50 dark:hover:bg-white/5"
                >
                  <span className="font-medium text-navy dark:text-white">{d.city}, {d.country}</span>
                  <span className="text-xs text-navy-400">from £{d.fromPrice}</span>
                </Link>
              ))}
              {query.length > 1 && results.length === 0 && (
                <p className="px-4 py-6 text-center text-sm text-navy-400">No destinations found for “{query}”.</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
