/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D15: Karier & Metodologi Akademik - Lessons
 */

export interface D15Lesson {
  id: string;
  domainId: 'D15';
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

export const D15_LESSONS: D15Lesson[] = [
  {
    id: 'D15-LES-01',
    domainId: 'D15',
    title: 'Standar CV ATS & Cara Mengenali Modus Lowongan Palsu',
    summary: 'Menyusun naskah riwayat hidup yang terbaca oleh sistem pelacak pelamar kerja otomatis dan mengenali jebakan penipuan rekrutmen.',
    estimatedMinutes: 18,
    sources: [
      'Job Description and Candidate Specification Standard (Chartered Institute of Personnel and Development - CIPD, 2022)',
      'Pedoman Pelayanan Antarkerja dan Rekrutmen Tenaga Kerja (Kementerian Ketenagakerjaan RI, 2021)',
    ],
    disclaimer: 'Contoh panduan edukasi penulisan CV dan kewaspadaan rekrutmen. Bukan jaminan pasti panggilan wawancara kerja.',
    lastReviewed: '2026-10-26',
    workedExample: {
      title: 'Mengubah Deskripsi Tugas Biasa Menjadi Formula Pencapaian XYZ',
      scenario: 'Pelamar menulis: "Tugas saya bertanggung jawab membuat laporan stok barang di gudang."',
      analysis: 'Deskripsi pasif hanya menyebutkan kewajiban kerja harian tanpa membuktikan dampak, efisiensi, atau skala keberhasilan yang dicapai.',
      bestPractice: 'Gunakan Formula XYZ: "Merekapitulasi 200+ SKU barang inventaris per minggu [X], menurunkan selisih stok opname hingga 15% [Y], dengan menerapkan tabel validasi Excel dinamis [Z]."',
    },
    sections: [
      {
        heading: '1. Format Ramah Mesin ATS (Applicant Tracking System)',
        content: 'Gunakan tata letak satu kolom sederhana, font standar (Arial, Calibri, Times New Roman), tanpa tabel bersarang yang rumit, tanpa gambar grafik/rating skill berbentuk bintang, dan simpan dalam format PDF atau DOCX berteks bersih.',
      },
      {
        heading: '2. Tiga Ciri Pasti Lowongan Kerja Palsu (Job Scam)',
        content: '1. Pemungutan biaya travel/akomodasi fiktif dengan janji penggantian (reimburse). 2. Penggunaan domain email gratisan (@gmail, @yahoo) mengatasnamakan perusahaan multinasional besar. 3. Tawaran langsung diterima tanpa proses wawancara yang wajar disertai gaji tidak masuk akal.',
      },
      {
        heading: '3. Menyesuaikan Kata Kunci (Tailoring Keywords)',
        content: 'Bandingkan kualifikasi pada iklan lowongan dengan CV Anda. Jika posisi membutuhkan "VLOOKUP dan rekonsiliasi data", cantumkan istilah tersebut secara eksplisit pada bagian keahlian dan riwayat proyek nyata.',
      },
    ],
  },
  {
    id: 'D15-LES-02',
    domainId: 'D15',
    title: 'Menjawab Wawancara Kerja dengan Kerangka STAR & Diplomasi Gaji',
    summary: 'Struktur jawaban berbasis perilaku yang meyakinkan pewawancara, menangani pertanyaan kelemahan diri, dan etika negosiasi kompensasi.',
    estimatedMinutes: 20,
    sources: [
      'Behavioral Interviewing Guidelines and the STAR Model (Development Dimensions International - DDI, 2020)',
      'Getting to Yes: Negotiating Agreement Without Giving In (Roger Fisher & William Ury, Penguin Books, 2011)',
    ],
    disclaimer: 'Materi latihan teknik komunikasi wawancara. Bukan nasihat ketenagakerjaan resmi atau jaminan kelulusan rekrutmen.',
    lastReviewed: '2026-10-26',
    workedExample: {
      title: 'Menjawab Pertanyaan: "Ceritakan pengalaman saat Anda menghadapi tenggat mepet"',
      scenario: 'Kandidat menjawab berputar-putar: "Saya orangnya pekerja keras dan sering lembur kalau bos minta cepat."',
      analysis: 'Jawaban bersifat klaim subjektif tanpa kronologi, tanpa tindakan konkret, dan tanpa hasil nyata terukur.',
      bestPractice: 'Model STAR: [S] Saat audit bulanan, laporan fisik selisih 2 hari sebelum tenggat. [T] Tugas saya menyinkronkan 150 nota transaksi kasir. [A] Saya membuat formula SUMIFS otomatis dan membagi tugas verifikasi bukti nota bersama rekan tim. [R] Laporan selesai tepat waktu dengan selisih 0 rupiah.',
    },
    sections: [
      {
        heading: '1. Kerangka STAR (Situation, Task, Action, Result)',
        content: 'Sajikan jawaban dalam 4 babak: Situasi (konteks masalah 15%), Tugas (tanggung jawab Anda 15%), Aksi (tindakan konkret yang Anda ambil 50%), dan Hasil (dampak terukur atau pelajaran 20%).',
      },
      {
        heading: '2. Menjawab Pertanyaan Kelemahan Diri',
        content: 'Pilih kelemahan profesional yang nyata namun tidak mematikan fungsi inti pekerjaan, lalu sertakan langkah sistematis yang sedang Anda lakukan untuk memperbaikinya (misal: "Saya terkadang ragu mendelegasikan tugas teknis, sehingga kini saya mulai menyusun checklist kerja tim").',
      },
      {
        heading: '3. Diplomasi Negosiasi Rentang Gaji',
        content: 'Lakukan riset standar gaji industri sebelum wawancara. Sampaikan rentang angka (bukan satu angka kaku), jelaskan nilai tambah keterampilan yang Anda bawa, dan tanyakan struktur tunjangan serta jenjang evaluasi berkala.',
      },
    ],
  },
  {
    id: 'D15-LES-03',
    domainId: 'D15',
    title: 'Tata Tulis Akademik, Sitasi APA 7 & Teknik Parafrase Anti-Plagiarisme',
    summary: 'Kaidah penulisan rujukan ilmiah standar APA edisi ke-7, perumusan rumusan masalah, dan teknik menulis orisinal tanpa plagiasi.',
    estimatedMinutes: 20,
    sources: [
      'Publication Manual of the American Psychological Association (7th ed., American Psychological Association, 2020)',
      'Pedoman Integritas Akademik dan Pencegahan Plagiarisme (Kemendikbudristek RI / Dirjen Dikti, 2021)',
    ],
    disclaimer: 'Materi edukasi metodologi penulisan ilmiah. Selalu periksa pedoman gaya selingkung resmi masing-masing institusi kampus.',
    lastReviewed: '2026-10-26',
    workedExample: {
      title: 'Melakukan Parafrase Kalimat Sumber Jurnal Tanpa Plagiarisme',
      scenario: 'Teks asli: "Penerapan sistem pembukuan digital meningkatkan akurasi laporan keuangan UMKM sebesar 30% (Hartono, 2024)." Mahasiswa hanya mengganti 1 kata.',
      analysis: 'Mengubah satu kata tanpa merestrukturisasi kalimat tetap tergolong plagiarisme mosaik (patchwriting) dan terdeteksi oleh perangkat lunak similarity.',
      bestPractice: 'Parafrase sejati dengan mengubah struktur dan sudut pandang: "Berdasarkan investigasi Hartono (2024), margin kesalahan pembukuan pada sektor usaha mikro dapat ditekan secara signifikan ketika proses pencatatan dialihkan dari buku manual ke lembar kerja terotomasi."',
    },
    sections: [
      {
        heading: '1. Anatomi Format Sitasi APA Edisi ke-7',
        content: 'Sitasi dalam teks: (Nama Belakang, Tahun). Contoh: (Pratama, 2024) atau Pratama (2024) menyatakan bahwa... Jika ada dua penulis: (Pratama & Sari, 2024). Jika tiga penulis atau lebih: (Pratama et al., 2024).',
      },
      {
        heading: '2. Format Daftar Pustaka untuk Jurnal Ilmiah',
        content: 'Nama Belakang, Inisial. (Tahun). Judul artikel kalimat biasa. Judul Jurnal Miring, Volume(Nomor Miring), Halaman. https://doi.org/xxxx. Wajib menggunakan indentasi gantung (hanging indent).',
      },
      {
        heading: '3. Etika Integritas Akademik & Penggunaan AI',
        content: 'Penggunaan alat bantu kecerdasan buatan untuk memeriksa tata bahasa atau mencari ide sudut pandang wajib diakui secara transparan. Teks utama skripsi, analisis data, dan kesimpulan wajib ditulis orisinal oleh mahasiswa.',
      },
    ],
  },
];
