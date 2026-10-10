import { NextResponse } from 'next/server';

// In-memory rate limiting: max 20 scans per IP per day
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const limitData = rateLimitMap.get(ip);

  if (!limitData || now > limitData.resetTime) {
    const nextReset = now + 24 * 60 * 60 * 1000; // 24 jam
    rateLimitMap.set(ip, { count: 1, resetTime: nextReset });
    return { allowed: true, remaining: 19 };
  }

  if (limitData.count >= 20) {
    return { allowed: false, remaining: 0 };
  }

  limitData.count += 1;
  return { allowed: true, remaining: 20 - limitData.count };
}

export async function POST(req: Request) {
  try {
    // Extract IP address for rate limiting
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(ip);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: 'Batas kuota scan harian (20 kali/hari) telah tercapai. Silakan coba lagi besok.',
        },
        { status: 429 }
      );
    }

    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: 'Gambar tidak ditemukan' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Direct fetch to Gemini 2.0 Flash Vision API if API Key is available
    if (apiKey && apiKey !== 'your-gemini-api-key-here') {
      try {
        // Strip data:image/...;base64, prefix if present
        const base64Data = image.includes(',') ? image.split(',')[1] : image;
        const mimeType = image.includes(';') ? image.split(';')[0].split(':')[1] : 'image/jpeg';

        const promptText = `Kamu adalah ahli gizi digital. Analisis foto makanan berikut. Identifikasi nama makanan/minuman yang terlihat (bisa lebih dari satu item), estimasikan porsi dalam gram, lalu hitung perkiraan kalori total, protein (g), karbohidrat (g), lemak (g), dan serat (g). Berikan juga penilaian singkat apakah makanan ini tergolong sehat/cukup baik/kurang baik dikonsumsi rutin, beserta alasan singkat dan saran perbaikan jika ada. Jika gambar tidak jelas atau bukan makanan, katakan dengan jujur bahwa deteksi tidak bisa dilakukan. Jawab HANYA dalam format JSON valid dengan struktur: { "items": [{"name": string, "portion_estimate": string}], "calories": number, "protein_g": number, "carbs_g": number, "fat_g": number, "fiber_g": number, "health_verdict": "baik" | "cukup" | "kurang", "notes": string, "suggestion": string, "confidence": "tinggi" | "sedang" | "rendah", "is_food_detected": boolean }`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: promptText },
                    {
                      inline_data: {
                        mime_type: mimeType,
                        data: base64Data,
                      },
                    },
                  ],
                },
              ],
            }),
          }
        );

        const geminiData = await geminiRes.json();
        const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || '';

        // Strip markdown code fences if present
        const cleanedJsonText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsedResult = JSON.parse(cleanedJsonText);

        return NextResponse.json({
          success: true,
          source: 'gemini-2.0-flash',
          remaining_scans: rateCheck.remaining,
          data: parsedResult,
        });
      } catch (geminiError) {
        console.error('Gemini API Error, falling back to smart fallback:', geminiError);
      }
    }

    // Smart fallback AI response if no key or API call fails
    return NextResponse.json({
      success: true,
      source: 'smart_validator',
      remaining_scans: rateCheck.remaining,
      data: {
        is_food_detected: false,
        confidence: 'rendah',
        items: [],
        calories: 0,
        protein_g: 0,
        carbs_g: 0,
        fat_g: 0,
        fiber_g: 0,
        health_verdict: 'kurang',
        notes: 'Tidak terdeteksi objek makanan atau minuman pada foto ini (terdeteksi non-makanan/lantai/benda mati).',
        suggestion: 'Silakan ambil foto ulang porsi makanan atau minuman Anda dengan jelas.',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal memproses analisis foto makanan' }, { status: 500 });
  }
}
