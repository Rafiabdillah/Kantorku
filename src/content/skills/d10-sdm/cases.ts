/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D10: SDM & Kepemimpinan - Case File
 */

import { CaseFile } from '../../../types';
import {
  D10_PAYROLL_CONSTANTS,
  calculateHourlyWage,
  calculateWeekdayOvertimePay,
  calculateTHR,
  formatRupiahD10,
} from './constants';

export const D10_CASES: CaseFile[] = [
  {
    id: 'case-d10-01',
    code: 'D10-C1',
    title: 'Audit Penggajian Lembur, Rekonsiliasi THR Prorata & Standarisasi PKWT',
    industry: 'Logistik & Distribusi Pergudangan',
    tier: 3,
    scale: 'menengah',
    businessFunction: 'SDM, Payroll & Kepatuhan Hubungan Industrial',
    module: 'excel',
    channel: 'email',
    deadlineHours: 8,
    estimatedMinutes: 25,
    clientName: 'PT Logistik Sejahtera Mandiri',
    character: 'nadia',
    tags: ['sdm', 'payroll', 'lembur', 'thr', 'pkwt', 'pp-35-2021', 'bpjs'],
    modules: ['excel', 'word'],
    requires: ['advanced-quiz-engine'],
    summary:
      'Perusahaan menghadapi keluhan pekerja logistik akibat perhitungan lembur yang dipukul rata Rp20.000/jam serta penolakan hak THR bagi staf baru bermasa kerja 8 bulan. Lakukan audit payroll normatif dan susun draf standar kontrak PKWT.',
    stakeholders: [
      {
        nama: 'Bu Mega',
        peran: 'Human Resources Manager',
        kepentingan: 'Menjamin seluruh hak normatif staf dihitung akurat sesuai PP No. 35/2021 dan Permenaker No. 6/2016 untuk mencegah gejolak ketenagakerjaan.',
        gayaBicara: 'Empatik, suportif terhadap hak staf, dan berpegang teguh pada aturan hukum ketenagakerjaan.',
      },
      {
        nama: 'Pak Reza',
        peran: 'Finance Manager',
        kepentingan: 'Melihat dasar hukum resmi pengeluaran lembur dan memastikan perhitungan iuran BPJS tepat sasaran.',
        gayaBicara: 'Ketat pada anggaran kas, membutuhkan rujukan pasal regulasi yang jelas.',
      },
    ],
    timeline: [
      { hour: 1, event: 'Penemuan selisih pembayaran lembur 3 jam hari kerja pada 15 staf logistik.' },
      { hour: 3, event: 'Perhitungan ulang hak upah per jam berbasis rumus 1/173 dan kalkulasi THR prorata masa kerja 8 bulan.' },
      { hour: 6, event: 'Penyusunan format slip gaji normatif dan draf pembaruan klausula kontrak PKWT tanpa probation.' },
    ],
    attachments: [
      {
        type: 'lembar-excel',
        name: 'rekap_lembur_dan_gaji_staf_logistik.xlsx',
        description: 'Tabel absensi jam lembur, slip gaji staf, dan rekapitulasi masa kerja karyawan.',
      },
    ],
    dataPack: {
      generatorRef: 'hr-payroll-audit-data-gen',
      variantsCount: 3,
      anomalies: [
        `Uang lembur 3 jam staf bergaji ${formatRupiahD10(D10_PAYROLL_CONSTANTS.monthlySalary)} dihitung flat Rp60.000 (seharusnya ${formatRupiahD10(calculateWeekdayOvertimePay(calculateHourlyWage(D10_PAYROLL_CONSTANTS.monthlySalary), D10_PAYROLL_CONSTANTS.overtimeHoursWorked))})`,
        `Staf masa kerja ${D10_PAYROLL_CONSTANTS.tenureMonthsWorkerB} bulan ditolak menerima THR (seharusnya menerima THR prorata ${formatRupiahD10(calculateTHR(D10_PAYROLL_CONSTANTS.monthlySalary, D10_PAYROLL_CONSTANTS.tenureMonthsWorkerB))})`,
        'Draf kontrak PKWT mencantumkan klausula masa percobaan (probation) 3 bulan yang batal demi hukum',
      ],
    },
    deliverables: [
      {
        name: 'Rekonsiliasi Slip Lembur Normatif PP 35/2021 & THR Keagamaan',
        module: 'excel',
        specification: 'Kalkulasi resmi upah per jam (1/173), multiplier lembur (1.5x dan 2.0x), dan THR proporsional.',
        requiredElements: ['Upah per jam', 'Lembur 3 jam', 'THR prorata', 'Potongan BPJS', 'Gaji bersih'],
      },
      {
        name: 'Draf SOP Kontrak Kerja PKWT & Pedoman Sanksi Kedisiplinan Berjenjang',
        module: 'word',
        specification: 'Penyusunan klausula PKWT tanpa masa percobaan, hak uang kompensasi, dan prosedur sanksi SP 1-3.',
        requiredElements: ['Klausula PKWT', 'Uang kompensasi', 'Model SBI', 'Masa berlaku SP', 'Hak cuti'],
      },
    ],
    handover: {
      summary: 'Slip gaji terverifikasi dan pedoman kontrak PKWT normatif berhasil disahkan bersama manajemen.',
      assumptions: ['Semua penugasan lembur telah diverifikasi melalui lembar persetujuan perintah lembur resmi.'],
      precautions: ['Pastikan seluruh slip gaji mencantumkan rincian upah pokok, tunjangan tetap, dan potongan iuran secara transparan.'],
      nextSteps: ['Sosialisasikan formula lembur dan THR normatif kepada seluruh supervisor operasional gudang.'],
    },
    pitfalls: ['Menggunakan tarif lembur flat semena-mena dan mengabaikan hak THR bagi pekerja kontrak dengan masa kerja di bawah 1 tahun.'],
    referenceSolutions: ['Rekonsiliasi Slip Lembur Normatif', 'Draf SOP Kontrak PKWT & Pedoman Sanksi'],
    emails: [
      {
        from: 'nadia@majusejahtera.co.id',
        subject: 'URGENT: Koreksi Perhitungan Lembur Logistik & Hak THR Staf',
        timestamp: '08:30 WIB',
        body: `Budi, mohon segera periksa rekap penggajian staf gudang kita. Upah sebulan staf adalah ${formatRupiahD10(D10_PAYROLL_CONSTANTS.monthlySalary)}. Mereka lembur ${D10_PAYROLL_CONSTANTS.overtimeHoursWorked} jam pada hari kerja normal, namun finance lama menghitung flat Rp20.000/jam. Tolong hitung dengan rumus 1/173 PP 35/2021, serta hitung THR prorata untuk staf bermasa kerja ${D10_PAYROLL_CONSTANTS.tenureMonthsWorkerB} bulan.`,
      },
    ],
    chats: [
      {
        sender: 'Bu Mega',
        time: '08:45',
        message: 'Budi, pastikan klausula kontrak PKWT kita juga diperiksa ya. Jangan ada lagi syarat masa percobaan yang melanggar aturan.',
      },
    ],
    voiceNotes: [],
    clarifyingQuestions: [
      {
        id: 'cq-d10-1',
        question: 'Bagaimana perlakuan hukum yang benar apabila dalam kontrak kerja PKWT tertulis klausula masa percobaan (probation) 3 bulan?',
        options: [
          {
            id: 'opt-a',
            text: 'Masa percobaan tersebut batal demi hukum, masa kerja tetap dihitung sejak hari pertama, dan upah wajib dibayar penuh 100%.',
            isOptimal: true,
            bossResponse: 'Tepat sekali! Pasal 58 UU Ketenagakerjaan jo. Pasal 13 PP 35/2021 secara tegas melarang masa percobaan pada PKWT.',
          },
          {
            id: 'opt-b',
            text: 'Masa percobaan tetap sah jika pekerja sudah menandatangani kontrak.',
            isOptimal: false,
            bossResponse: 'Salah! Klausula yang bertentangan dengan peraturan perundang-undangan batal demi hukum meskipun disetujui kedua belah pihak.',
          },
        ],
      },
    ],
    initialData: {},
    reputationReward: 15,
    xpReward: 250,
    coinsReward: 100,
    mentorDebrief: {
      keyTakeaway:
        'Keadilan hubungan kerja dibangun di atas transparansi penggajian normatif dan penghormatan terhadap hak-hak dasar tenaga kerja.',
      pitfallAvoided:
        'Menghindarkan perusahaan dari sanksi denda ketenagakerjaan, perselisihan hubungan industrial, dan penurunan drastis semangat kerja karyawan.',
      industryContext:
        'Kepatuhan ketenagakerjaan bukan sekadar urusan hukum, melainkan fondasi utama reputasi employer branding dalam menarik dan mempertahankan talenta terbaik.',
    },
  },
];
