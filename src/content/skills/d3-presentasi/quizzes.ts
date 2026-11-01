/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D3: Presentasi & Storytelling Visual - Seeded Analytical Quizzes Generator
 */

import { AdvancedQuestion } from '../../../components/engines/AdvancedQuizEngine';
import { mulberry32, hashStringToSeed, shuffleWithRng, shuffleGuaranteedDifferent } from '../d12-komunikasi/quizzes';

export function generateSeededD3Quizzes(seedInput: number | string = 3003): AdvancedQuestion[] {
  const seedNum = hashStringToSeed(seedInput);
  const rng = mulberry32(seedNum);

  const variantQ1 = rng() > 0.5 ? 'B' : 'A';
  const variantQ2 = rng() > 0.5 ? 'B' : 'A';
  const variantQ5 = rng() > 0.5 ? 'B' : 'A';
  const variantQ6 = rng() > 0.5 ? 'B' : 'A';
  const variantQ8 = rng() > 0.5 ? 'B' : 'A';
  const variantQ9 = rng() > 0.5 ? 'B' : 'A';

  // 1. Urutan: Alur Kerangka Narasi SCQA (Minto Pyramid)
  const q1RawItems = [
    {
      id: 'scqa-situation',
      text:
        variantQ1 === 'A'
          ? '1. Situasi (Situation): Menjelaskan konteks stabil yang telah disepakati bersama audiens'
          : '1. Situasi: Menyajikan fakta latar belakang objektif yang diketahui bersama',
    },
    {
      id: 'scqa-complication',
      text:
        variantQ1 === 'A'
          ? '2. Komplikasi (Complication): Menunjukkan pemicu kendala atau ancaman baru di lapangan'
          : '2. Komplikasi: Mengungkapkan perubahan kondisi yang mengganggu stabilitas situasi',
    },
    {
      id: 'scqa-question',
      text:
        variantQ1 === 'A'
          ? '3. Pertanyaan (Question): Merumuskan pertanyaan kunci bagaimana mengatasi kendala tersebut'
          : '3. Pertanyaan: Memfokuskan tantangan utama yang harus segera dijawab audiens',
    },
    {
      id: 'scqa-answer',
      text:
        variantQ1 === 'A'
          ? '4. Jawaban (Answer): Memaparkan rekomendasi solusi konkret beserta manfaat bisnisnya'
          : '4. Jawaban Inti: Menyampaikan solusi usulan yang dapat langsung dieksekusi',
    },
  ];

  // 2. Urutan: Struktur Alur Pitch Deck Investor 10 Slide
  const q2RawItems = [
    {
      id: 'pitch-problem-solution',
      text:
        variantQ2 === 'A'
          ? '1. Masalah & Solusi: Menjelaskan penderitaan konsumen dan proposisi nilai produk kita'
          : '1. Masalah & Solusi: Gambaran friksi nyata pelanggan dan keunggulan solusi yang ditawarkan',
    },
    {
      id: 'pitch-market-model',
      text:
        variantQ2 === 'A'
          ? '2. Pasar & Model Bisnis: Menghitung total potensi pasar (TAM/SAM) dan cara menghasilkan uang'
          : '2. Pasar & Monetisasi: Estimasi segmen target konsumen dan struktur harga/pendapatan',
    },
    {
      id: 'pitch-traction',
      text:
        variantQ2 === 'A'
          ? '3. Bukti Traksi & Tim: Menampilkan angka pertumbuhan pengguna riil dan keahlian anggota tim'
          : '3. Validasi & Kredibilitas Tim: Menunjukkan data transaksi nyata dan rekam jejak pendiri',
    },
    {
      id: 'pitch-ask',
      text:
        variantQ2 === 'A'
          ? '4. Kebutuhan Investasi & Roadmap: Rincian jumlah alokasi dana dan target pencapaian 12 bulan'
          : '4. Permintaan Dana (The Ask): Rencana pemanfaatan modal dan target ekspansi berikutnya',
    },
  ];

  // 3. Cocokkan: Jenis Data & Format Bagan Grafik Optimal
  const q3Pairs = [
    {
      id: 'c-1',
      left: 'Membandingkan total penjualan 5 kantor cabang dengan nama kota panjang',
      right: 'Diagram Batang Horizontal (Horizontal Bar Chart)',
    },
    {
      id: 'c-2',
      left: 'Menampilkan fluktuasi laba bersih bulanan sepanjang Januari s.d. Desember',
      right: 'Diagram Garis (Line Chart)',
    },
    {
      id: 'c-3',
      left: 'Melihat hubungan korelasi antara biaya pelatihan staf dan jumlah retur barang',
      right: 'Diagram Sebar (Scatter Plot)',
    },
    {
      id: 'c-4',
      left: 'Menampilkan porsi 2 kategori kontras (Pria 60% vs Wanita 40%) dari survei pelanggan',
      right: 'Diagram Donat 2 Segmen Sederhana (Donut Chart)',
    },
  ];

  // 4. Cocokkan: Prinsip Tata Visual Slide Profesional
  const q4Pairs = [
    {
      id: 'v-1',
      left: 'Menyisakan margin kosong 40% di sekitar kartu teks agar mata tidak lelah',
      right: 'Whitespace (Ruang Bernapas Visual)',
    },
    {
      id: 'v-2',
      left: 'Memberi warna aksen biru terang pada produk target sementara produk lain abu-abu',
      right: 'Contrast & Focal Point (Titik Fokus)',
    },
    {
      id: 'v-3',
      left: 'Menyejajarkan rata kiri semua kotak teks dan ikon dalam satu garis kisi vertikal',
      right: 'Alignment (Kerapian Penjajaran Grid)',
    },
    {
      id: 'v-4',
      left: 'Menggunakan keluarga font dan palet warna yang sama di seluruh slide presentasi',
      right: 'Consistency (Konsistensi Identitas)',
    },
  ];

  // 5. Temukan Kesalahan: Pelanggaran Aksesibilitas Desain Slide
  const q5Lines =
    variantQ5 === 'A'
      ? [
          { id: 'sl1', text: 'Kanvas slide diatur ke rasio modern 16:9 dengan font sans-serif 32pt untuk judul.', isError: false },
          { id: 'sl2', text: 'Warna teks laporan menggunakan font kuning cerah di atas latar belakang putih bersih tanpa garis tepi.', isError: true, errorReason: 'Teks kuning di atas latar putih memiliki rasio kontras sangat rendah (<2:1), melanggar WCAG AA' },
          { id: 'sl3', text: 'Judul slide diformulasikan sebagai Action Title: "Pertumbuhan Omzet Q3 Mencapai 15% Melalui Kanal Digital".', isError: false },
          { id: 'sl4', text: 'Satu slide dipenuhi 12 baris paragraf teks font 10pt agar seluruh materi rapat tidak tercecer di slide lain.', isError: true, errorReason: 'Slide bukan dokumen cetak (slideument); font 10pt memicu cognitive overload pada audiens' },
        ]
      : [
          { id: 'sl1', text: 'Menggunakan palet warna dengan maksimal 3 warna utama sesuai brand guideline.', isError: false },
          { id: 'sl2', text: 'Menempatkan teks warna abu-abu tipis di atas latar belakang abu-abu muda di ruang proyektor redup.', isError: true, errorReason: 'Rasio kontras tidak terbaca dari jarak lebih dari 2 meter' },
          { id: 'sl3', text: 'Setiap slide memuat satu ide pokok dengan hierarki ukuran teks yang tegas.', isError: false },
          { id: 'sl4', text: 'Menggunakan 5 jenis keluarga font artistik yang berbeda-beda dalam satu slide presentasi.', isError: true, errorReason: 'Terlalu banyak jenis font merusak keterbacaan dan hierarki visual' },
        ];

  // 6. Temukan Kesalahan: Elemen Pengotor Bagan Grafik (Chart Clutter)
  const q6Lines =
    variantQ6 === 'A'
      ? [
          { id: 'cc1', text: 'Garis tren data penjualan diberi label angka persentase langsung di setiap titik simpul.', isError: false },
          { id: 'cc2', text: 'Grafik batang digambar dengan efek tabung 3D tebal dan bayangan miring gelap di belakangnya.', isError: true, errorReason: 'Efek 3D dan bayangan adalah dekorasi semu yang mendistorsi persepsi skala ketinggian data riil' },
          { id: 'cc3', text: 'Sumbu X dan Y diberi label satuan mata uang rupiah yang jelas dan proporsional.', isError: false },
          { id: 'cc4', text: 'Latar belakang grafik diberi gambar pola wallpaper gedung perkantoran bermotif ramai.', isError: true, errorReason: 'Menempatkan gambar latar di belakang grafik mengaburkan garis data dan merusak keterbacaan' },
        ]
      : [
          { id: 'cc1', text: 'Batang data terpenting disorot dengan warna aksen emerald sementara batang lain berwarna abu-abu.', isError: false },
          { id: 'cc2', text: 'Menampilkan 3D Pie Chart berisi 14 irisan warna-warni menyala dengan legenda terpisah di sudut.', isError: true, errorReason: '3D Pie chart dengan banyak irisan menyulitkan mata membandingkan proporsi sudut data' },
          { id: 'cc3', text: 'Garis kisi bantu (gridlines) dibuat sangat tipis berwarna abu-abu halus agar tidak mengganggu.', isError: false },
          { id: 'cc4', text: 'Semua batang grafik diberi motif animasi berkedip-kedip saat ditayangkan di depan direksi.', isError: true, errorReason: 'Animasi berkedip mengalihkan fokus audiens dari pemahaman data yang sebenarnya' },
        ];

  // 7. Cocokkan: Formulasi Action Titles
  const q7Pairs = [
    {
      id: 'at-1',
      left: 'Judul topik pasif: "Data Logistik"',
      right: 'Action Title: "Efisiensi Rute Armada Memangkas Biaya Bahan Bakar 18% di Q3"',
    },
    {
      id: 'at-2',
      left: 'Judul topik pasif: "Survei Pelanggan"',
      right: 'Action Title: "85% Pelanggan Mengeluhkan Antrean Kasir, Membutuhkan Self-Checkout"',
    },
    {
      id: 'at-3',
      left: 'Judul topik pasif: "Laporan Kepegawaian"',
      right: 'Action Title: "Penerapan Jam Fleksibel Menurunkan Angka Keterlambatan Kerja Sebesar 40%"',
    },
    {
      id: 'at-4',
      left: 'Judul topik pasif: "Anggaran Kantor"',
      right: 'Action Title: "Digitalisasi Nota Menghemat Pembelian Kertas Hingga Rp25 Juta per Tahun"',
    },
  ];

  // 8. Urutan: Struktur Alur Presentasi Sidang Evaluasi Berbasis BLUF
  const q8RawItems = [
    {
      id: 'bluf-1',
      text:
        variantQ8 === 'A'
          ? '1. Rekomendasi di Awal (BLUF): Langsung paparkan kesimpulan hasil evaluasi dan usulan tindakan dalam 60 detik'
          : '1. Inti Keputusan (BLUF): Membuka slide pertama dengan rekomendasi strategis yang dibutuhkan pimpinan',
    },
    {
      id: 'bluf-2',
      text:
        variantQ8 === 'A'
          ? '2. Tiga Pilar Bukti Data: Menampilkan metrik kinerja kunci yang mendukung rekomendasi tersebut'
          : '2. Pembuktian Kuantitatif: Menyajikan grafik perbandingan capaian target vs realisasi di lapangan',
    },
    {
      id: 'bluf-3',
      text:
        variantQ8 === 'A'
          ? '3. Rencana Aksi & Dampak: Memaparkan tahapan implementasi, alokasi sumber daya, dan mitigasi risiko'
          : '3. Roadmap Implementasi: Menguraikan jadwal eksekusi dan estimasi penghematan biaya operasional',
    },
    {
      id: 'bluf-4',
      text:
        variantQ8 === 'A'
          ? '4. Tanya Jawab & Lampiran Teknis: Membuka sesi diskusi kritis dengan tabel rincian tersimpan di appendix'
          : '4. Sesi Tanya Jawab: Merujuk data rincian pada slide lampiran saat dewan direksi meminta detail teknis',
    },
  ];

  // 9. Temukan Kesalahan: Etiket Pembawaan Presentasi Slide
  const q9Lines =
    variantQ9 === 'A'
      ? [
          { id: 'sp1', text: 'Presenter menjaga kontak mata dengan peserta rapat dan menggunakan bahasa tubuh terbuka.', isError: false },
          { id: 'sp2', text: 'Presenter berdiri membelakangi audiens sambil membaca kata-per-kata seluruh teks di layar proyektor.', isError: true, errorReason: 'Presenter tidak boleh sekadar membaca teks slide; slide ada untuk audiens, presenter ada untuk mengelaborasi wawasan' },
          { id: 'sp3', text: 'Presenter menggunakan catatan pembicara (speaker notes) untuk mengingat angka detail tanpa memenuhkan slide.', isError: false },
          { id: 'sp4', text: 'Presenter memutar-mutar penunjuk laser merah ke seluruh sudut layar secara terus-menerus tanpa henti.', isError: true, errorReason: 'Gerakan laser liar membuat pusing dan mengalihkan fokus audiens dari poin inti' },
        ]
      : [
          { id: 'sp1', text: 'Presenter mengalokasikan waktu 10 menit untuk paparan dan 15 menit untuk diskusi tanya jawab.', isError: false },
          { id: 'sp2', text: 'Presenter berbicara dengan kecepatan dua kali lipat untuk mengejar penayangan 80 slide dalam 10 menit.', isError: true, errorReason: 'Beban slide berlebih merusak daya serap informasi audiens; kurangi jumlah slide daripada tergesa-gesa' },
          { id: 'sp3', text: 'Presenter mengulang pertanyaan penanya agar seluruh peserta ruangan mendengar dengan jelas.', isError: false },
          { id: 'sp4', text: 'Presenter membantah pertanyaan kritis audiens dengan nada defensif dan emosional.', isError: true, errorReason: 'Presenter harus merespons pertanyaan skeptis secara asertif, tenang, dan berbasis data objektif' },
        ];

  // 10. Klik Area: Zona Kartu Rasio Kontras Tinggi (WCAG AA Compliant)
  const q10Zones = [
    {
      id: 'z-c1',
      label: 'Teks Kuning Muda di atas Latar Putih (Rasio 1.4:1 - GAGAL WCAG)',
      isTarget: false,
      explanation: 'Kontras sangat rendah sehingga tidak terbaca di proyektor kantor.',
    },
    {
      id: 'z-c2',
      label: 'Teks Biru Navy Gelap di atas Latar Putih Bersih (Rasio 8.5:1 - LOLOS WCAG)',
      isTarget: true,
      explanation: 'Rasio 8.5:1 jauh melampaui batas minimum 4.5:1 WCAG AA, menjamin keterbacaan prima.',
    },
    {
      id: 'z-c3',
      label: 'Teks Abu-abu Terang di atas Latar Abu-abu Sedang (Rasio 2.1:1 - GAGAL WCAG)',
      isTarget: false,
      explanation: 'Kontras terlalu samar sehingga membuat mata audiens cepat lelah.',
    },
    {
      id: 'z-c4',
      label: 'Teks Merah Hati di atas Latar Hitam Pekat (Rasio 3.2:1 - GAGAL WCAG)',
      isTarget: false,
      explanation: 'Kontras di bawah 4.5:1 sehingga sulit dibedakan oleh peserta tunanetra warna.',
    },
  ];

  return [
    {
      id: 'D3-QZ-01',
      title: 'Struktur Alur Narasi Bisnis Kerangka SCQA',
      instruction: 'Urutkan empat tahap narasi SCQA Piramida Minto dari penetapan situasi hingga solusi:',
      type: 'urutan',
      items: shuffleGuaranteedDifferent(q1RawItems, ['scqa-situation', 'scqa-complication', 'scqa-question', 'scqa-answer'], rng),
      correctOrder: ['scqa-situation', 'scqa-complication', 'scqa-question', 'scqa-answer'],
      explanation: 'Alur SCQA: Situation (konteks bersama) -> Complication (pemicu masalah) -> Question (pertanyaan fokus) -> Answer (rekomendasi solusi).',
      conceptReference: 'The Minto Pyramid Principle',
    },
    {
      id: 'D3-QZ-02',
      title: 'Struktur Alur Pitch Deck Investor 10 Slide',
      instruction: 'Urutkan tahapan utama materi presentasi pitch deck usaha dari identifikasi masalah hingga kebutuhan investasi:',
      type: 'urutan',
      items: shuffleGuaranteedDifferent(q2RawItems, ['pitch-problem-solution', 'pitch-market-model', 'pitch-traction', 'pitch-ask'], rng),
      correctOrder: ['pitch-problem-solution', 'pitch-market-model', 'pitch-traction', 'pitch-ask'],
      explanation: 'Alur pitch deck: Masalah & Solusi -> Pasar & Monetisasi -> Validasi Traksi & Kredibilitas Tim -> Kebutuhan Dana Investasi (The Ask).',
      conceptReference: 'Venture Pitch Deck Architecture',
    },
    {
      id: 'D3-QZ-03',
      title: 'Pemilihan Jenis Bagan Visual Sesuai Tujuan Data',
      instruction: 'Pasangkan kebutuhan penyajian data dengan jenis diagram grafik yang paling optimal:',
      type: 'cocokkan',
      pairs: shuffleWithRng(q3Pairs, rng),
      explanation: 'Batang horizontal ideal untuk label panjang. Diagram garis untuk deret waktu. Diagram sebar untuk korelasi. Donut chart untuk 2 segmen kontras.',
      conceptReference: 'Data Visualization Principles',
    },
    {
      id: 'D3-QZ-04',
      title: 'Prinsip Tata Visual Slide Profesional',
      instruction: 'Pasangkan prinsip desain slide dengan penerapan praktisnya pada presentasi kantor:',
      type: 'cocokkan',
      pairs: shuffleWithRng(q4Pairs, rng),
      explanation: 'Whitespace memberi jeda bernapas visual. Contrast menciptakan fokus. Alignment menjamin kerapian grid. Consistency membangun brand profesional.',
      conceptReference: 'Slide Design & Presentation Zen',
    },
    {
      id: 'D3-QZ-05',
      title: 'Audit Aksesibilitas & Tata Letak Slide Presentasi',
      instruction: 'Klik 2 baris pernyataan di bawah yang melanggar standar aksesibilitas WCAG dan kenyamanan visual slide:',
      type: 'temukan-kesalahan',
      contextSnippet: {
        title: 'Review Draf Slide Laporan Kinerja Tahunan Perusahaan',
        subtitle: 'Divisi Komunikasi Perusahaan',
        lines: q5Lines,
      },
      requiredErrorCount: 2,
      explanation: 'Teks kuning di atas latar putih melanggar rasio kontras WCAG, dan memadatkan slide dengan paragraf 10pt memicu cognitive overload.',
      conceptReference: 'WCAG 2.2 Color Contrast & Slide Layout',
    },
    {
      id: 'D3-QZ-06',
      title: 'Deteksi Chart Clutter & Pelanggaran Data-Ink Ratio',
      instruction: 'Klik 2 elemen visual pada grafik di bawah yang termasuk chart clutter (pemborosan elemen non-data):',
      type: 'temukan-kesalahan',
      contextSnippet: {
        title: 'Review Grafik Analitik Laporan Keuangan Eksekutif',
        subtitle: 'Audit Data-Ink Ratio Tufte',
        lines: q6Lines,
      },
      requiredErrorCount: 2,
      explanation: 'Efek tabung 3D, bayangan semu, dan wallpaper latar belakang adalah chartjunk yang mengaburkan data riil.',
      conceptReference: 'Data-Ink Ratio & Chartjunk Elimination',
    },
    {
      id: 'D3-QZ-07',
      title: 'Transformasi Judul Topik Menjadi Action Titles',
      instruction: 'Pasangkan judul slide pasif dengan Action Title berupa kalimat kesimpulan yang tajam:',
      type: 'cocokkan',
      pairs: shuffleWithRng(q7Pairs, rng),
      explanation: 'Action Title menyatakan pesan atau tren kunci dalam satu kalimat utuh sehingga pengambil keputusan langsung menangkap inti pesan.',
      conceptReference: 'Executive Action Titles Standard',
    },
    {
      id: 'D3-QZ-08',
      title: 'Alur Presentasi Sidang Berbasis BLUF (Bottom Line Up Front)',
      instruction: 'Urutkan tahapan paparan presentasi eksekutif berdurasi 10 menit dengan pola Bottom Line Up Front:',
      type: 'urutan',
      items: shuffleGuaranteedDifferent(q8RawItems, ['bluf-1', 'bluf-2', 'bluf-3', 'bluf-4'], rng),
      correctOrder: ['bluf-1', 'bluf-2', 'bluf-3', 'bluf-4'],
      explanation: 'Pola BLUF: Inti rekomendasi di awal -> 3 pilar metrik pembuktian -> Roadmap aksi -> Sesi tanya jawab dengan detail tersimpan di lampiran.',
      conceptReference: 'Executive BLUF Presentation Model',
    },
    {
      id: 'D3-QZ-09',
      title: 'Audit Perilaku & Etiket Presenter di Depan Klien',
      instruction: 'Klik 2 perilaku presenter di bawah yang melanggar etiket pembawaan slide profesional:',
      type: 'temukan-kesalahan',
      contextSnippet: {
        title: 'Evaluasi Pembawaan Materi Presentasi Tender Bisnis',
        subtitle: 'Audit Komunikasi Lisan Presenter',
        lines: q9Lines,
      },
      requiredErrorCount: 2,
      explanation: 'Membelakangi audiens untuk membaca kata demi kata dari layar slide dan memutar-mutar laser liar merusak citra profesionalitas presenter.',
      conceptReference: 'Professional Presentation Delivery Etiquette',
    },
    {
      id: 'D3-QZ-10',
      title: 'Identifikasi Kartu Desain Berkontras Tinggi (WCAG AA)',
      instruction: 'Klik pada area kartu kombinasi warna teks dan latar belakang yang memenuhi standar aksesibilitas WCAG AA:',
      type: 'klik-area',
      previewImageOrBox: {
        title: 'Uji Rasio Kontras Warna Teks Terhadap Background (Ambang Batas Minimum 4.5:1)',
        zones: q10Zones,
      },
      explanation: 'Teks Biru Navy Gelap di atas Latar Putih Bersih memiliki rasio kontras 8.5:1, sangat terbaca dan memenuhi kriteria WCAG AA.',
      conceptReference: 'WCAG 2.2 AA Contrast Standards',
    },
  ];
}

export const D3_QUIZZES = generateSeededD3Quizzes(3003);
