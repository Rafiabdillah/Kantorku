# PATCH PRD v6: PUSAT BELAJAR (tambahan baru, juga tambah tab "Belajar" di navigasi utama)

## [H1] KONSEP
Pusat Belajar ("Ruang Pelatihan" di denah kantor) adalah tempat mempelajari materi secara terstruktur di luar misi. Tujuannya: pemain bisa belajar dulu, praktik kapan saja, dan tidak buntu saat gagal di misi.
Terhubung dua arah dengan skill tree: setiap skill punya minimal satu Pelajaran. Setiap level menautkan ke pelajaran prasyaratnya ("Belum paham? Buka pelajarannya"). Setiap pelajaran menautkan ke level latihan dan Case File yang relevan.

## [H2] STRUKTUR KONTEN
Jalur Belajar → Modul → Pelajaran → Langkah.
- Jalur Belajar per tujuan, bukan hanya per modul. Contoh: "Excel untuk Admin UMKM", "Word untuk Skripsi dan Laporan", "Laporan Bisnis Profesional", "Web untuk Usaha Online", "JavaScript dari Nol". Setiap jalur punya urutan pelajaran, estimasi waktu, dan hasil akhir yang jelas ("Setelah jalur ini kamu bisa...").
- Pelajaran berdurasi maksimal sekitar 10 menit (sekitar 1.200 kata) dengan urutan langkah:
  1. Tujuan: apa yang akan bisa kamu lakukan.
  2. Penjelasan singkat dengan analogi sehari-hari dan konteks kerja.
  3. Contoh interaktif: editor mini yang bisa dijalankan dan diubah langsung.
  4. Coba Sendiri: mini-latihan instan tanpa XP, tanpa penalti.
  5. Kesalahan umum.
  6. Ringkasan 3 poin.
  7. Kuis cek paham 3-5 soal.
  8. Tautan ke level latihan dan Case File.
- Target: minimal satu pelajaran untuk setiap skill di skill tree, ditambah pelajaran pengantar per tier. Total minimal 150 pelajaran, ditulis lengkap tanpa placeholder.
- Pelajaran Bedah Kasus (Word dan Web, bisnis dan akademik): dokumen atau halaman contoh "buruk vs baik" dengan anotasi interaktif. Pemain mengklik bagian tertentu untuk melihat alasan perbaikannya (mis. laporan tanpa ringkasan eksekutif, proposal dengan anggaran tidak konsisten, landing page tanpa tombol pesan).

## [H3] FORMAT DATA PELAJARAN (validasi Zod)
Lesson { id, track, tier, skillId, title, objectives[], estimatedMinutes, prerequisites[], steps[], commonMistakes[], glossaryTerms[], relatedLevels[], relatedCaseFiles[], cheatSheetId? }
Step = Penjelasan | ContohInteraktif {initialData, expectedResult, walkthrough[]} | CobaSendiri {initialData, validator} | Kuis {questions[]} | Ringkasan | Tips.
Konten disimpan di src/content/lessons/, dimuat lazy.

## [H4] FITUR
- Beranda Belajar: "Lanjutkan belajar", rekomendasi berdasarkan skill terlemah dan Buku Catatan Kesalahan, daftar Jalur Belajar, pencarian.
- Pembaca Pelajaran: bilah progres per langkah, posisi tersimpan, mode fokus, ukuran teks, ekspor pelajaran ke PDF.
- Tiga mode belajar yang bisa dipilih per pelajaran: Cepat (ringkasan inti), Lengkap (dengan analogi dan contoh tambahan), Mandiri (langsung latihan, penjelasan tersembunyi dan bisa dibuka).
- Contoh interaktif dengan "Lihat Caranya": animasi langkah demi langkah (coach mark) yang bisa dijeda, diulang, dan diambil alih pemain kapan saja.
- Kuis cek paham: pilihan ganda, isian singkat, urutkan langkah, "tebak hasil rumus/kode", dan "temukan kesalahan". Tidak ada nyawa, tiap jawaban punya penjelasan. Soal bisa dibangkitkan dengan seed agar bervariasi.
- Glosarium dan Kamus: istilah dalam Bahasa Indonesia beserta padanan Inggris dan contoh, Kamus Fungsi Excel (sintaks, argumen, contoh, kesalahan umum), kamus tag HTML dan properti CSS, kamus JavaScript. Bisa dibuka langsung dari editor dengan mengklik nama fungsi atau tag.
- Catatan pribadi dan penanda: sorot teks, catatan per pelajaran, ekspor ke Markdown atau PDF. Disimpan lokal.
- Lembar Contekan per topik yang bisa dicetak atau diunduh PDF.
- Peta Pengetahuan: tampilan skill tree dengan status Belum, Dipelajari, Dilatih, Dikuasai.
- Belajar dari Kesalahan: pada Hasil Misi yang gagal, tombol "Pelajari bagian ini" membuka pelajaran tepat di bagian yang relevan (deep link ke langkah/anchor).
- Pelajaran Kilat 3 menit untuk penyegaran sebelum Review Harian.
- Streak: menyelesaikan satu pelajaran juga menghitung streak harian, tidak harus main misi.
- Rekomendasi adaptif: setelah tes penempatan, sistem menyusun Jalur Belajar pribadi dan memperbaruinya sesuai progres.
- Pengantar singkat dari tokoh (Dimas, Kak Intan, Pak Reza, Nadia) agar nada konsisten dengan cerita. Bisa disembunyikan lewat pengaturan.
- "Bacakan pelajaran" memakai Web Speech API (suara Bahasa Indonesia bila tersedia). Bila tidak didukung browser, tombol disembunyikan dan UI menjelaskan alasannya.
- Tersedia penuh offline. Tidak memakai video eksternal; gunakan animasi langkah dan ilustrasi buatan sendiri.
- Mode Kelas (patch v5) diperluas: dosen bisa menyusun Jalur Belajar kustom dari pelajaran yang ada dan menetapkan bacaan wajib.
- Tambahan di Pengaturan: mode belajar bawaan, tampilkan tokoh pengantar, kecepatan dan suara pembacaan, ukuran teks pelajaran.

