/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D6: Akuntansi & Keuangan Usaha - Levels & Practice Exercises
 */

import { SimulationScenario } from '../../../components/engines/SimulationEngine';

export interface D6Level {
  id: string;
  domainId: 'D6';
  skillId: string;
  title: string;
  subtitle: string;
  tier: number;
  engine: 'advanced-quiz-engine' | 'simulation-engine';
  scenarioBrief: string;
  xpReward: number;
  coinReward: number;
  estimatedMinutes: number;
  passThreshold: number;
  simulationScenario?: SimulationScenario;
}

export const D6_LEVELS: D6Level[] = [
  // LEVEL 1: Advanced Quiz Engine (Persamaan Dasar, Jurnal & SAK EMKM)
  {
    id: 'D6-LEVEL-01',
    domainId: 'D6',
    skillId: 'D6-SKILL-01',
    title: 'Audit Jurnal Umum & Persamaan Dasar Akuntansi',
    subtitle: 'Uji analitis debit-kredit, siklus akuntansi, dan perhitungan HPP SAK EMKM',
    tier: 1,
    engine: 'advanced-quiz-engine',
    scenarioBrief:
      'Perusahaan sedang merapikan pembukuan kas dan buku besar toko untuk persiapan laporan keuangan tahunan. Selesaikan 10 soal analitis mencakup posisi debit-kredit, komponen HPP, pemisahan prive pemilik, dan rekonsiliasi kas.',
    xpReward: 120,
    coinReward: 50,
    estimatedMinutes: 8,
    passThreshold: 70,
  },

  // LEVEL 2: Simulation Engine (Rekonsiliasi Bank Penutupan Akhir Bulan)
  {
    id: 'D6-LEVEL-02',
    domainId: 'D6',
    skillId: 'D6-SKILL-02',
    title: 'Rekonsiliasi Kas Bank Penutupan Akhir Bulan',
    subtitle: 'Simulasi pelacakan selisih saldo kas buku vs rekening koran bank',
    tier: 2,
    engine: 'simulation-engine',
    scenarioBrief:
      'Terdapat perbedaan saldo kas sebesar Rp3.500.000 antara buku kas perusahaan dan rekening koran dari bank pada penutupan akhir bulan. Telusuri penyebabnya dan susun penyesuaian yang benar bersama Pak Reza.',
    xpReward: 150,
    coinReward: 60,
    estimatedMinutes: 10,
    passThreshold: 70,
    simulationScenario: {
      id: 'scen-d6-02',
      title: 'Rekonsiliasi Bank Penutupan Akhir Bulan',
      scenarioContext:
        'Sesi tutup buku bulanan bersama Finance Manager. Rekening koran bank dan buku kas perusahaan mengalami selisih saldo yang harus ditelusuri secara sistematis.',
      targetCharacter: {
        id: 'reza',
        name: 'Pak Reza',
        role: 'Finance Manager PT Maju Sejahtera',
      },
      startNodeId: 'node-start',
      nodes: {
        'node-start': {
          id: 'node-start',
          speaker: 'reza',
          speakerName: 'Pak Reza',
          role: 'Finance Manager',
          text: 'Budi, rekening koran bank mencatat saldo kas Rp46.500.000, tetapi buku besar kas kita mencatat Rp50.000.000. Ada selisih Rp3.500.000. Bagaimana langkah awal audit yang tepat?',
          mode: 'choice',
          choices: [
            {
              id: 'c1',
              text: 'Ubah saja angka di buku kas kita menjadi Rp46.500.000 agar saldo langsung seimbang dan tutup buku cepat selesai.',
              tradeoffExplanation:
                'Fatal! Mengubah saldo pembukuan secara sepihak melanggar standar akuntansi SAK EMKM dan menyembunyikan potensi kecurangan kas.',
              rubric: { empathy: 20, clarity: 30, professionalFirmness: 10, ethicalSolution: 10 },
              reputationImpact: -3,
              feedbackTip: 'Jangan memaksakan angka seimbang tanpa rekonsiliasi faktual.',
              nextNodeId: 'node-recovery',
            },
            {
              id: 'c2',
              text: 'Mari kita telusuri mutasi transaksi baris-demi-baris: bandingkan buku jurnal kas dan rekening koran bank untuk mengidentifikasi setoran dalam perjalanan (deposit in transit) dan beban admin bank yang belum dicatat.',
              tradeoffExplanation:
                'Prosedur rekonsiliasi standar: memeriksa kedua sisi pencatatan untuk menemukan pos penyesuaian yang valid.',
              rubric: { empathy: 90, clarity: 95, professionalFirmness: 95, ethicalSolution: 95 },
              reputationImpact: 4,
              feedbackTip: 'Prosedur audit kas yang sangat tepat dan mematuhi tata kelola keuangan.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-recovery': {
          id: 'node-recovery',
          speaker: 'reza',
          speakerName: 'Pak Reza',
          role: 'Finance Manager',
          text: 'Mengubah saldo tanpa bukti adalah pelanggaran berat! Apa prosedur rekonsiliasi yang benar untuk mencari penyebab selisih?',
          mode: 'choice',
          choices: [
            {
              id: 'c-rec',
              text: 'Mohon maaf Pak Reza. Kita periksa buku kas dan rekening koran untuk mencocokkan setoran dalam perjalanan dan beban administrasi bank.',
              tradeoffExplanation: 'Menyadari kekeliruan dan kembali ke prosedur audit rekonsiliasi kas resmi.',
              rubric: { empathy: 75, clarity: 85, professionalFirmness: 80, ethicalSolution: 85 },
              reputationImpact: 1,
              feedbackTip: 'Tepat sekali, lakukan pencocokan pos mutasi.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-assembly': {
          id: 'node-assembly',
          speaker: 'reza',
          speakerName: 'Pak Reza',
          role: 'Finance Manager',
          text: 'Hasil audit menemukan setoran dalam perjalanan Rp3.450.000 yang belum dibukukan bank dan beban administrasi bank Rp50.000 yang belum kita jurnal. Rumuskan perlakuan akuntansinya:',
          mode: 'assembly',
          sentenceBlocks: {
            available: [
              { id: 'b1', text: 'Mencatat jurnal penyesuaian beban administrasi bank Rp50.000 pada pembukuan perusahaan.', category: 'solusi' },
              { id: 'b2', text: 'Menambahkan setoran dalam perjalanan Rp3.450.000 ke saldo kas rekening koran bank.', category: 'fakta' },
              { id: 'b3', text: 'Menghitung saldo kas yang telah disesuaikan hingga kedua sisi seimbang di Rp49.950.000.', category: 'solusi' },
              { id: 'b4', text: 'Menyajikan lembar kerja rekonsiliasi kas bank terverifikasi untuk laporan bulanan.', category: 'penutup' },
            ],
            validOrderIds: [
              ['b1', 'b2', 'b3', 'b4'],
            ],
            rubricOnSuccess: { empathy: 95, clarity: 95, professionalFirmness: 95, ethicalSolution: 95, total: 95 },
            explanation:
              'Rekonsiliasi bank: Sisi bank: 46.500.000 + 3.450.000 = 49.950.000. Sisi buku: 50.000.000 - 50.000 (biaya admin) = 49.950.000. Kedua sisi seimbang sempurna di Rp49.950.000.',
          },
        },
      },
      debrief: {
        keyTakeaway:
          'Rekonsiliasi bank menyeimbangkan saldo kas pembukuan dan bank: pos pembukuan dikurangi beban admin bank, sedangkan pos rekening koran bank ditambah setoran dalam perjalanan hingga kedua sisi seimbang.',
        realWorldLesson:
          'Integritas akuntansi dibangun dari ketelitian mencocokkan setiap rupiah bukti transaksi, bukan dari sekadar meratakan angka akhir.',
      },
    },
  },

  // LEVEL 3: Advanced Quiz Engine (Laba Rugi, HPP & Beban Operasional)
  {
    id: 'D6-LEVEL-03',
    domainId: 'D6',
    skillId: 'D6-SKILL-03',
    title: 'Evaluasi Laporan Laba Rugi & Pemotongan Beban Operasional',
    subtitle: 'Simulasi perhitungan HPP, laba kotor, dan laba bersih usaha berbasis SAK EMKM',
    tier: 3,
    engine: 'advanced-quiz-engine',
    scenarioBrief:
      'Perusahaan mengevaluasi efisiensi biaya usaha kuartalan. Selesaikan analisis perhitungan Harga Pokok Penjualan (Persediaan Awal + Pembelian Bersih - Persediaan Akhir) dan pemisahan beban operasional vs non-operasional.',
    xpReward: 180,
    coinReward: 75,
    estimatedMinutes: 12,
    passThreshold: 80,
  },

  // LEVEL 4: Simulation Engine (Pemisahan Prive Pemilik & Akurasi Pencatatan Beban Usaha)
  {
    id: 'D6-LEVEL-04',
    domainId: 'D6',
    skillId: 'D6-SKILL-02',
    title: 'Pemisahan Prive Pemilik & Akurasi Pencatatan Beban Usaha',
    subtitle: 'Simulasi menegakkan entitas bisnis terpisah (economic entity assumption)',
    tier: 4,
    engine: 'simulation-engine',
    scenarioBrief:
      'Pemilik usaha mengambil uang kas toko untuk keperluan belanja pribadi keluarga dan meminta kasir mencatatnya sebagai beban operasional toko. Berikan edukasi pembukuan yang benar bersama Bu Sari.',
    xpReward: 200,
    coinReward: 85,
    estimatedMinutes: 12,
    passThreshold: 80,
    simulationScenario: {
      id: 'scen-d6-04',
      title: 'Menegakkan Pemisahan Keuangan Pribadi vs Kas Usaha',
      scenarioContext:
        'Audit pengeluaran kas toko bersama Direktur Operasional. Menegakkan prinsip entitas ekonomi terpisah agar laporan laba rugi tidak terdistorsi.',
      targetCharacter: {
        id: 'sari',
        name: 'Bu Sari',
        role: 'Direktur Operasional PT Maju Sejahtera',
      },
      startNodeId: 'node-start',
      nodes: {
        'node-start': {
          id: 'node-start',
          speaker: 'sari',
          speakerName: 'Bu Sari',
          role: 'Direktur Operasional',
          text: 'Budi, ada kuitansi belanja pribadi pemilik toko senilai Rp2.000.000 yang dicatat kasir sebagai "Beban Operasional Toko". Bagaimana seharusnya perlakuan akuntansi yang sah?',
          mode: 'choice',
          choices: [
            {
              id: 'c1',
              text: 'Biarkan saja sebagai beban operasional agar laba toko terlihat kecil dan pajak yang dibayar jadi lebih sedikit.',
              tradeoffExplanation:
                'Fatal! Mencatat pengeluaran pribadi sebagai beban usaha melanggar prinsip entitas ekonomi SAK EMKM dan tergolong penggelapan pajak yang melanggar hukum.',
              rubric: { empathy: 20, clarity: 30, professionalFirmness: 10, ethicalSolution: 10 },
              reputationImpact: -3,
              feedbackTip: 'Jangan mencampur adukkan beban usaha dengan pengeluaran pribadi.',
              nextNodeId: 'node-recovery',
            },
            {
              id: 'c2',
              text: 'Pengeluaran pribadi pemilik wajib dicatat ke akun Prive (Drawings) yang mengurangi ekuitas modal, bukan sebagai beban operasional. Ini mematuhi prinsip Economic Entity Assumption SAK EMKM sehingga laba bersih usaha mencerminkan kinerja riil.',
              tradeoffExplanation:
                'Standar akuntansi yang sangat akurat: akun Prive memisahkan transaksi pribadi dari kinerja usaha toko.',
              rubric: { empathy: 90, clarity: 95, professionalFirmness: 95, ethicalSolution: 95 },
              reputationImpact: 4,
              feedbackTip: 'Penerapan standar akuntansi dan etika bisnis yang sangat prima.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-recovery': {
          id: 'node-recovery',
          speaker: 'sari',
          speakerName: 'Bu Sari',
          role: 'Direktur Operasional',
          text: 'Memanipulasi beban operasional melanggar UU Perpajakan! Bagaimana jurnal penyesuaian yang benar untuk memulihkan akun beban?',
          mode: 'choice',
          choices: [
            {
              id: 'c-rec',
              text: 'Kita buat jurnal koreksi: Debit akun Prive Pemilik dan Kredit Beban Operasional sebesar Rp2.000.000.',
              tradeoffExplanation: 'Koreksi jurnal yang tepat untuk memulihkan akun beban operasional.',
              rubric: { empathy: 80, clarity: 85, professionalFirmness: 80, ethicalSolution: 85 },
              reputationImpact: 1,
              feedbackTip: 'Tepat sekali, debit Prive dan kredit beban.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-assembly': {
          id: 'node-assembly',
          speaker: 'sari',
          speakerName: 'Bu Sari',
          role: 'Direktur Operasional',
          text: 'Bagus sekali! Sekarang rumuskan kesimpulan tata kelola entitas bisnis terpisah untuk panduan staf kasir:',
          mode: 'assembly',
          sentenceBlocks: {
            available: [
              { id: 'b1', text: 'Menegakkan prinsip entitas ekonomi terpisah antara kas usaha dan kekayaan pribadi.', category: 'fakta' },
              { id: 'b2', text: 'Mencatat penarikan dana pemilik pada pos akun Prive yang mengurangi ekuitas modal.', category: 'solusi' },
              { id: 'b3', text: 'Mencegah penggelembungan beban operasional fiktif demi menjaga kepatuhan pajak.', category: 'solusi' },
              { id: 'b4', text: 'Menghasilkan laporan laba rugi yang andal, transparan, dan sesuai standar SAK EMKM.', category: 'penutup' },
            ],
            validOrderIds: [
              ['b1', 'b2', 'b3', 'b4'],
            ],
            rubricOnSuccess: { empathy: 95, clarity: 95, professionalFirmness: 95, ethicalSolution: 95, total: 95 },
            explanation:
              'Pemisahan keuangan pribadi dan bisnis adalah fondasi kelangsungan usaha mikro yang sehat dan akuntabel.',
          },
        },
      },
      debrief: {
        keyTakeaway:
          'Pengeluaran pribadi pemilik usaha dicatat pada akun Prive (pengurang ekuitas) dan tidak boleh diakui sebagai beban usaha toko.',
        realWorldLesson:
          'Pencatatan yang jujur dan patuh standar akuntansi menghindarkan pengusaha dari risiko denda pajak dan kerancuan arus kas.',
      },
    },
  },
];
