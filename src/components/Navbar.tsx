'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Leaf } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Check login status from localStorage
  useEffect(() => {
    const loginFlag = localStorage.getItem('nutrisnap_logged_in');
    setIsLoggedIn(loginFlag === 'true');
  }, [pathname]);

  // Track window scroll coordinates for landing page transparent-to-white navbar effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('nutrisnap_logged_in');
    setIsLoggedIn(false);
    // Fully reset router states and redirect
    window.location.href = '/';
  };


  const isLandingPage = pathname === '/';

  // Navigation links shown when logged in (Clean professional labels without raw emojis)
  const loggedInLinks = [
    { name: 'Pantry AI', href: '/pantry-ai' },
    { name: 'CEKAT Station', href: '/station' },
    { name: 'Scan Gizi', href: '/scan' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'CEKAT App', href: '/app' },
    { name: 'Artikel', href: '/articles' },
  ];

  // Professional marketing navigation links shown on landing page (logged out)
  const landingLinks = [
    { name: 'Pantry AI', href: '/pantry-ai' },
    { name: 'CEKAT Station', href: '/station' },
    { name: 'CEKAT App', href: '/app' },
    { name: 'Fitur Utama', href: '#features-section' },
    { name: 'Cara Kerja', href: '#how-it-works-section' },
    { name: 'Tim Medis', href: '#doctors-section' },
  ];

  return (
    <header 
      className={`z-50 transition-all duration-300 ${
        isLandingPage && !isLoggedIn
          ? isScrolled 
            ? 'sticky top-0 bg-white border-b border-slate-100 text-slate-800 shadow-sm' 
            : 'absolute top-0 left-0 w-full bg-transparent text-white border-b border-transparent'
          : 'sticky top-0 bg-white border-b border-slate-100 text-slate-800 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={isLoggedIn ? "/dashboard" : "/"} className="flex items-center space-x-2 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center p-0.5 shadow-sm group-hover:scale-105 transition-transform">
              <img src="/images/logo C cekat.png" alt="Cekat Logo" className="w-full h-full object-contain" />
            </div>
            <span className={`text-lg font-black tracking-tight ${
              isLandingPage && !isLoggedIn && !isScrolled ? 'text-white' : 'text-slate-800'
            }`}>
              CEKAT
            </span>
          </Link>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 px-4 flex-1 justify-center">
            {isLandingPage && !isLoggedIn ? (
              // Marketing/Landing Page Anchors
              landingLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isScrolled 
                      ? 'text-slate-655 hover:text-emerald-600 hover:bg-slate-50' 
                      : 'text-teal-50 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              ))
            ) : isLoggedIn ? (
              // Inside Platform Core Navigation Links
              loggedInLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100/50 shadow-sm'
                        : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.name}</span>
                  </Link>
                );
              })
            ) : null}
          </nav>

          {/* Right Action buttons grouping */}
          <div className="flex items-center space-x-3 shrink-0">
            {isLoggedIn ? (
              <>
                {/* Streak Day Counter Badge */}
                {!isLandingPage && (
                  <div className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 text-[10px] font-black">
                    <span>5 Hari</span>
                  </div>
                )}

                {/* Profile Avatar as link */}
                <Link 
                  href="/profile" 
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow hover:scale-105 transition-all ${
                    pathname === '/profile'
                      ? 'bg-emerald-600 text-white border-2 border-emerald-400'
                      : 'bg-emerald-100 border border-emerald-300 text-emerald-705'
                  }`}
                >
                  RF
                </Link>

                <button 
                  onClick={handleLogout}
                  className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 transition"
                >
                  Keluar
                </button>
              </>
            ) : (
              <a
                href="#login-section"
                className={`px-4 py-2 font-bold text-xs rounded-xl shadow-sm transition ${
                  isLandingPage && !isScrolled 
                    ? 'bg-white text-[#2d8d81] hover:bg-slate-50' 
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                Mulai Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Links / App Switcher Bar */}
      {isLandingPage ? (
        <div className={`md:hidden flex items-center overflow-x-auto py-2.5 px-4 space-x-2 text-xs transition-all scrollbar-none ${
          isScrolled || isLoggedIn
            ? 'bg-white/95 border-b border-slate-100 text-slate-800 shadow-sm' 
            : 'bg-slate-950/85 backdrop-blur-md border-b border-white/10 text-white'
        }`}>
          <Link
            href="/app"
            className="shrink-0 px-3.5 py-1.5 rounded-full font-black text-xs bg-emerald-600 text-white shadow-md flex items-center gap-1 active:scale-95 transition"
          >
            <span>📱 CEKAT App</span>
          </Link>
          <Link
            href="/station"
            className="shrink-0 px-3 py-1.5 rounded-full font-bold text-xs bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1"
          >
            <span>🏥 Station</span>
          </Link>
          {landingLinks.filter(l => !['/app', '/station'].includes(l.href)).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 px-2.5 py-1.5 rounded-lg font-semibold ${
                isScrolled || isLoggedIn ? 'text-slate-600 hover:text-slate-900' : 'text-teal-100 hover:text-white'
              }`}
            >
              <span>{link.name}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="md:hidden flex overflow-x-auto py-2.5 px-4 space-x-2 border-t border-slate-100 bg-white/95 text-xs">
          <Link
            href="/app"
            className="shrink-0 px-3.5 py-1.5 rounded-full font-black text-xs bg-emerald-600 text-white shadow-sm"
          >
            <span>CEKAT App</span>
          </Link>
          {loggedInLinks.filter(l => l.href !== '/app').map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 px-2.5 py-1.5 rounded-lg font-bold ${
                  isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'text-slate-600'
                }`}
              >
                <span>{link.name}</span>
              </Link>
            );
          })}
          {/* Profile Link inside mobile navigation scroll */}
          <Link
            href="/profile"
            className={`shrink-0 px-2.5 py-1.5 rounded-lg font-bold ${
              pathname === '/profile' ? 'bg-emerald-50 text-emerald-705 border border-emerald-100' : 'text-slate-650'
            }`}
          >
            <span>Profil</span>
          </Link>
        </div>
      )}
    </header>
  );
}
