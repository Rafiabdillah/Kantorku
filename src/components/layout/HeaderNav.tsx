import React, { useEffect, useState } from 'react';
import { useGameStore, AppView } from '../../store/useGameStore';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { BrandLogoHorizontal, BrandLogoIcon } from '../brand/BrandLogo';
import { TIERS, TierLevel } from '../../types';
import { sound } from '../../services/sound';
import {
  Briefcase,
  Flame,
  Coins,
  Volume2,
  VolumeX,
  Menu,
  X,
  Compass,
  Map,
  BookOpen,
  Trophy,
  ShoppingBag,
  Settings,
  Sparkles,
  FileCheck,
  GraduationCap,
  Info,
} from 'lucide-react';
import { PWAInstallButton } from '../pwa/PWAInstallButton';

export const HeaderNav: React.FC = () => {
  const { profile, currentView, setView } = useGameStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  const tierInfo = TIERS[profile.currentTier] || TIERS[1];
  const nextTier = profile.currentTier < 7 ? TIERS[(profile.currentTier + 1) as TierLevel] : null;
  const currentTierXp = tierInfo.minXp;
  const nextTierXp = nextTier ? nextTier.minXp : 25000;
  const xpInTier = Math.max(0, profile.xp - currentTierXp);
  const xpNeeded = Math.max(1, nextTierXp - currentTierXp);
  const xpPercent = Math.min(100, Math.round((xpInTier / xpNeeded) * 100));

  const navItems: { view: AppView; label: string; icon: React.ReactNode }[] = [
    { view: 'office', label: 'Kantor', icon: <Compass className="w-4 h-4" /> },
    { view: 'skills-map', label: 'Keterampilan', icon: <Sparkles className="w-4 h-4" /> },
    { view: 'learning', label: 'Belajar', icon: <GraduationCap className="w-4 h-4" /> },
    { view: 'career-map', label: 'Peta Karier', icon: <Map className="w-4 h-4" /> },
    { view: 'case-file', label: 'Kasus Nyata', icon: <Briefcase className="w-4 h-4" /> },
    { view: 'portfolio', label: 'Portofolio', icon: <FileCheck className="w-4 h-4" /> },
    { view: 'shop', label: 'Toko', icon: <ShoppingBag className="w-4 h-4" /> },
    { view: 'achievements', label: 'Lencana', icon: <Trophy className="w-4 h-4" /> },
    { view: 'dictionary', label: 'Kamus', icon: <BookOpen className="w-4 h-4" /> },
    { view: 'errors', label: 'Catatan', icon: <FileCheck className="w-4 h-4" /> },
    { view: 'settings', label: 'Pengaturan', icon: <Settings className="w-4 h-4" /> },
    { view: 'about', label: 'Tentang & Sumber', icon: <Info className="w-4 h-4" /> },
  ];

  const handleNavClick = (view: AppView) => {
    setView(view);
    setMobileMenuOpen(false);
  };

  const handleToggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-3 md:px-6 py-2 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 xl:gap-4 w-full">
        {/* Brand Lockup */}
        <button
          type="button"
          onClick={() => handleNavClick('office')}
          className="flex items-center gap-2 cursor-pointer select-none shrink-0 group text-left"
          title="KantorKu - Game Simulasi Karier Kantor"
          aria-label="Buka Kantor"
        >
          {/* Official Horizontal Logo for Desktop & Tablet */}
          <div className="hidden sm:block transition-transform duration-200 group-hover:scale-[1.02]">
            <BrandLogoHorizontal className="h-7 md:h-8 w-auto" />
          </div>
          {/* Official App Icon + Typography for Compact Mobile */}
          <div className="flex sm:hidden items-center gap-2">
            <BrandLogoIcon className="w-7 h-7 rounded-xl shadow-sm" />
            <div>
              <div className="font-black text-sm tracking-tight text-slate-900 leading-none">
                KantorKu
              </div>
              <div className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                PT Maju Sejahtera
              </div>
            </div>
          </div>
          {/* Accessible text label */}
          <span className="sr-only">KantorKu</span>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 shrink min-w-0 overflow-x-auto no-scrollbar py-0.5">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                type="button"
                onClick={() => handleNavClick(item.view)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-1 px-1.5 xl:px-2.5 py-1 rounded-xl text-[11px] xl:text-xs font-semibold whitespace-nowrap transition cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Player Status HUD & Wallet */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* XP Progress Capsule */}
          <div className="hidden md:flex flex-col items-end text-right">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <span className="text-emerald-700">{tierInfo.badge} {tierInfo.title}</span>
              <span className="text-slate-400 text-[10px]">({profile.xp} XP)</span>
            </div>
            <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1 border border-slate-200">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>

          {/* Coins Badge */}
          <button
            type="button"
            onClick={() => handleNavClick('shop')}
            className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 hover:bg-amber-100/70 border border-amber-200/70 rounded-xl text-amber-900 text-xs font-bold cursor-pointer transition"
            title="Koin Kantor"
            aria-label={`Koin Kantor: ${profile.coins}`}
          >
            <Coins className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-mono text-[11px]">{profile.coins}</span>
          </button>

          {/* Streak Flame */}
          <button
            type="button"
            onClick={() => handleNavClick('daily')}
            className="flex items-center gap-1 px-2 py-1 bg-rose-50 hover:bg-rose-100/70 border border-rose-200/70 rounded-xl text-rose-900 text-xs font-bold cursor-pointer transition"
            title="Streak Harian"
            aria-label={`Streak harian: ${profile.streakDays} hari`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span className="font-mono text-[11px]">{profile.streakDays}</span>
          </button>

          {/* Sound Mute Toggle (Desktop/Tablet) */}
          <button
            type="button"
            onClick={handleToggleSound}
            className="hidden sm:flex p-1.5 hover:bg-slate-100 text-slate-500 rounded-lg transition cursor-pointer"
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
            aria-label={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
            aria-pressed={isMuted}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>

          {/* Settings Button (Desktop/Tablet) */}
          <button
            type="button"
            onClick={() => handleNavClick('settings')}
            className={`hidden sm:flex p-1.5 rounded-lg transition cursor-pointer ${
              currentView === 'settings'
                ? 'bg-emerald-100 text-emerald-800'
                : 'hover:bg-slate-100 text-slate-500 hover:text-slate-800'
            }`}
            title="Pusat Pengaturan & Profil"
            aria-label="Pusat Pengaturan & Profil"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* PWA Install Button (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center">
            <PWAInstallButton />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 hover:bg-slate-100 text-slate-700 rounded-lg transition cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Navigasi utama"
          className="lg:hidden pt-3 pb-2 border-t border-slate-100 mt-2 space-y-2 animate-in slide-in-from-top-2"
        >
          {/* Mobile PWA Install */}
          <div className="px-2.5 py-2 flex items-center justify-between bg-slate-50 rounded-xl border border-slate-200/60">
            <div className="flex items-center gap-2">
              <BrandLogoIcon className="w-5 h-5 rounded-md shadow-xs" />
              <span className="text-xs font-bold text-slate-800">Aplikasi KantorKu</span>
            </div>
            <PWAInstallButton />
          </div>
          <div className="grid grid-cols-2 gap-1.5 p-1">
            {navItems.map((item) => (
              <button
                key={item.view}
                type="button"
                onClick={() => handleNavClick(item.view)}
                aria-current={currentView === item.view ? 'page' : undefined}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold transition ${
                  currentView === item.view ? 'bg-emerald-100 text-emerald-900 font-bold' : 'bg-slate-50 text-slate-700'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};
