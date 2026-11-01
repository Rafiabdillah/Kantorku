/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D8: Operasional & Rantai Pasok - Glossary Definitions
 */

export interface GlossaryItem {
  id: string;
  term: string;
  definition: string;
  category: string;
}

export const D8_GLOSSARY: GlossaryItem[] = [
  {
    id: 'd8-term-eoq',
    term: 'Economic Order Quantity (EOQ)',
    definition:
      'Model matematis untuk menghitung kuantitas pesanan optimal yang meminimalkan total biaya persediaan tahunan (penjumlahan biaya pemesanan dan biaya penyimpanan).',
    category: 'Model Persediaan',
  },
  {
    id: 'd8-term-rop',
    term: 'Reorder Point (ROP)',
    definition:
      'Ambang batas tingkat persediaan minimum yang memicu penerbitan pesanan pembelian baru agar barang tiba tepat saat persediaan reguler habis.',
    category: 'Model Persediaan',
  },
  {
    id: 'd8-term-safety-stock',
    term: 'Safety Stock (Stok Pengaman)',
    definition:
      'Persediaan ekstra yang disimpan sebagai penyangga pengaman untuk melindungi operasional dari risiko lonjakan konsumsi atau keterlambatan waktu kirim pemasok.',
    category: 'Model Persediaan',
  },
  {
    id: 'd8-term-lead-time',
    term: 'Lead Time (Tenggat Pengiriman)',
    definition:
      'Total rentang waktu yang dibutuhkan sejak pesanan pembelian (PO) diterbitkan ke pemasok hingga barang diterima dan siap digunakan di rak gudang.',
    category: 'Rantai Pasok',
  },
  {
    id: 'd8-term-sla',
    term: 'Service Level Agreement (SLA)',
    definition:
      'Perjanjian formal antara perusahaan dengan pemasok yang menetapkan standar kinerja wajib, seperti batas waktu pengiriman, tingkat cacat maksimal, dan penalti pelanggaran.',
    category: 'Manajemen Pemasok',
  },
  {
    id: 'd8-term-fifo',
    term: 'First In, First Out (FIFO)',
    definition:
      'Metode tata letak dan pengeluaran barang gudang di mana barang yang pertama kali masuk harus menjadi barang yang pertama kali dikeluarkan atau dijual.',
    category: 'Manajemen Gudang',
  },
  {
    id: 'd8-term-stock-opname',
    term: 'Stock Opname Fisik',
    definition:
      'Aktivitas penghitungan fisik seluruh persediaan barang yang ada di gudang secara langsung untuk mencocokkan saldo fisik dengan saldo catatan kartu stok buku/sistem.',
    category: 'Manajemen Gudang',
  },
];
