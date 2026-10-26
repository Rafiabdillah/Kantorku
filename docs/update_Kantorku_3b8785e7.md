# Product Requirements Document (PRD) - KantorKu v2.0

## 1. PERAN
Tim senior (product designer, learning designer, game designer, penulis cerita, frontend engineer, QA) yang membangun produk production-ready. 
**Aturan Mutlak:** Dilarang meninggalkan placeholder, TODO, lorem ipsum, atau fitur setengah jadi. Dilarang memangkas cakupan secara diam-diam: jika sesuatu tidak muat, laporkan dan usulkan pemotongan, jangan pura-pura selesai.

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
- **T1:** antarmuka, input data, format Rupiah/persen/tanggal, rumus dasar (+ - * /), SUM, AVERAGE.
- **T2:** MIN, MAX, COUNT, COUNTA, referensi absolut/relatif ($), fill handle, ROUND, sort/filter.
- **T3:** IF, AND, OR, COUNTIF, SUMIF, AVERAGEIF, fungsi teks.
- **T4:** VLOOKUP, XLOOKUP, INDEX-MATCH, IFERROR, fungsi tanggal, conditional formatting, validasi data, grafik.
- **T5:** pivot table, cleaning data berantakan, SUMIFS/COUNTIFS, nested IF/IFS, laporan multi-sheet.
- **T6:** array dinamis (FILTER, SORT, UNIQUE), LET, SUMPRODUCT, PMT, NPV, depresiasi, dashboard interaktif.
- **T7:** model keuangan utuh, audit rumus warisan, optimasi workbook.
*Fitur Editor:* Grid 26x200 buatan sendiri, multi-sheet, formula bar, navigasi keyboard penuh, pesan error ramah Bahasa Indonesia.

### B. Word untuk Bisnis dan Akademik (Target 48 level + boss + 12 Case File)
*Setiap level menghasilkan dokumen nyata (data fiktif tapi realistis: PPN 11%, Rupiah, format Indonesia).*
- **5 Skala Dokumen:** Mikro/UMKM, Kecil, Menengah, Besar/Korporat, Akademik.
- **T1 Pemula:** ketik & format dasar via dokumen mikro (nota, daftar harga, surat penawaran sederhana).
- **T2 Dasar:** surat resmi, CV, undangan, pengumuman, bullet/numbering, tabel sederhana.
- **T3 Menengah:** laporan penjualan, surat penawaran, notulen, makalah 1 bab. Heading, Style, tabel, gambar + caption.
- **T4 Mahir:** laporan bisnis lengkap (cover, daftar isi, bab, grafik Excel), laporan PKL, proposal kegiatan. Section, page number romawi/angka.
- **T5 Profesional:** proposal bisnis, business plan, SOP, company profile, proposal penelitian Bab 1-3. Template kustom, cross-reference, footnote.
- **T6 Expert:** business plan lengkap, studi kelayakan, proposal tender, laporan audit. Mail merge, track changes, standar sitasi (APA/Harvard).
- **T7 Master:** annual report, handbook kebijakan, skripsi utuh. Style guide perusahaan, review dokumen orang lain.
*Fitur Editor TipTap Diperluas:* Heading/style kustom, tabel advance, otomatisasi daftar isi/tabel/gambar, footnote, section break, watermark, pratinjau A4 berpaginasi. Preset akademik Indonesia sebagai default (A4, TNR 12, spasi 1.5, margin 4-3-3-3). Export ke .docx dan PDF.

### C. Coding: Dua Track (Web + JavaScript)
Pemain bebas mulai dari Web atau JS. Bertemu di Tier 6 via DOM Manipulation.
**Track Web (HTML + CSS) - 24 Level + Boss:**
- **T1:** struktur halaman, tag dasar, link, gambar, alt.
- **T2:** list, tabel, form, elemen semantik (header, main, footer).
- **T3:** CSS dasar (selector, warna, box model).
- **T4:** Flexbox, media query (responsive), navigasi.
- **T5:** CSS Grid, validasi HTML form, aksesibilitas, landing page.
- **T6:** CSS variables, komponen reusable, animasi, SEO dasar, JS DOM dasar.
- **T7:** proyek multi-halaman siap deploy (website UMKM, portofolio).
*Fitur Editor:* CodeMirror 6, live preview iframe tersandbox, toggle viewport mobile/tablet/desktop.

**Track JavaScript - 36 Level + Boss:**
- **T1-T4:** variabel, tipe data, if/else, loop, array/object methods (map, filter).
- **T5:** struktur data (Map, Set), async/fetch API tiruan.
- **T6-T7:** algoritma, refactoring, manipulasi DOM dari Track Web, TDD, rancang mini-sistem. Eksekusi di Web Worker (timeout 3 detik).

---

## 4. SISTEM DIALOG DAN CERITA
- **Prinsip:** Dialog melayani pembelajaran (konteks kerja). Pendek (maks 3 kalimat/balon), bahasa Indonesia kantor natural, humor ringan tanpa stereotip.
- **Karakter (Character Bible):** 
  - Bu Sari (Atasan tegas/adil)
  - Dimas (Rekan ceria/sering salah)
  - Maya (HR empatik)
  - Kak Intan (Mentor IT sabar)
  - Pak Reza (Finance perfeksionis)
  - Pak Hendra (Auditor/Klien sulit)
