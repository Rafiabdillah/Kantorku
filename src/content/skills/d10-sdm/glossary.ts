/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D10: SDM & Kepemimpinan - Glossary Definitions
 */

export interface GlossaryItem {
  id: string;
  term: string;
  definition: string;
  category: string;
}

export const D10_GLOSSARY: GlossaryItem[] = [
  {
    id: 'd10-term-pkwt',
    term: 'PKWT (Perjanjian Kerja Waktu Tertentu)',
    definition:
      'Perjanjian kerja antara pekerja dengan pengusaha untuk mengadakan hubungan kerja dalam waktu tertentu atau untuk pekerjaan tertentu yang sifatnya sementara/musiman.',
    category: 'Kontrak Kerja',
  },
  {
    id: 'd10-term-pkwtt',
    term: 'PKWTT (Perjanjian Kerja Waktu Tidak Tertentu)',
    definition:
      'Perjanjian kerja antara pekerja dengan pengusaha untuk mengadakan hubungan kerja yang bersifat tetap tanpa batasan jangka waktu berakhirnya kontrak.',
    category: 'Kontrak Kerja',
  },
  {
    id: 'd10-term-upah-sejam',
    term: 'Upah Per Jam (1/173)',
    definition:
      'Formula resmi ketenagakerjaan Indonesia berdasarkan PP No. 35/2021 untuk menghitung nilai satu jam kerja pekerja bulanan: 1/173 dikali upah sebulan.',
    category: 'Penggajian',
  },
  {
    id: 'd10-term-thr',
    term: 'Tunjangan Hari Raya (THR) Keagamaan',
    definition:
      'Pendapatan non-upah yang wajib dibayarkan oleh pengusaha kepada pekerja atau keluarganya menjelang hari raya keagamaan dalam bentuk uang tunai rupiah.',
    category: 'Penggajian',
  },
  {
    id: 'd10-term-kompensasi-pkwt',
    term: 'Uang Kompensasi PKWT',
    definition:
      'Hak finansial yang wajib diberikan pengusaha kepada pekerja PKWT saat berakhirnya masa kontrak, dihitung berdasarkan masa kerja (minimal 1 bulan terus-menerus).',
    category: 'Kompensasi',
  },
  {
    id: 'd10-term-sbi',
    term: 'Model Umpan Balik SBI',
    definition:
      'Metode evaluasi kinerja konstruktif yang membagi pesan menjadi tiga komponen objektif: Situation (situasi), Behavior (perilaku nyata), dan Impact (dampak terukur).',
    category: 'Manajemen Kinerja',
  },
  {
    id: 'd10-term-sp',
    term: 'Surat Peringatan (SP 1, 2, 3)',
    definition:
      'Bentuk sanksi disipliner tertulis berjenjang yang diterbitkan pengusaha kepada pekerja atas pelanggaran tata tertib, dengan masa berlaku masing-masing selama 6 bulan.',
    category: 'Hubungan Industrial',
  },
];
