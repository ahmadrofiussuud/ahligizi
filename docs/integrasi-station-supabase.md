# Integrasi CEKAT Station dengan Supabase

Tanggal: 14 Oktober 2026.

## Yang sudah terpasang

Project Supabase `cekatapp` (`voihbnkxfbdlkrjfedec`) telah dipulihkan dan berstatus Healthy. Schema public yang sebelumnya kosong kini memiliki enam tabel: `cekat_facilities`, `cekat_staff`, `cekat_patients`, `cekat_registrations`, `cekat_screenings`, dan `cekat_queue_counters`.

Integrasi menggunakan Supabase Auth dan Data API dengan public/anon key yang sudah dikonfigurasi di `.env.local`. Tidak memerlukan database password atau service-role key di aplikasi. Prisma tetap digunakan fitur lama; `DATABASE_URL` Prisma lama masih tidak cocok dengan schema PostgreSQL dan tidak digunakan oleh portal Station baru.

- `/patient`: daftar/masuk akun, registrasi pasien pada faskes, barcode yang disimpan di server, hasil pemeriksaan, riwayat, serta status antrean.
- `/station`: login petugas, identifikasi pasien dengan barcode, riwayat sebelumnya, input hasil (termasuk SpO₂), penyimpanan hasil dan nomor antrean, serta perubahan status panggilan. `/station/live` tetap tersedia sebagai alamat kompatibilitas.
- `/api/cekat/*`: endpoint untuk portal tersebut. Identitas diverifikasi langsung oleh Supabase; sesi disimpan dalam cookie HttpOnly, SameSite=Lax, dan Secure pada produksi. Token tidak disimpan pada localStorage.
- Antrean dialokasikan secara atomik per faskes dan tanggal Asia/Jakarta. ID permintaan unik mencegah penyimpanan ulang saat permintaan diulang.
- Polling 15 detik ketika halaman terlihat menghubungkan pembaruan hasil dan antrean antarperangkat. Tidak mengandalkan localStorage untuk data pasien.
- Service worker melewati endpoint API dan halaman portal; respons private/no-store tidak dimasukkan cache.

Halaman simulator `/app` dan `/station/demo` tetap tersedia dengan label mode demo dan tautan ke portal yang memakai data tersimpan. Navbar dan tombol utama beranda mengarahkan CEKAT App ke `/patient` dan CEKAT Station ke `/station`. Data contoh simulator tidak diimpor sebagai data pasien nyata.

## Pembatasan akses

Semua tabel baru memiliki Row Level Security. Pasien membaca profil, barcode, dan hasilnya sendiri. Petugas hanya dapat mengakses profil dan hasil pada faskesnya. Pencarian barcode memerlukan akun petugas aktif. Pengguna biasa tidak dapat membuat atau menaikkan hak petugasnya sendiri. Hasil pemeriksaan yang sudah tercatat tidak dapat diubah melalui client; petugas hanya diberi izin memperbarui status antrean.

Endpoint login dan pendaftaran lama diarahkan ke autentikasi Supabase. Jalur sukses demo dan penerbitan identitas Google tanpa verifikasi dihapus. Utility JWT lama tidak lagi memiliki secret bawaan. Ini tidak menyatakan bahwa seluruh endpoint fitur lama sudah diaudit atau dipindahkan ke Supabase.

## Pemeriksaan yang sudah lolos

- Build produksi portal dan API integrasi, TypeScript, serta lint kode baru.
- Empat tes validasi: indikator belum diukur tetap null, nilai invalid ditolak, tekanan darah terbalik/SpO₂ di luar batas ditolak, dan identitas petugas/faskes tidak bisa disisipkan melalui objek nilai pemeriksaan.
- Empat tes HTTP pada server lokal: akses anonim ditolak, mutasi lintas-origin ditolak, penyimpanan/pencarian pasien tanpa login ditolak, dan login Google palsu tidak memperoleh token.
- Tes langsung PostgreSQL: isolasi pasien, pembatasan faskes, larangan menaikkan hak petugas, lookup barcode, penyimpanan/pembacaan hasil termasuk SpO₂, antrean, larangan mengubah angka hasil, perlindungan duplikasi, dan penolakan akses anonim.
- Seluruh data tes PostgreSQL berada dalam transaksi yang dibatalkan. Pemeriksaan setelahnya memastikan 0 akun tes, 0 faskes tes, dan 0 hasil tes tertinggal.
- Koneksi lokal ke Supabase Auth berhasil dan Data API menolak akses anonim ke tabel pasien.

## Yang masih membutuhkan pemilik akun

Pemilik perlu membuat akun CEKAT melalui `/patient` dengan email aktif dan password pribadi, lalu memverifikasi email jika diminta. Akun dashboard Supabase berbeda dari akun pengguna CEKAT.

Alamat email akun petugas pertama sudah dipilih oleh pemilik. Pemeriksaan terbaru pada Supabase menunjukkan akun tersebut sudah terdaftar tetapi belum terverifikasi. Password nyata tidak dapat dibaca dari database. Verifikasi email harus diselesaikan pemilik akun. Hak petugas belum diberikan kepada akun mana pun. Setelah akun diverifikasi dan penetapan akses disetujui, administrator dapat memakai `supabase/admin/assign-staff.sql` untuk menambahkan mapping `user_id` dan `facility_id` ke `cekat_staff`. Script berhenti jika akun belum terverifikasi, faskes ambigu/tidak ditemukan, atau akun sudah berada di faskes lain. Penetapan hak ini tidak didasarkan pada metadata yang dapat diubah pengguna.

Halaman `/access` kini memuat inventaris seluruh halaman. `/demo` menyediakan tiga pilihan akun uji tampilan yang tidak menghasilkan sesi Supabase. Daftar kredensial demo dan batas akses tercatat pada `docs/halaman-dan-akun-cekat.md`.

Tes antarmuka lengkap dengan akun pasien/petugas nyata dan scanner fisik belum dilakukan. Status produksi juga membutuhkan evaluasi SMTP, pemulihan akun, backup, monitoring, penyebaran aplikasi HTTPS, serta audit fitur lama. Deployment dan push GitHub belum dilakukan.

## Batas fungsi

Data diinput oleh petugas; belum ada koneksi langsung ke alat pemeriksaan. Data ini belum dipertukarkan dengan rekam medis faskes lain atau SATUSEHAT. Pengguna tidak menerima diagnosis otomatis dari angka hasil. Layanan konsultasi apoteker online juga belum ditambahkan oleh integrasi ini.

## Berkas acuan

- Migrasi: `supabase/migrations/202610140001_cekat_station.sql` (sudah diterapkan satu kali pada project di atas).
- Tes PostgreSQL: `supabase/tests/cekat_access.sql`.
- Tes validasi: `tests/cekat-validation.test.mjs`.
- Tes endpoint: `tests/cekat-api-access.test.mjs` (memerlukan server lokal berjalan).
- `npm run db:check`: memeriksa koneksi Data API/Auth saat integrasi ini menggunakan URL Supabase, atau koneksi Prisma jika DATABASE_URL PostgreSQL Supabase sudah dikonfigurasi.

Jangan menjalankan ulang migrasi pertama pada project yang sudah memiliki tabel tersebut. Perubahan schema berikutnya harus memakai migrasi tambahan.
