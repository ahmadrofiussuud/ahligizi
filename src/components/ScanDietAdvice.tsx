type Advice = {
  guideline_id: string;
  action: string;
  reason: string;
  source: { title: string; pages: string; kind: string };
};

export default function ScanDietAdvice({ recommendations }: { recommendations?: Advice[] }) {
  if (!recommendations?.length) return null;
  const advice = recommendations.slice(0, 2);
  const publishers = [...new Set(advice.map(item => item.source.title.split(' — ')[0]))].join(' • ');
  return (
    <section aria-label="Saran makanan berdasarkan pedoman" className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3 text-left space-y-1.5">
      <h4 className="text-xs font-bold text-emerald-900">Saran makan</h4>
      <p className="line-clamp-2 text-xs leading-5 font-medium text-slate-700" data-testid="scan-diet-summary">
        {advice.map(item => `• ${item.action}`).join(' ')}
      </p>
      <details className="text-[11px] text-slate-600">
        <summary className="cursor-pointer font-semibold text-emerald-800">Sumber pedoman: {publishers}</summary>
        <ul className="mt-2 space-y-2">
          {advice.map((item, index) => (
            <li key={`${item.guideline_id}-${index}`} className="rounded-lg bg-white p-2 space-y-1">
              <p className="font-semibold">{item.action}</p>
              <p>{item.reason}</p>
              <p>{item.source.title} · halaman PDF {item.source.pages}. {item.source.kind}.</p>
            </li>
          ))}
        </ul>
        <p className="mt-2">Edukasi dari foto, bukan diagnosis atau resep diet pribadi. Bagian yang tidak terlihat belum tentu tidak dikonsumsi; diet khusus perlu disesuaikan bersama tenaga kesehatan.</p>
      </details>
    </section>
  );
}
