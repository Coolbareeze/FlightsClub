import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { LegalLayout } from '@/components/layout/LegalLayout';

export const metadata: Metadata = buildMetadata({
  title: 'Cookie Policy',
  description: 'How Flights Club UK uses cookies and similar technologies on this website.',
  path: '/cookie-policy',
});

export default function CookiePolicyPage() {
  return (
    <LegalLayout title="Cookie Policy" updated="1 July 2026">
      <p>This website uses cookies to improve functionality, analyse traffic and personalise content. This policy explains what cookies are and how we use them.</p>

      <h2>What Are Cookies?</h2>
      <p>Cookies are small text files stored on your device when you visit a website. They help websites remember information about your visit.</p>

      <h2>Types of Cookies We Use</h2>
      <p><strong>Essential Cookies</strong> — required for core site functionality such as navigation and secure areas.</p>
      <p><strong>Analytics Cookies</strong> — help us understand how visitors use our site (e.g. Google Analytics 4, Microsoft Clarity) so we can improve it.</p>
      <p><strong>Marketing Cookies</strong> — used to deliver relevant advertising (e.g. Meta Pixel, Google Tag Manager), where you have provided consent.</p>

      <h2>Managing Cookies</h2>
      <p>You can manage or withdraw your cookie consent at any time using the cookie banner on this site, or by adjusting your browser settings to block or delete cookies.</p>

      <h2>Third-Party Cookies</h2>
      <p>Some cookies are set by third-party services that appear on our pages, such as embedded maps and analytics providers. We do not control these cookies and recommend reviewing the relevant third party&rsquo;s own cookie policy.</p>
    </LegalLayout>
  );
}
