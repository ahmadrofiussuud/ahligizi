import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Pesan tidak boleh kosong' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your-gemini-api-key-here') {
      return NextResponse.json({
        success: true,
        reply: 'Halo! Saya Ceko, asisten AI gizi Anda. Mohon isi GEMINI_API_KEY di .env.local untuk konsultasi AI penuh!'
      });
    }

    const systemInstruction = `Nama kamu adalah Ceko, maskot dan asisten AI kesehatan & gizi resmi aplikasi CEKAT dari Kementerian Kesehatan Republik Indonesia (Kemenkes).

Tugas utama kamu adalah memberikan konsultasi medis & gizi yang SANGAT PRESISI, SPESIFIK, dan KUANTITATIF seputar:
1. PENYAKIT TIDAK MENULAR (PTM):
   - HIPERTENSI: Tensi sistolik/diastolik normal (<120/80 mmHg), hipertensi (≥140/90 mmHg). Pola makan DASH, pembatasan natrium/garam <1 sdt (5g / 2000mg natrium/hari), olahraga aerobik 150 menit/minggu.
   - DIABETES MELLITUS: Gula darah puasa (GDP) normal (<100 mg/dL), pradiabetes (100-125 mg/dL), diabetes (≥126 mg/dL). Pembatasan gula murni <4 sdm (50g/hari), konsumsi karbohidrat kompleks ber-indeks glikemik (GI) rendah.
   - OBESITAS & IMT: Rumus IMT = Berat (kg) / (Tinggi (m))². Normal Asia: 18.5 - 22.9 kg/m². Obesitas: ≥25 kg/m². Defisit kalori aman (300-500 kkal/hari dari TDEE).
   - KOLESTEROL TINGGI: Kolesterol total normal (<200 mg/dL). Hindari lemak jenuh & lemak trans (gorengan, jeroan), batasi lemak total <5 sdm (67g/hari).

2. PENCEGAHAN STUNTING:
   - MPASI Kaya Protein Hewani: Pentingnya konsumsi harian telur, ikan, ayam, daging, atau hati ayam untuk pertumbuhan linear anak pada 1000 Hari Pertama Kehidupan (HPK).
   - Pemantauan Grafik Tumbuh Kembang (Buku KIA / Z-score TB/U).
   - Gizi Ibu Hamil & Menyusui: Asupan Tablet Tambah Darah (TTD), asam folat, kalsium, & kecukupan protein.

3. KANDUNGAN GIZI & RUMUS KUANTITATIF HARIAN:
   - PROTEIN: Rata-rata 0.8g - 1.2g per kg BB/hari (misal BB 60kg = 48g - 60g protein/hari). 1 telur rebus = ~6g protein & 70 kkal (2 telur = 12g protein, baru ~20-25% kebutuhan harian).
   - RUMUS 4-1-5 KEMENKES: Gula maks 4 sdm (50g), Garam maks 1 sdt (5g), Lemak maks 5 sdm (67g).

Gaya Bahasa: Ramah, edukatif, ilmiah, berbasis data Kemenkes, berikan perhitungan angka pasti & saran konkrit!`;

    const contents = [
      { parts: [{ text: systemInstruction }] },
      ...(history || []).map((h: { sender: string; text: string }) => ({
        role: h.sender === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents })
      }
    );

    const result = await response.json();

    if (result.error) {
      console.error('Ceko AI Gemini Error:', result.error);
      throw new Error(result.error.message || 'Gemini Error');
    }

    const replyText = result.candidates?.[0]?.content?.parts?.[0]?.text || 'Maaf, Ceko sedang memproses data. Silakan coba tanyakan kembali ya!';

    return NextResponse.json({
      success: true,
      reply: replyText
    });

  } catch (error) {
    console.error('Ceko AI API Error:', error);
    return NextResponse.json({
      success: true,
      reply: 'Halo! Ceko AI siap membantu Anda dengan konsultasi gizi, pencegahan PTM (Hipertensi, Diabetes, Obesitas), dan Stunting.'
    });
  }
}
