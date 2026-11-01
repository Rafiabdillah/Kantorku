/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D3: Presentasi & Storytelling Visual - Cheatsheets
 */

export interface CheatSheetItem {
  id: string;
  title: string;
  description: string;
  category: string;
  points: string[];
}

export const D3_CHEATSHEET: CheatSheetItem[] = [
  {
    id: 'cs-d3-01',
    title: 'Lembar Contekan Alur Cerita SCQA & Action Titles',
    description: 'Panduan merancang naskah presentasi eksekutif yang persuasif dan langsung ke inti masalah.',
    category: 'Struktur Narasi',
    points: [
      'Situation: Mulai dari fakta dasar yang disepakati semua pihak tanpa perdebatan.',
      'Complication: Tunjukkan pemicu friksi, penurunan performa, atau peluang emas yang berubah.',
      'Question: Rumuskan satu pertanyaan fokus yang paling mendesak dijawab audiens.',
      'Answer (BLUF): Letakkan rekomendasi solusi di slide pembuka, bukan di akhir presentasi.',
      'Action Title: Ganti judul kata benda dengan kalimat berita kesimpulan 8-15 kata.',
    ],
  },
  {
    id: 'cs-d3-02',
    title: 'Lembar Contekan Visualisasi Data & Desain 16:9 Bersih',
    description: 'Aturan visual pemilihan grafik, kontras warna aksesibilitas, dan eliminasi chartjunk.',
    category: 'Desain Visual',
    points: [
      'Gunakan format layar lebar 16:9 dengan font sans-serif bersih (judul 28-32pt, teks 18-20pt).',
      'Pilih Bar Chart untuk perbandingan kategori diskrit dan Line Chart untuk deret waktu.',
      'Haramkan 3D pie chart atau efek bevel cembung yang mendistorsi proporsi sudut data.',
      'Rasio Kontras WCAG AA minimal 4.5:1 antara teks dan warna latar belakang.',
      'Gunakan warna aksen tunggal untuk menyorot metrik kunci; warnai sisa data dengan abu-abu netral.',
    ],
  },
];