## [H5] CONTOH GAYA PELAJARAN (acuan, jangan disalin mentah): "Menjumlahkan dengan SUM"
Tujuan: setelah ini kamu bisa menjumlahkan total penjualan dengan satu rumus yang ikut berubah saat data berubah.
Penjelasan (Dimas): "Bayangkan kamu menjumlah struk belanja satu per satu dengan kalkulator. Kalau satu struk salah, kamu hitung ulang dari awal. SUM itu seperti punya asisten yang menjumlahkan sendiri semua angka yang kamu tunjuk."
Contoh interaktif: tabel penjualan sayur 7 hari. Langkah: klik sel total → ketik =SUM( → seret rentang B2:B8 → tutup kurung → Enter. Pemain boleh mengubah angka dan melihat total ikut berubah.
Coba Sendiri: jumlahkan kolom C yang berbeda, hasil dicek otomatis tanpa XP.
Kesalahan umum: lupa tanda "=", kurung tidak ditutup, rentang meleset satu baris, angka tersimpan sebagai teks sehingga tidak ikut terjumlah.
Ringkasan: (1) rumus selalu diawali "=", (2) SUM menerima rentang, (3) hasilnya ikut berubah saat data berubah.
Kuis: "Rumus mana yang menjumlahkan sel A1 sampai A5?" + "Total tidak berubah padahal angka sudah diganti. Apa penyebab paling mungkin?"

## [H6] LAYAR TAMBAHAN
Beranda Belajar, Jalur Belajar, Pembaca Pelajaran, Kamus dan Glosarium, Catatan dan Penanda, Lembar Contekan. Tab "Belajar" muncul di navigasi utama berdampingan dengan Peta Karier.

## [H7] KUALITAS KONTEN DAN UJI
- Semua contoh interaktif dan jawaban kuis diuji otomatis (rumus Excel dan kode dijalankan, hasilnya harus sama dengan yang tertulis).
- Linter konten: istilah konsisten dengan glosarium, panjang pelajaran maksimal sekitar 1.200 kata, setiap pelajaran punya minimal satu contoh interaktif dan satu kuis, tidak ada kata placeholder, tidak ada merek atau orang nyata.
- Bot uji memastikan: setiap skill punya pelajaran, setiap pelajaran terhubung ke minimal satu level, semua tautan relatedLevels valid, tidak ada pelajaran yatim.
- E2E: lanjut belajar setelah refresh, deep link dari misi gagal tepat sasaran, belajar tanpa main misi menambah streak, semuanya jalan offline.

## [H8] PENYESUAIAN FASE
- Fase 1: schema Lesson, Pembaca Pelajaran, glosarium, infrastruktur kuis.
- Fase 2-4: pelajaran Tier 1-3 ditulis bersamaan dengan level modulnya.
- Fase 5: integrasi adaptif (rekomendasi, Belajar dari Kesalahan, Pelajaran Kilat).
- Fase 7: pelajaran Tier 4-7 dan Bedah Kasus.
- Fase 8: Catatan dan Penanda, pembacaan suara, Jalur Belajar kustom untuk Mode Kelas.
- DoD tambahan: tidak ada skill tanpa pelajaran, semua contoh interaktif lulus uji otomatis, Pusat Belajar dapat dipakai penuh offline.