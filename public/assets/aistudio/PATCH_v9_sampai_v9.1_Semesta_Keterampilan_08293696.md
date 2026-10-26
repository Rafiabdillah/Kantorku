# PATCH PRD KantorKu v9 + v9.1 (GABUNGAN)
# SEMESTA KETERAMPILAN DAN PEMETAAN 16 JALUR PERAN

Isi berkas ini:
- BAGIAN A: Patch v9, Semesta Keterampilan (17 domain, mesin baru, mode penilaian, jalur peran, gelombang S0-S3).
- BAGIAN B: Patch v9.1, Pemetaan 16 Jalur Peran (data awal `roles.ts`).
- Bagian B melengkapi Bagian A (bagian 5). Keduanya dikerjakan bersama.

CARA MENGIRIM KE AGENT
1. Kirim berkas ini lengkap, lalu tulis: "Baca seluruh berkas. Kerjakan HANYA gelombang S0. Jangan menulis konten domain lain. Setelah selesai, BERHENTI dan kirim laporan tabel (item | status | bukti)."
2. Setelah laporan S0 diperiksa dan disetujui, kirim: "Lanjut S1." Begitu seterusnya sampai S3.
3. Jangan dikirim sebelum patch perbaikan v1 (P0-P1) lulus dan konten Excel Tier 1-3 (Batch A) selesai.

---

# BAGIAN A. PATCH v9: SEMESTA KETERAMPILAN (seluruh keterampilan kerja, bisnis, dan akademik)

Tujuan: KantorKu berkembang dari 4 modul (Excel, Word, Web, JavaScript) menjadi platform latihan keterampilan kerja, bisnis, dan akademik yang lengkap. Prinsip tidak berubah: simulasi karier, praktik nyata, offline-first, tanpa backend, TANPA memanggil AI eksternal, semua library berlisensi permisif (MIT/Apache).

PRASYARAT: patch perbaikan v1 (P0-P1) sudah lulus, konten Excel Tier 1-3 (Batch A) selesai, dan skema Kasus v2 (patch v8, tahap K0) sudah ada. Jika belum, kerjakan itu dulu dan laporkan.

## ATURAN KERJA
1. Periksa kode lebih dulu: bagaimana `ModuleType` ('excel' | 'word' | 'coding' | 'web'), skill tree, `skillId`, dan store progres dipakai. Laporkan dampak perluasan ke domain sebelum menulis konten.
2. Kerjakan per gelombang (S0 → S1 → S2 → S3). Setelah tiap gelombang BERHENTI, kirim laporan tabel (item | status | bukti), dan tunggu persetujuan.
3. Jujur soal kedalaman: setiap keterampilan berlabel Kedalaman Penuh / Menengah / Dasar yang tampil di UI. Dilarang menampilkan domain atau jumlah skill yang isinya belum ada. Yang menunggu mesin atau editor baru tampil sebagai "Segera Hadir".
4. Jangan menyatakan selesai tanpa bukti perintah: `npm run check`, `npm run test:e2e`, `npm run skills:audit`.
5. Semua data fiktif dan tanpa merek atau orang nyata. Angka regulasi (pajak, upah, iuran, perizinan) menjadi PARAMETER berlabel "ilustrasi, cek aturan terbaru".
6. Kompatibilitas: progres pemain yang sudah ada tidak boleh hilang. Migrasi store `kantorku_game_storage_v1` ke versi baru dengan fungsi migrasi dan test.

## 1. ARSITEKTUR SEMESTA KETERAMPILAN
- Hierarki: Domain → Keterampilan → Sub-keterampilan (butir "dapat melakukan"). Ganti `ModuleType` yang sempit dengan `DomainId`. Empat modul lama menjadi domain D1, D2, D5 (dan Web di dalam D5) tanpa mengubah isinya.
- `Skill` (validasi Zod): { id, domain, name, description, prerequisites[], canDo[tier 1-7] (pernyataan "dapat melakukan" per tier), practiceModes[], linkedLessons[], linkedLevels[], linkedCases[], roleRelevance{roleId: bobot}, depth ("penuh"|"menengah"|"dasar"), estimatedHours, sources[], lastReviewed, requires[] (mesin yang dibutuhkan) }.
- SkillPack: tiap domain berupa paket data di `src/content/skills/<domain>/` (skills, lessons, levels, cases, quizzes), dimuat lazy, divalidasi Zod, dengan manifest { domain, version, wave, depth, requires[] }. Menambah domain baru cukup menambah folder, tanpa mengubah inti.
- Penguasaan per skill (0-100) dan Review Harian berlaku lintas domain memakai mekanisme yang sudah ada.

