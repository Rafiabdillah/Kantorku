/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D9: Pemasaran & Penjualan - Case File
 */

import { CaseFile } from '../../../types';
import {
  D9_MARKETING_CONSTANTS,
  calculateCAC,
  calculateROAS,
  calculateROI,
  formatRupiah,
} from './constants';

export const D9_CASES: CaseFile[] = [
  {
    id: 'case-d9-01',
    code: 'D9-C1',
    title: 'Audit Kampanye Pemasaran Digital, Optimasi CAC & Bauran Produk 4P',
    industry: 'F&B & Ritel Minuman Sehat Herbal',
    tier: 3,
    scale: 'menengah',
    businessFunction: 'Pemasaran & Penjualan Digital',
    module: 'excel',
    channel: 'email',
    deadlineHours: 8,
    estimatedMinutes: 25,
    clientName: 'PT Aroma Herbal Nusantara',
    character: 'hendra',
    tags: ['pemasaran', 'cac', 'roas', 'roi', '4p', 'aida', 'etika-iklan'],
    modules: ['excel', 'word'],
    requires: ['advanced-quiz-engine'],
    summary:
      'Evaluasi menyeluruh terhadap efisiensi anggaran kampanye pemasaran kuartalan, perhitungan rasio CAC, ROAS, dan ROI, serta pembersihan materi iklan dari klaim berlebihan sesuai UU Perlindungan Konsumen.',
    stakeholders: [
      {
        nama: 'Pak Hendra',
        peran: 'Sales & Marketing Director',
        kepentingan: 'Membuktikan efisiensi anggaran belanja iklan digital dan meningkatkan rasio konversi penjualan.',
        gayaBicara: 'Enerjik, fokus pada metrik pertumbuhan, namun butuh pengingat kepatuhan hukum periklanan.',
      },
      {
        nama: 'Bu Sari',
        peran: 'Direktur Operasional',
        kepentingan: 'Menjaga agar biaya akuisisi pelanggan (CAC) tetap sehat dan sejalan dengan marjin keuntungan usaha.',
        gayaBicara: 'Kritis, teliti memeriksa alokasi biaya nyata dan keberlanjutan unit ekonomi.',
      },
    ],
    timeline: [
      { hour: 1, event: 'Penarikan data belanja iklan digital dan total biaya operasional pemasaran bulanan.' },
      { hour: 3, event: 'Penghitungan metrik CAC, ROAS, ROI, dan rasio konversi funnel penjualan.' },
      { hour: 6, event: 'Penyusunan naskah penawaran AIDA beretika dan rencana realokasi anggaran ke kanal berkinerja tertinggi.' },
    ],
    attachments: [
      {
        type: 'lembar-excel',
        name: 'rekap_anggaran_dan_atribusi_penjualan_q3.xlsx',
        description: 'Tabel belanja iklan berbayar, rekap biaya tim, dan data transaksi pelanggan baru.',
      },
    ],
    dataPack: {
      generatorRef: 'marketing-audit-data-gen',
      variantsCount: 3,
      anomalies: [
        `CAC tim media salah hitung: tercatat Rp50.000 padahal riil ${formatRupiah(calculateCAC(D9_MARKETING_CONSTANTS.totalMarketingCost, D9_MARKETING_CONSTANTS.totalNewCustomersAcquired))}`,
        'Materi iklan lama memuat klaim medis berlebihan tanpa sertifikasi klinis resmi',
        'Alokasi anggaran influencer tidak menghasilkan konversi penjualan yang memadai (ROAS hanya 1.2x)',
      ],
    },
    deliverables: [
      {
        name: 'Dasbor Analitik Metrik Pemasaran (CAC, ROAS & ROI)',
        module: 'excel',
        specification: 'Kalkulasi resmi CAC per pelanggan baru, ROAS per kanal iklan, dan ROI kampanye menyeluruh.',
        requiredElements: ['Total biaya pemasaran', 'CAC riil', 'ROAS per kanal', 'ROI kampanye', 'Rasio LTV/CAC'],
      },
      {
        name: 'Rencana Aksi Bauran Pemasaran (4P) & Naskah AIDA Beretika',
        module: 'word',
        specification: 'Penyelarasan target Buyer Persona, naskah promosi AIDA tanpa klaim palsu, dan jadwal kalender konten.',
        requiredElements: ['Buyer Persona', 'Unique Value Proposition', 'Naskah AIDA', 'Kepatuhan UU Perlindungan Konsumen'],
      },
    ],
    handover: {
      summary: 'Dasbor efisiensi pemasaran dan pedoman promosi AIDA berhasil disusun dengan metrik terverifikasi.',
      assumptions: ['Data transaksi kasir dan platform iklan terintegrasi melalui pelacakan UTM yang akurat.'],
      precautions: ['Pastikan seluruh materi promosi tidak menggunakan klaim kesehatan tanpa izin BPOM.'],
      nextSteps: ['Alokasikan 70% anggaran belanja iklan ke kanal Meta Ads dengan ROAS 5.0x dan evaluasi mingguan.'],
    },
    pitfalls: ['Menilai keberhasilan kampanye hanya dari vanity metrics (impresi/likes) tanpa menghitung konversi kas riil.'],
    referenceSolutions: ['Dasbor Analitik Metrik Pemasaran', 'Rencana Aksi Bauran 4P & Naskah AIDA'],
    emails: [
      {
        from: 'hendra@majusejahtera.co.id',
        subject: 'Audit Kampanye Pemasaran Q3 & Penyiapan Laporan Direksi',
        timestamp: '09:00 WIB',
        body: `Budi, tolong bantu hitung ulang angka efisiensi kampanye kita. Total biaya pemasaran kita ${formatRupiah(D9_MARKETING_CONSTANTS.totalMarketingCost)} menghasilkan ${D9_MARKETING_CONSTANTS.totalNewCustomersAcquired} pembeli baru. Belanja iklan digital ${formatRupiah(D9_MARKETING_CONSTANTS.adSpend)} mendatangkan omzet ${formatRupiah(D9_MARKETING_CONSTANTS.adRevenue)}. Hitung CAC, ROAS, dan ROI yang benar agar direksi puas.`,
      },
    ],
    chats: [
      {
        sender: 'Pak Hendra',
        time: '09:15',
        message: 'Budi, perhatikan etika naskah promosi ya. Jangan sampai ada klaim superlatif yang melanggar aturan perlindungan konsumen.',
      },
    ],
    voiceNotes: [],
    clarifyingQuestions: [
      {
        id: 'cq-d9-1',
        question: 'Bagaimana langkah evaluasi terbaik bila suatu saluran iklan memiliki ROAS tinggi tetapi volume impresinya rendah?',
        options: [
          {
            id: 'opt-a',
            text: 'Tingkatkan anggaran saluran tersebut secara bertahap sambil terus memantau apakah ROAS dan CAC tetap stabil (skalabilitas terkontrol).',
            isOptimal: true,
            bossResponse: 'Tepat sekali! Penskalaan bertahap menjaga efisiensi biaya akuisisi tanpa memicu saturasi audiens.',
          },
          {
            id: 'opt-b',
            text: 'Langsung gandakan anggaran 10 kali lipat dalam satu hari.',
            isOptimal: false,
            bossResponse: 'Keliru! Lonjakan anggaran drastis membuat algoritma iklan bingung dan merusak efisiensi biaya secara cepat.',
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
        'Pemasaran yang berkelanjutan memadukan kecerdasan data (CAC, ROAS, ROI) dengan kekuatan empati pesan yang mematuhi hukum perlindungan konsumen.',
      pitfallAvoided:
        'Mencegah pemborosan anggaran pada metrik semu serta menghindari tuntutan hukum akibat klaim iklan palsu.',
      industryContext:
        'Di era persaingan digital ketat, bisnis yang menang adalah yang menguasai efisiensi biaya akuisisi dan mampu menjaga loyalitas pelanggan seumur hidup.',
    },
  },
];
