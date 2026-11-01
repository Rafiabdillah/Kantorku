# PERAN
Kamu adalah tim senior (product designer, learning designer, game designer, penulis cerita, frontend engineer, QA) yang membangun produk production-ready. Bangun web app belajar berbasis game bernama "KantorKu" secara lengkap dan benar-benar berjalan. Dilarang meninggalkan placeholder, TODO, lorem ipsum, atau fitur setengah jadi. Dilarang memangkas cakupan secara diam-diam: jika sesuatu tidak muat, laporkan dan usulkan pemotongan, jangan pura-pura selesai.

# KONSEP
Simulasi karier kantor. Pemain mulai dari nol sebagai Magang di perusahaan fiktif "PT Maju Sejahtera" lalu naik sampai Direktur dengan menyelesaikan pekerjaan nyata memakai Excel, Word, dan Coding.
Tujuan produk: orang yang benar-benar awam bisa belajar bertahap sampai level expert, dan hasil belajarnya terasa seperti pengalaman kerja sungguhan.
Target: mahasiswa, siswa SMK, fresh graduate, dan pekerja yang ingin upskill di Indonesia. Seluruh UI dan konten Bahasa Indonesia, nada santai tapi sopan. Siap i18n untuk bahasa lain nanti.

# PRINSIP PEMBELAJARAN (jantung produk)
Setiap konsep diajarkan dengan siklus: Konsep singkat → Contoh dikerjakan (worked example) → Praktik terpandu → Tantangan mandiri → Refleksi ("apa yang baru kamu pelajari + kesalahan umum").

## 7 Tier (berlaku untuk ketiga modul)
Tier 1 Pemula Total (Magang): tutorial interaktif, sel/elemen disorot, langkah per langkah, tanpa istilah teknis yang belum dijelaskan.
Tier 2 Dasar (Staf Junior): tugas satu konsep, hint lengkap.
Tier 3 Menengah (Staf): gabungan 2-3 konsep, hint bertingkat.
Tier 4 Mahir (Senior Staf): tugas multi-langkah, hint minim.
Tier 5 Profesional (Supervisor): brief ambigu seperti dunia nyata, hanya hint arah.
Tier 6 Expert (Manajer): masalah terbuka, banyak solusi valid, dinilai juga dari efisiensi, kerapian, dan kemudahan dirawat. Tanpa hint langsung.
Tier 7 Master (Direktur): proyek lintas modul, review kode/dokumen orang lain, merancang sistem.
Prinsip scaffolding memudar: makin tinggi tier, makin sedikit bantuan, makin besar tuntutan penilaian.

## Mekanisme adaptif
- Tes penempatan di onboarding (10-15 soal adaptif per modul) menentukan tier awal. Pemain bisa memilih mulai dari nol walau hasil tesnya tinggi.
- Skill tree per modul: setiap skill punya prasyarat, skor Penguasaan 0-100%, dan status (Baru, Berkembang, Dikuasai, Expert).
- Gagal 3 kali di satu level: tawarkan "Latihan Penguat" (level remedial pendek pada skill yang lemah) dan "Bantuan Bos" gratis berupa contoh serupa.
- Lancar terus: tawarkan "Lompat Level" (tantangan kilat untuk melewati level).
- Spaced repetition: "Review Harian" mengulang skill yang mulai lupa (interval 1-3-7-14-30 hari) memakai soal baru, bukan soal yang sama.
- Buku Catatan Kesalahan otomatis: setiap kesalahan umum tercatat dengan penjelasan dan tombol "latih lagi".
- Tidak ada sistem nyawa/hearts yang menghukum. Gagal = coba lagi dengan feedback spesifik.

