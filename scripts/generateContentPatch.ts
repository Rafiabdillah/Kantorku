/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu Content Patch Generator (PRD v8 / P3 Completion)
 * Generates:
 * 1. Web Lessons Patch (src/content/lessons/webLessonsPatch.ts)
 * 2. Coding Lessons Patch (src/content/lessons/codingLessonsPatch.ts)
 * 3. Word Lessons Patch (src/content/lessons/wordLessonsPatch.ts)
 * 4. Web Levels (src/content/levelsWeb.ts)
 * 5. Coding Levels (src/content/levelsCoding.ts)
 * 6. Word Levels (src/content/levelsWord.ts)
 * 7. Integrations in lessons/index.ts, levels.ts, and caseFiles.ts
 */

import fs from 'fs';
import path from 'path';

console.log('Writing KantorKu Content Patch files...');

// -------------------------------------------------------------
// 1. Web Lessons Patch
// -------------------------------------------------------------
const webLessonsPatchContent = `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Pelajaran Web Tambahan (Tier 1-3 Batch B)
 */
import { Lesson } from '../../features/learning/types';

export const WEB_LESSONS_PATCH: Lesson[] = [
  {
    id: 'les-web-semantic-nav',
    track: 'web',
    tier: 1,
    skillId: 'Semantic Navigation',
    title: 'Navigasi Web Semantik & Hyperlink',
    objectives: [
      'Menyusun menu navigasi dengan tag <nav> dan daftar <ul>',
      'Menggunakan hyperlink <a> dengan atribut href yang tepat',
      'Membangun tautan internal dan eksternal ramah aksesibilitas',
    ],
    estimatedMinutes: 6,
    prerequisites: ['les-web-html-structure'],
    characterIntro: {
      characterId: 'intan',
      dialogue: 'Navigasi semantik memakai <nav> memudahkan pembaca layar dan pengunjung berpindah antar bagian halaman dengan cepat.',
      tip: 'Bungkus list tautan <a> di dalam <ul> dan <li> di dalam tag <nav>.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Prinsip Navigasi Semantik',
        content: 'Dalam standar HTML5, navigasi situs harus dibungkus dalam tag <nav>. Setiap item menu diletakkan dalam list tak berurut (<ul> dan <li>) dengan tautan <a>.',
        analogy: 'Seperti denah direktori di lobi gedung kantor yang menunjukkan ruangan di tiap lantai.',
        officeContext: 'Menu navigasi portal layanan internal PT Maju Sejahtera.',
        keyTerms: ['<nav>', '<ul>', '<li>', '<a href="...">'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Struktur Navigasi Bersih',
        explanation: 'Perhatikan susunan tag semantik untuk bilah navigasi di bawah.',
        editorType: 'web',
        initialData: {
          html: '<nav class="menu-bar">\\n  <ul>\\n    <li><a href="#beranda">Beranda</a></li>\\n    <li><a href="#layanan">Layanan</a></li>\\n    <li><a href="#kontak">Kontak</a></li>\\n  </ul>\\n</nav>',
          css: 'nav ul { display: flex; gap: 16px; list-style: none; padding: 0; }\\nnav a { text-decoration: none; color: #2563eb; }',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Tag <nav> membungkus seluruh menu navigasi.', targetCode: '<nav class="menu-bar">', highlightLabel: 'Nav Tag' },
          { stepIndex: 1, instruction: 'Tag <ul> dan <li> mengorganisir item secara semantik.', targetCode: '<ul>', highlightLabel: 'List' },
          { stepIndex: 2, instruction: 'Tag <a> menentukan alamat tujuan tautan.', targetCode: '<a href="#beranda">', highlightLabel: 'Hyperlink' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Menu Bantuan',
        instruction: 'Tambahkan elemen <li><a href="#bantuan">Bantuan</a></li> di dalam tag <ul>.',
        editorType: 'web',
        initialData: {
          html: '<nav>\\n  <ul>\\n    <li><a href="#home">Home</a></li>\\n    <!-- Tambahkan menu bantuan di sini -->\\n  </ul>\\n</nav>',
          css: '',
        },
        validationHint: 'Tambahkan <li><a href="#bantuan">Bantuan</a></li>',
        expectedOutput: 'Bantuan',
      },
      {
        type: 'kuis',
        title: 'Kuis Navigasi Semantik',
        questions: [
          {
            id: 'q-nav-sem-1',
            type: 'pilihan-ganda',
            prompt: 'Tag HTML5 manakah yang merupakan standar untuk menampung tautan navigasi utama?',
            options: ['<nav>', '<menu>', '<navbar>', '<header>'],
            correctAnswer: '<nav>',
            explanation: '<nav> adalah elemen semantik resmi untuk navigasi situs.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Navigasi Semantik',
        points: [
          'Bungkus kumpulan tautan navigasi utama di dalam <nav>.',
          'Gunakan kombinasi <ul>, <li>, dan <a> untuk hierarki teratur.',
          'Pastikan atribut href selalu terisi tautan atau tanda pagar yang valid.',
        ],
      },
    ],
    commonMistakes: ['Menggunakan tag <div> biasa tanpa tag <nav> untuk menu utama.'],
    glossaryTerms: ['Semantic Navigation', 'HTML Structure'],
    relatedLevels: ['web-t1-03'],
    relatedCaseFiles: ['case-03-web-umkm'],
  },
  {
    id: 'les-web-forms',
    track: 'web',
    tier: 2,
    skillId: 'Web Forms',
    title: 'Formulir Interaktif: Input, Label, dan Submit',
    objectives: [
      'Menyusun formulir data dengan tag <form>',
      'Menghubungkan <label> dengan <input> melalui atribut for dan id',
      'Menyediakan tombol kirim bertipe submit',
    ],
    estimatedMinutes: 7,
    prerequisites: ['les-web-html-structure'],
    characterIntro: {
      characterId: 'maya',
      dialogue: 'Formulir adalah jembatan komunikasi antara kantor dan pemohon. Label yang jelas mencegah kesalahan isi data.',
      tip: 'Selalu pasangkan label for="id_input" dengan input id="id_input".',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Anatomi Formulir Web',
        content: 'Formulir dibungkus tag <form>. Di dalamnya, setiap input teks, email, atau angka diberi <label> untuk kejelasan fungsi.',
        analogy: 'Seperti blangko permohonan dinas: ada label nama kolom dan kotak isian.',
        officeContext: 'Formulir pemesanan barang ATK dan permohonan inventaris kantor.',
        keyTerms: ['<form>', '<input>', '<label>', '<button type="submit">'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Formulir Standar',
        explanation: 'Perhatikan keterikatan atribut for dan id di bawah.',
        editorType: 'web',
        initialData: {
          html: '<form action="/order" method="POST">\\n  <label for="nama">Nama Karyawan:</label>\\n  <input type="text" id="nama" name="nama" />\\n  <button type="submit">Kirim</button>\\n</form>',
          css: 'form { display: flex; flex-direction: column; gap: 8px; max-width: 300px; }',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Tag <form> menjadi pembungkus input data.', targetCode: '<form action="/order"', highlightLabel: 'Form' },
          { stepIndex: 1, instruction: 'label for="nama" terhubung dengan id="nama".', targetCode: '<label for="nama">', highlightLabel: 'Label' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Tipe Email',
        instruction: 'Tambahkan atribut type="email" pada tag input.',
        editorType: 'web',
        initialData: {
          html: '<form>\\n  <label for="surel">Email:</label>\\n  <input id="surel" type="email" />\\n</form>',
          css: '',
        },
        validationHint: 'Gunakan type="email"',
        expectedOutput: 'type="email"',
      },
      {
        type: 'kuis',
        title: 'Kuis Form',
        questions: [
          {
            id: 'q-form-1',
            type: 'pilihan-ganda',
            prompt: 'Atribut apakah pada <label> yang menghubungkannya dengan <input>?',
            options: ['for', 'id', 'name', 'connect'],
            correctAnswer: 'for',
            explanation: 'Atribut for="..." pada label mengikat input dengan atribut id yang sama.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Formulir Web',
        points: [
          'Gunakan pembungkus <form> untuk setiap kumpulan masukan data.',
          'Gunakan <label> dengan atribut for yang sesuai id input.',
          'Sediakan tombol type="submit" untuk mengirimkan data.',
        ],
      },
    ],
    commonMistakes: ['Lupa menyertakan <label> sehingga pembaca layar tidak bisa mengenali kotak input.'],
    glossaryTerms: ['Web Forms'],
    relatedLevels: ['web-t2-01'],
    relatedCaseFiles: ['case-03-web-umkm'],
  },
  {
    id: 'les-web-tables',
    track: 'web',
    tier: 2,
    skillId: 'HTML Tables',
    title: 'Struktur Tabel Data Semantik HTML',
    objectives: [
      'Menyusun tabel data dengan <table>, <thead>, <tbody>, dan <tr>',
      'Membedakan sel judul <th> dan sel data <td>',
      'Menerapkan border-collapse untuk tampilan border rapi',
    ],
    estimatedMinutes: 7,
    prerequisites: ['les-web-html-structure'],
    characterIntro: {
      characterId: 'reza',
      dialogue: 'Tabel HTML wajib memisahkan <thead> dan <tbody> agar laporan keuangan dan daftar harga terbaca runtut.',
      tip: 'Gunakan <th> untuk sel header kolom dan <td> untuk nilai data.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Anatomi Tabel Semantik',
        content: 'Tabel data HTML terbagi menjadi <thead> untuk baris judul dan <tbody> untuk baris isi. Setiap baris dibungkus <tr>.',
        analogy: 'Persis seperti lembar kerja Excel: ada baris judul kolom dan baris-baris data di bawahnya.',
        officeContext: 'Daftar harga paket layanan jasa IT dan pemeliharaan komputer kantor.',
        keyTerms: ['<table>', '<thead>', '<tbody>', '<th>', '<td>'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Tabel Pricelist',
        explanation: 'Lihat pemisahan <thead> dan <tbody> pada tabel.',
        editorType: 'web',
        initialData: {
          html: '<table>\\n  <thead>\\n    <tr>\\n      <th>Layanan</th>\\n      <th>Tarif</th>\\n    </tr>\\n  </thead>\\n  <tbody>\\n    <tr>\\n      <td>Cek Jaringan</td>\\n      <td>Rp 150.000</td>\\n    </tr>\\n  </tbody>\\n</table>',
          css: 'table { border-collapse: collapse; width: 100%; }\\nth, td { border: 1px solid #cbd5e1; padding: 8px; }',
        },
        walkthrough: [
          { stepIndex: 0, instruction: '<thead> memuat baris judul dengan <th>.', targetCode: '<thead>', highlightLabel: 'Header' },
          { stepIndex: 1, instruction: '<tbody> memuat baris data dengan <td>.', targetCode: '<tbody>', highlightLabel: 'Body' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Baris Data',
        instruction: 'Tambahkan baris <tr><td>Format PC</td><td>Rp 100.000</td></tr> di <tbody>.',
        editorType: 'web',
        initialData: {
          html: '<table>\\n  <tbody>\\n    <!-- Tambahkan baris di sini -->\\n  </tbody>\\n</table>',
          css: '',
        },
        validationHint: 'Tambahkan <tr><td>Format PC</td><td>Rp 100.000</td></tr>',
        expectedOutput: 'Format PC',
      },
      {
        type: 'kuis',
        title: 'Kuis Tabel HTML',
        questions: [
          {
            id: 'q-tbl-sem-1',
            type: 'pilihan-ganda',
            prompt: 'Elemen manakah yang digunakan untuk sel judul kolom dalam tabel?',
            options: ['<th>', '<td>', '<tr>', '<header>'],
            correctAnswer: '<th>',
            explanation: '<th> (Table Header) memformat teks tebal dan menandai judul kolom secara semantik.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Tabel Data',
        points: [
          'Pisahkan struktur kepala tabel (<thead>) dan isi data (<tbody>).',
          'Gunakan <th> untuk judul kolom dan <td> untuk isi data.',
          'Gunakan border-collapse: collapse untuk garis pembatas rapi.',
        ],
      },
    ],
    commonMistakes: ['Menulis sel data langsung di <table> tanpa baris <tr>.'],
    glossaryTerms: ['HTML Tables'],
    relatedLevels: ['web-t2-02'],
    relatedCaseFiles: ['case-03-web-umkm'],
  },
  {
    id: 'les-web-box-model',
    track: 'web',
    tier: 2,
    skillId: 'CSS Box Model',
    title: 'CSS Box Model: Margin, Border, Padding',
    objectives: [
      'Memahami 4 lapisan Box Model: Content, Padding, Border, Margin',
      'Mengatur ruang dalam dengan padding dan jarak luar dengan margin',
      'Membuat sudut membulat dengan border-radius',
    ],
    estimatedMinutes: 6,
    prerequisites: ['les-web-html-structure'],
    characterIntro: {
      characterId: 'intan',
      dialogue: 'Box Model adalah dasar dari setiap tata letak di web. Kuasai padding dan margin agar desainmu bernapas lega.',
      tip: 'Padding di dalam kotak, margin di luar kotak.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: '4 Lapisan Box Model',
        content: 'Content adalah isi elemen, Padding adalah ruang dalam, Border adalah garis pembatas, dan Margin adalah jarak pemisah luar.',
        analogy: 'Seperti lukisan: kanvas = content, passepartout kertas = padding, bingkai kayu = border, jarak ke lukisan lain = margin.',
        officeContext: 'Merapikan kartu penawaran dan tombol aksi pada portal web kantor.',
        keyTerms: ['Margin', 'Padding', 'Border', 'Border-radius'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Tombol Ber-padding',
        explanation: 'Lihat bagaimana padding memberi ruang klik luas pada tombol.',
        editorType: 'web',
        initialData: {
          html: '<button class="btn">Pesan Sekarang</button>',
          css: '.btn { padding: 12px 24px; border: none; border-radius: 6px; background: #2563eb; color: white; cursor: pointer; }',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'padding 12px 24px memberi ruang dalam atas-bawah dan kiri-kanan.', targetCode: 'padding: 12px 24px;', highlightLabel: 'Padding' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Padding',
        instruction: 'Tambahkan properti "padding: 16px;" pada aturan .box.',
        editorType: 'web',
        initialData: {
          html: '<div class="box">Area Nyaman</div>',
          css: '.box { background: #f1f5f9; }',
        },
        validationHint: 'Tambahkan padding: 16px;',
        expectedOutput: 'padding: 16px',
      },
      {
        type: 'kuis',
        title: 'Kuis Box Model',
        questions: [
          {
            id: 'q-box-sem-1',
            type: 'pilihan-ganda',
            prompt: 'Properti manakah yang memberi jarak DI DALAM elemen sebelum garis batas border?',
            options: ['padding', 'margin', 'gap', 'outline'],
            correctAnswer: 'padding',
            explanation: 'Padding adalah jarak internal antara isi konten dan batas elemen.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Box Model',
        points: [
          'Gunakan padding untuk ruang bernapas di dalam tombol atau kartu.',
          'Gunakan margin untuk memisahkan jarak antar komponen di luar.',
          'Gunakan border-radius untuk sudut melengkung modern.',
        ],
      },
    ],
    commonMistakes: ['Menggunakan margin alih-alih padding untuk memperluas area tombol.'],
    glossaryTerms: ['CSS Box Model'],
    relatedLevels: ['web-t2-03'],
    relatedCaseFiles: ['case-03-web-umkm'],
  },
  {
    id: 'les-web-semantic-layout',
    track: 'web',
    tier: 2,
    skillId: 'Semantic Layout',
    title: 'Tata Letak Semantik Komprehensif',
    objectives: [
      'Menyusun layout utuh menggunakan <header>, <nav>, <main>, dan <footer>',
      'Menghindari div berlebihan tanpa makna semantik',
      'Meningkatkan aksesibilitas pembaca layar pada halaman kantor',
    ],
    estimatedMinutes: 7,
    prerequisites: ['les-web-html-structure', 'les-web-semantic-nav'],
    characterIntro: {
      characterId: 'intan',
      dialogue: 'Halaman web yang bersih memiliki kerangka struktur lengkap: header untuk identitas, nav untuk navigasi, main untuk konten inti, dan footer untuk informasi legalitas.',
      tip: 'Pastikan hanya ada satu tag <main> per dokumen.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Struktur Tata Letak Semantik',
        content: 'Kombinasi elemen semantik HTML5 menyusun dokumen web layaknya artikel surat kabar profesional: header, navigasi, isi utama (main), dan penutup (footer).',
        analogy: 'Seperti gedung kantor: plang nama di atas (header), resepsionis & petunjuk jalan (nav), ruang kerja utama (main), dan arsip/kontak darurat di lantai dasar (footer).',
        officeContext: 'Struktur halaman profil resmi perusahaan PT Maju Sejahtera.',
        keyTerms: ['<header>', '<nav>', '<main>', '<footer>'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Layout Empat Serangkai',
        explanation: 'Lihat susunan lengkap empat elemen semantik utama.',
        editorType: 'web',
        initialData: {
          html: '<header><h1>PT Maju Sejahtera</h1></header>\\n<nav><ul><li><a href="#">Home</a></li></ul></nav>\\n<main><p>Selamat datang di portal kantor.</p></main>\\n<footer><p>&copy; 2026 PT Maju Sejahtera</p></footer>',
          css: 'header, footer { background: #1e293b; color: white; padding: 12px; }\\nmain { padding: 20px; }',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Struktur semantik lengkap mencakup header, nav, main, dan footer.', targetCode: '<header>', highlightLabel: 'Layout Semantik' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Footer',
        instruction: 'Tambahkan tag <footer><p>Hak Cipta Terpelihara</p></footer> di bawah main.',
        editorType: 'web',
        initialData: {
          html: '<main><p>Konten Utama</p></main>\\n<!-- Tambahkan footer di sini -->',
          css: '',
        },
        validationHint: 'Tambahkan <footer><p>Hak Cipta Terpelihara</p></footer>',
        expectedOutput: '<footer>',
      },
      {
        type: 'kuis',
        title: 'Kuis Layout Semantik',
        questions: [
          {
            id: 'q-lay-sem-1',
            type: 'pilihan-ganda',
            prompt: 'Elemen manakah yang memuat konten spesifik dan unik dari halaman tersebut?',
            options: ['<main>', '<header>', '<footer>', '<nav>'],
            correctAnswer: '<main>',
            explanation: '<main> memuat konten utama yang unik untuk halaman yang bersangkutan.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Layout Semantik',
        points: [
          'Gunakan elemen semantik utama: header, nav, main, dan footer.',
          'Hanya ada satu elemen <main> dalam satu dokumen.',
          'Gunakan footer untuk catatan hak cipta, kontak, dan tautan legalitas.',
        ],
      },
    ],
    commonMistakes: ['Membuat lebih dari satu elemen <main> pada halaman yang sama.'],
    glossaryTerms: ['Semantic Layout', 'HTML Structure'],
    relatedLevels: ['web-t2-04'],
    relatedCaseFiles: ['case-03-web-umkm'],
  },
  {
    id: 'les-web-flexbox-navbar',
    track: 'web',
    tier: 3,
    skillId: 'Flexbox Navbar',
    title: 'Navbar Responsif dengan Flexbox Space-Between',
    objectives: [
      'Menyusun navbar dengan display: flex dan justify-content: space-between',
      'Meratakan logo di ujung kiri dan menu navigasi di ujung kanan',
      'Menyejajarkan elemen secara vertikal menggunakan align-items: center',
    ],
    estimatedMinutes: 7,
    prerequisites: ['les-web-semantic-nav', 'les-web-flexbox'],
    characterIntro: {
      characterId: 'intan',
      dialogue: 'Kunci navbar modern adalah space-between: logo terdorong otomatis ke paling kiri, dan menu aksi ke paling kanan.',
      tip: 'Terapkan display: flex, justify-content: space-between, dan align-items: center pada kontainer nav.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Pola Navbar Flexbox',
        content: 'Bilah navigasi modern menata logo dan menu aksi di dua tepi berlawanan. Properti justify-content: space-between mendistribusikan ruang kosong secara merata di antara kedua elemen tersebut.',
        analogy: 'Dua orang berjabat tangan dari dua ujung meja panjang.',
        officeContext: 'Bilah navigasi utama sistem manajemen kerja PT Maju Sejahtera.',
        keyTerms: ['display: flex', 'justify-content: space-between', 'align-items: center'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Navbar Simetris',
        explanation: 'Lihat bagaimana logo dan tombol login terpisah rapi ke ujung layar.',
        editorType: 'web',
        initialData: {
          html: '<nav class="top-nav">\\n  <div class="logo">KantorKu</div>\\n  <div class="actions"><button>Masuk</button></div>\\n</nav>',
          css: '.top-nav { display: flex; justify-content: space-between; align-items: center; padding: 12px 24px; background: #ffffff; border-bottom: 1px solid #e2e8f0; }',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'justify-content: space-between memisahkan logo dan actions ke dua ujung.', targetCode: 'justify-content: space-between;', highlightLabel: 'Space Between' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Terapkan Space-Between',
        instruction: 'Terapkan "justify-content: space-between;" pada aturan .nav-bar.',
        editorType: 'web',
        initialData: {
          html: '<nav class="nav-bar"><div>Logo</div><div>Menu</div></nav>',
          css: '.nav-bar { display: flex; }',
        },
        validationHint: 'Tambahkan justify-content: space-between;',
        expectedOutput: 'justify-content: space-between',
      },
      {
        type: 'kuis',
        title: 'Kuis Flexbox Navbar',
        questions: [
          {
            id: 'q-flx-nav-1',
            type: 'pilihan-ganda',
            prompt: 'Properti CSS apakah yang mendorong anak elemen pertama ke ujung kiri dan anak elemen terakhir ke ujung kanan?',
            options: ['justify-content: space-between;', 'justify-content: center;', 'float: left;', 'align-items: flex-end;'],
            correctAnswer: 'justify-content: space-between;',
            explanation: 'space-between menyisipkan seluruh sisa ruang kosong di antara anak elemen.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Navbar Flexbox',
        points: [
          'Gunakan display: flex pada pembungkus bar navigasi.',
          'Gunakan justify-content: space-between untuk menempatkan logo di kiri dan aksi di kanan.',
          'Gunakan align-items: center agar tinggi elemen sejajar di tengah.',
        ],
      },
    ],
    commonMistakes: ['Lupa menuliskan display: flex sehingga justify-content tidak bekerja.'],
    glossaryTerms: ['Flexbox Navbar', 'CSS Flexbox'],
    relatedLevels: ['web-t3-01'],
    relatedCaseFiles: ['case-03-web-umkm'],
  },
  {
    id: 'les-web-flexbox-grid',
    track: 'web',
    tier: 3,
    skillId: 'Flexbox Grid System',
    title: 'Sistem Grid Kartu Produk dengan Flex-Wrap',
    objectives: [
      'Menggunakan flex-wrap: wrap agar kartu otomatis turun baris',
      'Mengatur jarak antar kartu dengan properti gap',
      'Menetapkan lebar fleksibel kartu dengan flex-basis',
    ],
    estimatedMinutes: 7,
    prerequisites: ['les-web-flexbox'],
    characterIntro: {
      characterId: 'nadia',
      dialogue: 'Etalase produk UMKM kita memiliki banyak item. Dengan flex-wrap: wrap, kartu produk mengalir alami dan turun baris saat layar menyempit.',
      tip: 'Kombinasikan flex-wrap: wrap dengan gap: 16px.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Katalog Produk Multi-Baris',
        content: 'Secara baku flexbox memaksakan satu baris (nowrap). Menambahkan flex-wrap: wrap mengizinkan kartu berpindah ke baris baru saat lebar kontainer penuh.',
        analogy: 'Seperti menata kardus di rak gudang: saat baris atas penuh, kardus berikutnya ditumpuk di rak bawah.',
        officeContext: 'Katalog etalase produk UMKM binaan CSR PT Maju Sejahtera.',
        keyTerms: ['flex-wrap: wrap', 'gap', 'flex: 1 1 280px'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Galeri Kartu Fleksibel',
        explanation: 'Lihat bagaimana flex-wrap dan gap bekerja sama.',
        editorType: 'web',
        initialData: {
          html: '<div class="product-grid">\\n  <div class="card">Produk A</div>\\n  <div class="card">Produk B</div>\\n  <div class="card">Produk C</div>\\n</div>',
          css: '.product-grid { display: flex; flex-wrap: wrap; gap: 16px; }\\n.card { flex: 1 1 200px; padding: 16px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; }',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'flex-wrap: wrap mengizinkan kartu turun ke baris baru.', targetCode: 'flex-wrap: wrap;', highlightLabel: 'Wrap' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Aktifkan Flex Wrap',
        instruction: 'Terapkan "flex-wrap: wrap;" di dalam aturan .gallery.',
        editorType: 'web',
        initialData: {
          html: '<div class="gallery"><div>Item 1</div><div>Item 2</div></div>',
          css: '.gallery { display: flex; }',
        },
        validationHint: 'Tambahkan flex-wrap: wrap;',
        expectedOutput: 'flex-wrap: wrap',
      },
      {
        type: 'kuis',
        title: 'Kuis Flexbox Grid',
        questions: [
          {
            id: 'q-flx-wrp-1',
            type: 'pilihan-ganda',
            prompt: 'Properti CSS apakah yang mengizinkan anak elemen flexbox turun ke baris baru?',
            options: ['flex-wrap: wrap;', 'flex-direction: row;', 'display: block;', 'overflow: auto;'],
            correctAnswer: 'flex-wrap: wrap;',
            explanation: 'flex-wrap: wrap menginstruksikan kontainer flex untuk membungkus elemen ke baris baru.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Galeri Kartu Flexbox',
        points: [
          'Gunakan flex-wrap: wrap pada kontainer galeri kartu.',
          'Gunakan properti gap untuk memberi jarak antar kartu secara konsisten.',
          'Gunakan flex-basis untuk lebar minimum ideal setiap kartu.',
        ],
      },
    ],
    commonMistakes: ['Lupa menyetel flex-wrap: wrap sehingga kartu gepeng di layar ponsel.'],
    glossaryTerms: ['Flexbox Grid System', 'CSS Flexbox'],
    relatedLevels: ['web-t3-02'],
    relatedCaseFiles: ['case-03-web-umkm'],
  },
  {
    id: 'les-web-responsive-design',
    track: 'web',
    tier: 3,
    skillId: 'Responsive Design',
    title: 'Desain Responsif: Fluid Layout & Viewport',
    objectives: [
      'Memahami konsep mobile-first untuk pengalaman pengguna ponsel',
      'Menghindari lebar absolut tetap (fixed width px) yang merusak tata letak mobile',
      'Menerapkan max-width: 100% pada gambar dan kontainer',
    ],
    estimatedMinutes: 6,
    prerequisites: ['les-web-box-model', 'les-web-flexbox'],
    characterIntro: {
      characterId: 'intan',
      dialogue: 'Desain web responsif memastikan halaman nyaman diakses di smartphone 360px maupun monitor desktop 1080p tanpa scroll mendatar yang menyebalkan.',
      tip: 'Gunakan satuan relatif (% atau flex) alih-alih lebar tetap pixel besar.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Prinsip Fluid Web Design',
        content: 'Desain responsif menyesuaikan tata letak dengan ukuran layar. Kontainer menggunakan max-width dan gambar diberi max-width: 100% agar tidak meluber.',
        analogy: 'Seperti baju dengan karet elastis yang pas dipakai berbagai ukuran badan.',
        officeContext: 'Portal laporan absensi karyawan yang diakses lewat smartphone mandor di lapangan.',
        keyTerms: ['Responsive Design', 'Fluid Width', 'max-width: 100%'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Gambar Responsif',
        explanation: 'Lihat bagaimana gambar otomatis menyesuaikan lebar kontainer pembungkusnya.',
        editorType: 'web',
        initialData: {
          html: '<div class="banner-box">\\n  <img src="/banner.jpg" alt="Banner Kantor" class="img-fluid" />\\n</div>',
          css: '.banner-box { width: 100%; max-width: 600px; margin: 0 auto; }\\n.img-fluid { max-width: 100%; height: auto; display: block; }',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'max-width: 100% mencegah gambar meluber keluar dari layar.', targetCode: 'max-width: 100%;', highlightLabel: 'Fluid Image' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Pasang Max-Width',
        instruction: 'Terapkan "max-width: 100%;" pada kelas .wrapper.',
        editorType: 'web',
        initialData: {
          html: '<div class="wrapper"><p>Responsif</p></div>',
          css: '.wrapper { width: 500px; }',
        },
        validationHint: 'Tambahkan max-width: 100%;',
        expectedOutput: 'max-width: 100%',
      },
      {
        type: 'kuis',
        title: 'Kuis Desain Responsif',
        questions: [
          {
            id: 'q-rsp-1',
            type: 'pilihan-ganda',
            prompt: 'Properti CSS apakah yang mencegah gambar meluber melebihi layar ponsel?',
            options: ['max-width: 100%; height: auto;', 'width: 1200px;', 'display: fixed;', 'overflow: hidden;'],
            correctAnswer: 'max-width: 100%; height: auto;',
            explanation: 'max-width: 100% membatasi gambar agar tidak melebihi lebar layar.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Desain Responsif',
        points: [
          'Gunakan satuan persentase atau flexbox untuk layout yang luwes.',
          'Pastikan semua gambar memiliki max-width: 100% dan height: auto.',
          'Hindari menetapkan width piksel kaku di atas 360px tanpa max-width.',
        ],
      },
    ],
    commonMistakes: ['Menetapkan width: 1000px tanpa max-width sehingga muncul scroll horizontal di ponsel.'],
    glossaryTerms: ['Responsive Design'],
    relatedLevels: ['web-t3-03'],
    relatedCaseFiles: ['case-03-web-umkm'],
  },
  {
    id: 'les-web-media-queries',
    track: 'web',
    tier: 3,
    skillId: 'CSS Media Queries',
    title: 'CSS Media Queries: Breakpoint Mobile 768px',
    objectives: [
      'Menulis aturan @media (max-width: 768px)',
      'Mengubah susunan kolom horizontal menjadi tumpukan vertikal di layar ponsel',
      'Menyesuaikan ukuran font dan padding di layar sempit',
    ],
    estimatedMinutes: 7,
    prerequisites: ['les-web-responsive-design'],
    characterIntro: {
      characterId: 'intan',
      dialogue: 'Media Queries mendeteksi lebar layar secara real-time. Terapkan flex-direction: column di layar mobile agar pengguna tidak perlu zoom in-out.',
      tip: 'Gunakan breakpoint standar 768px untuk batas mobile.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Sintaks Media Query',
        content: 'Blok @media (max-width: 768px) mengeksekusi gaya CSS hanya ketika lebar layar berada di bawah atau sama dengan 768px.',
        analogy: 'Seperti pintu kantor otomatis yang membuka saat orang mendekat: gaya CSS aktif saat layar menyempit.',
        officeContext: 'Mengubah 3 kolom kartu produk menjadi 1 kolom vertikal saat diakses dari HP.',
        keyTerms: ['@media', 'Breakpoint', 'max-width: 768px'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Kolom Tumpuk Mobile',
        explanation: 'Perhatikan perubahan flex-direction menjadi column di bawah breakpoint.',
        editorType: 'web',
        initialData: {
          html: '<div class="row"><div>Kolom 1</div><div>Kolom 2</div></div>',
          css: '.row { display: flex; gap: 16px; }\\n@media (max-width: 768px) {\\n  .row { flex-direction: column; }\\n}',
        },
        walkthrough: [
          { stepIndex: 0, instruction: '@media (max-width: 768px) memicu flex-direction: column di layar ponsel.', targetCode: '@media (max-width: 768px)', highlightLabel: 'Media Query' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Aturan Media Query',
        instruction: 'Tuliskan aturan media query "@media (max-width: 768px)" di bagian bawah CSS.',
        editorType: 'web',
        initialData: {
          html: '<div class="box">Adaptif</div>',
          css: '.box { font-size: 16px; }',
        },
        validationHint: 'Tambahkan @media (max-width: 768px)',
        expectedOutput: '@media',
      },
      {
        type: 'kuis',
        title: 'Kuis Media Query',
        questions: [
          {
            id: 'q-med-sem-1',
            type: 'pilihan-ganda',
            prompt: 'Kapan aturan CSS di dalam @media (max-width: 768px) dieksekusi?',
            options: [
              'Saat lebar layar 768px atau lebih kecil',
              'Saat lebar layar lebih dari 768px',
              'Hanya saat halaman dicetak',
              'Setiap saat tanpa syarat',
            ],
            correctAnswer: 'Saat lebar layar 768px atau lebih kecil',
            explanation: 'max-width: 768px aktif untuk layar 0px hingga batas 768px.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Media Query',
        points: [
          'Gunakan breakpoint umum seperti 768px untuk tampilan mobile.',
          'Ubah tata letak mendatar menjadi bertumpuk vertikal di layar sempit.',
          'Atur ukuran font agar tetap proporsional dan mudah dibaca.',
        ],
      },
    ],
    commonMistakes: ['Lupa tanda kurung pada kondisi (max-width: 768px).'],
    glossaryTerms: ['CSS Media Queries', 'Responsive Design'],
    relatedLevels: ['web-t3-03'],
    relatedCaseFiles: ['case-03-web-umkm'],
  },
  {
    id: 'les-web-hero-section',
    track: 'web',
    tier: 3,
    skillId: 'Hero Section',
    title: 'Desain Banner Utama (Hero Section) & CTA',
    objectives: [
      'Merancang banner pembuka (Hero Section) landing page profesional',
      'Mengombinasikan judul H1 persuasif, subjudul, dan tombol Call-To-Action',
      'Menerapkan kontras warna dan ruang padding yang memikat klien',
    ],
    estimatedMinutes: 8,
    prerequisites: ['les-web-html-structure', 'les-web-buttons'],
    characterIntro: {
      characterId: 'sari',
      dialogue: 'Hero Section adalah wajah pertama kantor kita di dunia maya. Buatlah elegan dengan judul tegas dan tombol aksi yang jelas!',
      tip: 'Gunakan H1 untuk nilai utama dan tombol CTA dengan kontras tinggi.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Anatomi Hero Section Bisnis',
        content: 'Hero Section terdiri dari judul H1 yang tajam, paragraf pengantar singkat, dan tombol Call To Action (CTA) seperti "Hubungi Kami" atau "Pesan Layanan".',
        analogy: 'Seperti lobi utama gedung pencakar langit dengan resepsionis ramah dan petunjuk arah jelas.',
        officeContext: 'Landing page profil UMKM mitra binaan CSR PT Maju Sejahtera.',
        keyTerms: ['Hero Section', 'CTA Button', 'Visual Hierarchy'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Hero Section Kontras',
        explanation: 'Lihat perpaduan teks putih di atas latar gelap berkelas.',
        editorType: 'web',
        initialData: {
          html: '<section class="hero">\\n  <h1>Solusi Digital Terpercaya</h1>\\n  <p>Layanan kantor modern untuk UMKM.</p>\\n  <button class="cta">Pesan Sekarang</button>\\n</section>',
          css: '.hero { background: #0f172a; color: white; padding: 48px 24px; text-align: center; }\\n.cta { background: #10b981; color: white; padding: 12px 24px; border: none; border-radius: 6px; font-weight: bold; }',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'padding luas 48px memberi kesan megah dan lapang.', targetCode: 'padding: 48px 24px;', highlightLabel: 'Hero Padding' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Tombol CTA',
        instruction: 'Tambahkan <button>Hubungi Kami</button> di dalam tag <section>.',
        editorType: 'web',
        initialData: {
          html: '<section class="hero">\\n  <h1>Layanan Pengiriman Kargo</h1>\\n</section>',
          css: '',
        },
        validationHint: 'Tambahkan <button>Hubungi Kami</button>',
        expectedOutput: 'Hubungi Kami',
      },
      {
        type: 'kuis',
        title: 'Kuis Hero Section',
        questions: [
          {
            id: 'q-hro-sem-1',
            type: 'pilihan-ganda',
            prompt: 'Elemen apakah yang paling vital dalam Hero Section untuk mengarahkan aksi pengunjung?',
            options: ['Tombol Call To Action (CTA)', 'Daftar footer lengkap', 'Tabel neraca keuangan', 'Kutipan hukum panjang'],
            correctAnswer: 'Tombol Call To Action (CTA)',
            explanation: 'Tombol CTA memicu konversi aksi utama pengguna.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Hero Section',
        points: [
          'Gunakan Headline H1 yang padat dan jelas.',
          'Gunakan kontras warna tinggi agar teks mudah dibaca seketika.',
          'Sediakan tombol CTA yang mencolok dan mengundang aksi.',
        ],
      },
    ],
    commonMistakes: ['Membuat headline terlalu panjang sehingga memenuhi seluruh layar ponsel tanpa ruang untuk CTA.'],
    glossaryTerms: ['Hero Section', 'Buttons', 'HTML Structure'],
    relatedLevels: ['web-t3-boss'],
    relatedCaseFiles: ['case-03-web-umkm'],
  },
];
`;

