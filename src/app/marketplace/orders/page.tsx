'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Clock, 
  MapPin,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/marketplace/order')
      .then((res) => res.json())
      .then((data) => {
        if (data.orders) setOrders(data.orders);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="space-y-1">
        <Link href="/marketplace" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Marketplace</span>
        </Link>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <Clock className="w-8 h-8 text-emerald-400" />
          <span>Riwayat Pesanan Kamu</span>
        </h1>
      </div>

      {/* Orders List */}
      <div className="space-y-5">
        {orders.length === 0 ? (
          <p className="text-xs text-slate-400 italic text-center p-8">Belum ada riwayat pesanan.</p>
        ) : (
          orders.map((ord) => (
            <div key={ord.id} className="bg-slate-900/60 border border-slate-850 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Nomor Pesanan</span>
                  <h4 className="text-xs font-black text-white">{ord.id}</h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 font-bold block">Tanggal</span>
                  <span className="text-xs text-slate-300 font-bold">{ord.created_at}</span>
                </div>
              </div>

              {/* Items in order */}
              <div className="space-y-2">
                {ord.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between text-xs text-slate-350">
                    <span>{item.name} <strong className="text-slate-500">x{item.quantity}</strong></span>
                    <strong className="text-white">Rp {item.price.toLocaleString('id-ID')}</strong>
                  </div>
                ))}
              </div>

              {/* Total Price and status mapping */}
              <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-xs text-slate-400">
                    Status: 
                    {ord.status === 'PAID' && (
                      <span className="ml-1.5 px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[9px] font-black uppercase">
                        Sudah Dibayar (Paid)
                      </span>
                    )}
                    {ord.status === 'PENDING' && (
                      <span className="ml-1.5 px-2 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-800 text-[9px] font-black uppercase">
                        Menunggu Pembayaran (Pending)
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span className="truncate max-w-[200px]" title={ord.address}>{ord.address}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase font-medium">Total Pembayaran</span>
                    <span className="text-sm font-black text-emerald-400">Rp {ord.total_price.toLocaleString('id-ID')}</span>
                  </div>

                  {ord.status === 'PENDING' && (
                    <a
                      href={`https://app.sandbox.midtrans.com/snap/v2/vtweb/${ord.snap_token}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs rounded-xl flex items-center gap-1"
                    >
                      <span>Selesaikan Pembayaran</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
