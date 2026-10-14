'use client';

import { useEffect, useState } from 'react';

// Code 39 digit patterns, including the required start/stop symbol.
const patterns: Record<string, string> = {
  '0': 'nnnwwnwnn', '1': 'wnnwnnnnw', '2': 'nnwwnnnnw',
  '3': 'wnwwnnnnn', '4': 'nnnwwnnnw', '5': 'wnnwwnnnn',
  '6': 'nnwwwnnnn', '7': 'nnnwnnwnw', '8': 'wnnwnnwnn',
  '9': 'nnwwnnwnn', '*': 'nwnnwnwnn',
  'A': 'wnnnnwnnw', 'B': 'nnwnnwnnw', 'C': 'wnwnnwnnn',
  'D': 'nnnnwwnnw', 'E': 'wnnnwwnnn', 'F': 'nnwnwwnnn',
};

export default function RegistrationBarcode({ value }: { value?: string }) {
  const [code, setCode] = useState('');
  useEffect(() => {
    if (value) return;
    const timer = window.setTimeout(() => {
    let saved = localStorage.getItem('cekat_registration_code');
    if (!saved || !/^\d{12}$/.test(saved)) {
      saved = Array.from(crypto.getRandomValues(new Uint8Array(12)), n => String(n % 10)).join('');
      localStorage.setItem('cekat_registration_code', saved);
    }
    setCode(saved);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [value]);

  const displayCode = value || code;
  let x = 20;
  const bars: { x: number; width: number }[] = [];
  for (const symbol of `*${displayCode}*`) {
    if (!patterns[symbol]) return <p role="alert">Format barcode tidak didukung.</p>;
    patterns[symbol].split('').forEach((width, index) => {
      const size = width === 'w' ? 3 : 1;
      if (index % 2 === 0) bars.push({ x, width: size });
      x += size;
    });
    x += 1;
  }

  return (
    <div className="space-y-3 text-center">
      {displayCode && <svg role="img" aria-label={`Barcode registrasi ${displayCode}`} viewBox={`0 0 ${x + 20} 90`} className="w-full bg-white" shapeRendering="crispEdges">
        <rect width={x + 20} height="90" fill="white" />
        {bars.map((bar, i) => <rect key={i} x={bar.x} y="5" width={bar.width} height="80" fill="black" />)}
      </svg>}
      <p className="font-mono text-sm tracking-wider break-all text-slate-900">{displayCode || 'Menyiapkan barcode…'}</p>
      <p className="text-xs text-slate-600">Tunjukkan barcode ini kepada petugas atau pindai dengan scanner di Station.</p>
      {!value && <p className="text-xs text-slate-500">Barcode demo untuk perangkat ini. Akses resume medis faskes belum terhubung.</p>}
    </div>
  );
}
