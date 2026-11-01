export interface MentorReviewCase {
  id: string;
  internName: string;
  internRole: string;
  taskTitle: string;
  internNote: string;
  submissionSnippet: string;
  type: 'excel' | 'code' | 'word';
  issuesList: {
    id: string;
    description: string;
    isRealIssue: boolean;
  }[];
  seniorAdvice: string;
  xpReward: number;
  coinReward: number;
}

export const MENTOR_CASES: MentorReviewCase[] = [
  {
    id: 'men-01',
    internName: 'Bagus (Magang Baru)',
    internRole: 'Magang Data Admin',
    taskTitle: 'Rekap Gaji Pokok & Tunjangan Makan',
    internNote: 'Kak, saya sudah hitung total gaji seluruh staf di sel D10. Saya jumlahkan manual pakai kalkulator HP lalu saya ketik angkanya 15500000 di Excel biar cepat!',
    submissionSnippet: 'Sel D10 berisi nilai konstan: 15500000',
    type: 'excel',
    issuesList: [
      { id: 'iss-1', description: 'Angka di-hardcode secara statis tanpa rumus =SUM(D2:D9)', isRealIssue: true },
      { id: 'iss-2', description: 'Jika ada penambahan karyawan atau kenaikan gaji, total di D10 tidak akan ikut berubah', isRealIssue: true },
      { id: 'iss-3', description: 'Warna latar tabel terlalu terang', isRealIssue: false },
    ],
    seniorAdvice: 'Jangan pernah mengetik hasil hitungan kalkulator manual ke dalam Excel! Selalu gunakan fungsi =SUM() agar data dinamis dan tidak rentan human error.',
    xpReward: 200,
    coinReward: 80,
  },
  {
    id: 'men-02',
    internName: 'Rina (Magang IT)',
    internRole: 'Junior Frontend Intern',
    taskTitle: 'Fungsi Cek Saldo Minimum Nasabah',
    internNote: 'Kak Intan menugaskan saya membuat fungsi cekSaldo. Tapi pas diuji selalu return false walaupun saldonya banyak!',
    submissionSnippet: `function cekSaldo(saldo) {
  if (saldo = 0) {
    return false;
  }
  return true;
}`,
    type: 'code',
    issuesList: [
      { id: 'iss-1', description: 'Menggunakan operator penugasan (=) bukan operator pembanding (=== atau ==)', isRealIssue: true },
      { id: 'iss-2', description: 'Ekspresi (saldo = 0) mengubah nilai variabel saldo menjadi 0 yang bernilai falsy', isRealIssue: true },
      { id: 'iss-3', description: 'Nama variabel saldo harus menggunakan huruf kapital semua', isRealIssue: false },
    ],
    seniorAdvice: 'Di JavaScript, tanda "=" tunggal adalah assignment (mengubah isi variabel), sedangkan "===" adalah comparison (memeriksa kesamaan nilai).',
    xpReward: 250,
    coinReward: 100,
  },
];