# CAKUPAN KONTEN
## Excel (target 40 level + boss)
T1: antarmuka, input data, format Rupiah/persen/tanggal, rumus dasar (+ - * /), SUM, AVERAGE.
T2: MIN, MAX, COUNT, COUNTA, referensi relatif/absolut ($), fill handle, ROUND, sort dan filter dasar.
T3: IF, AND, OR, COUNTIF, SUMIF, AVERAGEIF, fungsi teks (LEFT, RIGHT, MID, LEN, CONCAT, UPPER, LOWER, TRIM, TEXT).
T4: VLOOKUP, XLOOKUP, INDEX-MATCH, IFERROR, fungsi tanggal, conditional formatting, validasi data, grafik.
T5: pivot table terpandu, cleaning data berantakan (duplikat, spasi, tanggal campur format, angka tersimpan sebagai teks), SUMIFS/COUNTIFS, nested IF dan IFS, laporan multi-sheet.
T6: array dinamis (FILTER, SORT, UNIQUE), LET, SUMPRODUCT, perhitungan keuangan (PMT, NPV, depresiasi), dashboard interaktif, model what-if.
T7: model keuangan utuh, audit rumus warisan yang rusak, optimasi dan dokumentasi workbook.
Editor Excel buatan sendiri: grid 26 kolom x 200 baris, multi-sheet, seleksi sel/rentang, formula bar, navigasi keyboard (panah, Tab, Enter, F2, Ctrl+C/V/Z/Y), fill handle, lebar kolom, format angka, undo/redo, trace precedents sederhana. Terima pemisah argumen koma DAN titik koma. Pesan error ramah Bahasa Indonesia (mis. "#DIV/0! artinya ada pembagian dengan nol. Cek sel pembaginya."). Gunakan library formula berlisensi MIT (mis. fast-formula-parser), dan tulis fungsi yang belum ada sendiri dengan perilaku sesuai Excel asli. Catat fungsi yang berbeda perilakunya di dokumentasi.

## Word (target 24 level + boss)
T1: ketik dan format teks (bold, italic, font, ukuran), simpan, rapikan paragraf.
T2: rata teks, spasi, indentasi, bullet dan numbering.
T3: Heading dan Style, tabel, gambar dan caption, margin dan orientasi.
T4: daftar isi otomatis, nomor halaman, header/footer, page break dan section.
T5: template dan style kustom, surat resmi dan proposal profesional, kutipan dan daftar pustaka.
T6: mail merge (data dari tabel ke surat massal), cross-reference, track changes dan komentar, standar dokumen perusahaan.
T7: panduan gaya (style guide) perusahaan, dokumen 20+ halaman yang konsisten, review dokumen orang lain.
Editor TipTap (ProseMirror) dengan ribbon sederhana mirip Word. Validasi berdasarkan struktur dokumen (JSON), bukan tampilan.

## Coding (target 36 level + boss), JavaScript
T1: apa itu program, variabel, tipe data, output, string.
T2: operator, if/else, perbandingan, input sederhana.
T3: loop, array, function, parameter dan return.
T4: object, array method (map, filter, reduce), debugging sistematis, error handling.
T5: pemecahan masalah (problem solving), struktur data (Map, Set), pengolahan data dunia nyata, async dan fetch ke API tiruan.
T6: algoritma dan kompleksitas dasar, refactoring, clean code, menulis test sendiri, pola desain sederhana.
T7: rancang dan bangun mini-sistem (kasir, inventori, antrian), code review kode orang lain, optimasi.
Arsitektur track plug-in supaya bahasa/track baru (Python, SQL) bisa ditambahkan tanpa mengubah inti. Implementasikan JavaScript sepenuhnya. SQL (sql.js) sebagai track tambahan di fase akhir bila waktu memungkinkan.
Eksekusi kode pemain wajib di Web Worker sandbox dengan timeout 3 detik. Editor CodeMirror 6. Tiga tipe tantangan: Perbaiki bug, Lengkapi kode, Tulis dari nol. Hasil test case visible + hidden, error diterjemahkan ke bahasa yang mudah dipahami.

