/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D12: Komunikasi Profesional - Lessons
 */

export interface D12Lesson {
  id: string;
  domainId: 'D12';
  title: string;
  summary: string;
  estimatedMinutes: number;
  lastReviewed: string;
  sources: string[];
  sections: Array<{
    title: string;
    content: string;
    keyPoints?: string[];
    example?: {
      good: string;
      bad: string;
      explanation: string;
    };
  }>;
}

export const D12_LESSONS: D12Lesson[] = [
  {
    id: 'D12-LESSON-01',
    domainId: 'D12',
    title: 'Struktur Email Bisnis Efektif (Prinsip 3C)',
    summary:
      'Pelajari cara menulis email kerja yang ringkas, profesional, dan langsung memicu tindakan tanpa bolak-balik bertanya.',
    estimatedMinutes: 15,
    lastReviewed: '2026-10-26',
    sources: [
      'Pedoman Umum Ejaan Bahasa Indonesia (EYD Edisi V, Badan Pengembangan dan Pembinaan Bahasa Kemendikbudristek RI, 2022)',
      'Permenpan-RB No. 80 Tahun 2012 tentang Pedoman Tata Naskah Dinas Instansi Pemerintah (Kemenpan-RB, 2012)',
    ],
    sections: [
      {
        title: '1. Anatomi Email Profesional 3C',
        content:
          'Prinsip 3C dalam korespondensi bisnis adalah Clear (Jelas maksudnya), Concise (Ringkas tanpa basa-basi berlebih), dan Courteous (Sopan & berempati). Di dunia kerja modern, rata-rata staf kantor menerima lebih dari 80 email per hari. Jika maksud email Anda baru muncul di paragraf ketiga, kemungkinan besar email tersebut akan diabaikan atau salah dipahami.',
        keyPoints: [
          'Subjek wajib spesifik dan mencerminkan inti pesan (jangan hanya "Halo" atau "Tanya").',
          'Tujuan email wajib ditaruh di kalimat pembuka paragraf pertama.',
          'Gunakan poin-poin (bullet points) jika menyampaikan lebih dari dua informasi.',
          'Akhiri dengan ajakan bertindak (Call to Action) yang jelas serta tenggat waktu jika relevan.',
        ],
        example: {
          bad: 'Subjek: Mau tanya\n\nSiang bu maya, ini saya mau tanya yg kemarin dibahas di rapat itu jadinya gimana ya bu? Tolong infonya.',
          good: 'Subjek: Konfirmasi Perubahan Jadwal Rapat Koordinasi Proyek Alpha\n\nYth. Ibu Maya,\n\nSehubungan dengan pembahasan pada rapat awal pekan ini, kami ingin mengonfirmasi kesediaan waktu Ibu untuk sesi tindak lanjut yang direncanakan pada:\n• Hari/Tanggal: Kamis, 29 Oktober 2026\n• Waktu: 14.00 - 15.00 WIB\n\nMohon konfirmasi ketersediaan jadwal Ibu sebelum Rabu sore agar kami dapat menerbitkan undangan resmi.\n\nTerima kasih atas perhatian dan kerja sama Ibu.\n\nHormat saya,\nBudi Pratama\nAdmin Operasional PT Maju Sejahtera',
          explanation:
            'Contoh yang baik langsung menyebutkan proyek, menyajikan opsi jadwal secara terstruktur, dan menetapkan batas waktu konfirmasi secara sopan.',
        },
      },
      {
        title: '2. Etiket Penggunaan CC, BCC, dan Lampiran',
        content:
          'Penggunaan fitur penerima email memiliki kode etik tersendiri. Kolom "Kepada" (To) ditujukan untuk pihak yang diharapkan mengambil tindakan atau merespons. Kolom "Cc" (Carbon Copy) ditujukan bagi pihak yang hanya perlu mengetahui informasi (informasi fyi) tanpa wajib membalas. Kolom "Bcc" (Blind Carbon Copy) digunakan untuk menjaga privasi daftar penerima massal agar tidak saling melihat alamat email orang lain.',
        keyPoints: [
          'Jangan gunakan "Reply All" jika balasan Anda hanya relevan bagi pengirim utama.',
          'Selalu sebutkan keberadaan lampiran di dalam badan teks (misal: "Dokumen RAB terlampir").',
          'Beri nama file lampiran dengan format teratur (misal: "RAB_AcaraKaryawan_v1.xlsx"), bukan "File Baru (1).xlsx".',
        ],
      },
    ],
  },
  {
    id: 'D12-LESSON-02',
    domainId: 'D12',
    title: 'Etiket Chat Kerja & Komunikasi Pesan Instan',
    summary:
      'Hindari sindrom "halo kosong" (anti-P), hormati batasan jam kerja, dan kemas pertanyaan kompleks dalam satu gelembung pesan padat.',
    estimatedMinutes: 12,
    lastReviewed: '2026-10-26',
    sources: [
      'Undang-Undang Republik Indonesia No. 13 Tahun 2003 tentang Ketenagakerjaan (Pasal 77-78 Pengaturan Waktu Kerja dan Hak Istirahat, Pemerintah RI, 2003)',
      'Pedoman Umum Ejaan Bahasa Indonesia (EYD Edisi V, Badan Pengembangan dan Pembinaan Bahasa Kemendikbudristek RI, 2022)',
    ],
    sections: [
      {
        title: '1. Bahaya Pesan Sepotong (Sindrom "P" dan "Halo")',
        content:
          'Mengirimkan pesan "P", "Halo", atau "Pak" lalu menunggu lawan bicara membalas sebelum menyampaikan maksud adalah bentuk pemborosan waktu kerja rekan Anda. Tindakan ini menimbulkan kecemasan dan mengganggu alur fokus. Di lingkungan profesional, biasakan mengirim pesan sapaan sekaligus maksud inti dalam satu pesan utuh (One-Message Summary).',
        keyPoints: [
          'Gunakan salam singkat, nama lawan bicara, lalu langsung utarakan kebutuhan Anda.',
          'Sertakan konteks dokumen atau nomor pesanan agar rekan tidak perlu menebak-nebak.',
          'Gunakan tanda baca dan ejaan yang wajar; hindari singkatan alay atau kata slang yang berpotensi multitafsir.',
        ],
        example: {
          bad: '10:01 - P\n10:02 - P\n10:05 - Pak dimas lagi senggang ga?\n(Menunggu Dimas membalas)',
          good: '10:01 - Selamat pagi Pak Dimas. Izin mengonfirmasi terkait pesanan nomor PO-8821, apakah dokumen tanda terima dari gudang sudah ditandatangani? Rekap laporan akan kami finalisasi pukul 11.30 WIB ini. Terima kasih Pak.',
          explanation:
            'Pak Dimas dapat langsung menjawab pertanyaan dalam sekali lihat tanpa perlu bolak-balik bertanya maksud pembicaraan.',
        },
      },
      {
        title: '2. Jam Kerja, Nada Tulisan, dan Saluran Eskalasi',
        content:
          'Hormati hak istirahat rekan kerja di luar jam kerja kantor (pukul 17.00/18.00 ke atas). Bila Anda harus mengetik pesan di malam hari, gunakan fitur jadwalkan pesan (schedule send) ke pukul 08.00 pagi berikutnya, kecuali situasi darurat yang telah disepakati.',
        keyPoints: [
          'Hindari huruf besar semua (CAPS LOCK) karena terkesan membentak atau emosional.',
          'Gunakan emoji secara terukur (1-2 emoji ramah seperti 🙏 atau 👍 sudah cukup).',
          'Jika topik diskusi memerlukan debat lebih dari 4 kali berbalas pesan, jadwalkan panggilan cepat atau rapat 10 menit.',
        ],
      },
    ],
  },
  {
    id: 'D12-LESSON-03',
    domainId: 'D12',
    title: 'Teknik De-eskalasi Komplain & Komunikasi Krisis',
    summary:
      'Metode diplomatis menangani pelanggan atau rekan yang emosional dengan pendekatan H.E.A.T (Hear, Empathize, Apologize, Take Action).',
    estimatedMinutes: 18,
    lastReviewed: '2026-10-26',
    sources: [
      'ISO 10002:2018 Quality Management — Customer Satisfaction — Guidelines for Complaints Handling (ISO, 2018)',
      'Getting to Yes: Negotiating Agreement Without Giving In (Roger Fisher & William Ury, Penguin Books, 2011)',
    ],
    sections: [
      {
        title: '1. Kerangka H.E.A.T Menghadapi Keluhan',
        content:
          'Saat pelanggan atau mitra komplain keras, naluri alami manusia sering kali ingin membela diri (defensif) atau langsung menyalahkan pihak ekspedisi/pihak ketiga. Hal ini hanya akan memperparah kemarahan lawan bicara. Gunakan kerangka H.E.A.T:\n1. Hear (Dengarkan utuh keluhannya tanpa memotong).\n2. Empathize (Validasi perasaan kecewa mereka).\n3. Apologize (Minta maaf secara tulus atas ketidaknyamanan yang terjadi).\n4. Take Action (Tawarkan langkah konkret penyelesaian masalah).',
        keyPoints: [
          'Jangan gunakan kalimat defensif seperti: "Itu bukan salah kami, salah kurirnya!".',
          'Katakan: "Kami memahami kekecewaan Bapak karena keterlambatan ini mengganggu rencana acara."',
          'Tawarkan dua alternatif solusi yang masuk akal dan berada dalam batas wewenang Anda.',
        ],
        example: {
          bad: 'Ya gimana ya bu, dari kami barang sudah dikirim dari kemarin kok. Itu kurir ekspedisinya yang mogok, jangan marah-marah ke kami dong.',
          good: 'Selamat siang Ibu Ratna. Kami sangat memahami kekecewaan Ibu karena pesanan seragam katering ini sangat mendesak untuk acara besok pagi. Kami mohon maaf yang sebesar-besarnya atas kendala operasional armada pengantaran hari ini. Saat ini paket sudah berada di hub transit utama kota Ibu. Kami telah menginstruksikan kurir prioritas internal kami untuk mengambil alih pengantaran langsung sore ini sebelum pukul 17.00 WIB. Kami akan membagikan tautan pelacakan langsung ke nomor ini sekarang juga.',
          explanation:
            'Contoh yang baik memvalidasi urgensi klien, meminta maaf atas kendala, dan memberikan komitmen langkah nyata dengan tenggat waktu jelas.',
        },
      },
    ],
  },
];
