/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Master Content Patch Builder for KantorKu v2.0
 */

const fs = require('fs');
const path = require('path');

console.log('Generating complete KantorKu content patch...');

// 1. Write webLessonsPatch.ts
const webLessonsPatch = `/**
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
fs.writeFileSync(path.join(process.cwd(), 'src/content/lessons/webLessonsPatch.ts'), webLessonsPatch, 'utf-8');
console.log('✅ Created webLessonsPatch.ts');

console.log('Building codingLessonsPatch and wordLessonsPatch next...');
