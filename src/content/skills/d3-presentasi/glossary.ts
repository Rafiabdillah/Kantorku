/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D3: Presentasi & Storytelling Visual - Glossary
 */

export interface GlossaryTerm {
  term: string;
  category: string;
  definition: string;
  example: string;
}

export const D3_GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Bottom Line Up Front (BLUF)',
    category: 'Struktur Cerita',
    definition: 'Praktik menyajikan kesimpulan, rekomendasi, atau keputusan penting di baris atau slide paling awal.',
    example: 'Alih-alih menjelaskan latar belakang panjang, presenter langsung menyampaikan usulan efisiensi di slide pertama.',
  },
  {
    term: 'SCQA Framework',
    category: 'Narasi Bisnis',
    definition: 'Kerangka alur cerita yang terdiri dari Situation (konteks), Complication (masalah), Question (pertanyaan), dan Answer (jawaban solusi).',
    example: 'SCQA memandu dewan direksi memahami urgensi proyek dari situasi awal hingga solusi yang ditawarkan.',
  },
  {
    term: 'Action Title',
    category: 'Desain Slide',
    definition: 'Judul slide berbentuk kalimat berita utuh yang merangkum wawasan atau kesimpulan pokok dari slide tersebut.',
    example: '"Otomasi Gudang Memangkas Biaya Operasional 25%" adalah Action Title, bukan sekadar "Data Biaya".',
  },
  {
    term: 'Data-Ink Ratio',
    category: 'Visualisasi Data',
    definition: 'Proporsi tinta atau piksel pada grafik yang digunakan khusus untuk menyajikan data esensial dibandingkan elemen dekoratif.',
    example: 'Menghapus bingkai tebal dan efek 3D pada grafik meningkatkan rasio data-ink.',
  },
  {
    term: 'Rasio Kontras WCAG AA',
    category: 'Aksesibilitas',
    definition: 'Standar perbandingan kecerahan antara teks dan latar belakang dengan ambang batas minimal 4.5:1 untuk teks biasa.',
    example: 'Teks biru tua di atas latar putih memenuhi standar WCAG AA, sedangkan teks kuning di latar putih gagal.',
  },
  {
    term: 'Whitespace',
    category: 'Tata Letak',
    definition: 'Ruang kosong tanpa elemen grafis yang sengaja dibiarkan terbuka di sekitar konten untuk memberikan jeda visual.',
    example: 'Pemberian margin luas di sekeliling kartu angka membuat metrik finansial tampil menonjol dan berwibawa.',
  },
];
