/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D11: Manajemen Proyek & Produktivitas - Levels & Practice Exercises
 */

import { SimulationScenario } from '../../../components/engines/SimulationEngine';

export interface D11Level {
  id: string;
  domainId: 'D11';
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

export const D11_LEVELS: D11Level[] = [
  // LEVEL 1: Advanced Quiz Engine (Prioritas, WBS & Matriks Eisenhower)
  {
    id: 'D11-LEVEL-01',
    domainId: 'D11',
    skillId: 'D11-SKILL-01',
    title: 'Audit Prioritas Kerja & Dekomposisi WBS Proyek',
    subtitle: 'Uji analitis urutan siklus PMBOK, kuadran Eisenhower, dan mitigasi risiko proyek',
    tier: 1,
    engine: 'advanced-quiz-engine',
    scenarioBrief:
      'Perusahaan sedang menata tata kelola proyek kantor yang kerap mengalami keterlambatan tenggat. Selesaikan 10 soal analitis mencakup Matriks Eisenhower, aturan 100% WBS, logika float jalur kritis, dan Kanban WIP limits.',
    xpReward: 120,
    coinReward: 50,
    estimatedMinutes: 8,
    passThreshold: 70,
  },

  // LEVEL 2: Simulation Engine (Menghadapi Scope Creep Permintaan Klien/Atasan)
  {
    id: 'D11-LEVEL-02',
    domainId: 'D11',
    skillId: 'D11-SKILL-02',
    title: 'Menolak Penambahan Fitur Liar (Scope Creep) Secara Asertif',
    subtitle: 'Simulasi negosiasi ruang lingkup proyek dan formulir Change Request resmi',
    tier: 2,
    engine: 'simulation-engine',
    scenarioBrief:
      'Proyek sistem kasir cabang sedang berada di tahap uji akhir (UAT). Tiba-tiba manajer area mendesak menambahkan modul loyalty point tanpa menambah waktu tenggat atau anggaran. Tangani percakapan dengan diplomatis.',
    xpReward: 150,
    coinReward: 60,
    estimatedMinutes: 10,
    passThreshold: 70,
    simulationScenario: {
      id: 'scen-d11-02',
      title: 'Menangani Permintaan Perubahan Ruang Lingkup (Scope Creep)',
      scenarioContext:
        'Proyek sistem kasir cabang berada di tahap UAT. Manajer operasional mendesak penambahan modul loyalty sebelum rilis tanpa kompensasi waktu atau anggaran.',
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
          text: 'Budi, saya ingin modul poin loyalitas dan diskon ulang tahun otomatis dimasukkan ke sistem kasir sebelum peluncuran hari Senin depan. Jangan sampai kita kalah fitur dari kompetitor!',
          mode: 'choice',
          choices: [
            {
              id: 'c1',
              text: 'Siap Bu Sari! Tim kami akan lembur malam ini untuk menambahkan fiturnya tanpa mengubah tanggal peluncuran.',
              tradeoffExplanation:
                'Fatal! Menerima fitur tambahan di tahap akhir tanpa Change Request memicu kegagalan sistem saat peluncuran dan kelelahan staf.',
              rubric: { empathy: 20, clarity: 30, professionalFirmness: 20, ethicalSolution: 20 },
              reputationImpact: -3,
              feedbackTip: 'Hindari menyetujui perubahan ruang lingkup (scope creep) tanpa analisis dampak resmi.',
              nextNodeId: 'node-recovery',
            },
            {
              id: 'c2',
              text: 'Selamat siang Bu Sari. Kami memahami pentingnya modul loyalitas tersebut. Namun saat ini sistem kasir sudah di tahap uji akhir UAT pada jalur kritis. Solusi terbaik adalah rilis Fase 1 pokok hari Senin tepat waktu, dan modul loyalitas dijadwalkan pada Fase 2 via formulir Change Request resmi.',
              tradeoffExplanation:
                'Sangat tepat: prinsip phased rollout melindungi tanggal rilis pokok sambil tetap menampung kebutuhan bisnis via Change Request terstruktur.',
              rubric: { empathy: 90, clarity: 95, professionalFirmness: 95, ethicalSolution: 95 },
              reputationImpact: 4,
              feedbackTip: 'Sikap asertif berstandar PMBOK yang memisahkan fitur kritis vs tambahan.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-recovery': {
          id: 'node-recovery',
          speaker: 'sari',
          speakerName: 'Bu Sari',
          role: 'Direktur Operasional',
          text: 'Lembur semalam suntuk berisiko membuat kasir error di hari pertama! Apa ada alternatif yang lebih aman bagi operasional toko?',
          mode: 'choice',
          choices: [
            {
              id: 'c-rec',
              text: 'Mohon maaf Bu Sari. Solusi yang aman adalah kita luncurkan fitur pokok kasir terlebih dahulu, lalu jadwalkan modul loyalitas pada rilis pembaruan bulan depan secara tertib.',
              tradeoffExplanation: 'Menyadari risiko dan mengarahkan kembali ke tata kelola rilis bertahap.',
              rubric: { empathy: 75, clarity: 85, professionalFirmness: 80, ethicalSolution: 85 },
              reputationImpact: 1,
              feedbackTip: 'Bagus, segera tawarkan skema rilis bertahap yang realistis.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-assembly': {
          id: 'node-assembly',
          speaker: 'sari',
          speakerName: 'Bu Sari',
          role: 'Direktur Operasional',
          text: 'Baik, pembagian fase itu sangat masuk akal. Sekarang rumuskan memo kesepakatan Change Request yang akan dikirim ke direksi:',
          mode: 'assembly',
          sentenceBlocks: {
            available: [
              { id: 'b1', text: 'Peluncuran sistem pokok Fase 1 tetap berjalan sesuai jadwal hari Senin.', category: 'fakta' },
              { id: 'b2', text: 'Modul loyalitas tambahan dialihkan ke rilis Fase 2 setelah evaluasi beban kerja.', category: 'solusi' },
              { id: 'b3', text: 'Pengajuan perubahan ruang lingkup didokumentasikan via formulir Change Request resmi.', category: 'solusi' },
              { id: 'b4', text: 'Seluruh pemangku kepentingan menandatangani persetujuan dampak jadwal.', category: 'penutup' },
            ],
            validOrderIds: [
              ['b1', 'b2', 'b3', 'b4'],
              ['b3', 'b1', 'b2', 'b4'],
            ],
            rubricOnSuccess: { empathy: 95, clarity: 95, professionalFirmness: 95, ethicalSolution: 95, total: 95 },
            explanation:
              'Dokumentasi Change Request formal melindungi stabilitas peluncuran pokok dan mematuhi tata kelola manajemen proyek profesional.',
          },
        },
      },
      debrief: {
        keyTakeaway:
          'Menolak scope creep bukan berarti bersikap kaku, melainkan mengarahkan permintaan baru ke mekanisme Change Request dan peluncuran bertahap (phased rollout).',
        realWorldLesson:
          'Proyek yang sukses menjaga batasan ruang lingkup (scope baseline) agar biaya, jadwal, dan mutu tetap terkendali.',
      },
    },
  },

  // LEVEL 3: Advanced Quiz Engine (Mitigasi Risiko & Jalur Kritis)
  {
    id: 'D11-LEVEL-03',
    domainId: 'D11',
    skillId: 'D11-SKILL-03',
    title: 'Mitigasi Risiko Keterlambatan Vendor & Jalur Kritis',
    subtitle: 'Simulasi eskalasi risiko proyek berdasarkan Risk Register dan Contingency Plan',
    tier: 3,
    engine: 'advanced-quiz-engine',
    scenarioBrief:
      'Vendor perangkat jaringan mengabarkan pengiriman tertahan di pelabuhan. Evaluasi float jadwal bagan Gantt dan jalankan rencana mitigasi risiko tingkat lanjut.',
    xpReward: 180,
    coinReward: 75,
    estimatedMinutes: 12,
    passThreshold: 80,
  },

  // LEVEL 4: Simulation Engine (Resolusi Konflik Sumber Daya - Resource Leveling)
  {
    id: 'D11-LEVEL-04',
    domainId: 'D11',
    skillId: 'D11-SKILL-02',
    title: 'Resolusi Konflik Alokasi Sumber Daya Antara Dua Proyek Serentak',
    subtitle: 'Simulasi mediasi beban kerja tenaga ahli (resource leveling & critical path)',
    tier: 4,
    engine: 'simulation-engine',
    scenarioBrief:
      'Dua proyek strategis memperebutkan satu staf analis database senior pada pekan yang sama. Temukan solusi perataan sumber daya (Resource Leveling) yang adil.',
    xpReward: 200,
    coinReward: 85,
    estimatedMinutes: 12,
    passThreshold: 80,
    simulationScenario: {
      id: 'scen-d11-04',
      title: 'Resource Leveling Analis Database Lintas Proyek',
      scenarioContext:
        'Analis database dialokasikan 120% karena dua proyek bentrok di pekan yang sama. Dibutuhkan teknik penataan jadwal berbasis float jalur kritis.',
      targetCharacter: {
        id: 'reza',
        name: 'Pak Reza',
        role: 'Head of Project Operations',
      },
      startNodeId: 'node-start',
      nodes: {
        'node-start': {
          id: 'node-start',
          speaker: 'reza',
          speakerName: 'Pak Reza',
          role: 'Head of Project Operations',
          text: 'Budi, analis database kita dialokasikan 120% minggu depan karena Proyek Migrasi Cloud dan Proyek Audit Internal sama-sama butuh kehadirannya. Bagaimana kita menyelesaikan perebutan sumber daya ini?',
          mode: 'choice',
          choices: [
            {
              id: 'c1',
              text: 'Minta analis lembur malam setiap hari sampai jam 10 malam agar kedua proyek berjalan bersamaan.',
              tradeoffExplanation:
                'Memaksa lembur berkepanjangan memicu kelelahan ekstrem (burnout), tingkat kesalahan fatal, dan pengunduran diri staf kunci.',
              rubric: { empathy: 20, clarity: 40, professionalFirmness: 20, ethicalSolution: 10 },
              reputationImpact: -3,
              feedbackTip: 'Jangan jadikan lembur berlebihan sebagai solusi atas perencanaan kapasitas yang buruk.',
              nextNodeId: 'node-recovery',
            },
            {
              id: 'c2',
              text: 'Mari kita evaluasi float jadwal kedua proyek: pekerjaan audit internal memiliki kelonggaran waktu (float) 10 hari dan berada di luar jalur kritis, sedangkan migrasi cloud berada di jalur kritis tanpa kelonggaran. Kita alokasikan analis fokus penuh ke migrasi cloud terlebih dahulu, lalu jadwalkan pekerjaan audit 4 hari kemudian.',
              tradeoffExplanation:
                'Penerapan teknik Resource Leveling murni: memanfaatkan float aktivitas non-kritis untuk meratakan beban kerja tanpa menunda tenggat akhir proyek.',
              rubric: { empathy: 90, clarity: 95, professionalFirmness: 95, ethicalSolution: 95 },
              reputationImpact: 4,
              feedbackTip: 'Keputusan berbasis data jadwal yang sangat profesional.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-recovery': {
          id: 'node-recovery',
          speaker: 'reza',
          speakerName: 'Pak Reza',
          role: 'Head of Project Operations',
          text: 'Lembur setiap hari berisiko merusak sistem database kantor! Adakah jalan keluar teknis penjadwalan yang lebih rasional?',
          mode: 'choice',
          choices: [
            {
              id: 'c-rec',
              text: 'Benar Pak Reza. Kita manfaatkan kelonggaran float 10 hari pada proyek audit internal agar analis tidak over-alokasi.',
              tradeoffExplanation: 'Mengoreksi langkah dengan memanfaatkan float jadwal non-kritis.',
              rubric: { empathy: 75, clarity: 85, professionalFirmness: 80, ethicalSolution: 85 },
              reputationImpact: 1,
              feedbackTip: 'Tepat sekali, manfaatkan float untuk meratakan jadwal.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-assembly': {
          id: 'node-assembly',
          speaker: 'reza',
          speakerName: 'Pak Reza',
          role: 'Head of Project Operations',
          text: 'Keputusan yang sangat tepat. Sekarang susun rekomendasi tertulis Resource Leveling untuk laporan manajemen:',
          mode: 'assembly',
          sentenceBlocks: {
            available: [
              { id: 'b1', text: 'Mengidentifikasi tugas pada jalur kritis yang memiliki nol kelonggaran waktu (zero float).', category: 'fakta' },
              { id: 'b2', text: 'Menempatkan tenaga ahli database secara prioritas pada proyek migrasi cloud.', category: 'solusi' },
              { id: 'b3', text: 'Menggeser jadwal penugasan audit internal memanfaatkan float waktu 10 hari.', category: 'solusi' },
              { id: 'b4', text: 'Mencegah kelelahan staf dan menjaga kestabilan mutu implementasi kedua proyek.', category: 'penutup' },
            ],
            validOrderIds: [
              ['b1', 'b2', 'b3', 'b4'],
            ],
            rubricOnSuccess: { empathy: 95, clarity: 95, professionalFirmness: 100, ethicalSolution: 95, total: 96 },
            explanation:
              'Resource leveling menata alokasi sumber daya berdasarkan float bagan Gantt agar tidak memicu kelelahan staf.',
          },
        },
      },
      debrief: {
        keyTakeaway:
          'Resource leveling memanfaatkan kelonggaran waktu (float) tugas-tugas non-kritis untuk mengamankan jalur kritis dan mencegah staf mengalami kelebihan alokasi.',
        realWorldLesson:
          'Manajer proyek handal menyeimbangkan tuntutan tenggat dengan kesejahteraan tim melalui manajemen kapasitas berbasis data.',
      },
    },
  },
];
