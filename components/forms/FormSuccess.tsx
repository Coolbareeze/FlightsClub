'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export function FormSuccess({ title = 'Thank you!', message }: { title?: string; message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-4 rounded-xl2 border border-success/20 bg-success/5 p-10 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 12 }}
      >
        <CheckCircle2 className="h-14 w-14 text-success" />
      </motion.div>
      <h3 className="font-heading text-xl font-bold text-navy dark:text-white">{title}</h3>
      <p className="max-w-sm text-sm text-navy-700/70 dark:text-white/60">{message}</p>
    </motion.div>
  );
}
