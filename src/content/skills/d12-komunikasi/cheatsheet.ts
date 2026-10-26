/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D12: Komunikasi Profesional - Cheat Sheet & Quick Reference
 */

export interface CheatSheetSection {
  title: string;
  items: Array<{
    label: string;
    templateOrRule: string;
    note: string;
  }>;
}

export const D12_CHEATSHEET: CheatSheetSection[] = [
  {
    title: 'Template Pembuka & Penutup Email',
    items: [
      {
        label: 'Pembuka Formal (Klien / Eksternal)',
        templateOrRule: 'Yth. Bapak/Ibu [Nama],\n\nSehubungan dengan koordinasi terkait [Proyek/Topik]...',
        note: 'Gunakan gelar formal dan sebutkan topik spesifik di baris pertama.',
      },
      {
        label: 'Tindak Lanjut / Follow Up',
        templateOrRule: 'Menindaklanjuti pertemuan kita pada hari [Hari], bersama email ini kami sampaikan [Dokumen]...',
        note: 'Langsung hubungkan dengan riwayat pertemuan sebelumnya.',
      },
      {
        label: 'Penutup dengan Call to Action',
        templateOrRule: 'Mohon konfirmasi kesediaan jadwal Bapak/Ibu sebelum [Hari, Jam]. Terima kasih atas kerja samanya.',
        note: 'Beri batas waktu yang wajar agar agenda Anda tidak menggantung.',
      },
    ],
  },
  {
    title: 'Aturan Emas Chat Bisnis (WhatsApp / Slack)',
    items: [
      {
        label: 'Prinsip 1 Gelembung Utuh (Anti-P)',
        templateOrRule: 'Salam + Nama + Maksud Utama + Dokumen Pendukung + Tenggat Respon.',
        note: 'Jangan mengirim "P" atau "Halo" secara terpisah.',
      },
      {
        label: 'Format Notula Kilat Diskusi',
        templateOrRule: '📋 REKAP KEPUTUSAN DISKUSI:\n1. [Poin A] - PIC: @Nama (Tenggat: [Waktu])\n2. [Poin B] - PIC: @Nama',
        note: 'Sematkan di grup chat agar semua peserta memiliki pemahaman seragam.',
      },
    ],
  },
  {
    title: 'Langkah H.E.A.T Menangani Komplain',
    items: [
      {
        label: '1. Hear (Mendengar)',
        templateOrRule: '"Baik Bapak/Ibu, silakan ceritakan seluruh kendala yang terjadi, kami catat dengan teliti."',
        note: 'Dilarang memotong pembicaraan saat emosi lawan bicara masih tinggi.',
      },
      {
        label: '2. Empathize (Validasi)',
        templateOrRule: '"Kami sangat memahami kekecewaan Bapak/Ibu karena acara ini sangat penting."',
        note: 'Menunjukkan bahwa Anda berada di pihak mereka untuk menyelesaikan masalah.',
      },
      {
        label: '3. Apologize (Minta Maaf)',
        templateOrRule: '"Kami memohon maaf sebesar-besarnya atas ketidaknyamanan dan kendala yang timbul."',
        note: 'Tulus dan tanpa embel-embel kalimat pembelaan diri.',
      },
      {
        label: '4. Take Action (Solusi Nyata)',
        templateOrRule: '"Armada cadangan kami kirimkan sekarang dan tiba pukul [Jam]. Biaya kirim kami bebaskan."',
        note: 'Berikan solusi dalam batas wewenang dengan kepastian waktu terukur.',
      },
    ],
  },
];
