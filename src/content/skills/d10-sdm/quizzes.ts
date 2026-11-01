/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D10: SDM & Kepemimpinan - Seeded Analytical Quizzes Generator
 */

import { AdvancedQuestion } from '../../../components/engines/AdvancedQuizEngine';
import {
  mulberry32,
  hashStringToSeed,
  shuffleWithRng,
  shuffleGuaranteedDifferent,
} from '../d12-komunikasi/quizzes';
import {
  D10_PAYROLL_CONSTANTS,
  calculateHourlyWage,
  calculateWeekdayOvertimePay,
  calculateTHR,
  calculateBpjsKesehatanEmployeeDeduction,
  formatRupiahD10,
} from './constants';

export function generateSeededD10Quizzes(seedInput: number | string = 1010): AdvancedQuestion[] {
  const seedNum = hashStringToSeed(seedInput);
  const rng = mulberry32(seedNum);

  const variantQ1 = rng() > 0.5 ? 'B' : 'A';
  const variantQ3 = rng() > 0.5 ? 'B' : 'A';
  const variantQ5 = rng() > 0.5 ? 'B' : 'A';
  const variantQ7 = rng() > 0.5 ? 'B' : 'A';

  // 1. Urutan: Tahapan Konseling Karyawan Menggunakan Model SBI (Situation-Behavior-Impact)
  const q1RawItems = [
    {
      id: 'step-situation',
      text:
        variantQ1 === 'A'
          ? '1. Situation (Situasi): Menyebutkan waktu, tempat, dan konteks spesifik saat peristiwa kerja terjadi secara objektif.'
          : '1. Penetapan Situasi: Menjelaskan latar belakang waktu dan proyek spesifik tanpa asumsi subjektif.',
    },
    {
      id: 'step-behavior',
      text:
        variantQ1 === 'A'
          ? '2. Behavior (Perilaku): Mendeskripsikan tindakan atau perilaku nyata yang teramati secara faktual tanpa melabeli sifat personal.'
          : '2. Deskripsi Perilaku: Memaparkan fakta tindakan yang dilakukan pekerja secara terukur dan netral.',
    },
    {
      id: 'step-impact',
      text:
        variantQ1 === 'A'
          ? '3. Impact (Dampak): Menjelaskan akibat langsung dari tindakan tersebut terhadap alur kerja tim, kepuasan klien, atau biaya operasional.'
          : '3. Pemaparan Dampak: Menguraikan konsekuensi nyata dari perilaku tersebut terhadap capaian target organisasi.',
    },
    {
      id: 'step-action-plan',
      text:
        variantQ1 === 'A'
          ? '4. Action Plan (Rencana Aksi): Menyepakati solusi bersama, komitmen perbaikan, dan jadwal evaluasi tindak lanjut.'
          : '4. Kesepakatan Solusi: Merumuskan target perbaikan kinerja terukur dan tenggat waktu evaluasi bersama.',
    },
  ];
  const q1CorrectOrder = ['step-situation', 'step-behavior', 'step-impact', 'step-action-plan'];
  const q1Items = shuffleGuaranteedDifferent(q1RawItems, q1CorrectOrder, rng);

  // 2. Cocokkan: Jenis Kontrak Kerja & Ketentuan Hukumnya (UU Ketenagakerjaan & PP 35/2021)
  const q2Pairs = shuffleWithRng(
    [
      {
        id: 'c-pkwt',
        left: 'PKWT (Waktu Tertentu)',
        right: 'Hanya untuk pekerjaan tidak tetap/musiman, dilarang ada masa percobaan (probation), berhak uang kompensasi di akhir kontrak.',
      },
      {
        id: 'c-pkwtt',
        left: 'PKWTT (Waktu Tidak Tertentu / Tetap)',
        right: 'Dapat mensyaratkan masa percobaan maksimal 3 bulan dengan upah tidak boleh di bawah upah minimum.',
      },
      {
        id: 'c-probation',
        left: 'Masa Percobaan (Probation)',
        right: 'Batal demi hukum jika dicantumkan dalam kontrak PKWT, masa kerja tetap dihitung sejak hari pertama.',
      },
      {
        id: 'c-kompensasi',
        left: 'Uang Kompensasi PKWT',
        right: 'Wajib dibayarkan saat masa kontrak berakhir bagi pekerja dengan masa kerja minimal 1 bulan terus-menerus.',
      },
    ],
    rng
  );

  // 3. Temukan Kesalahan: Audit Slip Penggajian Lembur (PP No. 35/2021)
  const hourlyWage = calculateHourlyWage(D10_PAYROLL_CONSTANTS.monthlySalary);
  const overtimePayActual = calculateWeekdayOvertimePay(hourlyWage, D10_PAYROLL_CONSTANTS.overtimeHoursWorked);

  const q3SnippetLines = [
    {
      id: 'line-sal',
      text: `Gaji Pokok & Tunjangan Tetap sebulan: ${formatRupiahD10(D10_PAYROLL_CONSTANTS.monthlySalary)}.`,
      isError: false,
    },
    {
      id: 'line-hour',
      text: `Dasar upah per jam resmi (1/173): ${formatRupiahD10(D10_PAYROLL_CONSTANTS.monthlySalary)} / 173 = ${formatRupiahD10(hourlyWage)} per jam.`,
      isError: false,
    },
    {
      id: 'line-overtime',
      text:
        variantQ3 === 'A'
          ? `Kalkulasi lembur hari kerja 3 jam oleh staf keuangan: 3 jam x Rp20.000 (tarif flat semena-mena) = Rp60.000.`
          : `Kalkulasi lembur hari kerja 3 jam oleh staf keuangan: 3 jam x 1.0 x Rp30.000 = Rp90.000 (tidak menerapkan multiplier 1.5x dan 2.0x).`,
      isError: true,
    },
    {
      id: 'line-correct',
      text: `Koreksi normatif PP 35/2021: Jam ke-1 (1.5x) = ${formatRupiahD10(Math.round(hourlyWage * 1.5))}; Jam ke-2 & ke-3 (2.0x) = ${formatRupiahD10(Math.round(hourlyWage * 2.0 * 2))}. Total = ${formatRupiahD10(overtimePayActual)}.`,
      isError: false,
    },
  ];

  // 4. Cocokkan: Komponen Pemotongan Gaji & Iuran Jaminan Sosial
  const q4Pairs = shuffleWithRng(
    [
      {
        id: 'soc-bpjs-kes-emp',
        left: 'BPJS Kesehatan (Pekerja)',
        right: 'Dipotong 1% dari gaji bulanan pekerja (maksimal batas atas upah sesuai regulasi).',
      },
      {
        id: 'soc-bpjs-kes-comp',
        left: 'BPJS Kesehatan (Pemberi Kerja)',
        right: 'Ditanggung 4% oleh perusahaan sebagai fasilitas perlindungan kesehatan.',
      },
      {
        id: 'soc-jht-emp',
        left: 'BPJS JHT (Jaminan Hari Tua - Pekerja)',
        right: 'Dipotong 2% dari upah sebulan dan ditabung dalam akun saldo hari tua tenaga kerja.',
      },
      {
        id: 'soc-jkk-comp',
        left: 'BPJS JKK (Kecelakaan Kerja - Pemberi Kerja)',
        right: 'Ditanggung sepenuhnya oleh perusahaan sesuai tingkat risiko lingkungan kerja operasional.',
      },
    ],
    rng
  );

  // 5. Urutan: Prosedur Penerbitan Sanksi Kedisiplinan Karyawan Berjenjang
  const q5RawItems = [
    {
      id: 'step-verbal',
      text:
        variantQ5 === 'A'
          ? '1. Teguran Lisan & Klarifikasi 1-on-1: Memanggil pekerja secara tertutup untuk klarifikasi bukti ketidakdisiplinan perdana.'
          : '1. Konseling Awal: Mendiskusikan catatan pelanggaran kehadiran pertama kali secara empatik dan privat.',
    },
    {
      id: 'step-sp1',
      text:
        variantQ5 === 'A'
          ? '2. Surat Peringatan Pertama (SP 1): Menerbitkan surat peringatan tertulis yang berlaku selama 6 bulan jika pelanggaran berulang.'
          : '2. Penerbitan SP 1: Mengeluarkan surat peringatan resmi pertama dengan tembusan dinas jika diatur dalam PKB.',
    },
    {
      id: 'step-sp2',
      text:
        variantQ5 === 'A'
          ? '3. Surat Peringatan Kedua (SP 2): Diterbitkan jika pekerja kembali mengulangi pelanggaran dalam masa berlaku SP 1 aktif.'
          : '3. Eskalasi ke SP 2: Memberikan peringatan kedua disertai rencana peningkatan kinerja (PIP) intensif.',
    },
    {
      id: 'step-sp3',
      text:
        variantQ5 === 'A'
          ? '4. Surat Peringatan Ketiga (SP 3 / Terakhir): Diterbitkan sebagai sanksi terakhir sebelum proses mediasi pemutusan hubungan kerja.'
          : '4. Penerbitan SP 3: Peringatan pamungkas sebagai dasar legalitas formal jika pembinaan tidak membuahkan hasil.',
    },
  ];
  const q5CorrectOrder = ['step-verbal', 'step-sp1', 'step-sp2', 'step-sp3'];
  const q5Items = shuffleGuaranteedDifferent(q5RawItems, q5CorrectOrder, rng);

  // 6. Klik Area: Identifikasi Slip Hak THR yang Sah Sesuai Permenaker 6/2016
  const thr8Months = calculateTHR(D10_PAYROLL_CONSTANTS.monthlySalary, D10_PAYROLL_CONSTANTS.tenureMonthsWorkerB);
  const q6Zones = [
    {
      id: 'thr-unlawful-deny',
      label: 'Klaim Melanggar Hukum: Staf masa kerja 8 bulan ditolak THR dengan dalih "belum genap 12 bulan".',
      isTarget: false,
      explanation: 'Pilihan ini dijelaskan oleh konteks dan label pada kartu yang ditampilkan.',
    },
    {
      id: 'thr-lawful-prorata',
      label: `Hak Normatif Sah Permenaker 6/2016: Staf masa kerja 8 bulan menerima THR prorata (8/12) x ${formatRupiahD10(D10_PAYROLL_CONSTANTS.monthlySalary)} = ${formatRupiahD10(thr8Months)}.`,
      isTarget: true,
      explanation: 'Pilihan ini dijelaskan oleh konteks dan label pada kartu yang ditampilkan.',
    },
    {
      id: 'thr-unlawful-goods',
      label: 'Klaim Melanggar Hukum: Uang THR diganti sepihak dengan paket sembako atau barang promosi kantor.',
      isTarget: false,
      explanation: 'Pilihan ini dijelaskan oleh konteks dan label pada kartu yang ditampilkan.',
    },
  ];

  // 7. Temukan Kesalahan: Klausula Kontrak Kerja yang Batal Demi Hukum
  const q7SnippetLines = [
    {
      id: 'clause-1',
      text: 'Pasal Kontrak: "Pihak Pertama mempekerjakan Pihak Kedua sebagai Staf Logistik PKWT untuk jangka waktu 1 tahun."',
      isError: false,
    },
    {
      id: 'clause-2',
      text:
        variantQ7 === 'A'
          ? 'Pasal Kontrak: "Pihak Kedua wajib menjalani masa percobaan (probation) selama 3 bulan dengan pemotongan upah 50%."'
          : 'Pasal Kontrak: "Pihak Kedua dilarang menikah selama masa kontrak dan jika hamil bersedia mengundurkan diri tanpa hak apapun."',
      isError: true,
    },
    {
      id: 'clause-3',
      text: `Pasal Kontrak: "Upah bulanan disepakati sebesar ${formatRupiahD10(D10_PAYROLL_CONSTANTS.monthlySalary)} dibayarkan setiap tanggal 28 akhir bulan."`,
      isError: false,
    },
    {
      id: 'clause-4',
      text: 'Pasal Kontrak: "Pihak Kedua berhak atas perlindungan jaminan sosial BPJS Ketenagakerjaan dan Kesehatan sesuai ketentuan pemerintah."',
      isError: false,
    },
  ];

  // 8. Cocokkan: Rumus Perhitungan Payroll & Hak Ketenagakerjaan Normatif
  const q8Pairs = shuffleWithRng(
    [
      {
        id: 'f-hourly-rate',
        left: 'Upah Per Jam Resmi',
        right: '1/173 dikali Upah Sebulan (Upah Pokok + Tunjangan Tetap).',
      },
      {
        id: 'f-ot-weekday',
        left: 'Lembur Hari Kerja Biasa',
        right: 'Jam ke-1 dibayar 1.5x upah sejam, jam ke-2 dst dibayar 2.0x upah sejam.',
      },
      {
        id: 'f-thr-prorata',
        left: 'THR Karyawan < 12 Bulan',
        right: '(Masa Kerja dalam bulan / 12) dikali 1 bulan upah.',
      },
      {
        id: 'f-kompensasi-pkwt',
        left: 'Kompensasi Berakhirnya PKWT',
        right: '(Masa Kerja / 12) dikali 1 bulan upah setelah minimal 1 bulan bekerja.',
      },
    ],
    rng
  );

  // 9. Urutan: Tahapan Penerimaan Karyawan & Onboarding Kepatuhan Dokumen
  const q9RawItems = [
    {
      id: 'step-offering',
      text: '1. Surat Penawaran Kerja (Offering Letter): Menyerahkan rincian gaji, posisi, dan tanggal mulai kerja untuk disetujui kandidat.',
    },
    {
      id: 'step-contract',
      text: '2. Penandatanganan Perjanjian Kerja (PKWT/PKWTT): Menandatangani kontrak resmi tertulis bermaterai sebelum hari pertama bekerja.',
    },
    {
      id: 'step-bpjs-registration',
      text: '3. Pendaftaran BPJS Kesehatan & Ketenagakerjaan: Mendaftarkan data identitas dan keluarga pekerja ke sistem portal resmi.',
    },
    {
      id: 'step-induction',
      text: '4. Induksi K3 & Peraturan Perusahaan (PP): Memberikan pembekalan SOP operasional, hak cuti, dan etika kerja organisasi.',
    },
  ];
  const q9CorrectOrder = ['step-offering', 'step-contract', 'step-bpjs-registration', 'step-induction'];
  const q9Items = shuffleGuaranteedDifferent(q9RawItems, q9CorrectOrder, rng);

  // 10. Klik Area: Red Flag Praktik Pemotongan Gaji yang Ilegal
  const bpjsCut = calculateBpjsKesehatanEmployeeDeduction(D10_PAYROLL_CONSTANTS.monthlySalary);
  const q10Zones = [
    {
      id: 'deduct-bpjs',
      label: `Potongan Sah Regulasi: Iuran BPJS Kesehatan pekerja 1% x ${formatRupiahD10(D10_PAYROLL_CONSTANTS.monthlySalary)} = ${formatRupiahD10(bpjsCut)}.`,
      isTarget: false,
      explanation: 'Pilihan ini dijelaskan oleh konteks dan label pada kartu yang ditampilkan.',
    },
    {
      id: 'deduct-illegal-fine',
      label: 'Red Flag Ilegal: Denda keterlambatan 15 menit dipotong 50% gaji harian sepihak tanpa dasar di Peraturan Perusahaan.',
      isTarget: true,
      explanation: 'Pilihan ini dijelaskan oleh konteks dan label pada kartu yang ditampilkan.',
    },
    {
      id: 'deduct-pph21',
      label: 'Potongan Sah Regulasi: Pajak Penghasilan PPh 21 sesuai bukti potong tarif efektif rata-rata (TER).',
      isTarget: false,
      explanation: 'Pilihan ini dijelaskan oleh konteks dan label pada kartu yang ditampilkan.',
    },
  ];

  return [
    {
      id: 'D10-QZ-01',
      title: 'Urutan Kerangka Konseling Umpan Balik SBI',
      type: 'urutan',
      instruction: 'Susun 4 tahapan konseling karyawan berbasis model Situation-Behavior-Impact secara berurutan:',
      items: q1Items,
      correctOrder: q1CorrectOrder,
      explanation: 'Model SBI diawali Situation (situasi spesifik), Behavior (perilaku teramati), Impact (dampak terukur), hingga Action Plan (rencana perbaikan).',
    },
    {
      id: 'D10-QZ-02',
      title: 'Karakteristik & Regulasi PKWT vs PKWTT',
      type: 'cocokkan',
      instruction: 'Pasangkan jenis perjanjian kerja dan status ketenagakerjaan dengan ketentuan hukum yang sah:',
      pairs: q2Pairs,
      explanation: 'PKWT terikat batasan durasi dan dilarang mensyaratkan probation, sedangkan PKWTT dapat memiliki masa percobaan maksimal 3 bulan.',
    },
    {
      id: 'D10-QZ-03',
      title: 'Audit Kesalahan Perhitungan Slip Lembur PP 35/2021',
      type: 'temukan-kesalahan',
      instruction: 'Temukan baris perhitungan yang melanggar ketentuan resmi upah lembur:',
      contextSnippet: {
        title: 'Rekapitulasi Slip Upah Lembur Hari Kerja Biasa',
        lines: q3SnippetLines,
      },
      requiredErrorCount: 1,
      explanation: `PP No. 35/2021 mewajibkan pengali 1.5x untuk jam pertama dan 2.0x untuk jam kedua dan seterusnya, dilarang menggunakan tarif flat semena-mena. Total upah lembur 3 jam yang benar adalah ${formatRupiahD10(overtimePayActual)}.`,
    },
    {
      id: 'D10-QZ-04',
      title: 'Pemisahan Iuran Jaminan Sosial Tenaga Kerja & Kesehatan',
      type: 'cocokkan',
      instruction: 'Pasangkan jenis program jaminan sosial dengan ketentuan porsi iuran yang benar:',
      pairs: q4Pairs,
      explanation: 'BPJS Kesehatan ditanggung 4% oleh perusahaan dan 1% oleh pekerja. JHT dipotong 2% dari pekerja dan 3.7% dari perusahaan.',
    },
    {
      id: 'D10-QZ-05',
      title: 'Prosedur Berjenjang Penegakan Disiplin (SP)',
      type: 'urutan',
      instruction: 'Urutkan tahapan penegakan sanksi kedisiplinan kerja dari teguran hingga sanksi pamungkas:',
      items: q5Items,
      correctOrder: q5CorrectOrder,
      explanation: 'Sanksi kedisiplinan wajib berjenjang: diawali teguran lisan & klarifikasi, lalu SP 1, SP 2, hingga SP 3 dengan masa berlaku masing-masing 6 bulan.',
    },
    {
      id: 'D10-QZ-06',
      title: 'Penentuan Hak THR Keagamaan Normatif',
      type: 'klik-area',
      instruction: 'Klik skema pembayaran Tunjangan Hari Raya yang mematuhi Permenaker No. 6 Tahun 2016:',
      previewImageOrBox: {
        title: 'Perbandingan Praktik Pembayaran Tunjangan Hari Raya Keagamaan',
        zones: q6Zones,
      },
      explanation: `Permenaker No. 6/2016 mewajibkan pembayaran THR proporsional bagi pekerja dengan masa kerja minimal 1 bulan terus menerus dalam bentuk uang tunai rupiah. Untuk masa kerja 8 bulan berhak menerima ${formatRupiahD10(thr8Months)}.`,
    },
    {
      id: 'D10-QZ-07',
      title: 'Identifikasi Klausula Kontrak Kerja yang Batal Demi Hukum',
      type: 'temukan-kesalahan',
      instruction: 'Temukan klausula kontrak kerja yang melanggar peraturan perundang-undangan ketenagakerjaan:',
      contextSnippet: {
        title: 'Draf Perjanjian Kerja Waktu Tertentu (PKWT)',
        lines: q7SnippetLines,
      },
      requiredErrorCount: 1,
      explanation: 'Pasal 58 UU Ketenagakerjaan jo. PP 35/2021 menegaskan masa percobaan pada PKWT batal demi hukum. Diskriminasi larangan menikah/hamil juga dilarang keras oleh undang-undang.',
    },
    {
      id: 'D10-QZ-08',
      title: 'Formula Matematis Hak Upah & Kompensasi Ketenagakerjaan',
      type: 'cocokkan',
      instruction: 'Pasangkan istilah hak ketenagakerjaan dengan formula perhitungannya yang tepat:',
      pairs: q8Pairs,
      explanation: 'Upah lembur berbasis pembagi 1/173, THR prorata berbasis masa kerja/12, dan kompensasi PKWT dihitung di akhir periode kontrak.',
    },
    {
      id: 'D10-QZ-09',
      title: 'Tahapan Penerimaan Karyawan Baru (Onboarding)',
      type: 'urutan',
      instruction: 'Urutkan proses administrasi ketenagakerjaan sejak offering hingga pembekalan kerja:',
      items: q9Items,
      correctOrder: q9CorrectOrder,
      explanation: 'Alur administrasi SDM diawali penawaran resmi (Offering), penandatanganan kontrak (PKWT/PKWTT), pendaftaran jaminan sosial BPJS, dan induksi K3 serta peraturan perusahaan.',
    },
    {
      id: 'D10-QZ-10',
      title: 'Deteksi Praktik Pemotongan Upah yang Melanggar Hukum',
      type: 'klik-area',
      instruction: 'Klik jenis potongan upah pada slip gaji yang melanggar ketentuan perundang-undangan:',
      previewImageOrBox: {
        title: 'Pemeriksaan Pos Potongan pada Lembar Slip Gaji Karyawan',
        zones: q10Zones,
      },
      explanation: 'PP No. 36/2021 tentang Pengupahan melarang pemotongan upah sepihak yang tidak diatur dalam perjanjian kerja atau melebihi batas 50% dari upah pekerja.',
    },
  ];
}

export const D10_QUIZZES = generateSeededD10Quizzes(1010);
