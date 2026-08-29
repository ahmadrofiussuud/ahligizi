'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Leaf, Mail, Phone, MapPin, Share2, Globe } from "lucide-react";

import React, { useState, useEffect } from 'react';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Register PWA service worker on mount
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('PWA Service Worker registered:', reg.scope))
        .catch((err) => console.error('PWA Service Worker registration failed:', err));
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isCekatRoute = pathname === '/app' || pathname === '/station';

  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-emerald-50/40 text-slate-800 min-h-screen flex flex-col`}>
        {(!isCekatRoute || !isClient) && <Navbar />}
        {/* Dynamic Layout Wrapper: Landing page takes true 100% full-width */}
        <main className={`flex-1 w-full ${
          isLandingPage
            ? 'px-0 py-0' 
            : isCekatRoute
            ? 'p-0 max-w-full'
            : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'
        }`}>
          {children}
        </main>
        
        {/* Professional Premium Multi-column Footer */}
        {!isCekatRoute && (
          <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-16">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Column 1: Logo & Tagline */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center p-0.5 shadow-sm">
                  <img src="/images/logo C cekat.png" alt="CEKAT Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-white font-black tracking-tight text-base">
                  CEKAT
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                Platform integrasi skrining Penyakit Tidak Menular (PTM), pencegahan stunting, & asisten gizi cerdas berbasis AI dari Kementerian Kesehatan Republik Indonesia (Kemenkes RI).
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="space-y-4">
              <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">Navigasi</h4>
              <ul className="space-y-2.5 text-xs font-semibold">
                <li>
                  <Link href="/app" className="hover:text-emerald-400 transition-colors">CEKAT Mobile App</Link>
                </li>
                <li>
                  <Link href="/station" className="hover:text-emerald-400 transition-colors">CEKAT Station Kiosk</Link>
                </li>
                <li>
                  <Link href="/articles" className="hover:text-emerald-400 transition-colors">Edukasi PTM & Artikel</Link>
                </li>
                <li>
                  <Link href="/consultation" className="hover:text-emerald-400 transition-colors">Konsultasi Medis</Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal & Support */}
            <div className="space-y-4">
              <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">Bantuan & Legal</h4>
              <ul className="space-y-2.5 text-xs font-semibold">
                <li>
                  <Link href="/privacy" className="hover:text-emerald-400 transition-colors">Kebijakan Privasi</Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-emerald-400 transition-colors">Syarat & Ketentuan</Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-emerald-400 transition-colors">Pusat Bantuan (FAQ)</Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Office */}
            <div className="space-y-4">
              <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">Hubungi Kami</h4>
              <ul className="space-y-3 text-xs font-semibold text-slate-400">
                <li className="flex items-center space-x-2.5">
                  <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>support@cekat.kemenkes.go.id</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>+62 (21) 5201-590</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Kementerian Kesehatan RI, Jl. H.R. Rasuna Said Blok X-5 Kav. 4-9 Jakarta Selatan</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Area */}
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
            <span>© 2026 CEKAT (Cek • Kenali • Tindaklanjuti) — Kementerian Kesehatan RI. All rights reserved.</span>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-emerald-400 transition" aria-label="Social Link"><Share2 className="w-4.5 h-4.5" /></a>
              <a href="#" className="hover:text-emerald-400 transition" aria-label="Website"><Globe className="w-4.5 h-4.5" /></a>
            </div>
          </div>
        </footer>
        )}
      </body>
    </html>
  );
}
