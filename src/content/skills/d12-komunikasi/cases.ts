/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D12: Komunikasi Profesional - Case Study
 * Case ID: case-d12-01 "Krisis Komunikasi Pengiriman Terlambat PT Mitra Express"
 */

import { CaseFile } from '../../../types';

export const D12_CASES: CaseFile[] = [
  {
    id: 'case-d12-01',
    title: 'Krisis Komunikasi Pengiriman Terlambat PT Mitra Express',
    industry: 'Logistik & Distribusi Makanan',
    tier: 3,
    module: 'word',
    channel: 'email',
    deadlineHours: 4,
    clientName: 'PT Mitra Katering Nusantara',
    character: 'maya',
    summary:
      'Terjadi mogok armada lokal di jalur distribusi utama yang menyebabkan pesanan bahan katering untuk 300 porsi acara pernikahan tertahan. Tangani komunikasi krisis ke klien dengan mengirim surat klarifikasi resmi, negosiasi penyesuaian jadwal pengantaran darurat, dan ringkasan notulen eskalasi internal.',
    emails: [
      {
        from: 'ratna@mitrakatering.co.id',
        subject: 'URGENT: Pesanan Bahan Baku Pesta Belum Tiba!',
        timestamp: '08:30 WIB',
        body: 'Yth. Manajemen PT Maju Sejahtera,\n\nKami sangat kecewa. Hingga pagi ini pukul 08.30 WIB armada pengantaran belum tiba di lokasi katering kami di Tebet. Padahal acara makan siang dimulai pukul 11.30 WIB.\n\nJika bahan tidak tiba sebelum pukul 10.00 WIB, katering kami gagal melayani pesta pernikahan ini. Kami menuntut kepastian dan pertanggungjawaban sekarang juga!\n\nRatna Kusumawardhani\nDirektur Operasional PT Mitra Katering Nusantara',
      },
      {
        from: 'hendra@majusejahtera.co.id',
        subject: 'Instruksi Penanganan Krisis Klien Mitra Katering',
        timestamp: '08:45 WIB',
        body: 'Budi, tolong tangani komunikasi ke Bu Ratna detik ini juga. Hubungi tim gudang, gunakan armada pick-up cadangan internal kita dari cabang terdekat untuk langsung mengantar pasokan darurat. Tulis email resmi dengan empati tinggi, jangan menyalahkan pihak kurir, dan tawarkan kompensasi potongan harga 15% atas ketidaknyamanan ini.',
      },
    ],
    chats: [
      {
        sender: 'Dimas (Gudang)',
        time: '08:50',
        message: 'Budi, pick-up cadangan sudah dimuat dengan 50 kg daging dan bahan segar. Berangkat dari gudang Cawang pukul 09.00 WIB, estimasi tiba di Tebet paling lambat 09.35 WIB.',
      },
      {
        sender: 'Sari (Admin)',
        time: '08:52',
        message: 'Pastikan surat jalan darurat dan faktur revisi terlampir di email Bu Ratna ya.',
      },
    ],
    clarifyingQuestions: [
      {
        id: 'cq-1',
        question: 'Bagaimana pendekatan komunikasi pertama yang harus disampaikan ke Bu Ratna?',
        options: [
          {
            id: 'opt-a',
            text: 'Menjelaskan bahwa ekspedisi pihak ketiga sedang mogok sehingga wajar jika ada keterlambatan di luar kendali.',
            isOptimal: false,
            bossResponse: 'Itu terdengar defensif dan menyalahkan pihak lain! Klien tidak peduli alasan kurir.',
          },
          {
            id: 'opt-b',
            text: 'Menyampaikan permohonan maaf tulus, mengonfirmasi bahwa armada darurat internal sudah jalan pukul 09.00 WIB dan tiba pukul 09.35 WIB, serta memberikan kontak langsung sopir.',
            isOptimal: true,
            bossResponse: 'Sangat tepat! Klien membutuhkan kepastian jam tiba dan bukti tindakan nyata.',
          },
        ],
      },
    ],
    initialData: {
      word: `<h1>SURAT TANGGAPAN RESMI DAN KLARIFIKASI PENGANTARAN DARURAT</h1><p><strong>Nomor:</strong> 112/DIR-OPS/MS/X/2026</p><p><strong>Kepada Yth:</strong><br>Ibu Ratna Kusumawardhani<br>Direktur Operasional PT Mitra Katering Nusantara</p><p>Dengan hormat,</p><p>Sehubungan dengan kendala keterlambatan pengantaran bahan baku pesanan nomor #PO-8821 pada pagi hari ini, kami atas nama segenap manajemen PT Maju Sejahtera menyampaikan permohonan maaf yang sebesar-besarnya atas ketidaknyamanan serta kecemasan yang dialami oleh pihak Ibu.</p><p>Sebagai bentuk tanggung jawab penuh dan komitmen pelayanan prima kami, kami telah mengambil langkah darurat operasional sebagai berikut:</p><ul><li>Armada pick-up cadangan internal kami telah diberangkatkan dari fasilitas Cawang pada pukul 09.00 WIB dengan membawa seluruh pesanan bahan baku lengkap dalam kondisi segar dan tersegel.</li><li>Estimasi waktu kedatangan di lokasi dapur Tebet adalah pukul 09.35 WIB (sebelum batas waktu krusial pukul 10.00 WIB).</li><li>Seluruh biaya pengiriman hari ini digratiskan dan kami memberikan potongan kompensasi khusus sebesar 15% pada invoice tagihan berjalan.</li></ul><p>Demikian surat klarifikasi ini kami sampaikan. Kami akan terus mendampingi komunikasi hingga pesanan diterima dengan sempurna oleh tim chef Ibu.</p><p>Hormat kami,<br><strong>Budi Pratama</strong><br>Manajemen Operasional PT Maju Sejahtera</p>`,
    },
    referenceSolutions: ['SURAT TANGGAPAN RESMI', '09.35 WIB', 'potongan kompensasi'],
    reputationReward: 15,
    xpReward: 350,
    coinsReward: 150,
    mentorDebrief: {
      keyTakeaway:
        'Krisis reputasi dapat diubah menjadi loyalitas jangka panjang bila ditangani dengan kecepatan respon, empati mendalam, transparansi fakta, dan kompensasi nyata.',
      pitfallAvoided:
        'Menghindari sikap defensif yang menyalahkan pihak ketiga dan menghindari keterlambatan memberi kabar.',
      industryContext:
        'Dalam industri rantai pasok katering dan makanan, keterlambatan 30 menit dapat merusak reputasi acara ratusan orang, sehingga komunikasi darurat membutuhkan presisi jam dan garansi nyata.',
    },
  },
];