## 2. MODE LATIHAN DAN PENILAIAN (jujur dan transparan)
- E = Editor + validator otomatis (Excel, Word, Web, JS, SQL, Jurnal, Gantt/Kanban, Slide). Objektif.
- T = Menulis + rubrik berbasis aturan (email, pesan chat bisnis, ringkasan eksekutif, CV, prompt). Menilai struktur dan elemen lewat checklist yang tampil ke pemain, bukan "kualitas bahasa".
- S = Simulasi percakapan/situasi bercabang (negosiasi, wawancara, komplain, rapat, konflik). Dinilai dari keputusan menurut rubrik transparan. Tidak ada jawaban tunggal, trade-off dijelaskan di Debrief.
- K = Kuis analitis: pilihan, urutkan, cocokkan, temukan kesalahan (dokumen, grafik, rumus, email phishing), klik area, hitung. Soal dibangkitkan dengan seed agar bervariasi.
- P = Kasus lintas (Case File v2 dari patch v8).
Aturan: setiap keterampilan punya minimal satu mode objektif (E atau K), ditambah T atau S bila relevan. Keterampilan lunak (soft skill) ditampilkan sebagai "indikator latihan", bukan klaim kompetensi. Semua sertifikat dan Skill Passport berlabel: "Latihan di dalam aplikasi, bukan sertifikasi kompetensi resmi (mis. BNSP)".

## 3. MESIN BARU (dipakai bersama, offline)
Periksa dulu apa yang sudah ada dan gunakan ulang. Bangun hanya yang belum ada, dalam urutan gelombang:
- S0: Editor Email/Pesan (kolom penerima, subjek, isi; checklist aturan: tujuan di kalimat pertama, subjek spesifik, salam dan penutup, ajakan bertindak, lampiran disebut, panjang wajar, nada, ejaan dasar). Mesin Simulasi Percakapan (perluas mesin dialog yang ada: pilihan terstruktur, "susun jawaban dari blok kalimat", skor rubrik, reputasi tokoh). Mesin Kuis lanjutan (urutkan, cocokkan, temukan kesalahan, hotspot klik).
- S2: Editor Jurnal/Buku Besar (tabel terpandu, validasi debit = kredit, neraca saldo otomatis). Editor Gantt/Kanban (seret dan lepas, jadwal, ketergantungan sederhana). Editor Slide mini 16:9 (teks, bentuk, grafik, master slide, catatan pembicara; ekspor PDF dan .pptx lewat pptxgenjs berlisensi MIT; validator aturan: satu pesan per slide, ukuran huruf minimal, kontras, jumlah kata). Editor Alur (flowchart sederhana). Editor Grafik (pilih jenis, sumbu, judul; validator: jenis grafik sesuai data, tidak menyesatkan).
- S3: Editor SQL berbasis sql.js (SQLite di browser, basis data contoh dibangkitkan per seed, validator membandingkan hasil query). Terminal simulasi untuk Git dan command line (emulator berskrip, TIDAK menjalankan perintah nyata). Kanvas Desain SVG sederhana (validator aturan: kontras, ukuran font minimal, margin, jumlah font).
- Python (Pyodide) HANYA usulan: unduhan besar (puluhan MB). Jangan dikerjakan tanpa persetujuan eksplisit, dan jika disetujui harus lazy dan bisa di-cache offline.
Semua editor wajib: ramah sentuhan (patch lintas platform), keyboard penuh, ARIA, ErrorBoundary, dan tes asap Playwright.

## 4. KATALOG 17 DOMAIN
Format: Domain (gelombang, kedalaman, mode): keterampilan.

