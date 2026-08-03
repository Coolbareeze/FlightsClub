'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, MessageCircle, Phone } from 'lucide-react';
import { SITE } from '@/lib/constants';

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-24 right-5 z-40 flex flex-col items-end gap-3 md:bottom-8">
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-100 bg-white text-navy shadow-soft dark:border-white/10 dark:bg-navy-800 dark:text-white"
          >
            <ArrowUp className="h-4.5 w-4.5" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={`https://wa.me/${SITE.whatsapp.replace('+', '')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-premium transition-transform hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      <a
        href={SITE.phoneHref}
        aria-label="Call Flights Club UK"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-navy shadow-gold transition-transform hover:scale-105 md:hidden"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}
