/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D3: Presentasi & Storytelling Visual - Lessons
 */

export interface LessonSection {
  title: string;
  content: string;
  keyPoints: string[];
}

export interface D3Lesson {
  id: string;
  domainId: 'D3';
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

export const D3_LESSONS: D3Lesson[] = [
  {
    id: 'D3-LES-01',
    domainId: 'D3',
    title: 'Piramida Minto, Alur SCQA & Bottom Line Up Front (BLUF)',
    summary:
      'Teknik menyusun alur cerita presentasi bisnis logis, memikat perhatian sejak menit awal, dan merumuskan jawaban sebelum menjelaskan rincian.',
    estimatedMinutes: 15,
    lastReviewed: '2026-10-29',
    sources: [
      'Minto, B. (2010). The Minto Pyramid Principle: Logic in Writing and Thinking (Minto International, Inc.)',
      'Duarte, N. (2010). Resonate: Present Visual Stories that Transform Audiences (John Wiley & Sons)',
    ],
    disclaimer:
      'Materi simulasi presentasi bisnis perkantoran untuk latihan profesional mandiri.',
    workedExample: {
      bad: 'Slide pembuka bertuliskan "Latar Belakang Penjualan Toko" dengan 6 paragraf teks font 12pt yang menjelaskan sejarah berdirinya toko sejak 5 tahun lalu, membuat audiens bosan sebelum masalah utama tersampaikan.',
      good: 'Menerapkan Kerangka SCQA & BLUF:\n• Situasi (Situation): Omzet toko tumbuh 15% sepanjang semester lalu dengan 1.200 pelanggan setia.\n• Komplikasi (Complication): Namun, komplain keterlambatan pengiriman melonjak 3x lipat dalam 60 hari terakhir akibat sistem sortir manual.\n• Pertanyaan (Question): Bagaimana memangkas durasi sortir gudang tanpa menambah staf baru?\n• Jawaban Inti / Rekomendasi (Answer): "Otomasi barcode scanner nirkabel akan menurunkan waktu sortir hingga 65% dan menghemat biaya operasional Rp18 juta per bulan."',
      explanation:
        'Contoh yang baik menyajikan kesimpulan langsung di awal (BLUF) dengan formula SCQA yang tajam sehingga para pengambil keputusan segera memahami nilai strategis usulan.',
    },
    sections: [
      {
        title: '1. Struktur Piramida Minto & Logika MECE',
        content:
          'Piramida Minto mengatur ide dari atas ke bawah: mulailah dari kesimpulan utama (puncak piramida), lalu dukung dengan 3-4 pilar argumen utama, baru kemudian sertakan data faktual sebagai fondasi pendukung. Setiap pilar argumen wajib memenuhi prinsip MECE (Mutually Exclusive, Collectively Exhaustive)—tidak saling tumpang tindih dan secara kolektif menjawab masalah secara tuntas.',
        keyPoints: [
          'Bottom Line Up Front (BLUF): Jangan simpan rekomendasi di slide ke-25 paling belakang.',
          'Pimpinan eksekutif menghargai presentasi yang langsung menjawab dampak bisnis.',
          'Prinsip MECE mencegah perdebatan berulang atas topik yang saling bertubrukan.',
        ],
      },
      {
        title: '2. Empat Pilar Narasi SCQA',
        content:
          'Formula SCQA menciptakan ketertarikan dramatis yang relevan bagi audiens bisnis. Situasi (S) membangun kesepahaman awal yang disepakati bersama. Komplikasi (C) menunjukkan perubahan kondisi atau bahaya yang mengancam bila tidak bertindak. Pertanyaan (Q) memfokuskan rasa ingin tahu audiens. Jawaban (A) menghadirkan solusi konkret Anda sebagai pahlawan penyelamat.',
        keyPoints: [
          'Situasi harus berupa fakta yang tidak bisa dibantah (fakta obyektif).',
          'Komplikasi adalah jangkar urgensi mengapa rapat hari ini diselenggarakan.',
          'Jawaban harus dapat ditindaklanjuti (actionable) dan terukur hasilnya.',
        ],
      },
    ],
  },
  {
    id: 'D3-LES-02',
    domainId: 'D3',
    title: 'Desain Slide 16:9, Tipografi, Kontras Warna & Action Titles',
    summary:
      'Prinsip tata visual slide modern, eliminasi bullet points bertumpuk, rasio kontras warna WCAG, dan judul slide berbasis kalimat aksi.',
    estimatedMinutes: 16,
    lastReviewed: '2026-10-29',
    sources: [
      'Reynolds, G. (2019). Presentation Zen: Simple Ideas on Presentation Design and Delivery (New Riders, 3rd ed.)',
      'W3C Web Content Accessibility Guidelines (WCAG) 2.2 (W3C, 2023)',
    ],
    disclaimer:
      'Panduan desain presentasi profesional berstandar estetika dan aksesibilitas industri.',
    workedExample: {
      bad: 'Judul slide: "DATA KEUANGAN". Di bawahnya terdapat 9 baris poin peluru (bullet points) berukuran kecil font abu-abu tipis di atas latar belakang abu-abu muda yang tidak terbaca sama sekali dari jarak 2 meter.',
      good: 'Action Title: "Efisiensi Biaya Logistik Meningkatkan Margin Kotor Sebesar 8% di Q3". Di bawahnya: satu kartu metrik besar (38% -> 46%) berdampingan dengan diagram perbandingan sederhana dan satu kalimat sorotan insight bertipografi sans-serif kontras tinggi (rasio kontras 7:1).',
      explanation:
        'Contoh yang baik menyajikan pesan secara instan lewat Action Title. Audiens yang hanya membaca judul pun sudah memahami pesan kunci slide tersebut.',
    },
    sections: [
      {
        title: '1. Action Title: Mengubah Judul Topik Menjadi Pesan Nyata',
        content:
          'Judul slide pasif seperti "Pemasaran", "Tabel 1", atau "Riset Pasar" tidak memberikan informasi apapun. Ganti selalu dengan Action Title berupa satu kalimat utuh yang memuat subjek, kata kerja, dan kesimpulan insight. Audiens membaca judul slide dalam 3 detik pertama; jadikan judul tersebut sebagai intisari pesan slide.',
        keyPoints: [
          'Gunakan kalimat berita yang menyatakan hasil atau tren utama.',
          'Panjang Action Title ideal berkisar 8-15 kata dalam 1-2 baris.',
          'Bila audiens hanya membalik slide dan membaca judulnya saja, mereka sudah menangkap seluruh jalan cerita.',
        ],
      },
      {
        title: '2. Aturan Tipografi & Kontras Warna Aksesibilitas (WCAG)',
        content:
          'Slide presentasi dirancang untuk dilihat dari jarak proyektor atau layar video conference, bukan dibaca seperti buku cetak. Gunakan font sans-serif yang bersih (seperti Inter, Arial, Calibri, Roboto). Judul minimal 28pt, teks penjelas minimal 18pt. Pastikan rasio kontras warna teks terhadap background minimal 4.5:1 (hindari teks kuning di latar putih atau teks biru tua di latar hitam pekat).',
        keyPoints: [
          'Maksimal 2 jenis keluarga font (satu untuk heading, satu untuk body text).',
          'Whitespace (ruang kosong) adalah elemen desain bernilai tinggi, jangan penuhi semua ruang dengan kotak dekoratif.',
          'Hindari paragraf panjang; ganti dengan tata letak kolom berbasis kartu informasi.',
        ],
      },
    ],
  },
  {
    id: 'D3-LES-03',
    domainId: 'D3',
    title: 'Visualisasi Data Bagan, Data-Ink Ratio & Eksekusi Pitch Deck',
    summary:
      'Memilih chart yang tepat, menghilangkan elemen visual pengotor (chart clutter), menyorot data penting, dan menyusun pitch deck 10 slide.',
    estimatedMinutes: 18,
    lastReviewed: '2026-10-29',
    sources: [
      'Schwabish, J. (2016). Better Presentations: A Guide for Scholars, Researchers, and Wonks (Columbia University Press)',
      'Duarte, N. (2008). slide:ology: The Art and Science of Creating Great Presentations (O’Reilly Media)',
    ],
    disclaimer:
      'Format dan etika penyusunan slide pitching bisnis dan visualisasi data perkantoran.',
    workedExample: {
      bad: 'Menampilkan 3D Pie Chart berisi 12 potongan warna-warni menyala dengan bayangan tebal dan legenda terpisah di sudut bawah yang memaksa mata audiens bolak-balik mencocokkan kode warna.',
      good: 'Menampilkan Diagram Batang Horizontal (Horizontal Bar Chart) terurut dari nilai tertinggi ke terendah. Batang produk utama disorot warna hijau zamrud dengan label persentase tepat di ujung batang, sementara batang produk lain diberi warna abu-abu netral. Gridline dan bingkai kotak luar dihapus.',
      explanation:
        'Contoh yang baik memaksimalkan rasio tinta-data (Data-Ink Ratio). Mata audiens langsung tertuju pada produk unggulan tanpa terganggu dekorasi visual yang tidak informatif.',
    },
    sections: [
      {
        title: '1. Pemilihan Jenis Bagan Sesuai Tujuan Komunikasi Data',
        content:
          'Setiap jenis bagan memiliki fungsi spesifik. Diagram batang (bar chart) sangat unggul untuk membandingkan nominal antar-kategori diskrit. Diagram garis (line chart) adalah standar emas untuk melihat tren berkelanjutan terhadap waktu. Hindari bagan lingkaran (pie chart) bila kategori lebih dari 4, dan jangan pernah menggunakan efek 3D atau efek bevel miring yang menipu persepsi skala mata.',
        keyPoints: [
          'Bagan batang horizontal sangat ideal jika nama kategori cukup panjang.',
          'Bagan garis harus menyajikan sumbu waktu yang konsisten dari kiri ke kanan.',
          'Hapus legenda terpisah; letakkan label data langsung berdekatan dengan garis atau batang grafiknya.',
        ],
      },
      {
        title: '2. Struktur Pitch Deck 10 Slide Esensial',
        content:
          'Sebuah presentasi pitch deck investor atau persetujuan tender internal harus padat dan memicu rasa ingin tahu lebih lanjut. Pola standar 10 slide: (1) Judul & Tagline, (2) Masalah Nyata di Pasar, (3) Solusi yang Ditawarkan, (4) Potensi Pasar / Validasi, (5) Produk / Demo Fitur, (6) Model Bisnis & Arus Kas, (7) Bukti Traksi Awal, (8) Analisis Kompetitor, (9) Profil Tim Kunci, (10) Kebutuhan Dana & Pemanfaatan.',
        keyPoints: [
          'Durasi presentasi ideal adalah 10-12 menit agar tersisa waktu cukup untuk tanya jawab kritis.',
          'Gunakan speaker notes untuk mengingat detail angka tanpa harus menaruh seluruh angka di slide.',
          'Slide penutup harus mencantumkan kontak pemrakarsa dan ajakan bertindak (Call to Action) yang gamblang.',
        ],
      },
    ],
  },
];
