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
        reply: 'Halo! Saya Ceko, asisten AI gizi Anda. Mohon konfigurasikan GEMINI_API_KEY di file .env.local untuk konsultasi penuh secara langsung!'
      });
    }

    const systemInstruction = `Nama kamu adalah Ceko (singkatan dari Cekat Konsultasi AI), maskot dan asisten AI resmi aplikasi CEKAT dari Kementerian Kesehatan Republik Indonesia. 
Tugas kamu adalah menjawab pertanyaan pengguna seputar:
1. Kandungan gizi & kalori makanan Indonesia (nasi goreng, soto, gado-gado, dll).
2. Pantangan penyakit tidak menular (Hipertensi, Diabetes, Kolesterol, Asam Urat, Stunting).
3. Batas konsumsi harian Garam (5g / 1 sdt), Gula (50g / 4 sdm), dan Lemak (67g / 5 sdm) — rumus 4-1-5 Kemenkes.
4. Tips hidup sehat sederhana dan memotivasi.

Gaya Bahasa: Ramah, profesional, suportif, ilmiah namun mudah dipahami, gunakan Bahasa Indonesia yang menyenangkan. Jawaban singkat padat 2-4 kalimat.`;

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
      reply: 'Halo! Ceko AI siap membantu Anda dengan informasi seputar kalori, gizi seimbang, dan tips pencegahan penyakit.'
    });
  }
}
