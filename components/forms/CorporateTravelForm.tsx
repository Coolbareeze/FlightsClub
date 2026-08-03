'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send } from 'lucide-react';
import { FieldWrap, Input, Select, Textarea } from '@/components/ui/Field';
import { FormSuccess } from './FormSuccess';

const schema = z.object({
  companyName: z.string().min(2, 'Enter your company name'),
  contactName: z.string().min(2, 'Enter your name'),
  email: z.string().email('Enter a valid work email'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  travellers: z.string().min(1, 'Select an estimated traveller volume'),
  notes: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

export function CorporateTravelForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    await fetch('/api/quote', { method: 'POST', body: JSON.stringify({ ...data, type: 'corporate-travel' }) });
    setSubmitted(true);
  };

  if (submitted) return <FormSuccess message="Thank you for your interest in a Flights Club UK corporate account. Our business travel team will be in touch within one working day." />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
      <FieldWrap label="Company Name" htmlFor="c-company" error={errors.companyName?.message}>
        <Input id="c-company" {...register('companyName')} />
      </FieldWrap>
      <FieldWrap label="Contact Name" htmlFor="c-contact" error={errors.contactName?.message}>
        <Input id="c-contact" {...register('contactName')} />
      </FieldWrap>
      <FieldWrap label="Work Email" htmlFor="c-email" error={errors.email?.message}>
        <Input id="c-email" type="email" {...register('email')} />
      </FieldWrap>
      <FieldWrap label="Phone Number" htmlFor="c-phone" error={errors.phone?.message}>
        <Input id="c-phone" type="tel" {...register('phone')} />
      </FieldWrap>
      <FieldWrap className="sm:col-span-2" label="Estimated Annual Travellers" htmlFor="c-travellers" error={errors.travellers?.message}>
        <Select id="c-travellers" defaultValue="" {...register('travellers')}>
          <option value="" disabled>Select a range</option>
          <option>1 – 10</option>
          <option>11 – 50</option>
          <option>51 – 200</option>
          <option>200+</option>
        </Select>
      </FieldWrap>
      <FieldWrap className="sm:col-span-2" label="Tell us about your travel needs" htmlFor="c-notes">
        <Textarea id="c-notes" placeholder="Travel policy, reporting needs, key routes..." {...register('notes')} />
      </FieldWrap>
      <button type="submit" disabled={isSubmitting} className="btn-gold sm:col-span-2">
        <Send className="h-4 w-4" /> {isSubmitting ? 'Submitting…' : 'Request Corporate Account'}
      </button>
    </form>
  );
}
