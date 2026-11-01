import { Achievement } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
  // Karir & Umum (1-14)
  { id: 'ach-01', title: 'Langkah Pertama', description: 'Menyelesaikan misi magang pertamamu di kantor.', icon: '🌱', category: 'career', targetCount: 1, currentCount: 0 },
  { id: 'ach-02', title: 'Staf Junior Resmi', description: 'Naik pangkat menjadi Staf Junior di PT Maju Sejahtera.', icon: '📎', category: 'career', targetCount: 1, currentCount: 0 },
  { id: 'ach-03', title: 'Pundak Staf', description: 'Mencapai jabatan Staf dengan tanggung jawab lintas divisi.', icon: '💼', category: 'career', targetCount: 1, currentCount: 0 },
  { id: 'ach-04', title: 'Senioritas Teruji', description: 'Dipromosikan menjadi Senior Staf.', icon: '⭐', category: 'career', targetCount: 1, currentCount: 0 },
  { id: 'ach-05', title: 'Supervisor Andal', description: 'Memimpin pengawasan tim sebagai Supervisor.', icon: '🎯', category: 'career', targetCount: 1, currentCount: 0 },
  { id: 'ach-06', title: 'Kursi Manajer', description: 'Menjadi Manajer operasional PT Maju Sejahtera.', icon: '🏆', category: 'career', targetCount: 1, currentCount: 0 },
  { id: 'ach-07', title: 'Kursi Direktur', description: 'Mencapai puncak karier tertinggi: Direktur Perusahaan!', icon: '👑', category: 'career', targetCount: 1, currentCount: 0 },
  { id: 'ach-08', title: 'Gaji Pertama', description: 'Mengumpulkan total 500 koin kantor.', icon: '🪙', category: 'career', targetCount: 500, currentCount: 0 },
  { id: 'ach-09', title: 'Kaya Raya', description: 'Mengumpulkan saldo kas lebih dari 2.500 koin.', icon: '💰', category: 'career', targetCount: 2500, currentCount: 0 },
  { id: 'ach-10', title: 'Dekorator Meja', description: 'Membeli item kosmetik meja kerja pertamamu.', icon: '🪴', category: 'career', targetCount: 1, currentCount: 0 },
  { id: 'ach-11', title: 'Absensi Tertib', description: 'Belajar 3 hari berturut-turut tanpa terputus.', icon: '🔥', category: 'career', targetCount: 3, currentCount: 0 },
  { id: 'ach-12', title: '7 Hari Beruntun', description: 'Mempertahankan streak belajar selama 7 hari penuh!', icon: '⚡', category: 'career', targetCount: 7, currentCount: 0 },
  { id: 'ach-13', title: 'Karyawan Teladan', description: 'Streak belajar mencapai 30 hari tanpa bolos!', icon: '🌟', category: 'career', targetCount: 30, currentCount: 0 },
  { id: 'ach-14', title: 'Anti Frustrasi', description: 'Memakai fitur Pembeku Streak (Streak Freeze) saat cuti.', icon: '🧊', category: 'career', targetCount: 1, currentCount: 0 },

  // Modul Excel (15-24)
  { id: 'ach-15', title: 'Master Penjumlahan', description: 'Menyelesaikan tantangan rumus SUM tanpa kesalahan.', icon: '➕', category: 'excel', targetCount: 1, currentCount: 0 },
  { id: 'ach-16', title: 'Raja VLOOKUP', description: 'Berhasil menghubungkan tabel relasional dengan VLOOKUP presisi.', icon: '🔍', category: 'excel', targetCount: 1, currentCount: 0 },
  { id: 'ach-17', title: 'Generasi Baru XLOOKUP', description: 'Menggunakan rumus XLOOKUP modern untuk pencarian fleksibel.', icon: '🚀', category: 'excel', targetCount: 1, currentCount: 0 },
  { id: 'ach-18', title: 'Gembok Dollar ($)', description: 'Menerapkan referensi absolut ($) dengan benar pada perhitungan pajak.', icon: '🔒', category: 'excel', targetCount: 1, currentCount: 0 },
  { id: 'ach-19', title: 'Logika Baja IF', description: 'Menyelesaikan formula IF logika kondisional pertama.', icon: '⚖️', category: 'excel', targetCount: 1, currentCount: 0 },
  { id: 'ach-20', title: 'Anti Hardcode', description: 'Lolos uji mutasi (mutation test) tanpa ada angka yang di-hardcode!', icon: '🛡️', category: 'excel', targetCount: 1, currentCount: 0 },
  { id: 'ach-21', title: 'Data Cleaning Hero', description: 'Membersihkan data kotor berspasi ganda dan teks campuran.', icon: '🧹', category: 'excel', targetCount: 1, currentCount: 0 },
  { id: 'ach-22', title: 'Master Keuangan PMT', description: 'Menghitung angsuran kredit bunga pinjaman secara akurat.', icon: '🏦', category: 'excel', targetCount: 1, currentCount: 0 },
  { id: 'ach-23', title: 'Ahli Pivot Table', description: 'Menyusun rekapitulasi multidimensi dalam waktu singkat.', icon: '📊', category: 'excel', targetCount: 1, currentCount: 0 },
  { id: 'ach-24', title: 'Workbook Tanpa Cacat', description: 'Mendapat skor kerapian 100% pada laporan spreadsheet.', icon: '✨', category: 'excel', targetCount: 1, currentCount: 0 },

  // Modul Coding JavaScript (25-31)
  { id: 'ach-25', title: 'Halo Dunia!', description: 'Menjalankan baris kode JavaScript pertamamu.', icon: '💻', category: 'coding', targetCount: 1, currentCount: 0 },
  { id: 'ach-26', title: 'Nol Bug', description: 'Lolos seluruh test case (visible & hidden) dalam satu kali run!', icon: '🐞', category: 'coding', targetCount: 1, currentCount: 0 },
  { id: 'ach-27', title: 'Penyaring Data', description: 'Menggunakan array .filter() untuk memisahkan data transaksi.', icon: '🌊', category: 'coding', targetCount: 1, currentCount: 0 },
  { id: 'ach-28', title: 'Transformator Map', description: 'Memetakan data mentah menjadi format siap saji dengan .map().', icon: '🗺️', category: 'coding', targetCount: 1, currentCount: 0 },
  { id: 'ach-29', title: 'Akumulator Sakti', description: 'Menghitung total keseluruhan nilai array dengan .reduce().', icon: '🧮', category: 'coding', targetCount: 1, currentCount: 0 },
  { id: 'ach-30', title: 'Pawang Async', description: 'Mengambil data dari API tiruan menggunakan async/await.', icon: '⏳', category: 'coding', targetCount: 1, currentCount: 0 },
  { id: 'ach-31', title: 'Clean Coder', description: 'Menulis kode bersih dengan penamaan variabel yang deskriptif.', icon: '💎', category: 'coding', targetCount: 1, currentCount: 0 },

  // Modul Web Track HTML & CSS (32-39) - NEW in v2.0
  { id: 'ach-32', title: 'Arsitek Web HTML5', description: 'Menyusun dokumen web dengan elemen semantik lengkap (header, main, footer).', icon: '🌐', category: 'web', targetCount: 1, currentCount: 0 },
  { id: 'ach-33', title: 'Master Flexbox', description: 'Menata kartu layanan secara sejajar dan dinamis dengan CSS Flexbox.', icon: '📐', category: 'web', targetCount: 1, currentCount: 0 },
  { id: 'ach-34', title: 'Pakar CSS Grid', description: 'Membangun dashboard dua dimensi dengan CSS Grid tingkat lanjut.', icon: '🏁', category: 'web', targetCount: 1, currentCount: 0 },
  { id: 'ach-35', title: 'Web Responsif 360px', description: 'Membuat halaman yang lulus uji resolusi mobile 360px dan desktop.', icon: '📱', category: 'web', targetCount: 1, currentCount: 0 },
  { id: 'ach-36', title: 'Aksesibilitas & Alt', description: 'Menyematkan atribut alt pada seluruh gambar untuk aksesibilitas ramah tunanetra.', icon: '👁️', category: 'web', targetCount: 1, currentCount: 0 },
  { id: 'ach-37', title: 'Desain Landing Page', description: 'Merancang landing page interaktif dengan tombol Call To Action elegan.', icon: '🎨', category: 'web', targetCount: 1, currentCount: 0 },
  { id: 'ach-38', title: 'CSS Animation Pro', description: 'Memberikan transisi mikro interaktif pada elemen tombol dan hover.', icon: '✨', category: 'web', targetCount: 1, currentCount: 0 },
  { id: 'ach-39', title: 'Deploy Web Siap Pakai', description: 'Menyelesaikan website multi-halaman yang siap dihosting.', icon: '🚀', category: 'web', targetCount: 1, currentCount: 0 },

  // Modul Word Bisnis & Akademik (40-48) - NEW in v2.0
  { id: 'ach-40', title: 'Juru Ketik Rapi', description: 'Menyelesaikan dokumen surat undangan resmi berformat H1 & bold.', icon: '📝', category: 'word', targetCount: 1, currentCount: 0 },
  { id: 'ach-41', title: 'Matriks Tabel', description: 'Membuat tabel tindak lanjut dengan pembagian PIC yang jelas.', icon: '📋', category: 'word', targetCount: 1, currentCount: 0 },
  { id: 'ach-42', title: 'Penulis Laporan Handal', description: 'Menyusun laporan penjualan bisnis lengkap dengan ringkasan eksekutif.', icon: '📑', category: 'word', targetCount: 1, currentCount: 0 },
  { id: 'ach-43', title: 'Skripsi Rapi 4-3-3-3', description: 'Menerapkan standar penulisan ilmiah Indonesia (Margin 4-3-3-3 cm dan spasi 1.5).', icon: '🎓', category: 'word', targetCount: 1, currentCount: 0 },
  { id: 'ach-44', title: 'Sitasi & Footnote', description: 'Menyematkan catatan kaki dan nomor sitasi baku pada karya tulis formal.', icon: '🔖', category: 'word', targetCount: 1, currentCount: 0 },
  { id: 'ach-45', title: 'Penyusun SOP ISO', description: 'Menyelesaikan Standar Operasional Prosedur perusahaan berstandar ISO.', icon: '📖', category: 'word', targetCount: 1, currentCount: 0 },
  { id: 'ach-46', title: 'Proposal Kerjasama', description: 'Menyusun proposal tender bisnis dengan hierarki heading profesional.', icon: '🤝', category: 'word', targetCount: 1, currentCount: 0 },
  { id: 'ach-47', title: 'Watermark Proteksi', description: 'Menerapkan tanda air (watermark) rahasia pada dokumen draft korporat.', icon: '🛡️', category: 'word', targetCount: 1, currentCount: 0 },
  { id: 'ach-48', title: 'Ekspor Word Sejati', description: 'Mengekspor berkas ke format dokumen .doc siap cetak.', icon: '📄', category: 'word', targetCount: 1, currentCount: 0 },

  // Detektif, Kecepatan, Audit & Mentor (49-56) - PRD v2.0 Total 56 Achievements
  { id: 'ach-49', title: 'Mata Elang', description: 'Menemukan rumus salah tersembunyi di Mode Detektif.', icon: '🦅', category: 'audit', targetCount: 1, currentCount: 0 },
  { id: 'ach-50', title: 'Auditor Teliti', description: 'Menyelesaikan audit data kotor tanpa melewatkan satupun anomali.', icon: '🕵️', category: 'audit', targetCount: 1, currentCount: 0 },
  { id: 'ach-51', title: 'Jari Kilat', description: 'Mencapai combo 5x di Mode Kilat (Time Attack).', icon: '⚡', category: 'speed', targetCount: 1, currentCount: 0 },
  { id: 'ach-52', title: 'Mentor Sejati', description: 'Memberikan koreksi review yang tepat pada pekerjaan anak magang baru.', icon: '🎓', category: 'audit', targetCount: 1, currentCount: 0 },
  { id: 'ach-53', title: 'Kolektor Sertifikat', description: 'Lulus ujian sertifikasi tier dan mengunduh sertifikat resmi.', icon: '📜', category: 'career', targetCount: 1, currentCount: 0 },
  { id: 'ach-54', title: 'Portofolio CV', description: 'Mengekspor portofolio hasil kerja nyata ke format spreadsheet.', icon: '💼', category: 'career', targetCount: 1, currentCount: 0 },
  { id: 'ach-55', title: 'Etika Teruji', description: 'Memilih keputusan berintegritas tinggi saat menghadapi dilema audit.', icon: '⚖️', category: 'career', targetCount: 1, currentCount: 0 },
  { id: 'ach-56', title: 'Komunikator Korporat', description: 'Mendapat nilai 100% pada dimensi komunikasi serah terima kasus nyata.', icon: '💬', category: 'career', targetCount: 1, currentCount: 0 },
];
