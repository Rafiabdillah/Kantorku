import React, { useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { TIERS } from '../../types';

/** Toast untuk kenaikan tier dan hadiah sekali-klaim. Hadiah misi tampil di modal hasilnya. */
export const RewardToast: React.FC = () => {
  const lastReward = useGameStore((s) => s.lastReward);
  const clearReward = useGameStore((s) => s.clearReward);
  const lockNotice = useGameStore((s) => s.lockNotice);
  const clearLockNotice = useGameStore((s) => s.clearLockNotice);

  useEffect(() => {
    if (!lockNotice) return;
    const t = window.setTimeout(clearLockNotice, 5000);
    return () => window.clearTimeout(t);
  }, [lockNotice, clearLockNotice]);

  useEffect(() => {
    if (!lastReward) return;
    const t = window.setTimeout(clearReward, lastReward.tierUp ? 6000 : 3500);
    return () => window.clearTimeout(t);
  }, [lastReward, clearReward]);

  if (lockNotice) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed left-1/2 -translate-x-1/2 top-[max(0.75rem,env(safe-area-inset-top))] z-[60] w-[min(92vw,26rem)]"
      >
        <div className="flex items-center gap-3 rounded-2xl bg-slate-900 text-white px-4 py-3 shadow-xl border border-amber-400/50">
          <span aria-hidden="true" className="text-2xl">🔒</span>
          <p className="min-w-0 flex-1 text-sm font-semibold">{lockNotice}</p>
          <button
            type="button"
            onClick={clearLockNotice}
            aria-label="Tutup pemberitahuan"
            className="shrink-0 min-h-11 min-w-11 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-400"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }

  if (!lastReward || (lastReward.xp <= 0 && !lastReward.tierUp)) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed left-1/2 -translate-x-1/2 top-[max(0.75rem,env(safe-area-inset-top))] z-[60] w-[min(92vw,26rem)]"
    >
      <div className="flex items-center gap-3 rounded-2xl bg-slate-900 text-white px-4 py-3 shadow-xl border border-emerald-400/40">
        <span aria-hidden="true" className="text-2xl">{lastReward.tierUp ? TIERS[lastReward.tierUp].badge : '⚡'}</span>
        <div className="min-w-0 flex-1">
          {lastReward.tierUp ? (
            <>
              <p className="text-sm font-bold">Naik jabatan: {TIERS[lastReward.tierUp].title}</p>
              <p className="text-xs text-slate-300">Misi dan kasus tingkat baru sudah terbuka.</p>
            </>
          ) : (
            <p className="text-sm font-bold">
              +{lastReward.xp.toLocaleString('id-ID')} XP
              {lastReward.coins > 0 ? `, +${lastReward.coins.toLocaleString('id-ID')} koin` : ''}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={clearReward}
          aria-label="Tutup pemberitahuan"
          className="shrink-0 min-h-11 min-w-11 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
