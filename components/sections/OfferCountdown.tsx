'use client';

import { useEffect, useState } from 'react';

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function OfferCountdown({ target }: { target: string }) {
  const [time, setTime] = useState(() => getTimeLeft(new Date(target)));

  useEffect(() => {
    const t = setInterval(() => setTime(getTimeLeft(new Date(target))), 1000);
    return () => clearInterval(t);
  }, [target]);

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hrs', value: time.hours },
    { label: 'Min', value: time.minutes },
    { label: 'Sec', value: time.seconds },
  ];

  return (
    <div className="flex gap-2">
      {units.map((u) => (
        <div key={u.label} className="flex w-14 flex-col items-center rounded-lg bg-navy px-2 py-1.5 text-white">
          <span className="font-heading text-sm font-extrabold tabular-nums">{String(u.value).padStart(2, '0')}</span>
          <span className="text-[9px] uppercase tracking-wide text-white/60">{u.label}</span>
        </div>
      ))}
    </div>
  );
}
