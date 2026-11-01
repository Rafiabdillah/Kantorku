# Cara Memasang KantorKu

## PC Windows

Untuk Windows 64-bit, unduh installer EXE dari halaman Releases terbaru:

**https://github.com/Rafiabdillah/Kantorku/releases/latest**

Pilih salah satu:

- `KantorKu-Setup.exe` untuk instalasi desktop satu klik.
- `KantorKu-Portable-*.exe` untuk menjalankan tanpa instalasi.

Pembaharuan dan keberlanjutan offline dilakukan seperti aplikasi desktop biasa. Tidak perlu Node.js atau terminal untuk versi EXE.

## Cara termudah: aplikasi web yang dapat dipasang

1. Buka halaman pemasangan:
   **https://rafiabdillah.github.io/Kantorku/install.html**
2. Pilih **Buka dan Pasang**.
3. Android, Windows, atau Chrome OS:
   - Pilih **Pasang Aplikasi** pada layar aplikasi atau ikon pasang pada bilah alamat.
   - Jika browser menampilkan pilihan di menu, pilih **Pasang aplikasi** atau **Tambah ke layar utama**.
4. iPhone atau iPad dengan Safari:
   - Ketuk **Bagikan**.
   - Pilih **Tambah ke Layar Utama**.

Versi terpasang menggunakan data kemajuan lokal perangkat dan mendukung pemakaian offline setelah cache aplikasi terbentuk.

## Cara menjalankan dari kode sumber Windows

Disarankan untuk Windows 10 atau Windows 11 dengan Node.js **22.5 atau lebih baru**.

1. Ekstrak atau clone repository.
2. Klik dua kali `Install-Kantorku-Windows.bat`.
3. Script akan:
   - memeriksa versi Node.js,
   - menjalankan `npm ci`,
   - menjalankan server pengembangan,
   - membuka KantorKu di browser.

Jangan menutup jendela PowerShell atau CMD selama KantorKu dijalankan.

Jika Node.js belum tersedia, pasang Node.js versi 22.5 atau lebih baru terlebih dahulu, lalu jalankan file BAT lagi.
