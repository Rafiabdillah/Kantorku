/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D15: Karier & Metodologi Akademik - Glossary
 */

export interface D15GlossaryTerm {
  term: string;
  category: string;
  definition: string;
  practicalTip: string;
}

export const D15_GLOSSARY: D15GlossaryTerm[] = [
  {
    term: 'Applicant Tracking System (ATS)',
    category: 'Rekrutmen Kerja',
    definition: 'Perangkat lunak yang digunakan oleh perusahaan untuk menyaring, memindai, dan memberi peringkat resume pelamar secara otomatis berdasarkan kecocokan kata kunci.',
    practicalTip: 'Gunakan format satu kolom bersih tanpa tabel bersarang atau ikon grafik rating bintang agar teks terbaca utuh.',
  },
  {
    term: 'Metode STAR',
    category: 'Wawancara Kerja',
    definition: 'Teknik menjawab pertanyaan wawancara berbasis perilaku yang terstruktur: Situation (Situasi), Task (Tugas), Action (Aksi), dan Result (Hasil).',
    practicalTip: 'Fokuskan 50% durasi bicara Anda pada bagian Action (langkah konkret yang Anda ambil).',
  },
  {
    term: 'Formula Pencapaian XYZ',
    category: 'Penulisan Resume',
    definition: 'Rumus penulisan pencapaian kerja: "Mencapai [X], yang diukur dengan [Y], dengan melakukan [Z]".',
    practicalTip: 'Awali setiap butir pengalaman kerja dengan kata kerja aksi aktif (misal: merekonsiliasi, mengotomasi, menurunkan).',
  },
  {
    term: 'Format Sitasi APA 7',
    category: 'Karya Ilmiah',
    definition: 'Standar penulisan rujukan akademik internasional yang diterbitkan oleh American Psychological Association edisi ke-7.',
    practicalTip: 'Gunakan format (Penulis, Tahun) dalam teks dan hanging indent pada daftar pustaka.',
  },
  {
    term: 'Parafrase Ilmiah',
    category: 'Integritas Akademik',
    definition: 'Menuliskan kembali gagasan atau temuan dari sumber rujukan menggunakan kalimat dan struktur bahasa sendiri tanpa mengubah makna aslinya.',
    practicalTip: 'Jangan sekadar menukar 1-2 kata sinonim; ubah struktur kalimat dan alur penjelasannya.',
  },
  {
    term: 'Plagiarisme Mosaik (Patchwriting)',
    category: 'Etika Akademik',
    definition: 'Bentuk plagiasi di mana penulis menyalin potongan kalimat dari berbagai sumber dan hanya mengganti beberapa kata tanpa menyusun kalimat orisinal.',
    practicalTip: 'Tutup buku atau artikel sumber saat menulis rangkuman agar bahasa yang keluar benar-benar bahasa Anda sendiri.',
  },
  {
    term: 'Job Scam',
    category: 'Karier & Keamanan',
    definition: 'Modus penipuan berkedok tawaran pekerjaan palsu yang biasanya memungut uang tiket travel atau meminta data perbankan pribadi pelamar.',
    practicalTip: 'Perusahaan kredibel tidak pernah memungut biaya apa pun dalam proses seleksi rekrutmen.',
  },
  {
    term: 'Skala Likert',
    category: 'Metodologi Penelitian',
    definition: 'Skala psikometrik yang umum digunakan dalam kuesioner riset untuk mengukur tingkat persetujuan responden (biasanya rentang 1-5).',
    practicalTip: 'Pastikan butir pertanyaan kuesioner netral dan tidak mengarahkan responden ke jawaban tertentu.',
  },
];
