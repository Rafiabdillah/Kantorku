/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Pelajaran Tier 4: konsep baru yang dipakai misi Tier 4 (SUMIFS, Nested IF, CSS Grid, kamus objek, validasi, pengelompokan).
 */
import { Lesson } from '../../features/learning/types';

export const TIER4_LESSONS: Lesson[] = [
  {
    id: 'les-excel-sumifs',
    track: 'excel',
    tier: 4,
    skillId: 'Multi-Criteria SUMIFS',
    title: 'Menjumlahkan dengan Banyak Syarat: SUMIFS dan COUNTIFS',
    objectives: [
      'Menulis SUMIFS dengan dua syarat atau lebih',
      'Membedakan urutan argumen SUMIF dan SUMIFS',
      'Menghitung baris yang memenuhi semua syarat dengan COUNTIFS',
    ],
    estimatedMinutes: 8,
    prerequisites: [],
    characterIntro: {
      characterId: 'reza',
      dialogue: 'Pertanyaan manajemen jarang punya satu syarat. "Omzet kopi di Malang" sudah dua syarat. Untuk itu ada SUMIFS.',
      tip: 'Di SUMIFS, rentang yang dijumlahkan ditulis lebih dulu. Di SUMIF, ia ditulis terakhir.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Satu Rumus, Banyak Syarat',
        content: 'SUMIFS(rentang_jumlah; rentang_syarat1; syarat1; rentang_syarat2; syarat2; ...) menjumlahkan hanya baris yang memenuhi semua syarat. COUNTIFS(rentang1; syarat1; rentang2; syarat2) menghitung baris yang memenuhi semua syarat tanpa rentang jumlah. Syarat teks atau perbandingan ditulis dengan tanda kutip, misalnya ">=1000000".',
        analogy: 'Seperti menyaring daftar belanja: ambil hanya yang dibeli di toko A dan berkategori buah, lalu jumlahkan harganya.',
        officeContext: 'Rekap omzet per wilayah dan produk untuk rapat mingguan.',
        keyTerms: ['SUMIFS', 'COUNTIFS', 'Syarat ganda'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Omzet Kopi di Malang',
        explanation: 'Sel E2 menjumlahkan omzet hanya untuk baris dengan wilayah Malang dan produk Kopi.',
        editorType: 'excel',
        initialData: {
          A1: { raw: 'Wilayah' }, B1: { raw: 'Produk' }, C1: { raw: 'Omzet' },
          A2: { raw: 'Malang' }, B2: { raw: 'Kopi' }, C2: { raw: '100' },
          A3: { raw: 'Batu' }, B3: { raw: 'Kopi' }, C3: { raw: '200' },
          A4: { raw: 'Malang' }, B4: { raw: 'Teh' }, C4: { raw: '50' },
          A5: { raw: 'Malang' }, B5: { raw: 'Kopi' }, C5: { raw: '300' },
          E2: { raw: '=SUMIFS(C2:C5; A2:A5; "Malang"; B2:B5; "Kopi")' },
        },
        expectedResult: 400,
        walkthrough: [
          { stepIndex: 0, instruction: 'Argumen pertama C2:C5 adalah angka yang dijumlahkan.', targetCell: 'E2', highlightLabel: 'Rentang jumlah' },
          { stepIndex: 1, instruction: 'Pasangan A2:A5 dan "Malang" menjadi syarat pertama.', targetCell: 'A2', highlightLabel: 'Syarat 1' },
          { stepIndex: 2, instruction: 'Hanya baris 2 dan 5 yang memenuhi kedua syarat, jadi hasilnya 100 + 300 = 400.', targetCell: 'E2', highlightLabel: 'Hasil 400' },
        ],
      },
      {
        type: 'kuis',
        title: 'Kuis SUMIFS',
        questions: [
          {
            id: 'q-sumifs-1',
            type: 'pilihan-ganda',
            prompt: 'Di SUMIFS, argumen mana yang ditulis paling awal?',
            options: ['Rentang yang dijumlahkan', 'Syarat pertama', 'Rentang syarat pertama', 'Nama fungsi lain'],
            correctAnswer: 'Rentang yang dijumlahkan',
            explanation: 'SUMIFS memulai dengan rentang jumlah, baru pasangan rentang syarat dan syarat. SUMIF kebalikannya.',
          },
          {
            id: 'q-sumifs-2',
            type: 'pilihan-ganda',
            prompt: 'Fungsi mana yang menghitung berapa baris yang memenuhi dua syarat sekaligus?',
            options: ['COUNTIFS', 'SUMIFS', 'COUNTA', 'VLOOKUP'],
            correctAnswer: 'COUNTIFS',
            explanation: 'COUNTIFS menghitung baris yang memenuhi semua pasangan rentang dan syarat.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: 'Ingat Tiga Hal Ini',
        points: [
          'SUMIFS: rentang jumlah dulu, lalu pasangan rentang dan syarat.',
          'COUNTIFS tidak punya rentang jumlah, hanya pasangan rentang dan syarat.',
          'Syarat teks dan perbandingan ditulis dengan tanda kutip.',
        ],
      },
    ],
    commonMistakes: [
      'Menukar urutan rentang jumlah pada SUMIF dan SUMIFS.',
      'Lupa tanda kutip pada syarat seperti ">=1000000".',
    ],
    glossaryTerms: [],
    relatedLevels: ['excel-t4-02'],
    relatedCaseFiles: [],
  },
  {
    id: 'les-excel-nested-if',
    track: 'excel',
    tier: 4,
    skillId: 'Nested IF',
    title: 'IF Bertingkat untuk Tiga Hasil atau Lebih',
    objectives: [
      'Menaruh IF kedua di bagian "jika salah" dari IF pertama',
      'Mengurutkan syarat dari yang paling ketat',
      'Menghindari hasil salah akibat urutan syarat terbalik',
    ],
    estimatedMinutes: 7,
    prerequisites: [],
    characterIntro: {
      characterId: 'hendra',
      dialogue: 'Aturan tunjangan biasanya bertingkat. Satu IF hanya memilih dua jalan. Untuk tiga jalan, IF kedua ditaruh di dalam IF pertama.',
      tip: 'Mulai dari syarat paling ketat. Syarat longgar yang ditulis lebih dulu akan "menelan" kasus yang seharusnya masuk tingkat atas.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'IF di dalam IF',
        content: '=IF(syarat1; hasil1; IF(syarat2; hasil2; hasil3)) memilih hasil1 bila syarat1 benar, hasil2 bila syarat1 salah tetapi syarat2 benar, dan hasil3 bila keduanya salah. Urutan penting: Excel berhenti di syarat pertama yang benar.',
        analogy: 'Seperti antrean loket: cek dulu apakah prioritas, kalau bukan cek apakah lansia, kalau bukan masuk antrean umum.',
        officeContext: 'Tunjangan masa kerja 20 persen, 10 persen, atau nol di slip gaji.',
        keyTerms: ['IF bertingkat', 'Urutan syarat'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Tunjangan Bertingkat',
        explanation: 'Masa kerja 6 tahun mendapat 20 persen dari gaji pokok 1000.',
        editorType: 'excel',
        initialData: {
          A1: { raw: 'Gaji' }, B1: { raw: 'Tahun' }, C1: { raw: 'Tunjangan' },
          A2: { raw: '1000' }, B2: { raw: '6' },
          C2: { raw: '=IF(B2>=5; A2*0,2; IF(B2>=2; A2*0,1; 0))' },
        },
        expectedResult: 200,
        walkthrough: [
          { stepIndex: 0, instruction: 'Syarat pertama B2>=5 diperiksa lebih dulu karena paling ketat.', targetCell: 'C2', highlightLabel: 'Syarat ketat' },
          { stepIndex: 1, instruction: 'Karena 6 >= 5, Excel berhenti di sini dan memberi 20 persen.', targetCell: 'C2', highlightLabel: 'Berhenti' },
          { stepIndex: 2, instruction: 'Hasilnya 1000 x 0,2 = 200.', targetCell: 'C2', highlightLabel: 'Hasil 200' },
        ],
      },
      {
        type: 'kuis',
        title: 'Kuis IF Bertingkat',
        questions: [
          {
            id: 'q-nif-1',
            type: 'pilihan-ganda',
            prompt: 'Mengapa syarat B2>=5 harus ditulis sebelum B2>=2?',
            options: [
              'Karena karyawan 6 tahun juga memenuhi B2>=2 dan akan salah masuk tingkat bawah',
              'Karena Excel hanya membaca angka 5',
              'Karena IF kedua tidak boleh berisi angka',
              'Karena urutan tidak berpengaruh',
            ],
            correctAnswer: 'Karena karyawan 6 tahun juga memenuhi B2>=2 dan akan salah masuk tingkat bawah',
            explanation: 'IF berhenti di syarat pertama yang benar, jadi syarat paling ketat harus diperiksa lebih dulu.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: 'Ingat Tiga Hal Ini',
        points: [
          'IF kedua ditaruh di bagian "jika salah" dari IF pertama.',
          'Tulis syarat dari yang paling ketat ke yang paling longgar.',
          'Setiap IF butuh kurung tutup sendiri.',
        ],
      },
    ],
    commonMistakes: [
      'Memeriksa syarat longgar lebih dulu sehingga tingkat atas tidak pernah tercapai.',
      'Lupa kurung tutup untuk IF di dalam.',
    ],
    glossaryTerms: [],
    relatedLevels: ['excel-t4-03'],
    relatedCaseFiles: [],
  },
  {
    id: 'les-web-css-grid',
    track: 'web',
    tier: 4,
    skillId: 'CSS Grid',
    title: 'Tata Letak Dua Dimensi dengan CSS Grid',
    objectives: [
      'Menyalakan grid dengan display: grid',
      'Membagi kolom dengan grid-template-columns',
      'Mengatur jarak dengan gap dan memilih Grid atau Flexbox sesuai kebutuhan',
    ],
    estimatedMinutes: 8,
    prerequisites: [],
    characterIntro: {
      characterId: 'intan',
      dialogue: 'Flexbox bagus untuk satu baris. Kalau kamu butuh baris dan kolom sekaligus, seperti dashboard atau galeri, pakai Grid.',
      tip: 'Pasang display: grid pada pembungkus, bukan pada kartunya.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Grid: Baris dan Kolom Sekaligus',
        content: 'Pada pembungkus, tulis display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;. Tiga kolom lebar sama terbentuk, dan anak-anaknya otomatis mengisi sel berikutnya. Unit fr berarti satu bagian dari sisa ruang.',
        analogy: 'Seperti kisi-kisi loker: jumlah kolom ditentukan di awal, dan barang baru otomatis masuk ke loker kosong berikutnya.',
        officeContext: 'Dashboard statistik penjualan dan galeri produk.',
        keyTerms: ['display: grid', 'grid-template-columns', 'fr', 'gap'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Tiga Kartu dalam Tiga Kolom',
        explanation: 'Kontainer .dashboard membagi lebar menjadi tiga kolom sama.',
        editorType: 'web',
        initialData: {
          html: '<div class="dashboard">\n  <div class="stat">Omzet</div>\n  <div class="stat">Pesanan</div>\n  <div class="stat">Pelanggan</div>\n</div>',
          css: '.dashboard { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }\n.stat { padding: 16px; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; }',
        },
        walkthrough: [
          { stepIndex: 0, instruction: 'display: grid pada .dashboard menyalakan tata letak grid.', targetCode: 'display: grid', highlightLabel: 'Nyalakan grid' },
          { stepIndex: 1, instruction: 'repeat(3, 1fr) membuat tiga kolom dengan lebar sama.', targetCode: 'repeat(3, 1fr)', highlightLabel: 'Tiga kolom' },
          { stepIndex: 2, instruction: 'gap memberi jarak 16px antar sel tanpa margin manual.', targetCode: 'gap: 16px', highlightLabel: 'Jarak' },
        ],
      },
      {
        type: 'kuis',
        title: 'Kuis CSS Grid',
        questions: [
          {
            id: 'q-grid-1',
            type: 'pilihan-ganda',
            prompt: 'Di elemen mana display: grid dipasang agar kartu tersusun dalam kolom?',
            options: ['Pada pembungkus kartu', 'Pada setiap kartu', 'Pada tag <body> saja', 'Pada tag <img>'],
            correctAnswer: 'Pada pembungkus kartu',
            explanation: 'Grid mengatur anak langsung dari elemen yang diberi display: grid.',
          },
          {
            id: 'q-grid-2',
            type: 'pilihan-ganda',
            prompt: 'Apa arti grid-template-columns: repeat(3, 1fr)?',
            options: ['Tiga kolom dengan lebar sama', 'Tiga baris dengan tinggi sama', 'Satu kolom tiga kali lebih lebar', 'Tiga kolom lebar 1 piksel'],
            correctAnswer: 'Tiga kolom dengan lebar sama',
            explanation: 'repeat(3, 1fr) mengulang satu kolom berukuran 1 bagian sebanyak tiga kali.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: 'Ingat Tiga Hal Ini',
        points: [
          'display: grid dipasang di pembungkus, bukan di kartu.',
          'grid-template-columns menentukan jumlah dan lebar kolom.',
          'Pakai Flexbox untuk satu baris, Grid untuk baris dan kolom sekaligus.',
        ],
      },
    ],
    commonMistakes: [
      'Memasang display: grid pada kartu, bukan pada pembungkusnya.',
      'Masih memakai float untuk tata letak kolom.',
    ],
    glossaryTerms: [],
    relatedLevels: ['web-t4-01', 'web-t4-boss'],
    relatedCaseFiles: [],
  },
  {
    id: 'les-code-object-dictionary',
    track: 'coding',
    tier: 4,
    skillId: 'Object as Dictionary',
    title: 'Objek sebagai Kamus: Menjumlahkan per Kategori',
    objectives: [
      'Memakai objek dengan kunci dinamis',
      'Menambah total dengan pola "nilai lama atau 0"',
      'Mengembalikan objek kosong untuk data kosong',
    ],
    estimatedMinutes: 8,
    prerequisites: [],
    characterIntro: {
      characterId: 'intan',
      dialogue: 'Laporan per kategori adalah salah satu tugas paling umum. Polanya sama: ambil total lama, tambah, simpan kembali.',
      tip: 'Tulis hasil[kunci] = (hasil[kunci] || 0) + nilai untuk menangani kunci yang belum ada.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Kunci Dinamis dan Pola Akumulasi',
        content: 'Objek menyimpan pasangan kunci dan nilai. Dengan kurung siku, kunci bisa berasal dari data: hasil[t.kategori]. Kunci yang belum ada bernilai undefined, jadi (hasil[k] || 0) memberi 0 sebagai titik awal sebelum ditambah.',
        analogy: 'Seperti buku kas dengan satu halaman per kategori: buka halaman kategori itu, tambahkan angkanya, tutup lagi.',
        officeContext: 'Rekap pengeluaran kantor per kategori setiap akhir bulan.',
        keyTerms: ['Objek', 'Kunci dinamis', 'Akumulasi'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Total per Kategori',
        explanation: 'Fungsi berikut menjumlahkan jumlah transaksi per kategori.',
        editorType: 'coding',
        initialData: {
          code: 'function rekap(data) {\n  const hasil = {};\n  for (const t of data) {\n    hasil[t.kategori] = (hasil[t.kategori] || 0) + t.jumlah;\n  }\n  return hasil;\n}\n\nconsole.log(rekap([{ kategori: "ATK", jumlah: 10 }, { kategori: "ATK", jumlah: 5 }]));',
        },
        expectedResult: { ATK: 15 },
        walkthrough: [
          { stepIndex: 0, instruction: 'Objek kosong hasil disiapkan sebagai kamus.', targetCode: 'const hasil = {}', highlightLabel: 'Kamus kosong' },
          { stepIndex: 1, instruction: 'Untuk tiap transaksi, total lama (atau 0) ditambah jumlahnya.', targetCode: 'hasil[t.kategori] = (hasil[t.kategori] || 0) + t.jumlah', highlightLabel: 'Akumulasi' },
          { stepIndex: 2, instruction: 'Dua transaksi ATK menjadi total 15.', targetCode: 'return hasil', highlightLabel: 'Hasil' },
        ],
      },
      {
        type: 'kuis',
        title: 'Kuis Objek sebagai Kamus',
        questions: [
          {
            id: 'q-dict-1',
            type: 'pilihan-ganda',
            prompt: 'Mengapa memakai (hasil[k] || 0) sebelum menambah?',
            options: [
              'Karena kunci yang belum ada bernilai undefined dan harus dimulai dari 0',
              'Karena objek tidak boleh kosong',
              'Karena kurung siku butuh angka',
              'Karena || mengurutkan kunci',
            ],
            correctAnswer: 'Karena kunci yang belum ada bernilai undefined dan harus dimulai dari 0',
            explanation: 'undefined + angka menghasilkan NaN, jadi nilai awal 0 diperlukan untuk kunci baru.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: 'Ingat Tiga Hal Ini',
        points: [
          'Kurung siku memungkinkan kunci berasal dari data.',
          'Pola (hasil[k] || 0) + nilai menangani kunci baru.',
          'Data kosong menghasilkan objek kosong {}.',
        ],
      },
    ],
    commonMistakes: [
      'Menimpa total dengan nilai terakhir alih-alih menambahkannya.',
      'Lupa nilai awal 0 sehingga hasilnya NaN.',
    ],
    glossaryTerms: [],
    relatedLevels: ['code-t4-01'],
    relatedCaseFiles: [],
  },
  {
    id: 'les-code-input-validation',
    track: 'coding',
    tier: 4,
    skillId: 'Input Validation',
    title: 'Validasi Input: Kumpulkan Semua Galat',
    objectives: [
      'Memeriksa beberapa aturan dalam satu fungsi',
      'Mengumpulkan galat dalam array, bukan berhenti di yang pertama',
      'Menentukan valid dari panjang array galat',
    ],
    estimatedMinutes: 8,
    prerequisites: [],
    characterIntro: {
      characterId: 'reza',
      dialogue: 'Formulir yang menolak satu kesalahan per kiriman membuat pelanggan kesal. Tunjukkan semuanya sekaligus.',
      tip: 'Siapkan const errors = [] lalu push pesan untuk tiap aturan yang dilanggar.',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Galat Terkumpul',
        content: 'Alih-alih return di galat pertama, simpan semua pesan dalam array errors. Setelah semua aturan diperiksa, kembalikan { valid: errors.length === 0, errors }. Gunakan trim() untuk menolak teks yang hanya berisi spasi, dan Number.isInteger untuk memastikan bilangan bulat.',
        analogy: 'Seperti petugas yang memberi daftar lengkap kekurangan berkas sekaligus, bukan menyuruhmu kembali berkali-kali.',
        officeContext: 'Formulir pesanan online dan pendaftaran pelatihan.',
        keyTerms: ['Validasi', 'Array galat', 'trim()', 'Number.isInteger'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Dua Aturan',
        explanation: 'Fungsi memeriksa nama dan qty, lalu mengembalikan semua galat.',
        editorType: 'coding',
        initialData: {
          code: 'function cek(p) {\n  const errors = [];\n  if (!p.nama || p.nama.trim() === "") errors.push("Nama wajib diisi");\n  if (!Number.isInteger(p.qty) || p.qty <= 0) errors.push("Qty tidak valid");\n  return { valid: errors.length === 0, errors };\n}\n\nconsole.log(cek({ nama: " ", qty: 0 }));',
        },
        expectedResult: { valid: false, errors: ['Nama wajib diisi', 'Qty tidak valid'] },
        walkthrough: [
          { stepIndex: 0, instruction: 'Array errors menampung semua pesan.', targetCode: 'const errors = []', highlightLabel: 'Wadah galat' },
          { stepIndex: 1, instruction: 'trim() membuat nama berisi spasi dianggap kosong.', targetCode: 'p.nama.trim() === ""', highlightLabel: 'Cek nama' },
          { stepIndex: 2, instruction: 'Dua aturan dilanggar sehingga dua pesan terkumpul dan valid bernilai false.', targetCode: 'valid: errors.length === 0', highlightLabel: 'Hasil' },
        ],
      },
      {
        type: 'kuis',
        title: 'Kuis Validasi',
        questions: [
          {
            id: 'q-val-1',
            type: 'pilihan-ganda',
            prompt: 'Apa akibat memakai return di galat pertama?',
            options: [
              'Galat berikutnya tidak pernah terlihat oleh pengguna',
              'Semua galat tampil lebih cepat',
              'Fungsi menjadi lebih aman dari bug',
              'valid selalu bernilai true',
            ],
            correctAnswer: 'Galat berikutnya tidak pernah terlihat oleh pengguna',
            explanation: 'return mengakhiri fungsi, jadi aturan setelahnya tidak diperiksa.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: 'Ingat Tiga Hal Ini',
        points: [
          'Kumpulkan galat dalam array, jangan return di yang pertama.',
          'trim() menolak teks yang hanya berisi spasi.',
          'valid adalah true hanya jika array galat kosong.',
        ],
      },
    ],
    commonMistakes: [
      'Menganggap qty pecahan valid karena lebih besar dari 0.',
      'Lupa memeriksa nilai kosong sebelum memanggil trim().',
    ],
    glossaryTerms: [],
    relatedLevels: ['code-t4-02'],
    relatedCaseFiles: [],
  },
  {
    id: 'les-code-grouping-sorting',
    track: 'coding',
    tier: 4,
    skillId: 'Grouping and Sorting',
    title: 'Mengelompokkan dan Mengurutkan untuk Laporan Peringkat',
    objectives: [
      'Mengelompokkan data lalu mengubahnya ke array dengan Object.entries',
      'Mengurutkan dengan pembanding yang menangani nilai sama',
      'Menghitung total dari array hasil',
    ],
    estimatedMinutes: 9,
    prerequisites: [],
    characterIntro: {
      characterId: 'sari',
      dialogue: 'Laporan peringkat selalu tiga langkah: kelompokkan, ubah ke array, urutkan. Jangan urutkan sebelum digabung.',
      tip: 'Pembanding sort yang baik: b.nilai - a.nilai || a.nama.localeCompare(b.nama).',
    },
    steps: [
      {
        type: 'penjelasan',
        title: 'Kelompokkan, Ubah, Urutkan',
        content: 'Pertama jumlahkan per nama ke dalam objek. Lalu Object.entries(peta).map(([nama, nilai]) => ({ nama, nilai })) mengubahnya menjadi array. Terakhir sort((a, b) => b.nilai - a.nilai || a.nama.localeCompare(b.nama)) mengurutkan dari terbesar, dan bila nilai sama, urut nama A ke Z supaya hasil selalu konsisten.',
        analogy: 'Seperti panitia lomba: kumpulkan skor tiap peserta dulu, baru susun papan peringkat.',
        officeContext: 'Laporan produk terlaris dari penjualan harian.',
        keyTerms: ['Object.entries', 'sort', 'Pembanding', 'localeCompare'],
      },
      {
        type: 'contoh-interaktif',
        title: 'Lihat Caranya: Peringkat Dua Produk',
        explanation: 'Fungsi menggabungkan penjualan per nama lalu mengurutkannya.',
        editorType: 'coding',
        initialData: {
          code: 'function peringkat(items) {\n  const peta = {};\n  for (const i of items) {\n    peta[i.nama] = (peta[i.nama] || 0) + i.nilai;\n  }\n  return Object.entries(peta)\n    .map(([nama, nilai]) => ({ nama, nilai }))\n    .sort((a, b) => b.nilai - a.nilai || a.nama.localeCompare(b.nama));\n}\n\nconsole.log(peringkat([{ nama: "Teh", nilai: 5 }, { nama: "Kopi", nilai: 3 }, { nama: "Kopi", nilai: 4 }]));',
        },
        expectedResult: [{ nama: 'Kopi', nilai: 7 }, { nama: 'Teh', nilai: 5 }],
        walkthrough: [
          { stepIndex: 0, instruction: 'Nilai per nama dijumlahkan: Kopi 7, Teh 5.', targetCode: 'peta[i.nama]', highlightLabel: 'Kelompokkan' },
          { stepIndex: 1, instruction: 'Object.entries mengubah objek menjadi array pasangan.', targetCode: 'Object.entries(peta)', highlightLabel: 'Ke array' },
          { stepIndex: 2, instruction: 'sort menaruh nilai terbesar di depan, nama A-Z bila sama.', targetCode: 'b.nilai - a.nilai', highlightLabel: 'Urutkan' },
        ],
      },
      {
        type: 'kuis',
        title: 'Kuis Peringkat',
        questions: [
          {
            id: 'q-sort-1',
            type: 'pilihan-ganda',
            prompt: 'Mengapa pembanding sort sebaiknya punya aturan kedua untuk nilai yang sama?',
            options: [
              'Agar urutan hasil selalu konsisten dan bisa diprediksi',
              'Agar sort berjalan lebih cepat',
              'Karena sort menolak nilai kembar',
              'Agar array menjadi lebih pendek',
            ],
            correctAnswer: 'Agar urutan hasil selalu konsisten dan bisa diprediksi',
            explanation: 'Tanpa aturan kedua, item bernilai sama bisa tampil dalam urutan berbeda-beda.',
          },
        ],
      },
      {
        type: 'ringkasan',
        title: 'Ingat Tiga Hal Ini',
        points: [
          'Gabungkan dulu, urutkan kemudian.',
          'Object.entries mengubah objek menjadi array yang bisa diurutkan.',
          'Tambahkan aturan kedua pada pembanding untuk nilai yang sama.',
        ],
      },
    ],
    commonMistakes: [
      'Mengurutkan sebelum produk yang sama digabung.',
      'Pembanding tanpa aturan untuk nilai sama.',
    ],
    glossaryTerms: [],
    relatedLevels: ['code-t4-boss'],
    relatedCaseFiles: [],
  },
];
