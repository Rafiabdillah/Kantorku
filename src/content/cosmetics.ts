import { CosmeticItem } from '../types';

export const SHOP_ITEMS: CosmeticItem[] = [
  // Meja Kerja
  { id: 'desk-kayu', name: 'Meja Kayu Jati Minimalis', category: 'desk', cost: 150, icon: '🪵', unlocked: true },
  { id: 'desk-gaming', name: 'Meja Ergonomis Standing Desk', category: 'desk', cost: 350, icon: '🖥️', unlocked: false },
  { id: 'desk-marmer', name: 'Meja Direktur Marmer Mewah', category: 'desk', cost: 800, icon: '🏛️', unlocked: false },

  // Dekorasi Meja
  { id: 'decor-kaktus', name: 'Kaktus Meja Anti Radiasi', category: 'decor', cost: 100, icon: '🌵', unlocked: true },
  { id: 'decor-kopi', name: 'Mug Kopi Panas PT Maju', category: 'decor', cost: 180, icon: '☕', unlocked: false },
  { id: 'decor-trophy', name: 'Piala Karyawan Teladan', category: 'decor', cost: 500, icon: '🏆', unlocked: false },
  { id: 'decor-kucing', name: 'Patung Kucing Hoki Rezeki', category: 'decor', cost: 300, icon: '🐱', unlocked: false },

  // Avatar Kantor
  { id: 'avatar-magang', name: 'Setelan Batik Magang', category: 'avatar', cost: 0, icon: '👔', unlocked: true },
  { id: 'avatar-blazer', name: 'Blazer Biru Eksekutif', category: 'avatar', cost: 400, icon: '💼', unlocked: false },
  { id: 'avatar-hoodie', name: 'Hoodie IT Programmer Santai', category: 'avatar', cost: 450, icon: '🎧', unlocked: false },
  { id: 'avatar-jas-emas', name: 'Jas Direksi Kerah Emas', category: 'avatar', cost: 1200, icon: '👑', unlocked: false },

  // Power Up / Utilitas Kantor
  { id: 'item-freeze', name: 'Pembeku Streak (Streak Freeze)', category: 'badge', cost: 150, icon: '🧊', unlocked: false },
];
