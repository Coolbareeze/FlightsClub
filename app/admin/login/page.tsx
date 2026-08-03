'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock } from 'lucide-react';
import { Input } from '@/components/ui/Field';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();

    if (data.ok) {
      router.push(searchParams.get('next') || '/admin');
      router.refresh();
    } else {
      setError(data.error || 'Something went wrong.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-gradient px-4">
      <div className="w-full max-w-sm rounded-xl3 border border-white/10 bg-white/5 p-8 backdrop-blur">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient text-navy">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="mt-4 font-heading text-xl font-bold text-white">Flights Club UK Admin</h1>
          <p className="mt-1.5 text-sm text-white/60">Sign in to manage packages and destinations.</p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
          <Input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            className="!border-white/15 !bg-white/5 !text-white placeholder:!text-white/40"
          />
          {error && <p className="text-xs font-medium text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="btn-gold w-full">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
