import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    products: [
      {
        id: 'prod-1',
        name: 'Whey Protein Isolate 1kg - Organic Grass Fed',
        description: 'Tinggi protein murni 27g per porsi tanpa gula tambahan, cepat diserap tubuh.',
        price: 349000,
        category: 'Suplemen',
        stock: 45,
        seller: 'NutriStore Official',
        image_url: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'prod-2',
        name: 'Granola Crunch Berry & Almond 500g',
        description: 'Sarapan bernutrisi tinggi serat alami tanpa pengawet sintesis.',
        price: 68000,
        category: 'Healthy Snack',
        stock: 120,
        seller: 'FitSnack Indonesia',
        image_url: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=400&q=80'
      },
      {
        id: 'prod-3',
        name: 'Digital Kitchen Scale Ultra Precision 0.1g',
        description: 'Timbangan dapur digital akurat untuk mengukur gramasi makanan & hitung kalori presisi.',
        price: 95000,
        category: 'Alat Kesehatan',
        stock: 30,
        seller: 'SmartKitchen Lab',
        image_url: 'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=400&q=80'
      }
    ]
  });
}
