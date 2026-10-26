import { ModuleType, TierLevel } from '../types';

export interface PlacementQuestion {
  id: string;
  module: ModuleType;
  tierTarget: TierLevel;
  question: string;
  codeSnippet?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  // EXCEL
  {
    id: 'pq-ex-1',
    module: 'excel',
    tierTarget: 1,
    question: 'Rumus manakah yang paling tepat untuk menjumlahkan angka dari sel A1 sampai A10?',
    options: [
      { id: 'a', text: '=SUM(A1:A10)', isCorrect: true },
      { id: 'b', text: '=TOTAL(A1:A10)', isCorrect: false },
      { id: 'c', text: 'A1 + A10', isCorrect: false },
      { id: 'd', text: '=ADD(A1..A10)', isCorrect: false },
    ],
    explanation: 'Fungsi standar Excel untuk penjumlahan rentang kontinu adalah =SUM(rentang_awal:rentang_akhir).',
  },
  {
    id: 'pq-ex-2',
    module: 'excel',
    tierTarget: 2,
    question: 'Apa fungsi tanda dollar ($) pada rumus seperti =B2 * $C$1?',
    options: [
      { id: 'a', text: 'Mengubah format angka menjadi mata uang Dollar Amerika', isCorrect: false },
      { id: 'b', text: 'Mengunci referensi sel C1 agar tidak bergeser saat rumus di-copy ke baris lain', isCorrect: true },
      { id: 'c', text: 'Membuat rumus dieksekusi lebih cepat di memori', isCorrect: false },
      { id: 'd', text: 'Mencegah sel C1 diedit oleh pengguna lain', isCorrect: false },
    ],
    explanation: 'Tanda $ adalah absolute reference yang mengunci baris dan kolom.',
  },
  {
    id: 'pq-ex-3',
    module: 'excel',
    tierTarget: 3,
    question: 'Rumus: =IF(C2 >= 70, "Lulus", "Remedial"). Jika nilai di sel C2 adalah 70, apa hasilnya?',
    options: [
      { id: 'a', text: '"Lulus"', isCorrect: true },
      { id: 'b', text: '"Remedial"', isCorrect: false },
      { id: 'c', text: '#VALUE!', isCorrect: false },
      { id: 'd', text: '0', isCorrect: false },
    ],
    explanation: 'Operator >= berarti lebih besar atau sama dengan. Karena 70 sama dengan 70, hasilnya adalah kondisi benar ("Lulus").',
  },
  {
    id: 'pq-ex-4',
    module: 'excel',
    tierTarget: 4,
    question: 'Pada rumus =VLOOKUP("ID05", A2:D50, 3, FALSE), angka 3 merujuk pada:',
    options: [
      { id: 'a', text: 'Nomor baris ketiga dari tabel data', isCorrect: false },
      { id: 'b', text: 'Nomor kolom hasil yang ingin diambil (kolom ke-3 dari tabel A2:D50)', isCorrect: true },
      { id: 'c', text: 'Jumlah toleransi selisih data', isCorrect: false },
      { id: 'd', text: 'Tiga digit pertama dari kata kunci pencarian', isCorrect: false },
    ],
    explanation: 'Argumen ke-3 pada VLOOKUP adalah column index number (col_index_num) dari rentang tabel yang dipilih.',
  },
  {
    id: 'pq-ex-5',
    module: 'excel',
    tierTarget: 5,
    question: 'Fungsi manakah yang paling efisien untuk menghitung total penjualan hanya untuk produk "Kopi" di cabang "Jakarta"?',
    options: [
      { id: 'a', text: '=SUMIFS(rentang_jumlah, rentang_kriteria1, "Kopi", rentang_kriteria2, "Jakarta")', isCorrect: true },
      { id: 'b', text: '=SUM(IF("Kopi" AND "Jakarta"))', isCorrect: false },
      { id: 'c', text: '=COUNTIF("Kopi", "Jakarta")', isCorrect: false },
      { id: 'd', text: '=VLOOKUP("Kopi" & "Jakarta")', isCorrect: false },
    ],
    explanation: 'SUMIFS dirancang khusus untuk menjumlahkan data dengan banyak kriteria sekaligus.',
  },

