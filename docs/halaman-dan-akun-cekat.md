# Halaman dan akun CEKAT

Pemeriksaan 14 Oktober 2026: semula 22 route halaman. Setelah menambahkan daftar akses dan akun demo, tersedia **24 route halaman** dan **24 endpoint API**. Route artikel `[slug]` dihitung satu template; jumlah artikel bukan jumlah file halaman.

## Pintu masuk utama

| Alamat | Fungsi | Akses |
| --- | --- | --- |
| `/access` | Daftar seluruh 24 halaman dan jenis akses | Tanpa login |
| `/demo` | Akun uji tampilan pasien, petugas, admin | Email/password demo di bawah |
| `/patient` | Akun pasien, barcode dan hasil tersimpan | Akun Supabase terverifikasi |
| `/station` | Portal petugas, hasil pemeriksaan dan antrean | Akun Supabase terverifikasi + mapping petugas faskes |
| `/station/live` | Alamat alternatif portal Station | Sama dengan `/station` |
| `/app` | Simulator CEKAT mobile/desktop | Data contoh; tidak memberi izin Supabase |
| `/station/demo` | Simulator kiosk pemeriksaan | Data contoh; tidak menyimpan hasil ke Supabase |

## Akun demo yang bisa langsung dipakai

Login demo dapat melalui `/demo`. Formulir `/patient` dan `/station` juga mengenali tiga alamat demo ini: dengan password demo yang benar, pengguna diarahkan ke tampilan contoh sesuai akun tanpa mengirim login demo ke Supabase.

| Tampilan | Email demo | Password demo | Tujuan |
| --- | --- | --- | --- |
| Pasien | pasien@cekat.test | CekatPasien!2026 | `/app` |
| Petugas | petugas@cekat.test | CekatPetugas!2026 | `/station/demo` |
| Admin | admin@cekat.test | CekatAdmin!2026 | `/access` |

Akun tersebut adalah pilihan skenario tampilan, bukan akun Auth atau izin server. Tidak dibuat akun Supabase baru, tidak dinonaktifkan verifikasi email, tidak diterbitkan token/cookie Supabase, dan tidak diberikan akses data pasien nyata. Admin demo hanya membuka peta halaman, bukan editor administratif atau dashboard Supabase. Alamat `.test` bukan inbox email.

Ketiga login demo telah diuji di browser. Inventaris halaman juga diuji terhadap seluruh `page.tsx` sehingga tidak ada halaman yang terlewat.

## Akun nyata yang dipilih pemilik

Hasil pemeriksaan pada Supabase menunjukkan email petugas pilihan pemilik **sudah terdaftar tetapi belum terverifikasi**. Tidak ada hak petugas yang diberikan. Password nyata tidak dapat dibaca kembali dari database.

Login nyata membutuhkan password yang dipilih saat pendaftaran, verifikasi email yang dapat diterima inbox pemilik, lalu penetapan hak petugas. Jika alamat pilihan hanya contoh dan tidak mempunyai inbox, pemilik perlu memakai alamat aktif yang dikuasainya. Email/password demo yang dimasukkan pada `/station` atau `/patient` membuka simulasi, bukan sesi atau hak akses Supabase.

Pesan error Auth kini membedakan verifikasi email, format email, layanan pengiriman yang belum dikonfigurasi, pendaftaran yang dinonaktifkan, dan kata sandi lemah. SMTP untuk pengiriman umum belum dikonfigurasi atau diuji pada pekerjaan ini.

## Halaman lain

| Alamat | Status |
| --- | --- |
| `/` | Beranda publik |
| `/articles`, `/articles/[slug]` | Edukasi publik |
| `/dashboard`, `/profile`, `/onboarding` | Alur lama/profil lokal atau contoh |
| `/scan`, `/pantry-ai` | Fitur gizi/AI lama; konfigurasi layanan masih berpengaruh |
| `/gamification`, `/wrapped` | Alur gamifikasi/ringkasan lama/demo |
| `/consultation`, `/consultation/history`, `/consultation/expert-portal` | Alur konsultasi lama, belum diproteksi oleh izin petugas Station |
| `/marketplace`, `/cart`, `/marketplace/orders` | Alur katalog/pesanan lama/demo |
| `/admin/articles` | Prototype editor artikel; belum memiliki pembatasan admin produksi |

Label tenaga medis/admin pada simulator lama tidak setara dengan role Supabase. Link `/privacy`, `/terms`, dan `/faq` yang terdapat pada footer lama belum mempunyai file halaman; tidak termasuk dalam hitungan 24 halaman yang ada.
