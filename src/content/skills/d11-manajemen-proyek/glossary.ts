/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D11: Manajemen Proyek & Produktivitas - Glossary
 */

export interface GlossaryTerm {
  term: string;
  category: string;
  definition: string;
  example: string;
}

export const D11_GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Work Breakdown Structure (WBS)',
    category: 'Manajemen Proyek',
    definition: 'Dekomposisi hierarkis berorientasi deliverable dari total ruang lingkup pekerjaan proyek.',
    example: 'WBS memecah peluncuran kantor menjadi sub-paket: izin, renovasi, pengadaan IT, dan rekrutmen staf.',
  },
  {
    term: 'Jalur Kritis (Critical Path)',
    category: 'Penjadwalan',
    definition: 'Urutan aktivitas proyek terpanjang dari awal hingga akhir yang memiliki total float nol.',
    example: 'Keterlambatan pada aktivitas jalur kritis langsung memundurkan tanggal peresmian kantor.',
  },
  {
    term: 'Matriks Eisenhower',
    category: 'Produktivitas',
    definition: 'Kerangka prioritas 2x2 yang mengklasifikasikan tugas berdasarkan urgensi dan kepentingan.',
    example: 'Membalas chat santai masuk Kuadran IV (eliminasi), sedangkan merancang SOP masuk Kuadran II (jadwalkan).',
  },
  {
    term: 'Work In Progress (WIP) Limit',
    category: 'Kanban',
    definition: 'Batas maksimum jumlah kartu pekerjaan yang diizinkan berada dalam suatu status alur kerja secara bersamaan.',
    example: 'WIP limit kolom In Progress diatur maksimal 3 agar tim fokus menuntaskan pekerjaan sebelum menarik tugas baru.',
  },
  {
    term: 'Scope Creep',
    category: 'Ruang Lingkup',
    definition: 'Penambahan fitur atau pekerjaan secara tidak terkendali tanpa penyesuaian waktu, anggaran, atau sumber daya.',
    example: 'Permintaan atasan menambah modul promosi 3 hari sebelum rilis adalah bentuk scope creep yang harus dinegosiasikan.',
  },
  {
    term: 'Risk Register',
    category: 'Manajemen Risiko',
    definition: 'Dokumen pencatat seluruh risiko teridentifikasi, skor keparahan (probabilitas x dampak), dan rencana aksi mitigasi.',
    example: 'Risk register mencatat risiko keterlambatan izin dengan rencana mitigasi konsultasi pendampingan dinas.',
  },
];
