/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D14: Literasi Digital, Keamanan & AI - Cheat Sheets
 */

export interface D14CheatSheet {
  id: string;
  title: string;
  description: string;
  items: {
    label: string;
    description: string;
    example?: string;
  }[];
}

export const D14_CHEATSHEET: D14CheatSheet[] = [
  {
    id: 'cs-d14-01',
    title: 'Checklist Deteksi Email Phishing (3C Inspeksi)',
    description: 'Panduan kilat 3 langkah memeriksa email masuk sebelum mengklik tautan atau mengunduh lampiran:',
    items: [
      {
        label: '1. Check Sender (Domain Asli)',
        description: 'Periksa alamat email di dalam kurung sudut (<sender@domain.com>). Pastikan bukan domain publik gratisan atau salah ketik.',
        example: 'Palsu: billing@ekspedisi-update.xyz | Asli: invoice@ekspredisikilat.co.id',
      },
      {
        label: '2. Check Urgency (Tekanan Psikologis)',
        description: 'Waspadai kalimat yang menciptakan kepanikan buatan seperti "Akun dihapus dalam 1 jam!" atau "Konfirmasi ganti rugi sekarang!".',
      },
      {
        label: '3. Check Attachment (Ekstensi Berkas)',
        description: 'Dokumen administrasi biasa berformat PDF atau XLSX. Tolak berkas yang berekstensi .exe, .bat, .vbs, .js, atau .iso.',
        example: 'Jebakan: Laporan_Gaji.pdf.exe',
      },
    ],
  },
  {
    id: 'cs-d14-02',
    title: 'Formula Prompt 5 Elemen (PTKFB)',
    description: 'Struktur instruksi baku menghasilkan draf kerja profesional tanpa halusinasi:',
    items: [
      {
        label: 'P - Peran (Role)',
        description: 'Tentukan sudut pandang ahli spesifik.',
        example: '"Bertindaklah sebagai admin kantor berpengalaman di perusahaan ritel."',
      },
      {
        label: 'T - Tujuan (Task)',
        description: 'Nyatakan tindakan utama yang terukur.',
        example: '"Susun draf email konfirmasi pengiriman barang ke klien VIP."',
      },
      {
        label: 'K - Konteks (Context)',
        description: 'Berikan kronologi dan latar belakang yang relevan.',
        example: '"Barang dikirim hari ini pukul 14.00 WIB via armada prioritas."',
      },
      {
        label: 'F - Format (Format)',
        description: 'Tentukan gaya tata letak output.',
        example: '"Struktur email resmi dengan subjek, salam, dan nomor resi terlampir."',
      },
      {
        label: 'B - Batasan (Constraint)',
        description: 'Beri pagar pengaman dan larangan.',
        example: '"Maksimal 120 kata, gunakan bahasa formal, jangan mengarang fakta baru."',
      },
    ],
  },
  {
    id: 'cs-d14-03',
    title: 'Aturan Privasi & Perlindungan Data Pribadi (UU PDP)',
    description: 'Pedoman penanganan data sensitif di tempat kerja:',
    items: [
      {
        label: 'Data Umum vs Data Spesifik',
        description: 'Data spesifik (kesehatan, keuangan, biometrik, catatan anak) membutuhkan persetujuan tertulis eksplisit dan pengamanan enkripsi.',
      },
      {
        label: 'Prinsip Minimalisasi Data',
        description: 'Hanya kumpulkan data yang benar-benar relevan dengan fungsi pekerjaan. Jangan meminta fotokopi KTP jika tidak ada kebutuhan hukum.',
      },
      {
        label: 'Larangan Input AI Eksternal',
        description: 'Jangan menyalin NIK, password, data transaksi perbankan, atau rekam medis ke dalam prompt layanan AI pihak ketiga.',
      },
    ],
  },
];
