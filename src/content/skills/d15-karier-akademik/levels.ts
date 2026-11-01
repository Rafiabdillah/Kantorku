/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D15: Karier & Metodologi Akademik - Levels & Practice Exercises
 */

import { SimulationScenario } from '../../../components/engines/SimulationEngine';

export interface D15Level {
  id: string;
  domainId: 'D15';
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

export const D15_LEVELS: D15Level[] = [
  // LEVEL 1: Advanced Quiz Engine (CV ATS & Deteksi Job Scam)
  {
    id: 'D15-LEVEL-01',
    domainId: 'D15',
    skillId: 'D15-SKILL-01',
    title: 'Audit Resume Ramah ATS & Deteksi Lowongan Palsu',
    subtitle: 'Uji analitis tata letak CV, formula pencapaian XYZ, dan identifikasi penipuan rekrutmen',
    tier: 1,
    engine: 'advanced-quiz-engine',
    scenarioBrief:
      'Persiapkan diri menghadapi bursa kerja modern: selesaikan 10 soal analitis mencakup eliminasi elemen perusak parsing ATS, verifikasi lowongan fiktif, dan penyusunan berkas lamaran berbobot.',
    xpReward: 120,
    coinReward: 50,
    estimatedMinutes: 8,
    passThreshold: 70,
  },

  // LEVEL 2: Simulation Engine (Simulasi Wawancara Kerja Bersama Maya HRD)
  {
    id: 'D15-LEVEL-02',
    domainId: 'D15',
    skillId: 'D15-SKILL-02',
    title: 'Simulasi Wawancara Kerja: Menjawab Pertanyaan Sulit Model STAR',
    subtitle: 'Latihan dialog interaktif menghadapi pertanyaan kelemahan diri dan negosiasi kompensasi',
    tier: 2,
    engine: 'simulation-engine',
    scenarioBrief:
      'Maya (HR & People Specialist) mewawancarai Anda untuk posisi staf operasional. Jawab pertanyaan dengan model STAR, tunjukkan kelemahan yang diimbangi solusi konkret, dan sampaikan ekspektasi kompensasi secara diplomatis.',
    xpReward: 150,
    coinReward: 60,
    estimatedMinutes: 10,
    passThreshold: 70,
    simulationScenario: {
      id: 'scen-d15-02',
      title: 'Wawancara Kompetensi Kerja Bersama Maya HRD',
      scenarioContext:
        'Sesi wawancara tahap akhir untuk penempatan staf operasional. Maya menguji kedewasaan sikap kerja, pemecahan masalah nyata, dan komunikasi asertif.',
      targetCharacter: {
        id: 'maya',
        name: 'Maya',
        role: 'HR & People Specialist PT Maju Sejahtera',
      },
      startNodeId: 'node-start',
      nodes: {
        'node-start': {
          id: 'node-start',
          speaker: 'maya',
          speakerName: 'Maya (HR Specialist)',
          role: 'HR & People Specialist',
          text: 'Selamat pagi! Di resume Anda tertulis pernah memimpin digitalisasi arsip. Ceritakan situasi paling menantang saat itu dan bagaimana Anda menyelesaikannya?',
          mode: 'choice',
          choices: [
            {
              id: 'c1',
              text: 'Wah waktu itu tim saya lambat sekali bekerja, jadi semuanya terpaksa saya kerjakan sendiri sampai malam agar selesai.',
              tradeoffExplanation:
                'Menyalahkan rekan kerja dan memposisikan diri sebagai pahlawan tunggal menunjukkan rendahnya kecerdasan emosional dan kemampuan kolaborasi.',
              rubric: { empathy: 30, clarity: 50, professionalFirmness: 40, ethicalSolution: 20 },
              reputationImpact: -3,
              feedbackTip: 'Gunakan kerangka STAR yang objektif, bukan mengeluhkan tim.',
              nextNodeId: 'node-weakness-recovery',
            },
            {
              id: 'c2',
              text: 'Saat itu tenggat waktu tersisa 5 hari namun 30% arsip fisik belum terindeks (Situation & Task). Saya membagi tim menjadi 2 pos paralel (Action) sehingga proyek tuntas 1 hari lebih cepat dengan akurasi 99% (Result).',
              tradeoffExplanation:
                'Struktur STAR yang sempurna: spesifik, berbasis tindakan nyata, dan diakhiri metrik pencapaian yang terukur.',
              rubric: { empathy: 90, clarity: 95, professionalFirmness: 95, ethicalSolution: 95 },
              reputationImpact: 4,
              feedbackTip: 'Luar biasa! Penyampaian STAR yang sangat rapi dan meyakinkan.',
              nextNodeId: 'node-weakness-assembly',
            },
          ],
        },
        'node-weakness-recovery': {
          id: 'node-weakness-recovery',
          speaker: 'maya',
          speakerName: 'Maya (HR Specialist)',
          role: 'HR & People Specialist',
          text: 'Kami di sini sangat mengutamakan sinergi lintas bagian. Bagaimana sebenarnya pandangan Anda terhadap kelemahan diri Anda sendiri saat bekerja dalam tim?',
          mode: 'choice',
          choices: [
            {
              id: 'c-rec',
              text: 'Saya sadar bahwa kecenderungan mengambil alih beban kerja adalah kelemahan saya. Sekarang saya aktif menerapkan manajemen delegasi tugas terstruktur dengan papan pantau visual.',
              tradeoffExplanation: 'Mengakui area pengembangan diri secara dewasa dan menunjukkan perbaikan nyata.',
              rubric: { empathy: 80, clarity: 85, professionalFirmness: 85, ethicalSolution: 90 },
              reputationImpact: 2,
              feedbackTip: 'Bagus, mengakui kelemahan dengan solusi mitigasi konkret.',
              nextNodeId: 'node-weakness-assembly',
            },
          ],
        },
        'node-weakness-assembly': {
          id: 'node-weakness-assembly',
          speaker: 'maya',
          speakerName: 'Maya (HR Specialist)',
          role: 'HR & People Specialist',
          text: 'Bagus. Terakhir, jika Anda diterima, bagaimana Anda akan menavigasi prioritas dan membuktikan kontribusi pada bulan pertama?',
          mode: 'assembly',
          sentenceBlocks: {
            available: [
              { id: 'b1', text: 'Saya akan mempelajari SOP divisi dan memahami alur kerja rekan kerja dengan saksama.', category: 'empati' },
              { id: 'b2', text: 'Mengidentifikasi 1 hingga 2 hambatan operasional harian yang dapat diotomasi secara cepat.', category: 'solusi' },
              { id: 'b3', text: 'Melakukan koordinasi mingguan dengan atasan untuk menyelaraskan ekspektasi hasil kerja.', category: 'fakta' },
              { id: 'b4', text: 'Memberikan dampak positif nyata tanpa mengganggu ritme kerja rekan kerja senior.', category: 'penutup' },
            ],
            validOrderIds: [
              ['b1', 'b2', 'b3', 'b4'],
              ['b1', 'b3', 'b2', 'b4'],
            ],
            rubricOnSuccess: { empathy: 95, clarity: 95, professionalFirmness: 95, ethicalSolution: 100, total: 96 },
            explanation:
              'Rencana orientasi 30 hari pertama yang matang: mendengar & mengobservasi budaya -> menyelaraskan ekspektasi -> menyelesaikan tugas dengan dampak terukur.',
          },
        },
      },
      debrief: {
        keyTakeaway:
          'Kunci sukses wawancara kerja adalah struktur STAR (Situation, Task, Action, Result) dan kedewasaan profesional saat mengakui area evaluasi diri (Self-awareness & Mitigation).',
        realWorldLesson:
          'Pewawancara HR (Maya) lebih menghargai kandidat yang terbuka mengakui tantangan dan memiliki solusi mitigasi terukur dibanding kandidat yang mengaku serba sempurna tanpa bukti.',
      },
    },
  },

  // LEVEL 3: Advanced Quiz Engine (Metodologi Penelitian & Sitasi APA 7)
  {
    id: 'D15-LEVEL-03',
    domainId: 'D15',
    skillId: 'D15-SKILL-03',
    title: 'Audit Metodologi Penelitian & Standar Rujukan APA 7',
    subtitle: 'Uji kaidah sitasi ilmiah, perumusan masalah, parafrase anti-plagiarisme, dan skala kuesioner',
    tier: 3,
    engine: 'advanced-quiz-engine',
    scenarioBrief:
      'Periksa draf proposal studi kasus bisnis dan metodologi laporan akhir: pastikan format sitasi APA edisi ke-7 dipatuhi, identifikasi kalimat berindikasi plagiasi, dan verifikasi konsistensi rumusan masalah.',
    xpReward: 160,
    coinReward: 70,
    estimatedMinutes: 8,
    passThreshold: 80,
  },

  // LEVEL 4: Simulation Engine (Negosiasi Offering Letter & Rencana 90 Hari)
  {
    id: 'D15-LEVEL-04',
    domainId: 'D15',
    skillId: 'D15-SKILL-02',
    title: 'Simulasi Negosiasi Penawaran Kerja & Rencana Aksi 90 Hari',
    subtitle: 'Latihan komunikasi persuasif mendiskusikan paket kompensasi dan roadmap onboarding',
    tier: 3,
    engine: 'simulation-engine',
    scenarioBrief:
      'Maya (HR Specialist) menyampaikan surat penawaran kerja (Offering Letter). Anda perlu mendiskusikan klausul tunjangan, fasilitas penunjang kerja, serta mempresentasikan roadmap kontribusi 90 hari pertama secara diplomatis dan berdasar riset standar industri.',
    xpReward: 180,
    coinReward: 80,
    estimatedMinutes: 12,
    passThreshold: 80,
    simulationScenario: {
      id: 'scen-d15-04',
      title: 'Negosiasi Penawaran Kerja Profesional Bersama Maya HRD',
      scenarioContext:
        'Tahap pembahasan offering letter. Keseimbangan antara menghargai tawaran perusahaan dan memperjuangkan nilai kontribusi profesional secara rasional.',
      targetCharacter: {
        id: 'maya',
        name: 'Maya',
        role: 'HR & People Specialist',
      },
      startNodeId: 'node-offer-start',
      nodes: {
        'node-offer-start': {
          id: 'node-offer-start',
          speaker: 'maya',
          speakerName: 'Maya (HR Specialist)',
          role: 'HR & People Specialist',
          text: 'Selamat Budi! Direksi telah menyetujui rekomendasi kami. Kami menawarkan posisi Staf Operasional dengan gaji pokok Rp 4.500.000. Bagaimana tanggapan Anda?',
          mode: 'choice',
          choices: [
            {
              id: 'c-demanding',
              text: 'Gaji segitu terlalu kecil untuk keahlian saya! Kantor sebelah berani menawar lebih tinggi, tolong naikkan minimal Rp 6.000.000 atau saya tolak.',
              tradeoffExplanation:
                'Nada arogan dan ultimatum agresif merusak hubungan kerja sama dan mencerminkan etika diplomasi yang buruk.',
              rubric: { empathy: 20, clarity: 50, professionalFirmness: 30, ethicalSolution: 20 },
              reputationImpact: -3,
              feedbackTip: 'Sampaikan apresiasi terlebih dahulu sebelum mengajukan rentang berbasis data.',
              nextNodeId: 'node-offer-negotiate',
            },
            {
              id: 'c-principled',
              text: 'Terima kasih banyak atas penawaran ini Bu Maya. Berdasarkan hasil riset pasar dan portofolio otomasi yang saya miliki, apakah masih ada ruang penyesuaian di kisaran Rp 5.000.000 atau kompensasi tunjangan kesehatan?',
              tradeoffExplanation:
                'Teknik Principled Negotiation: diawali apresiasi, berdasar data pasar, dan menawarkan fleksibilitas (tunjangan sebagai alternatif).',
              rubric: { empathy: 90, clarity: 95, professionalFirmness: 95, ethicalSolution: 95 },
              reputationImpact: 4,
              feedbackTip: 'Sangat profesional: tegas pada substansi, santun pada hubungan personal.',
              nextNodeId: 'node-offer-plan-assembly',
            },
          ],
        },
        'node-offer-negotiate': {
          id: 'node-offer-negotiate',
          speaker: 'maya',
          speakerName: 'Maya (HR Specialist)',
          role: 'HR & People Specialist',
          text: 'Kami memiliki struktur penggajian standar untuk staf baru. Namun kami terbuka untuk mendiskusikan fasilitas dan bonus performa kerja.',
          mode: 'choice',
          choices: [
            {
              id: 'c-offer-bridge',
              text: 'Baik Bu Maya, saya sangat menghargai kebijakan struktur perusahaan. Mari kita diskusikan skema bonus berbasis capaian target performa kerja.',
              tradeoffExplanation: 'Mengarahkan negosiasi ke metrik performa yang saling menguntungkan (win-win).',
              rubric: { empathy: 85, clarity: 90, professionalFirmness: 85, ethicalSolution: 90 },
              reputationImpact: 2,
              feedbackTip: 'Pilihan konstruktif mengalihkan fokus ke kontribusi nyata.',
              nextNodeId: 'node-offer-plan-assembly',
            },
          ],
        },
        'node-offer-plan-assembly': {
          id: 'node-offer-plan-assembly',
          speaker: 'maya',
          speakerName: 'Maya (HR Specialist)',
          role: 'HR & People Specialist',
          text: 'Kesepakatan tercapai. Untuk meyakinkan manajemen, bagaimana komitmen rencana kerja 90 hari pertama Anda?',
          mode: 'assembly',
          sentenceBlocks: {
            available: [
              { id: 'b1', text: 'Hari 1-30: Menguasai alur sistem internal dan memetakan kebutuhan operasional unit kerja.', category: 'fakta' },
              { id: 'b2', text: 'Hari 31-60: Mulai mengeksekusi tanggung jawab penuh dan mengusulkan 1 otomasi template kerja.', category: 'solusi' },
              { id: 'b3', text: 'Hari 61-90: Mengukur efisiensi kerja tim serta melakukan evaluasi berkala bersama mentor divisi.', category: 'fakta' },
              { id: 'b4', text: 'Berkomitmen memberikan kontribusi stabil dan mendukung tercapainya target triwulanan perusahaan.', category: 'penutup' },
            ],
            validOrderIds: [
              ['b1', 'b2', 'b3', 'b4'],
              ['b1', 'b3', 'b2', 'b4'],
            ],
            rubricOnSuccess: { empathy: 95, clarity: 95, professionalFirmness: 100, ethicalSolution: 100, total: 97 },
            explanation:
              'Framework 30-60-90 Day Plan: Learn (0-30) -> Build/Perform (31-60) -> Optimize & Lead (61-90) adalah bukti konkret profesionalisme kandidat bernilai tinggi.',
          },
        },
      },
      debrief: {
        keyTakeaway:
          'Negosiasi kerja bukan konfrontasi menang-kalah, melainkan penyelarasan nilai kontribusi (Principled Negotiation Fisher & Ury): apresiasi -> sampaikan data pasar -> tawarkan rencana aksi 90 hari terukur.',
        realWorldLesson:
          'Kandidat yang mampu mempresentasikan rencana onboarding terstruktur mendapatkan kepercayaan lebih tinggi dari HR dan direksi.',
      },
    },
  },
];
