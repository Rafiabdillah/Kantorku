/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D10: SDM & Kepemimpinan - Lessons
 */

import {
  D10_PAYROLL_CONSTANTS,
  calculateHourlyWage,
  calculateWeekdayOvertimePay,
  calculateTHR,
  calculateBpjsKesehatanEmployeeDeduction,
  formatRupiahD10,
} from './constants';

export interface LessonSection {
  title: string;
  content: string;
  keyPoints: string[];
}

export interface D10Lesson {
  id: string;
  domainId: 'D10';
  title: string;
  summary: string;
  estimatedMinutes: number;
  lastReviewed: string;
  sources: string[];
  disclaimer: string;
  workedExample: {
    bad: string;
    good: string;
    explanation: string;
  };
  sections: LessonSection[];
}

export const D10_LESSONS: D10Lesson[] = [
  {
    id: 'D10-LES-01',
    domainId: 'D10',
    title: 'Perjanjian Kerja (PKWT/PKWTT), Masa Percobaan & Kepatuhan Regulasi',
    summary:
      'Perbedaan hukum kontrak kerja waktu tertentu dan tetap, larangan masa percobaan pada PKWT, hak cuti, dan uang kompensasi berakhirnya kontrak PP No. 35/2021.',
    estimatedMinutes: 18,
    lastReviewed: '2026-10-31',
    sources: [
      'UU No. 13 Tahun 2003 tentang Ketenagakerjaan jo. UU No. 6 Tahun 2023',
      'PP No. 35 Tahun 2021 tentang PKWT, Alih Daya, Waktu Kerja dan PHK',
    ],
    disclaimer:
      'Materi pembelajaran regulasi ketenagakerjaan ini disajikan untuk tujuan edukasi profesional dan bukan merupakan nasihat hukum resmi perburuhan.',
    workedExample: {
      bad: 'Perusahaan memberlakukan kontrak PKWT 1 tahun dengan masa percobaan (probation) 3 bulan bergaji 50%. Jika mengundurkan diri saat masa percobaan, pekerja didenda 20 juta rupiah tanpa surat perjanjian tertulis.',
      good: 'Perjanjian Kerja Waktu Tertentu (PKWT) dibuat tertulis bermaterai untuk durasi 1 tahun tanpa masa percobaan (karena probation pada PKWT batal demi hukum sesuai Pasal 13 PP 35/2021). Hak upah dibayar 100% sejak hari pertama, dan pada akhir kontrak pekerja berhak menerima uang kompensasi proporsional sebesar 1 bulan upah.',
      explanation:
        'Pasal 58 UU Ketenagakerjaan jo. Pasal 13 PP No. 35/2021 menegaskan bahwa PKWT tidak boleh mensyaratkan masa percobaan. Jika disyaratkan, masa percobaan tersebut batal demi hukum dan masa kerja tetap dihitung.',
    },
    sections: [
      {
        title: '1. Karakteristik & Pembatasan PKWT vs PKWTT',
        content:
          'PKWT hanya boleh diadakan untuk pekerjaan tertentu yang menurut jenis dan sifat atau kegiatan pekerjaannya akan selesai dalam waktu tertentu (musiman, produk baru, atau pekerjaan sekali selesai). PKWT tidak dapat diadakan untuk pekerjaan yang bersifat tetap.',
        keyPoints: [
          'Durasi maksimal PKWT adalah paling lama 5 tahun termasuk perpanjangannya.',
          'PKWT wajib dibuat secara tertulis dalam Bahasa Indonesia dan dicatatkan ke dinas ketenagakerjaan.',
          'Larangan masa percobaan kerja (probation) berlaku mutlak pada PKWT.',
        ],
      },
      {
        title: '2. Hak Uang Kompensasi PKWT',
        content:
          'Berdasarkan PP No. 35/2021, pengusaha wajib memberikan uang kompensasi kepada pekerja PKWT yang masa kerjanya telah mencapai minimal 1 bulan secara terus menerus saat kontrak berakhir. Rumus kompensasi: (Masa Kerja dalam bulan / 12) * 1 bulan upah.',
        keyPoints: [
          'Kompensasi diberikan saat berakhirnya jangka waktu PKWT.',
          'Besaran kompensasi dihitung berdasarkan upah pokok dan tunjangan tetap terakhir.',
          'Kompensasi tetap berlaku jika kontrak diperpanjang, dihitung untuk masa kontrak sebelumnya.',
        ],
      },
      {
        title: '3. Waktu Kerja, Istirahat Mingguan & Cuti Tahunan',
        content:
          'Waktu kerja standar adalah 7 jam sehari (40 jam seminggu untuk 6 hari kerja) atau 8 jam sehari (40 jam seminggu untuk 5 hari kerja). Pekerja yang telah bekerja 12 bulan berhak atas cuti tahunan minimal 12 hari kerja dengan upah penuh.',
        keyPoints: [
          'Istirahat antar jam kerja minimal 30 menit setelah bekerja selama 4 jam terus-menerus.',
          'Pekerja sakit dengan surat keterangan dokter resmi tidak boleh dipotong upah pokoknya.',
          'Hak cuti melahirkan adalah 1,5 bulan sebelum dan 1,5 bulan sesudah melahirkan.',
        ],
      },
    ],
  },
  {
    id: 'D10-LES-02',
    domainId: 'D10',
    title: 'Kalkulasi Resmi Upah Lembur & THR Keagamaan (PP 35/2021 & Permenaker 6/2016)',
    summary:
      'Metode matematis penghitungan upah lembur resmi berbasis pembagi 1/173, tarif jam pertama dan berikutnya, serta perhitungan THR proporsional.',
    estimatedMinutes: 20,
    lastReviewed: '2026-10-31',
    sources: [
      'PP No. 35 Tahun 2021 tentang PKWT, Alih Daya, Waktu Kerja dan PHK (Pasal 31-32)',
      'Permenaker No. 6 Tahun 2016 tentang Tunjangan Hari Raya Keagamaan Bagi Pekerja/Buruh di Perusahaan',
    ],
    disclaimer:
      'Perhitungan upah lembur dan THR disajikan berdasarkan formula normatif peraturan perundang-undangan Republik Indonesia.',
    workedExample: {
      bad: `Staf lembur 3 jam pada hari kerja normal diberi uang lembur flat Rp20.000 per jam tanpa menghitung upah pokoknya. Karyawan yang baru bekerja 8 bulan tidak diberi THR sama sekali dengan alasan "belum genap 1 tahun".`,
      good: `Perhitungan normatif: Upah sebulan ${formatRupiahD10(D10_PAYROLL_CONSTANTS.monthlySalary)} memiliki upah sejam = ${formatRupiahD10(D10_PAYROLL_CONSTANTS.monthlySalary)} / 173 = ${formatRupiahD10(calculateHourlyWage(D10_PAYROLL_CONSTANTS.monthlySalary))}. Lembur hari kerja 3 jam: Jam ke-1 = 1.5 x ${formatRupiahD10(calculateHourlyWage(D10_PAYROLL_CONSTANTS.monthlySalary))} = ${formatRupiahD10(Math.round(calculateHourlyWage(D10_PAYROLL_CONSTANTS.monthlySalary) * 1.5))}; Jam ke-2 & ke-3 = 2 x 2.0 x ${formatRupiahD10(calculateHourlyWage(D10_PAYROLL_CONSTANTS.monthlySalary))} = ${formatRupiahD10(Math.round(calculateHourlyWage(D10_PAYROLL_CONSTANTS.monthlySalary) * 2.0 * 2))}. Total upah lembur 3 jam = ${formatRupiahD10(calculateWeekdayOvertimePay(calculateHourlyWage(D10_PAYROLL_CONSTANTS.monthlySalary), D10_PAYROLL_CONSTANTS.overtimeHoursWorked))}. Untuk THR karyawan masa kerja ${D10_PAYROLL_CONSTANTS.tenureMonthsWorkerB} bulan: THR prorata = (${D10_PAYROLL_CONSTANTS.tenureMonthsWorkerB} / 12) x ${formatRupiahD10(D10_PAYROLL_CONSTANTS.monthlySalary)} = ${formatRupiahD10(calculateTHR(D10_PAYROLL_CONSTANTS.monthlySalary, D10_PAYROLL_CONSTANTS.tenureMonthsWorkerB))}.`,
      explanation: `Memberikan uang lembur flat melanggar Pasal 31 PP No. 35/2021 yang mewajibkan dasar pengali upah sejam (1/173). Menolak memberikan THR kepada staf dengan masa kerja minimal 1 bulan melanggar Permenaker No. 6/2016 Pasal 3 ayat 1 huruf b yang mewajibkan pembayaran THR proporsional.`,
    },
    sections: [
      {
        title: '1. Dasar Perhitungan Upah Sejam (Pembagi 1/173)',
        content: `Berdasarkan Pasal 32 PP No. 35/2021, dasar perhitungan upah lembur adalah upah bulanan (terdiri dari upah pokok dan tunjangan tetap). Upah per jam dihitung dengan rumus: Upah Sejam = 1/173 * Upah Sebulan. Contoh: ${formatRupiahD10(D10_PAYROLL_CONSTANTS.monthlySalary)} / 173 = ${formatRupiahD10(calculateHourlyWage(D10_PAYROLL_CONSTANTS.monthlySalary))} per jam.`,
        keyPoints: [
          'Tunjangan tidak tetap (seperti uang makan harian berbasis kehadiran) tidak dihitung dalam dasar lembur.',
          'Batas maksimal waktu kerja lembur adalah 4 jam sehari dan 18 jam seminggu (tidak termasuk lembur hari libur).',
          'Perintah lembur harus disertai surat penugasan tertulis atau persetujuan digital pekerja.',
        ],
      },
      {
        title: '2. Multiplier Lembur Hari Kerja Biasa',
        content: `Pasal 31 ayat (2) PP No. 35/2021 mengatur tarif lembur hari kerja: Untuk jam kerja lembur pertama dibayar sebesar 1,5 kali upah sejam, dan untuk setiap jam kerja lembur berikutnya dibayar sebesar 2 kali upah sejam. Jadi lembur 3 jam: (1,5 * Rp30.000) + (2 * Rp30.000 * 2) = Rp45.000 + Rp120.000 = ${formatRupiahD10(calculateWeekdayOvertimePay(calculateHourlyWage(D10_PAYROLL_CONSTANTS.monthlySalary), D10_PAYROLL_CONSTANTS.overtimeHoursWorked))}.`,
        keyPoints: [
          'Jam pertama mendapat multiplier 1,5x.',
          'Jam kedua, ketiga, dan seterusnya mendapat multiplier 2,0x.',
          'Pengusaha wajib menyediakan makanan dan minuman minimal 1.400 kkal jika lembur berlangsung 4 jam atau lebih.',
        ],
      },
      {
        title: '3. Perhitungan THR Keagamaan (Penuh vs Prorata)',
        content: `Permenaker No. 6/2016 menetapkan pekerja dengan masa kerja 12 bulan terus menerus berhak atas 1 bulan upah (${formatRupiahD10(D10_PAYROLL_CONSTANTS.monthlySalary)}). Bagi pekerja dengan masa kerja 1 bulan atau lebih tetapi kurang dari 12 bulan, THR dibayar proporsional: (Masa Kerja / 12) * 1 bulan upah. Untuk masa kerja 8 bulan: (8 / 12) * Rp5.190.000 = ${formatRupiahD10(calculateTHR(D10_PAYROLL_CONSTANTS.monthlySalary, D10_PAYROLL_CONSTANTS.tenureMonthsWorkerB))}. THR wajib dibayarkan paling lambat 7 hari sebelum hari raya keagamaan.`,
        keyPoints: [
          'Pekerja masa kerja minimal 1 bulan berhak mendapatkan THR proporsional.',
          'THR wajib dibayar dalam bentuk uang tunai rupiah, dilarang diganti dalam bentuk barang/bingkisan sembako.',
          'Keterlambatan pembayaran THR dikenai denda sebesar 5% dari total THR yang harus dibayar.',
        ],
      },
    ],
  },
  {
    id: 'D10-LES-03',
    domainId: 'D10',
    title: 'Manajemen Kinerja (KPI/OKRs), Konseling Karyawan & Mediasi Konflik',
    summary:
      'Teknik umpan balik konstruktif Situation-Behavior-Impact (SBI), tahapan surat peringatan (SP), rencana perbaikan performa (PIP), dan de-eskalasi friksi tim.',
    estimatedMinutes: 16,
    lastReviewed: '2026-10-31',
    sources: [
      'Dessler, G. (2020). Human Resource Management (Pearson, 16th ed.)',
      'UU No. 13 Tahun 2003 tentang Ketenagakerjaan jo. UU No. 6 Tahun 2023',
    ],
    disclaimer:
      'Manajemen kinerja dan sanksi kedisiplinan harus berpijak pada prinsip transparansi, keadilan, dan kesempatan perbaikan diri.',
    workedExample: {
      bad: 'Manajer memarahi staf junior di depan seluruh tim: "Kamu tidak becus kerja dan malas! Besok langsung saya keluarkan SP 3 dan potong gaji sepihak!"',
      good: 'Sesi 1-on-1 privat menggunakan model SBI: "Doni, pada peluncuran katalog kemarin (Situation), draf spesifikasi produk terlambat diserahkan 3 jam dari tenggat (Behavior), sehingga tim distribusi tertunda mencetak materi promosi (Impact). Mari kita tinjau hambatan yang kamu hadapi dan susun target perbaikan 2 pekan ke depan."',
      explanation:
        'Kritik emosional di muka umum merusak moral kerja dan melanggar etika pembinaan staf. Model SBI membedakan fakta perilaku dari asumsi personal, memberi ruang klarifikasi, dan menghasilkan rencana perbaikan kerja terukur.',
    },
    sections: [
      {
        title: '1. Model Umpan Balik Konstruktif SBI',
        content:
          'Model Situation-Behavior-Impact memandu percakapan pembinaan yang objektif: sebutkan situasi spesifik (kapan dan di mana), deskripsikan perilaku nyata yang teramati (tanpa label subjektif), lalu jelaskan dampak terukur dari tindakan tersebut terhadap tim.',
        keyPoints: [
          'Fokus pada tindakan dan fakta yang dapat diperbaiki, bukan karakter personal.',
          'Lakukan sesi evaluasi dalam suasana tertutup untuk menjaga martabat staf.',
          'Dengarkan penjelasan kendala dari perspektif karyawan sebelum menarik kesimpulan.',
        ],
      },
      {
        title: '2. Prosedur Kedisiplinan & Surat Peringatan (SP)',
        content:
          'Berdasarkan UU Ketenagakerjaan dan Perjanjian Kerja Bersama, sanksi pelanggaran kedisiplinan berjenjang melalui Surat Peringatan Pertama (SP 1), Kedua (SP 2), dan Ketiga (SP 3). Setiap SP berlaku untuk jangka waktu 6 bulan kecuali diatur lain dalam perjanjian kerja.',
        keyPoints: [
          'SP wajib diterbitkan tertulis memuat jenis pelanggaran dan pasal yang dilanggar.',
          'Karyawan berhak menandatangani bukti penerimaan atau memberikan tanggapan tertulis.',
          'SP tidak boleh disertai sanksi pemotongan upah sepihak di luar ketentuan hukum.',
        ],
      },
      {
        title: '3. Mediasi & De-eskalasi Friksi Interpersonal',
        content:
          'Friksi antar anggota tim wajar terjadi dalam dinamika kerja. Sebagai pemimpin, posisikan diri sebagai mediator netral: pertemukan kedua pihak, identifikasi akar benturan kepentingan, pisahkan emosi dari masalah pekerjaan, dan sepakati protokol komunikasi tim ke depan.',
        keyPoints: [
          'Jangan memihak atau mengambil kesimpulan sebelum mendengar kedua belah pihak.',
          'Arahkan fokus percakapan pada tujuan bersama proyek perusahaan.',
          'Dokumentasikan kesepakatan damai dan pantau interaksi tim secara berkala.',
        ],
      },
    ],
  },
];
