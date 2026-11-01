/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D7: Keuangan Pribadi & Wirausaha - Seeded Analytical Quizzes Generator
 */

import { AdvancedQuestion } from '../../../components/engines/AdvancedQuizEngine';
import { mulberry32, hashStringToSeed, shuffleWithRng, shuffleGuaranteedDifferent } from '../d12-komunikasi/quizzes';

export function generateSeededD7Quizzes(seedInput: number | string = 4001): AdvancedQuestion[] {
  const seedNum = hashStringToSeed(seedInput);
  const rng = mulberry32(seedNum);

  const variantQ1 = rng() > 0.5 ? 'B' : 'A';
  const variantQ2 = rng() > 0.5 ? 'B' : 'A';
  const variantQ4 = rng() > 0.5 ? 'B' : 'A';
  const variantQ5 = rng() > 0.5 ? 'B' : 'A';
  const variantQ6 = rng() > 0.5 ? 'B' : 'A';
  const variantQ8 = rng() > 0.5 ? 'B' : 'A';

  // 1. Urutan: Prioritas Alokasi Arus Kas Gaji Masuk
  const q1RawItems = [
    {
      id: 'flow-essential',
      text:
        variantQ1 === 'A'
          ? '1. Pos Kebutuhan Pokok Wajib (Sewa hunian/kos, biaya makan, tagihan listrik & transportasi rutin)'
          : '1. Pengeluaran Pokok Mutlak (Pangan bergizi, sewa tempat tinggal, dan utilitas dasar)',
    },
    {
      id: 'flow-debt',
      text:
        variantQ1 === 'A'
          ? '2. Pembayaran Cicilan Utang Produktif / Kewajiban Tepat Waktu (Maksimal 30% pendapatan)'
          : '2. Pembayaran Kewajiban Cicilan Bulanan sebelum jatuh tempo',
    },
    {
      id: 'flow-saving',
      text:
        variantQ1 === 'A'
          ? '3. Alokasi Tabungan Dana Darurat & Investasi Masa Depan (Minimal 10-20% di awal bulan)'
          : '3. Penyisihan Tabungan Dana Cadangan ke rekening terpisah tanpa kartu debit',
    },
    {
      id: 'flow-lifestyle',
      text:
        variantQ1 === 'A'
          ? '4. Pos Keinginan & Rekreasi Pribadi (Sisa anggaran setelah kewajiban dan tabungan terpenuhi)'
          : '4. Pengeluaran Gaya Hidup & Hiburan (Hanya dari porsi yang telah disisihkan)',
    },
  ];

  // 2. Urutan: Tahapan Peluncuran Usaha Sederhana (Dari Ide ke Operasional)
  const q2RawItems = [
    {
      id: 'biz-ide',
      text:
        variantQ2 === 'A'
          ? '1. Riset Validasi Masalah & Proposisi Nilai (Menemukan kebutuhan riil calon pelanggan)'
          : '1. Validasi Kebutuhan Pasar (Memastikan ada orang yang bersedia membayar solusi Anda)',
    },
    {
      id: 'biz-hpp',
      text:
        variantQ2 === 'A'
          ? '2. Perhitungan HPP Riil & Pemetaan Struktur Biaya BMC (Menghitung modal dan batas impas)'
          : '2. Kalkulasi Biaya Produksi Riil dan Analisis Titik Impas (BEP)',
    },
    {
      id: 'biz-legal',
      text:
        variantQ2 === 'A'
          ? '3. Pendaftaran Legalitas Dasar (NIB Berbasis Risiko) & Pemisahan Rekening Bisnis'
          : '3. Pembuatan NIB Daring Resmi dan Pembukaan Rekening Khusus Usaha',
    },
    {
      id: 'biz-launch',
      text:
        variantQ2 === 'A'
          ? '4. Uji Coba Penjualan Produk (Pilot Launch) & Pengumpulan Evaluasi Pelanggan'
          : '4. Peluncuran Produk ke Pasar Sasaran dan Pencatatan Arus Kas Transaksi',
    },
  ];

  // 3. Cocokkan: Skema Finansial & Bunga Pinjaman
  const q3Pairs = [
    {
      id: 'f-1',
      left: 'Bunga Flat (Dihitung dari pokok pinjaman awal sepanjang tenor)',
      right: 'Beban bunga riil sebenarnya hampir 2x lipat dari angka nominalnya',
    },
    {
      id: 'f-2',
      left: 'Bunga Efektif / Anuitas (Dihitung dari sisa pokok utang berjalan)',
      right: 'Porsi bunga menurun seiring berkurangnya sisa pokok pinjaman',
    },
    {
      id: 'f-3',
      left: 'Dana Darurat 3x Pengeluaran Rutin Bulanan',
      right: 'Batas standar minimal bagi individu lajang tanpa tanggungan keluarga',
    },
    {
      id: 'f-4',
      left: 'Dana Darurat 6-12x Pengeluaran Rutin Bulanan',
      right: 'Batas aman bagi kepala keluarga atau pelaku wirausaha dengan pendapatan fluktuatif',
    },
  ];

  // 4. Cocokkan: 9 Blok Business Model Canvas
  const q4Pairs = [
    {
      id: 'b-1',
      left: 'Value Proposition',
      right: 'Alasan utama pelanggan memilih produk Anda dibanding kompetitor',
    },
    {
      id: 'b-2',
      left: 'Customer Segments',
      right: 'Kelompok masyarakat spesifik yang menjadi target pengguna solusi bisnis',
    },
    {
      id: 'b-3',
      left: 'Revenue Streams',
      right: 'Cara dan model transaksi bagaimana bisnis menghasilkan uang kas masuk',
    },
    {
      id: 'b-4',
      left: 'Cost Structure',
      right: 'Daftar seluruh pos biaya operasional terbesar untuk menjalankan bisnis',
    },
  ];

  // 5. Temukan Kesalahan: Perhitungan HPP & Penetapan Harga Jual
  const q5Lines =
    variantQ5 === 'A'
      ? [
          { id: 'c1', text: 'Biaya bahan baku ayam & bumbu per porsi: Rp 12.000.', isError: false },
          { id: 'c2', text: 'Biaya kemasan boks kardus laminasi & sendok: Rp 2.500.', isError: false },
          { id: 'c3', text: 'Biaya tenaga kerja masak & gas operasional dianggap gratis (Rp 0) karena dikerjakan keluarga sendiri di rumah.', isError: true, errorReason: 'Mengabaikan biaya tenaga kerja dan gas menyebabkan distorsi HPP semu' },
          { id: 'c4', text: 'Penetapan harga jual langsung disamakan dengan harga pedagang kaki lima tanpa menghitung margin laba bersih.', isError: true, errorReason: 'Meniru harga pasar tanpa kalkulasi struktur biaya internal berisiko merugi' },
          { id: 'c5', text: 'Menetapkan target margin keuntungan 25% di atas HPP total yang telah diaudit.', isError: false },
        ]
      : [
          { id: 'c1', text: 'Total HPP riil per porsi makanan dihitung lengkap sebesar Rp 18.000.', isError: false },
          { id: 'c2', text: 'Pemilik ingin margin keuntungan 50%, sehingga harga jual dihitung: Rp 18.000 x 50% = Rp 9.000.', isError: true, errorReason: 'Kekeliruan rumus: menghitung 50% dari HPP lalu menjadikannya harga jual, menghasilkan harga di bawah modal' },
          { id: 'c3', text: 'Harga jual yang benar dengan margin 50% adalah HPP / (1 - 0.5) = Rp 36.000.', isError: false },
          { id: 'c4', text: 'Semua uang hasil kasir warung langsung dimasukkan ke dompet saku pribadi untuk belanja dapur rumah tangga.', isError: true, errorReason: 'Mencampur uang kasir usaha dengan dompet pribadi merusak pencatatan arus kas' },
          { id: 'c5', text: 'Mencatat rekapitulasi penjualan harian pada buku kas kasir setiap tutup toko.', isError: false },
        ];

  // 6. Temukan Kesalahan: Kebiasaan Finansial Berbahaya yang Menguras Kas
  const q6Lines =
    variantQ6 === 'A'
      ? [
          { id: 'w1', text: 'Menyisihkan 15% dari pendapatan bersih setiap tanggal gajian untuk dana darurat.', isError: false },
          { id: 'w2', text: 'Menggunakan pinjaman daring berbunga harian 0.4% per hari untuk membeli tiket konser musik.', isError: true, errorReason: 'Utang konsumtif berbunga harian sangat mencekik finansial jangka panjang' },
          { id: 'w3', text: 'Membayar seluruh tagihan kartu kredit secara penuh (full payment) sebelum tanggal jatuh tempo.', isError: false },
          { id: 'w4', text: 'Mengambil cicilan konsumtif hingga 70% dari gaji bulanan dengan asumsi bulan depan pasti ada bonus.', isError: true, errorReason: 'Rasio cicilan di atas 30% memicu krisis likuiditas parah' },
          { id: 'w5', text: 'Memiliki catatan pengeluaran rutin bulanan untuk mengevaluasi pos kebocoran kecil.', isError: false },
        ]
      : [
          { id: 'w1', text: 'Menyimpan dana darurat pada instrumen reksa dana pasar uang atau tabungan bank cair cepat.', isError: false },
          { id: 'w2', text: 'Menaruh seluruh tabungan dana darurat ke koin kripto spekulatif yang sangat volatil.', isError: true, errorReason: 'Dana darurat wajib disimpan di instrumen likuid dan bebas risiko penurunan nilai pokok' },
          { id: 'w3', text: 'Mengalokasikan batas maksimal belanja rekreasi dan hiburan maksimal 20-30% dari penghasilan.', isError: false },
          { id: 'w4', text: 'Membayar tagihan kartu kredit hanya batas minimum (minimum payment) berbulan-bulan.', isError: true, errorReason: 'Minimum payment mengakumulasi bunga majemuk berbunga tinggi' },
          { id: 'w5', text: 'Mengaudit pengeluaran langganan digital bulanan yang sudah tidak pernah digunakan.', isError: false },
        ];

  // 7. Cocokkan: Biaya Tetap (Fixed Cost) vs Biaya Variabel (Variable Cost)
  const q7Pairs = [
    {
      id: 'c-fc1',
      left: 'Biaya Sewa Ruko Tempat Usaha Tahunan',
      right: 'Biaya Tetap (Fixed Cost - Nominal tidak berubah berapapun unit terjual)',
    },
    {
      id: 'c-vc1',
      left: 'Biaya Pembelian Bahan Baku Daging & Bumbu',
      right: 'Biaya Variabel (Variable Cost - Nominal berbanding lurus dengan unit produksi)',
    },
    {
      id: 'c-fc2',
      left: 'Gaji Pokok Staf Administrasi Tetap',
      right: 'Biaya Tetap (Fixed Cost - Wajib dibayarkan setiap bulan)',
    },
    {
      id: 'c-vc2',
      left: 'Biaya Kemasan Plastik & Kardus Boks Takeaway',
      right: 'Biaya Variabel (Variable Cost - Bertambah saat pesanan kemasan meningkat)',
    },
  ];

  // 8. Urutan: Langkah Perhitungan Titik Impas (BEP) Usaha
  const q8RawItems = [
    {
      id: 'bep-step-1',
      text:
        variantQ8 === 'A'
          ? '1. Identifikasi dan pisahkan seluruh biaya tetap (Fixed Cost) bulanan usaha'
          : '1. Hitung total biaya operasional tetap yang wajib dibayar per bulan (sewa, listrik minimum)',
    },
    {
      id: 'bep-step-2',
      text:
        variantQ8 === 'A'
          ? '2. Hitung biaya variabel rata-rata per unit produk (bahan baku & kemasan)'
          : '2. Tentukan biaya variabel bahan mentah per satu porsi produk yang dijual',
    },
    {
      id: 'bep-step-3',
      text:
        variantQ8 === 'A'
          ? '3. Hitung margin kontribusi per unit: Harga Jual Unit dikurangi Biaya Variabel Unit'
          : '3. Hitung selisih harga jual dengan biaya variabel per unit (Contribution Margin)',
    },
    {
      id: 'bep-step-4',
      text:
        variantQ8 === 'A'
          ? '4. Bagi total Biaya Tetap dengan Margin Kontribusi untuk menemukan BEP Unit'
          : '4. Bagikan Biaya Tetap Bulanan dengan Margin Kontribusi untuk mengetahui target minimal unit',
    },
  ];

  // 9. Temukan Kesalahan: Praktik Pengelolaan Arus Kas Usaha Mikro
  const q9Lines = [
    { id: 'k1', text: 'Membuat rekening bank khusus atas nama usaha terpisah dari rekening belanja keluarga.', isError: false },
    { id: 'k2', text: 'Mencatat omzet penjualan Rp 50 juta sebagai keuntungan bersih yang boleh langsung dibelanjakan semua.', isError: true, errorReason: 'Omzet bukanlah keuntungan bersih; omzet harus dikurangi HPP dan beban operasional terlebih dahulu' },
    { id: 'k3', text: 'Menetapkan gaji tetap untuk pemilik usaha dan dibayarkan secara terjadwal setiap akhir bulan.', isError: false },
    { id: 'k4', text: 'Menunda pencatatan nota transaksi pembelian bahan sampai akhir tahun sehingga banyak kuitansi hilang.', isError: true, errorReason: 'Nota pembelian wajib dicatat harian/mingguan agar arus kas terkontrol' },
    { id: 'k5', text: 'Memiliki dana cadangan modal kerja minimal untuk 2 bulan operasional usaha.', isError: false },
  ];

  // 10. Hotspot: Indikator Risiko Finansial pada Laporan Arus Kas Bulanan
  const q10Zones = [
    {
      id: 'z1',
      label: 'Arus Kas Operasional Masuk: Penjualan Tunai Konsumen Rp 25.000.000',
      isTarget: false,
      explanation: 'Arus kas masuk dari konsumen riil adalah indikator pendapatan utama yang sehat.',
    },
    {
      id: 'z2',
      label: 'Arus Kas Keluar: Pengeluaran Pribadi Pemilik Mengambil Kas Usaha Rp 15.000.000',
      isTarget: true,
      explanation: 'Prive/penarikan dana pribadi yang melebihi porsi laba menguras modal kerja dan membahayakan kelangsungan usaha!',
    },
    {
      id: 'z3',
      label: 'Arus Kas Keluar: Pembelian Bahan Baku Pokok Rp 8.000.000',
      isTarget: false,
      explanation: 'Pengeluaran bahan baku wajar dan berbanding lurus dengan produksi.',
    },
    {
      id: 'z4',
      label: 'Saldo Kas Akhir: Defisit Rp -2.000.000 (Kas Operasional Minus)',
      isTarget: true,
      explanation: 'Saldo kas operasional negatif menandakan usaha gagal memenuhi kewajiban jangka pendek tanpa suntikan utang!',
    },
  ];

  return [
    {
      id: 'D7-Q-01',
      title: 'Prioritas Alokasi Arus Kas Gaji Masuk (Budgeting 50/30/20)',
      instruction: 'Urutkan prioritas pembagian pos pendapatan saat menerima gaji/penghasilan bulanan:',
      type: 'urutan',
      items: shuffleGuaranteedDifferent(q1RawItems, ['flow-essential', 'flow-debt', 'flow-saving', 'flow-lifestyle'], rng),
      correctOrder: ['flow-essential', 'flow-debt', 'flow-saving', 'flow-lifestyle'],
      explanation: 'Prioritas sehat: Kebutuhan pokok -> Cicilan utang sehat -> Tabungan/dana darurat -> Gaya hidup/rekreasi.',
      conceptReference: 'OJK Panduan Literasi Keuangan',
    },
    {
      id: 'D7-Q-02',
      title: 'Tahapan Validasi & Peluncuran Model Usaha Sederhana',
      instruction: 'Susun urutan tahapan membangun usaha rintisan mikro dari fase ide hingga beroperasi:',
      type: 'urutan',
      items: shuffleGuaranteedDifferent(q2RawItems, ['biz-ide', 'biz-hpp', 'biz-legal', 'biz-launch'], rng),
      correctOrder: ['biz-ide', 'biz-hpp', 'biz-legal', 'biz-launch'],
      explanation: 'Urutan wirausaha teruji: Validasi kebutuhan -> Kalkulasi HPP & BMC -> Legalitas NIB & rekening -> Peluncuran pasar.',
      conceptReference: 'Kemenkop UKM Panduan Wirausaha Mandiri',
    },
    {
      id: 'D7-Q-03',
      title: 'Karakteristik Skema Finansial & Bunga Pinjaman',
      instruction: 'Pasangkan konsep keuangan dengan implikasi riil terhadap arus kas pribadi:',
      type: 'cocokkan',
      pairs: shuffleWithRng(q3Pairs, rng),
      explanation: 'Bunga flat terlihat kecil namun suku bunga efektifnya berlipat ganda, dan dana darurat bertingkat disesuaikan dengan profil risiko tanggungan.',
      conceptReference: 'Standar Perencanaan Keuangan FPSB',
    },
    {
      id: 'D7-Q-04',
      title: 'Pemetaan 9 Blok Business Model Canvas (BMC)',
      instruction: 'Pasangkan komponen blok BMC dengan definisi perannya dalam strategi usaha:',
      type: 'cocokkan',
      pairs: shuffleWithRng(q4Pairs, rng),
      explanation: 'Value Proposition, Customer Segments, Revenue Streams, dan Cost Structure adalah 4 pilar inti penopang BMC.',
      conceptReference: 'Business Model Generation (Osterwalder)',
    },
    {
      id: 'D7-Q-05',
      title: 'Audit Perhitungan HPP & Penetapan Harga Jual UMKM',
      instruction: 'Klik 2 baris pernyataan di bawah yang memuat kekeliruan fatal dalam penentuan harga jual:',
      type: 'temukan-kesalahan',
      contextSnippet: {
        title: 'Lembar Perhitungan HPP Usaha Katering',
        subtitle: 'Divisi Produksi Makanan',
        lines: q5Lines,
      },
      requiredErrorCount: 2,
      explanation: 'Menganggap tenaga kerja keluarga gratis dan salah menggunakan rumus margin vs markup dapat membuat usaha merugi.',
      conceptReference: 'Standar Perhitungan Biaya Produksi UMKM',
    },
    {
      id: 'D7-Q-06',
      title: 'Identifikasi Kebiasaan Finansial Berisiko Tinggi',
      instruction: 'Klik 2 baris perilaku keuangan di bawah yang dapat menjerumuskan individu ke krisis utang:',
      type: 'temukan-kesalahan',
      contextSnippet: {
        title: 'Review Perilaku Belanja & Portofolio Tabungan',
        subtitle: 'Kategori Pengelolaan Keuangan Pribadi',
        lines: q6Lines,
      },
      requiredErrorCount: 2,
      explanation: 'Utang konsumtif berbunga harian tinggi dan alokasi cicilan di atas 30% pendapatan adalah penyebab utama krisis finansial rumah tangga.',
      conceptReference: 'Manajemen Risiko Finansial Pribadi',
    },
    {
      id: 'D7-Q-07',
      title: 'Klasifikasi Biaya Tetap (Fixed Cost) vs Biaya Variabel',
      instruction: 'Pasangkan jenis pengeluaran usaha dengan klasifikasi perilaku biaya yang benar:',
      type: 'cocokkan',
      pairs: shuffleWithRng(q7Pairs, rng),
      explanation: 'Biaya sewa ruko dan gaji tetap adalah biaya tetap, sedangkan bahan baku dan kemasan bertambah sesuai volume penjualan.',
      conceptReference: 'Standar Akuntansi SAK EMKM',
    },
    {
      id: 'D7-Q-08',
      title: 'Tahapan Formula Analisis Titik Impas (BEP)',
      instruction: 'Susun langkah-langkah sistematis menghitung volume Break-Even Point (BEP) usaha mikro:',
      type: 'urutan',
      items: shuffleGuaranteedDifferent(q8RawItems, ['bep-step-1', 'bep-step-2', 'bep-step-3', 'bep-step-4'], rng),
      correctOrder: ['bep-step-1', 'bep-step-2', 'bep-step-3', 'bep-step-4'],
      explanation: 'Langkah BEP: Kumpulkan Biaya Tetap -> Hitung Biaya Variabel per unit -> Hitung Margin Kontribusi (Harga Jual - Biaya Variabel) -> Bagi Biaya Tetap dengan Margin Kontribusi.',
      conceptReference: 'Manajemen Biaya dan Titik Impas Usaha',
    },
    {
      id: 'D7-Q-09',
      title: 'Audit Disiplin Pengelolaan Arus Kas Usaha Mikro',
      instruction: 'Klik 2 baris di bawah yang memuat kebiasaan buruk dalam tata kelola kasir usaha:',
      type: 'temukan-kesalahan',
      contextSnippet: {
        title: 'Catatan Pengelolaan Kas Usaha Kedai Makanan',
        subtitle: 'Audit Operasional Kasir',
        lines: q9Lines,
      },
      requiredErrorCount: 2,
      explanation: 'Menyamakan omzet dengan laba bersih dan menunda pencatatan nota transaksi adalah kesalahan fatal tata kelola usaha kecil.',
      conceptReference: 'Pedoman Pembukuan Sederhana Kemenkop UKM',
    },
    {
      id: 'D7-Q-10',
      title: 'Deteksi Tanda Bahaya pada Laporan Arus Kas Bulanan',
      instruction: 'Klik area pada ringkasan laporan arus kas di bawah yang mengindikasikan kebocoran modal kerja berbahaya:',
      type: 'klik-area',
      previewImageOrBox: {
        title: 'Ringkasan Laporan Arus Kas Bulanan Usaha',
        zones: q10Zones,
      },
      explanation: 'Prive pribadi yang melebihi kapasitas laba dan defisit kas akhir membuktikan ketidakdisiplinan modal kerja yang mengancam kelangsungan bisnis.',
      conceptReference: 'SAK EMKM Laporan Arus Kas',
    },
  ];
}

export const D7_QUIZZES = generateSeededD7Quizzes(4001);
