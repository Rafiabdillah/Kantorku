import { CharacterId, TierLevel } from '../types';

export interface SeasonInfo {
  seasonNumber: number;
  title: string;
  theme: string;
  correspondingTier: TierLevel;
  synopsis: string;
  epilogue: string;
  milestones: {
    title: string;
    description: string;
    character: CharacterId;
  }[];
}

export const SEASONS: SeasonInfo[] = [
  {
    seasonNumber: 1,
    title: 'Musim 1: Hari Pertama',
    theme: 'Orientasi & Adaptasi Budaya Kantor',
    correspondingTier: 1,
    synopsis: 'Langkah pertamamu menginjakkan kaki di kantor PT Maju Sejahtera sebagai anak magang. Dari berkenalan dengan Dimas di pantry, memahami ketegasan Bu Sari, hingga mengenal tata kelola data operasional dasar.',
    epilogue: 'Selamat! Kamu membuktikan bahwa kamu bukan sekadar magang numpang nama. File ATK dan dokumen perdanamu rapi tanpa cela. Bu Sari merekomendasikan promosi ke Staf Junior!',
    milestones: [
      { title: 'Tiba di Lobi', description: 'Mendapat ID Card Magang dan meja kerja pertama.', character: 'maya' },
      { title: 'Kopi Pertama di Pantry', description: 'Mendapat petunjuk rahasia shortcut Excel dari Dimas.', character: 'dimas' },
      { title: 'Laporan Perdana Bu Sari', description: 'Menghitung total anggaran divisi tanpa salah rumus.', character: 'sari' },
    ],
  },
  {
    seasonNumber: 2,
    title: 'Musim 2: Mulai Dipercaya',
    theme: 'Tanggung Jawab Nyata & Kolaborasi Tim',
    correspondingTier: 2,
    synopsis: 'Kini menyandang status Staf Junior. Tanggung jawab mulai membesar, berurusan dengan perhitungan pajak PPN bersama Pak Reza, serta membantu Nadia merancang kalkulator diskon.',
    epilogue: 'Kamu berhasil melewati tantangan koordinasi lintas divisi. Pak Reza yang terkenal pelit senyum mengangguk puas melihat presisi perhitunganmu.',
    milestones: [
      { title: 'Surat Keputusan Promosi', description: 'Resmi menjadi karyawan tetap berstatus Staf Junior.', character: 'maya' },
      { title: 'Perhitungan Pajak PPN', description: 'Mengunci rumus tarif pajak dengan tanda dollar ($).', character: 'reza' },
      { title: 'Kolaborasi Pemasaran', description: 'Membuat script diskon belanja bersama Nadia.', character: 'nadia' },
    ],
  },
  {
    seasonNumber: 3,
    title: 'Musim 3: Audit Besar',
    theme: 'Integritas, Tekanan Tenggat & Deteksi Kesalahan',
    correspondingTier: 3,
    synopsis: 'Auditor eksternal Pak Hendra datang memeriksa seluruh laporan keuangan 2 tahun terakhir. Data lama warisan staf terdahulu banyak yang hardcoded dan rusak. Kamu menjadi garda terdepan membersihkan data.',
    epilogue: 'Temuan audit diselesaikan dengan gemilang! Pak Hendra memberikan predikat "Wajar Tanpa Pengecualian" berkat workbook audit otomatis yang kamu bangun.',
    milestones: [
      { title: 'Kedatangan Auditor', description: 'Pak Hendra meminta sampel transaksi dalam 2 jam.', character: 'hendra' },
      { title: 'Membersihkan Rumus Rusak', description: 'Mendeteksi rumus #DIV/0! dan referensi sirkular.', character: 'reza' },
      { title: 'Otomasi Rekonsiliasi', description: 'Menghubungkan NIK dan Divisi dengan VLOOKUP rapi.', character: 'sari' },
    ],
  },
  {
    seasonNumber: 4,
    title: 'Musim 4: Ekspansi Cabang',
    theme: 'Digitalisasi Sistem & Pertumbuhan Skala',
    correspondingTier: 4,
    synopsis: 'PT Maju Sejahtera membuka kantor cabang baru. Sistem kertas ditinggalkan total dan beralih ke workflow otomatis, dashboard terpadu, serta pemrosesan data real-time.',
    epilogue: 'Dua cabang baru beroperasi mulus! Tim operasional di daerah menggunakan template dan automasi yang kamu rancang.',
    milestones: [
      { title: 'Peresmian Kantor Cabang', description: 'Menyiapkan SOP operasional digital kantor baru.', character: 'maya' },
      { title: 'Integrasi API Sederhana', description: 'Menghubungkan data transaksi lewat script fetch bersama Kak Intan.', character: 'intan' },
      { title: 'Dashboard Eksekutif', description: 'Menyajikan grafik KPI interaktif untuk dewan direksi.', character: 'nadia' },
    ],
  },
  {
    seasonNumber: 5,
    title: 'Musim 5: Krisis Data & Menjadi Direktur',
    theme: 'Kepemimpinan Strategis & Arsitektur Solusi',
    correspondingTier: 6,
    synopsis: 'Sebuah insiden tak terduga menimpa database pusat perusahaan saat pergantian tahun buku. Sebagai figur senior yang paling memahami logika sistem, kamu memimpin satuan tugas pemulihan.',
    epilogue: 'Dewan Komisaris dengan suara bulat mengangkatmu menjadi Direktur Operasional & Teknologi PT Maju Sejahtera. Dari anak magang yang gugup, kini kamu memimpin masa depan perusahaan!',
    milestones: [
      { title: 'Krisis Tengah Malam', description: 'Memulihkan arsip data kritis tanpa kehilangan transaksi.', character: 'intan' },
      { title: 'Sidang Dewan Direksi', description: 'Mempresentasikan masterplan sistem baru perusahaan.', character: 'sari' },
      { title: 'Pelantikan Direktur', description: 'Upacara kenaikan jabatan puncak di aula utama kantor.', character: 'sari' },
    ],
  },
];
