import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { LegalLayout } from '@/components/layout/LegalLayout';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How Flights Club UK collects, uses and protects your personal data in accordance with UK GDPR.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="1 July 2026">
      <p>{SITE.legalName} (“we”, “us”, “our”) is committed to protecting your privacy. This policy explains how we collect, use, store and protect your personal information when you use our website, book travel with us, or contact our team, in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>

      <h2>Information We Collect</h2>
      <p>We may collect your name, contact details, passport and travel document information, payment details, travel preferences, and correspondence with our team. We also collect technical data such as IP address, browser type and site usage through cookies and analytics tools.</p>

      <h2>How We Use Your Information</h2>
      <p>We use your information to process bookings, arrange flights, holidays, visas and insurance, respond to enquiries, send relevant marketing communications (where you have consented), and comply with legal and regulatory obligations, including ATOL reporting requirements.</p>

      <h2>Sharing Your Information</h2>
      <p>We share data with airlines, hotels, tour operators, insurers and visa processing partners strictly as necessary to fulfil your booking. We do not sell your personal data to third parties.</p>

      <h2>Data Retention</h2>
      <p>We retain personal data for as long as necessary to fulfil the purposes outlined in this policy and to meet legal, accounting or reporting requirements.</p>

      <h2>Your Rights</h2>
      <p>Under UK GDPR you have the right to access, correct, delete or restrict processing of your personal data, and to object to direct marketing. To exercise these rights, contact us at {SITE.email}.</p>

      <h2>Cookies</h2>
      <p>Our website uses cookies to improve your browsing experience. Please see our <a href="/cookie-policy">Cookie Policy</a> for full details.</p>

      <h2>Contact Us</h2>
      <p>If you have questions about this policy, please contact {SITE.legalName}, {SITE.address.line1}, {SITE.address.line2}, {SITE.address.postcode}, {SITE.address.city}, or email {SITE.email}.</p>
    </LegalLayout>
  );
}