fs.writeFileSync(path.join(process.cwd(), 'src/content/lessons/webLessonsPatch.ts'), webLessonsPatchContent, 'utf-8');
console.log('✅ Created src/content/lessons/webLessonsPatch.ts');

// -------------------------------------------------------------
// 2. Coding Lessons Patch
// -------------------------------------------------------------
const codingLessonsPatchContent = `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Pelajaran Coding JavaScript Tambahan (Tier 1-3 Batch B)
 */
import { Lesson } from '../../features/learning/types';

export const CODING_LESSONS_PATCH: Lesson[] = [
  {
    id: 'les-code-tax-calc',
    track: 'coding',
    tier: 1,
    skillId: 'Tax Calculation',
    title: 'Kalkulasi Pajak PPN 11% & Pembulatan Nilai',
    objectives: [
      'Menghitung nilai Pajak Pertambahan Nilai (PPN 11%) secara akurat',
      'Menggabungkan subtotal dan pajak menjadi grand total transaksi',
      'Menggunakan Math.round untuk pembulatan rupiah kasir',
    ],
    estimatedMinutes: 6,
    prerequisites: ['les-code-business-math'],
    characterIntro: {
      characterId: 'reza',
      dialogue: 'Sesuai regulasi perpajakan Indonesia, tarif PPN adalah 11%. Pastikan fungsi kasir menghitung nilai rupiah tanpa toleransi selisih sen.',
      tip: 'PPN = subtotal * 0.11, lalu bulatkan dengan Math.round().',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Rumus PPN 11% Baku',
        content: 'Dalam sistem kasir POS, nilai pajak dihitung dengan mengalikan subtotal dengan 0.11 (11/100). Total bayar adalah subtotal ditambah nominal pajak.',
        analogy: 'Seperti struk belanja di supermarket: harga barang dijumlah, lalu ditambah baris PPN 11%.',
        officeContext: 'Sistem POS kasir kantin dan minimarket PT Maju Sejahtera.',
        keyTerms: ['PPN 11%', 'Math.round()', 'Grand Total'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Fungsi Hitung PPN',
        explanation: 'Perhatikan fungsi hitungTotalDenganPPN di bawah.',
        editorType: 'coding',
        initialData: {
          code: 'function hitungTotalDenganPPN(subtotal) {\\n  const ppn = Math.round(subtotal * 0.11);\\n  return subtotal + ppn;\\n}',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Math.round(subtotal * 0.11) menghitung 11% pajak bulat.', targetCode: 'Math.round(subtotal * 0.11)', highlightLabel: 'Hitung PPN' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Kalikan Pajak 11%',
        instruction: 'Lengkapi fungsi untuk mengembalikan harga * 0.11.',
        editorType: 'coding',
        initialData: {
          code: 'function hitungPPN(harga) {\\n  // kembalikan harga * 0.11\\n}',
        },
        validationHint: 'return harga * 0.11;',
        expectedOutput: 'return harga * 0.11',
      },
      {
        type: 'kuis',
        title: 'Kuis Kalkulasi Pajak',
        questions: [
          {
            id: 'q-tax-1',
            type: 'pilihan-ganda',
            prompt: 'Berapakah pengali desimal untuk menghitung tarif PPN 11%?',
            options: ['0.11', '1.11', '0.011', '11.0'],
            correctAnswer: '0.11',
            explanation: '11% sama dengan 11 / 100 = 0.11.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Hitung Pajak POS',
        points: [
          'Kalikan subtotal dengan 0.11 untuk mendapatkan nilai PPN 11%.',
          'Gunakan Math.round untuk membulatkan nilai desimal rupiah.',
          'Jumlahkan subtotal dan PPN untuk mendapatkan Grand Total akhir.',
        ],
      },
    ],
    commonMistakes: ['Menulis 1.11 langsung tanpa memisahkan komponen pajak yang tercatat di struk.'],
    glossaryTerms: ['Tax Calculation'],
    relatedLevels: ['code-t1-03'],
    relatedCaseFiles: ['case-03-web-umkm'],
  },
  {
    id: 'les-code-template-literals',
    track: 'coding',
    tier: 1,
    skillId: 'Template Literals',
    title: 'Template Literals & Format Struk Transaksi',
    objectives: [
      'Menggunakan backtick (\`) untuk string interpolasi modern JavaScript',
      'Menyisipkan variabel ke dalam teks dengan \${variabel}',
      'Menghasilkan teks multi-baris rapi untuk kwitansi kantor',
    ],
    estimatedMinutes: 6,
    prerequisites: ['les-code-string-concat'],
    characterIntro: {
      characterId: 'intan',
      dialogue: 'Lupakan tanda tambah (+) panjang untuk menggabungkan string! Template literals dengan backtick membuat string interpolasi terlihat elegan dan bebas typo spasi.',
      tip: 'Gunakan tanda backtick (\`) di kiri tombol angka 1 keyboard, lalu sisipkan \${nilai}.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Keunggulan Template Literals',
        content: 'Template Literals (ES6) menggunakan karakter backtick (\`) yang memungkinkan interpolasi variabel langsung di dalam string menggunakan sintaks \${ekspresi}.',
        analogy: 'Seperti blanko sertifikat kantor: kita menyisipkan nama penerima di tempat kosong bergaris bawah.',
        officeContext: 'Pencetakan ringkasan struk pesanan barang inventaris kantor.',
        keyTerms: ['Backtick (\`)', 'Interpolasi \${...}', 'Multi-line String'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Format Kwitansi Bersih',
        explanation: 'Lihat bagaimana variabel tersisip mulus ke dalam teks.',
        editorType: 'coding',
        initialData: {
          code: 'function formatKwitansi(noTrx, total) {\\n  return \`Kwitansi #\${noTrx}: Rp \${total}\`;\\n}',
        },
        walkthrough: [
          { stepIndex: 0, instruction: '\${noTrx} menyisipkan nilai variabel langsung ke string.', targetCode: '\${noTrx}', highlightLabel: 'Interpolasi' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Buat Pesan Sukses',
        instruction: 'Lengkapi fungsi untuk mengembalikan \`Pesanan \${id} berhasil diproses\`.',
        editorType: 'coding',
        initialData: {
          code: 'function konfirmasiPesanan(id) {\\n  // kembalikan pesan menggunakan backtick\\n}',
        },
        validationHint: 'return \`Pesanan \${id} berhasil diproses\`;',
        expectedOutput: 'return \`Pesanan \${id} berhasil diproses\`;',
      },
      {
        type: 'kuis',
        title: 'Kuis Template Literals',
        questions: [
          {
            id: 'q-tmp-1',
            type: 'pilihan-ganda',
            prompt: 'Karakter apakah yang digunakan untuk mengawali dan mengakhiri template literal di JavaScript?',
            options: ['Backtick (\`)', 'Petik ganda (")', 'Petik tunggal (\')', 'Tanda tilde (~)'],
            correctAnswer: 'Backtick (\`)',
            explanation: 'Backtick (\`) adalah penanda resmi fitur template literals di JavaScript ES6.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Template Literals',
        points: [
          'Gunakan karakter backtick (\`) untuk mengawali dan mengakhiri string.',
          'Sisipkan variabel atau operasi hitung di dalam blok \${...}.',
          'Mendukung penulisan string multi-baris tanpa perlu karakter \\n berulang.',
        ],
      },
    ],
    commonMistakes: ['Menggunakan petik tunggal biasa (\') alih-alih backtick (\`).'],
    glossaryTerms: ['Template Literals', 'String Concatenation'],
    relatedLevels: ['code-t1-04'],
    relatedCaseFiles: ['case-03-web-umkm'],
  },
  {
    id: 'les-code-conditional-logic',
    track: 'coding',
    tier: 2,
    skillId: 'Conditional Logic',
    title: 'Percabangan Logika if / else & Operator Evaluasi',
    objectives: [
      'Membuat keputusan program menggunakan blok percabangan if dan else',
      'Menggunakan operator perbandingan: ===, !==, >=, <=',
      'Menangani kasus kelulusan masa percobaan karyawan secara otomatis',
    ],
    estimatedMinutes: 7,
    prerequisites: ['les-code-functions'],
    characterIntro: {
      characterId: 'maya',
      dialogue: 'HRD mengevaluasi ratusan karyawan magang. Dengan if-else, sistem dapat memverifikasi nilai kinerja dan absensi secara adil tanpa bias manusiawi.',
      tip: 'Ingat gunakan tiga tanda sama dengan (===) untuk perbandingan nilai yang ketat di JavaScript.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Struktur Logika Percabangan',
        content: 'Pernyataan if (kondisi) menjalankan blok kode jika kondisi bernilai true. Jika false, program berpindah ke blok else.',
        analogy: 'Seperti lampu lalu lintas: jika hijau jalan terus, jika merah berhenti.',
        officeContext: 'Evaluasi kelulusan probation karyawan: jika skor >= 75 lulus, jika tidak maka perpanjang.',
        keyTerms: ['if', 'else', '===', '>=', 'Boolean (true/false)'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Cek Kelulusan',
        explanation: 'Perhatikan kondisi pengecekan batas nilai minimal.',
        editorType: 'coding',
        initialData: {
          code: 'function cekKelulusan(skor) {\\n  if (skor >= 75) {\\n    return "LULUS";\\n  } else {\\n    return "REMIDIAL";\\n  }\\n}',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Kondisi skor >= 75 memeriksa ambang batas minimal kelulusan.', targetCode: 'if (skor >= 75)', highlightLabel: 'Kondisi' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Cek Saldo Cukup',
        instruction: 'Lengkapi fungsi untuk mengembalikan "CUKUP" jika saldo >= biaya, atau "KURANG".',
        editorType: 'coding',
        initialData: {
          code: 'function cekSaldo(saldo, biaya) {\\n  // tulis if-else di sini\\n}',
        },
        validationHint: 'if (saldo >= biaya) return "CUKUP"; else return "KURANG";',
        expectedOutput: 'if (saldo >= biaya)',
      },
      {
        type: 'kuis',
        title: 'Kuis Percabangan',
        questions: [
          {
            id: 'q-cnd-1',
            type: 'pilihan-ganda',
            prompt: 'Operator perbandingan manakah yang memeriksa apakah nilai dan tipe data sama persis?',
            options: ['===', '==', '=', '!='],
            correctAnswer: '===',
            explanation: '=== (strict equality) membandingkan nilai dan tipe data tanpa konversi paksa.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Percabangan',
        points: [
          'Gunakan if (kondisi) untuk memeriksa ekspresi logika boolean.',
          'Gunakan else untuk menangani skenario alternatif saat kondisi tidak terpenuhi.',
          'Selalu utamakan operator perbandingan ketat (===, >=, <=).',
        ],
      },
    ],
    commonMistakes: ['Menggunakan tanda sama dengan tunggal (=) di dalam kondisi if yang justru menimpa variabel.'],
    glossaryTerms: ['Conditional Logic'],
    relatedLevels: ['code-t2-01'],
    relatedCaseFiles: ['case-03-web-umkm'],
  },
  {
    id: 'les-code-multi-condition',
    track: 'coding',
    tier: 2,
    skillId: 'Multi-Condition Logic',
    title: 'Percabangan Multi-Kondisi: else if & Bonus Kinerja',
    objectives: [
      'Menyusun skenario bertingkat dengan rangkaian else if',
      'Mengklasifikasikan tier bonus performa karyawan (Gold, Silver, Bronze)',
      'Memastikan urutan evaluasi kondisi tidak saling menimpa',
    ],
    estimatedMinutes: 7,
    prerequisites: ['les-code-conditional-logic'],
    characterIntro: {
      characterId: 'sari',
      dialogue: 'Skema bonus kuartalan kantor memiliki 3 tingkatan target penjualan. Rangkaian else if memastikan setiap staf mendapatkan bonus sesuai prestasinya.',
      tip: 'Susun urutan kondisi dari nilai tertinggi ke terendah saat memeriksa batas atas.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Struktur Rangkaian else if',
        content: 'Rangkaian else if memeriksa kondisi alternatif secara berurutan. Begitu satu kondisi terpenuhi, blok tersebut dieksekusi dan pengecekan selesai.',
        analogy: 'Seperti tangga juara: cek podium 1 dulu, lalu podium 2, lalu podium 3.',
        officeContext: 'Penentuan persentase bonus pencapaian target penjualan tim marketing PT Maju Sejahtera.',
        keyTerms: ['else if', 'Tiering', 'Skema Bonus'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Tiering Bonus',
        explanation: 'Lihat evaluasi berurutan dari target tertinggi 100.',
        editorType: 'coding',
        initialData: {
          code: 'function hitungBonus(target) {\\n  if (target >= 100) {\\n    return 2000000;\\n  } else if (target >= 80) {\\n    return 1000000;\\n  } else {\\n    return 0;\\n  }\\n}',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Kondisi dicek dari target >= 100, lalu >= 80.', targetCode: 'else if (target >= 80)', highlightLabel: 'Kondisi Bertingkat' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Kategori Sedang',
        instruction: 'Tambahkan blok else if (skor >= 60) return "CUKUP"; sebelum else terakhir.',
        editorType: 'coding',
        initialData: {
          code: 'function nilaiGrade(skor) {\\n  if (skor >= 85) return "BAIK";\\n  // tambahkan else if di sini\\n  else return "KURANG";\\n}',
        },
        validationHint: 'else if (skor >= 60) return "CUKUP";',
        expectedOutput: 'else if (skor >= 60)',
      },
      {
        type: 'kuis',
        title: 'Kuis Multi-Kondisi',
        questions: [
          {
            id: 'q-mlt-1',
            type: 'pilihan-ganda',
            prompt: 'Mengapa urutan kondisi dari angka terbesar ke terkecil sangat penting pada evaluasi perbandingan >=?',
            options: [
              'Karena jika kondisi angka kecil ditaruh di awal, kondisi angka besar tidak akan pernah tersentuh',
              'Karena JavaScript membaca kode dari bawah ke atas',
              'Agar kode lebih cepat dikompilasi',
              'Tidak ada perbedaan sama sekali',
            ],
            correctAnswer: 'Karena jika kondisi angka kecil ditaruh di awal, kondisi angka besar tidak akan pernah tersentuh',
            explanation: 'JavaScript mengeksekusi blok pertama yang bernilai true dan langsung keluar dari struktur if-else.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Multi-Kondisi',
        points: [
          'Gunakan else if untuk memeriksa lebih dari dua skenario keputusan.',
          'Susun urutan pengecekan secara logis agar tidak terjadi kondisi yang terhalang.',
          'Sediakan blok else terakhir sebagai fallback default yang aman.',
        ],
      },
    ],
    commonMistakes: ['Menaruh kondisi >= 0 di urutan pertama sehingga seluruh nilai otomatis masuk ke blok pertama.'],
    glossaryTerms: ['Multi-Condition Logic', 'Conditional Logic'],
    relatedLevels: ['code-t2-02'],
    relatedCaseFiles: ['case-03-web-umkm'],
  },
  {
    id: 'les-code-logical-operators',
    track: 'coding',
    tier: 2,
    skillId: 'Logical Operators',
    title: 'Operator Logika Boolean: AND (&&), OR (||), NOT (!)',
    objectives: [
      'Menggabungkan beberapa syarat sekaligus menggunakan operator && (DAN)',
      'Menyediakan syarat alternatif menggunakan operator || (ATAU)',
      'Memvalidasi kelayakan kupon promo dan status aktif pelanggan',
    ],
    estimatedMinutes: 7,
    prerequisites: ['les-code-conditional-logic'],
    characterIntro: {
      characterId: 'intan',
      dialogue: 'Promo diskon kantor hanya berlaku jika belanja minimal Rp 100.000 DAN pelanggan sudah menjadi member aktif. Operator logika menggabungkan dua syarat ini dalam satu baris!',
      tip: '&& menghasilkan true hanya jika SEMUA syarat benar. || menghasilkan true jika SALAH SATU benar.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Tabel Kebenaran Logika Bisnis',
        content: 'Operator && (Logical AND) bernilai true hanya jika kedua kondisi terpenuhi. Operator || (Logical OR) bernilai true jika salah satu atau kedua kondisi terpenuhi.',
        analogy: 'Syarat naik jabatan: harus lulus ujian sertifikasi DAN masa kerja minimal 1 tahun.',
        officeContext: 'Validasi kelayakan voucher promo belanja dan fasilitas gratis ongkir.',
        keyTerms: ['&& (AND)', '|| (OR)', '! (NOT)', 'Short-Circuit Evaluation'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Validasi Voucher',
        explanation: 'Lihat penggabungan dua syarat menggunakan &&.',
        editorType: 'coding',
        initialData: {
          code: 'function validasiPromo(totalBelanja, isMember) {\\n  return totalBelanja >= 100000 && isMember === true;\\n}',
        },
        walkthrough: [
          { stepIndex: 0, instruction: '&& mewajibkan belanja >= 100000 sekaligus isMember bernilai true.', targetCode: '&& isMember === true', highlightLabel: 'Logika AND' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Logika OR',
        instruction: 'Lengkapi fungsi untuk mengembalikan true jika isWeekend || isHariLibur.',
        editorType: 'coding',
        initialData: {
          code: 'function bolehLibur(isWeekend, isHariLibur) {\\n  // kembalikan true jika weekend atau hari libur\\n}',
        },
        validationHint: 'return isWeekend || isHariLibur;',
        expectedOutput: 'return isWeekend || isHariLibur;',
      },
      {
        type: 'kuis',
        title: 'Kuis Operator Logika',
        questions: [
          {
            id: 'q-log-1',
            type: 'pilihan-ganda',
            prompt: 'Hasil dari ekspresi (true && false) adalah...',
            options: ['false', 'true', 'undefined', 'null'],
            correctAnswer: 'false',
            explanation: 'Operator AND (&&) membutuhkan seluruh operan bernilai true agar menghasilkan true.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Operator Logika',
        points: [
          'Gunakan && untuk mewajibkan seluruh persyaratan wajib terpenuhi.',
          'Gunakan || untuk memberikan opsi syarat alternatif fleksibel.',
          'Gunakan tanda seru (!) untuk membalik nilai kebenaran boolean.',
        ],
      },
    ],
    commonMistakes: ['Tertukar antara operator AND (&&) dan OR (||) saat validasi form.'],
    glossaryTerms: ['Logical Operators'],
    relatedLevels: ['code-t2-03'],
    relatedCaseFiles: ['case-03-web-umkm'],
  },
  {
    id: 'les-code-loops-iteration',
    track: 'coding',
    tier: 2,
    skillId: 'Loops & Iteration',
    title: 'Perulangan for & while: Akumulator dan Deret',
    objectives: [
      'Menjalankan tugas berulang otomatis dengan perulangan for',
      'Menggunakan variabel akumulator untuk menjumlahkan deret angka',
      'Menghindari infinite loop dengan memastikan kondisi batas tercapai',
    ],
    estimatedMinutes: 7,
    prerequisites: ['les-code-conditional-logic'],
    characterIntro: {
      characterId: 'dimas',
      dialogue: 'Dulu aku hitung total nota 100 lembar satu per satu sampai malam. Pakai loop for di JavaScript, komputer menghitung 10.000 transaksi dalam kedipan mata!',
      tip: 'Struktur for loop: for (let i = 0; i < n; i++) { ... }',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Konsep Akumulator dalam Loop',
        content: 'Perulangan for mengulangi blok instruksi selama kondisi evaluasi bernilai true. Variabel akumulator (misal let total = 0) digunakan untuk menampung pertambahan nilai di setiap putaran.',
        analogy: 'Seperti menghitung uang di celengan: ambil koin satu per satu lalu tambahkan ke jumlah total di tangan.',
        officeContext: 'Menghitung total akumulasi absensi lembur bulanan seluruh staf divisi.',
        keyTerms: ['for loop', 'Akumulator', 'Counter (i++)', 'Batas Loop'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Jumlahkan Deret 1 sampai N',
        explanation: 'Perhatikan pertambahan akumulator total di dalam loop.',
        editorType: 'coding',
        initialData: {
          code: 'function jumlahkanDeret(n) {\\n  let total = 0;\\n  for (let i = 1; i <= n; i++) {\\n    total += i;\\n  }\\n  return total;\\n}',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'total += i menambahkan nilai putaran saat ini ke penampung.', targetCode: 'total += i;', highlightLabel: 'Akumulasi' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Hitung Faktorial',
        instruction: 'Lengkapi perkalian hasil *= i di dalam for loop.',
        editorType: 'coding',
        initialData: {
          code: 'function faktorial(n) {\\n  let hasil = 1;\\n  for (let i = 1; i <= n; i++) {\\n    // kalikan hasil dengan i\\n  }\\n  return hasil;\\n}',
        },
        validationHint: 'hasil *= i;',
        expectedOutput: 'hasil *= i;',
      },
      {
        type: 'kuis',
        title: 'Kuis Perulangan',
        questions: [
          {
            id: 'q-loop-1',
            type: 'pilihan-ganda',
            prompt: 'Apakah yang terjadi jika kondisi batas pada perulangan tidak pernah bernilai false?',
            options: ['Terjadi infinite loop (loop tak terbatas) dan program macet', 'Program otomatis berhenti normal', 'Nilai berubah jadi nol', 'Tidak terjadi apa-apa'],
            correctAnswer: 'Terjadi infinite loop (loop tak terbatas) dan program macet',
            explanation: 'Infinite loop terjadi saat kondisi selalu bernilai true sehingga loop berjalan terus tanpa henti.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Perulangan',
        points: [
          'Inisialisasi variabel penghitung dan akumulator sebelum loop dimulai.',
          'Pastikan kondisi pemutus loop akan tercapai dengan pasti.',
          'Gunakan i++ untuk menaikkan langkah putaran setiap kali selesai satu siklus.',
        ],
      },
    ],
    commonMistakes: ['Lupa menulis i++ sehingga nilai i tidak pernah bertambah dan memicu infinite loop.'],
    glossaryTerms: ['Loops & Iteration'],
    relatedLevels: ['code-t2-04'],
    relatedCaseFiles: ['case-03-web-umkm'],
  },
  {
    id: 'les-code-array-operations',
    track: 'coding',
    tier: 2,
    skillId: 'Array Operations',
    title: 'Operasi Array: push, includes, length, dan Index',
    objectives: [
      'Menyimpan kumpulan data inventaris dalam struktur Array',
      'Menambahkan elemen baru dengan metode .push()',
      'Memeriksa keberadaan item dengan .includes() dan menghitung total dengan .length',
    ],
    estimatedMinutes: 7,
    prerequisites: ['les-code-functions'],
    characterIntro: {
      characterId: 'dimas',
      dialogue: 'Daftar barang gudang paling enak ditampung di Array. Mau tambah barang baru tinggal panggil .push(), mau cek stok tinggal .includes()!',
      tip: 'Array di JavaScript berbasis indeks nol: elemen pertama ada di [0].',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Manipulasi Daftar Array',
        content: 'Array adalah wadah berurutan untuk menyimpan banyak nilai sekaligus. Metode .push() menambahkan nilai ke ujung akhir, .includes(item) mengecek ketersediaan nilai, dan properti .length menghitung jumlah total elemen.',
        analogy: 'Seperti gerbong kereta api: gerbong baru dirangkaikan di bagian paling belakang.',
        officeContext: 'Pencatatan daftar perlengkapan ATK baru di inventaris kantor.',
        keyTerms: ['Array', '.push()', '.includes()', '.length'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Tambah Item Inventaris',
        explanation: 'Lihat bagaimana .push() menambah item ke array.',
        editorType: 'coding',
        initialData: {
          code: 'function tambahBarang(daftar, itemBaru) {\\n  daftar.push(itemBaru);\\n  return daftar;\\n}',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'daftar.push(itemBaru) menyisipkan item baru ke posisi terakhir.', targetCode: 'daftar.push(itemBaru);', highlightLabel: 'Push Item' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Cek Ketersediaan',
        instruction: 'Lengkapi fungsi untuk mengembalikan daftar.includes(item).',
        editorType: 'coding',
        initialData: {
          code: 'function cekStok(daftar, item) {\\n  // kembalikan apakah item ada di daftar\\n}',
        },
        validationHint: 'return daftar.includes(item);',
        expectedOutput: 'return daftar.includes(item);',
      },
      {
        type: 'kuis',
        title: 'Kuis Array',
        questions: [
          {
            id: 'q-arr-1',
            type: 'pilihan-ganda',
            prompt: 'Metode array manakah yang digunakan untuk menambahkan elemen baru ke posisi paling akhir?',
            options: ['.push()', '.pop()', '.shift()', '.splice()'],
            correctAnswer: '.push()',
            explanation: '.push() menambahkan satu atau lebih elemen ke ujung akhir array.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Operasi Array',
        points: [
          'Gunakan kurung siku [ ] untuk mendeklarasikan array.',
          'Gunakan metode .push() untuk menambah data baru ke urutan akhir.',
          'Gunakan .includes() untuk verifikasi pencarian nilai cepat bernilai boolean.',
        ],
      },
    ],
    commonMistakes: ['Mengira indeks pertama array adalah 1, padahal di JavaScript indeks pertama adalah 0.'],
    glossaryTerms: ['Array Operations'],
    relatedLevels: ['code-t2-05'],
    relatedCaseFiles: ['case-03-web-umkm'],
  },
  {
    id: 'les-code-array-map',
    track: 'coding',
    tier: 3,
    skillId: 'Array Transformation (map)',
    title: 'Transformasi Data Array dengan .map()',
    objectives: [
      'Mentransformasi setiap elemen array menjadi bentuk baru menggunakan .map()',
      'Mengonversi angka mentah harga menjadi format teks Rupiah',
      'Memahami fungsi murni tanpa mengubah array asli (immutability)',
    ],
    estimatedMinutes: 7,
    prerequisites: ['les-code-array-operations'],
    characterIntro: {
      characterId: 'intan',
      dialogue: 'Metode .map() adalah alat favorit para engineer modern. Daripada bikin for loop manual, .map() mengubah seluruh data array secara serentak dan elegan.',
      tip: '.map() selalu menghasilkan array baru dengan jumlah elemen yang persis sama.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Konsep Pemetaan Data .map()',
        content: 'Metode .map(callback) menjalankan fungsi callback pada setiap elemen array dan menghasilkan array baru berisi hasil kembalian callback tersebut.',
        analogy: 'Seperti mesin stempel pabrik: setiap kotak kue yang lewat di sabuk berjalan langsung diberi stempel tanggal kadaluarsa.',
        officeContext: 'Mengonversi daftar harga grosir menjadi harga eceran plus margin keuntungan 20%.',
        keyTerms: ['.map()', 'Callback Function', 'Transformasi', 'Immutability'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Format Rupiah Massal',
        explanation: 'Lihat bagaimana setiap angka diubah menjadi string berawalan "Rp ".',
        editorType: 'coding',
        initialData: {
          code: 'function formatDaftarHarga(daftarAngka) {\\n  return daftarAngka.map(harga => \`Rp \${harga.toLocaleString("id-ID")}\`);\\n}',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'daftarAngka.map mengubah setiap nilai harga menjadi teks Rupiah rapi.', targetCode: 'daftarAngka.map', highlightLabel: 'Array Map' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Gandakan Angka',
        instruction: 'Lengkapi pemetaan angka => angka * 2 di dalam .map().',
        editorType: 'coding',
        initialData: {
          code: 'function gandakan(arr) {\\n  return arr.map(x => x * 2);\\n}',
        },
        validationHint: 'return arr.map(x => x * 2);',
        expectedOutput: 'return arr.map(x => x * 2);',
      },
      {
        type: 'kuis',
        title: 'Kuis Array Map',
        questions: [
          {
            id: 'q-map-1',
            type: 'pilihan-ganda',
            prompt: 'Apakah metode .map() mengubah array data asli yang lama?',
            options: [
              'Tidak, .map() mengembalikan array baru dan membiarkan array lama utuh',
              'Ya, array lama otomatis terhapus dari memori',
              'Hanya jika array berisi angka',
              'Tergantung versi browser',
            ],
            correctAnswer: 'Tidak, .map() mengembalikan array baru dan membiarkan array lama utuh',
            explanation: '.map() menganut prinsip immutability: tidak memutasi array asli, melainkan mencetak array baru.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Array Map',
        points: [
          'Gunakan .map() saat ingin mengubah setiap item dalam array menjadi bentuk baru.',
          'Panjang array hasil selalu persis sama dengan panjang array awal.',
          'Pastikan fungsi callback di dalam .map() selalu mengembalikan nilai dengan return.',
        ],
      },
    ],
    commonMistakes: ['Lupa menyertakan return di dalam arrow function dengan kurung kurawal.'],
    glossaryTerms: ['Array Transformation (map)', 'Array Operations'],
    relatedLevels: ['code-t3-01'],
    relatedCaseFiles: ['case-03-web-umkm'],
  },
  {
    id: 'les-code-array-filter',
    track: 'coding',
    tier: 3,
    skillId: 'Array Filtering (filter)',
    title: 'Penyaringan Data Array dengan .filter()',
    objectives: [
      'Menyaring kumpulan data objek inventaris menggunakan .filter()',
      'Membuat predikat logika untuk memisahkan barang siap kirim vs stok habis',
      'Mengombinasikan filter multi-kriteria untuk laporan manajemen',
    ],
    estimatedMinutes: 7,
    prerequisites: ['les-code-array-operations'],
    characterIntro: {
      characterId: 'reza',
      dialogue: 'Dari ribuan data barang di gudang, finance hanya ingin melihat barang yang stoknya di bawah batas aman. .filter() adalah asisten sortir otomatis Anda.',
      tip: 'Callback di dalam .filter() harus mengembalikan boolean (true untuk disimpan, false untuk dibuang).',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Mekanisme Penyaringan .filter()',
        content: 'Metode .filter(predikat) memeriksa setiap elemen array. Jika fungsi predikat mengembalikan true, elemen dimasukkan ke array baru. Jika false, elemen diabaikan.',
        analogy: 'Seperti saringan tepung: butiran halus lolos ke wadah baru, gumpalan kasar tertahan.',
        officeContext: 'Menyaring pesanan pelanggan yang statusnya "SIAP_KIRIM" untuk diserahkan ke kurir logistik.',
        keyTerms: ['.filter()', 'Predikat Logika', 'Penyaringan Rekod'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Filter Stok Positif',
        explanation: 'Lihat penyaringan barang dengan stok lebih besar dari nol.',
        editorType: 'coding',
        initialData: {
          code: 'function filterTersedia(daftarBarang) {\\n  return daftarBarang.filter(b => b.stok > 0);\\n}',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'b => b.stok > 0 meloloskan hanya barang yang masih memiliki stok fisik.', targetCode: 'b.stok > 0', highlightLabel: 'Kondisi Saring' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Filter Angka Genap',
        instruction: 'Lengkapi filter angka => angka % 2 === 0.',
        editorType: 'coding',
        initialData: {
          code: 'function ambilGenap(angkaArr) {\\n  return angkaArr.filter(n => n % 2 === 0);\\n}',
        },
        validationHint: 'return angkaArr.filter(n => n % 2 === 0);',
        expectedOutput: 'return angkaArr.filter(n => n % 2 === 0);',
      },
      {
        type: 'kuis',
        title: 'Kuis Array Filter',
        questions: [
          {
            id: 'q-flt-1',
            type: 'pilihan-ganda',
            prompt: 'Apakah yang harus dikembalikan oleh fungsi predikat di dalam .filter()?',
            options: ['Nilai boolean (true atau false)', 'Angka indeks elemen', 'String pesan error', 'Array kosong'],
            correctAnswer: 'Nilai boolean (true atau false)',
            explanation: 'Fungsi predikat harus mengembalikan true untuk meloloskan item atau false untuk membuangnya.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Array Filter',
        points: [
          'Gunakan .filter() untuk membuang elemen yang tidak memenuhi kriteria.',
          'Array hasil bisa memiliki panjang lebih pendek atau bahkan kosong.',
          'Fungsi predikat wajib mengembalikan nilai kebenaran boolean.',
        ],
      },
    ],
    commonMistakes: ['Menggunakan .filter() saat ingin mengubah nilai isi item (seharusnya gunakan .map()).'],
    glossaryTerms: ['Array Filtering (filter)', 'Array Operations'],
    relatedLevels: ['code-t3-02'],
    relatedCaseFiles: ['case-03-web-umkm'],
  },
  {
    id: 'les-code-array-reduce',
    track: 'coding',
    tier: 3,
    skillId: 'Array Aggregation (reduce)',
    title: 'Agregasi Nilai Tunggal dengan .reduce()',
    objectives: [
      'Menjumlahkan seluruh total nilai belanja array transaksi menggunakan .reduce()',
      'Mengelola nilai akumulator dan nilai elemen berjalan (current value)',
      'Menentukan nilai awal (initial value) nol dengan aman',
    ],
    estimatedMinutes: 8,
    prerequisites: ['les-code-array-operations', 'les-code-loops-iteration'],
    characterIntro: {
      characterId: 'reza',
      dialogue: 'Tutup buku harian membutuhkan grand total dari ratusan baris nota. .reduce() memadatkan satu array panjang menjadi satu angka saldo akhir yang akurat.',
      tip: 'Selalu cantumkan angka 0 sebagai argumen kedua .reduce(..., 0) sebagai modal awal.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Konsep Akumulator .reduce()',
        content: 'Metode .reduce((acc, curr) => ..., initialValue) mengakumulasikan seluruh nilai array dari kiri ke kanan hingga menghasilkan satu nilai tunggal akhir.',
        analogy: 'Seperti bola salju yang menggelinding: makin menggelinding makin besar menampung seluruh salju di jalurnya.',
        officeContext: 'Menghitung grand total nilai inventaris seluruh gudang cabang PT Maju Sejahtera.',
        keyTerms: ['.reduce()', 'Akumulator (acc)', 'Initial Value', 'Grand Total'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Grand Total Angka',
        explanation: 'Lihat bagaimana nilai awal 0 bertambah seiring iterasi berjalan.',
        editorType: 'coding',
        initialData: {
          code: 'function totalInventaris(daftarNilai) {\\n  return daftarNilai.reduce((acc, curr) => acc + curr, 0);\\n}',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'acc + curr mengakumulasikan nilai item berjalan ke modal penampung.', targetCode: 'acc + curr', highlightLabel: 'Akumulasi' },
          { stepIndex: 1, instruction: 'Angka 0 di akhir adalah nilai awal akumulator.', targetCode: ', 0)', highlightLabel: 'Initial Value' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Jumlahkan Array',
        instruction: 'Lengkapi reduce((a, b) => a + b, 0).',
        editorType: 'coding',
        initialData: {
          code: 'function hitungTotal(arr) {\\n  return arr.reduce((a, b) => a + b, 0);\\n}',
        },
        validationHint: 'return arr.reduce((a, b) => a + b, 0);',
        expectedOutput: 'return arr.reduce((a, b) => a + b, 0);',
      },
      {
        type: 'kuis',
        title: 'Kuis Array Reduce',
        questions: [
          {
            id: 'q-red-1',
            type: 'pilihan-ganda',
            prompt: 'Mengapa menyertakan initial value (misal angka 0) sangat disarankan pada .reduce()?',
            options: [
              'Mencegah TypeError runtime jika array yang dihitung kebetulan kosong',
              'Agar fungsi berjalan dua kali lebih cepat',
              'Sebagai tanda bahwa array berisi string',
              'Hanya formalitas sintaks',
            ],
            correctAnswer: 'Mencegah TypeError runtime jika array yang dihitung kebetulan kosong',
            explanation: 'Menjalankan .reduce() pada array kosong tanpa initial value akan memicu error pembacaan.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Array Reduce',
        points: [
          'Gunakan .reduce() untuk meringkas array menjadi satu nilai tunggal (angka, string, atau objek).',
          'Pastikan fungsi penggabung selalu mengembalikan nilai akumulator terbaru.',
          'Selalu berikan nilai awal (initial value) seperti 0 atau {} demi keamanan.',
        ],
      },
    ],
    commonMistakes: ['Lupa memberikan nilai awal 0 sehingga memicu error pada data array kosong.'],
    glossaryTerms: ['Array Aggregation (reduce)', 'Array Operations'],
    relatedLevels: ['code-t3-03'],
    relatedCaseFiles: ['case-03-web-umkm'],
  },
  {
    id: 'les-code-pos-audit',
    track: 'coding',
    tier: 3,
    skillId: 'POS Audit Engine',
    title: 'Mesin Audit Kasir POS & Rekonsiliasi Transaksi',
    objectives: [
      'Membangun engine kalkulasi kasir POS terintegrasi (Subtotal, Diskon, Pajak, Grand Total)',
      'Memvalidasi integritas keranjang belanja multi-item',
      'Mengembalikan objek ringkasan struk standar audit keuangan',
    ],
    estimatedMinutes: 9,
    prerequisites: ['les-code-tax-calc', 'les-code-array-reduce', 'les-code-conditional-logic'],
    characterIntro: {
      characterId: 'reza',
      dialogue: 'Audit kasir adalah benteng pertahanan keuangan perusahaan. Fungsi kasir wajib menghitung subtotal, memverifikasi kupon diskon, memungut PPN 11%, dan menghasilkan objek struk yang sah.',
      tip: 'Hitung subtotal dulu via reduce, lalu kurangkan diskon, hitung PPN dari nilai setelah diskon, lalu jumlahkan total bayar.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Alur Penghitungan Transaksi POS Resmi',
        content: 'Urutan kalkulasi transaksi POS baku: (1) Subtotal: total harga x kuantitas seluruh item, (2) Potongan diskon kupon valid, (3) Dasar Pengenaan Pajak (DPP) = Subtotal - Diskon, (4) PPN 11% = Math.round(DPP * 0.11), (5) Grand Total = DPP + PPN.',
        analogy: 'Seperti pemeriksaan kasir supermarket: scan seluruh belanjaan, scan barcode kupon promo, lalu mesin cetak struk mengeluarkan rincian pajak dan total bayar.',
        officeContext: 'Engine kasir transaksi digital PT Maju Sejahtera.',
        keyTerms: ['Subtotal', 'Diskon', 'DPP', 'PPN 11%', 'Grand Total'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Engine Transaksi Komplit',
        explanation: 'Perhatikan alur kalkulasi berurutan pada fungsi prosesTransaksi di bawah.',
        editorType: 'coding',
        initialData: {
          code: 'function auditTransaksi(items, diskon) {\\n  const subtotal = items.reduce((sum, item) => sum + (item.harga * item.qty), 0);\\n  const dpp = Math.max(0, subtotal - diskon);\\n  const ppn = Math.round(dpp * 0.11);\\n  const total = dpp + ppn;\\n  return { subtotal, diskon, ppn, total };\\n}',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'items.reduce menghitung subtotal seluruh keranjang.', targetCode: 'items.reduce', highlightLabel: 'Subtotal' },
          { stepIndex: 1, instruction: 'Math.round(dpp * 0.11) menghitung nilai pajak resmi PPN 11%.', targetCode: 'Math.round(dpp * 0.11)', highlightLabel: 'PPN 11%' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Kembalikan Objek Struk',
        instruction: 'Lengkapi return { subtotal, ppn, total } di akhir fungsi.',
        editorType: 'coding',
        initialData: {
          code: 'function formatStruk(subtotal, ppn, total) {\\n  return { subtotal, ppn, total };\\n}',
        },
        validationHint: 'return { subtotal, ppn, total };',
        expectedOutput: 'return { subtotal, ppn, total };',
      },
      {
        type: 'kuis',
        title: 'Kuis POS Audit',
        questions: [
          {
            id: 'q-pos-1',
            type: 'pilihan-ganda',
            prompt: 'Pada alur kalkulasi kasir POS resmi, kapankah pajak PPN 11% dihitung?',
            options: [
              'Setelah subtotal dikurangi diskon potongan promosi (Dasar Pengenaan Pajak)',
              'Sebelum harga diskon diterapkan',
              'Hanya jika pelanggan membayar dengan uang tunai',
              'Pajak tidak boleh dimasukkan ke struk',
            ],
            correctAnswer: 'Setelah subtotal dikurangi diskon potongan promosi (Dasar Pengenaan Pajak)',
            explanation: 'Sesuai regulasi, PPN dipungut dari nilai riil yang ditransaksikan (DPP setelah potongan harga).',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Engine Audit POS',
        points: [
          'Kalkulasi subtotal secara akurat dari akumulasi perkalian harga dan kuantitas.',
          'Hitung nilai PPN 11% dari Dasar Pengenaan Pajak (setelah diskon).',
          'Kembalikan objek ringkasan lengkap agar transparan bagi bagian pembukuan.',
        ],
      },
    ],
    commonMistakes: ['Menghitung pajak dari subtotal kotor tanpa mengurangkan diskon voucher terlebih dahulu.'],
    glossaryTerms: ['POS Audit Engine', 'Tax Calculation'],
    relatedLevels: ['code-t3-boss'],
    relatedCaseFiles: ['case-03-web-umkm'],
  },
];
`;

