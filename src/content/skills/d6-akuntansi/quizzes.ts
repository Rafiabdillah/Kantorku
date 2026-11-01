/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D6: Akuntansi & Keuangan Usaha - Seeded Analytical Quizzes Generator
 */

import { AdvancedQuestion } from '../../../components/engines/AdvancedQuizEngine';
import { mulberry32, hashStringToSeed, shuffleWithRng, shuffleGuaranteedDifferent } from '../d12-komunikasi/quizzes';

export function generateSeededD6Quizzes(seedInput: number | string = 3006): AdvancedQuestion[] {
  const seedNum = hashStringToSeed(seedInput);
  const rng = mulberry32(seedNum);

  const variantQ1 = rng() > 0.5 ? 'B' : 'A';
  const variantQ2 = rng() > 0.5 ? 'B' : 'A';
  const variantQ5 = rng() > 0.5 ? 'B' : 'A';
  const variantQ6 = rng() > 0.5 ? 'B' : 'A';
  const variantQ8 = rng() > 0.5 ? 'B' : 'A';
  const variantQ9 = rng() > 0.5 ? 'B' : 'A';

  // 1. Urutan: Tahapan Siklus Akuntansi dari Bukti Transaksi hingga Laporan Keuangan
  const q1RawItems = [
    {
      id: 'step-journal',
      text:
        variantQ1 === 'A'
          ? '1. Analisis Transaksi & Jurnal Umum: Mencatat debit-kredit berdasarkan bukti fisik faktur/kuitansi'
          : '1. Verifikasi Bukti & Penjurnalan: Menganalisis bukti transaksi dan mencatat ke jurnal umum',
    },
    {
      id: 'step-ledger',
      text:
        variantQ1 === 'A'
          ? '2. Posting Buku Besar: Memindahkan saldo jurnal ke masing-masing kartu akun buku besar'
          : '2. Pemindahbukuan (Posting): Mengelompokkan mutasi jurnal ke buku besar 4 kolom',
    },
    {
      id: 'step-trial-balance',
      text:
        variantQ1 === 'A'
          ? '3. Neraca Saldo & Penyesuaian: Memeriksa keseimbangan total debit-kredit dan membuat jurnal penyesuaian'
          : '3. Neraca Saldo & Rekonsiliasi: Menguji kesetaraan debit/kredit dan mencatat penyesuaian akhir periode',
    },
    {
      id: 'step-financial-statements',
      text:
        variantQ1 === 'A'
          ? '4. Laporan Keuangan & Penutupan: Menyusun Laba Rugi, Neraca, dan menutup akun nominal'
          : '4. Pelaporan & Jurnal Penutup: Menerbitkan Laporan Laba Rugi, Posisi Keuangan, dan tutup buku tahunan',
    },
  ];

  // 2. Urutan: Menghitung Harga Pokok Penjualan (HPP) Barang Dagang
  const q2RawItems = [
    {
      id: 'hpp-beginning-inventory',
      text:
        variantQ2 === 'A'
          ? '1. Persediaan Barang Dagang Awal: Mengambil saldo fisik stok barang pada awal bulan'
          : '1. Saldo Stok Awal: Mencatat nilai persediaan awal periode dari neraca lalu',
    },
    {
      id: 'hpp-net-purchases',
      text:
        variantQ2 === 'A'
          ? '2. Tambahkan Pembelian Bersih: (Pembelian kotor + Ongkir masuk - Retur pembelian - Potongan tunai)'
          : '2. Ditambah Pembelian Bersih: Nilai pembelian ditambah ongkos angkut dikurangi diskon',
    },
    {
      id: 'hpp-goods-available',
      text:
        variantQ2 === 'A'
          ? '3. Hitung Barang Tersedia untuk Dijual: Menjumlahkan persediaan awal dengan pembelian bersih'
          : '3. Total Barang Siap Jual: Akumulasi stok awal ditambah seluruh pembelian bersih periode ini',
    },
    {
      id: 'hpp-ending-inventory',
      text:
        variantQ2 === 'A'
          ? '4. Kurangkan Persediaan Barang Akhir: Mengurangi hasil opname fisik stok di gudang pada akhir periode'
          : '4. Dikurangi Stok Akhir: Nilai persediaan tersisa di gudang dikurangkan untuk menghasilkan nilai HPP',
    },
  ];

  // 3. Cocokkan: Pos Rekonsiliasi Bank dengan Perlakuan Penyesuaian
  const q3Pairs = [
    {
      id: 'rb-1',
      left: 'Biaya administrasi bulanan bank sebesar Rp25.000 yang tercetak di rekening koran',
      right: 'Mengurangi saldo kas pembukuan (Kredit Kas di buku perusahaan)',
    },
    {
      id: 'rb-2',
      left: 'Pendapatan jasa giro tabungan bank sebesar Rp150.000 yang ditambahkan bank',
      right: 'Menambah saldo kas pembukuan (Debit Kas di buku perusahaan)',
    },
    {
      id: 'rb-3',
      left: 'Cek pembayaran yang sudah diserahkan ke vendor tapi belum dicairkan (Outstanding Check)',
      right: 'Mengurangi saldo menurut rekening koran bank',
    },
    {
      id: 'rb-4',
      left: 'Setoran kas sore hari yang masuk brankas malam bank (Deposit in Transit)',
      right: 'Menambah saldo menurut rekening koran bank',
    },
  ];

  // 4. Cocokkan: Penggolongan Akun (Chart of Accounts)
  const q4Pairs = [
    {
      id: 'coa-1',
      left: 'Piutang Usaha dari penjualan barang dagang tempo 14 hari',
      right: 'Aset Lancar (Current Assets)',
    },
    {
      id: 'coa-2',
      left: 'Kendaraan operasional toko dan akumulasi penyusutannya',
      right: 'Aset Tetap (Non-Current Assets)',
    },
    {
      id: 'coa-3',
      left: 'Pendapatan diterima di muka atas jasa servis bulan depan',
      right: 'Liabilitas Jangka Pendek (Current Liabilities)',
    },
    {
      id: 'coa-4',
      left: 'Beban pemeliharaan pendingin ruangan (AC) toko',
      right: 'Beban Operasional (Operating Expenses)',
    },
  ];

  // 5. Temukan Kesalahan: Kaidah Debit-Kredit Jurnal Umum
  const q5Lines =
    variantQ5 === 'A'
      ? [
          { id: 'j1', text: 'Membeli perlengkapan kantor tunai Rp1.000.000 dicatat: (Debit) Perlengkapan Rp1.000.000, (Kredit) Kas Rp1.000.000.', isError: false },
          { id: 'j2', text: 'Menerima pelunasan piutang pelanggan Rp3.000.000 dicatat: (Debit) Piutang Usaha Rp3.000.000, (Kredit) Kas Rp3.000.000.', isError: true, errorReason: 'Kaidah terbalik: Kas bertambah di Debit dan Piutang berkurang di Kredit' },
          { id: 'j3', text: 'Membayar beban gaji karyawan Rp5.000.000 dicatat: (Debit) Beban Gaji Rp5.000.000, (Kredit) Kas Rp5.000.000.', isError: false },
          { id: 'j4', text: 'Membeli mesin fotokopi kredit Rp8.000.000 dicatat: (Debit) Kas Rp8.000.000, (Kredit) Utang Usaha Rp8.000.000.', isError: true, errorReason: 'Salah akun: Pembelian mesin kredit menambah Peralatan Mesin (Debit), bukan Kas' },
        ]
      : [
          { id: 'j1', text: 'Menerima setoran modal awal tunai dicatat: (Debit) Kas Rp10.000.000, (Kredit) Modal Pemilik Rp10.000.000.', isError: false },
          { id: 'j2', text: 'Membayar sewa ruko tunai dicatat: (Debit) Kas Rp6.000.000, (Kredit) Beban Sewa Rp6.000.000.', isError: true, errorReason: 'Kaidah terbalik: Pengeluaran sewa mendebit Beban Sewa dan mengkredit Kas' },
          { id: 'j3', text: 'Menjual barang dagangan secara tunai dicatat: (Debit) Kas Rp4.000.000, (Kredit) Pendapatan Penjualan Rp4.000.000.', isError: false },
          { id: 'j4', text: 'Penarikan uang pribadi oleh pemilik (prive) dicatat sebagai penambah Kas di Debit.', isError: true, errorReason: 'Prive mengurangi kas dan mengurangi ekuitas; Kas berada di Kredit' },
        ];

  // 6. Temukan Kesalahan: Format Laporan Laba Rugi UMKM SAK EMKM
  const q6Lines =
    variantQ6 === 'A'
      ? [
          { id: 'lr1', text: 'Pendapatan Penjualan dikurangi Harga Pokok Penjualan (HPP) menghasilkan Laba Kotor.', isError: false },
          { id: 'lr2', text: 'Pengambilan uang prive oleh pemilik toko dimasukkan sebagai komponen Beban Operasional di Laporan Laba Rugi.', isError: true, errorReason: 'Prive bukan beban operasional toko, melainkan penarikan ekuitas di Neraca' },
          { id: 'lr3', text: 'Beban gaji karyawan, beban sewa, dan beban listrik dikurangkan dari Laba Kotor menghasilkan Laba Bersih.', isError: false },
          { id: 'lr4', text: 'Pembayaran cicilan pokok utang bank dimasukkan sebagai beban pengurang pendapatan di Laporan Laba Rugi.', isError: true, errorReason: 'Cicilan pokok utang mengurangi liabilitas di Neraca; hanya beban bunga yang masuk ke Laba Rugi' },
        ]
      : [
          { id: 'lr1', text: 'Penjualan kotor dikurangi retur penjualan dan potongan penjualan menghasilkan Penjualan Bersih.', isError: false },
          { id: 'lr2', text: 'Pembelian laptop kasir dicatat sekaligus sebagai beban operasional bulan ini di Laporan Laba Rugi.', isError: true, errorReason: 'Laptop kasir adalah aset tetap neraca; hanya beban penyusutan periodik yang masuk ke Laba Rugi' },
          { id: 'lr3', text: 'Laba bersih setelah pajak akan ditutup ke akun Saldo Laba pada Laporan Posisi Keuangan.', isError: false },
          { id: 'lr4', text: 'Saldo kas di bank dimasukkan sebagai pos pendapatan lain-lain di Laporan Laba Rugi.', isError: true, errorReason: 'Saldo kas bank adalah aset lancar neraca, bukan pos pendapatan' },
        ];

  // 7. Cocokkan: Persamaan Dasar Akuntansi (A = L + E)
  const q7Pairs = [
    {
      id: 'eq-1',
      left: 'Membeli perlengkapan kantor secara kredit tempo 30 hari senilai Rp2 juta',
      right: 'Aset (Perlengkapan) bertambah Rp2 juta, Liabilitas (Utang) bertambah Rp2 juta',
    },
    {
      id: 'eq-2',
      left: 'Membayar utang usaha kepada pemasok sayur tunai sebesar Rp1,5 juta',
      right: 'Aset (Kas) berkurang Rp1,5 juta, Liabilitas (Utang) berkurang Rp1,5 juta',
    },
    {
      id: 'eq-3',
      left: 'Menerima pendapatan jasa perbaikan tunai sebesar Rp800 ribu',
      right: 'Aset (Kas) bertambah Rp800 ribu, Ekuitas (Pendapatan) bertambah Rp800 ribu',
    },
    {
      id: 'eq-4',
      left: 'Pemilik menyetor tambahan modal uang tunai sebesar Rp5 juta ke kas toko',
      right: 'Aset (Kas) bertambah Rp5 juta, Ekuitas (Modal) bertambah Rp5 juta',
    },
  ];

  // 8. Urutan: Tahapan Penutupan Buku Akhir Periode (Closing Entries)
  const q8RawItems = [
    {
      id: 'cl-1',
      text:
        variantQ8 === 'A'
          ? '1. Tutup Akun Pendapatan: Mendebit seluruh akun pendapatan dan mengkredit Ikhtisar Laba Rugi'
          : '1. Menutup Akun Pendapatan: Memindahkan saldo kredit pendapatan ke akun Ikhtisar Laba Rugi',
    },
    {
      id: 'cl-2',
      text:
        variantQ8 === 'A'
          ? '2. Tutup Akun Beban: Mengkredit seluruh akun beban dan mendebit Ikhtisar Laba Rugi'
          : '2. Menutup Akun Beban: Memindahkan seluruh saldo debit beban operasional ke Ikhtisar Laba Rugi',
    },
    {
      id: 'cl-3',
      text:
        variantQ8 === 'A'
          ? '3. Tutup Saldo Laba/Rugi ke Modal: Memindahkan saldo neto Ikhtisar Laba Rugi ke akun Modal Pemilik'
          : '3. Mentransfer Laba Bersih: Menutup selisih laba bersih ke penambah ekuitas modal pemilik',
    },
    {
      id: 'cl-4',
      text:
        variantQ8 === 'A'
          ? '4. Tutup Akun Prive: Mengkredit akun Prive dan mendebit akun Modal Pemilik'
          : '4. Menutup Prive: Memotong saldo modal pemilik sebesar penarikan pribadi yang dilakukan',
    },
  ];

  // 9. Temukan Kesalahan: Batasan Neraca Saldo (Trial Balance Limitations)
  const q9Lines =
    variantQ9 === 'A'
      ? [
          { id: 'tb1', text: 'Neraca saldo menguji kesamaan matematis antara total kolom debit dan kredit.', isError: false },
          { id: 'tb2', text: 'Jika neraca saldo sudah seimbang, dijamin 100% tidak ada kesalahan transaksi di pembukuan.', isError: true, errorReason: 'Neraca saldo seimbang tidak menjamin bebas kesalahan; transaksi terlewat atau salah akun tetap membuat neraca seimbang' },
          { id: 'tb3', text: 'Kesalahan penjumlahan (footing) pada buku besar akan menyebabkan neraca saldo tidak seimbang.', isError: false },
          { id: 'tb4', text: 'Transaksi yang dicatat dua kali berturut-turut akan langsung membuat neraca saldo timpang.', isError: true, errorReason: 'Transaksi ganda mencatat debit dan kredit ganda sehingga neraca saldo tetap seimbang semu' },
        ]
      : [
          { id: 'tb1', text: 'Penyusunan neraca saldo dilakukan sebelum membuat jurnal penyesuaian akhir periode.', isError: false },
          { id: 'tb2', text: 'Saldo normal akun kas dan perlengkapan berada pada kolom kredit di neraca saldo.', isError: true, errorReason: 'Saldo normal aset (kas dan perlengkapan) selalu berada di kolom Debit' },
          { id: 'tb3', text: 'Jika terjadi ketidakseimbangan selisih angka 9, biasanya terindikasi kesalahan transposisi angka.', isError: false },
          { id: 'tb4', text: 'Neraca saldo otomatis membebaskan wajib pajak dari kewajiban menyimpan bukti fisik faktur.', isError: true, errorReason: 'Bukti fisik faktur dan kuitansi wajib disimpan minimal 5-10 tahun sesuai undang-undang perpajakan' },
        ];

  // 10. Klik Area: Kategori Akun Bersaldo Normal Debit
  const q10Zones = [
    {
      id: 'z-aset-beban',
      label: 'Kelompok Akun Aset & Beban (Saldo Normal: DEBIT)',
      isTarget: true,
      explanation: 'Akun Aset (Kas, Piutang, Persediaan) dan Beban bertambah di sisi Debit dan bersaldo normal Debit.',
    },
    {
      id: 'z-liabilitas',
      label: 'Kelompok Akun Liabilitas / Utang Usaha (Saldo Normal: KREDIT)',
      isTarget: false,
      explanation: 'Liabilitas bertambah di sisi Kredit dan bersaldo normal Kredit.',
    },
    {
      id: 'z-ekuitas',
      label: 'Kelompok Akun Ekuitas / Modal Pemilik (Saldo Normal: KREDIT)',
      isTarget: false,
      explanation: 'Ekuitas bertambah di sisi Kredit dan bersaldo normal Kredit.',
    },
    {
      id: 'z-pendapatan',
      label: 'Kelompok Akun Pendapatan Penjualan (Saldo Normal: KREDIT)',
      isTarget: false,
      explanation: 'Pendapatan bertambah di sisi Kredit dan bersaldo normal Kredit.',
    },
  ];

  return [
    {
      id: 'D6-QZ-01',
      title: 'Tahapan Siklus Akuntansi Perusahaan',
      instruction: 'Urutkan empat tahap utama siklus akuntansi dari bukti transaksi hingga penutupan buku:',
      type: 'urutan',
      items: shuffleGuaranteedDifferent(q1RawItems, ['step-journal', 'step-ledger', 'step-trial-balance', 'step-financial-statements'], rng),
      correctOrder: ['step-journal', 'step-ledger', 'step-trial-balance', 'step-financial-statements'],
      explanation: 'Siklus akuntansi standar: Analisis Bukti & Jurnal -> Posting Buku Besar -> Pengujian Neraca Saldo -> Penerbitan Laporan Keuangan.',
      conceptReference: 'SAK EMKM Siklus Akuntansi',
    },
    {
      id: 'D6-QZ-02',
      title: 'Formula Perhitungan Harga Pokok Penjualan (HPP)',
      instruction: 'Urutkan tahapan perhitungan Harga Pokok Penjualan (HPP) perusahaan dagang:',
      type: 'urutan',
      items: shuffleGuaranteedDifferent(q2RawItems, ['hpp-beginning-inventory', 'hpp-net-purchases', 'hpp-goods-available', 'hpp-ending-inventory'], rng),
      correctOrder: ['hpp-beginning-inventory', 'hpp-net-purchases', 'hpp-goods-available', 'hpp-ending-inventory'],
      explanation: 'Formula HPP: Persediaan Awal -> Tambah Pembelian Bersih -> Barang Tersedia Dijual -> Kurangkan Persediaan Akhir = HPP.',
      conceptReference: 'Perhitungan HPP Perusahaan Dagang',
    },
    {
      id: 'D6-QZ-03',
      title: 'Perlakuan Penyesuaian Rekonsiliasi Bank',
      instruction: 'Pasangkan pos perbedaan mutasi kas dengan perlakuan penyesuaian yang tepat:',
      type: 'cocokkan',
      pairs: shuffleWithRng(q3Pairs, rng),
      explanation: 'Biaya admin bank dan jasa giro disesuaikan di pembukuan perusahaan. Cek beredar dan setoran dalam perjalanan disesuaikan di sisi laporan bank.',
      conceptReference: 'Rekonsiliasi Bank & Pengendalian Kas',
    },
    {
      id: 'D6-QZ-04',
      title: 'Klasifikasi Akun Standar (Chart of Accounts)',
      instruction: 'Pasangkan nama akun operasional dengan kelompok laporan posisi keuangan / laba rugi:',
      type: 'cocokkan',
      pairs: shuffleWithRng(q4Pairs, rng),
      explanation: 'Piutang adalah Aset Lancar. Kendaraan adalah Aset Tetap. Pendapatan diterima di muka adalah Liabilitas. Biaya servis adalah Beban.',
      conceptReference: 'Bagan Akun Standar SAK EMKM',
    },
    {
      id: 'D6-QZ-05',
      title: 'Audit Kaidah Debit-Kredit Jurnal Umum',
      instruction: 'Klik 2 baris ayat jurnal di bawah yang melanggar kaidah debit-kredit persamaan akuntansi:',
      type: 'temukan-kesalahan',
      contextSnippet: {
        title: 'Review Catatan Jurnal Umum Transaksi Operasional Toko',
        subtitle: 'Audit Kepatuhan Pembukuan Berpasangan',
        lines: q5Lines,
      },
      requiredErrorCount: 2,
      explanation: 'Penerimaan kas piutang harus mendebit Kas dan mengkredit Piutang. Pembelian aset kredit menambah akun Peralatan Mesin, bukan Kas.',
      conceptReference: 'Kaidah Debit-Kredit Double Entry',
    },
    {
      id: 'D6-QZ-06',
      title: 'Audit Format Laporan Laba Rugi Berjenjang',
      instruction: 'Klik 2 baris akun di bawah yang keliru diklasifikasikan sebagai beban pada Laporan Laba Rugi:',
      type: 'temukan-kesalahan',
      contextSnippet: {
        title: 'Draft Laporan Laba Rugi Usaha Dagang UMKM',
        subtitle: 'Review Laporan Keuangan SAK EMKM',
        lines: q6Lines,
      },
      requiredErrorCount: 2,
      explanation: 'Prive dan pembayaran pokok utang bank mempengaruhi neraca ekuitas/liabilitas, bukan beban operasional laba rugi.',
      conceptReference: 'Komponen Laporan Laba Rugi SAK EMKM',
    },
    {
      id: 'D6-QZ-07',
      title: 'Dampak Transaksi Terhadap Persamaan Dasar Akuntansi',
      instruction: 'Pasangkan transaksi bisnis dengan dampaknya terhadap persamaan Aset = Liabilitas + Ekuitas:',
      type: 'cocokkan',
      pairs: shuffleWithRng(q7Pairs, rng),
      explanation: 'Setiap transaksi mempertahankan kesetaraan Aset = Liabilitas + Ekuitas secara seimbang.',
      conceptReference: 'Persamaan Fundamental Akuntansi',
    },
    {
      id: 'D6-QZ-08',
      title: 'Tahapan Jurnal Penutup (Closing Entries) Akhir Periode',
      instruction: 'Urutkan tahapan jurnal penutup akun nominal pada proses tutup buku tahunan:',
      type: 'urutan',
      items: shuffleGuaranteedDifferent(q8RawItems, ['cl-1', 'cl-2', 'cl-3', 'cl-4'], rng),
      correctOrder: ['cl-1', 'cl-2', 'cl-3', 'cl-4'],
      explanation: 'Tahap tutup buku: Tutup Pendapatan -> Tutup Beban -> Tutup Saldo Laba/Rugi ke Modal -> Tutup Akun Prive ke Modal.',
      conceptReference: 'Prosedur Tutup Buku Akuntansi',
    },
    {
      id: 'D6-QZ-09',
      title: 'Deteksi Mitos & Kesalahan Pemahaman Neraca Saldo',
      instruction: 'Klik 2 baris pernyataan di bawah yang memuat kesalahpahaman fungsi Neraca Saldo (Trial Balance):',
      type: 'temukan-kesalahan',
      contextSnippet: {
        title: 'Review Pemahaman Teori Neraca Saldo Staf Akuntansi',
        subtitle: 'Pengujian Pengendalian Internal',
        lines: q9Lines,
      },
      requiredErrorCount: 2,
      explanation: 'Keseimbangan neraca saldo tidak menjamin 100% bebas salah karena transaksi terlewat atau dicatat dua kali tetap menghasilkan keseimbangan matematis.',
      conceptReference: 'Keterbatasan Neraca Saldo',
    },
    {
      id: 'D6-QZ-10',
      title: 'Identifikasi Akun Bersaldo Normal di Sisi Debit',
      instruction: 'Klik pada area kuadran kategori akun yang bertambah dan memiliki saldo normal di sisi Debit:',
      type: 'klik-area',
      previewImageOrBox: {
        title: 'Bagan 4 Golongan Akun Pembukuan Akuntansi',
        zones: q10Zones,
      },
      explanation: 'Kelompok akun Aset (Kas, Piutang, Persediaan) dan Beban memiliki saldo normal di sisi Debit.',
      conceptReference: 'Saldo Normal Akun Akuntansi',
    },
  ];
}

export const D6_QUIZZES = generateSeededD6Quizzes(3006);
