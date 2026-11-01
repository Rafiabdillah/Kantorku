import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50 flex items-center gap-3 rounded-2xl bg-amber-600/95 backdrop-blur-md px-4 py-2.5 text-xs font-semibold text-white shadow-2xl border border-amber-400/30 animate-in slide-in-from-bottom-2"
    >
      <div className="p-1 rounded-lg bg-amber-700/80 shrink-0">
        <WifiOff className="w-4 h-4 text-amber-200" />
      </div>
      <div>
        <div>Mode Offline Aktif</div>
        <div className="text-[10px] font-normal text-amber-100">
          Semua materi, editor, dan data tersimpan lokal tetap dapat diakses tanpa koneksi internet.
        </div>
      </div>
    </div>
  );
};
