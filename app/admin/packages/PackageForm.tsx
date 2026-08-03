'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save } from 'lucide-react';
import { FieldWrap, Input, Select, Textarea } from '@/components/ui/Field';
import { slugify } from '@/lib/utils';
import type { HolidayPackage } from '@/types';

const schema = z.object({
  slug: z.string().min(2),
  title: z.string().min(2, 'Enter a title'),
  destination: z.string().min(2, 'Enter a destination'),
  country: z.string().min(2, 'Enter a country'),
  image: z.string().url('Enter a valid image URL'),
  duration: z.string().min(2, 'e.g. "7 nights"'),
  nights: z.coerce.number().int().positive('Enter number of nights'),
  price: z.coerce.number().int().positive('Enter a price'),
  originalPrice: z.union([z.coerce.number().int().positive(), z.literal('')]).optional(),
  airline: z.string().min(2, 'Enter an airline'),
  hotel: z.string().min(2, 'Enter a hotel name'),
  hotelStars: z.coerce.number().int().min(1).max(5),
  board: z.string().min(2, 'e.g. "All-Inclusive"'),
  transfers: z.boolean(),
  category: z.enum(['beach', 'city', 'luxury', 'family', 'honeymoon']),
  highlights: z.string().min(2, 'Add at least one highlight'),
});
type FormValues = z.infer<typeof schema>;

export function PackageForm({ initial }: { initial?: HolidayPackage }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: initial
      ? { ...initial, originalPrice: initial.originalPrice ?? '', highlights: initial.highlights.join('\n') }
      : { transfers: true, hotelStars: 5, category: 'beach', highlights: '' },
  });

  const title = watch('title');

  const onSubmit = async (data: FormValues) => {
    setError('');
    const payload = {
      ...data,
      originalPrice: data.originalPrice === '' ? null : data.originalPrice,
      highlights: data.highlights.split('\n').map((h) => h.trim()).filter(Boolean),
    };

    const url = initial ? `/api/admin/packages/${initial.id}` : '/api/admin/packages';
    const method = initial ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const result = await res.json();

    if (result.ok) {
      router.push('/admin/packages');
      router.refresh();
    } else {
      setError(result.error || 'Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2">
      <FieldWrap label="Title" htmlFor="title" error={errors.title?.message}>
        <Input
          id="title"
          {...register('title', {
            onChange: (e) => {
              if (!initial) setValue('slug', slugify(e.target.value));
            },
          })}
        />
      </FieldWrap>
      <FieldWrap label="URL Slug" htmlFor="slug" error={errors.slug?.message}>
        <Input id="slug" {...register('slug')} />
      </FieldWrap>
      <FieldWrap label="Destination" htmlFor="destination" error={errors.destination?.message}>
        <Input id="destination" {...register('destination')} />
      </FieldWrap>
      <FieldWrap label="Country" htmlFor="country" error={errors.country?.message}>
        <Input id="country" {...register('country')} />
      </FieldWrap>
      <FieldWrap className="sm:col-span-2" label="Image URL" htmlFor="image" error={errors.image?.message}>
        <Input id="image" placeholder="https://..." {...register('image')} />
      </FieldWrap>
      <FieldWrap label="Duration" htmlFor="duration" error={errors.duration?.message}>
        <Input id="duration" placeholder="7 nights" {...register('duration')} />
      </FieldWrap>
      <FieldWrap label="Nights (number)" htmlFor="nights" error={errors.nights?.message}>
        <Input id="nights" type="number" {...register('nights')} />
      </FieldWrap>
      <FieldWrap label="Price (£ per person)" htmlFor="price" error={errors.price?.message}>
        <Input id="price" type="number" {...register('price')} />
      </FieldWrap>
      <FieldWrap label="Original Price (optional, for a strike-through)" htmlFor="originalPrice" error={errors.originalPrice?.message as string}>
        <Input id="originalPrice" type="number" {...register('originalPrice')} />
      </FieldWrap>
      <FieldWrap label="Airline" htmlFor="airline" error={errors.airline?.message}>
        <Input id="airline" {...register('airline')} />
      </FieldWrap>
      <FieldWrap label="Hotel Name" htmlFor="hotel" error={errors.hotel?.message}>
        <Input id="hotel" {...register('hotel')} />
      </FieldWrap>
      <FieldWrap label="Hotel Stars" htmlFor="hotelStars" error={errors.hotelStars?.message}>
        <Select id="hotelStars" {...register('hotelStars')}>
          {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>)}
        </Select>
      </FieldWrap>
      <FieldWrap label="Board Basis" htmlFor="board" error={errors.board?.message}>
        <Input id="board" placeholder="All-Inclusive" {...register('board')} />
      </FieldWrap>
      <FieldWrap label="Category" htmlFor="category" error={errors.category?.message}>
        <Select id="category" {...register('category')}>
          <option value="beach">Beach</option>
          <option value="city">City</option>
          <option value="luxury">Luxury</option>
          <option value="family">Family</option>
          <option value="honeymoon">Honeymoon</option>
        </Select>
      </FieldWrap>
      <div className="flex items-center gap-2 pt-7">
        <input id="transfers" type="checkbox" {...register('transfers')} className="h-4 w-4 rounded border-navy-200 text-gold focus:ring-gold" />
        <label htmlFor="transfers" className="text-sm font-medium text-navy">Airport transfers included</label>
      </div>
      <FieldWrap className="sm:col-span-2" label="Highlights (one per line)" htmlFor="highlights" error={errors.highlights?.message}>
        <Textarea id="highlights" rows={5} placeholder={'Private pool villa\nDaily breakfast\nAirport lounge access'} {...register('highlights')} />
      </FieldWrap>

      {error && <p className="sm:col-span-2 text-sm font-medium text-red-600">{error}</p>}

      <div className="flex gap-3 sm:col-span-2">
        <button type="submit" disabled={isSubmitting} className="btn-primary">
          <Save className="h-4 w-4" /> {isSubmitting ? 'Saving…' : initial ? 'Save Changes' : `Create ${title || 'Package'}`}
        </button>
      </div>
    </form>
  );
}
