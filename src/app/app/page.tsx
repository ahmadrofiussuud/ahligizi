'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Home,
  Camera, 
  Flame, 
  Apple, 
  Scale, 
  Activity, 
  Plus, 
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Brain,
  Search,
  CheckCircle,
  AlertCircle,
  Calendar,
  AlertTriangle,
  User,
  Heart,
  Droplet,
  Compass,
  Zap,
  Play,
  ClipboardList,
  MessageCircle,
  MapPin,
  Clock,
  ChevronRight,
  ChevronLeft,
  Info,
  Lock,
  Eye,
  EyeOff,
  Bell,
  ArrowLeft,
  MoreHorizontal,
  BookOpen,
  CalendarDays,
  Gamepad2,
  ListTodo,
  ShoppingCart,
  Stethoscope,
  Pill,
  Star,
  Award,
  Trophy,
  Sparkle,
  Phone,
  LogOut,
  ShieldCheck,
  Sparkles as SparklesIcon
} from 'lucide-react';
import Link from 'next/link';
import DashboardPage from '../dashboard/page';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

// Data artikel static
const articlesData = [
  {
    id: 'hipertensi',
    title: 'Kenali Hipertensi, Cegah Komplikasi',
    category: 'Hipertensi',
    description: 'Pahami penyebab, gejala, dan cara mencegah hipertensi.',
    readTime: '4 menit baca',
    date: '21 Agustus 2026',
    author: 'dr. Andi Wijaya',
    points: 10,
    content: `
Hipertensi, atau tekanan darah tinggi, adalah kondisi medis serius yang secara signifikan meningkatkan risiko penyakit jantung, otak, ginjal, dan penyakit lainnya. Sering disebut sebagai **"silent killer"** karena banyak orang tidak menyadari mereka mengalaminya.

### Penyebab & Faktor Risiko
* **Konsumsi garam berlebih**: Mengikat air dalam darah dan menaikkan tekanan.
* **Kurang gerak**: Meningkatkan beban kerja jantung.
* **Faktor usia & genetik**: Penurunan elastisitas pembuluh darah.
* **Stres**: Memicu hormon adrenalin yang meningkatkan detak jantung.

### Gejala Utama
Sebagian besar penderita tidak menunjukkan gejala apa pun. Namun, jika tekanan darah sangat tinggi, gejala yang mungkin timbul meliputi:
1. Sakit kepala bagian belakang yang parah.
2. Rasa lelah berlebih dan sesak napas.
3. Gangguan penglihatan (kabur).
4. Nyeri dada atau jantung berdebar kencang.

### Langkah Pencegahan & Pengendalian
* **Diet Rendah Garam**: Maksimal 1 sendok teh garam per hari.
* **Aktivitas Fisik Rutin**: Minimal 30 menit jalan cepat atau bersepeda setiap hari.
* **Kelola Stres**: Meditasi, tidur cukup 7-8 jam per hari.
* **Cek Tekanan Darah**: Lakukan pemeriksaan berkala minimal sebulan sekali.
    `,
    svgId: 'hipertensi'
  },
  {
    id: 'stunting',
    title: 'Cegah Stunting Sejak Dini',
    category: 'Stunting',
    description: 'Nutrisi, pola asuh, dan sanitasi untuk tumbuh kembang optimal.',
    readTime: '5 menit baca',
    date: '20 Agustus 2026',
    author: 'Aulia Rahman, M.Gizi',
    points: 10,
    content: `
Stunting adalah gangguan pertumbuhan dan perkembangan anak akibat kekurangan gizi kronis dan infeksi berulang, yang ditandai dengan panjang atau tinggi badannya berada di bawah standar usia.

### Mengapa 1.000 Hari Pertama Sangat Penting?
Periode emas tumbuh kembang anak dimulai sejak konsepsi (dalam kandungan) hingga anak berusia 2 tahun. Kekurangan gizi pada masa ini berakibat permanen pada kecerdasan anak.

### Penyebab Utama Stunting
* **Gizi buruk pada ibu**: Kekurangan zat besi saat hamil menyebabkan bayi lahir dengan berat rendah.
* **Pola asuh kurang optimal**: Kurangnya pengetahuan ibu tentang pemberian ASI dan MPASI.
* **Sanitasi buruk**: Memicu infeksi bakteri pencernaan berulang pada balita.

### Langkah Nyata Mencegah Stunting
1. **Penuhi Nutrisi Bumil**: Ibu hamil wajib mengonsumsi suplemen zat besi dan makanan berprotein tinggi.
2. **ASI Eksklusif**: Berikan hanya ASI selama 6 bulan pertama bayi lahir.
3. **Pemberian MPASI Berkualitas**: Berikan makanan pendamping kaya protein hewani (telur, ikan, daging) mulai usia 6 bulan.
4. **Air Bersih & Sanitasi**: Selalu cuci tangan pakai sabun dan gunakan air bersih untuk sanitasi rumah tangga.
    `,
    svgId: 'stunting'
  }
];

// Helper to render article SVGs
const renderArticleSvg = (svgId: string) => {
  if (svgId === 'hipertensi') {
    return (
      <svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <radialGradient id="bgHtDetail" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#fff1f2"/>
            <stop offset="100%" stopColor="#fecdd3"/>
          </radialGradient>
        </defs>
        <rect width="120" height="90" fill="url(#bgHtDetail)"/>
        <rect x="6" y="18" width="42" height="28" rx="7" fill="#1e40af" opacity="0.92"/>
        <rect x="9" y="21" width="36" height="19" rx="4" fill="#dbeafe"/>
        <text x="27" y="31" textAnchor="middle" fontSize="8" fill="#1e3a8a" fontWeight="bold">140</text>
        <text x="27" y="37" textAnchor="middle" fontSize="5.5" fill="#3b82f6">/ 85 mmHg</text>
        <rect x="12" y="43" width="30" height="5" rx="2.5" fill="#ef4444" opacity="0.3"/>
        <rect x="12" y="43" width="22" height="5" rx="2.5" fill="#ef4444"/>
        <ellipse cx="27" cy="60" rx="18" ry="8" fill="#fca5a5" stroke="#f87171" strokeWidth="1.2"/>
        <rect x="15" y="55" width="24" height="10" rx="5" fill="#fca5a5" stroke="#f87171" strokeWidth="1"/>
        <line x1="27" y1="46" x2="27" y2="52" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
        <polyline points="55,45 65,45 68,36 73,56 77,30 81,50 85,40 89,50 95,45 115,45" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="100" cy="24" r="12" fill="#f59e0b" stroke="white" strokeWidth="2"/>
        <text x="100" y="29" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">!</text>
        <path d="M68 76 C63 70,52 65,52 58 C52 54,55 52,58.5 54.5 C62 56.5,68 62,68 62 C68 62,74 56.5,77.5 54.5 C81 52,84 54,84 58 C84 65,73 70,68 76Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="0.8"/>
      </svg>
    );
  }
  if (svgId === 'stunting') {
    return (
      <svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <radialGradient id="bgStDetail" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#fffbeb"/>
            <stop offset="100%" stopColor="#fef3c7"/>
          </radialGradient>
        </defs>
        <rect width="120" height="90" fill="url(#bgStDetail)"/>
        <circle cx="38" cy="18" r="10" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1"/>
        <path d="M38 28 Q28 35 26 55 L50 55 Q48 35 38 28Z" fill="#f97316"/>
        <line x1="28" y1="38" x2="18" y2="52" stroke="#f97316" strokeWidth="4" strokeLinecap="round"/>
        <line x1="48" y1="38" x2="58" y2="52" stroke="#f97316" strokeWidth="4" strokeLinecap="round"/>
        <line x1="32" y1="55" x2="30" y2="72" stroke="#f97316" strokeWidth="4" strokeLinecap="round"/>
        <line x1="44" y1="55" x2="46" y2="72" stroke="#f97316" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="72" cy="24" r="7.5" fill="#fcd34d" stroke="#fbbf24" strokeWidth="1"/>
        <path d="M72 32 Q65 37 64 50 L80 50 Q79 37 72 32Z" fill="#86efac"/>
        <line x1="65" y1="38" x2="57" y2="50" stroke="#86efac" strokeWidth="3" strokeLinecap="round"/>
        <line x1="79" y1="38" x2="87" y2="50" stroke="#86efac" strokeWidth="3" strokeLinecap="round"/>
        <line x1="67" y1="50" x2="65" y2="65" stroke="#86efac" strokeWidth="3" strokeLinecap="round"/>
        <line x1="77" y1="50" x2="79" y2="65" stroke="#86efac" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="15" cy="74" r="8" fill="#4ade80" stroke="#16a34a" strokeWidth="1"/>
        <path d="M15 66 Q13 60 15 58 Q17 56 15 66Z" fill="#16a34a"/>
        <circle cx="36" cy="76" r="7" fill="#fb923c" stroke="#ea580c" strokeWidth="1"/>
        <circle cx="56" cy="75" r="7" fill="#f87171" stroke="#ef4444" strokeWidth="1"/>
        <ellipse cx="96" cy="74" rx="12" ry="8" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1"/>
        <text x="105" y="20" fontSize="12" fill="#fbbf24">✦</text>
        <text x="10" y="40" fontSize="8" fill="#34d399">✦</text>
      </svg>
    );
  }
  return null;
};

