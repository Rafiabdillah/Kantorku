/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D8: Operasional & Rantai Pasok - Seeded Analytical Quizzes Generator
 */

import { AdvancedQuestion } from '../../../components/engines/AdvancedQuizEngine';
import {
  mulberry32,
  hashStringToSeed,
  shuffleWithRng,
  shuffleGuaranteedDifferent,
} from '../d12-komunikasi/quizzes';
import {
  D8_INVENTORY_CONSTANTS,
  calculateEOQ,
  calculateDailyDemand,
  calculateSafetyStock,
  calculateROP,
  calculateOrderFrequency,
  formatRupiahD8,
} from './constants';

export function generateSeededD8Quizzes(seedInput: number | string = 8008): AdvancedQuestion[] {
  const seedNum = hashStringToSeed(seedInput);
  const rng = mulberry32(seedNum);

  const variantQ1 = rng() > 0.5 ? 'B' : 'A';
  const variantQ3 = rng() > 0.5 ? 'B' : 'A';
  const variantQ5 = rng() > 0.5 ? 'B' : 'A';
  const variantQ7 = rng() > 0.5 ? 'B' : 'A';

  // 1. Urutan: Tahapan Standar Penerimaan Barang Inbound di Gudang
  const q1RawItems = [
    {
      id: 'step-inbound-check',
      text:
        variantQ1 === 'A'
          ? '1. Pemeriksaan Dokumen Pengiriman: Mencocokkan Surat Jalan ekspedisi dengan Purchase Order (PO) resmi perusahaan.'
          : '1. Verifikasi Dokumen PO: Memeriksa kelengkapan berkas surat jalan dan nomor referensi pesanan pengadaan.',
    },
    {
      id: 'step-quality-inspect',
      text:
        variantQ1 === 'A'
          ? '2. Inspeksi Fisik & Uji Mutu (QC): Memeriksa keutuhan kemasan, tanggal kedaluwarsa, dan kesesuaian spesifikasi sampel barang.'
          : '2. Quality Control Barang Datang: Menghitung kuantitas fisik dan menguji standar kualitas sebelum pembongkaran.',
    },
    {
      id: 'step-system-entry',
      text:
        variantQ1 === 'A'
          ? '3. Pencatatan Sistem Good Receipt: Menginput kuantitas barang diterima ke sistem inventaris untuk menambah saldo persediaan.'
          : '3. Penerbitan Bukti Terima Barang: Memperbarui kartu stok digital dan menandatangani tanda terima resmi.',
    },
    {
      id: 'step-putaway-fifo',
      text:
        variantQ1 === 'A'
          ? '4. Penempatan Rak Berbasis FIFO (Putaway): Menyusun barang ke rak penyimpanan dengan penandaan tanggal kedatangan jelas.'
          : '4. Penyusunan Rak Terstandar: Menempatkan barang pada zona penyimpanan sesuai prinsip First In, First Out.',
    },
  ];
  const q1CorrectOrder = ['step-inbound-check', 'step-quality-inspect', 'step-system-entry', 'step-putaway-fifo'];
  const q1Items = shuffleGuaranteedDifferent(q1RawItems, q1CorrectOrder, rng);

  // 2. Cocokkan: Kategori Biaya Persediaan & Komponen Pembentuknya
  const q2Pairs = shuffleWithRng(
    [
      {
        id: 'cost-order',
        left: 'Biaya Pemesanan (Ordering Cost)',
        right: 'Biaya administrasi PO, biaya ekspedisi kurir per pesanan, dan biaya bongkar muat pemeriksaan barang.',
      },
      {
        id: 'cost-hold',
        left: 'Biaya Penyimpanan (Holding Cost)',
        right: 'Sewa ruang gudang, biaya listrik/pendingin, premi asuransi, dan risiko penyusutan atau kerusakan fisik.',
      },
      {
        id: 'cost-stockout',
        left: 'Biaya Kehabisan Barang (Stockout Cost)',
        right: 'Kehilangan laba penjualan langsung, hilangnya kepercayaan pelanggan, dan denda keterlambatan kontrak.',
      },
      {
        id: 'cost-purchase',
        left: 'Biaya Pembelian (Purchase Cost)',
        right: 'Harga faktur bruto barang yang dibayarkan kepada pihak pemasok sesuai volume transaksi.',
      },
    ],
    rng
  );

  // 3. Temukan Kesalahan: Audit Perhitungan Reorder Point (ROP)
  const dailyDemand = calculateDailyDemand(
    D8_INVENTORY_CONSTANTS.annualDemandUnits,
    D8_INVENTORY_CONSTANTS.workingDaysPerYear
  );
  const safetyStock = calculateSafetyStock(
    D8_INVENTORY_CONSTANTS.maxLeadTimeDays,
    D8_INVENTORY_CONSTANTS.normalLeadTimeDays,
    dailyDemand
  );
  const ropActual = calculateROP(dailyDemand, D8_INVENTORY_CONSTANTS.normalLeadTimeDays, safetyStock);

  const q3SnippetLines = [
    {
      id: 'line-demand',
      text: `Permintaan barang harian (d): ${D8_INVENTORY_CONSTANTS.annualDemandUnits.toLocaleString('id-ID')} unit / ${D8_INVENTORY_CONSTANTS.workingDaysPerYear} hari kerja = ${dailyDemand} unit/hari.`,
      isError: false,
    },
    {
      id: 'line-leadtime',
      text: `Lead time pengiriman vendor: Normal ${D8_INVENTORY_CONSTANTS.normalLeadTimeDays} hari kerja, Maksimum ${D8_INVENTORY_CONSTANTS.maxLeadTimeDays} hari kerja (selisih variabilitas = 3 hari).`,
      isError: false,
    },
    {
      id: 'line-calc-error',
      text:
        variantQ3 === 'A'
          ? `Perhitungan ROP staf logistik: ROP = 40 unit x 5 hari = 200 unit (mengabaikan safety stock sama sekali sehingga rawan kehabisan barang).`
          : `Perhitungan ROP staf logistik: ROP = 40 unit + 120 unit safety stock = 160 unit (lupa mengalikan permintaan harian dengan lead time normal).`,
      isError: true,
    },
    {
      id: 'line-calc-correct',
      text: `Koreksi ROP ilmiah: ROP = (Permintaan Harian x Lead Time Normal) + Safety Stock = (40 x 5) + 120 = ${ropActual} unit.`,
      isError: false,
    },
  ];

  // 4. Cocokkan: Kriteria Penilaian Vendor Pemasok & Indikator Kinerjanya
  const q4Pairs = shuffleWithRng(
    [
      {
        id: 'eval-quality',
        left: 'Kualitas Barang (Defect Rate)',
        right: 'Persentase barang yang lolos inspeksi QC tanpa cacat material (target mutu minimal 99%).',
      },
      {
        id: 'eval-delivery',
        left: 'Ketepatan Waktu (On-Time Delivery)',
        right: 'Kesesuaian tanggal tiba barang di dermaga gudang terhadap tenggat yang dijanjikan dalam PO.',
      },
      {
        id: 'eval-price',
        left: 'Daya Saing Harga (Competitiveness)',
        right: 'Harga neto yang ditawarkan termasuk diskon volume dan termin pembayaran (termin kredit 30-60 hari).',
      },
      {
        id: 'eval-responsiveness',
        left: 'Responsivitas Layanan (Service Level)',
        right: 'Kecepatan vendor dalam menanggapi pesanan darurat, keluhan retur barang, dan pertukaran informasi faktur.',
      },
    ],
    rng
  );

  // 5. Urutan: Siklus Manajemen Pemesanan Barang (Procure-to-Pay)
  const q5RawItems = [
    {
      id: 'step-p2p-pr',
      text:
        variantQ5 === 'A'
          ? '1. Purchase Requisition (PR): Bagian gudang mengajukan permohonan pengadaan barang saat stok menyentuh ROP.'
          : '1. Permohonan Pembelian: Menerbitkan formulir kebutuhan stok saat saldo persediaan mendekati ambang batas pesan ulang.',
    },
    {
      id: 'step-p2p-po',
      text:
        variantQ5 === 'A'
          ? '2. Purchase Order (PO): Bagian pengadaan menerbitkan surat pesanan resmi kepada vendor terpilih dengan rincian harga dan SLA.'
          : '2. Penerbitan Pesanan Resmi: Mengirimkan PO kepada pemasok utama yang memuat kuantitas EOQ dan tenggat waktu kirim.',
    },
    {
      id: 'step-p2p-receipt',
      text:
        variantQ5 === 'A'
          ? '3. Penerimaan & Inspeksi Gudang: Menghitung dan memeriksa kesesuaian fisik barang terhadap spesifikasi PO.'
          : '3. Good Receipt & QC: Melakukan verifikasi fisik barang datang di dermaga pembongkaran sebelum disimpan ke rak.',
    },
    {
      id: 'step-p2p-matching',
      text:
        variantQ5 === 'A'
          ? '4. Pencocokan Tiga Pihak (3-Way Matching): Memverifikasi kecocokan antara PO, Surat Jalan Gudang, dan Faktur Tagihan sebelum pembayaran.'
          : '4. Verifikasi Pembayaran Faktur: Mencocokkan bukti terima gudang dengan invoice vendor sebelum proses transfer dana kasir.',
    },
  ];
  const q5CorrectOrder = ['step-p2p-pr', 'step-p2p-po', 'step-p2p-receipt', 'step-p2p-matching'];
  const q5Items = shuffleGuaranteedDifferent(q5RawItems, q5CorrectOrder, rng);

  // 6. Klik Area: Identifikasi Parameter EOQ Optimal yang Meminimalkan Biaya Total
  const eoq = calculateEOQ(
    D8_INVENTORY_CONSTANTS.annualDemandUnits,
    D8_INVENTORY_CONSTANTS.orderCostPerOrder,
    D8_INVENTORY_CONSTANTS.holdingCostPerUnitPerYear
  );
  const q6Zones = [
    {
      id: 'eoq-sub-optimal-small',
      label: 'Pesanan Kecil (200 unit): 50 kali pesan per tahun. Biaya pesan membengkak jadi Rp2.500.000, biaya simpan Rp100.000 (Total Rp2.600.000).',
      isTarget: false,
      explanation: 'Pilihan ini dijelaskan oleh konteks dan label pada kartu yang ditampilkan.',
    },
    {
      id: 'eoq-optimal',
      label: `EOQ Optimal (${eoq.toLocaleString('id-ID')} unit): 10 kali pesan setahun. Biaya pesan Rp500.000 sama dengan biaya simpan Rp500.000 (Total Minimum Rp1.000.000).`,
      isTarget: true,
      explanation: 'Pilihan ini dijelaskan oleh konteks dan label pada kartu yang ditampilkan.',
    },
    {
      id: 'eoq-sub-optimal-large',
      label: 'Pesanan Raksasa (5.000 unit): 2 kali pesan per tahun. Biaya pesan Rp100.000, tetapi biaya simpan melonjak jadi Rp2.500.000 (Total Rp2.600.000).',
      isTarget: false,
      explanation: 'Pilihan ini dijelaskan oleh konteks dan label pada kartu yang ditampilkan.',
    },
  ];

  // 7. Temukan Kesalahan: Pelanggaran Standar Operasional & K3 Pergudangan
  const q7SnippetLines = [
    {
      id: 'sop-line-1',
      text: 'Ketentuan Gudang: "Seluruh staf dan tamu diwajibkan menggunakan rompi reflektif dan sepatu keselamatan kerja (safety shoes)."',
      isError: false,
    },
    {
      id: 'sop-line-2',
      text:
        variantQ7 === 'A'
          ? 'Ketentuan Gudang: "Barang rusak dan palet sisa boleh ditumpuk di depan pintu darurat dan kotak APAR jika rak penuh."'
          : 'Ketentuan Gudang: "Forklift diperbolehkan melaju kencang di lorong pejalan kaki tanpa membunyikan klakson jika sedang terburu-buru."' ,
      isError: true,
    },
    {
      id: 'sop-line-3',
      text: 'Ketentuan Gudang: "Barang berputar cepat (fast-moving) wajib ditempatkan pada rak level bawah yang dekat dengan dermaga keluar."',
      isError: false,
    },
    {
      id: 'sop-line-4',
      text: 'Ketentuan Gudang: "Pencatatan kartu stok fisik dan sistem digital disinkronkan setiap selesai proses bongkar muat barang."',
      isError: false,
    },
  ];

  // 8. Cocokkan: Istilah Model Persediaan & Rumus Matematisnya
  const q8Pairs = shuffleWithRng(
    [
      {
        id: 'f-eoq',
        left: 'Economic Order Quantity (EOQ)',
        right: 'Akar dari ((2 * Permintaan Tahunan * Biaya Pesan) / Biaya Simpan per Unit).',
      },
      {
        id: 'f-daily-demand',
        left: 'Permintaan Harian Rata-rata (d)',
        right: 'Permintaan Tahunan / Jumlah Hari Kerja Operasional Setahun.',
      },
      {
        id: 'f-safety-stock',
        left: 'Safety Stock (Stok Pengaman)',
        right: '(Lead Time Maksimum - Lead Time Normal) * Permintaan Harian Rata-rata.',
      },
      {
        id: 'f-rop',
        left: 'Reorder Point (Titik Pesan Ulang)',
        right: '(Permintaan Harian * Lead Time Normal) + Safety Stock.',
      },
    ],
    rng
  );

  // 9. Urutan: Tahapan Pelaksanaan Stock Opname Fisik Gudang
  const q9RawItems = [
    {
      id: 'step-opname-freeze',
      text: '1. Pembekuan Transaksi (Stock Freeze): Menghentikan sementara pergerakan barang masuk dan keluar selama proses penghitungan berlangsung.',
    },
    {
      id: 'step-opname-count',
      text: '2. Penghitungan Fisik Lapangan (Physical Count): Dua tim independen menghitung kuantitas fisik di setiap rak tanpa saling melihat catatan.',
    },
    {
      id: 'step-opname-reconcile',
      text: '3. Rekonsiliasi & Investigasi Selisih: Membandingkan total fisik dengan saldo buku sistem, serta menelusuri nota transaksi yang terlewat.',
    },
    {
      id: 'step-opname-adjust',
      text: '4. Penyesuaian Saldo Buku (Adjustment): Menerbitkan berita acara penyesuaian inventaris dengan persetujuan pimpinan manajemen.',
    },
  ];
  const q9CorrectOrder = ['step-opname-freeze', 'step-opname-count', 'step-opname-reconcile', 'step-opname-adjust'];
  const q9Items = shuffleGuaranteedDifferent(q9RawItems, q9CorrectOrder, rng);

  // 10. Klik Area: Identifikasi Zona Potensi Bahaya (Hazard) Tata Letak Gudang
  const q10Zones = [
    {
      id: 'zone-safe-aisle',
      label: 'Zona Aman: Jalur lalu lintas forklift diberi pembatas marka kuning jelas dan terpisah dari koridor pejalan kaki.',
      isTarget: false,
      explanation: 'Pilihan ini dijelaskan oleh konteks dan label pada kartu yang ditampilkan.',
    },
    {
      id: 'zone-hazard-blocked',
      label: 'Zona Bahaya K3: Tumpukan palet barang diletakkan menutupi akses hidran dan panel listrik darurat.',
      isTarget: true,
      explanation: 'Pilihan ini dijelaskan oleh konteks dan label pada kartu yang ditampilkan.',
    },
    {
      id: 'zone-safe-storage',
      label: 'Zona Aman: Rak baja berat terikat angkur lantai dan dilengkapi batas kapasitas beban maksimal (SWL).',
      isTarget: false,
      explanation: 'Pilihan ini dijelaskan oleh konteks dan label pada kartu yang ditampilkan.',
    },
  ];

  return [
    {
      id: 'D8-QZ-01',
      title: 'Urutan Prosedur Inbound Penerimaan Barang Gudang',
      type: 'urutan',
      instruction: 'Susun 4 tahapan penerimaan barang datang di dermaga gudang secara berurutan:',
      items: q1Items,
      correctOrder: q1CorrectOrder,
      explanation: 'Penerimaan barang diawali verifikasi dokumen PO, inspeksi kualitas QC, pencatatan Good Receipt di sistem, dan penataan ke rak berbasis FIFO.',
    },
    {
      id: 'D8-QZ-02',
      title: 'Klasifikasi Komponen Biaya Persediaan Bisnis',
      type: 'cocokkan',
      instruction: 'Pasangkan jenis biaya persediaan dengan contoh pengeluaran operasional yang sesuai:',
      pairs: q2Pairs,
      explanation: 'Biaya pemesanan mencakup proses pengadaan, biaya simpan mencakup fasilitas gudang, dan biaya kehabisan barang mencakup kerugian hilangnya peluang transaksi.',
    },
    {
      id: 'D8-QZ-03',
      title: 'Audit Perhitungan Titik Pesan Ulang (ROP) & Safety Stock',
      type: 'temukan-kesalahan',
      instruction: 'Identifikasi baris laporan perhitungan yang keliru dalam menentukan ambang pesan ulang:',
      contextSnippet: {
        title: 'Lembar Parameter Pengadaan Persediaan Barang',
        lines: q3SnippetLines,
      },
      requiredErrorCount: 1,
      explanation: `Rumus ROP wajib memasukkan stok pengaman: ROP = (Permintaan Harian x Lead Time Normal) + Safety Stock = (40 x 5) + 120 = ${ropActual} unit.`,
    },
    {
      id: 'D8-QZ-04',
      title: 'Kriteria Evaluasi Kinerja Vendor Pemasok (SLA)',
      type: 'cocokkan',
      instruction: 'Pasangkan pilar evaluasi vendor dengan indikator performa terukurnya:',
      pairs: q4Pairs,
      explanation: 'Evaluasi vendor multi-kriteria menyeimbangkan mutu produk (defect rate), ketepatan waktu pengiriman (on-time delivery), daya saing harga, dan responsivitas layanan.',
    },
    {
      id: 'D8-QZ-05',
      title: 'Alur Pengadaan Barang Terpadu (Procure-to-Pay)',
      type: 'urutan',
      instruction: 'Urutkan siklus pengadaan persediaan dari pengajuan internal hingga pembayaran faktur:',
      items: q5Items,
      correctOrder: q5CorrectOrder,
      explanation: 'Siklus Procure-to-Pay diawali Purchase Requisition (PR), Purchase Order (PO), penerimaan barang (Good Receipt), dan verifikasi 3-Way Matching sebelum pembayaran.',
    },
    {
      id: 'D8-QZ-06',
      title: 'Penentuan Titik Kuantitas Pesanan Ekonomis (EOQ)',
      type: 'klik-area',
      instruction: 'Klik skenario pemesanan yang mencapai titik efisiensi total biaya persediaan terendah:',
      previewImageOrBox: {
        title: 'Grafik Kurva Trade-off Biaya Pesan vs Biaya Simpan Persediaan',
        zones: q6Zones,
      },
      explanation: `Model EOQ optimal pada ukuran pesanan ${eoq.toLocaleString('id-ID')} unit karena biaya pemesanan (Rp500.000) persis seimbang dengan biaya penyimpanan (Rp500.000), menghasilkan total biaya tahunan minimum Rp1.000.000.`,
    },
    {
      id: 'D8-QZ-07',
      title: 'Pemeriksaan Kepatuhan Prosedur K3 Pergudangan',
      type: 'temukan-kesalahan',
      instruction: 'Temukan klausula operasional yang melanggar standar keselamatan kerja (K3) dan manajemen mutu:',
      contextSnippet: {
        title: 'Standar Operasional Prosedur (SOP) Keselamatan Pergudangan',
        lines: q7SnippetLines,
      },
      requiredErrorCount: 1,
      explanation: 'Standar K3 melarang keras menumpuk barang atau menghalangi akses ke pintu evakuasi darurat dan peralatan pemadam api ringan (APAR).',
    },
    {
      id: 'D8-QZ-08',
      title: 'Formula Matematis Manajemen Persediaan Rantai Pasok',
      type: 'cocokkan',
      instruction: 'Pasangkan nama metrik persediaan dengan formula perhitungannya yang tepat:',
      pairs: q8Pairs,
      explanation: 'Rumus EOQ, permintaan harian, safety stock, dan ROP merupakan fondasi kuantitatif pengendalian stok yang efisien dan anti-stockout.',
    },
    {
      id: 'D8-QZ-09',
      title: 'Tahapan Siklus Stock Opname Fisik Gudang',
      type: 'urutan',
      instruction: 'Urutkan tahapan audit fisik barang gudang dari persiapan hingga pembukuan:',
      items: q9Items,
      correctOrder: q9CorrectOrder,
      explanation: 'Stock opname dimulai dari pembekuan mutasi barang, penghitungan fisik ganda, rekonsiliasi selisih dengan kartu stok, dan penyesuaian resmi saldo buku.',
    },
    {
      id: 'D8-QZ-10',
      title: 'Identifikasi Pelanggaran Tata Letak & Bahaya Fisik Gudang',
      type: 'klik-area',
      instruction: 'Klik area operasional gudang yang menimbulkan risiko bahaya kecelakaan kerja (hazard):',
      previewImageOrBox: {
        title: 'Denah Tata Letak Area Penyimpanan & Jalur Logistik Gudang',
        zones: q10Zones,
      },
      explanation: 'Menghalangi panel listrik dan hidran darurat merupakan pelanggaran K3 berat yang membahayakan nyawa saat terjadi insiden kebakaran di gudang.',
    },
  ];
}

export const D8_QUIZZES = generateSeededD8Quizzes(8008);
