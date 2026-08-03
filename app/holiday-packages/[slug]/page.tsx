import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CalendarRange, CheckCircle2, MapPin, Plane, Star, Users } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { HolidayEnquiryForm } from '@/components/forms/HolidayEnquiryForm';
import { PackageCard } from '@/components/home/PackageCard';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { getPackageBySlug, getPackagesByCategory } from '@/lib/data/packages';
import { formatGBP } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) return {};
  return buildMetadata({ title: `${pkg.title} — from ${formatGBP(pkg.price)}pp`, description: `${pkg.duration} in ${pkg.destination} with ${pkg.airline} flights and ${pkg.hotel}. ATOL protected, book with Flights Club UK.`, path: `/holiday-packages/${pkg.slug}`, image: pkg.image });
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) notFound();

  const related = (await getPackagesByCategory(pkg.category)).filter((p) => p.slug !== pkg.slug).slice(0, 3);

  return (
    <div className="pt-32">
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Holiday Packages', path: '/holiday-packages' }, { name: pkg.title, path: `/holiday-packages/${pkg.slug}` }]} />
      <Container>
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl3 shadow-premium">
              <Image src={pkg.image} alt={pkg.title} fill priority className="object-cover" />
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-navy-700/60 dark:text-white/50">
              <MapPin className="h-4 w-4 text-gold" /> {pkg.destination}, {pkg.country}
              <span className="ml-auto flex">{[...Array(pkg.hotelStars)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}</span>
            </div>
            <h1 className="mt-2 font-heading text-3xl font-bold text-navy md:text-4xl dark:text-white">{pkg.title}</h1>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: CalendarRange, label: pkg.duration },
                { icon: Plane, label: pkg.airline },
                { icon: Users, label: pkg.board },
                { icon: CheckCircle2, label: pkg.transfers ? 'Transfers Included' : 'No Transfers' },
              ].map((f) => (
                <div key={f.label} className="rounded-xl2 border border-navy-100 bg-surface p-4 text-center dark:border-white/10 dark:bg-navy-800">
                  <f.icon className="mx-auto h-5 w-5 text-gold" />
                  <p className="mt-2 text-xs font-medium text-navy-700/80 dark:text-white/60">{f.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="font-heading text-lg font-bold text-navy dark:text-white">Package Highlights</h2>
              <ul className="mt-4 space-y-3">
                {pkg.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-navy-700/75 dark:text-white/65">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h2 className="font-heading text-lg font-bold text-navy dark:text-white">Your Hotel</h2>
              <p className="mt-3 text-sm leading-relaxed text-navy-700/75 dark:text-white/65">
                Stay at {pkg.hotel}, a {pkg.hotelStars}-star property in {pkg.destination} offering {pkg.board.toLowerCase()} accommodation. Room categories, exact hotel and amenities can be tailored to your preference — speak to a consultant for alternatives at every budget.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-28 rounded-xl2 border border-navy-100 bg-white p-6 shadow-premium dark:border-white/10 dark:bg-navy-800">
              <div className="flex items-end justify-between border-b border-navy-100 pb-5 dark:border-white/10">
                <div>
                  {pkg.originalPrice && <p className="text-xs text-navy-400 line-through">{formatGBP(pkg.originalPrice)}</p>}
                  <p className="font-heading text-3xl font-extrabold text-navy dark:text-white">{formatGBP(pkg.price)}</p>
                  <p className="text-xs text-navy-700/60 dark:text-white/50">per person, based on two sharing</p>
                </div>
                <span className="eyebrow">ATOL Protected</span>
              </div>
              <div className="mt-6">
                <HolidayEnquiryForm defaultDestination={pkg.destination} />
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20 border-t border-navy-100 pt-14 dark:border-white/10">
            <SectionHeading align="left" eyebrow="You May Also Like" title="Similar Packages" className="mx-0 text-left" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => <PackageCard key={p.slug} pkg={p} index={i} />)}
            </div>
          </div>
        )}
      </Container>
      <div className="h-20" />
    </div>
  );
}
