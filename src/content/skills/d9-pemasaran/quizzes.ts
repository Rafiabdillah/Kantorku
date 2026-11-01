/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D9: Pemasaran & Penjualan - Seeded Analytical Quizzes Generator
 */

import { AdvancedQuestion } from '../../../components/engines/AdvancedQuizEngine';
import {
  mulberry32,
  hashStringToSeed,
  shuffleWithRng,
  shuffleGuaranteedDifferent,
} from '../d12-komunikasi/quizzes';
import {
  D9_MARKETING_CONSTANTS,
  calculateCAC,
  calculateROAS,
  calculateROI,
  formatRupiah,
} from './constants';

export function generateSeededD9Quizzes(seedInput: number | string = 9009): AdvancedQuestion[] {
  const seedNum = hashStringToSeed(seedInput);
  const rng = mulberry32(seedNum);

  const variantQ1 = rng() > 0.5 ? 'B' : 'A';
  const variantQ3 = rng() > 0.5 ? 'B' : 'A';
  const variantQ5 = rng() > 0.5 ? 'B' : 'A';
  const variantQ7 = rng() > 0.5 ? 'B' : 'A';

  // 1. Urutan: Tahapan Formula Copywriting AIDA
  const q1RawItems = [
    {
      id: 'step-attention',
      text:
        variantQ1 === 'A'
          ? '1. Attention (Atensi): Menarik perhatian audiens dalam 3 detik pertama dengan pertanyaan hook atau statistik mencengangkan.'
          : '1. Attention (Pancing Atensi): Membuka naskah dengan kalimat pembuka tajam yang relevan dengan titik nyeri pembaca.',
    },
    {
      id: 'step-interest',
      text:
        variantQ1 === 'A'
          ? '2. Interest (Minat): Membangkitkan rasa ingin tahu dengan menjelaskan relevansi masalah terhadap situasi pembaca.'
          : '2. Interest (Bangkitkan Minat): Membeberkan fakta dan dampak masalah nyata yang dialami oleh calon pembeli.',
    },
    {
      id: 'step-desire',
      text:
        variantQ1 === 'A'
          ? '3. Desire (Keinginan): Menumbuhkan hasrat memiliki dengan menyajikan bukti manfaat produk, uji klinis/lab, dan testimoni autentik.'
          : '3. Desire (Tumbuhkan Hasrat): Menghadirkan solusi produk spesifik beserta garansi mutu dan ulasan konsumen terverifikasi.',
    },
    {
      id: 'step-action',
      text:
        variantQ1 === 'A'
          ? '4. Action (Aksi): Menyediakan panggilan bertindak (Call to Action / CTA) yang jelas, mudah diakses, dan tanpa distraksi.'
          : '4. Action (Ajakan Bertindak): Mengarahkan calon pembeli langsung ke tombol transaksi dengan instruksi tunggal dan jelas.',
    },
  ];
  const q1CorrectOrder = ['step-attention', 'step-interest', 'step-desire', 'step-action'];
  const q1Items = shuffleGuaranteedDifferent(q1RawItems, q1CorrectOrder, rng);

  // 2. Cocokkan: 4P Bauran Pemasaran & Strategi Eksekusinya
  const q2Pairs = shuffleWithRng(
    [
      {
        id: 'p-product',
        left: 'Product (Produk)',
        right: 'Penyempurnaan formulasi rendah asam dan sertifikasi BPOM kemasan siap seduh (drip bag).',
      },
      {
        id: 'p-price',
        left: 'Price (Harga)',
        right: 'Penetapan harga Rp12.000/sachet berbasis nilai manfaat kesehatan (value-based pricing).',
      },
      {
        id: 'p-place',
        left: 'Place (Distribusi)',
        right: 'Penjualan melalui toko daring resmi, marketplace kurir instan, dan minimarket perkantoran.',
      },
      {
        id: 'p-promotion',
        left: 'Promotion (Promosi)',
        right: 'Kampanye konten edukasi kebiasaan ngopi sehat di media sosial dengan diskon paket mingguan.',
      },
    ],
    rng
  );

  // 3. Temukan Kesalahan: Audit Perhitungan CAC & Anggaran Kampanye
  const cacActual = calculateCAC(
    D9_MARKETING_CONSTANTS.totalMarketingCost,
    D9_MARKETING_CONSTANTS.totalNewCustomersAcquired
  );
  const q3SnippetLines = [
    {
      id: 'line-1',
      text: `Total anggaran pemasaran bulanan terealisasi: ${formatRupiah(D9_MARKETING_CONSTANTS.totalMarketingCost)} (mencakup iklan berbayar, gaji tim kreatif, dan software analitik).`,
      isError: false,
    },
    {
      id: 'line-2',
      text: `Jumlah pembeli baru yang berhasil diakuisisi selama periode kampanye: ${D9_MARKETING_CONSTANTS.totalNewCustomersAcquired} pelanggan.`,
      isError: false,
    },
    {
      id: 'line-3',
      text:
        variantQ3 === 'A'
          ? `Kalkulasi CAC tim media: CAC = ${formatRupiah(D9_MARKETING_CONSTANTS.totalMarketingCost)} / ${D9_MARKETING_CONSTANTS.totalNewCustomersAcquired} = Rp50.000 per pelanggan (salah pembagian).`
          : `Kalkulasi CAC tim media: CAC = ${formatRupiah(D9_MARKETING_CONSTANTS.totalMarketingCost)} / ${D9_MARKETING_CONSTANTS.totalNewCustomersAcquired} = Rp75.000 per pelanggan (salah hitung nominal).`,
      isError: true,
    },
    {
      id: 'line-4',
      text: `Koreksi audit akuntansi pemasaran: Biaya Akuisisi Pelanggan (CAC) yang benar adalah ${formatRupiah(cacActual)} per pelanggan.`,
      isError: false,
    },
  ];

  // 4. Cocokkan: Saluran Pemasaran Digital & Karakteristik Audiens
  const q4Pairs = shuffleWithRng(
    [
      {
        id: 'ch-email',
        left: 'Email Marketing',
        right: 'Kanal retensi dengan ROI tertinggi untuk mengirimkan buletin edukasi dan penawaran loyalitas pelanggan terdaftar.',
      },
      {
        id: 'ch-linkedin',
        left: 'LinkedIn B2B',
        right: 'Kanal profesional untuk membangun kepemimpinan opini (thought leadership) dan penawaran korporat.',
      },
      {
        id: 'ch-tiktok',
        left: 'Short-Form Video (TikTok/Reels)',
        right: 'Kanal penemuan (discovery) berbasis algoritma minat untuk menjangkau audiens baru secara visual cepat.',
      },
      {
        id: 'ch-search',
        left: 'Search Engine Marketing (Google Search)',
        right: 'Kanal penangkapan niat tinggi (high intent) saat konsumen aktif mencari solusi spesifik.',
      },
    ],
    rng
  );

  // 5. Urutan: Tahapan Riset Pasar & Validasi Proposisi Nilai
  const q5RawItems = [
    {
      id: 'step-market-research',
      text:
        variantQ5 === 'A'
          ? '1. Riset Masalah Pasar: Mengumpulkan data keluhan konsumen dan menganalisis lanskap kompetitor aktif.'
          : '1. Eksplorasi Pasar: Mengidentifikasi kesenjangan antara kebutuhan konsumen dan produk yang beredar.',
    },
    {
      id: 'step-persona-definition',
      text:
        variantQ5 === 'A'
          ? '2. Penetapan Buyer Persona: Merinci profil target pembeli, demografi, kebiasaan belanja, dan titik frustrasi.'
          : '2. Pemetaan Persona Pelanggan: Menentukan profil psikografis dan motivasi belanja pembeli ideal.',
    },
    {
      id: 'step-uvp-formulation',
      text:
        variantQ5 === 'A'
          ? '3. Perumusan Proposisi Nilai Unik (UVP): Menyusun janji manfaat produk yang belum ditawarkan oleh kompetitor.'
          : '3. Formulasi Solusi Unik: Menegaskan diferensiasi produk yang menyelesaikan titik nyeri utama pelanggan.',
    },
    {
      id: 'step-mvp-testing',
      text:
        variantQ5 === 'A'
          ? '4. Uji Coba Pasar Terbatas (MVP): Meluncurkan penawaran awal skala kecil untuk mengukur minat beli riil.'
          : '4. Validasi Penjualan Perdana: Menguji respons pasar dengan sampel produk sebelum produksi massal.',
    },
  ];
  const q5CorrectOrder = ['step-market-research', 'step-persona-definition', 'step-uvp-formulation', 'step-mvp-testing'];
  const q5Items = shuffleGuaranteedDifferent(q5RawItems, q5CorrectOrder, rng);

  // 6. Klik Area: Identifikasi Kampanye Iklan dengan ROAS Tertinggi
  const q6Zones = [
    {
      id: 'ad-meta',
      label: `Kanal Meta Ads: Belanja ${formatRupiah(D9_MARKETING_CONSTANTS.adSpend)} | Omzet ${formatRupiah(D9_MARKETING_CONSTANTS.adRevenue)} (ROAS: ${calculateROAS(D9_MARKETING_CONSTANTS.adRevenue, D9_MARKETING_CONSTANTS.adSpend).toFixed(1)}x)`,
      isTarget: true,
      explanation: 'Pilihan ini dijelaskan oleh konteks dan label pada kartu yang ditampilkan.',
    },
    {
      id: 'ad-search',
      label: 'Kanal Google Search: Belanja Rp4.000.000 | Omzet Rp10.000.000 (ROAS: 2.5x)',
      isTarget: false,
      explanation: 'Pilihan ini dijelaskan oleh konteks dan label pada kartu yang ditampilkan.',
    },
    {
      id: 'ad-endorse',
      label: 'Kanal Endorsement Influencer: Biaya Rp6.000.000 | Omzet Rp7.200.000 (ROAS: 1.2x)',
      isTarget: false,
      explanation: 'Pilihan ini dijelaskan oleh konteks dan label pada kartu yang ditampilkan.',
    },
  ];

  // 7. Temukan Kesalahan: Deteksi Pelanggaran Etika Iklan & UU Perlindungan Konsumen
  const q7SnippetLines = [
    {
      id: 'claim-1',
      text: 'Draft Iklan: "Dapatkan paket kopi arabika murni dari petani binaan Garut."',
      isError: false,
    },
    {
      id: 'claim-2',
      text:
        variantQ7 === 'A'
          ? 'Draft Iklan: "DIJAMIN PASTI MENYEMBUHKAN SEGALA PENYAKIT MAAG DAN JANTUNG DALAM 2 HARI TANPA OBAT DOKTER!"'
          : 'Draft Iklan: "SATU-SATUNYA MINUMAN DI DUNIA YANG BISA MENJADIKAN ANDA JUTAWAN OTOMATIS TANPA KERJA!"',
      isError: true,
    },
    {
      id: 'claim-3',
      text: 'Draft Iklan: "Disertai nomor izin edar BPOM RI MD terverifikasi dan panduan takaran seduh aman."',
      isError: false,
    },
    {
      id: 'claim-4',
      text: 'Draft Iklan: "Tersedia opsi pengembalian dana 100% apabila kemasan rusak saat diterima pembeli."',
      isError: false,
    },
  ];

  // 8. Cocokkan: Rumus Metrik Pemasaran Finansial & Definisinya
  const q8Pairs = shuffleWithRng(
    [
      {
        id: 'f-cac',
        left: 'Customer Acquisition Cost (CAC)',
        right: 'Total Biaya Pemasaran / Jumlah Pelanggan Baru Terakuisisi.',
      },
      {
        id: 'f-roas',
        left: 'Return on Ad Spend (ROAS)',
        right: 'Pendapatan Atribusi Iklan / Biaya Belanja Iklan Berbayar.',
      },
      {
        id: 'f-roi',
        left: 'Return on Investment (ROI)',
        right: '((Total Pendapatan Kampanye - Total Biaya) / Total Biaya) * 100%.',
      },
      {
        id: 'f-ltv',
        left: 'Customer Lifetime Value (LTV)',
        right: 'Rata-rata Nilai Transaksi * Frekuensi Belanja Tahunan * Masa Retensi Pelanggan.',
      },
    ],
    rng
  );

  // 9. Urutan: Tahapan Corong Penjualan Digital (Marketing Funnel)
  const q9RawItems = [
    {
      id: 'funnel-awareness',
      text: '1. Awareness (Kesadaran): Calon pembeli pertama kali mengetahui keberadaan merek lewat konten media sosial atau iklan.',
    },
    {
      id: 'funnel-consideration',
      text: '2. Consideration (Pertimbangan): Calon pembeli mengunjungi landing page untuk membandingkan spesifikasi dan ulasan produk.',
    },
    {
      id: 'funnel-conversion',
      text: '3. Conversion (Konversi): Calon pembeli melakukan transaksi pembayaran dan resmi menjadi pelanggan baru.',
    },
    {
      id: 'funnel-loyalty',
      text: '4. Loyalty & Advocacy (Loyalitas): Pelanggan puas melakukan pembelian ulang (repeat order) dan merekomendasikan ke rekan.',
    },
  ];
  const q9CorrectOrder = ['funnel-awareness', 'funnel-consideration', 'funnel-conversion', 'funnel-loyalty'];
  const q9Items = shuffleGuaranteedDifferent(q9RawItems, q9CorrectOrder, rng);

  // 10. Klik Area: Red Flag Diskon Fiktif yang Melanggar UU No. 8/1999
  const q10Zones = [
    {
      id: 'promo-fair',
      label: 'Promo Sah: Diskon 20% dari harga reguler Rp50.000 menjadi Rp40.000 selama pekan gajian.',
      isTarget: false,
      explanation: 'Pilihan ini dijelaskan oleh konteks dan label pada kartu yang ditampilkan.',
    },
    {
      id: 'promo-fake',
      label: 'Red Flag Pelanggaran: Harga asli dinaikkan sepihak dari Rp50.000 jadi Rp100.000 lalu diberi coret "Diskon 50%" jadi Rp50.000.',
      isTarget: true,
      explanation: 'Pilihan ini dijelaskan oleh konteks dan label pada kartu yang ditampilkan.',
    },
    {
      id: 'promo-bundle',
      label: 'Promo Sah: Beli 2 gratis 1 botol sampel dengan syarat dan ketentuan tertulis jelas.',
      isTarget: false,
      explanation: 'Pilihan ini dijelaskan oleh konteks dan label pada kartu yang ditampilkan.',
    },
  ];

  return [
    {
      id: 'D9-QZ-01',
      title: 'Urutan Formula Naskah Iklan AIDA',
      type: 'urutan',
      instruction: 'Susun 4 tahapan penulisan naskah iklan persuasif berbasis formula AIDA secara berurutan:',
      items: q1Items,
      correctOrder: q1CorrectOrder,
      explanation: 'Formula AIDA mengalir dari Attention (Atensi), Interest (Minat), Desire (Keinginan), hingga Action (Ajakan Bertindak).',
    },
    {
      id: 'D9-QZ-02',
      title: 'Integrasi Bauran Pemasaran 4P',
      type: 'cocokkan',
      instruction: 'Pasangkan masing-masing elemen 4P dengan strategi operasional yang tepat:',
      pairs: q2Pairs,
      explanation: 'Bauran 4P menyelaraskan Product (fitur solusi), Price (nilai harga), Place (kemudahan distribusi), dan Promotion (komunikasi persuasif).',
    },
    {
      id: 'D9-QZ-03',
      title: 'Audit Perhitungan CAC Kampanye Bulanan',
      type: 'temukan-kesalahan',
      instruction: 'Identifikasi baris laporan yang memuat kesalahan penghitungan Biaya Akuisisi Pelanggan (CAC):',
      contextSnippet: {
        title: 'Laporan Rekap Biaya Akuisisi Pemasaran',
        lines: q3SnippetLines,
      },
      requiredErrorCount: 1,
      explanation: `CAC dihitung dari total biaya dibagi jumlah pelanggan baru: ${formatRupiah(D9_MARKETING_CONSTANTS.totalMarketingCost)} / ${D9_MARKETING_CONSTANTS.totalNewCustomersAcquired} = ${formatRupiah(cacActual)} per pelanggan.`,
    },
    {
      id: 'D9-QZ-04',
      title: 'Karakteristik Saluran Distribusi Konten Digital',
      type: 'cocokkan',
      instruction: 'Pasangkan saluran pemasaran digital dengan fungsi strategis terbaiknya:',
      pairs: q4Pairs,
      explanation: 'Setiap kanal digital memiliki peran spesifik: Search menangkap kebutuhan aktif, Short Video menjaring audiens baru, dan Email menjaga retensi pelanggan.',
    },
    {
      id: 'D9-QZ-05',
      title: 'Alur Riset Pasar & Proposisi Nilai (UVP)',
      type: 'urutan',
      instruction: 'Urutkan tahapan validasi penawaran produk dari riset hingga uji pasar:',
      items: q5Items,
      correctOrder: q5CorrectOrder,
      explanation: 'Validasi pasar diawali riset masalah konsumen, pemetaan persona ideal, perumusan nilai pembeda (UVP), dan uji coba pasar terbatas (MVP).',
    },
    {
      id: 'D9-QZ-06',
      title: 'Evaluasi Rasio Pengembalian Belanja Iklan (ROAS)',
      type: 'klik-area',
      instruction: 'Klik kartu saluran kampanye yang menghasilkan rasio efisiensi belanja iklan (ROAS) tertinggi:',
      previewImageOrBox: {
        title: 'Dasbor Perbandingan Kinerja Kanal Iklan Digital',
        zones: q6Zones,
      },
      explanation: `Kanal Meta Ads menghasilkan ROAS tertinggi yaitu ${calculateROAS(D9_MARKETING_CONSTANTS.adRevenue, D9_MARKETING_CONSTANTS.adSpend).toFixed(1)}x (pendapatan ${formatRupiah(D9_MARKETING_CONSTANTS.adRevenue)} dari belanja ${formatRupiah(D9_MARKETING_CONSTANTS.adSpend)}).`,
    },
    {
      id: 'D9-QZ-07',
      title: 'Kepatuhan Etika Periklanan & Klaim Berlebihan',
      type: 'temukan-kesalahan',
      instruction: 'Temukan klaim promosi yang melanggar ketentuan hukum perlindungan konsumen dan etika periklanan:',
      contextSnippet: {
        title: 'Pemeriksaan Naskah Iklan Sebelum Publikasi',
        lines: q7SnippetLines,
      },
      requiredErrorCount: 1,
      explanation: 'UU No. 8/1999 Pasal 9 melarang pelaku usaha menawarkan barang secara keliru atau membuat klaim khasiat tanpa dasar pengujian resmi.',
    },
    {
      id: 'D9-QZ-08',
      title: 'Formula Matematis Metrik Pemasaran Finansial',
      type: 'cocokkan',
      instruction: 'Pasangkan istilah metrik pemasaran dengan rumus perhitungannya yang tepat:',
      pairs: q8Pairs,
      explanation: 'Penguasaan formula CAC, ROAS, ROI, dan LTV memastikan setiap keputusan investasi pemasaran dapat dipertanggungjawabkan secara finansial.',
    },
    {
      id: 'D9-QZ-09',
      title: 'Tahapan Corong Penjualan Pelanggan (Funnel)',
      type: 'urutan',
      instruction: 'Urutkan siklus perjalanan pelanggan dari awal mengenal produk hingga advokasi loyalitas:',
      items: q9Items,
      correctOrder: q9CorrectOrder,
      explanation: 'Corong penjualan bergerak dari Awareness (kesadaran), Consideration (pertimbangan), Conversion (pembelian), hingga Loyalty (loyalitas dan advokasi).',
    },
    {
      id: 'D9-QZ-10',
      title: 'Deteksi Klausula Diskon Menyesatkan (Fake Discount)',
      type: 'klik-area',
      instruction: 'Klik skema promosi potongan harga yang melanggar transparansi harga konsumen:',
      previewImageOrBox: {
        title: 'Inspeksi Praktik Penawaran Potongan Harga Toko Daring',
        zones: q10Zones,
      },
      explanation: 'Menaikkan harga normal sebelum memberlakukan diskon adalah praktik manipulasi yang dilarang oleh UU Perlindungan Konsumen dan PP PMSE.',
    },
  ];
}

export const D9_QUIZZES = generateSeededD9Quizzes(9009);
