import { SheetGrid } from '../types';

export interface DetectiveCase {
  id: string;
  title: string;
  department: string;
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
  story: string;
  suspectSheet: SheetGrid;
  culpritCell: string; // e.g. "B5"
  hint: string;
  explanation: string;
  xpReward: number;
  coinReward: number;
}

export const DETECTIVE_CASES: DetectiveCase[] = [
  {
    id: 'det-01',
    title: 'Kasus Selisih Kasir Toko Cabang',
    department: 'Keuangan',
    difficulty: 'Mudah',
    story: 'Laporan kas harian cabang Bogor dilaporkan tekor Rp 50.000, padahal fisik uang di brankas cocok. Temukan sel pembawa petaka di sheet ini!',
    suspectSheet: {
      A1: { raw: 'Uraian Kas', isHeader: true },
      B1: { raw: 'Jumlah (Rp)', isHeader: true },
      A2: { raw: 'Saldo Awal' },
      B2: { raw: '500000', format: 'rupiah' },
      A3: { raw: 'Penerimaan Kasir 1' },
      B3: { raw: '350000', format: 'rupiah' },
      A4: { raw: 'Penerimaan Kasir 2' },
      B4: { raw: '400000', format: 'rupiah' },
      A5: { raw: 'TOTAL SALDO AKHIR', isHeader: true },
      B5: { raw: '=SUM(B2:B3)', format: 'rupiah' }, // B4 terlewat!
    },
    culpritCell: 'B5',
    hint: 'Periksa rentang pada rumus SUM di total akhir. Apakah seluruh kasir ikut terjumlah?',
    explanation: 'Sel B5 hanya menjumlahkan =SUM(B2:B3), sehingga sel B4 (Penerimaan Kasir 2) tertinggal dan tidak terhitung!',
    xpReward: 180,
    coinReward: 75,
  },
  {
    id: 'det-02',
    title: 'Misteri Angka yang Menolak Dijumlah',
    department: 'Operasional & Gudang',
    difficulty: 'Sedang',
    story: 'Dimas heran kenapa total inventaris karton di gudang tidak bertambah walau kiriman baru sudah diinput. Ada format tipuan di sini!',
    suspectSheet: {
      A1: { raw: 'Barang Masuk', isHeader: true },
      B1: { raw: 'Qty Dus', isHeader: true },
      A2: { raw: 'Karton Indomie' },
      B2: { raw: '100' },
      A3: { raw: 'Karton Minyak Goreng' },
      B3: { raw: "'50" }, // tersimpan sebagai text dengan petik
      A4: { raw: 'Total Stok' },
      B4: { raw: '=SUM(B2:B3)' },
    },
    culpritCell: 'B3',
    hint: 'Di Excel, angka yang diawali tanda petik satu (\') dianggap teks murni dan diabaikan oleh rumus SUM.',
    explanation: 'Sel B3 berisi teks "\'50" bukan angka numerik, sehingga diabaikan oleh fungsi SUM.',
    xpReward: 220,
    coinReward: 90,
  },
  {
    id: 'det-03',
    title: 'Jebakan Pembagian dengan Nol (#DIV/0!)',
    department: 'Pemasaran & Analisis',
    difficulty: 'Sedang',
    story: 'Laporan ROI promosi media sosial menampilkan error merah #DIV/0! saat presentasi ke direksi. Temukan sel penyebabnya.',
    suspectSheet: {
      A1: { raw: 'Kampanye', isHeader: true },
      B1: { raw: 'Biaya Iklan', isHeader: true },
      C1: { raw: 'Jumlah Klik', isHeader: true },
      D1: { raw: 'Biaya Per Klik', isHeader: true },
      A2: { raw: 'Promo Gajian' },
      B2: { raw: '1000000', format: 'rupiah' },
      C2: { raw: '2000' },
      D2: { raw: '=B2/C2', format: 'rupiah' },
      A3: { raw: 'Teaser Produk' },
      B3: { raw: '500000', format: 'rupiah' },
      C3: { raw: '0' },
      D3: { raw: '=B3/C3', format: 'rupiah' }, // error pembagi nol
    },
    culpritCell: 'D3',
    hint: 'Lihat baris Teaser Produk. Berapa jumlah klik yang diperoleh?',
    explanation: 'Sel D3 membagi biaya dengan sel C3 yang bernilai 0, menghasilkan error pembagian nol (#DIV/0!). Seharusnya dibungkus dengan rumus IFERROR().',
    xpReward: 250,
    coinReward: 100,
  },
];
