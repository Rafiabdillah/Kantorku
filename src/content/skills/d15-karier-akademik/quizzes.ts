/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D15: Karier & Metodologi Akademik - Seeded Analytical Quizzes Generator
 */

import { AdvancedQuestion } from '../../../components/engines/AdvancedQuizEngine';
import { mulberry32, hashStringToSeed, shuffleWithRng, shuffleGuaranteedDifferent } from '../d12-komunikasi/quizzes';

export function generateSeededD15Quizzes(seedInput: number | string = 3001): AdvancedQuestion[] {
  const seedNum = hashStringToSeed(seedInput);
  const rng = mulberry32(seedNum);

  const variantQ1 = rng() > 0.5 ? 'B' : 'A';
  const variantQ2 = rng() > 0.5 ? 'B' : 'A';
  const variantQ5 = rng() > 0.5 ? 'B' : 'A';
  const variantQ6 = rng() > 0.5 ? 'B' : 'A';
  const variantQ7 = rng() > 0.5 ? 'B' : 'A';
  const variantQ10 = rng() > 0.5 ? 'B' : 'A';

  // 1. Urutan: Struktur Narasi STAR dalam Wawancara
  const q1RawItems = [
    {
      id: 'star-situation',
      text:
        variantQ1 === 'A'
          ? '1. Situation: Jelaskan latar belakang situasi dan tantangan spesifik yang dihadapi'
          : '1. Situation: Gambarkan konteks masalah dan lingkungan kerja saat insiden terjadi',
    },
    {
      id: 'star-task',
      text:
        variantQ1 === 'A'
          ? '2. Task: Uraikan tanggung jawab dan peran Anda dalam menyelesaikan tantangan tersebut'
          : '2. Task: Tegaskan sasaran kerja dan ekspektasi yang dibebankan kepada Anda',
    },
    {
      id: 'star-action',
      text:
        variantQ1 === 'A'
          ? '3. Action: Jabarkan langkah-langkah konkret dan inisiatif nyata yang Anda lakukan'
          : '3. Action: Paparkan keputusan teknis dan kolaborasi yang Anda eksekusi langsung',
    },
    {
      id: 'star-result',
      text:
        variantQ1 === 'A'
          ? '4. Result: Tunjukkan hasil kuantitatif terukur atau dampak positif dari tindakan Anda'
          : '4. Result: Sajikan dampak nyata efisiensi atau pelajaran berharga yang dipetik',
    },
  ];

  // 2. Urutan: Sistematika Penulisan Bab 1 Skripsi / Makalah
  const q2RawItems = [
    {
      id: 'acad-latar',
      text:
        variantQ2 === 'A'
          ? '1. Latar Belakang Masalah (Gejala fenomena empiris dan kesenjangan teoretis)'
          : '1. Latar Belakang Penelitian (Kondisi ideal vs fakta riil di lapangan)',
    },
    {
      id: 'acad-rumusan',
      text:
        variantQ2 === 'A'
          ? '2. Rumusan Masalah (Pertanyaan penelitian terfokus)'
          : '2. Identifikasi & Rumusan Masalah (Pertanyaan kunci studi)',
    },
    {
      id: 'acad-tujuan',
      text:
        variantQ2 === 'A'
          ? '3. Tujuan Penelitian (Sasaran capaian menjawab rumusan masalah)'
          : '3. Tujuan Penelitian (Target jawaban spesifik)',
    },
    {
      id: 'acad-manfaat',
      text:
        variantQ2 === 'A'
          ? '4. Manfaat Penelitian (Kontribusi teoretis dan aplikatif bagi praktisi)'
          : '4. Manfaat Studi (Dampak guna bagi akademisi dan dunia kerja)',
    },
  ];

  // 3. Cocokkan: Kaidah Format Sitasi APA Edisi ke-7
  const q3Pairs = [
    {
      id: 'apa-1',
      left: 'Satu orang penulis di dalam kurung akhir kalimat',
      right: '(Pratama, 2024)',
    },
    {
      id: 'apa-2',
      left: 'Dua orang penulis disebut sebagai subjek kalimat',
      right: 'Pratama dan Sari (2024) mengemukakan...',
    },
    {
      id: 'apa-3',
      left: 'Tiga orang penulis atau lebih pada pemanggilan pertama',
      right: '(Pratama et al., 2024)',
    },
    {
      id: 'apa-4',
      left: 'Kutipan langsung disertai nomor halaman spesifik',
      right: '(Pratama, 2024, hlm. 45)',
    },
  ];

  // 4. Cocokkan: Komponen Dokumen Lamaran Kerja
  const q4Pairs = [
    {
      id: 'cv-1',
      left: 'Ringkasan Profil Profesional (Professional Summary)',
      right: '3-4 kalimat padat merangkum keahlian utama, pengalaman, dan nilai tambah kandidat',
    },
    {
      id: 'cv-2',
      left: 'Poin Riwayat Pekerjaan Berbasis Formula XYZ',
      right: 'Pernyataan capaian kerja terukur diawali kata kerja aksi aktif',
    },
    {
      id: 'cv-3',
      left: 'Surat Lamaran Kerja (Cover Letter)',
      right: 'Naskah formal menjelaskan motivasi melamar dan relevansi keterampilan dengan perusahaan',
    },
    {
      id: 'cv-4',
      left: 'Portofolio Proyek Digital',
      right: 'Koleksi bukti kerja nyata (tabel model finansial, SOP, kode bersih) yang dapat diakses publik',
    },
  ];

  // 5. Temukan Kesalahan: Red Flag Iklan Lowongan Kerja Palsu
  const q5Lines =
    variantQ5 === 'A'
      ? [
          { id: 'l1', text: 'Dibutuhkan staf administrasi kantor cabang dengan syarat menguasai pengolahan data tabel.', isError: false },
          { id: 'l2', text: 'Kandidat wajib mentransfer biaya tiket pesawat Rp 1.500.000 ke rekening biro travel rekanan untuk registrasi wawancara.', isError: true, errorReason: 'Pemungutan biaya akomodasi/travel fiktif adalah modus utama penipuan lowongan kerja' },
          { id: 'l3', text: 'Lamaran resmi dikirimkan ke alamat surel: rekrutmen-bumn-resmi@yahoo.com.', isError: true, errorReason: 'Perusahaan resmi tidak menggunakan domain email gratisan umum' },
          { id: 'l4', text: 'Tahapan seleksi terdiri atas tes teknis administrasi dan wawancara kompetensi.', isError: false },
          { id: 'l5', text: 'Hanya kandidat yang memenuhi kualifikasi yang akan dihubungi oleh panitia rekrutmen.', isError: false },
        ]
      : [
          { id: 'l1', text: 'PT Maju Terbuka membuka kesempatan magang untuk posisi koordinator berkas.', isError: false },
          { id: 'l2', text: 'Selamat! Tanpa perlu wawancara Anda langsung diterima bekerja dengan gaji Rp 25.000.000 per minggu.', isError: true, errorReason: 'Janji penerimaan instan dengan nominal gaji tidak masuk akal adalah ciri penipuan' },
          { id: 'l3', text: 'Kirimkan berkas portofolio dan CV Anda melalui formulir resmi perusahaan.', isError: false },
          { id: 'l4', text: 'Wajib membeli seragam dan materai senilai Rp 500.000 sebelum tanda tangan kontrak hari ini.', isError: true, errorReason: 'Memungut uang seragam/biaya administrasi di awal seleksi' },
          { id: 'l5', text: 'Lokasi kantor dan jadwal penugasan disesuaikan dengan domisili pelamar.', isError: false },
        ];

  // 6. Temukan Kesalahan: Kesalahan Format Penulisan Karya Ilmiah
  const q6Lines =
    variantQ6 === 'A'
      ? [
          { id: 'a1', text: 'Penelitian ini bertujuan untuk menguji pengaruh otomasi spreadsheet terhadap efisiensi kerja.', isError: false },
          { id: 'a2', text: 'Menurut salah satu orang pintar yang saya dengar di internet, Excel sangat bagus sekali.', isError: true, errorReason: 'Pernyataan tidak ilmiah tanpa sitasi sumber yang jelas dan gaya bahasa subjektif' },
          { id: 'a3', text: 'Data dikumpulkan melalui survei kuesioner dengan skala Likert 1 sampai 5.', isError: false },
          { id: 'a4', text: 'Hasil penelitian ini sudah pasti 100% benar mutlak di seluruh alam semesta tanpa batas.', isError: true, errorReason: 'Klaim kebenaran mutlak yang melanggar prinsip kerendahan hati ilmiah (scientific limitation)' },
          { id: 'a5', text: 'Sampel penelitian berjumlah 60 responden staf administrasi di wilayah Jakarta.', isError: false },
        ]
      : [
          { id: 'a1', text: 'Tinjauan pustaka ini mensintesis temuan dari sepuluh artikel jurnal terindeks.', isError: false },
          { id: 'a2', text: 'Saya menyalin kata demi kata seluruh paragraf buku orang lain tanpa tanda petik dan tanpa menyebut nama penulisnya.', isError: true, errorReason: 'Tindakan plagiarisme langsung (direct plagiarism)' },
          { id: 'a3', text: 'Variabel penelitian diukur menggunakan indikator yang telah teruji reliabilitasnya.', isError: false },
          { id: 'a4', text: 'Daftar pustaka disusun secara acak sesuka hati tanpa urutan abjad pengarang.', isError: true, errorReason: 'Daftar pustaka wajib disusun berdasarkan abjad nama belakang penulis' },
          { id: 'a5', text: 'Uji hipotesis dilakukan dengan analisis regresi linier sederhana.', isError: false },
        ];

  // 7. Hotspot: Inspeksi Tampilan CV yang Tidak Ramah ATS
  const q7Zones = [
    {
      id: 'z1',
      label: 'Nama Lengkap & Kontak Profesional di Bagian Atas',
      isTarget: false,
      explanation: 'Penempatan nama dan informasi kontak di awal adalah format standar.',
    },
    {
      id: 'z2',
      label: 'Grafik Progress Bar / Rating Bintang 5/5 untuk Keahlian',
      isTarget: true,
      explanation: 'Mesin parser ATS tidak dapat membaca grafik bintang/persen visual dan sering menganggapnya sebagai format rusak!',
    },
    {
      id: 'z3',
      label: 'Deskripsi Riwayat Kerja dengan Poin Bernomor dan Angka Riil',
      isTarget: false,
      explanation: 'Teks bersih dengan kata kerja aksi sangat disukai mesin ATS dan rekruter.',
    },
    {
      id: 'z4',
      label: 'Tabel Bersarang Kompleks dengan 4 Kolom di dalam Kolom',
      isTarget: true,
      explanation: 'Tabel bersarang membingungkan alur baca mesin ATS (bisa membaca teks dari kolom kiri tercampur kolom kanan)!',
    },
  ];

  // 8. Urutan: Tahapan Negosiasi Penawaran Kerja (Offering)
  const q8RawItems = [
    { id: 'neg-1', text: '1. Sampaikan apresiasi tulus atas surat penawaran kerja (Offering Letter) yang diberikan' },
    { id: 'neg-2', text: '2. Pelajari detail rincian komponen kompensasi, tunjangan kesehatan, dan fasilitas kerja' },
    { id: 'neg-3', text: '3. Ajukan permohonan diskusi penyesuaian rentang kompensasi berbasis data riset pasar' },
    { id: 'neg-4', text: '4. Konfirmasikan kesepakatan akhir secara tertulis sebelum tanggal mulai kerja resmi' },
  ];

  // 9. Cocokkan: Skala & Instrumen Penelitian Akademik
  const q9Pairs = [
    {
      id: 'ins-1',
      left: 'Skala Pengukuran 1 (Sangat Tidak Setuju) hingga 5 (Sangat Setuju)',
      right: 'Skala Likert (Tingkat Persetujuan)',
    },
    {
      id: 'ins-2',
      left: 'Teknik pengambilan sampel dengan memberi peluang sama kepada setiap populasi',
      right: 'Simple Random Sampling (Sampel Acak Sederhana)',
    },
    {
      id: 'ins-3',
      left: 'Pengujian konsistensi jawaban responden pada kuesioner',
      right: 'Uji Reliabilitas (Cronbach Alpha)',
    },
    {
      id: 'ins-4',
      left: 'Pernyataan kesimpulan sementara yang akan diuji kebenarannya lewat data',
      right: 'Hipotesis Penelitian',
    },
  ];

  // 10. Temukan Kesalahan: Perilaku Buruk Saat Wawancara Kerja
  const q10Lines =
    variantQ10 === 'A'
      ? [
          { id: 'w1', text: 'Menjelaskan alasan berpindah kerja dengan menjelek-jelekkan mantan atasan dan rekan kantor lama secara emosional.', isError: true, errorReason: 'Menjelekkan tempat kerja lama menunjukkan ketidakdewasaan emosional dan red flag besar' },
          { id: 'w2', text: 'Melakukan riset profil perusahaan dan lini bisnis utama sebelum menghadiri sesi wawancara.', isError: false },
          { id: 'w3', text: 'Mengaku menguasai keahlian tingkat ahli padahal belum pernah membuka aplikasi tersebut sama sekali.', isError: true, errorReason: 'Berbohong mengenai kompetensi teknis akan langsung terbukti saat tes praktik kerja' },
          { id: 'w4', text: 'Menyiapkan 2 pertanyaan strategis kepada pewawancara di akhir sesi wawancara.', isError: false },
        ]
      : [
          { id: 'w1', text: 'Datang atau bergabung di ruang pertemuan video 10 menit sebelum waktu wawancara dimulai.', isError: false },
          { id: 'w2', text: 'Memotong pembicaraan pewawancara di tengah kalimat untuk membantah penjelasannya.', isError: true, errorReason: 'Memotong pembicaraan pewawancara melanggar etiket komunikasi dasar' },
          { id: 'w3', text: 'Menjawab pertanyaan "Berapa ekspektasi gaji Anda?" dengan ketus: "Terserah kantor saja saya tidak peduli".', isError: true, errorReason: 'Jawaban pasif defensif tanpa riset mencerminkan ketidaksiapan profesional' },
          { id: 'w4', text: 'Mengirimkan pesan apresiasi singkat (Thank-You Note) setelah sesi wawancara selesai.', isError: false },
        ];

  return [
    {
      id: 'D15-Q-01',
      title: 'Struktur Kerangka STAR dalam Wawancara Kompetensi',
      instruction: 'Urutkan tahapan penyampaian jawaban terstruktur menggunakan model STAR:',
      type: 'urutan',
      items: shuffleGuaranteedDifferent(q1RawItems, ['star-situation', 'star-task', 'star-action', 'star-result'], rng),
      correctOrder: ['star-situation', 'star-task', 'star-action', 'star-result'],
      explanation: 'Model STAR menyusun kronologi: Situasi konteks -> Tugas mandat -> Tindakan konkret -> Hasil terukur.',
      conceptReference: 'Metode Wawancara Perilaku Terstruktur',
    },
    {
      id: 'D15-Q-02',
      title: 'Sistematika Bab 1 Pendahuluan Karya Ilmiah',
      instruction: 'Susun urutan subbab pendahuluan naskah ilmiah sesuai kaidah metodologi penelitian:',
      type: 'urutan',
      items: shuffleGuaranteedDifferent(q2RawItems, ['acad-latar', 'acad-rumusan', 'acad-tujuan', 'acad-manfaat'], rng),
      correctOrder: ['acad-latar', 'acad-rumusan', 'acad-tujuan', 'acad-manfaat'],
      explanation: 'Sistematika baku: Latar belakang -> Rumusan masalah -> Tujuan penelitian -> Manfaat penelitian.',
      conceptReference: 'Pedoman Penulisan Ilmiah Kemendikbudristek',
    },
    {
      id: 'D15-Q-03',
      title: 'Standar Format Sitasi APA Edisi ke-7',
      instruction: 'Pasangkan aturan penulisan rujukan dengan format sitasi dalam teks yang benar:',
      type: 'cocokkan',
      pairs: shuffleWithRng(q3Pairs, rng),
      explanation: 'Standar APA 7 menggunakan format (Penulis, Tahun) dan et al. untuk tiga penulis atau lebih.',
      conceptReference: 'APA Publication Manual 7th Edition',
    },
    {
      id: 'D15-Q-04',
      title: 'Anatomi Berkas Lamaran Kerja Profesional',
      instruction: 'Pasangkan komponen dokumen lamaran dengan fungsi dan karakteristik utamanya:',
      type: 'cocokkan',
      pairs: shuffleWithRng(q4Pairs, rng),
      explanation: 'Ringkasan profil, capaian XYZ, cover letter, dan portofolio saling melengkapi dalam portofolio pelamar.',
      conceptReference: 'Standar Rekrutmen Perkantoran Modern',
    },
    {
      id: 'D15-Q-05',
      title: 'Deteksi Ciri Penipuan Lowongan Kerja',
      instruction: 'Klik 2 baris iklan di bawah yang memuat tanda bahaya (red flag) penipuan kerja:',
      type: 'temukan-kesalahan',
      contextSnippet: {
        title: 'Iklan Lowongan Kerja di Kanal Media Sosial',
        subtitle: 'Audit Kredibilitas Perusahaan',
        lines: q5Lines,
      },
      requiredErrorCount: 2,
      explanation: 'Pungutan biaya akomodasi travel palsu dan alamat email gratisan (bukan domain perusahaan) adalah ciri lowongan bodong.',
      conceptReference: 'Edukasi Perlindungan Tenaga Kerja Kemnaker',
    },
    {
      id: 'D15-Q-06',
      title: 'Audit Kekeliruan Penulisan Naskah Akademik',
      instruction: 'Klik 2 kalimat di bawah yang melanggar etika dan metodologi penulisan ilmiah:',
      type: 'temukan-kesalahan',
      contextSnippet: {
        title: 'Draft Naskah Skripsi Mahasiswa',
        subtitle: 'Bagian Metodologi & Daftar Pustaka',
        lines: q6Lines,
      },
      requiredErrorCount: 2,
      explanation: 'Menyalin teks mentah tanpa tanda kutip (patchwriting) dan mencantumkan rujukan fiktif melanggar integritas akademik.',
      conceptReference: 'Kode Etik Integritas Akademik & Publikasi',
    },
    {
      id: 'D15-Q-07',
      title: 'Inspeksi Elemen CV yang Merusak Parsing ATS',
      instruction: 'Klik area yang menjadi kesalahan utama tata letak CV ramah ATS:',
      type: 'klik-area',
      previewImageOrBox: {
        title: 'Tampilan Header & Format Kolom Dokumen CV Pelamar',
        zones: shuffleWithRng(q7Zones, rng),
      },
      explanation: 'Grafik progress bar kemampuan tanpa angka metrik dan tabel kompleks multi-kolom sering gagal dibaca oleh parser ATS.',
      conceptReference: 'ATS Resume Parsing Guidelines',
    },
    {
      id: 'D15-Q-08',
      title: 'Siklus Etis Negosiasi Penawaran Kerja',
      instruction: 'Urutkan tahapan diplomatis merespons surat penawaran kerja (Offering Letter):',
      type: 'urutan',
      items: shuffleWithRng(q8RawItems, rng),
      correctOrder: ['neg-1', 'neg-2', 'neg-3', 'neg-4'],
      explanation: 'Apresiasi -> telaah detail -> ajukan diskusi penyesuaian berbasis riset -> konfirmasi tertulis.',
      conceptReference: 'Panduan Negosiasi Karier Profesional',
    },
    {
      id: 'D15-Q-09',
      title: 'Konsep Instrumen Riset & Pengumpulan Data',
      instruction: 'Pasangkan konsep metodologi penelitian dengan istilah ilmiah yang sesuai:',
      type: 'cocokkan',
      pairs: shuffleWithRng(q9Pairs, rng),
      explanation: 'Memahami Skala Likert, Random Sampling, Reliabilitas, dan Hipotesis adalah fondasi riset skripsi.',
      conceptReference: 'Metodologi Penelitian Bisnis & Manajemen',
    },
    {
      id: 'D15-Q-10',
      title: 'Identifikasi Kesalahan Fatal Sesi Wawancara',
      instruction: 'Klik 2 sikap di bawah yang menjadi red flag fatal bagi pewawancara:',
      type: 'temukan-kesalahan',
      contextSnippet: {
        title: 'Simulasi Wawancara Tatap Muka',
        subtitle: 'Evaluasi Sikap & Komunikasi Verbal',
        lines: q10Lines,
      },
      requiredErrorCount: 2,
      explanation: 'Memotong pembicaraan pewawancara dan memberikan respon ketus tanpa riset ekspektasi gaji mencerminkan ketidaksiapan profesional.',
      conceptReference: 'Etiket Wawancara Kerja Profesional',
    },
  ];
}

export const D15_QUIZZES = generateSeededD15Quizzes(2026);
