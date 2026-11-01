/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D8: Operasional & Rantai Pasok - Cheatsheet
 */

export interface CheatsheetItem {
  id: string;
  title: string;
  category: string;
  points: string[];
}

export const D8_CHEATSHEET: CheatsheetItem[] = [
  {
    id: 'd8-cs-formula-persediaan',
    title: 'Formula Kunci Pengendalian Persediaan Rantai Pasok',
    category: 'Manajemen Persediaan & EOQ',
    points: [
      'EOQ = Akar dari ((2 * Permintaan Tahunan D * Biaya Pesan S) / Biaya Simpan H)',
      'Permintaan Harian (d) = Permintaan Tahunan D / Jumlah Hari Kerja Operasional',
      'Safety Stock (SS) = (Lead Time Maksimal - Lead Time Normal) * Permintaan Harian',
      'Reorder Point (ROP) = (Permintaan Harian * Lead Time Normal) + Safety Stock',
      'Frekuensi Pemesanan Tahunan = Permintaan Tahunan D / EOQ',
      'Interval Antar Pesanan = Hari Kerja Setahun / Frekuensi Pemesanan',
      'Titik EOQ Tercapai saat Biaya Pesan Tahunan persis sama dengan Biaya Simpan Tahunan',
    ],
  },
  {
    id: 'd8-cs-sop-gudang-k3',
    title: 'Checklist Tata Letak Gudang FIFO & Standar K3',
    category: 'SOP Pergudangan & Keselamatan Kerja',
    points: [
      'Inbound: Wajib cocokkan fisik barang dengan Surat Jalan dan Purchase Order (3-Way Check)',
      'Sistem Rak: Terapkan penomoran rak dan metode First In, First Out (FIFO/FEFO)',
      'Aksesibilitas: Barang fast-moving diletakkan paling dekat dengan dermaga pengiriman',
      'Standar K3: Pisahkan jalur forklift dengan koridor pejalan kaki menggunakan marka kuning',
      'Larangan K3 Mutlak: Dilarang menaruh palet/barang menghalangi hidran, panel listrik, dan pintu darurat',
      'Stock Opname: Bekukan mutasi (stock freeze) dan gunakan tim hitung ganda independen',
    ],
  },
];
