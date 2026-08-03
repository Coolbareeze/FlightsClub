import { Container } from '@/components/ui/Container';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

export function NewsletterSection() {
  return (
    <section className="section-pad bg-navy-gradient">
      <Container>
        <div className="mx-auto max-w-xl rounded-xl3 border border-white/10 bg-white/5 p-10 text-center backdrop-blur">
          <span className="eyebrow border-white/30 bg-white/10 text-gold-light">Stay Inspired</span>
          <h2 className="mt-4 text-balance font-heading text-2xl font-bold text-white md:text-3xl">Exclusive Fares, Delivered to Your Inbox</h2>
          <p className="mt-3 text-sm text-white/65">Join 40,000+ subscribers receiving flight deals and holiday offers before anyone else.</p>
          <div className="mx-auto mt-6 max-w-sm">
            <NewsletterForm compact />
          </div>
        </div>
      </Container>
    </section>
  );
}
