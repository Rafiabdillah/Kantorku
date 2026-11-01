/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D14: Literasi Digital, Keamanan & AI - Seeded Analytical Quizzes Generator
 */

import { AdvancedQuestion } from '../../../components/engines/AdvancedQuizEngine';
import { mulberry32, hashStringToSeed, shuffleWithRng, shuffleGuaranteedDifferent } from '../d12-komunikasi/quizzes';

export function generateSeededD14Quizzes(seedInput: number | string = 2001): AdvancedQuestion[] {
  const seedNum = hashStringToSeed(seedInput);
  const rng = mulberry32(seedNum);

  const variantQ1 = rng() > 0.5 ? 'B' : 'A';
  const variantQ2 = rng() > 0.5 ? 'B' : 'A';
  const variantQ5 = rng() > 0.5 ? 'B' : 'A';
  const variantQ6 = rng() > 0.5 ? 'B' : 'A';
  const variantQ7 = rng() > 0.5 ? 'B' : 'A';
  const variantQ10 = rng() > 0.5 ? 'B' : 'A';

  // 1. Urutan: Tanggap Darurat Akun Terindikasi Phishing
  const q1RawItems = [
    {
      id: 'step-disconnect',
      text:
        variantQ1 === 'A'
          ? '1. Putuskan sambungan internet perangkat untuk isolasi potensi malware'
          : '1. Cabut kabel LAN / matikan Wi-Fi laptop untuk isolasi jaringan kantor',
    },
    {
      id: 'step-change-pwd',
      text:
        variantQ1 === 'A'
          ? '2. Ganti kata sandi akun utama dari perangkat lain yang bersih dan aman'
          : '2. Ubah kata sandi dari ponsel pribadi yang tidak terinfeksi',
    },
    {
      id: 'step-revoke-session',
      text:
        variantQ1 === 'A'
          ? '3. Cabut semua sesi login aktif (Revoke active sessions / sign out from all devices)'
          : '3. Tekan opsi "Keluar dari semua perangkat lain" di pengaturan keamanan akun',
    },
    {
      id: 'step-report',
      text:
        variantQ1 === 'A'
          ? '4. Laporkan bukti tangkapan layar email tipuan ke tim IT kantor dan rekan kerja'
          : '4. Beri tahu koordinator IT dan peringatkan staf lain agar tidak mengklik tautan serupa',
    },
  ];

  // 2. Urutan: Formula Prompt 5 Elemen (PTKFB)
  const q2RawItems = [
    {
      id: 'elem-role',
      text:
        variantQ2 === 'A'
          ? '1. Peran: Tetapkan persona dan keahlian model (contoh: "Bertindaklah sebagai admin kantor berpengalaman")'
          : '1. Peran: Tentukan sudut pandang ahli spesifik (contoh: "Anda adalah auditor kepatuhan internal")',
    },
    {
      id: 'elem-task',
      text:
        variantQ2 === 'A'
          ? '2. Tujuan: Rumuskan tugas utama secara terukur (contoh: "Susun draf email konfirmasi jadwal")'
          : '2. Tujuan: Nyatakan output yang diharapkan (contoh: "Ringkas notulen rapat menjadi 3 poin")',
    },
    {
      id: 'elem-context',
      text:
        variantQ2 === 'A'
          ? '3. Konteks: Berikan latar belakang situasi dan data pendukung yang relevan'
          : '3. Konteks: Lampirkan kronologi singkat dan hubungan antar pihak terkait',
    },
    {
      id: 'elem-format',
      text:
        variantQ2 === 'A'
          ? '4. Format: Tentukan struktur tata letak (tabel 3 kolom, poin bernomor, atau paragraf formal)'
          : '4. Format: Batasi gaya penyajian (tabel ringkas, bullet point, atau naskah memo dinas)',
    },
    {
      id: 'elem-constraint',
      text:
        variantQ2 === 'A'
          ? '5. Batasan: Tetapkan larangan (contoh: "Maksimal 120 kata, jangan mengasumsikan data di luar teks")'
          : '5. Batasan: Garis bawahi rambu ketat (contoh: "Gunakan bahasa Indonesia baku, jangan mengarang fakta baru")',
    },
  ];

  // 3. Cocokkan: Kategori Ancaman Digital
  const q3Pairs = [
    {
      id: 'p-1',
      left: 'Pesan mendesak dari "Direktur" meminta transfer dana darurat via dompet digital',
      right: 'Rekayasa Sosial (Social Engineering / BEC)',
    },
    {
      id: 'p-2',
      left: 'Tautan web palsu yang sangat mirip dengan portal login email perusahaan',
      right: 'Situs Phishing / Kredensial Harvesting',
    },
    {
      id: 'p-3',
      left: 'Berkas lampiran laporan berformat zip yang mengenkripsi seluruh folder dokumen',
      right: 'Serangan Ransomware Berbahaya',
    },
    {
      id: 'p-4',
      left: 'Percobaan login otomatis ratusan kombinasi kata sandi kamus per detik',
      right: 'Serangan Brute Force / Credential Stuffing',
    },
  ];

  // 4. Cocokkan: Klasifikasi Data Menurut UU PDP
  const q4Pairs = [
    {
      id: 'c-1',
      left: 'Data Rekam Medis & Riwayat Penyakit Staf',
      right: 'Data Pribadi Spesifik (Sensitivitas Tinggi)',
    },
    {
      id: 'c-2',
      left: 'Nomor Rekening Bank & Rincian Gaji Pribadi',
      right: 'Data Finansial Pribadi Terlindungi',
    },
    {
      id: 'c-3',
      left: 'Nama Lengkap & Jabatan di Kartu Nama Resmi',
      right: 'Data Kontak Bisnis Publik',
    },
    {
      id: 'c-4',
      left: 'Rekaman Biometrik Wajah Mesin Presensi Kantor',
      right: 'Data Biometrik Spesifik Terlindungi',
    },
  ];

  // 5. Temukan Kesalahan: Draf Prompt Membocorkan Rahasia
  const q5Lines =
    variantQ5 === 'A'
      ? [
          { id: 'l1', text: 'Tolong bantu saya merapikan surat pengumuman bonus akhir tahun ini.', isError: false },
          { id: 'l2', text: 'Berikut daftar 5 karyawan berserta NIK, nomor rekening bank, dan nominal pinjaman pribadi mereka.', isError: true, errorReason: 'Membocorkan NIK dan data finansial pribadi karyawan ke sistem eksternal' },
          { id: 'l3', text: 'Format hasilkan dalam bentuk tabel rekapitulasi formal.', isError: false },
          { id: 'l4', text: 'Sertakan kata sandi akun master admin sistem penggajian untuk verifikasi berkas.', isError: true, errorReason: 'Membocorkan kredensial rahasia master admin' },
          { id: 'l5', text: 'Gunakan nada komunikasi yang menyemangati seluruh staf.', isError: false },
        ]
      : [
          { id: 'l1', text: 'Buatkan ringkasan analisa kepuasan pelanggan untuk rapat divisi besok.', isError: false },
          { id: 'l2', text: 'Terlampir data riwayat keluhan medis pasien beserta nomor rekam medis lengkap tanpa sensor.', isError: true, errorReason: 'Membocorkan data kesehatan sensitif pasien tanpa anonimisasi' },
          { id: 'l3', text: 'Kelompokkan berdasarkan kategori kecepatan respon pelayanan.', isError: false },
          { id: 'l4', text: 'Berikut token API rahasia server kantor untuk mengambil data mentah otomatis.', isError: true, errorReason: 'Membocorkan secret token API server kantor' },
          { id: 'l5', text: 'Sajikan rekomendasi perbaikan dalam 3 poin tindakan konkret.', isError: false },
        ];

  // 6. Temukan Kesalahan: Verifikasi Keluaran AI yang Berhalusinasi
  const q6Lines =
    variantQ6 === 'A'
      ? [
          { id: 'h1', text: 'Menurut pasal 9999 UU Ketenagakerjaan tahun 2050, cuti tahunan diberikan 100 hari per bulan.', isError: true, errorReason: 'Halusinasi pasal dan angka regulasi fiktif yang tidak masuk akal' },
          { id: 'h2', text: 'Pencadangan data sebaiknya dilakukan secara rutin untuk menjamin integritas operasional.', isError: false },
          { id: 'h3', text: 'Hasil perhitungan: Biaya Rp 10.000 + Rp 15.000 adalah Rp 25.000.', isError: false },
          { id: 'h4', text: 'Perusahaan teknologi global didirikan pada tahun 1750 oleh Kaisar Romawi kuno.', isError: true, errorReason: 'Halusinasi kronologi sejarah fakta' },
          { id: 'h5', text: 'Verifikasi manusia tetap diperlukan untuk memastikan kesesuaian dokumen.', isError: false },
        ]
      : [
          { id: 'h1', text: 'Standar kata sandi yang disarankan minimal memiliki panjang 12 karakter unik.', isError: false },
          { id: 'h2', text: 'Menurut Keputusan Menteri Khayalan No. 000, seluruh kantor wajib libur 6 bulan.', isError: true, errorReason: 'Halusinasi peraturan fiktif' },
          { id: 'h3', text: 'Total anggaran proyek Rp 50.000.000 dikurangi diskon 10% menjadi Rp 5.000.000.', isError: true, errorReason: 'Kalkulasi matematika salah telak (seharusnya Rp 45.000.000)' },
          { id: 'h4', text: 'Penggunaan 2FA menambahkan lapisan perlindungan berbasis kode waktu unik.', isError: false },
          { id: 'h5', text: 'Komunikasi profesional harus mengedepankan objektivitas dan kejelasan.', isError: false },
        ];

  // 7. Hotspot: Deteksi Tanda Bahaya pada Tampilan Surel
  const q7Domain =
    variantQ7 === 'A' ? 'admin@majusejahtera-update-system.xyz' : 'support@keamanan-portal-kantor.top';
  const q7Zones = [
    {
      id: 'z1',
      label: 'Nama Pengirim: "Divisi Keamanan TI PT Maju Sejahtera"',
      isTarget: false,
      explanation: 'Nama tampilan bisa diisi apa saja oleh pelaku kejahatan.',
    },
    {
      id: 'z2',
      label: `Alamat Email Asli: "${q7Domain}"`,
      isTarget: true,
      explanation: 'Domain pengirim mencurigakan (.xyz/.top) dan bukan domain resmi perusahaan (@majusejahtera.co.id)!',
    },
    {
      id: 'z3',
      label: 'Subjek: "PERINGATAN TERAKHIR: Akun Anda Dihapus dalam 30 Menit!"',
      isTarget: false,
      explanation: 'Urgensi palsu adalah taktik klasik rekayasa sosial.',
    },
    {
      id: 'z4',
      label: 'Nama Berkas Lampiran: "Formulir_Verifikasi_Ulang.pdf.exe"',
      isTarget: true,
      explanation: 'Ekstensi berkas ganda dengan akhiran .exe adalah file executable berbahaya yang menyamar sebagai PDF!',
    },
  ];

  // 8. Urutan: Manajemen Sandi Kerja Baru
  const q8RawItems = [
    { id: 'p1', text: '1. Buat frase sandi unik minimal 14 karakter yang tidak pernah dipakai di akun lain' },
    { id: 'p2', text: '2. Simpan kredensial ke dalam brankas manajer sandi terenkripsi' },
    { id: 'p3', text: '3. Pasangkan otentikasi dua langkah (2FA) menggunakan aplikasi otentikasi' },
    { id: 'p4', text: '4. Catat kode cadangan pemulihan darurat di tempat fisik yang aman terkunci' },
  ];

  // 9. Cocokkan: Taktik Mitigasi Risiko AI
  const q9Pairs = [
    {
      id: 'm-1',
      left: 'Risiko keluaran AI mengarang angka dan data fiktif',
      right: 'Validasi Fakta & Penelusuran Dokumen Sumber (Grounding)',
    },
    {
      id: 'm-2',
      left: 'Risiko kebocoran data rahasia strategi kantor ke pihak ketiga',
      right: 'Penerapan Kebijakan Batasan Privasi & Anonimisasi Input',
    },
    {
      id: 'm-3',
      left: 'Risiko plagiarisme atau pelanggaran hak cipta teks/gambar',
      right: 'Pemeriksaan Sitasi Mandiri & Parafrase Orisinal Staf',
    },
    {
      id: 'm-4',
      left: 'Risiko keputusan operasional tanpa akuntabilitas manusia',
      right: 'Penerapan Gerbang Evaluasi Manusia (Human-in-the-Loop)',
    },
  ];

  // 10. Temukan Kesalahan: Perilaku Buruk Keamanan Kata Sandi
  const q10Lines =
    variantQ10 === 'A'
      ? [
          { id: 's1', text: 'Menempelkan kertas memo berisi kata sandi komputer di sudut monitor meja kerja.', isError: true, errorReason: 'Mengekspos kata sandi secara fisik kepada siapa saja yang lewat' },
          { id: 's2', text: 'Mengunci layar komputer saat meninggalkan meja kerja menuju toilet.', isError: false },
          { id: 's3', text: 'Menggunakan satu kata sandi yang sama persis untuk akun email kerja dan akun media sosial pribadi.', isError: true, errorReason: 'Berbagi kata sandi lintas akun memperbesar dampak kebocoran kredensial' },
          { id: 's4', text: 'Memperbarui sistem operasi perangkat kerja saat ada patch keamanan resmi.', isError: false },
        ]
      : [
          { id: 's1', text: 'Membagikan kode OTP perbankan via panggilan telepon kepada orang yang mengaku petugas teknis.', isError: true, errorReason: 'Kode OTP tidak boleh dibagikan kepada siapa pun termasuk pihak bank' },
          { id: 's2', text: 'Mengabaikan peringatan sertifikat keamanan SSL browser yang ditandai merah/tidak aman.', isError: true, errorReason: 'Mengakses situs tanpa enkripsi SSL membahayakan transmisi data' },
          { id: 's3', text: 'Memilih opsi "Ingat saya" hanya pada komputer kerja pribadi yang terenkripsi.', isError: false },
          { id: 's4', text: 'Melakukan backup data berkala ke harddisk cadangan offline.', isError: false },
        ];

  return [
    {
      id: 'D14-Q-01',
      title: 'Prosedur Tanggap Darurat Akun Terinfeksi Phishing',
      instruction: 'Urutkan langkah pertahanan awal saat Anda tidak sengaja memasukkan kredensial ke situs mencurigakan:',
      type: 'urutan',
      items: shuffleGuaranteedDifferent(q1RawItems, ['step-disconnect', 'step-change-pwd', 'step-revoke-session', 'step-report'], rng),
      correctOrder: ['step-disconnect', 'step-change-pwd', 'step-revoke-session', 'step-report'],
      explanation: 'Isolasi jaringan adalah prioritas utama, dilanjutkan pergantian sandi dari perangkat aman, pencabutan sesi aktif, dan pelaporan.',
      conceptReference: 'NIST Incident Handling Guide',
    },
    {
      id: 'D14-Q-02',
      title: 'Struktur Formula Prompt 5 Elemen (PTKFB)',
      instruction: 'Susun urutan anatomi penulisan instruksi prompt yang efektif untuk tugas perkantoran:',
      type: 'urutan',
      items: shuffleGuaranteedDifferent(q2RawItems, ['elem-role', 'elem-task', 'elem-context', 'elem-format', 'elem-constraint'], rng),
      correctOrder: ['elem-role', 'elem-task', 'elem-context', 'elem-format', 'elem-constraint'],
      explanation: 'Urutan logis: Peran ahli -> Tugas terukur -> Konteks situasi -> Format output -> Batasan/rambu pengaman.',
      conceptReference: 'Pedoman Prompt Engineering Bisnis',
    },
    {
      id: 'D14-Q-03',
      title: 'Klasifikasi Jenis Serangan Siber Perkantoran',
      instruction: 'Pasangkan skenario kejadian dengan kategori ancaman keamanan informasi yang tepat:',
      type: 'cocokkan',
      pairs: shuffleWithRng(q3Pairs, rng),
      explanation: 'Membedakan rekayasa sosial, phishing, ransomware, dan brute force membantu memilih tindakan proteksi yang tepat.',
      conceptReference: 'BSSN Panduan Kesadaran Keamanan Siber',
    },
    {
      id: 'D14-Q-04',
      title: 'Klasifikasi Data Sensitif Sesuai UU No 27/2022 (PDP)',
      instruction: 'Pasangkan jenis data dengan klasifikasi pelindungan data pribadi yang berlaku:',
      type: 'cocokkan',
      pairs: shuffleWithRng(q4Pairs, rng),
      explanation: 'Data kesehatan, biometrik, dan finansial adalah data pribadi spesifik yang menuntut standar pelindungan paling ketat.',
      conceptReference: 'UU No 27 Tahun 2022 Pasal 4',
    },
    {
      id: 'D14-Q-05',
      title: 'Audit Kerahasiaan Data pada Prompt AI',
      instruction: 'Klik 2 baris instruksi prompt di bawah yang membocorkan data rahasia berbahaya:',
      type: 'temukan-kesalahan',
      contextSnippet: {
        title: 'Draft Prompt Masukan Analisa Staf',
        subtitle: 'Divisi Pelayanan & TI',
        lines: q5Lines,
      },
      requiredErrorCount: 2,
      explanation: 'Membocorkan data kesehatan sensitif pasien tanpa sensor dan token API rahasia melanggar UU PDP dan keamanan TI.',
      conceptReference: 'Pedoman Etika & Keamanan AI Generatif',
    },
    {
      id: 'D14-Q-06',
      title: 'Deteksi Halusinasi & Kekeliruan Fakta Keluaran AI',
      instruction: 'Klik 2 kalimat di bawah yang memuat halusinasi fakta hukum atau salah hitung:',
      type: 'temukan-kesalahan',
      contextSnippet: {
        title: 'Hasil Ringkasan Otomatis dari Asisten AI',
        subtitle: 'Tinjauan Regulasi & Kalkulasi Anggaran',
        lines: q6Lines,
      },
      requiredErrorCount: 2,
      explanation: 'AI dapat mengarang pasal regulasi yang tidak pernah ada dan melakukan kekeliruan perhitungan matematika bila tidak diaudit manusia.',
      conceptReference: 'Protokol Verifikasi Fakta Manusia (Human-in-the-Loop)',
    },
    {
      id: 'D14-Q-07',
      title: 'Inspeksi Header & Lampiran Email Mencurigakan',
      instruction: 'Klik area yang menjadi tanda bahaya utama (red flag) pada tampilan surel masuk:',
      type: 'klik-area',
      previewImageOrBox: {
        title: 'Header & Detail Surel Masuk Mengatasnamakan Pembaruan Sistem',
        zones: shuffleWithRng(q7Zones, rng),
      },
      explanation: 'Domain pengirim mencurigakan (.xyz/.top) dan lampiran ekstensi ganda (.pdf.exe) adalah tanda mutlak serangan siber.',
      conceptReference: 'Anatomi Email Phishing & Spoofing',
    },
    {
      id: 'D14-Q-08',
      title: 'Siklus Pengamanan Akun Karyawan Baru',
      instruction: 'Urutkan tahapan pembuatan dan pengamanan kredensial kerja yang benar:',
      type: 'urutan',
      items: shuffleWithRng(q8RawItems, rng),
      correctOrder: ['p1', 'p2', 'p3', 'p4'],
      explanation: 'Buat frase sandi -> simpan di brankas manajer sandi -> aktifkan 2FA -> catat kode pemulihan.',
      conceptReference: 'Standar Manajemen Sandi Kuat',
    },
    {
      id: 'D14-Q-09',
      title: 'Mitigasi Risiko Pemakaian AI di Lingkungan Kerja',
      instruction: 'Pasangkan risiko pemakaian AI dengan strategi pencegahan praktisnya:',
      type: 'cocokkan',
      pairs: shuffleWithRng(q9Pairs, rng),
      explanation: 'Mengintegrasikan grounding, anonimisasi, orisinalitas, dan evaluasi manusia memitigasi risiko AI.',
      conceptReference: 'Framework Tata Kelola AI Bertanggung Jawab',
    },
    {
      id: 'D14-Q-10',
      title: 'Identifikasi Kebiasaan Buruk Keamanan Digital',
      instruction: 'Klik 2 perilaku di bawah yang melanggar keamanan informasi dasar kantor:',
      type: 'temukan-kesalahan',
      contextSnippet: {
        title: 'Observasi Praktik Keamanan Karyawan Kantor',
        lines: q10Lines,
      },
      requiredErrorCount: 2,
      explanation: 'Menempelkan sandi fisik, berbagi sandi lintas akun, dan menyerahkan kode OTP kepada pihak lain adalah celah kebocoran fatal.',
      conceptReference: 'Pedoman Kebersihan Siber (Cyber Hygiene)',
    },
  ];
}

export const D14_QUIZZES = generateSeededD14Quizzes(2026);
