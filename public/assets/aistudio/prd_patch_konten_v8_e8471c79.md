# PRD: Patch Konten v8 - Katalog Kasus Bisnis Lengkap (80 Kasus)

## Tujuan
Memastikan semua latihan terasa seperti pekerjaan bisnis sungguhan, dari tingkat warung sampai korporat, untuk kebutuhan kerja maupun kuliah. Memperluas Engine Kasus Nyata v2 yang **sudah ada** (skema `CaseFile`, `caseFiles.ts`, `CaseFileView.tsx`) tanpa membuat sistem paralel. Memigrasikan 3 kasus lama ke skema baru tanpa kehilangan isinya.

---

## Aturan Kerja
1. **Pemeriksaan Kode:** Periksa kode eksisting terlebih dahulu (bagaimana `CaseFileView` menangani modul selain Excel, penggunaan `scopeChange` dan `module` tunggal). Laporkan apa yang perlu diubah sebelum menulis konten.
2. **Sistem Batch:** Kerjakan per batch (lihat bagian Fase Pengerjaan). Setelah tiap batch **BERHENTI**, kirim laporan tabel (Item | Status | Bukti), dan tunggu persetujuan.
3. **Penanda Fitur Tertunda:** Bila sebuah kasus membutuhkan fitur yang belum ada (pivot, mail merge, NPV/IRR, grafik, track changes, TipTap, dsb.), tandai `requires: [...]` dan atur status menjadi "Segera Hadir". Jangan dipalsukan atau ditampilkan sebagai kasus aktif.
4. **Verifikasi Bukti:** Jangan menyatakan selesai tanpa bukti perintah (`npm run check`, `content:audit`, `test:e2e`). Teks UI tidak boleh menjanjikan jumlah kasus yang belum ada.
5. **Data Fiktif & Realistis:** Semua data FIKTIF namun realistis. Dilarang memakai merek nyata (gunakan istilah "marketplace", "dompet digital", "ekspedisi"), nama orang nyata, atau data pribadi nyata. Tarif dan angka regulasi (PPN, UMK, BPJS, pajak) dijadikan **PARAMETER** yang bisa diubah dengan label "ilustrasi, cek aturan terbaru". Kasus hukum, pajak, dan keuangan wajib diberi penafian "contoh edukasi, bukan nasihat profesional".

---

## Skema `CaseFile` v2
Bidang lama **dipertahankan**: `id`, `title`, `industry`, `tier`, `channel`, `deadlineHours`, `clientName`, `character`, `summary`, `emails`, `chats`, `voiceNotes`, `clarifyingQuestions`, `initialData`, `referenceSolutions`, `reputationReward`, `xpReward`, `coinsReward`, `mentorDebrief`.

**Tambahan Bidang Baru (Validasi Zod):**
*   `code`: (mis. "A2")
*   `scale`: (mikro | kecil | menengah | besar | akademik)
*   `businessFunction`: Fungsi bisnis terkait.
*   `modules[]`: (excel | word | web | js). *Menggantikan `module` tunggal.*
*   `requires[]`: Dependensi fitur.
*   `estimatedMinutes`: Estimasi waktu pengerjaan.
*   `tags[]`: Label kategorisasi.
*   `stakeholders[]`: `{nama, peran, kepentingan, gaya bicara}`. Minimal 2 pihak dengan kepentingan yang bisa bertentangan (Tier 4 ke atas).
*   `timeline[]`: Kejadian terjadwal berdasarkan jam permainan (mis. jam 2 harga bahan naik 20%, jam 3 klien komplain, jam 5 tenggat dimajukan).
*   `attachments[]`: Tipe csv | lembar-excel | foto-nota (tampilan nota tulisan tangan berupa HTML/SVG buatan sendiri, bukan foto) | ekspor-chat | teks-pdf | email-berantai.
*   `dataPack`: `{generatorRef, minimal 3 varian seed, daftar anomali}`.
*   `deliverables[]`: Satu kasus boleh menghasilkan beberapa hasil (excel, word, web, js), masing-masing dengan spesifikasi, validator, elemen wajib, dan `crossChecks[]`.
*   `decisionPoints[]`: Pilihan keputusan bisnis dengan konsekuensi dan trade-off.
*   `scopeChanges[]`: Bentuk jamak; T4 ke atas minimal 1, T6 ke atas hingga 2.
*   `ethicsDilemma?`: Opsional, untuk T4 ke atas.
*   `handover`: Kolom serah terima (ringkasan, asumsi, perhatian, langkah lanjut).
*   `pitfalls[]`: Jebakan data dan logika.
*   `linkedLessons[]`: Tautan ke materi pembelajaran.
*   `templatesUnlocked[]`: Template yang terbuka setelah kasus selesai.
*   `modifiers[]`: Kondisi khusus (Tenggat Ketat, Klien Rewel, Data Super Berantakan, Tanpa Hint).
*   `campaignEffects?`: Efek untuk mode kampanye.
*   `referenceSolutions[]`: Minimal 2 solusi yang sah, dan keduanya **wajib lulus di SEMUA varian seed**.

