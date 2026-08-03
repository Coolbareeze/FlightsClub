import Link from 'next/link';
import { Compass, Home, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SITE } from '@/lib/constants';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center bg-surface pt-24 dark:bg-navy-900">
      <Container className="text-center">
        <Compass className="mx-auto h-16 w-16 text-gold" />
        <p className="mt-6 font-heading text-7xl font-extrabold text-navy dark:text-white">404</p>
        <h1 className="mt-3 font-heading text-2xl font-bold text-navy dark:text-white">Looks Like You’ve Wandered Off Course</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-navy-700/70 dark:text-white/60">
          The page you’re looking for doesn’t exist. Let’s get you back on track to your next adventure.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary"><Home className="h-4 w-4" /> Back to Home</Link>
          <a href={SITE.phoneHref} className="btn-outline"><Phone className="h-4 w-4" /> Call an Expert</a>
        </div>
      </Container>
    </div>
  );
}