# ENGINE KASUS NYATA (pembeda utama)
Mode ini membuat belajar terasa seperti kerja sungguhan. Setiap Case File memuat:
- Brief berupa email dan chat dari bos/klien dengan bahasa manusia biasa, bukan perintah teknis. Dari Tier 5 ke atas, brief sengaja ambigu dan pemain harus memilih pertanyaan klarifikasi yang tepat sebelum mulai.
- Lampiran data berantakan seperti aslinya: duplikat, typo, spasi berlebih, format tanggal campur, sel kosong, angka sebagai teks, data yang tidak cocok antar tabel.
- Perubahan permintaan di tengah jalan (scope change) pada Case File Tier 4 ke atas ("Bu Sari: eh, tolong tambahkan kolom margin juga ya").
- Deadline dalam jam permainan. Telat tidak memblokir progres, hanya mengurangi bonus Reputasi.
- Penilaian berbasis rubrik 4 dimensi: Benar, Efisien, Rapi, Mudah dirawat. Banyak solusi valid diterima. Feedback seperti review atasan, bukan sekadar lulus/gagal.
- Data dibuat dari generator berbasis seed: setiap main datanya berbeda sehingga tidak bisa menghafal jawaban. Soal Case File punya varian tak terbatas.
- Industri bergilir: toko sayur online UMKM, kampus, klinik, logistik, hotel, pabrik, koperasi, startup, event organizer.
- Jenis kasus: rekap penjualan, payroll, inventaris, absensi, laporan keuangan bulanan, surat penawaran, notulen rapat, SOP, proposal, kwitansi, audit data, otomatisasi laporan.
Target 20 Case File lengkap (Tier 3 sampai 7), masing-masing dengan solusi referensi lebih dari satu.

# MODE GAME
1. Karier (Story): jalur utama bercerita, level berurutan per tier.
​2. Kasus Nyata: Case File di atas, bisa dimainkan terpisah dari cerita.
3. Latihan Bebas (Sandbox): editor kosong untuk bereksperimen, dengan dataset contoh dan kamus rumus.
4. Tantangan Harian: 1 soal acak sesuai level pemain, bonus streak.
5. Kilat (Time Attack): soal pendek melawan waktu, skor dan combo.
6. Detektif: cari kesalahan tersembunyi (rumus salah, data janggal, bug halus, dokumen tidak konsisten).
7. Ujian dan Sertifikasi: ujian per tier tanpa hint, lulus = sertifikat.
8. Duel Asinkron: dua pemain mengerjakan soal dengan seed sama, bandingkan skor dan waktu. Lewat interface DuelService dengan implementasi lokal/mock, siap diganti backend.
9. Mode Mentor: peran dibalik, pemain me-review pekerjaan "karyawan baru" (file Excel salah, dokumen berantakan, kode buggy) dan memberi koreksi. Dinilai dari kesalahan yang berhasil ditemukan. Cocok untuk Tier 6-7.
10. Kreator Level: pemain atau guru membuat level sendiri (data awal, tujuan, validator sederhana) dan membagikannya lewat kode/JSON. Cocok untuk dosen dan komunitas.
11. Zen: tanpa skor dan timer, fokus belajar santai.
12. Event Mingguan: kejadian khusus bertema kantor ("Hari Tutup Buku", "Audit Dadakan", "Akhir Bulan"), reward kosmetik eksklusif.

# CERITA (lengkap, bukan kerangka)
Lima musim mengikuti tier. Seluruh dialog, email, dan epilog harus ditulis penuh.
- Musim 1 "Hari Pertama": Magang di PT Maju Sejahtera, kantor kecil, belajar dasar.
- Musim 2 "Mulai Dipercaya": naik jadi Staf, tim bertambah, kesalahan pertama yang berdampak.
- Musim 3 "Audit": perusahaan diaudit, data lama berantakan, tekanan tenggat.
- Musim 4 "Ekspansi": cabang baru, sistem digital menggantikan kertas, konflik antar divisi.
- Musim 5 "Krisis Data": insiden besar, pemain memimpin tim memulihkan dan merancang sistem baru, jadi Direktur.
Tokoh: Bu Sari (bos tegas tapi adil), Dimas (rekan kerja ceria), Maya (HR), Kak Intan (IT, mentor coding), Pak Reza (Finance, perfeksionis), Pak Hendra (auditor/klien yang sulit), Nadia (Marketing). Semua digambar sebagai SVG buatan sendiri, bukan karakter berhak cipta.
Dialog bercabang ringan: pilihan cara berkomunikasi (jujur akui kesalahan, minta bantuan, ambil inisiatif) memengaruhi nilai Reputasi per tokoh dan membuka dialog/ending kecil yang berbeda. Pilihan tidak pernah memblokir progres belajar.
Elemen dunia: kalender kantor (Senin standup, Jumat laporan), inbox email, chat tim, kejadian acak harian, cutscene singkat yang bisa dilewati, epilog tiap musim, buku harian karier.

