import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { SHOP_ITEMS } from '../../content/cosmetics';
import { CosmeticItem } from '../../types';
import { sound } from '../../services/sound';
import confetti from 'canvas-confetti';
import { ShoppingBag, ArrowLeft, Check, Sparkles, Flame, Coins } from 'lucide-react';

export const ShopView: React.FC = () => {
  const { profile, buyCosmetic, equipCosmetic, buyStreakFreeze, setView } = useGameStore();
  const [activeTab, setActiveTab] = useState<'all' | 'desk' | 'decor' | 'avatar' | 'badge'>('all');

  const filteredItems = activeTab === 'all' ? SHOP_ITEMS : SHOP_ITEMS.filter((i) => i.category === activeTab);

  const handleBuy = (item: CosmeticItem) => {
    if (profile.coins < item.cost) {
      sound.playError();
      return;
    }

    if (item.id === 'item-freeze') {
      const ok = buyStreakFreeze();
      if (ok) {
        sound.playSuccess();
        confetti({ particleCount: 50 });
      }
    } else {
      const ok = buyCosmetic(item.id, item.cost, item.category as any);
      if (ok) {
        sound.playSuccess();
        confetti({ particleCount: 50 });
      }
    }
  };

  const handleEquip = (category: 'avatar' | 'desk' | 'decor', itemId: string) => {
    equipCosmetic(category, itemId);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setView('office');
            }}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 cursor-pointer transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase">
              Toko Kantor & Kosmetik
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 mt-1">Dekorasi Meja & Fasilitas Kerja</h1>
          </div>
        </div>

        {/* Player Wallet Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 font-bold text-xs">
            <Coins className="w-4 h-4 text-amber-600" />
            <span>{profile.coins} Koin</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-xl border border-blue-200 text-blue-900 font-bold text-xs">
            <Flame className="w-4 h-4 text-blue-500" />
            <span>{profile.streakFreeze} Freeze Tersedia</span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(['all', 'desk', 'decor', 'avatar', 'badge'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab(tab);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition cursor-pointer capitalize ${
              activeTab === tab ? 'bg-slate-900 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab === 'all'
              ? 'Semua Item'
              : tab === 'desk'
              ? 'Meja Kerja'
              : tab === 'decor'
              ? 'Dekorasi Meja'
              : tab === 'avatar'
              ? 'Pakaian Kantor'
              : 'Utilitas Kantor'}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const isOwned = profile.inventory.includes(item.id);
          const isEquipped =
            profile.equipped.desk === item.id ||
            profile.equipped.decor === item.id ||
            profile.equipped.avatar === item.id;
          const isAffordable = profile.coins >= item.cost;

          return (
            <div
              key={item.id}
              className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between gap-4"
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl p-2 rounded-2xl bg-slate-50 border border-slate-100">{item.icon}</span>
                {isEquipped ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Dipakai
                  </span>
                ) : isOwned ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Dimiliki
                  </span>
                ) : (
                  <span className="text-xs font-bold text-amber-600 font-mono">{item.cost} Koin</span>
                )}
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-slate-900">{item.name}</h3>
                <span className="text-[10px] text-slate-400 capitalize">{item.category}</span>
              </div>

              <div>
                {isOwned && item.category !== 'badge' ? (
                  <button
                    type="button"
                    onClick={() => handleEquip(item.category as any, item.id)}
                    disabled={isEquipped}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                      isEquipped
                        ? 'bg-slate-100 text-slate-400 cursor-default'
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                    }`}
                  >
                    {isEquipped ? 'Sedang Dipakai' : 'Gunakan'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleBuy(item)}
                    disabled={!isAffordable}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                      isAffordable
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Beli ({item.cost} Koin)
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
