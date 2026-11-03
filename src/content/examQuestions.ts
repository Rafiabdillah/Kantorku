import { PLACEMENT_QUESTIONS } from './placementQuestions';

export type ExamTrack = 'excel' | 'web' | 'coding' | 'word';

export interface ExamQuestion {
  id: string;
  question: string;
  options: { id: string; text: string; isCorrect: boolean }[];
}

const fromPlacement = (module: 'excel' | 'coding' | 'word'): ExamQuestion[] =>
  PLACEMENT_QUESTIONS.filter((q) => q.module === module).map((q) => ({
    id: q.id,
    question: q.question,
    options: q.options,
  }));

const CODING_EXTRAS: ExamQuestion[] = [
  {
    id: 'ex-cd-4',
    question: 'Apa perbedaan utama antara operator === dan == di JavaScript?',
    options: [
      { id: 'a', text: '=== membandingkan nilai sekaligus tipe data, sedangkan == hanya nilai setelah konversi tipe', isCorrect: true },
      { id: 'b', text: '=== hanya untuk angka, sedangkan == untuk semua tipe', isCorrect: false },
      { id: 'c', text: 'Tidak ada perbedaan, keduanya identik', isCorrect: false },
      { id: 'd', text: '== lebih ketat karena memeriksa tipe terlebih dahulu', isCorrect: false },
    ],
  },
  {
    id: 'ex-cd-5',
    question: 'Metode array manakah yang mengembalikan array baru dengan jumlah elemen sama setelah setiap elemen diolah?',
    options: [
      { id: 'a', text: 'array.map(callback)', isCorrect: true },
      { id: 'b', text: 'array.filter(callback)', isCorrect: false },
      { id: 'c', text: 'array.find(callback)', isCorrect: false },
      { id: 'd', text: 'array.splice(callback)', isCorrect: false },
    ],
  },
];

const WORD_EXTRAS: ExamQuestion[] = [
  {
    id: 'ex-wd-3',
    question: 'Fitur apa yang digunakan untuk membuat daftar isi otomatis yang mengikuti judul bab?',
    options: [
      { id: 'a', text: 'Table of Contents yang terhubung ke gaya Heading', isCorrect: true },
      { id: 'b', text: 'Mengetik daftar isi manual dengan spasi dan titik-titik', isCorrect: false },
      { id: 'c', text: 'Menyisipkan gambar tangkapan layar daftar isi', isCorrect: false },
      { id: 'd', text: 'Membuat tabel dua kolom tanpa gaya Heading', isCorrect: false },
    ],
  },
  {
    id: 'ex-wd-4',
    question: 'Apa kegunaan fitur Mail Merge pada dokumen bisnis?',
    options: [
      { id: 'a', text: 'Menggabungkan satu templat surat dengan daftar penerima agar setiap surat terisi otomatis', isCorrect: true },
      { id: 'b', text: 'Menggabungkan beberapa file gambar menjadi satu halaman', isCorrect: false },
      { id: 'c', text: 'Mengirim email langsung tanpa aplikasi email', isCorrect: false },
      { id: 'd', text: 'Mengubah seluruh dokumen menjadi format PDF', isCorrect: false },
    ],
  },
  {
    id: 'ex-wd-5',
    question: 'Mengapa Section Break penting dalam dokumen Word yang panjang?',
    options: [
      { id: 'a', text: 'Memungkinkan orientasi halaman, margin, atau header berbeda dalam satu dokumen', isCorrect: true },
      { id: 'b', text: 'Menghapus semua format paragraf secara otomatis', isCorrect: false },
      { id: 'c', text: 'Membuat dokumen otomatis terkunci dari penyuntingan', isCorrect: false },
      { id: 'd', text: 'Mengubah seluruh teks menjadi huruf kapital', isCorrect: false },
    ],
  },
];

const WEB_QUESTIONS: ExamQuestion[] = [
  {
    id: 'ex-web-1',
    question: 'Tag HTML semantik manakah yang tepat untuk membungkus konten utama halaman?',
    options: [
      { id: 'a', text: '<main>', isCorrect: true },
      { id: 'b', text: '<div class="main">', isCorrect: false },
      { id: 'c', text: '<section id="wrapper">', isCorrect: false },
      { id: 'd', text: '<body-content>', isCorrect: false },
    ],
  },
  {
    id: 'ex-web-2',
    question: 'Properti CSS manakah yang mengubah sebuah kontainer menjadi flexbox?',
    options: [
      { id: 'a', text: 'display: flex;', isCorrect: true },
      { id: 'b', text: 'position: flex;', isCorrect: false },
      { id: 'c', text: 'layout: flexbox;', isCorrect: false },
      { id: 'd', text: 'flex-direction: row; saja', isCorrect: false },
    ],
  },
  {
    id: 'ex-web-3',
    question: 'Bagaimana cara menulis selector CSS untuk semua elemen dengan class "menu"?',
    options: [
      { id: 'a', text: '.menu { }', isCorrect: true },
      { id: 'b', text: '#menu { }', isCorrect: false },
      { id: 'c', text: 'menu { }', isCorrect: false },
      { id: 'd', text: '*menu { }', isCorrect: false },
    ],
  },
  {
    id: 'ex-web-4',
    question: 'Meta tag manakah yang wajib ada agar halaman responsif di perangkat mobile?',
    options: [
      { id: 'a', text: '<meta name="viewport" content="width=device-width, initial-scale=1">', isCorrect: true },
      { id: 'b', text: '<meta name="mobile" content="true">', isCorrect: false },
      { id: 'c', text: '<meta name="responsive" content="on">', isCorrect: false },
      { id: 'd', text: '<meta name="screen" content="auto">', isCorrect: false },
    ],
  },
  {
    id: 'ex-web-5',
    question: 'Apa arti aturan @media (max-width: 600px) pada CSS?',
    options: [
      { id: 'a', text: 'Gaya di dalamnya diterapkan saat lebar viewport 600px atau kurang', isCorrect: true },
      { id: 'b', text: 'Gaya diterapkan hanya pada layar dengan lebar tepat 600px', isCorrect: false },
      { id: 'c', text: 'Gambar otomatis diperkecil menjadi 600px', isCorrect: false },
      { id: 'd', text: 'Halaman dipaksa memiliki lebar minimum 600px', isCorrect: false },
    ],
  },
];

export const EXAM_QUESTIONS: Record<ExamTrack, ExamQuestion[]> = {
  excel: fromPlacement('excel'),
  coding: [...fromPlacement('coding'), ...CODING_EXTRAS],
  word: [...fromPlacement('word'), ...WORD_EXTRAS],
  web: WEB_QUESTIONS,
};
