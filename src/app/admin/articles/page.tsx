'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Settings, 
  ArrowLeft, 
  Sparkles,
  FileText,
  Trash2,
  CheckCircle2
} from 'lucide-react';

export default function AdminArticlesPage() {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Nutrisi Dasar');
  const [coverImageUrl, setCoverImageUrl] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [author, setAuthor] = useState<string>('Dr. Sarah Amanda');

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          cover_image_url: coverImageUrl,
          content,
          author
        })
      });

      if (res.ok) {
        setSuccess(true);
        setTitle('');
        setCoverImageUrl('');
        setContent('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Navigation and Header */}
      <div className="space-y-1">
        <Link href="/articles" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Artikel</span>
        </Link>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <Settings className="w-8 h-8 text-emerald-400" />
          <span>Panel Admin: Tulis Artikel Baru</span>
        </h1>
      </div>

      <form onSubmit={handleCreateArticle} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Judul Artikel</label>
            <input
              type="text"
              required
              placeholder="Contoh: Manfaat Defisit Kalori..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
              >
                <option value="Nutrisi Dasar">Nutrisi Dasar</option>
                <option value="Diet & Berat Badan">Diet & Berat Badan</option>
                <option value="Resep Sehat">Resep Sehat</option>
                <option value="Mitos vs Fakta">Mitos vs Fakta</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Nama Penulis</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">URL Gambar Cover</label>
          <input
            type="text"
            placeholder="https://images.unsplash.com/..."
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* TipTap/Standard textarea simulator */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Konten Artikel (Format Markdown didukung)</label>
          <textarea
            required
            rows={8}
            placeholder="Tulis artikel kesehatan kamu di sini... gunakan format Markdown untuk styling paragraf."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>

        {success && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-center text-xs font-bold text-emerald-300 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Artikel Baru Berhasil Diterbitkan Publik!</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-emerald-950 font-extrabold text-xs shadow-lg hover:brightness-110 active:scale-98 transition flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>{loading ? 'Menerbitkan...' : 'Terbitkan Artikel Baru'}</span>
        </button>
      </form>
    </div>
  );
}
