/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D12: Komunikasi Profesional - 10 Analytical Seeded Quizzes
 */

import { AdvancedQuestion } from '../../../components/engines/AdvancedQuizEngine';

export const D12_QUIZZES: AdvancedQuestion[] = [
  // 1. Urutan Tahapan Penanganan Komplain (H.E.A.T)
  {
    id: 'D12-Q-01',
    type: 'urutan',
    title: 'Urutan Kerangka De-Eskalasi Komplain (H.E.A.T)',
    instruction: 'Susun urutan respon terbaik saat menghadapi keluhan keras dari mitra kerja.',
    conceptReference: 'D12-LESSON-03 (Kerangka H.E.A.T)',
    explanation:
      'Urutan yang benar adalah: Dengarkan keluhan tanpa memotong (Hear) -> Validasi emosi kecewa (Empathize) -> Sampaikan permohonan maaf atas kendala (Apologize) -> Berikan solusi konkret dan tenggat waktu (Take Action).',
    items: [
      { id: 'step-hear', text: '1. Dengarkan seluruh duduk masalah tanpa menyela atau membantah' },
      { id: 'step-empathy', text: '2. Tunjukkan empati dan validasi bahwa situasi tersebut memang merugikan mereka' },
      { id: 'step-apologize', text: '3. Ucapkan permohonan maaf yang tulus atas ketidaknyamanan yang terjadi' },
      { id: 'step-action', text: '4. Tawarkan langkah penanganan konkret dengan batas waktu yang terukur' },
    ],
    correctOrder: ['step-hear', 'step-empathy', 'step-apologize', 'step-action'],
  },

  // 2. Urutan Struktur Email Bisnis 3C
  {
    id: 'D12-Q-02',
    type: 'urutan',
    title: 'Urutan Anatomi Email Bisnis Efektif',
    instruction: 'Susun urutan elemen email formal dari baris paling atas hingga bawah.',
    conceptReference: 'D12-LESSON-01 (Struktur 3C)',
    explanation:
      'Email bisnis formal diawali Subjek Spesifik -> Salam Pembuka Formal -> Kalimat Tujuan di Paragraf 1 -> Rincian/Poin Pembahasan -> Ajakan Bertindak (CTA) -> Salam Penutup & Tanda Tangan.',
    items: [
      { id: 'elem-subject', text: 'Subjek email spesifik minimal 3 kata' },
      { id: 'elem-salutation', text: 'Salam pembuka formal (Yth. Bapak/Ibu...)' },
      { id: 'elem-purpose', text: 'Pernyataan maksud/tujuan utama di paragraf pembuka' },
      { id: 'elem-cta', text: 'Harapan tindak lanjut & tenggat konfirmasi (Call to Action)' },
      { id: 'elem-closing', text: 'Salam penutup dan tanda tangan identitas jabatan' },
    ],
    correctOrder: ['elem-subject', 'elem-salutation', 'elem-purpose', 'elem-cta', 'elem-closing'],
  },

  // 3. Cocokkan Saluran Komunikasi dengan Kasus Penggunaan
  {
    id: 'D12-Q-03',
    type: 'cocokkan',
    title: 'Pemilihan Saluran Komunikasi Kantor',
    instruction: 'Pasangkan situasi kerja dengan saluran komunikasi yang paling tepat dan profesional.',
    conceptReference: 'D12-LESSON-02 (Saluran Eskalasi)',
    explanation:
      'Gunakan email untuk keputusan formal & rekam jejak tertulis; chat instan untuk koordinasi cepat; rapat/telepon untuk diskusi debat kompleks; Bcc untuk pengumuman massal menjaga privasi.',
    pairs: [
      {
        id: 'p-1',
        left: 'Surat penawaran harga resmi dan berkas kontrak kerjasama',
        right: 'Email resmi dengan lampiran dokumen PDF berpenamaan rapi',
      },
      {
        id: 'p-2',
        left: 'Konfirmasi cepat kedatangan tamu di lobi kantor kepada resepsionis',
        right: 'Pesan chat singkat dengan nama dan nomor ruangan tamu',
      },
      {
        id: 'p-3',
        left: 'Perbedaan pendapat tajam mengenai revisi anggaran antara 3 manajer',
        right: 'Panggilan rapat tatap muka / video call 15 menit',
      },
      {
        id: 'p-4',
        left: 'Pengiriman buletin perusahaan ke 500 klien eksternal',
        right: 'Pengiriman email dengan daftar penerima di kolom Bcc',
      },
    ],
  },

  // 4. Cocokkan Nada Bahasa (Tone) dengan Contoh Kalimat
  {
    id: 'D12-Q-04',
    type: 'cocokkan',
    title: 'Klasifikasi Nada Komunikasi Kerja',
    instruction: 'Pasangkan jenis nada bicara dengan contoh kalimat dalam percakapan bisnis.',
    conceptReference: 'D12-LESSON-01',
    explanation:
      'Asertif: tegas tanpa merendahkan; Defensif: menyalahkan pihak lain; Agresif: menuduh dan memakai huruf kapital; Pasif: ragu-ragu dan tanpa kepastian.',
    pairs: [
      {
        id: 't-1',
        left: 'Komunikasi Asertif Profesional',
        right: '"Kami menyepakati tenggat revisi hingga Jumat pukul 15.00 WIB agar jadwal cetak tetap aman."',
      },
      {
        id: 't-2',
        left: 'Komunikasi Defensif Tidak Sehat',
        right: '"Itu bukan urusan divisi kami, mereka yang lambat menyerahkan data dari kemarin."',
      },
      {
        id: 't-3',
        left: 'Komunikasi Agresif / Menyerang',
        right: '"KENAPA BISA SALAH LAGI?! APA KALIAN TIDAK BACA INSTRUKSI SAYA?!"',
      },
      {
        id: 't-4',
        left: 'Komunikasi Pasif Berisiko',
        right: '"Terserah saja bagaimana baiknya, saya ikut saja kalau ada yang salah nanti."',
      },
    ],
  },

  // 5. Temukan Kesalahan: Deteksi Draft Email Bermasalah
  {
    id: 'D12-Q-05',
    type: 'temukan-kesalahan',
    title: 'Temukan Red Flag pada Draft Email Resmi',
    instruction: 'Pilih 2 baris kalimat yang melanggar etiket korespondensi formal.',
    conceptReference: 'D12-LESSON-01',
    explanation:
      'Baris subjek hanya satu kata "PENTING" tidak informatif, dan baris kalimat huruf besar dengan tanda seru berlebih melanggar nada profesional.',
    requiredErrorCount: 2,
    contextSnippet: {
      title: 'Draft Email Internal ke Seluruh Manajer Divisi',
      subtitle: 'Pengirim: Staf Pengadaan',
      lines: [
        { id: 'l1', text: 'Subjek: PENTING', isError: true, errorReason: 'Subjek tidak spesifik (hanya 1 kata)' },
        { id: 'l2', text: 'Yth. Bapak dan Ibu Pimpinan Divisi PT Maju Sejahtera,', isError: false },
        { id: 'l3', text: 'Sehubungan dengan penutupan tahun anggaran operasional pekan depan, kami mohon pengumpulan form realisasi.', isError: false },
        { id: 'l4', text: 'HARAP SEMUA DIKIRIM SEKARANG JUGA JANGAN SAMPAI SAYA DIMARAHI DIREKSI LAGI!!!', isError: true, errorReason: 'Capslock berlebih dan nada agresif defensif' },
        { id: 'l5', text: 'Dokumen panduan pengisian terlampir bersama surat ini.', isError: false },
        { id: 'l6', text: 'Atas kerja sama Bapak dan Ibu, kami ucapkan terima kasih.', isError: false },
      ],
    },
  },

  // 6. Temukan Kesalahan: Pesan Singkat Tidak Beretiket
  {
    id: 'D12-Q-06',
    type: 'temukan-kesalahan',
    title: 'Deteksi Sindrom "P" & Ketidaksopanan Chat Kerja',
    instruction: 'Pilih 2 baris pesan chat yang melanggar efisiensi dan tata krama pesan instan.',
    conceptReference: 'D12-LESSON-02',
    explanation:
      'Mengirimkan huruf "P" sepotong dan menelpon berulang kali di luar jam operasional darurat tanpa pesan penjelasan adalah pelanggaran etiket.',
    requiredErrorCount: 2,
    contextSnippet: {
      title: 'Riwayat Obrolan WhatsApp Staf ke Supervisor (Pukul 22.15 WIB)',
      lines: [
        { id: 'c1', text: '[22:15] P', isError: true, errorReason: 'Sindrom huruf P tanpa isi pesan' },
        { id: 'c2', text: '[22:16] P', isError: true, errorReason: 'Spam notifikasi larut malam' },
        { id: 'c3', text: '[22:17] Maaf mengganggu malam-malam Bu, server utama kantor baru saja mati mendadak dan pendingin ruangan di data center berasap.', isError: false },
        { id: 'c4', text: '[22:18] Tim keamanan sudah di lokasi, izin menelpon Ibu untuk prosedur darurat pemadaman listrik.', isError: false },
      ],
    },
  },

  // 7. Klik Area: Elemen Kritis Email Penipuan / Phishing
  {
    id: 'D12-Q-07',
    type: 'klik-area',
    title: 'Deteksi Alamat Pengirim Palsu (Spoofing)',
    instruction: 'Klik area pada informasi header email yang paling mencurigakan dan menunjukkan indikasi phishing.',
    conceptReference: 'D12 & D14 (Keamanan & Integritas Pesan)',
    explanation:
      'Domain pengirim palsu seperti "hrd-majustore-login.xyz" bukan domain resmi perusahaan (@majusejahtera.co.id). Selalu periksa domain asli sebelum menanggapi.',
    previewImageOrBox: {
      title: 'Tampilan Header Email Masuk Mengatasnamakan Tim HRD',
      zones: [
        { id: 'z1', label: 'Nama Tampilan: "HRD PT Maju Sejahtera"', isTarget: false, explanation: 'Nama display bisa dipalsukan dengan mudah oleh penipu.' },
        { id: 'z2', label: 'Alamat Email Asli: "security@hrd-majustore-login.xyz"', isTarget: true, explanation: 'Domain .xyz mencurigakan dan bukan domain internal resmi perusahaan!' },
        { id: 'z3', label: 'Waktu Pengiriman: "Hari ini pukul 08.15 WIB"', isTarget: false, explanation: 'Waktu pengiriman adalah cap waktu standar server.' },
        { id: 'z4', label: 'Kolom Kepada: "karyawan@majusejahtera.co.id"', isTarget: false, explanation: 'Alamat penerima memang alamat kantor Anda.' },
      ],
    },
  },

  // 8. Urutan Menulis Memo Eskalasi Internal
  {
    id: 'D12-Q-08',
    type: 'urutan',
    title: 'Urutan Penyusunan Memo Eskalasi Krisis',
    instruction: 'Susun urutan penyajian fakta saat melaporkan kendala kritis ke atasan.',
    conceptReference: 'D12-LESSON-03',
    explanation:
      'Gunakan metode Pyramid Principle: Kesimpulan Masalah & Dampak Utama -> Fakta Penyebab Teridentifikasi -> 2 Alternatif Solusi & Rekomendasi Pilihan -> Permintaan Keputusan/Arahan.',
    items: [
      { id: 'm1', text: '1. Ringkasan inti masalah dan dampak langsung terhadap operasional hari ini' },
      { id: 'm2', text: '2. Fakta kronologi dan akar penyebab kendala yang telah diverifikasi' },
      { id: 'm3', text: '3. Opsi solusi mitigasi disertai estimasi biaya dan risiko masing-masing' },
      { id: 'm4', text: '4. Rekomendasi tindakan dan permohonan arahan persetujuan pimpinan' },
    ],
    correctOrder: ['m1', 'm2', 'm3', 'm4'],
  },

  // 9. Cocokkan Frasa Pembuka Email dengan Konteks Hubungan
  {
    id: 'D12-Q-09',
    type: 'cocokkan',
    title: 'Kesesuaian Salam Pembuka dengan Tingkat Formalitas',
    instruction: 'Pasangkan jenis penerima dengan salam pembuka yang paling tepat secara hierarki kantor.',
    conceptReference: 'D12-LESSON-01',
    explanation:
      'Pimpinan/Klien Eksternal gunakan "Yth. Bapak/Ibu..."; Rekan setara gunakan "Selamat pagi Rekan-rekan" atau nama depan; Surat dinas resmi lembaga gunakan "Kepada Yang Terhormat...".',
    pairs: [
      {
        id: 's-1',
        left: 'Direktur Utama mitra korporasi baru',
        right: '"Yth. Bapak Ir. Hendra Gunawan, M.M., Direktur Utama PT Mitra Korporat,"',
      },
      {
        id: 's-2',
        left: 'Rekan satu tim kerja harian dalam proyek internal',
        right: '"Halo Rekan-rekan Tim Kreatif, selamat pagi,"',
      },
      {
        id: 's-3',
        left: 'Surat resmi ke instansi dinas ketenagakerjaan daerah',
        right: '"Kepada Yang Terhormat Kepala Dinas Tenaga Kerja dan Transmigrasi,"',
      },
      {
        id: 's-4',
        left: 'Pemberitahuan perubahan password rutin staf kantor',
        right: '"Selamat pagi Bapak dan Ibu seluruh karyawan PT Maju Sejahtera,"',
      },
    ],
  },

  // 10. Temukan Kesalahan: Pengumuman Terbuka Melanggar Privasi
  {
    id: 'D12-Q-10',
    type: 'temukan-kesalahan',
    title: 'Pelanggaran Privasi dalam Broadcast Email',
    instruction: 'Pilih 2 baris yang melanggar prinsip kerahasiaan data dan etika kerja.',
    conceptReference: 'D12 & D14 (Perlindungan Data Pribadi)',
    explanation:
      'Menyebarkan besaran gaji pribadi atau nomor rekening karyawan ke publik dalam satu email pengumuman terbuka adalah pelanggaran berat etika dan privasi data.',
    requiredErrorCount: 2,
    contextSnippet: {
      title: 'Email Pengumuman Lembur Tim Operasional (Disebar ke Seluruh Kantor)',
      lines: [
        { id: 'p1', text: 'Yth. Seluruh Karyawan PT Maju Sejahtera,', isError: false },
        { id: 'p2', text: 'Terima kasih atas kerja keras tim operasional yang menyelesaikan tugas akhir pekan.', isError: false },
        { id: 'p3', text: 'Berikut rincian nominal gaji pokok dan besaran utang pribadi staf Budi untuk transparansi bersama.', isError: true, errorReason: 'Membocorkan data finansial pribadi karyawan' },
        { id: 'p4', text: 'Berikut daftar nomor rekening bank pribadi karyawan berserta nomor PIN pengaman.', isError: true, errorReason: 'Membocorkan kredensial rahasia' },
        { id: 'p5', text: 'Tanda terima kompensasi lembur dapat ditandatangani di bagian keuangan hari Kamis.', isError: false },
      ],
    },
  },
];