---

## Anatomi Kasus
*   **Siklus Alur:** Terima brief → Klarifikasi → Kerjakan → Cek mandiri → Review → Revisi → Serah terima → Debrief. 
    *   T1-T2: Versi ringkas (Terima-Kerjakan-Review) durasi < 10 menit. 
    *   T5+: Durasi 40-90 menit.
*   **Realisme Brief:** Brief ditulis seperti manusia sungguhan (email, WhatsApp grup dengan obrolan tak relevan namun ada 1 detail penting terselip, voice note yang ditranskrip, notulen singkat, foto nota tulisan tangan).
*   **Informasi Tidak Lengkap:** Pemain dinilai dari kemampuannya bertanya hal yang tepat (bukan menanyakan yang sudah ada di lampiran), mencatat asumsi, dan menandai data yang bermasalah.
*   **Adegan & Tokoh:** Tiap kasus memiliki adegan pembuka dan penutup, reaksi tokoh terhadap hasil (bintang, hint, kesalahan umum), dengan suara tokoh sesuai *character bible*.
*   **Debrief:** "Catatan Mentor" berisi 5 poin pembelajaran yang tersimpan di Portofolio.

---

## Generator Data & Anomali
*   **Sistem:** Satu generator bersama dengan katalog anomali yang dipilih per kasus.
*   **Katalog Anomali:** Duplikat (nota ganda, pelanggan ganda beda ejaan/nomor HP), typo nama produk & SKU tidak cocok, spasi berlebih, huruf besar-kecil campur, tanggal campur format (dd/mm/yyyy, yyyy-mm-dd, "5 Okt"), angka sebagai teks, harga salah ketik (kelebihan nol), satuan campur, sel kosong, retur bernilai negatif/bertanggal sebelum penjualan, total tidak cocok dengan rincian, data di luar rentang, file versi lama vs baru.
*   **Rotasi Industri (Min. 20 jenis):** Warung, kedai kopi, katering, sayur siap masak antar, laundry, bengkel, konveksi, toko bangunan, apotek, klinik gigi, kos-kosan, agen perjalanan, event organizer, bimbel, toko hewan, toko daring, koperasi, hidroponik, budidaya lele, fotografi, rumah makan, hotel kecil, distributor, pabrik kecil.

---

## Keputusan dan Rekomendasi
Banyak kasus berakhir dengan keputusan bisnis (bukan sekadar menghitung). Pemain mengisi formulir Rekomendasi: pilihan, alasan (pilih angka kunci dari data), risiko, dan langkah lanjut. 
*   **Penilaian:** Rule-based (tanpa AI eksternal) - rekomendasi harus konsisten dengan data, menyebut minimal 2 angka kunci yang benar, 1 risiko, dan mencatat asumsi. 
*   **Sistem Opsi:** Beberapa jawaban sah diterima. Tiap opsi punya trade-off yang dijelaskan di Debrief. Tidak ada pilihan "salah total".

