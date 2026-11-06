import React from 'react';
import { useGameStore, AppView } from '../../store/useGameStore';
import { sound } from '../../services/sound';
import { Compass, GraduationCap, Sparkles, Map, Menu } from 'lucide-react';

const IMMERSIVE_VIEWS: AppView[] = [
  'mission',
  'case-file',
  'zen',
  'speed',
  'duel',
  'detective',
  'exam',
  'creator',
  'daily',
  'errors',
];

export const shouldShowMobileTabBar = (view: AppView): boolean =>
  !IMMERSIVE_VIEWS.includes(view);

const TAB_ITEMS: { view: AppView; label: string; icon: React.ReactNode }[] = [
  { view: 'office', label: 'Kantor', icon: <Compass className="w-5 h-5" /> },
  { view: 'learning', label: 'Belajar', icon: <GraduationCap className="w-5 h-5" /> },
  { view: 'skills-map', label: 'Skill', icon: <Sparkles className="w-5 h-5" /> },
  { view: 'career-map', label: 'Karier', icon: <Map className="w-5 h-5" /> },
];

interface MobileTabBarProps {
  onOpenMenu: () => void;
  menuOpen: boolean;
}

export const MobileTabBar: React.FC<MobileTabBarProps> = ({ onOpenMenu, menuOpen }) => {
  const { currentView, setView } = useGameStore();

  if (!shouldShowMobileTabBar(currentView)) return null;

  return (
    <nav
      aria-label="Navigasi utama seluler"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(15,23,42,0.06)] pb-safe-nav"
    >
      <div className="flex items-stretch justify-around max-w-lg mx-auto px-1">
        {TAB_ITEMS.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              type="button"
              onClick={() => {
                sound.playClick();
                setView(item.view);
              }}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex-1 min-w-0 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] rounded-xl transition cursor-pointer ${
                isActive ? 'text-emerald-700' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span
                className={`absolute top-0 h-0.5 w-8 rounded-full transition-opacity ${
                  isActive ? 'bg-emerald-700 opacity-100' : 'opacity-0'
                }`}
              />
              <span
                className={`flex items-center justify-center w-9 h-7 rounded-lg transition ${
                  isActive ? 'bg-emerald-50' : ''
                }`}
              >
                {item.icon}
              </span>
              <span className="text-[11px] font-bold leading-none">{item.label}</span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onOpenMenu();
          }}
          aria-label="Buka semua menu"
          aria-expanded={menuOpen}
          className={`relative flex-1 min-w-0 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] rounded-xl transition cursor-pointer ${
            menuOpen ? 'text-emerald-700' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span
            className={`flex items-center justify-center w-9 h-7 rounded-lg transition ${
              menuOpen ? 'bg-emerald-50' : ''
            }`}
          >
            <Menu className="w-5 h-5" />
          </span>
          <span className="text-[11px] font-bold leading-none">Menu</span>
        </button>
      </div>
    </nav>
  );
};