# GAMIFIKASI DAN FITUR
- XP, level pemain, jabatan, koin. Bintang 1-3 per level (kebenaran, penggunaan hint, efisiensi).
- Streak harian dengan "pembeku streak" (streak freeze) yang bisa dibeli agar tidak frustrasi.
- Hint 3 tingkat berbayar koin (petunjuk → arah rumus → hampir jawaban). Setelah 3 kali gagal, muncul "Bantuan Bos" gratis.
- Toko kosmetik (avatar, tema meja kerja, warna kantor, dekorasi ruangan).
- Minimal 40 achievement/badge (contoh: "Raja VLOOKUP", "Nol Bug", "7 Hari Beruntun", "Auditor Teliti", "Mentor Sejati").
- Radar skill (grafik laba-laba) per modul, grafik progres mingguan.
- Portofolio: kumpulan hasil terbaik pemain, bisa diekspor ke .xlsx (SheetJS), .docx (library docx berlisensi MIT), dan .js. Ini bukti kemampuan nyata untuk CV.
- Sertifikat PDF per tier (nama, tanggal, ID unik lokal), bisa dibagikan.
- Kamus Rumus dan Cheat Sheet yang terbuka seiring progres.
- Leaderboard mingguan lewat LeaderboardService dengan data mock lokal.
- Efek suara (bisa dimatikan), animasi sukses (confetti), notifikasi naik jabatan, mode fokus, pengingat belajar (PWA notification bila didukung).
- Opsional: MentorService berupa interface umpan balik tambahan. Implementasi default berbasis aturan (rule-based). Jangan menaruh API key atau memanggil layanan AI eksternal di kode.

# SISTEM VALIDASI (PENTING)
- Excel: cek nilai sel target (toleransi desimal), fungsi wajib (regex pada formula), dan mutation test (ubah data sumber otomatis, pastikan hasil ikut berubah) untuk mencegah hardcode. Tier 5 ke atas: cek juga kerapian (format konsisten, header jelas) dan efisiensi (tidak ada rumus berulang yang bisa disederhanakan).
- Word: cek struktur (level heading, daftar, tabel, alignment, daftar isi, nomor halaman, konsistensi style).
- Coding: test case visible + hidden di sandbox, cek kualitas (nama variabel, duplikasi kode, kompleksitas) untuk Tier 6 ke atas.
- Setiap validator mengembalikan: lulus/gagal per kriteria, skor 4 dimensi, dan feedback spesifik dalam Bahasa Indonesia.
- Untuk setiap level dan Case File, sediakan minimal satu solusi referensi, dan untuk Tier 5 ke atas minimal dua solusi alternatif yang sama-sama harus lulus.
- Unit test untuk semua validator dan generator data. Uji bahwa jawaban salah/hardcode benar-benar gagal.

# FORMAT DATA KONTEN (wajib konsisten, divalidasi dengan Zod)
Level: { id, module, tier, chapter, order, title, isBoss, mode[], story, dialogue[], objectives[], prerequisiteSkills[], skillsTaught[], initialData | dataGenerator{seed, params}, validator{type, params, rubric}, hints[3], referenceSolutions[], solutionExplanation, commonMistakes[], xp, coins, estimatedMinutes }
CaseFile: { id, title, industry, tier, emails[], chats[], attachments[], clarifyingQuestions[], scopeChanges[], rubric, referenceSolutions[], deadlineGameHours, reputationEffects }
Konten disimpan sebagai data terpisah di src/content/, dimuat lazy per modul. Pipeline validasi konten dijalankan saat build dan gagal bila ada level yang rusak.

# TECH STACK
React + Vite + TypeScript (strict), Tailwind CSS, Zustand (persist), Framer Motion, React Router, CodeMirror 6, TipTap, Zod, Vitest, Playwright, SheetJS dan docx untuk ekspor, jsPDF/pdf-lib untuk sertifikat. Semua library berlisensi permisif (MIT/Apache). Hindari GPL dan komersial.
Offline-first: progres di IndexedDB (localStorage untuk pengaturan), PWA. Tanpa backend. Semua akses data lewat interface repository (ProgressRepository, LeaderboardService, DuelService, MentorService, ContentRepository) supaya mudah diganti ke Supabase/Firebase.
Struktur folder: src/{app, features/{excel,word,coding,map,cases,modes,profile,shop,achievements,story,portfolio,certificates}, engine/{validators,formula,sandbox,scoring,generator,adaptive,spaced-repetition}, content/{excel,word,coding,cases,story}, store, services, components, assets, tests}

