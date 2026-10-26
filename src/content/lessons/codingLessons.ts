/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu v2.0 - Pelajaran Logika Koding & JavaScript (Coding Lessons)
 * Meliputi: Fungsi Bisnis, Parameter, Return, Template Literals, dan Aritmatika Keuangan Bersih.
 */

import { Lesson } from '../../features/learning/types';

export const CODING_LESSONS: Lesson[] = [
  // 1. Functions & Return Statements
  {
    id: 'les-code-function-basics',
    track: 'coding',
    tier: 1,
    skillId: 'Functions',
    title: 'Fungsi Logika & Nilai Kembali (Return)',
    objectives: [
      'Mendeklarasikan fungsi JavaScript dengan parameter input',
      'Mengembalikan hasil olahan menggunakan kata kunci return',
      'Mencegah kesalahan umum nilai kembali undefined',
    ],
    estimatedMinutes: 7,
    prerequisites: [],
    characterIntro: {
      characterId: 'intan',
      dialogue: 'Pernah disuruh bos menghitung diskon berulang-ulang untuk ribuan produk? Daripada ketik rumus yang sama berkali-kali, kita bungkus rumusnya dalam satu fungsi sakti yang bisa dipanggil kapan saja!',
      tip: 'Fungsi tanpa "return" itu seperti koki yang memasak enak tapi makanannya tidak pernah disajikan ke meja tamu.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Mekanisme Mesin Fungsi',
        content: 'Fungsi (function) adalah blok kode yang dirancang untuk melakukan tugas tertentu. Fungsi menerima input yang disebut parameter, memproses logika di dalamnya, dan memberikan output hasil lewat kata kunci return. Jika kamu lupa menulis return, JavaScript akan otomatis menghasilkan nilai undefined.',
        analogy: 'Seperti mesin blender jus: kamu masukkan buah jeruk (parameter), mesin memeras dan menyaring (proses), lalu mengalirkan sari jus ke gelasmu (return).',
        officeContext: 'Menghitung subtotal belanja kasir: harga barang dikali kuantitas barang.',
        keyTerms: ['Function', 'Parameter', 'Return Statement', 'Undefined'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Fungsi Hitung Subtotal',
        explanation: 'Perhatikan fungsi hitungSubtotal di bawah yang menerima harga dan qty lalu mengembalikan perkalian keduanya.',
        editorType: 'coding',
        initialData: {
          code: 'function hitungSubtotal(harga, qty) {\n  return harga * qty;\n}\n\n// Panggil fungsi\nconst total = hitungSubtotal(15000, 3);\nconsole.log(total);',
        },
        expectedResult: 45000,
        walkthrough: [
          { stepIndex: 0, instruction: 'Deklarasi function hitungSubtotal menerima 2 parameter: harga dan qty.', targetCode: 'function hitungSubtotal', highlightLabel: 'Nama & Parameter' },
          { stepIndex: 1, instruction: 'Kata kunci return mengembalikan hasil perkalian.', targetCode: 'return harga * qty', highlightLabel: 'Return Output' },
          { stepIndex: 2, instruction: 'Saat dipanggil dengan (15000, 3), hasilnya adalah 45000.', targetCode: 'hitungSubtotal(15000, 3)', highlightLabel: 'Pemanggilan' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Lengkapi Kata Kunci Return',
        instruction: 'Lengkapi fungsi di bawah agar mengembalikan hasil pengurangan harga modal dari harga jual (laba = jual - modal).',
        editorType: 'coding',
        initialData: {
          code: 'function hitungLaba(jual, modal) {\n  // Kembalikan jual - modal\n  return jual - modal;\n}',
        },
        validationHint: 'Tulis return jual - modal; di dalam kurung kurawal fungsi.',
        expectedOutput: 'return',
      },
      {
        type: 'kuis',
        title: 'Kuis Logika Fungsi',
        questions: [
          {
            id: 'q-fn-1',
            type: 'pilihan-ganda',
            prompt: 'Apa yang dihasilkan oleh fungsi berikut saat dipanggil: function tes(x) { x * 2; }?',
            options: [
              'undefined (karena tidak ada kata kunci return)',
              'Nilai x dikali 2',
              'Error sintaks merah',
              'Angka 0',
            ],
            correctAnswer: 'undefined (karena tidak ada kata kunci return)',
            explanation: 'Di JavaScript, fungsi yang tidak memiliki pernyataan return akan selalu mengembalikan undefined secara bawaan.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Fungsi JavaScript',
        points: [
          'Fungsi menerima parameter sebagai input dan mengembalikan hasil lewat return.',
          'Tanpa kata kunci return, fungsi akan menghasilkan undefined.',
          'Beri nama fungsi dengan kata kerja deskriptif, misal hitungTotal atau validasiEmail.',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Kak Intan',
        content: 'Bisa juga ditulis singkat dengan arrow function modern: const hitungSubtotal = (harga, qty) => harga * qty;',
        badge: '⚡ ES6 Modern',
      },
    ],
    commonMistakes: [
      'Lupa menulis return sehingga variabel penampung bernilai undefined.',
      'Menulis kode setelah return (kode tersebut tidak akan pernah dieksekusi / unreachable code).',
    ],
    glossaryTerms: ['Functions', 'Parameters', 'Return Statements', 'Function (Fungsi)'],
    relatedLevels: ['code-t1-01'],
    relatedCaseFiles: ['case-03'],
    cheatSheetId: 'sheet-js-logic',
    isQuickRefresher: true,
  },

  // 2. Business Math & Price Calculation
  {
    id: 'les-code-business-math',
    track: 'coding',
    tier: 1,
    skillId: 'Business Math',
    title: 'Aritmatika Keuangan & Logika Diskon Kasir',
    objectives: [
      'Menghitung potongan harga (diskon) persentase bertingkat',
      'Menerapkan Pajak Pertambahan Nilai (PPN 11%) secara presisi',
      'Membulatkan nominal Rupiah dengan Math.round',
    ],
    estimatedMinutes: 8,
    prerequisites: ['les-code-function-basics'],
    characterIntro: {
      characterId: 'reza',
      dialogue: 'Di sistem kasir, kita tidak boleh menoleransi selisih 1 Rupiah pun! Komputer bekerja dengan floating-point yang kadang menghasilkan angka aneh seperti 49999.9999994. Pelajari cara pembulatan uang yang benar.',
      tip: 'Selalu gunakan Math.round() pada hasil akhir nominal mata uang Rupiah.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Logika Aritmatika Transaksi Kasir',
        content: 'Alur perhitungan standar struk belanja terdiri dari: (1) Subtotal = Harga Satuan x Qty, (2) Diskon = Subtotal x (Persen / 100), (3) Nilai Kena Pajak = Subtotal - Diskon, (4) PPN = Nilai Kena Pajak x 0.11, (5) Total Akhir = Nilai Kena Pajak + PPN. Semua hasil akhir harus dibulatkan ke bilangan bulat terdekat dengan Math.round() karena mata uang Rupiah tidak memiliki pecahan sen di transaksi fisik.',
        analogy: 'Seperti struk kasir minimarket: semua baris potongan dan pajak dihitung berurutan dari atas ke bawah secara transparan.',
        officeContext: 'Modul checkout aplikasi e-commerce internal PT Maju Sejahtera.',
        keyTerms: ['Math.round', 'Diskon', 'PPN', 'Aritmatika Bisnis'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Hitung Total Setelah Diskon',
        explanation: 'Fungsi berikut memberikan diskon 10% jika belanja di atas 100.000.',
        editorType: 'coding',
        initialData: {
          code: 'function hitungTotalBayar(subtotal) {\n  let diskon = 0;\n  if (subtotal >= 100000) {\n    diskon = subtotal * 0.10;\n  }\n  return Math.round(subtotal - diskon);\n}\n\nconsole.log(hitungTotalBayar(120000));',
        },
        expectedResult: 108000,
        walkthrough: [
          { stepIndex: 0, instruction: 'Cek kondisi belanja: jika >= 100000 maka diskon 10%.', targetCode: 'if (subtotal >= 100000)', highlightLabel: 'Syarat Diskon' },
          { stepIndex: 1, instruction: 'Subtotal 120000 dikurangi diskon 12000 menghasilkan 108000.', targetCode: 'Math.round(subtotal - diskon)', highlightLabel: 'Hasil Bersih' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Hitung Nilai PPN',
        instruction: 'Buat fungsi hitungPPN(nominal) yang mengembalikan nominal dikali 0.11 dibulatkan dengan Math.round.',
        editorType: 'coding',
        initialData: {
          code: 'function hitungPPN(nominal) {\n  return Math.round(nominal * 0.11);\n}',
        },
        validationHint: 'Tulis return Math.round(nominal * 0.11);',
        expectedOutput: 'Math.round',
      },
      {
        type: 'kuis',
        title: 'Kuis Ketelitian Kasir',
        questions: [
          {
            id: 'q-math-1',
            type: 'tebak-hasil',
            prompt: 'Berapa hasil dari Math.round(15500.6) di JavaScript?',
            options: ['15501', '15500', '16000', '15500.6'],
            correctAnswer: '15501',
            explanation: 'Math.round() membulatkan ke bilangan bulat terdekat. Nilai pecahan 0.6 dibulatkan ke atas menjadi 15501.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Aritmatika Transaksi',
        points: [
          'Hitung diskon terlebih dahulu sebelum mengalikan nilai PPN.',
          'Gunakan Math.round() untuk menghindari koma panjang floating-point pada nominal Rupiah.',
          'Simpan persentase pajak dalam konstanta terpisah, misal const TARIF_PPN = 0.11.',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Pak Reza',
        content: 'Jangan gunakan pembagian sebelum perkalian jika bisa dihindari, untuk meminimalkan potensi kesalahan presisi floating-point komputer.',
        badge: '🧮 Presisi Finansial',
      },
    ],
    commonMistakes: [
      'Menghitung pajak sebelum diskon dikurangkan (konsumen jadi bayar pajak lebih mahal).',
      'Lupa membulatkan angka desimal sehingga tampilan kasir memiliki 10 digit di belakang koma.',
    ],
    glossaryTerms: ['Business Math', 'Clean Code'],
    relatedLevels: ['code-t1-02'],
    relatedCaseFiles: ['case-03'],
    cheatSheetId: 'sheet-js-logic',
    isQuickRefresher: true,
  },
  // 3. Parameters
  {
    id: 'les-code-parameters',
    track: 'coding',
    tier: 1,
    skillId: 'Parameters',
    title: 'Parameter & Argumen Input Fungsi',
    objectives: [
      'Membedakan definisi parameter (di deklarasi) dan argumen (saat pemanggilan)',
      'Menerima banyak parameter sekaligus (nama, kuantitas, harga)',
      'Memberikan nilai bawaan (Default Parameters) jika input kosong',
    ],
    estimatedMinutes: 6,
    prerequisites: ['les-code-function-basics'],
    characterIntro: {
      characterId: 'intan',
      dialogue: 'Parameter adalah pintu masuk data ke dalam fungsi. Tanpa parameter, fungsi hanya bisa melakukan hal yang itu-itu saja seperti robot kaku.',
      tip: 'Beri nama parameter yang deskriptif: gunakan "hargaSatuan" bukan cuma huruf "h".',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Mekanisme Parameter & Argumen',
        content: 'Parameter adalah variabel penampung yang ditulis di dalam tanda kurung saat membuat fungsi, contoh: function hitungGaji(hariKerja, tarifPerHari). Ketika fungsi dipanggil dengan hitungGaji(20, 150000), nilai 20 dan 150000 disebut Argumen. JavaScript juga mendukung Default Parameters, contoh tarifPerHari = 100000, yang otomatis dipakai jika pemanggil lupa mengisi argumen kedua.',
        analogy: 'Seperti slot formulir bank: parameter adalah kotak kosong isian "Nama Rekening", argumen adalah nama yang kamu tulis dengan pulpen.',
        officeContext: 'Menghitung uang lembur karyawan berdasarkan jumlah jam lembur dan tarif per jam.',
        keyTerms: ['Parameter', 'Argumen', 'Default Parameters'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Fungsi dengan 2 Parameter',
        explanation: 'Fungsi kalikan(a, b) menerima dua angka dan mengalikan keduanya.',
        editorType: 'coding',
        initialData: {
          code: 'function kalikan(a, b) {\n  return a * b;\n}\n\nconsole.log(kalikan(6, 7));',
        },
        expectedResult: 42,
        walkthrough: [
          { stepIndex: 0, instruction: 'a dan b adalah parameter penampung.', targetCode: 'function kalikan(a, b)', highlightLabel: 'Parameter' },
          { stepIndex: 1, instruction: '6 dan 7 adalah argumen yang dimasukkan saat pemanggilan.', targetCode: 'kalikan(6, 7)', highlightLabel: 'Argumen' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Buat Fungsi 2 Parameter',
        instruction: 'Tulis fungsi jumlahkan(a, b) { return a + b; }.',
        editorType: 'coding',
        initialData: {
          code: 'function jumlahkan(a, b) {\n  // Kembalikan a + b\n  return a + b;\n}',
        },
        validationHint: 'Tulis return a + b; di dalam fungsi.',
        expectedOutput: 'return a + b',
      },
      {
        type: 'kuis',
        title: 'Kuis Parameter Fungsi',
        questions: [
          {
            id: 'q-prm-1',
            type: 'pilihan-ganda',
            prompt: 'Apa perbedaan antara Parameter dan Argumen dalam JavaScript?',
            options: [
              'Parameter didefinisikan saat membuat fungsi; Argumen adalah nilai nyata yang dikirim saat memanggil fungsi',
              'Parameter untuk angka, argumen untuk teks',
              'Tidak ada bedanya, hanya beda bahasa',
              'Argumen wajib diapit tanda kurung siku',
            ],
            correctAnswer: 'Parameter didefinisikan saat membuat fungsi; Argumen adalah nilai nyata yang dikirim saat memanggil fungsi',
            explanation: 'Parameter adalah variabel cetakan pada deklarasi fungsi, sedangkan argumen adalah data konkret yang dioper ke fungsi.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Parameter',
        points: [
          'Urutan argumen saat memanggil fungsi harus sama persis dengan urutan parameternya.',
          'Gunakan Default Parameter (param = defaultVal) untuk mencegah nilai undefined.',
          'Beri nama parameter yang jelas dan mudah dipahami rekan satu tim.',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Kak Intan',
        content: 'Hindari membuat fungsi dengan lebih dari 3 parameter. Jika butuh banyak input, bungkus parameter dalam satu objek data!',
        badge: '💻 Clean Code',
      },
    ],
    commonMistakes: [
      'Menukar urutan argumen saat memanggil fungsi sehingga perhitungannya salah.',
    ],
    glossaryTerms: ['Parameters', 'Functions'],
    relatedLevels: ['code-t1-01'],
    relatedCaseFiles: ['case-03'],
    cheatSheetId: 'sheet-js-logic',
  },
  // 4. Return Statements
  {
    id: 'les-code-return-statements',
    track: 'coding',
    tier: 1,
    skillId: 'Return Statements',
    title: 'Pengembalian Nilai (Return) & Alur Keluar Fungsi',
    objectives: [
      'Memahami bahwa kata kunci return langsung menghentikan eksekusi fungsi',
      'Mengembalikan berbagai tipe data (angka, teks, boolean, array, object)',
      'Menghindari kode yang tidak pernah dieksekusi (Unreachable Code)',
    ],
    estimatedMinutes: 6,
    prerequisites: ['les-code-function-basics'],
    characterIntro: {
      characterId: 'intan',
      dialogue: 'Begitu kata "return" dieksekusi, fungsi langsung berhenti dan keluar! Kode apapun yang kamu tulis di bawah kata return tidak akan pernah dijalankan.',
      tip: 'Pastikan seluruh perhitungan selesai sebelum kamu memanggil return.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Karakteristik Kata Kunci Return',
        content: 'Pernyataan return memiliki dua fungsi krusial: (1) Mengirim nilai hasil pemrosesan kembali ke pemanggil fungsi, dan (2) Menghentikan eksekusi fungsi saat itu juga (Early Exit). Teknik Early Exit sangat disukai programmer senior: periksa kondisi error di awal, lalu return keluar lebih awal sebelum menjalankan logika berat.',
        analogy: 'Seperti pintu darurat keluar: begitu kamu keluar lewat pintu tersebut, kamu tidak bisa kembali lagi ke ruangan.',
        officeContext: 'Validasi form pendaftaran: jika nomor telepon kosong, langsung return false.',
        keyTerms: ['Return Statement', 'Early Exit', 'Unreachable Code'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Early Exit dengan Return',
        explanation: 'Fungsi cekUsia langsung return false jika umur < 18, tanpa memproses baris di bawahnya.',
        editorType: 'coding',
        initialData: {
          code: 'function bolehBekerja(usia) {\n  if (usia < 18) {\n    return false;\n  }\n  return true;\n}\n\nconsole.log(bolehBekerja(20));',
        },
        expectedResult: true,
        walkthrough: [
          { stepIndex: 0, instruction: 'Jika usia < 18 terpenuhi, fungsi langsung keluar menghasilkan false.', targetCode: 'return false;', highlightLabel: 'Keluar Cepat' },
          { stepIndex: 1, instruction: 'Jika usia >= 18, fungsi lanjut ke baris berikutnya dan return true.', targetCode: 'return true;', highlightLabel: 'Hasil Lolos' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Return Nilai Positif',
        instruction: 'Tulis return angka > 0; di dalam fungsi adalahPositif(angka).',
        editorType: 'coding',
        initialData: {
          code: 'function adalahPositif(angka) {\n  return angka > 0;\n}',
        },
        validationHint: 'Tulis return angka > 0;.',
        expectedOutput: 'return angka > 0',
      },
      {
        type: 'kuis',
        title: 'Kuis Return',
        questions: [
          {
            id: 'q-ret-1',
            type: 'pilihan-ganda',
            prompt: 'Apa yang terjadi pada baris kode yang ditulis tepat di bawah kata kunci return dalam blok fungsi yang sama?',
            options: [
              'Kode tersebut diabaikan total dan tidak akan pernah dijalankan (Unreachable Code)',
              'Kode akan dijalankan dua kali',
              'Komputer akan otomatis restart',
              'Variabel otomatis terhapus',
            ],
            correctAnswer: 'Kode tersebut diabaikan total dan tidak akan pernah dijalankan (Unreachable Code)',
            explanation: 'Kata kunci return langsung mengakhiri eksekusi fungsi dan kembali ke pemanggil.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Return',
        points: [
          'return mengembalikan nilai dan menghentikan fungsi saat itu juga.',
          'Gunakan pola Early Exit untuk menyederhanakan pengecekan error.',
          'Jangan menaruh kode penting di bawah baris return.',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Kak Intan',
        content: 'Fungsi bisa memiliki lebih dari satu return jika berada di dalam cabang if-else yang berbeda.',
        badge: '🧠 Pola Arsitektur',
      },
    ],
    commonMistakes: [
      'Menulis console.log setelah baris return lalu heran kenapa log-nya tidak muncul di layar.',
    ],
    glossaryTerms: ['Return Statements', 'Functions'],
    relatedLevels: ['code-t1-01'],
    relatedCaseFiles: ['case-03'],
    cheatSheetId: 'sheet-js-logic',
  },
  // 5. String Concatenation
  {
    id: 'les-code-string-concatenation',
    track: 'coding',
    tier: 1,
    skillId: 'String Concatenation',
    title: 'Penggabungan Teks & Template Literals (`${...}`)',
    objectives: [
      'Menggabungkan teks dengan operator tambah (+)',
      'Menggunakan Template Literals ES6 (tanda backtick `) untuk string dinamis',
      'Menyisipkan variabel nama dan nominal ke dalam kalimat pesan otomatis',
    ],
    estimatedMinutes: 6,
    prerequisites: ['les-code-function-basics'],
    characterIntro: {
      characterId: 'intan',
      dialogue: 'Dulu programmer harus menulis "Halo, " + nama + " selamat datang di " + kantor. Banyak tanda kutip dan plus bikin pusing. Sekarang pakai Template Literals dengan tanda backtick: `Halo ${nama}`!',
      tip: 'Tanda backtick (`) berada di tombol keyboard sebelah kiri angka 1.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Evolusi Penggabungan Teks di JavaScript',
        content: 'Ada 2 cara menyambung teks: (1) Operator Plus (+): "Selamat " + "Pagi". Kelemahannya sering lupa memberi spasi pemisah. (2) Template Literals (ES6): menggunakan tanda backtick (`) dan pembungkus ${variabel}. Dengan Template Literals, kamu bisa menulis kalimat utuh secara alami dan menyisipkan variabel angka atau teks di mana saja.',
        analogy: 'Seperti amplop cetak dengan jendela transparan: amplopnya sudah tercetak, nama penerima tampak jelas dari lubang jendela.',
        officeContext: 'Pesan sambutan otomatis resepsionis kantor dan notifikasi WhatsApp tagihan klien.',
        keyTerms: ['Template Literals', 'Backtick (`)', 'String Interpolation', 'Operator +'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Template Literals Elegan',
        explanation: 'Lihat bagaimana ${nama} dan ${meja} disisipkan ke dalam pesan backtick.',
        editorType: 'coding',
        initialData: {
          code: 'function sapaTamu(nama, meja) {\n  return `Selamat Datang di PT Maju Sejahtera, ${nama}! Meja kerjamu ada di #${meja}.`;\n}\n\nconsole.log(sapaTamu("Budi", 5));',
        },
        expectedResult: 'Selamat Datang di PT Maju Sejahtera, Budi! Meja kerjamu ada di #5.',
        walkthrough: [
          { stepIndex: 0, instruction: 'Tanda backtick (`) mengawali dan mengakhiri string template.', targetCode: '`Selamat Datang', highlightLabel: 'Backtick' },
          { stepIndex: 1, instruction: '${nama} otomatis mengekstrak isi variabel nama.', targetCode: '${nama}', highlightLabel: 'Interpolasi' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Buat Pesan Salam',
        instruction: 'Lengkapi fungsi sapa(nama) agar mengembalikan `Halo, ${nama}!`.',
        editorType: 'coding',
        initialData: {
          code: 'function sapa(nama) {\n  return `Halo, ${nama}!`;\n}',
        },
        validationHint: 'Gunakan tanda backtick `Halo, ${nama}!`.',
        expectedOutput: 'Halo,',
      },
      {
        type: 'kuis',
        title: 'Kuis Penggabungan Teks',
        questions: [
          {
            id: 'q-str-1',
            type: 'pilihan-ganda',
            prompt: 'Karakter apakah yang digunakan untuk membungkus Template Literals di JavaScript?',
            options: ['Tanda Backtick ( ` )', 'Tanda Kutip Ganda ( " )', 'Tanda Kurung Kurawal ( { )', 'Tanda Pagar ( # )'],
            correctAnswer: 'Tanda Backtick ( ` )',
            explanation: 'Template literals wajib menggunakan tanda backtick (`) di pojok kiri atas keyboard.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah String Modern',
        points: [
          'Gunakan Template Literals (`) untuk menyusun kalimat yang memiliki variabel.',
          'Sisipkan ekspresi atau variabel di dalam tanda ${...}.',
          'Template Literals mendukung penulisan teks multi-baris tanpa perlu tag \\n.',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Kak Intan',
        content: 'Di dalam ${...} kamu bahkan bisa menjalankan rumus matematika langsung, misal: `Total: Rp ${harga * qty}`!',
        badge: '🔥 Fitur Canggih',
      },
    ],
    commonMistakes: [
      'Menulis tanda kutip tunggal (\') biasa alih-alih backtick (`) sehingga ${nama} tertulis huruf mentah.',
    ],
    glossaryTerms: ['String Concatenation', 'Template Literals (`${...}`)'],
    relatedLevels: ['code-t1-01'],
    relatedCaseFiles: ['case-03'],
    cheatSheetId: 'sheet-js-logic',
  },
  // 6. Arithmetic Expressions
  {
    id: 'les-code-arithmetic-expressions',
    track: 'coding',
    tier: 1,
    skillId: 'Arithmetic Expressions',
    title: 'Ekspresi Aritmatika, Modulo (%) & Presisi Numerik',
    objectives: [
      'Menguasai 5 operator aritmatika utama (+, -, *, /, %)',
      'Memanfaatkan operator Modulo (%) untuk mengecek kelipatan atau ganjil-genap',
      'Memahami masalah presisi floating-point (0.1 + 0.2 !== 0.3)',
    ],
    estimatedMinutes: 6,
    prerequisites: ['les-code-function-basics'],
    characterIntro: {
      characterId: 'intan',
      dialogue: 'Tahukah kamu bahwa 0.1 + 0.2 di JavaScript hasilnya 0.30000000000000004? Ini bukan bug JavaScript, tapi cara komputer biner menyimpan angka desimal. Makanya untuk transaksi kasir kita harus paham cara hitung yang tepat.',
      tip: 'Gunakan operator modulo (%) untuk menentukan nomor antrean atau baris selang-seling.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Operator Aritmatika & Operator Modulo',
        content: 'Operator matematika di JavaScript: + (tambah), - (kurang), * (kali), / (bagi), dan % (modulo / sisa pembagian). Modulo sangat berguna dalam logika kantor: n % 2 === 0 memeriksa apakah angka genap (misal warna baris zebra di tabel), atau n % 10 === 0 untuk promo kelipatan 10 transaksi.',
        analogy: 'Modulo seperti membagi 7 potong kue ke 3 piring: masing-masing dapat 2 kue, dan tersisa 1 potong kue di loyang (7 % 3 = 1).',
        officeContext: 'Program diskon belanja: setiap pembelian kelipatan 5 item mendapat bonus 1 item gratis.',
        keyTerms: ['Operator Modulo (%)', 'Sisa Pembagian', 'Floating Point'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Operator Sisa Bagi (%)',
        explanation: '10 % 3 menghasilkan 1 karena 10 dibagi 3 adalah 3 dengan sisa 1.',
        editorType: 'coding',
        initialData: {
          code: 'function cekGenap(n) {\n  return n % 2 === 0;\n}\n\nconsole.log(cekGenap(8));',
        },
        expectedResult: true,
        walkthrough: [
          { stepIndex: 0, instruction: 'n % 2 membagi angka dengan 2 dan mengambil sisanya.', targetCode: 'n % 2', highlightLabel: 'Modulo 2' },
          { stepIndex: 1, instruction: 'Jika sisa bagi adalah 0, berarti angka tersebut genap (TRUE).', targetCode: '=== 0', highlightLabel: 'Cek Genap' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Hitung Kelipatan 5',
        instruction: 'Tulis fungsi cekKelipatanLima(n) { return n % 5 === 0; }.',
        editorType: 'coding',
        initialData: {
          code: 'function cekKelipatanLima(n) {\n  return n % 5 === 0;\n}',
        },
        validationHint: 'Gunakan n % 5 === 0.',
        expectedOutput: 'n % 5 === 0',
      },
      {
        type: 'kuis',
        title: 'Kuis Aritmatika',
        questions: [
          {
            id: 'q-ari-1',
            type: 'tebak-hasil',
            prompt: 'Berapakah hasil dari 14 % 4 di JavaScript?',
            options: ['2', '3', '3.5', '0'],
            correctAnswer: '2',
            explanation: '14 dibagi 4 adalah 3 (total 12), menyisakan 2. Maka 14 % 4 = 2.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Aritmatika Komputer',
        points: [
          'Gunakan tanda kurung (...) untuk memastikan urutan kalkulasi benar.',
          'Operator Modulo (%) mengambil nilai sisa pembagian bilangan bulat.',
          'Gunakan Math.round() untuk transaksi keuangan agar desimal tidak meluap.',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Kak Intan',
        content: 'Untuk memangkatkan angka, gunakan tanda bintang ganda: 2 ** 3 sama dengan 8 (2 pangkat 3)!',
        badge: '⚡ Operator Eksponen',
      },
    ],
    commonMistakes: [
      'Mengira operator % adalah persen diskon. Di JavaScript % adalah modulo (sisa bagi), bukan persentase!',
    ],
    glossaryTerms: ['Arithmetic Expressions', 'Business Math'],
    relatedLevels: ['code-t1-02'],
    relatedCaseFiles: ['case-03'],
    cheatSheetId: 'sheet-js-logic',
  },
  // 7. Clean Code
  {
    id: 'les-code-clean-code',
    track: 'coding',
    tier: 2,
    skillId: 'Clean Code',
    title: 'Standar Kode Bersih (Clean Code) & Penamaan Variabel',
    objectives: [
      'Menerapkan gaya penamaan camelCase pada variabel dan fungsi',
      'Menulis kode yang mudah dibaca rekan satu tim (Self-Documenting Code)',
      'Menghindari Magic Numbers dan penamaan variabel satu huruf yang membingungkan',
    ],
    estimatedMinutes: 7,
    prerequisites: ['les-code-function-basics'],
    characterIntro: {
      characterId: 'intan',
      dialogue: 'Kode kita dibaca orang lain jauh lebih sering daripada waktu kita menulisnya. Menulis variabel seperti "const x = a * 0.11" akan bikin tim memakimu 6 bulan lagi. Tulis "const nilaiPajak = hargaDasar * TARIF_PPN"!',
      tip: 'Gunakan huruf kecil di awal dan kapital di kata berikutnya: camelCase.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Prinsip Clean Code untuk Tim Profesional',
        content: 'Clean code adalah kode yang ringkas, mudah dibaca, dan mudah dipelihara. Prinsip utamanya: (1) Penamaan variabel camelCase yang deskriptif (misal totalBelanja, statusPembayaran), (2) Satu fungsi hanya bertanggung jawab atas SATU tugas (Single Responsibility Principle), (3) Hindari Magic Numbers—ganti angka misterius dengan konstanta bermakna (misal const JAM_LEMBUR_MAKSIMAL = 4).',
        analogy: 'Seperti tulisan tangan di resep obat apotek: jika tulisannya jelas, apoteker tidak akan salah mengambilkan obat untuk pasien.',
        officeContext: 'Standar audit repository kode IT PT Maju Sejahtera sebelum rilis ke production.',
        keyTerms: ['Clean Code', 'camelCase', 'Magic Numbers', 'Self-Documenting'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Kode Buruk vs Kode Bersih',
        explanation: 'Bandingkan nama variabel x dan y dengan nama deskriptif hargaBarang dan jumlahBeli.',
        editorType: 'coding',
        initialData: {
          code: '// Kode Bersih & Mudah Dipahami:\nfunction hitungTotal(hargaBarang, kuantitas) {\n  const TARIF_PPN = 0.11;\n  const subtotal = hargaBarang * kuantitas;\n  const pajak = subtotal * TARIF_PPN;\n  return subtotal + pajak;\n}\n\nconsole.log(hitungTotal(50000, 2));',
        },
        expectedResult: 111000,
        walkthrough: [
          { stepIndex: 0, instruction: 'Konstanta TARIF_PPN huruf kapital menjelaskan arti angka 0.11.', targetCode: 'const TARIF_PPN = 0.11;', highlightLabel: 'Bebas Magic Number' },
          { stepIndex: 1, instruction: 'Nama variabel deskriptif membuat alur hitung bisa dibaca seperti bahasa manusia.', targetCode: 'subtotal + pajak', highlightLabel: 'Alur Jelas' },
        ],
      },
      {
        type: 'coba-sendiri',
        title: 'Coba Sendiri: Buat Variabel Deskriptif',
        instruction: 'Tulis fungsi hitungGajiBersih(gajiPokok, tunjangan) { return gajiPokok + tunjangan; }.',
        editorType: 'coding',
        initialData: {
          code: 'function hitungGajiBersih(gajiPokok, tunjangan) {\n  return gajiPokok + tunjangan;\n}',
        },
        validationHint: 'Tulis return gajiPokok + tunjangan;.',
        expectedOutput: 'gajiPokok + tunjangan',
      },
      {
        type: 'kuis',
        title: 'Kuis Clean Code',
        questions: [
          {
            id: 'q-cln-1',
            type: 'pilihan-ganda',
            prompt: 'Gaya penulisan variabel manakah yang merupakan konvensi standar resmi di JavaScript?',
            options: ['camelCase (contoh: totalHargaBarang)', 'snake_case (contoh: total_harga_barang)', 'kebab-case (contoh: total-harga-barang)', 'UPPERCASE'],
            correctAnswer: 'camelCase (contoh: totalHargaBarang)',
            explanation: 'JavaScript secara universal menggunakan camelCase untuk penamaan variabel dan fungsi.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: '3 Kaidah Clean Code',
        points: [
          'Gunakan camelCase yang deskriptif, hindari variabel 1 huruf.',
          'Ganti angka ajaib (Magic Numbers) dengan konstanta bernama.',
          'Satu fungsi hanya mengerjakan satu tugas spesifik.',
        ],
      },
      {
        type: 'tips',
        title: 'Tips Kak Intan',
        content: 'Jika kamu butuh menulis komentar panjang hanya untuk menjelaskan apa isi sebuah variabel, berarti nama variabelmu belum cukup jelas. Ganti namanya!',
        badge: '✨ Prinsip Senior',
      },
    ],
    commonMistakes: [
      'Menamai variabel a, b, c, x, y, temp sehingga tidak ada yang tahu apa isinya.',
    ],
    glossaryTerms: ['Clean Code', 'Functions'],
    relatedLevels: ['code-t1-02'],
    relatedCaseFiles: ['case-03'],
    cheatSheetId: 'sheet-js-logic',
  },
];
