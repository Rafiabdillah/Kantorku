/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D9: Pemasaran & Penjualan - Levels & Simulation Scenarios
 */

import { CharacterId } from '../../../types';
import {
  D9_MARKETING_CONSTANTS,
  calculateCAC,
  calculateROAS,
  calculateROI,
  formatRupiah,
} from './constants';

export interface SentenceBlock {
  id: string;
  text: string;
  category: 'fakta' | 'analisis' | 'solusi' | 'penutup';
}

export interface SimulationRubric {
  empathy: number;
  clarity: number;
  professionalFirmness: number;
  ethicalSolution: number;
  total?: number;
}

export interface SimulationChoice {
  id: string;
  text: string;
  tradeoffExplanation: string;
  rubric: SimulationRubric;
  reputationImpact: number;
  feedbackTip: string;
  nextNodeId: string;
}

export interface SimulationNode {
  id: string;
  speaker: CharacterId;
  speakerName: string;
  role: string;
  text: string;
  mode: 'choice' | 'assembly' | 'reflection';
  choices?: SimulationChoice[];
  sentenceBlocks?: {
    available: SentenceBlock[];
    validOrderIds: string[][];
    rubricOnSuccess: SimulationRubric;
    explanation: string;
  };
}

export interface SimulationScenario {
  targetCharacter: {
    id: CharacterId;
    name: string;
    role: string;
  };
  startNodeId: string;
  nodes: Record<string, SimulationNode>;
  debrief: {
    keyTakeaway: string;
    realWorldLesson: string;
  };
}

export interface D9Level {
  id: string;
  domainId: 'D9';
  skillId: string;
  tier: number;
  title: string;
  subtitle: string;
  description: string;
  engine: 'advanced-quiz-engine' | 'simulation-engine';
  timeLimitSeconds: number;
  passThreshold: number;
  simulationScenario?: SimulationScenario;
}