---

## Validator & Cross-Checks
*   **Excel:** Nilai sel dengan toleransi, fungsi wajib, mutation test anti-hardcode, cek pembersihan data, kerapian, efisiensi (T5+).
*   **Word:** Struktur & elemen wajib per jenis dokumen (mis. invoice: nomor, tanggal, pihak, rincian, subtotal, pajak, total, cara bayar), kualitas Style, kesesuaian standar.
*   **Web:** DOM semantik, tautan WA (`https://wa.me/62...`) berformat benar, harga halaman cocok dengan data, uji responsif 360 & 1024 px.
*   **JS:** Test case visible & hidden di Worker sandbox, uji nilai batas (stok nol, diskon 100%, input kosong).
*   **Pemeriksaan Silang (`crossChecks`):** Angka di dokumen Word harus cocok dengan angka di Excel kasus yang sama, total invoice = subtotal + pajak dengan pembulatan konsisten, harga web = harga tabel.
*   **Rubrik:** Benar, Keputusan, Efisien, Rapi, Komunikasi, Mudah dirawat (T5+). Bobot per tier ada di berkas konfigurasi. Etika dicatat sebagai flag (memengaruhi Reputasi, bukan skor).

---

## Katalog 80 Kasus
*(Format: Kode Judul (Tier, skala, modul): hasil kerja. ⚖ = ada dilema etika.)*

### A. Penjualan dan Pelanggan (8)
*   **A1 Rekap Warung Hari Ini** (T1, mikro, Excel): total penjualan harian dari catatan kasir
*   **A2 Sayur Segar Pak Budi** (T3, mikro, Excel+Word): rekap 7 hari dan produk terlaris dari foto nota, ada nota ganda dan harga salah ketik
*   **A3 Promo Bundling** (T3, kecil, Excel): diskon bertingkat dan harga paket ⚖ *(harga coret palsu)*
*   **A4 Komisi Salesman** (T4, kecil, Excel): SUMIFS dan tabel komisi bertingkat, nama salesman beda ejaan
*   **A5 Pelanggan Aktif vs Pasif** (T5, kecil, Excel+Word): segmentasi sederhana dan rekomendasi
*   **A6 Dasbor Marketplace Bulanan** (T5, menengah, Excel): ekspor berantakan, pivot, grafik, 3 temuan
*   **A7 Retur dan Refund** (T4, kecil, Excel): saldo bersih per produk, retur bertanggal janggal
*   **A8 Penagihan Pelanggan Tetap** (T5, menengah, Excel+Word): umur piutang dan surat tagihan massal ⚖ *(pelanggan lama menunggak)*

### B. Keuangan (10)
*   **B1 Buku Kas Kedai** (T2, mikro, Excel): saldo berjalan
*   **B2 HPP dan Harga Jual Katering** (T3, mikro, Excel): bahan, tenaga, overhead, margin target, satuan campur
*   **B3 Laba Rugi Bulanan UMKM** (T3, mikro, Excel+Word): laporan angka dan narasi
*   **B4 Titik Impas Kedai Baru** (T4, kecil, Excel): BEP, skenario harga, grafik
*   **B5 Selisih Seribu Rupiah** (T5, kecil, Excel): rekonsiliasi kas ⚖ *("samakan saja" atau telusuri)*
*   **B6 Anggaran vs Realisasi** (T5, menengah, Excel): varians per departemen dan komentar
*   **B7 Arus Kas 12 Bulan dan Modal Kerja** (T6, menengah, Excel+Word): proyeksi dan skenario
*   **B8 Layak Beli Mesin?** (T6, menengah, Excel+keputusan): NPV, IRR, payback, skenario optimis/pesimis
*   **B9 Aset Tetap dan Penyusutan** (T5, menengah, Excel): garis lurus, daftar aset, nilai buku
*   **B10 Rekap PPN Masukan-Keluaran** (T5, menengah, Excel): tarif sebagai parameter, label edukasi

