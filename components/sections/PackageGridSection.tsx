import { Container } from '@/components/ui/Container';
import { PackageCard } from '@/components/home/PackageCard';
import type { HolidayPackage } from '@/types';

export function PackageGridSection({ pkgs }: { pkgs: HolidayPackage[] }) {
  return (
    <section className="section-pad bg-white dark:bg-navy-950">
      <Container>
        {pkgs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pkgs.map((pkg, i) => <PackageCard key={pkg.slug} pkg={pkg} index={i} />)}
          </div>
        ) : (
          <p className="text-center text-navy-700/60 dark:text-white/60">New packages in this category are added weekly — call our team for tailored options.</p>
        )}
      </Container>
    </section>
  );
}
