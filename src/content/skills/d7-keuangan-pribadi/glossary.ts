/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D7: Keuangan Pribadi & Wirausaha - Glossary
 */

export interface D7GlossaryTerm {
  term: string;
  category: string;
  definition: string;
  practicalTip: string;
}

export const D7_GLOSSARY: D7GlossaryTerm[] = [
  {
    term: 'Metode Anggaran 50/30/20',
    category: 'Perencanaan Finansial',
    definition: 'Pedoman alokasi penghasilan bulanan: 50% untuk kebutuhan pokok mutlak, 30% untuk keinginan rekreasi, dan 20% untuk tabungan/investasi/dana darurat.',
    practicalTip: 'Sisihkan 20% di awal gajian sebelum membelanjakan pos keinginan.',
  },
  {
    term: 'Dana Darurat (Emergency Fund)',
    category: 'Manajemen Risiko Finansial',
    definition: 'Simpanan kas likuid yang khusus dialokasikan untuk membiayai kebutuhan mendadak seperti sakit, perbaikan mendesak, atau kehilangan penghasilan sementara.',
    practicalTip: 'Simpan di rekening tabungan terpisah tanpa kartu debit instan agar tidak terpakai belanja impulsif.',
  },
  {
    term: 'Harga Pokok Penjualan (HPP)',
    category: 'Kewirausahaan UMKM',
    definition: 'Akumulasi seluruh biaya langsung yang dikeluarkan untuk memproduksi satu satuan barang atau jasa, meliputi bahan baku, kemasan, dan upah langsung.',
    practicalTip: 'Jangan lupa memasukkan biaya kemasan dan gas/listrik ke dalam komponen HPP.',
  },
  {
    term: 'Break-Even Point (BEP)',
    category: 'Analisis Usaha',
    definition: 'Titik impas operasional di mana total volume penjualan menghasilkan pendapatan yang sama persis dengan total seluruh biaya yang dikeluarkan.',
    practicalTip: 'Ketahui berapa porsi minimal yang harus Anda jual setiap hari sebelum bisa mencetak laba.',
  },
  {
    term: 'Margin vs Markup',
    category: 'Penetapan Harga',
    definition: 'Markup dihitung dari HPP: (Harga - HPP)/HPP. Margin dihitung dari Harga Jual: (Harga - HPP)/Harga Jual.',
    practicalTip: 'Margin 50% setara dengan Markup 100%. Jangan salah memakai rumus saat negosiasi harga ke pembeli.',
  },
  {
    term: 'Nomor Induk Berusaha (NIB)',
    category: 'Legalitas Usaha',
    definition: 'Bukti registrasi atau izin edar legalitas resmi bagi pelaku usaha di Indonesia yang diterbitkan secara terintegrasi.',
    practicalTip: 'NIB untuk usaha mikro gratis dan dapat diurus secara mandiri tanpa calo melalui sistem perizinan pemerintah.',
  },
];
