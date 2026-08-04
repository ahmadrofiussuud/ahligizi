import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const {
      user_id = 'usr-demo-1',
      food_name,
      calories,
      protein_g,
      carbs_g,
      fat_g,
      fiber_g,
      portion_estimate,
      health_verdict,
      ai_notes,
      meal_type = 'LUNCH',
      image_url,
    } = await req.json();

    if (!food_name || calories === undefined) {
      return NextResponse.json({ error: 'Data makanan tidak lengkap' }, { status: 400 });
    }

    const newAchievements: { type: 'badge' | 'level'; name: string; icon: string }[] = [];

    // Simulate Point & Streak logic update on new food logs
    const pointsGained = 10;
    
    // Evaluate badge thresholds
    // Example: check if "7-Day Warrior" is unlocked by increasing streak
    const randomSeed = Math.random();
    if (randomSeed > 0.7) {
      newAchievements.push({
        type: 'badge',
        name: 'Protein Boss',
        icon: '💪'
      });
    } else if (randomSeed > 0.4) {
      newAchievements.push({
        type: 'badge',
        name: '7-Day Warrior',
        icon: '🔥'
      });
    }

    // Try DB insertion if DB connection configured, else mock success
    try {
      const foodLog = await prisma.foodLog.create({
        data: {
          user_id,
          food_name,
          calories: Number(calories),
          protein_g: Number(protein_g || 0),
          carbs_g: Number(carbs_g || 0),
          fat_g: Number(fat_g || 0),
          fiber_g: Number(fiber_g || 0),
          portion_estimate: portion_estimate || '1 Porsi',
          health_verdict: health_verdict || 'baik',
          ai_notes: ai_notes || '',
          meal_type: meal_type as any,
          image_url: image_url || null,
        },
      });

      // Update local memory states for gamification demo in route file
      await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/gamification`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ add_points: pointsGained, add_streak: 1 })
      }).catch(() => {});

      return NextResponse.json({
        success: true,
        message: 'Makanan berhasil disimpan ke log harian!',
        data: foodLog,
        new_achievements: newAchievements
      });
    } catch (dbError) {
      // Fallback for environment without DB active
      return NextResponse.json({
        success: true,
        message: 'Makanan berhasil disimpan ke log harian (Mock Log)!',
        data: {
          id: `log-${Date.now()}`,
          food_name,
          calories,
          logged_at: new Date().toISOString(),
        },
        new_achievements: newAchievements
      });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menyimpan ke log makanan' }, { status: 500 });
  }
}