fs.writeFileSync(path.join(process.cwd(), 'src/content/lessons/codingLessonsPatch.ts'), codingLessonsPatchContent, 'utf-8');
console.log('✅ Created src/content/lessons/codingLessonsPatch.ts');

// -------------------------------------------------------------
// 3. Word Lessons Patch
// -------------------------------------------------------------
const wordLessonsPatchContent = `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Pelajaran Word Bisnis & Akademik Tambahan (Tier 1-3 Batch C)
 */
import { Lesson } from '../../features/learning/types';

export const WORD_LESSONS_PATCH: Lesson[] = [
  {
    id: 'les-word-receipt',
    track: 'word',
    tier: 1,
    skillId: 'Receipt Formatting',
    title: 'Format Nota Pembelian & Tanda Terima Kasir UMKM',
    objectives: [
      'Menyusun struktur nota transaksi penjualan kasir mikro/UMKM',
      'Menampilkan rincian barang, harga, dan total Rupiah secara rapi',
      'Menggunakan penekanan tebal (Bold) pada grand total pembayaran',
    ],
    estimatedMinutes: 6,
    prerequisites: ['les-word-heading-hierarchy'],
    characterIntro: {
      characterId: 'dimas',
      dialogue: 'Nota pembelian adalah bukti sah transaksi bagi pelanggan. Format yang rapi dengan tanggal, rincian barang, dan total pembayaran memperkuat kepercayaan konsumen.',
      tip: 'Tebalkan teks Grand Total dan nomor nota agar mudah diarsipkan.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Struktur Nota Pembelian Mikro',
        content: 'Nota kasir formal memuat: (1) Nama Toko dan Judul NOTA PENJUALAN (H1), (2) Tanggal dan Nomor Nota, (3) Rincian daftar barang dan harga, (4) Total pembayaran dalam Rupiah dengan format tebal.',
        analogy: 'Seperti struk kasir toko buku: ringkas, padat, dan jelas jumlah uang yang dibayarkan.',
        officeContext: 'Nota belanja perlengkapan konsumsi rapat kantor di Toko Berkah Mandiri.',
        keyTerms: ['Nota Penjualan', 'Tanda Terima', 'Grand Total'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Nota Sederhana Rapi',
        explanation: 'Perhatikan susunan judul H1 dan rincian belanja di bawah.',
        editorType: 'word',
        initialData: {
          word: '<h1>NOTA PENJUALAN</h1><p>No: NT-2026-001 | Tanggal: 26 Oktober 2026</p><p>1. Air Mineral Dus - Rp 45.000<br/>2. Snack Rapat - Rp 75.000</p><p><strong>Total Pembayaran: Rp 120.000</strong></p>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Gunakan Heading 1 untuk NOTA PENJUALAN.', targetCode: '<h1>NOTA PENJUALAN</h1>', highlightLabel: 'Judul Nota' },
          { stepIndex: 1, instruction: 'Gunakan format tebal untuk Total Pembayaran.', targetCode: '<strong>Total Pembayaran', highlightLabel: 'Total Tebal' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Total Nota',
        instruction: 'Ketik teks <strong>Total: Rp 50.000</strong> pada baris akhir.',
        editorType: 'word',
        initialData: {
          word: '<h1>NOTA PEMBELIAN</h1><p>Kertas HVS - Rp 50.000</p>',
        },
        validationHint: 'Tambahkan <strong>Total: Rp 50.000</strong>',
        expectedOutput: 'Total: Rp 50.000',
      },
      {
        type: 'kuis',
        title: 'Kuis Format Nota',
        questions: [
          {
            id: 'q-rcp-1',
            type: 'pilihan-ganda',
            prompt: 'Elemen apakah yang wajib ditebalkan (bold) pada nota penjualan agar langsung terbaca kasir dan pembeli?',
            options: ['Nominal Total Pembayaran', 'Catatan kaki kecil', 'Nama kasir shift malam', 'Tanda koma'],
            correctAnswer: 'Nominal Total Pembayaran',
            explanation: 'Nominal total pembayaran wajib ditonjolkan agar tidak ada keraguan nominal uang yang ditransaksikan.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Nota Transaksi',
        points: [
          'Gunakan judul dokumen yang jelas (H1 NOTA PENJUALAN).',
          'Sertakan tanggal transaksi dan nomor tanda terima.',
          'Beri penekanan tebal (Bold) pada nominal total pembayaran.',
        ],
      },
    ],
    commonMistakes: ['Lupa mencantumkan tanggal transaksi pada nota.'],
    glossaryTerms: ['Receipt Formatting', 'Heading Hierarchy'],
    relatedLevels: ['word-t1-02'],
    relatedCaseFiles: ['case-01-sayur'],
  },
  {
    id: 'les-word-internal-memo',
    track: 'word',
    tier: 1,
    skillId: 'Internal Memo',
    title: 'Memo Internal Kantor & Penegasan Instruksi',
    objectives: [
      'Menyusun memo kedinasan internal kantor dengan format baku',
      'Mengisi kepala memo: Kepada, Dari, Tanggal, dan Perihal',
      'Menggunakan format penekanan tebal (bold) untuk instruksi mendesak',
    ],
    estimatedMinutes: 6,
    prerequisites: ['les-word-heading-hierarchy'],
    characterIntro: {
      characterId: 'sari',
      dialogue: 'Memo internal adalah instruksi tertulis langsung dari manajemen ke karyawan. Singkat, padat, dan langsung ke instruksi kerja tanpa basa-basi.',
      tip: 'Awali dengan blok MEMO INTERNAL dan cantumkan perihal instruksi dengan jelas.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Format Standar Memo Kantor',
        content: 'Memo dinas internal memuat kepala memo: MEMORANDUM (H1), Kepada (Yth), Dari (Pengirim), Tanggal, dan Perihal. Diikuti paragraf instruksi kerja yang jelas.',
        analogy: 'Seperti pengumuman di papan komando kantor yang harus dipatuhi seluruh divisi.',
        officeContext: 'Memo jadwal pemeliharaan server dan AC kantor PT Maju Sejahtera.',
        keyTerms: ['Memorandum', 'Kepada / Dari', 'Perihal', 'Instruksi Kerja'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Memo Kedinasan Rapi',
        explanation: 'Perhatikan format kepala memo di bawah.',
        editorType: 'word',
        initialData: {
          word: '<h1>MEMO INTERNAL</h1><p>Kepada: Seluruh Karyawan<br/>Dari: Bagian Operasional & HRD<br/>Perihal: Pemeliharaan Fasilitas Kantor</p><p>Diberitahukan bahwa pada hari <strong>Sabtu, 31 Oktober 2026</strong> akan dilakukan pembersihan menyeluruh. Harap amankan dokumen penting di laci terkunci.</p>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Heading 1 digunakan untuk judul MEMO INTERNAL.', targetCode: '<h1>MEMO INTERNAL</h1>', highlightLabel: 'Judul Memo' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Lengkapi Memo',
        instruction: 'Tambahkan kalimat instruksi berformat tebal pada memo.',
        editorType: 'word',
        initialData: {
          word: '<h1>MEMORANDUM</h1><p>Kepada: Tim Marketing</p><p>Harap serahkan laporan sebelum jam 17.00 WIB.</p>',
        },
        validationHint: 'Gunakan format penekanan yang jelas',
        expectedOutput: 'Harap serahkan',
      },
      {
        type: 'kuis',
        title: 'Kuis Memo Internal',
        questions: [
          {
            id: 'q-mem-1',
            type: 'pilihan-ganda',
            prompt: 'Apakah fungsi utama memo internal di lingkungan kantor?',
            options: [
              'Menyampaikan instruksi atau pengumuman kerja singkat antar divisi',
              'Membuat perjanjian kerjasama hukum dengan pihak luar',
              'Menulis skripsi akademik',
              'Membuat daftar belanja dapur pribadi',
            ],
            correctAnswer: 'Menyampaikan instruksi atau pengumuman kerja singkat antar divisi',
            explanation: 'Memo internal adalah instrumen komunikasi manajerial di dalam lingkup internal organisasi.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Memo Internal',
        points: [
          'Gunakan judul MEMORANDUM atau MEMO INTERNAL.',
          'Lengkapi kolom Kepada, Dari, Tanggal, dan Perihal.',
          'Tulis instruksi secara singkat, padat, dan tegas.',
        ],
      },
    ],
    commonMistakes: ['Menulis memo internal bertele-tele seperti surat kabar panjang.'],
    glossaryTerms: ['Internal Memo', 'Heading Hierarchy'],
    relatedLevels: ['word-t1-03'],
    relatedCaseFiles: ['case-01-sayur'],
  },
  {
    id: 'les-word-announcement',
    track: 'word',
    tier: 1,
    skillId: 'Official Announcement',
    title: 'Surat Pengumuman Kantor & Daftar Bullet',
    objectives: [
      'Menyusun surat pengumuman resmi perusahaan yang komunikatif',
      'Menggunakan daftar butir (bullet list) untuk poin-poin ketentuan kantor',
      'Menyertakan penutup pengumuman yang formal dan ditandatangani manajemen',
    ],
    estimatedMinutes: 6,
    prerequisites: ['les-word-heading-hierarchy'],
    characterIntro: {
      characterId: 'maya',
      dialogue: 'Pengumuman jam kerja atau libur nasional dibaca ratusan karyawan. Gunakan bullet list agar poin penting terserap dalam sekali pandang!',
      tip: 'Poin penting wajib disajikan dalam daftar rincian <ul> dan <li>.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Format Surat Pengumuman',
        content: 'Pengumuman kantor memuat judul resmi (PENGUMUMAN), kalimat pengantar, daftar poin ketentuan memakai bullet list, dan kalimat penutup bertanda tangan pimpinan.',
        analogy: 'Seperti mading kantor pusat: pengumuman libur harus ringkas dan mudah dipahami seketika.',
        officeContext: 'Pengumuman cuti bersama dan penyesuaian jam kerja hari raya PT Maju Sejahtera.',
        keyTerms: ['Pengumuman', 'Bullet List', 'Ketentuan Jam Kerja'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Pengumuman Ber-bullet',
        explanation: 'Lihat kerapian daftar ketentuan menggunakan bullet list.',
        editorType: 'word',
        initialData: {
          word: '<h1>PENGUMUMAN MANAJEMEN</h1><p>Sehubungan dengan libur nasional, diberitahukan jadwal kerja sebagai berikut:</p><ul><li>Operasional kantor tutup pada hari Senin.</li><li>Layanan customer service darurat tetap aktif 24 jam.</li></ul><p>Demikian pengumuman ini disampaikan untuk diketahui bersama.</p>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Tag <ul> dan <li> membuat daftar butir yang rapi dan mudah dicerna.', targetCode: '<ul>', highlightLabel: 'Bullet List' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Butir Ketentuan',
        instruction: 'Tambahkan <li>Presensi normal kembali hari Selasa.</li> di dalam tag <ul>.',
        editorType: 'word',
        initialData: {
          word: '<h1>PENGUMUMAN</h1><ul><li>Libur dimulai hari Senin.</li></ul>',
        },
        validationHint: 'Tambahkan <li>Presensi normal kembali hari Selasa.</li>',
        expectedOutput: 'Presensi normal',
      },
      {
        type: 'kuis',
        title: 'Kuis Pengumuman',
        questions: [
          {
            id: 'q-anc-1',
            type: 'pilihan-ganda',
            prompt: 'Format apakah yang paling efektif untuk menyajikan daftar rincian hari libur atau ketentuan jam kerja?',
            options: ['Daftar butir (bullet list)', 'Satu paragraf padat 10 baris', 'Teks miring berderet', 'Catatan kaki kecil'],
            correctAnswer: 'Daftar butir (bullet list)',
            explanation: 'Daftar butir memberikan pemindaian visual (scanning) cepat bagi seluruh staf kantor.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Pengumuman Kantor',
        points: [
          'Awali dengan judul tegas PENGUMUMAN MANAJEMEN.',
          'Gunakan bullet list untuk memecah rincian peraturan atau jadwal.',
          'Tutup dengan penegasan tanggal berlaku dan tanda tangan penanggung jawab.',
        ],
      },
    ],
    commonMistakes: ['Menumpuk seluruh ketentuan tanggal dalam satu kalimat panjang tanpa jeda baris.'],
    glossaryTerms: ['Official Announcement', 'Heading Hierarchy'],
    relatedLevels: ['word-t1-04'],
    relatedCaseFiles: ['case-01-sayur'],
  },
  {
    id: 'les-word-pricelist',
    track: 'word',
    tier: 1,
    skillId: 'Price List Document',
    title: 'Dokumen Daftar Harga & Menu Layanan Kantor',
    objectives: [
      'Menyusun dokumen daftar tarif dan menu layanan kantin/ATK',
      'Memadukan Heading 1 untuk judul dan Heading 2 untuk sub-kategori',
      'Menata item dan nominal harga secara sejajar dan profesional',
    ],
    estimatedMinutes: 6,
    prerequisites: ['les-word-heading-hierarchy'],
    characterIntro: {
      characterId: 'dimas',
      dialogue: 'Daftar harga perlengkapan kantor yang rapi dengan subjudul kategori memudahkan staf divisi saat memesan ATK atau konsumsi rapat.',
      tip: 'Gunakan H1 untuk judul katalog dan H2 untuk nama kelompok produk.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Hierarki Dokumen Daftar Harga',
        content: 'Dokumen katalog daftar harga menggunakan H1 untuk nama katalog utama, H2 untuk memisahkan kategori (misal: Makanan Berat, Minuman, Alat Tulis), dan daftar butir untuk item berserta harga.',
        analogy: 'Buku menu restoran: nama restoran di cover, sup/sayur/minuman di bab masing-masing.',
        officeContext: 'Daftar menu katering harian dan harga paket makan siang karyawan kantor.',
        keyTerms: ['Daftar Harga', 'Subjudul Kategori (H2)', 'Nominal Rupiah'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Katalog Menu Rapi',
        explanation: 'Lihat pemisahan kategori dengan Heading 2 di bawah.',
        editorType: 'word',
        initialData: {
          word: '<h1>DAFTAR HARGA KANTIN SEJAHTERA</h1><h2>Paket Makan Siang</h2><p>- Nasi Ayam Bakar: Rp 25.000<br/>- Nasi Ikan Gurame: Rp 30.000</p><h2>Minuman Segar</h2><p>- Es Jeruk Peras: Rp 8.000<br/>- Teh Manis Hangat: Rp 5.000</p>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Heading 2 memisahkan kategori secara hierarkis.', targetCode: '<h2>Paket Makan Siang</h2>', highlightLabel: 'Kategori H2' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Kategori Snack',
        instruction: 'Tambahkan <h2>Aneka Snack</h2> diikuti nama makanan dan harga.',
        editorType: 'word',
        initialData: {
          word: '<h1>DAFTAR HARGA</h1><!-- Tambahkan kategori snack di sini -->',
        },
        validationHint: 'Tambahkan <h2>Aneka Snack</h2>',
        expectedOutput: '<h2>Aneka Snack</h2>',
      },
      {
        type: 'kuis',
        title: 'Kuis Daftar Harga',
        questions: [
          {
            id: 'q-prc-1',
            type: 'pilihan-ganda',
            prompt: 'Heading level berapakah yang tepat digunakan untuk membedakan kategori kelompok barang dalam daftar harga?',
            options: ['Heading 2 (H2)', 'Heading 1 (H1)', 'Teks paragraf biasa', 'Superscript'],
            correctAnswer: 'Heading 2 (H2)',
            explanation: 'Heading 2 adalah sub-judul yang ideal untuk membagi bab atau kategori di bawah judul utama H1.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Dokumen Daftar Harga',
        points: [
          'Gunakan H1 untuk judul katalog daftar harga.',
          'Gunakan H2 untuk setiap sub-kategori produk.',
          'Format nominal harga dengan lambang Rp dan pemisah ribuan titik yang konsisten.',
        ],
      },
    ],
    commonMistakes: ['Mencampur seluruh barang tanpa membagi ke dalam kategori H2.'],
    glossaryTerms: ['Price List Document', 'Heading Hierarchy'],
    relatedLevels: ['word-t1-05'],
    relatedCaseFiles: ['case-01-sayur'],
  },
  {
    id: 'les-word-official-letter',
    track: 'word',
    tier: 2,
    skillId: 'Official Letter Structure',
    title: 'Surat Resmi Perusahaan & Standar Penomoran Indonesia',
    objectives: [
      'Menyusun surat dinas resmi dengan nomor surat standar Indonesia',
      'Mengisi kepala surat: Lampiran, Perihal, Alamat Tujuan, dan Salam Pembuka',
      'Menyertakan penutup formal dengan tempat, tanggal, jabatan, dan nama penandatangan',
    ],
    estimatedMinutes: 7,
    prerequisites: ['les-word-heading-hierarchy'],
    characterIntro: {
      characterId: 'maya',
      dialogue: 'Surat dinas keluar adalah perwakilan hukum dan wibawa perusahaan. Penomoran surat yang baku (No: 001/MS-DIR/XI/2026) mencerminkan ketertiban administrasi kantor.',
      tip: 'Format nomor surat Indonesia: [Nomor Urut]/[Kode Divisi]/[Bulan Romawi]/[Tahun].',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Anatomi Surat Dinas Indonesia',
        content: 'Surat resmi memuat: (1) Kop Perusahaan, (2) Nomor Surat, Lampiran, dan Perihal, (3) Alamat Tujuan (Kepada Yth), (4) Salam Pembuka (Dengan hormat), (5) Paragraf Isi, (6) Salam Penutup dan Tanda Tangan Pimpinan.',
        analogy: 'Seperti paspor kedutaan: setiap segel dan nomor dokumen memiliki arti legalitas formal.',
        officeContext: 'Surat permohonan audiensi kemitraan dari Direksi PT Maju Sejahtera ke dinas terkait.',
        keyTerms: ['Nomor Surat', 'Lampiran', 'Perihal', 'Dengan Hormat'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Kepala Surat Dinas',
        explanation: 'Perhatikan format penomoran surat resmi di bawah.',
        editorType: 'word',
        initialData: {
          word: '<h1>PT MAJU SEJAHTERA</h1><p>Nomor: 045/MS-DIR/X/2026<br/>Lampiran: 1 (satu) Berkas<br/>Perihal: Permohonan Audiensi Kemitraan</p><p>Kepada Yth.<br/>Kepala Dinas Koperasi dan UMKM<br/>di Tempat</p><p>Dengan hormat,</p><p>Sehubungan dengan program binaan CSR perusahaan kami...</p>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Nomor surat, Lampiran, dan Perihal diletakkan di bawah kop.', targetCode: 'Nomor: 045/MS-DIR/X/2026', highlightLabel: 'Nomor Surat' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Salam Penutup',
        instruction: 'Tambahkan penutup "Hormat kami,<br/>Direktur Operasional" di akhir surat.',
        editorType: 'word',
        initialData: {
          word: '<p>Demikian surat ini kami sampaikan.</p>',
        },
        validationHint: 'Tambahkan Hormat kami',
        expectedOutput: 'Hormat kami',
      },
      {
        type: 'kuis',
        title: 'Kuis Surat Resmi',
        questions: [
          {
            id: 'q-off-1',
            type: 'pilihan-ganda',
            prompt: 'Salam pembuka apakah yang menjadi standar baku surat dinas formal di Indonesia?',
            options: ['Dengan hormat,', 'Halo semuanya,', 'Salam kenal,', 'Selamat pagi teman-teman,'],
            correctAnswer: 'Dengan hormat,',
            explanation: '"Dengan hormat," adalah salam pembuka baku dalam korespondensi bisnis dan dinas resmi di Indonesia.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Surat Resmi',
        points: [
          'Gunakan format nomor surat resmi yang memuat nomor urut, divisi, bulan romawi, dan tahun.',
          'Awali isi surat dengan salam pembuka formal "Dengan hormat,".',
          'Lengkapi identitas penandatangan mencakup nama terang dan jabatan.',
        ],
      },
    ],
    commonMistakes: ['Lupa mencantumkan perihal surat sehingga penerima kesulitan mengarsipkan surat.'],
    glossaryTerms: ['Official Letter Structure', 'Heading Hierarchy'],
    relatedLevels: ['word-t2-02'],
    relatedCaseFiles: ['case-01-sayur'],
  },
  {
    id: 'les-word-ats-resume',
    track: 'word',
    tier: 2,
    skillId: 'ATS-Friendly Resume',
    title: 'Curriculum Vitae (CV) ATS-Friendly Profesional',
    objectives: [
      'Menyusun CV dengan format yang mudah dibaca sistem ATS (Applicant Tracking System)',
      'Menghindari grafik rumit, tabel bertumpuk, atau kolom ganda yang membingungkan bot',
      'Menggunakan Heading standar: Riwayat Pekerjaan, Pendidikan, dan Keterampilan',
    ],
    estimatedMinutes: 7,
    prerequisites: ['les-word-heading-hierarchy'],
    characterIntro: {
      characterId: 'maya',
      dialogue: 'HRD masa kini memakai software ATS untuk memindai ribuan CV pelamar. Format CV yang sederhana dengan heading bersih dan teks linier menjamin CV Anda lolos ke meja wawancara!',
      tip: 'Gunakan layout 1 kolom, font standar, dan bullet list untuk deskripsi prestasi kerja.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Kaidah Format ATS Resume',
        content: 'CV ATS-Friendly memprioritaskan keterbacaan teks oleh mesin parser: (1) Nama lengkap pelamar sebagai H1, (2) Informasi kontak linier, (3) Subheading baku (H2): Pengalaman Kerja, Pendidikan, Keterampilan, (4) Poin tugas diawali kata kerja aksi aktif.',
        analogy: 'Seperti formulir aplikasi paspor: mesin scanner menyukai huruf yang jelas tanpa ornamen grafis berat.',
        officeContext: 'Penyusunan berkas lamaran kerja internal untuk promosi posisi Staf Senior.',
        keyTerms: ['ATS-Friendly', 'Single Column', 'Action Verbs', 'Keyword Optimization'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Struktur CV Lolos ATS',
        explanation: 'Lihat susunan hierarki yang mudah diparsing sistem rekrutmen.',
        editorType: 'word',
        initialData: {
          word: '<h1>BUDI PRASETYO</h1><p>Jakarta | budi@email.com | 0812-3456-7890</p><h2>PENGALAMAN KERJA</h2><p><strong>Staf Operasional - PT Maju Sejahtera</strong> (2024 - Sekarang)</p><ul><li>Mengelola rekapitulasi data penjualan harian 50 mitra UMKM.</li><li>Mengotomatisasi pelaporan mingguan menggunakan rumus Excel tingkat lanjut.</li></ul><h2>PENDIDIKAN</h2><p><strong>S1 Sistem Informasi</strong> - Universitas Indonesia (2020 - 2024)</p>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Heading 1 untuk Nama Pelamar dan Heading 2 untuk Bagian Pengalaman.', targetCode: '<h2>PENGALAMAN KERJA</h2>', highlightLabel: 'Heading ATS' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Keterampilan',
        instruction: 'Tambahkan <h2>KETERAMPILAN</h2> diikuti daftar keahlian software kantor.',
        editorType: 'word',
        initialData: {
          word: '<h1>NAMA LENGKAP</h1><h2>PENGALAMAN KERJA</h2><!-- Tambahkan keahlian di sini -->',
        },
        validationHint: 'Tambahkan <h2>KETERAMPILAN</h2>',
        expectedOutput: '<h2>KETERAMPILAN</h2>',
      },
      {
        type: 'kuis',
        title: 'Kuis CV ATS',
        questions: [
          {
            id: 'q-ats-1',
            type: 'pilihan-ganda',
            prompt: 'Mengapa penggunaan layout 2 kolom berornamen grafis rumit dihindari pada CV ATS-friendly?',
            options: [
              'Karena software parser ATS dapat salah membaca urutan baris atau melewatkan teks di kolom kedua',
              'Karena ukuran filenya selalu terlalu besar',
              'Karena printer kantor tidak bisa mencetak warna',
              'Hanya tradisi lama',
            ],
            correctAnswer: 'Karena software parser ATS dapat salah membaca urutan baris atau melewatkan teks di kolom kedua',
            explanation: 'Sistem ATS memindai teks dari kiri ke kanan secara linier; tata letak tabel atau multi-kolom sering membuat urutan pengalaman tertukar.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah CV ATS-Friendly',
        points: [
          'Gunakan struktur 1 kolom dengan hierarki Heading standar (H1 dan H2).',
          'Hindari tabel rumit, ikon grafis, atau kotak teks mengambang.',
          'Awali setiap poin pencapaian dengan kata kerja aksi yang terukur.',
        ],
      },
    ],
    commonMistakes: ['Memasukkan informasi penting ke dalam kotak teks (text box) yang tidak bisa dibaca scanner ATS.'],
    glossaryTerms: ['ATS-Friendly Resume', 'Heading Hierarchy'],
    relatedLevels: ['word-t2-03'],
    relatedCaseFiles: ['case-01-sayur'],
  },
  {
    id: 'les-word-recommendation',
    track: 'word',
    tier: 2,
    skillId: 'Letter of Recommendation',
    title: 'Surat Rekomendasi Kerja Karyawan Teladan',
    objectives: [
      'Menyusun surat rekomendasi kerja formal dari atasan untuk bawahan',
      'Menguraikan rekam jejak integritas, etos kerja, dan pencapaian karyawan',
      'Menyertakan pernyataan rekomendasi tegas dan kontak verifikasi atasan',
    ],
    estimatedMinutes: 6,
    prerequisites: ['les-word-official-letter'],
    characterIntro: {
      characterId: 'sari',
      dialogue: 'Sebagai atasan, menulis surat rekomendasi adalah bentuk apresiasi tertinggi bagi staf yang berkinerja prima. Bahasa yang digunakan harus objektif, terukur, dan meyakinkan institusi penerima.',
      tip: 'Sertakan contoh konkret kontribusi positif karyawan selama bekerja.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Struktur Surat Rekomendasi Kerja',
        content: 'Surat rekomendasi memuat: (1) Judul SURAT REKOMENDASI KERJA, (2) Identitas pemberi rekomendasi, (3) Identitas karyawan yang direkomendasikan, (4) Evaluasi kinerja dan karakter kerja, (5) Kalimat rekomendasi tanpa keraguan, dan (6) Tanda tangan resmi.',
        analogy: 'Seperti jaminan sertifikat kualitas emas: atasan menjamin secara moral kemampuan stafnya.',
        officeContext: 'Surat rekomendasi dari Direktur Operasional untuk staf magang yang mendaftar beasiswa S2.',
        keyTerms: ['Surat Rekomendasi', 'Evaluasi Kinerja', 'Etos Kerja'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Paragraf Rekomendasi Meyakinkan',
        explanation: 'Lihat kalimat penilaian objektif atasan di bawah.',
        editorType: 'word',
        initialData: {
          word: '<h1>SURAT REKOMENDASI KERJA</h1><p>Saya yang bertanda tangan di bawah ini:<br/>Nama: Ibu Sari Dewi<br/>Jabatan: Direktur Operasional PT Maju Sejahtera</p><p>Memberikan rekomendasi penuh kepada Sdr. Dimas Prasetyo atas integritas, dedikasi, dan kemampuannya menyelesaikan proyek tepat waktu.</p>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Identitas atasan pemberi rekomendasi dicantumkan dengan jelas.', targetCode: 'Jabatan: Direktur Operasional', highlightLabel: 'Identitas Atasan' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Kalimat Penutup',
        instruction: 'Tambahkan kalimat "Demikian surat rekomendasi ini dibuat dengan sebenarnya.".',
        editorType: 'word',
        initialData: {
          word: '<h1>SURAT REKOMENDASI</h1><p>Karyawan berprestasi sangat baik.</p>',
        },
        validationHint: 'Tambahkan kalimat penutup',
        expectedOutput: 'surat rekomendasi ini dibuat',
      },
      {
        type: 'kuis',
        title: 'Kuis Surat Rekomendasi',
        questions: [
          {
            id: 'q-rec-1',
            type: 'pilihan-ganda',
            prompt: 'Apakah aspek paling utama yang dinilai pembaca dari surat rekomendasi kerja?',
            options: [
              'Penilaian konkret mengenai karakter, integritas, dan keahlian kerja karyawan',
              'Panjang dokumen minimal 10 halaman',
              'Warna tinta kertas',
              'Foto paspor karyawan',
            ],
            correctAnswer: 'Penilaian konkret mengenai karakter, integritas, dan keahlian kerja karyawan',
            explanation: 'Surat rekomendasi bernilai tinggi jika memuat bukti nyata integritas dan pencapaian karyawan.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Surat Rekomendasi',
        points: [
          'Cantumkan identitas lengkap dan jabatan atasan pemberi rekomendasi.',
          'Berikan ulasan kinerja yang objektif disertai contoh pencapaian nyata.',
          'Tutup dengan kesediaan diverifikasi dan tanda tangan resmi.',
        ],
      },
    ],
    commonMistakes: ['Menulis rekomendasi yang terlalu umum tanpa menyebutkan bidang keahlian spesifik karyawan.'],
    glossaryTerms: ['Letter of Recommendation', 'Official Letter Structure'],
    relatedLevels: ['word-t2-04'],
    relatedCaseFiles: ['case-01-sayur'],
  },
  {
    id: 'les-word-sop',
    track: 'word',
    tier: 2,
    skillId: 'Standard Operating Procedure',
    title: 'Standar Operasional Prosedur (SOP) Berpenomoran',
    objectives: [
      'Menyusun dokumen SOP operasional kantor yang terstandarisasi',
      'Mengisi bab SOP: Tujuan, Ruang Lingkup, Tanggung Jawab, dan Prosedur',
      'Menggunakan numbered list berjenjang untuk urutan instruksi kerja',
    ],
    estimatedMinutes: 8,
    prerequisites: ['les-word-heading-hierarchy'],
    characterIntro: {
      characterId: 'reza',
      dialogue: 'SOP adalah kitab panduan kerja kantor. Siapapun yang bertugas, hasil pekerjaan harus tetap sama standarnya jika mengikuti langkah-langkah berpenomoran di SOP ini.',
      tip: 'Gunakan H2 untuk setiap bab SOP dan daftar nomor (ol) untuk tahapan aksi.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Anatomi Dokumen SOP Modern',
        content: 'Dokumen SOP memuat: (1) Judul SOP (H1), (2) Nomor Dokumen dan Tanggal Berlaku, (3) 1.0 Tujuan, (4) 2.0 Ruang Lingkup, (5) 3.0 Prosedur Pelaksanaan (numbered list 1, 2, 3...).',
        analogy: 'Seperti buku resep koki restoran bintang lima: takaran dan urutan memasak tidak boleh tertukar.',
        officeContext: 'SOP pembukaan kasir dan rekonsiliasi uang kas harian PT Maju Sejahtera.',
        keyTerms: ['SOP', 'Tujuan & Ruang Lingkup', 'Numbered List', 'Prosedur Kerja'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Struktur Bab SOP',
        explanation: 'Lihat pembagian bab SOP dengan penomoran jelas.',
        editorType: 'word',
        initialData: {
          word: '<h1>STANDAR OPERASIONAL PROSEDUR (SOP)</h1><p>No: SOP-OPS-01 | Tanggal: 1 November 2026</p><h2>1.0 TUJUAN</h2><p>Menjamin kelancaran dan akurasi rekonsiliasi kasir harian.</p><h2>2.0 PROSEDUR KERJA</h2><ol><li>Menyalakan mesin kasir dan memastikan kertas struk terpasang.</li><li>Menghitung modal awal kas kecil bersama supervisor.</li><li>Menginput saldo awal ke sistem POS.</li></ol>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Tag <ol> dan <li> menyusun urutan langkah kerja berpenomoran tertib.', targetCode: '<ol>', highlightLabel: 'Numbered List' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Langkah Kerja',
        instruction: 'Tambahkan <li>Menyerahkan laporan ke supervisor.</li> di dalam tag <ol>.',
        editorType: 'word',
        initialData: {
          word: '<h2>PROSEDUR</h2><ol><li>Cetak rekapan.</li></ol>',
        },
        validationHint: 'Tambahkan <li>Menyerahkan laporan ke supervisor.</li>',
        expectedOutput: 'Menyerahkan laporan',
      },
      {
        type: 'kuis',
        title: 'Kuis SOP',
        questions: [
          {
            id: 'q-sop-1',
            type: 'pilihan-ganda',
            prompt: 'Mengapa bagian Prosedur Kerja pada dokumen SOP wajib menggunakan numbered list (daftar bernomor)?',
            options: [
              'Agar urutan tahapan kerja dieksekusi secara kronologis dan tidak ada langkah yang terlewati',
              'Agar terlihat lebih panjang',
              'Karena alfabet tidak diperbolehkan',
              'Hanya preferensi estetika',
            ],
            correctAnswer: 'Agar urutan tahapan kerja dieksekusi secara kronologis dan tidak ada langkah yang terlewati',
            explanation: 'Numbered list memastikan alur instruksi kerja dieksekusi secara berurutan dan kronologis.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Dokumen SOP',
        points: [
          'Cantumkan nomor dokumen, versi, dan tanggal berlaku di bagian header.',
          'Pisahkan bab Tujuan, Ruang Lingkup, dan Prosedur Pelaksanaan menggunakan H2.',
          'Gunakan daftar bernomor kronologis untuk setiap instruksi langkah kerja.',
        ],
      },
    ],
    commonMistakes: ['Menuliskan instruksi langkah kerja dalam paragraf panjang tanpa penomoran urut.'],
    glossaryTerms: ['Standard Operating Procedure', 'Heading Hierarchy'],
    relatedLevels: ['word-t2-05'],
    relatedCaseFiles: ['case-01-sayur'],
  },
  {
    id: 'les-word-bast',
    track: 'word',
    tier: 2,
    skillId: 'Asset Handover Protocol',
    title: 'Berita Acara Serah Terima Barang (BAST) Inventaris',
    objectives: [
      'Menyusun dokumen hukum Berita Acara Serah Terima (BAST) aset kantor',
      'Mendefinisikan Pihak Pertama (Penyerah) dan Pihak Kedua (Penerima)',
      'Menampilkan tabel rincian spesifikasi barang dan nomor seri inventaris',
    ],
    estimatedMinutes: 7,
    prerequisites: ['les-word-table-creation'],
    characterIntro: {
      characterId: 'reza',
      dialogue: 'Setiap aset laptop atau kendaraan dinas yang diserahkan ke staf wajib memiliki BAST bermeterai. Tabel rincian nomor seri memastikan aset perusahaan tidak hilang tertukar.',
      tip: 'Gunakan tabel untuk merinci nama barang, nomor seri, jumlah, dan kondisi fisik.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Struktur Hukum Dokumen BAST',
        content: 'BAST memuat: (1) Judul BERITA ACARA SERAH TERIMA BARANG, (2) Hari dan tanggal serah terima, (3) Identitas Pihak Pertama dan Kedua, (4) Tabel rincian barang, (5) Klausul pengalihan tanggung jawab, dan (6) Kolom tanda tangan kedua belah pihak.',
        analogy: 'Seperti akad serah terima kunci rumah: ada daftar barang bawaan yang dicek bersama sebelum kunci berpindah tangan.',
        officeContext: 'Serah terima laptop kerja dan perlengkapan kerja untuk staf baru PT Maju Sejahtera.',
        keyTerms: ['BAST', 'Pihak Pertama & Kedua', 'Tabel Spesifikasi', 'Kondisi Barang'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Tabel Spesifikasi BAST',
        explanation: 'Lihat tabel inventaris pada dokumen serah terima di bawah.',
        editorType: 'word',
        initialData: {
          word: '<h1>BERITA ACARA SERAH TERIMA BARANG</h1><p>Pada hari ini, Senin 26 Oktober 2026, telah diserahkan aset berikut:</p><table><thead><tr><th>No</th><th>Nama Barang</th><th>Nomor Seri</th><th>Kondisi</th></tr></thead><tbody><tr><td>1</td><td>Laptop ThinkPad T14</td><td>SN-2026-9812</td><td>Baik / Baru</td></tr></tbody></table><p>Pihak Pertama (Penyerah) &nbsp;&nbsp;&nbsp;&nbsp; Pihak Kedua (Penerima)</p>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Tabel memuat spesifikasi teknis dan nomor seri aset secara rinci.', targetCode: '<table>', highlightLabel: 'Tabel BAST' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Baris Aset',
        instruction: 'Tambahkan baris <tr><td>2</td><td>Mouse Wireless</td><td>SN-MS-01</td><td>Baik</td></tr> di <tbody>.',
        editorType: 'word',
        initialData: {
          word: '<table><tbody><tr><td>1</td><td>Monitor</td><td>SN-001</td><td>Baik</td></tr></tbody></table>',
        },
        validationHint: 'Tambahkan baris mouse',
        expectedOutput: 'Mouse Wireless',
      },
      {
        type: 'kuis',
        title: 'Kuis BAST',
        questions: [
          {
            id: 'q-bst-1',
            type: 'pilihan-ganda',
            prompt: 'Mengapa nomor seri (serial number) wajib dicantumkan dalam tabel BAST inventaris barang elektronik?',
            options: [
              'Untuk memverifikasi keaslian dan mencegah aset perusahaan tertukar saat pengembalian',
              'Hanya untuk memenuhi kuota kolom tabel',
              'Agar nomor registrasi tampak profesional',
              'Tidak ada fungsi hukumnya',
            ],
            correctAnswer: 'Untuk memverifikasi keaslian dan mencegah aset perusahaan tertukar saat pengembalian',
            explanation: 'Nomor seri adalah identitas unik perangkat keras yang memvalidasi fisik aset pada pembukuan aset perusahaan.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Dokumen BAST',
        points: [
          'Nyatakan hari, tanggal, dan tempat pelaksanaan serah terima.',
          'Sajikan rincian barang, jumlah, dan nomor seri dalam tabel terstruktur.',
          'Sediakan kolom tanda tangan berdampingan untuk Pihak Pertama dan Pihak Kedua.',
        ],
      },
    ],
    commonMistakes: ['Tidak mencantumkan kondisi fisik barang saat diserahkan (misal: Baik / Baru).'],
    glossaryTerms: ['Asset Handover Protocol', 'Table Creation'],
    relatedLevels: ['word-t2-06'],
    relatedCaseFiles: ['case-01-sayur'],
  },
  {
    id: 'les-word-executive-summary',
    track: 'word',
    tier: 3,
    skillId: 'Executive Summary',
    title: 'Ringkasan Eksekutif Laporan Bisnis Triwulanan',
    objectives: [
      'Menulis ringkasan eksekutif (Executive Summary) yang padat untuk jajaran direksi',
      'Menampilkan metrik utama omzet, laba, dan pertumbuhan kuartalan',
      'Menyajikan tabel rekapitulasi performa bisnis yang bersih',
    ],
    estimatedMinutes: 8,
    prerequisites: ['les-word-heading-hierarchy', 'les-word-table-creation'],
    characterIntro: {
      characterId: 'sari',
      dialogue: 'Direksi tidak punya waktu membaca laporan 50 halaman. Ringkasan Eksekutif di halaman pembuka harus menjawab 3 hal dalam 2 menit: Berapa omzet kita? Apakah laba tumbuh? Apa langkah kuartal depan?',
      tip: 'Gunakan tabel ikhtisar metrik dan poin rekomendasi strategis.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Prinsip Menulis Executive Summary',
        content: 'Executive Summary adalah intisari laporan bisnis: (1) Latar belakang kinerja, (2) Tabel ringkasan indikator performa utama (KPI), (3) Analisis penyebab pertumbuhan atau penurunan, dan (4) Rekomendasi aksi strategis manajemen.',
        analogy: 'Seperti trailer film bioskop: dalam durasi singkat, penonton langsung memahami plot inti cerita.',
        officeContext: 'Laporan kinerja bisnis triwulan III untuk rapat dewan komisaris PT Maju Sejahtera.',
        keyTerms: ['Executive Summary', 'Key Performance Indicators (KPI)', 'Rekomendasi Strategis'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Ikhtisar Kinerja Bisnis',
        explanation: 'Lihat penyajian metrik keuangan yang langsung ke inti hasil.',
        editorType: 'word',
        initialData: {
          word: '<h1>LAPORAN KINERJA TRIWULAN III 2026</h1><h2>Ringkasan Eksekutif</h2><p>Sepanjang Kuartal III 2026, PT Maju Sejahtera berhasil membukukan pertumbuhan pendapatan sebesar <strong>18,5%</strong> year-on-year.</p><table><thead><tr><th>Indikator</th><th>Target</th><th>Realisasi</th><th>Capaian</th></tr></thead><tbody><tr><td>Total Pendapatan</td><td>Rp 1,2 M</td><td>Rp 1,35 M</td><td>112,5%</td></tr><tr><td>Laba Bersih</td><td>Rp 300 Jt</td><td>Rp 340 Jt</td><td>113,3%</td></tr></tbody></table>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Tabel rekapitulasi memperlihatkan capaian target secara transparan.', targetCode: '<table>', highlightLabel: 'Tabel KPI' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Baris Pelanggan',
        instruction: 'Tambahkan baris <tr><td>Pelanggan Baru</td><td>100</td><td>125</td><td>125%</td></tr> di tabel.',
        editorType: 'word',
        initialData: {
          word: '<table><tbody><tr><td>Omzet</td><td>Rp 100 Jt</td><td>Rp 110 Jt</td><td>110%</td></tr></tbody></table>',
        },
        validationHint: 'Tambahkan baris Pelanggan Baru',
        expectedOutput: 'Pelanggan Baru',
      },
      {
        type: 'kuis',
        title: 'Kuis Ringkasan Eksekutif',
        questions: [
          {
            id: 'q-exs-1',
            type: 'pilihan-ganda',
            prompt: 'Apakah tujuan utama penulisan Ringkasan Eksekutif pada laporan bisnis korporat?',
            options: [
              'Memberikan gambaran komprehensif performa dan rekomendasi bagi pimpinan pengambil keputusan',
              'Memperbanyak jumlah kata agar laporan tampak tebal',
              'Sebagai pelengkap halaman kosong',
              'Menyembunyikan angka kerugian',
            ],
            correctAnswer: 'Memberikan gambaran komprehensif performa dan rekomendasi bagi pimpinan pengambil keputusan',
            explanation: 'Ringkasan eksekutif memfasilitasi pengambilan keputusan strategis secara cepat dan terarah.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Ringkasan Eksekutif',
        points: [
          'Fokus pada hasil akhir, angka pertumbuhan, dan laba riil.',
          'Sajikan data performa dalam tabel indikator kinerja yang ringkas.',
          'Tutup dengan rekomendasi langkah strategis untuk kuartal berikutnya.',
        ],
      },
    ],
    commonMistakes: ['Menulis ringkasan eksekutif yang bertele-tele tanpa mencantumkan angka performa riil.'],
    glossaryTerms: ['Executive Summary', 'Table Creation'],
    relatedLevels: ['word-t3-02'],
    relatedCaseFiles: ['case-01-sayur'],
  },
  {
    id: 'les-word-csr-proposal',
    track: 'word',
    tier: 3,
    skillId: 'CSR Proposal Matrix',
    title: 'Proposal Kegiatan CSR & Matriks Rencana Anggaran Biaya',
    objectives: [
      'Menyusun proposal kegiatan bakti sosial dan kemitraan CSR',
      'Menyajikan latar belakang program, sasaran penerima, dan kepanitiaan',
      'Membangun tabel Rencana Anggaran Biaya (RAB) yang transparan',
    ],
    estimatedMinutes: 8,
    prerequisites: ['les-word-heading-hierarchy', 'les-word-table-creation'],
    characterIntro: {
      characterId: 'maya',
      dialogue: 'Proposal CSR harus menyentuh hati sekaligus akuntabel di mata auditor. Matriks Rencana Anggaran Biaya (RAB) membuktikan setiap rupiah dana perusahaan disalurkan secara amanah.',
      tip: 'Gunakan tabel RAB dengan kolom Uraian, Volume, Satuan, Harga Satuan, dan Total Biaya.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Struktur Proposal CSR Resmi',
        content: 'Proposal CSR terdiri dari: (1) Judul Proposal (H1), (2) 1.0 Latar Belakang (H2), (3) 2.0 Sasaran dan Bentuk Kegiatan, (4) 3.0 Matriks Rencana Anggaran Biaya (RAB) dalam bentuk tabel, dan (5) Penutup serta Pengesahan.',
        analogy: 'Seperti cetak biru pembangunan jembatan: tujuan kemanusiaan jelas dan anggaran semen/besi dihitung rinci.',
        officeContext: 'Program CSR pemberdayaan digital UMKM sekitar kantor PT Maju Sejahtera.',
        keyTerms: ['Proposal CSR', 'Rencana Anggaran Biaya (RAB)', 'Matriks Biaya'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Matriks Anggaran RAB',
        explanation: 'Lihat rincian tabel anggaran dana kegiatan CSR di bawah.',
        editorType: 'word',
        initialData: {
          word: '<h1>PROPOSAL PROGRAM CSR UMKM BERDAYA</h1><h2>1.0 Latar Belakang Masalah</h2><p>Mendukung transformasi digital pelaku usaha mikro binaan.</p><h2>2.0 Rencana Anggaran Biaya (RAB)</h2><table><thead><tr><th>No</th><th>Kebutuhan</th><th>Vol</th><th>Biaya Satuan</th><th>Subtotal</th></tr></thead><tbody><tr><td>1</td><td>Pelatihan Excel & Kasir</td><td>2 Hari</td><td>Rp 1.500.000</td><td>Rp 3.000.000</td></tr><tr><td>2</td><td>Bantuan Perangkat Tablet</td><td>5 Unit</td><td>Rp 2.000.000</td><td>Rp 10.000.000</td></tr></tbody></table>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Tabel RAB menyajikan rincian biaya yang transparan dan siap diaudit.', targetCode: '<table>', highlightLabel: 'Tabel RAB' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Biaya Konsumsi',
        instruction: 'Tambahkan baris <tr><td>3</td><td>Konsumsi Rapat</td><td>50 Paket</td><td>Rp 30.000</td><td>Rp 1.500.000</td></tr> di tabel RAB.',
        editorType: 'word',
        initialData: {
          word: '<table><tbody><tr><td>1</td><td>Sewa Ruang</td><td>1 Hari</td><td>Rp 500.000</td><td>Rp 500.000</td></tr></tbody></table>',
        },
        validationHint: 'Tambahkan Konsumsi Rapat',
        expectedOutput: 'Konsumsi Rapat',
      },
      {
        type: 'kuis',
        title: 'Kuis Proposal CSR',
        questions: [
          {
            id: 'q-csr-1',
            type: 'pilihan-ganda',
            prompt: 'Bagian manakah dalam proposal kegiatan yang paling menentukan persetujuan dari divisi keuangan (Finance)?',
            options: [
              'Tabel Rencana Anggaran Biaya (RAB) yang transparan dan rasional',
              'Desain sampul berwarna warni',
              'Jumlah panitia yang banyak',
              'Puisi pembuka',
            ],
            correctAnswer: 'Tabel Rencana Anggaran Biaya (RAB) yang transparan dan rasional',
            explanation: 'Finance menilai kelayakan proposal dari transparansi dan akurasi tabel Rencana Anggaran Biaya.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Proposal CSR',
        points: [
          'Jelaskan dampak sosial program pada latar belakang masalah.',
          'Sajikan rincian biaya dalam tabel Rencana Anggaran Biaya (RAB) terperinci.',
          'Sertakan sasaran target penerima manfaat yang terukur.',
        ],
      },
    ],
    commonMistakes: ['Hanya menuliskan total anggaran gelondongan tanpa tabel rincian volume dan harga satuan.'],
    glossaryTerms: ['CSR Proposal Matrix', 'Table Creation'],
    relatedLevels: ['word-t3-03'],
    relatedCaseFiles: ['case-01-sayur'],
  },
  {
    id: 'les-word-literature-review',
    track: 'word',
    tier: 3,
    skillId: 'Literature Review Format',
    title: 'Format Makalah Ilmiah Bab 2: Tinjauan Pustaka & Sitasi',
    objectives: [
      'Menyusun Bab 2 Tinjauan Pustaka sesuai kaidah akademik Indonesia',
      'Menautkan rujukan teori ilmiah dengan penanda sitasi [2]',
      'Menyajikan matriks perbandingan penelitian terdahulu menggunakan tabel',
    ],
    estimatedMinutes: 8,
    prerequisites: ['les-word-academic-format', 'les-word-citations'],
    characterIntro: {
      characterId: 'maya',
      dialogue: 'Bab 2 Tinjauan Pustaka adalah fondasi ilmiah skripsi atau laporan PKL. Setiap kutipan teori wajib memiliki sitasi rujukan yang valid untuk mencegah plagiarisme.',
      tip: 'Gunakan H1 untuk BAB II TINJAUAN PUSTAKA dan H2 untuk 2.1 Landasan Teori.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Struktur Akademik Bab 2',
        content: 'Bab 2 memuat: (1) Judul BAB II TINJAUAN PUSTAKA (H1), (2) 2.1 Landasan Teori (H2) dengan sitasi pustaka [1], [2], (3) 2.2 Penelitian Terdahulu dalam bentuk tabel perbandingan studi empiris.',
        analogy: 'Seperti mendirikan bangunan bertingkat: teori ilmiah yang dikutip adalah pilar pondasi yang menopang riset kita.',
        officeContext: 'Penyusunan laporan magang akademik PKL mahasiswa di PT Maju Sejahtera.',
        keyTerms: ['BAB II', 'Tinjauan Pustaka', 'Sitasi Akademik [2]', 'Penelitian Terdahulu'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Format Tinjauan Pustaka Baku',
        explanation: 'Lihat integrasi sitasi teori dan tabel penelitian terdahulu di bawah.',
        editorType: 'word',
        initialData: {
          word: '<h1>BAB II TINJAUAN PUSTAKA</h1><h2>2.1 Teori Efisiensi Operasional</h2><p>Menurut Pratama (2025) <sup>[2]</sup>, otomatisasi pembukuan digital mampu memangkas waktu kerja administrasi hingga 40%.</p><h2>2.2 Penelitian Terdahulu</h2><table><thead><tr><th>Peneliti</th><th>Metode</th><th>Hasil</th></tr></thead><tbody><tr><td>Kusuma (2024)</td><td>Analisis Deskriptif</td><td>Pengurangan salah hitung 95%</td></tr></tbody></table>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Penanda sitasi <sup>[2]</sup> merujuk pada daftar pustaka akademik resmi.', targetCode: '<sup>[2]</sup>', highlightLabel: 'Sitasi [2]' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Sitasi Teori',
        instruction: 'Tambahkan penanda sitasi <sup>[2]</sup> pada kutipan teori.',
        editorType: 'word',
        initialData: {
          word: '<h2>2.1 Landasan Teori</h2><p>Sistem informasi berbasis web meningkatkan akurasi data inventaris.</p>',
        },
        validationHint: 'Tambahkan <sup>[2]</sup> atau [2]',
        expectedOutput: '[2]',
      },
      {
        type: 'kuis',
        title: 'Kuis Tinjauan Pustaka',
        questions: [
          {
            id: 'q-lit-1',
            type: 'pilihan-ganda',
            prompt: 'Mengapa pencantuman sitasi (rujukan pustaka) bersifat mutlak pada Bab 2 karya ilmiah?',
            options: [
              'Untuk menghargai karya intelektual peneliti terdahulu dan menghindari tuduhan plagiarisme',
              'Agar daftar pustaka terlihat banyak',
              'Hanya syarat administrasi jilid',
              'Tidak wajib jika buku berbahasa Indonesia',
            ],
            correctAnswer: 'Untuk menghargai karya intelektual peneliti terdahulu dan menghindari tuduhan plagiarisme',
            explanation: 'Sitasi akademik adalah kewajiban etika ilmiah untuk menghormati sumber teori orisinal dan mencegah plagiarisme.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Bab 2 Tinjauan Pustaka',
        points: [
          'Gunakan H1 untuk judul bab utama (BAB II TINJAUAN PUSTAKA).',
          'Sertakan penanda sitasi seperti [1] atau [2] pada setiap gagasan yang dikutip.',
          'Gunakan tabel untuk menyajikan komparasi studi penelitian terdahulu secara ringkas.',
        ],
      },
    ],
    commonMistakes: ['Menyalin kutipan teori secara langsung tanpa mencantumkan penanda sitasi rujukan.'],
    glossaryTerms: ['Literature Review Format', 'Citation Styles'],
    relatedLevels: ['word-t3-04'],
    relatedCaseFiles: ['case-01-sayur'],
  },
  {
    id: 'les-word-mou-agreement',
    track: 'word',
    tier: 3,
    skillId: 'Partnership Agreement (MoU)',
    title: 'Surat Perjanjian Kerjasama (MoU) Vendor Bisnis',
    objectives: [
      'Menyusun naskah hukum perjanjian kerjasama (MoU / Kontrak) bisnis',
      'Merumuskan klausul Pasal 1: Ruang Lingkup dan Pasal 2: Nilai Kontrak',
      'Menyertakan tabel termin pembayaran dan klausul penyelesaian sengketa',
    ],
    estimatedMinutes: 8,
    prerequisites: ['les-word-official-letter', 'les-word-table-creation'],
    characterIntro: {
      characterId: 'sari',
      dialogue: 'Kontrak kerjasama (MoU) mengikat hak dan kewajiban kedua pihak secara hukum. Pasal-pasalnya harus tegas, jelas, dan memuat tabel termin pembayaran yang transparan.',
      tip: 'Gunakan H2 untuk setiap nomor pasal (PASAL 1, PASAL 2) dan rincikan hak serta kewajiban.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Struktur Surat Perjanjian Bisnis',
        content: 'Naskah kontrak MoU memuat: (1) Judul SURAT PERJANJIAN KERJASAMA (H1), (2) Komparisi para pihak, (3) PASAL 1: HAK DAN KEWAJIBAN (H2), (4) PASAL 2: NILAI KONTRAK & CARA PEMBAYARAN beserta tabel termin, dan (5) Lembar pengesahan tanda tangan di atas meterai.',
        analogy: 'Seperti piagam perdamaian atau kontrak pemain sepak bola: semua aturan main disepakati sebelum pertandingan dimulai.',
        officeContext: 'Perjanjian kerjasama pengadaan katering dan konsumsi rapat harian PT Maju Sejahtera.',
        keyTerms: ['MoU', 'Perjanjian Kerjasama', 'Pasal Kontrak', 'Termin Pembayaran'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Format Pasal Kontrak Resmi',
        explanation: 'Lihat susunan pasal dan tabel termin pembayaran di bawah.',
        editorType: 'word',
        initialData: {
          word: '<h1>SURAT PERJANJIAN KERJASAMA (MoU)</h1><p>Nomor: 012/MOU-MS/XI/2026</p><h2>PASAL 1: RUANG LINGKUP PEKERJAAN</h2><p>PIHAK PERTAMA menunjuk PIHAK KEDUA sebagai penyedia jasa katering makan siang kantor.</p><h2>PASAL 2: NILAI KONTRAK DAN PEMBAYARAN</h2><table><thead><tr><th>Termin</th><th>Tahapan</th><th>Persentase</th><th>Nominal</th></tr></thead><tbody><tr><td>Termin 1</td><td>Uang Muka (DP)</td><td>30%</td><td>Rp 15.000.000</td></tr><tr><td>Termin 2</td><td>Pelunasan Akhir Bulan</td><td>70%</td><td>Rp 35.000.000</td></tr></tbody></table>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Pasal-pasal kontrak disusun hierarkis dengan Heading 2.', targetCode: '<h2>PASAL 1', highlightLabel: 'Pasal Kontrak' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Pasal Sanksi',
        instruction: 'Tambahkan <h2>PASAL 3: SANKSI DAN DENDA</h2> di bawah pasal 2.',
        editorType: 'word',
        initialData: {
          word: '<h2>PASAL 2: PEMBAYARAN</h2><p>Pembayaran via transfer bank.</p>',
        },
        validationHint: 'Tambahkan <h2>PASAL 3: SANKSI DAN DENDA</h2>',
        expectedOutput: 'PASAL 3',
      },
      {
        type: 'kuis',
        title: 'Kuis Perjanjian Kerjasama',
        questions: [
          {
            id: 'q-mou-1',
            type: 'pilihan-ganda',
            prompt: 'Apakah fungsi utama pencantuman klausul Pasal dalam dokumen perjanjian kerjasama (MoU)?',
            options: [
              'Menegaskan hak dan kewajiban hukum masing-masing pihak agar terhindar dari wanprestasi dan sengketa',
              'Hanya sebagai pelengkap format dokumen',
              'Membuat dokumen menjadi mahal',
              'Syarat pendaftaran NPWP',
            ],
            correctAnswer: 'Menegaskan hak dan kewajiban hukum masing-masing pihak agar terhindar dari wanprestasi dan sengketa',
            explanation: 'Pasal-pasal kontrak adalah instrumen hukum yang melindungi kedua belah pihak dari risiko wanprestasi.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Surat Perjanjian MoU',
        points: [
          'Tentukan identitas dan kedudukan hukum Pihak Pertama dan Pihak Kedua secara jelas.',
          'Bagi aturan kesepakatan ke dalam pasal-pasal tematik menggunakan H2.',
          'Cantumkan nilai kontrak dan termin pembayaran secara eksplisit dalam tabel.',
        ],
      },
    ],
    commonMistakes: ['Tidak mencantumkan nomor surat perjanjian atau tanggal dimulainya kontrak.'],
    glossaryTerms: ['Partnership Agreement (MoU)', 'Official Letter Structure'],
    relatedLevels: ['word-t3-05'],
    relatedCaseFiles: ['case-01-sayur'],
  },
  {
    id: 'les-word-proposal-matrix',
    track: 'word',
    tier: 3,
    skillId: 'Business Proposal Matrix',
    title: 'Proposal Bisnis Komprehensif: Eksekutif, Anggaran, & Jadwal',
    objectives: [
      'Menyusun proposal bisnis komprehensif tingkat profesional untuk dewan direksi/klien',
      'Mengintegrasikan Ringkasan Eksekutif, Rencana Kerja, dan Matriks Rencana Anggaran Biaya',
      'Menyertakan rujukan pustaka/sitasi data pasar dan jadwal pelaksanaan proyek',
    ],
    estimatedMinutes: 9,
    prerequisites: ['les-word-executive-summary', 'les-word-csr-proposal'],
    characterIntro: {
      characterId: 'sari',
      dialogue: 'Ini adalah puncak keahlian penyusunan dokumen bisnis! Proposal komprehensif ini menggabungkan ringkasan eksekutif memikat, matriks anggaran transparan, dan time schedule yang terukur.',
      tip: 'Gunakan struktur bab H1 Proposal, H2 Ringkasan Eksekutif, H2 Rencana Anggaran, dan tabel jadwal kerja.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Struktur Proposal Bisnis Komprehensif',
        content: 'Proposal bisnis tingkat lanjut memuat: (1) Judul Utama Proposal Pengadaan (H1), (2) Ringkasan Eksekutif (H2), (3) Latar Belakang & Analisis Kebutuhan (H2), (4) Rencana Anggaran Biaya (RAB) berupa tabel, dan (5) Rekomendasi serta Jadwal Implementasi.',
        analogy: 'Seperti presentasi pitching tender bernilai miliaran rupiah: setiap halaman dokumen memancarkan profesionalisme dan akurasi tinggi.',
        officeContext: 'Proposal proyek transformasi digital operasional pergudangan PT Maju Sejahtera.',
        keyTerms: ['Proposal Bisnis', 'Ringkasan Eksekutif', 'Tabel Anggaran', 'Time Schedule'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Dokumen Proposal Terpadu',
        explanation: 'Lihat integrasi bab eksekutif dan tabel anggaran di bawah.',
        editorType: 'word',
        initialData: {
          word: '<h1>PROPOSAL BISNIS TRANSFORMASI DIGITAL</h1><h2>Ringkasan Eksekutif</h2><p>Inisiatif modernisasi sistem operasional kantor untuk meningkatkan efisiensi kerja sebesar 35%.</p><h2>Rencana Anggaran Biaya (RAB)</h2><table><thead><tr><th>Fase</th><th>Uraian Pekerjaan</th><th>Alokasi Dana</th></tr></thead><tbody><tr><td>Fase 1</td><td>Audit Sistem & Desain</td><td>Rp 25.000.000</td></tr><tr><td>Fase 2</td><td>Implementasi POS & Web</td><td>Rp 75.000.000</td></tr></tbody></table>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Dokumen proposal memadukan H1, H2, dan tabel rencana anggaran komplit.', targetCode: '<h2>Ringkasan Eksekutif</h2>', highlightLabel: 'Eksekutif' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Jadwal Pelaksanaan',
        instruction: 'Tambahkan <h2>Jadwal Pelaksanaan</h2> di akhir dokumen.',
        editorType: 'word',
        initialData: {
          word: '<h1>PROPOSAL PENGADAAN</h1><h2>Anggaran Biaya</h2><p>Total: Rp 100 Juta</p>',
        },
        validationHint: 'Tambahkan <h2>Jadwal Pelaksanaan</h2>',
        expectedOutput: 'Jadwal Pelaksanaan',
      },
      {
        type: 'kuis',
        title: 'Kuis Proposal Komprehensif',
        questions: [
          {
            id: 'q-prm-1',
            type: 'pilihan-ganda',
            prompt: 'Kombinasi elemen apakah yang wajib ada pada proposal bisnis tingkat profesional agar lolos seleksi tender?',
            options: [
              'Ringkasan eksekutif, tabel rencana anggaran biaya yang rinci, dan jadwal kerja realistis',
              'Cerita fiksi yang menghibur',
              'Daftar menu makan siang panitia',
              'Kertas dokumen wangi',
            ],
            correctAnswer: 'Ringkasan eksekutif, tabel rencana anggaran biaya yang rinci, dan jadwal kerja realistis',
            explanation: 'Ketiga elemen tersebut adalah parameter utama uji kelayakan investasi bisnis oleh dewan direksi.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Proposal Bisnis Komprehensif',
        points: [
          'Awali dengan Ringkasan Eksekutif yang menjelaskan nilai bisnis dan ROI (Return on Investment).',
          'Sajikan rincian biaya proyek secara transparan dalam tabel anggaran RAB.',
          'Sertakan jadwal timeline pelaksanaan bertahap untuk akuntabilitas monitoring.',
        ],
      },
    ],
    commonMistakes: ['Mengajukan proposal tanpa tabel rincian biaya yang jelas sehingga ditolak bagian finance.'],
    glossaryTerms: ['Business Proposal Matrix', 'Executive Summary'],
    relatedLevels: ['word-t3-boss'],
    relatedCaseFiles: ['case-01-sayur'],
  },
];
`;

fs.writeFileSync(path.join(process.cwd(), 'src/content/lessons/wordLessonsPatch.ts'), wordLessonsPatchContent, 'utf-8');
console.log('✅ Created src/content/lessons/wordLessonsPatch.ts');

console.log('Completed lesson patch generation.');
