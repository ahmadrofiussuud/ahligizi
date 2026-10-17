# Saran scan berdasarkan sumber pengguna

Implementasi 17 Oktober 2026. Enam PDF dibaca lokal, lalu prinsip edukasi diparafrasakan ke `src/lib/scan-guidelines.ts`. Ini bukan pelatihan ulang model, pencarian seluruh PDF saat runtime, atau validasi klinis. PDF lengkap dan hasil ekstraksinya tidak dipublikasikan ke Git.

| Sumber | Halaman PDF (1-based) | Fokus edukasi |
|---|---|---|
| Kemenkes, Buku Saku Gizi Buruk Balita Rawat Jalan, 2020 | 32, 38–39, 69 | MPASI sesuai usia, kepadatan gizi, pemantauan; tanpa diet penurunan berat badan balita |
| Kemenkes, PNPK Obesitas Dewasa, KMK 509/2025 | 30–33 | Porsi dan perubahan kebiasaan individual, tanpa resep defisit kalori otomatis |
| PERKENI, DMT2 Dewasa, 2024 | 75, 79 | Karbohidrat berserat, air sebagai alternatif minuman berpemanis |
| Kemenkes, PNPK Hipertensi Dewasa, KMK 303/2026 | 24–26 | Komposisi DASH dan membatasi tambahan garam; natrium tidak diukur dari foto |
| PERKI, Dislipidemia, 2022 | 47–50 | Substitusi lemak jenuh/trans, sumber serat |
| Ramadhan, artikel tinjauan anemia defisiensi besi, 2023 | 8–9 | Variasi pangan sumber besi dan faktor penyerapan; bukan PNPK atau resep suplemen |

Nomor halaman adalah urutan di penampil PDF, bukan halaman cetak buku. Judul/halaman sumber ditempelkan server dari katalog yang terverifikasi; model hanya memilih ID yang diizinkan. Kutipan yang valid belum menjamin setiap alasan AI benar secara klinis; penilaian ahli tetap diperlukan.

## Perilaku

- Makanan/minuman: 1–2 langkah relevan, masing-masing diarahkan maksimal 12 kata. Isi saran di layar dibatasi total dua baris; judul dan kontrol sumber berada di luar batas teks saran.
- Nama penerbit tampil pada kontrol Sumber pedoman; buka untuk melihat judul lengkap, halaman, dan alasan.
- Tidak terlihat di foto bukan berarti kekurangan zat gizi sehari atau diagnosis penyakit.
- Anak, kehamilan, ginjal dan diet terapeutik membutuhkan konteks serta penilaian tenaga kesehatan; tidak otomatis diterapkan dari foto.
- Nonmakanan/ambigu: rekomendasi diet dikosongkan server; prediksi objek dan saran foto ulang tetap tersedia.
- Hasil lama pada halaman aplikasi memakai versi cache baru agar pengguna melakukan scan ulang untuk memperoleh saran.

## Verifikasi

13 tes kontrak lulus: sumber wajib untuk makanan, ID tidak dikenal ditolak, judul/halaman buatan model diganti katalog server, serta nonmakanan tidak memperoleh rekomendasi atau kalori. TypeScript lulus.

Uji API nyata: menu nasi/ayam/brokoli/wortel memunculkan saran variasi karbohidrat berserat serta komposisi/porsi; air mineral memunculkan saran mempertahankan air sebagai pengganti minuman berpemanis; logo CEKAT tidak memperoleh saran diet. Uji awal air menghasilkan saran berulang dan alasan hipertensi yang kurang langsung didukung ringkasan, sehingga prompt diperketat dan diuji ulang; hasil akhir cukup satu saran dengan rujukan PERKENI. Respons mentah di `output/guidelines/` hanya lokal.

Uji browser nyata pada `/scan`: foto dianalisis dan kartu saran serta kontrol rujukan muncul. Batas dua baris diperiksa melalui computed style, dengan rincian sumber dapat dibuka. Komponen yang sama digunakan `/app` dan `/scan`.
