import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingActions } from '@/components/layout/FloatingActions';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { CookieBanner } from '@/components/layout/CookieBanner';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { TravelAgencySchema } from '@/components/seo/JsonLd';
import { SITE } from '@/lib/constants';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Premium UK Travel Agency — Flights, Holidays & Visas`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: ['cheap flights UK', 'holiday packages', 'ATOL protected travel agency', 'luxury holidays', 'visa services UK', 'Flights Club UK'],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | Premium UK Travel Agency`,
    description: SITE.description,
    images: [{ url: `${SITE.url}/images/og-default.jpg`, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} | Premium UK Travel Agency`,
    description: SITE.description,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <TravelAgencySchema />
        <LoadingScreen />
        <Header />
        <main className="pb-16 md:pb-0">{children}</main>
        <Footer />
        <FloatingActions />
        <MobileBottomNav />
        <CookieBanner />
      </body>
    </html>
  );
}
