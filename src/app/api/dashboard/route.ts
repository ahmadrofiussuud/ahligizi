import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    user: {
      id: 'demo-user-1',
      name: 'Rizky Fitrianto',
      email: 'user@nutrisnap.id',
      daily_calorie_target: 2100,
      consumed_calories: 1420,
      protein_g: 82,
      carbs_g: 165,
      fat_g: 45,
      fiber_g: 18,
      water_ml: 1800,
    },
    todays_logs: [
      {
        id: 'log-1',
        meal_type: 'BREAKFAST',
        food_name: 'Oatmeal Pisang & Almond',
        calories: 350,
        protein_g: 12,
        carbs_g: 54,
        fat_g: 8,
        logged_at: '07:30 WIB',
        image_url: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'log-2',
        meal_type: 'LUNCH',
        food_name: 'Dada Ayam Panggang & Salad',
        calories: 530,
        protein_g: 45,
        carbs_g: 30,
        fat_g: 16,
        logged_at: '12:45 WIB',
        image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'log-3',
        meal_type: 'SNACK',
        food_name: 'Smoothie Protein Alpukat',
        calories: 270,
        protein_g: 15,
        carbs_g: 22,
        fat_g: 12,
        logged_at: '16:15 WIB',
        image_url: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=400&q=80'
      }
    ]
  });
}
