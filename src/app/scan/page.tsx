'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  SwitchCamera,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  RefreshCw,
  Info,
  Check,
  Flame,
  Award,
} from 'lucide-react';

export default function ScanPage() {
  // Camera & Stream States
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  // Image & Scan States
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [mealType, setMealType] = useState<string>('LUNCH');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  // New Achievement Pop-up State
  const [unlockedAchievement, setUnlockedAchievement] = useState<any>(null);

  // Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start Camera Stream
  const startCamera = async (mode: 'environment' | 'user' = facingMode) => {
    setCameraError(null);
    stopCamera();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.error('Camera Access Error:', err);
      setCameraError(
        'Gagal mengakses kamera. Pastikan izin kamera telah diaktifkan di pengaturan browser kamu.'
      );
      setIsCameraActive(false);
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Toggle Front/Back Camera
  const toggleCamera = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Capture Frame from Video to Canvas & Compress to JPEG ~1MB
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85); // JPEG compression
      setImagePreview(dataUrl);
      stopCamera();
    }
  };

  // Handle Gallery Upload & Compress
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Scale down if image is too large (> 1200px)
        const maxDim = 1200;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setImagePreview(compressedDataUrl);
        stopCamera();
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Send Photo to /api/scan-food
  const handleScanFood = async () => {
    if (!imagePreview) return;
    setLoading(true);
    setScanError(null);
    setResult(null);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/scan-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imagePreview }),
      });

      const data = await res.json();

      if (!res.ok) {
        setScanError(data.error || 'Terjadi kesalahan saat memproses scan.');
        return;
      }

      if (data.data && data.data.is_food_detected === false) {
        setScanError(
          'Tidak terdeteksi objek makanan/minuman yang jelas. Silakan foto ulang dengan pencahayaan dan sudut yang lebih baik.'
        );
        return;
      }

      if (data.data && data.data.confidence === 'rendah') {
        setScanError(
          'Tingkat kejelasan foto terlalu rendah. Mohon pastikan makanan terlihat utuh dan fokus.'
        );
        return;
      }

      setResult(data.data);
    } catch (err) {
      console.error(err);
      setScanError('Gagal menghubungkan ke server analisis gizi.');
    } finally {
      setLoading(false);
    }
  };

  // Save Scanned Meal to FoodLog DB & Trigger pop-up if new achievements
  const handleSaveToLog = async () => {
    if (!result) return;
    setSaving(true);

    const foodName =
      result.items && result.items.length > 0
        ? result.items.map((i: any) => i.name).join(' + ')
        : 'Makanan Terdeteksi';

    try {
      const res = await fetch('/api/food-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          food_name: foodName,
          calories: result.calories,
          protein_g: result.protein_g,
          carbs_g: result.carbs_g,
          fat_g: result.fat_g,
          fiber_g: result.fiber_g,
          portion_estimate: result.items?.[0]?.portion_estimate || '1 Porsi',
          health_verdict: result.health_verdict,
          ai_notes: `${result.notes || ''} ${result.suggestion || ''}`,
          meal_type: mealType,
          image_url: imagePreview,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSaveSuccess(true);
        // If API returned a new badge unlocked, trigger achievement pop-up
        if (data.new_achievements && data.new_achievements.length > 0) {
          setUnlockedAchievement(data.new_achievements[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Cleanup Camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hidden Canvas for Frame Capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 flex items-center justify-center gap-2">
          <Camera className="w-8 h-8 text-emerald-600" />
          <span>Analisis Gizi</span>
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto font-medium">
          Ambil foto langsung dengan kamera atau unggah dari galeri untuk analisis nutrisi instan oleh AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Camera / Capture Box */}
        <div className="bg-white border border-emerald-100 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-sm">
          <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-slate-55 flex items-center justify-center border border-emerald-100/60">
            {/* 1. Camera Error View */}
            {cameraError ? (
              <div className="p-4 text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
                <p className="text-xs text-slate-600 font-medium">{cameraError}</p>
                <button
                  onClick={() => startCamera()}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
                >
                  Coba Lagi Izin Kamera
                </button>
              </div>
            ) : isCameraActive ? (
              /* 2. Live Camera Stream */
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={toggleCamera}
                  className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 text-slate-700 border border-emerald-100 hover:bg-white transition"
                  title="Switch Kamera Belakang / Depan"
                >
                  <SwitchCamera className="w-4 h-4 text-emerald-600" />
                </button>
              </div>
            ) : imagePreview ? (
              /* 3. Photo Preview */
              <div className="relative w-full h-full">
                <img
                  src={imagePreview}
                  alt="Preview Foto Makanan"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => {
                    setImagePreview(null);
                    setResult(null);
                    setScanError(null);
                  }}
                  className="absolute top-3 right-3 bg-white/90 text-slate-700 text-xs px-3 py-1.5 rounded-xl border border-emerald-100 hover:bg-white transition font-bold"
                >
                  Ganti Foto
                </button>
              </div>
            ) : (
              /* 4. Default Placeholder */
              <div className="text-center space-y-3 p-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto">
                  <Camera className="w-6 h-6" />
                </div>
                <p className="text-xs text-slate-555 font-semibold">
                  Aktifkan kamera live atau unggah foto makanan dari galeri HP kamu.
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {isCameraActive ? (
              <button
                onClick={capturePhoto}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-md hover:brightness-105 active:scale-98 transition flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                <span>Ambil Foto Makanan</span>
              </button>
            ) : imagePreview ? (
              <button
                disabled={loading}
                onClick={handleScanFood}
                className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 shadow-md transition-all ${
                  loading
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-emerald-500 text-white hover:bg-emerald-600 active:scale-98'
                }`}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin text-white" />
                    <span>AI Menganalisis...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Analisis Foto Makanan</span>
                  </>
                )}
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => startCamera()}
                  className="py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs hover:bg-emerald-100 transition flex items-center justify-center gap-1.5"
                >
                  <Camera className="w-4 h-4 text-emerald-600" />
                  <span>Buka Kamera</span>
                </button>

                <label className="py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-200/60 transition flex items-center justify-center gap-1.5 cursor-pointer">
                  <Upload className="w-4 h-4 text-slate-500" />
                  <span>Galeri HP</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleGalleryUpload}
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Result / Skeleton Box */}
        <div className="bg-white border border-emerald-100 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
          {loading ? (
            /* Loading Skeleton */
            <div className="space-y-5 animate-pulse">
              <div className="h-4 bg-slate-100 rounded w-1/3"></div>
              <div className="h-8 bg-slate-100 rounded w-2/3"></div>
              <div className="h-16 bg-slate-100 rounded-xl"></div>
              <div className="grid grid-cols-4 gap-2">
                <div className="h-14 bg-slate-100 rounded-xl"></div>
                <div className="h-14 bg-slate-100 rounded-xl"></div>
                <div className="h-14 bg-slate-100 rounded-xl"></div>
                <div className="h-14 bg-slate-100 rounded-xl"></div>
              </div>
              <div className="h-20 bg-slate-100 rounded-xl"></div>
            </div>
          ) : scanError ? (
            /* Error Box */
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <XCircle className="w-12 h-12 text-rose-500" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-800">Analisis Gagal</h3>
                <p className="text-xs text-slate-500 max-w-xs">{scanError}</p>
              </div>
              <button
                onClick={() => {
                  setScanError(null);
                  setImagePreview(null);
                }}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
              >
                Foto Ulang Makanan
              </button>
            </div>
          ) : !result ? (
            /* Empty Result Placeholder */
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Sparkles className="w-6 h-6" />
              </div>
              <p className="text-sm text-slate-500 font-semibold">
                Hasil analisis nutrisi & kalori makanan akan muncul di sini secara rinci.
              </p>
            </div>
          ) : (
            /* Scanned Food Result View */
            <div className="space-y-5 font-semibold text-slate-700">
              {/* Header result */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-extrabold text-emerald-600 tracking-wider uppercase">
                    Hasil Deteksi AI
                  </span>
                  <h3 className="text-lg font-bold text-slate-805 mt-0.5">
                    {result.items && result.items.length > 0
                      ? result.items.map((i: any) => i.name).join(' + ')
                      : 'Makanan Terdeteksi'}
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Porsi: {result.items?.[0]?.portion_estimate || '1 Porsi'}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-black text-emerald-600">
                    {result.calories}
                  </span>
                  <span className="text-xs text-slate-500 block font-bold">
                    kcal
                  </span>
                </div>
              </div>

              {/* Health Verdict Badge */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-slate-500">
                  Penilaian Kesehatan:
                </span>
                {result.health_verdict === 'baik' && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    Sangat Baik
                  </span>
                )}
                {result.health_verdict === 'cukup' && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                    Cukup Baik
                  </span>
                )}
                {result.health_verdict === 'kurang' && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                    Kurang Sehat
                  </span>
                )}
              </div>

              {/* Macro Nutrients Progress Visuals */}
              <div className="grid grid-cols-4 gap-2 text-center bg-emerald-55/40 p-3 rounded-xl border border-emerald-100">
                <div>
                  <span className="text-[10px] text-slate-500 block font-bold">Protein</span>
                  <span className="text-sm font-black text-teal-600">{result.protein_g}g</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block font-bold">Karbo</span>
                  <span className="text-sm font-black text-amber-600">{result.carbs_g}g</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block font-bold">Lemak</span>
                  <span className="text-sm font-black text-rose-600">{result.fat_g}g</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block font-bold">Serat</span>
                  <span className="text-sm font-black text-emerald-600">{result.fiber_g}g</span>
                </div>
              </div>

              {/* AI Notes & Suggestions */}
              <div className="bg-emerald-50/50 border border-emerald-100 p-3.5 rounded-xl text-xs text-slate-700 space-y-1.5 leading-relaxed">
                <p>
                  <strong>Catatan:</strong> {result.notes}
                </p>
                {result.suggestion && (
                  <p>
                    <strong className="text-amber-600">Saran:</strong> {result.suggestion}
                  </p>
                )}
              </div>

              {/* Meal Type Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-655 block">Pilih Waktu Makan:</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setMealType(type)}
                      className={`py-1.5 rounded-lg text-[10px] font-bold border transition ${
                        mealType === type
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                          : 'bg-white text-slate-500 border-emerald-100 hover:bg-slate-50'
                      }`}
                    >
                      {type === 'BREAKFAST' ? 'Sarapan' : type === 'LUNCH' ? 'Siang' : type === 'DINNER' ? 'Malam' : 'Camilan'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              {saveSuccess ? (
                <div className="p-3 bg-emerald-50 border border-emerald-400 rounded-xl text-center text-xs font-bold text-emerald-700 flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Berhasil Disimpan ke Log Harian!</span>
                </div>
              ) : (
                <button
                  disabled={saving}
                  onClick={handleSaveToLog}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-sm transition flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <span>Menyimpan Log...</span>
                  ) : (
                    <>
                      <span>Simpan ke Log Harian</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Real-time Achievement Modal Pop-up Notification */}
      {unlockedAchievement && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-emerald-200 rounded-3xl p-8 max-w-sm w-full text-center space-y-5 shadow-xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl"></div>
            
            <div className="text-6xl p-5 bg-emerald-55/40 w-24 h-24 rounded-2xl flex items-center justify-center border border-emerald-200 mx-auto shadow-inner">
              {unlockedAchievement.icon}
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-extrabold text-amber-500 uppercase tracking-widest block">
                Pencapaian Baru Terbuka!
              </span>
              <h3 className="text-xl font-black text-slate-800">{unlockedAchievement.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Selamat! Kamu berhasil menyelesaikan kriteria tantangan dan memperoleh +50 PTS.
              </p>
            </div>

            <button
              onClick={() => setUnlockedAchievement(null)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-xs shadow-md hover:brightness-105 transition"
            >
              Klaim Reward +50 PTS!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
