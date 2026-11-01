/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D12: Komunikasi Profesional - Seeded Analytical Quizzes Generator
 * Deterministic PRNG-based question generation supporting scenario variations and randomized option ordering.
 */

import { AdvancedQuestion } from '../../../components/engines/AdvancedQuizEngine';

/**
 * 32-bit Mulberry32 PRNG
 */
export function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Hash string or number to 32-bit unsigned integer
 */
export function hashStringToSeed(input: string | number): number {
  if (typeof input === 'number') return input >>> 0;
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (Math.imul(31, hash) + input.charCodeAt(i)) | 0;
  }
  return hash >>> 0;
}

/**
 * Deterministic Fisher-Yates array shuffle using mulberry32 PRNG
 */
export function shuffleWithRng<T>(array: T[], rng: () => number): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * F2.2: Acak urutan awal dan JAMIN urutan awal ≠ kunci jawaban.
 */
export function shuffleGuaranteedDifferent<T extends { id: string }>(
  array: T[],
  correctOrder: string[],
  rng: () => number
): T[] {
  let shuffled = shuffleWithRng(array, rng);
  if (shuffled.length >= 2 && shuffled.map((i) => i.id).join(',') === correctOrder.join(',')) {
    const copy = [...shuffled];
    [copy[0], copy[1]] = [copy[1], copy[0]];
    return copy;
  }
  return shuffled;
}

/**
 * Generates 10 analytical D12 questions deterministically per seed.
 * - Same seed produces identical questions and identical option ordering.
 * - Different seeds produce different option orders and alternate scenario texts.
 * - Reference solutions always remain valid across all seeds.
 */
