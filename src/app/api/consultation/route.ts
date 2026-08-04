import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    experts: [
      {
        id: 'exp-1',
        name: 'dr. Sarah Amanda, Sp.GK',
        specialization: 'Spesialis Gizi Klinik & Manajemen Berat Badan',
        credentials: 'M.Sc Nutrition (UI) - STR Active',
        photo_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
        price_per_session: 150000,
        rating: 4.9,
        bio: 'Pengalaman 8+ tahun mendampingi pasien diet medis, penurunan berat badan, dan manajemen diabetes.',
      },
      {
        id: 'exp-2',
        name: 'Nutrionist Dimas Prasetyo, S.Gz',
        specialization: 'Ahli Gizi Olahraga & Muscle Building',
        credentials: 'S.Gz (UGM) - Cert. Sports Nutrition',
        photo_url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
        price_per_session: 120000,
        rating: 4.8,
        bio: 'Fokus pada meal plan atlet, pembentukan massa otot, serta peningkatan performa fisik.',
      },
      {
        id: 'exp-3',
        name: 'dr. Budi Kusuma, M.Gizi',
        specialization: 'Kesehatan Pencernaan & Diet Herbal',
        credentials: 'M.Gizi (UNPAD)',
        photo_url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
        price_per_session: 135000,
        rating: 4.95,
        bio: 'Pakar pola makan sehat alami untuk mengatasi Maag, GERD, dan masalah pencernaan kronis.',
      }
    ]
  });
}
