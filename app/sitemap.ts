import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';
import { blogPosts } from '@/lib/data/blog';
import { packages } from '@/lib/data/packages';

const staticPaths = [
  '', '/flights', '/holiday-packages', '/city-breaks', '/beach-holidays', '/luxury-holidays',
  '/family-holidays', '/business-travel', '/visa-services', '/travel-insurance', '/about-us',
  '/why-choose-us', '/special-offers', '/blog', '/contact', '/privacy-policy', '/terms',
  '/cookie-policy', '/site-map',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const packageEntries: MetadataRoute.Sitemap = packages.map((pkg) => ({
    url: `${SITE.url}/holiday-packages/${pkg.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries, ...packageEntries];
}
