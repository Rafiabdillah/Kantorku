/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu v2.0 - Bedah Kasus (Case Study Comparisons)
 * Perbandingan interaktif Dokumen / Halaman "Buruk vs Baik" lengkap dengan anotasi klik.
 */

import { CaseStudyComparison } from '../../features/learning/types';

export const CASE_STUDIES: CaseStudyComparison[] = [
  {
    id: 'case-word-notulen',
    title: 'Bedah Dokumen: Notulen Rapat Direksi & Tindak Lanjut',
    category: 'word-bisnis',
    summary: 'Bandingkan notulen rapat informal tanpa penanggung jawab dengan notulen eksekutif yang menggunakan Matriks Rencana Aksi (Action Plan Table).',
    badDocument: {
      title: 'Versi Buruk: Catatan Kasual Tanpa Struktur Standar',
      contentHtml: `
        <div style="font-family: Arial; padding: 12px; color: #334155; line-height: 1.5;">
          <h2 style="color: #b91c1c; font-size: 16px; margin-bottom: 4px;">Catatan Rapat Kemarin</h2>
          <p style="font-size: 12px; margin-bottom: 8px;"><em>Rapat diadakan sekitar jam 10-an bareng tim.</em></p>
          <p style="font-size: 13px; margin-bottom: 8px;">
            Kemarin kita bahas soal server yang sering lemot dan keluhan pelanggan tentang pengiriman barang. 
            Pak Bos bilang tolong dibereskan secepatnya ya. Tim IT nanti cek kabel atau sistemnya. 
            Lalu bagian gudang usahakan packing jangan telat lagi biar konsumen gak komplain di Google Review.
          </p>
          <p style="font-size: 13px;">
            Minggu depan kita kumpul lagi buat evaluasi hasilnya. Tolong disiapkan laporannya.
          </p>
        </div>
      `,
    },
    goodDocument: {
      title: 'Versi Baik: Standar Notulen Rapat Eksekutif PT Maju Sejahtera',
      contentHtml: `
        <div style="font-family: Arial; padding: 12px; color: #0f172a; line-height: 1.5;">
          <div style="border-bottom: 2px solid #059669; padding-bottom: 6px; margin-bottom: 10px;">
            <h1 style="color: #065f46; font-size: 16px; font-weight: bold; margin: 0;">NOTULEN RAPAT KOORDINASI OPERASIONAL</h1>
            <p style="font-size: 11px; color: #64748b; margin: 2px 0 0 0;">Nomor: NOT/2026/04/OPS-01 | PT Maju Sejahtera</p>
          </div>
          
          <table style="width: 100%; font-size: 11px; margin-bottom: 10px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-collapse: collapse;">
            <tr>
              <td style="padding: 4px 8px; font-weight: bold; width: 25%;">Hari/Tanggal:</td>
              <td style="padding: 4px 8px;">Senin, 14 April 2026</td>
              <td style="padding: 4px 8px; font-weight: bold; width: 20%;">Pimpinan:</td>
              <td style="padding: 4px 8px;">Bu Sari (Direktur Ops)</td>
            </tr>
            <tr>
              <td style="padding: 4px 8px; font-weight: bold;">Waktu & Tempat:</td>
              <td style="padding: 4px 8px;">09.00 - 10.30 WIB | Ruang Rapat A</td>
              <td style="padding: 4px 8px; font-weight: bold;">Notulis:</td>
              <td style="padding: 4px 8px;">Dimas Pratama</td>
            </tr>
          </table>

          <h2 style="font-size: 13px; font-weight: bold; color: #1e293b; margin-top: 8px; margin-bottom: 4px;">1. Ringkasan Eksekutif & Pembahasan</h2>
          <p style="font-size: 12px; margin-bottom: 8px;">
            Rapat menyepakati dua prioritas darurat: pemulihan latensi server aplikasi kasir cabang dan percepatan SLA pengemasan gudang dari 6 jam menjadi 2 jam.
          </p>

          <h2 style="font-size: 13px; font-weight: bold; color: #1e293b; margin-top: 8px; margin-bottom: 4px;">2. Matriks Rencana Aksi (Action Plan Matrix)</h2>
          <table style="width: 100%; font-size: 11px; border-collapse: collapse; border: 1px solid #cbd5e1;">
            <thead>
              <tr style="background-color: #e2e8f0; text-align: left;">
                <th style="padding: 4px 6px; border: 1px solid #cbd5e1;">No</th>
                <th style="padding: 4px 6px; border: 1px solid #cbd5e1;">Tindakan Nyata</th>
                <th style="padding: 4px 6px; border: 1px solid #cbd5e1;">PIC</th>
                <th style="padding: 4px 6px; border: 1px solid #cbd5e1;">Tenggat</th>
                <th style="padding: 4px 6px; border: 1px solid #cbd5e1;">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">1</td>
                <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">Upgrade bandwidth & optimasi query database kasir</td>
                <td style="padding: 4px 6px; border: 1px solid #cbd5e1; font-weight: bold;">Kak Intan (IT)</td>
                <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">17 Apr 2026</td>
                <td style="padding: 4px 6px; border: 1px solid #cbd5e1; color: #d97706;">Dalam Proses</td>
              </tr>
              <tr>
                <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">2</td>
                <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">Terapkan barcode scanner ganda di line packaging</td>
                <td style="padding: 4px 6px; border: 1px solid #cbd5e1; font-weight: bold;">Hendra (Gudang)</td>
                <td style="padding: 4px 6px; border: 1px solid #cbd5e1;">18 Apr 2026</td>
                <td style="padding: 4px 6px; border: 1px solid #cbd5e1; color: #2563eb;">Baru</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
    },
    annotations: [
      {
        id: 'ann-1',
        highlightLabel: 'Ketidakjelasan PIC & Tenggat',
        problemTitle: 'Masalah: Tugas "Mengambang" Tanpa Pemilik',
        problemExplanation: 'Dokumen versi buruk hanya menyebut "tolong dibereskan secepatnya" dan "tim IT nanti cek". Tidak ada tanggal pasti atau nama individu penanggung jawab.',
        solutionFix: 'Solusi: Matriks Rencana Aksi (Action Plan Table) dengan kolom No, Tindakan, PIC spesifik (nama dan divisi), serta tanggal tenggat yang terukur.',
        targetSide: 'bad',
      },
      {
        id: 'ann-2',
        highlightLabel: 'Header Formal & Metadata',
        problemTitle: 'Masalah: Hilangnya Legalitas & Waktu Rapat',
        problemExplanation: 'Hanya tertulis "Kemarin jam 10-an". Jika diaudit sebulan kemudian, tidak ada yang tahu persis siapa saja pimpinan yang hadir dan nomor arsipnya.',
        solutionFix: 'Solusi: Buat blok metadata tabel memuat Nomor Surat, Hari/Tanggal, Jam, Pimpinan, dan Notulis resmi.',
        targetSide: 'good',
      },
      {
        id: 'ann-3',
        highlightLabel: 'Ringkasan Eksekutif Terarah',
        problemTitle: 'Peningkatan: Pimpinan Langsung Paham dalam 10 Detik',
        problemExplanation: 'Direktur tidak punya waktu membaca paragraf panjang yang berputar-putar tanpa kesimpulan konkret.',
        solutionFix: 'Solusi: Bagian 1 "Ringkasan Eksekutif" langsung menyebutkan 2 keputusan krusial dan target SLA kuantitatif.',
        targetSide: 'good',
      },
    ],
    learningPoints: [
      'Notulen bisnis bukan sekadar rekaman obrolan, melainkan dokumen komitmen kerja resmi.',
      'Tabel Action Plan wajib memiliki PIC perorangan agar tidak saling lempar tanggung jawab.',
      'Sertakan nomor surat dan ringkasan eksekutif di bagian atas dokumen.',
    ],
    relatedLessonId: 'les-word-action-matrix',
  },
  {
    id: 'case-web-landing',
    title: 'Bedah Web: Landing Page Toko Online & Konversi Pesanan',
    category: 'web-landing',
    summary: 'Bandingkan website toko yang semrawut tanpa CTA pemesanan dengan landing page responsif terstruktur yang siap melayani pelanggan.',
    badDocument: {
      title: 'Versi Buruk: Halaman Polos Tanpa Tombol Pesan & Struktur Semantik',
      contentHtml: `
        <div style="font-family: sans-serif; padding: 12px; color: #1e293b; background: #fff;">
          <div><b>SELAMAT DATANG DI TOKO KAMI</b></div>
          <p style="font-size: 12px;">Kami menjual berbagai macam kopi robusta dan arabika pilihan langsung dari petani lokal di lereng gunung Jawa Timur.</p>
          <div>
            <p>1. Kopi Arabika 250gr - Rp 65.000</p>
            <p>2. Kopi Robusta 250gr - Rp 45.000</p>
          </div>
          <p style="font-size: 11px; color: gray;">Hubungi kami kalau mau beli lewat WA di nomor 081234567890 atau DM instagram @kopienak.</p>
        </div>
      `,
    },
    goodDocument: {
      title: 'Versi Baik: Desain Semantik HTML5 + Flexbox Card + Tombol Pesan CTA',
      contentHtml: `
        <div style="font-family: sans-serif; padding: 16px; background: #f8fafc; border-radius: 12px; color: #0f172a;">
          <header style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 14px;">
            <div>
              <span style="font-weight: 800; font-size: 16px; color: #047857;">☕ Kopi Nusantara</span>
              <span style="font-size: 10px; display: block; color: #64748b;">Kualitas Petani Lereng Gunung Jawa</span>
            </div>
            <a href="#katalog" style="background: #047857; color: white; padding: 6px 12px; border-radius: 8px; text-decoration: none; font-size: 11px; font-weight: bold;">Pesan Sekarang</a>
          </header>

          <main>
            <section style="margin-bottom: 14px; text-align: center; background: white; padding: 14px; border-radius: 10px; border: 1px solid #e2e8f0;">
              <h1 style="font-size: 16px; font-weight: bold; margin: 0 0 6px 0; color: #1e293b;">Kopi Segar Sangrai Mingguan</h1>
              <p style="font-size: 12px; color: #475569; margin: 0;">Diproses dari biji pilihan petik merah untuk aroma maksimal setiap pagi.</p>
            </section>

            <section id="katalog" style="display: flex; gap: 10px; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 140px; background: white; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px; display: flex; flex-col; justify-content: space-between;">
                <div>
                  <h3 style="font-size: 13px; font-weight: bold; margin: 0; color: #0f172a;">Arabika Ijen 250g</h3>
                  <p style="font-size: 11px; color: #64748b; margin: 4px 0;">Notes jeruk, floral manis.</p>
                  <div style="font-size: 14px; font-weight: 800; color: #047857; margin: 6px 0;">Rp 65.000</div>
                </div>
                <button style="width: 100%; background: #059669; color: white; border: none; padding: 6px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; cursor: pointer;">
                  + Keranjang Belanja
                </button>
              </div>

              <div style="flex: 1; min-width: 140px; background: white; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px; display: flex; flex-col; justify-content: space-between;">
                <div>
                  <h3 style="font-size: 13px; font-weight: bold; margin: 0; color: #0f172a;">Robusta Dampit 250g</h3>
                  <p style="font-size: 11px; color: #64748b; margin: 4px 0;">Body tebal, cokelat pekat.</p>
                  <div style="font-size: 14px; font-weight: 800; color: #047857; margin: 6px 0;">Rp 45.000</div>
                </div>
                <button style="width: 100%; background: #059669; color: white; border: none; padding: 6px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; cursor: pointer;">
                  + Keranjang Belanja
                </button>
              </div>
            </section>
          </main>
        </div>
      `,
    },
    annotations: [
      {
        id: 'ann-web-1',
        highlightLabel: 'Tombol Call-to-Action (CTA)',
        problemTitle: 'Masalah: Pembeli Bingung Cara Transaksi',
        problemExplanation: 'Pada versi buruk, pembeli harus mencatat nomor WA secara manual lalu membuka aplikasi lain. 80% calon pembeli akan batal sebelum order karena friksi.',
        solutionFix: 'Solusi: Tempatkan tombol Call-to-Action "+ Keranjang Belanja" dan "Pesan Sekarang" yang mencolok di setiap kartu produk.',
        targetSide: 'good',
      },
      {
        id: 'ann-web-2',
        highlightLabel: 'Tata Letak Kartu Flexbox',
        problemTitle: 'Peningkatan: Visual Kartu Rata Sejajar',
        problemExplanation: 'Daftar produk dalam teks polos sulit dibandingkan harganya oleh pembeli yang membaca cepat.',
        solutionFix: 'Solusi: Bungkus produk dalam kontainer Flexbox berbingkai (card) dengan harga menonjol dan tombol simetris.',
        targetSide: 'good',
      },
    ],
    learningPoints: [
      'Setiap landing page jualan wajib memiliki tombol aksi (CTA) yang jelas.',
      'Gunakan flexbox agar susunan kartu produk otomatis beradaptasi dengan layar ponsel pengunjung.',
      'Tampilkan harga dalam ukuran kontras tinggi agar pembeli langsung paham.',
    ],
    relatedLessonId: 'les-web-flexbox-cards',
  },
];
