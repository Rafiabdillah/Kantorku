# PATCH PERBAIKAN KantorKu v1 (dari hasil review kode)

Aplikasi sudah punya kerangka dan tampilan yang bagus, tapi isinya baru sekitar 10% dari PRD dan ada beberapa bug nyata. Kerjakan BERURUTAN P0 → P1 → P2 → P3. Setelah P0 dan P1 selesai, BERHENTI dan laporkan hasilnya sebelum lanjut. Jangan menambah fitur baru di luar daftar ini.

## ATURAN KERJA (wajib)
1. Jangan menyatakan sesuatu "selesai" sebelum kriteria selesainya terbukti lewat perintah yang kamu jalankan sendiri. Tulis hasil perintahnya di laporan.
2. Setelah setiap bagian, jalankan: `npm run lint`, `npm test`, `npm run build`. Ketiganya harus lulus tanpa error.
3. Laporan akhir tiap tahap berisi tabel: item | status (selesai / sebagian / belum) | bukti. Jika ada yang tidak jadi dikerjakan, tulis alasannya. Dilarang memangkas cakupan diam-diam.
4. Teks di UI tidak boleh menjanjikan lebih dari isi sebenarnya (hitung angka dari data, jangan ditulis manual).

---

## P0. BUG YANG MERUSAK

### P0.1 Crash di "Catatan Saya" (Pusat Belajar)
- **Masalah:** `src/features/learning/components/LearningCenterView.tsx` baris sekitar 780 memakai ikon `FileDown` yang belum di-import dari lucide-react. Membuka tab "Catatan Saya" membuat seluruh layar putih (ReferenceError).
- **Perbaikan:** Perbaiki import. Lalu jalankan `npm run lint` (tsc --noEmit) dan perbaiki SEMUA error tipe, bukan hanya yang satu ini.
- **Tugas Tambahan:** Tambahkan `ErrorBoundary` (komponen kelas React) yang membungkus: tiap tampilan utama di App.tsx, MissionPlayView, CaseFileView, LearningCenterView, dan tiap editor. Isi fallback: pesan ramah Bahasa Indonesia, tombol "Coba Lagi" dan "Kembali ke Kantor". Error tercatat di console dan di Buku Catatan Kesalahan sistem (bukan milik pemain). Progres tidak boleh hilang.
- **Kriteria Selesai:** Tab Catatan Saya terbuka normal, dan error yang sengaja dilempar di satu tampilan tidak mengosongkan seluruh aplikasi.

### P0.2 Eksekusi kode pemain tidak aman
- **Masalah:** `src/engine/codeSandbox.ts` memakai `new Function` di thread utama. Kode `while(true){}` membuat tab macet. Kode pemain juga bisa mengakses `window`, `localStorage`, dan menghapus progres. Variabel `functionNameToTest` disisipkan ke string kode tanpa validasi.
- **Perbaikan:** Jalankan kode pemain di **Web Worker** (dibuat dari Blob), dengan:
  - Timeout 3 detik (maksimal 5 detik): bila lewat, `worker.terminate()` dan tampilkan pesan ramah "Kodemu berjalan terlalu lama, cek apakah ada loop yang tidak berhenti".
  - Tidak ada akses ke DOM, localStorage, atau penyimpanan aplikasi.
  - Console ditangkap dan dikirim balik lewat postMessage, batasi output maksimal 200 baris dan 20 KB.
  - Nama fungsi divalidasi dengan regex `^[A-Za-z_$][\w$]*$` sebelum dipakai.
  - Hasil tes tetap sama formatnya (visible dan hidden test, pesan error diterjemahkan).
  - `runCodeWithTests` tetap menjadi satu-satunya pintu masuk.
