import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Destination } from '@/types';
import { PopularDestinationsGrid } from './PopularDestinationsGrid';

export function PopularDestinations({ destinations }: { destinations: Destination[] }) {
  if (destinations.length === 0) return null;
  const featured = destinations.slice(0, 10);

  return (
    <section className="section-pad bg-surface dark:bg-navy-900">
      <Container>
        <SectionHeading
          eyebrow="Where To Next"
          title="Popular Destinations Loved by UK Travellers"
          description="From weekend city breaks to once-in-a-lifetime escapes — explore the routes our customers book most."
        />
        <PopularDestinationsGrid destinations={featured} />
      </Container>
    </section>
  );
}
