/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D6: Akuntansi & Keuangan Usaha - Cheatsheets
 */

export interface CheatSheetItem {
  id: string;
  title: string;
  description: string;
  category: string;
  points: string[];
}

export const D6_CHEATSHEET: CheatSheetItem[] = [
  {
    id: 'cs-d6-01',
    title: 'Lembar Contekan Kaidah Debit-Kredit & Persamaan Akuntansi',
    description: 'Pedoman kilat pencatatan transaksi 5 golongan akun utama dan keseimbangan jurnal.',
    category: 'Prinsip Akuntansi',
    points: [
      'Persamaan Fundamental: ASET = LIABILITAS + EKUITAS.',
      'ASET (Kas, Piutang, Persediaan, Alat): Bertambah di DEBIT, Berkurang di KREDIT.',
      'BEBAN (Gaji, Sewa, Listrik, Bunga): Bertambah di DEBIT, Berkurang di KREDIT.',
      'LIABILITAS (Utang Usaha, Pinjaman Bank): Bertambah di KREDIT, Berkurang di DEBIT.',
      'EKUITAS & MODAL: Bertambah di KREDIT, Berkurang di DEBIT (Prive di Debit).',
      'PENDAPATAN: Bertambah di KREDIT, Berkurang di DEBIT.',
    ],
  },
  {
    id: 'cs-d6-02',
    title: 'Lembar Contekan Formula HPP & Rekonsiliasi Kas Bank',
    description: 'Rumus cepat Harga Pokok Penjualan dan pos penyesuaian rekening koran bank.',
    category: 'Perhitungan & Pengendalian',
    points: [
      'HPP = Persediaan Awal + Pembelian Bersih - Persediaan Akhir.',
      'Pembelian Bersih = Pembelian + Biaya Angkut Masuk - Retur Pembelian - Potongan Pembelian.',
      'Laba Kotor = Penjualan Bersih - HPP (Margin Kotor = Laba Kotor / Penjualan).',
      'Laba Bersih = Laba Kotor - Total Beban Operasional.',
      'Rekonsiliasi Sisi Bank: Tambah Setoran dalam Perjalanan, Kurang Cek Beredar (Outstanding Checks).',
      'Rekonsiliasi Sisi Buku: Tambah Pendapatan Jasa Giro, Kurang Biaya Administrasi Bank.',
    ],
  },
];
