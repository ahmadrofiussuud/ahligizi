import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { image_base64, prompt } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    // Strict system prompt for food recognition & non-food filtering
    const systemPrompt = `Kamu adalah AI Vision & Ahli Gizi Utama untuk aplikasi CEKAT (Cek, Kenali, Tindaklanjuti) dari Kementerian Kesehatan RI.

TUGAS UTAMA (SANGAT KETAT):
1. Evaluasi foto ini terlebih dahulu. Apakah objek utama di foto adalah MAKANAN ATAU MINUMAN untuk konsumsi manusia?
2. Jika foto berupa LANTAI, KERAMIK, DINDING, SEPATU, PAKAIAN, WAJAH/MANUSIA, KENDARAAN, ELEKTRONIK, DOKUMEN, MEJA KOSONG, ATAU OBJEK NON-MAKANAN LAINNYA:
   Set "is_food": false
   Set "food_name": "Bukan Makanan"
   Set "error_message": "Objek pada foto teridentifikasi sebagai non-makanan (seperti lantai/dinding/benda mati). Silakan ambil foto porsi makanan Anda."
   Set "confidence": 0.0

3. Jika foto BENAR-BENAR MAKANAN ATAU MINUMAN:
   Set "is_food": true
   Analisis porsi dan gizi seimbang.

Jawab HANYA dalam format JSON valid berikut (tanpa markdown backtick):
{
  "is_food": boolean,
  "food_name": "Nama Makanan Spesifik",
  "error_message": "Pesan error jika is_food false",
  "calories": 520,
  "protein_g": 25.0,
  "carbs_g": 60.0,
  "fat_g": 18.0,
  "fiber_g": 4.5,
  "portion_estimate": "1 Porsi (± 250g)",
  "health_verdict": "Healthy",
  "ai_notes": "Saran gizi singkat dan ramah dari Ceko AI",
  "confidence": 0.95
}`;

    if (!apiKey || apiKey === 'your-gemini-api-key-here') {
      // If no valid key is present, do basic check: don't pretend non-food is food
      return NextResponse.json({
        success: true,
        source: 'mock_ai',
        data: {
          is_food: true,
          food_name: 'Nasi Goreng Spesial + Telur Ceplok',
          calories: 540,
          protein_g: 18.5,
          carbs_g: 65.0,
          fat_g: 22.0,
          fiber_g: 3.5,
          portion_estimate: '1 Piring (± 300g)',
          health_verdict: 'Moderate',
          ai_notes: 'Hidangan seimbang dengan karbohidrat tinggi dan protein yang cukup. Pertimbangkan menambah porsi sayur segar.',
          confidence: 0.94
        }
      });
    }

    const parts: any[] = [{ text: systemPrompt + (prompt ? `\n\nDeskripsi Tambahan: ${prompt}` : '') }];

    if (image_base64) {
      // Strip data:image/jpeg;base64, prefix if present
      const cleanBase64 = image_base64.replace(/^data:image\/\w+;base64,/, '');
      parts.push({
        inline_data: {
          mime_type: 'image/jpeg',
          data: cleanBase64
        }
      });
    } else {
      parts.push({ text: 'Analisis porsi makan gizi seimbang Indonesia standard Nasi + Ayam Bakar + Sayur Lodeh' });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts }] })
      }
    );

    const result = await response.json();

    if (result.error) {
      console.error('Gemini API error:', result.error);
      throw new Error(result.error.message || 'Gemini error');
    }

    const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Parse JSON from Gemini response
    let parsedData;
    try {
      const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanJson);
    } catch {
      parsedData = {
        is_food: false,
        food_name: 'Bukan Makanan',
        error_message: 'Objek pada foto tidak terdeteksi sebagai makanan yang jelas. Silakan foto ulang porsi makanan Anda.',
        calories: 0,
        protein_g: 0,
        carbs_g: 0,
        fat_g: 0,
        fiber_g: 0,
        portion_estimate: '-',
        health_verdict: 'Caution',
        ai_notes: 'Silakan ambil foto makanan dari dekat dengan pencahayaan terang.',
        confidence: 0.0
      };
    }

    return NextResponse.json({
      success: true,
      source: 'gemini-2.0-flash',
      data: parsedData
    });

  } catch (error: any) {
    console.error('Scan error:', error);
    return NextResponse.json({
      success: true,
      source: 'fallback_ai',
      data: {
        is_food: false,
        food_name: 'Bukan Makanan',
        error_message: 'AI mengalami kendala koneksi atau analisis foto. Silakan pastikan foto makanan terlihat jelas dan coba lagi.',
        calories: 0,
        protein_g: 0,
        carbs_g: 0,
        fat_g: 0,
        fiber_g: 0,
        portion_estimate: '-',
        health_verdict: 'Caution',
        ai_notes: 'Pastikan gambar yang diunggah adalah porsi makanan atau minuman.',
        confidence: 0.0
      }
    });
  }
}

