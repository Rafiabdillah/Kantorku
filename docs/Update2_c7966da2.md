# Product Requirements Document (PRD) - KantorKu v2.0

## 1. PERAN
Tim senior (product designer, learning designer, game designer, penulis cerita, frontend engineer, QA) yang membangun produk production-ready. 
**Aturan Mutlak:** Dilarang meninggalkan placeholder, TODO, lorem ipsum, atau fitur setengah jadi. Dilarang memangkas cakupan secara diam-diam: jika sesuatu tidak muat, laporkan dan usulkan pemotongan, jangan pura-pura selesai.

---

## 2. KONSEP & PRINSIP PEMBELAJARAN
**Konsep:** Simulasi karier kantor. Pemain mulai dari nol sebagai Magang di perusahaan fiktif "PT Maju Sejahtera" lalu naik sampai Direktur dengan menyelesaikan pekerjaan nyata memakai Excel, Word, dan Coding (Web + JavaScript). Seluruh UI dan konten menggunakan Bahasa Indonesia (nada santai tapi sopan), menargetkan mahasiswa, siswa SMK, fresh graduate, dan pekerja. Siap i18n.

**Prinsip Pembelajaran (Jantung Produk):**
Siklus diajarkan via: Konsep singkat → Contoh dikerjakan (worked example) → Praktik terpandu → Tantangan mandiri → Refleksi.
- **7 Tier (Berlaku untuk semua modul):**
  - T1 Pemula Total (Magang)
  - T2 Dasar (Staf Junior)
  - T3 Menengah (Staf)
  - T4 Mahir (Senior Staf)
  - T5 Profesional (Supervisor)
  - T6 Expert (Manajer)
  - T7 Master (Direktur)
  *Scaffolding memudar: makin tinggi tier, makin sedikit bantuan, makin besar tuntutan penilaian.*

**Mekanisme Adaptif:**
- Tes penempatan adaptif saat onboarding (10-15 soal/modul).
- Skill tree (Baru, Berkembang, Dikuasai, Expert).
- Latihan Penguat & Bantuan Bos gratis jika gagal 3 kali. Lompat Level jika lancar.
- Spaced repetition via "Review Harian" (interval 1-3-7-14-30 hari).
- Buku Catatan Kesalahan otomatis. Tanpa sistem nyawa yang menghukum.

---

## 3. CAKUPAN KONTEN

### A. Excel (Target 40 level + boss)
- **T1-T3:** antarmuka, input data, rumus dasar, SUM, AVERAGE, MIN, MAX, referensi absolut/relatif ($), IF, AND, OR, SUMIF, fungsi teks.
- **T4-T5:** VLOOKUP, XLOOKUP, IFERROR, conditional formatting, validasi data, grafik, pivot table, cleaning data berantakan.
- **T6-T7:** array dinamis (FILTER, SORT, UNIQUE), LET, SUMPRODUCT, perhitungan keuangan (PMT, NPV), audit rumus warisan, optimasi workbook.
*Fitur Editor:* Grid 26x200 buatan sendiri, multi-sheet, formula bar, navigasi keyboard penuh, pesan error ramah Bahasa Indonesia, terima pemisah argumen koma DAN titik koma.

### B. Word untuk Bisnis dan Akademik (Target 48 level + boss + 12 Case File)
*Setiap level menghasilkan dokumen nyata dengan 5 Skala Dokumen: Mikro/UMKM, Kecil, Menengah, Besar/Korporat, Akademik.*
- **T1-T3:** ketik/format dasar, surat resmi, CV, laporan penjualan, makalah 1 bab, Heading, Style, tabel, gambar + caption.
- **T4-T5:** laporan bisnis lengkap, laporan PKL, proposal bisnis/penelitian Bab 1-3, daftar isi otomatis, section break, template kustom, footnote.
- **T6-T7:** business plan lengkap, studi kelayakan, annual report, skripsi utuh, mail merge, track changes, review dokumen.
*Fitur Editor TipTap Diperluas:* Tabel advance, daftar pustaka otomatis, watermark, pratinjau A4 berpaginasi. Preset akademik Indonesia sebagai default (A4, TNR 12, spasi 1.5). Export ke .docx dan PDF.

### C. Coding: Dua Track (Web + JavaScript)
*Pemain bebas mulai dari Web atau JS. Keduanya bertemu di Tier 6 via DOM Manipulation.*
- **Track Web (HTML + CSS) - 24 Level + Boss:** struktur halaman, semantik, CSS dasar, Flexbox, media query, Grid, validasi form, aksesibilitas, komponen reusable, proyek multi-halaman siap deploy. (Editor: CodeMirror 6 dengan live preview iframe sandbox).
- **Track JavaScript - 36 Level + Boss:** variabel, if/else, loop, array/object methods, async/fetch API, algoritma, refactoring, manipulasi DOM (dari Track Web), TDD, rancang mini-sistem. (Eksekusi di Web Worker, timeout 3 detik).

---

