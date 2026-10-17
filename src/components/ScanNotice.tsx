import React from 'react';
import { AlertCircle, AlertTriangle, HelpCircle, Info, Sparkles } from 'lucide-react';

type ScanObservation = {
  classification?: string;
  detected_object?: string;
  notes?: string;
  suggestion?: string;
  confidence?: string;
};

export default function ScanNotice({
  result,
  error,
}: {
  result?: ScanObservation | null;
  error?: string | null;
}) {
  const isUncertain = result?.classification === 'uncertain';

  if (error) {
    return (
      <section
        role="alert"
        className="rounded-3xl border-2 border-rose-400 bg-rose-50/90 p-5 text-left space-y-3.5 shadow-sm"
      >
        <div className="flex items-center gap-2.5 text-rose-800">
          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 block">Status Analisis</span>
            <h4 className="text-sm font-extrabold text-rose-900 leading-tight">Analisis Belum Berhasil</h4>
          </div>
        </div>
        <p className="text-xs text-rose-700 leading-relaxed font-medium bg-white/70 p-3 rounded-xl border border-rose-200">
          {error}
        </p>
      </section>
    );
  }

  if (isUncertain) {
    return (
      <section
        role="status"
        className="rounded-3xl border-2 border-amber-400 bg-amber-50/95 p-5 text-left space-y-3.5 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <span className="text-[9.5px] font-black uppercase tracking-wider text-amber-600 block">Verifikasi Visual</span>
              <h4 className="text-sm font-black text-amber-950">Objek Belum Dapat Dipastikan</h4>
            </div>
          </div>
          {result?.confidence && (
            <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-200 text-amber-900 capitalize">
              Keyakinan: {result.confidence}
            </span>
          )}
        </div>

        {result?.detected_object && (
          <div className="bg-white/80 border border-amber-200 p-3 rounded-2xl">
            <span className="text-[10px] font-bold text-amber-700 block uppercase tracking-wide">Perkiraan Objek:</span>
            <p className="text-base font-black text-slate-800 mt-0.5">{result.detected_object}</p>
          </div>
        )}

        {result?.notes && (
          <div className="text-xs text-amber-900 leading-relaxed space-y-1">
            <span className="font-bold block text-amber-800">Analisis Visual AI:</span>
            <p className="font-medium bg-white/60 p-2.5 rounded-xl border border-amber-200/60">{result.notes}</p>
          </div>
        )}

        {result?.suggestion && (
          <div className="text-xs text-slate-700 bg-amber-100/60 p-3 rounded-xl flex items-start gap-2 border border-amber-200/50">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-900 block">Saran Pengambilan Foto:</span>
              <p className="text-[11px] font-medium leading-relaxed">{result.suggestion}</p>
            </div>
          </div>
        )}
      </section>
    );
  }

  // Non-Food item with clear RED accent
  return (
    <section
      role="status"
      className="rounded-3xl border-2 border-rose-500 bg-rose-50/95 p-5 text-left space-y-4 shadow-sm"
    >
      {/* Red Alert Header Badge */}
      <div className="flex items-center justify-between border-b border-rose-200/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="inline-block px-2 py-0.5 bg-rose-200 text-rose-800 text-[9px] font-black rounded-md tracking-wider uppercase mb-0.5">
              Peringatan AI
            </span>
            <h4 className="text-sm font-black text-rose-950 leading-tight">
              Bukan Makanan atau Minuman
            </h4>
          </div>
        </div>

        {result?.confidence && (
          <span className="text-[9.5px] font-extrabold px-2 py-1 rounded-full bg-rose-200/80 text-rose-900 border border-rose-300 capitalize">
            Akurasi: {result.confidence}
          </span>
        )}
      </div>

      {/* Prominent Detected Object Card with Red Border */}
      <div className="bg-white border-2 border-rose-300 rounded-2xl p-3.5 shadow-xs space-y-1">
        <span className="text-[10px] font-black text-rose-600 block uppercase tracking-wider">
          🔍 Prediksi Objek Terdeteksi:
        </span>
        <p className="text-lg font-black text-slate-850">
          {result?.detected_object || 'Objek non-konsumsi terdeteksi'}
        </p>
      </div>

      {/* AI Visual Notes */}
      {result?.notes && (
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-rose-700 block uppercase tracking-wider">
            Analisis Visual AI:
          </span>
          <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white/70 p-3 rounded-xl border border-rose-200">
            {result.notes}
          </p>
        </div>
      )}

      {/* Practical Suggestion */}
      {result?.suggestion && (
        <div className="bg-rose-100/70 border border-rose-200 p-3 rounded-xl flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-black text-rose-900 block">Saran Pengambilan Foto:</span>
            <p className="text-[11px] text-rose-800 font-medium leading-relaxed mt-0.5">
              {result.suggestion}
            </p>
          </div>
        </div>
      )}

      {/* Red Reassurance Box */}
      <div className="bg-rose-500/10 border border-rose-300 rounded-xl px-3 py-2 text-center">
        <p className="text-[10.5px] font-bold text-rose-800">
          ⚠️ Kalori & nutrisi tidak dihitung karena bukan bahan pangan konsumsi.
        </p>
      </div>
    </section>
  );
}
