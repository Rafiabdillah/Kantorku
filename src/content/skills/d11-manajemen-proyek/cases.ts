/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D11: Manajemen Proyek & Produktivitas - Case File
 */

import { CaseFile } from '../../../types';

export const D11_CASES: CaseFile[] = [
  {
    id: 'case-d11-01',
    code: 'D11-C1',
    title: 'Penyelamatan Jadwal & Manajemen Ruang Lingkup Proyek Toko Cabang',
    industry: 'Ritel & Distribusi Kantor',
    tier: 3,
    scale: 'menengah',
    businessFunction: 'Manajemen Proyek & Operasional',
    module: 'word',
    channel: 'email',
    deadlineHours: 8,
    estimatedMinutes: 25,
    clientName: 'PT Maju Sejahtera Bersama',
    character: 'sari',
    tags: ['manajemen-proyek', 'wbs', 'eisenhower', 'gantt', 'kanban', 'risiko'],
    modules: ['word', 'excel'],
    requires: ['advanced-quiz-engine'],
    summary:
      'Proyek pembukaan toko cabang terancam molor 3 pekan akibat permintaan penambahan fitur mendadak dan keterlambatan izin. Susun dekomposisi WBS, perbarui bagan Gantt jalur kritis, dan terapkan pembatasan WIP Kanban.',
    stakeholders: [
      {
        nama: 'Bu Sari',
        peran: 'Direktur Operasional',
        kepentingan: 'Toko cabang harus beroperasi sebelum masa promo akhir tahun tanpa melanggar regulasi.',
        gayaBicara: 'Tegas, strategis, meminta kepastian solusi berbasis data.',
      },
      {
        nama: 'Dimas',
        peran: 'Koordinator Tim Proyek',
        kepentingan: 'Menghindari beban lembur berlebih pada staf dan menata kartu tugas agar transparan.',
        gayaBicara: 'Kolaboratif, pragmatis, fokus pada eksekusi lapangan.',
      },
    ],
    timeline: [
      { hour: 1, event: 'Penemuan keterlambatan izin renovasi fisik selama 10 hari.' },
      { hour: 3, event: 'Permintaan penambahan sistem keanggotaan VIP dari divisi pemasaran (scope creep).' },
      { hour: 6, event: 'Rapat koordinasi PMO untuk menyepakati rilis bertahap (phased rollout) dan pembaruan WBS.' },
    ],
    attachments: [
      {
        type: 'teks-pdf',
        name: 'wbs_jadwal_peluncuran_cabang.txt',
        description: 'Draf tabel paket kerja WBS dan identifikasi jalur kritis proyek cabang.',
      },
    ],
    dataPack: {
      generatorRef: 'project-rescue-data-gen',
      variantsCount: 3,
      anomalies: [
        'Aktivitas pemasangan rak barang dijadwalkan sebelum semen lantai kering',
        'Penambahan modul VIP tanpa formulir Change Request resmi',
      ],
    },
    deliverables: [
      {
        name: 'Struktur WBS 100% Rule & Jalur Kritis Revisi',
        module: 'word',
        specification: 'Tabel paket kerja hierarkis yang memisahkan Fase 1 (Rilis Pokok) dan Fase 2 (Fitur Tambahan).',
        requiredElements: ['Aturan 100%', 'Jalur kritis', 'Paket kerja', 'Fase 1 rilis'],
      },
      {
        name: 'Risk Register & Rencana Kontinjensi Proyek',
        module: 'word',
        specification: 'Daftar 3 risiko utama lengkap dengan probabilitas, dampak, dan rencana aksi preventif.',
        requiredElements: ['Matriks probabilitas', 'Rencana kontinjensi', 'Mitigasi preventif', 'Penanggung jawab'],
      },
    ],
    handover: {
      summary: 'Proyek peluncuran cabang berhasil diselamatkan dengan rilis bertahap Fase 1 tepat waktu dan jalur kritis terjaga.',
      assumptions: ['Fase 1 mencakup seluruh fungsionalitas pokok operasional kasir.'],
      precautions: ['Waspadai permintaan fitur tambahan di luar formulir Change Request.'],
      nextSteps: ['Jadwalkan kick-off perancangan modul loyalty untuk rilis Fase 2.'],
    },
    pitfalls: ['Menyetujui scope creep secara lisan tanpa analisis dampak jadwal.'],
    referenceSolutions: ['Struktur WBS 100% Rule', 'Rencana Kontinjensi Proyek'],
    emails: [
      {
        from: 'sari@majusejahtera.co.id',
        subject: 'URGENT: Eskalasi Keterlambatan Proyek Cabang & Permintaan Fitur Pemasaran',
        timestamp: '09:00 WIB',
        body: 'Budi, renovasi cabang mengalami kendala izin dan tim marketing mendesak penambahan modul VIP. Tolong buatkan revisi WBS dan risk register sebelum siang ini.',
      },
    ],
    chats: [
      {
        sender: 'Dimas',
        time: '09:15',
        message: 'Budi, jalur kritis instalasi kasir jangan sampai kegeser ya. Kalau butuh data float jadwal aku siap bantu.',
      },
    ],
    voiceNotes: [],
    clarifyingQuestions: [
      {
        id: 'cq-d11-1',
        question: 'Bagaimana penanganan terbaik terhadap permintaan modul loyalitas baru di tengah fase pengujian UAT?',
        options: [
          {
            id: 'opt-a',
            text: 'Tawarkan skema rilis bertahap (phased rollout): fitur pokok rilis tepat waktu di Fase 1, dan modul loyalitas dijadwalkan di Fase 2 via Change Request.',
            isOptimal: true,
            bossResponse: 'Sangat tepat! Rilis bertahap mengamankan peluncuran tanpa mengabaikan aspirasi bisnis.',
          },
          {
            id: 'opt-b',
            text: 'Terima langsung dan suruh tim lembur terus menerus.',
            isOptimal: false,
            bossResponse: 'Berbahaya! Menerima scope creep di akhir fase memicu error sistem dan kegagalan rilis.',
          },
        ],
      },
    ],
    initialData: {},
    reputationReward: 15,
    xpReward: 250,
    coinsReward: 100,
    mentorDebrief: {
      keyTakeaway:
        'Penyelamatan proyek menuntut ketegasan batas ruang lingkup: dekomposisi WBS 100%, evaluasi float jalur kritis, dan dokumentasi Change Request resmi.',
      pitfallAvoided:
        'Menghindari scope creep tanpa analisis dampak dan menghindari kelelahan staf akibat perencanaan kapasitas buruk.',
      industryContext:
        'Di industri ritel modern, peluncuran toko tepat waktu sangat krusial untuk menangkap momentum promosi belanja musiman.',
    },
  },
];
