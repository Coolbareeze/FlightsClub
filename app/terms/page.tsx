import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { LegalLayout } from '@/components/layout/LegalLayout';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = buildMetadata({
  title: 'Terms & Conditions',
  description: 'The terms and conditions governing bookings made with Flights Club UK.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" updated="1 July 2026">
      <p>These terms and conditions govern all bookings made with {SITE.legalName} (“Flights Club UK”). By booking with us, you agree to be bound by these terms.</p>

      <h2>Booking & Payment</h2>
      <p>A booking is confirmed once a deposit or full payment has been received and confirmation has been issued. Prices are subject to availability and may change until a booking is confirmed.</p>

      <h2>ATOL Protection</h2>
      <p>Package holidays sold by Flights Club UK are ATOL protected (Licence No. 11856). In the unlikely event of our insolvency, the ATOL scheme protects your money and, if abroad, helps bring you home.</p>

      <h2>Amendments & Cancellations</h2>
      <p>Amendment and cancellation fees vary by airline, hotel and tour operator. Full details will be provided at the time of booking and confirmed in writing.</p>

      <h2>Travel Documents</h2>
      <p>It is your responsibility to ensure you hold a valid passport, visa and any required health documentation for your destination. We can assist with visa applications via our Visa Services.</p>

      <h2>Liability</h2>
      <p>Flights Club UK acts as an agent for airlines, hotels and tour operators. Our liability is limited in accordance with the relevant supplier&rsquo;s terms and applicable UK consumer protection law, including the Package Travel and Linked Travel Arrangements Regulations 2018 where applicable.</p>

      <h2>Complaints</h2>
      <p>If you are unhappy with any aspect of your booking, please contact us at {SITE.email} and we will investigate promptly.</p>

      <h2>Governing Law</h2>
      <p>These terms are governed by the laws of England and Wales.</p>
    </LegalLayout>
  );
}
