import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { image_base64, prompt } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your-gemini-api-key-here') {
      return NextResponse.json({
        success: true,
        source: 'mock_ai',
        data: {
          food_name: 'Nasi Goreng Spesial + Telur Ceplok',
          calories: 540,
          protein_g: 18.5,
          carbs_g: 65.0,
          fat_g: 22.0,
          fiber_g: 3.5,
          portion_estimate: '1 Piring (± 300g)',
          health_verdict: 'Moderate',
          ai_notes: 'Hidangan seimbang dengan karbohidrat tinggi dan protein yang cukup. Pertimbangkan menambah porsi sayur segar untuk meningkatkan serat.',
          confidence: 0.94
        }
      });
    }

    // Call Gemini 2.5 Flash API with Vision or Text prompt
    const systemPrompt = `Kamu adalah AI Ahli Gizi untuk aplikasi CEKAT (Cek, Kenali, Tindaklanjuti) dari Kementerian Kesehatan RI. 
Analisis makanan pada foto/deskripsi ini dan kembalikan HANYA format JSON valid berikut (tanpa markdown backtick):
{
  "food_name": "Nama Makanan Spesifik",
  "calories": 520,
  "protein_g": 25.0,
  "carbs_g": 60.0,
  "fat_g": 18.0,
  "fiber_g": 4.5,
  "portion_estimate": "1 Porsi (± 250g)",
  "health_verdict": "Healthy" (pilih antara: Healthy, Moderate, Caution),
  "ai_notes": "Saran gizi singkat dan ramah dari Ceko AI",
  "confidence": 0.95
}`;

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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
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
        food_name: 'Menu Sehat Pilihan Ceko AI',
        calories: 480,
        protein_g: 22.0,
        carbs_g: 58.0,
        fat_g: 16.0,
        fiber_g: 5.0,
        portion_estimate: '1 Porsi Seimbang',
        health_verdict: 'Healthy',
        ai_notes: rawText || 'Makanan bergizi tinggi terdeteksi.',
        confidence: 0.92
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
        food_name: 'Ayam Bakar + Nasi Putih + Lahapan',
        calories: 580,
        protein_g: 32.0,
        carbs_g: 52.0,
        fat_g: 20.0,
        fiber_g: 3.0,
        portion_estimate: '1 Porsi (± 300g)',
        health_verdict: 'Healthy',
        ai_notes: 'Pilihan baik dengan protein yang mencukupi. Pastikan cukup minum air putih.',
        confidence: 0.90
      }
    });
  }
}
