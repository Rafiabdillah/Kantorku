/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu v2.0 - Pelajaran Word Bisnis & Akademik (Word Lessons)
 * Meliputi: Heading Hierarchy, Tipografi, Margin 4-3-3-3, Tabel Action Plan, Notulen Eksekutif, dan Sitasi.
 */

import { Lesson } from '../../features/learning/types';

export const WORD_LESSONS: Lesson[] = [
  // 1. Heading Hierarchy
  {
    id: 'les-word-heading-hierarchy',
    track: 'word',
    tier: 1,
    skillId: 'Heading Hierarchy',
    title: 'Hierarki Judul & Struktur Dokumen (H1, H2, H3)',
    objectives: [
      'Memahami fungsi style Heading bawaan untuk navigasi dokumen',
      'Menyusun struktur bab (Heading 1) dan sub-bab (Heading 2)',
      'Membuat dokumen yang siap digenerate Daftar Isi otomatis',
    ],
    estimatedMinutes: 6,
    prerequisites: [],
    characterIntro: {
      characterId: 'maya',
      dialogue: 'Banyak orang membuat judul cuma dengan memilih tulisan lalu mengklik tombol Bold dan mengubah ukuran ke 18pt. Akibatnya saat bikin Daftar Isi, komputermu gak tahu mana yang bab dan mana yang teks biasa!',
      tip: 'Gunakan panel Styles Heading bawaan agar dokumenmu memiliki struktur semantik formal.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Mengapa Heading Styles Begitu Penting?',
        content: 'Dalam dokumen formal bisnis dan akademik, Heading bukan hanya soal ukuran huruf. Heading memberi tahu Microsoft Word dan pembaca tentang peta arsitektur dokumen. Heading 1 adalah tingkat tertinggi (Bab / Judul Bagian Utama), Heading 2 adalah Sub-bab turunan, dan Heading 3 adalah rincian khusus. Dengan menerapkan style ini, Daftar Isi (Table of Contents) dapat dibuat otomatis dalam 1 detik.',
        analogy: 'Heading seperti kerangka tulang rumah. Dinding dan perabotan (paragraf) menempel pada rangka tulang tersebut.',
        officeContext: 'Penyusunan Standard Operating Procedure (SOP) divisi Operasional PT Maju Sejahtera agar staf mudah mencari pasal yang dibutuhkan.',
        keyTerms: ['Heading 1', 'Heading 2', 'Daftar Isi Otomatis', 'Navigation Pane'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Struktur Dokumen yang Rapi',
        explanation: 'Perhatikan dokumen di bawah yang tersusun dari Heading 1, Heading 2, dan paragraf isi.',
        editorType: 'word',
        initialData: {
          word: '<h1>BAB I: STANDAR OPERASIONAL KANTOR</h1><p>Pedoman ini mengatur ketertiban seluruh staf PT Maju Sejahtera.</p><h2>1.1 Jam Masuk dan Kehadiran</h2><p>Staf wajib melakukan absensi sebelum pukul 08.30 WIB setiap hari kerja.</p>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Perhatikan tag <h1> yang mewakili Judul Bab Utama.', targetCode: 'h1', highlightLabel: 'Heading 1' },
          { stepIndex: 1, instruction: 'Tag <h2> digunakan untuk sub-bab Jam Masuk dan Kehadiran.', targetCode: 'h2', highlightLabel: 'Heading 2' },
          { stepIndex: 2, instruction: 'Paragraf di bawahnya menggunakan tag <p> teks normal.', targetCode: 'p', highlightLabel: 'Paragraf Isi' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Sub-Bab Baru',
        instruction: 'Tambahkan sub-bab baru di bawah teks yang ada dengan judul "1.2 Ketentuan Seragam Kerja" menggunakan tag <h2>.',
        editorType: 'word',
        initialData: {
          word: '<h1>PEDOMAN KARYAWAN</h1><p>Ketentuan umum perusahaan.</p>',
        },
        validationHint: 'Ketik <h2>1.2 Ketentuan Seragam Kerja</h2> di baris bawah.',
        expectedOutput: '1.2 Ketentuan Seragam Kerja',
      },
      {
        type: 'kuis',
        title: 'Kuis Struktur Heading',
        questions: [
          {
            id: 'q-w-h-1',
            type: 'pilihan-ganda',
            prompt: 'Apa manfaat paling utama menggunakan Styles Heading 1 dan Heading 2 alih-alih sekadar menebalkan teks manual?',
            options: [
              'Dapat menghasilkan Daftar Isi (Table of Contents) otomatis secara instan dan navigasi cepat',
              'Membuat ukuran kertas berubah jadi A3',
              'Menghemat tinta printer hingga 50%',
              'Otomatis menerjemahkan dokumen ke bahasa asing',
            ],
            correctAnswer: 'Dapat menghasilkan Daftar Isi (Table of Contents) otomatis secara instan dan navigasi cepat',
            explanation: 'Fitur Table of Contents di Word membaca metadata Heading 1, 2, dan 3 untuk menyusun nomor halaman dan judul bab otomatis.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Hierarki Judul',
        points: [
          'Heading 1 untuk Bab Utama, Heading 2 untuk Sub-bab, Heading 3 untuk sub-bagian kecil.',
          'Jangan gunakan Heading hanya untuk memperbesar tulisan sembarangan.',
          'Aktifkan Navigation Pane (Ctrl + F) untuk melihat kerangka dokumen yang rapi.',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Cepat Maya',
        content: 'Pintasan keyboard di Word: Ctrl + Alt + 1 untuk Heading 1, Ctrl + Alt + 2 untuk Heading 2, dan Ctrl + Shift + N untuk kembali ke teks Normal.',
        badge: '⌨️ Shortcuts Word',
      },
    ],
    commonMistakes: [
      'Membesarkan font manual tanpa menerapkan style Heading.',
      'Melompati hierarki, misal dari Heading 1 langsung lompat ke Heading 3 tanpa Heading 2.',
    ],
    glossaryTerms: ['Heading Hierarchy', 'Document Typography'],
    relatedLevels: ['word-t1-01'],
    relatedCaseFiles: ['case-02'],
    cheatSheetId: 'sheet-word-academic-biz',
    isQuickRefresher: true,
  },

  // 2. Document Typography & Emphasis Styling
  {
    id: 'les-word-typography-basics',
    track: 'word',
    tier: 1,
    skillId: 'Document Typography',
    title: 'Tipografi Dokumen & Penekanan Teks Profesional',
    objectives: [
      'Memilih kombinasi font formal kantor (Calibri, Arial, Times New Roman)',
      'Menerapkan Bold, Italic, dan Underline secara tepat fungsi',
      'Mengatur spasi baris (line-spacing) dan perataan Justify',
    ],
    estimatedMinutes: 5,
    prerequisites: [],
    characterIntro: {
      characterId: 'sari',
      dialogue: 'Dokumen kantor yang baik harus enak dibaca mata dalam waktu lama. Jangan gunakan 5 jenis huruf warna-warni seperti poster sirkus! Kesederhanaan dan keteraturan adalah tanda profesionalisme sejati.',
      tip: 'Gunakan Bold untuk kata kunci penting dan Italic untuk istilah asing.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Kaidah Penekanan Teks (Emphasis)',
        content: 'Dalam etika korespondensi kantor: (1) Tebal (Bold) digunakan untuk menegaskan poin kritis atau istilah kunci agar langsung ditangkap saat scanning kilat. (2) Miring (Italic) khusus untuk istilah bahasa asing/daerah (contoh: online shop, cash on delivery) atau judul publikasi. (3) Garis Bawah (Underline) sebaiknya dihindari di era digital karena sering disalahartikan pembaca sebagai tautan link internet.',
        analogy: 'Penekanan teks seperti bumbu masak. Sedikit memberi rasa nikmat, jika kebanyakan malah bikin enek.',
        officeContext: 'Surat edaran direksi mengenai batas waktu pengajuan cuti hari raya.',
        keyTerms: ['Bold', 'Italic', 'Justify', 'Line Spacing'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Menegaskan Batas Waktu',
        explanation: 'Perhatikan kalimat edaran berikut yang menggunakan penebalan pada tanggal dan istilah asing bercetak miring.',
        editorType: 'word',
        initialData: {
          word: '<p>Batas akhir penyerahan berkas adalah <strong>Jumat, 25 April 2026</strong> secara <em>online</em> melalui portal perusahaan.</p>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Kata <strong>Jumat, 25 April 2026</strong> ditebalkan agar pembaca tidak melewatkan tenggat.', targetCode: 'strong', highlightLabel: 'Penegasan Tanggal' },
          { stepIndex: 1, instruction: 'Kata <em>online</em> dicetak miring karena merupakan istilah serapan bahasa Inggris.', targetCode: 'em', highlightLabel: 'Istilah Asing' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Buat Penegasan Kata Kunci',
        instruction: 'Tulis kalimat: "Status laporan: <strong>DISETUJUI</strong> oleh pimpinan."',
        editorType: 'word',
        initialData: {
          word: '<p>Status laporan: DISETUJUI oleh pimpinan.</p>',
        },
        validationHint: 'Bungkus kata DISETUJUI dengan tag <strong>DISETUJUI</strong>.',
        expectedOutput: 'DISETUJUI',
      },
      {
        type: 'kuis',
        title: 'Kuis Etika Tipografi',
        questions: [
          {
            id: 'q-typo-1',
            type: 'pilihan-ganda',
            prompt: 'Kapan format huruf miring (Italic) WAJIB digunakan dalam dokumen formal bahasa Indonesia?',
            options: [
              'Saat menuliskan istilah asing, bahasa daerah, atau nama latin ilmiah',
              'Di setiap kalimat pembuka paragraf',
              'Hanya ketika menulis nominal uang Rupiah',
              'Pada nama seluruh staf kantor',
            ],
            correctAnswer: 'Saat menuliskan istilah asing, bahasa daerah, atau nama latin ilmiah',
            explanation: 'Sesuai Pedoman Umum Ejaan Bahasa Indonesia (PUEBI), huruf miring digunakan untuk menegaskan huruf/kata dari bahasa asing atau daerah.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Tipografi Kantor',
        points: [
          'Maksimal 2 jenis font dalam 1 dokumen.',
          'Tebalkan hanya kata kunci penting, jangan menebalkan seluruh paragraf.',
          'Gunakan huruf miring untuk istilah asing sesuai standar PUEBI.',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Bu Sari',
        content: 'Ratakan paragraf dengan Justify (Ctrl + J) untuk laporan resmi agar tepi kanan dan kiri kertas lurus sejajar.',
        badge: '📑 Rapi & Formal',
      },
    ],
    commonMistakes: [
      'Menebalkan hampir semua kalimat sehingga tidak ada lagi yang menonjol.',
      'Lupa mencetak miring istilah asing.',
    ],
    glossaryTerms: ['Document Typography', 'Emphasis Styling'],
    relatedLevels: ['word-t1-01'],
    relatedCaseFiles: ['case-02'],
    cheatSheetId: 'sheet-word-academic-biz',
  },

  // 3. Margin Standar Akademik (4-3-3-3)
  {
    id: 'les-word-margin-academic',
    track: 'word',
    tier: 1,
    skillId: 'Margin 4-3-3-3',
    title: 'Standarisasi Margin Akademik & Skripsi (4-3-3-3 cm)',
    objectives: [
      'Mengetahui alasan teknis batas kiri 4 cm untuk penjilidan skripsi',
      'Mengatur batas Atas 4 cm, Kiri 4 cm, Bawah 3 cm, Kanan 3 cm',
      'Menghindari terpotongnya huruf saat karya ilmiah dijilid hard cover',
    ],
    estimatedMinutes: 5,
    prerequisites: ['les-word-typography-basics'],
    characterIntro: {
      characterId: 'maya',
      dialogue: 'Pernah dengar cerita mahasiswa yang menangis karena harus mencetak ulang 100 lembar skripsi sebelum sidang? Penyebabnya sepele: margin kirinya cuma 2.5 cm, pas dijilid huruf pertama di tiap baris hilang tertutup lem jilid!',
      tip: 'Kiri dan Atas 4 cm, Kanan dan Bawah 3 cm. Hafalkan rumus 4-3-3-3!',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Alasan Ilmiah di Balik Margin 4-3-3-3',
        content: 'Standar baku karya ilmiah, skripsi, dan tesis di perguruan tinggi Indonesia mengharuskan margin: Kiri (Left) 4 cm, Atas (Top) 4 cm, Kanan (Right) 3 cm, dan Bawah (Bottom) 3 cm. Mengapa kiri 4 cm? Karena proses penjilidan (binding) hard cover memakan ruang sekitar 1 hingga 1.5 cm di tepi kiri kertas. Dengan batas 4 cm, teks yang tersisa tetap memiliki jarak 2.5 cm dari lipatan jilid sehingga sangat nyaman dibaca para penguji.',
        analogy: 'Seperti bingkai lukisan: jika lukisan terlalu mepet ke tepi, bagian gambarnya akan tertutup kayu bingkai.',
        officeContext: 'Penyusunan laporan riset tahunan korporat yang akan dicetak dan dijilid tebal untuk arsip komisaris.',
        keyTerms: ['Margin 4-3-3-3', 'Penjilidan (Binding)', 'Paper Size A4'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Menghitung Ruang Jilid',
        explanation: 'Perhatikan layout proporsional margin 4-3-3-3 pada kertas A4.',
        editorType: 'word',
        initialData: {
          word: '<div style="border-left: 4px solid #059669; padding-left: 12px;"><p><strong>Batas Kiri: 4 cm</strong> (Ruang Jilid Hard Cover Aman)</p><p>Batas Atas: 4 cm | Batas Kanan: 3 cm | Batas Bawah: 3 cm</p></div>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Sisi kiri memiliki ruang paling lapang sebesar 4 cm.', targetCode: 'div', highlightLabel: 'Sisi Kiri 4 cm' },
          { stepIndex: 1, instruction: 'Format kertas resmi selalu menggunakan ukuran A4 (21 x 29.7 cm).', targetCode: 'p', highlightLabel: 'Kertas A4' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Catat Spesifikasi Skripsi',
        instruction: 'Tuliskan spesifikasi batas margin pada dokumen: "<p>Margin Skripsi: Kiri 4cm, Atas 4cm, Kanan 3cm, Bawah 3cm</p>".',
        editorType: 'word',
        initialData: {
          word: '<p>Spesifikasi Dokumen Resmi:</p>',
        },
        validationHint: 'Ketik ukuran 4cm dan 3cm secara lengkap.',
        expectedOutput: 'Kiri 4cm',
      },
      {
        type: 'kuis',
        title: 'Kuis Ketentuan Margin',
        questions: [
          {
            id: 'q-mrg-1',
            type: 'pilihan-ganda',
            prompt: 'Mengapa batas margin KIRI pada skripsi ditetapkan lebih lebar (4 cm) dibandingkan batas kanan (3 cm)?',
            options: [
              'Untuk memberikan ruang penjilidan lem atau benang agar teks tidak tertelan lipatan buku',
              'Karena penulis skripsi biasanya bertangan kidal',
              'Agar dosen pembimbing bisa menggambar di pinggir kertas',
              'Karena printer tidak bisa mencetak di sisi kiri kertas',
            ],
            correctAnswer: 'Untuk memberikan ruang penjilidan lem atau benang agar teks tidak tertelan lipatan buku',
            explanation: 'Proses jilid menjepit 1 - 1.5 cm tepi kiri kertas, sehingga margin 4 cm menjamin keterbacaan naskah setelah dijilid rapi.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Margin Akademik',
        points: [
          'Rumus paten: Kiri 4 cm, Atas 4 cm, Kanan 3 cm, Bawah 3 cm.',
          'Gunakan ukuran kertas baku A4, bukan Letter atau Folio.',
          'Atur di awal sebelum mengetik naskah agar nomor halaman tidak bergeser di akhir.',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Maya',
        content: 'Di Microsoft Word, buka tab Layout → Margins → Custom Margins, lalu ubah satuan ke Centimeters (cm).',
        badge: '🎓 Kiat Skripsi',
      },
    ],
    commonMistakes: [
      'Membiarkan pengaturan bawaan Normal 1 inci (2.54 cm) di semua sisi.',
      'Mengubah ukuran kertas di tengah penulisan yang membuat seluruh tabel berantakan.',
    ],
    glossaryTerms: ['Margin 4-3-3-3', 'Academic Formatting'],
    relatedLevels: ['word-t1-03'],
    relatedCaseFiles: ['case-02'],
    cheatSheetId: 'sheet-word-academic-biz',
  },

  // 4. Action Plan Matrix & Tabel Bisnis
  {
    id: 'les-word-action-matrix',
    track: 'word',
    tier: 2,
    skillId: 'Action Plan Matrix',
    title: 'Matriks Rencana Aksi (Action Plan Table)',
    objectives: [
      'Menyusun tabel komitmen tindak lanjut hasil rapat bisnis',
      'Menerapkan kolom standar RACI: No, Tindakan, PIC, Tenggat, Status',
      'Memastikan akuntabilitas kerja tim tanpa tugas yang mengambang',
    ],
    estimatedMinutes: 7,
    prerequisites: ['les-word-typography-basics'],
    characterIntro: {
      characterId: 'sari',
      dialogue: 'Rapat tanpa tabel rencana aksi hanyalah ajang kumpul-kumpul ngobrol buang waktu! Di PT Maju Sejahtera, setiap butir keputusan wajib punya nama orang penanggung jawab dan tanggal pasti.',
      tip: 'Jangan pernah menulis PIC "Semua Tim" atau "Tim IT". Sebutkan nama individu yang memegang tanggung jawab.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Kekuatan Tabel Matriks Rencana Aksi',
        content: 'Dalam tata kelola perusahaan modern, kesepakatan rapat dituangkan dalam tabel Action Plan. Kolom wajib terdiri dari: (1) Nomor Urut, (2) Deskripsi Tindakan Nyata (dimulai kata kerja aktif: "Perbaiki...", "Kirim...", "Beli..."), (3) PIC (Person in Charge - nama individu), (4) Tenggat Waktu (Due Date spesifik), dan (5) Indikator Keberhasilan / Status. Format tabel membuat eksekutif dapat memantau progres dalam sekejap mata.',
        analogy: 'Seperti tiket penerbangan: ada nama penumpang, nomor kursi, dan jam terbang pasti. Tidak ada tiket yang bertuliskan "terbang kapan-kapan".',
        officeContext: 'Tindak lanjut audit keselamatan gudang dan sistem logistik PT Maju Sejahtera.',
        keyTerms: ['Action Plan Matrix', 'PIC (Person in Charge)', 'Due Date'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Format Tabel Eksekutif',
        explanation: 'Perhatikan susunan tabel rencana aksi berikut dengan penanggung jawab yang tegas.',
        editorType: 'word',
        initialData: {
          word: '<table border="1" style="width: 100%; border-collapse: collapse;"><thead><tr style="background: #f1f5f9;"><th>No</th><th>Tindakan Nyata</th><th>PIC</th><th>Tenggat</th></tr></thead><tbody><tr><td>1</td><td>Pengadaan 5 unit Barcode Scanner</td><td>Hendra (Gudang)</td><td>20 Apr 2026</td></tr><tr><td>2</td><td>Update Query Database Kasir</td><td>Kak Intan (IT)</td><td>22 Apr 2026</td></tr></tbody></table>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Header tabel diberi latar belakang kontras abu-abu terang.', targetCode: 'thead', highlightLabel: 'Header Tabel' },
          { stepIndex: 1, instruction: 'Setiap baris mencantumkan nama PIC spesifik bukan nama grup abstrak.', targetCode: 'tbody', highlightLabel: 'PIC Jelas' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Baris Tindak Lanjut',
        instruction: 'Tambahkan baris tugas baru di tabel: No: 3, Tindakan: Sosialisasi SOP Cuti, PIC: Maya (HR), Tenggat: 25 Apr 2026.',
        editorType: 'word',
        initialData: {
          word: '<table border="1"><tr><th>No</th><th>Tindakan</th><th>PIC</th><th>Tenggat</th></tr><tr><td>1</td><td>Audit Kasir</td><td>Dimas</td><td>18 Apr</td></tr></table>',
        },
        validationHint: 'Tambahkan baris <tr><td>3</td><td>Sosialisasi SOP Cuti</td><td>Maya (HR)</td><td>25 Apr 2026</td></tr>',
        expectedOutput: 'Sosialisasi SOP Cuti',
      },
      {
        type: 'kuis',
        title: 'Kuis Akuntabilitas Bisnis',
        questions: [
          {
            id: 'q-act-1',
            type: 'pilihan-ganda',
            prompt: 'Mengapa kolom PIC dalam tabel Action Plan TIDAK boleh diisi "Semua Anggota Divisi"?',
            options: [
              'Karena jika semua orang bertanggung jawab, maka tidak ada satu orang pun yang merasa bertanggung jawab saat tugas gagal',
              'Karena kolomnya tidak cukup panjang untuk memuat banyak nama',
              'Karena komputer akan menolak menyimpannya',
              'Karena aturan pajak melarang nama jamak',
            ],
            correctAnswer: 'Karena jika semua orang bertanggung jawab, maka tidak ada satu orang pun yang merasa bertanggung jawab saat tugas gagal',
            explanation: 'Prinsip manajemen modern: satu tugas harus memiliki satu lead PIC tunggal yang bertindak sebagai pengambil keputusan utama.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Tabel Action Plan',
        points: [
          'Gunakan kata kerja aktif untuk mendeskripsikan tindakan.',
          'PIC harus individu tunggal yang dapat dimintai pertanggungjawaban.',
          'Tenggat waktu harus berupa tanggal kalender pasti, bukan kata ambigu seperti "segera".',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Bu Sari',
        content: 'Beri warna status: Hijau (Selesai), Kuning (Dalam Proses), Merah (Terlambat) untuk memudahkan pemantauan mingguan.',
        badge: '🎯 Manajemen Eksekutif',
      },
    ],
    commonMistakes: [
      'Menulis tenggat "secepatnya" atau "ASAP" tanpa tanggal pasti.',
      'Tidak mencantumkan nomor kontak atau jabatan PIC.',
    ],
    glossaryTerms: ['Action Plan Matrix', 'Table Creation', 'Executive Minutes'],
    relatedLevels: ['word-t1-02'],
    relatedCaseFiles: ['case-02'],
    cheatSheetId: 'sheet-word-academic-biz',
  },
  // 5. Emphasis Styling
  {
    id: 'les-word-emphasis-styling',
    track: 'word',
    tier: 1,
    skillId: 'Emphasis Styling',
    title: 'Penekanan Gaya & Sorotan Visual Dokumen',
    objectives: [
      'Menyorot klausul kritis kontrak kerja menggunakan format penekanan',
      'Menerapkan batas tebal pada angka nominal perjanjian',
      'Menjaga konsistensi gaya teks dalam seluruh bab',
    ],
    estimatedMinutes: 6,
    prerequisites: ['les-word-typography-basics'],
    characterIntro: {
      characterId: 'maya',
      dialogue: 'Dalam surat perjanjian kerja sama, bagian klausul sanksi dan nilai kontrak wajib memiliki penekanan visual agar kedua belah pihak tidak melewatkan pasal penting.',
      tip: 'Gunakan <strong> pada nominal uang dan batas waktu.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Teknik Penekanan Visual (Emphasis)',
        content: 'Emphasis styling adalah teknik tipografi untuk mengarahkan mata pembaca ke bagian dokumen yang paling penting. Di Microsoft Word, gunakan penekanan tebal (Bold) untuk nominal kontrak dan tanggal, garis bawah khusus untuk tautan atau judul tertentu, dan kotak sorot (Callout Box) untuk klausul peringatan.',
        analogy: 'Seperti spidol stabilo pada tumpukan fotokopi berkas: menandai kata kunci yang menentukan keputusan.',
        officeContext: 'Surat perjanjian sewa ruang kantor cabang PT Maju Sejahtera.',
        keyTerms: ['Emphasis', 'Callout Box', 'Kontras Visual'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Penekanan Klausul Kontrak',
        explanation: 'Perhatikan penekanan nominal Rp 50.000.000 dengan teks tebal.',
        editorType: 'word',
        initialData: {
          word: '<p>Total kompensasi disepakati sebesar <strong>Rp 50.000.000</strong> (lima puluh juta rupiah).</p>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Nominal uang ditebalkan agar menjadi fokus utama pembaca.', targetCode: 'strong', highlightLabel: 'Teks Tebal' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Buat Penekanan Batas',
        instruction: 'Tulis kalimat: "<p>Perjanjian berlaku sampai <strong>31 Desember 2026</strong>.</p>".',
        editorType: 'word',
        initialData: {
          word: '<p>Perjanjian berlaku sampai 31 Desember 2026.</p>',
        },
        validationHint: 'Bungkus tanggal 31 Desember 2026 dengan <strong>.',
        expectedOutput: '31 Desember 2026',
      },
      {
        type: 'kuis',
        title: 'Kuis Penekanan Dokumen',
        questions: [
          {
            id: 'q-emp-1',
            type: 'pilihan-ganda',
            prompt: 'Kapan teknik penekanan Bold paling efektif digunakan?',
            options: [
              'Pada nominal uang, tanggal batas waktu, dan klausul hukum kritis',
              'Pada seluruh kalimat dalam paragraf',
              'Hanya pada spasi kosong',
              'Pada tanda titik koma',
            ],
            correctAnswer: 'Pada nominal uang, tanggal batas waktu, dan klausul hukum kritis',
            explanation: 'Penekanan yang selektif membantu pembaca menangkap fakta penting secara cepat tanpa kelelahan mata.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Penekanan Gaya',
        points: [
          'Tebalkan fakta angka dan tanggal penting.',
          'Gunakan huruf miring untuk istilah asing sesuai PUEBI.',
          'Hindari mewarnai teks dengan warna-warni non-standar.',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Maya',
        content: 'Gunakan shortcut Ctrl + B untuk Bold dan Ctrl + I untuk Italic agar mengetik dokumen lebih lincah!',
        badge: '⚡ Keyboard Mastery',
      },
    ],
    commonMistakes: [
      'Menebalkan seluruh isi paragraf sehingga efek penekanannya hilang.',
    ],
    glossaryTerms: ['Emphasis Styling', 'Document Typography'],
    relatedLevels: ['word-t1-01'],
    relatedCaseFiles: ['case-02'],
    cheatSheetId: 'sheet-word-academic-biz',
  },
  // 6. Table Creation
  {
    id: 'les-word-table-creation',
    track: 'word',
    tier: 2,
    skillId: 'Table Creation',
    title: 'Pembuatan & Penataan Tabel Bisnis',
    objectives: [
      'Menyusun struktur baris, kolom, dan sel tabel dokumen',
      'Mengatur header tabel agar berulang di setiap halaman (Repeat Header Rows)',
      'Menyesuaikan lebar kolom dan perataan teks dalam sel',
    ],
    estimatedMinutes: 7,
    prerequisites: ['les-word-typography-basics'],
    characterIntro: {
      characterId: 'dimas',
      dialogue: 'Tabel yang rapi bikin data serumit apapun enak dilihat. Tapi awas jangan biarkan garis tabel berantakan atau teks angka mepet tanpa spasi!',
      tip: 'Header tabel di baris paling atas wajib kontras dan jelas.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Prinsip Desain Tabel Laporan',
        content: 'Tabel dalam naskah Word menyajikan matriks perbandingan data. Aturan baku: (1) Baris pertama adalah Header dengan teks tebal dan latar abu-abu/berwarna kontras, (2) Kolom teks deskripsi rata kiri, (3) Kolom angka dan nominal selalu rata kanan, (4) Berikan padding ruang dalam sel agar teks tidak menabrak garis tepi.',
        analogy: 'Seperti etalase toko bertingkat: label kategori di atas, barang tersusun rapi di raknya masing-masing.',
        officeContext: 'Daftar rincian anggaran pengadaan perlengkapan kantor baru.',
        keyTerms: ['Table Header', 'Row & Column', 'Cell Alignment'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Tabel Rata Rapi',
        explanation: 'Perhatikan tabel berikut dengan header abu-abu dan data yang selaras.',
        editorType: 'word',
        initialData: {
          word: '<table border="1" style="width: 100%; border-collapse: collapse;"><tr><th>Barang</th><th>Jumlah</th></tr><tr><td>Kertas A4</td><td>10 Rim</td></tr></table>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Tag <th> mewakili sel header tebal di baris atas.', targetCode: 'th', highlightLabel: 'Header Sel' },
          { stepIndex: 1, instruction: 'Tag <td> adalah sel data isi di bawahnya.', targetCode: 'td', highlightLabel: 'Data Sel' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Baris Data',
        instruction: 'Tambahkan baris data kedua di tabel: "<tr><td>Spidol</td><td>5 Pcs</td></tr>".',
        editorType: 'word',
        initialData: {
          word: '<table border="1"><tr><th>Barang</th><th>Qty</th></tr><tr><td>Kertas</td><td>10</td></tr></table>',
        },
        validationHint: 'Tambahkan baris Spidol di dalam tabel.',
        expectedOutput: 'Spidol',
      },
      {
        type: 'kuis',
        title: 'Kuis Format Tabel',
        questions: [
          {
            id: 'q-tbl-1',
            type: 'pilihan-ganda',
            prompt: 'Bagaimana standar perataan teks yang tepat untuk kolom angka/nominal dalam tabel bisnis?',
            options: ['Rata Kanan (Right Align)', 'Rata Kiri (Left Align)', 'Rata Tengah (Center)', 'Teks Terbalik'],
            correctAnswer: 'Rata Kanan (Right Align)',
            explanation: 'Angka nominal selalu rata kanan agar nilai digit satuan, puluhan, dan ribuan lurus sejajar ke bawah.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Tabel Profesional',
        points: [
          'Header tabel wajib tebal dan kontras.',
          'Deskripsi teks rata kiri, nominal angka rata kanan.',
          'Gunakan lebar kolom yang proporsional sesuai panjang data.',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Dimas',
        content: 'Aktifkan opsi "Repeat as header row at the top of each page" agar saat tabelmu memanjang ke halaman 2, judul kolomnya tetap muncul di atas!',
        badge: '📄 Multi-page Table',
      },
    ],
    commonMistakes: [
      'Membuat angka rata kiri sehingga sulit membedakan jutaan dan ratusan ribu.',
    ],
    glossaryTerms: ['Table Creation', 'Action Plan Matrix'],
    relatedLevels: ['word-t1-02'],
    relatedCaseFiles: ['case-02'],
    cheatSheetId: 'sheet-word-academic-biz',
  },
  // 7. Executive Minutes
  {
    id: 'les-word-executive-minutes',
    track: 'word',
    tier: 2,
    skillId: 'Executive Minutes',
    title: 'Penyusunan Notulen Rapat Eksekutif (Board Minutes)',
    objectives: [
      'Menyusun dokumen notulen rapat resmi berstandar dewan direksi',
      'Memisahkan bagian pembukaan, agenda, poin diskusi, dan keputusan akhir',
      'Mencantumkan tanda tangan pimpinan rapat dan notulis sah',
    ],
    estimatedMinutes: 8,
    prerequisites: ['les-word-action-matrix'],
    characterIntro: {
      characterId: 'sari',
      dialogue: 'Notulen rapat dewan direksi adalah dokumen hukum perusahaan. Jika terjadi sengketa atau audit, notulen inilah yang menjadi bukti sah keputusan bisnis.',
      tip: 'Catat keputusan yang disepakati, bukan perdebatan kata per kata yang tidak perlu.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Struktur Formal Notulen Eksekutif',
        content: 'Notulen eksekutif memuat: (1) Kepala Surat & Nomor Notulen, (2) Metadata: Hari, Tanggal, Waktu, Tempat, Pimpinan, dan Notulis, (3) Agenda Rapat, (4) Ringkasan Pembahasan & Keputusan Bulat, (5) Matriks Rencana Aksi (Action Plan), dan (6) Kolom Pengesahan Tanda Tangan Notulis dan Pimpinan Rapat.',
        analogy: 'Seperti akta notaris: mencatat kesepakatan resmi yang mengikat semua peserta yang hadir.',
        officeContext: 'Rapat pleno penutupan buku anggaran tahunan PT Maju Sejahtera.',
        keyTerms: ['Notulen Eksekutif', 'Metadata Rapat', 'Kolom Pengesahan'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Format Kepala Notulen',
        explanation: 'Perhatikan format metadata dan nomor surat resmi pada notulen di bawah.',
        editorType: 'word',
        initialData: {
          word: '<h1>NOTULEN RAPAT DIREKSI</h1><p>Nomor: NOT/2026/10/DIR-01</p><p>Hari/Tanggal: <strong>Senin, 26 Oktober 2026</strong></p><p>Pimpinan Rapat: Bu Sari (Direktur Operasional)</p>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Judul dan nomor arsip tercantum jelas di bagian atas.', targetCode: 'h1', highlightLabel: 'Judul Notulen' },
          { stepIndex: 1, instruction: 'Metadata pimpinan dan tanggal disajikan rapi.', targetCode: 'p', highlightLabel: 'Metadata' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Lengkapi Nama Notulis',
        instruction: 'Tambahkan baris notulis: "<p>Notulis: Dimas Pratama</p>" di bawah teks.',
        editorType: 'word',
        initialData: {
          word: '<h1>NOTULEN KOORDINASI</h1><p>Pimpinan: Bu Sari</p>',
        },
        validationHint: 'Ketik <p>Notulis: Dimas Pratama</p>.',
        expectedOutput: 'Dimas Pratama',
      },
      {
        type: 'kuis',
        title: 'Kuis Notulen Eksekutif',
        questions: [
          {
            id: 'q-not-1',
            type: 'pilihan-ganda',
            prompt: 'Apakah notulis harus mencatat setiap kata candaan dan debat emosional peserta rapat?',
            options: [
              'Tidak, notulis hanya mencatat intisari masalah, opsi solusi, dan butir keputusan final yang disepakati',
              'Ya, semua kata termasuk batuk dan bersin harus dicatat',
              'Cukup catat nama orang yang paling galak',
              'Tidak perlu mencatat apapun',
            ],
            correctAnswer: 'Tidak, notulis hanya mencatat intisari masalah, opsi solusi, dan butir keputusan final yang disepakati',
            explanation: 'Notulen profesional berfokus pada hasil keputusan (actionable decisions) dan komitmen waktu, bukan percakapan santai.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Notulen Eksekutif',
        points: [
          'Wajib memuat metadata rapat lengkap (tanggal, jam, tempat, pimpinan).',
          'Fokus pada keputusan dan Action Plan, bukan transkrip kata demi kata.',
          'Harus disahkan oleh tanda tangan pimpinan rapat.',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Bu Sari',
        content: 'Kirim draf notulen maksimal 1x24 jam setelah rapat selesai agar ingatan peserta masih segar dan komitmen langsung berjalan!',
        badge: '⏱️ Kecepatan Eksekusi',
      },
    ],
    commonMistakes: [
      'Menunda penulisan notulen berhari-hari sehingga lupa poin penting kesepakatan.',
    ],
    glossaryTerms: ['Executive Minutes', 'Action Plan Matrix'],
    relatedLevels: ['word-t1-02'],
    relatedCaseFiles: ['case-02'],
    cheatSheetId: 'sheet-word-academic-biz',
  },
  // 8. Academic Formatting
  {
    id: 'les-word-academic-formatting',
    track: 'word',
    tier: 3,
    skillId: 'Academic Formatting',
    title: 'Format Akademik Indonesia & Tata Tulis Ilmiah',
    objectives: [
      'Menerapkan pedoman umum tata tulis karya ilmiah (Pedoman Skripsi)',
      'Mengatur font Times New Roman 12 pt dengan spasi 1.5 atau 2.0',
      'Mengatur jarak antar bab dan paragraf sesuai kaidah perguruan tinggi',
    ],
    estimatedMinutes: 7,
    prerequisites: ['les-word-margin-academic'],
    characterIntro: {
      characterId: 'maya',
      dialogue: 'Format karya tulis ilmiah Indonesia punya aturan ketat: font Times New Roman ukuran 12, spasi 1.5, dan teks rata kiri-kanan (Justify). Melewati satu aturan saja bisa bikin draf skripsimu dicoret dosen pembimbing!',
      tip: 'Gunakan paragraf Justify (Ctrl + J) dan indentasi baris pertama 1 cm.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Kaidah Format Ilmiah Indonesia',
        content: 'Karya tulis ilmiah (skripsi, tesis, laporan PKL) di Indonesia mensyaratkan: (1) Kertas A4 80 gram, (2) Font Times New Roman 12 pt, (3) Spasi baris 1.5 atau 2.0 (Double), (4) Paragraf Justify (rata kanan-kiri), (5) Awal paragraf menjorok ke dalam (First Line Indent) sebesar 1 cm atau 5 ketukan spasi, (6) Penomoran bab menggunakan angka Romawi (BAB I, BAB II).',
        analogy: 'Seperti seragam dinas upacara bendera: semua kancing, dasi, dan sepatu harus simetris dan seragam sesuai protokol.',
        officeContext: 'Penyusunan laporan magang mahasiswa magang universitas di PT Maju Sejahtera.',
        keyTerms: ['Times New Roman 12pt', 'Spasi 1.5', 'First Line Indent', 'Format Skripsi'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Format Teks Ilmiah Bab 1',
        explanation: 'Perhatikan format formal bab dan paragraf berikut.',
        editorType: 'word',
        initialData: {
          word: '<h1 style="text-align: center;">BAB I<br>PENDAHULUAN</h1><h2>1.1 Latar Belakang</h2><p style="text-align: justify; line-height: 1.5;">Perkembangan teknologi informasi mendorong modernisasi administrasi perkantoran modern.</p>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Judul BAB I diletakkan di tengah (Center) dengan huruf kapital.', targetCode: 'h1', highlightLabel: 'Judul Tengah' },
          { stepIndex: 1, instruction: 'Sub-bab 1.1 diletakkan di tepi kiri.', targetCode: 'h2', highlightLabel: 'Sub-bab Kiri' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Buat Rumusan Masalah',
        instruction: 'Tambahkan sub-bab baru: "<h2>1.2 Rumusan Masalah</h2>" di bawah teks.',
        editorType: 'word',
        initialData: {
          word: '<h1>BAB I PENDAHULUAN</h1><h2>1.1 Latar Belakang</h2><p>Teks pengantar.</p>',
        },
        validationHint: 'Ketik <h2>1.2 Rumusan Masalah</h2>.',
        expectedOutput: '1.2 Rumusan Masalah',
      },
      {
        type: 'kuis',
        title: 'Kuis Format Akademik',
        questions: [
          {
            id: 'q-acad-1',
            type: 'pilihan-ganda',
            prompt: 'Berapakah ukuran huruf (font size) standar untuk teks isi naskah skripsi di Indonesia?',
            options: ['12 pt (Times New Roman)', '10 pt', '14 pt', '16 pt'],
            correctAnswer: '12 pt (Times New Roman)',
            explanation: 'Standar baku naskah ilmiah nasional adalah font Times New Roman ukuran 12 pt.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Format Akademik',
        points: [
          'Font Times New Roman 12 pt, spasi 1.5.',
          'Teks paragraf wajib rata kiri-kanan (Justify).',
          'Judul Bab di tengah (Center), Sub-bab di tepi kiri.',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Maya',
        content: 'Selalu simpan template gaya (Styles) skripsimu agar tidak perlu mengatur ulang spasi dan ukuran font setiap kali membuka bab baru!',
        badge: '🎓 Kiat Kelulusan',
      },
    ],
    commonMistakes: [
      'Lupa mengatur teks menjadi Justify sehingga tepi kanan kertas bergerigi tidak rapi.',
    ],
    glossaryTerms: ['Academic Formatting', 'Margin 4-3-3-3', 'Thesis Structure'],
    relatedLevels: ['word-t1-03'],
    relatedCaseFiles: ['case-02'],
    cheatSheetId: 'sheet-word-academic-biz',
  },
  // 9. Citation Styles
  {
    id: 'les-word-citation-styles',
    track: 'word',
    tier: 3,
    skillId: 'Citation Styles',
    title: 'Standar Sitasi, Catatan Kaki (Footnote) & Daftar Pustaka',
    objectives: [
      'Memahami etika anti-plagiarisme dalam dokumen resmi dan karya ilmiah',
      'Menulis sitasi gaya penomoran [1] atau gaya APA (Nama, Tahun)',
      'Menyisipkan catatan kaki (Footnote) di bagian bawah halaman dokumen',
    ],
    estimatedMinutes: 7,
    prerequisites: ['les-word-academic-formatting'],
    characterIntro: {
      characterId: 'maya',
      dialogue: 'Mengutip data riset orang lain tanpa mencantumkan sumber adalah pelanggaran hak cipta berat! Di dunia profesional dan akademik, setiap data eksternal wajib diberi sitasi atau catatan kaki.',
      tip: 'Gunakan penomoran superskrip [1] untuk merujuk ke daftar pustaka.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Etika Pengutipan & Sitasi Ilmiah',
        content: 'Sitasi adalah pengakuan formal terhadap sumber rujukan yang kita gunakan. Dua gaya paling umum di Indonesia: (1) Gaya IEEE / Vancouver (Penomoran [1], [2] pada akhir kalimat), dan (2) Gaya APA (American Psychological Association) dalam format (Pratama, 2026). Catatan kaki (Footnote) ditempatkan di dasar halaman untuk memberikan keterangan tambahan tanpa mengganggu alur paragraf utama.',
        analogy: 'Seperti mencantumkan kredit foto di media massa: menghormati pembuat karya aslinya.',
        officeContext: 'Penyusunan laporan survei kepuasan pelanggan dengan mengutip data Badan Pusat Statistik (BPS).',
        keyTerms: ['Sitasi', 'Catatan Kaki (Footnote)', 'Daftar Pustaka', 'Anti-Plagiarisme'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Menyisipkan Sitasi [1]',
        explanation: 'Perhatikan kalimat berikut yang merujuk pada sumber riset nomor 1 menggunakan penomoran [1].',
        editorType: 'word',
        initialData: {
          word: '<p>Tingkat adopsi teknologi cloud di Asia Tenggara meningkat 35% pada tahun 2026 <sup>[1]</sup>.</p><p><small>[1] Laporan Transformasi Digital Bappenas, 2026.</small></p>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Penanda <sup>[1]</sup> merujuk ke sumber nomor 1.', targetCode: 'sup', highlightLabel: 'Nomor Sitasi' },
          { stepIndex: 1, instruction: 'Daftar sumber dicantumkan di bawah.', targetCode: 'small', highlightLabel: 'Keterangan Sumber' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Sisipkan Sitasi',
        instruction: 'Tuliskan kutipan: "<p>Automasi kantor menghemat 40% waktu kerja <sup>[2]</sup>.</p>".',
        editorType: 'word',
        initialData: {
          word: '<p>Automasi kantor menghemat 40% waktu kerja.</p>',
        },
        validationHint: 'Tambahkan penanda sitasi <sup>[2]</sup> di akhir kalimat.',
        expectedOutput: '[2]',
      },
      {
        type: 'kuis',
        title: 'Kuis Etika Pengutipan',
        questions: [
          {
            id: 'q-cit-1',
            type: 'pilihan-ganda',
            prompt: 'Mengapa mencantumkan sitasi sumber rujukan sangat wajib dalam penulisan ilmiah dan dokumen korporat?',
            options: [
              'Untuk mencegah tuduhan plagiarisme dan membuktikan bahwa data yang disajikan berdasar fakta valid',
              'Agar dokumen terlihat lebih tebal halamannya',
              'Karena tinta printer lebih awet',
              'Supaya tidak perlu menulis kesimpulan',
            ],
            correctAnswer: 'Untuk mencegah tuduhan plagiarisme dan membuktikan bahwa data yang disajikan berdasar fakta valid',
            explanation: 'Sitasi memberikan integritas ilmiah dan transparansi pertanggungjawaban intelektual pada dokumen.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Sitasi',
        points: [
          'Setiap data atau klaim dari pihak luar wajib memiliki sumber rujukan.',
          'Pilih salah satu gaya sitasi (IEEE penomoran atau APA) dan gunakan konsisten.',
          'Pastikan semua nomor sitasi tercantum di Daftar Pustaka bagian akhir.',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Maya',
        content: 'Di Microsoft Word, buka tab References   Insert Footnote (Ctrl + Alt + F) untuk memasukkan catatan kaki instan!',
        badge: '📚 Footnote Cepat',
      },
    ],
    commonMistakes: [
      'Mencantumkan nomor sitasi di teks tetapi lupa menuliskan sumbernya di daftar pustaka.',
    ],
    glossaryTerms: ['Citation Styles', 'Academic Formatting'],
    relatedLevels: ['word-t1-03'],
    relatedCaseFiles: ['case-02'],
    cheatSheetId: 'sheet-word-academic-biz',
  },
  // 10. Thesis Structure
  {
    id: 'les-word-thesis-structure',
    track: 'word',
    tier: 3,
    skillId: 'Thesis Structure',
    title: 'Sistematika Skripsi Lengkap: Bab 1 Hingga Penutup',
    objectives: [
      'Memahami urutan baku 5 bab karya ilmiah Indonesia (Bab 1 s.d. Bab 5)',
      'Menyusun bagian Latar Belakang, Rumusan Masalah, dan Tujuan Penelitian',
      'Mengatur penomoran halaman Romawi (i, ii, iii) pada bagian awal dan angka pada bab isi',
    ],
    estimatedMinutes: 8,
    prerequisites: ['les-word-citation-styles'],
    characterIntro: {
      characterId: 'maya',
      dialogue: 'Sistematika skripsi di Indonesia memiliki cetak biru yang baku: Bab 1 Pendahuluan, Bab 2 Tinjauan Pustaka, Bab 3 Metodologi, Bab 4 Hasil & Pembahasan, dan Bab 5 Penutup. Menguasai struktur ini membuatmu percaya diri menyelesaikan karya ilmiah.',
      tip: 'Bagian depan (kata pengantar, daftar isi) memakai angka Romawi kecil (i, ii), sedangkan Bab 1 ke belakang memakai angka Arab (1, 2, 3).',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Anatomi 5 Bab Standar Skripsi Nasional',
        content: 'Sistematika baku terdiri dari: (1) Bagian Awal: Halaman Judul, Lembar Pengesahan, Abstrak, Kata Pengantar, Daftar Isi. (2) BAB I PENDAHULUAN: Latar Belakang, Rumusan Masalah, Tujuan, Manfaat Penelitian. (3) BAB II TINJAUAN PUSTAKA: Landasan Teori dan Kerangka Pikir. (4) BAB III METODE PENELITIAN: Desain, Populasi, Teknik Pengumpulan Data. (5) BAB IV HASIL DAN PEMBAHASAN. (6) BAB V PENUTUP: Simpulan dan Saran. Gunakan fitur Section Break untuk memisahkan penomoran halaman Romawi dan angka.',
        analogy: 'Seperti jalan tol: ada pintu gerbang masuk (Pendahuluan), jalur utama (Pembahasan), dan gerbang keluar (Kesimpulan).',
        officeContext: 'Penyusunan laporan riset pasar komprehensif untuk peluncuran unit bisnis baru.',
        keyTerms: ['Section Break', 'Sistematika Skripsi', 'Rumusan Masalah', 'Abstrak'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Struktur Bab 1 Baku',
        explanation: 'Perhatikan kerangka Bab 1 dengan sub-bab 1.1 dan 1.2 di bawah.',
        editorType: 'word',
        initialData: {
          word: '<h1 style="text-align: center;">BAB I PENDAHULUAN</h1><h2>1.1 Latar Belakang Masalah</h2><p>Uraian fenomena dan fakta data.</p><h2>1.2 Rumusan Masalah</h2><p>Pertanyaan kunci penelitian.</p>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'BAB I Pendahuluan menggunakan Heading 1 rata tengah.', targetCode: 'h1', highlightLabel: 'Bab Utama' },
          { stepIndex: 1, instruction: 'Latar Belakang (1.1) dan Rumusan Masalah (1.2) menggunakan Heading 2.', targetCode: 'h2', highlightLabel: 'Sub-bab Resmi' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Tujuan Penelitian',
        instruction: 'Tambahkan sub-bab baru: "<h2>1.3 Tujuan Penelitian</h2>" di bawah rumusan masalah.',
        editorType: 'word',
        initialData: {
          word: '<h1>BAB I PENDAHULUAN</h1><h2>1.1 Latar Belakang</h2><p>Isi.</p><h2>1.2 Rumusan Masalah</h2><p>Isi.</p>',
        },
        validationHint: 'Ketik <h2>1.3 Tujuan Penelitian</h2>.',
        expectedOutput: '1.3 Tujuan Penelitian',
      },
      {
        type: 'kuis',
        title: 'Kuis Sistematika Ilmiah',
        questions: [
          {
            id: 'q-the-1',
            type: 'pilihan-ganda',
            prompt: 'Fitur Microsoft Word apa yang wajib digunakan untuk membedakan nomor halaman Romawi (i, ii) di halaman depan dan angka biasa (1, 2) di Bab 1?',
            options: ['Section Break (Next Page)', 'Page Break biasa', 'Mengganti nama file', 'Menghapus spasi'],
            correctAnswer: 'Section Break (Next Page)',
            explanation: 'Section Break membagi dokumen menjadi beberapa bagian independen sehingga format header, footer, dan nomor halaman bisa berbeda.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Sistematika Skripsi',
        points: [
          '5 Bab baku: Pendahuluan, Teori, Metodologi, Pembahasan, Penutup.',
          'Gunakan Section Break untuk memisahkan penomoran halaman Romawi dan angka.',
          'Rumusan masalah harus sejalan dengan tujuan dan kesimpulan akhir.',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Maya',
        content: 'Matikan opsi "Link to Previous" pada footer Bab 1 setelah membuat Section Break agar nomor halaman Romawi di kata pengantar tidak menular ke Bab 1!',
        badge: '💡 Trik Footer Word',
      },
    ],
    commonMistakes: [
      'Memakai Page Break biasa sehingga nomor halaman depan tidak bisa diubah jadi Romawi secara terpisah.',
    ],
    glossaryTerms: ['Thesis Structure', 'Academic Formatting', 'Heading Hierarchy'],
    relatedLevels: ['word-t1-03'],
    relatedCaseFiles: ['case-02'],
    cheatSheetId: 'sheet-word-academic-biz',
  },
];