# LAYAR
1. Onboarding: avatar, nama, pilih modul dan tujuan, tes penempatan adaptif.
​2. Kantor (Home): hub berupa denah kantor dengan inbox, kalender, tugas hari ini, akses ke semua mode.
3. Peta Karier dan Skill Tree: jalur level bergaya denah kantor, status terkunci/terbuka/bintang, penguasaan per skill.
4. Layar Misi: dialog (kiri), editor (tengah), checklist + hint + tombol Cek (kanan). Di mobile jadi tab.
5. Layar Kasus Nyata: inbox email/chat + lampiran + editor + kotak pertanyaan klarifikasi.
6. Hasil Misi: bintang, XP, koin, skor 4 dimensi, penjelasan solusi, kesalahan umum, tombol "latih lagi".
7. Review Harian dan Buku Kesalahan.
8. Profil: jabatan, radar skill, streak, statistik, badge, sertifikat, portofolio.
9. Toko, Achievement, Leaderboard, Duel, Kreator Level, Pengaturan (suara, tema, reset, ekspor/impor progres JSON, bahasa).

# DESAIN
Gaya flat-illustration yang hangat dan ramah, bukan template generik. Satu palet berkarakter (token warna di Tailwind config), font display ramah (mis. Baloo 2) + Inter. Responsive 360px sampai desktop, mode gelap/terang, kontras WCAG AA, navigasi keyboard penuh, label ARIA pada grid dan editor, dukung pengurangan animasi (prefers-reduced-motion). Loading, empty, dan error state dirancang di setiap layar. Error boundary di setiap fitur besar.

# CARA KERJA
1. Mulai dengan Planning: buat implementation plan, arsitektur, dan task list. Tunggu review saya sebelum menulis kode.
​2. Kerjakan bertahap:
   Fase 1: fondasi (setup, routing, store, repository, design system, skill tree, gamifikasi inti, story engine, pipeline konten + Zod)
   Fase 2: modul Excel Tier 1-3 + editor + validator + test
   Fase 3: modul Coding Tier 1-3 + sandbox + test
   Fase 4: modul Word Tier 1-3 + test
   Fase 5: sistem adaptif (tes penempatan, remedial, review harian, buku kesalahan), mode Sandbox, Harian, Kilat, Zen
   Fase 6: Engine Kasus Nyata + generator data + Case File Tier 3-5
   Fase 7: Tier 4-7 untuk ketiga modul, Case File Tier 6-7, Mode Detektif, Mentor, Ujian dan Sertifikasi
   Fase 8: Duel, Kreator Level, Portofolio dan ekspor, Event Mingguan, toko, achievement, leaderboard, PWA
   Fase 9: polish, aksesibilitas, performa, QA menyeluruh
3. Setelah tiap fase: jalankan app, uji di browser, ambil screenshot, perbaiki bug, jalankan semua test, lalu laporkan ringkas apa yang selesai dan apa yang belum.
4. Tulis README (install, jalankan, tambah level, tambah Case File, tambah track baru) dan panduan penulisan konten.

# DEFINITION OF DONE
- npm run build dan npm test lulus tanpa error/warning.
- Semua level, Case File, dan Boss bisa diselesaikan dan divalidasi benar dengan solusi referensi. Jawaban salah dan hardcode gagal.
- Konten teknis benar: rumus Excel berperilaku sesuai Excel asli, kode contoh berjalan.
- Progres tersimpan setelah refresh dan bisa diekspor/diimpor.
- Tes penempatan menghasilkan tier awal yang masuk akal untuk profil pemula, menengah, dan expert (uji dengan skenario).
- Tidak ada console error, tampilan rapi di mobile dan desktop, Lighthouse performance dan accessibility minimal 90.
- Tidak ada konten placeholder, tidak ada fitur yang hanya tampilan tanpa fungsi.