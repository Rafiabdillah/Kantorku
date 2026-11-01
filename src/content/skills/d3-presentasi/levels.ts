/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D3: Presentasi & Visual Storytelling - Levels & Practice Exercises
 */

import { SimulationScenario } from '../../../components/engines/SimulationEngine';

export interface D3Level {
  id: string;
  domainId: 'D3';
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

export const D3_LEVELS: D3Level[] = [
  // LEVEL 1: Advanced Quiz Engine (Piramida Minto, Prinsip BLUF & Tipografi 16:9)
  {
    id: 'D3-LEVEL-01',
    domainId: 'D3',
    skillId: 'D3-SKILL-01',
    title: 'Audit Struktur Alur Cerita & Tipografi Slide Bisnis',
    subtitle: 'Uji analitis urutan SCQA, rasio kontras WCAG, dan pemilihan grafik analitis yang tepat',
    tier: 1,
    engine: 'advanced-quiz-engine',
    scenarioBrief:
      'Perusahaan sedang meningkatkan standar dek slide presentasi pimpinan untuk rapat pemangku kepentingan. Selesaikan 10 soal analitis mencakup alur SCQA, Action Title vs topik pasif, rasio kontras visual, dan eliminasi chartjunk.',
    xpReward: 120,
    coinReward: 50,
    estimatedMinutes: 8,
    passThreshold: 70,
  },

  // LEVEL 2: Simulation Engine (Restrukturisasi Slide Menjadi BLUF & Action Titles)
  {
    id: 'D3-LEVEL-02',
    domainId: 'D3',
    skillId: 'D3-SKILL-02',
    title: 'Restrukturisasi Slide Laporan Menjadi BLUF & Action Titles',
    subtitle: 'Simulasi memangkas slide berlebihan dan menyusun Action Title berbasis data',
    tier: 2,
    engine: 'simulation-engine',
    scenarioBrief:
      'Draf slide awal setebal 45 halaman penuh teks kecil-kecil, sedangkan waktu presentasi di depan direksi hanya 10 menit. Restrukturisasi materi menggunakan prinsip Bottom Line Up Front bersama Maya (HR & People Specialist).',
    xpReward: 150,
    coinReward: 60,
    estimatedMinutes: 10,
    passThreshold: 70,
    simulationScenario: {
      id: 'scen-d3-02',
      title: 'Restrukturisasi Slide Evaluasi Menjadi BLUF & Action Titles',
      scenarioContext:
        'Sesi kurasi materi presentasi eksekutif 10 menit. Maya mendiskusikan cara menyederhanakan data kompleks menjadi pesan strategis terarah.',
      targetCharacter: {
        id: 'maya',
        name: 'Maya',
        role: 'People & Communication Specialist',
      },
      startNodeId: 'node-start',
      nodes: {
        'node-start': {
          id: 'node-start',
          speaker: 'maya',
          speakerName: 'Maya',
          role: 'People & Communication Specialist',
          text: 'Budi, draf slide evaluasi kita setebal 45 slide dan penuh teks kecil. Waktu presentasi di depan direksi hanya 10 menit. Bagaimana cara kita merestrukturisasi materi agar tidak membosankan?',
          mode: 'choice',
          choices: [
            {
              id: 'c1',
              text: 'Biarkan tetap 45 slide, kita bacakan cepat-cepat tiap slide 10 detik agar semua data tersampaikan.',
              tradeoffExplanation:
                'Menayangkan slide terlalu cepat membuat audiens kebingungan dan gagal menangkap pesan inti rekomendasi bisnis.',
              rubric: { empathy: 20, clarity: 30, professionalFirmness: 20, ethicalSolution: 20 },
              reputationImpact: -3,
              feedbackTip: 'Pangkas jumlah slide dan fokuskan pesan pada rekomendasi utama.',
              nextNodeId: 'node-recovery',
            },
            {
              id: 'c2',
              text: 'Terapkan prinsip BLUF (Bottom Line Up Front): pangkas menjadi 10 slide kunci yang langsung menyampaikan kesimpulan dan rekomendasi utama di awal, sedangkan rincian tabel teknis dipindahkan ke bagian lampiran (appendix).',
              tradeoffExplanation:
                'Struktur eksekutif yang sangat tepat: menghargai waktu direksi dengan menempatkan kesimpulan di awal dan menyederhanakan beban kognitif visual.',
              rubric: { empathy: 90, clarity: 95, professionalFirmness: 95, ethicalSolution: 95 },
              reputationImpact: 4,
              feedbackTip: 'Sangat profesional: menerapkan standar piramida Minto dan BLUF.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-recovery': {
          id: 'node-recovery',
          speaker: 'maya',
          speakerName: 'Maya',
          role: 'People & Communication Specialist',
          text: 'Membacakan 45 slide dalam 10 menit pasti membuat direksi jenuh! Apa ada pendekatan penyederhanaan yang lebih efektif?',
          mode: 'choice',
          choices: [
            {
              id: 'c-rec',
              text: 'Benar Bu Maya, mari kita susun 10 slide inti dengan pesan utama di awal dan simpan detail tabel di lampiran.',
              tradeoffExplanation: 'Menyadari kelemahan slide padat dan beralih ke kerangka BLUF.',
              rubric: { empathy: 75, clarity: 85, professionalFirmness: 80, ethicalSolution: 85 },
              reputationImpact: 1,
              feedbackTip: 'Tepat sekali, fokuskan pada poin kesimpulan di slide pembuka.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-assembly': {
          id: 'node-assembly',
          speaker: 'maya',
          speakerName: 'Maya',
          role: 'People & Communication Specialist',
          text: 'Bagus sekali! Sekarang rumuskan Action Title berbasis metrik hasil kerja untuk menggantikan judul pasif "Grafik Operasional":',
          mode: 'assembly',
          sentenceBlocks: {
            available: [
              { id: 'b1', text: 'Otomasi alur sistem inventaris pergudangan', category: 'fakta' },
              { id: 'b2', text: 'berhasil memangkas biaya operasional sebesar 25%,', category: 'fakta' },
              { id: 'b3', text: 'menghemat anggaran belanja rutin Rp40 juta per kuartal.', category: 'solusi' },
              { id: 'b4', text: 'Manajemen merekomendasikan ekspansi ke cabang regional.', category: 'penutup' },
            ],
            validOrderIds: [
              ['b1', 'b2', 'b3', 'b4'],
            ],
            rubricOnSuccess: { empathy: 95, clarity: 95, professionalFirmness: 95, ethicalSolution: 95, total: 95 },
            explanation:
              'Action Title yang menyajikan subjek, aksi, metrik dampak kuantitatif, dan arahan keputusan jauh lebih persuasif daripada judul topik pasif.',
          },
        },
      },
      debrief: {
        keyTakeaway:
          'Presentasi eksekutif menuntut Bottom Line Up Front (BLUF): sampaikan rekomendasi dan hasil terpenting di muka, lalu gunakan Action Title untuk memandu fokus audiens.',
        realWorldLesson:
          'Di lingkungan korporat, pimpinan mengambil keputusan dari kejelasan insight dan arah tindakan, bukan dari banyaknya teks di slide.',
      },
    },
  },

  // LEVEL 3: Advanced Quiz Engine (Visualisasi Data & Eliminasi Chartjunk)
  {
    id: 'D3-LEVEL-03',
    domainId: 'D3',
    skillId: 'D3-SKILL-03',
    title: 'Membawakan Pitch Deck & Visualisasi Data Efektif',
    subtitle: 'Simulasi meyakinkan dewan pimpinan mitra dengan visualisasi data dan traksi nyata',
    tier: 3,
    engine: 'advanced-quiz-engine',
    scenarioBrief:
      'Perusahaan sedang mempersiapkan tender pengadaan skala besar. Evaluasi ketepatan tipe bagan (bar chart horizontal vs pie chart 3D), hierarki kontras, dan pemformatan data.',
    xpReward: 180,
    coinReward: 75,
    estimatedMinutes: 12,
    passThreshold: 80,
  },

  // LEVEL 4: Simulation Engine (Penyusunan Dek Redesain & Manajemen Waktu 12 Menit)
  {
    id: 'D3-LEVEL-04',
    domainId: 'D3',
    skillId: 'D3-SKILL-02',
    title: 'Redesain Dek Presentasi Eksekutif & Manajemen Waktu 12 Menit',
    subtitle: 'Simulasi tata letak visual 16:9, kontras warna WCAG, dan pembagian waktu tanya jawab',
    tier: 4,
    engine: 'simulation-engine',
    scenarioBrief:
      'Tinjau draf slide rekan kerja yang memuat warna kontras buruk dan teks berjubel. Bimbing rekan kerja memperbaiki kontras warna dan menyusun alokasi waktu tanya jawab bersama Dimas.',
    xpReward: 200,
    coinReward: 85,
    estimatedMinutes: 12,
    passThreshold: 80,
    simulationScenario: {
      id: 'scen-d3-04',
      title: 'Redesain Visual Slide & Manajemen Alokasi Waktu',
      scenarioContext:
        'Sesi evaluasi slide internal bersama Dimas sebelum presentasi ke investor. Menyeimbangkan estetika visual dengan kejelasan informasi.',
      targetCharacter: {
        id: 'dimas',
        name: 'Dimas',
        role: 'Rekan Kerja Tim Operasional',
      },
      startNodeId: 'node-start',
      nodes: {
        'node-start': {
          id: 'node-start',
          speaker: 'dimas',
          speakerName: 'Dimas',
          role: 'Rekan Kerja Tim',
          text: 'Budi, saya pakai latar slide warna kuning cerah dengan teks font warna abu-abu muda, terus waktu 12 menit saya habiskan semuanya untuk membaca slide. Gimana menurutmu?',
          mode: 'choice',
          choices: [
            {
              id: 'c1',
              text: 'Keren banget Dimas, warna kuning kelihatan ceria dan membaca seluruh slide memastikan kita tidak lupa detail.',
              tradeoffExplanation:
                'Fatal! Teks abu-abu di atas latar kuning melanggar rasio kontras WCAG sehingga tidak terbaca di proyektor, dan menghabiskan seluruh waktu tanpa sesi tanya jawab memicu komplain audiens.',
              rubric: { empathy: 30, clarity: 20, professionalFirmness: 10, ethicalSolution: 10 },
              reputationImpact: -3,
              feedbackTip: 'Gunakan rasio kontras tinggi dan sediakan waktu minimal 30% untuk tanya jawab.',
              nextNodeId: 'node-recovery',
            },
            {
              id: 'c2',
              text: 'Dimas, teks abu-abu di latar kuning tidak lulus rasio kontras WCAG (sulit dibaca di proyektor). Kita ganti dengan teks gelap di atas latar putih bersih. Untuk waktu 12 menit: 7 menit paparan inti BLUF dan 5 menit dialokasikan untuk tanya jawab interaktif.',
              tradeoffExplanation:
                'Kombinasi standar aksesibilitas visual WCAG dan manajemen waktu presentasi profesional (60% pemaparan, 40% diskusi).',
              rubric: { empathy: 90, clarity: 95, professionalFirmness: 95, ethicalSolution: 95 },
              reputationImpact: 4,
              feedbackTip: 'Solusi teknis desain yang ramah audiens dan berstandar industri.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-recovery': {
          id: 'node-recovery',
          speaker: 'dimas',
          speakerName: 'Dimas',
          role: 'Rekan Kerja Tim',
          text: 'Waduh, tadi saya tes di layar proyektor buram sekali! Bagaimana standar warna dan pembagian waktunya yang benar?',
          mode: 'choice',
          choices: [
            {
              id: 'c-rec',
              text: 'Gunakan kontras tinggi (teks hitam pekat di latar terang), batasi paparan maksimal 7 menit, dan sisakan 5 menit untuk diskusi.',
              tradeoffExplanation: 'Memperbaiki kekeliruan dengan rekomendasi kontras dan alokasi tanya jawab.',
              rubric: { empathy: 80, clarity: 85, professionalFirmness: 80, ethicalSolution: 85 },
              reputationImpact: 1,
              feedbackTip: 'Sangat baik, arahkan ke aturan kontras dan alokasi tanya jawab.',
              nextNodeId: 'node-assembly',
            },
          ],
        },
        'node-assembly': {
          id: 'node-assembly',
          speaker: 'dimas',
          speakerName: 'Dimas',
          role: 'Rekan Kerja Tim',
          text: 'Terima kasih Budi! Sekarang bantu saya susun catatan pembicara untuk slide pembuka agar alur bicara teratur:',
          mode: 'assembly',
          sentenceBlocks: {
            available: [
              { id: 'b1', text: 'Menyampaikan salam pembuka dan mengumumkan tujuan rapat dalam 30 detik pertama.', category: 'pembuka' },
              { id: 'b2', text: 'Menegaskan pesan Bottom Line Up Front tanpa membaca slide kata per kata.', category: 'fakta' },
              { id: 'b3', text: 'Menjelaskan diagram alur perbaikan layanan dengan kontak visual ke audiens.', category: 'solusi' },
              { id: 'b4', text: 'Membuka sesi tanya jawab terpandu pada menit ketujuh dengan catatan waktu terjaga.', category: 'penutup' },
            ],
            validOrderIds: [
              ['b1', 'b2', 'b3', 'b4'],
            ],
            rubricOnSuccess: { empathy: 95, clarity: 95, professionalFirmness: 95, ethicalSolution: 95, total: 95 },
            explanation:
              'Catatan pembicara menjaga presenter tetap fokus pada pesan inti dan tidak terjebak membaca teks slide.',
          },
        },
      },
      debrief: {
        keyTakeaway:
          'Slide adalah pendukung visual presenter, bukan dokumen bacaan. Terapkan kontras tinggi dan alokasikan waktu cukup untuk interaksi tanya jawab.',
        realWorldLesson:
          'Komunikator profesional menguasai panggung dengan kontak mata dan struktur waktu yang disiplin.',
      },
    },
  },
];
