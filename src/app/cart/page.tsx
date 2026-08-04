'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowLeft, 
  CreditCard, 
  MapPin, 
  CheckCircle,
  ChevronRight
} from 'lucide-react';

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const [address, setAddress] = useState<string>('');
  
  const [bookingSuccess, setBookingSuccess] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCartItems = () => {
    fetch('/api/marketplace/cart')
      .then((res) => res.json())
      .then((data) => {
        if (data.items) setItems(data.items);
      });
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleDeleteItem = async (productId: string) => {
    try {
      const res = await fetch('/api/marketplace/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId })
      });
      if (res.ok) fetchCartItems();
    } catch (err) {
      console.error(err);
    }
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0 || !address.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/marketplace/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          total_price: calculateTotal(),
          address
        })
      });

      const data = await res.json();
      if (res.ok) {
        setBookingSuccess(data);
        // Clear cart on success
        await fetch('/api/marketplace/cart', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clear_all: true })
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="space-y-1">
        <Link href="/marketplace" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Marketplace</span>
        </Link>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <ShoppingBag className="w-8 h-8 text-emerald-400" />
          <span>Keranjang Belanja Kamu</span>
        </h1>
      </div>

      {bookingSuccess ? (
        /* Order success & Midtrans redirect simulator card */
        <div className="bg-slate-900 border border-emerald-500/50 rounded-2xl p-6 text-center space-y-5 shadow-xl">
          <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
          <div>
            <h4 className="text-base font-bold text-white">Pesanan Berhasil Dibuat!</h4>
            <p className="text-xs text-slate-400 mt-1">
              Silakan selesaikan pembayaran fiktif melalui portal sandbox Midtrans berikut.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-left space-y-1.5 text-xs text-slate-300">
            <p>ID Pesanan: <strong>{bookingSuccess.order.id}</strong></p>
            <p>Snap Token: <strong>{bookingSuccess.snap_token}</strong></p>
            <p>Total Nominal: <strong>Rp {calculateTotal().toLocaleString('id-ID')}</strong></p>
          </div>

          <div className="flex gap-2">
            <a
              href={bookingSuccess.redirect_url}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-xs text-center block transition"
            >
              Bayar Sandbox Midtrans
            </a>
            <Link
              href="/marketplace/orders"
              className="px-4 py-3.5 rounded-xl bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <span>Riwayat Pesanan</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* Cart Listing & Checkout Form */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Keranjang belanja kosong.</p>
            ) : (
              items.map((item) => (
                <div key={item.product_id} className="bg-slate-900/60 border border-slate-850 p-4 rounded-2xl flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-3 min-w-0">
                    <img src={item.image_url} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-800" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                      <p className="text-xs text-emerald-400 font-bold mt-0.5">
                        Rp {item.price.toLocaleString('id-ID')} <span className="text-[10px] text-slate-500 font-normal">x{item.quantity}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteItem(item.product_id)}
                    className="p-2 text-slate-500 hover:text-rose-400 transition hover:bg-slate-850 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Checkout sidebar */}
          {items.length > 0 && (
            <form onSubmit={handleCheckout} className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4 h-fit">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-slate-800 pb-2">
                Ringkasan Pemesanan
              </h3>

              <div className="flex justify-between text-xs text-slate-300">
                <span>Total Harga ({items.length} item)</span>
                <strong className="text-emerald-400">Rp {calculateTotal().toLocaleString('id-ID')}</strong>
              </div>

              {/* Delivery Address */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold block uppercase flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Alamat Pengiriman</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Masukkan alamat lengkap..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-emerald-950 font-extrabold text-xs shadow-lg hover:brightness-110 transition flex items-center justify-center gap-1.5"
              >
                <CreditCard className="w-4 h-4" />
                <span>{loading ? 'Memproses...' : 'Checkout & Bayar'}</span>
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