D1 Spreadsheet (berjalan, E): lanjutan sesuai PRD, tambah padanan Google Sheets (ARRAYFORMULA, QUERY, kolaborasi, komentar, riwayat versi), dokumentasi workbook, konsep Power Query dan makro.

D2 Dokumen dan Penulisan Profesional (berjalan, E+T): lanjutan sesuai PRD, tambah penulisan ringkas (inti dulu), ejaan dan tanda baca Bahasa Indonesia, istilah baku, surat dinas vs niaga, menyunting tulisan sendiri.

D3 Presentasi (S2, menengah, E+T+K): alur cerita, satu pesan per slide, hierarki visual, kontras dan ukuran huruf, grafik di slide, master slide, catatan pembicara, pitch deck (masalah, solusi, pasar, model bisnis, tim, permintaan), latihan presentasi lisan dengan timer.

D4 Data dan Analisis (S3, penuh, E+K): statistik deskriptif, memilih grafik, membaca grafik yang menyesatkan, pembersihan data, pivot, korelasi vs sebab, dasbor, SQL (SELECT, WHERE, ORDER, GROUP BY, JOIN, subquery, fungsi jendela dasar), etika data.

D5 Pemrograman dan Web (berjalan, E): lanjutan sesuai PRD, tambah Git dan terminal dasar (S3), JSON dan API tiruan, regex, debugging sistematis, tes sederhana, dasar keamanan web (validasi input, XSS).

D6 Akuntansi dan Keuangan Usaha (S2, penuh, E+K+P): persamaan akuntansi, jurnal umum, buku besar, neraca saldo, jurnal penyesuaian, laba rugi, perubahan modal, neraca, arus kas sederhana, rekonsiliasi bank, persediaan (rata-rata dan FIFO), penyusutan, piutang dan utang usaha, kas kecil, anggaran, analisis rasio (likuiditas, profitabilitas), pencatatan sederhana UMKM, pajak dasar sebagai edukasi (PPN dan PPh final UMKM sebagai parameter).

D7 Keuangan Pribadi dan Wirausaha (S1, menengah, K+E+T): anggaran pribadi (beberapa metode, bukan satu aturan mutlak), dana darurat, utang dan cicilan (bunga efektif vs flat), bunga sederhana dan majemuk, inflasi, dasar investasi dan risiko (TANPA rekomendasi produk, tanpa janji hasil), asuransi dasar; ide dan validasi usaha, Business Model Canvas, penetapan harga, proyeksi sederhana, pitch, perizinan usaha (edukasi, cek aturan terbaru).

D8 Operasional dan Rantai Pasok (S2, menengah, E+K+P): manajemen stok dan titik pesan ulang, pengadaan dan evaluasi pemasok, logistik dan ongkir, penjadwalan produksi, kontrol kualitas, K3 dasar, SOP dan perbaikan proses (5S, alur proses), pengelolaan kedaluwarsa dan limbah.

D9 Pemasaran dan Penjualan (S2, penuh, T+S+E+K): riset pasar dan persona, segmentasi-target-posisi, bauran pemasaran, copywriting, kalender konten media sosial, SEO dasar, iklan berbayar (anggaran dan metrik: CTR, CPC, konversi), pemasaran lewat email/WhatsApp dan etikanya (izin penerima), listing marketplace (judul, deskripsi, foto), penawaran dan negosiasi, menangani keberatan pelanggan, CRM sederhana, layanan pelanggan dan komplain.

D10 SDM dan Kepemimpinan (S2, menengah, S+T+E): rekrutmen dan wawancara, onboarding, penggajian dan lembur (parameter), penilaian kinerja, KPI dan OKR, memberi umpan balik, delegasi, rapat efektif, mengelola konflik, motivasi, coaching, etika kerja dan keberagaman, ketenagakerjaan dasar (edukasi).

D11 Manajemen Proyek dan Produktivitas (S2, penuh, E+T+K): tujuan SMART, lingkup dan WBS, estimasi, jadwal Gantt dan konsep jalur kritis, anggaran proyek, risiko dan mitigasi, pemangku kepentingan, Kanban dan Scrum dasar, laporan status, retrospektif; produktivitas: prioritas, manajemen waktu, fokus, pintasan keyboard, penamaan dan pengelolaan file, cloud dan kolaborasi, mengelola email, catatan efektif.