- **Tugas Tambahan:** Terapkan hal yang sama untuk skrip JavaScript di Track Web yang memanipulasi DOM: jalan di iframe `sandbox="allow-scripts"` tanpa `allow-same-origin`, dengan batas waktu.
- **Testing:** Tambahkan test (di engine.test.ts atau berkas baru) untuk: loop tak berujung (harus selesai dengan pesan timeout), akses `localStorage` dari kode pemain (harus gagal), rekursi tak berujung, dan nama fungsi berbahaya. Sediakan adapter agar test bisa memakai `worker_threads` di Node dan `Worker` di browser.
- **Kriteria Selesai:** Semua test baru lulus dan loop tak berujung kembali dalam sekitar 3 detik.

### P0.3 Checklist "Target Pekerjaan" selalu centang hijau
- **Masalah:** `src/components/mission/MissionPlayView.tsx` baris sekitar 415 selalu menampilkan `CheckCircle2` hijau untuk semua tujuan, bahkan sebelum pemain mengerjakan apa pun.
- **Perbaikan:** Tiap tujuan punya status nyata (belum / terpenuhi / gagal), dihitung dari hasil validator per kriteria (`details` pada ValidationResult) setiap kali pemain menekan Cek. Sebelum dicek, tampilkan lingkaran kosong. Setelah dicek, tampilkan centang hijau atau tanda silang merah beserta pesan singkat dari validator.
- **Kriteria Selesai:** Misi yang baru dibuka menampilkan semua tujuan belum tercentang, dan hasilnya berubah sesuai jawaban pemain (uji dengan jawaban benar dan salah).

---

## P1. KEBERSIHAN PROYEK

### P1.1 Dependensi dan instalasi
- `npm install` gagal karena `esbuild@^0.25` bentrok dengan peer vite 8. Hapus `esbuild` dari devDependencies atau naikkan ke versi yang sesuai. `npm install` biasa harus berhasil di folder bersih.
- Hapus dependensi yang tidak dipakai: `@google/genai`, `express`, `@types/express`, `dotenv`, dan skrip `clean` yang menyebut `server.js`. Hapus `.env.example` dan bagian GEMINI di README dan metadata.
- Perbaiki peringatan vite config: ganti `__dirname` dengan `import.meta.dirname`.
- Ganti nama paket dari "react-example" menjadi "kantorku". Tulis ulang README (cara install, jalankan, uji, tambah level, tambah Case File).
- Tambahkan skrip `"check": "npm run lint && npm test && npm run build"`.

### P1.2 Folder `public/assets/aistudio/`
- Hapus dari `public/`. Pindahkan dokumen PRD ke folder `docs/` (di luar public). Hapus zip. Hapus `home_autostart.png`, `step2_success.png`, dan folder `.aistudio/artifacts` bila kosong/tidak diperlukan.
- **Kriteria Selesai:** `dist/` tidak memuat berkas .zip atau .md.

### P1.3 Code splitting
- Pisahkan bundel JS lewat `React.lazy` dan `Suspense` per tampilan (Learning, Cases, Mission, Settings, Detective, Duel, dll) dan konten pelajaran dimuat lazy per modul. Target: bundel awal di bawah 400 KB (tampilkan angkanya di laporan).

### P1.4 Tampilan mobile
- Perbaiki elemen penyebab halaman melebar di lebar 390 px (scrollWidth 408) sampai tidak ada scroll horizontal di 360, 390, dan 768 px untuk SEMUA layar.
- Layar Misi dan Kasus Nyata di mobile harus berupa tab (Dialog / Editor / Tugas), sesuai PRD.

### P1.5 Teks yang menyesatkan
- Ganti semua angka yang ditulis manual dengan angka dari data aktual. Sembunyikan atau beri label "Segera Hadir" untuk fitur yang belum ada, jangan tampilkan sebagai tombol aktif yang membuka layar kosong.

