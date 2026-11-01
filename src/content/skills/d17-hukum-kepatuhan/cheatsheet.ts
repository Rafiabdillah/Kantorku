import { D17_LEGAL_DISCLAIMER } from './constants';

export interface D17CheatSheetItem {
  id: string;
  title: string;
  description: string;
  items: { label: string; description: string }[];
  disclaimer: string;
}

export const D17_CHEATSHEET: D17CheatSheetItem[] = [
  {
    id: 'd17-cs-01',
    title: 'Checklist kepatuhan umum',
    description: 'Peta singkat verifikasi konten, kontrak, dan aset.',
    items: [
      { label: 'Konsumen', description: 'Verifikasi informasi produk dan bukti klaim; catat pengaduan.' },
      { label: 'Perikatan', description: 'Identifikasi pihak, objek, hak, kewajiban, tenggat, dan pertanyaan untuk profesional.' },
      { label: 'Hak cipta', description: 'Arsipkan sumber, pemilik, jenis lisensi, dan masa berlaku.' },
      { label: 'Dokumentasi', description: 'Catat sumber dan keputusan tanpa mengaku sebagai nasihat hukum.' },
    ],
    disclaimer: D17_LEGAL_DISCLAIMER,
  },
  {
    id: 'd17-cs-02',
    title: 'Pasal yang pasti digunakan',
    description: 'Kutipan pasal umum yang dapat diperiksa pada sumber resmi.',
    items: [
      { label: 'UU No. 8 Tahun 1999 Pasal 4 dan 9', description: 'Hak konsumen dan larangan informasi menyesatkan dalam konteks yang relevan.' },
      { label: 'KUHPerdata Pasal 1320', description: 'Rujukan unsur kesepakatan, kecakapan, hal tertentu, dan sebab halal.' },
      { label: 'UU No. 28 Tahun 2014 Pasal 9 dan 113', description: 'Rujukan hak ekonomi atau penerapan hak cipta dan ketentuan sanksi umum.' },
    ],
    disclaimer: D17_LEGAL_DISCLAIMER,
  },
];