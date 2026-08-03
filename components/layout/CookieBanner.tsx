'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('fcuk-cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const respond = (value: 'accepted' | 'rejected') => {
    localStorage.setItem('fcuk-cookie-consent', value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-4 bottom-20 z-50 mx-auto max-w-3xl rounded-xl2 border border-navy-100 bg-white p-5 shadow-premium md:bottom-6 dark:border-white/10 dark:bg-navy-800"
        >
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Cookie className="h-8 w-8 shrink-0 text-gold" />
            <p className="flex-1 text-sm text-navy-700/80 dark:text-white/70">
              We use cookies to enhance your browsing experience and analyse site traffic. Read our{' '}
              <Link href="/cookie-policy" className="font-semibold text-navy underline dark:text-white">Cookie Policy</Link> to learn more.
            </p>
            <div className="flex shrink-0 gap-2">
              <button onClick={() => respond('rejected')} className="btn-outline !px-4 !py-2 text-xs">Reject</button>
              <button onClick={() => respond('accepted')} className="btn-gold !px-4 !py-2 text-xs">Accept All</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
