/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D6: Akuntansi & Keuangan Usaha - Glossary
 */

export interface GlossaryTerm {
  term: string;
  category: string;
  definition: string;
  example: string;
}

export const D6_GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Persamaan Dasar Akuntansi',
    category: 'Konsep Dasar',
    definition: 'Hubungan fundamental akuntansi: Aset = Liabilitas + Ekuitas, yang wajib selalu seimbang di setiap transaksi.',
    example: 'Pembelian laptop kasir secara tunai tidak mengubah total aset karena Kas berkurang dan Peralatan bertambah.',
  },
  {
    term: 'Harga Pokok Penjualan (HPP)',
    category: 'Biaya & Persediaan',
    definition: 'Total biaya perolehan persediaan barang dagang yang telah berhasil terjual selama periode akuntansi.',
    example: 'HPP dihitung dari: Persediaan Awal + Pembelian Bersih - Persediaan Akhir.',
  },
  {
    term: 'Buku Besar (General Ledger)',
    category: 'Pencatatan',
    definition: 'Kumpulan kartu akun individual yang mencatat riwayat mutasi debit, kredit, dan saldo akhir berjalan akun.',
    example: 'Buku besar akun Kas menunjukkan seluruh riwayat penerimaan tunai di sisi debit dan pengeluaran di sisi kredit.',
  },
  {
    term: 'Rekonsiliasi Bank',
    category: 'Pengendalian Kas',
    definition: 'Proses analisis pencocokan antara saldo kas menurut buku catatan perusahaan dengan saldo menurut rekening koran bank.',
    example: 'Rekonsiliasi bank mengidentifikasi cek beredar dan setoran dalam perjalanan untuk menentukan saldo kas riil.',
  },
  {
    term: 'Neraca Saldo (Trial Balance)',
    category: 'Pengujian Pembukuan',
    definition: 'Daftar seluruh akun buku besar beserta saldo debit atau kreditnya pada tanggal tertentu untuk menguji kesamaan matematis.',
    example: 'Sebelum menyusun laporan laba rugi, total kolom debit dan kredit neraca saldo wajib bernilai sama.',
  },
  {
    term: 'SAK EMKM',
    category: 'Standar Regulasi',
    definition: 'Standar Akuntansi Keuangan Entitas Mikro, Kecil, dan Menengah yang diterbitkan oleh Ikatan Akuntan Indonesia (IAI).',
    example: 'SAK EMKM menyederhanakan laporan keuangan UMKM menjadi Laba Rugi, Posisi Keuangan, dan Catatan Laporan.',
  },
];
