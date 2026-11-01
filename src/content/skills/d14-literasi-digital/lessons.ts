/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D14: Literasi Digital, Keamanan & AI - Lessons & Study Material
 */

export interface D14Lesson {
  id: string;
  domainId: 'D14';
  title: string;
  summary: string;
  estimatedMinutes: number;
  sources: string[];
  disclaimer: string;
  lastReviewed: string;
  workedExample: {
    title: string;
    scenario: string;
    analysis: string;
    bestPractice: string;
  };
  sections: {
    heading: string;
    content: string;
  }[];
}

export const D14_LESSONS: D14Lesson[] = [
  {
    id: 'D14-LES-01',
    domainId: 'D14',
    title: 'Keamanan Akun, Manajemen Sandi & Pencadangan Data 3-2-1',
    summary: 'Membangun pertahanan lapisan pertama kerja perkantoran: kata sandi unik, autentikasi 2FA, dan pencegahan kehilangan data berkas.',
    estimatedMinutes: 15,
    sources: [
      'ISO/IEC 27001:2022 Information Security Management Systems (ISO/IEC, 2022)',
      'NIST Special Publication 800-63B: Digital Identity Guidelines - Authentication (NIST, 2020)',
    ],
    disclaimer: 'Materi edukasi perlindungan digital mandiri. Bukan jaminan kebal dari segala ancaman siber.',
    lastReviewed: '2026-10-26',
    workedExample: {
      title: 'Penerapan Aturan Pencadangan 3-2-1 untuk Pembukuan Toko',
      scenario: 'Admin kantor menyimpan file rekapitulasi penjualan tahunan hanya di satu flashdisk meja kasir yang rawan hilang atau rusak.',
      analysis: 'Penyimpanan single-point-of-failure melanggar prinsip integritas data. Jika flashdisk tertular virus atau patah, seluruh pembukuan lenyap seketika.',
      bestPractice: 'Aturan 3-2-1: Buat 3 salinan (1 di laptop kerja, 1 di harddisk eksternal offline terkunci di brankas, 1 di folder cloud penyimpanan terenkripsi berotentikasi 2FA).',
    },
    sections: [
      {
        heading: '1. Anatomi Kata Sandi Kuat vs Lemah',
        content: 'Kata sandi kuat tidak harus rumit dihafal seperti "x7$#9!aB", melainkan dapat berupa Passphrase 4 kata acak berbahasa Indonesia seperti "kopi-segar-gunung-lestari!". Hindari nama anggota keluarga, tanggal lahir, nama divisi kantor, atau urutan angka berurutan.',
      },
      {
        heading: '2. Otentikasi Dua Langkah (2FA/MFA)',
        content: 'Kata sandi saja hanya melindungi satu faktor (apa yang Anda tahu). Verifikasi dua langkah menambahkan faktor kepemilikan (aplikasi otentikasi berbasis waktu / TOTP di ponsel). Hindari 2FA via SMS bila tersedia opsi TOTP, guna mencegah risiko SIM-swap.',
      },
      {
        heading: '3. Aturan Emas Cadangan 3-2-1',
        content: 'Tiga salinan data, disimpan pada minimal dua jenis media berbeda (misal SSD internal dan drive eksternal), dan satu salinan berada di lokasi fisik terpisah (off-site / cloud terpercaya). Uji pemulihan cadangan minimal setiap 3 bulan sekali.',
      },
    ],
  },
  {
    id: 'D14-LES-02',
    domainId: 'D14',
    title: 'Mengenali Phishing, Rekayasa Sosial & Perlindungan Data Pribadi (UU PDP)',
    summary: 'Membedakan komunikasi kerja asli dengan jebakan phishing, teknik psikologis penipu, dan batasan hukum distribusi data sensitif.',
    estimatedMinutes: 20,
    sources: [
      'Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP, LNRI No. 196, 2022)',
      'NIST Cybersecurity Framework (CSF) 2.0 (National Institute of Standards and Technology, 2024)',
    ],
    disclaimer: 'Contoh edukasi perlindungan data pribadi dan pencegahan penipuan online. Bukan nasihat hukum perdata/pidana.',
    lastReviewed: '2026-10-26',
    workedExample: {
      title: 'Email Tagihan Palsu Mengatasnamakan Vendor Pengiriman',
      scenario: 'Admin menerima email bertuliskan "Pemberitahuan Retur Segera: Unduh Lampiran .exe untuk Cek Resi" dari alamat invoice@ekspedisi-pusat-update.xyz.',
      analysis: 'Tiga red flag nyata: urgensi buatan ("segera"), ekstensi domain palsu (.xyz bukan .co.id resmi), dan jenis lampiran berkas yang dapat dieksekusi (.exe bukan PDF nota).',
      bestPractice: 'Jangan klik tautan atau buka berkas lampiran. Hubungi nomor narahubung resmi vendor via saluran WhatsApp atau telepon yang tercatat di arsip kontrak kantor untuk memverifikasi.',
    },
    sections: [
      {
        heading: '1. Tiga Taktik Utama Rekayasa Sosial (Social Engineering)',
        content: 'Penipu memanfaatkan kelemahan psikologis manusia: Otoritas (pura-pura menjadi direksi atau aparat), Urgensi Panik (ancaman akun ditutup dalam 1 jam), dan Keuntungan Instan (tawaran hadiah atau undian vendor palsu).',
      },
      {
        heading: '2. Verifikasi Domain dan Alamat Surel Asli',
        content: 'Nama tampilan (Display Name) email sangat mudah dipalsukan. Selalu periksa alamat email di dalam kurung sudut (<sender@domain.com>). Waspadai teknik typosquatting seperti majusejatera.co.id (huruf "h" hilang).',
      },
      {
        heading: '3. Prinsip Dasar UU PDP di Tempat Kerja',
        content: 'Data pribadi spesifik (informasi kesehatan, data finansial pribadi, nomor rekening, catatan disiplin) wajib dijaga kerahasiaannya dan tidak boleh disebarkan di grup publik kantor tanpa persetujuan sah pemilik data.',
      },
    ],
  },
  {
    id: 'D14-LES-03',
    domainId: 'D14',
    title: 'Etika Pemakaian AI Generatif, Formula Prompt 5 Elemen & Validasi Fakta',
    summary: 'Memanfaatkan alat bantu AI secara cerdas, menjaga rahasia dapur kantor, menyusun instruksi presisi, dan memverifikasi angka anti-halusinasi.',
    estimatedMinutes: 18,
    sources: [
      'Surat Edaran Menkominfo No. 9 Tahun 2023 tentang Etika Kecerdasan Artifisial (Kemenkominfo RI, 2023)',
      'ISO/IEC 42001:2023 Artificial Intelligence Management System (ISO/IEC, 2023)',
    ],
    disclaimer: 'Aplikasi KantorKu bekerja offline-first dan tidak mengirimkan data ke AI eksternal. Latihan ini mengajarkan etika dan verifikasi hasil AI statis.',
    lastReviewed: '2026-10-26',
    workedExample: {
      title: 'Menyusun Instruksi Ringkasan Notulen Rapat dengan Teknik 5 Elemen',
      scenario: 'Seorang staf mengetik prompt: "Buatkan notulen rapat kemarin" dan mendapatkan hasil generik yang membingungkan serta mengarang nama peserta rapat.',
      analysis: 'Prompt kekurangan konteks, batasan, dan format spesifik sehingga AI menghasilkan halusinasi nama dan topik.',
      bestPractice: 'Gunakan Formula 5 Elemen: [Peran] Anda admin kantor teliti. [Tujuan] Rangkum 3 poin keputusan rapat berikut. [Konteks] Terkait persiapan pameran UMKM. [Format] Tabel dengan kolom PIC dan batas waktu. [Batasan] Jangan menambah asumsi di luar catatan terlampir.',
    },
    sections: [
      {
        heading: '1. Formula Prompt 5 Elemen (PTKFB)',
        content: 'Untuk menghasilkan draf profesional yang relevan: 1. Peran (Persona ahli) 2. Tujuan (Tugas utama terukur) 3. Konteks (Latar belakang situasi) 4. Format (Tabel, poin, email) 5. Batasan (Maksimal 150 kata, nada sopan, jangan menambahkan fakta baru).',
      },
      {
        heading: '2. Batasan Kerahasiaan Data (Data Privacy Boundary)',
        content: 'DILARANG memasukkan data mentah berisi NIK karyawan, laporan laba rugi rahasia sebelum rilis publik, nomor kartu kredit pelanggan, atau berkas sengketa hukum ke layanan AI publik yang menggunakan input untuk pelatihan model.',
      },
      {
        heading: '3. Protokol Anti-Halusinasi & Verifikasi Fakta',
        content: 'AI generatif adalah mesin probabilitas bahasa, bukan kalkulator faktual mutlak. Seluruh kalkulasi matematika, pasal peraturan perundang-undangan, nomor kontak, dan rujukan tanggal wajib dicek ulang manual oleh manusia sebelum dokumen dikirim ke klien atau pimpinan.',
      },
    ],
  },
];
