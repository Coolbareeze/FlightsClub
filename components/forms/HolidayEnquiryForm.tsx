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
  destination: z.string().min(1, 'Select a destination'),
  budget: z.string().min(1, 'Select a budget range'),
  travelMonth: z.string().min(1, 'Select a preferred month'),
  notes: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

export function HolidayEnquiryForm({ defaultDestination }: { defaultDestination?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    await fetch('/api/quote', { method: 'POST', body: JSON.stringify({ ...data, type: 'holiday-enquiry' }) });
    setSubmitted(true);
  };

  if (submitted) return <FormSuccess message="Thank you — a holiday specialist will call you within 24 hours with tailored package options." />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
      <FieldWrap label="Full Name" htmlFor="h-fullName" error={errors.fullName?.message}>
        <Input id="h-fullName" {...register('fullName')} />
      </FieldWrap>
      <FieldWrap label="Email Address" htmlFor="h-email" error={errors.email?.message}>
        <Input id="h-email" type="email" {...register('email')} />
      </FieldWrap>
      <FieldWrap label="Phone Number" htmlFor="h-phone" error={errors.phone?.message}>
        <Input id="h-phone" type="tel" {...register('phone')} />
      </FieldWrap>
      <FieldWrap label="Preferred Destination" htmlFor="h-destination" error={errors.destination?.message}>
        <Input id="h-destination" defaultValue={defaultDestination} placeholder="e.g. Maldives" {...register('destination')} />
      </FieldWrap>
      <FieldWrap label="Budget Per Person" htmlFor="h-budget" error={errors.budget?.message}>
        <Select id="h-budget" defaultValue="" {...register('budget')}>
          <option value="" disabled>Select a range</option>
          <option>Under £750</option>
          <option>£750 – £1,500</option>
          <option>£1,500 – £3,000</option>
          <option>£3,000+</option>
        </Select>
      </FieldWrap>
      <FieldWrap label="Preferred Month" htmlFor="h-month" error={errors.travelMonth?.message}>
        <Select id="h-month" defaultValue="" {...register('travelMonth')}>
          <option value="" disabled>Select a month</option>
          {['Flexible', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m) => <option key={m}>{m}</option>)}
        </Select>
      </FieldWrap>
      <FieldWrap className="sm:col-span-2" label="Anything else we should know?" htmlFor="h-notes">
        <Textarea id="h-notes" placeholder="Occasion, room preferences, accessibility needs..." {...register('notes')} />
      </FieldWrap>
      <button type="submit" disabled={isSubmitting} className="btn-primary sm:col-span-2">
        <Send className="h-4 w-4" /> {isSubmitting ? 'Submitting…' : 'Get My Holiday Quote'}
      </button>
    </form>
  );
}
