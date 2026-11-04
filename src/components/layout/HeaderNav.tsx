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
  MoreHorizontal,
  Zap,
  Search,
  Users,
  Timer,
  ShieldCheck,
  Swords,
  Wrench,
} from 'lucide-react';
import { PWAInstallButton } from '../pwa/PWAInstallButton';
import { MobileTabBar } from './MobileTabBar';

export const HeaderNav: React.FC = () => {
  const { profile, currentView, setView } = useGameStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!desktopMenuOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDesktopMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [desktopMenuOpen]);

  const tierInfo = TIERS[profile.currentTier] || TIERS[1];
  const nextTier = profile.currentTier < 7 ? TIERS[(profile.currentTier + 1) as TierLevel] : null;
  const currentTierXp = tierInfo.minXp;
  const nextTierXp = nextTier ? nextTier.minXp : 25000;
  const xpInTier = Math.max(0, profile.xp - currentTierXp);
  const xpNeeded = Math.max(1, nextTierXp - currentTierXp);
  const xpPercent = Math.min(100, Math.round((xpInTier / xpNeeded) * 100));

  const primaryNavItems: { view: AppView; label: string; icon: React.ReactNode }[] = [
    { view: 'office', label: 'Kantor', icon: <Compass className="w-4 h-4" /> },
    { view: 'skills-map', label: 'Keterampilan', icon: <Sparkles className="w-4 h-4" /> },
    { view: 'learning', label: 'Belajar', icon: <GraduationCap className="w-4 h-4" /> },
    { view: 'career-map', label: 'Peta Karier', icon: <Map className="w-4 h-4" /> },
    { view: 'case-file', label: 'Kasus Nyata', icon: <Briefcase className="w-4 h-4" /> },
    { view: 'portfolio', label: 'Portofolio', icon: <FileCheck className="w-4 h-4" /> },
  ];

  const secondaryNavItems: { view: AppView; label: string; icon: React.ReactNode }[] = [
    { view: 'shop', label: 'Toko', icon: <ShoppingBag className="w-4 h-4" /> },
    { view: 'achievements', label: 'Lencana', icon: <Trophy className="w-4 h-4" /> },
    { view: 'dictionary', label: 'Kamus', icon: <BookOpen className="w-4 h-4" /> },
    { view: 'errors', label: 'Catatan', icon: <FileCheck className="w-4 h-4" /> },
    { view: 'settings', label: 'Pengaturan', icon: <Settings className="w-4 h-4" /> },
    { view: 'about', label: 'Tentang & Sumber', icon: <Info className="w-4 h-4" /> },
  ];

  const navItems = [...primaryNavItems, ...secondaryNavItems];

  const gameModeItems: { view: AppView; label: string; icon: React.ReactNode }[] = [
    { view: 'daily', label: 'Tantangan Harian', icon: <Zap className="w-4 h-4" /> },
    { view: 'detective', label: 'Detektif', icon: <Search className="w-4 h-4" /> },
    { view: 'mentor', label: 'Mentor', icon: <Users className="w-4 h-4" /> },
    { view: 'speed', label: 'Kilat', icon: <Timer className="w-4 h-4" /> },
    { view: 'exam', label: 'Ujian & Sertif', icon: <ShieldCheck className="w-4 h-4" /> },
    { view: 'duel', label: 'Duel Asinkron', icon: <Swords className="w-4 h-4" /> },
    { view: 'creator', label: 'Kreator Level', icon: <Wrench className="w-4 h-4" /> },
  ];

  const handleNavClick = (view: AppView) => {
    setView(view);
    setMobileMenuOpen(false);
    setDesktopMenuOpen(false);
  };

  const handleToggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3 sm:px-6 py-2.5 w-full max-w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2 xl:gap-4 w-full">
        {/* Brand Lockup */}
        <button
          type="button"
          onClick={() => handleNavClick('office')}
          className="flex items-center gap-2 cursor-pointer select-none shrink-0 group text-left min-h-[44px]"
          title="KantorKu - Game Simulasi Karier Kantor"
          aria-label="Buka Kantor"
        >
          <div className="hidden sm:block transition-transform duration-200 group-hover:scale-[1.02]">
            <BrandLogoHorizontal className="h-7 md:h-8 w-auto" />
          </div>
          <div className="flex sm:hidden items-center gap-2 min-w-0">
            <BrandLogoIcon className="w-7 h-7 rounded-xl shadow-sm shrink-0" />
            <div className="min-w-0">
              <div className="font-black text-sm tracking-tight text-slate-900 leading-none">
                KantorKu
              </div>
              <div className="hidden min-[360px]:block text-[11px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                PT Maju Sejahtera
              </div>
            </div>
          </div>
          <span className="sr-only">KantorKu</span>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 shrink-0 py-0.5">
          {primaryNavItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                type="button"
                onClick={() => handleNavClick(item.view)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={item.label}
                title={item.label}
                className={`flex items-center justify-center gap-1 px-2 xl:px-2.5 py-1.5 rounded-xl text-[11px] xl:text-xs font-semibold whitespace-nowrap transition cursor-pointer shrink-0 min-h-[44px] min-w-[44px] ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span className="hidden xl:inline min-w-fit">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Player Status HUD & Wallet */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* XP Progress Capsule */}
          <div className="hidden md:flex flex-col items-end text-right">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <span className="text-emerald-700">{tierInfo.badge} {tierInfo.title}</span>
              <span className="text-slate-400 text-[11px] whitespace-nowrap">({profile.xp.toLocaleString('id-ID')} XP)</span>
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
            className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100/70 border border-amber-200/70 rounded-xl text-amber-900 text-xs font-bold cursor-pointer transition min-h-[44px]"
            title="Koin Kantor"
            aria-label={`Koin Kantor: ${profile.coins}`}
          >
            <Coins className="w-3.5 h-3.5 text-amber-700" />
            <span className="font-mono text-[11px]">{profile.coins}</span>
          </button>

          {/* XP Badge (mobile compact) */}
          <div
            className="flex md:hidden items-center justify-center gap-1 px-2 py-1.5 bg-indigo-50 border border-indigo-200/70 rounded-xl text-indigo-900 min-h-[44px]"
            title="Total XP"
            aria-label={`Total XP: ${profile.xp.toLocaleString('id-ID')}`}
          >
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-mono text-[11px]">{profile.xp.toLocaleString('id-ID')}</span>
          </div>

          {/* Streak Flame */}
          <button
            type="button"
            onClick={() => handleNavClick('daily')}
            className="hidden min-[360px]:flex items-center justify-center gap-1 px-2 py-1.5 bg-rose-50 hover:bg-rose-100/70 border border-rose-200/70 rounded-xl text-rose-900 text-xs font-bold cursor-pointer transition min-h-[44px] min-w-[44px]"
            title="Streak Harian"
            aria-label={`Streak harian: ${profile.streakDays} hari`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span className="font-mono text-[11px]">{profile.streakDays}</span>
          </button>

          {/* More Navigation (Laptop/Desktop) */}
          <div className="relative hidden lg:block">
            <button
              type="button"
              onClick={() => setDesktopMenuOpen((open) => !open)}
              aria-expanded={desktopMenuOpen}
              aria-haspopup="menu"
              className={`flex items-center justify-center gap-1 px-2 py-1.5 rounded-xl text-[11px] xl:text-xs font-semibold transition cursor-pointer min-h-[44px] min-w-[44px] ${
                desktopMenuOpen
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Menu lainnya"
            >
              <MoreHorizontal className="w-4 h-4" />
              <span className="hidden xl:inline">Lainnya</span>
            </button>
            {desktopMenuOpen && (
              <div
                role="menu"
                aria-label="Menu lainnya"
                className="absolute right-0 top-full mt-2 w-60 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 z-50"
              >
                {secondaryNavItems.map((item) => {
                  const isActive = currentView === item.view;
                  return (
                    <button
                      key={item.view}
                      type="button"
                      role="menuitem"
                      onClick={() => handleNavClick(item.view)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-left transition cursor-pointer ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sound Mute Toggle (Desktop/Tablet) */}
          <button
            type="button"
            onClick={handleToggleSound}
            className="hidden sm:flex p-1.5 hover:bg-slate-100 text-slate-500 rounded-lg transition cursor-pointer min-h-[44px] min-w-[44px]"
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
            aria-label={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
            aria-pressed={isMuted}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-700" />}
          </button>

          {/* Settings Button (Desktop/Tablet) */}
          <button
            type="button"
            onClick={() => handleNavClick('settings')}
            className={`hidden sm:flex p-1.5 rounded-lg transition cursor-pointer min-h-[44px] min-w-[44px] ${
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
            className="lg:hidden p-2 hover:bg-slate-100 text-slate-700 rounded-xl transition cursor-pointer min-h-[44px] min-w-[44px]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      </header>

      {/* Backdrop untuk dropdown "Lainnya" di desktop */}
      {desktopMenuOpen && (
        <div
          className="hidden lg:block fixed inset-0 z-30 bg-slate-900/20"
          onClick={() => setDesktopMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/*
       * Drawer harus berada di luar <header>: header memakai backdrop-filter
       * + konteks overflow sehingga position:fixed akan terkunci setinggi
       * header dan seluruh menu terpotong di mobile.
       */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Navigasi utama"
          className="lg:hidden fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-md flex flex-col animate-in fade-in zoom-in-95 safe-top safe-horizontal safe-bottom"
        >
          {/* Header bar of drawer */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-900/80">
            <div className="flex items-center gap-2.5">
              <BrandLogoIcon className="w-6 h-6 rounded-xl shadow-sm" />
              <span className="text-sm font-bold text-white">Navigasi KantorKu</span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Tutup menu navigasi"
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition min-h-[44px] min-w-[44px]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* PWA Install + Player quick stats */}
          <div className="px-5 py-4 border-b border-white/10 bg-slate-900/60">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BrandLogoIcon className="w-5 h-5 rounded-md shadow-xs" />
                <span className="text-xs font-bold text-slate-200">Aplikasi KantorKu</span>
              </div>
              <PWAInstallButton />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Flame className="w-4 h-4 text-emerald-400 fill-current" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">Streak</div>
                  <div className="text-sm font-bold text-white">{profile.streakDays} Hari</div>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Coins className="w-4 h-4 text-amber-400 fill-current" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">Koin</div>
                  <div className="text-sm font-bold text-white">{profile.coins}</div>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">XP</div>
                  <div className="text-sm font-bold text-white whitespace-nowrap">
                    {profile.xp.toLocaleString('id-ID')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nav list - 2 columns grid for easy thumb reach */}
          <div className="flex-1 overflow-y-auto px-4 pb-6">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const isActive = currentView === item.view;
                return (
                  <button
                    key={item.view}
                    type="button"
                    onClick={() => handleNavClick(item.view)}
                    aria-current={currentView === item.view ? 'page' : undefined}
                    className={`flex flex-col items-center gap-1 p-3 rounded-2xl text-xs font-semibold transition min-h-[72px] ${
                      currentView === item.view
                        ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-500/25'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
            {/* Mode game: dulu hanya bisa dicapai dengan menggulir jauh ke bawah di halaman Kantor */}
            <h3 className="mt-5 mb-2 px-1 text-[11px] font-bold uppercase tracking-wide text-slate-300">Mode Game</h3>
            <div className="grid grid-cols-2 gap-2">
              {gameModeItems.map((item) => (
                <button
                  key={item.view}
                  type="button"
                  onClick={() => handleNavClick(item.view)}
                  aria-current={currentView === item.view ? 'page' : undefined}
                  className={`flex flex-col items-center gap-1 p-3 rounded-2xl text-xs font-semibold transition min-h-[64px] cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400 ${
                    currentView === item.view
                      ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-500/25'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            {/* Sound quick action */}
            <div className="mt-4 grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={handleToggleSound}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 transition min-h-[56px] cursor-pointer"
                aria-label={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
                aria-pressed={isMuted}
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-slate-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
                <span className="text-[11px] font-semibold">{isMuted ? 'Nyalakan' : 'Matikan'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <MobileTabBar onOpenMenu={() => setMobileMenuOpen(true)} menuOpen={mobileMenuOpen} />
    </>
  );
};
