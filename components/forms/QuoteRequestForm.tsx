'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MessageCircle, Send } from 'lucide-react';
import { FieldWrap, Input, Select } from '@/components/ui/Field';
import { FormSuccess } from './FormSuccess';
import { SITE } from '@/lib/constants';

const schema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  origin: z.string().min(2, 'Enter a departure airport or city'),
  destination: z.string().min(2, 'Enter a destination'),
  departDate: z.string().min(1, 'Select a departure date'),
  passengers: z.string().min(1),
  cabin: z.string().min(1),
});
type FormValues = z.infer<typeof schema>;

interface QuoteRequestFormProps {
  defaultOrigin?: string;
  defaultDestination?: string;
  defaultDepartDate?: string;
  defaultPassengers?: string;
  defaultCabin?: string;
}

export function QuoteRequestForm({ defaultOrigin, defaultDestination, defaultDepartDate, defaultPassengers, defaultCabin }: QuoteRequestFormProps = {}) {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      origin: defaultOrigin || '',
      destination: defaultDestination || '',
      departDate: defaultDepartDate || '',
      passengers: defaultPassengers || '1 Adult',
      cabin: defaultCabin || 'Economy',
    },
  });

  const onSubmit = async (data: FormValues) => {
    await fetch('/api/quote', { method: 'POST', body: JSON.stringify({ ...data, type: 'flight-quote' }) });
    setSubmitted(true);
  };

  // Lower-friction alternative to submitting the form: opens WhatsApp with
  // whatever the customer has typed so far, pre-filled into the message —
  // no validation required, since the point is speed, not a tracked lead.
  // The form stays the default path (it's what gives you an email/CRM
  // record of every enquiry); this is an extra option, not a replacement.
  const openWhatsApp = () => {
    const { origin, destination, departDate, passengers, cabin } = getValues();
    const lines = [
      "Hi, I'd like a quote for a flight",
      origin && destination ? `from ${origin} to ${destination}` : destination ? `to ${destination}` : '',
      departDate ? `departing ${departDate}` : '',
      `${passengers || '1 Adult'}, ${cabin || 'Economy'}.`,
    ].filter(Boolean);
    const message = lines.join(' ');
    window.open(`https://wa.me/${SITE.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  if (submitted) return <FormSuccess message="Your quote request has been received. A flight specialist will send fare options within 1 working hour." />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
      <FieldWrap label="Full Name" htmlFor="q-fullName" error={errors.fullName?.message}>
        <Input id="q-fullName" {...register('fullName')} />
      </FieldWrap>
      <FieldWrap label="Email Address" htmlFor="q-email" error={errors.email?.message}>
        <Input id="q-email" type="email" {...register('email')} />
      </FieldWrap>
      <FieldWrap label="Phone Number" htmlFor="q-phone" error={errors.phone?.message}>
        <Input id="q-phone" type="tel" {...register('phone')} />
      </FieldWrap>
      <FieldWrap label="Departure Date" htmlFor="q-date" error={errors.departDate?.message}>
        <Input id="q-date" type="date" {...register('departDate')} />
      </FieldWrap>
      <FieldWrap label="Flying From" htmlFor="q-origin" error={errors.origin?.message}>
        <Input id="q-origin" placeholder="London Heathrow (LHR)" {...register('origin')} />
      </FieldWrap>
      <FieldWrap label="Flying To" htmlFor="q-destination" error={errors.destination?.message}>
        <Input id="q-destination" placeholder="Dubai (DXB)" {...register('destination')} />
      </FieldWrap>
      <FieldWrap label="Passengers" htmlFor="q-pax" error={errors.passengers?.message}>
        <Select id="q-pax" defaultValue="1 Adult" {...register('passengers')}>
          {['1 Adult', '2 Adults', '2 Adults, 1 Child', '2 Adults, 2 Children', 'Group (5+)'].map((o) => <option key={o}>{o}</option>)}
        </Select>
      </FieldWrap>
      <FieldWrap label="Cabin Class" htmlFor="q-cabin" error={errors.cabin?.message}>
        <Select id="q-cabin" defaultValue="Economy" {...register('cabin')}>
          {['Economy', 'Premium Economy', 'Business', 'First'].map((o) => <option key={o}>{o}</option>)}
        </Select>
      </FieldWrap>
      <button type="submit" disabled={isSubmitting} className="btn-gold sm:col-span-2">
        <Send className="h-4 w-4" /> {isSubmitting ? 'Submitting…' : 'Request Free Quote'}
      </button>

      <button
        type="button"
        onClick={openWhatsApp}
        className="flex items-center justify-center gap-2 rounded-xl2 bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.01] sm:col-span-2"
      >
        <MessageCircle className="h-4 w-4" /> Or Get a Quick Quote on WhatsApp
      </button>
      <p className="text-center text-xs text-navy-400 sm:col-span-2">
        Prefer to chat? WhatsApp gets you a faster reply — the form gives you a written record by email.
      </p>
    </form>
  );
}
