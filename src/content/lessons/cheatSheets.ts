/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu v2.0 - Lembar Contekan (Cheat Sheets)
 * Format ringkas yang siap cetak dan diunduh ke PDF.
 */

import { CheatSheet } from '../../features/learning/types';

export const CHEAT_SHEETS: CheatSheet[] = [
  {
    id: 'sheet-excel-essential',
    title: 'Lembar Contekan: Rumus & Pintasan Esensial Excel Kantor',
    subtitle: 'Standar Cepat Olah Angka & Administrasi Bisnis PT Maju Sejahtera',
    track: 'excel',
    sections: [
      {
        heading: '1. Pintasan Papan Ketik (Keyboard Shortcuts)',
        items: [
          { label: 'Kunci Sel Absolut', codeOrShortcut: 'F4', description: 'Mengubah A1 menjadi $A$1 atau $A1 / A$1 secara instan.', tip: 'Gunakan saat mengunci tarif pajak atau tabel master.' },
          { label: 'Format Rupiah Cepat', codeOrShortcut: 'Ctrl + Shift + $', description: 'Menerapkan format mata uang standar dengan pemisah ribuan.' },
          { label: 'AutoSum Kilat', codeOrShortcut: 'Alt + =', description: 'Membuat rumus =SUM(...) otomatis untuk baris atau kolom aktif.' },
          { label: 'Buka Pencarian / Ganti', codeOrShortcut: 'Ctrl + H', description: 'Cari data salah dan ganti serentak (Find & Replace).' },
        ],
      },
      {
        heading: '2. Rumus Olah Data Utama',
        items: [
          { label: 'Penjumlahan Total', codeOrShortcut: '=SUM(rentang)', description: 'Contoh: =SUM(B2:B20) untuk menghitung total penjualan bulanan.' },
          { label: 'Uji Logika Bersyarat', codeOrShortcut: '=IF(kondisi; nilai_benar; nilai_salah)', description: 'Contoh: =IF(C2>=75; "LULUS"; "REMEDIAL").' },
          { label: 'Cari Data Vertikal', codeOrShortcut: '=VLOOKUP(kunci; tabel; no_kolom; FALSE)', description: 'Contoh: =VLOOKUP(A2; $G$2:$I$50; 2; FALSE). Kunci sel master dengan $!' },
          { label: 'Hitung Kemunculan Data', codeOrShortcut: '=COUNTIF(rentang; kriteria)', description: 'Contoh: =COUNTIF(D2:D50; "Lunas") untuk menghitung faktur selesai.' },
          { label: 'Hitung Rata-Rata', codeOrShortcut: '=AVERAGE(rentang)', description: 'Contoh: =AVERAGE(E2:E30) untuk performa rata-rata tim.' },
        ],
      },
      {
        heading: '3. Aturan Emas Excel Kantor',
        items: [
          { label: 'Jangan Hardcode Angka', codeOrShortcut: 'Pisahkan Parameter', description: 'Taruh persentase PPN (11%) di sel terpisah, rujuk dengan $B$1.', tip: 'Jika tarif pajak berubah, kamu hanya perlu ubah 1 sel.' },
          { label: 'Periksa Tipe Data', codeOrShortcut: 'Rata Kanan vs Kiri', description: 'Angka sejati selalu rata kanan secara bawaan. Jika rata kiri, itu adalah teks.' },
        ],
      },
    ],
    footerNote: 'Dicetak dari Pusat Belajar KantorKu v2.0 - PT Maju Sejahtera. Gunakan untuk kebutuhan kerja resmi.',
  },
  {
    id: 'sheet-word-academic-biz',
    title: 'Lembar Contekan: Standarisasi Word Akademik & Bisnis',
    subtitle: 'Aturan Format Skripsi, Proposal, dan Notulen Rapat',
    track: 'word',
    sections: [
      {
        heading: '1. Standar Format Akademik (Skripsi & Tesis)',
        items: [
          { label: 'Margin Halaman Resmi', codeOrShortcut: 'Kiri: 4 cm, Atas: 4 cm, Kanan: 3 cm, Bawah: 3 cm', description: 'Batas kiri 4 cm wajib untuk ruang jilid skripsi hard cover.', tip: 'Jangan pakai margin Normal 1 inci jika kampus mensyaratkan cm.' },
          { label: 'Spasi & Font Standar', codeOrShortcut: 'Times New Roman 12 pt / Arial 11 pt, Spasi 1.5 - 2.0', description: 'Teks rata kiri-kanan (Justify: Ctrl + J), indentasi paragraf awal 1 cm.' },
          { label: 'Hierarki Judul Resmi', codeOrShortcut: 'Heading 1 (Bab) → Heading 2 (Sub-bab) → Heading 3', description: 'Gunakan panel Styles agar Daftar Isi dapat digenerate otomatis.' },
        ],
      },
      {
        heading: '2. Standar Notulen Rapat & Dokumen Bisnis',
        items: [
          { label: 'Header Notulen', codeOrShortcut: 'Hari, Tanggal, Jam, Lokasi, Pimpinan, Peserta', description: 'Wajib ditulis di bagian pembuka sebelum agenda pembahasan.' },
          { label: 'Matriks Rencana Aksi (Action Plan)', codeOrShortcut: 'Tabel RACI: Tindakan | PIC | Tenggat | Indikator', description: 'Setiap butir keputusan rapat harus punya 1 penanggung jawab spesifik.' },
          { label: 'Ringkasan Eksekutif', codeOrShortcut: 'Maksimal 1 Halaman', description: 'Memuat latar belakang, poin keputusan utama, dan estimasi dampak biaya.' },
        ],
      },
    ],
    footerNote: 'Standar Dokumen Formal KantorKu v2.0. Memenuhi kaidah tata kelola korporat & karya ilmiah.',
  },
  {
    id: 'sheet-web-modern',
    title: 'Lembar Contekan: HTML5 Semantik & CSS Flexbox Modern',
    subtitle: 'Struktur Bersih, Aksesibel, dan Responsif untuk Usaha Digital',
    track: 'web',
    sections: [
      {
        heading: '1. Struktur Semantik HTML5',
        items: [
          { label: 'Header Navigasi', codeOrShortcut: '<header><nav>...</nav></header>', description: 'Bagian atas situs untuk logo dan menu tautan utama.' },
          { label: 'Konten Inti', codeOrShortcut: '<main><section>...</section></main>', description: 'Mewadahi isi halaman yang unik dan relevan untuk SEO.' },
          { label: 'Footer Penutup', codeOrShortcut: '<footer><p>&copy; 2026...</p></footer>', description: 'Informasi kontak, jam operasional, dan hak cipta bisnis.' },
        ],
      },
      {
        heading: '2. Rumus Sakti CSS Flexbox',
        items: [
          { label: 'Tengah Sempurna', codeOrShortcut: 'display: flex; justify-content: center; align-items: center;', description: 'Menengahkan teks atau ikon tepat di tengah layar.' },
          { label: 'Baris Kartu Rata Sejajar', codeOrShortcut: 'display: flex; gap: 1.5rem; flex-wrap: wrap;', description: 'Kartu produk otomatis turun rapi saat dibuka di ponsel.' },
          { label: 'Sebar Ujung ke Ujung', codeOrShortcut: 'justify-content: space-between;', description: 'Sangat cocok untuk baris judul produk dan harga di sisi kanan.' },
        ],
      },
    ],
    footerNote: 'KantorKu Web Standard 2026. Zero Div-Soup, Full Accessibility & Responsive First.',
  },
  {
    id: 'sheet-js-logic',
    title: 'Lembar Contekan: JavaScript Logika Bisnis & Kasir',
    subtitle: 'Kompilasi Sintaks Esensial Fungsi & Aritmatika Bersih',
    track: 'coding',
    sections: [
      {
        heading: '1. Fungsi & Parameter',
        items: [
          { label: 'Deklarasi Fungsi', codeOrShortcut: 'function hitungTotal(harga, qty) { return harga * qty; }', description: 'Menerima parameter harga satuan dan kuantitas, mengembalikan subtotal.' },
          { label: 'Format Teks Dinamis', codeOrShortcut: '`Total Belanja: Rp ${subtotal}`', description: 'Template literals dengan backtick untuk menyisipkan variabel angka.' },
        ],
      },
      {
        heading: '2. Logika Diskon & Percabangan',
        items: [
          { label: 'Diskon Bersyarat', codeOrShortcut: 'if (subtotal >= 100000) { subtotal *= 0.9; }', description: 'Memberikan diskon 10% jika total belanja mencapai minimal Rp 100.000.' },
          { label: 'Konversi Angka Akurat', codeOrShortcut: 'Math.round(nilai)', description: 'Hindari angka desimal tak terhingga pada mata uang Rupiah.' },
        ],
      },
    ],
    footerNote: 'KantorKu Code Sandbox 2026. Standar clean code ES6+.',
  },
];
