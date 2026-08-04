'use client';

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { marked } from 'marked';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  Clock, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/articles?slug=${slug}`)
      .then((res) => res.json())
      .then((d) => setData(d));
  }, [slug]);

  if (!data) return <div className="p-8 text-center text-slate-400">Loading Artikel...</div>;

  const { article, related } = data;

  // Render markdown parser content safely
  const parsedMarkdown = marked.parse(article.content || '') as string;

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      {/* Back Button */}
      <Link href="/articles" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke Daftar Artikel</span>
      </Link>

      {/* Article Detail Block */}
      <article className="space-y-6">
        <div className="space-y-3">
          <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-extrabold uppercase px-3 py-1 rounded-md tracking-wider">
            {article.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.published_at}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.reading_time_mins} Menit Baca</span>
            </span>
          </div>
        </div>

        {/* Cover image */}
        <div className="h-64 sm:h-96 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
          <img src={article.cover_image_url} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Rich Text Markdown Content rendering */}
        <div 
          className="prose prose-invert max-w-none text-sm text-slate-300 leading-relaxed space-y-4 pt-4"
          dangerouslySetInnerHTML={{ __html: parsedMarkdown }}
        />
      </article>

      {/* Related articles block */}
      {related && related.length > 0 && (
        <div className="border-t border-slate-800 pt-8 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Artikel Terkait</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((rel: any) => (
              <Link 
                key={rel.id} 
                href={`/articles/${rel.slug}`}
                className="bg-slate-900/60 border border-slate-850 p-4 rounded-xl flex justify-between items-center hover:border-slate-700 transition space-x-3"
              >
                <div className="min-w-0">
                  <span className="text-[9px] text-slate-500 font-bold block uppercase">{rel.category}</span>
                  <h4 className="text-xs font-bold text-white truncate mt-0.5">{rel.title}</h4>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-400 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
