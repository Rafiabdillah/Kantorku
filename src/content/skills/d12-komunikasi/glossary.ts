/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D12: Komunikasi Profesional - Glossary Terms
 */

export interface GlossaryTerm {
  term: string;
  category: string;
  definition: string;
  example: string;
}

export const D12_GLOSSARY: GlossaryTerm[] = [
  {
    term: 'Prinsip 3C',
    category: 'Korespondensi',
    definition: 'Standar penulisan pesan bisnis yang mengutamakan Jelas (Clear), Ringkas (Concise), dan Sopan (Courteous).',
    example: 'Email dibuat langsung ke tujuan di kalimat pertama, tanpa basa-basi panjang.',
  },
  {
    term: 'De-eskalasi',
    category: 'Layanan & Krisis',
    definition: 'Teknik komunikasi untuk meredakan amarah dan ketegangan lawan bicara secara bertahap tanpa bersikap defensif.',
    example: 'Mengakui dampak kendala dan meminta maaf tulus sebelum menawarkan solusi pengiriman darurat.',
  },
  {
    term: 'Komunikasi Asertif',
    category: 'Psikologi Komunikasi',
    definition: 'Kemampuan menyampaikan batasan, hak, atau pendapat dengan tegas, lugas, dan percaya diri tanpa bersikap agresif atau merendahkan orang lain.',
    example: '"Kami memahami urgensi Bapak, namun batas waktu sistem mengharuskan verifikasi dokumen hingga pukul 16.00 WIB."',
  },
  {
    term: 'Call to Action (CTA)',
    category: 'Korespondensi',
    definition: 'Instruksi atau ajakan bertindak spesifik di akhir pesan yang memberi tahu pembaca apa yang diharapkan dari mereka beserta tenggat waktunya.',
    example: '"Mohon konfirmasi ketersediaan kehadiran Bapak sebelum hari Kamis pukul 12.00 WIB."',
  },
  {
    term: 'Carbon Copy (CC)',
    category: 'Email',
    definition: 'Fitur pengiriman salinan email ke pihak yang perlu mengetahui isi pesan (for your information / FYI) tanpa kewajiban merespons langsung.',
    example: 'Menaruh email supervisor di kolom CC saat mengirim laporan ke klien.',
  },
  {
    term: 'Blind Carbon Copy (BCC)',
    category: 'Email & Privasi',
    definition: 'Fitur pengiriman salinan email rahasia di mana alamat penerima di kolom ini tidak dapat dilihat oleh penerima lain, guna menjaga kerahasiaan data.',
    example: 'Mengirim buletin atau pemberitahuan tagihan massal ke ratusan pelanggan.',
  },
  {
    term: 'SLA Komunikasi (Service Level Agreement)',
    category: 'Operasional',
    definition: 'Komitmen batas waktu maksimal pemberian respon pertama atau penyelesaian tiket pertanyaan dari pelanggan.',
    example: 'Respon pertama maksimal 15 menit pada jam kerja dan eskalasi manajerial dalam 1 jam.',
  },
  {
    term: 'Notulen Rapat',
    category: 'Dokumen Kantor',
    definition: 'Catatan ringkas resmi mengenai jalannya pertemuan yang memuat keputusan, penanggung jawab tugas, dan tenggat waktu (action items).',
    example: 'Format: Poin Keputusan | PIC | Tenggat Waktu.',
  },
];
