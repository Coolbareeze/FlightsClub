import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { blogPosts } from '@/lib/data/blog';

export function TravelInspiration() {
  return (
    <section className="section-pad bg-white dark:bg-navy-950">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading align="left" eyebrow="Travel Inspiration" title="Stories & Advice From Our Travel Desk" className="mx-0 text-left" />
          <Link href="/blog" className="btn-outline shrink-0">Visit The Blog <ArrowRight className="h-4 w-4" /></Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card-lift group overflow-hidden rounded-xl2 border border-navy-100 bg-white shadow-soft dark:border-white/10 dark:bg-navy-800">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={post.image} alt={post.title} fill sizes="(max-width:768px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-navy">{post.category}</span>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-sm font-bold leading-snug text-navy dark:text-white">{post.title}</h3>
                <p className="mt-2 text-xs text-navy-700/60 dark:text-white/50">{post.readTime}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
