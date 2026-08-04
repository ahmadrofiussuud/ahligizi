'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  ShoppingCart, 
  Search, 
  TrendingUp, 
  CheckCircle,
  Plus,
  ArrowRight
} from 'lucide-react';

export default function MarketplacePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  // Filter States
  const [category, setCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');

  // Recommendation states
  const [recommendation, setRecommendation] = useState<any>(null);

  // Success indicator state
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const categories = ['All', 'Suplemen', 'Healthy Snack', 'Alat Kesehatan'];

  // Fetch products
  const fetchProducts = () => {
    fetch('/api/marketplace')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setFilteredProducts(data.products || []);
      });
  };

  // Sync cart count
  const fetchCartCount = () => {
    fetch('/api/marketplace/cart')
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          setCartCount(data.items.reduce((acc: number, item: any) => acc + item.quantity, 0));
        }
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchCartCount();

    const profileStr = localStorage.getItem('nutrisnap_user_profile');
    if (profileStr) {
      const profile = JSON.parse(profileStr);
      if (profile.protein_target_g > 80 || profile.activity_level === 'very_active') {
        setRecommendation({
          title: 'Target Protein Tinggi',
          reason: 'Berdasarkan profil Anda, suplemen protein organik sangat disarankan.',
          product_id: 'prod-1',
          product_name: 'Whey Protein Isolate 1kg - Organic Grass Fed'
        });
      }
    }
  }, []);

  // Filter & Sort
  useEffect(() => {
    let result = [...products];

    if (category !== 'All') {
      result = result.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search.trim() !== '') {
      const query = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [category, search, sortBy, products]);

  const handleAddToCart = async (product: any) => {
    try {
      const res = await fetch('/api/marketplace/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product.id,
          name: product.name,
          price: product.price,
          image_url: product.image_url,
          quantity: 1
        })
      });

      if (res.ok) {
        fetchCartCount();
        setAddedProductId(product.id);
        setTimeout(() => setAddedProductId(null), 1500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-4">
      {/* Header and Cart Quick Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-105 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            Marketplace Produk Kesehatan
          </h1>
          <p className="text-slate-500 text-xs mt-1 font-semibold">
            Pilihan produk nutrisi organik dan alat ukur gizi berkualitas.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/marketplace/orders"
            className="px-4 py-2 bg-white border border-slate-100 text-slate-655 text-xs font-bold rounded-xl shadow-sm transition hover:text-slate-800"
          >
            Riwayat Pesanan
          </Link>
          <Link
            href="/cart"
            className="bg-white border border-slate-100 px-4 py-2 rounded-xl flex items-center space-x-2 text-xs font-bold text-slate-700 hover:border-emerald-250 hover:text-slate-850 shadow-sm transition"
          >
            <span>Keranjang ({cartCount})</span>
          </Link>
        </div>
      </div>

      {/* Smart Recommendation Banner */}
      {recommendation && (
        <div className="bg-white border border-emerald-100 p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl"></div>
          <div className="space-y-0.5 z-10">
            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-wider block">
              Rekomendasi Pintar
            </span>
            <h4 className="text-xs font-bold text-slate-800">
              {recommendation.title}
            </h4>
            <p className="text-[11px] text-slate-505 font-semibold">{recommendation.reason}</p>
          </div>
          <button
            onClick={() => handleAddToCart({ id: recommendation.product_id, name: recommendation.product_name, price: 349000, image_url: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=400&q=80' })}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 transition shadow-sm"
          >
            Beli Rekomendasi
          </button>
        </div>
      )}

      {/* Filters and Sorting controllers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                category === cat
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm'
                  : 'bg-white border-slate-105 text-slate-500 hover:text-slate-800'
              }`}
            >
              {cat === 'All' ? 'Semua Kategori' : cat}
            </button>
          ))}
        </div>

        {/* Search and Sort Dropdown */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-105 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-semibold shadow-sm"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-slate-105 rounded-xl p-1.5 text-xs text-slate-600 font-bold shadow-sm focus:outline-none"
          >
            <option value="default">Urutkan: Bawaan</option>
            <option value="price-asc">Harga: Terendah</option>
            <option value="price-desc">Harga: Tertinggi</option>
          </select>
        </div>
      </div>

      {/* Modern, Leaf-Style Curved Card with Microinteractions for Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredProducts.map((prod) => {
          const isAdded = addedProductId === prod.id;
          return (
            <div 
              key={prod.id} 
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-emerald-250 transition-all duration-350 ease-out group p-1"
            >
              <div className="space-y-4">
                {/* Curved Leaf border top-left matching reference layout */}
                <div className="relative h-48 rounded-tl-[2.2rem] overflow-hidden bg-slate-50 border-b border-slate-50">
                  <img 
                    src={prod.image_url} 
                    alt={prod.name} 
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
                  />
                  <span className="absolute top-4 left-4 bg-emerald-600 text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-md shadow-sm">
                    {prod.category}
                  </span>
                </div>

                <div className="px-4 pb-2 space-y-1.5">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">{prod.seller}</span>
                  <h3 className="text-sm font-extrabold text-slate-800 leading-tight group-hover:text-emerald-700 transition-colors duration-250">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed line-clamp-2">{prod.description}</p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-4 border-t border-slate-50 flex items-center justify-between mt-2">
                <div>
                  <span className="text-[9px] text-slate-450 block font-bold">Harga</span>
                  <span className="text-base font-black text-emerald-600">
                    Rp {prod.price.toLocaleString('id-ID')}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(prod)}
                  className={`px-4.5 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all duration-300 flex items-center gap-1.5 ${
                    isAdded 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 scale-105' 
                      : 'bg-emerald-600 hover:bg-emerald-700 hover:scale-105 active:scale-95 text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Berhasil</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-90" />
                      <span>Keranjang</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
