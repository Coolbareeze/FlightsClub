import type { Metadata } from 'next';
import Link from 'next/link';
import { LayoutDashboard, MapPinned, Package } from 'lucide-react';
import { LogoutButton } from './LogoutButton';

export const metadata: Metadata = { title: 'Admin | Flights Club UK', robots: { index: false, follow: false } };

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/packages', label: 'Holiday Packages', icon: Package },
  { href: '/admin/destinations', label: 'Destinations', icon: MapPinned },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="hidden w-64 shrink-0 flex-col bg-navy p-5 text-white md:flex">
        <Link href="/admin" className="mb-8 px-2 font-heading text-lg font-extrabold">
          Flights Club <span className="text-gold">UK</span>
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
            >
              <item.icon className="h-4 w-4" /> {item.label}
            </Link>
          ))}
        </nav>
        <LogoutButton />
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-navy-100 bg-white px-5 py-3 md:hidden">
          <span className="font-heading text-sm font-extrabold text-navy">Flights Club <span className="text-gold">UK</span> Admin</span>
          <LogoutButton compact />
        </header>
        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
