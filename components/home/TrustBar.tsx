import { ShieldCheck, Headset, BadgeCheck, Lock } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { TRUST_BADGES } from '@/lib/constants';

const icons = [ShieldCheck, Headset, BadgeCheck, Lock];

export function TrustBar() {
  return (
    <div className="relative z-10 -mt-10 md:-mt-14">
      <Container>
        <div className="grid grid-cols-2 gap-3 rounded-xl2 border border-navy-100/60 bg-white/95 p-4 shadow-premium backdrop-blur md:grid-cols-4 md:gap-6 md:p-6 dark:border-white/10 dark:bg-navy-800/95">
          {TRUST_BADGES.map((badge, i) => {
            const Icon = icons[i];
            return (
              <div key={badge.label} className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy dark:bg-white/10 dark:text-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-heading text-sm font-bold text-navy dark:text-white">{badge.label}</p>
                  <p className="text-xs text-navy-700/60 dark:text-white/50">{badge.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
