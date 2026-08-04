'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Search, 
  User, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Bookmark, 
  Heart,
  TrendingUp,
  Settings,
  ArrowRight
} from 'lucide-react';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('All');
  
  // Bookmarked articles state
  const [savedIds, setSavedIds] = useState<string[]>([]);
  
  // Persona personalization recommendation states
  const [recommendation, setRecommendation] = useState<any>(null);

  const categories = ['All', 'Nutrisi Dasar', 'Diet & Berat Badan', 'Resep Sehat', 'Mitos vs Fakta'];

  // Fetch articles listing
  const fetchArticlesList = () => {
    fetch(`/api/articles?category=${category}&search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) setArticles(data.articles);
      });
  };

  useEffect(() => {
    fetchArticlesList();
  }, [category, search]);

  useEffect(() => {
    // Custom recommendation based on user profile logs (simulate check for high sugar/carbs warning)
    const profileStr = localStorage.getItem('nutrisnap_user_profile');
    if (profileStr) {
      const profile = JSON.parse(profileStr);
      if (profile.weight_kg > 80 || profile.activity_level === 'sedentary') {
        setRecommendation({
          title: 'Rekomendasi Diet untuk Anda',
          reason: 'Berdasarkan profil sedentary/berat badan Anda, kurangi asupan karbohidrat tinggi lemak.',
          article_slug: '5-alasan-calorie-counting-efektif',
          article_title: '5 Alasan Kenapa Menghitung Kalori Sangat Efektif Turunkan Berat Badan'
        });
      } else {
        setRecommendation({
          title: 'Edukasi Mengurangi Konsumsi Gula',
          reason: 'Berdasarkan log asupan harian, pertimbangkan tips membatasi konsumsi gula.',
          article_slug: 'bahaya-konsumsi-gula-berlebih',
          article_title: 'Bahaya Konsumsi Gula Berlebih dan Cara Mengatasinya'
        });
      }
    }
  }, []);

  const handleToggleBookmark = (id: string) => {
    setSavedIds((prev) => 
      prev.includes(id) ? prev.filter((bookmarkId) => bookmarkId !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-4">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Artikel & Edukasi Kesehatan
          </h1>
          <p className="text-slate-500 text-xs mt-1 font-semibold">
            Wawasan nutrisi terpercaya dan panduan gaya hidup sehat langsung dari praktisi medis.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/articles"
            className="px-4 py-2 bg-white border border-slate-100 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <span>Panel Tulis Artikel</span>
          </Link>
        </div>
      </div>

      {/* Personalized Health recommendation block */}
      {recommendation && (
        <div className="bg-white border border-emerald-100 p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl"></div>
          <div className="space-y-0.5 z-10">
            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest block">
              Rekomendasi Personal
            </span>
            <h4 className="text-xs font-bold text-slate-800 leading-tight">
              {recommendation.title}
            </h4>
            <p className="text-xs text-slate-555 font-semibold">{recommendation.reason}</p>
          </div>
          <Link
            href={`/articles/${recommendation.article_slug}`}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 flex items-center gap-1 shadow-sm transition"
          >
            <span>Baca Sekarang</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Categories grid */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                category === cat
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                  : 'bg-white border-slate-105 text-slate-500 hover:text-slate-800'
              }`}
            >
              {cat === 'All' ? 'Semua Kategori' : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari artikel gizi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-105 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-semibold shadow-sm"
          />
        </div>
      </div>

      {/* Articles Grid Listing using the Premium Leaf-Style Curved Card with Microinteractions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((art) => {
          const isSaved = savedIds.includes(art.id);
          return (
            <article 
              key={art.id} 
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-emerald-250 transition-all duration-350 ease-out group relative"
            >
              {/* Bookmark Save icon with microinteraction */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleToggleBookmark(art.id);
                }}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-xl bg-white/95 border border-slate-100 hover:bg-white hover:scale-110 active:scale-90 shadow-sm transition-all duration-200"
                title="Simpan Bookmark Artikel"
              >
                <Bookmark className={`w-4 h-4 transition-all duration-200 ${isSaved ? 'text-emerald-600 fill-emerald-600 scale-110' : 'text-slate-400 group-hover:text-slate-600'}`} />
              </button>

              <Link href={`/articles/${art.slug}`} className="block flex-1 flex flex-col">
                
                {/* Leaf-style top-left rounded curve matching reference card image */}
                <div className="relative h-52 overflow-hidden bg-slate-50 border-b border-slate-50 rounded-tl-[2.2rem]">
                  
                  {/* Photo with subtle hover zoom action */}
                  <img 
                    src={art.cover_image_url} 
                    alt={art.title} 
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
                  />
                  
                  {/* Category Pill Tag floating in the top right corner matching layout reference */}
                  <span className="absolute top-4 left-4 bg-emerald-600 text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-md shadow-sm">
                    {art.category}
                  </span>
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <h3 className="text-sm font-extrabold text-slate-800 transition-colors duration-250 group-hover:text-emerald-700 leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-semibold">
                      {art.content}
                    </p>
                  </div>

                  {/* Microinteraction-driven "Learn More" Link with arrow push behavior */}
                  <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center text-[10px] text-emerald-600 font-extrabold gap-1 hover:text-emerald-700 transition">
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                    </div>
                  </div>

                </div>
              </Link>

              {/* Author & reading stats */}
              <div className="p-6 pt-0 flex items-center justify-between text-[10px] text-slate-400 font-bold border-t border-slate-50 mt-1">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  {art.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{art.reading_time_mins} Menit Baca</span>
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