### C. Stok dan Operasional (9)
*   **C1 Kartu Stok Gudang Kecil** (T2, mikro, Excel): masuk, keluar, saldo
*   **C2 Stok Opname** (T4, kecil, Excel): selisih fisik vs sistem ⚖ *(menyesuaikan angka tanpa penjelasan)*
*   **C3 Kapan Harus Pesan Lagi?** (T5, kecil, Excel): titik pesan ulang & stok pengaman
*   **C4 Pilih Pemasok** (T4, kecil, Excel+keputusan): skor berbobot ⚖ *(pemasok kenalan atasan)*
*   **C5 Ongkir Zona** (T4, kecil, Excel+JS): tabel tarif dan kalkulator ongkir
*   **C6 Barang Kedaluwarsa** (T5, kecil, Excel): urutan FEFO, status per tanggal
*   **C7 Menu Mingguan dan Daftar Belanja** (T4, kecil, Excel): agregasi resep dan porsi
*   **C8 Jadwal Produksi Konveksi** (T5, menengah, Excel): kapasitas, tenggat, prioritas
*   **C9 Gabung Dua Toko** (T6, menengah, Excel): satukan stok, pelanggan ganda, SKU bentrok

### D. SDM (7)
*   **D1 Rekap Absensi** (T3, kecil, Excel): hadir, izin, terlambat
*   **D2 Payroll dan Slip Gaji** (T4, kecil, Excel+Word): lembur, tunjangan, potongan; versi T6 pakai mail merge
*   **D3 Jadwal Shift Kafe** (T4, kecil, Excel): kebutuhan staf per jam, batas jam kerja
*   **D4 Bonus Berbasis KPI** (T5, menengah, Excel+keputusan): bobot, skor, kurva ⚖ *(bonus ke teman)*
*   **D5 Seleksi 40 Pelamar** (T4, kecil, Excel+Word): skor, peringkat, surat ⚖ *(bias)*
*   **D6 Surat Peringatan** (T5, kecil, Word): fakta, bahasa tepat, prosedur ⚖
*   **D7 Deskripsi Jabatan dan Struktur Organisasi** (T4, kecil, Word): JD dan bagan dalam tabel

### E. Pemasaran (7)
*   **E1 Kalender Konten Sebulan** (T3, mikro, Excel+Word)
*   **E2 ROI Kanal Promosi** (T4, kecil, Excel): biaya vs penjualan per kanal, atribusi ganda
*   **E3 Menu Digital dengan Tombol WhatsApp** (T3, mikro, Web)
*   **E4 Landing Page Katering Bu Ratna** (T5, kecil, Web): tombol WA, foto, harga, revisi warna
*   **E5 Survei Kepuasan dan NPS** (T5, kecil, Excel+Word): 100 respons berantakan dan rekomendasi
*   **E6 Riset Pesaing dan SWOT** (T5, kecil, Word+Excel)
*   **E7 Panduan Merek dan Template Dokumen** (T6, menengah, Word): style kustom