## 4. SISTEM DIALOG DAN CERITA
- **Prinsip:** Dialog melayani pembelajaran. Pendek (maks 3 kalimat/balon), bahasa Indonesia kantor natural, humor ringan.
- **Karakter Utama:** Bu Sari (Atasan), Dimas (Rekan ceria/sering salah), Maya (HR), Kak Intan (Mentor IT), Pak Reza (Finance), Pak Hendra (Auditor/Klien sulit).
- **Struktur & Dinamika:** Pembuka → Permintaan → Kendala → Aksi Pemain → Reaksi → Penutup. Reaksi bervariasi bergantung performa (bintang 1-3, hint, kecepatan).
- **Percabangan & Etika:** 3 tipe pilihan (Komunikasi, Prioritas, Etika). Pilihan tidak memblokir progres belajar tapi berdampak pada Reputasi tokoh.
- **Presentasi:** Potret SVG 7 ekspresi, riwayat dialog, aksesibilitas screen reader, tanpa auto-lanjut wajib.

---

## 5. ENGINE KASUS NYATA v2
- **Siklus Kasus:** Brief (via Email/WA/Voice note/Nota) → Klarifikasi → Kerjakan → Cek Mandiri → Review → Revisi → Serah Terima → Debrief.
- **Dinamika:** 2-4 pihak dengan kepentingan bertentangan, informasi tidak sempurna, data berantakan. Pemain dinilai dari cara bertanya dan asumsi.
- **Scope Change:** Perubahan permintaan di tengah jalan (mulai Tier 4). Tenggat waktu menggunakan jam in-game.
- **Serah Terima & Debrief:** Tulis pesan ringkasan serah terima. Catatan Mentor disimpan di Portofolio pemain.
- **Katalog:** 30 Case File (12 Word, 8 Web, 10 Excel/Campuran) dengan modifier kesulitan (Tenggat Ketat, Klien Rewel). Semua memakai generator seed.

---

## 6. MODE GAME & GAMIFIKASI
**12 Mode Game:** Karier, Kasus Nyata, Latihan Bebas (Sandbox), Tantangan Harian, Kilat, Detektif, Ujian/Sertifikasi, Duel Asinkron, Mentor, Kreator Level, Zen, Event Mingguan.
**Sistem Reward:** XP, level jabatan, koin, streak freeze. Minimal 55 Achievement. Toko Kosmetik, Portofolio (.zip/.html/.docx/.pdf/.xlsx), Sertifikat PDF per track.

---

## 7. SISTEM VALIDASI
- **Excel:** Cek nilai sel (toleransi desimal), regex formula wajib, mutation test (anti hardcode). T5+ cek kerapian & efisiensi.
- **Word:** Cek struktur JSON, checklist elemen wajib, kualitas (Style), kesesuaian standar dokumen (margin/font).
- **Web (HTML/CSS):** Parse DOM, cek semantik, computed CSS di iframe, uji responsif di lebar 360px & 1024px.
- **JavaScript:** Eksekusi sandbox Web Worker, test case visible+hidden, cek duplikasi/kompleksitas.
*Semua validator memberikan umpan balik spesifik per dimensi (Benar, Efisien, Rapi, Mudah Dirawat, Kesesuaian Standar/Komunikasi).*

---

## 8. PUSAT PENGATURAN & PROFIL (ARSITEKTUR BARU)
Sistem pengaturan bersifat sentralistik, persisten, dan di-generate secara otomatis tanpa ada pengaturan "siluman" di luar registry. Dilarang menggunakan *dark pattern* (opsi privasi disembunyikan, dll).

### A. Arsitektur Pengaturan
- **Registry Tunggal:** Semua pengaturan didefinisikan di `src/features/settings/registry.ts` menggunakan tipe `SettingDef` (key, section, label, type, default, scope, applies, dependsOn, dll). UI, pencarian, validasi, dan export/import dibangkitkan otomatis.
- **Cakupan (Scope):** `device` (berlaku seluruh perangkat) dan `profile` (berlaku per profil pengguna).
- **Teknis:** Disimpan via `SettingsRepository` dengan schema Zod. Perubahan diterapkan instan via CSS variables/data attributes, tersinkron antar tab via `BroadcastChannel`, dan memunculkan snackbar "Batalkan" (5 detik).
- **UI:** Pratinjau visual langsung. Label "Diubah dari bawaan", tombol reset per item/bagian, fungsi pencarian dengan sinonim, dan Panel Pengaturan Cepat di Layar Misi. Preset 1-klik (Pemula Santai, Fokus Belajar, Tantangan Penuh, Hemat Daya).

