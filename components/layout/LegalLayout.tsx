import { Container } from '@/components/ui/Container';

export function LegalLayout({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="pt-32">
      <Container className="max-w-3xl pb-20">
        <h1 className="font-heading text-3xl font-bold text-navy md:text-4xl dark:text-white">{title}</h1>
        <p className="mt-3 text-sm text-navy-700/60 dark:text-white/50">Last updated: {updated}</p>
        <div className="prose prose-neutral mt-10 max-w-none prose-headings:font-heading prose-headings:text-navy prose-a:text-royal dark:prose-invert dark:prose-headings:text-white">
          {children}
        </div>
      </Container>
    </div>
  );
}
