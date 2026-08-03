'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2 } from 'lucide-react';

const schema = z.object({ email: z.string().email('Enter a valid email address') });
type FormValues = z.infer<typeof schema>;

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify(data) });
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Your email address"
          aria-label="Email address"
          {...register('email')}
          className={`w-full rounded-full border px-4 py-2.5 text-sm outline-none transition ${compact ? 'border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-gold' : 'border-navy-100 bg-white text-ink focus:border-gold'}`}
        />
        <button type="submit" disabled={isSubmitting} aria-label="Subscribe" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-navy shadow-gold transition-transform hover:scale-105 disabled:opacity-60">
          {sent ? <CheckCircle2 className="h-4.5 w-4.5" /> : <Send className="h-4 w-4" />}
        </button>
      </div>
      {errors.email && <p className="mt-2 text-xs text-red-400">{errors.email.message}</p>}
      {sent && <p className="mt-2 text-xs font-medium text-success">You’re subscribed — welcome aboard!</p>}
    </form>
  );
}