function CekatAppContent() {
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simulator navigation states
  const [appState, setAppState] = useState<'splash' | 'welcome' | 'login' | 'signup' | 'otp' | 'main'>('welcome');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'nutrisi' | 'challenge' | 'riwayat' | 'profil'>('dashboard');
  
  // Sub-views for detailed pages
  // - For 'dashboard': 'home' (Kebutuhanmu), 'station_summary' (Hasil Station), 'cek_risiko' (Risiko Kesehatan), 'reminders' (Pengingat & Jadwal), 'marketplace' (Keranjangmu)
  const [dashboardSubView, setDashboardSubView] = useState<'home' | 'station_summary' | 'cek_risiko' | 'reminders' | 'marketplace' | 'edukasi' | 'article_detail' | 'webinar_list' | 'kebutuhanmu' | 'tanya_ai' | 'mitos_fakta' | 'artikel_list'>('home');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  // BMI State Variables
  const [weightInput, setWeightInput] = useState<string>('68');
  const [heightInput, setHeightInput] = useState<string>('1.60');
  const [bmiValue, setBmiValue] = useState<number>(26.56);
  const [bmiCategory, setBmiCategory] = useState<'Kurus' | 'Normal' | 'Gemuk'>('Gemuk');

  const calculateBmi = () => {
    const w = parseFloat(weightInput);
    const h = parseFloat(heightInput);
    if (w > 0 && h > 0) {
      const calculated = w / (h * h);
      setBmiValue(parseFloat(calculated.toFixed(2)));
      if (calculated < 18.5) setBmiCategory('Kurus');
      else if (calculated < 25) setBmiCategory('Normal');
      else setBmiCategory('Gemuk');
    }
  };
  
  // - For 'nutrisi': 'main' (Nutrisi Harianmu), 'scan_camera' (Camera scanner), 'scan_result' (Score & details), 'charts' (IMT & Charts), 'pantry' (Kulkas resep)
  const [nutrisiSubView, setNutrisiSubView] = useState<'main' | 'scan_camera' | 'scan_result' | 'charts' | 'pantry'>('main');
  
  // - For 'challenge': 'home' (Langkah Sehatmu), 'misi' (7-Day challenge), 'games' (Mini Games grid)
  const [challengeSubView, setChallengeSubView] = useState<'home' | 'misi' | 'games'>('home');
  
  // - For 'riwayat': 'home' (Riwayat List), 'wrapped' (Cekat Wrapped)
  const [riwayatSubView, setRiwayatSubView] = useState<'home' | 'wrapped'>('home');
  
  // Riwayat scroll category
  const [riwayatCategory, setRiwayatCategory] = useState<string>('Semua');

  // Misi / Challenge checklist targets
  const [misiTargets, setMisiTargets] = useState([
    { id: 1, text: 'Minum air sesuai target', done: true },
    { id: 2, text: 'Aktivitas fisik 30 menit', done: true },
    { id: 3, text: 'Makan sayur 2x sehari', done: true },
    { id: 4, text: 'Kurangi minuman manis', done: true },
    { id: 5, text: 'Tidur cukup 7-8 jam', done: true },
    { id: 6, text: 'Kurangi makanan tinggi garam', done: false },
    { id: 7, text: 'Food Scan 3x minggu ini', done: false }
  ]);
  const toggleMisi = (id: number) => {
    setMisiTargets(misiTargets.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // Kebutuhanmu popup list toggle
  const [showKebutuhanmu, setShowKebutuhanmu] = useState<boolean>(false);

  // Login states
  const [emailOrPhone, setEmailOrPhone] = useState<string>('812345678');
  const [nik, setNik] = useState<string>('3174XXXXXXXX0002');
  const [password, setPassword] = useState<string>('password123');

  // Sign Up states
  const [signUpName, setSignUpName] = useState<string>('');
  const [signUpEmailOrPhone, setSignUpEmailOrPhone] = useState<string>('');
  const [signUpNik, setSignUpNik] = useState<string>('');
  const [signUpPassword, setSignUpPassword] = useState<string>('');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);

  // OTP states
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '']);
  const [otpTimer, setOtpTimer] = useState<number>(30);
  const [otpError, setOtpError] = useState<string>('');

  // ── Toast Notification System ──
  type ToastType = 'success' | 'error' | 'info' | 'warning';
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<ToastType>('info');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string, type: ToastType = 'info') => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(msg);
    setToastType(type);
    setToastVisible(true);
    toastTimerRef.current = setTimeout(() => setToastVisible(false), 3000);
  };

  // Chatbot states with localStorage persistence
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string }>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cekat_chat_messages');
      if (saved) {
        try { return JSON.parse(saved); } catch (e) {}
      }
    }
    return [
      { sender: 'bot', text: 'Halo Sofia! Saya Ceko, asisten AI kesehatan & gizi Anda. Ada yang ingin Anda tanyakan seputar gizi, hipertensi, diabetes, obesitas, pencegahan stunting, atau batas garam/gula/lemak hari ini?' }
    ];
  });
  const [chatInput, setChatInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  // Sync chatMessages to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && chatMessages.length > 0) {
      localStorage.setItem('cekat_chat_messages', JSON.stringify(chatMessages));
    }
  }, [chatMessages]);

  // Pantry AI selected ingredients
  const [selectedPantryTags, setSelectedPantryTags] = useState<string[]>(['Telur', 'Ayam', 'Sayur']);
  const pantryTagsList = ['Telur', 'Ikan', 'Ayam', 'Sayur', 'Daging', 'Tempe', 'Wortel'];
  
  // Pantry AI active category filter
  const [pantryCategory, setPantryCategory] = useState<string>('Semua');

  // Search query for marketplace & recipes
  const [searchQuery, setSearchQuery] = useState<string>('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // 1. Sync from URL query parameters to local state (for back/forward browser navigation)
  useEffect(() => {
    const urlState = searchParams.get('state');
    const urlTab = searchParams.get('tab');
    const urlView = searchParams.get('view');
    const urlArticleId = searchParams.get('id');

    if (urlState && ['splash', 'welcome', 'login', 'main'].includes(urlState)) {
      setAppState(urlState as any);
    }
    if (urlTab && ['dashboard', 'nutrisi', 'challenge', 'riwayat', 'profil'].includes(urlTab)) {
      setActiveTab(urlTab as any);
      if (urlView) {
        if (urlTab === 'dashboard') {
          setDashboardSubView(urlView as any);
          if (urlView === 'article_detail' && urlArticleId) {
            const art = articlesData.find(a => a.id === urlArticleId);
            if (art) setSelectedArticle(art);
          }
        }
        if (urlTab === 'nutrisi') setNutrisiSubView(urlView as any);
        if (urlTab === 'challenge') setChallengeSubView(urlView as any);
        if (urlTab === 'riwayat') setRiwayatSubView(urlView as any);
      }
    }
  }, [searchParams]);

  // 2. Sync from local state to URL query parameters (updates URL as user clicks)
  useEffect(() => {
    if (!isClient) return;
    
    const params = new URLSearchParams();
    params.set('state', appState);
    params.set('tab', activeTab);
    
    let activeView = 'home';
    if (activeTab === 'dashboard') activeView = dashboardSubView;
    if (activeTab === 'nutrisi') activeView = nutrisiSubView;
    if (activeTab === 'challenge') activeView = challengeSubView;
    if (activeTab === 'riwayat') activeView = riwayatSubView;
    params.set('view', activeView);

    if (activeView === 'article_detail' && selectedArticle) {
      params.set('id', selectedArticle.id);
    }

    const newSearch = `?${params.toString()}`;
    if (window.location.search !== newSearch) {
      if (window.location.search === '') {
        router.replace(`${pathname}${newSearch}`);
      } else {
        router.push(`${pathname}${newSearch}`);
      }
    }
  }, [appState, activeTab, dashboardSubView, nutrisiSubView, challengeSubView, riwayatSubView, selectedArticle, isClient]);

  // Scanning animation states
  const [isScanning, setIsScanning] = useState<boolean>(false);

  // ── Camera Scan State ──
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Use ref (NOT state) for stream → avoids stale closure in callbacks
  const streamRef = useRef<MediaStream | null>(null);
  const [capturedImageUrl, setCapturedImageUrl] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [flashActive, setFlashActive] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  // Track whether camera is live for UI purposes
  const [isCameraLive, setIsCameraLive] = useState<boolean>(false);

  /** Stop all tracks on the current stream immediately (synchronous, no closure issue) */
  const stopCameraImmediate = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraLive(false);
  };

  /** Start camera with given facing mode. Stops existing stream first. */
  const startCamera = async (facing: 'environment' | 'user' = 'environment') => {
    setCameraError(null);
    setCapturedImageUrl(null);
    // Stop any existing stream SYNCHRONOUSLY before requesting new one
    stopCameraImmediate();
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Wait for metadata to load before marking live
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(() => {});
          setIsCameraLive(true);
        };
      }
    } catch (err) {
      setCameraError('Kamera tidak dapat diakses. Pastikan izin kamera sudah diberikan, atau gunakan galeri.');
      setIsCameraLive(false);
    }
  };

  /** Flip between front and rear camera */
  const flipCamera = async () => {
    const next = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(next);
    // startCamera will stop old stream first, then start new one
    await startCamera(next);
  };

  // Start/stop camera based on active sub-view
  useEffect(() => {
    if (nutrisiSubView === 'scan_camera') {
      startCamera(facingMode);
    } else {
      stopCameraImmediate();
    }
    // Cleanup on unmount or view change
    return () => {
      stopCameraImmediate();
    };
  }, [nutrisiSubView]); // eslint-disable-line react-hooks/exhaustive-deps
  
  // AI Scan Result State
  const [aiScanResult, setAiScanResult] = useState<any>(null);

  const analyzeCapturedImage = async (base64Data: string) => {
    setIsScanning(true);
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_base64: base64Data })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setAiScanResult(data.data);
      } else {
        setAiScanResult({
          food_name: 'Menu Sehat Terdeteksi',
          calories: 520,
          protein_g: 24,
          carbs_g: 58,
          fat_g: 18,
          health_verdict: 'Healthy',
          ai_notes: 'Porsi gizi seimbang terdeteksi. Pertimbangkan kecukupan air putih.'
        });
      }
    } catch (err) {
      console.error('Scan API call error:', err);
      setAiScanResult({
        food_name: 'Menu Makanan Terdeteksi',
        calories: 490,
        protein_g: 22,
        carbs_g: 55,
        fat_g: 16,
        health_verdict: 'Healthy',
        ai_notes: 'Menu makanan bergizi baik.'
      });
    } finally {
      setIsScanning(false);
      setNutrisiSubView('scan_result');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      if (facingMode === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      setCapturedImageUrl(dataUrl);
      stopCameraImmediate();
      setFlashActive(true);
      setTimeout(() => setFlashActive(false), 180);
      analyzeCapturedImage(dataUrl);
    }
  };

  const handleGalleryFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setCapturedImageUrl(dataUrl);
      stopCameraImmediate();
      analyzeCapturedImage(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Misi / Challenge checkbox states
  const [missions, setMissions] = useState([
    { id: 1, text: 'Minum air sesuai target', done: true },
    { id: 2, text: 'Aktivitas fisik 30 menit', done: true },
    { id: 3, text: 'Makan sayur 2x sehari', done: true },
    { id: 4, text: 'Kurangi minuman manis', done: true },
    { id: 5, text: 'Tidur cukup 7-8 jam', done: true },
    { id: 6, text: 'Kurangi makanan tinggi garam', done: false },
    { id: 7, text: 'Food Scan 3x seminggu', done: false }
  ]);

  const toggleMission = (id: number) => {
    setMissions(prev => prev.map(m => m.id === id ? { ...m, done: !m.done } : m));
  };

  // Focus targets for Langkah Sehatmu
  const [focusTargets, setFocusTargets] = useState([
    { id: 1, text: 'Kurangi makanan/minuman manis', done: true },
    { id: 2, text: 'Aktivitas fisik minimal 30 menit/hari', done: true },
    { id: 3, text: 'Tambahkan sayur pada makanan utama', done: true }
  ]);

  const toggleFocus = (id: number) => {
    setFocusTargets(prev => prev.map(f => f.id === id ? { ...f, done: !f.done } : f));
  };

  // Food log data that can be added to timeline
  const [foodLogs, setFoodLogs] = useState([
    {
      id: 'log-1',
      title: 'Nutrisi & Scan Makanan',
      subtitle: 'Salad Ayam',
      calories: '327 kkal',
      score: 'GOOD',
      time: '30 Agustus 2026 08.30'
    }
  ]);

  // Handle login form submission → go to OTP verification step
  const handleLogin = () => {
    setAppState('otp');
  };

  // Handle adding custom scanned food
  const handleSaveScanResult = () => {
    const newLog = {
      id: `log-${Date.now()}`,
      title: 'Nutrisi & Scan Makanan',
      subtitle: 'Salad Sayur Segar',
      calories: '307 kkal',
      score: 'GOOD',
      time: 'Hari ini 12.30'
    };
    setFoodLogs([newLog, ...foodLogs]);
    setNutrisiSubView('main');
    setActiveTab('riwayat');
    setRiwayatSubView('home');
  };

  const handleSendChatMessage = async () => {
    if (!chatInput.trim() || isBotTyping) return;
    const userText = chatInput.trim();
    const userMsg = { sender: 'user', text: userText };
    const newMessages = [...chatMessages, userMsg];
    
    setChatMessages(newMessages);
    setChatInput('');
    setIsBotTyping(true);

    try {
      const res = await fetch('/api/ceko-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: chatMessages.slice(-6).map(m => ({
            sender: m.sender === 'user' ? 'user' : 'bot',
            text: m.text
          }))
        })
      });

      const data = await res.json();
      const botReply = data.reply || 'Maaf, Ceko AI sedang memperbarui data. Coba tanyakan kembali ya!';
      setChatMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    } catch (err) {
      console.error('Ceko AI fetch error:', err);
      setChatMessages(prev => [...prev, {
        sender: 'bot',
        text: 'Ceko AI siap membantu Anda dengan informasi kandungan gizi, kalori, dan pola makan sehat!'
      }]);
    } finally {
      setIsBotTyping(false);
    }
  };

  // Auto transition for splash screen if set to splash
  useEffect(() => {
    if (appState === 'splash') {
      const timer = setTimeout(() => {
        setAppState('welcome');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  // Countdown timer for OTP
  useEffect(() => {
    if (appState === 'otp' && otpTimer > 0) {
      const timer = setTimeout(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [appState, otpTimer]);

  // Helper function to easily switch sub-views from external panel
  const jumpToScreen = (tab: any, subview: any) => {
    setActiveTab(tab);
    if (tab === 'dashboard') setDashboardSubView(subview);
    if (tab === 'nutrisi') setNutrisiSubView(subview);
    if (tab === 'challenge') setChallengeSubView(subview);
    if (tab === 'riwayat') setRiwayatSubView(subview);
  };

  // Recipe list data for Pantry AI
  const recipes = [
    {
      name: 'Nasi Campur Komplit Bergizi',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
      category: 'Ayam',
      tag: 'Nasi Campur'
    },
    {
      name: 'Nasi Goreng Ayam Katsu',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
      category: 'Ayam',
      tag: 'Nasi Goreng'
    },
    {
      name: 'Salad Sayur Segar',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
      category: 'Sayur',
      tag: 'Salad Sayur'
    },
    {
      name: 'Salad Sayur Beef Cheese',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=400&q=80',
      category: 'Daging',
      tag: 'Salad Sayur'
    },
    {
      name: 'Salad Buah Creamy',
      image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=400&q=80',
      category: 'Sayur',
      tag: 'Salad Buah'
    },
    {
      name: 'Grill Steak',
      image: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=400&q=80',
      category: 'Daging',
      tag: 'Grill Steak'
    },
    {
      name: 'Omlet Mewah Rumahan',
      image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=400&q=80',
      category: 'Telur',
      tag: 'Omlet'
    }
  ];

  // Filtered recipes
  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = pantryCategory === 'Semua' || recipe.category === pantryCategory;
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#f7f9f6] flex items-center justify-center text-emerald-600 font-sans text-xs">
        <div className="flex flex-col items-center gap-3">
          <Activity className="w-6 h-6 animate-spin text-emerald-600" />
          <span className="font-bold">Memuat Cekat...</span>
        </div>
      </div>
    );
  }

  if (!isMobile) {
    if (appState !== 'main') {
      return (
        <div className="min-h-screen bg-[#f5faf9] text-slate-800 flex flex-col justify-between font-sans relative overflow-hidden">
          {/* Background blobs */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Desktop Onboarding Header */}
          <header className="px-8 py-5 flex items-center justify-between border-b border-teal-150/40 bg-white/70 backdrop-blur z-20 relative shadow-xs">
            <div className="flex items-center space-x-3">
              <div className="h-10 flex items-center p-0.5">
                <img src="/images/logo full cekat station.png" alt="Cekat Logo" className="h-full object-contain" />
              </div>
            </div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Portal Kesehatan Preventif Mandiri</span>
          </header>

          <main className="flex-1 flex items-center justify-center p-8 z-10 relative">
            <div className="w-full max-w-lg bg-white border border-teal-100/70 rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] text-left">
              {appState === 'welcome' && (
                <div className="space-y-6 text-center">
                  <div className="h-20 flex items-center justify-center mx-auto mb-2">
                    <img src="/images/logo full cekat station.png" alt="Cekat Logo" className="h-full object-contain animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Selamat Datang di CEKAT</h2>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed max-w-md mx-auto">
                      Ketahui profil risiko Penyakit Tidak Menular (PTM) Anda secara dini dan ikuti program preventif pola makan gizi seimbang yang terintegrasi BPJS Kesehatan.
                    </p>
                  </div>
                  <div className="space-y-3 max-w-xs mx-auto">
                    <button 
                      onClick={() => setAppState('signup')}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-full shadow-md text-xs transition active:scale-98 uppercase tracking-wider"
                    >
                      Mulai Pendaftaran Akun
                    </button>
                    <button 
                      onClick={() => setAppState('login')}
                      className="w-full py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-black rounded-full text-xs transition active:scale-98 uppercase tracking-wider"
                    >
                      Masuk ke Akun Terdaftar
                    </button>
                  </div>
                </div>
              )}

              {appState === 'signup' && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black tracking-tight text-slate-800">Daftar Akun Baru</h2>
                    <p className="text-xs text-slate-400 font-bold leading-normal">Lengkapi data Anda untuk integrasi data rekam gizi dan BPJS Kesehatan.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Nama Lengkap</label>
                        <input 
                          type="text" 
                          value={signUpName}
                          onChange={(e) => setSignUpName(e.target.value)}
                          placeholder="Sofia Kusuma"
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500 text-slate-800"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Email / Nomor HP</label>
                        <input 
                          type="text" 
                          value={signUpEmailOrPhone}
                          onChange={(e) => setSignUpEmailOrPhone(e.target.value)}
                          placeholder="sofia@gmail.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500 text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">NIK (Sesuai KTP)</label>
                        <input 
                          type="text" 
                          value={signUpNik}
                          onChange={(e) => setSignUpNik(e.target.value)}
                          placeholder="3174XXXXXXXX0002"
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500 text-slate-800"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Kata Sandi</label>
                        <input 
                          type="password" 
                          value={signUpPassword}
                          onChange={(e) => setSignUpPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500 text-slate-800"
                        />
                      </div>
                    </div>

                    <label className="flex items-start gap-2.5 pt-1.5 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500 focus:ring-1 mt-0.5"
                      />
                      <span className="text-[9.5px] font-bold text-slate-500 leading-normal">
                        Saya menyetujui Ketentuan Layanan & Kebijakan Privasi data medis terintegrasi Kemkes RI.
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-2">
                    <button 
                      onClick={() => setAppState('welcome')}
                      className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-black rounded-full text-xs uppercase tracking-wider transition active:scale-98"
                    >
                      Kembali
                    </button>
                    <button 
                      onClick={() => {
                        if (!signUpName || !signUpEmailOrPhone || !signUpNik || !signUpPassword) {
                          showToast('Silakan lengkapi seluruh formulir terlebih dahulu.', 'error');
                          return;
                        }
                        if (!agreeTerms) {
                          showToast('Anda harus menyetujui Ketentuan Layanan untuk melanjutkan.', 'warning');
                          return;
                        }
                        setAppState('otp');
                        setOtpTimer(30);
                      }}
                      className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-full text-xs uppercase tracking-wider transition active:scale-98 shadow-md"
                    >
                      Daftar Akun
                    </button>
                  </div>
                </div>
              )}

              {appState === 'otp' && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black tracking-tight text-slate-800">Verifikasi OTP</h2>
                    <p className="text-xs text-slate-450 font-bold leading-relaxed">
                      Kode verifikasi 4-digit telah dikirimkan ke <span className="font-extrabold text-slate-700">{signUpEmailOrPhone || emailOrPhone || 'nomor Anda'}</span>.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-center gap-3 px-6">
                      {otpDigits.map((digit, idx) => (
                        <input 
                          key={idx}
                          id={`desktop-otp-input-${idx}`}
                          type="text" 
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (/^[0-9]?$/.test(val)) {
                              const newDigits = [...otpDigits];
                              newDigits[idx] = val;
                              setOtpDigits(newDigits);
                              
                              if (val && idx < 3) {
                                document.getElementById(`desktop-otp-input-${idx + 1}`)?.focus();
                              }
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Backspace' && !otpDigits[idx] && idx > 0) {
                              document.getElementById(`desktop-otp-input-${idx - 1}`)?.focus();
                            }
                          }}
                          placeholder="-Input-"
                          className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-2xl text-center text-lg font-black focus:outline-none focus:border-emerald-500 text-slate-800 placeholder-slate-350"
                        />
                      ))}
                    </div>

                    <div className="p-3.5 bg-emerald-50/50 border border-emerald-100/50 rounded-2xl text-emerald-700 text-[10px] font-semibold leading-relaxed">
                      💡 **Petunjuk Simulasi**: Masukkan kode verifikasi **1234** untuk memverifikasi secara langsung.
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <button 
                      onClick={() => setAppState('signup')}
                      className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-black rounded-full text-xs uppercase tracking-wider transition active:scale-98"
                    >
                      Kembali
                    </button>
                    <button 
                      onClick={() => {
                        const code = otpDigits.join('');
                        if (code.length < 4) {
                          setOtpError('Silakan lengkapi 4 digit kode OTP!');
                          return;
                        }
                        setOtpError('');
                        setAppState('main');
                      }}
                      className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-full text-xs uppercase tracking-wider transition active:scale-98 shadow-md"
                    >
                      Verifikasi OTP
                    </button>
                  </div>

                  {otpError && (
                    <p className="text-[10px] font-bold text-red-500 text-center">{otpError}</p>
                  )}

                  <div className="text-center pt-2">
                    <div className="text-xs font-semibold text-slate-550">
                      {otpTimer > 0 ? (
                        <span>Kirim ulang OTP dalam <span className="font-black text-slate-800">{otpTimer} detik</span></span>
                      ) : (
                        <button 
                          onClick={() => {
                            setOtpTimer(30);
                            showToast('Kode OTP baru telah dikirimkan!', 'success');
                          }} 
                          className="underline text-[#00875A] font-black"
                        >
                          Kirim Ulang OTP
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {appState === 'login' && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black tracking-tight text-slate-800">Masuk ke CEKAT</h2>
                    <p className="text-xs text-slate-450 font-bold leading-relaxed">Gunakan NIK dan kata sandi terdaftar Anda.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Email / Nomor HP</label>
                      <input 
                        type="text" 
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        placeholder="sofia@gmail.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500 text-slate-800"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">NIK (16 Digit)</label>
                      <input 
                        type="text" 
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        placeholder="3174XXXXXXXX0002"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500 text-slate-800"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Kata Sandi</label>
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500 text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-2">
                    <button 
                      onClick={() => setAppState('welcome')}
                      className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-black rounded-full text-xs uppercase tracking-wider transition active:scale-98"
                    >
                      Kembali
                    </button>
                    <button 
                      onClick={() => setAppState('main')}
                      className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-full text-xs uppercase tracking-wider transition active:scale-98 shadow-md"
                    >
                      Masuk
                    </button>
                  </div>

                  {/* Demo Account Quick Picker – Desktop */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-px bg-slate-100"></div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Atau masuk cepat dengan akun demo</span>
                      <div className="flex-1 h-px bg-slate-100"></div>
                    </div>
                    {[
                      { name: 'Rizky Fitrianto', badge: 'PASIEN', badgeColor: 'bg-blue-100 text-blue-700', avatarBg: 'bg-blue-500', initials: 'RF', email: '081234567890', nik: '3174012345670001', desc: 'Pencegahan PTM & Gula Darah' },
                      { name: 'dr. Sarah Amanda, Sp.GK', badge: 'TENAGA MEDIS', badgeColor: 'bg-emerald-100 text-emerald-700', avatarBg: 'bg-emerald-500', initials: 'SA', email: 'sarah.amanda@puskesmas.id', nik: '3174098765432001', desc: 'Akses data klinis & skrining pasien' },
                      { name: 'Budi Santoso', badge: 'ADMIN', badgeColor: 'bg-purple-100 text-purple-700', avatarBg: 'bg-purple-500', initials: 'BS', email: 'admin@pkm-ngabab.id', nik: '3174055544433001', desc: 'Manajemen data & laporan faskes' }
                    ].map((demo) => (
                      <button
                        key={demo.email}
                        onClick={() => { setEmailOrPhone(demo.email); setNik(demo.nik); setTimeout(() => setAppState('main'), 150); }}
                        className="w-full flex items-center gap-3 p-3 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/20 transition-all duration-200 active:scale-[0.98] text-left group cursor-pointer"
                      >
                        <div className={`w-9 h-9 rounded-full ${demo.avatarBg} text-white flex items-center justify-center text-xs font-black shrink-0 shadow-sm`}>{demo.initials}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-xs font-black text-slate-800 group-hover:text-emerald-700 transition truncate">{demo.name}</span>
                            <span className={`text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full ${demo.badgeColor} shrink-0`}>{demo.badge}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-semibold block truncate">{demo.desc}</span>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-emerald-100 flex items-center justify-center shrink-0 transition">
                          <svg className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="text-center pt-2">
                    <div className="text-xs font-semibold text-slate-500">
                      Belum mempunyai akun? <button onClick={() => setAppState('signup')} className="underline text-[#00875A] font-black">Daftar Sekarang</button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </main>

          <footer className="py-5 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest border-t border-teal-150/40 bg-white/70">
            Kementerian Kesehatan RI • Integrated Secure Portal
          </footer>
        </div>
      );
    }

    return <DashboardPage onLogout={() => setAppState('welcome')} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row relative overflow-hidden font-sans">
      {/* Background aesthetic blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* 
        ========================================================================
        DESKTOP LEFT: CONTROL PANEL (Jump directly to any PWA sub-view)
        ========================================================================
      */}
      <div className="hidden md:flex md:w-5/12 lg:w-4/12 flex-col justify-between p-8 border-r border-slate-800 bg-slate-900/40 backdrop-blur z-20 overflow-y-auto max-h-screen">
        <div className="space-y-6">
          {/* Cekat Brand header */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-2 shadow-md">
              <img src="/images/logo C cekat.png" alt="Cekat Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-1.5">
                <span>Cekat App</span>
                <span className="text-[9px] bg-emerald-950 border border-emerald-500/30 text-emerald-400 font-bold px-1.5 py-0.5 rounded uppercase">Simulator</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cek • Kenali • Tindaklanjuti</p>
            </div>
          </div>

          <div className="p-4 bg-emerald-950/40 border border-emerald-500/20 rounded-2xl space-y-2 text-xs text-emerald-300 leading-relaxed text-left">
            <p className="font-bold flex items-center gap-1.5 text-emerald-200">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Satu Aplikasi Terintegrasi Kemkes</span>
            </p>
            <p className="text-[11px] text-slate-350 leading-relaxed">
              Simulator ini menampilkan prototipe PWA interaktif mobile persis seperti rancangan UI asli. Gunakan menu kontrol cepat di bawah ini untuk berpindah halaman secara instan di simulator sebelah kanan.
            </p>
          </div>

          {/* Quick jump actions lists */}
          <div className="space-y-3">
            <span className="text-[10px] text-slate-500 font-black tracking-widest uppercase block text-left">KONTROL NAVIGASI CEPAT</span>
            
            <div className="space-y-2.5">
              {/* Beranda Pages */}
              <div className="space-y-1">
                <span className="text-[9px] text-slate-400 font-bold uppercase block px-1 text-left">Tab 1: Beranda</span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button 
                    onClick={() => jumpToScreen('dashboard', 'home')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'dashboard' && dashboardSubView === 'home'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    🏠 Menu Kebutuhanmu
                  </button>
                  <button 
                    onClick={() => jumpToScreen('dashboard', 'station_summary')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'dashboard' && dashboardSubView === 'station_summary'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    🏥 Hasil Kiosk Station
                  </button>
                  <button 
                    onClick={() => jumpToScreen('dashboard', 'cek_risiko')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'dashboard' && dashboardSubView === 'cek_risiko'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    ⚠️ Cek Risiko Kesehatan
                  </button>
                  <button 
                    onClick={() => jumpToScreen('dashboard', 'reminders')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'dashboard' && dashboardSubView === 'reminders'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    ⏰ Pengingat & Jadwal
                  </button>
                  <button 
                    onClick={() => jumpToScreen('dashboard', 'marketplace')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'dashboard' && dashboardSubView === 'marketplace'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    🛒 Keranjang / Apotek
                  </button>
                </div>
              </div>

              {/* Nutrisi Pages */}
              <div className="space-y-1">
                <span className="text-[9px] text-slate-400 font-bold uppercase block px-1 text-left">Tab 2: Nutrisi</span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button 
                    onClick={() => jumpToScreen('nutrisi', 'main')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'nutrisi' && nutrisiSubView === 'main'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    🥗 Nutrisi Harianmu
                  </button>
                  <button 
                    onClick={() => jumpToScreen('nutrisi', 'scan_camera')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'nutrisi' && nutrisiSubView === 'scan_camera'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    📸 Kamera AI Scanner
                  </button>
                  <button 
                    onClick={() => jumpToScreen('nutrisi', 'charts')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'nutrisi' && nutrisiSubView === 'charts'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    📊 Grafik & IMT
                  </button>
                  <button 
                    onClick={() => setDashboardSubView('cek_risiko')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      dashboardSubView === 'cek_risiko'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    🩺 Skrining PTM
                  </button>
                </div>
              </div>

              {/* Challenge / Riwayat Pages */}
              <div className="space-y-1">
                <span className="text-[9px] text-slate-400 font-bold uppercase block px-1 text-left">Tab 3 & 4: Challenge & Riwayat</span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button 
                    onClick={() => jumpToScreen('challenge', 'home')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'challenge' && challengeSubView === 'home'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    👣 Langkah Sehatmu
                  </button>
                  <button 
                    onClick={() => jumpToScreen('challenge', 'misi')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'challenge' && challengeSubView === 'misi'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                  }`}
                  >
                    👾 Misi & Challenge
                  </button>
                  <button 
                    onClick={() => jumpToScreen('riwayat', 'home')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'riwayat' && riwayatSubView === 'home'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    📜 Riwayat Timeline
                  </button>
                  <button 
                    onClick={() => jumpToScreen('riwayat', 'wrapped')}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      activeTab === 'riwayat' && riwayatSubView === 'wrapped'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/30 text-slate-400'
                    }`}
                  >
                    🎉 CEKAT Wrapped 2026
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop control panel footer */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-bold">
          <span>Kementerian Kesehatan RI • 2026</span>
          <Link href="/dashboard" className="text-emerald-500 hover:underline flex items-center gap-0.5">
            <span>Portal Utama</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 
        ========================================================================
        DESKTOP RIGHT / MOBILE: SMARTPHONE SIMULATOR FRAME OR NATIVE VIEW
        ========================================================================
      */}
      <div className="flex-1 flex items-center justify-center p-0 md:p-6 bg-slate-950">
        
        {/* Smartphone Wrapper Bezel (Hidden on Mobile screens, active on md and up) */}
        <div className="w-full max-w-md min-h-screen md:min-h-0 md:h-[824px] md:rounded-[45px] md:border-[10px] md:border-slate-800 md:bg-slate-950 md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] md:ring-4 md:ring-slate-900 md:relative md:overflow-hidden flex flex-col justify-between">
          
          {/* Camera Notch on Desktop simulation */}
          <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-50 pointer-events-none">
            <div className="absolute right-6 top-1.5 w-3 h-3 bg-slate-900 rounded-full border border-slate-800"></div>
          </div>

          {/* Core Simulator viewport container */}
          <div className="flex-1 flex flex-col justify-between bg-[#f7f9f6] text-slate-800 relative w-full h-full overflow-y-auto md:max-h-[804px] select-none">

            {/* ── Toast Notification Overlay ── */}
            {toastVisible && (
              <div
                className="absolute top-14 left-4 right-4 z-[200] pointer-events-none"
                style={{ animation: 'slideDown 0.25s ease-out' }}
              >
                <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg border text-white text-[11px] font-bold leading-snug
                  ${toastType === 'success' ? 'bg-emerald-600 border-emerald-500' : ''}
                  ${toastType === 'error' ? 'bg-red-500 border-red-400' : ''}
                  ${toastType === 'warning' ? 'bg-amber-500 border-amber-400' : ''}
                  ${toastType === 'info' ? 'bg-slate-700 border-slate-600' : ''}
                `}>
                  <span className="text-base shrink-0">
                    {toastType === 'success' && '✅'}
                    {toastType === 'error' && '❌'}
                    {toastType === 'warning' && '⚠️'}
                    {toastType === 'info' && 'ℹ️'}
                  </span>
                  <span>{toastMessage}</span>
                </div>
              </div>
            )}


            {appState === 'splash' && (
              <div className="flex-1 min-h-[600px] flex flex-col items-center justify-between py-24 px-8 bg-gradient-to-b from-[#22c55e] via-white to-[#cbd52d]/30 text-center animate-fadeIn">
                <div />
                <div className="space-y-4 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center border border-emerald-100 p-2">
                    <img src="/images/logo C cekat.png" alt="Cekat Logo" className="w-full h-full object-contain" />
                  </div>
                  <div className="space-y-1">
                    <h1 className="text-4xl font-extrabold tracking-tight text-emerald-800">Cekat</h1>
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Cek • Kenali • Tindaklanjuti</p>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Kemkes RI Integrated • PWA v1.0
                </div>
              </div>
            )}

            {/* 2. WELCOME SCREEN */}
            {appState === 'welcome' && (
              <div className="flex-1 min-h-[600px] flex flex-col justify-between relative bg-white animate-fadeIn">
                <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: `url('/landing/hero_doctor_banner.jpg')` }} />
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/70 via-emerald-600/70 to-emerald-800/90" />

                <div className="relative z-10 flex-1 flex flex-col justify-between py-16 px-8 text-center text-white">
                  <div className="space-y-2 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center border border-emerald-100 p-1.5">
                      <img src="/images/logo C cekat.png" alt="Cekat Logo" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-250">Kesehatan Preventif Mandiri</span>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Selamat Datang di</span>
                      <h2 className="text-4xl font-extrabold tracking-tight text-white">CEKAT</h2>
                      <p className="text-xs text-emerald-100 leading-relaxed font-semibold max-w-xs mx-auto">
                        Ketahui profil risiko Penyakit Tidak Menular (PTM) Anda secara dini dan ikuti program preventif pola makan gizi seimbang.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <button 
                        onClick={() => setAppState('signup')}
                        className="w-full py-3 bg-white text-emerald-800 font-extrabold rounded-full shadow-md text-sm hover:bg-slate-50 transition active:scale-98"
                      >
                        Mulai dengan Email / No HP
                      </button>
                    </div>

                    <div className="text-xs font-semibold text-emerald-100">
                      Sudah mempunyai akun? <button onClick={() => setAppState('login')} className="underline text-white font-black">Masuk</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. LOGIN SCREEN */}
            {appState === 'login' && (
              <div className="flex-1 min-h-[600px] flex flex-col bg-white animate-fadeIn text-left overflow-y-auto">
                {/* Brand Header */}
                <div className="px-8 pt-12 pb-6 space-y-5">
                  <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
                    <img src="/images/logo C cekat.png" alt="Cekat Logo" className="w-8 h-8 object-contain" />
                    <div>
                      <span className="text-sm font-black text-slate-800 block">CEKAT</span>
                      <span className="text-[6.5px] font-black text-emerald-600 uppercase tracking-wider block">Cek • Kenali • Tindaklanjuti</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-xl font-black tracking-tight text-slate-800">Masuk ke Akun Anda</h2>
                    <p className="text-xs text-slate-400 font-bold leading-relaxed">Masukkan Email/No HP dan NIK Anda yang terdaftar.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Email / Nomor HP</label>
                      <input 
                        type="text" 
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        placeholder="contoh@email.com / 0812..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#00875A]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Nomor Induk Kependudukan (NIK)</label>
                      <input 
                        type="password" 
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        placeholder="16-digit nomor NIK KTP Anda"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#00875A]"
                      />
                    </div>

                    <button 
                      onClick={handleLogin}
                      className="w-full py-3.5 rounded-xl bg-[#00875A] hover:bg-[#00704a] text-white text-xs font-black uppercase tracking-wider shadow-md transition active:scale-95 cursor-pointer text-center"
                    >
                      Masuk Aplikasi
                    </button>
                  </div>
                </div>

                {/* ── Demo Account Quick Picker ── */}
                <div className="mx-8 mb-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-slate-100"></div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Atau coba akun demo</span>
                    <div className="flex-1 h-px bg-slate-100"></div>
                  </div>

                  {[
                    {
                      name: 'Rizky Fitrianto',
                      role: 'Pengguna Umum',
                      badge: 'PASIEN',
                      badgeColor: 'bg-blue-100 text-blue-700',
                      avatarBg: 'bg-blue-500',
                      initials: 'RF',
                      email: '081234567890',
                      nik: '3174012345670001',
                      desc: 'Pencegahan PTM & Gula Darah'
                    },
                    {
                      name: 'dr. Sarah Amanda, Sp.GK',
                      role: 'Spesialis Gizi Klinik',
                      badge: 'TENAGA MEDIS',
                      badgeColor: 'bg-emerald-100 text-emerald-700',
                      avatarBg: 'bg-emerald-500',
                      initials: 'SA',
                      email: 'sarah.amanda@puskesmas.id',
                      nik: '3174098765432001',
                      desc: 'Akses data klinis & skrining pasien'
                    },
                    {
                      name: 'Budi Santoso',
                      role: 'Admin Puskesmas',
                      badge: 'ADMIN',
                      badgeColor: 'bg-purple-100 text-purple-700',
                      avatarBg: 'bg-purple-500',
                      initials: 'BS',
                      email: 'admin@pkm-ngabab.id',
                      nik: '3174055544433001',
                      desc: 'Manajemen data & laporan faskes'
                    }
                  ].map((demo) => (
                    <button
                      key={demo.email}
                      onClick={() => {
                        setEmailOrPhone(demo.email);
                        setNik(demo.nik);
                        // Langsung masuk tanpa OTP untuk demo
                        setTimeout(() => setAppState('main'), 150);
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-2xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all duration-200 active:scale-[0.98] text-left group cursor-pointer"
                    >
                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-full ${demo.avatarBg} text-white flex items-center justify-center text-xs font-black shrink-0 shadow-sm`}>
                        {demo.initials}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-black text-slate-800 group-hover:text-emerald-700 transition truncate">{demo.name}</span>
                          <span className={`text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full ${demo.badgeColor} shrink-0`}>{demo.badge}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold block truncate">{demo.desc}</span>
                      </div>

                      {/* Arrow */}
                      <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-emerald-100 flex items-center justify-center shrink-0 transition">
                        <svg className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="text-center pb-8">
                  <span className="text-xs text-slate-400 font-bold">Belum punya akun? </span>
                  <button onClick={() => setAppState('signup')} className="text-xs text-[#00875A] font-black hover:underline cursor-pointer">Daftar Akun Baru</button>
                </div>
              </div>
            )}


            {/* 3B. SIGNUP SCREEN */}
            {appState === 'signup' && (
              <div className="flex-1 min-h-[600px] flex flex-col justify-between bg-white px-8 py-10 animate-fadeIn text-left">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
                    <button onClick={() => setAppState('welcome')} className="p-1 hover:bg-slate-100 rounded-full transition -ml-1 mr-1">
                      <ArrowLeft className="w-4 h-4 text-slate-700" />
                    </button>
                    <img src="/images/logo C cekat.png" alt="Cekat Logo" className="w-7 h-7 object-contain" />
                    <div>
                      <span className="text-xs font-black text-slate-800 block">CEKAT</span>
                      <span className="text-[6.5px] font-black text-emerald-600 uppercase tracking-wider block">Daftar Akun Baru</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-xl font-black tracking-tight text-slate-800">Daftar Akun Baru</h2>
                    <p className="text-xs text-slate-400 font-bold leading-normal">Lengkapi data di bawah ini untuk integrasi data rekam gizi Anda.</p>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Nama Lengkap Sesuai KTP</label>
                      <input 
                        type="text" 
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                        placeholder="contoh: Sofia Kusuma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#00875A]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Email / Nomor HP Aktif</label>
                      <input 
                        type="text" 
                        value={signUpEmailOrPhone}
                        onChange={(e) => setSignUpEmailOrPhone(e.target.value)}
                        placeholder="contoh: sofia@email.com / 0812..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#00875A]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Nomor Induk Kependudukan (NIK)</label>
                      <input 
                        type="text" 
                        value={signUpNik}
                        onChange={(e) => setSignUpNik(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500 text-slate-855"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Kata Sandi</label>
                      <input 
                        type="password" 
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500 text-slate-855"
                      />
                    </div>

                    {/* Agree terms */}
                    <label className="flex items-start gap-2.5 pt-1.5 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500 focus:ring-1 mt-0.5"
                      />
                      <span className="text-[9.5px] font-bold text-slate-500 leading-normal">
                        Saya menyetujui Ketentuan Layanan & Kebijakan Privasi data medis terintegrasi.
                      </span>
                    </label>
                  </div>

                  <button 
                    onClick={() => {
                      if (!signUpName || !signUpEmailOrPhone || !signUpNik || !signUpPassword) {
                        showToast('Silakan lengkapi seluruh formulir terlebih dahulu.', 'error');
                        return;
                      }
                      if (!agreeTerms) {
                        showToast('Anda harus menyetujui Ketentuan Layanan untuk melanjutkan.', 'warning');
                        return;
                      }
                      setAppState('otp');
                      setOtpTimer(30);
                    }}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-full text-xs shadow-md transition active:scale-98 uppercase tracking-wider"
                  >
                    Daftar Akun
                  </button>
                </div>
                
                <div className="text-center pt-4">
                  <div className="text-xs font-semibold text-slate-500">
                    Sudah mempunyai akun? <button onClick={() => setAppState('login')} className="underline text-[#00875A] font-black hover:text-[#00704a]">Masuk</button>
                  </div>
                </div>
              </div>
            )}

            {/* 3C. OTP SCREEN */}
            {appState === 'otp' && (
              <div className="flex-1 min-h-[600px] flex flex-col justify-between bg-white px-8 py-12 animate-fadeIn text-left">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
                    <button onClick={() => setAppState('signup')} className="p-1 hover:bg-slate-100 rounded-full transition -ml-1 mr-1">
                      <ArrowLeft className="w-4 h-4 text-slate-700" />
                    </button>
                    <img src="/images/logo C cekat.png" alt="Cekat Logo" className="w-7 h-7 object-contain" />
                    <div>
                      <span className="text-xs font-black text-slate-800 block">CEKAT</span>
                      <span className="text-[6.5px] font-black text-emerald-600 uppercase tracking-wider block">Verifikasi Keamanan</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-xl font-black tracking-tight text-slate-800">Verifikasi OTP</h2>
                    <p className="text-xs text-slate-400 font-bold leading-relaxed">
                      Kode verifikasi 4-digit telah dikirimkan ke nomor / email <span className="font-extrabold text-slate-700">{signUpEmailOrPhone || emailOrPhone || 'Anda'}</span>.
                    </p>
                  </div>

                  {/* OTP inputs container */}
                  <div className="space-y-4">
                    <div className="flex justify-between gap-3 px-6">
                      {otpDigits.map((digit, idx) => (
                        <input 
                          key={idx}
                          id={`otp-input-${idx}`}
                          type="text" 
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (/^[0-9]?$/.test(val)) {
                              const newDigits = [...otpDigits];
                              newDigits[idx] = val;
                              setOtpDigits(newDigits);
                              
                              // Auto focus next input
                              if (val && idx < 3) {
                                document.getElementById(`otp-input-${idx + 1}`)?.focus();
                              }
                            }
                          }}
                          onKeyDown={(e) => {
                            // Focus previous input on backspace
                            if (e.key === 'Backspace' && !otpDigits[idx] && idx > 0) {
                              document.getElementById(`otp-input-${idx - 1}`)?.focus();
                            }
                          }}
                          placeholder="-Input-"
                          className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-2xl text-center text-lg font-black focus:outline-none focus:border-emerald-500 text-slate-800 placeholder-slate-300"
                        />
                      ))}
                    </div>

                    {/* Simulation Help Box */}
                    <div className="p-3.5 bg-emerald-50/50 border border-emerald-100/50 rounded-2xl text-emerald-700 text-[10px] font-semibold leading-relaxed">
                      💡 **Petunjuk Simulasi**: Masukkan kode verifikasi **1234** (atau 4 digit apa saja) untuk memverifikasi secara langsung.
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      const code = otpDigits.join('');
                      if (code.length < 4) {
                        setOtpError('Silakan lengkapi 4 digit kode OTP!');
                        return;
                      }
                      setOtpError('');
                      // Success transition
                      setAppState('main');
                    }}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-full text-xs shadow-md transition active:scale-98 uppercase tracking-wider"
                  >
                    Verifikasi Kode
                  </button>

                  {otpError && (
                    <p className="text-[10px] font-bold text-red-500 text-center">{otpError}</p>
                  )}
                </div>

                <div className="text-center pt-4 space-y-3">
                  <div className="text-xs font-semibold text-slate-550">
                    {otpTimer > 0 ? (
                      <span>Kirim ulang OTP dalam <span className="font-black text-slate-800">{otpTimer} detik</span></span>
                    ) : (
                      <button 
                        onClick={() => {
                          setOtpTimer(30);
                          showToast('Kode OTP baru telah dikirimkan ke ' + (signUpEmailOrPhone || emailOrPhone), 'success');
                        }} 
                        className="underline text-[#00875A] font-black hover:text-[#00704a]"
                      >
                        Kirim Ulang OTP
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 4. MAIN CORE APPLICATION */}
            {appState === 'main' && (
              <div className="flex-1 flex flex-col justify-between overflow-y-auto">
                
                {/* -------------------------------------------------------------
                    TAB 1: BERANDA / HOME (Kebutuhanmu, Station, Risiko, Reminders, Cart)
                    ------------------------------------------------------------- */}
                {activeTab === 'dashboard' && (
                  <div className="flex-1 flex flex-col justify-between animate-fadeIn">
                    
                    {/* View: Beranda / Kebutuhanmu (Hi Sofia!) */}
                    {dashboardSubView === 'home' && (
                      <div className="flex-1 flex flex-col space-y-5 overflow-y-auto pb-20 text-left relative">
                        {/* Header yellow-to-green gradient with logo, notification, and centered name badge */}
                        <div className="bg-gradient-to-r from-[#f1c40f] to-[#10b981] text-white rounded-b-[40px] px-5 pt-8 pb-7 shadow-md text-left relative shrink-0">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-1.5">
                              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-0.5 shadow-sm">
                                <img src="/images/logo C cekat.png" alt="Cekat Logo" className="w-full h-full object-contain" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs font-black tracking-tight text-white uppercase leading-none">Cekat</span>
                                <span className="text-[5.5px] font-bold text-white/90 uppercase tracking-widest leading-none mt-0.5">Cerdas Sehat Terkendali</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => setDashboardSubView('reminders')}
                              className="relative p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition text-white"
                            >
                              <Bell className="w-5 h-5" />
                              <span className="absolute top-0 right-0 w-3 h-3 bg-rose-600 rounded-full border border-white text-[7px] font-black flex items-center justify-center text-white">1</span>
                            </button>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center shrink-0">
                              <div className="w-16 h-16 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" alt="Sofia Profile" className="w-full h-full object-cover" />
                              </div>
                              <div className="bg-white px-3 py-0.5 rounded-full shadow-sm border border-slate-100 -mt-2.5 z-10">
                                <span className="text-[9.5px] font-black text-slate-800 uppercase block tracking-wider">Sofia</span>
                              </div>
                            </div>
                            <div className="space-y-0.5 pr-2">
                              <h3 className="text-lg font-black text-white leading-tight">Hi Sofia!</h3>
                              <p className="text-[12px] text-white/95 font-semibold leading-snug">
                                Yuk lebih mengenal dirimu, sehat itu mahal, mari mulai hidup sehat dari langkah kecil setiap hari
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Sudah cek kesehatan di CEKAT Station? Promo Banner Card */}
                        <div className="mx-4 mt-1 shrink-0">
                          <div 
                            onClick={() => setDashboardSubView('station_summary')}
                            className="bg-gradient-to-br from-[#81c784] via-[#2e7d32] to-[#1b5e20] text-white p-4.5 rounded-3xl flex items-center justify-between shadow-sm cursor-pointer hover:brightness-105 transition relative overflow-hidden text-left"
                          >
                            {/* Absolute green patterns */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8"></div>
                            
                            {/* Left side: Premium Kiosk Station Device Image */}
                            <div className="w-16 h-28 shrink-0 relative flex items-center justify-center select-none">
                              <img src="/images/cekat station.png" alt="Cekat Station Kiosk" className="w-full h-full object-contain drop-shadow-md hover:scale-105 transition transform duration-300" />
                            </div>

                            {/* Right side: Information */}
                            <div className="flex-1 pl-4 space-y-1.5 z-10 flex flex-col justify-between h-full">
                              <div>
                                <h4 className="text-[16px] font-black leading-snug tracking-tight">Sudah cek kesehatan di CEKAT Station?</h4>
                                <p className="text-[11.5px] text-emerald-100 font-semibold leading-tight mt-0.5">
                                  Lihat hasil pemeriksaan dan lanjutkan perjalanan sehatmu di CEKAT App!
                                </p>
                              </div>
                              
                              <div className="space-y-0.5">
                                <span className="text-[11px] font-black block text-emerald-200">Faskes Terdekat</span>
                                <div className="flex items-center space-x-1">
                                  <span className="text-[11px]">📍</span>
                                  <span className="text-[12px] font-black text-white">Puskesmas Pembantu Ds. Ngabab</span>
                                </div>
                                <span className="text-[10px] font-semibold text-emerald-250 block">Buka 08.00-14.00</span>
                              </div>

                              <div className="text-right -mt-1">
                                <span className="text-[12.5px] font-black hover:underline cursor-pointer">Lihat Hasil &gt;</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Instant Quick Scan Makanan AI Banner (Zero Scroll Needed) */}
                        <div className="mx-4 mt-2 shrink-0">
                          <button 
                            onClick={() => {
                              setActiveTab('nutrisi');
                              setNutrisiSubView('scan_camera');
                            }}
                            className="w-full py-3 px-4 bg-gradient-to-r from-[#00875A] to-[#10B981] text-white font-black rounded-2xl shadow-md flex items-center justify-between active:scale-98 transition group cursor-pointer border border-emerald-400/40"
                          >
                            <div className="flex items-center space-x-3 text-left">
                              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0">
                                <Camera className="w-5 h-5 text-white animate-pulse" />
                              </div>
                              <div>
                                <h4 className="text-[12px] font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                                  <span>📸 Scan Makanan AI</span>
                                  <span className="text-[8px] bg-yellow-400 text-slate-950 px-1.5 py-0.5 rounded font-extrabold uppercase">INSTAN</span>
                                </h4>
                                <p className="text-[9.5px] text-emerald-100 font-medium">Foto piring makanmu & hitung kalori otomatis</p>
                              </div>
                            </div>
                            <div className="px-3 py-1 bg-[#F1C40F] text-slate-950 font-black text-[9.5px] uppercase rounded-full shadow-xs shrink-0 flex items-center gap-1">
                              <span>SCAN</span>
                              <ArrowRight className="w-3 h-3" />
                            </div>
                          </button>
                        </div>

                        {/* Circular 6-item Grid Menu */}
                        <div className="mx-4 mt-3 shrink-0">
                          <div className="grid grid-cols-3 gap-y-5 gap-x-2">
                            {/* Item 1: Edukasi Kesehatanmu */}
                            <div 
                              onClick={() => setDashboardSubView('edukasi')}
                              className="flex flex-col items-center cursor-pointer group"
                            >
                              <div className="w-[76px] h-[76px] rounded-full bg-[#EAEAEA] border border-[#CCCCCC]/30 flex items-center justify-center shadow-xs transition group-hover:scale-105 active:scale-95 shrink-0 overflow-hidden p-0.5">
                                <img src="/images/icon_edukasi.jpg" alt="Edukasi" className="w-full h-full object-cover rounded-full" />
                              </div>
                              <span className="text-[13.5px] font-black text-slate-800 leading-tight mt-2 text-center">Edukasi Kesehatanmu</span>
                            </div>

                            {/* Item 2: Cek Risiko Kesehatan */}
                            <div 
                              onClick={() => setDashboardSubView('cek_risiko')}
                              className="flex flex-col items-center cursor-pointer group"
                            >
                              <div className="w-[76px] h-[76px] rounded-full bg-[#EAEAEA] border border-[#CCCCCC]/30 flex items-center justify-center shadow-xs transition group-hover:scale-105 active:scale-95 shrink-0 overflow-hidden p-0.5">
                                <img src="/images/icon_risiko.jpg" alt="Cek Risiko" className="w-full h-full object-cover rounded-full" />
                              </div>
                              <span className="text-[13.5px] font-black text-slate-800 leading-tight mt-2 text-center">Cek Risiko Kesehatan</span>
                            </div>

                            {/* Item 3: Langkah Sehatmu */}
                            <div 
                              onClick={() => {
                                setActiveTab('challenge');
                                setChallengeSubView('home');
                              }}
                              className="flex flex-col items-center cursor-pointer group"
                            >
                              <div className="w-[76px] h-[76px] rounded-full bg-[#EAEAEA] border border-[#CCCCCC]/30 flex items-center justify-center shadow-xs transition group-hover:scale-105 active:scale-95 shrink-0 overflow-hidden p-0.5">
                                <img src="/images/icon_langkah.jpg" alt="Langkah" className="w-full h-full object-cover rounded-full" />
                              </div>
                              <span className="text-[13.5px] font-black text-slate-800 leading-tight mt-2 text-center">Langkah Sehatmu</span>
                            </div>

                            {/* Item 4: Kebutuhanmu */}
                            <div 
                              onClick={() => setDashboardSubView('kebutuhanmu')}
                              className="flex flex-col items-center cursor-pointer group"
                            >
                              <div className={`w-[76px] h-[76px] rounded-full border flex items-center justify-center shadow-xs transition group-hover:scale-105 active:scale-95 shrink-0 overflow-hidden p-0.5 ${(dashboardSubView as string) === 'kebutuhanmu' ? 'bg-amber-350 border-amber-500' : 'bg-[#EAEAEA] border-[#CCCCCC]/30'}`}>
                                <img src="/images/icon_kebutuhan.jpg" alt="Kebutuhan" className="w-full h-full object-cover rounded-full" />
                              </div>
                              <span className="text-[13.5px] font-black text-slate-800 leading-tight mt-2 text-center">Kebutuhanmu</span>
                            </div>

                            {/* Item 5: Pengingat & Jadwal */}
                            <div 
                              onClick={() => setDashboardSubView('reminders')}
                              className="flex flex-col items-center cursor-pointer group"
                            >
                              <div className="w-[76px] h-[76px] rounded-full bg-[#EAEAEA] border border-[#CCCCCC]/30 flex items-center justify-center shadow-xs transition group-hover:scale-105 active:scale-95 shrink-0 overflow-hidden p-0.5">
                                <img src="/images/icon_pengingat.jpg" alt="Pengingat" className="w-full h-full object-cover rounded-full" />
                              </div>
                              <span className="text-[13.5px] font-black text-slate-800 leading-tight mt-2 text-center">Pengingat & Jadwal</span>
                            </div>

                            {/* Item 6: Tanya Ceko AI */}
                            <div 
                              onClick={() => setDashboardSubView('tanya_ai')}
                              className="flex flex-col items-center cursor-pointer group"
                            >
                              <div className="w-[76px] h-[76px] rounded-full bg-[#EAEAEA] border border-[#CCCCCC]/30 flex items-center justify-center shadow-xs transition group-hover:scale-105 active:scale-95 shrink-0 overflow-hidden p-1">
                                <img src="/images/maskot cekat normal.png" alt="Ceko Mascot" className="w-full h-full object-contain rounded-full bg-white p-0.5" />
                              </div>
                              <span className="text-[13.5px] font-black text-slate-800 leading-tight mt-2 text-center">Tanya Ceko AI</span>
                            </div>
                          </div>
                        </div>

                        {/* Floating help bot inline */}
                        <div className="hidden absolute bottom-[80px] right-3 z-30 flex-col items-end pointer-events-none">
                          <div className="bg-amber-400 text-slate-900 font-black text-[9px] rounded-full px-2 py-0.5 border border-white shadow-md animate-pulse mb-1">💡</div>
                          <div className="w-10 h-10 rounded-full bg-[#10b981] border-2 border-white shadow-lg flex items-center justify-center text-xl animate-bounce">🤖</div>
                        </div>
                      </div>
                    )}

                    {/* View: Kebutuhanmu Page */}
                    {dashboardSubView === 'kebutuhanmu' && (
                      <div className="flex-1 flex flex-col justify-between pb-20 animate-fadeIn bg-slate-50 min-h-screen text-left">
                        <div>
                          {/* Header */}
                          <div className="bg-white border-b border-slate-100 px-5 pt-8 pb-4 flex items-center justify-between shadow-xs">
                            <button onClick={() => setDashboardSubView('home')} className="p-1.5 hover:bg-slate-100 rounded-full transition">
                              <ArrowLeft className="w-5 h-5 text-slate-800" />
                            </button>
                            <span className="text-[14px] font-black text-slate-900 tracking-tight">Kebutuhanmu</span>
                            <div className="w-8" />
                          </div>

                          <div className="p-5 space-y-4">
                            <div className="space-y-1">
                              <h3 className="text-lg font-black text-slate-800">Layanan Kebutuhanmu</h3>
                              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                                Temukan layanan kesehatan personal, konsultasi medis terpadu, serta pemenuhan kebutuhan obat dan nutrisi harian Anda.
                              </p>
                            </div>

                            <div className="space-y-3.5 pt-2">
                              {/* Card 1: Konsultasi */}
                              <div className="bg-white border border-slate-150 p-5 rounded-3xl flex items-center justify-between shadow-xs hover:border-emerald-300 transition group">
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-105 transition-transform duration-300">
                                    <Stethoscope className="w-6 h-6" />
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-black text-slate-850">Konsultasi Ahli</h4>
                                    <p className="text-[10px] text-slate-400 font-bold leading-snug mt-0.5">Tanya dokter spesialis & ahli gizi klinis</p>
                                  </div>
                                </div>
                                <button 
                                  onClick={() => showToast('Menghubungkan ke Ahli Gizi Terverifikasi...', 'info')}
                                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black rounded-full uppercase transition active:scale-95 shadow-xs"
                                >
                                  Mulai
                                </button>
                              </div>

                              {/* Card 2: Keranjangmu */}
                              <div className="bg-white border border-slate-150 p-5 rounded-3xl flex items-center justify-between shadow-xs hover:border-emerald-300 transition group">
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-105 transition-transform duration-300">
                                    <ShoppingCart className="w-6 h-6" />
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-black text-slate-850">Keranjang Suplemen</h4>
                                    <p className="text-[10px] text-slate-400 font-bold leading-snug mt-0.5">Beli multivitamin, obat, & pangan organik</p>
                                  </div>
                                </div>
                                <button 
                                  onClick={() => setDashboardSubView('marketplace')}
                                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black rounded-full uppercase transition active:scale-95 shadow-xs"
                                >
                                  Beli
                                </button>
                              </div>

                              {/* Card 3: Obat Saya */}
                              <div className="bg-white border border-slate-150 p-5 rounded-3xl flex items-center justify-between shadow-xs hover:border-emerald-300 transition group">
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-105 transition-transform duration-300">
                                    <Pill className="w-6 h-6" />
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-black text-slate-850">Obat & Jadwal Saya</h4>
                                    <p className="text-[10px] text-slate-400 font-bold leading-snug mt-0.5">Pengingat rutin minum obat, air, & vitamin</p>
                                  </div>
                                </div>
                                <button 
                                  onClick={() => setDashboardSubView('reminders')}
                                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black rounded-full uppercase transition active:scale-95 shadow-xs"
                                >
                                  Jadwal
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* View: Tanya Ceko AI Chat Page */}
                    {dashboardSubView === 'tanya_ai' && (
                      <div className="flex-1 flex flex-col h-full max-h-full animate-fadeIn bg-slate-50 text-left overflow-hidden relative pb-16">
                        {/* Header */}
                        <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-xs shrink-0 z-10">
                          <button onClick={() => setDashboardSubView('home')} className="p-1 hover:bg-slate-100 rounded-full transition">
                            <ArrowLeft className="w-5 h-5 text-slate-700" />
                          </button>
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center overflow-hidden shadow-xs shrink-0 p-0.5">
                              <img src="/images/maskot cekat normal.png" alt="Ceko Mascot" className="w-full h-full object-cover" />
                            </div>
                            <div className="text-left">
                              <h4 className="text-xs font-black text-slate-800 leading-none">Ceko AI</h4>
                              <span className="text-[8px] font-bold text-emerald-600 block mt-0.5">Asisten Gizi & PTM • Online</span>
                            </div>
                          </div>
                          <div className="w-6" />
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 p-3 overflow-y-auto space-y-3 flex flex-col justify-start">
                          {/* Cute Mascot Greeting Card */}
                          <div className="p-3 bg-[#f0faf7] border border-teal-150/40 rounded-2xl flex items-center space-x-3 shadow-xs text-left shrink-0">
                            <img src="/images/maskot cekat tanda tanya.png" alt="Ceko Mascot" className="w-10 h-14 object-contain shrink-0" />
                            <div className="space-y-0.5">
                              <h5 className="text-[12px] font-black text-slate-800 leading-tight">Konsultasi AI Ceko</h5>
                              <p className="text-[9.5px] text-slate-500 font-semibold leading-relaxed">Ceko siap membantu konsultasi gizi, pencegahan PTM (Hipertensi, Diabetes, Obesitas) & Stunting secara praktis & cepat!</p>
                            </div>
                          </div>

                          {chatMessages.map((msg, idx) => (
                            <div key={idx} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[11.5px] font-medium shadow-xs leading-relaxed ${
                                msg.sender === 'user' 
                                  ? 'bg-[#00875A] text-white rounded-br-none' 
                                  : 'bg-white border border-slate-100 text-slate-800 rounded-bl-none'
                              }`}>
                                {msg.text}
                              </div>
                            </div>
                          ))}
                          {isBotTyping && (
                            <div className="flex justify-start">
                              <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-3.5 py-2 text-xs text-slate-400 shadow-xs flex items-center space-x-1">
                                <span className="animate-bounce">●</span>
                                <span className="animate-bounce delay-150">●</span>
                                <span className="animate-bounce delay-300">●</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Input Area (16px font prevents iOS Safari auto-zoom) */}
                        <div className="p-2.5 bg-white border-t border-slate-100 shrink-0">
                          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-full px-3 py-1">
                            <input 
                              type="text" 
                              value={chatInput}
                              onChange={(e) => setChatInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSendChatMessage();
                              }}
                              placeholder="Tanya kalori, tensi darah, dll..."
                              className="flex-1 bg-transparent border-none text-[16px] md:text-xs text-slate-800 focus:outline-none placeholder-slate-400 px-1"
                              style={{ fontSize: '16px' }}
                            />
                            <button 
                              onClick={handleSendChatMessage}
                              className="w-8 h-8 rounded-full bg-[#00875A] hover:bg-[#00704a] text-white flex items-center justify-center transition active:scale-95 shrink-0"
                            >
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* View: Station Summary (Ringkasan Hasil CEKAT Station) */}
                    {dashboardSubView === 'station_summary' && (
                      <div className="space-y-6 flex-1 flex flex-col justify-between pb-20">
                        {/* Custom Header matching screenshots */}
                        <div className="bg-white border-b border-slate-100 px-4 pt-8 pb-3 flex items-center justify-between shadow-xs">
                          <button onClick={() => setDashboardSubView('home')} className="p-1 hover:bg-slate-50 rounded-full transition">
                            <ArrowLeft className="w-5 h-5 text-slate-700" />
                          </button>
                          <div className="flex flex-col items-center">
                            <img src="/images/logo full cekat station.png" alt="CEKAT Logo" className="h-6 object-contain" />
                          </div>
                          <button className="p-1 hover:bg-slate-50 rounded-full transition text-slate-600">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex-1 px-5 space-y-4 overflow-y-auto">
                          {/* Shadowed Title centered */}
                          <div className="text-center mt-2">
                            <h3 className="text-base font-black text-slate-800 tracking-tight drop-shadow-sm">Ringkasan Hasil CEKAT Station</h3>
                          </div>

                          <div className="text-left text-xs space-y-0.5 px-1">
                            <span className="font-black text-slate-800 block">Hi, Sofia</span>
                            <span className="text-[10.5px] font-semibold text-slate-500 block leading-tight">Berikut hasil pemeriksaan Kamu hari ini.</span>
                          </div>

                          {/* Risk Status Card */}
                          <div className="p-4 bg-[#E8F5E9] border border-[#C8E6C9] rounded-3xl text-left shadow-xs">
                            <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider block mb-2">Status Risiko Kamu</span>
                            <div className="flex items-start space-x-3">
                              <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-white text-lg shrink-0 font-black shadow-sm">!</div>
                              <div className="flex-1">
                                <span className="text-xs font-black text-slate-850 block leading-none">Perlu Perhatian</span>
                                <span className="text-[9.5px] font-semibold text-slate-650 block leading-tight mt-1">Jaga pola hidup sehat dan lakukan pemantauan rutin.</span>
                                <span className="text-[7.5px] text-slate-400 font-bold block mt-2">Diperbarui: 30 Agustus 2026 • 09:30 WIB</span>
                              </div>
                            </div>
                          </div>

                          {/* Indicators list */}
                          <div className="text-left">
                            <span className="text-xs font-black text-slate-700 block mb-2.5 px-1">Indikator Pemeriksaan</span>
                            <div className="bg-[#E8F5E9] border border-[#C8E6C9] rounded-3xl p-4 shadow-xs space-y-3.5">
                              {/* Row 1: Tekanan Darah */}
                              <div className="flex items-center justify-between pb-3 border-b border-emerald-100/50">
                                <div className="flex items-center space-x-3">
                                  <div className="w-11 h-11 flex items-center justify-center shrink-0 overflow-hidden">
                                    <img src="/images/ind_tensi.jpg" alt="Tekanan Darah" className="w-full h-full object-contain mix-blend-multiply" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wide leading-none mb-0.5">Tekanan Darah</span>
                                    <span className="text-[15px] font-black text-slate-800 leading-tight">140 / 85 <span className="text-[10px] text-slate-400 font-semibold">mmHg</span></span>
                                  </div>
                                </div>
                                <span className="text-[8.5px] font-black bg-[#FDF2E9] text-[#A04000] px-2.5 py-1 rounded-full border border-[#F5CBA7] shrink-0">Perlu Perhatian</span>
                              </div>

                              {/* Row 2: Gula Darah */}
                              <div className="flex items-center justify-between pb-3 border-b border-emerald-100/50">
                                <div className="flex items-center space-x-3">
                                  <div className="w-11 h-11 flex items-center justify-center shrink-0 overflow-hidden">
                                    <img src="/images/ind_gula.jpg" alt="Gula Darah" className="w-full h-full object-contain mix-blend-multiply" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wide leading-none mb-0.5">Gula Darah</span>
                                    <span className="text-[15px] font-black text-slate-800 leading-tight">112 <span className="text-[10px] text-slate-400 font-semibold">mg/L</span></span>
                                  </div>
                                </div>
                                <span className="text-[8.5px] font-black bg-[#FDF2E9] text-[#A04000] px-2.5 py-1 rounded-full border border-[#F5CBA7] shrink-0">Perlu Perhatian</span>
                              </div>

                              {/* Row 3: Denyut Nadi */}
                              <div className="flex items-center justify-between pb-3 border-b border-emerald-100/50">
                                <div className="flex items-center space-x-3">
                                  <div className="w-11 h-11 flex items-center justify-center shrink-0 overflow-hidden">
                                    <img src="/images/ind_nadi.jpg" alt="Denyut Nadi" className="w-full h-full object-contain mix-blend-multiply" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wide leading-none mb-0.5">Denyut Nadi</span>
                                    <span className="text-[15px] font-black text-slate-800 leading-tight">72 <span className="text-[10px] text-slate-400 font-semibold">bpm</span></span>
                                  </div>
                                </div>
                                <span className="text-[8.5px] font-black bg-[#E8F8F5] text-[#117A65] px-2.5 py-1 rounded-full border border-[#A3E4D7] shrink-0">Normal</span>
                              </div>

                              {/* Row 4: Lingkar Perut */}
                              <div className="flex items-center justify-between pb-3 border-b border-emerald-100/50">
                                <div className="flex items-center space-x-3">
                                  <div className="w-11 h-11 flex items-center justify-center shrink-0 overflow-hidden">
                                    <img src="/images/ind_perut.jpg" alt="Lingkar Perut" className="w-full h-full object-contain mix-blend-multiply" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wide leading-none mb-0.5">Lingkar Perut</span>
                                    <span className="text-[15px] font-black text-slate-800 leading-tight">88 <span className="text-[10px] text-slate-400 font-semibold">cm</span></span>
                                  </div>
                                </div>
                                <span className="text-[8.5px] font-black bg-[#FDF2E9] text-[#A04000] px-2.5 py-1 rounded-full border border-[#F5CBA7] shrink-0">Perlu Perhatian</span>
                              </div>

                              {/* Row 5: IMT (BMI) */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className="w-11 h-11 flex items-center justify-center shrink-0 overflow-hidden">
                                    <img src="/images/ind_bmi.jpg" alt="IMT" className="w-full h-full object-contain mix-blend-multiply" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wide leading-none mb-0.5">IMT (BMI)</span>
                                    <span className="text-[15px] font-black text-slate-800 leading-tight">24.6</span>
                                  </div>
                                </div>
                                <span className="text-[8.5px] font-black bg-[#E8F8F5] text-[#117A65] px-2.5 py-1 rounded-full border border-[#A3E4D7] shrink-0">Normal</span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-2">
                            <button 
                              onClick={() => setDashboardSubView('cek_risiko')}
                              className="w-full py-3.5 bg-[#00875A] hover:bg-[#00704a] text-white font-black rounded-3xl text-xs uppercase tracking-wider shadow-sm transition active:scale-98"
                            >
                              Lihat Detail
                            </button>
                          </div>
                        </div>

                        {/* Floating mascot inline */}
                        <div className="absolute bottom-[80px] right-3 z-30 flex flex-col items-end pointer-events-none">
                          <div className="bg-amber-400 text-slate-900 font-black text-[9px] rounded-full px-2 py-0.5 border border-white shadow-md animate-pulse mb-1">💡</div>
                          <div className="w-10 h-10 rounded-full bg-[#10b981] border-2 border-white shadow-lg flex items-center justify-center text-xl animate-bounce">🤖</div>
                        </div>
                      </div>
                    )}

                    {/* View: Cek Risiko Kesehatan Detail */}
                    {dashboardSubView === 'cek_risiko' && (
                      <div className="space-y-6 flex-1 flex flex-col justify-between pb-20">
                        {/* Custom Header matching screenshots */}
                        <div className="bg-white border-b border-slate-100 px-4 pt-8 pb-3 flex items-center justify-between shadow-xs">
                          <button onClick={() => setDashboardSubView('station_summary')} className="p-1 hover:bg-slate-50 rounded-full transition">
                            <ArrowLeft className="w-5 h-5 text-slate-700" />
                          </button>
                          <div className="flex flex-col items-center">
                            <div className="flex items-center space-x-1">
                              <div className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center p-0.5">
                                <span className="text-[10px] font-black text-white leading-none">C</span>
                              </div>
                              <span className="text-sm font-black text-slate-800 tracking-tight leading-none">Cekat</span>
                            </div>
                            <span className="text-[6.5px] font-black text-emerald-600 uppercase tracking-widest leading-none mt-0.5">Cek • Kenali • Tindaklanjuti</span>
                          </div>
                          <button className="p-1 hover:bg-slate-50 rounded-full transition text-slate-600">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex-1 px-5 space-y-4 overflow-y-auto">
                          {/* Title with heart shield plus logo */}
                          <div className="px-1 mt-2 text-left flex items-center space-x-2.5">
                            <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center text-white shrink-0 shadow-xs">
                              <Plus className="w-3.5 h-3.5 font-bold" />
                            </div>
                            <h3 className="text-base font-black text-slate-800 tracking-tight drop-shadow-sm">Cek Risiko Kesehatan</h3>
                          </div>

                          <div className="space-y-4.5">
                            {/* Asam Urat */}
                            <div className="space-y-1 text-left">
                              <span className="text-xs font-black text-slate-800 block px-1">Asam Urat</span>
                              <div className="bg-[#F2F4F4] border border-slate-200/60 rounded-2xl p-3.5 text-xs font-bold text-slate-800 shadow-xs">
                                Angka Asam Urat Darah Anda Hari ini <span className="font-black text-slate-900">5,9 mg/dl</span>
                              </div>
                              <p className="text-[10px] text-slate-500 leading-normal px-1">
                                Angka asam urat anda <span className="font-extrabold text-slate-700">akan mencapai batas normal</span>, tetap <span className="font-extrabold text-slate-750">waspada terhadap resiko Asam Urat yaa!</span>
                              </p>
                            </div>

                            {/* Kolesterol */}
                            <div className="space-y-1 text-left">
                              <span className="text-xs font-black text-slate-800 block px-1">Kolesterol</span>
                              <div className="bg-[#F2F4F4] border border-slate-200/60 rounded-2xl p-3.5 text-xs font-bold text-slate-800 shadow-xs">
                                Angka Kolesterol Anda Hari ini <span className="font-black text-slate-900">220 mg/dl</span>
                              </div>
                              <p className="text-[10px] text-slate-500 leading-normal px-1">
                                Angka Kolesterol anda pada kategori <span className="font-extrabold text-slate-700">Sedikit Tinggi</span>, <span className="font-extrabold text-slate-750">Jagalah Pola Makan anda</span>, dan <span className="font-extrabold text-slate-750">waspadai resiko penyakit Kolesterol!</span>
                              </p>
                            </div>

                            {/* Hipertensi */}
                            <div className="space-y-1 text-left">
                              <span className="text-xs font-black text-slate-800 block px-1">Hipertensi</span>
                              <div className="bg-[#FDEDEC] border border-[#FADBD8] rounded-2xl p-3.5 text-xs font-bold text-[#C0392B] shadow-xs">
                                Angka Tekanan Darah Anda Hari ini <span className="font-black">140/85 mmHg</span>
                              </div>
                              <p className="text-[10px] text-slate-500 leading-normal px-1">
                                Dapat dikatakan Angka Tekanan Darah anda <span className="font-extrabold text-red-650">Tinggi</span>. <span className="font-extrabold text-slate-700">Batasi konsumsi makanan tinggi garam</span>, dan jangan lupa selalu <span className="font-extrabold text-slate-750">cek TD secara berkala ya!</span>
                              </p>
                            </div>

                            {/* Diabetes */}
                            <div className="space-y-1 text-left">
                              <span className="text-xs font-black text-slate-800 block px-1">Diabetes</span>
                              <div className="bg-[#FDEDEC] border border-[#FADBD8] rounded-2xl p-3.5 text-xs font-bold text-[#C0392B] shadow-xs">
                                Angka Diabetes Anda Hari ini <span className="font-black">180 mg/dl</span>
                              </div>
                              <p className="text-[10px] text-slate-500 leading-normal px-1">
                                Dapat dikatakan Angka Diabetes anda <span className="font-extrabold text-red-650">mengkhawatirkan</span>. <span className="font-extrabold text-slate-700">Batasi konsumsi gula</span>, dan jangan lupa <span className="font-extrabold text-slate-750">olahraga ya!</span>
                              </p>
                            </div>
                          </div>

                          <div className="pt-2 flex flex-col items-center gap-3.5">
                            <button 
                              onClick={() => {
                                setActiveTab('challenge');
                                setChallengeSubView('home');
                              }}
                              className="w-full py-3 bg-white border border-[#E74C3C] text-[#E74C3C] font-black rounded-3xl text-xs uppercase tracking-wider transition active:scale-98 shadow-xs hover:bg-rose-50"
                            >
                              Pola Hidup Sehat
                            </button>

                            <div className="w-full p-4 bg-emerald-50/50 border border-emerald-100 rounded-3xl flex items-start gap-3 shadow-xs">
                              <div className="w-10 h-10 shrink-0 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-lg animate-bounce">🥗</div>
                              <p className="text-[10px] leading-relaxed text-slate-500 font-semibold text-left">
                                Ingin mempelajari tentang Resiko Penyakitmu? Jangan khawatir! segera <button onClick={() => setDashboardSubView('edukasi')} className="text-blue-500 font-extrabold underline cursor-pointer">kunjungi artikel & Webinar kami</button>, dan semoga dapat membantu
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Floating mascot inline */}
                        <div className="absolute bottom-[80px] right-3 z-30 flex flex-col items-end pointer-events-none">
                          <div className="bg-amber-400 text-slate-900 font-black text-[9px] rounded-full px-2 py-0.5 border border-white shadow-md animate-pulse mb-1">💡</div>
                          <div className="w-10 h-10 rounded-full bg-[#10b981] border-2 border-white shadow-lg flex items-center justify-center text-xl animate-bounce">🤖</div>
                        </div>
                      </div>
                    )}

                    {/* View: Reminders & Medication Schedule (Pengingat & Jadwal) */}
                    {dashboardSubView === 'reminders' && (
                      <div className="space-y-6">
                        <div className="bg-white border-b border-slate-100 px-6 pt-8 pb-4 flex items-center justify-between">
                          <button onClick={() => setDashboardSubView('home')} className="p-1 hover:bg-slate-100 rounded-full transition">
                            <ArrowLeft className="w-5 h-5 text-slate-800" />
                          </button>
                          <span className="text-sm font-black text-slate-800 uppercase tracking-wider">Pengingat & Jadwal</span>
                          <div className="w-7"></div>
                        </div>

                        <div className="px-5 space-y-4 text-left">
                          {/* Schedule Filter Tabs */}
                          <div className="flex bg-slate-100 p-1 rounded-full text-[10px] font-black text-slate-500">
                            <span className="flex-1 py-1.5 text-center bg-white text-emerald-700 rounded-full shadow-sm">Semua</span>
                            <span className="flex-1 py-1.5 text-center">Obat</span>
                            <span className="flex-1 py-1.5 text-center">Pemeriksaan</span>
                            <span className="flex-1 py-1.5 text-center">Konsumsi</span>
                          </div>

                          {/* Today timeline */}
                          <div className="space-y-3">
                            <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase block">Hari Ini</span>

                            {/* Reminder Item 1 */}
                            <div className="p-4 bg-white border border-slate-100 rounded-3xl flex items-center justify-between shadow-sm">
                              <div className="flex items-center space-x-3.5">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                  <Pill className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-black text-slate-800">Minum Obat</span>
                                    <span className="text-[8px] font-bold text-slate-400">20.00</span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 font-semibold leading-none mt-0.5">Amlodipine 5 mg • 1 tablet</p>
                                </div>
                              </div>
                              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[9px] font-black rounded-lg uppercase tracking-wider">Segera</span>
                            </div>
                          </div>

                          {/* Tomorrow timeline */}
                          <div className="space-y-3">
                            <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase block">Besok, 31 Agustus 2026</span>

                            {/* Reminder Item 2 */}
                            <div className="p-4 bg-white border border-slate-100 rounded-3xl flex items-center justify-between shadow-sm">
                              <div className="flex items-center space-x-3.5">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                  <Stethoscope className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-black text-slate-800">Cek Tekanan Darah</span>
                                    <span className="text-[8px] font-bold text-slate-400">08.00</span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 font-semibold leading-none mt-0.5">Pantau tekanan darah harian kamu</p>
                                </div>
                              </div>
                              <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[9px] font-black rounded-lg uppercase tracking-wider">Besok</span>
                            </div>

                            {/* Reminder Item 3 */}
                            <div className="p-4 bg-white border border-slate-100 rounded-3xl flex items-center justify-between shadow-sm">
                              <div className="flex items-center space-x-3.5">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                  <Droplet className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-black text-slate-800">Minum Air Putih</span>
                                    <span className="text-[8px] font-bold text-slate-400">12.00</span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 font-semibold leading-none mt-0.5">Minimal 8 gelas sehari</p>
                                </div>
                              </div>
                              <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[9px] font-black rounded-lg uppercase tracking-wider">Besok</span>
                            </div>
                          </div>

                          {/* Upcoming timeline */}
                          <div className="space-y-3">
                            <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase block">Jadwal Mendatang</span>

                            {/* Reminder Item 4 */}
                            <div className="p-4 bg-white border border-slate-100 rounded-3xl flex items-center justify-between shadow-sm">
                              <div className="flex items-center space-x-3.5">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                  <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-black text-slate-800">Kontrol Kesehatan</span>
                                    <span className="text-[8px] font-bold text-slate-400">09.00</span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 font-semibold leading-none mt-0.5">Puskesmas Pembantu Ds. Ngabab</p>
                                </div>
                              </div>
                              <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-205 text-emerald-705 text-[8px] font-black rounded-lg uppercase tracking-wider shrink-0">Dalam 4 hari</span>
                            </div>

                            {/* Reminder Item 5 */}
                            <div className="p-4 bg-white border border-slate-100 rounded-3xl flex items-center justify-between shadow-sm">
                              <div className="flex items-center space-x-3.5">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                  <User className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-black text-slate-800">Pantau Tumbuh Kembang</span>
                                    <span className="text-[8px] font-bold text-slate-400">10.00</span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 font-semibold leading-normal mt-0.5">Posyandu Mawar • Cek tinggi & berat badan</p>
                                </div>
                              </div>
                              <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-205 text-emerald-705 text-[8px] font-black rounded-lg uppercase tracking-wider shrink-0">Dalam 6 hari</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* View: Marketplace (Keranjangmu) */}
                    {dashboardSubView === 'marketplace' && (
                      <div className="space-y-6">
                        <div className="bg-white border-b border-slate-100 px-6 pt-8 pb-4 flex items-center justify-between">
                          <button onClick={() => setDashboardSubView('home')} className="p-1 hover:bg-slate-100 rounded-full transition">
                            <ArrowLeft className="w-5 h-5 text-slate-800" />
                          </button>
                          <span className="text-sm font-black text-slate-800 uppercase tracking-wider">Keranjangmu</span>
                          <div className="w-7"></div>
                        </div>

                        <div className="px-5 space-y-4 text-left">
                          {/* Search bar */}
                          <div className="flex bg-slate-100 rounded-full items-center px-4 py-2 text-xs font-semibold shadow-inner">
                            <Search className="w-4 h-4 text-slate-400 mr-2" />
                            <input 
                              type="text" 
                              placeholder="Telusuri..." 
                              className="bg-transparent focus:outline-none flex-1"
                            />
                          </div>

                          {/* Categories tags */}
                          <div className="flex overflow-x-auto space-x-2 text-[10px] font-black text-slate-500 scrollbar-none pb-1">
                            <span className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full shrink-0">Semua</span>
                            <span className="px-3.5 py-1.5 bg-white border border-slate-100 rounded-full shrink-0">Vitamin</span>
                            <span className="px-3.5 py-1.5 bg-white border border-slate-100 rounded-full shrink-0">Tablet Penambah darah</span>
                            <span className="px-3.5 py-1.5 bg-white border border-slate-100 rounded-full shrink-0">Susu</span>
                            <span className="px-3.5 py-1.5 bg-white border border-slate-100 rounded-full shrink-0">Obat</span>
                          </div>

                          {/* Product Grid */}
                          <div className="grid grid-cols-2 gap-4">
                            {/* Product 1 */}
                            <div className="bg-white border border-slate-100 rounded-3xl p-3 shadow-sm flex flex-col justify-between space-y-3">
                              <div className="space-y-1.5">
                                <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center p-2">
                                  <img src="https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=150&q=80" alt="Enervon C" className="h-full object-contain" />
                                </div>
                                <h5 className="text-[10px] font-black text-slate-800 leading-snug line-clamp-2">Enervon C 133 mg (50 Tablet)</h5>
                                <span className="text-[9px] text-slate-400 block font-bold">NutriStore Official</span>
                              </div>
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-xs font-black text-emerald-600">Rp 45.900</span>
                                <span className="text-[9px] text-slate-400 line-through">Rp 61.350</span>
                              </div>
                            </div>

                            {/* Product 2 */}
                            <div className="bg-white border border-slate-100 rounded-3xl p-3 shadow-sm flex flex-col justify-between space-y-3">
                              <div className="space-y-1.5">
                                <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center p-2">
                                  <img src="https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=150&q=80" alt="Tablet Tambah Darah" className="h-full object-contain" />
                                </div>
                                <h5 className="text-[10px] font-black text-slate-800 leading-snug line-clamp-2">Tablet Tambah Darah (Pcs 100 Tablet)</h5>
                                <span className="text-[9px] text-slate-400 block font-bold">Kimia Farma</span>
                              </div>
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-xs font-black text-emerald-600">Rp 24.999</span>
                                <span className="text-[9px] text-slate-400 line-through">Rp 29.350</span>
                              </div>
                            </div>

                            {/* Product 3 */}
                            <div className="bg-white border border-slate-100 rounded-3xl p-3 shadow-sm flex flex-col justify-between space-y-3">
                              <div className="space-y-1.5">
                                <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center p-2">
                                  <img src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=150&q=80" alt="Ultra Milk" className="h-full object-contain" />
                                </div>
                                <h5 className="text-[10px] font-black text-slate-800 leading-snug line-clamp-2">Ultra Milk Susu UHT 200 ml (1 Pcs)</h5>
                                <span className="text-[9px] text-slate-400 block font-bold">Ultra Jaya</span>
                              </div>
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-xs font-black text-emerald-600">Rp 5.700</span>
                                <span className="text-[9px] text-slate-400 line-through">Rp 6.000</span>
                              </div>
                            </div>

                            {/* Product 4 */}
                            <div className="bg-white border border-slate-100 rounded-3xl p-3 shadow-sm flex flex-col justify-between space-y-3">
                              <div className="space-y-1.5">
                                <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center p-2">
                                  <img src="https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=150&q=80" alt="Ayam Fillet" className="h-full object-contain" />
                                </div>
                                <h5 className="text-[10px] font-black text-slate-800 leading-snug line-clamp-2">Ayam Fillet Dada 1 Kg Fresh</h5>
                                <span className="text-[9px] text-slate-400 block font-bold">Pasar Tani</span>
                              </div>
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-xs font-black text-emerald-600">Rp 32.300</span>
                                <span className="text-[9px] text-slate-400 line-through">Rp 54.000</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* View: Edukasi Kesehatan */}
                    {dashboardSubView === 'edukasi' && (
                      <div className="space-y-0 animate-fadeIn pb-6">

                        {/* ── Header ── */}
                        <div className="bg-white border-b border-slate-100 px-4 pt-8 pb-3 flex items-center justify-between">
                          <button onClick={() => setDashboardSubView('home')} className="p-1.5 hover:bg-slate-50 rounded-full transition">
                            <ArrowLeft className="w-5 h-5 text-slate-800" />
                          </button>
                          <span className="text-[15px] font-black text-slate-900 tracking-tight">Edukasi Kesehatan</span>
                          <button className="p-1.5 hover:bg-slate-50 rounded-full transition">
                            <CalendarDays className="w-[18px] h-[18px] text-slate-700" />
                          </button>
                        </div>

                        {/* ── Search Bar ── */}
                        <div className="px-4 pt-3 pb-2 bg-white">
                          <div className="flex bg-slate-100 rounded-full items-center px-4 py-2.5 gap-2">
                            <Search className="w-4 h-4 text-slate-500 shrink-0" />
                            <input type="text" placeholder="Telusuri" className="bg-transparent focus:outline-none flex-1 text-[12px] font-semibold text-slate-700 placeholder:text-slate-400" />
                          </div>
                        </div>

                        {/* ── Hero Banner ── */}
                        <div className="mx-4 mt-2 rounded-3xl overflow-hidden bg-gradient-to-br from-[#fefce8] via-[#f0fdf4] to-[#dcfce7] border border-emerald-200 shadow-sm">
                          <div className="flex items-center justify-between px-5 pt-4 pb-4">
                            <div className="flex-1 pr-3">
                              <h2 className="text-[13px] font-black text-slate-900 leading-snug mb-1">Belajar, Pahami, dan Terapkan untuk Kesehatan yang Lebih Baik</h2>
                              <p className="text-[9.5px] font-bold text-slate-600 leading-tight">Informasi terpercaya untuk hidup sehat</p>
                            </div>
                            <div className="w-[88px] h-[88px] shrink-0">
                              <img src="/images/edukasi_hero.jpg" alt="Edukasi" className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                          </div>
                        </div>

                        {/* ── Artikel Pilihan ── */}
                        <div className="mx-4 mt-4">
                          <div className="bg-[#f0fdf4] border border-[#86efac] rounded-3xl p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[13px] font-black text-slate-900">Artikel Pilihan</span>
                              <button
                                onClick={() => setDashboardSubView('artikel_list')}
                                className="text-[10.5px] font-black text-emerald-700 flex items-center gap-0.5 hover:underline"
                              >Lihat Semua <ChevronRight className="w-3.5 h-3.5" /></button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">

                              {/* ── Article 1: Hipertensi ── */}
                              <div
                                onClick={() => {
                                  const art = articlesData.find(a => a.id === 'hipertensi');
                                  if (art) { setSelectedArticle(art); setDashboardSubView('article_detail'); }
                                }}
                                className="bg-white rounded-2xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg active:scale-[0.98] transition duration-200"
                              >
                                <div className="h-[90px] overflow-hidden relative">
                                  <img src="/images/cover_hipertensi.jpg" alt="Hipertensi" className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>
                                <div className="p-3">
                                  <span className="text-[7.5px] font-black bg-red-500 text-white px-2 py-0.5 rounded-full">Hipertensi</span>
                                  <h4 className="text-[10.5px] font-black text-slate-900 leading-snug mt-1.5">Kenali Hipertensi, Cegah Komplikasi</h4>
                                  <p className="text-[8.5px] text-slate-600 font-semibold mt-0.5 leading-tight">Pahami penyebab, gejala, dan cara mencegah hipertensi.</p>
                                </div>
                              </div>

                              {/* ── Article 2: Stunting ── */}
                              <div
                                onClick={() => {
                                  const art = articlesData.find(a => a.id === 'stunting');
                                  if (art) { setSelectedArticle(art); setDashboardSubView('article_detail'); }
                                }}
                                className="bg-white rounded-2xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg active:scale-[0.98] transition duration-200"
                              >
                                <div className="h-[90px] overflow-hidden relative">
                                  <img src="/images/cover_stunting.jpg" alt="Stunting" className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>
                                <div className="p-3">
                                  <span className="text-[7.5px] font-black bg-orange-500 text-white px-2 py-0.5 rounded-full">Stunting</span>
                                  <h4 className="text-[10.5px] font-black text-slate-900 leading-snug mt-1.5">Cegah Stunting Sejak Dini</h4>
                                  <p className="text-[8.5px] text-slate-600 font-semibold mt-0.5 leading-tight">Nutrisi, pola asuh, dan sanitasi untuk tumbuh kembang optimal.</p>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>

                        {/* ── Webinar Kesehatan ── */}
                        <div className="mx-4 mt-4">
                          <div className="bg-white border border-slate-200/80 rounded-3xl p-4 shadow-[0_4px_18px_-4px_rgba(15,23,42,0.05)]">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-3.5 bg-emerald-600 rounded-full"></div>
                                <span className="text-[12.5px] font-extrabold text-slate-900 tracking-tight">Webinar Kesehatan</span>
                              </div>
                              <button 
                                onClick={() => setDashboardSubView('webinar_list')}
                                className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5 hover:underline"
                              >
                                Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            
                            <h4 className="text-[12px] font-extrabold text-slate-900 leading-snug tracking-tight px-0.5">
                              Cegah Hipertensi dengan Pola Hidup Sehat
                            </h4>

                            {/* Speaker Info Card */}
                            <div className="flex items-center gap-2.5 mt-2.5 mb-2.5 bg-slate-50 border border-slate-100 p-2 rounded-2xl">
                              <div className="w-8 h-8 rounded-full overflow-hidden border border-emerald-200 shrink-0">
                                <img
                                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=90"
                                  alt="Rahmad Raffi"
                                  className="w-full h-full object-cover object-top"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[9.5px] font-black text-slate-800 leading-tight">Rahmad Raffi, S.Kep., Ns., M.Kep</p>
                                <p className="text-[8px] font-semibold text-slate-500 truncate leading-normal mt-0.5">
                                  Kepala Hubungan Inna Medica • RS Dr. Sutomo
                                </p>
                              </div>
                            </div>

                            {/* Time & Date */}
                            <div className="flex items-center gap-1.5 text-slate-500 mb-3 px-0.5">
                              <CalendarDays className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="text-[9.5px] font-bold text-slate-600">Sabtu, 30 September 2026 • 10.00 WIB</span>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-slate-100 mb-3"></div>

                            {/* Bottom row: Pricing & Button */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider">HTM</span>
                                <span className="text-[12px] font-black text-emerald-800 bg-emerald-50/70 border border-emerald-100 px-2 py-0.5 rounded-lg">
                                  Rp 20.000
                                </span>
                              </div>
                              <button className="py-2 px-5 bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white font-extrabold text-[11px] rounded-xl shadow-md shadow-emerald-700/10 transition">
                                Daftar Sekarang
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* ── Mitos Vs Fakta ── */}
                        <div className="mx-4 mt-4 mb-6">
                          <div className="bg-[#f0fdf4] border border-[#86efac] rounded-3xl p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-3.5 bg-emerald-600 rounded-full"></div>
                                <span className="text-[13px] font-black text-slate-900">Mitos Vs Fakta</span>
                              </div>
                              <button
                                onClick={() => setDashboardSubView('mitos_fakta')}
                                className="text-[10.5px] font-black text-emerald-700 flex items-center gap-0.5 hover:underline"
                              >Lihat Semua <ChevronRight className="w-3.5 h-3.5" /></button>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="flex-1 space-y-2.5">
                                <div className="flex items-start gap-2">
                                  <span className="text-[9px] font-black bg-red-500 text-white px-3 py-1 rounded-lg shrink-0 mt-0.5">MITOS</span>
                                  <p className="text-[10px] font-bold text-slate-800 leading-snug">"Orang kurus tidak bisa kena hipertensi"</p>
                                </div>
                                <div className="flex items-start gap-2">
                                  <span className="text-[9px] font-black bg-emerald-500 text-white px-2.5 py-1 rounded-lg shrink-0 mt-0.5">FAKTA</span>
                                  <p className="text-[10px] font-bold text-slate-800 leading-snug">Hipertensi bisa terjadi pada siapa pun, termasuk orang kurus.</p>
                                </div>
                              </div>
                              {/* Maskot CEKAT */}
                              <div className="shrink-0 w-14 h-16">
                                <img
                                  src="/images/maskot cekat tanda tanya.png"
                                  alt="Ceko Maskot"
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    )}

                    {/* View: Detail Artikel */}
                    {dashboardSubView === 'article_detail' && selectedArticle && (
                      <div className="space-y-0 animate-fadeIn pb-24 bg-white min-h-screen">
                        {/* ── Header ── */}
                        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 pt-8 pb-3 flex items-center justify-between z-30">
                          <button onClick={() => setDashboardSubView('edukasi')} className="p-1.5 hover:bg-slate-50 rounded-full transition">
                            <ArrowLeft className="w-5 h-5 text-slate-800" />
                          </button>
                          <span className="text-[13px] font-black text-slate-900 tracking-tight">Baca Artikel</span>
                          <button 
                            onClick={() => {
                              if (navigator.share) {
                                navigator.share({
                                  title: selectedArticle.title,
                                  text: selectedArticle.description,
                                  url: window.location.href,
                                }).catch(() => {});
                              } else {
                                showToast('Link artikel berhasil disalin!', 'success');
                              }
                            }}
                            className="p-1.5 hover:bg-slate-50 rounded-full transition"
                          >
                            <Compass className="w-[18px] h-[18px] text-slate-700" />
                          </button>
                        </div>

                        {/* ── Cover Image (SVG) ── */}
                        <div className="h-[180px] w-full overflow-hidden relative border-b border-slate-100">
                          {renderArticleSvg(selectedArticle.svgId)}
                        </div>

                        {/* ── Content Container ── */}
                        <div className="px-5 py-6 space-y-4">
                          {/* Category Badge */}
                          <div>
                            <span className={`text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                              selectedArticle.category === 'Hipertensi' 
                                ? 'bg-red-50 text-red-700 border border-red-100' 
                                : 'bg-orange-50 text-orange-700 border border-orange-100'
                            }`}>
                              {selectedArticle.category}
                            </span>
                          </div>

                          {/* Title */}
                          <h1 className="text-[16px] font-black text-slate-900 leading-tight tracking-tight">
                            {selectedArticle.title}
                          </h1>

                          {/* Author & Read Time metadata */}
                          <div className="flex items-center justify-between text-slate-500 pb-3 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-[9px] font-black text-emerald-800">
                                CG
                              </div>
                              <span className="text-[10px] font-bold text-slate-705">{selectedArticle.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              <span className="text-[10px] font-bold text-slate-500">{selectedArticle.readTime}</span>
                            </div>
                          </div>

                          {/* Article Body */}
                          <div className="text-[11.5px] text-slate-750 font-medium leading-relaxed space-y-4 pt-2">
                            {selectedArticle.content.split('\n\n').map((para: string, i: number) => {
                              const trimmed = para.trim();
                              if (!trimmed) return null;

                              // Handle header style (### ...)
                              if (trimmed.startsWith('###')) {
                                return (
                                  <h3 key={i} className="text-[13px] font-extrabold text-slate-900 pt-3">
                                    {trimmed.replace('###', '').trim()}
                                  </h3>
                                );
                              }

                              // Handle bullet points (* or - or numbers)
                              if (trimmed.startsWith('*') || trimmed.startsWith('-') || /^\d+\./.test(trimmed)) {
                                return (
                                  <ul key={i} className="list-disc pl-4 space-y-1.5 text-slate-650">
                                    {trimmed.split('\n').map((li: string, j: number) => {
                                      const cleanLi = li.replace(/^[\*\-\d\.\s]+/, '').trim();
                                      // Bold highlight inside lists e.g. **text**:
                                      const boldMatch = cleanLi.match(/^\*\*(.*?)\*\*(.*)/);
                                      if (boldMatch) {
                                        return (
                                          <li key={j} className="leading-relaxed">
                                            <strong>{boldMatch[1]}</strong>{boldMatch[2]}
                                          </li>
                                        );
                                      }
                                      return <li key={j}>{cleanLi}</li>;
                                    })}
                                  </ul>
                                );
                              }

                              // Handle bold text in paragraphs
                              const boldMatch = trimmed.match(/\*\*(.*?)\*\*/g);
                              if (boldMatch) {
                                let html = trimmed;
                                boldMatch.forEach((m: string) => {
                                  const text = m.replace(/\*\*/g, '');
                                  html = html.replace(m, `<strong>${text}</strong>`);
                                });
                                return (
                                  <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
                                );
                              }

                              return <p key={i}>{trimmed}</p>;
                            })}
                          </div>
                        </div>

                        {/* ── Gamified Action Button at Bottom ── */}
                        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-slate-100 flex justify-center z-20 max-w-md mx-auto">
                          <button 
                            onClick={() => {
                              showToast(`Selamat! Anda mendapatkan +${selectedArticle.points} poin karena telah membaca artikel ini.`, 'success');
                              setDashboardSubView('edukasi');
                            }}
                            className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-[12px] rounded-2xl shadow-lg shadow-emerald-700/20 active:scale-95 transition flex items-center justify-center gap-1.5"
                          >
                            <Trophy className="w-4 h-4 text-yellow-400" />
                            <span>Tandai Selesai & Klaim {selectedArticle.points} Poin</span>
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {/* -------------------------------------------------------------
                    TAB 2: NUTRISI / FOOD SCANNER (Progress bars, Camera view, Results, Kulkas resep)
                    ------------------------------------------------------------- */}
                {activeTab === 'nutrisi' && (
                  <div className="flex-1 flex flex-col justify-between animate-fadeIn pb-20">
                    
                    {/* View: Main Nutrisi Harianmu (Progress Bars) */}
                    {nutrisiSubView === 'main' && (
                      <div className="space-y-6">
                        {/* Header light yellow with logo and tabs */}
                        <div className="bg-gradient-to-b from-yellow-50/50 to-white px-5 pt-8 pb-4 text-center border-b border-slate-100 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1.5">
                              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-1 shadow-sm">
                                <img src="/images/logo C cekat.png" alt="Cekat Logo" className="w-full h-full object-contain" />
                              </div>
                              <span className="text-xs font-black text-emerald-800 uppercase tracking-wider block">Cekat</span>
                            </div>
                            
                            {/* Calendar icon */}
                            <button className="p-1 hover:bg-slate-100 rounded-full transition">
                              <Calendar className="w-5 h-5 text-slate-600" />
                            </button>
                          </div>

                          {/* Harian, Mingguan, Bulanan, Tahunan Subtabs */}
                          <div className="flex bg-slate-100 p-0.5 rounded-full text-[9px] font-black text-slate-500 shadow-inner">
                            <span className="flex-1 py-1.5 text-center bg-white text-slate-800 rounded-full shadow-sm">Harian</span>
                            <span 
                              onClick={() => setNutrisiSubView('charts')}
                              className="flex-1 py-1.5 text-center cursor-pointer hover:text-slate-800"
                            >
                              Mingguan
                            </span>
                            <span className="flex-1 py-1.5 text-center">Bulanan</span>
                            <span className="flex-1 py-1.5 text-center">Tahunan</span>
                          </div>
                        </div>

                        {/* Nutrition indicator list */}
                        <div className="px-5 space-y-4 text-left">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black text-slate-850">Nutrisi Harianmu</h3>
                            <button 
                              onClick={() => setNutrisiSubView('charts')}
                              className="text-[9.5px] font-black text-emerald-600 uppercase tracking-wide hover:underline flex items-center gap-0.5"
                            >
                              <span>Lihat Detail</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Progress bars indicators container */}
                          <div className="bg-[#fcfdfa] border-2 border-purple-500 rounded-3xl p-5 shadow-sm space-y-4 text-xs font-semibold text-slate-800 mx-4">
                            
                            {/* 1. Energi */}
                            <div className="space-y-1">
                              <div className="flex justify-between font-bold text-[11.5px]">
                                <span className="flex items-center gap-1.5 text-slate-700">🔥 Energi</span>
                                <span className="text-emerald-700 font-extrabold text-[12.5px]">1.450 <span className="text-slate-400 font-normal text-[10px]">/ 2.000 kkal</span></span>
                              </div>
                              <div className="w-full h-2 bg-slate-200/80 rounded-full relative overflow-visible">
                                <div className="h-full bg-gradient-to-r from-emerald-500 to-[#cbd52d] rounded-full" style={{ width: '72.5%' }}></div>
                                <div className="absolute top-0 w-2 h-2 bg-emerald-700 -mt-0.5 rotate-45" style={{ left: '70.5%' }}></div>
                              </div>
                            </div>

                            {/* 2. Serat */}
                            <div className="space-y-1">
                              <div className="flex justify-between font-bold text-[11.5px]">
                                <span className="flex items-center gap-1.5 text-slate-700">🌾 Serat</span>
                                <span className="text-emerald-700 font-extrabold text-[12.5px]">18 <span className="text-slate-400 font-normal text-[10px]">/ 25 g</span></span>
                              </div>
                              <div className="w-full h-2 bg-slate-200/80 rounded-full relative overflow-visible">
                                <div className="h-full bg-gradient-to-r from-emerald-500 to-[#cbd52d] rounded-full" style={{ width: '72%' }}></div>
                                <div className="absolute top-0 w-2 h-2 bg-emerald-700 -mt-0.5 rotate-45" style={{ left: '70%' }}></div>
                              </div>
                            </div>

                            {/* 3. Gula */}
                            <div className="space-y-1">
                              <div className="flex justify-between font-bold text-[11.5px]">
                                <span className="flex items-center gap-1.5 text-slate-700">🍬 Gula</span>
                                <span className="text-emerald-700 font-extrabold text-[12.5px]">42 <span className="text-slate-400 font-normal text-[10px]">/ 50 g</span></span>
                              </div>
                              <div className="w-full h-2 bg-slate-200/80 rounded-full relative overflow-visible">
                                <div className="h-full bg-gradient-to-r from-emerald-500 to-yellow-500 rounded-full" style={{ width: '84%' }}></div>
                                <div className="absolute top-0 w-2 h-2 bg-yellow-600 -mt-0.5 rotate-45" style={{ left: '82%' }}></div>
                              </div>
                            </div>

                            {/* 4. Hidrasi */}
                            <div className="space-y-1">
                              <div className="flex justify-between font-bold text-[11.5px]">
                                <span className="flex items-center gap-1.5 text-slate-700">🥤 Hidrasi</span>
                                <span className="text-emerald-700 font-extrabold text-[12.5px]">5 <span className="text-slate-400 font-normal text-[10px]">/ 8 gelas</span></span>
                              </div>
                              <div className="w-full h-2 bg-slate-200/80 rounded-full relative overflow-visible">
                                <div className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full" style={{ width: '62.5%' }}></div>
                                <div className="absolute top-0 w-2 h-2 bg-emerald-700 -mt-0.5 rotate-45" style={{ left: '60.5%' }}></div>
                              </div>
                            </div>

                            {/* 5. Aktivitas */}
                            <div className="space-y-1">
                              <div className="flex justify-between font-bold text-[11.5px]">
                                <span className="flex items-center gap-1.5 text-slate-700">🚶 Aktivitas</span>
                                <span className="text-emerald-700 font-extrabold text-[12.5px]">25 <span className="text-slate-400 font-normal text-[10px]">/ 30 menit</span></span>
                              </div>
                              <div className="w-full h-2 bg-slate-200/80 rounded-full relative overflow-visible">
                                <div className="h-full bg-gradient-to-r from-emerald-500 to-[#cbd52d] rounded-full" style={{ width: '83.3%' }}></div>
                                <div className="absolute top-0 w-2 h-2 bg-emerald-700 -mt-0.5 rotate-45" style={{ left: '81.3%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Feature Banners */}
                        <div className="px-5 space-y-4 text-left">
                          {/* Banner 1: AI Food Scanner Score */}
                          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200/40 p-5 rounded-3xl flex items-center justify-between shadow-sm relative overflow-hidden">
                            <div className="space-y-2.5 max-w-[65%] text-left">
                              <h4 className="text-[13px] font-black text-slate-800 leading-snug">Hasil Scan Gizi & Skor AI</h4>
                              <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">Lihat analisa skor GOOD, protein, karbo, & 307 Cal</p>
                              <button 
                                onClick={() => setNutrisiSubView('scan_result')}
                                className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-[9.5px] font-black rounded-lg uppercase tracking-wider transition flex items-center gap-1 relative overflow-visible group cursor-pointer"
                              >
                                <span>Lihat Skor Scan</span>
                                <Camera className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="w-16 h-16 shrink-0 bg-white rounded-2xl border border-slate-150 flex items-center justify-center p-2 shadow-sm overflow-hidden relative">
                              <img src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=100&q=80" alt="Salad" className="w-full h-full object-cover rounded-lg" />
                              <div className="absolute inset-2 border-2 border-emerald-400 border-dashed rounded-lg opacity-40 pointer-events-none"></div>
                            </div>
                          </div>

                          {/* Banner 2: Pantry AI & Menu Sehat */}
                          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200/40 p-5 rounded-3xl flex items-center justify-between shadow-sm relative overflow-hidden">
                            <div className="space-y-2.5 max-w-[65%] text-left">
                              <h4 className="text-[13px] font-black text-slate-800 leading-snug">Pantry AI & Menu Sehat</h4>
                              <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">Racik menu sehat dari stok bahan di kulkasmu</p>
                              <button 
                                onClick={() => setNutrisiSubView('pantry')}
                                className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-[9.5px] font-black rounded-lg uppercase tracking-wider transition flex items-center gap-1 relative overflow-visible group cursor-pointer"
                              >
                                <span>Buka Pantry AI</span>
                                <Brain className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="w-16 h-16 shrink-0 bg-white rounded-2xl border border-slate-150 flex items-center justify-center p-1.5 shadow-sm overflow-hidden relative">
                              <img src="/images/maskot cekat normal.png" alt="Ceko Mascot" className="w-full h-full object-contain" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* View: Scan Camera – Live Camera */}
                    {nutrisiSubView === 'scan_camera' && (
                      <div className="flex-1 flex flex-col justify-between bg-slate-900 text-white relative min-h-[600px]">
                        {/* Hidden canvas for capture */}
                        <canvas ref={canvasRef} className="hidden" />
                        {/* Hidden file input for gallery */}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleGalleryFile}
                        />

                        {/* Flash overlay */}
                        {flashActive && <div className="absolute inset-0 bg-white z-50 pointer-events-none" />}

                        {/* Top bar */}
                        <div className="absolute top-0 left-0 w-full px-5 py-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent z-20">
                          <button
                            onClick={() => { stopCameraImmediate(); setNutrisiSubView('main'); }}
                            className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition"
                          >
                            <ArrowLeft className="w-5 h-5 text-white" />
                          </button>
                          {/* Camera label with facing indicator */}
                          <div className="flex flex-col items-center">
                            <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Scan Makananmu</span>
                            <span className="text-[8px] text-white/50 font-semibold">
                              {facingMode === 'user' ? '📷 Kamera Depan' : '📷 Kamera Belakang'}
                            </span>
                          </div>
                          {/* Flip camera button */}
                          <button
                            onClick={flipCamera}
                            className="p-1.5 bg-white/10 hover:bg-white/20 active:scale-90 rounded-full transition"
                            title="Ganti Kamera"
                          >
                            <RotateCcw className="w-4 h-4 text-white" />
                          </button>
                        </div>

                        {/* Viewfinder: live video OR error state */}
                        <div className="flex-1 w-full relative overflow-hidden flex items-center justify-center bg-black">
                          {cameraError ? (
                            <div className="flex flex-col items-center justify-center space-y-4 px-8 text-center">
                              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
                                <Camera className="w-8 h-8 text-slate-500" />
                              </div>
                              <p className="text-xs text-slate-400 font-semibold leading-relaxed">{cameraError}</p>
                              <button
                                onClick={() => fileInputRef.current?.click()}
                                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-black uppercase tracking-wider"
                              >
                                Pilih dari Galeri
                              </button>
                            </div>
                          ) : (
                            <video
                              ref={videoRef}
                              autoPlay
                              playsInline
                              muted
                              // Mirror horizontally when using front camera (selfie mode)
                              style={facingMode === 'user' ? { transform: 'scaleX(-1)' } : {}}
                              className="w-full h-full object-cover"
                            />
                          )}

                          {/* Corner crosshairs viewport */}
                          {!cameraError && (
                            <div className="absolute w-56 h-56 rounded-3xl flex items-center justify-center pointer-events-none">
                              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-2xl"></div>
                              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-2xl"></div>
                              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-2xl"></div>
                              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-2xl"></div>
                              <span className="text-[9px] font-black text-white/60 uppercase tracking-widest">Arahkan ke makanan</span>
                            </div>
                          )}

                          {/* Scanning overlay */}
                          {isScanning && (
                            <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-4 z-30">
                              <div className="relative">
                                <Activity className="w-14 h-14 text-emerald-400 animate-pulse" />
                                <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-ping" />
                              </div>
                              <span className="text-xs font-black text-emerald-300 uppercase tracking-widest animate-pulse">AI sedang menganalisis...</span>
                              <span className="text-[9px] text-emerald-500 font-semibold">Menghitung kalori, protein & nutrisi</span>
                            </div>
                          )}
                        </div>

                        {/* Shutter bar */}
                        <div className="px-6 py-8 bg-gradient-to-t from-slate-950 via-slate-900/95 to-transparent flex items-center justify-center gap-10 z-20">
                          {/* Gallery */}
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-12 h-12 rounded-2xl border border-white/20 bg-white/10 flex flex-col items-center justify-center hover:bg-white/20 transition gap-0.5"
                          >
                            <Compass className="w-5 h-5 text-white" />
                            <span className="text-[7px] text-white/60 font-bold uppercase">Galeri</span>
                          </button>

                          {/* Shutter button */}
                          <button
                            onClick={capturePhoto}
                            disabled={!!cameraError || isScanning}
                            className="w-18 h-18 w-[72px] h-[72px] rounded-full bg-white border-4 border-emerald-500 flex items-center justify-center shadow-2xl active:scale-90 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <div className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center transition">
                              <Camera className="w-7 h-7 text-white" />
                            </div>
                          </button>

                          {/* Flash toggle */}
                          <button
                            onClick={() => setFlashActive(f => !f)}
                            className={`w-12 h-12 rounded-2xl border flex flex-col items-center justify-center transition gap-0.5 ${
                              flashActive ? 'border-yellow-400 bg-yellow-400/20' : 'border-white/20 bg-white/10 hover:bg-white/20'
                            }`}
                          >
                            <Zap className={`w-5 h-5 ${flashActive ? 'text-yellow-400' : 'text-white'}`} />
                            <span className="text-[7px] text-white/60 font-bold uppercase">Flash</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* View: Scan Result Details */}
                    {nutrisiSubView === 'scan_result' && (
                      <div className="flex-1 bg-white flex flex-col justify-between animate-fadeIn min-h-[600px] text-slate-800">
                        {/* Header */}
                        <div className="bg-white border-b border-slate-100 px-6 pt-8 pb-4 flex items-center justify-between">
                          <button onClick={() => setNutrisiSubView('scan_camera')} className="p-1 hover:bg-slate-100 rounded-full transition">
                            <ArrowLeft className="w-5 h-5 text-slate-800" />
                          </button>
                          <span className="text-xs font-black text-emerald-800 uppercase tracking-wider block">Cekat Scan</span>
                          <div className="w-7"></div>
                        </div>

                        {/* Top Card Image & Score */}
                        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
                          <div className="relative aspect-video rounded-3xl overflow-hidden shadow border border-slate-100 bg-slate-900">
                            <img 
                              src={capturedImageUrl || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'} 
                              alt="Scanned Food" 
                              className="w-full h-full object-cover"
                            />
                            {/* Score circular badge */}
                            <div className={`absolute bottom-3 right-3 px-3 py-2 rounded-2xl border-2 border-white flex flex-col items-center justify-center shadow-lg text-white ${
                              (aiScanResult?.health_verdict || 'Healthy').toLowerCase() === 'healthy' ? 'bg-emerald-500' :
                              (aiScanResult?.health_verdict || '').toLowerCase() === 'moderate' ? 'bg-amber-500' : 'bg-rose-500'
                            }`}>
                              <span className="text-[7.5px] font-bold block uppercase leading-none">VERDICT:</span>
                              <span className="text-[11px] font-black block uppercase leading-none mt-0.5">
                                {aiScanResult?.health_verdict || 'SEHAT'}
                              </span>
                            </div>
                          </div>

                          {/* Food Name & Star feedback text */}
                          <div className="text-center space-y-1.5 px-2">
                            <h3 className="text-base font-black text-slate-900 leading-snug">
                              {aiScanResult?.food_name || 'Nasi Goreng Spesial'}
                            </h3>
                            <div className="flex justify-center space-x-1 text-yellow-400">
                              <Star className="w-4 h-4 fill-yellow-400" />
                              <Star className="w-4 h-4 fill-yellow-400" />
                              <Star className="w-4 h-4 fill-yellow-400" />
                              <Star className="w-4 h-4 fill-yellow-400" />
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            </div>
                            <p className="text-[11px] leading-relaxed text-slate-600 font-semibold px-2 pt-1">
                              {aiScanResult?.ai_notes || 'Porsi makanan seimbang dengan karbohidrat dan protein yang baik.'}
                            </p>
                          </div>

                          {/* Macro circles list */}
                          <div className="space-y-3 text-left">
                            <span className="text-[10px] text-slate-400 font-black tracking-widest uppercase block px-1">HASIL ANALISIS GIZI:</span>
                            
                            <div className="grid grid-cols-3 gap-2.5 text-center">
                              {/* Protein */}
                              <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-2.5 flex flex-col items-center justify-center space-y-1 shadow-xs">
                                <div className="w-11 h-11 rounded-full border-2 border-emerald-500 flex flex-col items-center justify-center font-black text-[11px] text-emerald-900 bg-white">
                                  <span>{aiScanResult?.protein_g ? `${aiScanResult.protein_g}g` : '24g'}</span>
                                </div>
                                <span className="text-[9.5px] font-extrabold text-emerald-800 uppercase tracking-wide">Protein</span>
                              </div>

                              {/* Carbs */}
                              <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-2.5 flex flex-col items-center justify-center space-y-1 shadow-xs">
                                <div className="w-11 h-11 rounded-full border-2 border-amber-500 flex flex-col items-center justify-center font-black text-[11px] text-amber-900 bg-white">
                                  <span>{aiScanResult?.carbs_g ? `${aiScanResult.carbs_g}g` : '58g'}</span>
                                </div>
                                <span className="text-[9.5px] font-extrabold text-amber-800 uppercase tracking-wide">Carbo</span>
                              </div>

                              {/* Fat */}
                              <div className="bg-rose-50/60 border border-rose-100 rounded-2xl p-2.5 flex flex-col items-center justify-center space-y-1 shadow-xs">
                                <div className="w-11 h-11 rounded-full border-2 border-rose-500 flex flex-col items-center justify-center font-black text-[11px] text-rose-900 bg-white">
                                  <span>{aiScanResult?.fat_g ? `${aiScanResult.fat_g}g` : '18g'}</span>
                                </div>
                                <span className="text-[9.5px] font-extrabold text-rose-800 uppercase tracking-wide">Fat</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Total Button & Save CTA */}
                        <div className="px-5 py-5 bg-slate-50 border-t border-slate-100 space-y-3">
                          <div className="w-full py-3 bg-[#fdf2e9] border border-[#f5c299] text-[#e67e22] text-xs font-black rounded-xl uppercase tracking-wider flex items-center justify-center gap-2">
                            <span>🔥</span>
                            <span>{aiScanResult?.calories || 520} CALORIES</span>
                          </div>
                          
                          <button 
                            onClick={handleSaveScanResult}
                            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl uppercase tracking-wider shadow-sm transition active:scale-98"
                          >
                            Simpan ke Log Harian
                          </button>
                        </div>
                      </div>
                    )}

                    {/* View: Charts & IMT Calculator */}
                    {nutrisiSubView === 'charts' && (
                      <div className="space-y-6 animate-fadeIn">
                        <div className="bg-white border-b border-slate-100 px-6 pt-8 pb-4 flex items-center justify-between">
                          <button onClick={() => setNutrisiSubView('main')} className="p-1 hover:bg-slate-100 rounded-full transition">
                            <ArrowLeft className="w-5 h-5 text-slate-800" />
                          </button>
                          <span className="text-sm font-black text-slate-800 uppercase tracking-wider">Statistik Nutrisi</span>
                          <div className="w-7"></div>
                        </div>

                        <div className="px-5 space-y-6 text-left">
                          
                          {/* 1. Bar Chart Nutrisi */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-black text-slate-850">Nutrisi</h4>
                            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm text-center">
                              <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider mb-4">Minggu Ini • Pilihan Gizi Harian</span>
                              
                              {/* Stacked Pills Chart */}
                              <div className="flex justify-between items-end h-44 px-2 pb-1 border-b border-slate-100">
                                {[
                                  { day: 'S', cal: '1543', carb: '167 C', prot: '57 P', fat: '42 F', color: 'emerald' },
                                  { day: 'S', cal: '1112', carb: '37 C', prot: '52 P', fat: '46 F', color: 'emerald' },
                                  { day: 'R', cal: '1478', carb: '68 C', prot: '124 P', fat: '42 F', color: 'emerald' },
                                  { day: 'K', cal: '1978', carb: '68 C', prot: '112 P', fat: '67 F', color: 'yellow' },
                                  { day: 'J', cal: '1089', carb: '34 C', prot: '42 P', fat: '32 F', color: 'emerald' },
                                  { day: 'S', cal: '1267', carb: '88 C', prot: '115 P', fat: '32 F', color: 'yellow' },
                                  { day: 'M', cal: '1300', carb: '35 C', prot: '134 P', fat: '32 F', color: 'rose' },
                                ].map((bar, i) => (
                                  <div key={i} className="flex flex-col items-center w-7 space-y-1">
                                    <span className="text-[7.5px] font-black text-slate-700 leading-none">{bar.cal}</span>
                                    <div className="w-[18px] flex flex-col justify-end rounded-full overflow-hidden border border-slate-200 bg-slate-50" style={{ height: bar.color === 'rose' ? '90px' : bar.color === 'yellow' ? '110px' : '80px' }}>
                                      <div className="bg-sky-400 text-white text-[5px] font-black text-center py-0.5" style={{ height: '35%' }}>{bar.carb}</div>
                                      <div className="bg-rose-400 text-white text-[5px] font-black text-center py-0.5" style={{ height: '35%' }}>{bar.prot}</div>
                                      <div className="bg-amber-400 text-white text-[5px] font-black text-center py-0.5" style={{ height: '30%' }}>{bar.fat}</div>
                                    </div>
                                    <span className="text-[8px] font-bold text-slate-400">{bar.day}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="flex justify-center space-x-4 pt-3 text-[8.5px] font-black text-slate-400 uppercase tracking-wider">
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Karbohidrat</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-450"></span> Protein</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Lemak</span>
                              </div>
                            </div>
                          </div>

                          {/* 2. Hitung IMT Calculator */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-black text-slate-850">Hitung IMT</h4>
                            <span className="text-[9.5px] text-slate-400 font-semibold block px-1 -mt-1 text-left">Indeks Massa Tubuh</span>
                            
                            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-3.5 text-center">
                              <div className="grid grid-cols-2 gap-3 text-xs font-bold">
                                <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between text-slate-400 gap-1.5">
                                  <span className="shrink-0 text-[10px]">BB (kg):</span>
                                  <input 
                                    type="number"
                                    value={weightInput}
                                    onChange={(e) => setWeightInput(e.target.value)}
                                    className="w-12 bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-800 text-[10px] font-black focus:outline-none"
                                  />
                                </div>
                                <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between text-slate-400 gap-1.5">
                                  <span className="shrink-0 text-[10px]">TB (m):</span>
                                  <input 
                                    type="number"
                                    step="0.01"
                                    value={heightInput}
                                    onChange={(e) => setHeightInput(e.target.value)}
                                    className="w-12 bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-800 text-[10px] font-black focus:outline-none"
                                  />
                                </div>
                              </div>

                              <button 
                                onClick={calculateBmi}
                                className="w-full py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-[10.5px] font-black rounded-xl uppercase tracking-wider transition active:scale-95 shadow-sm"
                              >
                                Hasil IMT
                              </button>

                              <div className={`p-3 border text-xs font-black rounded-2xl ${
                                bmiCategory === 'Kurus' 
                                  ? 'bg-amber-50 border-amber-250 text-amber-800' 
                                  : bmiCategory === 'Normal' 
                                  ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                                  : 'bg-rose-50 border-rose-250 text-rose-800'
                              }`}>
                                IMT = {bmiValue} ({bmiCategory === 'Kurus' ? 'Kekurangan Berat Badan' : bmiCategory === 'Normal' ? 'Berat Badan Normal' : 'Kelebihan Berat Badan'})
                              </div>

                              {/* Slider Kurus, Normal, Gemuk */}
                              <div className="space-y-1.5 pt-2">
                                <div className="w-full h-2 bg-gradient-to-r from-sky-400 via-emerald-400 to-rose-450 rounded-full relative">
                                  <div 
                                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-800 rounded-full shadow transition-all duration-300" 
                                    style={{ 
                                      left: bmiCategory === 'Kurus' 
                                        ? '15%' 
                                        : bmiCategory === 'Normal' 
                                        ? '50%' 
                                        : '85%' 
                                    }}
                                  ></div>
                                </div>
                                <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">
                                  <span>Kurus</span>
                                  <span>Normal</span>
                                  <span>Gemuk</span>
                                </div>
                              </div>

                              {/* Alert IMT */}
                              <div className={`p-3 border rounded-2xl flex items-start gap-2.5 text-left ${
                                bmiCategory === 'Kurus' 
                                  ? 'bg-amber-50 border-amber-200 text-amber-850' 
                                  : bmiCategory === 'Normal' 
                                  ? 'bg-emerald-50 border-emerald-100 text-emerald-855' 
                                  : 'bg-rose-50 border-rose-200 text-rose-850'
                              }`}>
                                <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${
                                  bmiCategory === 'Kurus' ? 'text-amber-500' : bmiCategory === 'Normal' ? 'text-emerald-500' : 'text-rose-500'
                                }`} />
                                <div className="text-[10px] font-semibold leading-relaxed">
                                  <strong className="text-slate-850 block font-black text-left">
                                    Massa Tubuhmu memasuki kategori {bmiCategory}
                                  </strong>
                                  {bmiCategory === 'Kurus' && 'Yuk, tingkatkan asupan nutrisi agar berat badan naik secara sehat!'}
                                  {bmiCategory === 'Normal' && 'Luar biasa! Pertahankan pola makan gizi seimbang Anda.'}
                                  {bmiCategory === 'Gemuk' && 'Batasi asupan lemak/gula harian dan tingkatkan aktivitas fisik Anda.'}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 3. Zat Besi Line Chart */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-black text-slate-850">Zat Besi</h4>
                            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm text-center">
                              {/* Line chart simulation */}
                              <div className="h-32 flex items-end justify-center pb-2 relative border-b border-slate-100">
                                {/* SVG Line */}
                                <svg viewBox="0 0 100 50" className="w-full h-full text-blue-500 overflow-visible absolute inset-0">
                                  <path d="M5,40 L20,38 L38,15 L55,25 L75,32 L95,35" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                </svg>
                              </div>
                              <div className="flex justify-between text-[8px] font-bold text-slate-400 pt-2 px-1">
                                <span>Sen</span>
                                <span>Sel</span>
                                <span>Rab</span>
                                <span>Kam</span>
                                <span>Jum</span>
                                <span>Sab</span>
                                <span>Min</span>
                              </div>

                              {/* Alert zat besi kurang */}
                              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-left text-amber-850">
                                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                                <div className="text-[10px] font-semibold leading-relaxed">
                                  <strong className="text-slate-850 block font-black text-left">Zat Besi kamu masih kurang hari ini.</strong>
                                  Kekurangan zat besi dapat menyebabkan lesu & anemia. <button onClick={() => showToast('Membuka panduan pencegahan anemia...', 'info')} className="text-blue-600 underline font-black">Cara Mencegah Anemia</button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 4. Cairan Hydration bar chart */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-black text-slate-850">Cairan</h4>
                            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm text-center">
                              {/* Hydration progress bars */}
                              <div className="flex justify-between items-end h-24 px-2 pb-1 border-b border-slate-100">
                                <div className="w-3.5 h-16 bg-sky-400 rounded-t-sm" />
                                <div className="w-3.5 h-20 bg-sky-400 rounded-t-sm" />
                                <div className="w-3.5 h-24 bg-sky-400 rounded-t-sm" />
                                <div className="w-3.5 h-24 bg-sky-400 rounded-t-sm" />
                                <div className="w-3.5 h-16 bg-sky-400 rounded-t-sm" />
                                <div className="w-3.5 h-12 bg-sky-300 rounded-t-sm" />
                                <div className="w-3.5 h-8 bg-sky-300 rounded-t-sm" />
                              </div>

                              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-2.5 text-left text-emerald-800 mt-4 shadow-inner">
                                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                                <p className="text-[10px] leading-relaxed font-semibold">
                                  Asupan cairanmu sangat baik, jangan lewatkan minum air dan tetap terhidrasi ya!
                                </p>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    )}

                    {/* ════════════════════════════════════════
                        View: Scan Result View (Score GOOD & Analysis 307 Cal)
                    ════════════════════════════════════════ */}
                    {nutrisiSubView === 'scan_result' && (
                      <div className="space-y-4 animate-fadeIn pb-24 bg-slate-100 min-h-screen">
                        {/* Top Photo Header Container */}
                        <div className="relative w-full aspect-[4/3] bg-slate-900 overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80" 
                            alt="Salad Bowl" 
                            className="w-full h-full object-cover" 
                          />
                          {/* Overlay Controls */}
                          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                            <button 
                              onClick={() => setNutrisiSubView('main')} 
                              className="w-9 h-9 rounded-full bg-slate-900/50 backdrop-blur-md text-white flex items-center justify-center font-bold"
                            >
                              <ArrowLeft className="w-5 h-5" />
                            </button>
                            <img 
                              src="/images/logo full cekat station.png" 
                              alt="CEKAT Logo" 
                              className="h-8 object-contain drop-shadow-md" 
                            />
                            <div className="w-9 h-9 rounded-full bg-slate-900/50 backdrop-blur-md text-white flex items-center justify-center font-bold text-xs">
                              •••
                            </div>
                          </div>
                        </div>

                        {/* White Sheet Modal Container */}
                        <div className="bg-white -mt-6 rounded-t-[32px] p-6 shadow-xl space-y-5 text-center relative z-20 max-w-lg mx-auto border-t border-slate-200">
                          {/* Drag handle */}
                          <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto -mt-2 mb-2" />

                          {/* SCORE BADGE CIRCLE */}
                          <div className="w-28 h-28 rounded-full bg-[#86EFAC] border-4 border-emerald-300 flex flex-col items-center justify-center mx-auto shadow-md">
                            <span className="text-[10px] font-black tracking-widest text-slate-800 uppercase">SCORE:</span>
                            <span className="text-xl font-black text-slate-950 tracking-tight uppercase">GOOD</span>
                          </div>

                          {/* STAR RATING */}
                          <div className="flex justify-center space-x-1 text-amber-400 text-lg">
                            <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-slate-300">☆</span>
                          </div>

                          {/* RECOMMENDATION TEXT */}
                          <p className="text-xs font-semibold text-slate-700 max-w-xs mx-auto leading-relaxed">
                            Saladnya sudah sehat! bisa ditambahkan telur atau alpukat supaya gizinya makin seimbang.
                          </p>

                          {/* DASHED SEPARATOR */}
                          <div className="border-t-2 border-dashed border-slate-300 pt-4">
                            <h4 className="text-xs font-black text-slate-900 tracking-widest uppercase mb-4">ANALYSIS:</h4>

                            {/* 3 ANALYSIS CIRCLES */}
                            <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                              {/* Circle 1: Protein */}
                              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border-2 border-slate-800 flex flex-col items-center justify-center mx-auto p-1 text-center bg-white shadow-xs">
                                <span className="text-lg leading-none">🍗</span>
                                <span className="text-[11px] font-black text-slate-900 mt-0.5">70 Cal</span>
                                <span className="text-[8px] font-bold text-slate-500 uppercase">Protein</span>
                              </div>

                              {/* Circle 2: Carbo */}
                              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border-2 border-slate-800 flex flex-col items-center justify-center mx-auto p-1 text-center bg-white shadow-xs">
                                <span className="text-lg leading-none">🍞</span>
                                <span className="text-[11px] font-black text-slate-900 mt-0.5">155 Cal</span>
                                <span className="text-[8px] font-bold text-slate-500 uppercase">Carbo</span>
                              </div>

                              {/* Circle 3: Fat */}
                              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border-2 border-slate-800 flex flex-col items-center justify-center mx-auto p-1 text-center bg-white shadow-xs">
                                <span className="text-lg leading-none">🧀</span>
                                <span className="text-[11px] font-black text-slate-900 mt-0.5">80 Cal</span>
                                <span className="text-[8px] font-bold text-slate-500 uppercase">Fat</span>
                              </div>
                            </div>
                          </div>

                          {/* TOTAL CALORIES ORANGE BADGE */}
                          <div className="w-full py-3.5 px-6 rounded-full bg-[#FED7AA] border border-orange-300 flex items-center justify-between max-w-xs mx-auto shadow-sm">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">🔥</span>
                              <span className="text-xl font-black text-slate-950 tracking-wider">307</span>
                            </div>
                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Calories</span>
                          </div>

                          <button 
                            onClick={() => {
                              showToast('Hasil Scan Berhasil Disimpan ke Log Harian!', 'success');
                              setNutrisiSubView('main');
                            }}
                            className="w-full py-3 rounded-2xl bg-[#00875A] hover:bg-[#00704a] text-white font-black text-xs uppercase tracking-wider shadow-md transition"
                          >
                            Simpan ke Diary Makanan
                          </button>
                        </div>
                      </div>
                    )}

                    {/* View: Pantry AI Recipe search & grid (EXACT IMAGE 2 REPLICA) */}
                    {nutrisiSubView === 'pantry' && (
                      <div className="space-y-4 animate-fadeIn pb-24 bg-white min-h-screen">
                        
                        {/* GREEN HEADER BANNER MATCHING IMAGE 2 */}
                        <div className="bg-gradient-to-r from-[#00875A] to-[#10B981] p-5 pt-8 rounded-b-[32px] text-white relative shadow-md overflow-hidden">
                          <div className="flex items-center justify-between mb-2">
                            <button onClick={() => setNutrisiSubView('main')} className="p-1.5 bg-white/20 rounded-full transition">
                              <ArrowLeft className="w-5 h-5 text-white" />
                            </button>
                            <img src="/images/logo full cekat station.png" alt="CEKAT Logo" className="h-7 object-contain drop-shadow" />
                            <div className="text-white font-bold text-xs">•••</div>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <div className="space-y-0.5">
                              <h3 className="text-xl font-black text-white tracking-tight leading-tight">
                                Pantry AI &<br />Menu Sehat
                              </h3>
                            </div>
                            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center p-1.5 border border-white/20 shadow-inner">
                              <span className="text-4xl">🥗</span>
                            </div>
                          </div>
                        </div>

                        <div className="px-4 space-y-4 text-left">
                          
                          {/* APA ISI KULKASMU */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-black text-slate-900">Apa isi kulkasmu?</h4>
                            <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none py-1">
                              {['Telur', 'Ikan', 'Ayam', 'Sayur'].map(tag => {
                                const isSelected = selectedPantryTags.includes(tag);
                                return (
                                  <button
                                    key={tag}
                                    onClick={() => {
                                      if (isSelected) {
                                        setSelectedPantryTags(selectedPantryTags.filter(t => t !== tag));
                                      } else {
                                        setSelectedPantryTags([...selectedPantryTags, tag]);
                                      }
                                    }}
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1.5 border transition shrink-0 ${
                                      isSelected
                                        ? 'bg-slate-200 border-slate-300 text-slate-900'
                                        : 'bg-slate-100 border-slate-200 text-slate-700'
                                    }`}
                                  >
                                    <span>{tag === 'Telur' ? '🥚' : tag === 'Ikan' ? '🐟' : tag === 'Ayam' ? '🍗' : '🥦'}</span>
                                    <span>{tag}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* SEARCH BAR */}
                          <div className="flex bg-slate-100 rounded-full items-center px-4 py-2.5 text-xs font-medium border border-slate-200 shadow-inner">
                            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                            <input 
                              type="text" 
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Telusuri..." 
                              className="bg-transparent focus:outline-none flex-1 text-slate-900 font-semibold placeholder:text-slate-400"
                            />
                          </div>

                          {/* CATEGORY FILTERS */}
                          <div className="flex overflow-x-auto space-x-2 text-xs font-bold text-slate-600 scrollbar-none pb-1">
                            {['Semua', 'Ikan', 'Ayam', 'Telur', 'Sayur', 'Daging'].map(cat => {
                              const isActive = pantryCategory === cat;
                              return (
                                <button
                                  key={cat}
                                  onClick={() => setPantryCategory(cat)}
                                  className={`px-4 py-1.5 rounded-full shrink-0 border transition ${
                                    isActive
                                      ? 'bg-slate-900 border-slate-900 text-white font-black'
                                      : 'bg-white border-slate-200 text-slate-600'
                                  }`}
                                >
                                  {cat}
                                </button>
                              );
                            })}
                          </div>

                          {/* RECIPE GRID - 2 COLUMNS (EXACT MATCH IMAGE 2) */}
                          <div className="grid grid-cols-2 gap-3.5 pt-1">
                            {filteredRecipes.map((recipe, index) => (
                              <div 
                                key={index}
                                onClick={() => {
                                  showToast('Membuka resep ' + recipe.name + '...', 'info');
                                }}
                                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                              >
                                <div className="space-y-2">
                                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                                    <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                                    <h5 className="absolute bottom-2 left-2 right-2 text-xs font-black text-white leading-tight drop-shadow">
                                      {recipe.name}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                        </div>
                      </div>
                    )}


                  </div>
                )}

                {/* ════════════════════════════════════════
                    View: Mitos Vs Fakta
                ════════════════════════════════════════ */}
                {dashboardSubView === 'mitos_fakta' && (
                  <div className="space-y-0 text-left pb-24 animate-fadeIn bg-white min-h-screen">
                    {/* Header Banner */}
                    <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-yellow-500/80 text-white px-5 pt-8 pb-8 relative rounded-b-[32px] shadow-md overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                        <button onClick={() => setDashboardSubView('edukasi')} className="p-1 bg-white/10 hover:bg-white/20 rounded-full transition">
                          <ArrowLeft className="w-5 h-5 text-white" />
                        </button>
                        <span className="text-xs font-black uppercase tracking-widest text-white/90">Edukasi Kesehatan</span>
                        <div className="w-7"></div>
                      </div>
                      <div className="flex items-end justify-between gap-3">
                        <div className="flex-1">
                          <h1 className="text-[20px] font-black leading-tight tracking-tight mb-1">Mitos vs Fakta</h1>
                          <p className="text-[10px] text-white/80 font-semibold leading-relaxed">Jangan tertipu! Kenali mana yang benar tentang kesehatan PTM.</p>
                        </div>
                        <img src="/images/maskot cekat tanda tanya.png" alt="Ceko Maskot" className="w-20 h-24 object-contain shrink-0" />
                      </div>
                      {/* Decorative blobs */}
                      <div className="absolute -top-8 -right-8 w-36 h-36 bg-white/5 rounded-full" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400/10 rounded-full" />
                    </div>

                    {/* Mitos Fakta Cards */}
                    <div className="px-4 pt-5 space-y-4">
                      {[
                        {
                          mitos: '"Orang kurus tidak bisa kena hipertensi"',
                          fakta: 'Hipertensi bisa terjadi pada siapa pun, termasuk orang kurus. Faktor genetik, stres, dan pola makan lebih menentukan.',
                          tag: 'Hipertensi', tagColor: 'bg-red-500'
                        },
                        {
                          mitos: '"Gula darah tinggi hanya terjadi pada orang tua"',
                          fakta: 'Diabetes tipe 2 kini juga menyerang usia muda akibat pola makan tinggi gula dan kurang aktivitas fisik.',
                          tag: 'Diabetes', tagColor: 'bg-orange-500'
                        },
                        {
                          mitos: '"Minum air dingin bikin gemuk"',
                          fakta: 'Air tidak mengandung kalori sama sekali. Suhu air tidak mempengaruhi berat badan. Minum cukup air justru membantu metabolisme.',
                          tag: 'Nutrisi', tagColor: 'bg-blue-500'
                        },
                        {
                          mitos: '"Kolesterol tinggi hanya dari makanan berminyak"',
                          fakta: 'Kolesterol juga diproduksi oleh hati. Stres kronis, kurang tidur, dan faktor genetik turut meningkatkan kadar kolesterol.',
                          tag: 'Kolesterol', tagColor: 'bg-yellow-600'
                        },
                        {
                          mitos: '"Penyakit jantung hanya menyerang pria"',
                          fakta: 'Penyakit jantung adalah penyebab kematian no. 1 pada wanita. Perempuan justru sering salah diagnosis karena gejalanya berbeda.',
                          tag: 'Jantung', tagColor: 'bg-rose-500'
                        },
                        {
                          mitos: '"Olahraga berat sekali seminggu lebih efektif"',
                          fakta: 'WHO merekomendasikan 150 menit aktivitas sedang per minggu (dibagi beberapa sesi). Olahraga jarang tapi berat justru berisiko cedera.',
                          tag: 'Aktivitas', tagColor: 'bg-emerald-600'
                        },
                      ].map((item, i) => (
                        <div key={i} className="bg-[#f0fdf4] border border-[#86efac] rounded-2xl p-4 shadow-sm">
                          <span className={`text-[8px] font-black ${item.tagColor} text-white px-2 py-0.5 rounded-full`}>{item.tag}</span>
                          <div className="mt-3 space-y-2.5">
                            <div className="flex items-start gap-2.5">
                              <div className="shrink-0 mt-0.5">
                                <span className="text-[8.5px] font-black bg-red-500 text-white px-2.5 py-1 rounded-lg block">MITOS</span>
                              </div>
                              <p className="text-[11px] font-bold text-slate-700 leading-snug italic">{item.mitos}</p>
                            </div>
                            <div className="h-px bg-emerald-200" />
                            <div className="flex items-start gap-2.5">
                              <div className="shrink-0 mt-0.5">
                                <span className="text-[8.5px] font-black bg-emerald-500 text-white px-2.5 py-1 rounded-lg block">FAKTA</span>
                              </div>
                              <p className="text-[11px] font-semibold text-slate-800 leading-snug">{item.fakta}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Mascot CTA */}
                    <div className="mx-4 mt-5 bg-gradient-to-r from-emerald-50 to-yellow-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
                      <img src="/images/maskot cekat normal.png" alt="Ceko" className="w-12 h-14 object-contain shrink-0" />
                      <div>
                        <p className="text-[10.5px] font-black text-emerald-800 leading-snug">Mau tanya lebih lanjut?</p>
                        <p className="text-[9px] text-slate-500 font-semibold mt-0.5">Tanyakan ke Ceko AI, asisten kesehatan CEKAT!</p>
                        <button
                          onClick={() => setDashboardSubView('tanya_ai')}
                          className="mt-2 px-3 py-1.5 bg-emerald-600 text-white text-[9px] font-black rounded-lg"
                        >Tanya Ceko →</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ════════════════════════════════════════
                    View: Semua Artikel
                ════════════════════════════════════════ */}
                {dashboardSubView === 'artikel_list' && (
                  <div className="space-y-0 text-left pb-24 animate-fadeIn bg-white min-h-screen">
                    {/* Header Banner */}
                    <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-600 text-white px-5 pt-8 pb-6 relative rounded-b-[32px] shadow-md overflow-hidden">
                      <div className="flex items-center justify-between mb-3">
                        <button onClick={() => setDashboardSubView('edukasi')} className="p-1 bg-white/10 hover:bg-white/20 rounded-full transition">
                          <ArrowLeft className="w-5 h-5 text-white" />
                        </button>
                        <span className="text-xs font-black uppercase tracking-widest text-white/90">Artikel Pilihan</span>
                        <div className="w-7"></div>
                      </div>
                      <h1 className="text-[18px] font-black leading-tight tracking-tight mb-1">Artikel Kesehatan PTM</h1>
                      <p className="text-[10px] text-white/80 font-semibold">Bacaan terpercaya untuk hidup lebih sehat</p>
                      <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/5 rounded-full" />
                    </div>

                    {/* Search */}
                    <div className="px-4 pt-4 pb-2">
                      <div className="flex bg-slate-100 rounded-full items-center px-4 py-2.5 gap-2">
                        <Search className="w-4 h-4 text-slate-400 shrink-0" />
                        <input type="text" placeholder="Cari artikel..." className="bg-transparent focus:outline-none flex-1 text-[12px] font-semibold text-slate-700 placeholder:text-slate-400" />
                      </div>
                    </div>

                    {/* Artikel Grid */}
                    <div className="px-4 pt-2 pb-4 grid grid-cols-2 gap-3">
                      {[
                        { id: 'hipertensi', title: 'Kenali Hipertensi, Cegah Komplikasi', category: 'Hipertensi', readTime: '4 menit baca', points: 10, cover: '/images/cover_hipertensi.jpg' },
                        { id: 'stunting', title: 'Cegah Stunting Sejak Dini', category: 'Stunting', readTime: '5 menit baca', points: 10, cover: '/images/cover_stunting.jpg' },
                        { id: 'diabetes', title: 'Kendalikan Gula Darah Anda', category: 'Diabetes', readTime: '5 menit baca', points: 10, cover: '/images/cover_diabetes.jpg' },
                        { id: 'kolesterol', title: 'Turunkan Kolesterol Secara Alami', category: 'Kolesterol', readTime: '4 menit baca', points: 10, cover: '/images/cover_kolesterol.jpg' },
                        { id: 'ptm_prevention', title: 'Cegah PTM dari Sekarang!', category: 'Pencegahan', readTime: '6 menit baca', points: 15, cover: '/images/cover_ptm.jpg' },
                        { id: 'aktivitas', title: 'Olahraga Optimal untuk Usia 30+', category: 'Aktivitas', readTime: '4 menit baca', points: 10, cover: '/images/cover_aktivitas.jpg' },
                      ].map((art) => {
                        const catColors: Record<string,string> = { Hipertensi: 'bg-red-500', Stunting: 'bg-orange-500', Diabetes: 'bg-amber-500', Kolesterol: 'bg-yellow-600', Pencegahan: 'bg-emerald-600', Aktivitas: 'bg-blue-500' };
                        return (
                          <div
                            key={art.id}
                            onClick={() => {
                              const found = articlesData.find(a => a.id === art.id);
                              if (found) { setSelectedArticle(found); setDashboardSubView('article_detail'); }
                              else { setSelectedArticle({ id: art.id, title: art.title, category: art.category, description: '', readTime: art.readTime, date: '', author: '', points: art.points, content: `# ${art.title}\n\nArtikel lengkap segera hadir. Pantau terus pembaruan CEKAT!`, svgId: art.id }); setDashboardSubView('article_detail'); }
                            }}
                            className="bg-white rounded-2xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg active:scale-[0.98] transition duration-200"
                          >
                            {/* Cover Image */}
                            <div className="h-[96px] w-full relative overflow-hidden">
                              <img
                                src={art.cover}
                                alt={art.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                              <div className="absolute top-2 left-2">
                                <span className={`text-[7px] font-black ${catColors[art.category] || 'bg-slate-500'} text-white px-2 py-0.5 rounded-full shadow`}>{art.category}</span>
                              </div>
                            </div>
                            <div className="p-2.5">
                              <h4 className="text-[10px] font-black text-slate-900 leading-snug">{art.title}</h4>
                              <p className="text-[8px] text-slate-500 font-semibold mt-0.5">{art.readTime} • {art.points} poin</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* View: Gabung Webinar Kami (Webinar List) */}
                {dashboardSubView === 'webinar_list' && (

                  <div className="space-y-0 text-left pb-6 animate-fadeIn bg-white min-h-screen">
                    {/* Header Banner */}
                    <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-yellow-600/80 text-white px-5 pt-8 pb-5 relative rounded-b-[32px] shadow-md">
                      <div className="flex items-center justify-between mb-4">
                        <button onClick={() => setDashboardSubView('edukasi')} className="p-1 bg-white/10 hover:bg-white/20 rounded-full transition">
                          <ArrowLeft className="w-5 h-5 text-white" />
                        </button>
                        <span className="text-xs font-black uppercase tracking-widest text-white/90">Webinar Gizi</span>
                        <div className="w-7"></div>
                      </div>
                      
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h2 className="text-[20px] font-black leading-tight tracking-tight">Gabung Webinar Kami</h2>
                          <p className="text-[10px] text-emerald-100 font-bold mt-1">Dapatkan wawasan medis terpercaya dari para praktisi dan ahli gizi.</p>
                        </div>
                        <div className="w-16 h-16 shrink-0 bg-white/15 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white/10">
                          🎙️
                        </div>
                      </div>

                      {/* Subtabs Semua / Tersimpan */}
                      <div className="flex border-b border-white/20 mt-5 text-[11px] font-black text-white/70">
                        <span className="pb-2 px-3 border-b-2 border-white text-white font-extrabold cursor-pointer">Semua</span>
                        <span className="pb-2 px-3 cursor-pointer hover:text-white transition">Tersimpan</span>
                      </div>
                    </div>

                    {/* List of Webinars */}
                    <div className="mx-4 mt-5 space-y-3.5">
                      {[
                        {
                          id: 'webinar-1',
                          date: 'Minggu, 14 Feb 2026',
                          title: 'Teknologi dan Kearifan Lokal Kunci Tumbuh Kembang Optimal',
                          platform: 'Zoom Meeting',
                          image: 'https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?auto=format&fit=crop&w=150&q=80'
                        },
                        {
                          id: 'webinar-2',
                          date: 'Rabu, 7 Maret 2026',
                          title: 'Memahami Hubungan Antara Makanan dan Kesehatan Mental',
                          platform: 'Zoom Meeting',
                          image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=150&q=80'
                        },
                        {
                          id: 'webinar-3',
                          date: 'Sabtu, 28 April 2026',
                          title: 'Gizi Optimal, Budget Minimal Tips Belanja Cerdas dan Bergizi',
                          platform: 'Zoom Meeting',
                          image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=150&q=80'
                        },
                        {
                          id: 'webinar-4',
                          date: 'Senin, 11 Mei 2026',
                          title: 'Mengupas Fakta Ilmiah MSG dan Perannya Dalam Tubuh Manusia',
                          platform: 'Zoom Meeting',
                          image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=150&q=80'
                        },
                        {
                          id: 'webinar-5',
                          date: 'Kamis, 22 Juni 2026',
                          title: 'Menjadi Tenaga Kesehatan Yang Unggul dalam Gizi',
                          platform: 'Zoom Meeting',
                          image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=150&q=80'
                        }
                      ].map(webinar => (
                        <div 
                          key={webinar.id}
                          onClick={() => showToast('Mendaftar webinar: ' + webinar.title, 'success')}
                          className="bg-white border border-slate-150 rounded-2xl p-3 shadow-sm flex gap-3 cursor-pointer hover:shadow active:scale-[0.99] transition"
                        >
                          {/* Left poster */}
                          <div className="w-[84px] h-[96px] rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
                            <img src={webinar.image} alt={webinar.title} className="w-full h-full object-cover" />
                          </div>
                          {/* Right details */}
                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div className="space-y-1">
                              <span className="text-[8.5px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100 inline-block">
                                {webinar.date}
                              </span>
                              <h4 className="text-[10px] font-black text-slate-900 leading-snug line-clamp-2 text-left">{webinar.title}</h4>
                            </div>
                            <div className="flex items-center justify-between text-slate-400">
                              <div className="flex items-center gap-1">
                                <Camera className="w-3 h-3 text-slate-400" />
                                <span className="text-[8.5px] font-bold text-slate-500">{webinar.platform}</span>
                              </div>
                              <button onClick={(e) => { e.stopPropagation(); showToast('Membuka opsi webinar...', 'info'); }} className="p-0.5 hover:bg-slate-50 rounded transition text-slate-450">
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}                {/* -------------------------------------------------------------
                    TAB 3: CHALLENGE & GAMES
                    ------------------------------------------------------------- */}
                {activeTab === 'challenge' && (
                  <div className="flex-1 flex flex-col justify-between animate-fadeIn pb-20 bg-slate-50 min-h-screen">
                    
                    {/* View 1: Langkah Sehatmu */}
                    {challengeSubView === 'home' && (
                      <div className="space-y-5 text-left pb-6 animate-fadeIn">
                        {/* Header */}
                        <div className="bg-white border-b border-slate-100 px-5 pt-8 pb-4 flex items-center justify-between">
                          <button onClick={() => { setActiveTab('dashboard'); setDashboardSubView('home'); }} className="p-1.5 hover:bg-slate-50 rounded-full transition">
                            <ArrowLeft className="w-5 h-5 text-slate-800" />
                          </button>
                          <span className="text-[14px] font-black text-slate-900 tracking-tight">Langkah Sehatmu</span>
                          <button onClick={() => setChallengeSubView('misi')} className="p-1.5 hover:bg-slate-50 rounded-full text-emerald-600 transition flex items-center gap-0.5">
                            <span className="text-[10px] font-bold">Misi</span>
                            <ListTodo className="w-4 h-4 text-emerald-600" />
                          </button>
                        </div>

                        {/* Risiko Kesehatan Card */}
                        <div className="mx-4">
                          <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-3xl p-4 shadow-sm flex items-center justify-between">
                            <div className="space-y-2 max-w-[65%]">
                              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Hasil Cek Risiko Kesehatan</span>
                              <span className="text-[9.5px] font-semibold text-slate-500 block">30 Agustus 2026</span>
                              <div className="bg-red-50 border border-red-100 rounded-2xl p-2.5 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                                  <Heart className="w-4 h-4 fill-current" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-[9.5px] font-black text-slate-800 leading-tight">Risiko Hipertensi</p>
                                  <p className="text-[9px] font-black text-red-650 leading-tight mt-0.5">Risiko Anda: Tinggi</p>
                                </div>
                              </div>
                            </div>
                            {/* Graphic Clock/Heart */}
                            <div className="w-24 h-24 shrink-0 relative">
                              <svg viewBox="0 0 100 100" className="w-full h-full animate-pulse">
                                <circle cx="50" cy="50" r="42" fill="white" stroke="#e2e8f0" strokeWidth="3" />
                                <circle cx="50" cy="50" r="35" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4,4" />
                                <line x1="50" y1="50" x2="50" y2="28" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
                                <line x1="50" y1="50" x2="68" y2="50" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                                <rect x="36" y="55" width="28" height="28" rx="14" fill="#fee2e2" stroke="#fecdd3" strokeWidth="1" />
                                <path d="M50 76 C47 72,40 68,40 64 C40 61,42 59,44.5 61 C47 62.5,50 66,50 66 C50 66,53 62.5,55.5 61 C58 59,60 61,60 64 C60 68,53 72,50 76Z" fill="#ef4444" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Fokus Kamu Minggu Ini */}
                        <div className="mx-4">
                          <div className="bg-[#fef8e7] border border-[#fef3c7] rounded-3xl p-4 shadow-sm space-y-4">
                            <div>
                              <h4 className="text-[12.5px] font-black text-slate-900 leading-snug">Fokus Kamu Minggu Ini</h4>
                              <p className="text-[9px] font-bold text-amber-700 leading-tight mt-0.5">Pilih 2-3 langkah prioritas dan mulai perubahan kecil hari ini.</p>
                            </div>

                            <div className="space-y-2.5">
                              {focusTargets.map(target => (
                                <div 
                                  key={target.id}
                                  onClick={() => toggleFocus(target.id)}
                                  className="bg-white border border-slate-100 rounded-2xl p-3 flex items-center justify-between cursor-pointer active:scale-[0.99] transition shadow-sm"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg shrink-0">
                                      {target.id === 1 && '🥤'}
                                      {target.id === 2 && '🏃'}
                                      {target.id === 3 && '🥗'}
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-[10px] font-black text-slate-800 leading-tight">{target.text}</p>
                                      <p className="text-[8.5px] font-semibold text-slate-400 leading-tight mt-0.5">
                                        {target.id === 1 && 'Batasi konsumsi gula tambahan untuk jaga tekanan darah tetap stabil.'}
                                        {target.id === 2 && 'Contoh: jalan cepat, bersepeda, atau senam ringan.'}
                                        {target.id === 3 && 'Minimal setengah piring di setiap waktu makan.'}
                                      </p>
                                    </div>
                                  </div>
                                  <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition ${
                                    target.done 
                                      ? 'bg-emerald-600 border-emerald-600 text-white font-black' 
                                      : 'border-slate-350 bg-white'
                                  }`}>
                                    {target.done && '✓'}
                                  </div>
                                </div>
                              ))}
                            </div>

                            <button 
                              onClick={() => {
                                setChallengeSubView('misi');
                              }}
                              className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-[11px] rounded-xl shadow-md shadow-emerald-700/10 active:scale-98 transition flex items-center justify-center gap-1.5"
                            >
                              <Activity className="w-4 h-4" />
                              <span>Mulai Target</span>
                            </button>
                          </div>
                        </div>

                        {/* Pantau Perkembanganmu Progress Bar */}
                        <div className="mx-4">
                          <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-3xl p-4 shadow-sm flex items-center justify-between relative overflow-hidden">
                            <div className="space-y-3 flex-1">
                              <div>
                                <h4 className="text-[12.5px] font-black text-slate-900 leading-snug">Pantau Perkembanganmu</h4>
                                <p className="text-[9px] font-bold text-slate-500 leading-tight mt-0.5">Progres Minggu Ini</p>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-[9px] font-black text-slate-650">
                                  <span>2 dari 3 target tercapai</span>
                                  <span className="text-emerald-700 font-extrabold">66%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden relative">
                                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '66%' }}></div>
                                  <div className="absolute top-0 w-2 h-2 bg-emerald-700 -mt-0.5 rotate-45" style={{ left: '64%' }}></div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-end gap-1 shrink-0 ml-4">
                              <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl p-1.5 shadow-sm flex items-end justify-between shrink-0">
                                <div className="w-1.5 h-3 bg-slate-200 rounded-t-sm" />
                                <div className="w-1.5 h-5 bg-emerald-400 rounded-t-sm" />
                                <div className="w-1.5 h-7 bg-emerald-600 rounded-t-sm" />
                              </div>
                              <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shadow-xs overflow-hidden p-0.5 shrink-0">
                                <img src="/images/maskot cekat normal.png" alt="Ceko Mascot" className="w-full h-full object-contain" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* View 2: Challenge kamu / Misi Checklist */}
                    {challengeSubView === 'misi' && (
                      <div className="space-y-4 text-left pb-6 animate-fadeIn bg-slate-50 min-h-screen">
                        {/* Header */}
                        <div className="bg-white border-b border-slate-100 px-5 pt-8 pb-4 flex items-center justify-between">
                          <button onClick={() => setChallengeSubView('home')} className="p-1.5 hover:bg-slate-50 rounded-full transition">
                            <ArrowLeft className="w-5 h-5 text-slate-800" />
                          </button>
                          <span className="text-[15px] font-black text-slate-900 tracking-tight">Challenge kamu</span>
                          <div className="w-8" />
                        </div>

                        {/* 7-Day Healthy Challenge Banner */}
                        <div className="mx-4">
                          <div className="bg-gradient-to-br from-[#00875A] via-[#059669] to-[#047857] text-white rounded-3xl p-5 shadow-sm relative overflow-hidden flex items-center justify-between">
                            <div className="space-y-2.5 z-10 flex-1 pr-4">
                              <h4 className="text-[14px] font-black tracking-tight leading-tight">7-Day Healthy Challenge</h4>
                              <p className="text-[22px] font-extrabold text-[#cbd52d] leading-none mt-1">
                                {misiTargets.filter(t => t.done).length}/7 <span className="text-xs text-emerald-100 font-semibold">hari selesai</span>
                              </p>
                              {/* Progress bar */}
                              <div className="w-full h-2 bg-emerald-950/40 rounded-full overflow-hidden mt-3 relative">
                                <div className="h-full bg-[#cbd52d] rounded-full transition-all duration-300" style={{ width: `${(misiTargets.filter(t => t.done).length / 7) * 100}%` }}></div>
                              </div>
                            </div>
                            {/* Mascot on Right */}
                            <div className="w-16 h-16 shrink-0 bg-white/10 rounded-2xl flex items-center justify-center text-4xl shadow-inner border border-white/15 z-10">
                              🤖
                            </div>
                            {/* Decorative background blob */}
                            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>
                          </div>
                        </div>

                        {/* Misi Hari Ini Checklist Container */}
                        <div className="mx-4 bg-white border border-slate-150 rounded-3xl p-5 shadow-sm space-y-4">
                          <div className="flex items-center justify-between pb-1 border-b border-slate-50">
                            <span className="text-[13px] font-black text-slate-900 tracking-tight">Misi Hari Ini</span>
                            <button onClick={() => showToast('Memuat statistik misi...', 'info')} className="text-[10px] font-black text-emerald-700 hover:underline">
                              Lihat Hasil &gt;
                            </button>
                          </div>

                          <div className="space-y-3.5">
                            {misiTargets.map(target => (
                              <div 
                                key={target.id}
                                onClick={() => toggleMisi(target.id)}
                                className="flex items-center gap-3 cursor-pointer group select-none py-0.5"
                              >
                                {/* Check circle icon */}
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition shrink-0 ${
                                  target.done 
                                    ? 'bg-emerald-500 border-emerald-500 text-white text-[10px] font-black shadow-sm shadow-emerald-200' 
                                    : 'border-slate-350 bg-white group-hover:border-slate-400'
                                }`}>
                                  {target.done && '✓'}
                                </div>
                                <span className={`text-[11px] font-bold transition-all ${
                                  target.done 
                                    ? 'text-slate-400 line-through opacity-85' 
                                    : 'text-slate-700 font-extrabold'
                                }`}>
                                  {target.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Streak Kamu Banner */}
                        <div className="mx-4">
                          <div className="bg-gradient-to-r from-amber-50 to-[#fef9c3] border border-amber-200 p-5 rounded-3xl flex items-center justify-between shadow-sm relative overflow-hidden">
                            <div className="space-y-2 max-w-[65%] text-left z-10">
                              <h4 className="text-[13.5px] font-black text-slate-800 tracking-tight flex items-center gap-1">
                                <span>🔥</span>
                                <span>Streak Kamu</span>
                                <span>🔥</span>
                              </h4>
                              <p className="text-[14px] font-extrabold text-amber-700 leading-snug">5 hari berturut-turut</p>
                              <p className="text-[9px] text-slate-550 font-semibold leading-relaxed">
                                Pertahankan streakmu dan dapatkan hadiah menarik
                              </p>
                            </div>
                            {/* Gift Box Icon */}
                            <div className="w-16 h-16 shrink-0 bg-white rounded-2xl border border-slate-150 flex items-center justify-center text-4xl shadow-sm relative z-10">
                              🎁
                            </div>
                            {/* Decorative background blob */}
                            <div className="absolute right-3 bottom-3 w-5 h-5 rounded-full bg-emerald-55 border border-emerald-100 flex items-center justify-center text-xs shadow-sm z-20">
                              🤖
                            </div>
                          </div>
                        </div>
                      </div>
                    )}


                  </div>
                )}

                {/* -------------------------------------------------------------
                    TAB 4: RIWAYAT TIMELINE & WRAPPED
                    ------------------------------------------------------------- */}
                {activeTab === 'riwayat' && (
                  <div className="flex-1 flex flex-col justify-between animate-fadeIn pb-20 bg-slate-50 min-h-screen">
                    
                    {/* View 1: Timeline / Riwayat List */}
                    {riwayatSubView === 'home' && (
                      <div className="space-y-4 text-left pb-6 animate-fadeIn">
                        {/* Header */}
                        <div className="bg-white border-b border-slate-100 px-5 pt-8 pb-4 flex items-center justify-between">
                          <button onClick={() => { setActiveTab('dashboard'); setDashboardSubView('home'); }} className="p-1.5 hover:bg-slate-55 rounded-full transition">
                            <ArrowLeft className="w-5 h-5 text-slate-800" />
                          </button>
                          <span className="text-[16px] font-black text-slate-900 tracking-tight">Riwayat</span>
                          <button onClick={() => setRiwayatSubView('wrapped')} className="p-1.5 hover:bg-slate-55 rounded-full text-slate-700 transition">
                            <Trophy className="w-5 h-5 text-slate-700 hover:text-yellow-500 fill-current" />
                          </button>
                        </div>

                        {/* Scrollable category list */}
                        <div className="flex overflow-x-auto gap-2.5 pb-2 scrollbar-none px-4">
                          {['Semua', 'CEKAT Station', 'Nutrisi', 'My health progress', 'Riwayat Konsultasi'].map(cat => {
                            const isSelected = riwayatCategory === cat;
                            return (
                              <button
                                key={cat}
                                onClick={() => setRiwayatCategory(cat)}
                                className={`px-4 py-2 rounded-full text-[10.5px] font-black uppercase tracking-wider transition duration-150 shrink-0 border ${
                                  isSelected
                                    ? 'bg-[#cbd52d] border-[#cbd52d] text-slate-900 shadow-sm'
                                    : 'bg-white border-slate-150 text-slate-500 hover:bg-slate-50'
                                }`}
                              >
                                {cat}
                              </button>
                            );
                          })}
                        </div>

                        {/* Cards List filtered by category */}
                        <div className="mx-4 space-y-4">
                          
                          {/* 1. Hasil CEKAT Station Card */}
                          {(riwayatCategory === 'Semua' || riwayatCategory === 'CEKAT Station') && (
                            <div className="bg-white border border-slate-150 rounded-[32px] p-4 shadow-sm space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl shrink-0">
                                    🏥
                                  </div>
                                  <div className="min-w-0">
                                    <h4 className="text-[13px] font-black text-slate-900 leading-tight">Hasil CEKAT Station</h4>
                                    <p className="text-[9.5px] font-semibold text-slate-450 mt-0.5 leading-none">30 Agustus 2026 08.30</p>
                                    <p className="text-[9px] font-black text-slate-500 mt-1">Puskesmas Pembantu Ds. Ngabab</p>
                                  </div>
                                </div>
                                <div className="text-right space-y-1.5">
                                  <button onClick={() => showToast('Memuat detail hasil station...', 'info')} className="text-[9.5px] font-black text-slate-800 hover:underline block">
                                    Lihat Detail &gt;
                                  </button>
                                  <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 inline-block">
                                    Perlu Perhatian
                                  </span>
                                </div>
                              </div>

                              {/* Measurement grid 7 columns */}
                              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-inner">
                                <table className="w-full text-center text-[8.5px] font-black border-collapse">
                                  <thead>
                                    <tr className="bg-emerald-700 text-white border-b border-slate-200">
                                      <th className="py-2 px-1 border-r border-slate-200/50">TD</th>
                                      <th className="py-2 px-1 border-r border-slate-200/50">Gula Darah</th>
                                      <th className="py-2 px-1 border-r border-slate-200/50">HR</th>
                                      <th className="py-2 px-1 border-r border-slate-200/50">LP</th>
                                      <th className="py-2 px-1 border-r border-slate-200/50">TB</th>
                                      <th className="py-2 px-1 border-r border-slate-200/50">BB</th>
                                      <th className="py-2 px-1">IMT</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="bg-white text-slate-800">
                                      <td className="py-2.5 px-0.5 border-r border-slate-200">140/85 mmHg</td>
                                      <td className="py-2.5 px-0.5 border-r border-slate-200">85 mg/dL</td>
                                      <td className="py-2.5 px-0.5 border-r border-slate-200">60 bpm</td>
                                      <td className="py-2.5 px-0.5 border-r border-slate-200">83 cm</td>
                                      <td className="py-2.5 px-0.5 border-r border-slate-200">158 cm</td>
                                      <td className="py-2.5 px-0.5 border-r border-slate-200">60 kg</td>
                                      <td className="py-2.5 px-0.5 font-extrabold text-amber-700">24,03 kg/m²</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                          {/* 2. Nutrisi & Scan Makanan Card */}
                          {(riwayatCategory === 'Semua' || riwayatCategory === 'Nutrisi') && (
                            <div className="bg-white border border-slate-150 rounded-[32px] p-4 shadow-sm flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-150 overflow-hidden shrink-0 p-1 flex items-center justify-center">
                                  <img src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=80&q=80" alt="Salad" className="w-full h-full object-cover rounded-lg" />
                                </div>
                                <div className="min-w-0">
                                  <h4 className="text-[13px] font-black text-slate-900 leading-tight">Nutrisi & Scan Makanan</h4>
                                  <p className="text-[9.5px] font-semibold text-slate-450 mt-0.5 leading-none">30 Agustus 2026 08.30</p>
                                  <div className="flex items-center gap-2 mt-1.5">
                                    <span className="text-[10px] font-extrabold text-slate-700">Salad Ayam</span>
                                    <span className="text-[7.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                                      GOOD
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <span className="text-xs font-black text-slate-800 pr-2">307 kkal</span>
                            </div>
                          )}

                          {/* 3. My Health Progress Card */}
                          {(riwayatCategory === 'Semua' || riwayatCategory === 'My health progress') && (
                            <div className="bg-white border border-slate-150 rounded-[32px] p-4 shadow-sm flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl shrink-0">
                                  📅
                                </div>
                                <div className="min-w-0">
                                  <h4 className="text-[13px] font-black text-slate-900 leading-tight">My Health Progress</h4>
                                  <p className="text-[9.5px] font-semibold text-slate-450 mt-0.5 leading-none">30 Agustus 2026 08.30</p>
                                  <p className="text-[9.5px] font-bold text-slate-600 mt-2 leading-relaxed">
                                    Aktivitas = 1x/minggu &rarr; 4x/minggu <br />
                                    Healthy Challenge = 21/30 hari
                                  </p>
                                </div>
                              </div>
                              <button onClick={() => showToast('Memuat detail perkembangan gizi...', 'info')} className="text-[9.5px] font-black text-slate-800 hover:underline pr-2 shrink-0">
                                Lihat Detail &gt;
                              </button>
                            </div>
                          )}

                          {/* 4. Riwayat Konsultasi Card */}
                          {(riwayatCategory === 'Semua' || riwayatCategory === 'Riwayat Konsultasi') && (
                            <div className="bg-white border border-slate-150 rounded-[32px] p-4 shadow-sm flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl shrink-0">
                                  🩺
                                </div>
                                <div className="min-w-0">
                                  <h4 className="text-[13px] font-black text-slate-900 leading-tight">Riwayat Konsultasi</h4>
                                  <p className="text-[9.5px] font-semibold text-slate-450 mt-0.5 leading-none">30 Agustus 2026 08.30</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <span className="text-[10px] font-black text-slate-800">Dr. Nanda Amelia M.Gizi</span>
                                    <span className="text-red-500 font-extrabold text-[10px] bg-red-50 px-1.5 py-0.5 rounded border border-red-100 flex items-center gap-0.5 select-none scale-90">
                                      📄 PDF
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <button onClick={() => showToast('Mengunduh dokumen konsultasi PDF...', 'info')} className="text-[9.5px] font-black text-slate-800 hover:underline pr-2 shrink-0">
                                Lihat Detail &gt;
                              </button>
                            </div>
                          )}

                          {/* Yellow Submit button */}
                          <button 
                            onClick={() => showToast('Memuat riwayat kesehatan lengkap...', 'info')}
                            className="w-full py-3.5 bg-[#f1c40f] hover:bg-[#cbd52d]/90 text-slate-900 font-black text-[12px] rounded-xl shadow-md transition active:scale-95 flex items-center justify-center"
                          >
                            Lihat Semua Riwayat
                          </button>

                          {/* Cute Mascot footer overlay */}
                          <div className="flex justify-end pt-2 pr-1">
                            <button 
                              onClick={() => setDashboardSubView('tanya_ai')}
                              className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center shadow-md relative overflow-visible select-none hover:scale-105 active:scale-95 transition cursor-pointer"
                              title="Tanya Ceko AI"
                            >
                              <img src="/images/maskot cekat normal.png" alt="Ceko Mascot" className="w-12 h-14 object-contain" />
                              <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 text-white rounded-full flex items-center justify-center text-xs font-black shadow-md border-2 border-white">?</div>
                            </button>
                          </div>

                        </div>
                      </div>
                    )}

                    {/* View 2: Wrapped */}
                    {riwayatSubView === 'wrapped' && (
                      <div className="space-y-4 text-left pb-6 animate-fadeIn bg-slate-50 min-h-screen">
                        {/* Header Banner Confetti */}
                        <div className="bg-gradient-to-br from-yellow-500 via-[#10b981] to-emerald-800 text-white px-5 pt-8 pb-6 relative rounded-b-[36px] shadow-lg overflow-hidden">
                          {/* Sparkles / Confetti graphics */}
                          <div className="absolute top-2 left-6 text-xl opacity-60">🎉</div>
                          <div className="absolute top-4 right-10 text-xl opacity-60">✨</div>
                          <div className="absolute bottom-4 left-1/3 text-lg opacity-40">🌟</div>

                          <div className="flex items-center justify-between mb-4 z-10 relative">
                            <button onClick={() => setRiwayatSubView('home')} className="p-1 bg-white/10 hover:bg-white/20 rounded-full transition">
                              <ArrowLeft className="w-5 h-5 text-white" />
                            </button>
                            <span className="text-xs font-black uppercase tracking-widest text-[#fef9c3] scale-95">CEKAT Wrapped</span>
                            <button onClick={() => showToast('Fitur Wrapped akan segera hadir!', 'info')} className="p-1.5 hover:bg-white/10 rounded-full transition">
                              <MoreHorizontal className="w-5 h-5 text-white" />
                            </button>
                          </div>
                          
                          <div className="space-y-1 relative z-10 text-center">
                            <h2 className="text-[26px] font-black tracking-tight leading-none text-white">CEKAT Wrapped</h2>
                            <p className="text-[12px] text-yellow-200 font-black tracking-wide mt-2">Your 2026 Nutrition Journey</p>
                          </div>
                        </div>

                        {/* List of Wrapped Slide Cards */}
                        <div className="mx-4 mt-2 space-y-4">
                          
                          {/* Card 1: Top Makanan Favorit */}
                          <div className="bg-white border border-slate-150 rounded-[32px] p-5 shadow-sm space-y-3 text-left relative">
                            <h4 className="text-[13px] font-black text-slate-900 tracking-tight">Top 5 Makanan Favorit Kamu</h4>
                            <ol className="space-y-1.5 text-[11px] font-black text-slate-700 list-decimal pl-5">
                              <li>Salad Sayur</li>
                              <li>Nasi Campur</li>
                              <li>Nasi Goreng</li>
                              <li>Grill Steak</li>
                              <li>Omlet</li>
                            </ol>
                            <button onClick={() => showToast('Memuat detail makanan favorit...', 'info')} className="absolute bottom-4 right-4 text-slate-400 hover:text-slate-650">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Card 2: Nutriscore Balanced & girl illustration */}
                          <div className="bg-white border border-slate-150 rounded-[32px] p-5 shadow-sm text-center relative overflow-hidden">
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex-1 text-left space-y-2">
                                <h4 className="text-[11.5px] font-black text-slate-900 leading-tight">Selamat Skor Nutrisi kamu Tahun ini 80/100</h4>
                                <p className="text-[24px] font-black text-[#00875A] tracking-wider mt-1">BALANCED</p>
                              </div>
                              {/* Balance girl SVG illustration */}
                              <div className="w-24 h-24 shrink-0 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center p-2 overflow-hidden shadow-inner relative">
                                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-700">
                                  {/* Beam scale */}
                                  <line x1="10" y1="80" x2="90" y2="80" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
                                  <polygon points="50,80 40,95 60,95" fill="#64748b" />
                                  {/* Balanced bar */}
                                  <line x1="20" y1="55" x2="80" y2="55" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
                                  <circle cx="50" cy="55" r="5" fill="#f59e0b" />
                                  {/* Girl figure */}
                                  <circle cx="50" cy="35" r="6" fill="#f87171" />
                                  <line x1="50" y1="41" x2="50" y2="55" stroke="#f87171" strokeWidth="2.5" />
                                  {/* Balanced hands arms holding fruits */}
                                  <line x1="50" y1="44" x2="30" y2="40" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
                                  <line x1="50" y1="44" x2="70" y2="40" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
                                  {/* Fruit emojis (apple and orange) */}
                                  <circle cx="30" cy="37" r="3" fill="#ef4444" />
                                  <circle cx="70" cy="37" r="3" fill="#f97316" />
                                </svg>
                              </div>
                            </div>
                            <button onClick={() => showToast('Memuat detail skor nutrisi...', 'info')} className="absolute bottom-4 right-4 text-slate-400 hover:text-slate-650">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Card 3: Gula Turun */}
                          <div className="bg-white border border-slate-150 rounded-[32px] p-5 shadow-sm flex items-center justify-between text-left relative">
                            <div className="pr-4">
                              <p className="text-[12px] font-black text-slate-900 leading-snug">
                                Konsumsi Gula turun <span className="text-emerald-600 font-extrabold text-[13px]">12%</span> dari Tahun lalu
                              </p>
                            </div>
                            <button onClick={() => showToast('Memuat detail asupan gula...', 'info')} className="text-slate-400 hover:text-slate-650 shrink-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Card 4: Rajin Sarapan */}
                          <div className="bg-white border border-slate-150 rounded-[32px] p-5 shadow-sm flex items-center justify-between text-left relative">
                            <div className="pr-4">
                              <p className="text-[12px] font-black text-slate-900 leading-snug">
                                Kamu termasuk <span className="text-emerald-600 font-extrabold text-[13px]">5%</span> Pengguna yang paling <span className="text-purple-700">Rajin Sarapan</span>
                              </p>
                            </div>
                            <button onClick={() => showToast('Memuat detail data sarapan...', 'info')} className="text-slate-400 hover:text-slate-650 shrink-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Footer Message */}
                          <div className="text-center py-4 space-y-2 select-none relative overflow-visible">
                            <h3 className="text-[14px] font-black text-slate-800 tracking-tight uppercase">Selamat 1 TAHUN bersama CEKAT</h3>
                            <p className="text-[11px] text-slate-500 font-bold">Kamu Hebat, Tetap Semangat ya!</p>
                            {/* Mascot in background */}
                            <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-150 flex items-center justify-center text-xl shadow-sm mx-auto mt-2">
                              🤖
                            </div>
                          </div>

                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* -------------------------------------------------------------
                    TAB 5: PROFIL (User profiles & connection status)
                    ------------------------------------------------------------- */}
                {activeTab === 'profil' && (
                  <div className="flex-1 bg-slate-50 px-4 py-4 space-y-3 animate-fadeIn pb-20 text-left">
                    
                    {/* Profile Card */}
                    <div className="bg-white border border-teal-50/50 rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.01)] text-center space-y-3">
                      <div className="w-18 h-18 rounded-full border-4 border-[#2d8d81] mx-auto overflow-hidden shadow-xs">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Sofia Profile" className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-0.5">
                        <h3 className="text-base font-black text-slate-900 leading-tight">Sofia Kusuma</h3>
                        <span className="text-[10px] text-slate-450 font-bold block">NIK: 3174XXXXXXXX0002</span>
                        
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase tracking-wider border border-emerald-100 mt-1.5 shadow-xs">
                          <ShieldCheck className="w-3 h-3 fill-emerald-100" />
                          <span>Terintegrasi BPJS Kes</span>
                        </span>
                      </div>

                      {/* Profile physical metrics chips (Compact style) */}
                      <div className="grid grid-cols-3 gap-2 pt-1">
                        <div className="p-2 bg-teal-50/50 border border-teal-100 rounded-xl text-center">
                          <span className="text-[8.5px] font-extrabold text-[#2d8d81] uppercase block">Usia</span>
                          <span className="text-xs font-black text-slate-800 block">28 Thn</span>
                        </div>
                        <div className="p-2 bg-amber-50/50 border border-amber-100 rounded-xl text-center">
                          <span className="text-[8.5px] font-extrabold text-amber-700 uppercase block">Berat</span>
                          <span className="text-xs font-black text-slate-800 block">60 kg</span>
                        </div>
                        <div className="p-2 bg-rose-50/50 border border-rose-100 rounded-xl text-center">
                          <span className="text-[8.5px] font-extrabold text-rose-700 uppercase block">Tinggi</span>
                          <span className="text-xs font-black text-slate-800 block">158 cm</span>
                        </div>
                      </div>
                    </div>

                    {/* Faskes Details Card */}
                    <div className="bg-white border border-teal-50/50 rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.01)] space-y-2">
                      <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-50">Informasi Faskes & Program</h4>
                      <div className="space-y-1.5 text-[11px] text-slate-700 font-bold leading-tight">
                        <div className="flex items-start gap-2">
                          <div className="w-4.5 h-4.5 rounded-full bg-teal-50 text-[#2d8d81] flex items-center justify-center shrink-0 text-[9px] font-black">✓</div>
                          <p>Fasilitas Kesehatan: <span className="font-black text-slate-900">Puskesmas Pembantu Ngabab</span></p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-4.5 h-4.5 rounded-full bg-teal-50 text-[#2d8d81] flex items-center justify-center shrink-0 text-[9px] font-black">✓</div>
                          <p>Program: <span className="font-black text-slate-900">Pencegahan Hipertensi & Stunting</span></p>
                        </div>
                      </div>
                    </div>

                    {/* Settings / Profile actions (Compact style list) */}
                    <div className="bg-white border border-teal-50/50 rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.01)] space-y-1.5">
                      {[
                        { name: 'Ubah Data Fisik & Profil', icon: User, action: () => showToast('Membuka pengaturan profil fisik...', 'info') },
                        { name: 'Riwayat Screening PTM', icon: ClipboardList, action: () => { setActiveTab('riwayat'); setRiwayatSubView('home'); } },
                        { name: 'Hubungkan Kartu BPJS', icon: Award, action: () => showToast('Menghubungkan ke BPJS Kesehatan...', 'info') },
                        { name: 'Pengaturan Notifikasi', icon: Activity, action: () => showToast('Membuka pengaturan notifikasi...', 'info') }
                      ].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <div 
                            key={idx} 
                            onClick={item.action}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 active:scale-98 transition cursor-pointer border border-transparent hover:border-slate-100"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-650 flex items-center justify-center shrink-0">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs font-bold text-slate-850">{item.name}</span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                          </div>
                        );
                      })}

                      {/* Logout Button */}
                      <div 
                        onClick={() => setAppState('welcome')}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-red-50 active:scale-98 transition cursor-pointer border border-transparent text-red-650 font-extrabold hover:border-red-100"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                            <LogOut className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-bold text-red-600">Keluar dari Aplikasi</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-red-400" />
                      </div>
                    </div>

                  </div>
                )}

                {/* 
                  ==============================================================
                  BOTTOM MOBILE TAB BAR NAVIGATION (DARK GREEN, ACTIVE STATE YELLOW)
                  ==============================================================
                */}
                <nav className="absolute bottom-0 left-0 w-full bg-[#00875A] text-white flex items-center justify-between py-1.5 px-3 border-t border-emerald-700 shadow-2xl z-40">
                  {/* Button 1: Beranda */}
                  <button 
                    onClick={() => {
                      setActiveTab('dashboard');
                      setDashboardSubView('home');
                    }}
                    className="flex-1 flex flex-col items-center justify-center py-0.5 transition-all"
                  >
                    {activeTab === 'dashboard' ? (
                      <div className="w-12 h-12 rounded-full bg-[#cbd52d] flex flex-col items-center justify-center text-slate-800 shadow-md">
                        <Home className="w-5 h-5 shrink-0 fill-slate-800 text-slate-800" />
                        <span className="text-[7.5px] font-black tracking-tight mt-0.5 leading-none">Beranda</span>
                      </div>
                    ) : (
                      <>
                        <Home className="w-5 h-5 shrink-0 text-white/95" />
                        <span className="text-[7.5px] font-bold text-white/90 mt-1 leading-none">Beranda</span>
                      </>
                    )}
                  </button>

                  {/* Button 2: Nutrisi */}
                  <button 
                    onClick={() => {
                      setActiveTab('nutrisi');
                      setNutrisiSubView('main');
                    }}
                    className="flex-1 flex flex-col items-center justify-center py-0.5 transition-all"
                  >
                    {activeTab === 'nutrisi' ? (
                      <div className="w-12 h-12 rounded-full bg-[#cbd52d] flex flex-col items-center justify-center text-slate-800 shadow-md">
                        <Apple className="w-5 h-5 shrink-0 fill-slate-800 text-slate-800" />
                        <span className="text-[7.5px] font-black tracking-tight mt-0.5 leading-none">Nutrisi</span>
                      </div>
                    ) : (
                      <>
                        <Apple className="w-5 h-5 shrink-0 text-white/95" />
                        <span className="text-[7.5px] font-bold text-white/90 mt-1 leading-none">Nutrisi</span>
                      </>
                    )}
                  </button>

                  {/* Button 3: Challenge */}
                  <button 
                    onClick={() => {
                      setActiveTab('challenge');
                      setChallengeSubView('home');
                    }}
                    className="flex-1 flex flex-col items-center justify-center py-0.5 transition-all"
                  >
                    {activeTab === 'challenge' ? (
                      <div className="w-12 h-12 rounded-full bg-[#cbd52d] flex flex-col items-center justify-center text-slate-800 shadow-md">
                        <Award className="w-5 h-5 shrink-0 fill-slate-800 text-slate-800" />
                        <span className="text-[7.5px] font-black tracking-tight mt-0.5 leading-none">Challenge</span>
                      </div>
                    ) : (
                      <>
                        <Award className="w-5 h-5 shrink-0 text-white/95" />
                        <span className="text-[7.5px] font-bold text-white/90 mt-1 leading-none">Challenge</span>
                      </>
                    )}
                  </button>

                  {/* Button 4: Riwayat */}
                  <button 
                    onClick={() => {
                      setActiveTab('riwayat');
                      setRiwayatSubView('home');
                    }}
                    className="flex-1 flex flex-col items-center justify-center py-0.5 transition-all"
                  >
                    {activeTab === 'riwayat' ? (
                      <div className="w-12 h-12 rounded-full bg-[#cbd52d] flex flex-col items-center justify-center text-slate-800 shadow-md">
                        <ClipboardList className="w-5 h-5 shrink-0 fill-slate-800 text-slate-800" />
                        <span className="text-[7.5px] font-black tracking-tight mt-0.5 leading-none">Riwayat</span>
                      </div>
                    ) : (
                      <>
                        <ClipboardList className="w-5 h-5 shrink-0 text-white/95" />
                        <span className="text-[7.5px] font-bold text-white/90 mt-1 leading-none">Riwayat</span>
                      </>
                    )}
                  </button>

                  {/* Button 5: Profil */}
                  <button 
                    onClick={() => {
                      setActiveTab('profil');
                    }}
                    className="flex-1 flex flex-col items-center justify-center py-0.5 transition-all"
                  >
                    {activeTab === 'profil' ? (
                      <div className="w-12 h-12 rounded-full bg-[#cbd52d] flex flex-col items-center justify-center text-slate-800 shadow-md">
                        <User className="w-5 h-5 shrink-0 fill-slate-800 text-slate-800" />
                        <span className="text-[7.5px] font-black tracking-tight mt-0.5 leading-none">Profil</span>
                      </div>
                    ) : (
                      <>
                        <User className="w-5 h-5 shrink-0 text-white/95" />
                        <span className="text-[7.5px] font-bold text-white/90 mt-1 leading-none">Profil</span>
                      </>
                    )}
                  </button>
                </nav>

                {/* FLOATING ACTION CAMERA BUTTON (1-CLICK SCAN WITHOUT SCROLLING) */}
                <button
                  onClick={() => {
                    setActiveTab('nutrisi');
                    setNutrisiSubView('scan_camera');
                  }}
                  className="absolute bottom-20 right-4 bg-gradient-to-r from-[#00875A] to-[#10B981] text-white font-black px-3.5 py-2.5 rounded-full shadow-2xl flex items-center gap-1.5 border-2 border-white z-50 active:scale-95 transition hover:scale-105 cursor-pointer"
                  title="Scan Makanan AI Instan"
                >
                  <Camera className="w-4 h-4 text-white animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-wider pr-0.5">Scan Gizi</span>
                </button>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default function CekatApp() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-semibold">Memuat...</div>}>
      <CekatAppContent />
    </React.Suspense>
  );
}
