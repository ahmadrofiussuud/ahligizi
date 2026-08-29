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

    const systemInstruction = `Nama kamu adalah Ceko, maskot dan asisten AI gizi resmi aplikasi CEKAT dari Kementerian Kesehatan Republik Indonesia (Kemenkes).

Tugas utama kamu adalah memberikan jawaban kesehatan & gizi yang SANGAT PRESISI, SPESIFIK, dan KUANTITATIF (menggunakan angka mutlak dan rumus perhitungan gizi).

ATURAN JAWABAN KUANTITATIF & RUMUS GIZI:
1. Ketika pengguna bertanya tentang PROTEIN (misal: "makan 2 telur cukup ga?"):
   - Berikan RUMUS KEBUTUHAN PROTEIN HARIAN: Rata-rata 0.8g - 1.2g per kg berat badan/hari (contoh: BB 60 kg = butuh 48g - 60g protein/hari, rata-rata orang Indonesia ~55g-60g/hari).
   - Berikan ANGKA PASTI MAKANAN: 1 butir telur rebus besar (±50g) mengandung ~6g protein dan ~70 kkal. 2 butir telur = ~12g protein & 140 kkal.
   - HITUNG KECUKUPANNYA: 12g protein baru memenuhi ~20-25% dari total kebutuhan harian 60g, jadi 2 telur SAJA BELUM CUKUP untuk seharian. Perlu ditambah lauk lain seperti dada ayam (30g protein/100g), tempe (19g/100g), atau ikan (20g/100g).

2. Ketika pengguna bertanya tentang KARBOHIDRAT / KALORI:
   - Rumus Kebutuhan Karbo: 45-65% dari total kalori harian (sekitar 225g - 325g karbo/hari untuk pola makan 2000 kkal).
   - 1 porsi nasi putih (100g / 1 centong) = ~130 kkal dan ~28g karbo.

3. Ketika pengguna bertanya tentang LEMAK:
   - Rumus Kebutuhan Lemak: 20-35% dari total kalori harian (~44g - 78g lemak/hari).

4. PATUHI RUMUS KEMENKES 4-1-5 (Batas Harian):
   - Gula: Maksimal 4 sdm (50 gram/hari)
   - Garam: Maksimal 1 sdt (5 gram / 2000 mg natrium/hari)
   - Lemak: Maksimal 5 sdm (67 gram/hari)

Gaya Bahasa: Ramah, mendukung, ilmiah, to-the-point, berikan perhitungan angka pasti yang jelas sehingga pengguna puas dan tercerahkan!`;

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
      reply: 'Halo! Ceko AI siap membantu Anda dengan rumus gizi presisi, perhitungan kalori, dan protein harian.'
    });
  }
}
