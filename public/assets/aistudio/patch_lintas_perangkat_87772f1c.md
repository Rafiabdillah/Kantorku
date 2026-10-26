# Product Requirements Document (PRD)
**Proyek:** KantorKu v1
**Inisiatif:** Patch Lintas Platform (Windows & Mobile)
**Status:** Perlu Dikerjakan
**Dokumen:** `prd.md`

## 1. Tujuan & Latar Belakang (Objective)
Memastikan aplikasi KantorKu v1 berjalan optimal, mulus, dan nyaman diakses di berbagai platform, khususnya:
1. **Desktop/Windows:** Mendukung Windows 10/11 (Chrome, Edge, Firefox), termasuk kompatibilitas untuk laptop layar sentuh dan penskalaan layar (125-150%).
2. **Mobile:** HP Android dan iPhone, termasuk perangkat kelas menengah ke bawah dengan koneksi internet yang lambat.
3. **PWA (Progressive Web App):** Aplikasi dapat di-install layaknya aplikasi native dan memiliki kemampuan untuk tetap berjalan secara offline.

## 2. Prasyarat (Prerequisites)
- **Patch V1:** Perbaikan prioritas P0 dan P1 sudah diselesaikan dan lulus uji.
- **Dependency Editor:** Jika Editor Word/Kode masih menggunakan elemen dasar (`contentEditable`/`textarea`) dan task P2.2 & P2.3 belum dikerjakan, **wajib mengerjakan P2.2 dan P2.3 terlebih dahulu** sebelum memulai tahap ini untuk menghindari kerja dua kali pada implementasi sentuhan.

## 3. Aturan Kerja & Panduan Eksekusi (Working Rules)
1. **Verifikasi Mandiri:** Semua daftar temuan di bawah ini harus diverifikasi ulang secara manual (menggunakan `grep`, pengukuran, dan run aplikasi) sebelum melakukan perubahan kode. Jika sudah selesai, laporkan dengan status "sudah beres" beserta bukti eksekusinya.
2. **Ukur Sebelum Perbaiki:** Selesaikan tahap **W0 (Pengukuran Awal)** sebelum menyentuh atau mengubah basis kode apa pun.
3. **Laporan Bertahap:** Jangan mengklaim "selesai" tanpa memberikan bukti eksekusi perintah. Setiap tahap harus memiliki laporan berupa tabel: `Item | Status | Bukti`. Jika ada item yang dilewati/tidak dikerjakan, wajib sertakan alasan yang jelas.
4. **Pengecekan Kualitas:** Setelah tiap tahap, jalankan perintah `npm run check` dan `npm run test:e2e`. Keduanya harus **LULUS (PASS)**.
   - Tidak boleh ada `pageerror`.
   - Tidak boleh ada `console.error`.
5. **F