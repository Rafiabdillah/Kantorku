/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu v2.0 - Pelajaran Web Frontend (Web Lessons)
 * Meliputi: HTML5 Semantik, Flexbox, Desain Kartu Produk, Tombol CTA, dan Alignment Responsif.
 */

import { Lesson } from '../../features/learning/types';

export const WEB_LESSONS: Lesson[] = [
  // 1. HTML Structure & Semantic Tags
  {
    id: 'les-web-html-structure',
    track: 'web',
    tier: 1,
    skillId: 'HTML Structure',
    title: 'Struktur Fondasi HTML5 & Tag Semantik',
    objectives: [
      'Memahami kerangka dasar dokumen web HTML5',
      'Menggunakan tag semantik: <header>, <main>, <section>, <footer>',
      'Menghindari kebiasaan buruk tumpukan div tanpa arti (div soup)',
    ],
    estimatedMinutes: 6,
    prerequisites: [],
    characterIntro: {
      characterId: 'intan',
      dialogue: 'Banyak pemula membungkus seluruh halaman web pakai <div><div><div> sampai pusing sendiri! Tag semantik HTML5 seperti <header> dan <main> membuat websitemu dicintai Google SEO dan mudah dirawat tim programmer.',
      tip: 'Tag semantik memberitahu fungsi bagian: header untuk atas, main untuk isi, footer untuk bawah.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Anatomi Semantik Halaman Web',
        content: 'HTML (HyperText Markup Language) adalah kerangka dasar sebuah situs web. Daripada menggunakan tag serbaguna <div> untuk segala hal, HTML5 menyediakan tag semantik yang memiliki makna jelas: (1) <header> untuk kepala situs atau navigasi utama, (2) <main> untuk konten unik utama, (3) <section> untuk kelompok topik tertentu, dan (4) <footer> untuk informasi penutup, kontak, dan hak cipta.',
        analogy: 'Seperti bagian tubuh manusia: ada kepala (header), badan (main), dan kaki (footer). Kita tidak menyebut semuanya sebagai "gumpalan daging" (div).',
        officeContext: 'Membangun landing page resmi profil UMKM binaan CSR PT Maju Sejahtera agar ramah mesin pencari Google.',
        keyTerms: ['Tag Semantik', '<header>', '<main>', '<footer>'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Kerangka Semantik Bersih',
        explanation: 'Perhatikan kerangka tiga serangkai header, main, dan footer di bawah.',
        editorType: 'web',
        initialData: {
          html: '<header>\n  <h1>Toko Roti Makmur</h1>\n</header>\n<main>\n  <p>Menyajikan roti panggang hangat setiap pagi.</p>\n</main>\n<footer>\n  <p>&copy; 2026 PT Maju Sejahtera</p>\n</footer>',
          css: 'header { background: #059669; color: white; padding: 10px; }\nmain { padding: 15px; }\nfooter { background: #1e293b; color: #94a3b8; padding: 10px; font-size: 12px; }',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Bagian <header> membungkus nama toko dengan latar hijau.', targetCode: '<header>', highlightLabel: 'Header Semantik' },
          { stepIndex: 1, instruction: 'Bagian <main> menampung penjelasan produk utama.', targetCode: '<main>', highlightLabel: 'Main Content' },
          { stepIndex: 2, instruction: 'Bagian <footer> berisi informasi hak cipta di bagian bawah.', targetCode: '<footer>', highlightLabel: 'Footer' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Tombol di Header',
        instruction: 'Tambahkan tombol dengan teks "Kontak Kami" di dalam tag <header>.',
        editorType: 'web',
        initialData: {
          html: '<header>\n  <h1>Toko Roti Makmur</h1>\n  <!-- Tambahkan tombol di sini -->\n</header>',
          css: 'button { background: white; color: #059669; border: none; padding: 5px 10px; border-radius: 4px; font-weight: bold; }',
        },
        validationHint: 'Ketik <button>Kontak Kami</button> di dalam header.',
        expectedOutput: 'Kontak Kami',
      },
      {
        type: 'kuis',
        title: 'Kuis HTML5 Semantik',
        questions: [
          {
            id: 'q-html-1',
            type: 'pilihan-ganda',
            prompt: 'Mengapa penggunaan tag semantik seperti <header>, <main>, dan <footer> lebih disukai daripada <div> biasa?',
            options: [
              'Meningkatkan peringkat SEO di mesin pencari dan mempermudah aksesibilitas bagi tunanetra (screen reader)',
              'Membuat browser menghapus file cookie otomatis',
              'Membuat koneksi internet website menjadi dua kali lebih cepat',
              'Karena tag div sudah dihapus dari standar web modern',
            ],
            correctAnswer: 'Meningkatkan peringkat SEO di mesin pencari dan mempermudah aksesibilitas bagi tunanetra (screen reader)',
            explanation: 'Mesin pencari (Google) dan alat pembaca layar (screen reader) mengandalkan tag semantik untuk memahami prioritas konten sebuah halaman.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Struktur HTML',
        points: [
          'Gunakan <header> untuk judul/navigasi, <main> untuk isi inti, dan <footer> untuk penutup.',
          'Satu halaman web hanya boleh memiliki satu tag <main>.',
          'Hindari penumpukan <div> tanpa makna jika ada tag semantik yang sesuai.',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Kak Intan',
        content: 'Selalu berikan atribut alt pada setiap tag <img> (misal alt="Foto Toko Roti") agar website lolos audit aksesibilitas!',
        badge: '🌐 Web Standards',
      },
    ],
    commonMistakes: [
      'Menaruh banyak tag <main> dalam satu dokumen HTML.',
      'Lupa tag penutup (misal membuka <header> tapi tidak ditutup dengan </header>).',
    ],
    glossaryTerms: ['HTML Structure', 'Tag Semantik (header, nav, main, footer)'],
    relatedLevels: ['web-t1-01'],
    relatedCaseFiles: ['case-03'],
    cheatSheetId: 'sheet-web-modern',
  },

  // 2. CSS Flexbox & Card Layout
  {
    id: 'les-web-flexbox-cards',
    track: 'web',
    tier: 1,
    skillId: 'CSS Flexbox',
    title: 'Desain Kartu Responsif dengan CSS Flexbox',
    objectives: [
      'Memahami deklarasi display: flex pada kontainer induk',
      'Mengatur perataan horizontal dengan justify-content dan gap',
      'Menyusun kartu produk (cards) yang rapi di layar ponsel dan laptop',
    ],
    estimatedMinutes: 8,
    prerequisites: ['les-web-html-structure'],
    characterIntro: {
      characterId: 'intan',
      dialogue: 'Zaman dulu programmer web harus pusing menghitung float dan clearfix cuma buat bikin dua kotak sejajar. Sekarang dengan Flexbox, cukup satu baris display: flex, semua elemen langsung berjejer anggun!',
      tip: 'display: flex ditaruh di kontainer induk (pembungkus), bukan di dalam kotaknya.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Logika Sederhana CSS Flexbox',
        content: 'Flexbox (Flexible Box Layout) adalah sistem tata letak 1 dimensi di CSS. Ketika sebuah elemen diberi properti display: flex, elemen-elemen anak di dalamnya (flex items) otomatis berubah dari menumpuk ke bawah (vertikal) menjadi berjejer menyamping (horizontal). Kita bisa mengatur jarak antar elemen menggunakan properti gap (misal gap: 1rem) dan perataan horizontal menggunakan justify-content (center, space-between, dll).',
        analogy: 'Seperti antrean loket: tadinya orang-orang berbaris ke belakang, lalu dibuka ruang baru sehingga mereka bisa berdiri berdampingan rapi dengan jarak yang sama.',
        officeContext: 'Menampilkan katalog 3 paket layanan konsultasi bisnis PT Maju Sejahtera dalam bentuk kartu sejajar.',
        keyTerms: ['display: flex', 'justify-content', 'gap', 'Flex Items'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: 2 Kartu Berjejer Rapi',
        explanation: 'Perhatikan bagaimana kontainer .kartu-box membuat dua kartu berjejer horizontal dengan jarak gap: 12px.',
        editorType: 'web',
        initialData: {
          html: '<div class="kartu-box">\n  <div class="card">Paket Silver<br><strong>Rp 500rb</strong></div>\n  <div class="card">Paket Gold<br><strong>Rp 1jt</strong></div>\n</div>',
          css: '.kartu-box {\n  display: flex;\n  gap: 12px;\n}\n.card {\n  flex: 1;\n  padding: 12px;\n  background: #f1f5f9;\n  border: 1px solid #cbd5e1;\n  border-radius: 8px;\n  text-align: center;\n}',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Lihat properti display: flex pada kelas .kartu-box.', targetCode: 'display: flex', highlightLabel: 'Flexbox Induk' },
          { stepIndex: 1, instruction: 'gap: 12px memberi jarak pemisah yang konsisten antar kartu.', targetCode: 'gap: 12px', highlightLabel: 'Jarak Gap' },
          { stepIndex: 2, instruction: 'flex: 1 membuat kedua kartu membagi lebar secara adil 50-50.', targetCode: 'flex: 1', highlightLabel: 'Proporsi Sama' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Aktifkan Flexbox',
        instruction: 'Ubah CSS pada .katalog agar mengaktifkan tata letak flexbox: tambahkan display: flex; dan gap: 10px;',
        editorType: 'web',
        initialData: {
          html: '<div class="katalog">\n  <div>Item A</div>\n  <div>Item B</div>\n</div>',
          css: '.katalog {\n  /* Tulis display dan gap di sini */\n}',
        },
        validationHint: 'Tambahkan baris display: flex; gap: 10px; pada .katalog.',
        expectedOutput: 'display: flex',
      },
      {
        type: 'kuis',
        title: 'Kuis Ketangkasan Flexbox',
        questions: [
          {
            id: 'q-flx-1',
            type: 'pilihan-ganda',
            prompt: 'Properti CSS apa yang digunakan untuk mengatur jarak renggang antar kotak flex tanpa perlu margin manual?',
            options: ['gap', 'spacing', 'padding-between', 'distance'],
            correctAnswer: 'gap',
            explanation: 'Properti gap adalah standar modern CSS untuk memberikan ruang seragam di antara flex items.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Emas Flexbox',
        points: [
          'Berikan display: flex pada elemen pembungkus (parent container).',
          'Gunakan gap untuk mengatur jarak pemisah tanpa repot mengatur margin tiap elemen.',
          'Gunakan justify-content: space-between untuk menyebar kartu dari ujung kiri ke ujung kanan.',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Kak Intan',
        content: 'Selalu tambahkan flex-wrap: wrap jika kotaknya banyak, agar saat dibuka di layar ponsel sempit kartunya otomatis turun ke baris berikutnya.',
        badge: '📱 Desain Mobile',
      },
    ],
    commonMistakes: [
      'Menaruh display: flex pada elemen anak (card) bukan pada pembungkusnya.',
      'Lupa memberikan flex-wrap sehingga kartu terjepit gepeng di layar ponsel.',
    ],
    glossaryTerms: ['CSS Flexbox', 'Flexbox (display: flex)', 'Card Layout'],
    relatedLevels: ['web-t1-02'],
    relatedCaseFiles: ['case-03'],
    cheatSheetId: 'sheet-web-modern',
    isQuickRefresher: true,
  },
  // 3. Headings
  {
    id: 'les-web-headings',
    track: 'web',
    tier: 1,
    skillId: 'Headings',
    title: 'Hierarki Judul Web (<h1> hingga <h6>) & SEO',
    objectives: [
      'Memahami fungsi tag <h1> sebagai judul utama halaman web',
      'Menyusun hierarki sub-judul dengan <h2> dan <h3>',
      'Menghindari aturan terlarang menggunakan lebih dari satu <h1> per halaman',
    ],
    estimatedMinutes: 5,
    prerequisites: ['les-web-html-structure'],
    characterIntro: {
      characterId: 'intan',
      dialogue: 'Google bot membaca website dari atas seperti koran. Tag <h1> adalah headline utama berita. Jangan gunakan <h1> untuk hal sepele seperti teks tombol!',
      tip: 'Satu halaman web wajib memiliki tepat satu tag <h1>.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Hierarki Judul HTML5 untuk SEO',
        content: 'HTML menyediakan 6 tingkat judul: <h1> sampai <h6>. <h1> adalah judul paling penting yang menjelaskan topik seluruh halaman. <h2> membagi halaman menjadi bagian-bagian besar (misal: "Layanan Kami", "Testimoni"), dan <h3> adalah sub-bagian di dalam <h2>. Hierarki ini bukan hanya untuk memperbesar tulisan, melainkan sinyal ranking utama bagi mesin pencari Google.',
        analogy: 'Seperti tajuk koran: <h1> adalah Nama Headline Utama di halaman depan, <h2> adalah judul artikel berita.',
        officeContext: 'Penyusunan halaman profil perusahaan PT Maju Sejahtera agar berada di peringkat atas pencarian Google.',
        keyTerms: ['Heading <h1>', 'SEO Sinyal', 'Hierarki Heading'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Struktur <h1> dan <h2>',
        explanation: 'Perhatikan <h1> untuk nama brand dan <h2> untuk sub-judul layanan.',
        editorType: 'web',
        initialData: {
          html: '<h1>PT Maju Sejahtera</h1>\n<h2>Solusi Bisnis & Automasi Kantor</h2>\n<p>Membantu digitalisasi dokumen Anda.</p>',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Tag <h1> adalah judul utama.', targetCode: 'h1', highlightLabel: 'Judul Utama h1' },
          { stepIndex: 1, instruction: 'Tag <h2> adalah sub-judul pendukung.', targetCode: 'h2', highlightLabel: 'Sub-judul h2' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan <h2>',
        instruction: 'Tambahkan judul bagian baru: "<h2>Tentang Perusahaan</h2>" di bawah teks.',
        editorType: 'web',
        initialData: {
          html: '<h1>PT Maju Sejahtera</h1>\n<p>Pengantar.</p>',
        },
        validationHint: 'Ketik <h2>Tentang Perusahaan</h2>.',
        expectedOutput: 'Tentang Perusahaan',
      },
      {
        type: 'kuis',
        title: 'Kuis Judul Web',
        questions: [
          {
            id: 'q-wh-1',
            type: 'pilihan-ganda',
            prompt: 'Berapa jumlah tag <h1> yang direkomendasikan pada satu halaman web menurut standar SEO Google?',
            options: ['Tepat 1 tag <h1>', 'Minimal 10 tag', 'Bebas berapa saja', 'Tidak boleh ada h1'],
            correctAnswer: 'Tepat 1 tag <h1>',
            explanation: 'Satu halaman web harus memiliki satu <h1> utama agar mesin pencari tidak bingung mengenai topik sentral halaman tersebut.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Judul Web',
        points: [
          'Satu halaman web hanya boleh memiliki tepat satu tag <h1>.',
          'Gunakan <h2> dan <h3> secara berurutan tanpa melompati tingkatannya.',
          'Ubah ukuran tampilan menggunakan CSS, jangan pilih tag heading semata-mata karena ukurannya.',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Kak Intan',
        content: 'Masukkan kata kunci bisnis utama (misal: "Konsultan Bisnis Jakarta") di dalam tag <h1> agar website mudah ditemukan pembeli!',
        badge: '🔍 SEO On-Page',
      },
    ],
    commonMistakes: [
      'Menulis lebih dari satu <h1> dalam satu halaman landing page.',
    ],
    glossaryTerms: ['Headings', 'HTML Structure'],
    relatedLevels: ['web-t1-01'],
    relatedCaseFiles: ['case-03'],
    cheatSheetId: 'sheet-web-modern',
  },
  // 4. Paragraphs
  {
    id: 'les-web-paragraphs',
    track: 'web',
    tier: 1,
    skillId: 'Paragraphs',
    title: 'Paragraf Teks (<p>) & Tipografi Keterbacaan Web',
    objectives: [
      'Menggunakan tag <p> untuk membungkus blok teks narasi',
      'Mengatur jarak baris (line-height) dan ukuran font yang nyaman dibaca',
      'Mencegah teks melebar tanpa batas (max-width / line length)',
    ],
    estimatedMinutes: 5,
    prerequisites: ['les-web-html-structure'],
    characterIntro: {
      characterId: 'nadia',
      dialogue: 'Pengunjung website modern rata-rata hanya bertahan 5 detik! Kalau teks paragrafmu padat rapat tanpa spasi, mereka akan langsung kabur ke situs kompetitor.',
      tip: 'Bungkus setiap gagasan baru dalam satu tag <p> terpisah.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Keterbacaan Paragraf Web (Readability)',
        content: 'Tag <p> (paragraph) secara otomatis memberikan jarak margin atas dan bawah pada blok teks. Dalam standar desain web ergonomis: (1) Ukuran font isi minimal 16px, (2) Jarak antar-baris (line-height) 1.5 hingga 1.7 agar mata tidak lelah, (3) Batasi panjang baris maksimal 60-75 karakter (sekitar 600-700px) agar pembaca mudah berpindah ke baris berikutnya.',
        analogy: 'Seperti jalan setapak di taman: jika pavingnya rata dan ada jarak tanaman, orang nyaman berjalan santai.',
        officeContext: 'Penyusunan uraian produk makanan pada katalog toko online UMKM.',
        keyTerms: ['Tag <p>', 'line-height', 'Readability', 'Panjang Baris'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: 2 Paragraf Berjarak Nyaman',
        explanation: 'Perhatikan bagaimana tag <p> memisahkan dua alinea cerita secara alami.',
        editorType: 'web',
        initialData: {
          html: '<p>Kopi robusta kami dipetik langsung dari lereng gunung Jawa Timur.</p>\n<p>Disangrai setiap minggu untuk menjaga aroma dan rasa segar maksimal.</p>',
          css: 'p { line-height: 1.6; color: #334155; }',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'Setiap paragraf dibungkus tag <p> pembuka dan </p> penutup.', targetCode: '<p>', highlightLabel: 'Paragraf' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Buat Paragraf Baru',
        instruction: 'Tulis paragraf baru: "<p>Kunjungi toko fisik kami di Jakarta Pusat.</p>".',
        editorType: 'web',
        initialData: {
          html: '<p>Toko buka setiap hari.</p>',
        },
        validationHint: 'Tambahkan tag <p>Kunjungi toko fisik kami di Jakarta Pusat.</p>.',
        expectedOutput: 'Jakarta Pusat',
      },
      {
        type: 'kuis',
        title: 'Kuis Keterbacaan Paragraf',
        questions: [
          {
            id: 'q-par-1',
            type: 'pilihan-ganda',
            prompt: 'Mengapa teks paragraf di website tidak boleh dibiarkan melebar dari ujung kiri ke ujung kanan layar monitor ultra-wide?',
            options: [
              'Karena baris yang terlalu panjang membuat mata pembaca lelah saat melacak awal baris berikutnya',
              'Karena monitor komputer bisa rusak',
              'Karena browser akan otomatis crash',
              'Karena hurufnya akan memudar',
            ],
            correctAnswer: 'Karena baris yang terlalu panjang membuat mata pembaca lelah saat melacak awal baris berikutnya',
            explanation: 'Riset UX tipografi membuktikan rentang keterbacaan optimal adalah 50 - 75 karakter per baris.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Paragraf Web',
        points: [
          'Bungkus setiap alinea dengan tag <p> terpisah.',
          'Gunakan line-height 1.5 - 1.7 untuk teks yang nyaman dibaca.',
          'Batasi panjang maksimal baris teks dengan max-width di CSS.',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Nadia',
        content: 'Gunakan paragraf pendek 2-3 kalimat untuk situs jualan agar calon pembeli tidak merasa kewalahan membaca.',
        badge: '✨ UX Copywriting',
      },
    ],
    commonMistakes: [
      'Menulis teks panjang tanpa tag <p> hanya dipisahkan banyak tag <br><br>.',
    ],
    glossaryTerms: ['Paragraphs', 'HTML Structure'],
    relatedLevels: ['web-t1-01'],
    relatedCaseFiles: ['case-03'],
    cheatSheetId: 'sheet-web-modern',
  },
  // 5. Buttons
  {
    id: 'les-web-buttons',
    track: 'web',
    tier: 1,
    skillId: 'Buttons',
    title: 'Tombol Interaktif (<button>) & Call-to-Action (CTA)',
    objectives: [
      'Membuat tombol interaktif yang jelas dan mudah diklik (Touch Target 44px)',
      'Membedakan tombol aksi (<button>) dengan tautan pindah halaman (<a>)',
      'Memberikan efek visual hover dan cursor: pointer',
    ],
    estimatedMinutes: 6,
    prerequisites: ['les-web-html-structure'],
    characterIntro: {
      characterId: 'nadia',
      dialogue: 'Tombol Call-to-Action (CTA) adalah magnet uang sebuah website! Tombol harus mencolok, mudah ditekan jempol di HP, dan kata-katanya mengundang aksi seperti "Pesan Sekarang"!',
      tip: 'Gunakan warna kontras tinggi dan padding tebal agar tombol gampang dipencet.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Anatomi Tombol CTA yang Menghasilkan Penjualan',
        content: 'Dalam web: (1) Gunakan tag <button> untuk aksi mengirim formulir atau membuka menu, (2) Gunakan tag <a> (anchor) jika tombol berfungsi untuk berpindah URL halaman lain. Standar tombol yang baik: (a) Ketinggian minimal 44x44px agar ramah jempol smartphone, (b) cursor: pointer di CSS agar kursor mouse berubah jadi ikon tangan, (c) Efek hover halus saat disorot.',
        analogy: 'Seperti bel pintu rumah: harus berada di posisi yang mudah diraih dan berbunyi saat ditekan.',
        officeContext: 'Tombol konfirmasi pembayaran checkout pada toko online mitra PT Maju Sejahtera.',
        keyTerms: ['Tombol CTA', '<button>', 'cursor: pointer', 'Touch Target'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Tombol CTA Menarik',
        explanation: 'Lihat tombol hijau dengan sudut melengkung dan teks tebal di bawah.',
        editorType: 'web',
        initialData: {
          html: '<button class="btn-pesan">Pesan via WhatsApp</button>',
          css: '.btn-pesan {\n  background: #059669;\n  color: white;\n  border: none;\n  padding: 10px 18px;\n  border-radius: 8px;\n  font-weight: bold;\n  cursor: pointer;\n}',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'padding: 10px 18px memberi ruang empuk di dalam tombol.', targetCode: 'padding: 10px 18px', highlightLabel: 'Ukuran Tombol' },
          { stepIndex: 1, instruction: 'cursor: pointer memberi tahu pengguna bahwa tombol ini bisa diklik.', targetCode: 'cursor: pointer', highlightLabel: 'Kursor Tangan' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Buat Tombol Beli',
        instruction: 'Tambahkan tombol: "<button class="btn-cta">Beli Sekarang</button>" di HTML.',
        editorType: 'web',
        initialData: {
          html: '<div>Kue Bolu Rp 25.000</div>',
          css: '.btn-cta { background: #059669; color: white; padding: 8px 12px; border: none; border-radius: 6px; font-weight: bold; }',
        },
        validationHint: 'Tambahkan tag <button class="btn-cta">Beli Sekarang</button>.',
        expectedOutput: 'Beli Sekarang',
      },
      {
        type: 'kuis',
        title: 'Kuis Tombol Interaktif',
        questions: [
          {
            id: 'q-btn-1',
            type: 'pilihan-ganda',
            prompt: 'Mengapa properti cursor: pointer wajib disertakan pada elemen tombol di CSS?',
            options: [
              'Agar kursor mouse pengguna otomatis berubah menjadi simbol tangan yang menandakan elemen tersebut bisa diklik',
              'Agar tombol otomatis berputar',
              'Supaya tombol berubah jadi gambar kucing',
              'Karena diwajibkan oleh undang-undang internet',
            ],
            correctAnswer: 'Agar kursor mouse pengguna otomatis berubah menjadi simbol tangan yang menandakan elemen tersebut bisa diklik',
            explanation: 'Feedback visual kursor tangan adalah konvensi universal web untuk menandakan interaksi aktif.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Tombol Web',
        points: [
          'Gunakan kata kerja aksi yang jelas: "Pesan Sekarang", bukan sekadar "Klik Di Sini".',
          'Pastikan tombol cukup besar untuk dipencet jempol di layar HP (min 44px).',
          'Sertakan properti cursor: pointer di CSS.',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Nadia',
        content: 'Beri tombol warna kontras yang berlawanan dengan warna latar belakang halaman agar langsung terlihat dalam 1 detik pertama!',
        badge: '🎯 Konversi Tinggi',
      },
    ],
    commonMistakes: [
      'Membuat tombol terlalu kecil sehingga sulit ditekan pengguna HP.',
      'Lupa memberikan cursor: pointer.',
    ],
    glossaryTerms: ['Buttons', 'HTML Structure'],
    relatedLevels: ['web-t1-01'],
    relatedCaseFiles: ['case-03'],
    cheatSheetId: 'sheet-web-modern',
  },
  // 6. Card Layout
  {
    id: 'les-web-card-layout',
    track: 'web',
    tier: 2,
    skillId: 'Card Layout',
    title: 'Pola Desain Kartu (Card Pattern) & Bayangan Lembut',
    objectives: [
      'Menyusun komponen kartu dengan gambar, judul, deskripsi, dan tombol',
      'Memberikan border-radius melengkung dan box-shadow halus',
      'Menjaga jarak padding dalam kartu agar konten tidak sesak',
    ],
    estimatedMinutes: 7,
    prerequisites: ['les-web-flexbox-cards'],
    characterIntro: {
      characterId: 'intan',
      dialogue: 'Pola kartu (Card UI) adalah standar tampilan paling populer di dunia modern—mulai dari e-commerce, media sosial, hingga dashboard kantor.',
      tip: 'Beri latar belakang putih, border tipis, dan bayangan lembut agar kartu tampak mengambang elegan.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Karakteristik Komponen Kartu (Card)',
        content: 'Kartu web bertindak sebagai wadah mandiri (container) untuk satu entitas informasi (misal 1 produk atau 1 profil staf). Elemen khas kartu: (1) Background putih (#ffffff) dengan batas tepi tipis (#e2e8f0), (2) Sudut melengkung halus (border-radius: 8px s.d. 12px), (3) Padding dalam 16px, (4) Efek kedalaman bayangan (box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)).',
        analogy: 'Seperti kartu nama atau kartu remi fisik: memiliki batas fisik yang jelas dan mudah dipindahkan.',
        officeContext: 'Kartu profil tim karyawan di halaman "Tentang Kami" PT Maju Sejahtera.',
        keyTerms: ['Card UI', 'box-shadow', 'border-radius', 'Elevasi Visual'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Kartu Produk Modern',
        explanation: 'Perhatikan kartu produk di bawah dengan bayangan lembut dan sudut membulat.',
        editorType: 'web',
        initialData: {
          html: '<div class="card">\n  <h3>Paket Usaha UMKM</h3>\n  <p>Pencatatan kas otomatis.</p>\n  <strong>Rp 150.000 / bln</strong>\n</div>',
          css: '.card {\n  background: white;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  padding: 16px;\n  box-shadow: 0 4px 6px rgba(0,0,0,0.05);\n}',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'border-radius: 12px melengkungkan sudut kartu.', targetCode: 'border-radius: 12px', highlightLabel: 'Sudut Membulat' },
          { stepIndex: 1, instruction: 'box-shadow memberi ilusi kedalaman 3D halus.', targetCode: 'box-shadow', highlightLabel: 'Bayangan Elegan' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tambahkan Padding Kartu',
        instruction: 'Tambahkan properti "padding: 16px;" pada aturan CSS .card-custom.',
        editorType: 'web',
        initialData: {
          html: '<div class="card-custom">Kartu Promo</div>',
          css: '.card-custom {\n  background: white;\n  border: 1px solid #ccc;\n  /* tambahkan padding di sini */\n}',
        },
        validationHint: 'Tambahkan baris padding: 16px; di dalam .card-custom.',
        expectedOutput: 'padding: 16px',
      },
      {
        type: 'kuis',
        title: 'Kuis Desain Kartu',
        questions: [
          {
            id: 'q-crd-1',
            type: 'pilihan-ganda',
            prompt: 'Properti CSS apa yang digunakan untuk membuat sudut kotak menjadi melengkung tumpul?',
            options: ['border-radius', 'corner-round', 'box-curve', 'border-style'],
            correctAnswer: 'border-radius',
            explanation: 'border-radius adalah properti CSS standar untuk mengatur kelengkungan sudut elemen.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Desain Kartu',
        points: [
          'Gunakan border-radius 8-12px untuk kesan modern dan ramah.',
          'Gunakan bayangan lembut (soft shadow) bukan bayangan hitam tebal pekat.',
          'Beri padding minimal 16px agar teks di dalam kartu bernapas lega.',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Kak Intan',
        content: 'Tambahkan transisi hover: transform: translateY(-4px); agar kartu sedikit terangkat saat disorot kursor mouse!',
        badge: '✨ Micro-interaction',
      },
    ],
    commonMistakes: [
      'Lupa memberi padding sehingga teks menempel rapat ke garis batas kotak.',
    ],
    glossaryTerms: ['Card Layout', 'CSS Flexbox'],
    relatedLevels: ['web-t1-02'],
    relatedCaseFiles: ['case-03'],
    cheatSheetId: 'sheet-web-modern',
  },
  // 7. Alignment
  {
    id: 'les-web-alignment',
    track: 'web',
    tier: 2,
    skillId: 'Alignment',
    title: 'Perataan Elemen & Distribusi Ruang (justify & align)',
    objectives: [
      'Menguasai justify-content untuk sumbu utama (horizontal)',
      'Menguasai align-items untuk sumbu silang (vertikal)',
      'Membuat elemen berada persis di tengah (Perfect Centering)',
    ],
    estimatedMinutes: 6,
    prerequisites: ['les-web-flexbox-cards'],
    characterIntro: {
      characterId: 'intan',
      dialogue: 'Mitos programmer web zaman dulu: menengahkan tulisan vertikal dan horizontal adalah hal paling sulit di dunia. Tapi dengan Flexbox, cuma butuh 3 baris CSS!',
      tip: 'display: flex + justify-content: center + align-items: center = tengah sempurna.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Sumbu Utama vs Sumbu Silang Flexbox',
        content: 'Dalam Flexbox terdapat dua sumbu perataan: (1) Sumbu Utama (Main Axis): dikontrol oleh justify-content (start, center, end, space-between, space-around). (2) Sumbu Silang (Cross Axis): dikontrol oleh align-items (start, center, end, stretch). Memahami kedua sumbu ini membuatmu bisa menata logo di kiri dan menu navigasi di kanan secara simetris.',
        analogy: 'Seperti mengatur formasi penari di panggung: kamu atur jarak mereka berjejer ke samping (justify), dan kamu pastikan tinggi kepala mereka sejajar (align).',
        officeContext: 'Bilah navigasi header website: Logo perusahaan di tepi kiri, tombol login di tepi kanan.',
        keyTerms: ['justify-content', 'align-items', 'space-between', 'Perfect Center'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Sebar Kiri dan Kanan',
        explanation: 'Lihat bagaimana justify-content: space-between mendorong Logo ke kiri dan Menu ke kanan otomatis.',
        editorType: 'web',
        initialData: {
          html: '<nav class="nav-bar">\n  <div class="logo"><strong>KantorKu</strong></div>\n  <div class="menu">Masuk</div>\n</nav>',
          css: '.nav-bar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 10px 16px;\n  background: #f8fafc;\n  border: 1px solid #cbd5e1;\n}',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'justify-content: space-between menyebar elemen ke dua ujung kontainer.', targetCode: 'justify-content: space-between', highlightLabel: 'Sebar Ujung' },
          { stepIndex: 1, instruction: 'align-items: center memastikan teks rata di tengah vertikal.', targetCode: 'align-items: center', highlightLabel: 'Tengah Vertikal' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Tengahkan Elemen',
        instruction: 'Tuliskan properti "justify-content: center;" di dalam aturan CSS .center-box.',
        editorType: 'web',
        initialData: {
          html: '<div class="center-box"><span>Tengah</span></div>',
          css: '.center-box {\n  display: flex;\n  /* Tambahkan justify-content di sini */\n}',
        },
        validationHint: 'Tambahkan justify-content: center; di dalam .center-box.',
        expectedOutput: 'justify-content: center',
      },
      {
        type: 'kuis',
        title: 'Kuis Perataan Sumbu',
        questions: [
          {
            id: 'q-alg-1',
            type: 'pilihan-ganda',
            prompt: 'Properti CSS apakah yang digunakan untuk mengatur perataan vertikal (sumbu silang) dalam kontainer flexbox?',
            options: ['align-items', 'justify-content', 'vertical-align', 'float'],
            correctAnswer: 'align-items',
            explanation: 'align-items mengontrol perataan elemen pada sumbu silang (secara bawaan adalah sumbu vertikal atas-bawah).',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Perataan Flexbox',
        points: [
          'justify-content mengontrol sumbu mendatar (kiri, tengah, kanan, sebar).',
          'align-items mengontrol sumbu tegak (atas, tengah, bawah).',
          'Gunakan space-between untuk tata letak navbar (logo di kiri, tombol di kanan).',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Kak Intan',
        content: 'Jika kontainermu memakai flex-direction: column, maka fungsi justify-content dan align-items otomatis bertukar sumbu!',
        badge: '🔄 Arah Sumbu',
      },
    ],
    commonMistakes: [
      'Tertukar antara peran justify-content dan align-items.',
    ],
    glossaryTerms: ['Alignment', 'CSS Flexbox'],
    relatedLevels: ['web-t1-02'],
    relatedCaseFiles: ['case-03'],
    cheatSheetId: 'sheet-web-modern',
  },
];
