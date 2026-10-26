import { CaseFile } from '../types';

export const CASE_FILES: CaseFile[] = [
  {
    id: 'case-01-sayur',
    title: 'Rekap Penjualan Sayur Segar UMKM',
    industry: 'Toko Sayur Online UMKM',
    tier: 3,
    module: 'excel',
    channel: 'whatsapp',
    deadlineHours: 4,
    clientName: 'Pak Joko (Toko Sayur Segar)',
    character: 'sari',
    summary: 'Data penjualan sayur harian berantakan: ada sel kosong, harga tercampur spasi, dan butuh total omzet bersih.',
    emails: [
      {
        from: 'joko.sayur@mitra.com',
        subject: 'Rekap Penjualan Sayur Segar Minggu 1',
        timestamp: '08:15 WIB',
        body: 'Halo tim PT Maju Sejahtera, ini catatan penjualan seminggu kemarin dari kasir kami. Masih berantakan dan ada harga yang salah ketik. Tolong hitung total omzet bersih dan barang yang paling laris ya.',
        attachments: ['penjualan_minggu_1.xlsx'],
      },
    ],
    chats: [
      { sender: 'Bu Sari', role: 'Direktur Operasional', time: '08:20', message: 'Tolong prioritaskan ini ya. UMKM Pak Joko adalah mitra binaan strategis kita.' },
      { sender: 'Pak Reza', role: 'Finance', time: '08:21', message: 'Hati-hati, pisahkan retur pembeli agar laporan laba rugi tidak terdistorsi.' },
      { sender: 'Dimas', role: 'Rekan Tim', time: '08:22', message: 'Kemarin aku intip ada angka yang tersimpan sebagai teks di kolom B, cek formatnya dulu bro.' },
    ],
    voiceNotes: [
      {
        speaker: 'Pak Joko (Owner)',
        duration: '0:42',
        transcript: 'Halo mas/mbak, maaf ya kemarin anak kasir baru buru-buru, jadi beberapa catatan retur belum sempat dikurangkan. Tolong bantu dibereskan ya.',
      },
    ],
    clarifyingQuestions: [
      {
        id: 'q1',
        question: 'Apakah komoditas yang batal dibeli (status: Retur) harus dihitung dalam total omzet bersih?',
        options: [
          { id: 'opt-a', text: 'Keluarkan transaksi Retur dari total omzet penjualan bersih', isOptimal: true, bossResponse: 'Tepat sekali! Omzet bersih tidak boleh mencakup barang retur.' },
          { id: 'opt-b', text: 'Hitung semuanya saja tanpa melihat status retur', isOptimal: false, bossResponse: 'Kurang tepat, itu akan membuat omzet terlihat semu/fiktif.' },
        ],
      },
    ],
    scopeChange: {
      triggerAfterMinutes: 2,
      sender: 'Bu Sari',
      message: 'Eh, Pak Joko barusan telepon lagi: tolong tambahkan juga persentase kontribusi per komoditas ya!',
      newObjective: 'Hitung persentase omzet masing-masing komoditas terhadap total omzet di kolom C.',
    },
    initialData: {
      excel: {
        A1: { raw: 'Komoditas', isHeader: true },
        B1: { raw: 'Omzet Penjualan', isHeader: true },
        C1: { raw: 'Porsi Omzet', isHeader: true },
        A2: { raw: 'Bayam Organik' },
        B2: { raw: '450000', format: 'rupiah' },
        C2: { raw: '', format: 'percent' },
        A3: { raw: 'Wortel Brastagi' },
        B3: { raw: '750000', format: 'rupiah' },
        C3: { raw: '', format: 'percent' },
        A4: { raw: 'Tomat Ceri' },
        B4: { raw: '300000', format: 'rupiah' },
        C4: { raw: '', format: 'percent' },
        A5: { raw: 'TOTAL OMZET', isHeader: true },
        B5: { raw: '=SUM(B2:B4)', format: 'rupiah' },
        C5: { raw: '=SUM(C2:C4)', format: 'percent' },
      },
    },
    referenceSolutions: ['C2: =B2/$B$5, C3: =B3/$B$5, C4: =B4/$B$5'],
    reputationReward: 15,
    xpReward: 350,
    coinsReward: 120,
    mentorDebrief: {
      keyTakeaway: 'Penggunaan referensi absolut $B$5 mencegah pergeseran rumus pembagi saat ditarik ke baris berikutnya.',
      pitfallAvoided: 'Menghindari pembagian dengan nol atau sel kosong akibat rumus relatif yang tidak dikunci.',
      industryContext: 'Di sektor ritel & UMKM, kalkulasi persentase porsi kategori (product mix) krusial untuk penataan etalase toko.',
    },
  },

  {
    id: 'case-02-klinik',
    title: 'Audit Pasien BPJS & Rawat Jalan Klinik',
    industry: 'Klinik Kesehatan Pratama',
    tier: 4,
    module: 'excel',
    channel: 'email',
    deadlineHours: 5,
    clientName: 'dr. Ratna (Klinik Sehat Sentosa)',
    character: 'reza',
    summary: 'Klinik butuh pemisahan klaim pasien BPJS vs Umum secara otomatis dengan rumus IF dan rekap tarif.',
    emails: [
      {
        from: 'ratna@kliniksentosa.id',
        subject: 'Rekonsiliasi Klaim BPJS Bulan Oktober',
        timestamp: '09:00 WIB',
        body: 'Selamat pagi, data kunjungan pasien kami belum terpisah antara BPJS (tarif subsidi Rp 50.000) dan Pasien Umum (Rp 120.000). Mohon bantuannya agar klaim ke kantor BPJS tidak ditolak.',
      },
    ],
    chats: [
      { sender: 'Pak Reza', role: 'Finance Lead', time: '09:05', message: 'Gunakan IF bertingkat atau lookup tarif. Jangan sampai ada salah klaim satu rupiah pun!' },
      { sender: 'Maya', role: 'HR & Kepatuhan', time: '09:08', message: 'Pastikan data nama pasien anonim dan memenuhi kerahasiaan medis ya.' },
    ],
    clarifyingQuestions: [
      {
        id: 'q1',
        question: 'Apakah pasien BPJS yang mengambil obat khusus dikenakan biaya tambahan di luar subsidi?',
        options: [
          { id: 'opt-a', text: 'Sesuai regulasi faskes primer, obat khusus dicatat pada kolom iuran tambahan', isOptimal: true, bossResponse: 'Bagus! Regulasi faskes memang mewajibkan pemisahan iuran tambahan.' },
          { id: 'opt-b', text: 'Gabungkan saja ke dalam tarif pokok BPJS', isOptimal: false, bossResponse: 'Jangan! Itu melanggar aturan klaim BPJS.' },
        ],
      },
    ],
    initialData: {
      excel: {
        A1: { raw: 'Nama Pasien', isHeader: true },
        B1: { raw: 'Jenis Pasien', isHeader: true },
        C1: { raw: 'Biaya Klaim', isHeader: true },
        A2: { raw: 'Slamet Riyadi' },
        B2: { raw: 'BPJS' },
        C2: { raw: '', format: 'rupiah' },
        A3: { raw: 'Dewi Lestari' },
        B3: { raw: 'Umum' },
        C3: { raw: '', format: 'rupiah' },
        A4: { raw: 'Rudi Hartono' },
        B4: { raw: 'BPJS' },
        C4: { raw: '', format: 'rupiah' },
        A5: { raw: 'TOTAL KLAIM', isHeader: true },
        B5: { raw: '' },
        C5: { raw: '=SUM(C2:C4)', format: 'rupiah' },
      },
    },
    referenceSolutions: ['C2: =IF(B2="BPJS", 50000, 120000)'],
    reputationReward: 20,
    xpReward: 400,
    coinsReward: 150,
    mentorDebrief: {
      keyTakeaway: 'Kondisional IF memudahkan pengelompokan tarif otomatis tanpa perlu entri berulang oleh staf loket.',
      pitfallAvoided: 'Koreksi tarif ganda saat pasien berganti kategori jaminan kesehatan.',
      industryContext: 'Fasilitas kesehatan primer menuntut audit kepatuhan klaim yang ketat dari BPJS Kesehatan.',
    },
  },

  {
    id: 'case-03-web-umkm',
    title: 'Desain Landing Page Toko Kue Ibu Siti',
    industry: 'F&B Kuliner & UMKM',
    tier: 3,
    module: 'web',
    channel: 'whatsapp',
    deadlineHours: 6,
    clientName: 'Ibu Siti (Dapur Manis)',
    character: 'nadia',
    summary: 'Buat halaman profil toko kue responsif yang memuat header, kartu menu terlaris dengan flexbox, dan tombol order.',
    emails: [],
    chats: [
      { sender: 'Nadia', role: 'Marketing', time: '10:00', message: 'Ibu Siti ingin websitenya cantik dan gampang dibuka di HP pelanggan pas mau pesan kue ulang tahun.' },
      { sender: 'Kak Intan', role: 'IT Lead', time: '10:05', message: 'Gunakan semantic HTML dan CSS Flexbox responsif ya, jangan pakai tabel kuno untuk layout!' },
    ],
    voiceNotes: [
      {
        speaker: 'Ibu Siti',
        duration: '0:35',
        transcript: 'Mbak Nadia, tolong ya foto bolu kukus dan lapis legitnya ditata berdampingan rapi, tombol pesannya dibikin warna hijau biar mirip WA.',
      },
    ],
    clarifyingQuestions: [
      {
        id: 'q1',
        question: 'Apakah nomor WhatsApp pemesanan langsung ditautkan ke tombol?',
        options: [
          { id: 'opt-a', text: 'Tautkan tombol CTA ke link api.whatsapp.com dengan pesan pra-isi', isOptimal: true, bossResponse: 'Ide luar biasa! Konversi penjualan UMKM akan melonjak tinggi.' },
          { id: 'opt-b', text: 'Tampilkan teks nomor telepon polos tanpa link aktif', isOptimal: false, bossResponse: 'Pengguna HP akan kesulitan jika harus copy-paste nomor manual.' },
        ],
      },
    ],
    initialData: {
      html: `<header>
  <h1>Dapur Manis Ibu Siti</h1>
  <p>Kue Tradisional & Bolu Lembut Khas Nusantara</p>
</header>
<main>
  <div class="menu-container">
    <div class="menu-item">
      <h3>Bolu Gulung Pandan</h3>
      <p>Rp 65.000</p>
    </div>
    <div class="menu-item">
      <h3>Lapis Legit Wisman</h3>
      <p>Rp 150.000</p>
    </div>
  </div>
  <button class="btn-order">Pesan via WhatsApp</button>
</main>`,
      css: `header { text-align: center; padding: 20px; background: #fff7ed; }
h1 { color: #9a3412; margin: 0; }
.menu-container { display: flex; gap: 16px; padding: 20px; }
.menu-item { flex: 1; border: 1px solid #fed7aa; padding: 16px; border-radius: 12px; background: white; text-align: center; }
.btn-order { display: block; width: 100%; max-width: 240px; margin: 20px auto; padding: 12px; background: #16a34a; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }`,
    },
    referenceSolutions: ['Semantic HTML dengan header, main, dan .menu-container display: flex'],
    reputationReward: 25,
    xpReward: 450,
    coinsReward: 160,
    mentorDebrief: {
      keyTakeaway: 'Penggunaan semantik HTML (<header>, <main>) mempermudah bot Google mengindeks profil toko UMKM.',
      pitfallAvoided: 'Layout rusak pada layar kecil karena penggunaan Flexbox fluid.',
      industryContext: 'UMKM modern bertransformasi dari sekadar chat manual ke landing page terintegrasi untuk meningkatkan kepercayaan.',
    },
  },

  {
    id: 'case-04-kargo',
    title: 'Audit Tarif Ekspedisi & Logistik Antar Pulau',
    industry: 'Jasa Logistik & Ekspedisi Kargo',
    tier: 2,
    module: 'excel',
    channel: 'email',
    deadlineHours: 4,
    clientName: 'Pak Hendro (Lintas Nusantara Cargo)',
    character: 'reza',
    summary: 'Data manifest pengiriman antar pulau menumpuk: ada tarif surcharge luar pulau 15% di sel E1 yang harus dikunci, dan sel spasi tersembunyi.',
    emails: [
      {
        from: 'hendro@lintasnusan.id',
        subject: 'Rekonsiliasi Surcharge Muatan Kapal Cepat',
        timestamp: '10:15 WIB',
        body: 'Selamat siang rekan KantorKu, kami melampirkan manifes pengiriman kargo laut ke wilayah Indonesia Timur. Tolong hitung surcharge antar pulau 15% dari tarif dasar untuk tiap resi. Mohon gunakan formula yang terkunci ke sel referensi tarif E1.',
      },
    ],
    chats: [
      { sender: 'Pak Reza', role: 'Finance Lead', time: '10:20', message: 'Kunci alamat sel E1 dengan referensi absolut ($E$1). Jangan sampai formulanya meleset saat diaudit akuntan publik!' },
      { sender: 'Dimas', role: 'Operasional', time: '10:22', message: 'Waspada di kolom berat barang, ada data kiriman yang beratnya belum di-timbang ulang.' },
    ],
    voiceNotes: [
      {
        speaker: 'Pak Hendro (Direktur Kargo)',
        duration: '0:38',
        transcript: 'Halo mas/mbak, surcharge 15% ini ketentuan pelabuhan per bulan ini ya. Kalau bulan depan turun jadi 12%, kami tinggal ubah angka di sel E1 dan semua laporan harus otomatis update.',
      },
    ],
    clarifyingQuestions: [
      {
        id: 'q1',
        question: 'Bagaimana penanganan resi kargo yang masih dalam status transit pelabuhan transit?',
        options: [
          { id: 'opt-a', text: 'Tetap hitung surcharge berdasarkan tarif dasar manifes manifes resmi', isOptimal: true, bossResponse: 'Tepat sekali! Seluruh kargo aktif wajib dicadangkan biaya surchargenya.' },
          { id: 'opt-b', text: 'Tunda perhitungan sampai kapal sandar di dermaga tujuan', isOptimal: false, bossResponse: 'Kurang tepat, arus kas operasional kapal butuh perhitungan di muka.' },
        ],
      },
    ],
    initialData: {
      excel: {
        A1: { raw: 'Nomor Resi', isHeader: true },
        B1: { raw: 'Tarif Dasar', isHeader: true },
        C1: { raw: 'Surcharge Pulau', isHeader: true },
        D1: { raw: 'Tarif Surcharge:', isHeader: true },
        E1: { raw: '0.15', format: 'percent' },
        A2: { raw: 'LNC-JKT-AMB-01' },
        B2: { raw: '1200000', format: 'rupiah' },
        C2: { raw: '', format: 'rupiah' },
        A3: { raw: 'LNC-SBY-MKS-02' },
        B3: { raw: '850000', format: 'rupiah' },
        C3: { raw: '', format: 'rupiah' },
        A4: { raw: 'LNC-SMG-JAP-03' },
        B4: { raw: '2400000', format: 'rupiah' },
        C4: { raw: '', format: 'rupiah' },
        A5: { raw: 'TOTAL SURCHARGE', isHeader: true },
        C5: { raw: '=SUM(C2:C4)', format: 'rupiah' },
      },
    },
    referenceSolutions: ['C2: =B2*$E$1, C3: =B3*$E$1, C4: =B4*$E$1'],
    reputationReward: 20,
    xpReward: 380,
    coinsReward: 140,
    mentorDebrief: {
      keyTakeaway: 'Penggunaan referensi absolut $E$1 menjaga skalabilitas formula saat regulasi tarif pelabuhan diperbarui.',
      pitfallAvoided: 'Hardcoding persentase 0.15 di setiap baris yang berisiko fatal jika regulasi berubah.',
      industryContext: 'Industri logistik maritim Indonesia mengandalkan tabel penyesuaian bahan bakar (bunker surcharge) yang dinamis.',
    },
  },

  {
    id: 'case-05-resto',
    title: 'Rekonsiliasi Kasir & Bagi Hasil Waralaba Restoran',
    industry: 'F&B Kuliner Restoran Ayam Geprek',
    tier: 3,
    module: 'excel',
    channel: 'whatsapp',
    deadlineHours: 5,
    clientName: 'Bu Linda (Ayam Geprek Sambal Korek)',
    character: 'sari',
    summary: 'Kasir restoran mencampur penjualan Dine-in dengan Ojek Online. Potongan komisi platform 20% harus dihitung kondisional.',
    emails: [],
    chats: [
      { sender: 'Bu Linda', role: 'Owner Mitra', time: '11:00', message: 'Halo tim KantorKu! Laporan kasir shift malam kami kacau. Tolong pisahkan omzet bersih kami: kalau pesanan dari Ojol, kami cuma terima 80% karena dipotong komisi aplikasi 20%. Kalau Dine-in, kami terima 100% penuh.' },
      { sender: 'Bu Sari', role: 'Direktur Operasional', time: '11:04', message: 'Gunakan fungsi IF: =IF(B2="Ojol"; C2*0.8; C2). Pastikan hasil akhirnya akurat!' },
    ],
    voiceNotes: [
      {
        speaker: 'Bu Linda (Owner)',
        duration: '0:45',
        transcript: 'Tolong ya Bu Sari, kemarin staf kasir baru ada yang ketik diskon promo manual di kolom catatan. Jangan sampai omzet bersih kami minus karena salah hitung komisi aplikasi ya.',
      },
    ],
    clarifyingQuestions: [
      {
        id: 'q1',
        question: 'Bagaimana perlakuan biaya bungkus plastik dan paper bag untuk pesanan Ojol?',
        options: [
          { id: 'opt-a', text: 'Biaya kemasan masuk ke omzet kotor sebelum dipotong komisi aplikasi', isOptimal: true, bossResponse: 'Tepat! Sesuai kesepakatan merchant aplikasi delivery online.' },
          { id: 'opt-b', text: 'Keluarkan biaya kemasan dari laporan penjualan', isOptimal: false, bossResponse: 'Kurang tepat, selisih kas fisik akan tekor saat audit kasir harian.' },
        ],
      },
    ],
    initialData: {
      excel: {
        A1: { raw: 'Nomor Struk', isHeader: true },
        B1: { raw: 'Kanal Pesanan', isHeader: true },
        C1: { raw: 'Nilai Transaksi', isHeader: true },
        D1: { raw: 'Pendapatan Bersih Resto', isHeader: true },
        A2: { raw: 'TRX-901' },
        B2: { raw: 'Ojol' },
        C2: { raw: '150000', format: 'rupiah' },
        D2: { raw: '', format: 'rupiah' },
        A3: { raw: 'TRX-902' },
        B3: { raw: 'Dine-In' },
        C3: { raw: '85000', format: 'rupiah' },
        D3: { raw: '', format: 'rupiah' },
        A4: { raw: 'TRX-903' },
        B4: { raw: 'Ojol' },
        C4: { raw: '200000', format: 'rupiah' },
        D4: { raw: '', format: 'rupiah' },
        A5: { raw: 'TRX-904' },
        B5: { raw: 'Dine-In' },
        C5: { raw: '120000', format: 'rupiah' },
        D5: { raw: '', format: 'rupiah' },
        A6: { raw: 'TOTAL BERSIH RESTO', isHeader: true },
        D6: { raw: '=SUM(D2:D5)', format: 'rupiah' },
      },
    },
    referenceSolutions: ['D2: =IF(B2="Ojol", C2*0.8, C2)'],
    reputationReward: 25,
    xpReward: 420,
    coinsReward: 160,
    mentorDebrief: {
      keyTakeaway: 'Pemisahan margin bersih kanal daring vs luring dengan fungsi IF mencegah kebangkrutan tersembunyi akibat komisi platform.',
      pitfallAvoided: 'Menghitung omzet kotor sebagai laba tunai yang belum dipotong bagi hasil merchant fee.',
      industryContext: 'Bisnis F&B modern memiliki margin komisi agregator bervariasi antara 15% - 25% yang wajib dipantau per shift kasir.',
    },
  },

  {
    id: 'case-06-koperasi',
    title: 'Simpan Pinjam & Bunga Angsuran Koperasi Karyawan',
    industry: 'Koperasi Simpan Pinjam Karyawan',
    tier: 2,
    module: 'excel',
    channel: 'email',
    deadlineHours: 6,
    clientName: 'Pak Slamet (Koperasi Mandiri Berkah)',
    character: 'dimas',
    summary: 'Koperasi butuh pembagian cicilan pokok pinjaman dan kalkulasi bunga flat bulanan 1.5% di sel E1.',
    emails: [
      {
        from: 'slamet@koperasimandiri.org',
        subject: 'Permohonan Rekap Angsuran Pinjaman Anggota Periode November',
        timestamp: '13:00 WIB',
        body: 'Yth. Tim IT & Analis KantorKu, kami memohon bantuan formulasi tabel angsuran pinjaman lunak karyawan. Bunga flat koperasi adalah 1.5% per bulan yang tertera di sel E1. Mohon hitung angsuran bunga bulanan untuk tiap anggota.',
      },
    ],
    chats: [
      { sender: 'Dimas', role: 'Operasional', time: '13:05', message: 'Bro, hati-hati ya di kolom bunga, kalikan Pokok Pinjaman (kolom B) dengan sel bunga $E$1.' },
      { sender: 'Pak Reza', role: 'Finance Lead', time: '13:08', message: 'Gunakan tanda $ agar pembagian SHU tahunan koperasi akurat sampai ke rupiah terkecil.' },
    ],
    clarifyingQuestions: [
      {
        id: 'q1',
        question: 'Apakah anggota yang melunasi pinjaman lebih cepat dikenakan denda penalti?',
        options: [
          { id: 'opt-a', text: 'Bebas penalti sesuai AD/ART koperasi kekeluargaan', isOptimal: true, bossResponse: 'Bagus! Asas koperasi adalah gotong royong dan kesejahteraan anggota.' },
          { id: 'opt-b', text: 'Kenakan penalti perbankan konvensional', isOptimal: false, bossResponse: 'Kurang tepat, prinsip koperasi mengutamakan kemaslahatan anggota.' },
        ],
      },
    ],
    initialData: {
      excel: {
        A1: { raw: 'Nama Peminjam', isHeader: true },
        B1: { raw: 'Pokok Pinjaman', isHeader: true },
        C1: { raw: 'Bunga Bulanan', isHeader: true },
        D1: { raw: 'Suku Bunga:', isHeader: true },
        E1: { raw: '0.015', format: 'percent' },
        A2: { raw: 'Agus Setiawan' },
        B2: { raw: '10000000', format: 'rupiah' },
        C2: { raw: '', format: 'rupiah' },
        A3: { raw: 'Nurul Hidayah' },
        B3: { raw: '6000000', format: 'rupiah' },
        C3: { raw: '', format: 'rupiah' },
        A4: { raw: 'Bambang Kusuma' },
        B4: { raw: '15000000', format: 'rupiah' },
        C4: { raw: '', format: 'rupiah' },
        A5: { raw: 'TOTAL BUNGA KOPERASI', isHeader: true },
        C5: { raw: '=SUM(C2:C4)', format: 'rupiah' },
      },
    },
    referenceSolutions: ['C2: =B2*$E$1, C3: =B3*$E$1, C4: =B4*$E$1'],
    reputationReward: 20,
    xpReward: 390,
    coinsReward: 150,
    mentorDebrief: {
      keyTakeaway: 'Formulasi bunga pinjaman berbasis referensi absolut mempermudah simulasi bila Rapat Anggota Tahunan (RAT) mengubah suku bunga.',
      pitfallAvoided: 'Kekeliruan referensi sel saat formula ditarik ke ratusan baris buku pinjaman.',
      industryContext: 'Koperasi karyawan mengandalkan transparansi bunga flat untuk menjaga kepercayaan dan akuntabilitas kepengurusan.',
    },
  },

  {
    id: 'case-07-hotel',
    title: 'Rekapitulasi Reservasi Kamar & Pajak Hotel Melati',
    industry: 'Hospitality & Perhotelan Budget',
    tier: 3,
    module: 'excel',
    channel: 'email',
    deadlineHours: 5,
    clientName: 'Ibu Desi (Hotel Graha Mentari)',
    character: 'maya',
    summary: 'Hotel butuh perhitungan tarif kamar bersyarat (kamar Deluxe vs Standar) serta pajak daerah PB1 10%.',
    emails: [
      {
        from: 'desi@grahamantarihotel.com',
        subject: 'Rekap Tamu Menginap dan Pajak Daerah PB1',
        timestamp: '14:30 WIB',
        body: 'Selamat sore rekan KantorKu, kami melampirkan data reservasi akhir pekan. Tarif tipe kamar Standar adalah Rp 350.000 dan tipe Deluxe adalah Rp 600.000 per malam. Tolong bantu tentukan tarif kamar dengan rumus IF dan hitung pajak daerah PB1 10% di kolom sebelahnya.',
      },
    ],
    chats: [
      { sender: 'Maya', role: 'Kepatuhan & Legal', time: '14:35', message: 'Pajak Daerah (PB1) perhotelan adalah kewajiban hukum daerah. Pastikan rumus pajaknya tepat =D2*0.10!' },
      { sender: 'Bu Sari', role: 'Direktur Operasional', time: '14:38', message: 'Tipe kamar hanya ada dua: "Deluxe" atau "Standar". Gunakan IF sederhana di kolom tarif.' },
    ],
    clarifyingQuestions: [
      {
        id: 'q1',
        question: 'Apakah biaya sarapan pagi (breakfast) untuk tamu Deluxe sudah termasuk dalam tarif kamar?',
        options: [
          { id: 'opt-a', text: 'Sudah termasuk (all-inclusive) dalam paket kamar Deluxe', isOptimal: true, bossResponse: 'Tepat sekali! Itu standar layanan hospitality hotel bintang dan melati.' },
          { id: 'opt-b', text: 'Keluarkan sarapan dan tagih terpisah di kasir restoran', isOptimal: false, bossResponse: 'Tamu akan merasa dirugikan jika fasilitas paket tidak diakomodasi.' },
        ],
      },
    ],
    initialData: {
      excel: {
        A1: { raw: 'Nama Tamu', isHeader: true },
        B1: { raw: 'Tipe Kamar', isHeader: true },
        C1: { raw: 'Jumlah Malam', isHeader: true },
        D1: { raw: 'Subtotal Tarif', isHeader: true },
        E1: { raw: 'Pajak PB1 (10%)', isHeader: true },
        A2: { raw: 'Pak Hendra' },
        B2: { raw: 'Deluxe' },
        C2: { raw: '2', format: 'number' },
        D2: { raw: '', format: 'rupiah' },
        E2: { raw: '', format: 'rupiah' },
        A3: { raw: 'Ibu Ratih' },
        B3: { raw: 'Standar' },
        C3: { raw: '1', format: 'number' },
        D3: { raw: '', format: 'rupiah' },
        E3: { raw: '', format: 'rupiah' },
        A4: { raw: 'Pak Gunawan' },
        B4: { raw: 'Deluxe' },
        C4: { raw: '1', format: 'number' },
        D4: { raw: '', format: 'rupiah' },
        E4: { raw: '', format: 'rupiah' },
        A5: { raw: 'TOTAL PENDAPATAN & PAJAK', isHeader: true },
        D5: { raw: '=SUM(D2:D4)', format: 'rupiah' },
        E5: { raw: '=SUM(E2:E4)', format: 'rupiah' },
      },
    },
    referenceSolutions: ['D2: =IF(B2="Deluxe", 600000*C2, 350000*C2), E2: =D2*0.1'],
    reputationReward: 25,
    xpReward: 430,
    coinsReward: 170,
    mentorDebrief: {
      keyTakeaway: 'Kombinasi evaluasi tipe kamar dengan perkalian jumlah durasi menginap memberikan fleksibilitas penagihan invoice tamu hotel.',
      pitfallAvoided: 'Kekeliruan pelaporan setoran pajak daerah PB1 ke Dispenda yang berisiko denda administrasi perizinan.',
      industryContext: 'Sektor hospitality di Indonesia tunduk pada pemungutan Pajak Barang dan Jasa Tertentu (PBJT/PB1) sebesar 10% untuk kas daerah.',
    },
  },
  {
    id: 'case-08-word-sop',
    title: 'Penyusunan SOP Pengelolaan Kas & Serah Terima Aset',
    industry: 'Logistik & Distribusi Modern',
    tier: 3,
    module: 'word',
    channel: 'email',
    deadlineHours: 5,
    clientName: 'Pak Hendra (Auditor Mutu Internal)',
    character: 'hendra',
    summary: 'Auditor menemukan ketidakteraturan dalam prosedur serah terima laptop dan kasir cabang. Butuh dokumen SOP terstruktur dan format BAST resmi.',
    emails: [
      {
        from: 'hendra.audit@majusejahtera.com',
        subject: 'Temuan Audit Internal: Ketiadaan SOP Tertulis Cabang Barat',
        timestamp: '09:00 WIB',
        body: 'Yth. Tim Operasional, audit lapangan mendapati cabang baru belum memiliki SOP tertulis dengan nomor baku dan tabel berita acara serah terima (BAST). Tolong susun dokumen SOP resmi dengan bab Tujuan, Prosedur bernomor, dan tabel BAST.',
        attachments: ['temuan_audit_sop.pdf'],
      },
    ],
    chats: [
      { sender: 'Pak Hendra', role: 'Auditor Senior', time: '09:05', message: 'Pastikan ada bab 1.0 Tujuan dan 2.0 Prosedur Kerja bernomor ya.' },
      { sender: 'Maya', role: 'HR & Kepatuhan', time: '09:10', message: 'Cantumkan juga kolom nomor seri perangkat pada tabel BAST agar mudah dicek inventaris.' },
    ],
    clarifyingQuestions: [
      {
        id: 'q1',
        question: 'Bagaimana penataan urutan instruksi kerja pada bab Prosedur?',
        options: [
          { id: 'opt-a', text: 'Gunakan numbered list (daftar bernomor 1, 2, 3) secara kronologis', isOptimal: true, bossResponse: 'Tepat! Prosedur wajib berurutan secara kronologis.' },
          { id: 'opt-b', text: 'Gunakan paragraf bebas tanpa nomor', isOptimal: false, bossResponse: 'Keliru, paragraf bebas menyulitkan eksekusi lapangan.' },
        ],
      },
    ],
    initialData: {
      word: '<h1>STANDAR OPERASIONAL PROSEDUR (SOP)</h1><p>No Dokumen: SOP-LOG-2026-05 | Tanggal: 1 November 2026</p><h2>1.0 TUJUAN</h2><p>Menstandarkan tata cara penanganan kasir dan serah terima inventaris elektronik di seluruh kantor cabang.</p><h2>2.0 PROSEDUR KERJA</h2><ol><li>Memverifikasi fisik perangkat bersama staf penerima.</li><li>Mencatat nomor seri pada lembar berita acara.</li><li>Menandatangani dokumen BAST rangkap dua.</li></ol><h2>3.0 BERITA ACARA SERAH TERIMA</h2><table><thead><tr><th>No</th><th>Nama Aset</th><th>Nomor Seri</th><th>Kondisi</th></tr></thead><tbody><tr><td>1</td><td>Laptop ThinkPad E14</td><td>SN-LOG-901</td><td>Baik / Baru</td></tr><tr><td>2</td><td>Barcode Scanner USB</td><td>SN-LOG-902</td><td>Baik / Baru</td></tr></tbody></table>',
    },
    referenceSolutions: ['Dokumen SOP dengan H1, H2 Tujuan, H2 Prosedur bernomor, dan tabel BAST 3 baris'],
    reputationReward: 30,
    xpReward: 450,
    coinsReward: 180,
    mentorDebrief: {
      keyTakeaway: 'Dokumen SOP dan BAST yang tertib adalah fondasi sertifikasi ISO dan kepatuhan audit korporat.',
      pitfallAvoided: 'Risiko sengketa kehilangan inventaris aset bernilai puluhan juta rupiah.',
      industryContext: 'Perusahaan logistik modern mewajibkan rantai lacak (chain of custody) atas setiap aset fisik yang dipinjamkan kepada staf.',
    },
  },
  {
    id: 'case-09-word-proposal',
    title: 'Penyusunan Proposal Bisnis & RAB Pengadaan IT Rp 100 Jt',
    industry: 'Teknologi & Transformasi Kantor',
    tier: 3,
    module: 'word',
    channel: 'whatsapp',
    deadlineHours: 6,
    clientName: 'Ibu Sari Dewi (Direktur Operasional)',
    character: 'sari',
    summary: 'Direksi membutuhkan dokumen proposal pengadaan sistem komputer dan kasir terpadu untuk diajukan ke dewan komisaris.',
    emails: [
      {
        from: 'sari.dewi@majusejahtera.com',
        subject: 'URGENT: Draf Proposal Pengadaan Perangkat Baru',
        timestamp: '10:15 WIB',
        body: 'Halo, siapkan dokumen proposal komprehensif untuk pengadaan teknologi kantor cabang baru. Wajib memuat Ringkasan Eksekutif, Rencana Anggaran Biaya (RAB) bertabel, dan Jadwal Kerja.',
        attachments: ['memo_pengadaan_it.docx'],
      },
    ],
    chats: [
      { sender: 'Bu Sari', role: 'Direktur Operasional', time: '10:20', message: 'Tulis ringkasan eksekutif yang meyakinkan nilai efisiensinya bagi perusahaan.' },
      { sender: 'Pak Reza', role: 'Finance', time: '10:22', message: 'Total pagu anggaran maksimal Rp 100.000.000, jangan sampai salah hitung di tabel RAB.' },
    ],
    clarifyingQuestions: [
      {
        id: 'q1',
        question: 'Apakah tabel Rencana Anggaran Biaya wajib memuat rincian pos pengadaan?',
        options: [
          { id: 'opt-a', text: 'Ya, rincikan per pos pekerjaan (laptop, server, pelatihan) beserta alokasi dana', isOptimal: true, bossResponse: 'Tepat sekali, dewan komisaris menyukai transparansi rincian biaya.' },
          { id: 'opt-b', text: 'Tuliskan total angka gelondongan saja', isOptimal: false, bossResponse: 'Tidak boleh, proposal tanpa tabel pos biaya akan langsung ditolak.' },
        ],
      },
    ],
    initialData: {
      word: '<h1>PROPOSAL PENGADAAN TEKNOLOGI KANTOR</h1><h2>Ringkasan Eksekutif</h2><p>Inisiatif peningkatan kapasitas kerja staf operasional melalui penyediaan 10 unit komputer kerja dan jaringan cloud server terintegrasi.</p><h2>Rencana Anggaran Biaya (RAB)</h2><table><thead><tr><th>No</th><th>Pos Pekerjaan</th><th>Alokasi Dana</th></tr></thead><tbody><tr><td>1</td><td>Pengadaan Laptop Karyawan</td><td>Rp 70.000.000</td></tr><tr><td>2</td><td>Infrastruktur Jaringan & Cloud</td><td>Rp 20.000.000</td></tr><tr><td>3</td><td>Pelatihan Software Terpadu</td><td>Rp 10.000.000</td></tr></tbody></table><p>Total Nilai Pengadaan: <strong>Rp 100.000.000</strong></p>',
    },
    referenceSolutions: ['Proposal bisnis dengan H1, H2 Ringkasan Eksekutif, tabel RAB 3 pos, dan total tebal Rp 100 Juta'],
    reputationReward: 35,
    xpReward: 480,
    coinsReward: 190,
    mentorDebrief: {
      keyTakeaway: 'Proposal korporat yang memadukan narasi nilai bisnis dan transparansi tabel RAB memiliki rasio persetujuan dewan direksi tertinggi.',
      pitfallAvoided: 'Penolakan pendanaan modal kerja (CapEx) akibat proposal yang dinilai tidak transparan.',
      industryContext: 'Setiap pengadaan barang korporat di atas Rp 50 Juta wajib melalui mekanisme proposal formal bersetujuan multi-level.',
    },
  },
  {
    id: 'case-10-web-portal',
    title: 'Revitalisasi Portal Landing Page Layanan Pelanggan',
    industry: 'Startup Layanan Digital & E-Commerce',
    tier: 3,
    module: 'web',
    channel: 'email',
    deadlineHours: 5,
    clientName: 'Kak Intan (Lead Software Architect)',
    character: 'intan',
    summary: 'Portal layanan pelanggan sering dikomplain karena tombol tidak responsif di layar smartphone 360px. Kak Intan meminta restrukturisasi semantic, flexbox navbar, dan media query.',
    emails: [
      {
        from: 'intan.lead@majusejahtera.com',
        subject: 'Tiket Bug UI: Kompatibilitas Mobile Viewport Layanan',
        timestamp: '11:00 WIB',
        body: 'Halo tim frontend, banyak pelanggan membuka portal dari ponsel dan tombol kirim tertutup tepi layar. Tolong perbaiki dengan struktur semantik, flexbox space-between pada navbar, hero banner dengan CTA, dan @media (max-width: 768px).',
        attachments: ['mockup_portal_mobile.png'],
      },
    ],
    chats: [
      { sender: 'Kak Intan', role: 'Lead Architect', time: '11:05', message: 'Pastikan lolos zero horizontal scroll pada viewport smartphone ya.' },
      { sender: 'Nadia', role: 'Marketing', time: '11:07', message: 'Tombol Pesan Sekarang di banner utama harus sangat mencolok!' },
    ],
    clarifyingQuestions: [
      {
        id: 'q1',
        question: 'Bagaimana cara terbaik memastikan menu navbar tidak bertumpuk berantakan di layar ponsel?',
        options: [
          { id: 'opt-a', text: 'Gunakan flexbox space-between dan @media (max-width: 768px) dengan flex-direction: column', isOptimal: true, bossResponse: 'Tepat sekali! Itu adalah formula universal layout mobile-friendly.' },
          { id: 'opt-b', text: 'Kecilkan ukuran font sampai 6px agar tetap satu baris', isOptimal: false, bossResponse: 'Jangan! Teks 6px tidak terbaca dan melanggar standar aksesibilitas.' },
        ],
      },
    ],
    initialData: {
      html: '<header class="portal-nav">\n  <div class="logo"><strong>Layanan Digital Sejahtera</strong></div>\n  <nav><ul><li><a href="#fitur">Fitur</a></li><li><a href="#kontak">Bantuan</a></li></ul></nav>\n</header>\n<main>\n  <section class="hero-box">\n    <h1>Solusi Bantuan Kantor 24 Jam</h1>\n    <p>Layanan konsultasi operasional dan IT terpadu.</p>\n    <button class="cta-btn">Ajukan Tiket Sekarang</button>\n  </section>\n</main>\n<footer><p>&copy; 2026 PT Maju Sejahtera</p></footer>',
      css: '.portal-nav { display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; background: #0f172a; color: white; }\n.portal-nav ul { display: flex; gap: 14px; list-style: none; margin: 0; padding: 0; }\n.portal-nav a { color: #38bdf8; text-decoration: none; }\n.hero-box { padding: 40px 20px; text-align: center; background: #f8fafc; }\n.cta-btn { background: #10b981; color: white; padding: 12px 24px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }\n@media (max-width: 768px) {\n  .portal-nav { flex-direction: column; gap: 10px; }\n}',
    },
    referenceSolutions: ['Halaman web responsif dengan semantic tags, flexbox navbar, hero section, dan media query mobile'],
    reputationReward: 35,
    xpReward: 500,
    coinsReward: 200,
    mentorDebrief: {
      keyTakeaway: 'Desain responsif mobile-first menjamin konversi layanan pelanggan tetap tinggi di segala jenis perangkat.',
      pitfallAvoided: 'Pengguna meninggalkan situs (bounce) akibat navigasi yang rusak di ponsel.',
      industryContext: 'Di Indonesia, lebih dari 75% traffic portal publik berasal dari perangkat smartphone Android.',
    },
  },
];