### F. Dokumen dan Administrasi (17)
*   **F1 Nota dan Kwitansi** (T1, mikro, Word)
*   **F2 Surat Penawaran Harga** (T2, mikro, Word)
*   **F3 Invoice Berseri** (T3, kecil, Word+Excel): penomoran, pajak sebagai parameter
*   **F4 Undangan Rapat dan Pengumuman** (T2, kecil, Word)
*   **F5 Notulen dan Tindak Lanjut** (T3, kecil, Word)
*   **F6 SOP Pelayanan atau Dapur** (T4, kecil, Word)
*   **F7 Perjanjian Sewa Kios** (T5, kecil, Word): label contoh edukasi
*   **F8 Kontrak Kerja Karyawan Kontrak** (T5, menengah, Word): label contoh edukasi
*   **F9 Proposal Sponsor Acara** (T4, kecil, Word+Excel): anggaran tidak balance, tenggat dimajukan
*   **F10 Proposal Pinjaman Modal Usaha** (T5, kecil, Word+Excel): proyeksi bayar
*   **F11 Company Profile** (T5, menengah, Word)
*   **F12 Business Plan Lengkap** (T6, menengah, Word+Excel)
*   **F13 Studi Kelayakan Usaha** (T6, menengah, Word+Excel)
*   **F14 Tender Dadakan** (T6, menengah, Word+Excel): scope berubah 2x dalam 48 jam
*   **F15 Laporan Audit Internal** (T6, menengah, Word+Excel)
*   **F16 Handbook dan Kebijakan Karyawan** (T7, besar, Word): dokumen panjang konsisten
*   **F17 Laporan Tahunan Mini** (T7, besar, Word+Excel): gabungan 5 departemen

### G. Teknologi (9)
*   **G1 Website Profil Usaha Satu Halaman** (T3, mikro, Web)
*   **G2 Katalog dan Keranjang ke WhatsApp** (T5, kecil, Web+JS)
*   **G3 Form Pemesanan dan Validasi** (T5, kecil, Web+JS)
*   **G4 Kalkulator Harga, Diskon, Ongkir** (T4, kecil, JS)
*   **G5 Rekap Harian Otomatis** (T4, kecil, JS): olah array transaksi
*   **G6 Parser Pesan WhatsApp Menjadi Tabel Pesanan** (T5, kecil, JS): string & regex
*   **G7 Generator Invoice** (T6, menengah, JS+Web)
*   **G8 Peringatan Stok Menipis** (T5, kecil, JS)
*   **G9 Skrip Warisan yang Salah Hitung** (T6, menengah, JS): debugging & refactor

### H. Akademik dan Kewirausahaan (7)
*   **H1 Laporan PKL Dita** (T4, akademik, Word): format pedoman kampus, 2x revisi
*   **H2 Makalah Studi Kasus Bisnis** (T3, akademik, Word): sitasi dan daftar pustaka
*   **H3 Proposal PKM/Kewirausahaan** (T5, akademik, Word+Excel)
*   **H4 Proposal Penelitian Bab 1-3** (T5, akademik, Word+Excel): Survei UMKM
*   **H5 Proposal dan LPJ Kegiatan Organisasi** (T4, akademik, Word+Excel): anggaran vs realisasi
*   **H6 Pitch Lomba Bisnis** (T5, akademik, Word+Excel): executive summary & model keuangan
*   **H7 Laporan Praktikum Statistik Bisnis** (T4, akademik, Excel+Word)

### I. Lintas Modul dan Klimaks (6)
*   **I1 Audit Dadakan** (T6, menengah, Excel+Word): temukan kesalahan, minta bukti
*   **I2 Tutup Buku Akhir Tahun** (T6, menengah, Excel+Word)
*   **I3 Buka Cabang Baru** (T7, besar, Excel+Word+Web+JS): kelayakan, web, skrip
*   **I4 Krisis Data** (T7, besar, Excel+JS+Word): pulihkan data rusak, rancang backup
*   **I5 Go Digital** (T7, besar, Excel+Web+JS): migrasi buku tulis ke sistem Excel & Web
*   **I6 Rapat Direksi** (T7, besar, Word+Excel): memo dewan dan dasbor ringkas

---

## Fitur Ekosistem

### Kampanye Bisnis (Mode Baru, Opsional)
*   **Konsep:** "Kedai Segar: dari nol sampai cabang." Pemain mengelola satu usaha fiktif yang bertahan antar kasus.
*   **Mekanisme:** Simpan `businessState` (kas, stok, reputasi, jumlah karyawan, utang, HPP) di store (bisa ekspor/impor). Kasus bertanda `campaign: true` membaca state ini sebagai seed dan menulis `campaignEffects` (misal: Pilihan pemasok C4 mengubah HPP di B2).
*   **UI:** Layar "Rapor Bisnis" berisi indikator & riwayat keputusan.

