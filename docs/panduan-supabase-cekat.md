# Menyiapkan Supabase untuk CEKAT

**Pembaruan:** Project `cekatapp` sudah ditemukan, dipulihkan, dan integrasi Station telah dipasang melalui Supabase Auth/Data API. Panduan awal di bawah bukan lagi langkah yang perlu dilakukan untuk portal Station baru. Lihat [status integrasi terbaru](integrasi-station-supabase.md). Tidak perlu membuat project baru atau mengganti connection string untuk memakai portal ini.

## Status saat ini

Pengguna belum mempunyai project Supabase. Pengaturan URL dan anon key ditemukan pada `.env.local`, tetapi bukan bukti bahwa project tersebut tersedia atau terkoneksi. Schema Prisma mengharapkan PostgreSQL, sedangkan `DATABASE_URL` efektif setelah pemuatan environment Next.js menggunakan protokol `file:` untuk file lokal. Konfigurasi ini tidak cocok dan harus diperbaiki. Kode Station masih simulator; mengubah connection string saja tidak menyambungkan fitur pasien.

## Yang perlu dibuat oleh pemilik akun

1. Buka https://supabase.com/dashboard dan buat project baru untuk pengembangan CEKAT. Pilih region yang sesuai lokasi penggunaan, misalnya Singapore jika tersedia. Periksa paket dan biaya yang ditampilkan sebelum membuatnya.
2. Buat password database yang kuat dan simpan di password manager. Jangan mengirim password, connection string lengkap, atau secret key ke chat/GitHub.
3. Setelah database siap, buka tombol **Connect**. Ambil connection string **Session pooler** port **5432**, yang mendukung koneksi IPv4 untuk komputer pengembangan ini.
4. Masukkan password database yang benar ke string tersebut. Karakter khusus pada password perlu URL-encoding. Gunakan parameter `sslmode=require` untuk TLS.
5. Simpan nilai `DATABASE_URL` yang sama di `.env` dan `.env.local` agar Prisma CLI dan Next.js memakai database yang sama. Jangan menghapus konfigurasi lain. Bila ada konfigurasi deployment, nilai di sana juga perlu diperbarui.
6. Jalankan `npm run db:check`. Pemeriksaan hanya membaca status koneksi dan nama tabel dasar, tanpa membaca rekam pasien atau mengubah database.

Contoh struktur saja, bukan kredensial siap pakai:

```env
DATABASE_URL="postgresql://postgres.PROJECT_REF:PASSWORD_URL_ENCODED@POOLER_HOST:5432/postgres?sslmode=require"
```

Untuk arsitektur server dengan Prisma ini, URL Supabase publik dan anon key bukan pengganti connection string database. Service-role/secret key tidak diperlukan untuk koneksi Prisma dan tidak boleh diberi awalan `NEXT_PUBLIC_`.

Pada tahap awal, akses database aplikasi dilakukan melalui server Next.js. Jika Supabase Data API tidak digunakan, nonaktifkan Data API untuk project pengembangan ini. Jika nanti diperlukan akses langsung dari browser atau Realtime, siapkan RLS dan policy sesuai autentikasi yang digunakan; JWT aplikasi saat ini tidak otomatis menjadi identitas Supabase Auth.

## Integrasi yang perlu saya implementasikan setelah koneksi tersedia

- Login dan pendaftaran harus memakai akun yang benar, tanpa fallback sukses demo. Secret JWT harus diwajibkan; sesi dan identitas pengguna harus diverifikasi server.
- Tambahkan tabel faskes, perangkat Station, petugas, kode registrasi pasien, pemeriksaan, jawaban skrining, dan antrean. Hak petugas harus dibatasi pada faskesnya.
- Barcode harus merujuk pada kode acak yang disimpan di server, bukan localStorage per perangkat. Barcode bukan pengganti login petugas atau izin melihat rekam medis.
- Station mencari pasien melalui endpoint yang terlindungi, mencatat pemeriksaan, dan menyimpan hasil serta siapa petugas pencatatnya.
- Aplikasi pasien mengambil hasil dan riwayat berdasarkan identitas login. Pasien A tidak boleh dapat membaca hasil pasien B.
- Nilai SpO₂, tekanan darah, gula darah, dan indikator lain harus berasal dari input petugas atau alat yang terintegrasi, bukan angka tetap.
- Antrean disimpan per faskes/tanggal dengan pengendalian duplikasi. Pembaruan bisa memakai polling server dahulu; Realtime bukan prasyarat sinkronisasi antarperangkat.

Migrasi belum dijalankan. Jika project ternyata mempunyai data penting, lakukan pemeriksaan schema dan backup terlebih dahulu. Jangan menjalankan reset database atau menerima penghapusan data untuk sekadar membuat schema cocok.

## Batas integrasi

Supabase menyediakan database bersama. Koneksi alat medis membutuhkan dokumentasi/protokol alat. Integrasi SATUSEHAT membutuhkan akses resmi dan API tersendiri. Layanan apoteker membutuhkan akun petugas, jadwal, dan backend konsultasi; tidak otomatis tersedia setelah database dibuat.

## Acuan resmi

- https://supabase.com/docs/guides/database/prisma
- https://supabase.com/docs/guides/database/connecting-to-postgres

Project ini menggunakan Prisma 5.22; contoh Prisma terbaru pada dokumentasi tidak boleh diterapkan sebagai upgrade versi tanpa pekerjaan migrasi terpisah.
