import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    year: 2026,
    user_name: 'Rizky Fitrianto',
    total_meals_scanned: 684,
    total_calories_logged: 1245000,
    top_food: 'Nasi Goreng Spesial',
    top_food_count: 42,
    favorite_category: 'Tinggi Protein',
    best_streak: 28,
    healthy_verdict_percentage: 84,
    nutrition_archetype: 'The Balanced Fueler 🥗⚡',
    summary_quote: 'Tahun ini kamu luar biasa konsisten menjaga pola makan dan asupan makronutrisi!'
  });
}
