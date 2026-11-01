/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D3: Presentasi & Visual Storytelling - Case File
 */

import { CaseFile } from '../../../types';

export const D3_CASES: CaseFile[] = [
  {
    id: 'case-d3-01',
    code: 'D3-C1',
    title: 'Redesain Dek Slide Tender Pengadaan & Narasi Eksekutif BLUF',
    industry: 'Konsultansi & Layanan Korporat',
    tier: 3,
    scale: 'menengah',
    businessFunction: 'Komunikasi Bisnis & Presentasi',
    module: 'word',
    channel: 'email',
    deadlineHours: 6,
    estimatedMinutes: 20,
    clientName: 'PT Nusantara Prima Solusi',
    character: 'sari',
    tags: ['presentasi', 'bluf', 'minto', 'scqa', 'wcag', 'data-viz'],
    modules: ['word', 'excel'],
    requires: ['advanced-quiz-engine'],
    summary:
      'Dek presentasi tender bernilai miliaran rupiah perlu dipangkas dari 50 slide pasif menjadi 10 slide tajam berlandaskan piramida Minto, Bottom Line Up Front, dan Action Titles yang meyakinkan direksi.',
    stakeholders: [
      {
        nama: 'Bu Sari',
        peran: 'Direktur Operasional',
        kepentingan: 'Presentasi harus memikat dewan direksi mitra dalam alokasi waktu 12 menit yang sangat ketat.',
        gayaBicara: 'Tajam, terstruktur, menghargai penyampaian pesan yang ringkas dan berdampak.',
      },
      {
        nama: 'Maya',
        peran: 'HR & People Specialist',
        kepentingan: 'Memastikan pesan slide mudah dicerna audiens dan catatan pembicara tertata rapi.',
        gayaBicara: 'Empatik, komunikatif, fokus pada kejelasan pesan dan kontak audiens.',
      },
    ],
    timeline: [
      { hour: 1, event: 'Pemberitahuan bahwa panitia tender hanya mengalokasikan waktu 12 menit untuk pemaparan tim.' },
      { hour: 3, event: 'Penemuan draf slide lama yang terdiri dari 50 halaman penuh teks font kecil yang membosankan.' },
      { hour: 6, event: 'Penyusunan ulang dek presentasi menjadi 10 slide kunci berbasis kerangka SCQA dan Bottom Line Up Front.' },
    ],
    attachments: [
      {
        type: 'teks-pdf',
        name: 'draf_slide_tender_operasional.txt',
        description: 'Teks naskah alur cerita presentasi 10 slide lengkap dengan Action Titles dan catatan pembicara.',
      },
    ],
    dataPack: {
      generatorRef: 'pitch-deck-data-gen',
      variantsCount: 3,
      anomalies: [
        'Judul slide pasif seperti "Latar Belakang Perusahaan" tanpa kejelasan pesan',
        'Bagan lingkaran 3D dengan 10 potongan warna yang tidak terbaca audiens',
      ],
    },
    deliverables: [
      {
        name: 'Naskah Alur Cerita SCQA & 10 Action Titles',
        module: 'word',
        specification: 'Rangkuman alur presentasi lengkap dari Situation, Complication, Question, hingga Answer.',
        requiredElements: ['Situation', 'Complication', 'Question', 'Answer', 'Action Titles'],
      },
      {
        name: 'Panduan Catatan Pembicara & Manajemen Waktu 12 Menit',
        module: 'word',
        specification: 'Catatan poin kunci per slide untuk menjaga ritme bicara dan alokasi waktu tanya jawab.',
        requiredElements: ['Struktur waktu 12 menit', 'Catatan pembicara', 'Antisipasi tanya jawab'],
      },
    ],
    handover: {
      summary: 'Dek presentasi tender berhasil direstrukturisasi menjadi 10 slide tajam berbasis BLUF dan disetujui direksi.',
      assumptions: ['Slide lampiran teknis tetap tersedia jika ada pertanyaan mendalam dari dewan pimpinan.'],
      precautions: ['Hindari mengubah rasio kontras visual menjadi rendah pada proyektor ruangan rapat.'],
      nextSteps: ['Lakukan gladi resik pemaparan 12 menit bersama presenter utama.'],
    },
    pitfalls: ['Membuat slide penuh teks dan membacakannya tanpa kontak mata ke audiens.'],
    referenceSolutions: ['Naskah Alur Cerita SCQA', 'Panduan Catatan Pembicara'],
    emails: [
      {
        from: 'sari@majusejahtera.co.id',
        subject: 'PENTING: Alokasi Waktu Tender Dipangkas Menjadi 12 Menit',
        timestamp: '08:15 WIB',
        body: 'Budi, panitia tender baru saja mengonfirmasi bahwa setiap peserta hanya diberi waktu 12 menit pemaparan. Tolong segera pangkas draf slide 50 halaman kita menjadi dek 10 slide BLUF yang memikat.',
      },
    ],
    chats: [
      {
        sender: 'Maya',
        time: '08:30',
        message: 'Budi, jangan lupa sisakan waktu minimal 4-5 menit untuk tanya jawab ya, itu poin penentu evaluasi mereka.',
      },
    ],
    voiceNotes: [],
    clarifyingQuestions: [
      {
        id: 'cq-d3-1',
        question: 'Bagaimana pendekatan terbaik menyajikan slide di hadapan audiens eksekutif dalam waktu terbatas?',
        options: [
          {
            id: 'opt-a',
            text: 'Terapkan Bottom Line Up Front (BLUF): sampaikan rekomendasi dan hasil terpenting di slide pembuka, gunakan Action Titles, dan simpan detail teknis di lampiran.',
            isOptimal: true,
            bossResponse: 'Tepat sekali! Audiens eksekutif langsung membutuhkan kesimpulan dan nilai bisnis.',
          },
          {
            id: 'opt-b',
            text: 'Tampilkan semua 50 slide dan bacakan cepat-cepat tiap 10 detik.',
            isOptimal: false,
            bossResponse: 'Salah besar! Menayangkan slide terburu-buru membuat audiens pusing dan kehilangan pesan inti.',
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
        'Presentasi bisnis kelas atas menuntut kejelasan pesan: alur SCQA, Bottom Line Up Front, Action Title informatif, dan eliminasi chartjunk.',
      pitfallAvoided:
        'Menghindari slide padat teks yang dibacakan seperti dokumen serta menghindari diagram yang membingungkan.',
      industryContext:
        'Dalam kompetisi tender korporat, dewan juri menilai kemampuan tim mengkomunikasikan solusi kompleks secara ringkas dan meyakinkan.',
    },
  },
];
