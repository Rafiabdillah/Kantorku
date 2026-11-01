/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D7: Keuangan Pribadi & Wirausaha - Lessons
 */

export interface D7Lesson {
  id: string;
  domainId: 'D7';
  title: string;
  summary: string;
  estimatedMinutes: number;
  sources: string[];
  disclaimer: string;
  lastReviewed: string;
  workedExample: {
    title: string;
    scenario: string;
    analysis: string;
    bestPractice: string;
  };
  sections: {
    heading: string;
    content: string;
  }[];
}

export const D7_LESSONS: D7Lesson[] = [
  {
    id: 'D7-LES-01',
    domainId: 'D7',
    title: 'Manajemen Keuangan Pribadi: Alokasi Anggaran, Dana Darurat & Cicilan Sehat',
    summary: 'Fondasi kesehatan finansial: proporsi pos pengeluaran, perhitungan dana darurat bertingkat, dan bahaya bunga utang konsumtif.',
    estimatedMinutes: 18,
    sources: [
      'Buku Saku Literasi Keuangan: Perencanaan Keuangan Keluarga (Otoritas Jasa Keuangan - OJK, 2021)',
      'Financial Planning Standards Board (FPSB) Code of Ethics and Professional Responsibility (FPSB Indonesia, 2022)',
    ],
    disclaimer: 'Contoh panduan edukasi finansial mandiri. Bukan nasihat perencanaan keuangan berlisensi atau anjuran produk perbankan.',
    lastReviewed: '2026-10-26',
    workedExample: {
      title: 'Menyusun Alokasi Anggaran Gaji Pertama Rp 4.500.000',
      scenario: 'Karyawan baru menerima gaji Rp 4.500.000 dan menghabiskan 80% untuk belanja gaya hidup sehingga tidak memiliki tabungan darurat.',
      analysis: 'Pengeluaran tanpa pos terencana membuat individu rentan terjebak utang berbunga tinggi saat terjadi musibah sakit atau kerusakan kendaraan.',
      bestPractice: 'Terapkan formula fleksibel 50/30/20: Kebutuhan Pokok 50% (Rp 2.250.000 untuk kos, makan, listrik), Keinginan 30% (Rp 1.350.000 untuk hiburan), dan Tabungan/Investasi/Dana Darurat 20% (Rp 900.000 disisihkan di awal bulan).',
    },
    sections: [
      {
        heading: '1. Metode Alokasi Anggaran Fleksibel',
        content: 'Metode 50/30/20 adalah pedoman awal, bukan aturan kaku mutlak. Bagi yang menanggung anggota keluarga, porsi kebutuhan pokok dapat disesuaikan menjadi 60/20/20. Kunci utamanya adalah menyisihkan tabungan di awal gajian (pay yourself first), bukan menabung sisa akhir bulan.',
      },
      {
        heading: '2. Hirarki Dana Darurat',
        content: 'Dana darurat berfungsi sebagai bantalan finansial: lajang tanpa tanggungan idealnya memiliki 3x pengeluaran bulanan, menikah memiliki 6x pengeluaran, dan wirausaha/pekerja lepas disarankan memiliki 9-12x pengeluaran. Simpan di instrumen likuid dan bebas risiko modal.',
      },
      {
        heading: '3. Rasio Cicilan Sehat (Debt-to-Income Ratio)',
        content: 'Batas total cicilan bulanan yang sehat maksimal adalah 30% dari penghasilan rutin bulanan. Hindari pinjaman konsumtif dengan bunga harian tinggi dan selalu periksa perbandingan suku bunga flat vs efektif.',
      },
    ],
  },
  {
    id: 'D7-LES-02',
    domainId: 'D7',
    title: 'Business Model Canvas (BMC) & Penetapan Harga Jual UMKM',
    summary: 'Merancang model usaha rintisan dengan 9 blok BMC, kalkulasi HPP bahan baku, dan penentuan margin keuntungan realistis.',
    estimatedMinutes: 20,
    sources: [
      'Business Model Generation: A Handbook for Visionaries, Game Changers, and Challengers (Alexander Osterwalder & Yves Pigneur, John Wiley & Sons, 2010)',
      'Panduan Kemudahan, Pelindungan, dan Pemberdayaan Koperasi dan Usaha Mikro, Kecil, dan Menengah (Kementerian Koperasi dan UKM RI, 2021)',
    ],
    disclaimer: 'Materi edukasi dasar kewirausahaan. Simulasi bisnis tidak menjamin keberhasilan pasar atau kepastian keuntungan komersial.',
    lastReviewed: '2026-10-26',
    workedExample: {
      title: 'Penetapan Harga Jual Paket Makanan Katering Rumahan',
      scenario: 'Pemilik usaha membeli bahan baku Rp 15.000 per porsi dan langsung menjual Rp 17.000 tanpa menghitung biaya kemasan, gas, dan tenaga kerja.',
      analysis: 'Mengabaikan biaya operasional dan kemasan menyebabkan ilusi keuntungan (margin semu), yang pada kenyataannya membuat usaha merugi secara kas.',
      bestPractice: 'Kalkulasi HPP Riil: Bahan Rp 15.000 + Kemasan Rp 2.000 + Alokasi Gas & Tenaga Rp 3.000 = Total HPP Rp 20.000. Dengan target margin keuntungan 30%, harga jual yang tepat adalah Rp 20.000 / (1 - 0.3) = Rp 28.500 (dibulatkan Rp 29.000).',
    },
    sections: [
      {
        heading: '1. Sembilan Blok Business Model Canvas (BMC)',
        content: 'BMC memetakan 4 pilar bisnis: Penawaran (Value Proposition), Pelanggan (Customer Segments, Channels, Customer Relationships), Infrastruktur (Key Activities, Key Resources, Key Partners), dan Finansial (Cost Structure, Revenue Streams).',
      },
      {
        heading: '2. Margin vs Markup Keuntungan',
        content: 'Markup adalah persentase kenaikan dari HPP: (Harga Jual - HPP) / HPP. Sedangkan Margin adalah persentase keuntungan dari Harga Jual: (Harga Jual - HPP) / Harga Jual. Margin 50% sama dengan Markup 100%. Jangan menyamakan kedua rumus ini saat menetapkan target kas usaha.',
      },
      {
        heading: '3. Perizinan Usaha Dasar (NIB Berbasis Risiko)',
        content: 'Usaha mikro dan kecil di Indonesia dapat memperoleh Nomor Induk Berusaha (NIB) secara daring melalui sistem resmi pemerintah. NIB berfungsi sebagai legalitas identitas usaha, izin edar dasar, dan akses fasilitas perbankan resmi.',
      },
    ],
  },
  {
    id: 'D7-LES-03',
    domainId: 'D7',
    title: 'Pengendalian Arus Kas Operasional, Analisis Break-Even Point & Legalitas NIB',
    summary: 'Manajemen siklus kas usaha kecil: memisahkan keuangan pribadi, kalkulasi titik impas BEP, dan kepatuhan perizinan dasar.',
    estimatedMinutes: 22,
    sources: [
      'Ikatan Akuntan Indonesia (IAI): Standar Akuntansi Keuangan Entitas Mikro, Kecil, dan Menengah (SAK EMKM, 2016)',
      'Peraturan Pemerintah Nomor 7 Tahun 2021 tentang Kemudahan, Pelindungan, dan Pemberdayaan Koperasi dan UMKM (Sekretariat Negara RI, 2021)',
    ],
    disclaimer: 'Pedoman edukatif pengelolaan arus kas dan perizinan dasar usaha mikro. Tidak menggantikan audit akuntan publik atau konsultasi legal formal.',
    lastReviewed: '2026-10-26',
    workedExample: {
      title: 'Perhitungan Titik Impas (BEP) Kedai Minuman Segar',
      scenario: 'Pemilik kedai menyewa stan Rp 3.000.000/bulan (biaya tetap). Biaya bahan per cup Rp 6.000 (biaya variabel) dan harga jual Rp 16.000/cup. Berapa cup yang harus terjual agar tidak rugi?',
      analysis: 'Margin kontribusi per cup = Rp 16.000 - Rp 6.000 = Rp 10.000. Setiap penjualan menyumbang Rp 10.000 untuk menutup biaya sewa bulanan.',
      bestPractice: 'BEP Unit = Biaya Tetap / (Harga Jual - Biaya Variabel) = Rp 3.000.000 / Rp 10.000 = 300 cup/bulan (rata-rata 10 cup/hari). Penjualan di atas 300 cup adalah laba bersih murni.',
    },
    sections: [
      {
        heading: '1. Disiplin Pemisahan Rekening Usaha dan Pribadi',
        content: 'Kesalahan paling fatal wirausaha mikro adalah mencampuradukkan dompet usaha dan dompet rumah tangga. Tetapkan gaji tetap untuk diri sendiri dan bayarkan dari kas usaha secara terjadwal. Keuntungan usaha ditahan sebagai modal cadangan ekspansi.',
      },
      {
        heading: '2. Rumus Analisis Titik Impas (BEP)',
        content: 'BEP adalah titik di mana total pendapatan persis sama dengan total pengeluaran (laba = nol). Formula BEP Unit = Biaya Tetap / Margin Kontribusi Per Unit. Formula BEP Rupiah = Biaya Tetap / (1 - (Biaya Variabel / Harga Jual)). Mengetahui BEP menghindarkan usaha dari kepanikan target penjualan.',
      },
      {
        heading: '3. Legalitas Identitas Usaha Mikro (NIB)',
        content: 'Berdasarkan PP No. 7 Tahun 2021, UMKM dengan risiko rendah cukup memiliki Nomor Induk Berusaha (NIB) sebagai legalitas tunggal (izin edar dan sertifikasi jaminan produk). NIB melindungi aset pemilik dan mempermudah pembukaan rekening giro bisnis.',
      },
    ],
  },
];
