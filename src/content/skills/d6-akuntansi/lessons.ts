/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D6: Akuntansi & Keuangan Usaha - Lessons
 */

export interface LessonSection {
  title: string;
  content: string;
  keyPoints: string[];
}

export interface D6Lesson {
  id: string;
  domainId: 'D6';
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

export const D6_LESSONS: D6Lesson[] = [
  {
    id: 'D6-LES-01',
    domainId: 'D6',
    title: 'Persamaan Dasar Akuntansi, Kode Akun (COA) & Jurnal Umum',
    summary:
      'Fondasi debit-kredit berprinsip Aset = Liabilitas + Ekuitas, pencatatan transaksi bukti belanja, dan keseimbangan ayat jurnal.',
    estimatedMinutes: 16,
    lastReviewed: '2026-10-29',
    sources: [
      'Ikatan Akuntan Indonesia (IAI): Standar Akuntansi Keuangan Entitas Mikro, Kecil, dan Menengah (SAK EMKM, 2016)',
      'Weygandt, J. J., Kimmel, P. D., & Kieso, D. E. (2018). Accounting Principles (John Wiley & Sons, 13th ed.)',
    ],
    disclaimer:
      'Materi simulasi pembukuan dan akuntansi edukatif berstandar SAK EMKM. Bukan nasihat audit perpajakan resmi.',
    workedExample: {
      bad: 'Catatan kas toko hanya ditulis satu sisi di buku catatan kasir: "Keluar uang Rp5.000.000 untuk beli laptop kasir" tanpa mencatat bahwa toko kini memiliki aset tetap laptop dan saldo kas di bank berkurang.',
      good: 'Pencatatan Jurnal Umum Berpasangan (Double-Entry):\nTanggal: 10 Oktober 2026\n• (Debit) Peralatan Kantor (Aset Tetap): Rp5.000.000\n• (Kredit) Kas di Bank (Aset Lancar): Rp5.000.000\nKeterangan: Pembelian 1 unit laptop kasir toko secara transfer bank.',
      explanation:
        'Contoh yang baik menjaga keseimbangan persamaan dasar akuntansi. Total aset tidak berubah (satu aset bertambah, satu aset berkurang), dan saldo kas bank tersinkronisasi sempurna.',
    },
    sections: [
      {
        title: '1. Persamaan Dasar Akuntansi & Logika Debit-Kredit',
        content:
          'Persamaan dasar akuntansi menyatakan bahwa seluruh kekayaan yang dimiliki entitas (Aset) didanai oleh dua sumber: pinjaman dari pihak luar (Liabilitas) dan modal dari pemilik (Ekuitas). Rumus: ASET = LIABILITAS + EKUITAS. Kaidah debit-kredit: Akun Aset dan Beban bertambah di sisi Debit dan berkurang di sisi Kredit. Sebaliknya, akun Liabilitas, Ekuitas, dan Pendapatan bertambah di sisi Kredit dan berkurang di sisi Debit.',
        keyPoints: [
          'Setiap satu transaksi bisnis minimal melibatkan dua akun pembukuan (double-entry).',
          'Jumlah total nominal di kolom Debit wajib sama persis dengan total nominal di kolom Kredit.',
          'Bagan Akun (Chart of Accounts / COA) mengelompokkan kode angka: 1-Aset, 2-Liabilitas, 3-Ekuitas, 4-Pendapatan, 5-Beban.',
        ],
      },
      {
        title: '2. Analisis Bukti Transaksi Sebelum Entri Jurnal',
        content:
          'Sebelum menulis jurnal, lakukan audit bukti transaksi: periksa keaslian faktur, tanggal transaksi, nama penjual/pembeli, stempel lunas atau tanda tangan otorisasi, serta kebenaran nominal fisik. Pembelian kredit dicatat sebagai Utang Usaha (Kredit), sedangkan penjualan belum dibayar dicatat sebagai Piutang Usaha (Debit).',
        keyPoints: [
          'Jangan pernah mencatat transaksi tanpa didukung bukti fisik atau digital yang sah.',
          'Kuitansi adalah bukti penerimaan uang; Faktur adalah bukti penjualan/pembelian barang.',
          'Catat keterangan singkat di bawah ayat jurnal untuk memudahkan audit jejak dokumen di kemudian hari.',
        ],
      },
    ],
  },
  {
    id: 'D6-LES-02',
    domainId: 'D6',
    title: 'Posting Buku Besar, Neraca Saldo & Rekonsiliasi Bank',
    summary:
      'Pemindahan ayat jurnal ke buku besar 4 kolom, pengecekan keseimbangan neraca saldo, dan identifikasi selisih mutasi bank.',
    estimatedMinutes: 18,
    lastReviewed: '2026-10-29',
    sources: [
      'Ikatan Akuntan Indonesia: Standar Akuntansi Keuangan Entitas Tanpa Akuntabilitas Publik (SAK ETAP, 2021)',
      'Weygandt, J. J., Kimmel, P. D., & Kieso, D. E. (2018). Accounting Principles: Chapter 8 Internal Control and Cash (Wiley)',
    ],
    disclaimer:
      'Praktik pengendalian kas internal dan rekonsiliasi perbankan untuk tata kelola keuangan kantor.',
    workedExample: {
      bad: 'Saldo kas di pembukuan toko menunjukkan Rp50.000.000, sedangkan rekening koran bank tercetak Rp46.500.000. Admin langsung mengubah saldo pembukuan menjadi Rp46.500.000 tanpa mencari tahu penyebab selisih Rp3.500.000.',
      good: 'Melakukan Rekonsiliasi Bank:\n1. Sisi Pembukuan Perusahaan: Saldo kas buku Rp50.000.000 dikurangi Biaya Administrasi Bank Rp50.000 = Rp49.950.000 (dibuatkan Jurnal Penyesuaian: Debit Beban Administrasi Bank Rp50.000, Kredit Kas Rp50.000).\n2. Sisi Rekening Koran Bank: Saldo rekening koran bank Rp46.500.000 ditambah Setoran dalam Perjalanan (Deposit in Transit) Rp3.450.000 = Rp49.950.000.\n3. Saldo Kas Disesuaikan: Kedua sisi seimbang sempurna pada angka Rp49.950.000.',
      explanation:
        'Rekonsiliasi bank yang benar membuktikan kesetaraan kedua sisi: Sisi Bank (46.500.000 + 3.450.000 = 49.950.000) sama dengan Sisi Buku (50.000.000 - 50.000 = 49.950.000) dan menertibkan ayat jurnal penyesuaian resmi.',
    },
    sections: [
      {
        title: '1. Posting ke Buku Besar & Penyusunan Neraca Saldo',
        content:
          'Buku besar (General Ledger) mengumpulkan seluruh riwayat mutasi per masing-masing akun akun. Format buku besar 4 kolom menampilkan Tanggal, Keterangan, Debit, Kredit, serta Saldo Berjalan (Debit atau Kredit). Pada akhir periode, saldo akhir seluruh buku besar dipindahkan ke Neraca Saldo (Trial Balance) untuk memastikan total Debit sama dengan total Kredit.',
        keyPoints: [
          'Keseimbangan neraca saldo adalah prasyarat mutlak sebelum menyusun laporan keuangan.',
          'Bila neraca saldo tidak seimbang, periksa kesalahan penjumlahan (footing) atau kesalahan posting sisi debit/kredit.',
          'Namun neraca saldo yang seimbang belum tentu bebas salah (bisa terjadi transaksi terlewat atau salah akun).',
        ],
      },
      {
        title: '2. Prosedur Rekonsiliasi Bank & Ayat Jurnal Penyesuaian',
        content:
          'Rekonsiliasi bank membandingkan saldo kas menurut catatan pembukuan perusahaan dengan saldo kas menurut rekening koran dari bank. Perbedaan biasanya timbul karena perbedaan waktu pencatatan: Setoran dalam perjalanan (Deposit in Transit), Cek yang masih beredar (Outstanding Checks), Biaya administrasi bank, atau Pendapatan jasa giro.',
        keyPoints: [
          'Pos yang mempengaruhi pembukuan (biaya admin, pendapatan bunga) wajib dibuatkan Jurnal Penyesuaian.',
          'Pos yang mempengaruhi bank (cek beredar, setoran dalam perjalanan) tidak memerlukan jurnal pembukuan baru.',
          'Lakukan rekonsiliasi bank minimal satu kali setiap akhir bulan untuk mendeteksi potensi fraud sedini mungkin.',
        ],
      },
    ],
  },
  {
    id: 'D6-LES-03',
    domainId: 'D6',
    title: 'Laporan Laba Rugi, Perhitungan HPP & Laporan Posisi Keuangan',
    summary:
      'Perhitungan Harga Pokok Penjualan (HPP) barang dagang, margin laba kotor, laporan laba rugi berjenjang, dan neraca akhir periode SAK EMKM.',
    estimatedMinutes: 20,
    lastReviewed: '2026-10-29',
    sources: [
      'Ikatan Akuntan Indonesia (IAI): Standar Akuntansi Keuangan Entitas Mikro, Kecil, dan Menengah (SAK EMKM Bab 3, 2016)',
      'Undang-Undang Republik Indonesia No. 7 Tahun 2021 tentang Harmonisasi Peraturan Perpajakan (UU HPP, 2021)',
    ],
    disclaimer:
      'Panduan penyusunan laporan keuangan UMKM sesuai regulasi standar akuntansi keuangan Indonesia.',
    workedExample: {
      bad: 'Pemilik usaha menganggap seluruh uang yang masuk ke rekening penjualan (omzet Rp100.000.000) adalah keuntungan bersih yang boleh langsung ditarik habis untuk keperluan belanja pribadi.',
      good: 'Menyusun Laporan Laba Rugi Berjenjang:\n1. Pendapatan Penjualan: Rp100.000.000\n2. Harga Pokok Penjualan (HPP):\n   • Persediaan Awal: Rp20.000.000\n   • Pembelian Bersih: Rp55.000.000\n   • Barang Tersedia Dijual: Rp75.000.000\n   • Persediaan Akhir: (Rp15.000.000)\n   -> Total HPP: Rp60.000.000\n3. Laba Kotor: Rp100.000.000 - Rp60.000.000 = Rp40.000.000 (Margin Kotor 40%)\n4. Beban Operasional: Gaji Staf (Rp18.000.000) + Sewa Toko (Rp5.000.000) + Listrik/Internet (Rp2.000.000) = Rp25.000.000\n5. Laba Bersih Operasional Sebelum Pajak: Rp15.000.000',
      explanation:
        'Contoh yang baik memisahkan dengan tegas antara omzet kotor, modal barang terjual (HPP), biaya operasional, dan laba riil yang sesungguhnya dihasilkan bisnis.',
    },
    sections: [
      {
        title: '1. Rumus Standar Harga Pokok Penjualan (HPP)',
        content:
          'HPP mencerminkan total biaya langsung yang dikeluarkan untuk memproduksi atau membeli barang yang berhasil terjual dalam periode berjalan. Rumus standar perusahaan dagang: HPP = Persediaan Barang Awal + Pembelian Bersih (Pembelian + Ongkir Pembelian - Retur Pembelian - Potongan Pembelian) - Persediaan Barang Akhir.',
        keyPoints: [
          'Biaya pengiriman barang masuk (freight-in) menambah harga pokok perolehan persediaan.',
          'Barang yang masih tersisa di gudang pada akhir bulan (persediaan akhir) tidak boleh dihitung sebagai beban HPP periode ini.',
          'Margin Laba Kotor = (Laba Kotor / Pendapatan Penjualan) x 100%.',
        ],
      },
      {
        title: '2. Tiga Komponen Laporan Keuangan SAK EMKM',
        content:
          'Berdasarkan SAK EMKM, laporan keuangan entitas mikro dan kecil terdiri dari minimal 3 laporan: (1) Laporan Laba Rugi (mencatat kinerja pendapatan dan beban), (2) Laporan Posisi Keuangan atau Neraca (mencatat aset, kewajiban, dan ekuitas pada tanggal tertentu), dan (3) Catatan atas Laporan Keuangan (penjelasan kebijakan akuntansi dan mutasi kas).',
        keyPoints: [
          'Aset Lancar adalah kas atau piutang yang habis berputar dalam siklus operasi satu tahun.',
          'Aset Tetap (kendaraan, komputer) disajikan sebesar nilai perolehan dikurangi akumulasi penyusutan.',
          'Laba bersih dari laporan laba rugi akan ditutup ke akun Laba Ditahan di bagian Ekuitas pada Neraca.',
        ],
      },
    ],
  },
];
