/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D8: Operasional & Rantai Pasok - Levels & Simulation Scenarios
 */

import { CharacterId } from '../../../types';
import {
  D8_INVENTORY_CONSTANTS,
  calculateEOQ,
  calculateDailyDemand,
  calculateSafetyStock,
  calculateROP,
  calculateOrderFrequency,
  formatRupiahD8,
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

export interface D8Level {
  id: string;
  domainId: 'D8';
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

export const D8_LEVELS: D8Level[] = [
  // LEVEL 1: Advanced Quiz Engine (Model EOQ, ROP & K3 Pergudangan)
  {
    id: 'D8-LEVEL-01',
    domainId: 'D8',
    skillId: 'D8-SKILL-01',
    tier: 1,
    title: 'Fondasi Manajemen Persediaan & Standar Pergudangan',
    subtitle: 'Memahami konsep EOQ, titik pesan ulang, dan tata letak penyimpanan FIFO',
    description:
      'Latihan analitis menghitung trade-off biaya pemesanan dan penyimpanan, penentuan stok pengaman, dan penerapan prosedur penerimaan barang.',
    engine: 'advanced-quiz-engine',
    timeLimitSeconds: 300,
    passThreshold: 70,
  },

  // LEVEL 2: Simulation Engine (Negosiasi Lead Time & Penegakan SLA Pemasok)
  {
    id: 'D8-LEVEL-02',
    domainId: 'D8',
    skillId: 'D8-SKILL-02',
    tier: 2,
    title: 'Simulasi: Negosiasi Service Level Agreement (SLA) Vendor Kritis',
    subtitle: 'Menangani keterlambatan pasokan berulang dan merumuskan kontrak SLA berpenalti',
    description:
      'Pemasok bahan baku utama terlambat mengirimkan barang hingga 5 hari dan merusak jadwal perakitan. Pimpin negosiasi pemendekan lead time dan penegakan SLA bermutu.',
    engine: 'simulation-engine',
    timeLimitSeconds: 420,
    passThreshold: 70,
    simulationScenario: {
      targetCharacter: {
        id: 'sari',
        name: 'Bu Sari',
        role: 'Operations Director',
      },
      startNodeId: 'node-start',
      nodes: {
        'node-start': {
          id: 'node-start',
          speaker: 'sari',
          speakerName: 'Bu Sari',
          role: 'Operations Director',
          text: 'Budi, vendor kemasan utama kita terlambat mengirim barang lagi untuk kedua kalinya bulan ini. Pabrik terancam berhenti beroperasi 3 hari ke depan jika botol kemasan tidak sampai sore ini. Vendor beralasan armada mereka rusak. Bagaimana langkah tegas kita?',
          mode: 'choice',
          choices: [
            {
              id: 'c1',
              text: 'Biarkan saja Bu Sari, kita maklumi kendala armadanya dan kita minta pabrik meliburkan pekerja sampai barang datang minggu depan.',
              tradeoffExplanation:
                'Sikap pasif merugikan jadwal produksi perusahaan puluhan juta rupiah, menurunkan utilisasi kapasitas pabrik, dan mengecewakan distributor.',
              rubric: { empathy: 20, clarity: 30, professionalFirmness: 10, ethicalSolution: 10 },
              reputationImpact: -4,
              feedbackTip: 'Operasional profesional membutuhkan penegakan Service Level Agreement (SLA) yang mengikat dan rencana kontinjensi.',
              nextNodeId: 'node-recovery',
            },
            {
              id: 'c2',
              text: 'Kita lakukan dua langkah simultan: Pertama, aktifkan vendor cadangan lokal untuk memasok kebutuhan darurat 2 hari ini agar pabrik tidak berhenti. Kedua, panggil manajemen vendor utama untuk menegakkan klausula SLA keterlambatan (penalti 2% per hari keterlambatan) serta mewajibkan mereka menanggung selisih biaya ekspedisi kurir kilat hari ini.',
              tradeoffExplanation:
                'Menyelamatkan kontinuitas lini produksi pabrik secara taktis sekaligus menegakkan kepatuhan kontrak dan akuntabilitas vendor secara profesional.',
              rubric: { empathy: 85, clarity: 95, professionalFirmness: 95, ethicalSolution: 95 },
              reputationImpact: 4,
              feedbackTip: 'Sangat tanggap, solutif, dan melindungi kelangsungan operasional pabrik secara paripurna.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-recovery': {
          id: 'node-recovery',
          speaker: 'sari',
          speakerName: 'Bu Sari',
          role: 'Operations Director',
          text: 'Pabrik tidak boleh libur sembarangan, biaya overhead harian kita berjalan terus! Apa jalan keluar taktis mitigasi pasokan yang harus kita ambil?',
          mode: 'choice',
          choices: [
            {
              id: 'c-rec',
              text: 'Benar Bu Sari. Kita kontak vendor cadangan terdaftar untuk pasokan cepat hari ini dan berlakukan penalti penyesuaian invoice pada vendor utama.',
              tradeoffExplanation: 'Mengalihkan pasokan ke vendor cadangan dan menerapkan penalti kontrak.',
              rubric: { empathy: 80, clarity: 85, professionalFirmness: 85, ethicalSolution: 90 },
              reputationImpact: 1,
              feedbackTip: 'Langkah pemulihan operasional yang tepat.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-assembly': {
          id: 'node-assembly',
          speaker: 'sari',
          speakerName: 'Bu Sari',
          role: 'Operations Director',
          text: 'Tepat sekali. Sekarang susun notula instruksi operasional penanganan keterlambatan rantai pasok:',
          mode: 'assembly',
          sentenceBlocks: {
            available: [
              { id: 'b1', text: 'Menerbitkan Purchase Order darurat kepada pemasok cadangan terakreditasi untuk menjamin kontinuitas produksi.', category: 'fakta' },
              { id: 'b2', text: 'Menerapkan klausula penalti keterlambatan pengiriman sesuai Service Level Agreement (SLA) yang berlaku.', category: 'analisis' },
              { id: 'b3', text: 'Mewajibkan vendor utama mengirimkan sisa pesanan menggunakan layanan logistik kurir kilat bergaransi.', category: 'solusi' },
              { id: 'b4', text: 'Melakukan evaluasi skor kinerja pemasok triwulanan dan merevisi alokasi kuota pesanan berkala.', category: 'penutup' },
            ],
            validOrderIds: [
              ['b1', 'b2', 'b3', 'b4'],
            ],
            rubricOnSuccess: { empathy: 95, clarity: 95, professionalFirmness: 95, ethicalSolution: 95, total: 95 },
            explanation:
              'Prosedur penanganan krisis rantai pasok: diawali pengamanan pasokan darurat lewat vendor cadangan, penegakan penalti SLA kontrak resmi, percepatan pengiriman bergaransi, dan audit kinerja pemasok berkala.',
          },
        },
      },
      debrief: {
        keyTakeaway:
          'Ketergantungan tunggal pada satu pemasok tanpa SLA mengikat adalah kerentanan terbesar rantai pasok manufaktur dan distribusi.',
        realWorldLesson:
          'Manajer operasional yang handal selalu memiliki strategi multi-sumber pasokan dan menegakkan kontrak mutu tanpa kompromi.',
      },
    },
  },

  // LEVEL 3: Advanced Quiz Engine (Kalkulasi Kuantitatif EOQ, ROP & Safety Stock)
  {
    id: 'D8-LEVEL-03',
    domainId: 'D8',
    skillId: 'D8-SKILL-01',
    tier: 3,
    title: 'Kalkulasi Persediaan: EOQ, ROP & Buffer Safety Stock',
    subtitle: 'Menghitung ukuran lot ekonomis dan ambang batas pemesanan ulang otomatis',
    description:
      'Latihan analitis menghitung formula akar kuadrat EOQ, rata-rata konsumsi harian, stok pengaman variabilitas lead time, dan Reorder Point dari parameter data riil.',
    engine: 'advanced-quiz-engine',
    timeLimitSeconds: 360,
    passThreshold: 80,
  },

  // LEVEL 4: Simulation Engine (Restrukturisasi Kebijakan Persediaan Gudang & Optimasi ROP)
  {
    id: 'D8-LEVEL-04',
    domainId: 'D8',
    skillId: 'D8-SKILL-01',
    tier: 4,
    title: 'Simulasi Eksekutif: Audit Persediaan Gudang & Kebijakan EOQ-ROP',
    subtitle: 'Merekonsiliasi parameter pemesanan barang dan menetapkan ambang batas stok otomatis',
    description:
      'Direktur Operasional menemukan gudang sering mengalami kehabisan barang akibat kebijakan pemesanan reaktif. Hitung parameter EOQ, Safety Stock, dan ROP resmi untuk disahkan manajemen.',
    engine: 'simulation-engine',
    timeLimitSeconds: 480,
    passThreshold: 80,
    simulationScenario: {
      targetCharacter: {
        id: 'sari',
        name: 'Bu Sari',
        role: 'Operations Director',
      },
      startNodeId: 'node-start',
      nodes: {
        'node-start': {
          id: 'node-start',
          speaker: 'sari',
          speakerName: 'Bu Sari',
          role: 'Operations Director',
          text: `Budi, kita sedang merevisi SOP persediaan gudang pusat. Data konsumsi tahunan tercatat ${D8_INVENTORY_CONSTANTS.annualDemandUnits.toLocaleString('id-ID')} unit dengan ${D8_INVENTORY_CONSTANTS.workingDaysPerYear} hari kerja. Biaya pesan adalah ${formatRupiahD8(D8_INVENTORY_CONSTANTS.orderCostPerOrder)} per order dan biaya simpan ${formatRupiahD8(D8_INVENTORY_CONSTANTS.holdingCostPerUnitPerYear)}/unit/tahun. Lead time kirim normal adalah ${D8_INVENTORY_CONSTANTS.normalLeadTimeDays} hari, tetapi bisa molor hingga ${D8_INVENTORY_CONSTANTS.maxLeadTimeDays} hari. Kepala gudang lama hanya pesan 200 unit seminggu sekali dan baru pesan saat rak kosong. Bagaimana usulan kebijakan kuantitatif kita?`,
          mode: 'choice',
          choices: [
            {
              id: 'c1',
              text: 'Pesan saja 5.000 unit sekaligus setahun dua kali agar staf gudang santai tidak perlu bolak-balik memeriksa kartu stok.',
              tradeoffExplanation:
                'Pemesanan dalam jumlah raksasa melipatgandakan biaya simpan gudang, menyedot kas modal kerja, dan meningkatkan risiko kerusakan fisik barang.',
              rubric: { empathy: 20, clarity: 30, professionalFirmness: 10, ethicalSolution: 10 },
              reputationImpact: -4,
              feedbackTip: 'Penetapan kuantitas pesanan wajib menggunakan optimasi matematis EOQ yang menyeimbangkan biaya simpan dan pesan.',
              nextNodeId: 'node-recovery',
            },
            {
              id: 'c2',
              text: `Kebijakan ilmiah berbasis model persediaan: EOQ optimal adalah akar((2 x ${D8_INVENTORY_CONSTANTS.annualDemandUnits} x ${D8_INVENTORY_CONSTANTS.orderCostPerOrder}) / ${D8_INVENTORY_CONSTANTS.holdingCostPerUnitPerYear}) = ${calculateEOQ(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.orderCostPerOrder, D8_INVENTORY_CONSTANTS.holdingCostPerUnitPerYear).toLocaleString('id-ID')} unit per pesanan (${calculateOrderFrequency(D8_INVENTORY_CONSTANTS.annualDemandUnits, calculateEOQ(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.orderCostPerOrder, D8_INVENTORY_CONSTANTS.holdingCostPerUnitPerYear))} kali setahun). Permintaan harian adalah ${calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear)} unit/hari. Safety Stock = (${D8_INVENTORY_CONSTANTS.maxLeadTimeDays} - ${D8_INVENTORY_CONSTANTS.normalLeadTimeDays}) x ${calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear)} = ${calculateSafetyStock(D8_INVENTORY_CONSTANTS.maxLeadTimeDays, D8_INVENTORY_CONSTANTS.normalLeadTimeDays, calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear))} unit. ROP = (40 x 5) + 120 = ${calculateROP(calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear), D8_INVENTORY_CONSTANTS.normalLeadTimeDays, calculateSafetyStock(D8_INVENTORY_CONSTANTS.maxLeadTimeDays, D8_INVENTORY_CONSTANTS.normalLeadTimeDays, calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear)))} unit. Begitu stok menyentuh 320 unit, sistem wajib memesan 1.000 unit.`,
              tradeoffExplanation:
                'Perhitungan komprehensif mengintegrasikan ukuran lot paling efisien (EOQ) dan ambang batas pesan ulang otomatis (ROP) yang terbukti membasmi risiko kehabisan stok.',
              rubric: { empathy: 95, clarity: 95, professionalFirmness: 95, ethicalSolution: 95 },
              reputationImpact: 4,
              feedbackTip: 'Sangat cemerlang, akurat secara kuantitatif, dan memberikan kepastian operasional tingkat tinggi.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-recovery': {
          id: 'node-recovery',
          speaker: 'sari',
          speakerName: 'Bu Sari',
          role: 'Operations Director',
          text: 'Pesan 5.000 unit akan membuat gudang penuh sesak dan kas kita terkunci! Hitung ulang angka EOQ, Safety Stock, dan ROP yang tepat!',
          mode: 'choice',
          choices: [
            {
              id: 'c-rec',
              text: 'Maaf Bu Sari. Angka yang tepat: EOQ adalah 1.000 unit, Safety Stock sebesar 120 unit, dan Titik Pesan Ulang (ROP) adalah 320 unit.',
              tradeoffExplanation: 'Mengoreksi perhitungan dengan parameter model operasional yang benar.',
              rubric: { empathy: 80, clarity: 85, professionalFirmness: 85, ethicalSolution: 85 },
              reputationImpact: 1,
              feedbackTip: 'Tepat sekali, gunakan parameter EOQ dan ROP yang seimbang.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-assembly': {
          id: 'node-assembly',
          speaker: 'sari',
          speakerName: 'Bu Sari',
          role: 'Operations Director',
          text: 'Analisis yang sangat meyakinkan! Sekarang susun rumusan kebijakan persediaan gudang resmi untuk disahkan di sistem ERP:',
          mode: 'assembly',
          sentenceBlocks: {
            available: [
              { id: 'b1', text: `Menetapkan kuantitas pemesanan ekonomis (EOQ) sebesar ${calculateEOQ(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.orderCostPerOrder, D8_INVENTORY_CONSTANTS.holdingCostPerUnitPerYear).toLocaleString('id-ID')} unit per pesanan pembelian.`, category: 'fakta' },
              { id: 'b2', text: `Menyediakan stok pengaman (Safety Stock) sebesar ${calculateSafetyStock(D8_INVENTORY_CONSTANTS.maxLeadTimeDays, D8_INVENTORY_CONSTANTS.normalLeadTimeDays, calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear))} unit untuk mengantisipasi variabilitas keterlambatan vendor.`, category: 'analisis' },
              { id: 'b3', text: `Mengonfigurasi ambang pemicu Titik Pesan Ulang (ROP) otomatis pada saldo persediaan ${calculateROP(calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear), D8_INVENTORY_CONSTANTS.normalLeadTimeDays, calculateSafetyStock(D8_INVENTORY_CONSTANTS.maxLeadTimeDays, D8_INVENTORY_CONSTANTS.normalLeadTimeDays, calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear)))} unit.`, category: 'solusi' },
              { id: 'b4', text: 'Melakukan stock opname fisik berkala untuk menjamin akurasi saldo kartu persediaan digital.', category: 'penutup' },
            ],
            validOrderIds: [
              ['b1', 'b2', 'b3', 'b4'],
            ],
            rubricOnSuccess: { empathy: 95, clarity: 95, professionalFirmness: 95, ethicalSolution: 95, total: 95 },
            explanation: `Kebijakan operasional persediaan terpadu: EOQ = 1.000 unit meminimalkan biaya simpan dan pesan. Buffer safety stock = (8 - 5) * 40 = 120 unit. Ambang Reorder Point = (40 * 5) + 120 = 320 unit.`,
          },
        },
      },
      debrief: {
        keyTakeaway:
          'Efisiensi operasional tercapai ketika persediaan mengalir tepat waktu (Just-In-Time) dengan perlindungan batas pengaman terukur.',
        realWorldLesson:
          'Keberhasilan manajemen rantai pasok tidak bergantung pada besarnya tumpukan barang di gudang, melainkan pada ketepatan sinkronisasi data kebutuhan dan waktu kirim.',
      },
    },
  },
];
