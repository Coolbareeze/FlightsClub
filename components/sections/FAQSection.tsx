import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Accordion } from '@/components/ui/Accordion';
import { FaqSchema } from '@/components/seo/JsonLd';
import type { FAQ } from '@/types';

export function FAQSection({ faqs, title = 'Frequently Asked Questions' }: { faqs: FAQ[]; title?: string }) {
  return (
    <section className="section-pad bg-surface dark:bg-navy-900">
      <FaqSchema faqs={faqs} />
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Need To Know" title={title} />
        <div className="mt-12">
          <Accordion items={faqs} />
        </div>
      </Container>
    </section>
  );
}
