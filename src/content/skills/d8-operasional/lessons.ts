/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D8: Operasional & Rantai Pasok - Lessons
 */

import {
  D8_INVENTORY_CONSTANTS,
  calculateEOQ,
  calculateDailyDemand,
  calculateSafetyStock,
  calculateROP,
  calculateOrderFrequency,
  formatRupiahD8,
} from './constants';

export interface LessonSection {
  title: string;
  content: string;
  keyPoints: string[];
}

export interface D8Lesson {
  id: string;
  domainId: 'D8';
  title: string;
  summary: string;
  estimatedMinutes: number;
  lastReviewed: string;
  sources: string[];
  disclaimer: string;
  workedExample: {
    bad: string;
    good: string;
    explanation: string;
  };
  sections: LessonSection[];
}

export const D8_LESSONS: D8Lesson[] = [
  {
    id: 'D8-LES-01',
    domainId: 'D8',
    title: 'Model Kuantitas Pesanan Ekonomis (EOQ) & Optimasi Biaya Persediaan',
    summary:
      'Formula matematis penentuan ukuran lot pemesanan yang menyeimbangkan biaya pemesanan (setup cost) dan biaya penyimpanan barang (holding cost).',
    estimatedMinutes: 18,
    lastReviewed: '2026-10-31',
    sources: [
      'Heizer, J., Render, B., & Munson, C. (2020). Operations Management: Sustainability and Supply Chain Management (Pearson, 13th ed.)',
      'Chopra, S., & Meindl, P. (2016). Supply Chain Management: Strategy, Planning, and Operation (Pearson, 6th ed.)',
    ],
    disclaimer:
      'Materi manajemen operasional dan rantai pasok ini disajikan untuk keperluan pelatihan kompetensi kerja dan standardisasi operasional.',
    workedExample: {
      bad: 'Kepala gudang memesan 100 unit setiap 3 hari sekali dengan alasan "biar tidak pusing simpan barang", padahal biaya administrasi setiap kali memesan adalah Rp50.000 sehingga perusahaan boros biaya pemesanan ratusan kali setahun.',
      good: `Penerapan model EOQ: Kebutuhan tahunan ${D8_INVENTORY_CONSTANTS.annualDemandUnits.toLocaleString('id-ID')} unit, biaya pesan ${formatRupiahD8(D8_INVENTORY_CONSTANTS.orderCostPerOrder)} per order, dan biaya simpan ${formatRupiahD8(D8_INVENTORY_CONSTANTS.holdingCostPerUnitPerYear)}/unit/tahun. EOQ = akar((2 * ${D8_INVENTORY_CONSTANTS.annualDemandUnits} * ${D8_INVENTORY_CONSTANTS.orderCostPerOrder}) / ${D8_INVENTORY_CONSTANTS.holdingCostPerUnitPerYear}) = akar(1.000.000) = ${calculateEOQ(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.orderCostPerOrder, D8_INVENTORY_CONSTANTS.holdingCostPerUnitPerYear).toLocaleString('id-ID')} unit per pesanan. Frekuensi pemesanan menjadi ${calculateOrderFrequency(D8_INVENTORY_CONSTANTS.annualDemandUnits, calculateEOQ(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.orderCostPerOrder, D8_INVENTORY_CONSTANTS.holdingCostPerUnitPerYear))} kali per tahun dengan total biaya persediaan minimum ${formatRupiahD8(1_000_000)}.`,
      explanation:
        'Pemesanan dalam jumlah terlalu kecil melipatgandakan biaya administrasi pengadaan (ordering cost). Sebaliknya, pemesanan terlalu besar membebani modal kerja dan biaya gudang (holding cost). Model EOQ menemukan titik impas di mana biaya pesan sama persis dengan biaya simpan.',
    },
    sections: [
      {
        title: '1. Trade-off Biaya Pesan vs Biaya Simpan',
        content:
          'Biaya persediaan terdiri dari dua kekuatan yang saling bertolak belakang: Biaya Pemesanan (S) yang menurun seiring membesarnya ukuran pesanan, dan Biaya Penyimpanan (H) yang meningkat linier seiring banyaknya barang yang mengendap di gudang. Kurva total biaya persediaan mencapai titik terendah tepat saat biaya pesan sama dengan biaya simpan.',
        keyPoints: [
          'Biaya pesan mencakup biaya administrasi PO, ekspedisi kirim, dan inspeksi barang datang.',
          'Biaya simpan mencakup sewa gudang, asuransi, pendingin/listrik, dan risiko penyusutan barang.',
          'EOQ meminimalkan total biaya persediaan tahunan secara matematis.',
        ],
      },
      {
        title: '2. Rumus Matematis EOQ Klasik',
        content: `Rumus dasar EOQ: EOQ = akar((2 * D * S) / H). Dengan D = ${D8_INVENTORY_CONSTANTS.annualDemandUnits.toLocaleString('id-ID')} unit, S = ${formatRupiahD8(D8_INVENTORY_CONSTANTS.orderCostPerOrder)}, dan H = ${formatRupiahD8(D8_INVENTORY_CONSTANTS.holdingCostPerUnitPerYear)}, didapatkan ukuran pesanan paling ekonomis sebesar ${calculateEOQ(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.orderCostPerOrder, D8_INVENTORY_CONSTANTS.holdingCostPerUnitPerYear).toLocaleString('id-ID')} unit per pemesanan.`,
        keyPoints: [
          'D adalah permintaan tahunan (Annual Demand).',
          'S adalah biaya setup/pemesanan per satu kali transaksi order.',
          'H adalah biaya simpan per unit per tahun.',
        ],
      },
      {
        title: '3. Frekuensi dan Interval Siklus Pemesanan',
        content: `Dengan EOQ ${calculateEOQ(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.orderCostPerOrder, D8_INVENTORY_CONSTANTS.holdingCostPerUnitPerYear).toLocaleString('id-ID')} unit, jumlah pesanan tahunan adalah ${calculateOrderFrequency(D8_INVENTORY_CONSTANTS.annualDemandUnits, calculateEOQ(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.orderCostPerOrder, D8_INVENTORY_CONSTANTS.holdingCostPerUnitPerYear))} kali (10.000 / 1.000). Dalam ${D8_INVENTORY_CONSTANTS.workingDaysPerYear} hari kerja setahun, interval waktu antar pesanan adalah 25 hari kerja (${D8_INVENTORY_CONSTANTS.workingDaysPerYear} / 10).`,
        keyPoints: [
          'Interval pemesanan teratur memudahkan jadwal kedatangan barang bagi staf gudang.',
          'Membantu pemasok merencanakan jadwal pengiriman secara konsisten.',
          'Mencegah penumpukan barang pada tanggal-tanggal sibuk.',
        ],
      },
    ],
  },
  {
    id: 'D8-LES-02',
    domainId: 'D8',
    title: 'Penentuan Titik Pesan Ulang (ROP) & Buffer Safety Stock',
    summary:
      'Kalkulasi Reorder Point dan cadangan penyangga persediaan untuk melindungi operasional dari risiko keterlambatan vendor dan lonjakan permintaan harian.',
    estimatedMinutes: 20,
    lastReviewed: '2026-10-31',
    sources: [
      'Heizer, J., Render, B., & Munson, C. (2020). Operations Management: Sustainability and Supply Chain Management (Pearson, 13th ed.)',
      'Chopra, S., & Meindl, P. (2016). Supply Chain Management: Strategy, Planning, and Operation (Pearson, 6th ed.)',
    ],
    disclaimer:
      'Perhitungan titik pesan ulang dan safety stock disajikan berdasarkan parameter operasional manufaktur dan distribusi terverifikasi.',
    workedExample: {
      bad: 'Gudang baru memesan barang ketika stok di rak tersisa 0 unit (habis total). Akibatnya, saat vendor butuh waktu kirim 5 hari, toko mengalami kekosongan barang (stockout) selama 5 hari penuh dan kehilangan pelanggan.',
      good: `Perhitungan ROP terpadu: Permintaan harian d = ${calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear)} unit/hari. Waktu kirim vendor normal L = ${D8_INVENTORY_CONSTANTS.normalLeadTimeDays} hari, terlama ${D8_INVENTORY_CONSTANTS.maxLeadTimeDays} hari. Safety Stock = (${D8_INVENTORY_CONSTANTS.maxLeadTimeDays} - ${D8_INVENTORY_CONSTANTS.normalLeadTimeDays}) x ${calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear)} = ${calculateSafetyStock(D8_INVENTORY_CONSTANTS.maxLeadTimeDays, D8_INVENTORY_CONSTANTS.normalLeadTimeDays, calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear))} unit. ROP = (d x L) + Safety Stock = (${calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear)} x ${D8_INVENTORY_CONSTANTS.normalLeadTimeDays}) + ${calculateSafetyStock(D8_INVENTORY_CONSTANTS.maxLeadTimeDays, D8_INVENTORY_CONSTANTS.normalLeadTimeDays, calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear))} = 200 + 120 = ${calculateROP(calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear), D8_INVENTORY_CONSTANTS.normalLeadTimeDays, calculateSafetyStock(D8_INVENTORY_CONSTANTS.maxLeadTimeDays, D8_INVENTORY_CONSTANTS.normalLeadTimeDays, calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear)))} unit. Saat stok menyentuh angka 320 unit, sistem wajib menerbitkan pesanan pembelian (PO) baru.`,
      explanation:
        'Reorder Point memastikan pesanan baru tiba tepat saat persediaan siklus habis, sementara Safety Stock bertindak sebagai bantalan pengaman jika vendor terlambat hingga batas waktu maksimum.',
    },
    sections: [
      {
        title: '1. Pemahaman Konsep Reorder Point (ROP)',
        content:
          'Titik Pesan Ulang (ROP) adalah tingkat persediaan minimum yang memicu penerbitan pesanan pembelian baru. Tujuannya adalah agar pesanan yang baru tiba tepat saat persediaan reguler habis terpakai, sehingga proses operasional tidak terputus.',
        keyPoints: [
          'ROP bergantung pada rata-rata permintaan harian dan durasi lead time pengiriman.',
          'Jika tidak ada variabilitas waktu kirim, ROP = Permintaan Harian x Lead Time.',
          'Dalam dunia nyata, variabilitas selalu ada sehingga dibutuhkan Safety Stock.',
        ],
      },
      {
        title: '2. Menghitung Safety Stock Menghadapi Variabilitas Lead Time',
        content: `Safety Stock melindungi perusahaan dari keterlambatan pengiriman pemasok. Dengan formula selisih lead time: Safety Stock = (Lead Time Maksimal - Lead Time Normal) * Permintaan Harian = (${D8_INVENTORY_CONSTANTS.maxLeadTimeDays} - ${D8_INVENTORY_CONSTANTS.normalLeadTimeDays}) * ${calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear)} = 3 * 40 = ${calculateSafetyStock(D8_INVENTORY_CONSTANTS.maxLeadTimeDays, D8_INVENTORY_CONSTANTS.normalLeadTimeDays, calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear))} unit.`,
        keyPoints: [
          'Safety stock tidak boleh digunakan untuk kebutuhan konsumsi normal harian.',
          'Jika safety stock terpakai, segera lakukan evaluasi penyebab keterlambatan vendor.',
          'Biaya simpan safety stock harus dipertimbangkan dalam kalkulasi anggaran.',
        ],
      },
      {
        title: '3. Rumus Menyeluruh ROP dengan Buffer Stock',
        content: `Menggabungkan kedua komponen menghasilkan formula: ROP = (d * L) + SS = (40 * 5) + 120 = 200 + 120 = ${calculateROP(calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear), D8_INVENTORY_CONSTANTS.normalLeadTimeDays, calculateSafetyStock(D8_INVENTORY_CONSTANTS.maxLeadTimeDays, D8_INVENTORY_CONSTANTS.normalLeadTimeDays, calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear)))} unit. Begitu saldo kartu stok menunjukkan angka 320 unit, Purchase Order sebesar EOQ (1.000 unit) harus segera diterbitkan.`,
        keyPoints: [
          'Otomatisasi notifikasi ROP di software persediaan mencegah kelalaian admin.',
          'Pemeriksaan fisik rak gudang mengonfirmasi angka saldo di kartu stok.',
          'Perbarui ROP jika rata-rata penjualan bulanan mengalami lonjakan musiman.',
        ],
      },
    ],
  },
  {
    id: 'D8-LES-03',
    domainId: 'D8',
    title: 'Evaluasi Pemasok (Vendor Rating) & Prosedur Operasi Standar (SOP) Gudang',
    summary:
      'Metode penilaian vendor menggunakan pembobotan kriteria, perjanjian SLA pengiriman, penanganan barang inbound FIFO/FEFO, dan K3 pergudangan.',
    estimatedMinutes: 16,
    lastReviewed: '2026-10-31',
    sources: [
      'Chopra, S., & Meindl, P. (2016). Supply Chain Management: Strategy, Planning, and Operation (Pearson, 6th ed.)',
      'SNI ISO 9001:2015 Sistem Manajemen Mutu (Standardisasi Prosedur Operasional)',
    ],
    disclaimer:
      'Evaluasi pemasok dan SOP pergudangan disajikan untuk menjamin integritas mutu dan keselamatan kerja rantai pasok.',
    workedExample: {
      bad: 'Pemasok dipilih hanya karena menawarkan harga paling murah, meskipun sering terlambat 10 hari dan tingkat cacat produk mencapai 8%. Barang kiriman ditumpuk berantakan tanpa label tanggal masuk dan menghalangi pintu darurat gudang.',
      good: 'Evaluasi pemasok multi-kriteria: Harga (bobot 30%), Kualitas produk lolos QC (bobot 40%), dan Ketepatan waktu kirim (bobot 30%). Pemasok dengan skor di bawah 80 dievaluasi atau diganti vendor cadangan. Di area gudang, barang disusun berbasis rak FIFO berlabel kode batch, lorong forklift bebas rintangan, dan peralatan APD wajib digunakan sesuai standar K3.',
      explanation:
        'Harga termurah sering kali menimbulkan total biaya operasional yang jauh lebih mahal akibat barang cacat dan keterlambatan produksi. Manajemen rantai pasok yang unggul menegakkan standar mutu vendor dan prosedur penyimpanan tertib demi keselamatan kerja.',
    },
    sections: [
      {
        title: '1. Matriks Penilaian Kinerja Vendor (Weighted Scoring)',
        content:
          'Kinerja vendor dinilai secara objektif menggunakan matriks berbobot. Tiga pilar utama mencakup: Tingkat Cacat (Defect Rate maksimal 1%), Kepatuhan Jadwal Kirim (On-Time Delivery minimal 95%), dan Kesesuaian Harga terhadap kesepakatan kontrak PO.',
        keyPoints: [
          'Lakukan evaluasi berkala triwulanan terhadap seluruh vendor aktif.',
          'Sediakan daftar vendor cadangan (backup supplier) untuk bahan baku kritis.',
          'Terapkan sanksi penalti keterlambatan yang dituangkan dalam Service Level Agreement (SLA).',
        ],
      },
      {
        title: '2. Prosedur Inbound & Tata Letak FIFO / FEFO',
        content:
          'Saat barang tiba di dermaga bongkar muat (loading dock), lakukan pencocokan fisik terhadap Surat Jalan dan PO. Terapkan prinsip FIFO (First In, First Out) untuk barang umum dan FEFO (First Expired, First Out) untuk produk bertanggal kedaluwarsa.',
        keyPoints: [
          'Labeli setiap palet dengan tanggal kedatangan dan nomor batch produksi.',
          'Letakkan barang yang cepat berputar (fast-moving) di area yang paling dekat dengan jalur keluar.',
          'Catat mutasi barang secara real-time pada kartu stok digital.',
        ],
      },
      {
        title: '3. Keselamatan dan Kesehatan Kerja (K3) Pergudangan',
        content:
          'Standar K3 gudang mencegah kecelakaan fatal: pemisahan jalur pejalan kaki dan forklift, batas maksimal ketinggian tumpukan rak, ketersediaan APD (sepatu safety, rompi reflektif, helm), serta lorong evakuasi darurat yang bebas dari tumpukan barang.',
        keyPoints: [
          'Pemeriksaan rutin kelayakan rak penyimpanan baja dari risiko korosi atau tekuk.',
          'Pelatihan penanganan beban berat (ergonomic lifting) untuk mencegah cedera tulang belakang.',
          'Pemasangan rambu bahaya dan alat pemadam api ringan (APAR) yang terinspeksi berkala.',
        ],
      },
    ],
  },
];
