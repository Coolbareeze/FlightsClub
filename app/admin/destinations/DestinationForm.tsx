'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save } from 'lucide-react';
import { FieldWrap, Input, Select, Textarea } from '@/components/ui/Field';
import { slugify } from '@/lib/utils';
import type { Destination } from '@/types';

const schema = z.object({
  slug: z.string().min(2),
  city: z.string().min(2, 'Enter a city'),
  country: z.string().min(2, 'Enter a country'),
  image: z.string().url('Enter a valid image URL'),
  fromPrice: z.coerce.number().int().positive('Enter a starting price'),
  blurb: z.string().min(5, 'Add a short description'),
  region: z.enum(['uk', 'europe', 'middleeast', 'asia', 'americas', 'oceania']),
});
type FormValues = z.infer<typeof schema>;

export function DestinationForm({ initial }: { initial?: Destination }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: initial ?? { region: 'europe' },
  });

  const onSubmit = async (data: FormValues) => {
    setError('');
    const url = initial ? `/api/admin/destinations/${initial.id}` : '/api/admin/destinations';
    const method = initial ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const result = await res.json();

    if (result.ok) {
      router.push('/admin/destinations');
      router.refresh();
    } else {
      setError(result.error || 'Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2">
      <FieldWrap label="City" htmlFor="city" error={errors.city?.message}>
        <Input
          id="city"
          {...register('city', {
            onChange: (e) => {
              if (!initial) setValue('slug', slugify(e.target.value));
            },
          })}
        />
      </FieldWrap>
      <FieldWrap label="URL Slug" htmlFor="slug" error={errors.slug?.message}>
        <Input id="slug" {...register('slug')} />
      </FieldWrap>
      <FieldWrap label="Country" htmlFor="country" error={errors.country?.message}>
        <Input id="country" {...register('country')} />
      </FieldWrap>
      <FieldWrap label="Region" htmlFor="region" error={errors.region?.message}>
        <Select id="region" {...register('region')}>
          <option value="europe">Europe</option>
          <option value="middleeast">Middle East</option>
          <option value="asia">Asia</option>
          <option value="americas">Americas</option>
          <option value="oceania">Oceania</option>
        </Select>
      </FieldWrap>
      <FieldWrap className="sm:col-span-2" label="Image URL" htmlFor="image" error={errors.image?.message}>
        <Input id="image" placeholder="https://..." {...register('image')} />
      </FieldWrap>
      <FieldWrap label="From Price (£)" htmlFor="fromPrice" error={errors.fromPrice?.message}>
        <Input id="fromPrice" type="number" {...register('fromPrice')} />
      </FieldWrap>
      <FieldWrap className="sm:col-span-2" label="Short Description" htmlFor="blurb" error={errors.blurb?.message}>
        <Textarea id="blurb" rows={3} placeholder="A one-line, evocative description shown on the destination card." {...register('blurb')} />
      </FieldWrap>

      {error && <p className="sm:col-span-2 text-sm font-medium text-red-600">{error}</p>}

      <div className="flex gap-3 sm:col-span-2">
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          <Save className="h-4 w-4" /> {isSubmitting ? 'Saving…' : initial ? 'Save Changes' : 'Create Destination'}
        </button>
      </div>
    </form>
  );
}
