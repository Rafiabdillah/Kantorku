export interface CheatSheetEntry {
  category: 'excel' | 'word' | 'coding';
  name: string;
  syntax: string;
  description: string;
  example: string;
  shortcut?: string;
}

export const CHEATSHEETS: CheatSheetEntry[] = [
  // Excel
  {
    category: 'excel',
    name: 'SUM',
    syntax: '=SUM(number1, [number2], ...)',
    description: 'Menjumlahkan semua angka dalam rentang sel yang ditentukan.',
    example: '=SUM(B2:B20)',
    shortcut: 'Alt + = (AutoSum)',
  },
  {
    category: 'excel',
    name: 'AVERAGE',
    syntax: '=AVERAGE(number1, [number2], ...)',
    description: 'Menghitung rata-rata aritmatika dari rentang sel.',
    example: '=AVERAGE(C2:C50)',
  },
  {
    category: 'excel',
    name: 'IF',
    syntax: '=IF(logical_test, [value_if_true], [value_if_false])',
    description: 'Menguji kondisi logika dan menghasilkan output berbeda bila benar/salah.',
    example: '=IF(B2>=75, "Lulus", "Remedial")',
  },
  {
    category: 'excel',
    name: 'VLOOKUP',
    syntax: '=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])',
    description: 'Mencari nilai di kolom paling kiri tabel dan mengembalikan nilai di kolom yang ditentukan.',
    example: '=VLOOKUP(A2, E2:G100, 2, FALSE)',
  },
  {
    category: 'excel',
    name: 'XLOOKUP',
    syntax: '=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found])',
    description: 'Rumus pencarian modern yang lebih fleksibel ke kiri maupun kanan tanpa nomor kolom.',
    example: '=XLOOKUP(A2, E2:E100, F2:F100, "Tidak Ditemukan")',
  },
  {
    category: 'excel',
    name: 'COUNTIF',
    syntax: '=COUNTIF(range, criteria)',
    description: 'Menghitung jumlah sel yang memenuhi kriteria tertentu.',
    example: '=COUNTIF(C2:C50, "BPJS")',
  },
  {
    category: 'excel',
    name: 'SUMIF',
    syntax: '=SUMIF(range, criteria, [sum_range])',
    description: 'Menjumlahkan nilai sel yang memenuhi satu kriteria tertentu.',
    example: '=SUMIF(A2:A50, "Elektronik", B2:B50)',
  },
  {
    category: 'excel',
    name: 'IFERROR',
    syntax: '=IFERROR(value, value_if_error)',
    description: 'Menangkap pesan error (seperti #DIV/0! atau #N/A) dan menggantinya dengan teks alternatif yang ramah.',
    example: '=IFERROR(B2/C2, 0)',
  },

  // Coding (JavaScript)
  {
    category: 'coding',
    name: 'Array .filter()',
    syntax: 'array.filter((element, index) => boolean)',
    description: 'Menyaring elemen array dan mengembalikan array baru berisi elemen yang lolos kondisi.',
    example: 'transaksi.filter(t => t.total >= 100000);',
  },
  {
    category: 'coding',
    name: 'Array .map()',
    syntax: 'array.map((element, index) => transformedElement)',
    description: 'Mentransformasi setiap elemen array menjadi bentuk atau format baru.',
    example: 'hargaList.map(h => h * 1.11); // tambah PPN',
  },
  {
    category: 'coding',
    name: 'Array .reduce()',
    syntax: 'array.reduce((acc, curr) => acc + curr, initialValue)',
    description: 'Mengakumulasikan seluruh elemen array menjadi satu nilai tunggal (misal total omzet).',
    example: 'angka.reduce((total, n) => total + n, 0);',
  },
  {
    category: 'coding',
    name: 'Template Literals',
    syntax: '`Halo, ${variable}!`',
    description: 'Menyisipkan variabel ke dalam string tanpa perlu tanda plus (+).',
    example: '`Selamat bekerja, ${namaKaryawan}!`;',
  },

  // Word
  {
    category: 'word',
    name: 'Heading 1 (H1)',
    syntax: '# Judul Dokumen Utama',
    description: 'Hierarki judul tertinggi untuk nama surat, proposal, atau laporan eksekutif.',
    example: '<h1>Laporan Bulanan Divisi Operasional</h1>',
    shortcut: 'Ctrl + Alt + 1',
  },
  {
    category: 'word',
    name: 'Tabel Tindak Lanjut (Action Plan)',
    syntax: '<table><tr><th>Tugas</th><th>PIC</th><th>Deadline</th></tr></table>',
    description: 'Matriks akuntabilitas untuk notulen rapat dan perencanaan kerja.',
    example: 'Tabel matriks dengan kolom Penanggung Jawab dan Tanggal.',
  },
];