- **Struktur Adegan:** Pembuka → Permintaan → Kendala → Aksi Pemain → Reaksi → Penutup.
- **Dialog Dinamis:** Reaksi bervariasi tergantung performa (bintang 1-3, pakai hint, cepat/lambat, dsb).
- **Percabangan & Etika:** 3 tipe pilihan (Komunikasi, Prioritas, Etika). Pilihan etika memengaruhi Reputasi tapi tidak memblokir progres. 
- **Presentasi:** Potret SVG 7 ekspresi, log riwayat dialog, aksesibilitas screen reader, tutorial UI (coach mark) oleh tokoh.

---

## 5. ENGINE KASUS NYATA v2
- **Siklus Kasus:** Brief → Klarifikasi → Kerjakan → Cek Mandiri → Review → Revisi → Serah Terima → Debrief.
- **Dinamika:** Melibatkan 2-4 pihak dengan kepentingan bertentangan. Kanal brief berupa Email, WhatsApp, transcript voice note, atau nota tulis tangan.
- **Informasi Tidak Sempurna:** Pemain diuji cara bertanya dan mencatat asumsi jika brief/data kurang jelas.
- **Scope Change:** Perubahan permintaan di tengah jalan (mulai T4). Tenggat waktu menggunakan jam in-game.
- **Penilaian (Rubrik 5 Dimensi):** Benar, Efisien, Rapi, Mudah Dirawat, Komunikasi.
- **Serah Terima & Debrief:** Tulis pesan ringkasan serah terima. Debrief "Catatan Mentor" disimpan di Portofolio.
- **Katalog:** 30 Case File (12 Word, 8 Web, 10 Excel/Campuran) dengan modifier kesulitan (Tenggat Ketat, Klien Rewel). Data di-generate via seed.

---

## 6. MODE GAME & GAMIFIKASI
**12 Mode:** Karier, Kasus Nyata, Latihan Bebas (Sandbox), Tantangan Harian, Kilat (Time attack), Detektif, Ujian/Sertifikasi, Duel Asinkron, Mentor, Kreator Level, Zen, Event Mingguan.
**Gamifikasi:** XP, level jabatan, koin, streak (dengan freeze).
**Sistem Reward:** Minimal 55 Achievement (Cth: "Penulis Laporan Handal", "Skripsi Rapi"), Toko Kosmetik (avatar, warna IDE), Portofolio exportable, Sertifikat PDF per track.

---

## 7. SISTEM VALIDASI
- **Excel:** Cek nilai sel (toleransi desimal), regex formula wajib, mutation test (anti hardcode). T5+ cek kerapian & efisiensi.
- **Word:** Cek struktur JSON, checklist elemen wajib (misal: ringkasan eksekutif), kualitas (Style), kesesuaian standar dokumen (margin/font).
- **Web (HTML/CSS):** Parse DOM, cek semantik, computed CSS di iframe, uji responsif di lebar 360px & 1024px.
- **JavaScript:** Eksekusi sandbox (Web Worker), test case visible+hidden, cek duplikasi/kompleksitas.
*Semua validator memberikan umpan balik spesifik per dimensi.*

---

## 8. FORMAT DATA & TECH STACK
- **Tech Stack:** React + Vite + TypeScript (strict), Tailwind CSS, Zustand, Framer Motion, React Router, CodeMirror 6, TipTap, Zod, Vitest, Playwright. 
- **Export Libs:** SheetJS, docx, jsPDF, JSZip (Semua lisensi permisif/MIT). 
- **Arsitektur:** Offline-first (IndexedDB, PWA), arsitektur repository pattern (tanpa backend).
- **Format Data Utama:** Divalidasi ketat dengan Zod (Level, CaseFile, Scene, Line, Choice). Setiap level memiliki properti spesifik: `track`, `scale`, `docType`, `templateId`.

---

## 9. CARA KERJA (FASE KERJA)
- **Fase 1:** Fondasi (setup, routing, repo, design system, skill tree, gamifikasi inti, story engine, schema dialog, linter).
- **Fase 2:** Modul Excel Tier 1-3 + editor + validator.
- **Fase 3:** Modul Coding (Web + JavaScript) Tier 1-3.
- **Fase 4:** Modul Word Bisnis & Akademik Tier 1-3 + Template Library awal.
- **Fase 5:** Sistem adaptif (onboarding, remedial, review harian, buku kesalahan), Mode Sandbox, Harian, Kilat, Zen.
- **Fase 6:** Engine Kasus Nyata v2 + generator data + Case File T3-5.
- **Fase 7:** Tier 4-7 untuk semua modul dan track, Case File T6-7, Mode Detektif, Mentor, Ujian.
- **Fase 8:** Duel, Kreator Level, Portofolio & Export (.zip/.html/.docx/.pdf/.xlsx), Event Mingguan, Toko, PWA.
- **Fase 9:** Polish, Aksesibilitas, Performa, QA menyeluruh.

---

## 10. DEFINITION OF DONE (DoD)
1. `npm run build` dan `npm test` lulus tanpa error.
2. `npm run content:report` (script linter dialog) lulus tanpa warning. Tidak ada baris obrolan berulang berlebih & bot mampu menembus semua cabang cerita.
3. Semua level dan Case File dapat diselesaikan dengan solusi referensi. Hardcode/jawaban salah pasti gagal divalidasi.
4. **Export Word:** Dokumen .docx/PDF bisa dibuka utuh di MS Word/LibreOffice.
5. **Web Responsif:** Kode web berjalan sempurna di viewport 360px & desktop.
6. Performa Lighthouse & Aksesibilitas minimal skor 90.
7. Tidak ada kebocoran data (template & data fiktif 100% aman dari entitas nyata).