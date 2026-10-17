const verdicts: Record<string, { label: string; color: string }> = {
  sangat_baik: { label: 'Sangat Baik', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  baik: { label: 'Baik', color: 'bg-teal-50 text-teal-800 border-teal-200' },
  cukup: { label: 'Cukup', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  kurang: { label: 'Kurang', color: 'bg-rose-50 text-rose-800 border-rose-200' },
};

export default function FoodVerdictBadge({ verdict }: { verdict?: string | null }) {
  const value = verdicts[verdict ?? ''] ?? {
    label: 'Belum dinilai', color: 'bg-slate-50 text-slate-700 border-slate-200',
  };
  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${value.color}`}>{value.label}</span>;
}
