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
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Please add a few more details (min. 10 characters)'),
  website: z.string().max(0).optional(),
});
type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
    setSubmitted(true);
  };

  if (submitted) return <FormSuccess message="Your message has been sent to our travel team. We reply to all enquiries within one working hour during office hours." />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
      <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} className="hidden" aria-hidden />
      <FieldWrap label="Full Name" htmlFor="fullName" error={errors.fullName?.message}>
        <Input id="fullName" placeholder="Jane Smith" {...register('fullName')} />
      </FieldWrap>
      <FieldWrap label="Email Address" htmlFor="email" error={errors.email?.message}>
        <Input id="email" type="email" placeholder="jane@email.com" {...register('email')} />
      </FieldWrap>
      <FieldWrap label="Phone Number" htmlFor="phone" error={errors.phone?.message}>
        <Input id="phone" type="tel" placeholder="07123 456789" {...register('phone')} />
      </FieldWrap>
      <FieldWrap label="Subject" htmlFor="subject" error={errors.subject?.message}>
        <Select id="subject" defaultValue="" {...register('subject')}>
          <option value="" disabled>Select a subject</option>
          <option>Flight Booking</option>
          <option>Holiday Package</option>
          <option>Visa Services</option>
          <option>Existing Booking</option>
          <option>Complaint / Feedback</option>
          <option>Other</option>
        </Select>
      </FieldWrap>
      <FieldWrap className="sm:col-span-2" label="Message" htmlFor="message" error={errors.message?.message}>
        <Textarea id="message" placeholder="Tell us how we can help..." {...register('message')} />
      </FieldWrap>
      <button type="submit" disabled={isSubmitting} className="btn-primary sm:col-span-2">
        <Send className="h-4 w-4" /> {isSubmitting ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
