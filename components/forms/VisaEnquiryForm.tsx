'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send } from 'lucide-react';
import { FieldWrap, Input, Select, Textarea } from '@/components/ui/Field';
import { FormSuccess } from './FormSuccess';

const schema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  nationality: z.string().min(2, 'Enter your nationality'),
  destinationCountry: z.string().min(2, 'Enter the destination country'),
  travelDate: z.string().min(1, 'Select an intended travel date'),
  notes: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

export function VisaEnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    await fetch('/api/quote', { method: 'POST', body: JSON.stringify({ ...data, type: 'visa-enquiry' }) });
    setSubmitted(true);
  };

  if (submitted) return <FormSuccess message="Your visa enquiry has been received. Our visa team will contact you with document requirements shortly." />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
      <FieldWrap label="Full Name" htmlFor="v-fullName" error={errors.fullName?.message}>
        <Input id="v-fullName" {...register('fullName')} />
      </FieldWrap>
      <FieldWrap label="Email Address" htmlFor="v-email" error={errors.email?.message}>
        <Input id="v-email" type="email" {...register('email')} />
      </FieldWrap>
      <FieldWrap label="Phone Number" htmlFor="v-phone" error={errors.phone?.message}>
        <Input id="v-phone" type="tel" {...register('phone')} />
      </FieldWrap>
      <FieldWrap label="Nationality" htmlFor="v-nationality" error={errors.nationality?.message}>
        <Input id="v-nationality" placeholder="British" {...register('nationality')} />
      </FieldWrap>
      <FieldWrap label="Destination Country" htmlFor="v-destination" error={errors.destinationCountry?.message}>
        <Input id="v-destination" placeholder="United Arab Emirates" {...register('destinationCountry')} />
      </FieldWrap>
      <FieldWrap label="Intended Travel Date" htmlFor="v-date" error={errors.travelDate?.message}>
        <Input id="v-date" type="date" {...register('travelDate')} />
      </FieldWrap>
      <FieldWrap className="sm:col-span-2" label="Visa Type / Notes" htmlFor="v-notes">
        <Textarea id="v-notes" placeholder="Tourist, business, transit — and any questions you have" {...register('notes')} />
      </FieldWrap>
      <button type="submit" disabled={isSubmitting} className="btn-primary sm:col-span-2">
        <Send className="h-4 w-4" /> {isSubmitting ? 'Submitting…' : 'Submit Visa Enquiry'}
      </button>
    </form>
  );
}
