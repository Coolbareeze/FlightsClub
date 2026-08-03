import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { packages } from '@/lib/data/packages';
import { PackageCard } from './PackageCard';

export function HolidayPackagesSection() {
  return (
    <section className="section-pad bg-white dark:bg-navy-950">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Handpicked Packages"
            title="Holiday Packages Curated by Our Experts"
            description="Flights, hotels and transfers bundled seamlessly — every package fully ATOL protected."
            className="mx-0 text-left"
          />
          <Link href="/holiday-packages" className="btn-outline shrink-0">
            View All Packages <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.slice(0, 6).map((pkg, i) => <PackageCard key={pkg.slug} pkg={pkg} index={i} />)}
        </div>
      </Container>
    </section>
  );
}
