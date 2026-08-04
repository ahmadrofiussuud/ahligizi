# NutriSnap - Full-Stack AI Food Calorie Scanner & Nutrition Platform

Aplikasi web full-stack modern berbasis **Next.js (App Router) + TypeScript + TailwindCSS + Prisma ORM (PostgreSQL)** untuk pemindaian & deteksi kalori makanan berbasis kecernaan buatan (AI), pengelolaan log gizi harian, sistem gamifikasi, yearly wrapped, konsultasi ahli gizi, artikel kesehatan, dan marketplace produk bernutrisi.

---

## 🛠️ Stack Teknologi

- **Frontend**: Next.js App Router (React + TypeScript), TailwindCSS (Custom Glassmorphism UI), Lucide Icons
- **Backend**: Next.js API Routes (Node.js)
- **Database**: PostgreSQL (Prisma ORM v6)
- **Otentikasi**: JWT (JSON Web Token) dengan Email & Password + integrasi Google OAuth
- **AI Integration**: Gemini Vision API placeholder (menganalisis foto makanan, kalori, makronutrisi, dan rekomendasi gizi)
- **Object Storage**: Supabase Storage / AWS S3 compatible placeholder untuk unggah foto makanan

---

## 🚀 Fitur Utama & Struktur Route

| Route | Nama Fitur | Deskripsi |
| :--- | :--- | :--- |
| `/scan` | **Scan Makanan** | Upload foto makanan & analisis kalori/gizi berbasis AI |
| `/dashboard` | **Dashboard Harian** | Ringkasan target kalori harian, progress makronutrisi & riwayat makan |
| `/gamification` | **Sistem Gamifikasi** | Poin, streak harian, badge pencapaian & leaderboard komunitas |
| `/wrapped` | **Nutrition Wrapped** | Rangkuman & statistik nutrisi harian/tahunan gaya kartu sosial |
| `/consultation` | **Konsultasi** | Jadwal janji konsultasi ke dokter & ahli gizi terverifikasi |
| `/articles` | **Artikel Kesehatan** | Edukasi gizi, resep sehat, dan tips gaya hidup sehat |
| `/marketplace` | **Marketplace** | Katalog suplemen, produk organik, dan alat dapur digital presisi |

---

## 🗄️ Skema Database (Prisma PostgreSQL)

Schema database tersedia pada [`prisma/schema.prisma`](file:///c:/laragon/www/cekgizi/prisma/schema.prisma) mencakup tabel:
1. `User`: Data profil fisik (tinggi, berat, target kalori, dll)
2. `FoodLog`: Catatan kalori, protein, karbohidrat, lemak, serat, foto makanan
3. `Streak`: Pelacakan streak konsistensi pengguna
4. `Badge` & `UserBadge`: Sistem lencana dan kriteria gamifikasi
5. `Expert` & `Consultation`: Data dokter/ahli gizi & riwayat pemesanan sesi
6. `Article`: Edukasi artikel gizi
7. `Product` & `Order`: Produk marketplace & transaksi pesanan

---

## ⚙️ Panduan Menjalankan Project Secara Lokal

### 1. Prasyarat System
- Node.js (v18.x atau lebih baru)
- npm / yarn / pnpm
- PostgreSQL Database Server

### 2. Clone & Install Dependencies
```bash
# Install paket dependensi proyek
npm install
```

### 3. Konfigurasi Environment Variable
Salin file `.env.example` menjadi `.env` lalu sesuaikan kredensial database & API Key milikmu:
```bash
cp .env.example .env
```

Isi variabel di file `.env`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/nutrisnap?schema=public"
JWT_SECRET="nutrisnap-jwt-secret-key-2026"
GEMINI_API_KEY="your-gemini-api-key-here"
STORAGE_ENDPOINT="https://your-project.supabase.co/storage/v1"
```

### 4. Setup Prisma Database & Seed Data
```bash
# Generate Prisma Client
npx prisma generate

# Jalankan migrasi database ke PostgreSQL
npx prisma db push
```

### 5. Jalankan Development Server
```bash
npm run dev
```

Buka browser dan akses [http://localhost:3000](http://localhost:3000).

---

## 📸 Integrasi AI Gemini (Scan Makanan)
Fitur scan makanan pada `/scan` dikonfigurasi melalui API route [`/api/scan`](file:///c:/laragon/www/cekgizi/src/app/api/scan/route.ts). Apabila `GEMINI_API_KEY` diisi di file `.env`, endpoint siap menerima prompt analisis gambar dari Gemini Flash/Vision.

---

## 📄 Lisensi
Project ini dibuat untuk pengembangan NutriSnap Full-Stack Web Application.
