# KantorKu

KantorKu adalah game simulasi karier kantor berbasis web untuk berlatih keterampilan profesional Indonesia. Proyek ini menyediakan 17 domain keterampilan, pembelajaran, kuis analitis, simulasi situasional, editor praktik, studi kasus, dan sistem kesiapan peran.

## Fitur

- 17 domain aktif, meliputi spreadsheet, dokumen, presentasi, SQL, keamanan digital, SDM, pemasaran, bahasa Inggris bisnis, desain aksesibel, dan kepatuhan dasar.
- Peta keterampilan, tingkat penguasaan, peta karier, dan 16 jalur peran.
- Pusat belajar dengan pelajaran, contekan, kasus nyata, dan kuis berseed.
- Praktik melalui editor email, simulasi, kuis analitis, editor SQL lokal, dan kalkulasi WCAG.
- Penyimpanan kemajuan melalui Zustand persist, dukungan PWA, dan antarmuka responsif.
- Halaman **Tentang & Sumber** untuk melihat rujukan per domain dan batas klaim konten.

## Prasyarat

- Windows 10/11
- Node.js **22.5 atau lebih baru**
- npm yang menyertakan `package-lock.json`
- PowerShell atau Terminal Windows

Periksa versi Node:

```powershell
node --version
npm --version
```

## Menjalankan di Windows

Instal dependensi persis dari lockfile:

```powershell
npm ci
```

Jalankan aplikasi pengembangan:

```powershell
npm run dev
```

Secara bawaan aplikasi tersedia pada `http://localhost:3000`.

## Pasang sebagai Aplikasi

### Windows

Unduh installer Windows `.exe` dari GitHub Release terbaru:

https://github.com/Rafiabdillah/Kantorku/releases/latest

- Installer satu klik: `KantorKu-Setup.exe`
- Versi portable: `KantorKu-Portable-*.exe`

Versi EXE tidak memerlukan Node.js, npm, browser khusus, atau terminal.

Versi online dapat dipasang tanpa mengunduh berkas instalasi:

- Panduan pemasangan khusus: https://rafiabdillah.github.io/Kantorku/install.html
- Panduan lengkap repo: [INSTALL.md](./INSTALL.md)

- Buka `https://rafiabdillah.github.io/Kantorku/` dengan Chrome atau Edge.
- Klik **Pasang Aplikasi** pada navigasi atas, atau pilih **Pasang aplikasi / Tambah ke layar utama** dari menu browser.
- Setelah pemasangan, KantorKu dapat dibuka dari ikon aplikasi dan kemajuan tetap tersimpan di perangkat.

iPhone/iPad:

1. Buka situs melalui Safari.
2. Ketuk **Bagikan**.
3. Pilih **Tambah ke Layar Utama**.

## Browser dan E2E

Pasang Chromium Playwright sekali pada mesin pengembangan:

```powershell
npx playwright install chromium
```

Jalankan seluruh pemeriksaan proyek:

```powershell
npm run check
```

Perintah pemeriksaan terpisah:

```powershell
npm run lint
npm test
npm run skills:audit
npm run test:e2e
npm run build
```

Untuk menjalankan satu berkas E2E:

```powershell
npx playwright test tests/e2e/skills-s0.spec.ts
```

## Struktur Proyek

```text
src/
  App.tsx                 # Shell aplikasi dan routing tampilan
  components/             # Komponen UI, mesin latihan, dan navigasi
  content/skills/         # Paket konten dan manifest domain
  features/learning/      # Modul pusat belajar
  store/useGameStore.ts   # State, kemajuan, mastery, dan persistensi
  tests/                  # Unit dan audit konten Node.js
tests/e2e/                # E2E Playwright
scripts/                  # Audit dan laporan konten
public/                   # Aset PWA dan ikon
.github/workflows/        # CI dan deployment GitHub Pages
```

## Menambah Domain Baru

1. Tambahkan domain baru ke `DOMAIN_IDS` dan metadata `DOMAIN_CATALOG` di `src/types/skills.ts`.
2. Buat paket di `src/content/skills/dXX-nama-domain/` berisi:
   - `skills.ts`
   - `lessons.ts`
   - `levels.ts`
   - `quizzes.ts`
   - `cheatsheet.ts`
   - `cases.ts`
   - `manifest.ts` bila pola domain membutuhkan manifest terpisah.
3. Daftarkan skill dan manifest pada `src/content/skills/index.ts`.
4. Pasangkan level latihan dengan `skillId`, ambang lulus, dan engine yang valid.
5. Tambahkan minimal tiga pelajaran, empat level, sepuluh kuis berseed, satu kasus, serta dua sumber terverifikasi per skill. Gunakan judul dan penerbit atau indikator “belum ada rujukan terverifikasi” bila tautan tidak dapat dipastikan.
6. Tambahkan integrasi UI pada `SkillsMapView.tsx` dan pilihan kuis di mesin yang sesuai.
7. Aktifkan domain di katalog hanya setelah:
   - audit skill lulus,
   - tes unit dan E2E lulus,
   - tidak ada draf jawaban benar,
   - semua angka skenario dihitung dari konstanta dan diuji,
   - semua tautan dirujuk secara spesifik dan tidak mengada.
8. Jalankan `npm run check`; laporan harus disimpan atau diperiksa sebelum domain diaktifkan.

## Build dan GitHub Pages

Build produksi:

```powershell
npm run build
```

Output build berada di `dist/`. Workflow GitHub Pages menerapkan base Vite menggunakan nama repositori agar aset dan manifest PWA tetap bekerja pada sub-path GitHub Pages.

## Batas Klaim

Konten KantorKu bersifat edukatif. Aplikasi bukan nasihat hukum, keuangan, medis, pajak, atau profesional pengganti. Pengguna harus memverifikasi aturan aktual dan berkonsultasi dengan profesional yang berwenang untuk keputusan nyata.
