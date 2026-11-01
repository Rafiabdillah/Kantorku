/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D14: Literasi Digital, Keamanan & AI - Case File v2
 */

import { CaseFile } from '../../../types';

export const D14_CASES: CaseFile[] = [
  {
    id: 'case-d14-01',
    code: 'D14-C1',
    title: 'Audit Keamanan Digital & Tanggap Insiden Phishing Toko',
    industry: 'Ritel & Distribusi Dagang',
    tier: 3,
    scale: 'kecil',
    businessFunction: 'Keamanan TI & Kepatuhan Privasi Data',
    module: 'web',
    channel: 'email',
    deadlineHours: 6,
    estimatedMinutes: 25,
    clientName: 'Toko Perlengkapan Kantor Maju Sejahtera',
    character: 'sari',
    tags: ['keamanan-digital', 'phishing', 'uu-pdp', 'etika-ai'],
    modules: ['web', 'js'],
    requires: ['advanced-quiz-engine'],
    summary:
      'Toko menerima rentetan email mencurigakan yang mengatasnamakan vendor ekspedisi logistik. Lakukan audit integritas alamat domain, susun prosedur tanggap darurat, dan terapkan aturan penyaringan lampiran berbahaya.',
    stakeholders: [
      {
        nama: 'Bu Sari',
        peran: 'Direktur Operasional',
        kepentingan: 'Mencegah kebocoran data pelanggan dan memastikan operasional harian tidak terganggu.',
        gayaBicara: 'Tegas, terukur, mengutamakan keselamatan aset perusahaan.',
      },
      {
        nama: 'Dimas',
        peran: 'Senior Admin Toko',
        kepentingan: 'Membantu staf baru mengenali tanda-tanda email penipuan agar tidak panik.',
        gayaBicara: 'Santai, suportif, menjelaskan dengan analogi praktis.',
      },
    ],
    timeline: [
      { hour: 1, event: 'Laporan masuk dari staf kasir mengenai email tagihan dengan ekstensi berkas ganda .pdf.exe.' },
      { hour: 3, event: 'Tim IT menemukan upaya percobaan login berulang (brute force) dari alamat IP asing.' },
      { hour: 5, event: 'Penerbitan memo instruksi darurat ganti kata sandi dan aktivasi 2FA seluruh karyawan.' },
    ],
    attachments: [
      {
        type: 'email-berantai',
        name: 'tangkapan_layar_email_mencurigakan.txt',
        description: 'Teks salinan email penipuan berisi tautan phishing dan nomor rekening palsu.',
      },
    ],
    dataPack: {
      generatorRef: 'phishing-incident-data-gen',
      variantsCount: 3,
      anomalies: [
        'Domain pengirim berakhiran .xyz yang menyamar sebagai ekspedisi resmi',
        'Urgensi palsu 30 menit sebelum pemblokiran akun fiktif',
        'Lampiran berkas eksekutabel .exe yang menyamar sebagai dokumen nota PDF',
      ],
    },
    deliverables: [
      {
        name: 'Laporan Audit Insiden Keamanan Digital',
        module: 'web',
        specification: 'Checklist identifikasi 3 red flag email phishing dan 4 langkah penanganan tanggap darurat.',
        requiredElements: ['Isolasi perangkat', 'Pergantian sandi', 'Pencabutan sesi login', 'Pelaporan insiden'],
      },
    ],
    decisionPoints: [
      {
        title: 'Respons Terhadap Notifikasi Akun Darurat',
        scenario: 'Pesan meminta verifikasi sandi dalam 15 menit atau akun diblokir.',
        options: [
          {
            label: 'Segera klik tautan untuk mencegah akun terblokir',
            impact: 'Salah fatal: Menyerahkan kredensial kepada penipu (phishing).',
            isOptimal: false,
          },
          {
            label: 'Abaikan dan hubungi narahubung resmi IT kantor via telepon internal',
            impact: 'Tindakan benar: Memverifikasi keabsahan melalui saluran komunikasi kedua (two-channel verification).',
            isOptimal: true,
          },
        ],
      },
    ],
    scopeChanges: [
      {
        hour: 3,
        description: 'Direksi meminta tambahan SOP mengenai batasan data yang boleh dimasukkan ke dalam alat bantu AI.',
        impact: 'Menambahkan pasal kepatuhan UU PDP dan larangan memasukkan NIK/keuangan ke prompt AI.',
      },
    ],
    handover: {
      summary: 'Insiden phishing berhasil diisolasi tanpa kebocoran data pelanggan maupun kredensial keuangan.',
      assumptions: ['Seluruh staf telah mengaktifkan 2FA berbasis aplikasi otentikasi pada akun email kerja.'],
      precautions: ['Waspadai upaya phishing lanjutan via panggilan suara (vishing) atau pesan singkat (smishing).'],
      nextSteps: ['Jadwalkan pelatihan simulasi phishing berkala setiap kuartal.'],
    },
    pitfalls: ['Mempercayai nama tampilan email tanpa mengecek alamat domain di dalam tanda kurung sudut.'],
    linkedLessons: ['D14-LES-01', 'D14-LES-02', 'D14-LES-03'],
    templatesUnlocked: ['Template SOP Penanganan Insiden Keamanan Siber UMKM'],
    modifiers: ['Tenggat Ketat', 'Data Sensitif'],
    referenceSolutions: [
      'Memutus koneksi internet, mengganti kata sandi utama dari perangkat aman, mencabut sesi login aktif, dan melaporkan insiden ke tim TI.',
      'Memeriksa domain asli, menandai sebagai spam/phishing, mengaktifkan 2FA berbasis aplikasi otentikasi, dan membagikan peringatan keamanan ke tim.',
    ],
    emails: [
      {
        from: 'sari@majusejahtera.co.id',
        subject: 'URGENT: Laporan Email Mencurigakan Mengatasnamakan Ekspedisi',
        timestamp: '08:30 WIB',
        body: 'Budi, pagi ini ada dua staf kasir yang menerima email tagihan palsu. Tolong bantu verifikasi tanda bahayanya dan susun panduan singkat mitigasi untuk seluruh divisi sebelum makan siang.',
      },
    ],
    chats: [
      {
        sender: 'Dimas',
        time: '08:45',
        message: 'Bro Budi, hati-hati ya, jangan asal klik link yang ada tulisan verifikasi kilat. Itu biasanya jebakan phishing.',
      },
    ],
    voiceNotes: [],
    clarifyingQuestions: [
      {
        id: 'cq-1',
        question: 'Apakah ada staf yang terlanjur mengklik tautan atau mengunduh lampiran tersebut?',
        options: [
          {
            id: 'opt-a',
            text: 'Tanyakan langsung dan minta staf segera putuskan koneksi internet bila ada yang mengklik.',
            isOptimal: true,
            bossResponse: 'Sangat tanggap! Isolasi jaringan adalah prioritas utama saat insiden siber.',
          },
          {
            id: 'opt-b',
            text: 'Biarkan saja dulu sampai jam kantor selesai baru diperiksa.',
            isOptimal: false,
            bossResponse: 'Berbahaya! Malware bisa menyebar cepat ke seluruh server kantor.',
          },
        ],
      },
    ],
    initialData: {},
    reputationReward: 15,
    xpReward: 250,
    coinsReward: 100,
    mentorDebrief: {
      keyTakeaway: 'Tindakan cepat mengisolasi jaringan dan memverifikasi domain pengirim mencegah kebocoran data perusahaan.',
      pitfallAvoided: 'Menghindari kelalaian mengklik lampiran .exe dan tidak membiarkan insiden tanpa penanganan.',
      industryContext: 'Sektor ritel dan logistik sering menjadi target spear-phishing karena tingginya volume transaksi tagihan harian.',
    },
  },
];
