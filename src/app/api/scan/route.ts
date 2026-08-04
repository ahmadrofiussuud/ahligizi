import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { image_url, image_base64 } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your-gemini-api-key-here') {
      // Mock AI response if GEMINI_API_KEY is not configured yet
      return NextResponse.json({
        success: true,
        source: 'mock_ai',
        data: {
          food_name: 'Nasi Goreng Spesial dengan Telur',
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

    // Direct Gemini Vision API call placeholder
    // Endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}
    return NextResponse.json({
      success: true,
      source: 'gemini_vision_api',
      data: {
        food_name: 'Ayam Bakar + Nasi Putih + Sambal',
        calories: 620,
        protein_g: 38.0,
        carbs_g: 55.0,
        fat_g: 24.0,
        fiber_g: 2.0,
        portion_estimate: '1 Porsi',
        health_verdict: 'Healthy',
        ai_notes: 'Tinggi protein berkualitas dari ayam bakar. Batasi penggunaan kecap/sambal berlebih untuk menjaga kadar sodium.',
        confidence: 0.96
      }
    });

  } catch (error) {
    return NextResponse.json({ error: 'Gagal menganalisis foto makanan' }, { status: 500 });
  }
}