### B. Daftar Pengaturan (16 Kategori)
1. **Profil & Akun:** Nama, tujuan belajar, avatar, privasi leaderboard. Profil ganda lokal (maks 5) dengan PIN opsional (hash WebCrypto).
2. **Tampilan:** Tema, palet warna, kepadatan UI, ukuran font UI, animasi, potret tokoh.
3. **Suara & Getar:** Volume utama, SFX, musik, suara dialog, getar, bisukan di background.
4. **Bahasa & Wilayah:** Bahasa (ID), format angka/mata uang, tanggal, zona waktu.
5. **Pembelajaran:** Mode adaptif, Review Harian, target harian, auto-pembeku streak, opsi Hint & Solusi, auto-cek di sandbox, Timer (dengan pengali waktu), mode Zen.
6. **Cerita & Dialog:** Kecepatan teks, lewati cutscene, riwayat dialog, opsi misi dilema etika.
7. **Editor Excel:** Pemisah argumen, garis kisi, ukuran font sel, autocomplete fungsi, sorot sel acuan, auto-save.
8. **Editor Word:** Font bawaan, preset margin, ukuran kertas, satuan, tampilkan penggaris/simbol format, auto-save.
9. **Editor Kode:** Font, tema editor, ukuran tab, auto-close bracket, format otomatis. Jeda pratinjau Web (ms). Konsol timeout (maks 5s), terjemahan pesan error.
10. **Notifikasi:** Pengingat belajar/streak, jam tenang, banner in-app. Penjelasan limitasi push-notification lokal tanpa server.
11. **Aksesibilitas:** Kontras tinggi, palet buta warna, cincin fokus, pengali waktu, mode screen reader (ringkas/lengkap), teks dialog besar.
12. **Performa:** Mode hemat daya, kualitas animasi, unduh untuk offline, kelola cache/storage API.
13. **Data & Privasi:** Export/Import JSON (validasi schema), cadangan otomatis lokal mingguan, reset bertingkat (pengaturan, modul, full hapus dengan ketik "HAPUS"), statistik lokal (opt-in).
14. **Mode Kelas:** Impor JSON dari dosen (kunci hint, atur tenggat), export Laporan Hasil.
15. **Pintasan Keyboard:** Deteksi bentrok, rebindable penuh (Ctrl+Enter, F2, Esc, dll). Export PDF cheat sheet.
16. **Lanjutan & Bantuan:** Mode Uji (tap versi beruntun), catatan perubahan, info lisensi, laporkan masalah, bersihkan Service Worker.

---

## 9. FORMAT DATA & TECH STACK
- **Tech Stack:** React + Vite + TypeScript (strict), Tailwind CSS, Zustand, Framer Motion, React Router, CodeMirror 6, TipTap, Zod, Vitest, Playwright.
- **Export Libs:** SheetJS, docx, jsPDF, JSZip (Semua lisensi permisif/MIT).
- **Arsitektur:** Offline-first (IndexedDB, PWA), arsitektur repository pattern (tanpa backend). Akses data terpusat (`ProgressRepository`, `SettingsRepository`, dll).
- **Schema Data:** Divalidasi ketat dengan Zod (Level, CaseFile, Scene, Line, SettingDef). Level memiliki field: `track`, `scale`, `docType`, `templateId`.

---

## 10. CARA KERJA (FASE KERJA)
- **Fase 1:** Fondasi (setup, routing, repo, design system, skill tree, gamifikasi inti, story engine, schema dialog). Infrastruktur `registry.ts` Pengaturan (Tampilan, Suara, Bahasa, Privasi, Aksesibilitas, Pengaturan Cepat).
- **Fase 2:** Modul Excel Tier 1-3 + editor + validator + Pengaturan editor Excel.
- **Fase 3:** Modul Coding (Web + JavaScript) Tier 1-3 + Pengaturan editor Kode.
- **Fase 4:** Modul Word Bisnis & Akademik Tier 1-3 + Template Library + Pengaturan editor Word.
- **Fase 5:** Sistem adaptif (onboarding, remedial, review harian, buku kesalahan), Mode Sandbox, Harian, Kilat, Zen + Pengaturan Pembelajaran.
- **Fase 6:** Engine Kasus Nyata v2 + generator data + Case File T3-5.
- **Fase 7:** Tier 4-7 untuk semua modul dan track, Case File T6-7, Mode Detektif, Mentor, Ujian.
- **Fase 8:** Mode Kelas, Profil Ganda dengan PIN, Cadangan Otomatis, Lanjutan. Duel, Kreator Level, Portofolio & Export, Event Mingguan, Toko, PWA.
- **Fase 9:** Polish, aksesibilitas, performa, QA menyeluruh.

---

## 11. DEFINITION OF DONE (DoD)
1. `npm run build` dan `npm test` lulus tanpa error/warning.
2. `npm run content:report` (script linter dialog) lulus tanpa warning. Tidak ada baris obrolan berulang berlebih & bot mampu menembus semua cabang cerita.
3. Semua level dan Case File dapat diselesaikan dengan solusi referensi. Hardcode/jawaban salah pasti gagal divalidasi.
4. **Export Word:** Dokumen .docx/PDF bisa dibuka utuh di MS Word/LibreOffice.
5. **Web Responsif:** Kode web berjalan sempurna di viewport 360px & desktop.
6. **Pengaturan:** Setiap pengaturan di registry memiliki efek teruji (berfungsi, bukan sekadar UI), bertahan setelah refresh, dan Pusat Pengaturan lulus audit aksesibilitas (kontras, screen reader, urutan fokus).
7. **Privasi & Performa:** Tidak ada data yang keluar dari perangkat tanpa persetujuan eksplisit. Lighthouse score (performance & a11y) minimal 90.
8. Tidak ada konten placeholder, tidak ada kebocoran data entitas/merek dunia nyata.