D12 Komunikasi Profesional (S0 pilot, penuh, T+S+K): email bisnis, pesan chat bisnis dan etiketnya (jam, nada, emoji), telepon dan voice note, notulen dan rapat, presentasi lisan, bercerita (storytelling), mendengarkan aktif, negosiasi, umpan balik, komunikasi saat krisis dan meminta maaf, lintas generasi dan budaya, etika.

D13 Bahasa Inggris Bisnis (S3, menengah, K+T+S): email, rapat, presentasi, telepon, istilah bisnis, CV dan cover letter, wawancara, membaca laporan dan kontrak sederhana.

D14 Literasi Digital, Keamanan, dan AI (S1, penuh, K+S+T): akun dan kata sandi (manajer sandi, verifikasi dua langkah), mengenali phishing dan penipuan online (simulasi pesan, tautan, situs; HANYA sisi pertahanan, tidak mengajarkan membuat serangan), privasi dan data pribadi (UU PDP sebagai edukasi), keamanan perangkat dan cadangan (aturan 3-2-1), hak cipta dan lisensi aset, verifikasi informasi dan hoaks, etika AI, menulis instruksi (prompt) yang jelas dengan checklist (peran, tujuan, konteks, format, batasan, contoh), memeriksa keluaran AI (kasus temukan kesalahan fakta dan angka), tidak mengunggah data rahasia ke alat AI, transparansi pemakaian AI. Aplikasi TIDAK memanggil AI: semua keluaran simulasi ditulis statis.

D15 Karier dan Akademik (S1, penuh, E+T+S+K): CV dan surat lamaran (editor Word), profil profesional dan portofolio, mengenali lowongan palsu, wawancara (simulasi), negosiasi gaji, 90 hari pertama, magang dan PKL; akademik: struktur skripsi, rumusan masalah, tinjauan pustaka, metodologi (sampel, kuesioner, skala), statistik inferensial dasar (konsep), sitasi dan daftar pustaka (APA 7), parafrase vs plagiarisme, manajemen referensi, etika penelitian.

D16 Desain Visual dan Konten (S3, menengah, E+K): hierarki, kontras, grid, spasi, tipografi, warna dan palet, poster, flyer, menu, komposisi foto produk (kuis), brand kit, aksesibilitas visual, ukuran konten media sosial.

D17 Hukum dan Kepatuhan Dasar (S3, menengah, K+S+T): unsur kontrak dan klausul umum, wanprestasi (konsep), perlindungan konsumen, merek dan hak cipta, perlindungan data, perizinan usaha, ketenagakerjaan dasar, transaksi elektronik. Wajib penafian "edukasi, bukan nasihat hukum".

Target kedalaman:
- Penuh: minimal 3 pelajaran, 3 latihan/level (mode sesuai), 10 soal kuis berseed, 1 kasus, istilah kamus, dan lembar contekan.
- Menengah: minimal 2 pelajaran, 1 latihan, 6 soal.
- Dasar: 1 pelajaran, 5 soal, 1 latihan mini.

## 5. JALUR PERAN DAN KESIAPAN KERJA
- 16 Jalur Peran: Admin Perkantoran, Staf Akuntansi/Keuangan, Staf Gudang dan Logistik, Admin SDM, Digital Marketing, Customer Service, Sales dan Account Executive, Analis Data Junior, Web Developer Junior, Koordinator Proyek, Pemilik UMKM, Supervisor/Asisten Manajer, Mahasiswa Tingkat Akhir, Pencari Kerja/Fresh Graduate, Event Organizer, Admin Toko Online.
- `Role` { id, name, description, skills[{skillId, targetTier, bobot}], recommendedCases[] } di `src/content/roles.ts`. Pemetaan lengkap untuk SEMUA peran ada di BAGIAN B (patch v9.1) dan dipakai sebagai data awal. Tandai "perkiraan, bukan standar resmi".
- Kesiapan Kerja (%) = Σ(bobot × min(penguasaan / target, 1)) / Σ bobot, dengan rincian per skill. Analisis Celah: 5 skill dengan bobot × celah terbesar, beserta pelajaran dan kasus yang disarankan. Label: "perkiraan latihan, bukan penilaian resmi".
- Sertifikat per jalur (PDF) dengan label yang sama seperti di bagian 2.

