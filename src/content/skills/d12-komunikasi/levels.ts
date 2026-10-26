/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D12: Komunikasi Profesional - Levels & Practice Exercises
 */

import { EmailEditorRequirement } from '../../../components/engines/EmailEditor';
import { SimulationScenario } from '../../../components/engines/SimulationEngine';

export interface D12Level {
  id: string;
  domainId: 'D12';
  title: string;
  subtitle: string;
  tier: number;
  engine: 'email-editor' | 'simulation-engine' | 'advanced-quiz-engine';
  scenarioBrief: string;
  xpReward: number;
  coinReward: number;
  estimatedMinutes: number;
  emailConfig?: {
    initialTo: string;
    initialSubject: string;
    initialBody: string;
    initialAttachment: boolean;
    customRequirements?: EmailEditorRequirement[];
  };
  simulationScenario?: SimulationScenario;
}

export const D12_LEVELS: D12Level[] = [
  // LEVEL 1: Email Editor
  {
    id: 'D12-LEVEL-01',
    domainId: 'D12',
    title: 'Email Klarifikasi Jadwal Rapat ke Klien VIP',
    subtitle: 'Tuliskan email profesional dengan kaidah 3C (Clear, Concise, Courteous)',
    tier: 1,
    engine: 'email-editor',
    scenarioBrief:
      'Klien utama Anda, Ibu Ratna (Direktur Operasional PT Mitra Katering), meminta pengunduran jadwal presentasi proyek. Tulis email balasan formal yang menyetujui penyesuaian, mengusulkan 2 pilihan jam baru, menyertakan lampiran draf proposal yang sudah diperbarui, dan menetapkan batas konfirmasi.',
    xpReward: 120,
    coinReward: 50,
    estimatedMinutes: 8,
    emailConfig: {
      initialTo: 'ratna@mitrakatering.co.id',
      initialSubject: 'Konfirmasi Penyesuaian Jadwal Pertemuan Presentasi Proyek',
      initialBody: `Yth. Ibu Ratna,\n\nSehubungan dengan permohonan penyesuaian jadwal presentasi proyek pengadaan seragam, kami sangat memahami kepadatan agenda Ibu. Kami bermaksud mengusulkan dua alternatif waktu pengganti, yaitu:\n1. Kamis, 29 Oktober pukul 10.00 WIB\n2. Jumat, 30 Oktober pukul 14.00 WIB\n\nBersama email ini kami juga melampirkan draf revisi proposal anggaran untuk ditinjau terlebih dahulu. Mohon konfirmasi jadwal yang paling sesuai dengan waktu luang Ibu sebelum hari Rabu besok.\n\nTerima kasih atas kerja sama dan kepercayaan Ibu.\n\nHormat kami,\nBudi Pratama\nAdmin Operasional PT Maju Sejahtera`,
      initialAttachment: true,
    },
  },

  // LEVEL 2: Simulation Engine
  {
    id: 'D12-LEVEL-02',
    domainId: 'D12',
    title: 'Menyusun Respon De-Eskalasi Komplain Pelanggan',
    subtitle: 'Simulasi percakapan tanggap darurat pesanan terlambat',
    tier: 2,
    engine: 'simulation-engine',
    scenarioBrief:
      'Ibu Ratna dari PT Mitra Katering mengirim pesan komplain karena 50 paket pesanan bahan makanan belum tiba di dapurnya padahal acara makan siang dimulai 2 jam lagi. Bantu tim de-eskalasi emosi dan susun respon yang solutif.',
    xpReward: 150,
    coinReward: 60,
    estimatedMinutes: 10,
    simulationScenario: {
      id: 'scen-d12-02',
      title: 'De-Eskalasi Komplain Pengiriman Katering Bu Ratna',
      scenarioContext:
        'Paket pesanan bahan katering tersendat akibat kendala armada transit. Bu Ratna sangat cemas dan marah karena reputasi kateringnya terancam.',
      targetCharacter: {
        id: 'klien',
        name: 'Ibu Ratna',
        role: 'Direktur PT Mitra Katering (Klien VIP)',
      },
      startNodeId: 'node-start',
      nodes: {
        'node-start': {
          id: 'node-start',
          speaker: 'klien',
          speakerName: 'Ibu Ratna',
          role: 'Klien VIP',
          text: 'Halo! Tolong ya! Pesanan 50 paket daging olahan untuk makan siang belum sampai sekarang! Tamu kami datang jam 12.00 WIB! Kenapa tidak ada kabar sama sekali dari pihak kalian?!',
          mode: 'choice',
          choices: [
            {
              id: 'c1',
              text: 'Selamat siang Bu Ratna. Mohon maaf atas keterlambatan ini, kurir ekspedisi pihak ketiga kami yang bermasalah di jalan jadi kami juga tidak bisa berbuat banyak.',
              tradeoffExplanation:
                'Pilihan ini melemparkan tanggung jawab ke pihak ketiga dan terdengar defensif. Klien akan semakin jengkel.',
              rubric: { empathy: 30, clarity: 50, professionalFirmness: 40, ethicalSolution: 30 },
              feedbackTip: 'Hindari menyalahkan kurir sepihak saat klien sedang panik.',
              nextNodeId: 'node-angry',
            },
            {
              id: 'c2',
              text: 'Selamat siang Ibu Ratna. Kami sangat memahami kepanikan Ibu karena acara makan siang dimulai sebentar lagi. Kami mohon maaf sebesar-besarnya. Izinkan kami memeriksa posisi armada prioritas detik ini juga dan memberikan solusi darurat dalam 5 menit.',
              tradeoffExplanation:
                'Pendekatan H.E.A.T: memvalidasi kecemasan klien, meminta maaf atas kendala, dan memberi komitmen waktu cek yang sangat singkat.',
              rubric: { empathy: 95, clarity: 90, professionalFirmness: 85, ethicalSolution: 95 },
              feedbackTip: 'Respon awal yang sangat tepat dan meredakan emosi.',
              nextNodeId: 'node-solution-assembly',
            },
          ],
        },
        'node-angry': {
          id: 'node-angry',
          speaker: 'klien',
          speakerName: 'Ibu Ratna',
          role: 'Klien VIP',
          text: 'Saya tidak mau tahu urusan kurir Anda! Kontrak saya dengan kantor Anda! Kalau sampai terlambat, saya minta ganti rugi penuh dan batalkan semua pesanan bulan depan!',
          mode: 'choice',
          choices: [
            {
              id: 'c-calm',
              text: 'Kami sangat memahami hak Ibu. Kami bertanggung jawab penuh atas komitmen ini. Armada bantuan terdekat kami sudah mengalihkan rute langsung ke dapur Ibu sekarang juga.',
              tradeoffExplanation: 'Menyelamatkan situasi dengan mengakui akuntabilitas kontrak.',
              rubric: { empathy: 85, clarity: 85, professionalFirmness: 80, ethicalSolution: 90 },
              feedbackTip: 'Bagus, mengambil alih tanggung jawab meredakan ancaman pembatalan kontrak.',
              nextNodeId: 'node-solution-assembly',
            },
          ],
        },
        'node-solution-assembly': {
          id: 'node-solution-assembly',
          speaker: 'klien',
          speakerName: 'Ibu Ratna',
          role: 'Klien VIP',
          text: 'Baik, saya pegang janji Anda. Jadi bagaimana sekarang solusi konkretnya agar bahan sampai sebelum pukul 11.15 WIB?',
          mode: 'assembly',
          sentenceBlocks: {
            available: [
              { id: 'b1', text: 'Ibu Ratna, armada darurat kami saat ini sudah berada 3 km dari lokasi dapur Ibu.', category: 'fakta' },
              { id: 'b2', text: 'Kurir khusus kami pastikan tiba paling lambat pukul 11.05 WIB dengan kondisi bahan segar.', category: 'solusi' },
              { id: 'b3', text: 'Sebagai bentuk kompensasi atas ketidaknyamanan ini, biaya ongkos kirim hari ini kami gratiskan penuh.', category: 'solusi' },
              { id: 'b4', text: 'Saya pribadi akan mengawal panggilan telepon sampai kurir menyerahkan barang ke chef Ibu.', category: 'penutup' },
            ],
            validOrderIds: [
              ['b1', 'b2', 'b3', 'b4'],
              ['b1', 'b2', 'b4', 'b3'],
            ],
            rubricOnSuccess: { empathy: 95, clarity: 95, professionalFirmness: 90, ethicalSolution: 95, total: 94 },
            explanation:
              'Urutan fakta posisi armada -> kepastian jam tiba -> kompensasi -> pengawalan personal adalah standar de-eskalasi kelas eksekutif.',
          },
        },
      },
      debrief: {
        keyTakeaway:
          'Klien yang sedang emosional tidak butuh alasan teknis mengapa masalah terjadi. Mereka membutuhkan validasi empati, kepastian jam tiba, dan bukti bahwa seseorang mengawal masalah mereka secara nyata.',
        realWorldLesson:
          'Mengakui tanggung jawab kemitraan dan menawarkan kompensasi kecil (seperti potongan ongkir) terbukti menjaga retensi pelanggan hingga 85% lebih tinggi dibanding bersikap defensif.',
      },
    },
  },

  // LEVEL 3: Advanced Quiz Engine
  {
    id: 'D12-LEVEL-03',
    domainId: 'D12',
    title: 'Deteksi Red Flag & Etiket Pesan Kerja',
    subtitle: 'Uji analitis urutan eskalasi, klasifikasi nada bicara, dan identifikasi pesan phishing',
    tier: 3,
    engine: 'advanced-quiz-engine',
    scenarioBrief:
      'Selesaikan 4 tantangan analitis komunikasi: urutan piramida memo eskalasi, pencocokan saluran komunikasi, deteksi domain email mencurigakan, dan identifikasi pelanggaran privasi internal.',
    xpReward: 180,
    coinReward: 70,
    estimatedMinutes: 12,
  },
];
