'use client';

import React, { Suspense } from 'react';
import ConsultationPageContent from './ConsultationPageContent';

export default function ConsultationPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Memuat halaman konsultasi...</div>}>
      <ConsultationPageContent />
    </Suspense>
  );
}
