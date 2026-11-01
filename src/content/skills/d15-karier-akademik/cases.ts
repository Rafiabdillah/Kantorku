/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D15: Karier & Metodologi Akademik - Case File v2
 */

import { CaseFile } from '../../../types';

export const D15_CASES: CaseFile[] = [
  {
    id: 'case-d15-01',
    code: 'D15-C1',
    title: 'Penyusunan Makalah Studi Kasus Bisnis & Portofolio Magang',
    industry: 'Akademik & Konsultasi Karier',
    tier: 3,
    scale: 'akademik',
    businessFunction: 'Riset Bisnis & Persiapan Portofolio Karier',
    module: 'word',
    channel: 'email',
    deadlineHours: 8,
    estimatedMinutes: 30,
    clientName: 'Lembaga Pelatihan Karier & Praktikum Mahasiswa',
    character: 'maya',
    tags: ['karier', 'skripsi', 'apa-7', 'portofolio', 'metodologi'],
    modules: ['word', 'excel'],
    requires: ['advanced-quiz-engine'],
    summary:
      'Mahasiswa magang diminta menyusun laporan mini riset studi kelayakan usaha toko kelontong berbasis data transaksi nyata, menerapkan sitasi APA 7, dan merangkum pencapaian portofolio siap kerja.',
    stakeholders: [
      {
        nama: 'Maya',
        peran: 'HR & People Specialist',
        kepentingan: 'Melihat kelengkapan portofolio dan kesiapan kompetensi kandidat memasuki dunia kerja profesional.',
        gayaBicara: 'Empatik, suportif, memperhatikan etika komunikasi dan kerapian dokumen.',
      },
      {
        nama: 'Pak Reza',
        peran: 'Finance & Academic Lead',
        kepentingan: 'Memastikan kalkulasi angka laporan akurat, metodologi ilmiah konsisten, dan bebas plagiarisme.',
        gayaBicara: 'Perfeksionis, sangat teliti hingga dua angka di belakang koma.',
      },
    ],
    timeline: [
      { hour: 1, event: 'Penyerahan data mentah transaksi toko 7 hari dan draf awal tinjauan pustaka.' },
      { hour: 4, event: 'Review pertama: Dosen pembimbing meminta revisi format sitasi APA 7 dan penghitungan margin rata-rata.' },
      { hour: 7, event: 'Pemeriksaan akhir uji kemiripan (similarity check) dan finalisasi berkas portofolio.' },
    ],
    attachments: [
      {
        type: 'teks-pdf',
        name: 'pedoman_tata_tulis_makalah_studi_kasus.pdf',
        description: 'Petunjuk format penulisan ilmiah, pedoman sitasi APA edisi 7, dan rubrik penilaian.',
      },
    ],
    dataPack: {
      generatorRef: 'academic-casestudy-data-gen',
      variantsCount: 3,
      anomalies: [
        'Format sitasi dalam teks menggunakan tanda kurung siku bukan tanda kurung bulat',
        'Daftar pustaka belum menggunakan indentasi gantung (hanging indent)',
        'Ringkasan eksekutif belum menyertakan angka persentase hasil riset',
      ],
    },
    deliverables: [
      {
        name: 'Makalah Studi Kasus & Portofolio Karya',
        module: 'word',
        specification: 'Dokumen naskah akademik memuat bab pendahuluan, metode studi, pembahasan berbasis tabel, sitasi APA 7, dan lampiran resume ATS.',
        requiredElements: ['Rumusan Masalah', 'Metodologi', 'Tabel Hasil', 'Sitasi APA 7', 'Daftar Pustaka'],
      },
    ],
    decisionPoints: [
      {
        title: 'Penanganan Kalimat Sumber dari Jurnal Referensi',
        scenario: 'Terdapat temuan kunci pada artikel jurnal yang sangat mendukung pembahasan skripsi Anda.',
        options: [
          {
            label: 'Salin tempel kalimat asli tanpa tanda petik dan tanpa menyebut nama penulis agar tampak seperti analisis sendiri',
            impact: 'Pelanggaran etika berat: Terdeteksi plagiarisme dan dokumen ditolak pembimbing.',
            isOptimal: false,
          },
          {
            label: 'Lakukan parafrase dengan menyusun ulang struktur kalimat dan cantumkan sitasi sumber (Penulis, Tahun)',
            impact: 'Praktik ilmiah terbaik: Menjaga integritas akademik dan menurunkan skor kesamaan naskah.',
            isOptimal: true,
          },
        ],
      },
    ],
    scopeChanges: [
      {
        hour: 4,
        description: 'Dosen meminta penambahan 1 subbab khusus analisis dampak etika riset perlindungan privasi data narasumber.',
        impact: 'Menambahkan pasal kerahasiaan identitas responden sesuai prinsip informed consent.',
      },
    ],
    handover: {
      summary: 'Naskah laporan studi kasus dan portofolio magang telah tuntas disesuaikan dengan pedoman APA 7.',
      assumptions: ['Seluruh data transaksi yang digunakan merupakan data simulasi fiktif yang telah disamarkan.'],
      precautions: ['Pastikan seluruh rujukan dalam daftar pustaka benar-benar dikutip di dalam badan naskah.'],
      nextSteps: ['Simpan berkas ringkasan eksekutif ke dalam portofolio profil digital Anda.'],
    },
    pitfalls: ['Menuliskan tautan URL mentah panjang tanpa menyertakan nama pengarang dan tahun terbit pada daftar pustaka.'],
    linkedLessons: ['D15-LES-01', 'D15-LES-02', 'D15-LES-03'],
    templatesUnlocked: ['Template Laporan Studi Kasus Bisnis APA 7', 'Template CV ATS Profesional'],
    modifiers: ['Standar Akademik', 'Uji Orisinalitas'],
    referenceSolutions: [
      'Menyusun rumusan masalah terfokus, mengolah tabel transaksi dengan formula teruji, menerapkan parafrase ilmiah dengan sitasi (Pratama, 2024), dan menyusun daftar pustaka berurutan abjad.',
      'Menulis laporan dengan struktur standar: pendahuluan, metode pengumpulan data, analisis tabel keuangan, sintesis literatur APA 7, dan lampiran resume ramah ATS.',
    ],
    emails: [
      {
        from: 'maya@majusejahtera.co.id',
        subject: 'Persiapan Laporan Magang & Portofolio Portofolio Kerja',
        timestamp: '09:00 WIB',
        body: 'Budi, untuk memenuhi syarat penyelesaian periode magang, silakan selesaikan studi kasus laporan UMKM dan lampirkan CV terbaru Anda. Pastikan format rujukan ilmiah sesuai panduan ya.',
      },
    ],
    chats: [
      {
        sender: 'Pak Reza',
        time: '09:30',
        message: 'Budi, pastikan angka persentase di naskah Word Anda sama persis dengan total tabel Excel. Jangan sampai ada perbedaan selisih serupiah pun.',
      },
    ],
    voiceNotes: [],
    clarifyingQuestions: [
      {
        id: 'cq-1',
        question: 'Apakah format CV boleh menggunakan template kreatif penuh warna?',
        options: [
          {
            id: 'opt-a',
            text: 'Gunakan format ATS sederhana satu kolom agar dapat terbaca sistem penyeleksi kerja perusahaan mitra.',
            isOptimal: true,
            bossResponse: 'Tepat sekali! Keterbacaan mesin dan manusia adalah kunci lolos seleksi berkas.',
          },
          {
            id: 'opt-b',
            text: 'Gunakan desain grafis kompleks dengan banyak ikon dan kolom bertingkat.',
            isOptimal: false,
            bossResponse: 'Kurang tepat, desain rumit sering gagal diproses oleh sistem penyaring otomatis ATS.',
          },
        ],
      },
    ],
    initialData: {},
    reputationReward: 15,
    xpReward: 250,
    coinsReward: 100,
    mentorDebrief: {
      keyTakeaway: 'Penyusunan naskah terstruktur dan kepatuhan sitasi yang rapi mencerminkan profesionalisme kerja.',
      pitfallAvoided: 'Menghindari plagiarisme dan desain resume rumit yang tidak terbaca mesin penyaring.',
      industryContext: 'Dunia kerja modern mengutamakan rekam jejak portofolio terukur dan integritas akademik tinggi.',
    },
  },
];
