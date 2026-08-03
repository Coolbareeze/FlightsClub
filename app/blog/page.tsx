import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildMetadata } from '@/lib/seo';
import { PageHero } from '@/components/layout/PageHero';
import { Container } from '@/components/ui/Container';
import { blogPosts } from '@/lib/data/blog';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Travel Blog | Guides, Tips & Inspiration',
  description: 'Expert travel guides, destination tips and inspiration from the Flights Club UK editorial team.',
  path: '/blog',
});

const categories = ['All', 'Beach Holidays', 'City Breaks', 'Travel Advice', 'Family Holidays'];

export default function BlogIndexPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }]} />
      <PageHero
        eyebrow="Travel Blog"
        title="Guides, Tips & Inspiration for Your Next Trip"
        description="Practical advice and destination inspiration from our travel desk — written by people who book these trips every day."
        image="https://picsum.photos/seed/blog-hero/1920/1080"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
      />

      <section className="section-pad bg-white dark:bg-navy-950">
        <Container>
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((c) => (
              <span key={c} className="rounded-full border border-navy-100 px-4 py-1.5 text-xs font-semibold text-navy-700/70 dark:border-white/15 dark:text-white/60">{c}</span>
            ))}
          </div>

          <Link href={`/blog/${featured.slug}`} className="group grid gap-6 overflow-hidden rounded-xl3 border border-navy-100 bg-surface shadow-soft md:grid-cols-2 dark:border-white/10 dark:bg-navy-800">
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
              <Image src={featured.image} alt={featured.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center p-8">
              <span className="eyebrow w-fit">{featured.category}</span>
              <h2 className="mt-4 font-heading text-2xl font-bold text-navy dark:text-white">{featured.title}</h2>
              <p className="mt-3 text-sm text-navy-700/70 dark:text-white/60">{featured.excerpt}</p>
              <p className="mt-4 text-xs text-navy-700/50 dark:text-white/40">{featured.author} · {featured.readTime}</p>
            </div>
          </Link>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card-lift overflow-hidden rounded-xl2 border border-navy-100 bg-white shadow-soft dark:border-white/10 dark:bg-navy-800">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={post.image} alt={post.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-navy">{post.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-sm font-bold leading-snug text-navy dark:text-white">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-xs text-navy-700/60 dark:text-white/50">{post.excerpt}</p>
                  <p className="mt-3 text-[11px] text-navy-700/45 dark:text-white/35">{post.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
