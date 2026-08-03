import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Marquee } from '@/components/ui/Marquee';
import { airlines } from '@/lib/data/airlines';

export function AirlinesSlider() {
  return (
    <section className="section-pad bg-surface dark:bg-navy-900">
      <Container>
        <SectionHeading eyebrow="Global Access" title="We Book With The World’s Leading Airlines" />
      </Container>
      <div className="mt-14">
        <Marquee>
          {airlines.map((a) => (
            <div key={a.slug} className="flex h-16 min-w-[180px] items-center justify-center rounded-xl2 border border-navy-100 bg-white px-8 shadow-soft dark:border-white/10 dark:bg-navy-800">
              <span className="font-heading text-sm font-bold text-navy/80 dark:text-white/80">{a.name}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
