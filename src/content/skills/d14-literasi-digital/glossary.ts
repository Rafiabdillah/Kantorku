/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D14: Literasi Digital, Keamanan & AI - Glossary
 */

export interface D14GlossaryTerm {
  term: string;
  category: string;
  definition: string;
  practicalTip: string;
}

export const D14_GLOSSARY: D14GlossaryTerm[] = [
  {
    term: 'Phishing',
    category: 'Keamanan Siber',
    definition: 'Upaya penipuan digital untuk memancing korban menyerahkan data sensitif seperti kata sandi atau nomor kartu dengan menyamar sebagai pihak terpercaya.',
    practicalTip: 'Selalu periksa alamat domain pengirim asli dan hindari mengklik tautan mendesak tanpa verifikasi.',
  },
  {
    term: 'Two-Factor Authentication (2FA)',
    category: 'Keamanan Akun',
    definition: 'Lapisan keamanan tambahan yang mewajibkan pengguna memasukkan dua bukti identitas berbeda (kata sandi + kode waktu unik) sebelum diberikan akses login.',
    practicalTip: 'Utamakan aplikasi otentikasi (TOTP) dibanding SMS untuk menghindari risiko pembajakan kartu SIM.',
  },
  {
    term: 'Social Engineering',
    category: 'Keamanan Informasi',
    definition: 'Manipulasi psikologis terhadap individu agar membocorkan informasi rahasia atau melakukan tindakan yang membahayakan sistem keamanan kantor.',
    practicalTip: 'Waspadai permintaan darurat yang mengatasnamakan atasan di luar saluran komunikasi resmi kantor.',
  },
  {
    term: 'Pelindungan Data Pribadi (PDP)',
    category: 'Kepatuhan Regulasi',
    definition: 'Keseluruhan upaya untuk melindungi data pribadi dalam rangkaian pemrosesan data guna menjamin hak konstitusional subjek data sesuai UU No 27/2022.',
    practicalTip: 'Jangan mempublikasikan daftar gaji, NIK, atau data rekam medis staf di grup obrolan publik.',
  },
  {
    term: 'Halusinasi AI',
    category: 'Kecerdasan Artifisial',
    definition: 'Fenomena ketika model bahasa AI menghasilkan informasi yang terdengar meyakinkan namun sepenuhnya salah secara faktual atau mengarang data.',
    practicalTip: 'Selalu lakukan verifikasi fakta mandiri terhadap angka, kutipan pasal, dan sumber rujukan dari AI.',
  },
  {
    term: 'Prompt Engineering',
    category: 'Kecerdasan Artifisial',
    definition: 'Seni dan teknik menyusun instruksi terstruktur untuk mengarahkan model AI agar memberikan jawaban yang akurat, relevan, dan sesuai format yang diinginkan.',
    practicalTip: 'Gunakan formula 5 elemen: Peran, Tujuan, Konteks, Format, dan Batasan (PTKFB).',
  },
  {
    term: 'Aturan Cadangan 3-2-1',
    category: 'Integritas Data',
    definition: 'Standar emas pencadangan: miliki 3 salinan data, simpan pada 2 jenis media penyimpanan berbeda, dan 1 salinan disimpan di lokasi fisik terpisah.',
    practicalTip: 'Jangan mengandalkan satu flashdisk saja untuk menyimpan seluruh data pembukuan kantor.',
  },
  {
    term: 'Ransomware',
    category: 'Keamanan Siber',
    definition: 'Perangkat lunak berbahaya yang mengenkripsi berkas pengguna sehingga tidak dapat diakses dan meminta tebusan uang untuk kunci pembukanya.',
    practicalTip: 'Jangan pernah mengeklik lampiran file berekstensi asing seperti .exe, .scr, atau .zip dari pengirim tidak dikenal.',
  },
];
