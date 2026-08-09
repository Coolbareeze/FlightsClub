'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Marquee } from '@/components/ui/Marquee';
import { airlines } from '@/lib/data/airlines';
import type { Airline } from '@/types';

// Renders the real logo file if it exists and loads successfully; falls
// back to the airline name as text if no logo is set yet, or if the file
// 404s (e.g. before the real asset has been added under
// public/images/airlines/ — see that folder's README.txt).
function AirlineCard({ airline }: { airline: Airline }) {
  const [failed, setFailed] = useState(false);
  const showLogo = Boolean(airline.logo) && !failed;

  return (
    <div className="flex h-16 min-w-[180px] items-center justify-center rounded-xl2 border border-navy-100 bg-white px-8 shadow-soft dark:border-white/10 dark:bg-navy-800">
      {showLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={airline.logo}
          alt={airline.name}
          onError={() => setFailed(true)}
          className="max-h-8 w-auto max-w-[130px] object-contain dark:brightness-0 dark:invert dark:opacity-80"
        />
      ) : (
        <span className="font-heading text-sm font-bold text-navy/80 dark:text-white/80">{airline.name}</span>
      )}
    </div>
  );
}

export function AirlinesSlider() {
  return (
    <section className="section-pad bg-surface dark:bg-navy-900">
      <Container>
        <SectionHeading eyebrow="Global Access" title="We Book With The World’s Leading Airlines" />
      </Container>
      <div className="mt-14">
        <Marquee>
          {airlines.map((a) => (
            <AirlineCard key={a.slug} airline={a} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
