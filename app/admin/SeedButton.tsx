'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DatabaseZap } from 'lucide-react';

export function SeedButton() {
  const router = useRouter();
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSeed() {
    if (state === 'loading') return;
    setState('loading');
    setMessage('');
    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Seed failed');
      setState('done');
      setMessage(`Loaded ${data.packages} packages and ${data.destinations} destinations.`);
      router.refresh();
    } catch (err) {
      setState('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  return (
    <div className="mt-6 rounded-xl2 border border-navy-100 bg-white p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy">
          <DatabaseZap className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="font-heading text-sm font-bold text-navy">Load starter content</p>
          <p className="text-xs text-navy-700/60">
            Creates the database tables (if needed) and loads the sample packages &amp; destinations. Safe to run more than once.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSeed}
          disabled={state === 'loading'}
          className="btn-outline shrink-0 whitespace-nowrap disabled:opacity-50"
        >
          {state === 'loading' ? 'Running…' : 'Run now'}
        </button>
      </div>
      {message && (
        <p className={`mt-3 text-xs ${state === 'error' ? 'text-red-600' : 'text-emerald-700'}`}>{message}</p>
      )}
    </div>
  );
}
