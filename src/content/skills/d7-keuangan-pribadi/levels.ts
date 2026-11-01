/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D7: Keuangan Pribadi & Wirausaha - Levels & Practice Exercises
 */

import { SimulationScenario } from '../../../components/engines/SimulationEngine';

export interface D7Level {
  id: string;
  domainId: 'D7';
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

export const D7_LEVELS: D7Level[] = [
  // LEVEL 1: Advanced Quiz Engine (Anggaran Pribadi & BMC Usaha)
  {
    id: 'D7-LEVEL-01',
    domainId: 'D7',
    skillId: 'D7-SKILL-01',
    title: 'Analisis Anggaran Pribadi, Bunga Pinjaman & BMC Usaha',
    subtitle: 'Uji analitis prioritas alokasi arus kas, perbandingan bunga flat vs efektif, dan 9 blok BMC',
    tier: 1,
    engine: 'advanced-quiz-engine',
    scenarioBrief:
      'Evaluasi kesehatan finansial pribadi dan persiapan model usaha mikro: selesaikan 10 soal analitis mencakup alokasi 50/30/20, penghitungan HPP, titik impas BEP, dan strategi pelunasan utang terarah.',
    xpReward: 120,
    coinReward: 50,
    estimatedMinutes: 8,
    passThreshold: 70,
  },

  // LEVEL 2: Simulation Engine (Negosiasi Termin Pembayaran Supplier Bahan Baku)
  {
    id: 'D7-LEVEL-02',
    domainId: 'D7',
    skillId: 'D7-SKILL-02',
    title: 'Simulasi Negosiasi Termin Pembayaran Supplier & Arus Kas Usaha',
    subtitle: 'Latihan komunikasi diplomatis menjaga likuiditas kas usaha saat memesan bahan baku dalam jumlah besar',
    tier: 2,
    engine: 'simulation-engine',
    scenarioBrief:
      'Pak Joko (pemilik toko grosir bahan pangan) meminta pembayaran lunas di muka (cash upfront) untuk pesanan bahan katering kantor senilai Rp 8.000.000. Padahal dana kantor klien baru cair 14 hari kemudian. Negosiasikan skema uang muka (DP) dan termin pembayaran tempo tanpa merusak kemitraan bisnis.',
    xpReward: 150,
    coinReward: 60,
    estimatedMinutes: 10,
    passThreshold: 70,
    simulationScenario: {
      id: 'scen-d7-02',
      title: 'Negosiasi Termin Pembayaran Grosir Bahan Baku Bersama Pak Joko',
      scenarioContext:
        'Menjaga arus kas usaha mikro agar tidak mandek (cashflow crunch) melalui negosiasi syarat pembayaran tempo dengan pemasok bahan baku.',
      targetCharacter: {
        id: 'klien',
        name: 'Pak Joko',
        role: 'Pemilik Toko Grosir Sumber Rejeki',
      },
      startNodeId: 'node-joko-start',
      nodes: {
        'node-joko-start': {
          id: 'node-joko-start',
          speaker: 'klien',
          speakerName: 'Pak Joko (Supplier Bahan Baku)',
          role: 'Pemasok Grosir Utama',
          text: 'Mas Budi, pesanan beras dan minyak goreng senilai 8 juta ini banyak sekali. Sesuai aturan toko saya, pesanan perdana wajib transfer tunai 100% sekarang juga ya sebelum barang dimuat ke truk.',
          mode: 'choice',
          choices: [
            {
              id: 'c1',
              text: 'Aduh Pak Joko pelit sekali, saya ini kan langganan baru. Kalau tidak boleh tempo bayar 30 hari nanti saya pindah ke toko grosir lain saja!',
              tradeoffExplanation:
                'Sikap kasar dan mengancam merusak hubungan jangka panjang dengan pemasok andal di saat Anda belum memiliki rekam jejak pembayaran.',
              rubric: { empathy: 20, clarity: 50, professionalFirmness: 30, ethicalSolution: 20 },
              reputationImpact: -3,
              feedbackTip: 'Hargai kekhawatiran risiko pemasok dan tawarkan titik temu yang aman bagi kedua pihak.',
              nextNodeId: 'node-joko-hesitant',
            },
            {
              id: 'c2',
              text: 'Selamat pagi Pak Joko. Saya sangat memahami prinsip kehati-hatian toko Bapak. Namun demi kelancaran arus kas katering kami, apakah memungkinkan skema uang muka 40% di awal dan pelunasan sisanya tempo 14 hari dengan surat pesanan (PO) resmi bertanda tangan direksi?',
              tradeoffExplanation:
                'Solusi win-win: menghormati kepastian modal kerja pemasok via DP 40% sambil melindungi likuiditas usaha mikro dengan jaminan PO formal.',
              rubric: { empathy: 90, clarity: 95, professionalFirmness: 95, ethicalSolution: 95 },
              reputationImpact: 4,
              feedbackTip: 'Sangat bijak: memberikan jaminan nyata dan uang muka adil.',
              nextNodeId: 'node-joko-assembly',
            },
          ],
        },
        'node-joko-hesitant': {
          id: 'node-joko-hesitant',
          speaker: 'klien',
          speakerName: 'Pak Joko (Supplier Bahan Baku)',
          role: 'Pemasok Grosir Utama',
          text: 'Zaman sekarang banyak yang pesan lalu menghilang Mas! Modal saya juga berputar untuk belanja ke distributor pusat.',
          mode: 'choice',
          choices: [
            {
              id: 'c-rec',
              text: 'Saya mengerti betul beban kas Bapak. Bagaimana jika kami bayar uang muka 50% tunai sekarang, dan sisanya dilunasi hari ke-7 setelah pengiriman disertai kuitansi bermaterai?',
              tradeoffExplanation: 'Menurunkan risiko pihak pemasok dengan menaikkan porsi DP dan memperpendek masa tempo.',
              rubric: { empathy: 85, clarity: 90, professionalFirmness: 85, ethicalSolution: 90 },
              reputationImpact: 2,
              feedbackTip: 'Kompromi realistis yang dapat diterima pemasok.',
              nextNodeId: 'node-joko-assembly',
            },
          ],
        },
        'node-joko-assembly': {
          id: 'node-joko-assembly',
          speaker: 'klien',
          speakerName: 'Pak Joko (Supplier Bahan Baku)',
          role: 'Pemasok Grosir Utama',
          text: 'Baik Mas Budi, penawaran Anda masuk akal. Mari kita sepakati klausul komitmen pengiriman dan pembayarannya:',
          mode: 'assembly',
          sentenceBlocks: {
            available: [
              { id: 'b1', text: 'Uang muka sebesar 40% ditransfer hari ini sebagai tanda jadi pemesanan bahan baku.', category: 'fakta' },
              { id: 'b2', text: 'Surat Pesanan Resmi (PO) bermaterai dan identitas usaha NIB diserahkan saat muat barang.', category: 'solusi' },
              { id: 'b3', text: 'Sisa pembayaran 60% dilunasi tepat 14 hari kalender setelah barang diterima dalam kondisi baik.', category: 'fakta' },
              { id: 'b4', text: 'Kedua pihak menjaga kepercayaan untuk kerjasama pesanan rutin jangka panjang.', category: 'penutup' },
            ],
            validOrderIds: [
              ['b1', 'b2', 'b3', 'b4'],
              ['b2', 'b1', 'b3', 'b4'],
            ],
            rubricOnSuccess: { empathy: 95, clarity: 95, professionalFirmness: 100, ethicalSolution: 100, total: 97 },
            explanation:
              'Struktur negosiasi termin kredit usaha: Komitmen DP tunai -> Berkas jaminan legal (PO & NIB) -> Tanggal jatuh tempo pasti -> Fondasi kemitraan jangka panjang.',
          },
        },
      },
      debrief: {
        keyTakeaway:
          'Manajemen modal kerja wirausaha menuntut sinkronisasi siklus piutang pelanggan dan siklus utang supplier (Cash Conversion Cycle). Negosiasi termin tempo dengan DP proporsional mencegah kebangkrutan likuiditas.',
        realWorldLesson:
          'Supplier langganan adalah mitra strategis. Menjaga komitmen pembayaran tepat waktu menciptakan reputasi kredit yang berharga di ekosistem usaha.',
      },
    },
  },

  // LEVEL 3: Advanced Quiz Engine (Audit Keuangan & Skenario Harga Jual UMKM)
  {
    id: 'D7-LEVEL-03',
    domainId: 'D7',
    skillId: 'D7-SKILL-02',
    title: 'Audit Biaya Operasional, Break-Even Point & Harga Jual UMKM',
    subtitle: 'Uji ketelitian kalkulasi margin riil, pemisahan kas pribadi, dan eliminasi biaya tersembunyi',
    tier: 3,
    engine: 'advanced-quiz-engine',
    scenarioBrief:
      'Periksa pembukuan usaha mikro mitra binaan: pastikan seluruh pos biaya tetap dan variabel tercatat akurat, hitung volume titik impas (BEP), dan evaluasi usulan diskon promosi agar marjin laba tidak tergerus.',
    xpReward: 160,
    coinReward: 70,
    estimatedMinutes: 8,
    passThreshold: 80,
  },

  // LEVEL 4: Simulation Engine (Pengajuan Permodalan & Pemaparan BMC Usaha)
  {
    id: 'D7-LEVEL-04',
    domainId: 'D7',
    skillId: 'D7-SKILL-03',
    title: 'Simulasi Pemaparan BMC & Verifikasi Legalitas Usaha (NIB)',
    subtitle: 'Latihan presentasi model bisnis terstruktur di hadapan fasilitator perbankan program UMKM',
    tier: 3,
    engine: 'simulation-engine',
    scenarioBrief:
      'Pak Rahmat (Penilai Program Fasilitas Pembiayaan Usaha Rakyat) melakukan verifikasi lapangan atas proposal rintisan usaha Anda. Paparkan 9 elemen Business Model Canvas, buktikan pemisahan rekening pribadi vs usaha, serta tunjukkan kelengkapan izin NIB secara transparan dan meyakinkan.',
    xpReward: 180,
    coinReward: 80,
    estimatedMinutes: 12,
    passThreshold: 80,
    simulationScenario: {
      id: 'scen-d7-04',
      title: 'Verifikasi Model Bisnis & Kelayakan Pembiayaan Usaha Bersama Pak Rahmat',
      scenarioContext:
        'Sesi wawancara kelayakan pembiayaan usaha mikro. Evaluator menguji pemahaman struktur biaya, diferensiasi nilai pelanggan, dan kedisiplinan pembukuan kas.',
      targetCharacter: {
        id: 'klien',
        name: 'Pak Rahmat',
        role: 'Analis Fasilitas Pembiayaan Usaha',
      },
      startNodeId: 'node-rahmat-start',
      nodes: {
        'node-rahmat-start': {
          id: 'node-rahmat-start',
          speaker: 'klien',
          speakerName: 'Pak Rahmat (Analis Pembiayaan)',
          role: 'Evaluator Program Usaha',
          text: 'Selamat siang Mas Budi. Saya melihat proposal usaha minuman sehat kemasan Anda. Banyak usaha sejenis tutup di tahun pertama. Apa keunggulan nilai unik (Value Proposition) produk Anda dibanding kompetitor?',
          mode: 'choice',
          choices: [
            {
              id: 'c-vague',
              text: 'Pokoknya produk saya paling enak sedunia Pak, harganya saya banting sangat murah sampai tidak ambil untung biar pelanggan beli terus.',
              tradeoffExplanation:
                'Menjual di bawah HPP (perang harga membabi buta) tanpa diferensiasi nilai menjamin kebangkrutan operasional usaha dalam hitungan bulan.',
              rubric: { empathy: 20, clarity: 40, professionalFirmness: 30, ethicalSolution: 10 },
              reputationImpact: -3,
              feedbackTip: 'Value proposition berfokus pada manfaat spesifik pelanggan dan margin sehat.',
              nextNodeId: 'node-rahmat-cash-check',
            },
            {
              id: 'c-value',
              text: 'Produk kami memadukan bahan rempah organik lokal tanpa pengawet dengan sertifikasi higienis, menyasar pekerja kantoran yang membutuhkan minuman energi alami dengan kemasan ramah lingkungan dan sistem langganan mingguan.',
              tradeoffExplanation:
                'Penjelasan Value Proposition yang sangat solid: target segmen jelas, keunggulan bahan teruji, dan model pendapatan berulang (recurring revenue).',
              rubric: { empathy: 90, clarity: 95, professionalFirmness: 95, ethicalSolution: 95 },
              reputationImpact: 4,
              feedbackTip: 'Sangat tajam dan memetakan BMC dengan cemerlang.',
              nextNodeId: 'node-rahmat-cash-assembly',
            },
          ],
        },
        'node-rahmat-cash-check': {
          id: 'node-rahmat-cash-check',
          speaker: 'klien',
          speakerName: 'Pak Rahmat (Analis Pembiayaan)',
          role: 'Evaluator Program Usaha',
          text: 'Perang harga tanpa dasar margin adalah kesalahan umum pemula. Bagaimana dengan kedisiplinan pencatatan keuangan Anda?',
          mode: 'choice',
          choices: [
            {
              id: 'c-disciplined',
              text: 'Kami menggunakan rekening bank terpisah atas nama usaha berizin NIB, menetapkan gaji tetap pengelola, dan menghitung HPP riil sehingga harga jual kami menjaga margin laba 35%.',
              tradeoffExplanation: 'Membuktikan disiplin tata kelola keuangan yang dicari lembaga pembiayaan.',
              rubric: { empathy: 85, clarity: 90, professionalFirmness: 90, ethicalSolution: 90 },
              reputationImpact: 2,
              feedbackTip: 'Respons terukur yang memulihkan keyakinan evaluator.',
              nextNodeId: 'node-rahmat-cash-assembly',
            },
          ],
        },
        'node-rahmat-cash-assembly': {
          id: 'node-rahmat-cash-assembly',
          speaker: 'klien',
          speakerName: 'Pak Rahmat (Analis Pembiayaan)',
          role: 'Evaluator Program Usaha',
          text: 'Bagus sekali. Terakhir, jika pembiayaan modal kerja disetujui, rangkum tata kelola alokasi modal dan pemantauan titik impas Anda:',
          mode: 'assembly',
          sentenceBlocks: {
            available: [
              { id: 'b1', text: 'Modal dialokasikan 70% untuk pengadaan alat produksi higienis dan 30% untuk bantalan kas operasional.', category: 'fakta' },
              { id: 'b2', text: 'Memisahkan seluruh transaksi penjualan ke dalam rekening giro usaha resmi berizin NIB.', category: 'solusi' },
              { id: 'b3', text: 'Memantau pencapaian titik impas (BEP) minimal 350 botol per bulan sebelum mencairkan laba ditahan.', category: 'fakta' },
              { id: 'b4', text: 'Menyusun laporan arus kas bulanan berbasis standar SAK EMKM secara disiplin dan transparan.', category: 'penutup' },
            ],
            validOrderIds: [
              ['b1', 'b2', 'b3', 'b4'],
              ['b2', 'b1', 'b3', 'b4'],
            ],
            rubricOnSuccess: { empathy: 95, clarity: 95, professionalFirmness: 100, ethicalSolution: 100, total: 98 },
            explanation:
              'Struktur tata kelola modal usaha mikro: Alokasi terencana (aset vs modal kerja) -> Rekening terisolasi NIB -> Pengawalan target BEP -> Laporan keuangan SAK EMKM transparan.',
          },
        },
      },
      debrief: {
        keyTakeaway:
          'Kelayakan usaha mikro di mata evaluator dan investor bergantung pada: proposisi nilai realistis (BMC) -> pemisahan kas tegas -> pemahaman rumus BEP -> legalitas NIB resmi.',
        realWorldLesson:
          'Wirausahawan yang menguasai angka biaya operasionalnya akan selalu unggul dan dipercaya oleh ekosistem perbankan dan mitra kerja.',
      },
    },
  },
];
