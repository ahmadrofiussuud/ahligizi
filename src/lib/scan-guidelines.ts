// Curated educational summaries of the six user-supplied PDFs.
// Pages are 1-based PDF viewer pages, not the printed book page numbers.
export const SCAN_GUIDELINES = {
  diabetes: {
    title: 'PERKENI — Pengelolaan dan Pencegahan DMT2 Dewasa (2024)',
    pages: '75, 79',
    kind: 'Pedoman profesi',
    guidance: 'Utamakan karbohidrat berserat dari sayur, buah utuh, biji-bijian dan kacang; ganti minuman berpemanis dengan air. Pola, porsi dan jadwal makan harus disesuaikan kebutuhan individu; tidak ada satu diet terbaik untuk semua penyandang DM. Jangan melarang semua karbohidrat atau menyarankan puasa/perubahan insulin dari foto.',
  },
  hypertension: {
    title: 'Kemenkes — PNPK Tata Laksana Hipertensi Dewasa (2026)',
    pages: '24–26',
    kind: 'Pedoman nasional',
    guidance: 'Pola DASH menekankan sayur, buah, biji-bijian utuh, kacang, ikan dan susu rendah lemak; batasi tambahan garam, saus asin dan pangan olahan. Natrium tidak bisa diukur dari foto. Jangan menetapkan diet tinggi kalium atau pembatasan cairan tanpa mengetahui kondisi ginjal dan obat.',
  },
  obesity: {
    title: 'Kemenkes — PNPK Tata Laksana Obesitas Dewasa (2025)',
    pages: '30–33',
    kind: 'Pedoman nasional',
    guidance: 'Perbaikan porsi, pilihan makanan dan kebiasaan perlu bertahap, berkelanjutan serta individual. Pola makan, aktivitas dan perilaku saling melengkapi. Jangan menganggap pengguna obesitas atau menetapkan defisit kalori/diet sangat rendah kalori dari foto; diet restriktif memerlukan penilaian dan pendampingan medis. Aturan penurunan berat badan dewasa tidak berlaku untuk balita.',
  },
  lipids: {
    title: 'PERKI — Panduan Tata Laksana Dislipidemia (2022)',
    pages: '47–50',
    kind: 'Pedoman profesi',
    guidance: 'Batasi lemak jenuh/trans, pilih pengolahan yang tidak banyak menggoreng; substitusi dengan sumber lemak tak jenuh seperlunya. Sayur, buah, kacang dan serealia menyediakan serat. Bahan minyak dan lemak tidak selalu terlihat; jangan mendiagnosis kolesterol tinggi atau menjanjikan penurunan kadar lipid dari satu menu.',
  },
  child_nutrition: {
    title: 'Kemenkes — Buku Saku Gizi Buruk Balita, Rawat Jalan (2020)',
    pages: '32, 38–39, 69',
    kind: 'Panduan tenaga kesehatan',
    guidance: 'MPASI mulai usia 6 bulan, padat gizi/energi, porsi dan tekstur sesuai usia, disertai ASI serta pemantauan pertumbuhan. Tanpa informasi usia, tanyakan dulu, jangan memberi resep porsi anak. Gizi buruk berbeda dari stunting. Jangan menyarankan pembatasan lemak/kalori untuk balita, formula terapeutik, atau diagnosis gizi buruk/stunting dari foto makanan. Gizi buruk memerlukan penilaian tenaga kesehatan.',
  },
  iron: {
    title: 'Ramadhan — Pendekatan Diagnostik, Tatalaksana dan Pencegahan Anemia Defisiensi Besi (2023)',
    pages: '8–9',
    kind: 'Artikel tinjauan pustaka; bukan PNPK',
    guidance: 'Variasikan sumber zat besi berupa lauk hewani dan kacang-kacangan. Vitamin C membantu penyerapan besi; teh/kopi dapat menghambat penyerapan. Pilih contoh kombinasi makanan, bukan dosis suplemen. Tidak adanya lauk pada satu foto bukan bukti anemia atau kekurangan zat besi harian; diagnosis memerlukan pemeriksaan tenaga kesehatan/laboratorium.',
  },
} as const;

export type ScanGuidelineId = keyof typeof SCAN_GUIDELINES;
export const SCAN_GUIDELINE_IDS = Object.keys(SCAN_GUIDELINES) as ScanGuidelineId[];
export const SCAN_GUIDELINE_PROMPT = Object.entries(SCAN_GUIDELINES)
  .map(([id, source]) => `${id}: ${source.title}, halaman PDF ${source.pages}. ${source.guidance}`)
  .join('\n');
