import { NextResponse } from 'next/server';
import { getAllDestinations } from '@/lib/data/destinations';

// Public, read-only endpoint used by the header search modal for
// client-side destination search. Cached for a minute so rapid modal
// opens don't hammer the database.
export const revalidate = 60;

export async function GET() {
  const destinations = await getAllDestinations();
  return NextResponse.json({ destinations });
}
