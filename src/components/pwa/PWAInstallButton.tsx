import React, { useState } from 'react';
import { Download, Share2, PlusSquare, X } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { sound } from '../../services/sound';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={() => {
          sound.playClick();
          install();
        }}
        aria-label="Pasang Aplikasi KantorKu"
        className="flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-950/40 transition active:scale-95 cursor-pointer touch-manipulation"
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Pasang Aplikasi</span>
        <span className="sm:hidden">Pasang</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => {
            sound.playClick();
            setShowIOSGuide(true);
          }}
          aria-label="Panduan Pasang di iOS"
          className="flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 rounded-xl text-xs font-medium shadow-sm transition active:scale-95 cursor-pointer touch-manipulation"
        >
          <Share2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Pasang di iPhone/iPad</span>
          <span className="sm:hidden">Pasang</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
            <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl text-slate-100">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-400" />
                  Pasang di iPhone / iPad
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                  aria-label="Tutup"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs text-slate-300 leading-relaxed">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <Share2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    1. Ketuk tombol <strong>Bagikan (Share)</strong> di bilah navigasi bawah Safari.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <PlusSquare className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span>
                    2. Gulir menu ke bawah lalu pilih <strong>Tambah ke Layar Utama (Add to Home Screen)</strong>.
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 italic">
                  Aplikasi akan terpasang di layar utama HP Anda dan dapat dibuka langsung bahkan tanpa internet (Offline).
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 text-xs font-semibold text-white transition active:scale-95"
              >
                Mengerti
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
