/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D9: Pemasaran & Penjualan - Lessons
 */

import {
  D9_MARKETING_CONSTANTS,
  calculateCAC,
  calculateROAS,
  calculateROI,
  calculateLTV,
  formatRupiah,
} from './constants';

export interface LessonSection {
  title: string;
  content: string;
  keyPoints: string[];
}

export interface D9Lesson {
  id: string;
  domainId: 'D9';
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

export const D9_LESSONS: D9Lesson[] = [
  {
    id: 'D9-LES-01',
    domainId: 'D9',
    title: 'Segmentasi Pasar, Buyer Persona & Bauran Pemasaran (4P)',
    summary:
      'Teknik memetakan profil konsumen spesifik, memahami titik nyeri (pain points), dan menyelaraskan produk, harga, saluran distribusi, serta promosi.',
    estimatedMinutes: 18,
    lastReviewed: '2026-10-31',
    sources: [
      'Kotler, P., & Armstrong, G. (2021). Principles of Marketing (Pearson, 18th ed.)',
      'UU No. 8 Tahun 1999 tentang Perlindungan Konsumen',
    ],
    disclaimer:
      'Materi strategi pemasaran disajikan untuk tujuan edukasi bisnis dan pemahaman etika periklanan sesuai regulasi perlindungan konsumen.',
    workedExample: {
      bad: 'Target pasar kita adalah semua orang usia 15-60 tahun di seluruh Indonesia yang suka kopi. Pesan promosi: "Kopi terenak di dunia, beli sekarang pasti kaya raya!"',
      good: 'Buyer Persona: "Rian (28 tahun), pekerja kantoran Jakarta yang butuh kopi arabika single origin rendah asam untuk lambung sensitif saat lembur". Proposisi nilai: Kopi terverifikasi uji lab, kemasan siap seduh (drip bag), harga Rp12.000/sachet, didistribusikan via marketplace dan toko kopi rekanan.',
      explanation:
        'Target audiens yang terlalu luas ("semua orang") menghamburkan anggaran iklan. Persona spesifik memungkinkan perancangan bauran produk (Product), harga (Price), distribusi (Place), dan promosi (Promotion) yang tepat sasaran dan beretika.',
    },
    sections: [
      {
        title: '1. Segmentasi Pasar (STP: Segmenting, Targeting, Positioning)',
        content:
          'Segmentasi membagi pasar menjadi kelompok homogen berdasarkan geografis, demografis, psikografis, atau perilaku. Dari segmen tersebut, bisnis memilih target spesifik dan menancapkan keunggulan unik (positioning) di benak konsumen.',
        keyPoints: [
          'Hindari anggapan bahwa semua orang adalah target pembeli.',
          'Identifikasi pemicu beli utama: kebutuhan fungsi, efisiensi waktu, atau status sosial.',
          'Positioning harus didukung oleh bukti keunggulan produk nyata.',
        ],
      },
      {
        title: '2. Mengonstruksi Buyer Persona yang Realistis',
        content:
          'Buyer Persona adalah representasi semi-fiktif dari pelanggan ideal yang dibangun berdasarkan data wawancara dan riset pasar. Komponen utama mencakup: demografi, tujuan harian, rintangan terbesar (frustrations), dan saluran media yang sering diakses.',
        keyPoints: [
          'Fokus pada motivasi psikologis di balik keputusan transaksi.',
          'Pahami media konsumsi informasi target (apakah LinkedIn, Instagram, atau WhatsApp).',
          'Perbarui persona secara berkala saat profil pelanggan berkembang.',
        ],
      },
      {
        title: '3. Harmonisasi Bauran Pemasaran 4P',
        content:
          'Keempat elemen 4P (Product, Price, Place, Promotion) harus saling mendukung. Produk berkualitas tinggi dengan harga premium akan gagal jika didistribusikan di saluran yang salah atau dipromosikan dengan gaya obral murahan.',
        keyPoints: [
          'Product: Solusi atas masalah nyata pelanggan.',
          'Price: Mencerminkan nilai yang dipersepsikan (perceived value) dan menutup HPP.',
          'Place: Kemudahan akses pembeli terhadap stok produk.',
          'Promotion: Komunikasi persuasif yang jujur dan konsisten.',
        ],
      },
    ],
  },
  {
    id: 'D9-LES-02',
    domainId: 'D9',
    title: 'Copywriting Persuasif AIDA & Etika Promosi Digital',
    summary:
      'Menyusun naskah penjualan menggunakan formula Attention, Interest, Desire, Action tanpa klaim palsu atau melanggar UU Perlindungan Konsumen.',
    estimatedMinutes: 16,
    lastReviewed: '2026-10-31',
    sources: [
      'Chaffey, D., & Ellis-Chadwick, F. (2019). Digital Marketing: Strategy, Implementation and Practice (Pearson, 7th ed.)',
      'PP No. 80 Tahun 2019 tentang Perdagangan Melalui Sistem Elektronik (PMSE)',
    ],
    disclaimer:
      'Praktik copywriting wajib mematuhi standar kebenaran klaim dan transparansi harga sesuai regulasi perdagangan elektronik.',
    workedExample: {
      bad: 'RAHASIA BESAR! Minum teh ini berat badan turun 15 kg dalam 3 hari! Garansi dokter dunia tanpa olahraga! Klik link sekarang atau hidupmu merana!',
      good: 'Sering merasa begah dan mengantuk setelah makan siang? Teh chamomile murni dari perkebunan lokal Jawa Barat dengan sertifikasi BPOM membantu rileksasi pencernaanmu secara alami. Dapatkan diskon 15% untuk pembelian paket mingguan di tautan berikut.',
      explanation:
        'Klaim medis berlebihan dan umpan ketakutan tanpa dasar melanggar etika periklanan dan UU No. 8/1999 Pasal 9-10. Copywriting persuasif yang profesional menyentuh masalah riil konsumen dengan solusi terbukti dan ajakan bertindak (CTA) yang jelas.',
    },
    sections: [
      {
        title: '1. Formula Klasik AIDA dalam Iklan Digital',
        content:
          'Formula AIDA memandu pembaca dari rasa ingin tahu hingga transaksi: Attention (menarik atensi dengan hook kuat), Interest (membangkitkan minat dengan fakta relevan), Desire (menumbuhkan keinginan dengan bukti manfaat), dan Action (instruksi jelas untuk membeli/mendaftar).',
        keyPoints: [
          'Attention: Kalimat pembuka 3 detik pertama sangat menentukan.',
          'Interest: Jelaskan relevansi masalah bagi kehidupan pembaca.',
          'Desire: Tampilkan keunggulan spesifik dan ulasan pembeli sebelumnya.',
          'Action: Berikan call-to-action (CTA) tunggal tanpa distraksi.',
        ],
      },
      {
        title: '2. Kalender Konten & Distribusi Terencana',
        content:
          'Akun bisnis yang hanya memposting materi jualan langsung akan ditinggalkan audiens. Gunakan rasio seimbang (misal: 60% edukasi & wawasan, 20% interaksi/hiburan, 20% penawaran promosi langsung) dan jadwalkan dalam kalender editorial mingguan.',
        keyPoints: [
          'Konsistensi jadwal posting membangun algoritma dan loyalitas audiens.',
          'Variasikan format konten: gambar karusel, video pendek, dan teks narasi.',
          'Pantau metrik interaksi (shares, saves, komentar) sebagai indikator resonansi pesan.',
        ],
      },
      {
        title: '3. Kepatuhan Hukum Periklanan & Perlindungan Konsumen',
        content:
          'Berdasarkan UU No. 8/1999 dan PP No. 80/2019, pelaku usaha dilarang menawarkan barang/jasa secara tidak benar, memanipulasi potongan harga fiktif, atau menyembunyikan syarat ketentuan esensial produk.',
        keyPoints: [
          'Diskon harus dihitung dari harga normal yang sah, bukan harga yang dinaikkan sebelum promosi.',
          'Cantumkan garansi, masa kedaluwarsa, dan kebijakan retur secara jelas.',
          'Lindungi privasi data nomor kontak pembeli agar tidak disalahgunakan.',
        ],
      },
    ],
  },
  {
    id: 'D9-LES-03',
    domainId: 'D9',
    title: 'Analisis Metrik Akuisisi & Pengembalian Pemasaran (CAC, ROAS, ROI)',
    summary:
      'Pengukuran efisiensi investasi promosi berbasis data: menghitung CAC, rasio LTV/CAC, ROAS iklan berbayar, dan ROI kampanye menyeluruh.',
    estimatedMinutes: 20,
    lastReviewed: '2026-10-31',
    sources: [
      'Kotler, P., & Armstrong, G. (2021). Principles of Marketing (Pearson, 18th ed.)',
      'Chaffey, D., & Ellis-Chadwick, F. (2019). Digital Marketing: Strategy, Implementation and Practice (Pearson, 7th ed.)',
    ],
    disclaimer:
      'Perhitungan metrik pemasaran disajikan untuk analisis efisiensi keuangan kampanye dan pengambilan keputusan operasional.',
    workedExample: {
      bad: `Kampanye iklan digital kita sangat sukses karena menghasilkan 100.000 impresi dan 5.000 likes di media sosial, meskipun kita menghabiskan biaya ${formatRupiah(D9_MARKETING_CONSTANTS.totalMarketingCost)} dan tidak tahu berapa omzet penjualan yang didapatkan.`,
      good: `Evaluasi kampanye: Total biaya pemasaran ${formatRupiah(D9_MARKETING_CONSTANTS.totalMarketingCost)} berhasil mengakuisisi ${D9_MARKETING_CONSTANTS.totalNewCustomersAcquired} pelanggan baru, sehingga CAC = ${formatRupiah(calculateCAC(D9_MARKETING_CONSTANTS.totalMarketingCost, D9_MARKETING_CONSTANTS.totalNewCustomersAcquired))}. Pada kanal iklan berbayar, belanja iklan ${formatRupiah(D9_MARKETING_CONSTANTS.adSpend)} menghasilkan omzet ${formatRupiah(D9_MARKETING_CONSTANTS.adRevenue)}, sehingga ROAS = ${calculateROAS(D9_MARKETING_CONSTANTS.adRevenue, D9_MARKETING_CONSTANTS.adSpend).toFixed(1)}x. Total pendapatan kampanye ${formatRupiah(D9_MARKETING_CONSTANTS.totalCampaignRevenue)} menghasilkan ROI = ${calculateROI(D9_MARKETING_CONSTANTS.totalCampaignRevenue, D9_MARKETING_CONSTANTS.totalMarketingCost).toFixed(0)}%.`,
      explanation: `Metrik vanity seperti impresi dan likes tidak mencerminkan kesehatan bisnis. Efisiensi pemasaran diukur melalui kemampuan menghasilkan transaksi riil: CAC sebesar ${formatRupiah(calculateCAC(D9_MARKETING_CONSTANTS.totalMarketingCost, D9_MARKETING_CONSTANTS.totalNewCustomersAcquired))} sangat efisien dibandingkan estimasi LTV pelanggan sebesar ${formatRupiah(calculateLTV(D9_MARKETING_CONSTANTS.averageOrderValue, D9_MARKETING_CONSTANTS.annualPurchaseFrequency, D9_MARKETING_CONSTANTS.expectedTenureYears))} (rasio 12x), dan ROAS sebesar ${calculateROAS(D9_MARKETING_CONSTANTS.adRevenue, D9_MARKETING_CONSTANTS.adSpend).toFixed(1)}x membuktikan kanal iklan digital beroperasi sangat menguntungkan.`,
    },
    sections: [
      {
        title: '1. Biaya Akuisisi Pelanggan (Customer Acquisition Cost / CAC)',
        content: `CAC dihitung dengan membagi seluruh biaya pemasaran (gaji staf pemasaran, biaya software, produksi konten, dan belanja iklan) dengan total jumlah pelanggan baru yang didapat dalam periode tersebut: CAC = Total Biaya Pemasaran / Jumlah Pelanggan Baru. Contoh: ${formatRupiah(D9_MARKETING_CONSTANTS.totalMarketingCost)} / ${D9_MARKETING_CONSTANTS.totalNewCustomersAcquired} pelanggan = ${formatRupiah(calculateCAC(D9_MARKETING_CONSTANTS.totalMarketingCost, D9_MARKETING_CONSTANTS.totalNewCustomersAcquired))} per pelanggan.`,
        keyPoints: [
          'Sertakan seluruh komponen biaya riil, bukan hanya biaya iklan berbayar.',
          'Turunkan CAC dengan meningkatkan rasio konversi pada landing page.',
          'Bandingkan CAC dengan LTV: rasio LTV/CAC minimal 3:1 untuk model bisnis yang sehat.',
        ],
      },
      {
        title: '2. Return on Ad Spend (ROAS) pada Iklan Digital',
        content: `ROAS mengukur efektivitas belanja iklan spesifik pada platform tertentu: ROAS = Pendapatan dari Iklan / Belanja Iklan. Jika belanja iklan ${formatRupiah(D9_MARKETING_CONSTANTS.adSpend)} mendatangkan omzet ${formatRupiah(D9_MARKETING_CONSTANTS.adRevenue)}, maka ROAS adalah ${calculateROAS(D9_MARKETING_CONSTANTS.adRevenue, D9_MARKETING_CONSTANTS.adSpend).toFixed(1)}x atau 500%.`,
        keyPoints: [
          'ROAS > 1x berarti omzet kotor melampaui biaya iklan, namun belum tentu menutup HPP produk.',
          'Tentukan target Break-Even ROAS berdasarkan marjin laba kotor bisnis.',
          'Lakukan uji coba A/B testing pada materi visual dan teks iklan untuk meningkatkan ROAS.',
        ],
      },
      {
        title: '3. Return on Investment (ROI) Pemasaran Menyeluruh',
        content: `ROI pemasaran mengukur laba bersih dari total pengeluaran pemasaran: ROI = ((Pendapatan - Total Biaya) / Total Biaya) * 100%. Dengan pendapatan ${formatRupiah(D9_MARKETING_CONSTANTS.totalCampaignRevenue)} dan biaya ${formatRupiah(D9_MARKETING_CONSTANTS.totalMarketingCost)}, laba bersih adalah ${formatRupiah(D9_MARKETING_CONSTANTS.totalCampaignRevenue - D9_MARKETING_CONSTANTS.totalMarketingCost)}, menghasilkan ROI = ${calculateROI(D9_MARKETING_CONSTANTS.totalCampaignRevenue, D9_MARKETING_CONSTANTS.totalMarketingCost).toFixed(0)}%.`,
        keyPoints: [
          'ROI positif membuktikan kampanye menambah nilai bersih bagi keuangan perusahaan.',
          'Gunakan atribusi multi-saluran untuk memahami kontribusi setiap titik kontak promosi.',
          'Hentikan kampanye dengan ROI negatif berkepanjangan setelah fase optimasi.',
        ],
      },
    ],
  },
];
