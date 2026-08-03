'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send } from 'lucide-react';
import { FieldWrap, Input, Select } from '@/components/ui/Field';
import { FormSuccess } from './FormSuccess';

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

export function QuoteRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    await fetch('/api/quote', { method: 'POST', body: JSON.stringify({ ...data, type: 'flight-quote' }) });
    setSubmitted(true);
  };

  if (submitted) return <FormSuccess message="Your quote request has been received. A flight specialist will send fare options within 2 working hours." />;

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
    </form>
  );
}
