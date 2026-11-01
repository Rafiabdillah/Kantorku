/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D15: Karier & Metodologi Akademik - Cheat Sheets
 */

export interface D15CheatSheet {
  id: string;
  title: string;
  description: string;
  items: {
    label: string;
    description: string;
    example?: string;
  }[];
}

export const D15_CHEATSHEET: D15CheatSheet[] = [
  {
    id: 'cs-d15-01',
    title: 'Checklist Pembuatan CV Ramah Mesin ATS',
    description: 'Panduan teknis memastikan dokumen resume dapat dipindai sempurna oleh sistem penyaring pelamar:',
    items: [
      {
        label: '1. Format Tata Letak (Single Column)',
        description: 'Gunakan layout 1 kolom sederhana tanpa tabel kolom ganda, tanpa text box melayang, dan tanpa grafik rating keahlian.',
      },
      {
        label: '2. Judul Bagian Standar (Standard Headings)',
        description: 'Gunakan penamaan tajuk bagian umum: "Ringkasan Profil", "Pengalaman Kerja", "Pendidikan", "Keahlian Teknis".',
      },
      {
        label: '3. Penulisan Tanggal Konsisten',
        description: 'Gunakan format Bulan Tahun (misal: "Jan 2023 - Des 2023" atau "2023 - Sekarang").',
      },
      {
        label: '4. Format File Bersih',
        description: 'Simpan berkas dalam format PDF teks terpilih (bukan hasil scan foto) atau format .docx asli.',
      },
    ],
  },
  {
    id: 'cs-d15-02',
    title: 'Pola Jawaban Wawancara Model STAR',
    description: 'Format narasi 4 langkah menjawab pertanyaan kompetensi perilaku (behavioral question):',
    items: [
      {
        label: 'S - Situation (15% Durasi)',
        description: 'Jelaskan latar belakang konteks masalah spesifik yang dihadapi di tempat kerja atau organisasi.',
        example: '"Saat tim kami menghadapi lonjakan 50 komplain keterlambatan pengiriman..."',
      },
      {
        label: 'T - Task (15% Durasi)',
        description: 'Paparkan tugas atau mandat tanggung jawab yang harus Anda selesaikan.',
        example: '"Tugas saya adalah merekap data nota dan mencari akar penyebab armadanya..."',
      },
      {
        label: 'A - Action (50% Durasi)',
        description: 'Jabarkan tindakan nyata, inisiatif pribadi, dan koordinasi yang Anda ambil.',
        example: '"Saya membuat tabel verifikasi otomatis dan menghubungi 10 vendor cadangan..."',
      },
      {
        label: 'R - Result (20% Durasi)',
        description: 'Sajikan dampak kuantitatif nyata atau pelajaran profesional yang diperoleh.',
        example: '"Hasilnya, seluruh pesanan terselesaikan dan komplain turun 80% dalam 2 hari."',
      },
    ],
  },
  {
    id: 'cs-d15-03',
    title: 'Rangkuman Rumus Sitasi APA Edisi ke-7',
    description: 'Pedoman cepat penulisan rujukan dalam naskah akademik:',
    items: [
      {
        label: 'Satu Penulis',
        description: 'Dalam teks: (Pratama, 2024) atau Pratama (2024).',
      },
      {
        label: 'Dua Penulis',
        description: 'Dalam kurung: (Pratama & Sari, 2024). Dalam kalimat: Pratama dan Sari (2024).',
      },
      {
        label: 'Tiga Penulis atau Lebih',
        description: 'Langsung gunakan et al. sejak pemanggilan pertama: (Pratama et al., 2024) atau Pratama et al. (2024).',
      },
      {
        label: 'Daftar Pustaka Jurnal',
        description: 'Nama, I. (Tahun). Judul artikel. Nama Jurnal, Vol(No), Hal. https://doi.org/...',
      },
    ],
  },
];
