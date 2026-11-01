/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D11: Manajemen Proyek & Produktivitas - Seeded Analytical Quizzes Generator
 */

import { AdvancedQuestion } from '../../../components/engines/AdvancedQuizEngine';
import { mulberry32, hashStringToSeed, shuffleWithRng, shuffleGuaranteedDifferent } from '../d12-komunikasi/quizzes';

export function generateSeededD11Quizzes(seedInput: number | string = 3001): AdvancedQuestion[] {
  const seedNum = hashStringToSeed(seedInput);
  const rng = mulberry32(seedNum);

  const variantQ1 = rng() > 0.5 ? 'B' : 'A';
  const variantQ2 = rng() > 0.5 ? 'B' : 'A';
  const variantQ5 = rng() > 0.5 ? 'B' : 'A';
  const variantQ6 = rng() > 0.5 ? 'B' : 'A';
  const variantQ8 = rng() > 0.5 ? 'B' : 'A';
  const variantQ9 = rng() > 0.5 ? 'B' : 'A';

  // 1. Urutan: Tahapan Siklus Hidup Manajemen Proyek PMBOK
  const q1RawItems = [
    {
      id: 'step-initiation',
      text:
        variantQ1 === 'A'
          ? '1. Inisiasi: Perumusan Project Charter dan penentuan sasaran proyek'
          : '1. Inisiasi: Penetapan ruang lingkup awal dan identifikasi stakeholder kunci',
    },
    {
      id: 'step-planning',
      text:
        variantQ1 === 'A'
          ? '2. Perencanaan: Dekomposisi WBS, estimasi durasi, dan penyusunan Risk Register'
          : '2. Perencanaan: Penjadwalan bagan Gantt dan penetapan jalur kritis (Critical Path)',
    },
    {
      id: 'step-execution',
      text:
        variantQ1 === 'A'
          ? '3. Eksekusi & Pemantauan: Pengerjaan tugas papan Kanban dan pelacakan deviasi jadwal'
          : '3. Eksekusi & Pengendalian: Rapat standup harian dan mitigasi hambatan (blocker)',
    },
    {
      id: 'step-closing',
      text:
        variantQ1 === 'A'
          ? '4. Penutupan: Serah terima deliverable (handover), dokumentasi lessons learned, dan rilis tim'
          : '4. Penutupan: Laporan pertanggungjawaban akhir, audit pasca-proyek, dan pengarsipan berkas',
    },
  ];

  // 2. Urutan: Empat Tahap Siklus Manajemen Risiko Proyek (ISO 31000)
  const q2RawItems = [
    {
      id: 'risk-identify',
      text:
        variantQ2 === 'A'
          ? '1. Identifikasi Risiko: Mendata potensi ancaman jadwal, teknis, dan vendor'
          : '1. Identifikasi Risiko: Mendaftar kemungkinan kendala ruang lingkup dan sumber daya',
    },
    {
      id: 'risk-analyze',
      text:
        variantQ2 === 'A'
          ? '2. Analisis Kualitatif: Menghitung skor kemungkinan (probabilitas) dan tingkat dampak'
          : '2. Penilaian Keparahan: Mengukur frekuensi kemunculan dan estimasi kerugian operasional',
    },
    {
      id: 'risk-plan',
      text:
        variantQ2 === 'A'
          ? '3. Perencanaan Respons: Menetapkan strategi mitigasi (avoid, mitigate, transfer, atau accept)'
          : '3. Rencana Aksi Kontinjensi: Menyusun langkah pencegahan konkret dan menunjuk penanggung jawab',
    },
    {
      id: 'risk-monitor',
      text:
        variantQ2 === 'A'
          ? '4. Pemantauan & Peninjauan: Melacak status risiko secara berkala dalam rapat progres tim'
          : '4. Evaluasi Kontinu: Memperbarui register risiko saat terjadi dinamika baru di lapangan',
    },
  ];

  // 3. Cocokkan: Kuadran Matriks Eisenhower
  const q3Pairs = [
    {
      id: 'e-1',
      left: 'Server email kantor mati mendadak saat jam operasional sibuk',
      right: 'Kuadran I (Mendesak & Penting: Kerjakan Segera)',
    },
    {
      id: 'e-2',
      left: 'Menyusun SOP manajemen krisis dan modul pelatihan staf',
      right: 'Kuadran II (Penting & Tidak Mendesak: Jadwalkan Blok Waktu)',
    },
    {
      id: 'e-3',
      left: 'Permintaan telepon mendadak untuk survei umum produk vendor',
      right: 'Kuadran III (Mendesak & Tidak Penting: Delegasikan / Batasi)',
    },
    {
      id: 'e-4',
      left: 'Menjelajahi video hiburan viral di laptop kerja saat jam kantor',
      right: 'Kuadran IV (Tidak Mendesak & Tidak Penting: Hapus & Eliminasi)',
    },
  ];

  // 4. Cocokkan: Strategi Respons Risiko PMBOK
  const q4Pairs = [
    {
      id: 'r-1',
      left: 'Membeli polis asuransi kargo pengiriman peralatan server antar-pulau',
      right: 'Transfer (Mengalihkan risiko finansial ke pihak ketiga)',
    },
    {
      id: 'r-2',
      left: 'Membatalkan fitur custom yang belum teruji dan memakai modul bawaan stabil',
      right: 'Avoid (Menghindari risiko dengan mengubah rencana proyek)',
    },
    {
      id: 'r-3',
      left: 'Melakukan instalasi dua unit generator cadangan dan uji coba beban berkala',
      right: 'Mitigate (Mengurangi dampak atau probabilitas kegagalan)',
    },
    {
      id: 'r-4',
      left: 'Menyiapkan dana kontinjensi 5% untuk fluktuasi harga materai yang sangat kecil',
      right: 'Accept (Menerima risiko residual dengan cadangan wajar)',
    },
  ];

  // 5. Temukan Kesalahan: Logika Bagan Gantt & Jalur Kritis
  const q5Lines =
    variantQ5 === 'A'
      ? [
          { id: 'g1', text: 'Aktivitas A (Desain) dan B (Pengadaan Server) selesai pada Minggu ke-3.', isError: false },
          { id: 'g2', text: 'Aktivitas C (Instalasi Server) dimulai pada Minggu ke-2 mendahului Pengadaan Server.', isError: true, errorReason: 'Melanggar dependensi Finish-to-Start; server belum tiba di lokasi' },
          { id: 'g3', text: 'Jalur kritis adalah lintasan aktivitas terpanjang dengan total float sama dengan 0.', isError: false },
          { id: 'g4', text: 'Aktivitas jalur kritis boleh ditunda 5 hari tanpa memundurkan tenggat proyek.', isError: true, errorReason: 'Aktivitas jalur kritis memiliki float 0; keterlambatan langsung menunda proyek' },
        ]
      : [
          { id: 'g1', text: 'Penyusunan modul WBS membagi sasaran proyek menjadi paket kerja terukur.', isError: false },
          { id: 'g2', text: 'Pemasangan kabel jaringan dimulai sebelum izin pembongkaran dinding disetujui dinas.', isError: true, errorReason: 'Melanggar prasyarat legalitas dan dependensi pekerjaan fisik' },
          { id: 'g3', text: 'Milestone pencapaian proyek tidak memiliki durasi kerja (durasi = 0 hari).', isError: false },
          { id: 'g4', text: 'Keterlambatan pada tugas di luar jalur kritis selalu memundurkan tanggal serah terima proyek.', isError: true, errorReason: 'Tugas non-kritis memiliki kelonggaran waktu (float) sehingga tidak otomatis memundurkan proyek' },
        ];

  // 6. Temukan Kesalahan: Pelanggaran Tata Tertib Papan Kanban
  const q6Lines =
    variantQ6 === 'A'
      ? [
          { id: 'k1', text: 'Kolom "In Progress" ditetapkan batas WIP = 3 untuk kapasitas 3 orang analis.', isError: false },
          { id: 'k2', text: 'Ketika kolom "In Progress" sudah penuh 3 kartu, staf tetap menarik 4 kartu baru dari backlog agar terlihat sibuk.', isError: true, errorReason: 'Pelanggaran WIP limit memicu antrean tersembunyi dan memperpanjang lead time' },
          { id: 'k3', text: 'Tim mengadakan standup 15 menit setiap pagi untuk mengecek hambatan (blocker).', isError: false },
          { id: 'k4', text: 'Kartu yang terhambat kendala teknis dipindahkan ke kolom "Done" agar target terlihat tercapai.', isError: true, errorReason: 'Pelanggaran Definition of Done; pekerjaan belum selesai diverifikasi' },
        ]
      : [
          { id: 'k1', text: 'Papan Kanban memvisualisasikan tahapan alur kerja dari To Do ke Done.', isError: false },
          { id: 'k2', text: 'Setiap anggota tim mengerjakan 8 tugas secara bersamaan tanpa batasan WIP limit.', isError: true, errorReason: 'Multitasking berlebih tanpa WIP limit menurunkan throughput tim' },
          { id: 'k3', text: 'Hambatan eksternal ditandai dengan label blocker merah untuk dibahas di standup.', isError: false },
          { id: 'k4', text: 'Menghapus kartu pekerjaan yang gagal tanpa dokumentasi alasan pembatalan.', isError: true, errorReason: 'Menghilangkan jejak audit akuntabilitas ruang lingkup kerja' },
        ];

  // 7. Cocokkan: Kriteria Sasaran SMART
  const q7Pairs = [
    {
      id: 's-1',
      left: 'Specific (Spesifik)',
      right: 'Menyebutkan deliverable pasti: "Otomasi sistem penomoran surat dinas kantor"',
    },
    {
      id: 's-2',
      left: 'Measurable (Terukur)',
      right: 'Memiliki indikator kuantitatif: "Memotong waktu pembuatan dari 4 jam menjadi 30 menit"',
    },
    {
      id: 's-3',
      left: 'Achievable (Dapat Dicapai)',
      right: 'Realistis dengan kapasitas: "Dikerjakan oleh 2 orang staf TI dengan modul yang sudah ada"',
    },
    {
      id: 's-4',
      left: 'Time-bound (Batas Waktu)',
      right: 'Memiliki tanggal tenggat tegas: "Selesai diuji dan diterapkan per 30 November 2026"',
    },
  ];

  // 8. Urutan: Dekomposisi WBS 100% Rule
  const q8RawItems = [
    {
      id: 'wbs-1',
      text:
        variantQ8 === 'A'
          ? '1. Proyek Induk (Level 1): Penetapan total ruang lingkup deliverable final proyek'
          : '1. Sasaran Utama (Level 1): Mendefinisikan produk akhir proyek secara menyeluruh',
    },
    {
      id: 'wbs-2',
      text:
        variantQ8 === 'A'
          ? '2. Sub-Proyek / Fase (Level 2): Pemecahan menjadi fase-fase deliverable utama'
          : '2. Fase Utama (Level 2): Pengelompokan ruang lingkup per fungsi atau tahapan kerja',
    },
    {
      id: 'wbs-3',
      text:
        variantQ8 === 'A'
          ? '3. Paket Kerja / Work Package (Level 3): Pembagian tugas terkecil yang memiliki pemilik dan durasi pasti'
          : '3. Paket Kerja Terendah (Level 3): Rincian aktivitas yang dapat diestimasi biaya dan waktunya',
    },
    {
      id: 'wbs-4',
      text:
        variantQ8 === 'A'
          ? '4. Verifikasi Aturan 100%: Memastikan jumlah seluruh elemen anak tepat sama dengan induknya'
          : '4. Validasi Lingkup: Memastikan tidak ada pekerjaan terlewat dan tidak ada tugas di luar cakupan',
    },
  ];

  // 9. Temukan Kesalahan: Pelanggaran Rapat Harian (Daily Standup)
  const q9Lines =
    variantQ9 === 'A'
      ? [
          { id: 'st1', text: 'Setiap anggota tim menjawab apa yang telah diselesaikan kemarin.', isError: false },
          { id: 'st2', text: 'Rapat harian standup diperpanjang menjadi sesi perdebatan teknis mendalam selama 2 jam sambil duduk santai.', isError: true, errorReason: 'Standup wajib dibatasi maksimal 15 menit dan berdiri agar fokus' },
          { id: 'st3', text: 'Anggota tim menyampaikan kendala (blocker) yang menghambat progres tugas hari ini.', isError: false },
          { id: 'st4', text: 'Manajer menggunakan standup untuk menginterogasi kesalahan personal dan menyalahkan staf di depan umum.', isError: true, errorReason: 'Standup adalah forum sinkronisasi kolaboratif, bukan ajang penghakiman individu' },
        ]
      : [
          { id: 'st1', text: 'Peserta standup menyampaikan rencana tugas yang akan dikerjakan dalam 24 jam ke depan.', isError: false },
          { id: 'st2', text: 'Standup diubah menjadi presentasi slide 40 halaman yang membahas teori bisnis masa depan.', isError: true, errorReason: 'Standup bukan sesi presentasi materi melainkan pelaporan status ringkas' },
          { id: 'st3', text: 'Setiap anggota tim berdiri melingkar untuk menjaga ritme pertemuan tetap sigap.', isError: false },
          { id: 'st4', text: 'Masalah besar yang rumit diselesaikan langsung saat standup mengabaikan waktu peserta lain.', isError: true, errorReason: 'Masalah rumit harus dipisahkan ke sesi tindak lanjut khusus di luar standup' },
        ];

  // 10. Klik Area: Kuadran II Matriks Eisenhower
  const q10Zones = [
    {
      id: 'z-q1',
      label: 'Kuadran I: Mendesak & Penting (Krisis & Batas Waktu Terdekat)',
      isTarget: false,
      explanation: 'Kuadran I adalah zona krisis dan pemadaman kebakaran operasional harian.',
    },
    {
      id: 'z-q2',
      label: 'Kuadran II: Tidak Mendesak tapi Penting (Perencanaan Strategis, SOP, & Mitigasi)',
      isTarget: true,
      explanation: 'Kuadran II adalah zona efektivitas tertinggi tempat investasi kualitas jangka panjang berada.',
    },
    {
      id: 'z-q3',
      label: 'Kuadran III: Mendesak tapi Tidak Penting (Interupsi Telepon & Chat Rutin)',
      isTarget: false,
      explanation: 'Kuadran III adalah ilusi urgensi yang sebaiknya didelegasikan atau dibatasi.',
    },
    {
      id: 'z-q4',
      label: 'Kuadran IV: Tidak Mendesak & Tidak Penting (Distraksi & Buang Waktu)',
      isTarget: false,
      explanation: 'Kuadran IV adalah pemborosan waktu yang wajib dieliminasi dari jam kerja kantor.',
    },
  ];

  return [
    {
      id: 'D11-QZ-01',
      title: 'Siklus Hidup Proyek Sesuai Panduan PMBOK',
      instruction: 'Urutkan empat tahapan utama manajemen proyek dari penetapan piagam hingga serah terima:',
      type: 'urutan',
      items: shuffleGuaranteedDifferent(q1RawItems, ['step-initiation', 'step-planning', 'step-execution', 'step-closing'], rng),
      correctOrder: ['step-initiation', 'step-planning', 'step-execution', 'step-closing'],
      explanation: 'Siklus PMBOK: Inisiasi (Charter) -> Perencanaan (WBS/Gantt) -> Eksekusi & Pemantauan -> Penutupan (Handover).',
      conceptReference: 'PMBOK Guide 7th Edition',
    },
    {
      id: 'D11-QZ-02',
      title: 'Empat Langkah Manajemen Risiko Proyek (ISO 31000)',
      instruction: 'Urutkan tahapan analisis risiko proyek secara sistematis:',
      type: 'urutan',
      items: shuffleGuaranteedDifferent(q2RawItems, ['risk-identify', 'risk-analyze', 'risk-plan', 'risk-monitor'], rng),
      correctOrder: ['risk-identify', 'risk-analyze', 'risk-plan', 'risk-monitor'],
      explanation: 'Urutan risiko: Identifikasi -> Analisis Keparahan -> Rencana Aksi Respons -> Pemantauan Berkala.',
      conceptReference: 'ISO 31000 Risk Management',
    },
    {
      id: 'D11-QZ-03',
      title: 'Klasifikasi Tugas pada Kuadran Matriks Eisenhower',
      instruction: 'Pasangkan skenario tugas harian kantor dengan kuadran prioritas Matriks Eisenhower yang tepat:',
      type: 'cocokkan',
      pairs: shuffleWithRng(q3Pairs, rng),
      explanation: 'Kuadran I menangani krisis darurat. Kuadran II adalah investasi kualitas strategis. Kuadran III adalah interupsi. Kuadran IV adalah distraksi.',
      conceptReference: 'Habit 3: Put First Things First',
    },
    {
      id: 'D11-QZ-04',
      title: 'Strategi Respons Risiko Proyek PMBOK',
      instruction: 'Pasangkan skenario ancaman proyek dengan strategi respons risiko yang paling tepat:',
      type: 'cocokkan',
      pairs: shuffleWithRng(q4Pairs, rng),
      explanation: 'Asuransi adalah Transfer. Membatalkan fitur adalah Avoid. Generator cadangan adalah Mitigate. Cadangan kontinjensi kecil adalah Accept.',
      conceptReference: 'PMBOK Project Risk Response Strategies',
    },
    {
      id: 'D11-QZ-05',
      title: 'Audit Logika Penjadwalan Gantt & Jalur Kritis (CPM)',
      instruction: 'Klik 2 baris pernyataan di bawah yang melanggar prinsip Critical Path Method dan dependensi tugas:',
      type: 'temukan-kesalahan',
      contextSnippet: {
        title: 'Review Jadwal Proyek Pengadaan Perangkat Kantor',
        subtitle: 'Divisi Project Management Office',
        lines: q5Lines,
      },
      requiredErrorCount: 2,
      explanation: 'Melanggar dependensi Finish-to-Start dan mengklaim jalur kritis memiliki kelonggaran waktu adalah kekeliruan fatal penjadwalan.',
      conceptReference: 'Critical Path Method & Gantt Scheduling',
    },
    {
      id: 'D11-QZ-06',
      title: 'Evaluasi Pelanggaran Aturan Papan Kerja Kanban',
      instruction: 'Klik 2 tindakan di bawah yang melanggar filosofi Lean Kanban dan pembatasan WIP:',
      type: 'temukan-kesalahan',
      contextSnippet: {
        title: 'Observasi Alur Kerja Papan Tugas Tim Operasional',
        subtitle: 'Audit Metodologi Agile & Kanban',
        lines: q6Lines,
      },
      requiredErrorCount: 2,
      explanation: 'Menarik tugas melebihi batas WIP limit dan memindahkan kartu yang belum selesai ke kolom Done melanggar transparansi alur kerja.',
      conceptReference: 'Essential Kanban Condensed',
    },
    {
      id: 'D11-QZ-07',
      title: 'Karakteristik Sasaran Proyek Berstandar SMART',
      instruction: 'Pasangkan komponen akronim SMART dengan implementasi praktisnya pada perumusan tujuan proyek:',
      type: 'cocokkan',
      pairs: shuffleWithRng(q7Pairs, rng),
      explanation: 'Sasaran SMART harus Specific (fokus deliverable), Measurable (angka terukur), Achievable (kapasitas tim), dan Time-bound (tenggat waktu pasti).',
      conceptReference: 'SMART Project Goals Framework',
    },
    {
      id: 'D11-QZ-08',
      title: 'Hierarki Dekomposisi WBS & Aturan 100%',
      instruction: 'Urutkan tingkatan dekomposisi Work Breakdown Structure (WBS) dari sasaran umum hingga paket kerja terkecil:',
      type: 'urutan',
      items: shuffleGuaranteedDifferent(q8RawItems, ['wbs-1', 'wbs-2', 'wbs-3', 'wbs-4'], rng),
      correctOrder: ['wbs-1', 'wbs-2', 'wbs-3', 'wbs-4'],
      explanation: 'WBS mengalir dari Proyek Induk (Level 1) -> Sub-fase (Level 2) -> Paket Kerja Work Package (Level 3) -> Verifikasi cakupan total 100%.',
      conceptReference: 'PMI Practice Standard for WBS',
    },
    {
      id: 'D11-QZ-09',
      title: 'Audit Pelaksanaan Rapat Koordinasi Kilat (Daily Standup)',
      instruction: 'Klik 2 perilaku di bawah yang menyimpang dari aturan baku daily standup 15 menit:',
      type: 'temukan-kesalahan',
      contextSnippet: {
        title: 'Evaluasi Fasilitasi Rapat Harian Tim Proyek',
        subtitle: 'Review Efisiensi Koordinasi Tim',
        lines: q9Lines,
      },
      requiredErrorCount: 2,
      explanation: 'Memperpanjang standup menjadi debat 2 jam dan menjadikannya ajang menyalahkan staf melanggar etika koordinasi tim tangkas.',
      conceptReference: 'Agile Daily Standup Guidelines',
    },
    {
      id: 'D11-QZ-10',
      title: 'Identifikasi Zona Kuadran II (Investasi Strategis & Pencegahan)',
      instruction: 'Klik area kuadran pada Matriks Eisenhower di bawah tempat alokasi waktu produktivitas strategis berada:',
      type: 'klik-area',
      previewImageOrBox: {
        title: 'Bagan Matriks Prioritas Eisenhower (Urgensi vs Kepentingan)',
        zones: q10Zones,
      },
      explanation: 'Kuadran II (Penting tetapi Tidak Mendesak) adalah area terbaik untuk mencegah krisis, merancang SOP, dan membangun inovasi.',
      conceptReference: 'Matriks Eisenhower 4 Kuadran',
    },
  ];
}

export const D11_QUIZZES = generateSeededD11Quizzes(3001);
