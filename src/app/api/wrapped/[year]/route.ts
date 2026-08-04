import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ year: string }> }
) {
  try {
    const { year } = await params;
    const yearNum = parseInt(year) || 2026;

    // Simulate counting from Prisma DB if configured, else fallback safely to mock statistics
    let totalLogs = 0;
    try {
      totalLogs = await prisma.foodLog.count();
    } catch (dbError) {
      totalLogs = 42; // default fallback count for mockup
    }

    // Minimum data requirement: check if user has at least 30 logged meals to unlock Wrapped experience
    const hasEnoughData = totalLogs >= 30;

    return NextResponse.json({
      has_enough_data: hasEnoughData,
      required_days: 30,
      current_days: totalLogs,
      year: yearNum,
      user_name: 'Rizky Fitrianto',
      stats: {
        total_scans: totalLogs,
        favorite_food: 'Ayam Bakar Madu',
        favorite_food_count: 36,
        average_calories: 1980,
        best_month: 'Maret (92% Pilihan Sehat)',
        worst_month: 'Desember (Cenderung Tinggi Gula/Lemak)',
        longest_streak: 28,
        badges_earned: 8,
        macro_percentages: {
          protein: 28, // vs 30% target
          carbs: 47,   // vs 45% target
          fat: 25      // vs 25% target
        },
        nutrition_personality: 'The Balanced Fueler 🥗⚡',
        personality_description: 'Kamu sangat mahir menyeimbangkan asupan karbohidrat kompleks dengan protein tanpa lemak berlebih.',
        favorite_meal_time: 'Makan Siang (Lunch) ☀️',
        favorite_meal_time_count: 142
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengagregasi data Nutrition Wrapped' }, { status: 500 });
  }
}