## 6. LAYAR DAN PENGALAMAN
- Peta Keterampilan: kartu domain → daftar keterampilan → detail (butir "dapat melakukan" per tier, penguasaan, pelajaran, latihan, kasus). Pencarian dan filter (domain, peran, durasi, mode).
- Wizard "Mulai dari tujuanmu": contoh "Saya mau jadi staf keuangan", "Saya mau buka usaha", "Saya sedang skripsi", "Saya mencari kerja" → jalur peran dan rencana belajar mingguan.
- Dasbor Kesiapan Kerja (radar per domain dan rincian peran), Skill Passport (ekspor PDF: keterampilan, penguasaan, bukti portofolio, tanggal; dengan label penafian).
- Review Harian, rekomendasi, dan Tantangan Harian bergilir antar domain sesuai tujuan pemain. Pengaturan: domain yang ingin ditampilkan.
- Ramah mobile dan Windows (ikuti patch lintas platform), tetap lazy per domain agar bundel awal kecil.

## 7. KUALITAS DAN KEAMANAN KONTEN
- `npm run skills:audit`: cetak tabel jujur aktual vs target per domain dan kedalaman, dan GAGAL bila ada keterampilan tanpa pelajaran, latihan, mode penilaian objektif, atau tautan peran; kuis dengan jawaban ambigu atau satu-satunya pilihan yang masuk akal; pelajaran tanpa contoh; konten tanpa `lastReviewed`; konten hukum, pajak, dan keuangan tanpa `sources[]`, parameter, dan penafian; pernyataan yang menjanjikan hasil ("pasti diterima kerja", "pasti untung"); merek atau orang nyata.
- Konten regulasi (hukum, pajak, ketenagakerjaan, perizinan, perlindungan data) wajib punya tanggal tinjau, sumber, dan tanda kedaluwarsa otomatis bila lebih dari 12 bulan. Jangan menyatakan aturan sebagai paling mutakhir.
- Keuangan pribadi dan investasi: hanya edukasi konsep dan risiko, tanpa rekomendasi produk atau janji imbal hasil, dengan penafian "bukan nasihat keuangan".
- Keamanan digital: hanya sisi pertahanan (mengenali, melaporkan, mencegah). Simulasi phishing tidak boleh memuat langkah membuat atau menjalankan serangan nyata.
- Semua simulasi dan keluaran bersifat statis dan tertulis. Tidak ada panggilan jaringan ke layanan AI atau pihak ketiga.
- Tes: validator tiap mesin baru (jurnal seimbang, aturan slide, hasil query SQL, aturan email), uji E2E satu latihan per mesin di desktop dan mobile, uji migrasi progres lama ke baru.

## 8. GELOMBANG
- S0 (pilot, hentikan setelah ini): arsitektur Domain/Skill/SkillPack, migrasi store, Peta Keterampilan, Jalur Peran kerangka (data dari Bagian B), Editor Email, Mesin Simulasi, Mesin Kuis lanjutan, `skills:audit`, dan domain D12 Komunikasi Profesional dengan kedalaman Penuh sebagai bukti bahwa arsitekturnya bekerja.
- S1: D14, D15 (Penuh), D7 (Menengah), dan kasus untuk ketiganya. Pemetaan 16 jalur peran diselesaikan dan ditinjau.
- S2: mesin jurnal, Gantt/Kanban, slide, alur, grafik; lalu D6, D9, D11 (Penuh), D3, D8, D10 (Menengah).
- S3: mesin SQL, kanvas desain, terminal simulasi; lalu D4 (Penuh), D13, D16, D17 (Menengah), dan tambahan D1/D2/D5. Keputusan Python ditanyakan terpisah.
Di setiap gelombang: jalankan `skills:audit`, `check`, `test:e2e`, mainkan SEMUA latihan baru dengan solusi referensi, lalu kirim laporan dan tunggu persetujuan.

