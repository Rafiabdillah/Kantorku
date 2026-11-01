/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D7: Keuangan Pribadi & Wirausaha - Case File v2
 */

import { CaseFile } from '../../../types';

export const D7_CASES: CaseFile[] = [
  {
    id: 'case-d7-01',
    code: 'D7-C1',
    title: 'Perencanaan Modal Awal & Penetapan Harga Usaha Kedai Makanan',
    industry: 'Kuliner & Usaha Mikro',
    tier: 2,
    scale: 'mikro',
    businessFunction: 'Perencanaan Modal Usaha & Keuangan Pribadi',
    module: 'excel',
    channel: 'whatsapp',
    deadlineHours: 6,
    estimatedMinutes: 20,
    clientName: 'Kedai Sarapan Pagi Berkah',
    character: 'reza',
    tags: ['keuangan-pribadi', 'bmc', 'hpp', 'umkm', 'bep'],
    modules: ['excel', 'word'],
    requires: ['advanced-quiz-engine'],
    summary:
      'Calon wirausahawan ingin membuka kedai sarapan dengan modal tabungan pribadi. Susun kalkulasi HPP bahan baku per porsi, tentukan margin keuntungan sehat, hitung titik impas (BEP), dan rancang alokasi kas darurat usaha.',
    stakeholders: [
      {
        nama: 'Pak Reza',
        peran: 'Finance & Accounting Lead',
        kepentingan: 'Memastikan kalkulasi modal dan titik impas tidak mengabaikan biaya operasional tak terduga.',
        gayaBicara: 'Perfeksionis, sangat teliti hingga dua angka di belakang koma.',
      },
      {
        nama: 'Dimas',
        peran: 'Senior Admin & Rekan Usaha',
        kepentingan: 'Membantu penyusunan daftar belanja bahan agar efisien dan tidak terjadi pemborosan.',
        gayaBicara: 'Ceria, santai, selalu siap sedia kasih tips trik jalan pintas.',
      },
    ],
    timeline: [
      { hour: 1, event: 'Pencatatan daftar belanja bahan baku beras, telur, bumbu dapur, dan kemasan ramah lingkungan.' },
      { hour: 3, event: 'Penghitungan alokasi sewa tempat dan biaya gas per hari untuk dimasukkan ke biaya overhead.' },
      { hour: 5, event: 'Penetapan harga jual paket sarapan dan simulasi skenario penjualan sepi vs ramai.' },
    ],
    attachments: [
      {
        type: 'lembar-excel',
        name: 'daftar_harga_bahan_baku_pasar.csv',
        description: 'Tabel daftar harga belanja pasar tradisional untuk 100 porsi menu sarapan.',
      },
    ],
    dataPack: {
      generatorRef: 'culinary-startup-budget-gen',
      variantsCount: 3,
      anomalies: [
        'Biaya kemasan belum dimasukkan ke dalam perhitungan HPP per porsi',
        'Penetapan harga jual awal menghasilkan margin minus jika volume di bawah 30 porsi',
      ],
    },
    deliverables: [
      {
        name: 'Lembar Rencana Anggaran & Penetapan Harga Jual',
        module: 'excel',
        specification: 'Tabel kalkulasi HPP per porsi, target margin laba 35%, dan titik impas BEP dalam unit harian.',
        requiredElements: ['HPP Bahan Baku', 'Biaya Kemasan', 'Biaya Overhead', 'Harga Jual Rekomendasi', 'BEP Unit'],
      },
    ],
    decisionPoints: [
      {
        title: 'Penetapan Strategi Harga Jual Sarapan',
        scenario: 'Total HPP riil adalah Rp 12.000 per porsi. Pesaing menjual dengan harga Rp 13.000 dengan porsi lebih sedikit.',
        options: [
          {
            label: 'Jual Rp 12.500 agar lebih murah dari pesaing',
            impact: 'Margin terlalu tipis (Rp 500 per porsi) membuat usaha rentan gulung tikar saat harga cabai naik.',
            isOptimal: false,
          },
          {
            label: 'Jual Rp 16.000 dengan menonjolkan higienitas dan porsi kenyang (Margin 25%)',
            impact: 'Pilihan sehat: Memiliki bantalan laba cukup untuk menutupi biaya operasional dan menjaga keberlanjutan usaha.',
            isOptimal: true,
          },
        ],
      },
    ],
    scopeChanges: [
      {
        hour: 3,
        description: 'Harga telur di pasar naik 10% pada hari pelaksanaan.',
        impact: 'Menyesuaikan formula HPP agar otomatis menghitung ulang margin tanpa mengubah struktur tabel.',
      },
    ],
    handover: {
      summary: 'Perencanaan HPP dan titik impas kedai telah selesai dengan skenario harga berkelanjutan.',
      assumptions: ['Target penjualan minimal 40 porsi per hari untuk mencapai titik impas operasional.'],
      precautions: ['Pisahkan rekening tabungan pribadi dengan kas belanja kedai sejak hari pertama beroperasi.'],
      nextSteps: ['Daftarkan NIB secara daring melalui portal resmi pemerintah.'],
    },
    pitfalls: ['Menentukan harga jual hanya berdasarkan harga beli bahan tanpa menghitung biaya kemasan dan gas.'],
    linkedLessons: ['D7-LES-01', 'D7-LES-02'],
    templatesUnlocked: ['Template Kalkulator HPP & BEP Usaha Kuliner', 'Lembar 9 Blok BMC'],
    modifiers: ['Simulasi Usaha Mikro', 'Bahan Baku Fluktuatif'],
    referenceSolutions: [
      'Menghitung total biaya bahan per porsi, menambahkan biaya kemasan dan alokasi energi, menetapkan margin 25-35%, dan menentukan volume BEP minimal.',
      'Menyusun model biaya terstruktur: HPP = Bahan + Kemasan + Overhead; Harga Jual = HPP / (1 - Margin Target); BEP Unit = Biaya Tetap / (Harga - Biaya Variabel).',
    ],
    emails: [
      {
        from: 'reza@majusejahtera.co.id',
        subject: 'Konsultasi Model Usaha & Penetapan Harga Kedai',
        timestamp: '10:00 WIB',
        body: 'Budi, untuk latihan analisis usaha mikro, tolong bantu hitungkan HPP riil dan margin aman untuk draf kedai sarapan ini. Jangan lupa pisahkan pos biaya tetap dan biaya variabelnya.',
      },
    ],
    chats: [
      {
        sender: 'Dimas',
        time: '10:15',
        message: 'Bro Budi, kemasan kardus ramah lingkungan itu harganya Rp 1.500 per pcs, wajib dimasukin ke HPP ya biar nggak boncos.',
      },
    ],
    voiceNotes: [],
    clarifyingQuestions: [
      {
        id: 'cq-1',
        question: 'Berapa hari kerja operasional kedai dalam sebulan?',
        options: [
          {
            id: 'opt-a',
            text: 'Kedai beroperasi 26 hari dalam sebulan (libur hari Minggu).',
            isOptimal: true,
            bossResponse: 'Bagus, itu dasar perhitungan biaya sewa harian dan target omzet.',
          },
          {
            id: 'opt-b',
            text: 'Hitung saja 30 hari penuh tanpa libur.',
            isOptimal: false,
            bossResponse: 'Kurang realistis untuk tenaga kerja mandiri dan rentan kelelahan.',
          },
        ],
      },
    ],
    initialData: {},
    reputationReward: 15,
    xpReward: 200,
    coinsReward: 80,
    mentorDebrief: {
      keyTakeaway: 'Perhitungan HPP komprehensif hingga memasukkan komponen kemasan menjaga kelangsungan bisnis kuliner.',
      pitfallAvoided: 'Menghindari penetapan harga di bawah biaya produksi riil yang menyebabkan kerugian tersembunyi.',
      industryContext: 'Banyak UMKM kuliner gagal karena tidak memperhitungkan biaya overhead dan kenaikan musiman bahan pokok.',
    },
  },
];
