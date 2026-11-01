/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D8: Operasional & Rantai Pasok - Case File
 */

import { CaseFile } from '../../../types';
import {
  D8_INVENTORY_CONSTANTS,
  calculateEOQ,
  calculateDailyDemand,
  calculateSafetyStock,
  calculateROP,
  formatRupiahD8,
} from './constants';

export const D8_CASES: CaseFile[] = [
  {
    id: 'case-d8-01',
    code: 'D8-C1',
    title: 'Audit Manajemen Persediaan Gudang, Kebijakan EOQ & Evaluasi SLA Pemasok',
    industry: 'Ritel Minimarket & Jaringan Distribusi Bahan Pokok',
    tier: 3,
    scale: 'menengah',
    businessFunction: 'Manajemen Operasional & Rantai Pasok',
    module: 'excel',
    channel: 'email',
    deadlineHours: 8,
    estimatedMinutes: 25,
    clientName: 'PT Distribusi Logistik Nusantara',
    character: 'sari',
    tags: ['operasional', 'rantai-pasok', 'eoq', 'rop', 'safety-stock', 'vendor-sla', 'k3'],
    modules: ['excel', 'word'],
    requires: ['advanced-quiz-engine'],
    summary:
      'Gudang distribusi sering mengalami krisis kekosongan stok barang akibat kebijakan pemesanan reaktif tanpa perhitungan EOQ dan tidak adanya batas cadangan pengaman (safety stock). Lakukan audit parameter inventaris dan susun matriks SLA vendor.',
    stakeholders: [
      {
        nama: 'Bu Sari',
        peran: 'Operations Director',
        kepentingan: 'Menjamin ketersediaan barang di rak 99% tanpa membengkakkan biaya simpan gudang dan modal kerja.',
        gayaBicara: 'Tegas, menginginkan keandalan sistem rantai pasok dan kedisiplinan SOP pergudangan.',
      },
      {
        nama: 'Pak Reza',
        peran: 'Finance Manager',
        kepentingan: 'Melihat rasio efisiensi biaya pemesanan tahunan dan biaya modal yang tertahan dalam persediaan fisik.',
        gayaBicara: 'Kuantitatif, fokus pada perputaran kas dan minimalisasi biaya pemborosan gudang.',
      },
    ],
    timeline: [
      { hour: 1, event: 'Penarikan data kartu stok, histori permintaan tahunan 10.000 unit, dan catatan keterlambatan vendor.' },
      { hour: 3, event: 'Penghitungan kuantitas pesanan ekonomis (EOQ), permintaan harian, safety stock, dan ambang ROP.' },
      { hour: 6, event: 'Penyusunan matriks evaluasi SLA vendor dan standardisasi SOP tata letak rak penyimpanan FIFO.' },
    ],
    attachments: [
      {
        type: 'lembar-excel',
        name: 'kartu_stok_dan_parameter_pengadaan_gudang.xlsx',
        description: 'Tabel mutasi barang masuk/keluar, biaya simpan, biaya pesan, dan catatan lead time pengiriman.',
      },
    ],
    dataPack: {
      generatorRef: 'operations-inventory-audit-data-gen',
      variantsCount: 3,
      anomalies: [
        `Gudang hanya memesan 200 unit secara reaktif sehingga biaya pesan tahunan membengkak Rp2.500.000 (seharusnya EOQ ${calculateEOQ(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.orderCostPerOrder, D8_INVENTORY_CONSTANTS.holdingCostPerUnitPerYear).toLocaleString('id-ID')} unit)`,
        `Pemesanan baru dilakukan saat stok 0 unit tanpa memperhitungkan safety stock ${calculateSafetyStock(D8_INVENTORY_CONSTANTS.maxLeadTimeDays, D8_INVENTORY_CONSTANTS.normalLeadTimeDays, calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear))} unit dan ROP ${calculateROP(calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear), D8_INVENTORY_CONSTANTS.normalLeadTimeDays, calculateSafetyStock(D8_INVENTORY_CONSTANTS.maxLeadTimeDays, D8_INVENTORY_CONSTANTS.normalLeadTimeDays, calculateDailyDemand(D8_INVENTORY_CONSTANTS.annualDemandUnits, D8_INVENTORY_CONSTANTS.workingDaysPerYear)))} unit`,
        'Pemasok kemasan utama terlambat 3 hari kerja berulang kali tanpa dikenai sanksi klausula penalti SLA',
      ],
    },
    deliverables: [
      {
        name: 'Model Kebijakan Persediaan EOQ, ROP & Buffer Safety Stock',
        module: 'excel',
        specification: 'Kalkulasi resmi EOQ, permintaan harian, stok pengaman, dan ambang batas pesan ulang otomatis (ROP).',
        requiredElements: ['Permintaan tahunan', 'EOQ', 'Safety Stock', 'Reorder Point (ROP)', 'Total Biaya Persediaan'],
      },
      {
        name: 'Matriks Evaluasi Kinerja Vendor & SOP Inbound Pergudangan K3',
        module: 'word',
        specification: 'Standardisasi matriks pembobotan vendor, klausula penalti keterlambatan SLA, dan tata letak FIFO.',
        requiredElements: ['Matriks pembobotan vendor', 'SLA lead time', 'Prosedur Inbound', 'Sistem FIFO/FEFO', 'Standar K3'],
      },
    ],
    handover: {
      summary: 'Model kebijakan EOQ dan dokumen SOP pengadaan pergudangan telah disahkan dan diintegrasikan ke sistem ERP.',
      assumptions: ['Vendor utama telah menyetujui parameter minimum pesanan dan jadwal lead time pengiriman baru.'],
      precautions: ['Pastikan notifikasi otomatis ROP pada saldo 320 unit terkoneksi langsung ke email bagian pembelian.'],
      nextSteps: ['Lakukan stock opname fisik perdana untuk memverifikasi kesesuaian saldo awal sistem kartu stok.'],
    },
    pitfalls: ['Membiarkan stok kosong total sebelum memesan ulang dan mengabaikan batas pengaman variabilitas pengiriman vendor.'],
    referenceSolutions: ['Model Kebijakan Persediaan EOQ-ROP', 'Matriks Evaluasi Vendor & SOP Pergudangan'],
    emails: [
      {
        from: 'sari@majusejahtera.co.id',
        subject: 'Audit Kebijakan Persediaan Gudang & Evaluasi Keterlambatan Pasokan',
        timestamp: '08:15 WIB',
        body: `Budi, kita sering kehilangan penjualan karena stok di rak minimarket kosong saat barang sedang dalam perjalanan. Kebutuhan tahunan kita adalah ${D8_INVENTORY_CONSTANTS.annualDemandUnits.toLocaleString('id-ID')} unit (${D8_INVENTORY_CONSTANTS.workingDaysPerYear} hari kerja). Biaya pesan ${formatRupiahD8(D8_INVENTORY_CONSTANTS.orderCostPerOrder)} dan biaya simpan ${formatRupiahD8(D8_INVENTORY_CONSTANTS.holdingCostPerUnitPerYear)}/unit/tahun. Hitung ukuran pesanan EOQ, stok pengaman untuk lead time normal ${D8_INVENTORY_CONSTANTS.normalLeadTimeDays} hari hingga maksimal ${D8_INVENTORY_CONSTANTS.maxLeadTimeDays} hari, dan tentukan angka ROP resmi.`,
      },
    ],
    chats: [
      {
        sender: 'Bu Sari',
        time: '08:30',
        message: 'Budi, pastikan klausula penalti SLA vendor juga dirumuskan tegas. Keterlambatan tanpa kompensasi merugikan reputasi operasional kita.',
      },
    ],
    voiceNotes: [],
    clarifyingQuestions: [
      {
        id: 'cq-d8-1',
        question: 'Apa fungsi utama dari Safety Stock dalam sistem pengendalian persediaan modern?',
        options: [
          {
            id: 'opt-a',
            text: 'Melindungi kelangsungan operasional dari risiko kehabisan barang (stockout) saat terjadi keterlambatan pengiriman vendor atau lonjakan permintaan tak terduga.',
            isOptimal: true,
            bossResponse: 'Tepat sekali! Safety stock adalah bantalan pengaman operasional menghadapi ketidakpastian dunia nyata.',
          },
          {
            id: 'opt-b',
            text: 'Untuk ditimbun sebanyak-banyaknya agar gudang terlihat penuh dan megah.',
            isOptimal: false,
            bossResponse: 'Salah fatal! Penimbunan barang berlebihan memboroskan kas modal kerja dan memicu kerusakan produk.',
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
        'Keunggulan rantai pasok bertumpu pada disiplin kalkulasi kuantitatif (EOQ dan ROP) serta kepatuhan ketat pada standar prosedur operasi.',
      pitfallAvoided:
        'Menghindarkan toko dari kerugian kehabisan stok serta mencegah pemborosan kas akibat penumpukan barang yang tidak bergerak.',
      industryContext:
        'Dalam industri ritel dan distribusi bernilai tinggi, efisiensi persediaan 1% saja mampu melipatgandakan marjin laba bersih perusahaan secara signifikan.',
    },
  },
];