  // CODING (JAVASCRIPT)
  {
    id: 'pq-cd-1',
    module: 'coding',
    tierTarget: 1,
    question: 'Bagaimana cara mendeklarasikan variabel yang nilainya tidak dapat diubah kembali di JavaScript?',
    options: [
      { id: 'a', text: 'const nama = "Budi";', isCorrect: true },
      { id: 'b', text: 'let nama = "Budi";', isCorrect: false },
      { id: 'c', text: 'var static nama = "Budi";', isCorrect: false },
      { id: 'd', text: 'fixed nama = "Budi";', isCorrect: false },
    ],
    explanation: 'Kata kunci "const" digunakan untuk mendeklarasikan variabel konstanta yang tidak dapat di-reassign.',
  },
  {
    id: 'pq-cd-2',
    module: 'coding',
    tierTarget: 2,
    question: 'Apa output dari: console.log(typeof ("10" + 5)); ?',
    options: [
      { id: 'a', text: '"string" (karena hasil penggabungannya adalah "105")', isCorrect: true },
      { id: 'b', text: '"number" (karena hasilnya 15)', isCorrect: false },
      { id: 'c', text: '"undefined"', isCorrect: false },
      { id: 'd', text: '"NaN"', isCorrect: false },
    ],
    explanation: 'Operator + jika salah satu operandnya string akan melakukan string concatenation sehingga menghasilkan string "105".',
  },
  {
    id: 'pq-cd-3',
    module: 'coding',
    tierTarget: 3,
    question: 'Metode array manakah yang digunakan untuk mengambil hanya angka genap dari sebuah array angka?',
    options: [
      { id: 'a', text: 'array.filter(n => n % 2 === 0)', isCorrect: true },
      { id: 'b', text: 'array.map(n => n % 2 === 0)', isCorrect: false },
      { id: 'c', text: 'array.forEach(n => n % 2 === 0)', isCorrect: false },
      { id: 'd', text: 'array.find(n => n % 2 === 0)', isCorrect: false },
    ],
    explanation: '.filter() mengembalikan array baru berisi seluruh elemen yang menghasilkan nilai true pada predikat.',
  },

  // WORD
  {
    id: 'pq-wd-1',
    module: 'word',
    tierTarget: 1,
    question: 'Elemen manakah yang wajib digunakan untuk judul bab utama dokumen agar terstruktur dengan rapi?',
    options: [
      { id: 'a', text: 'Heading 1 (H1)', isCorrect: true },
      { id: 'b', text: 'Teks biasa di-bold dan diubah font jadi 14', isCorrect: false },
      { id: 'c', text: 'Garis bawah (Underline) panjang', isCorrect: false },
      { id: 'd', text: 'Tabel satu sel', isCorrect: false },
    ],
    explanation: 'Heading Styles (Heading 1, Heading 2) adalah standar hierarki dokumen untuk navigasi dan daftar isi otomatis.',
  },
  {
    id: 'pq-wd-2',
    module: 'word',
    tierTarget: 2,
    question: 'Komponen penting apa yang membedakan notulen rapat profesional dengan catatan biasa?',
    options: [
      { id: 'a', text: 'Tabel rencana tindak lanjut (Action Plan) dengan kolom PIC dan deadline', isCorrect: true },
      { id: 'b', text: 'Jumlah halaman yang tebal minimal 10 lembar', isCorrect: false },
      { id: 'c', text: 'Banyak gambar ilustrasi berwarna-warni', isCorrect: false },
      { id: 'd', text: 'Menggunakan font dekoratif bersambung', isCorrect: false },
    ],
    explanation: 'Notulen profesional berfokus pada hasil keputusan dan tabel penanggung jawab (PIC) serta tanggal batas waktu.',
  },
];
