import { NextResponse } from 'next/server';

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image_url: string;
  category: string;
  author: string;
  published_at: string;
  reading_time_mins: number;
}

// In-Memory Database for healthy articles
let articlesList: Article[] = [
  {
    id: 'art-1',
    title: '5 Alasan Kenapa Menghitung Kalori Sangat Efektif Turunkan Berat Badan',
    slug: '5-alasan-calorie-counting-efektif',
    category: 'Diet & Berat Badan',
    author: 'Tim NutriSnap',
    published_at: '01 Agustus 2026',
    reading_time_mins: 4,
    cover_image_url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80',
    content: 'Menghitung kalori (calorie counting) secara teratur membantu menciptakan kesadaran tentang asupan makanan harian kita. Dengan mengetahui jumlah kalori masuk versus kalori keluar, kita dapat secara konsisten mempertahankan defisit kalori sehat untuk menurunkan berat badan tanpa mengalami kekurangan gizi mikro vital.'
  },
  {
    id: 'art-2',
    title: 'Mengenal Makanan Utuh (Whole Foods) dan Manfaatnya bagi Pencernaan',
    slug: 'mengenal-makanan-utuh-whole-foods',
    category: 'Nutrisi Dasar',
    author: 'dr. Sarah Amanda, Sp.GK',
    published_at: '28 Juli 2026',
    reading_time_mins: 6,
    cover_image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    content: 'Makanan utuh (whole foods) adalah makanan yang diproses seminimal mungkin sebelum dikonsumsi. Makanan jenis ini kaya akan serat alami, antioksidan, serta enzim pencernaan yang sangat bermanfaat bagi mikrobioma usus kita. Hindari ultra-processed food untuk menjaga metabolisme tetap prima.'
  },
  {
    id: 'art-3',
    title: 'Panduan Praktis Membuat Salad Sayur Rendah Kalori dan Lemak Jenuh',
    slug: 'panduan-porsi-makan-seimbang',
    category: 'Resep Sehat',
    author: 'Nutrionist Dimas Prasetyo',
    published_at: '25 Juli 2026',
    reading_time_mins: 5,
    cover_image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    content: 'Salad sayur seringkali tidak lagi menyehatkan ketika ditambahkan dressing mayonnaise yang tinggi kalori dan lemak jenuh. Gunakan dressing berbasis olive oil, lemon segar, atau yogurt tawar untuk salad yang benar-benar menjaga defisit kalori Anda tetap on-track.'
  },
  {
    id: 'art-4',
    title: 'Bahaya Konsumsi Gula Berlebih dan Cara Mengatasinya',
    slug: 'bahaya-konsumsi-gula-berlebih',
    category: 'Nutrisi Dasar',
    author: 'dr. Sarah Amanda, Sp.GK',
    published_at: '03 Agustus 2026',
    reading_time_mins: 8,
    cover_image_url: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?auto=format&fit=crop&w=600&q=80',
    content: 'Konsumsi gula berlebih dapat memicu resistensi insulin, obesitas, dan penumpukan lemak di hati. Artikel ini dirancang khusus bagi Anda yang sering mengonsumsi makanan tinggi gula/karbohidrat olahan untuk memberikan panduan detoksifikasi gula secara bertahap.'
  }
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  if (slug) {
    const article = articlesList.find((a) => a.slug === slug);
    if (!article) return NextResponse.json({ error: 'Artikel tidak ditemukan' }, { status: 404 });
    
    // Find related articles in the same category
    const related = articlesList.filter((a) => a.category === article.category && a.id !== article.id);
    
    return NextResponse.json({ article, related });
  }

  let filtered = [...articlesList];

  if (category && category !== 'All') {
    filtered = filtered.filter((a) => a.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter((a) => a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q));
  }

  return NextResponse.json({ articles: filtered });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, cover_image_url, category, author } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Judul dan konten wajib diisi' }, { status: 400 });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newArticle: Article = {
      id: `art-${Date.now()}`,
      title,
      slug,
      content,
      cover_image_url: cover_image_url || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80',
      category: category || 'Nutrisi Dasar',
      author: author || 'Admin NutriSnap',
      published_at: 'Hari Ini',
      reading_time_mins: Math.max(1, Math.round(content.split(' ').length / 200))
    };

    articlesList.unshift(newArticle);

    return NextResponse.json({ success: true, article: newArticle });
  } catch (err) {
    return NextResponse.json({ error: 'Gagal membuat artikel' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    articlesList = articlesList.filter((a) => a.id !== id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Gagal menghapus artikel' }, { status: 500 });
  }
}
export { articlesList };
