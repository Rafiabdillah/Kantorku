/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D6: Akuntansi & Keuangan Usaha - Case File
 */

import { CaseFile } from '../../../types';

export const D6_CASES: CaseFile[] = [
  {
    id: 'case-d6-01',
    code: 'D6-C1',
    title: 'Audit Jurnal Pembukuan, Rekonsiliasi Bank & Penentuan HPP SAK EMKM',
    industry: 'Perdagangan & Distribusi Ritel',
    tier: 3,
    scale: 'menengah',
    businessFunction: 'Akuntansi & Perpajakan Usaha',
    module: 'excel',
    channel: 'email',
    deadlineHours: 8,
    estimatedMinutes: 25,
    clientName: 'CV Berkah Niaga Sentosa',
    character: 'reza',
    tags: ['akuntansi', 'rekonsiliasi', 'hpp', 'sak-emkm', 'jurnal', 'laba-rugi'],
    modules: ['excel', 'word'],
    requires: ['advanced-quiz-engine'],
    summary:
      'Laporan keuangan usaha mengalami ketidakseimbangan akibat selisih kas bank, pencatatan prive pemilik yang keliru masuk ke beban usaha, dan kesalahan perhitungan HPP. Tuntaskan rekonsiliasi dan laporan laba rugi terpadu.',
    stakeholders: [
      {
        nama: 'Pak Reza',
        peran: 'Finance Manager',
        kepentingan: 'Memastikan seluruh pos akun mematuhi standar SAK EMKM dan saldo kas bank terbukti akurat.',
        gayaBicara: 'Presisi, teliti, mengutamakan validitas bukti transaksi formal.',
      },
      {
        nama: 'Bu Sari',
        peran: 'Direktur Operasional',
        kepentingan: 'Melihat laporan laba kotor dan laba bersih riil untuk menentukan rencana ekspansi toko.',
        gayaBicara: 'Tegas, menginginkan transparansi angka keuangan tanpa manipulasi.',
      },
    ],
    timeline: [
      { hour: 1, event: 'Penemuan selisih kas bank Rp3.500.000 antara buku kas dan rekening koran.' },
      { hour: 3, event: 'Audit bukti fisik kuitansi belanja gudang dan nota faktur pembelian barang dagang kredit.' },
      { hour: 6, event: 'Penyusunan ayat jurnal penyesuaian, perhitungan HPP, dan laporan laba rugi terpadu.' },
    ],
    attachments: [
      {
        type: 'lembar-excel',
        name: 'rekening_koran_dan_buku_kas_oktober.xlsx',
        description: 'Lembar kerja rekonsiliasi saldo kas bank, faktur pembelian, dan stok opname.',
      },
    ],
    dataPack: {
      generatorRef: 'accounting-audit-data-gen',
      variantsCount: 3,
      anomalies: [
        'Setoran dalam perjalanan Rp3.450.000 belum tercatat di rekening koran bank',
        'Prive pemilik toko salah dicatat sebagai beban operasional toko',
      ],
    },
    deliverables: [
      {
        name: 'Lembar Rekonsiliasi Bank & Jurnal Penyesuaian',
        module: 'excel',
        specification: 'Pencocokan saldo kas pembukuan dan saldo bank hingga mencapai saldo kas disesuaikan yang seimbang.',
        requiredElements: ['Saldo kas bank', 'Setoran dalam perjalanan', 'Beban administrasi bank', 'Jurnal penyesuaian'],
      },
      {
        name: 'Laporan Laba Rugi Berjenjang & HPP SAK EMKM',
        module: 'excel',
        specification: 'Kalkulasi HPP, Laba Kotor, Rincian Beban Operasional, dan Laba Bersih Usaha.',
        requiredElements: ['HPP', 'Laba kotor', 'Beban operasional', 'Laba bersih', 'Pemisahan prive'],
      },
    ],
    handover: {
      summary: 'Rekonsiliasi bank dan laporan laba rugi terpadu berhasil diselesaikan dengan saldo kas terverifikasi.',
      assumptions: ['Semua bukti transaksi kas masuk dan keluar telah diinput ke sistem kasir.'],
      precautions: ['Pastikan akun Prive selalu dipisahkan dari pos beban operasional toko.'],
      nextSteps: ['Lakukan rekonsiliasi kas bank rutin setiap pekan untuk mendeteksi anomali lebih awal.'],
    },
    pitfalls: ['Mencampuradukkan pengeluaran belanja pribadi pemilik dengan beban operasional usaha.'],
    referenceSolutions: ['Lembar Rekonsiliasi Bank', 'Laporan Laba Rugi Berjenjang'],
    emails: [
      {
        from: 'reza@majusejahtera.co.id',
        subject: 'URGENT: Selisih Kas Bank & Penyiapan Laporan Keuangan Bulanan',
        timestamp: '08:45 WIB',
        body: 'Budi, buku kas kita berselisih dengan rekening koran bank per akhir bulan kemarin. Tolong bantu rekonsiliasi kedua sisi dan pastikan transaksi belanja pribadi pemilik dipisahkan ke akun Prive.',
      },
    ],
    chats: [
      {
        sender: 'Pak Reza',
        time: '09:00',
        message: 'Budi, ingat rumus HPP ya: Persediaan Awal + Pembelian Bersih - Persediaan Akhir. Jangan sampai salah memasukkan retur pembelian.',
      },
    ],
    voiceNotes: [],
    clarifyingQuestions: [
      {
        id: 'cq-d6-1',
        question: 'Bagaimana perlakuan akuntansi yang benar atas penarikan kas oleh pemilik toko untuk keperluan belanja pribadi?',
        options: [
          {
            id: 'opt-a',
            text: 'Dicatat ke akun Prive (Drawings) yang mengurangi ekuitas modal pemilik, bukan sebagai beban operasional toko.',
            isOptimal: true,
            bossResponse: 'Tepat sekali! Prinsip entitas ekonomi terpisah SAK EMKM melarang mencampuradukkan kas pribadi dengan beban usaha.',
          },
          {
            id: 'opt-b',
            text: 'Dicatat sebagai beban operasional toko agar laba terlihat kecil.',
            isOptimal: false,
            bossResponse: 'Salah fatal! Mencatat prive sebagai beban toko melanggar standar akuntansi dan aturan perpajakan.',
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
        'Kerapian akuntansi bertumpu pada disiplin rekonsiliasi kas, ketepatan formula HPP, dan kepatuhan prinsip entitas bisnis terpisah SAK EMKM.',
      pitfallAvoided:
        'Menghindari manipulasi beban operasional lewat pos prive pribadi serta menghindari selisih kas tanpa rekonsiliasi bank.',
      industryContext:
        'Bagi UMKM dan ritel berkembang, laporan keuangan yang tertib SAK EMKM merupakan syarat mutlak untuk memperoleh fasilitas permodalan perbankan.',
    },
  },
];
