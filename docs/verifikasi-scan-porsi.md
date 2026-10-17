# Verifikasi scan makanan dan satuan minuman — 17 Oktober 2026

Pengujian integrasi lokal memakai Gemini sungguhan (gemini-2.5-flash), bukan mock. Foto dibuat dengan imagegen. Kapasitas yang diminta pada prompt gambar adalah target sintetis, bukan ukuran fisik terverifikasi. Nama file/target volume tidak dikirim ke model analisis; API menerima hanya gambar.

## Hasil

| Gambar | Endpoint | Porsi yang dikembalikan | Kategori |
|---|---|---|---|
| food.png | /api/scan | sekitar 150 g + sekitar 120 g + sekitar 80 g + sekitar 50 g | sangat_baik |
| food.png | /api/scan-food | sekitar 150 g + sekitar 120 g + sekitar 80 g + sekitar 50 g | sangat_baik |
| drink-330ml.png | /api/scan | 1 botol (330 ml) | sangat_baik |
| drink-330ml.png | /api/scan-food | 1 botol (330 ml) | sangat_baik |
| unlabelled-600.png | /api/scan | 1 botol (sekitar 500 ml) | sangat_baik |
| unlabelled-1500.png | /api/scan | 1 botol (sekitar 1.5 L) | sangat_baik |

Botol berlabel 330 ml terbaca dengan satuan lengkap pada kedua endpoint. Makanan dikenali sebagai nasi, ayam, brokoli, wortel dan memakai satuan gram. Nilai kalori hasil foto makanan berbeda antar panggilan (450 dan 480 kkal): ini perkiraan, bukan hasil ukur.

Botol tanpa label yang diminta berukuran 600 ml diperkirakan 500 ml; target 1.500 ml diperkirakan 1,5 L. Satu prediksi cocok dengan target sintetis dan satu meleset; bukan bukti akurasi umum. Tanpa label/skala foto tidak membuktikan kapasitas. Prompt mewajibkan penjelasan ketidakpastian dan melarang angka kapasitas pasti yang tidak didukung label.

## Perubahan

- Empat kategori makanan: Sangat Baik, Baik, Cukup, Kurang; komponen label yang sama dipakai kedua halaman scan.
- Porsi wajib berisi satuan: g/gram untuk padat, ml/L untuk cair. Respons porsi hanya angka ditolak, tidak diberi satuan tebakan oleh server.
- Bedakan kapasitas kemasan, isi tersisa, dan nutrisi per sajian; semua hasil total mengikuti porsi yang dianalisis.
- Halaman scan menampilkan dan menyimpan seluruh porsi item, bukan hanya item pertama.
- Nonmakanan tetap mempertahankan prediksi objek, tanpa angka nutrisi atau kategori makanan.
- Perbaikan kompatibilitas build Next.js: helper route tidak diekspor sebagai handler; dashboard dengan callback dipisahkan dari entry halaman.

12 tes kontrak otomatis lulus, termasuk empat kategori, retensi satuan 330 ml, penolakan porsi hanya angka, zero kalori asli, dan isolasi hasil nonmakanan. Hasil mentah serta empat gambar disimpan lokal di output/scan-portions/ (tidak dikirim ke Git).
