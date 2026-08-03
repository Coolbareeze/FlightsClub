import { DestinationForm } from '../DestinationForm';

export default function NewDestinationPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-navy">Add Destination</h1>
      <p className="mt-1 text-sm text-navy-700/60">This will appear immediately on the live site once saved.</p>
      <div className="mt-8 max-w-2xl rounded-xl2 border border-navy-100 bg-white p-6 shadow-soft">
        <DestinationForm />
      </div>
    </div>
  );
}
