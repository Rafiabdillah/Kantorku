/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu v2.0 - Kamus & Glosarium Terpadu
 * Kamus istilah Bahasa Indonesia - Inggris, Kamus Fungsi Excel, Tag HTML, Properti CSS, dan JavaScript.
 */

import { GlossaryTerm } from '../../features/learning/types';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // ==========================================
  // --- FUNGSI EXCEL ---
  // ==========================================
  {
    id: 'fn-sum',
    term: 'SUM',
    englishTerm: 'Sum / Total Addition',
    category: 'excel',
    definition: 'Menjumlahkan seluruh nilai angka dalam satu rentang sel atau daftar argumen numerik.',
    syntax: '=SUM(number1, [number2], ...)',
    arguments: [
      { name: 'number1', type: 'Rentang / Nilai', description: 'Rentang sel pertama yang akan dijumlahkan, misal A1:A10.', required: true },
      { name: 'number2', type: 'Rentang / Nilai', description: 'Rentang sel tambahan opsional.', required: false },
    ],
    example: '=SUM(B2:B8)',
    commonMistake: 'Memasukkan teks di dalam rumus atau lupa menutup tanda kurung.',
    relatedSkills: ['SUM Function', 'Range Selection'],
  },
  {
    id: 'fn-average',
    term: 'AVERAGE',
    englishTerm: 'Arithmetic Mean',
    category: 'excel',
    definition: 'Menghitung rata-rata aritmatika dari rentang data angka yang ditentukan.',
    syntax: '=AVERAGE(number1, [number2], ...)',
    arguments: [
      { name: 'number1', type: 'Rentang', description: 'Rentang sel yang ingin dihitung nilai rata-ratanya.', required: true },
    ],
    example: '=AVERAGE(C2:C15)',
    commonMistake: 'Menyertakan sel nol padahal yang diinginkan hanya sel yang memiliki transaksi.',
    relatedSkills: ['Formula Basics', 'Business Math'],
  },
  {
    id: 'fn-if',
    term: 'IF',
    englishTerm: 'Conditional Branching',
    category: 'excel',
    definition: 'Melakukan uji logika dan mengembalikan nilai tertentu jika kondisi BENAR (TRUE), atau nilai lain jika SALAH (FALSE).',
    syntax: '=IF(logical_test, value_if_true, [value_if_false])',
    arguments: [
      { name: 'logical_test', type: 'Kondisi Boolean', description: 'Pernyataan yang menghasilkan TRUE/FALSE, misal B2 >= 75.', required: true },
      { name: 'value_if_true', type: 'Sembarang', description: 'Nilai jika syarat terpenuhi, misal "LULUS".', required: true },
      { name: 'value_if_false', type: 'Sembarang', description: 'Nilai jika syarat gagal, misal "REMEDIAL".', required: false },
    ],
    example: '=IF(D2>=1000000; "Diskon 10%"; "Normal")',
    commonMistake: 'Lupa tanda petik ganda pada teks hasil (misal menulis LULUS alih-alih "LULUS") atau salah pemisah titik-koma (;).',
    relatedSkills: ['Logical IF', 'Conditional Output', 'Comparison Operators'],
  },
  {
    id: 'fn-vlookup',
    term: 'VLOOKUP',
    englishTerm: 'Vertical Lookup',
    category: 'excel',
    definition: 'Mencari nilai pada kolom paling kiri dari tabel referensi secara vertikal, lalu mengambil data dari kolom yang ditentukan pada baris yang sama.',
    syntax: '=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])',
    arguments: [
      { name: 'lookup_value', type: 'Kunci Pencarian', description: 'Nilai acuan yang dicari (misal Kode Barang di A2).', required: true },
      { name: 'table_array', type: 'Tabel Referensi', description: 'Rentang tabel master (misal $F$2:$H$50). Kunci harus di kolom 1.', required: true },
      { name: 'col_index_num', type: 'Angka Kolom', description: 'Nomor indeks kolom dari table_array yang ingin diambil (1, 2, 3...).', required: true },
      { name: 'range_lookup', type: 'Boolean', description: 'FALSE (atau 0) untuk pencocokan tepat/persis, TRUE untuk pencocokan aproksimasi.', required: false },
    ],
    example: '=VLOOKUP(A2; $F$2:$H$20; 2; FALSE)',
    commonMistake: 'Lupa mengunci tabel master dengan tanda dollar ($F$2:$H$20) sehingga saat rumus ditarik ke bawah rentang ikut bergeser.',
    relatedSkills: ['VLOOKUP', 'Table Relational Lookup', 'Absolute Reference ($)'],
  },
  {
    id: 'fn-countif',
    term: 'COUNTIF',
    englishTerm: 'Conditional Count',
    category: 'excel',
    definition: 'Menghitung jumlah sel dalam rentang yang memenuhi satu kriteria atau kriteria khusus.',
    syntax: '=COUNTIF(range, criteria)',
    arguments: [
      { name: 'range', type: 'Rentang Sel', description: 'Kumpulan sel yang akan diperiksa kondisinya.', required: true },
      { name: 'criteria', type: 'Kriteria', description: 'Syarat pemfilteran, misal ">100" atau "Hadir".', required: true },
    ],
    example: '=COUNTIF(C2:C30; "Hadir")',
    commonMistake: 'Lupa mengapit kriteria perbandingan dengan tanda petik ganda, misal =COUNTIF(C2:C30; >50) akan error.',
    relatedSkills: ['Formula Basics', 'Data Integrity'],
  },
  {
    id: 'fn-round',
    term: 'ROUND',
    englishTerm: 'Number Rounding',
    category: 'excel',
    definition: 'Membulatkan angka ke jumlah digit desimal tertentu secara matematis.',
    syntax: '=ROUND(number, num_digits)',
    arguments: [
      { name: 'number', type: 'Angka', description: 'Nilai angka atau sel yang ingin dibulatkan.', required: true },
      { name: 'num_digits', type: 'Integer', description: 'Jumlah digit desimal. Gunakan 0 untuk bilangan bulat.', required: true },
    ],
    example: '=ROUND(B2 * 0.11; 0)',
    commonMistake: 'Menyamakan pembulatan visual sel dengan pembulatan nilai matematis rumus.',
    relatedSkills: ['Tax Calculation', 'Business Math'],
  },

  // ==========================================
  // --- HTML & CSS ---
  // ==========================================
  {
    id: 'tag-html-semantic',
    term: 'Tag Semantik (header, nav, main, footer)',
    englishTerm: 'Semantic HTML5 Elements',
    category: 'web',
    definition: 'Elemen markup HTML5 yang secara eksplisit menjelaskan peran struktural dan arti kontennya kepada peramban dan mesin pencari.',
    syntax: '<header>...</header> <main>...</main> <footer>...</footer>',
    example: '<header><nav>...</nav></header><main><section>...</section></main>',
    commonMistake: 'Membuat seluruh layout menggunakan <div> bertumpuk tanpa tag semantik (div soup).',
    relatedSkills: ['HTML Structure', 'Headings'],
  },
  {
    id: 'css-flexbox',
    term: 'Flexbox (display: flex)',
    englishTerm: 'Flexible Box Layout Module',
    category: 'web',
    definition: 'Model tata letak CSS 1 dimensi untuk mendistribusikan ruang dan meratakan elemen anak secara horizontal atau vertikal dalam kontainer.',
    syntax: 'display: flex; justify-content: center; align-items: center;',
    example: '.kartu-container { display: flex; gap: 1rem; justify-content: space-between; }',
    commonMistake: 'Lupa menentukan flex-wrap sehingga elemen anak gepeng atau meluap ke luar layar.',
    relatedSkills: ['CSS Flexbox', 'Card Layout', 'Alignment'],
  },
  {
    id: 'css-media-query',
    term: 'Media Query (@media)',
    englishTerm: 'Responsive Breakpoint Query',
    category: 'web',
    definition: 'Aturan CSS bersyarat yang menerapkan gaya hanya ketika jendela peramban memenuhi dimensi tertentu (desain responsif).',
    syntax: '@media (min-width: 768px) { ... }',
    example: '@media (max-width: 640px) { .grid { flex-direction: column; } }',
    commonMistake: 'Menulis breakpoint yang saling tumpang tindih tanpa urutan mobile-first yang konsisten.',
    relatedSkills: ['Card Layout', 'CSS Flexbox'],
  },

  // ==========================================
  // --- JAVASCRIPT ---
  // ==========================================
  {
    id: 'js-function',
    term: 'Function (Fungsi)',
    englishTerm: 'Function Declaration',
    category: 'coding',
    definition: 'Blok kode mandiri yang dapat menerima parameter input, menjalankan instruksi tertentu, dan mengembalikan hasil lewat return.',
    syntax: 'function namaFungsi(param1, param2) { return hasil; }',
    example: 'function hitungDiskon(total, persen) { return total * (persen / 100); }',
    commonMistake: 'Lupa menulis kata kunci return sehingga fungsi menghasilkan undefined.',
    relatedSkills: ['Functions', 'Parameters', 'Return Statements'],
  },
  {
    id: 'js-template-literals',
    term: 'Template Literals (`${...}`)',
    englishTerm: 'String Interpolation',
    category: 'coding',
    definition: 'Format string dengan tanda backtick (`) yang memungkinkan penyisipan ekspresi JavaScript secara langsung tanpa tanda plus (+).',
    syntax: '`Halo ${nama}, tagihanmu Rp ${total}`',
    example: 'const pesan = `Total pembayaran meja #${meja}: Rp ${totalBayar}`;',
    commonMistake: 'Menggunakan kutip tunggal biasa (\') atau kutip ganda (") alih-alih backtick (`).',
    relatedSkills: ['String Concatenation', 'Clean Code'],
  },

  // ==========================================
  // --- DOKUMEN & BISNIS ---
  // ==========================================
  {
    id: 'word-margin-academic',
    term: 'Margin Standar Akademik 4-3-3-3',
    englishTerm: 'Standard Thesis Margins',
    category: 'word',
    definition: 'Standar margin penulisan karya ilmiah Indonesia: 4 cm batas Kiri (untuk jilid), 4 cm Atas, 3 cm Kanan, dan 3 cm Bawah.',
    example: 'Kiri: 4 cm, Atas: 4 cm, Kanan: 3 cm, Bawah: 3 cm.',
    commonMistake: 'Menggunakan margin Normal 1 inci (2.54 cm) di semua sisi sehingga teks terpotong saat skripsi dijilid hard cover.',
    relatedSkills: ['Academic Formatting', 'Margin 4-3-3-3'],
  },
  {
    id: 'word-hierarchy',
    term: 'Hierarki Judul (Heading 1, 2, 3)',
    englishTerm: 'Heading Style Hierarchy',
    category: 'word',
    definition: 'Pengelompokan tingkatan bab dan sub-bab dokumen menggunakan Styles Heading terstruktur untuk navigasi dan pembuatan Daftar Isi otomatis.',
    example: 'H1: BAB I PENDAHULUAN; H2: 1.1 Latar Belakang; H3: 1.1.1 Identifikasi Masalah.',
    commonMistake: 'Membuat judul hanya dengan memperbesar ukuran huruf dan menebalkan teks manual tanpa menerapkan style Heading.',
    relatedSkills: ['Heading Hierarchy', 'Document Typography'],
  },
  {
    id: 'word-action-matrix',
    term: 'Matriks Rencana Aksi (Action Plan)',
    englishTerm: 'Action Plan Matrix / RACI Table',
    category: 'word',
    definition: 'Tabel terstruktur dalam dokumen bisnis yang memetakan kegiatan, penanggung jawab (PIC), batas waktu, dan indikator keberhasilan.',
    example: 'Kolom: No | Aktivitas | Penanggung Jawab | Batas Waktu | Status.',
    commonMistake: 'Menulis tugas dalam bentuk paragraf panjang sehingga pimpinan kesulitan melacak penanggung jawab.',
    relatedSkills: ['Table Creation', 'Action Plan Matrix', 'Executive Minutes'],
  },
];