## DEFINITION OF DONE (per gelombang)
- `npm run check`, `npm run test:e2e`, dan `npm run skills:audit` lulus.
- Progres lama tetap utuh setelah migrasi.
- Tidak ada domain, jumlah skill, atau fitur di UI yang melebihi isi sebenarnya. Yang belum ada tampil "Segera Hadir".
- Semua latihan bisa diselesaikan dengan solusi referensi, dan jawaban salah gagal dengan umpan balik yang spesifik.
- Tidak ada pemanggilan AI atau jaringan pihak ketiga, tidak ada klaim sertifikasi resmi.

---

# BAGIAN B. PATCH v9.1: PEMETAAN 16 JALUR PERAN (data awal src/content/roles.ts)

Gunakan tabel ini sebagai data awal `roles.ts`. Format tiap entri: D<nomor domain>:<target tier>/<bobot 1-5>. Bobot 5 = inti pekerjaan, 1 = bonus. Teks dalam kurung adalah keterampilan kunci yang HARUS tercakup di domain itu untuk peran tersebut.

## ATURAN IMPLEMENTASI
1. Target tier di bawah adalah level "siap kerja". Untuk jenjang Menengah tambahkan +1 tier, untuk Senior +2 tier, hanya pada entri berbobot 4 atau 5, maksimum Tier 7.
2. Domain → skill: skill kunci (yang disebut dalam kurung) mewarisi bobot penuh dari domainnya, skill lain di domain yang sama mewarisi setengahnya (dibulatkan ke atas). Isi `roleRelevance` pada tiap `Skill` dari aturan ini, dan pemetaan nama skill ke `skillId` dilaporkan untuk ditinjau.
3. Skill yang belum tersedia di aplikasi (domain gelombang berikutnya, atau menunggu mesin baru) TIDAK dihitung dalam Kesiapan Kerja. Bobot dihitung ulang hanya dari skill yang tersedia, dan UI menampilkan "X% keterampilan peran ini belum tersedia".
4. Setiap peran diberi `reviewStatus: "draf"` dan label: "Pemetaan perkiraan untuk keperluan latihan. Bukan standar resmi (mis. SKKNI) dan bukan jaminan kesiapan kerja."
5. `skills:audit` tambahan: setiap domain muncul di minimal satu peran, setiap peran memuat minimal 5 domain, tidak ada skill kunci yang tidak ditemukan padanannya, dan semua peran lolos validasi Zod.

## PEMETAAN

1 Admin Perkantoran
D1:4/5 (rumus dasar-menengah, format, sort dan filter, VLOOKUP) · D2:4/5 (surat resmi, notulen, template) · D12:4/4 · D11:3/4 (email, file, jadwal) · D3:3/3 · D14:3/3 · D13:2/2 · D6:2/1

2 Staf Akuntansi/Keuangan
D6:5/5 (jurnal, buku besar, laporan keuangan, rekonsiliasi) · D1:5/5 (SUMIFS, pivot, lookup) · D4:3/3 · D12:3/3 · D14:3/3 (keamanan data keuangan) · D2:3/2 · D11:3/2 · D17:2/2 · D13:2/1

3 Staf Gudang dan Logistik
D8:5/5 (stok, titik pesan ulang, pemasok, ongkir) · D1:4/4 · D12:3/3 · D11:3/3 · D6:3/2 (persediaan) · D4:3/2 · D2:3/2 · D14:2/2

4 Admin SDM/HRD
D10:5/5 · D2:4/4 · D1:4/4 · D12:4/4 · D17:3/4 (ketenagakerjaan dasar) · D14:3/3 (privasi data karyawan) · D11:3/2 · D3:3/2 · D6:2/2

5 Digital Marketing
D9:5/5 · D16:4/4 · D12:4/4 (copywriting) · D4:4/4 (analitik) · D14:4/3 · D1:4/3 · D3:3/3 · D5:3/3 (HTML/CSS, landing page) · D17:3/2 · D2:3/2 · D13:3/2

