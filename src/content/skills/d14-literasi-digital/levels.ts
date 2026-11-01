/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D14: Literasi Digital, Keamanan & AI - Levels & Practice Exercises
 */

import { SimulationScenario } from '../../../components/engines/SimulationEngine';

export interface D14Level {
  id: string;
  domainId: 'D14';
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

export const D14_LEVELS: D14Level[] = [
  // LEVEL 1: Advanced Quiz Engine (Deteksi Phishing & Keamanan Akun)
  {
    id: 'D14-LEVEL-01',
    domainId: 'D14',
    skillId: 'D14-SKILL-01',
    title: 'Audit Keamanan Siber & Deteksi Red Flag Phishing',
    subtitle: 'Uji analitis urutan tanggap darurat, inspeksi domain, dan klasifikasi ancaman siber',
    tier: 1,
    engine: 'advanced-quiz-engine',
    scenarioBrief:
      'Perusahaan sedang meningkatkan standar keamanan siber menyusul maraknya email penipuan di industri. Selesaikan 10 soal analitis mencakup isolasi insiden, formula prompt AI 5-elemen, dan proteksi data pribadi UU PDP.',
    xpReward: 120,
    coinReward: 50,
    estimatedMinutes: 8,
    passThreshold: 70,
  },

  // LEVEL 2: Simulation Engine (Rekayasa Sosial & Permintaan Data Sensitif)
  {
    id: 'D14-LEVEL-02',
    domainId: 'D14',
    skillId: 'D14-SKILL-02',
    title: 'Menghadapi Permintaan Data Rahasia dari Atasan Gadungan',
    subtitle: 'Simulasi percakapan asertif menolak rekayasa sosial tanpa melanggar etika kerja',
    tier: 2,
    engine: 'simulation-engine',
    scenarioBrief:
      'Sebuah nomor tidak dikenal mengirim pesan chat mengaku sebagai Bu Sari (Direktur Operasional PT Maju Sejahtera). Pengirim mendesak meminta daftar nomor rekening dan data gaji karyawan dengan dalih audit darurat di luar kota.',
    xpReward: 150,
    coinReward: 60,
    estimatedMinutes: 10,
    passThreshold: 70,
    simulationScenario: {
      id: 'scen-d14-02',
      title: 'Menolak Rekayasa Sosial Permintaan Data Rekening Karyawan',
      scenarioContext:
        'Seseorang menggunakan foto profil Bu Sari di nomor WhatsApp asing mendesak transfer data rahasia. Situasi menuntut ketegasan mematuhi SOP keamanan informasi.',
      targetCharacter: {
        id: 'sari',
        name: 'Bu Sari',
        role: 'Operational Director (Pemberi Tugas Asli)',
      },
      startNodeId: 'node-start',
      nodes: {
        'node-start': {
          id: 'node-start',
          speaker: 'sari',
          speakerName: 'Nomor Asing (Mengaku Bu Sari)',
          role: 'Kontak Tidak Dikenal',
          text: 'Halo Budi! Ini nomor baru saya, HP kantor saya tertinggal di taksi bandara. Tolong kirimkan file rekap nomor rekening dan rincian gaji seluruh staf divisi sekarang juga, sangat darurat untuk pelaporan rapat direksi pusat!',
          mode: 'choice',
          choices: [
            {
              id: 'c1',
              text: 'Siap Bu Sari! Karena darurat, saya langsung kirimkan file Excel gajinya ke nomor ini detik ini juga.',
              tradeoffExplanation:
                'Fatal! Mengirimkan data rahasia tanpa verifikasi ke nomor tak dikenal melanggar UU PDP dan menyebabkan kebocoran data fatal.',
              rubric: { empathy: 20, clarity: 30, professionalFirmness: 10, ethicalSolution: 10 },
              reputationImpact: -3,
              feedbackTip: 'Dilarang keras mengirim data finansial ke kontak asing tanpa konfirmasi.',
              nextNodeId: 'node-leak-disaster',
            },
            {
              id: 'c2',
              text: 'Selamat siang Bu Sari. Mohon maaf sebesar-besarnya, sesuai SOP Keamanan Informasi kantor, data penggajian dan rekening karyawan bersifat rahasia dan tidak dapat dikirimkan melalui pesan chat pribadi.',
              tradeoffExplanation:
                'Sikap asertif yang tepat: tetap sopan namun memegang teguh batas SOP perlindungan data rahasia.',
              rubric: { empathy: 85, clarity: 95, professionalFirmness: 95, ethicalSolution: 100 },
              reputationImpact: 3,
              feedbackTip: 'Sangat baik, mengutamakan kepatuhan SOP di atas tekanan urgensi semu.',
              nextNodeId: 'node-verification-assembly',
            },
          ],
        },
        'node-leak-disaster': {
          id: 'node-leak-disaster',
          speaker: 'sari',
          speakerName: 'Nomor Asing',
          role: 'Kontak Mencurigakan',
          text: 'Bagus! Segera kirimkan juga kata sandi portal perbankan kantor sekalian ya agar saya bisa langsung bayar!',
          mode: 'choice',
          choices: [
            {
              id: 'c-stop',
              text: 'Tunggu, ini melanggar semua aturan keamanan. Saya batalkan pengiriman dan akan mengonfirmasi langsung ke sekretariat Bu Sari di kantor pusat.',
              tradeoffExplanation: 'Menyadari bahaya di detik terakhir dan menghentikan interaksi.',
              rubric: { empathy: 60, clarity: 80, professionalFirmness: 80, ethicalSolution: 80 },
              reputationImpact: 1,
              feedbackTip: 'Untung segera sadar dan memutus rantai kebocoran.',
              nextNodeId: 'node-verification-assembly',
            },
          ],
        },
        'node-verification-assembly': {
          id: 'node-verification-assembly',
          speaker: 'sari',
          speakerName: 'Nomor Asing',
          role: 'Kontak Tidak Dikenal',
          text: 'Kenapa Anda berbelit-belit?! Kalau rapat direksi gagal karena keterlambatan Anda, posisi Anda yang akan saya evaluasi!',
          mode: 'assembly',
          sentenceBlocks: {
            available: [
              { id: 'b1', text: 'Saya sangat menghargai urgensi agenda Ibu di luar kota.', category: 'empati' },
              { id: 'b2', text: 'Namun demi integritas akun Ibu dan keamanan data perusahaan, saya wajib memverifikasi permintaan ini.', category: 'fakta' },
              { id: 'b3', text: 'Saya akan menghubungi telepon kantor resmi Bu Sari dan sekretaris direksi sekarang juga untuk otentikasi.', category: 'solusi' },
              { id: 'b4', text: 'Jika benar terkonfirmasi, file hanya akan dibagikan via folder cloud resmi berotentikasi 2FA.', category: 'penutup' },
            ],
            validOrderIds: [
              ['b1', 'b2', 'b3', 'b4'],
              ['b2', 'b1', 'b3', 'b4'],
            ],
            rubricOnSuccess: { empathy: 95, clarity: 95, professionalFirmness: 100, ethicalSolution: 100, total: 97 },
            explanation:
              'Kombinasi menghormati urgensi -> menyatakan aturan keamanan -> menawarkan verifikasi via saluran resmi -> menyalurkan via platform terenkripsi adalah standar emas pertahanan rekayasa sosial.',
          },
        },
      },
      debrief: {
        keyTakeaway:
          'Penipu rekayasa sosial selalu mengeksploitasi kepanikan bawahan terhadap figur otoritas. Bertindak tenang, patuhi SOP kerahasiaan data (UU PDP), dan selalu verifikasi via saluran kedua (Two-Channel Verification).',
        realWorldLesson:
          'Direktur sungguhan (Bu Sari) akan sangat menghargai keteguhan staf yang melindungi aset rahasia perusahaan dibanding staf yang ceroboh menyerahkan kredensial karena takut dibentak.',
      },
    },
  },

  // LEVEL 3: Advanced Quiz Engine (Etika AI & Validasi Anti-Halusinasi)
  {
    id: 'D14-LEVEL-03',
    domainId: 'D14',
    skillId: 'D14-SKILL-03',
    title: 'Audit Keandalan AI & Verifikasi Fakta Dokumen',
    subtitle: 'Uji ketelitian memeriksa draf hasil AI, data halusinasi, dan perlindungan privasi prompt',
    tier: 3,
    engine: 'advanced-quiz-engine',
    scenarioBrief:
      'Perusahaan sedang menyusun pedoman penggunaan AI generatif bagi seluruh staf. Evaluasi draf instruksi prompt, identifikasi pembocoran rahasia perusahaan, dan temukan kekeliruan fakta sebelum naskah dipublikasikan.',
    xpReward: 160,
    coinReward: 70,
    estimatedMinutes: 8,
    passThreshold: 80,
  },

  // LEVEL 4: Simulation Engine (Tanggap Darurat Kebocoran Data & UU PDP)
  {
    id: 'D14-LEVEL-04',
    domainId: 'D14',
    skillId: 'D14-SKILL-02',
    title: 'Tanggap Darurat Kebocoran Kredensial & Prosedur UU PDP',
    subtitle: 'Simulasi kepatuhan mitigasi insiden siber, isolasi akun terinfeksi, dan pelaporan 3x24 jam',
    tier: 4,
    engine: 'simulation-engine',
    scenarioBrief:
      'Laptop seorang staf administrasi hilang saat perjalanan dinas luar kota. Koordinator IT Kepatuhan (Hendra) meminta Anda memimpin langkah mitigasi cepat: blokir token akses, audit riwayat pengunduhan data pelanggan, dan susun draf pelaporan resmi sesuai amanat UU PDP No. 27/2022.',
    xpReward: 180,
    coinReward: 80,
    estimatedMinutes: 12,
    passThreshold: 80,
    simulationScenario: {
      id: 'scen-d14-04',
      title: 'Penanganan Insiden Kehilangan Laptop & Mitigasi Data PDP',
      scenarioContext:
        'Laptop berisi salinan data pelanggan hilang. Waktu pelaporan maksimal 3x24 jam menurut UU PDP. Perlu tindakan cepat, transparan, dan terukur.',
      targetCharacter: {
        id: 'hendra',
        name: 'Hendra',
        role: 'IT Security & Compliance Coordinator',
      },
      startNodeId: 'node-breach-start',
      nodes: {
        'node-breach-start': {
          id: 'node-breach-start',
          speaker: 'hendra',
          speakerName: 'Hendra (Koordinator IT)',
          role: 'IT Security Lead',
          text: 'Budi, gawat! Laptop inventaris staf kita hilang di stasiun. Di dalamnya tersimpan cache spreadsheet kontak 500 klien. Apa langkah pertama yang harus kita ambil sekarang?',
          mode: 'choice',
          choices: [
            {
              id: 'c-breach-hide',
              text: 'Kita diamkan dulu Pak sambil mencari laptopnya sendiri. Jangan lapor manajemen agar kita tidak kena teguran.',
              tradeoffExplanation:
                'Menutupi insiden kebocoran data adalah pelanggaran hukum berat menurut UU PDP Pasal 46 yang berujung sanksi administratif dan denda besar.',
              rubric: { empathy: 20, clarity: 40, professionalFirmness: 20, ethicalSolution: 10 },
              reputationImpact: -4,
              feedbackTip: 'Transparansi dan kecepatan adalah kunci kepatuhan insiden siber.',
              nextNodeId: 'node-breach-escalate',
            },
            {
              id: 'c-breach-isolate',
              text: 'Segera lakukan Remote Wipe dan cabut semua sesi login aktif akun staf tersebut dari konsol admin IT sekarang juga.',
              tradeoffExplanation:
                'Tindakan isolasi seketika memutus risiko akses tidak sah ke aset cloud perusahaan.',
              rubric: { empathy: 85, clarity: 95, professionalFirmness: 100, ethicalSolution: 95 },
              reputationImpact: 4,
              feedbackTip: 'Tepat sekali: prioritaskan pembatasan akses sebelum menyusun investigasi.',
              nextNodeId: 'node-breach-report-assembly',
            },
          ],
        },
        'node-breach-escalate': {
          id: 'node-breach-escalate',
          speaker: 'hendra',
          speakerName: 'Hendra (Koordinator IT)',
          role: 'IT Security Lead',
          text: 'Menunda laporan sangat berbahaya! Sistem pemantauan sudah mencatat anomali login. Kita harus segera bertindak profesional!',
          mode: 'choice',
          choices: [
            {
              id: 'c-breach-fix',
              text: 'Baik Pak Hendra, saya minta maaf. Mari kita segera cabut sesi aktif dan buat investigasi resmi sekarang.',
              tradeoffExplanation: 'Menyadari kekeliruan dan kembali ke jalur kepatuhan resmi.',
              rubric: { empathy: 70, clarity: 80, professionalFirmness: 80, ethicalSolution: 80 },
              reputationImpact: 1,
              feedbackTip: 'Segera koreksi langkah menuju SOP resmi.',
              nextNodeId: 'node-breach-report-assembly',
            },
          ],
        },
        'node-breach-report-assembly': {
          id: 'node-breach-report-assembly',
          speaker: 'hendra',
          speakerName: 'Hendra (Koordinator IT)',
          role: 'IT Security Lead',
          text: 'Sesi akun sudah berhasil di-revoke dan perangkat dihapus jarak jauh. Sekarang, susun draf rekomendasi pemberitahuan insiden tertulis sesuai UU PDP:',
          mode: 'assembly',
          sentenceBlocks: {
            available: [
              { id: 'b1', text: 'Mengidentifikasi jenis data pribadi yang berpotensi terakses serta jumlah subjek data terdampak.', category: 'fakta' },
              { id: 'b2', text: 'Mendokumentasikan langkah mitigasi teknis yang telah selesai dilakukan (remote wipe dan reset token).', category: 'fakta' },
              { id: 'b3', text: 'Menyiapkan draf surat pemberitahuan resmi ke lembaga otoritas PDP dalam tenggat maksimal 3 x 24 jam.', category: 'solusi' },
              { id: 'b4', text: 'Menyampaikan saran proteksi mandiri kepada subjek data jika terdapat indikasi penyalahgunaan kredensial.', category: 'penutup' },
            ],
            validOrderIds: [
              ['b1', 'b2', 'b3', 'b4'],
              ['b2', 'b1', 'b3', 'b4'],
            ],
            rubricOnSuccess: { empathy: 95, clarity: 95, professionalFirmness: 100, ethicalSolution: 100, total: 98 },
            explanation:
              'Sesuai UU PDP Pasal 46, pengendali data wajib memberitahukan kegagalan pelindungan data pribadi paling lambat 3 x 24 jam kepada lembaga dan subjek data dengan rincian data terungkap, upaya penanganan, dan kontak aduan.',
          },
        },
      },
      debrief: {
        keyTakeaway:
          'Penanganan insiden siber modern menuntut kepatuhan regulasi (UU PDP): isolasi teknis (remote wipe) -> audit cakupan data bocor -> pelaporan resmi 3x24 jam tanpa manipulasi fakta.',
        realWorldLesson:
          'Di dunia korporat, integritas kepatuhan hukum dan transparansi menyelamatkan reputasi perusahaan dari tuntutan denda hukum dan sanksi pembekuan operasional.',
      },
    },
  },
];
