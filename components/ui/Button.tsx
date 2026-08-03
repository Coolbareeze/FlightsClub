'use client';

import { forwardRef, type ButtonHTMLAttributes, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'outline';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', onClick, children, ...props }, ref) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      const btn = e.currentTarget;
      const circle = document.createElement('span');
      const diameter = Math.max(btn.clientWidth, btn.clientHeight);
      const rect = btn.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - diameter / 2}px`;
      circle.style.top = `${e.clientY - rect.top - diameter / 2}px`;
      circle.className = 'pointer-events-none absolute rounded-full bg-white/40 animate-ripple';
      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
      onClick?.(e);
    };

    const styles = {
      primary: 'btn-primary',
      gold: 'btn-gold',
      outline: 'btn-outline',
    } as const;

    return (
      <button
        ref={ref}
        className={cn('relative isolate overflow-hidden', styles[variant], className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