export function generateSeededD12Quizzes(seedInput: number | string = 1001): AdvancedQuestion[] {
  const seedNum = hashStringToSeed(seedInput);
  const rng = mulberry32(seedNum);

  // Determine scenario variant toggles (at least 5 questions have text variants)
  const variantQ1 = rng() > 0.5 ? 'B' : 'A';
  const variantQ2 = rng() > 0.5 ? 'B' : 'A';
  const variantQ5 = rng() > 0.5 ? 'B' : 'A';
  const variantQ6 = rng() > 0.5 ? 'B' : 'A';
  const variantQ7 = rng() > 0.5 ? 'B' : 'A';
  const variantQ10 = rng() > 0.5 ? 'B' : 'A';

  // 1. Urutan Tahapan Penanganan Komplain (H.E.A.T)
  const q1RawItems = [
    {
      id: 'step-hear',
      text:
        variantQ1 === 'A'
          ? '1. Dengarkan seluruh duduk masalah tanpa menyela atau membantah (Hear)'
          : '1. Simak seluruh keluhan klien tanpa memotong penjelasan (Hear)',
    },
    {
      id: 'step-empathy',
      text:
        variantQ1 === 'A'
          ? '2. Tunjukkan empati dan validasi bahwa situasi tersebut memang merugikan mereka (Empathize)'
          : '2. Sampaikan empati atas kendala yang mengganggu operasional mereka (Empathize)',
    },
    {
      id: 'step-apologize',
      text:
        variantQ1 === 'A'
          ? '3. Ucapkan permohonan maaf yang tulus atas ketidaknyamanan yang terjadi (Apologize)'
          : '3. Nyatakan permohonan maaf tulus atas kendala layanan yang dialami (Apologize)',
    },
    {
      id: 'step-action',
      text:
        variantQ1 === 'A'
          ? '4. Tawarkan langkah penanganan konkret dengan batas waktu yang terukur (Take Action)'
          : '4. Berikan komitmen solusi nyata beserta kepastian estimasi waktu tiba (Take Action)',
    },
  ];

  // 2. Urutan Struktur Email Bisnis 3C
  const q2RawItems = [
    {
      id: 'elem-subject',
      text:
        variantQ2 === 'A'
          ? 'Subjek email spesifik minimal 3 kata'
          : 'Judul subjek email kontekstual mencerminkan inti bahasan',
    },
    { id: 'elem-salutation', text: 'Salam pembuka formal (Yth. Bapak/Ibu...)' },
    {
      id: 'elem-purpose',
      text:
        variantQ2 === 'A'
          ? 'Pernyataan maksud/tujuan utama di paragraf pembuka'
          : 'Pernyataan maksud atau perihal surat pada baris awal',
    },
    { id: 'elem-cta', text: 'Harapan tindak lanjut & tenggat konfirmasi (Call to Action)' },
    { id: 'elem-closing', text: 'Salam penutup dan tanda tangan identitas jabatan' },
  ];

  // 3. Cocokkan Saluran Komunikasi
  const q3Pairs = [
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
  ];

  // 4. Cocokkan Nada Bahasa
  const q4Pairs = [
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
  ];

  // 5. Temukan Kesalahan: Draft Email
  const q5Lines =
    variantQ5 === 'A'
      ? [
          { id: 'l1', text: 'Subjek: PENTING', isError: true, errorReason: 'Subjek tidak spesifik (hanya 1 kata)' },
          { id: 'l2', text: 'Yth. Bapak dan Ibu Pimpinan Divisi PT Maju Sejahtera,', isError: false },
          { id: 'l3', text: 'Sehubungan dengan penutupan tahun anggaran operasional pekan depan, kami mohon pengumpulan form realisasi.', isError: false },
          { id: 'l4', text: 'HARAP SEMUA DIKIRIM SEKARANG JUGA JANGAN SAMPAI SAYA DIMARAHI DIREKSI LAGI!!!', isError: true, errorReason: 'Capslock berlebih dan nada agresif defensif' },
          { id: 'l5', text: 'Dokumen panduan pengisian terlampir bersama surat ini.', isError: false },
          { id: 'l6', text: 'Atas kerja sama Bapak dan Ibu, kami ucapkan terima kasih.', isError: false },
        ]
      : [
          { id: 'l1', text: 'Subjek: BUTUH CEPAT DONG', isError: true, errorReason: 'Subjek informal dan tidak profesional' },
          { id: 'l2', text: 'Yth. Tim Operasional Cabang Barat,', isError: false },
          { id: 'l3', text: 'Sehubungan dengan audit berkas inventaris triwulan, kami memerlukan konfirmasi data fisik.', isError: false },
          { id: 'l4', text: 'POKOKNYA SAYA TIDAK MAU TAHU KETERLAMBATAN KALIAN SELESAIKAN DETIK INI JUGA!!!!', isError: true, errorReason: 'Nada intimidatif dan tanda seru ganda' },
          { id: 'l5', text: 'Lembar cek fisik dapat diisi pada tautan formulir terlampir.', isError: false },
          { id: 'l6', text: 'Hormat kami, Tim Pengawasan Internal PT Maju Sejahtera.', isError: false },
        ];

  // 6. Temukan Kesalahan: Pesan Singkat Tidak Beretiket
  const q6Lines =
    variantQ6 === 'A'
      ? [
          { id: 'c1', text: '[22:15] P', isError: true, errorReason: 'Sindrom huruf P sepotong' },
          { id: 'c2', text: '[22:16] P', isError: true, errorReason: 'Spam notifikasi larut malam' },
          { id: 'c3', text: '[22:17] Maaf mengganggu malam-malam Bu, server utama kantor baru saja mati mendadak dan pendingin ruangan di data center berasap.', isError: false },
          { id: 'c4', text: '[22:18] Tim keamanan sudah di lokasi, izin menelpon Ibu untuk prosedur darurat pemadaman listrik.', isError: false },
        ]
      : [
          { id: 'c1', text: '[23:30] Halo pak', isError: true, errorReason: 'Menyapa sepotong larut malam tanpa maksud' },
          { id: 'c2', text: '[23:31] P????', isError: true, errorReason: 'Spam notifikasi dan tanda tanya berlebih' },
          { id: 'c3', text: '[23:32] Mohon maaf izin mengabarkan, alarm sensor air di gudang utama berbunyi karena pipa bocor.', isError: false },
          { id: 'c4', text: '[23:33] Petugas jaga sudah menutup keran utama dan situasi sudah terkendali aman.', isError: false },
        ];

  // 7. Klik Area: Email Phishing
  const q7Domain =
    variantQ7 === 'A' ? 'security@hrd-majustore-login.xyz' : 'payroll-confirm@majusejahtera-auth.top';
  const q7Zones = [
    {
      id: 'z1',
      label: 'Nama Tampilan: "HRD PT Maju Sejahtera"',
      isTarget: false,
      explanation: 'Nama display bisa dipalsukan dengan mudah oleh pengirim spam.',
    },
    {
      id: 'z2',
      label: `Alamat Email Asli: "${q7Domain}"`,
      isTarget: true,
      explanation: 'Domain ekstensi asing (.xyz/.top) bukan domain internal resmi kantor (@majusejahtera.co.id)!',
    },
    {
      id: 'z3',
      label: 'Waktu Pengiriman: "Hari ini pukul 08.15 WIB"',
      isTarget: false,
      explanation: 'Waktu pengiriman adalah cap waktu standar server.',
    },
    {
      id: 'z4',
      label: 'Kolom Kepada: "karyawan@majusejahtera.co.id"',
      isTarget: false,
      explanation: 'Alamat penerima memang alamat kantor Anda.',
    },
  ];

  // 8. Urutan Menulis Memo Eskalasi Internal
  const q8RawItems = [
    { id: 'm1', text: '1. Ringkasan inti masalah dan dampak langsung terhadap operasional hari ini' },
    { id: 'm2', text: '2. Fakta kronologi dan akar penyebab kendala yang telah diverifikasi' },
    { id: 'm3', text: '3. Opsi solusi mitigasi disertai estimasi biaya dan risiko masing-masing' },
    { id: 'm4', text: '4. Rekomendasi tindakan dan permohonan arahan persetujuan pimpinan' },
  ];

  // 9. Cocokkan Frasa Pembuka Email
  const q9Pairs = [
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
  ];

  // 10. Temukan Kesalahan: Pelanggaran Privasi Broadcast
  const q10Lines =
    variantQ10 === 'A'
      ? [
          { id: 'p1', text: 'Yth. Seluruh Karyawan PT Maju Sejahtera,', isError: false },
          { id: 'p2', text: 'Terima kasih atas kerja keras tim operasional yang menyelesaikan tugas akhir pekan.', isError: false },
          { id: 'p3', text: 'Berikut rincian nominal gaji pokok dan besaran utang pribadi staf Budi untuk transparansi bersama.', isError: true, errorReason: 'Membocorkan data finansial pribadi karyawan' },
          { id: 'p4', text: 'Berikut daftar nomor rekening bank pribadi karyawan berserta nomor PIN pengaman.', isError: true, errorReason: 'Membocorkan kredensial rahasia' },
          { id: 'p5', text: 'Tanda terima kompensasi lembur dapat ditandatangani di bagian keuangan hari Kamis.', isError: false },
        ]
      : [
          { id: 'p1', text: 'Yth. Rekan-rekan Seluruh Departemen PT Maju Sejahtera,', isError: false },
          { id: 'p2', text: 'Berikut kami sampaikan jadwal rotasi piket shift operasional bulan depan.', isError: false },
          { id: 'p3', text: 'Perlu diketahui staf Siti saat ini sedang menjalani terapi rawat inap penyakit pribadi di RSUD.', isError: true, errorReason: 'Membocorkan data rekam medis sensitif karyawan ke publik kantor' },
          { id: 'p4', text: 'Terlampir pula surat peringatan disiplin keras (SP-3) beserta alasan pemotongan gaji saudara Rudi.', isError: true, errorReason: 'Mempublikasikan surat sanksi disipliner yang bersifat rahasia HRD' },
          { id: 'p5', text: 'Mohon kerja sama seluruh tim untuk mematuhi protokol kerja bersama.', isError: false },
        ];

  // Shuffled items for reordering (F2.2: JAMIN urutan awal ≠ kunci jawaban)
  const q1CorrectOrder = ['step-hear', 'step-empathy', 'step-apologize', 'step-action'];
  const q1Items = shuffleGuaranteedDifferent(q1RawItems, q1CorrectOrder, rng);

  const q2CorrectOrder = ['elem-subject', 'elem-salutation', 'elem-purpose', 'elem-cta', 'elem-closing'];
  const q2Items = shuffleGuaranteedDifferent(q2RawItems, q2CorrectOrder, rng);

  const q8CorrectOrder = ['m1', 'm2', 'm3', 'm4'];
  const q8Items = shuffleGuaranteedDifferent(q8RawItems, q8CorrectOrder, rng);
  const q7ShuffledZones = shuffleWithRng(q7Zones, rng);

  return [
    {
      id: 'D12-Q-01',
      type: 'urutan',
      title: 'Urutan Kerangka De-Eskalasi Komplain (H.E.A.T)',
      instruction: 'Susun urutan respon terbaik saat menghadapi keluhan keras dari mitra kerja.',
      conceptReference: 'D12-LESSON-03 (Kerangka H.E.A.T)',
      explanation:
        'Urutan yang benar adalah: Dengarkan keluhan tanpa memotong (Hear) -> Validasi emosi kecewa (Empathize) -> Sampaikan permohonan maaf atas kendala (Apologize) -> Berikan solusi konkret dan tenggat waktu (Take Action).',
      items: q1Items,
      correctOrder: ['step-hear', 'step-empathy', 'step-apologize', 'step-action'],
    },
    {
      id: 'D12-Q-02',
      type: 'urutan',
      title: 'Urutan Anatomi Email Bisnis Efektif',
      instruction: 'Susun urutan elemen email formal dari baris paling atas hingga bawah.',
      conceptReference: 'D12-LESSON-01 (Struktur 3C)',
      explanation:
        'Email bisnis formal diawali Subjek Spesifik -> Salam Pembuka Formal -> Kalimat Tujuan di Paragraf 1 -> Rincian/Poin Pembahasan -> Ajakan Bertindak (CTA) -> Salam Penutup & Tanda Tangan.',
      items: q2Items,
      correctOrder: ['elem-subject', 'elem-salutation', 'elem-purpose', 'elem-cta', 'elem-closing'],
    },
    {
      id: 'D12-Q-03',
      type: 'cocokkan',
      title: 'Pemilihan Saluran Komunikasi Kantor',
      instruction: 'Pasangkan situasi kerja dengan saluran komunikasi yang paling tepat dan profesional.',
      conceptReference: 'D12-LESSON-02 (Saluran Eskalasi)',
      explanation:
        'Gunakan email untuk keputusan formal & rekam jejak tertulis; chat instan untuk koordinasi cepat; rapat/telepon untuk diskusi debat kompleks; Bcc untuk pengumuman massal menjaga privasi.',
      pairs: shuffleWithRng(q3Pairs, rng),
    },
    {
      id: 'D12-Q-04',
      type: 'cocokkan',
      title: 'Klasifikasi Nada Komunikasi Kerja',
      instruction: 'Pasangkan jenis nada bicara dengan contoh kalimat dalam percakapan bisnis.',
      conceptReference: 'D12-LESSON-01',
      explanation:
        'Asertif: tegas tanpa merendahkan; Defensif: menyalahkan pihak lain; Agresif: menuduh dan memakai huruf kapital; Pasif: ragu-ragu dan tanpa kepastian.',
      pairs: shuffleWithRng(q4Pairs, rng),
    },
    {
      id: 'D12-Q-05',
      type: 'temukan-kesalahan',
      title: 'Temukan Red Flag pada Draft Email Resmi',
      instruction: 'Pilih 2 baris kalimat yang melanggar etiket korespondensi formal.',
      conceptReference: 'D12-LESSON-01',
      explanation:
        'Baris subjek tidak informatif/terlalu santai, dan baris kalimat huruf besar dengan nada emosional melanggar kaidah profesional.',
      requiredErrorCount: 2,
      contextSnippet: {
        title: 'Draft Email Internal ke Seluruh Divisi',
        subtitle: 'Pengirim: Staf Pengadaan',
        lines: q5Lines,
      },
    },
    {
      id: 'D12-Q-06',
      type: 'temukan-kesalahan',
      title: 'Deteksi Sindrom "P" & Ketidaksopanan Chat Kerja',
      instruction: 'Pilih 2 baris pesan chat yang melanggar efisiensi dan tata krama pesan instan.',
      conceptReference: 'D12-LESSON-02',
      explanation:
        'Mengirimkan huruf "P" sepotong dan melakukan spam notifikasi di luar jam darurat tanpa pesan penjelasan adalah pelanggaran etiket.',
      requiredErrorCount: 2,
      contextSnippet: {
        title: 'Riwayat Obrolan WhatsApp Staf ke Supervisor Larut Malam',
        lines: q6Lines,
      },
    },
    {
      id: 'D12-Q-07',
      type: 'klik-area',
      title: 'Deteksi Alamat Pengirim Palsu (Spoofing)',
      instruction: 'Klik area pada informasi header email yang paling mencurigakan dan menunjukkan indikasi phishing.',
      conceptReference: 'D12 & D14 (Keamanan & Integritas Pesan)',
      explanation:
        'Domain pengirim palsu bukan domain resmi internal perusahaan (@majusejahtera.co.id). Selalu periksa domain asli sebelum menanggapi.',
      previewImageOrBox: {
        title: 'Tampilan Header Email Masuk Mengatasnamakan Tim HRD',
        zones: q7ShuffledZones,
      },
    },
    {
      id: 'D12-Q-08',
      type: 'urutan',
      title: 'Urutan Penyusunan Memo Eskalasi Krisis',
      instruction: 'Susun urutan penyajian fakta saat melaporkan kendala kritis ke atasan.',
      conceptReference: 'D12-LESSON-03',
      explanation:
        'Gunakan metode Pyramid Principle: Kesimpulan Masalah & Dampak Utama -> Fakta Penyebab Teridentifikasi -> 2 Alternatif Solusi & Rekomendasi Pilihan -> Permintaan Keputusan/Arahan.',
      items: q8Items,
      correctOrder: ['m1', 'm2', 'm3', 'm4'],
    },
    {
      id: 'D12-Q-09',
      type: 'cocokkan',
      title: 'Kesesuaian Salam Pembuka dengan Tingkat Formalitas',
      instruction: 'Pasangkan jenis penerima dengan salam pembuka yang paling tepat secara hierarki kantor.',
      conceptReference: 'D12-LESSON-01',
      explanation:
        'Pimpinan/Klien Eksternal gunakan "Yth. Bapak/Ibu..."; Rekan setara gunakan "Halo Rekan-rekan" atau nama depan; Surat dinas resmi lembaga gunakan "Kepada Yang Terhormat...".',
      pairs: shuffleWithRng(q9Pairs, rng),
    },
    {
      id: 'D12-Q-10',
      type: 'temukan-kesalahan',
      title: 'Pelanggaran Privasi dalam Broadcast Email',
      instruction: 'Pilih 2 baris yang melanggar prinsip kerahasiaan data dan etika kerja.',
      conceptReference: 'D12 & D14 (Perlindungan Data Pribadi)',
      explanation:
        'Menyebarkan besaran gaji pribadi, rekam medis rahasia, atau surat peringatan karyawan ke publik dalam satu email pengumuman terbuka adalah pelanggaran berat etika dan privasi data.',
      requiredErrorCount: 2,
      contextSnippet: {
        title: 'Email Pengumuman Lembur Tim Operasional (Disebar ke Seluruh Kantor)',
        lines: q10Lines,
      },
    },
  ];
}

// Default export uses standard deterministic seed 1001
export const D12_QUIZZES: AdvancedQuestion[] = generateSeededD12Quizzes(1001);