export const D9_LEVELS: D9Level[] = [
  // LEVEL 1: Advanced Quiz Engine (STP, Buyer Persona & Bauran Pemasaran)
  {
    id: 'D9-LEVEL-01',
    domainId: 'D9',
    skillId: 'D9-SKILL-01',
    tier: 1,
    title: 'Fondasi Riset Pasar & Bauran Pemasaran (4P)',
    subtitle: 'Segmentasi pelanggan, proposisi nilai, dan formula copywriting AIDA',
    description:
      'Uji pemahaman analitis mengenai segmentasi demografis, pemetaan persona pelanggan ideal, dan penulisan naskah iklan yang mematuhi etika periklanan.',
    engine: 'advanced-quiz-engine',
    timeLimitSeconds: 300,
    passThreshold: 70,
  },

  // LEVEL 2: Simulation Engine (Penetapan Buyer Persona & Solusi Saluran Promosi)
  {
    id: 'D9-LEVEL-02',
    domainId: 'D9',
    skillId: 'D9-SKILL-01',
    tier: 2,
    title: 'Simulasi: Penyelarasan Target Audiens & Strategi 4P',
    subtitle: 'Menolak taktik clickbait dan merumuskan reposisi bauran produk',
    description:
      'Manajer Penjualan ingin memasang iklan sensasional dengan klaim berlebihan demi mengejar klik cepat. Arahkan tim kembali ke persona pelanggan yang realistis dan beretika.',
    engine: 'simulation-engine',
    timeLimitSeconds: 420,
    passThreshold: 70,
    simulationScenario: {
      targetCharacter: {
        id: 'hendra',
        name: 'Pak Hendra',
        role: 'Sales & Marketing Director',
      },
      startNodeId: 'node-start',
      nodes: {
        'node-start': {
          id: 'node-start',
          speaker: 'hendra',
          speakerName: 'Pak Hendra',
          role: 'Sales & Marketing Director',
          text: 'Budi, produk minuman herbal kita penjualannya melambat minggu ini. Saya kepikiran pasang iklan medsos dengan judul sensasional: "Minum Sekali Bebas Semua Penyakit Selamanya!". Judul begini dijamin viral dan banjir klik dalam 24 jam! Setuju?',
          mode: 'choice',
          choices: [
            {
              id: 'c1',
              text: 'Bagus sekali Pak! Mari kita pasang sekarang agar traffic situs melonjak drastis tanpa perlu riset persona lagi.',
              tradeoffExplanation:
                'Klaim palsu melanggar UU No. 8/1999 tentang Perlindungan Konsumen, merusak reputasi brand secara permanen, dan memicu tuntutan hukum.',
              rubric: { empathy: 20, clarity: 30, professionalFirmness: 10, ethicalSolution: 10 },
              reputationImpact: -4,
              feedbackTip: 'Jangan korbankan etika hukum dan integritas demi angka klik semu.',
              nextNodeId: 'node-recovery',
            },
            {
              id: 'c2',
              text: 'Iklan dengan klaim medis berlebihan melanggar UU Perlindungan Konsumen dan PP PMSE, serta berisiko membuat akun iklan kita di-banned. Mari kita fokus pada persona pekerja kantor usia 25-40 tahun yang sering pegal dan butuh minuman alami bersertifikasi BPOM dengan penawaran sampel pertama.',
              tradeoffExplanation:
                'Menjaga kepatuhan hukum, melindungi kredibilitas brand, dan mengarahkan strategi promosi pada proposisi nilai yang relevan bagi target audiens spesifik.',
              rubric: { empathy: 85, clarity: 95, professionalFirmness: 95, ethicalSolution: 95 },
              reputationImpact: 4,
              feedbackTip: 'Pendekatan sangat etis, tegas, dan berorientasi pada nilai bisnis jangka panjang.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-recovery': {
          id: 'node-recovery',
          speaker: 'hendra',
          speakerName: 'Pak Hendra',
          role: 'Sales & Marketing Director',
          text: 'Waduh, setelah saya cek ternyata klaim medis tanpa uji klinis dilarang keras oleh BPOM dan regulasi periklanan! Bagaimana kita menyusun ulang penawaran ini secara aman dan efektif?',
          mode: 'choice',
          choices: [
            {
              id: 'c-rec',
              text: 'Tenang Pak Hendra. Kita susun naskah berbasis formula AIDA yang menonjolkan manfaat nyata bahan alami lokal berizin edar resmi untuk target pekerja urban.',
              tradeoffExplanation: 'Memperbaiki langkah dengan pendekatan copywriting etis dan relevan.',
              rubric: { empathy: 80, clarity: 85, professionalFirmness: 85, ethicalSolution: 90 },
              reputationImpact: 1,
              feedbackTip: 'Langkah pemulihan yang tepat.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-assembly': {
          id: 'node-assembly',
          speaker: 'hendra',
          speakerName: 'Pak Hendra',
          role: 'Sales & Marketing Director',
          text: 'Tepat sekali. Sekarang susun arahan tertulis reposisi bauran pemasaran (4P) untuk tim kreatif dan media:',
          mode: 'assembly',
          sentenceBlocks: {
            available: [
              { id: 'b1', text: 'Menetapkan Buyer Persona spesifik yaitu pekerja aktif usia 25-40 tahun dengan kebutuhan relaksasi alami.', category: 'fakta' },
              { id: 'b2', text: 'Menyusun naskah AIDA yang menonjolkan izin resmi BPOM tanpa klaim medis berlebihan.', category: 'analisis' },
              { id: 'b3', text: 'Mendistribusikan penawaran paket bundling hemat melalui kanal digital terverifikasi dan marketplace resmi.', category: 'solusi' },
              { id: 'b4', text: 'Memantau rasio konversi harian dan kepuasan pembeli sebagai indikator keberhasilan kampanye.', category: 'penutup' },
            ],
            validOrderIds: [
              ['b1', 'b2', 'b3', 'b4'],
            ],
            rubricOnSuccess: { empathy: 95, clarity: 95, professionalFirmness: 95, ethicalSolution: 95, total: 95 },
            explanation:
              'Struktur bauran pemasaran terpadu: diawali identifikasi persona spesifik, penyusunan pesan AIDA yang beretika, pemilihan saluran distribusi yang tepercaya, dan evaluasi konversi berkelanjutan.',
          },
        },
      },
      debrief: {
        keyTakeaway:
          'Pemasaran yang hebat tidak membutuhkan kebohongan. Persona yang tajam dan proposisi nilai yang jujur membangun pelanggan loyal seumur hidup.',
        realWorldLesson:
          'Klaim palsu hanya mendatangkan pembeli sekali yang kecewa, sedangkan transparansi menciptakan advokat merek yang merekomendasikan produk secara sukarela.',
      },
    },
  },

  // LEVEL 3: Advanced Quiz Engine (Kalkulasi Metrik ROI, CAC, ROAS & LTV)
  {
    id: 'D9-LEVEL-03',
    domainId: 'D9',
    skillId: 'D9-SKILL-03',
    tier: 3,
    title: 'Analitik Kinerja Pemasaran: CAC, ROAS & ROI',
    subtitle: 'Menghitung rasio akuisisi pelanggan dan efisiensi belanja iklan digital',
    description:
      'Latihan analitis menghitung Customer Acquisition Cost (CAC), Return on Ad Spend (ROAS), dan Return on Investment (ROI) kampanye pemasaran dari set data riil.',
    engine: 'advanced-quiz-engine',
    timeLimitSeconds: 360,
    passThreshold: 80,
  },

  // LEVEL 4: Simulation Engine (Evaluasi Audit Kampanye & Realokasi Anggaran)
  {
    id: 'D9-LEVEL-04',
    domainId: 'D9',
    skillId: 'D9-SKILL-03',
    tier: 4,
    title: 'Simulasi Eksekutif: Audit Efisiensi Kampanye & Optimasi CAC',
    subtitle: 'Mengevaluasi pengembalian belanja iklan dan menyusun rekomendasi realokasi anggaran',
    description:
      'Direksi meminta pertanggungjawaban efisiensi anggaran pemasaran bulanan. Hitung CAC, ROAS, dan ROI kampanye berdasarkan data numerik resmi.',
    engine: 'simulation-engine',
    timeLimitSeconds: 480,
    passThreshold: 80,
    simulationScenario: {
      targetCharacter: {
        id: 'hendra',
        name: 'Pak Hendra',
        role: 'Sales & Marketing Director',
      },
      startNodeId: 'node-start',
      nodes: {
        'node-start': {
          id: 'node-start',
          speaker: 'hendra',
          speakerName: 'Pak Hendra',
          role: 'Sales & Marketing Director',
          text: `Budi, kita baru saja menutup kampanye peluncuran kuartal ini. Total biaya pemasaran yang kita keluarkan adalah ${formatRupiah(D9_MARKETING_CONSTANTS.totalMarketingCost)} dan berhasil mendatangkan ${D9_MARKETING_CONSTANTS.totalNewCustomersAcquired} pelanggan baru. Dari biaya itu, belanja iklan digital adalah ${formatRupiah(D9_MARKETING_CONSTANTS.adSpend)} dengan omzet atribusi ${formatRupiah(D9_MARKETING_CONSTANTS.adRevenue)}. Total omzet kotor kampanye tercatat ${formatRupiah(D9_MARKETING_CONSTANTS.totalCampaignRevenue)}. Bagaimana evaluasi efisiensi angka-angka ini?`,
          mode: 'choice',
          choices: [
            {
              id: 'c1',
              text: `Anggaran kita habis terlalu banyak, lebih baik bulan depan hentikan semua iklan digital dan pemasaran karena biayanya mencapai ${formatRupiah(D9_MARKETING_CONSTANTS.totalMarketingCost)}.`,
              tradeoffExplanation:
                'Menghentikan pemasaran tanpa menghitung rasio pengembalian (ROAS dan ROI) adalah keputusan reaktif yang mematikan pertumbuhan pendapatan usaha.',
              rubric: { empathy: 30, clarity: 40, professionalFirmness: 20, ethicalSolution: 20 },
              reputationImpact: -3,
              feedbackTip: 'Evaluasi kinerja pemasaran harus menggunakan metrik rasio yang terukur, bukan sekadar melihat nominal pengeluaran.',
              nextNodeId: 'node-recovery',
            },
            {
              id: 'c2',
              text: `Secara finansial kampanye ini sangat efisien: Belanja iklan ${formatRupiah(D9_MARKETING_CONSTANTS.adSpend)} menghasilkan omzet ${formatRupiah(D9_MARKETING_CONSTANTS.adRevenue)} sehingga ROAS = ${calculateROAS(D9_MARKETING_CONSTANTS.adRevenue, D9_MARKETING_CONSTANTS.adSpend).toFixed(1)}x (500%). Total biaya ${formatRupiah(D9_MARKETING_CONSTANTS.totalMarketingCost)} dibagi ${D9_MARKETING_CONSTANTS.totalNewCustomersAcquired} pembeli baru menghasilkan CAC = ${formatRupiah(calculateCAC(D9_MARKETING_CONSTANTS.totalMarketingCost, D9_MARKETING_CONSTANTS.totalNewCustomersAcquired))}. Dengan total omzet ${formatRupiah(D9_MARKETING_CONSTANTS.totalCampaignRevenue)}, ROI kampanye mencapai ${calculateROI(D9_MARKETING_CONSTANTS.totalCampaignRevenue, D9_MARKETING_CONSTANTS.totalMarketingCost).toFixed(0)}%. Kita harus mempertahankan kanal ini.`,
              tradeoffExplanation:
                'Analisis komprehensif berbasis data konkret membuktikan bahwa kampanye beroperasi dengan keuntungan tinggi dan efisiensi akuisisi pelanggan yang sangat sehat.',
              rubric: { empathy: 90, clarity: 95, professionalFirmness: 95, ethicalSolution: 95 },
              reputationImpact: 4,
              feedbackTip: 'Analisis berbasis metrik kuantitatif yang sangat tajam dan kredibel di hadapan direksi.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-recovery': {
          id: 'node-recovery',
          speaker: 'hendra',
          speakerName: 'Pak Hendra',
          role: 'Sales & Marketing Director',
          text: `Jika langsung dihentikan, penjualan kita akan anjlok! Coba hitung kembali rasio ROAS, CAC, dan ROI yang sebenarnya dari data tersebut.`,
          mode: 'choice',
          choices: [
            {
              id: 'c-rec',
              text: `Maaf Pak Hendra. Setelah saya hitung cermat: ROAS iklan mencapai 5.0x, CAC sebesar Rp200.000 sangat rendah dibanding LTV, dan ROI kampanye mencapai 100%. Kampanye ini sangat menguntungkan.`,
              tradeoffExplanation: 'Mengoreksi perhitungan dengan parameter finansial pemasaran yang valid.',
              rubric: { empathy: 80, clarity: 85, professionalFirmness: 85, ethicalSolution: 85 },
              reputationImpact: 1,
              feedbackTip: 'Tepat sekali, gunakan rasio keuangan pemasaran.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-assembly': {
          id: 'node-assembly',
          speaker: 'hendra',
          speakerName: 'Pak Hendra',
          role: 'Sales & Marketing Director',
          text: 'Luar biasa analitisnya! Sekarang susun rangkuman rekomendasi eksekutif untuk laporan rapat pimpinan:',
          mode: 'assembly',
          sentenceBlocks: {
            available: [
              { id: 'b1', text: `Memverifikasi belanja iklan ${formatRupiah(D9_MARKETING_CONSTANTS.adSpend)} menghasilkan omzet ${formatRupiah(D9_MARKETING_CONSTANTS.adRevenue)} dengan ROAS ${calculateROAS(D9_MARKETING_CONSTANTS.adRevenue, D9_MARKETING_CONSTANTS.adSpend).toFixed(1)}x.`, category: 'fakta' },
              { id: 'b2', text: `Mencatat CAC sebesar ${formatRupiah(calculateCAC(D9_MARKETING_CONSTANTS.totalMarketingCost, D9_MARKETING_CONSTANTS.totalNewCustomersAcquired))} dari total biaya ${formatRupiah(D9_MARKETING_CONSTANTS.totalMarketingCost)} dan ${D9_MARKETING_CONSTANTS.totalNewCustomersAcquired} pelanggan baru.`, category: 'analisis' },
              { id: 'b3', text: `Menghitung ROI kampanye mencapai ${calculateROI(D9_MARKETING_CONSTANTS.totalCampaignRevenue, D9_MARKETING_CONSTANTS.totalMarketingCost).toFixed(0)}% dengan laba kotor ${formatRupiah(D9_MARKETING_CONSTANTS.totalCampaignRevenue - D9_MARKETING_CONSTANTS.totalMarketingCost)}.`, category: 'solusi' },
              { id: 'b4', text: 'Merekomendasikan ekspansi anggaran bertahap pada kanal berkinerja tertinggi dengan menjaga stabilitas CAC.', category: 'penutup' },
            ],
            validOrderIds: [
              ['b1', 'b2', 'b3', 'b4'],
            ],
            rubricOnSuccess: { empathy: 95, clarity: 95, professionalFirmness: 95, ethicalSolution: 95, total: 95 },
            explanation: `Rekonsiliasi metrik pemasaran: Belanja iklan Rp5.000.000 menghasilkan omzet Rp25.000.000 (ROAS = 5.0x). Biaya Rp15.000.000 / 75 pelanggan = CAC Rp200.000. Total omzet Rp30.000.000 menghasilkan ROI = ((30M - 15M) / 15M) * 100% = 100%.`,
          },
        },
      },
      debrief: {
        keyTakeaway:
          'Keputusan pemasaran strategis dipandu oleh rasio efisiensi unit ekonomi (CAC, ROAS, LTV), bukan sekadar nominal biaya yang dikeluarkan.',
        realWorldLesson:
          'Pengeluaran pemasaran bukanlah beban biaya pasif, melainkan mesin pertumbuhan terukur ketika setiap rupiah belanja terbukti melipatgandakan pendapatan bersih.',
      },
    },
  },
];