### P1.6 Tes asap (smoke test)
- Pasang Playwright sebagai devDependency. Buat `tests/e2e/smoke.spec.ts` yang: membuka aplikasi, menyelesaikan onboarding, mengunjungi SETIAP layar dan SETIAP tab, dan gagal bila terjadi `pageerror` atau `console.error`. Tambahkan uji mobile 390 px tanpa scroll horizontal.
- Tambahkan skrip `"test:e2e"`. Wajib dijalankan dan lulus sebelum laporan P1 dikirim.

---

## P2. EDITOR DAN PENGALAMAN DASAR

### P2.1 Editor Excel
- Terapkan grid 26 kolom x 200 baris dengan virtualisasi, scroll mulus, header menempel, lebar kolom bisa diseret dan auto-fit, dan angka tidak terpotong (tampilkan "####" bila tidak muat, atau lebarkan otomatis).
- Pastikan ada: seleksi rentang, fill handle, salin/tempel, urungkan/ulang (Ctrl+Z/Y), F2 untuk edit, Tab/Enter untuk pindah sel. Lengkapi yang belum, tulis daftarnya di laporan.

### P2.2 Editor Word
- Ganti `contentEditable` + `document.execCommand` dengan **TipTap**. Pertahankan toolbar yang ada. Validator di `wordValidator.ts` menyesuaikan agar membaca struktur JSON TipTap. Pindahkan test yang ada agar tetap lulus.

### P2.3 Editor kode dan Web
- Ganti `textarea` dengan **CodeMirror 6** (mode JavaScript, HTML, CSS): nomor baris, sorot sintaks, tutup kurung otomatis, indentasi. Hubungkan ke pengaturan editor yang sudah ada.

### P2.4 Onboarding
- Jadikan onboarding sebagai gerbang saat peluncuran pertama. Tambahkan pilihan avatar dan tampilkan hasil tes penempatan beserta alasannya sebelum mulai.

---

## P3. ISI KONTEN (inti produk, dikerjakan per batch)

### P3.0 Alat audit konten
- Buat `scripts/contentAudit.ts` (`npm run content:audit`) yang mencetak tabel JUJUR: jumlah aktual vs target per modul dan tier.
- Skrip memeriksa setiap level punya: 3 hint, solusi referensi, commonMistakes, dialog pembuka/penutup, minimal satu pelajaran terhubung, dan pada Excel punya mutation test. Skrip gagal (exit code 1) bila ada level yang tidak lengkap.

### Target per Batch
*Keadaan sekarang: 12 level (tier 1-4, tanpa boss), 3 Case File, 39 pelajaran, 14 istilah glosarium.*

- **Batch A (Excel Tier 1-3 tuntas):** 15 level + 3 boss, 30 pelajaran Excel, 6 Case File Excel, semua dengan data seed dan jebakan data. Dialog dan reaksi performa untuk 4 tokoh utama.
- **Batch B (Track Web & JavaScript Tier 1-3):** Web: 10 level + 1 boss. JavaScript: 12 level + 1 boss. Validator Web memakai iframe sandbox dan uji lebar 360/1024 px.
- **Batch C (Word Bisnis & Akademik Tier 1-3):** 16 level + 1 boss, dokumen nyata, template library awal (minimal 10), 4 Case File dokumen.
- **Batch D:** Tier 4-7, boss akhir lintas modul, sisa Case File, ekspor .xlsx/.docx/PDF, PWA.

*Catatan: Kerjakan satu batch pada satu waktu. Setelah tiap batch: jalankan `content:audit`, `check`, dan `test:e2e`, mainkan SEMUA level baru, lalu kirim laporan. Tunggu persetujuan sebelum batch berikutnya.*

---

## DEFINITION OF DONE (setiap tahap)
- `npm install` bersih, `npm run check`, dan `npm run test:e2e` lulus tanpa error.
- Tidak ada `pageerror` atau `console.error` di semua layar, desktop dan mobile.
- Tidak ada teks UI yang menjanjikan fitur atau jumlah konten yang belum ada.
- Laporan berisi tabel status dengan bukti perintah, bukan klaim.