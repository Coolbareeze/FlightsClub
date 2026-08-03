import { cn } from '@/lib/utils';
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface FieldWrapProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function FieldWrap({ label, htmlFor, error, children, className }: FieldWrapProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-navy dark:text-white">
        {label}
      </label>
      {children}
      {error && <span className="text-xs font-medium text-red-600">{error}</span>}
    </div>
  );
}

const baseInput =
  'w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30 dark:border-white/15 dark:bg-navy-800 dark:text-white placeholder:text-navy-400';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(baseInput, className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(baseInput, 'min-h-[140px] resize-y', className)} {...props} />;
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(baseInput, 'appearance-none bg-no-repeat', className)} {...props}>
      {children}
    </select>
  );
}
