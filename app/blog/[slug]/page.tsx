import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { blogPosts, getBlogPost } from '@/lib/data/blog';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { CTABanner } from '@/components/home/CTABanner';
import { ChevronRight } from 'lucide-react';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, image: post.image });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="pt-32">
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }]} />
      <Container className="max-w-3xl">
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-navy-500 dark:text-white/50">
          <Link href="/">Home</Link><ChevronRight className="h-3 w-3" />
          <Link href="/blog">Blog</Link><ChevronRight className="h-3 w-3" />
          <span className="text-navy dark:text-white">{post.category}</span>
        </nav>
        <span className="eyebrow">{post.category}</span>
        <h1 className="mt-4 text-balance font-heading text-3xl font-bold text-navy md:text-4xl dark:text-white">{post.title}</h1>
        <p className="mt-4 text-sm text-navy-700/60 dark:text-white/50">{post.author} · {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} · {post.readTime}</p>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl3 shadow-premium">
          <Image src={post.image} alt={post.title} fill priority className="object-cover" />
        </div>

        <div className="prose prose-neutral mt-10 max-w-none prose-headings:font-heading prose-headings:text-navy dark:prose-invert dark:prose-headings:text-white">
          {post.content.map((para, i) => <p key={i}>{para}</p>)}
        </div>
      </Container>

      <section className="section-pad mt-16 bg-surface dark:bg-navy-900">
        <Container>
          <h2 className="font-heading text-xl font-bold text-navy dark:text-white">More From The Blog</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="card-lift overflow-hidden rounded-xl2 border border-navy-100 bg-white shadow-soft dark:border-white/10 dark:bg-navy-800">
                <div className="relative aspect-[4/3]"><Image src={p.image} alt={p.title} fill className="object-cover" /></div>
                <div className="p-5"><h3 className="font-heading text-sm font-bold text-navy dark:text-white">{p.title}</h3></div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CTABanner />
    </article>
  );
}