6 Customer Service
D12:5/5 (chat bisnis, telepon, komplain, empati) · D9:3/4 (layanan pelanggan, CRM) · D14:3/3 · D2:3/3 · D1:3/3 · D13:3/2 · D17:2/2 · D10:2/2 · D11:3/2

7 Sales dan Account Executive
D9:5/5 · D12:5/5 (negosiasi) · D3:4/4 (pitch) · D1:4/3 · D2:4/3 (penawaran) · D4:3/3 · D6:3/2 (margin, piutang) · D17:3/2 · D14:3/2 · D13:3/2

8 Analis Data Junior
D4:5/5 · D1:5/5 · D3:4/3 · D2:4/3 · D12:4/3 · D14:4/3 (etika data, privasi) · D5:3/2 · D11:3/2 · D13:3/2 · D17:2/1

9 Web Developer Junior
D5:5/5 · D14:4/4 (keamanan web) · D11:4/3 (Git, Kanban) · D13:4/3 (membaca dokumentasi) · D16:3/3 · D12:3/3 · D4:3/2 (SQL, JSON) · D2:3/1 · D17:2/1 (lisensi)

10 Koordinator Proyek
D11:5/5 · D12:5/5 · D3:4/4 · D1:4/4 · D2:4/3 · D10:4/3 · D6:3/3 (anggaran proyek) · D17:3/2 · D14:3/2 · D8:3/2 · D13:3/2

11 Pemilik UMKM
D7:5/5 · D9:4/5 · D6:4/5 (pembukuan sederhana, HPP, laba rugi) · D8:4/4 · D1:4/4 · D12:4/3 · D17:3/3 (perizinan, merek, perlindungan konsumen) · D14:3/3 · D3:3/3 · D2:3/3 · D10:3/3 · D16:3/3 · D11:3/2 · D5:2/1 · D13:2/1

12 Supervisor/Asisten Manajer
D10:5/5 · D12:5/5 · D11:5/4 · D1:4/4 · D3:4/4 · D2:4/3 · D6:4/3 · D4:4/3 · D14:3/3 · D17:3/3 · D8:3/2 · D9:3/2 · D13:3/2

13 Mahasiswa Tingkat Akhir
D15:5/5 (skripsi, metodologi, sitasi, plagiarisme) · D2:5/5 · D4:4/4 (statistik, analisis) · D1:4/4 · D3:4/4 (presentasi sidang) · D14:4/4 (integritas akademik, penggunaan AI) · D12:4/3 · D11:4/3 · D13:3/3 · D17:2/1

14 Pencari Kerja/Fresh Graduate
D15:5/5 (CV, wawancara, mengenali lowongan palsu) · D12:4/5 · D2:4/4 · D1:4/4 · D13:3/4 · D3:3/3 · D14:3/3 · D7:3/3 · D11:3/3 · D10:2/2 · D17:2/2 (kontrak kerja dasar)

15 Event Organizer
D11:5/5 · D12:5/4 · D9:4/4 · D6:4/4 (RAB, anggaran) · D1:4/4 · D8:4/3 (vendor, logistik) · D2:4/3 (proposal, rundown) · D3:4/3 · D16:3/3 · D17:3/3 (kontrak vendor, perizinan kegiatan) · D10:3/3 · D14:3/2

16 Admin Toko Online
D9:4/5 (listing, layanan) · D8:4/5 (stok, ongkir) · D1:4/5 · D12:4/4 · D14:4/4 (penipuan, keamanan akun) · D6:3/3 · D16:3/3 (foto, banner) · D17:3/3 (perlindungan konsumen, merek) · D4:3/3 · D2:3/2 · D5:2/2 · D7:2/1

## DEFINITION OF DONE (Bagian B)
- `roles.ts` memuat 16 peran sesuai tabel, lolos validasi Zod dan `skills:audit`.
- Kesiapan Kerja dihitung sesuai rumus di Bagian A (bagian 5) dengan penghitungan ulang bobot untuk skill yang belum tersedia.
- Semua tampilan peran menampilkan label "draf, perkiraan, bukan standar resmi".
- Laporan pemetaan nama skill ke `skillId` dikirim untuk ditinjau sebelum status "draf" diubah.