### Mode "Bisnis Saya"
*   **Konsep:** Pemain memasukkan data usahanya sendiri (maks. 30 produk: nama, satuan, harga beli, harga jual, stok awal).
*   **Mekanisme:** Generator memakai data lokal ini untuk membuat simulasi kasus spesifik pengguna. Data tersimpan lokal (ikut ekspor cadangan).
*   **Disclaimer:** Wajib berlabel "Latihan, bukan pembukuan resmi."

### Pustaka Template Bisnis
*   **Target:** Minimal 50 template, terbuka bertahap setelah penyelesaian kasus, bisa diekspor.
*   **Isi:** Nota, kwitansi, invoice, faktur, surat penawaran, PO, surat jalan, BAST, tagihan, undangan, notulen, SPK, MoU, kontrak, slip gaji, SOP, proposal, dll.

### Kamus dan Pelajaran Bisnis
*   **Target:** Masuk ke "Pusat Belajar".
*   **Isi:** Kamus rumus dan istilah (HPP, margin vs markup, BEP, ROI, NPV, IRR, perputaran stok, reorder point, safety stock, dll).
*   **Integrasi:** Tiap kasus memiliki tautan ke pelajaran terkait; kegagalan misi memunculkan tautan materi spesifik.

---

## Fase Pengerjaan (Batch)
Kerjakan berurutan, berhenti dan lapor di akhir tiap batch. Template dan pelajaran dikerjakan paralel sesuai kebutuhan batch.
*   **Batch K0:** Perluasan skema, migrasi 3 kasus lama, generator data + anomali, validator silang, form Rekomendasi, perluasan `content:audit`, tampilan multi-hasil `CaseFileView`. Laporkan `requires`.
*   **Batch K1:** 17 kasus T1-T3 (A1, A2, A3, B1, B2, B3, C1, D1, E1, E3, F1, F2, F3, F4, F5, G1, H2).
*   **Batch K2:** 19 kasus T4.
*   **Batch K3:** 26 kasus T5 (bisa dipecah 13 + 13).
*   **Batch K4:** 12 kasus T6.
*   **Batch K5:** 6 kasus T7, Mode Kampanye Bisnis, Mode Bisnis Saya.

---

## Gerbang Kualitas (Quality Gates)
Perluas `npm run content:audit` agar mencetak metrik aktual vs target. Script harus gagal (`exit code 1`) jika sebuah kasus:
1.  Varian seed < 3.
2.  Solusi referensi < 2, atau solusi referensi gagal di salah satu seed.
3.  Lolos dengan jawaban hardcode atau melewatkan jebakan data.
4.  Tidak ada adegan pembuka/penutup, reaksi tokoh, Catatan Mentor, atau tautan pelajaran.
5.  T4+ tidak ada perubahan lingkup (`scopeChanges`); T5+ pihak berkepentingan < 2.
6.  Mengandung merek/orang nyata, kata placeholder, atau dialog > 3 kalimat per balon.
7.  Kasus hukum/pajak/keuangan tidak memiliki disclaimer.
8.  `crossChecks` antar hasil gagal pada solusi referensi.

---

## Definition of Done (DoD) per Batch
*   [ ] Perintah `npm run check`, `content:audit`, dan `test:e2e` lulus 100%.
*   [ ] Uji E2E berhasil (Satu kasus per modul di tiap batch diverifikasi lewat Playwright desktop & mobile).
*   [ ] Semua kasus aktif di batch bisa diselesaikan dengan solusi referensi pada SEMUA seed. Jawaban hardcode/salah terdeteksi gagal.
*   [ ] Kasus yang dependensinya belum siap tampil sebagai "Segera Hadir" (bukan layar kosong atau error).
*   [ ] Laporan batch (tabel bukti) diserahkan. Tidak ada elemen UI yang menjanjikan/menampilkan angka fitur yang belum rilis.