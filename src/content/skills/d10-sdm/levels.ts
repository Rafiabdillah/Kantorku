/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D10: SDM & Kepemimpinan - Levels & Simulation Scenarios
 */

import { CharacterId } from '../../../types';
import {
  D10_PAYROLL_CONSTANTS,
  calculateHourlyWage,
  calculateWeekdayOvertimePay,
  calculateTHR,
  formatRupiahD10,
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

export interface D10Level {
  id: string;
  domainId: 'D10';
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

export const D10_LEVELS: D10Level[] = [
  // LEVEL 1: Advanced Quiz Engine (PKWT, Masa Percobaan & Regulasi Ketenagakerjaan)
  {
    id: 'D10-LEVEL-01',
    domainId: 'D10',
    skillId: 'D10-SKILL-01',
    tier: 1,
    title: 'Fondasi Ketenagakerjaan, Kontrak PKWT & Hubungan Kerja',
    subtitle: 'Memahami hak-kewajiban kontrak kerja, larangan probation PKWT, dan regulasi PP 35/2021',
    description:
      'Latihan analitis membedakan jenis kontrak kerja, mengidentifikasi batas masa kontrak, uang kompensasi PKWT, dan prosedur cuti tahunan.',
    engine: 'advanced-quiz-engine',
    timeLimitSeconds: 300,
    passThreshold: 70,
  },

  // LEVEL 2: Simulation Engine (Konseling Disiplin Karyawan & Mediasi Konflik Tim)
  {
    id: 'D10-LEVEL-02',
    domainId: 'D10',
    skillId: 'D10-SKILL-03',
    tier: 2,
    title: 'Simulasi: Konseling Kinerja SBI & De-eskalasi Friksi Tim',
    subtitle: 'Menangani penurunan kedisiplinan staf operasional dengan teknik Situation-Behavior-Impact',
    description:
      'Seorang supervisor ingin langsung memecat staf logistik yang terlambat tanpa verifikasi. Bimbing proses penegakan disiplin secara adil dan terukur.',
    engine: 'simulation-engine',
    timeLimitSeconds: 420,
    passThreshold: 70,
    simulationScenario: {
      targetCharacter: {
        id: 'nadia',
        name: 'Bu Mega',
        role: 'Human Resources Manager',
      },
      startNodeId: 'node-start',
      nodes: {
        'node-start': {
          id: 'node-start',
          speaker: 'nadia',
          speakerName: 'Bu Mega',
          role: 'Human Resources Manager',
          text: 'Budi, supervisor gudang sangat emosi karena stafnya bernama Roni terlambat 3 kali berturut-turut minggu ini. Supervisor minta Roni langsung di-PHK hari ini juga tanpa pesangon dan tanpa dipanggil dulu. Bagaimana keputusan kita?',
          mode: 'choice',
          choices: [
            {
              id: 'c1',
              text: 'Setuju Bu Mega, langsung saja buatkan surat PHK sepihak agar staf lain takut dan tidak berani terlambat lagi.',
              tradeoffExplanation:
                'PHK sepihak tanpa surat peringatan atau mediasi melanggar UU Ketenagakerjaan dan berpotensi memicu sengketa perselisihan hubungan industrial (PHI).',
              rubric: { empathy: 15, clarity: 30, professionalFirmness: 10, ethicalSolution: 10 },
              reputationImpact: -4,
              feedbackTip: 'Penegakan disiplin wajib mengikuti tahapan hukum dan pembinaan proporsional.',
              nextNodeId: 'node-recovery',
            },
            {
              id: 'c2',
              text: 'PHK langsung tanpa tahapan pembinaan melanggar UU Ketenagakerjaan. Prosedur yang benar adalah memanggil Roni ke sesi konseling tertutup 1-on-1 dengan model SBI (Situation-Behavior-Impact), mendengarkan kendalanya, memberikan teguran tertulis atau SP 1 jika terbukti lalai, dan menetapkan target perbaikan disiplin 30 hari ke depan.',
              tradeoffExplanation:
                'Menegakkan kepatuhan hukum ketenagakerjaan, menjaga hak pembelaan diri pekerja, dan menciptakan budaya kedisiplinan yang konstruktif dan adil.',
              rubric: { empathy: 90, clarity: 95, professionalFirmness: 95, ethicalSolution: 95 },
              reputationImpact: 4,
              feedbackTip: 'Sangat profesional, menyeimbangkan empati manusiawi dan ketegasan regulasi normatif.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-recovery': {
          id: 'node-recovery',
          speaker: 'nadia',
          speakerName: 'Bu Mega',
          role: 'Human Resources Manager',
          text: 'Waduh, setelah saya cek regulasi, PHK tanpa surat peringatan bisa membuat perusahaan digugat ke dinas tenaga kerja! Bagaimana kita memperbaiki langkah penanganan masalah Roni?',
          mode: 'choice',
          choices: [
            {
              id: 'c-rec',
              text: 'Benar Bu Mega. Kita panggil Roni untuk klarifikasi fakta, berikan SP 1 sesuai tingkat pelanggarannya, dan susun komitmen waktu hadir tertulis.',
              tradeoffExplanation: 'Mengembalikan prosedur sanksi ke koridor hukum dan pembinaan berjenjang.',
              rubric: { empathy: 80, clarity: 85, professionalFirmness: 85, ethicalSolution: 90 },
              reputationImpact: 1,
              feedbackTip: 'Langkah pemulihan yang tepat.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-assembly': {
          id: 'node-assembly',
          speaker: 'nadia',
          speakerName: 'Bu Mega',
          role: 'Human Resources Manager',
          text: 'Tepat sekali. Sekarang susun notula resmi langkah pembinaan kedisiplinan staf untuk arsip HR:',
          mode: 'assembly',
          sentenceBlocks: {
            available: [
              { id: 'b1', text: 'Melaksanakan sesi konseling tatap muka privat dengan menyampaikan catatan absensi terverifikasi.', category: 'fakta' },
              { id: 'b2', text: 'Menerapkan model SBI untuk menjelaskan dampak keterlambatan terhadap operasional pengiriman gudang.', category: 'analisis' },
              { id: 'b3', text: 'Menerbitkan Surat Peringatan Pertama (SP 1) resmi berjangka waktu berlaku 6 bulan.', category: 'solusi' },
              { id: 'b4', text: 'Menandatangani lembar rencana perbaikan kehadiran dan menjadwalkan evaluasi berkala mingguan.', category: 'penutup' },
            ],
            validOrderIds: [
              ['b1', 'b2', 'b3', 'b4'],
            ],
            rubricOnSuccess: { empathy: 95, clarity: 95, professionalFirmness: 95, ethicalSolution: 95, total: 95 },
            explanation:
              'Tahapan pembinaan disiplin SDM normatif: diawali verifikasi data fakta absensi, penyampaian dampak terukur lewat model SBI, penerbitan surat peringatan berjenjang yang sah, dan penandatanganan rencana komitmen perbaikan.',
          },
        },
      },
      debrief: {
        keyTakeaway:
          'Kepemimpinan SDM bukan tentang menghukum semena-mena, melainkan membimbing perilaku kerja staf melalui prosedur transparan dan kepatuhan undang-undang.',
        realWorldLesson:
          'Perusahaan yang menegakkan aturan ketenagakerjaan secara adil akan menikmati loyalitas karyawan tinggi dan terbebas dari sengketa hubungan industrial yang merugikan.',
      },
    },
  },

  // LEVEL 3: Advanced Quiz Engine (Kalkulasi Penggajian, Lembur 1/173 & THR Prorata)
  {
    id: 'D10-LEVEL-03',
    domainId: 'D10',
    skillId: 'D10-SKILL-02',
    tier: 3,
    title: 'Kalkulasi Payroll Normatif: Lembur 1/173 & THR Prorata',
    subtitle: 'Menghitung upah lembur resmi PP 35/2021 dan hak THR Permenaker 6/2016',
    description:
      'Latihan analitis menghitung upah per jam berbasis konstanta 1/173, multiplier lembur hari kerja (1.5x dan 2.0x), serta THR keagamaan penuh dan proporsional.',
    engine: 'advanced-quiz-engine',
    timeLimitSeconds: 360,
    passThreshold: 80,
  },

  // LEVEL 4: Simulation Engine (Audit & Rekonsiliasi Slip Lembur Tim Operasional)
  {
    id: 'D10-LEVEL-04',
    domainId: 'D10',
    skillId: 'D10-SKILL-02',
    tier: 4,
    title: 'Simulasi Eksekutif: Audit Penggajian Lembur & Hak THR Keagamaan',
    subtitle: 'Merekonsiliasi slip gaji tim, mengoreksi tarif lembur flat, dan menghitung hak normatif',
    description:
      'Bagian keuangan menemukan draf slip lembur staf operasional dihitung dengan tarif flat yang melanggar PP No. 35/2021. Hitung ulang upah lembur dan hak THR sesuai data numerik resmi.',
    engine: 'simulation-engine',
    timeLimitSeconds: 480,
    passThreshold: 80,
    simulationScenario: {
      targetCharacter: {
        id: 'nadia',
        name: 'Bu Mega',
        role: 'Human Resources Manager',
      },
      startNodeId: 'node-start',
      nodes: {
        'node-start': {
          id: 'node-start',
          speaker: 'nadia',
          speakerName: 'Bu Mega',
          role: 'Human Resources Manager',
          text: `Budi, kita sedang merekap penggajian bulan ini. Staf logistik kita memiliki upah sebulan ${formatRupiahD10(D10_PAYROLL_CONSTANTS.monthlySalary)} (upah pokok + tunjangan tetap). Pada hari kerja kemarin, ia lembur selama ${D10_PAYROLL_CONSTANTS.overtimeHoursWorked} jam. Selain itu, ada staf baru dengan masa kerja ${D10_PAYROLL_CONSTANTS.tenureMonthsWorkerB} bulan yang berhak menerima THR menjelang hari raya. Bagian keuangan lama menghitung lembur flat Rp20.000/jam dan menolak THR staf baru. Bagaimana koreksi perhitungan normatifnya?`,
          mode: 'choice',
          choices: [
            {
              id: 'c1',
              text: `Biarkan saja tarif lembur flat Rp20.000/jam agar kas kantor hemat, dan tunda THR staf baru sampai masa kerjanya mencapai 12 bulan penuh.`,
              tradeoffExplanation:
                'Memberikan upah lembur di bawah ketentuan PP No. 35/2021 dan menahan THR yang sah melanggar hukum ketenagakerjaan serta terancam denda operasional.',
              rubric: { empathy: 20, clarity: 30, professionalFirmness: 10, ethicalSolution: 10 },
              reputationImpact: -4,
              feedbackTip: 'Upah lembur dan THR adalah hak normatif pekerja yang diatur ketat oleh undang-undang.',
              nextNodeId: 'node-recovery',
            },
            {
              id: 'c2',
              text: `Koreksi perhitungan sesuai PP No. 35/2021 dan Permenaker No. 6/2016: Upah sejam adalah ${formatRupiahD10(D10_PAYROLL_CONSTANTS.monthlySalary)} / 173 = ${formatRupiahD10(calculateHourlyWage(D10_PAYROLL_CONSTANTS.monthlySalary))}. Lembur hari kerja ${D10_PAYROLL_CONSTANTS.overtimeHoursWorked} jam: Jam ke-1 (1.5x) = ${formatRupiahD10(calculateHourlyWage(D10_PAYROLL_CONSTANTS.monthlySalary) * 1.5)}; Jam ke-2 & ke-3 (2x) = 2 x ${formatRupiahD10(calculateHourlyWage(D10_PAYROLL_CONSTANTS.monthlySalary) * 2)} = ${formatRupiahD10(calculateHourlyWage(D10_PAYROLL_CONSTANTS.monthlySalary) * 2 * 2)}. Total upah lembur = ${formatRupiahD10(calculateWeekdayOvertimePay(calculateHourlyWage(D10_PAYROLL_CONSTANTS.monthlySalary), D10_PAYROLL_CONSTANTS.overtimeHoursWorked))}. Untuk staf masa kerja ${D10_PAYROLL_CONSTANTS.tenureMonthsWorkerB} bulan, berhak THR prorata (${D10_PAYROLL_CONSTANTS.tenureMonthsWorkerB}/12) x ${formatRupiahD10(D10_PAYROLL_CONSTANTS.monthlySalary)} = ${formatRupiahD10(calculateTHR(D10_PAYROLL_CONSTANTS.monthlySalary, D10_PAYROLL_CONSTANTS.tenureMonthsWorkerB))}. Kita wajib bayar penuh sesuai regulasi.`,
              tradeoffExplanation:
                'Perhitungan akurat berbasis peraturan perundang-undangan menjamin hak normatif pekerja terlindungi dan perusahaan terbebas dari risiko sanksi denda ketenagakerjaan.',
              rubric: { empathy: 95, clarity: 95, professionalFirmness: 95, ethicalSolution: 95 },
              reputationImpact: 4,
              feedbackTip: 'Sangat teliti, presisi secara matematis, dan patuh hukum secara sempurna.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-recovery': {
          id: 'node-recovery',
          speaker: 'nadia',
          speakerName: 'Bu Mega',
          role: 'Human Resources Manager',
          text: `Sistem penggajian kita wajib patuh hukum perburuhan! Berapa angka nominal upah lembur 3 jam dan THR prorata yang sebenarnya?`,
          mode: 'choice',
          choices: [
            {
              id: 'c-rec',
              text: `Upah sejam adalah Rp30.000. Lembur 3 jam bernilai Rp165.000 dan THR prorata 8 bulan bernilai Rp3.460.000. Semua angka ini wajib dicantumkan transparan pada slip gaji.`,
              tradeoffExplanation: 'Memperbaiki kesalahan dengan angka normatif yang sah.',
              rubric: { empathy: 80, clarity: 85, professionalFirmness: 85, ethicalSolution: 85 },
              reputationImpact: 1,
              feedbackTip: 'Langkah pemulihan yang tepat.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-assembly': {
          id: 'node-assembly',
          speaker: 'nadia',
          speakerName: 'Bu Mega',
          role: 'Human Resources Manager',
          text: 'Sangat jelas dan dapat dipertanggungjawabkan! Sekarang susun draf rekomendasi slip upah lembur resmi untuk disahkan:',
          mode: 'assembly',
          sentenceBlocks: {
            available: [
              { id: 'b1', text: `Menetapkan dasar upah lembur per jam sebesar ${formatRupiahD10(calculateHourlyWage(D10_PAYROLL_CONSTANTS.monthlySalary))} berbasis pembagi resmi 1/173.`, category: 'fakta' },
              { id: 'b2', text: `Menghitung kompensasi lembur ${D10_PAYROLL_CONSTANTS.overtimeHoursWorked} jam hari kerja dengan total ${formatRupiahD10(calculateWeekdayOvertimePay(calculateHourlyWage(D10_PAYROLL_CONSTANTS.monthlySalary), D10_PAYROLL_CONSTANTS.overtimeHoursWorked))} (1.5x jam pertama dan 2.0x jam berikutnya).`, category: 'analisis' },
              { id: 'b3', text: `Membayarkan hak THR keagamaan proporsional masa kerja ${D10_PAYROLL_CONSTANTS.tenureMonthsWorkerB} bulan sebesar ${formatRupiahD10(calculateTHR(D10_PAYROLL_CONSTANTS.monthlySalary, D10_PAYROLL_CONSTANTS.tenureMonthsWorkerB))}.`, category: 'solusi' },
              { id: 'b4', text: 'Menerbitkan lembar slip gaji terverifikasi dengan rincian penerimaan dan potongan transparan.', category: 'penutup' },
            ],
            validOrderIds: [
              ['b1', 'b2', 'b3', 'b4'],
            ],
            rubricOnSuccess: { empathy: 95, clarity: 95, professionalFirmness: 95, ethicalSolution: 95, total: 95 },
            explanation: `Rekonsiliasi slip upah normatif: Upah sejam = 5.190.000 / 173 = Rp30.000. Lembur 3 jam = (1.5 * 30.000) + (2 * 30.000 * 2) = 45.000 + 120.000 = Rp165.000. THR 8 bulan = (8 / 12) * 5.190.000 = Rp3.460.000.`,
          },
        },
      },
      debrief: {
        keyTakeaway:
          'Penggajian normatif yang tepat waktu dan akurat adalah pilar utama kepercayaan antara karyawan dan manajemen perusahaan.',
        realWorldLesson:
          'Kepatuhan pada PP No. 35/2021 dan Permenaker No. 6/2016 melindungi bisnis dari gugatan hukum, mogok kerja, dan sanksi denda ketenagakerjaan.',
      },
    },
  },
];
