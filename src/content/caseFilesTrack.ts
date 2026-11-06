import { CaseFile, TierLevel } from '../types';

type Tc = { description: string; input?: unknown[]; expected: unknown; hidden?: boolean };

interface JsCaseSpec {
  id: string;
  title: string;
  industry: string;
  tier: TierLevel;
  clientName: string;
  character: CaseFile['character'];
  channel: CaseFile['channel'];
  deadlineHours: number;
  summary: string;
  request: string;
  mentorNote: string;
  question: { text: string; good: string; goodReply: string; bad: string; badReply: string };
  starter: string;
  solution: string;
  testCases: Tc[];
  rewards: { reputation: number; xp: number; coins: number };
  debrief: { keyTakeaway: string; pitfallAvoided: string; industryContext: string };
}

function jsCase(s: JsCaseSpec): CaseFile {
  return {
    id: s.id,
    title: s.title,
    industry: s.industry,
    tier: s.tier,
    module: 'coding',
    channel: s.channel,
    deadlineHours: s.deadlineHours,
    clientName: s.clientName,
    character: s.character,
    summary: s.summary,
    emails: [
      {
        from: 'klien@example.org',
        subject: s.title,
        timestamp: '09:00 WIB',
        body: s.request,
      },
    ],
    chats: [{ sender: 'Kak Intan', role: 'IT Lead', time: '09:20', message: s.mentorNote }],
    clarifyingQuestions: [
      {
        id: 'q1',
        question: s.question.text,
        options: [
          { id: 'opt-a', text: s.question.good, isOptimal: true, bossResponse: s.question.goodReply },
          { id: 'opt-b', text: s.question.bad, isOptimal: false, bossResponse: s.question.badReply },
        ],
      },
    ],
    initialData: { code: s.starter },
    testCases: s.testCases,
    checkSolution: { code: s.solution },
    referenceSolutions: [s.solution],
    reputationReward: s.rewards.reputation,
    xpReward: s.rewards.xp,
    coinsReward: s.rewards.coins,
    mentorDebrief: s.debrief,
  };
}

/**
 * Kasus tambahan agar tiap tier 1 sampai 7 punya empat jalur: Excel, Web, JavaScript, serta Word dan Akademik.
 * Kasus JavaScript dinilai oleh sandbox lewat testCases, termasuk uji tersembunyi untuk kasus tepi.
 * Semua klien dan angka fiktif.
 */
export const TRACK_CASES: CaseFile[] = [
  // ---------------------------------------------------------------- JavaScript
  jsCase({
    id: 'case-t1-js-kasir',
    title: 'Fungsi Total Belanja untuk Kasir Warung',
    industry: 'Ritel Warung Kelontong',
    tier: 1,
    clientName: 'Bu Tini (Warung Berkah)',
    character: 'dimas',
    channel: 'whatsapp',
    deadlineHours: 2,
    summary: 'Perbaiki fungsi kasir yang hanya menjumlah harga satuan: total harus harga dikali jumlah beli tiap barang.',
    request: 'Kasir di warung saya salah hitung. Pembeli beli 2 barang seharga 5.000 dan 4 barang seharga 2.500, totalnya harus 20.000. Fungsi hitungTotalBelanja sekarang hanya menjumlah harga tanpa melihat jumlahnya.',
    mentorNote: 'Dua array sejajar: harga ke-i dikali jumlah ke-i. Keranjang kosong harus menghasilkan 0, bukan error.',
    question: {
      text: 'Bu Tini tidak bilang apakah ada diskon. Apa yang kamu lakukan?',
      good: 'Kerjakan perhitungan dasar dulu, lalu tanyakan apakah diskon akan ditambahkan di tahap berikutnya',
      goodReply: 'Tepat. Fungsi dasar yang benar lebih dulu, tambahan fitur menyusul setelah aturannya jelas.',
      bad: 'Tambahkan diskon 10% sendiri supaya terlihat lengkap',
      badReply: 'Diskon yang tidak diminta membuat total kasir berbeda dari yang dibayar pembeli.',
    },
    starter: 'function hitungTotalBelanja(harga, jumlah) {\n  let total = 0;\n  for (let i = 0; i < harga.length; i++) {\n    total += harga[i];\n  }\n  return total;\n}\n',
    solution: 'function hitungTotalBelanja(harga, jumlah) {\n  let total = 0;\n  for (let i = 0; i < harga.length; i++) {\n    total += harga[i] * jumlah[i];\n  }\n  return total;\n}\n',
    testCases: [
      { description: 'Dua barang dengan jumlah berbeda', input: [[5000, 2500], [2, 4]], expected: 20000 },
      { description: 'Satu barang', input: [[1000], [3]], expected: 3000 },
      { description: 'Keranjang kosong', input: [[], []], expected: 0, hidden: true },
      { description: 'Jumlah nol tidak menambah total', input: [[7000, 3000], [0, 2]], expected: 6000, hidden: true },
    ],
    rewards: { reputation: 15, xp: 280, coins: 110 },
    debrief: {
      keyTakeaway: 'Dua daftar yang sejajar dibaca dengan indeks yang sama, dan harga satuan tidak pernah cukup tanpa jumlahnya.',
      pitfallAvoided: 'Menjumlah harga saja dan tidak menguji keranjang kosong.',
      industryContext: 'Kesalahan kecil di kasir berulang setiap transaksi, jadi fungsi hitung perlu diuji sebelum dipakai.',
    },
  }),
  jsCase({
    id: 'case-t2-js-ongkir',
    title: 'Kalkulator Ongkos Kirim Per Kilogram',
    industry: 'Toko Daring dan Logistik',
    tier: 2,
    clientName: 'Pak Dedi (Toko Perlengkapan Dapur)',
    character: 'dimas',
    channel: 'whatsapp',
    deadlineHours: 3,
    summary: 'Hitung ongkir Rp 9.000 per kilogram yang dibulatkan ke atas, dengan paket di bawah satu kilo tetap ditagih satu kilo.',
    request: 'Kurir kami menagih Rp 9.000 per kilogram dan selalu membulatkan ke atas. Paket 1.001 gram dihitung 2 kg. Paket 300 gram tetap dihitung 1 kg. Buat fungsi hitungOngkir(beratGram) untuk keranjang di toko daring.',
    mentorNote: 'Math.ceil untuk pembulatan ke atas. Berat nol atau negatif bukan paket, kembalikan 0.',
    question: {
      text: 'Berat paket dari formulir kadang kosong atau negatif. Bagaimana fungsi menanganinya?',
      good: 'Kembalikan 0 untuk berat yang tidak valid dan catat di serah terima bahwa validasi formulir perlu ditambah',
      goodReply: 'Tepat. Fungsi aman dan sumber masalahnya dicatat.',
      bad: 'Biarkan saja, formulir pasti diisi benar',
      badReply: 'Data dari pengguna sering tidak rapi. Fungsi yang rapuh membuat ongkir tampil aneh.',
    },
    starter: 'function hitungOngkir(beratGram) {\n  const kilo = Math.round(beratGram / 1000);\n  return kilo * 9000;\n}\n',
    solution: 'function hitungOngkir(beratGram) {\n  if (!(beratGram > 0)) return 0;\n  const kilo = Math.max(1, Math.ceil(beratGram / 1000));\n  return kilo * 9000;\n}\n',
    testCases: [
      { description: 'Tepat satu kilogram', input: [1000], expected: 9000 },
      { description: 'Lebih sedikit dari satu gram di atas kilo dibulatkan ke atas', input: [1001], expected: 18000 },
      { description: 'Paket ringan tetap satu kilogram', input: [300], expected: 9000 },
      { description: 'Berat nol', input: [0], expected: 0, hidden: true },
      { description: 'Berat negatif', input: [-50], expected: 0, hidden: true },
      { description: 'Dua setengah kilogram', input: [2500], expected: 27000, hidden: true },
    ],
    rewards: { reputation: 20, xp: 360, coins: 140 },
    debrief: {
      keyTakeaway: 'Aturan pembulatan harus ditulis persis seperti kebijakan kurir, dan kasus tepi di 1000 gram perlu diuji.',
      pitfallAvoided: 'Math.round membulatkan 1.400 gram ke bawah dan merugikan toko.',
      industryContext: 'Ongkir yang salah dihitung terlalu murah menggerus margin di setiap pesanan.',
    },
  }),
  jsCase({
    id: 'case-t3-js-kategori',
    title: 'Rekap Penjualan per Kategori dari Daftar Transaksi',
    industry: 'Ritel dan Pasar Segar',
    tier: 3,
    clientName: 'Bu Siti (Pasar Segar)',
    character: 'dimas',
    channel: 'email',
    deadlineHours: 4,
    summary: 'Kelompokkan daftar transaksi mentah menjadi total per kategori memakai objek.',
    request: 'Aplikasi kasir mengekspor transaksi berupa daftar {kategori, nilai}. Saya butuh total per kategori untuk laporan mingguan: kelompokkanPenjualan(transaksi) mengembalikan objek seperti {sayur: 15000, buah: 8000}. Urutan kategori mengikuti kemunculan pertama.',
    mentorNote: 'Mulai dari objek kosong. Kategori yang belum ada harus diawali 0 sebelum ditambah, kalau tidak hasilnya NaN.',
    question: {
      text: 'Ada transaksi dengan nilai negatif karena retur. Apa perlakuanmu?',
      good: 'Ikut jumlahkan apa adanya sehingga retur mengurangi total, dan tulis keputusan itu di serah terima',
      goodReply: 'Tepat. Retur memang mengurangi penjualan bersih dan keputusannya terdokumentasi.',
      bad: 'Buang transaksi negatif supaya angka terlihat besar',
      badReply: 'Menyembunyikan retur membuat laporan lebih tinggi dari kenyataan.',
    },
    starter: 'function kelompokkanPenjualan(transaksi) {\n  const hasil = {};\n  for (const t of transaksi) {\n    hasil[t.kategori] = t.nilai;\n  }\n  return hasil;\n}\n',
    solution: 'function kelompokkanPenjualan(transaksi) {\n  const hasil = {};\n  for (const t of transaksi) {\n    hasil[t.kategori] = (hasil[t.kategori] || 0) + t.nilai;\n  }\n  return hasil;\n}\n',
    testCases: [
      {
        description: 'Dua kategori dengan satu kategori berulang',
        input: [[{ kategori: 'sayur', nilai: 12000 }, { kategori: 'buah', nilai: 8000 }, { kategori: 'sayur', nilai: 3000 }]],
        expected: { sayur: 15000, buah: 8000 },
      },
      { description: 'Satu transaksi', input: [[{ kategori: 'ikan', nilai: 25000 }]], expected: { ikan: 25000 } },
      { description: 'Daftar kosong', input: [[]], expected: {}, hidden: true },
      {
        description: 'Retur mengurangi total',
        input: [[{ kategori: 'sayur', nilai: 10000 }, { kategori: 'sayur', nilai: -2000 }]],
        expected: { sayur: 8000 },
        hidden: true,
      },
    ],
    rewards: { reputation: 25, xp: 440, coins: 170 },
    debrief: {
      keyTakeaway: 'Mengelompokkan data berarti menjumlahkan ke kunci yang sama, bukan menimpanya.',
      pitfallAvoided: 'Menimpa nilai alih-alih menambah, yang hanya menyisakan transaksi terakhir tiap kategori.',
      industryContext: 'Laporan per kategori menjadi dasar keputusan stok, jadi retur harus ikut terhitung.',
    },
  }),
  jsCase({
    id: 'case-t4-js-lembur',
    title: 'Hitung Upah Lembur Sesuai Aturan Pengupahan',
    industry: 'Sumber Daya Manusia',
    tier: 4,
    clientName: 'Maya (HR dan Kepatuhan)',
    character: 'maya',
    channel: 'email',
    deadlineHours: 5,
    summary: 'Upah lembur: jam pertama 1,5 kali upah per jam, jam berikutnya 2 kali, dengan upah per jam sepersepuluh tiga ratus gaji pokok per 173.',
    request: 'Upah per jam dihitung gaji pokok dibagi 173. Jam lembur pertama dibayar 1,5 kali upah per jam, jam kedua dan seterusnya 2 kali. Buat hitungUpahLembur(pokok, jam) yang mengembalikan rupiah bulat. Contoh: pokok 3.460.000 dan 3 jam lembur menghasilkan 110.000.',
    mentorNote: 'Pisahkan jam pertama dari sisanya. Gunakan Math.min dan Math.max supaya jam 0 dan jam 1 tidak menghasilkan angka negatif. Bulatkan di akhir.',
    question: {
      text: 'Ada karyawan dengan lembur setengah jam. Aturan yang dipakai perusahaan belum jelas. Apa yang kamu lakukan?',
      good: 'Terima jam desimal dan hitung proporsional, lalu minta Maya mengonfirmasi kebijakan pembulatan menit',
      goodReply: 'Tepat. Fungsi tetap benar untuk pecahan dan kebijakan resmi tinggal dikonfirmasi.',
      bad: 'Bulatkan setengah jam ke satu jam penuh karena lebih menguntungkan karyawan',
      badReply: 'Itu kebijakan yang tidak pernah disetujui dan menambah biaya perusahaan tanpa dasar.',
    },
    starter: 'function hitungUpahLembur(pokok, jam) {\n  const upahPerJam = pokok / 173;\n  return Math.round(upahPerJam * 1.5 * jam);\n}\n',
    solution: 'function hitungUpahLembur(pokok, jam) {\n  if (!(jam > 0)) return 0;\n  const upahPerJam = pokok / 173;\n  const jamPertama = Math.min(jam, 1);\n  const jamLanjut = Math.max(jam - 1, 0);\n  return Math.round(upahPerJam * (1.5 * jamPertama + 2 * jamLanjut));\n}\n',
    testCases: [
      { description: 'Tiga jam lembur', input: [3460000, 3], expected: 110000 },
      { description: 'Satu jam lembur', input: [3460000, 1], expected: 30000 },
      { description: 'Dua jam dengan gaji lain', input: [5190000, 2], expected: 105000 },
      { description: 'Tanpa lembur', input: [3460000, 0], expected: 0, hidden: true },
      { description: 'Setengah jam', input: [3460000, 0.5], expected: 15000, hidden: true },
    ],
    rewards: { reputation: 30, xp: 520, coins: 200 },
    debrief: {
      keyTakeaway: 'Tarif bertingkat dipisah menjadi bagian yang masing-masing mudah dibuktikan, lalu dijumlahkan.',
      pitfallAvoided: 'Mengalikan semua jam dengan 1,5 sehingga lembur panjang dibayar terlalu rendah.',
      industryContext: 'Kesalahan upah lembur berdampak langsung pada hak karyawan dan menjadi temuan saat audit ketenagakerjaan.',
    },
  }),
  jsCase({
    id: 'case-t5-js-stok',
    title: 'Rekonsiliasi Stok Sistem Melawan Hitungan Fisik',
    industry: 'Pergudangan',
    tier: 5,
    clientName: 'Pak Hendra (Kepala Gudang)',
    character: 'hendra',
    channel: 'email',
    deadlineHours: 6,
    summary: 'Bandingkan stok di sistem dan hasil hitung fisik, dan kembalikan hanya kode barang yang selisih, terurut menurut kode.',
    request: 'Setelah stock opname, saya punya dua objek: stok sistem dan stok fisik, keduanya {kodeBarang: jumlah}. Buat rekonsiliasiStok(sistem, fisik) yang mengembalikan daftar {kode, selisih} hanya untuk barang yang berbeda. Selisih adalah fisik dikurangi sistem. Barang yang tidak ada di salah satu sisi dianggap berjumlah 0. Urutkan menurut kode.',
    mentorNote: 'Gabungkan kunci dari kedua objek lebih dulu, karena barang yang hanya ada di fisik juga penting. Urutkan sebelum mengembalikan.',
    question: {
      text: 'Ada barang yang ada di fisik tetapi tidak terdaftar di sistem. Bagaimana laporanmu?',
      good: 'Tampilkan sebagai selisih positif dan tandai di serah terima bahwa barang itu perlu didaftarkan di sistem',
      goodReply: 'Tepat. Selisih terlihat dan penyebab strukturalnya ikut ditindaklanjuti.',
      bad: 'Abaikan karena sistem tidak mengenalnya',
      badReply: 'Barang tanpa catatan adalah risiko kehilangan dan pencatatan ganda yang paling sulit dilacak.',
    },
    starter: 'function rekonsiliasiStok(sistem, fisik) {\n  const hasil = [];\n  for (const kode of Object.keys(sistem)) {\n    if (sistem[kode] !== fisik[kode]) {\n      hasil.push({ kode, selisih: fisik[kode] - sistem[kode] });\n    }\n  }\n  return hasil;\n}\n',
    solution: 'function rekonsiliasiStok(sistem, fisik) {\n  const semuaKode = Array.from(new Set([...Object.keys(sistem), ...Object.keys(fisik)])).sort();\n  const hasil = [];\n  for (const kode of semuaKode) {\n    const selisih = (fisik[kode] || 0) - (sistem[kode] || 0);\n    if (selisih !== 0) hasil.push({ kode, selisih });\n  }\n  return hasil;\n}\n',
    testCases: [
      { description: 'Satu barang kurang, satu barang hanya ada di fisik', input: [{ A1: 10, B2: 5 }, { A1: 10, B2: 3, C3: 1 }], expected: [{ kode: 'B2', selisih: -2 }, { kode: 'C3', selisih: 1 }] },
      { description: 'Semua cocok', input: [{ A1: 4 }, { A1: 4 }], expected: [] },
      { description: 'Barang hilang dari fisik', input: [{ Z9: 4 }, {}], expected: [{ kode: 'Z9', selisih: -4 }], hidden: true },
      { description: 'Hasil terurut menurut kode', input: [{ B: 1, A: 1 }, { B: 2, A: 3 }], expected: [{ kode: 'A', selisih: 2 }, { kode: 'B', selisih: 1 }], hidden: true },
    ],
    rewards: { reputation: 30, xp: 580, coins: 230 },
    debrief: {
      keyTakeaway: 'Rekonsiliasi harus memeriksa gabungan dua sumber, bukan hanya satu sisi.',
      pitfallAvoided: 'Hanya menelusuri kunci sistem sehingga barang tak tercatat tidak pernah terlihat.',
      industryContext: 'Selisih stok kecil yang berulang sering menjadi tanda pencatatan yang bocor, bukan sekadar salah hitung.',
    },
  }),
  jsCase({
    id: 'case-t6-js-anggaran',
    title: 'Ringkasan Realisasi Anggaran Otomatis',
    industry: 'Keuangan Korporat',
    tier: 6,
    clientName: 'Pak Hendra (Direktur Keuangan)',
    character: 'hendra',
    channel: 'email',
    deadlineHours: 7,
    summary: 'Ringkas daftar pos anggaran menjadi total, persentase terpakai satu desimal, dan nama pos yang melebihi anggaran.',
    request: 'Buat ringkasAnggaran(pos) dari daftar {nama, anggaran, realisasi}. Hasilnya objek dengan urutan kunci totalAnggaran, totalRealisasi, persenTerpakai (realisasi total dibagi anggaran total, dalam persen dibulatkan satu desimal), dan posOver (nama pos yang realisasinya melebihi anggaran, sesuai urutan input). Daftar kosong menghasilkan semua nol dan posOver kosong.',
    mentorNote: 'Anggaran total nol membuat pembagian menjadi NaN. Tangani sebelum menghitung persen. Urutan kunci objek dibandingkan, jadi tulis sesuai permintaan.',
    question: {
      text: 'Ada pos dengan anggaran nol tetapi punya realisasi. Bagaimana kamu menanganinya?',
      good: 'Masukkan ke total dan tandai sebagai over, lalu laporkan di serah terima bahwa pos tanpa anggaran perlu dikonfirmasi',
      goodReply: 'Tepat. Pengeluaran tanpa anggaran adalah temuan yang harus terlihat.',
      bad: 'Lewati pos itu agar persentase tidak error',
      badReply: 'Menghilangkan pos bermasalah dari laporan justru menyembunyikan risiko terbesar.',
    },
    starter: 'function ringkasAnggaran(pos) {\n  let totalAnggaran = 0;\n  let totalRealisasi = 0;\n  for (const p of pos) {\n    totalAnggaran += p.anggaran;\n    totalRealisasi += p.realisasi;\n  }\n  return { totalAnggaran, totalRealisasi };\n}\n',
    solution: 'function ringkasAnggaran(pos) {\n  let totalAnggaran = 0;\n  let totalRealisasi = 0;\n  const posOver = [];\n  for (const p of pos) {\n    totalAnggaran += p.anggaran;\n    totalRealisasi += p.realisasi;\n    if (p.realisasi > p.anggaran) posOver.push(p.nama);\n  }\n  const persenTerpakai = totalAnggaran > 0 ? Math.round((totalRealisasi / totalAnggaran) * 1000) / 10 : 0;\n  return { totalAnggaran, totalRealisasi, persenTerpakai, posOver };\n}\n',
    testCases: [
      {
        description: 'Tiga pos dengan satu pos over',
        input: [[
          { nama: 'Perjalanan', anggaran: 20000000, realisasi: 21000000 },
          { nama: 'Pelatihan', anggaran: 15000000, realisasi: 13500000 },
          { nama: 'Perlengkapan', anggaran: 8000000, realisasi: 5000000 },
        ]],
        expected: { totalAnggaran: 43000000, totalRealisasi: 39500000, persenTerpakai: 91.9, posOver: ['Perjalanan'] },
      },
      {
        description: 'Tidak ada pos over',
        input: [[{ nama: 'ATK', anggaran: 1000, realisasi: 500 }]],
        expected: { totalAnggaran: 1000, totalRealisasi: 500, persenTerpakai: 50, posOver: [] },
      },
      { description: 'Daftar kosong', input: [[]], expected: { totalAnggaran: 0, totalRealisasi: 0, persenTerpakai: 0, posOver: [] }, hidden: true },
      {
        description: 'Pos tanpa anggaran tetap ditandai over',
        input: [[{ nama: 'Darurat', anggaran: 0, realisasi: 200 }]],
        expected: { totalAnggaran: 0, totalRealisasi: 200, persenTerpakai: 0, posOver: ['Darurat'] },
        hidden: true,
      },
    ],
    rewards: { reputation: 35, xp: 640, coins: 250 },
    debrief: {
      keyTakeaway: 'Ringkasan keuangan perlu menangani pembagi nol dan tetap memperlihatkan pos yang bermasalah.',
      pitfallAvoided: 'Menghasilkan NaN pada persentase dan menghilangkan pos tanpa anggaran dari laporan.',
      industryContext: 'Direktur keuangan membaca temuan lebih dulu, jadi daftar pos over yang akurat lebih berharga daripada total yang rapi.',
    },
  }),
  jsCase({
    id: 'case-t7-js-aruskas',
    title: 'Proyeksi Arus Kas dan Deteksi Bulan Terendah',
    industry: 'Perencanaan Keuangan Korporat',
    tier: 7,
    clientName: 'Dewan Komisaris (diwakili Bu Sari)',
    character: 'sari',
    channel: 'email',
    deadlineHours: 8,
    summary: 'Hitung saldo berjalan tiap bulan, saldo akhir, bulan dengan saldo terendah, dan apakah pernah defisit.',
    request: 'Komisaris ingin tahu kapan kas paling tipis. Buat proyeksiArusKas(saldoAwal, bulanan) dari daftar {masuk, keluar}. Hasilnya objek berurutan: saldoAkhir, bulanTerendah (nomor bulan berbasis 1 dengan saldo berjalan terendah, bulan paling awal bila sama, 0 jika tidak ada bulan), dan defisit (true bila saldo berjalan pernah di bawah nol).',
    mentorNote: 'Hitung saldo berjalan setelah tiap bulan, lalu bandingkan dengan saldo terendah sejauh ini. Pakai perbandingan ketat supaya bulan paling awal yang menang.',
    question: {
      text: 'Proyeksi ini berasal dari asumsi pemasukan yang belum pasti. Bagaimana kamu menyampaikannya?',
      good: 'Serahkan fungsinya dan catat bahwa hasil hanya sebaik asumsi pemasukan, dengan saran menjalankan skenario pesimis',
      goodReply: 'Tepat. Komisaris tahu batas ketepatan angka dan punya jalur untuk menguji risiko.',
      bad: 'Sajikan hasilnya sebagai prediksi pasti',
      badReply: 'Proyeksi bukan fakta. Menyajikannya sebagai kepastian menyesatkan keputusan besar.',
    },
    starter: 'function proyeksiArusKas(saldoAwal, bulanan) {\n  let saldo = saldoAwal;\n  for (const b of bulanan) {\n    saldo += b.masuk - b.keluar;\n  }\n  return { saldoAkhir: saldo };\n}\n',
    solution: 'function proyeksiArusKas(saldoAwal, bulanan) {\n  let saldo = saldoAwal;\n  let terendah = Infinity;\n  let bulanTerendah = 0;\n  let defisit = false;\n  bulanan.forEach((b, i) => {\n    saldo += b.masuk - b.keluar;\n    if (saldo < terendah) {\n      terendah = saldo;\n      bulanTerendah = i + 1;\n    }\n    if (saldo < 0) defisit = true;\n  });\n  return { saldoAkhir: saldo, bulanTerendah, defisit };\n}\n',
    testCases: [
      {
        description: 'Tiga bulan tanpa defisit',
        input: [100, [{ masuk: 50, keluar: 80 }, { masuk: 40, keluar: 90 }, { masuk: 120, keluar: 30 }]],
        expected: { saldoAkhir: 110, bulanTerendah: 2, defisit: false },
      },
      {
        description: 'Defisit di bulan pertama',
        input: [30, [{ masuk: 10, keluar: 50 }, { masuk: 100, keluar: 20 }]],
        expected: { saldoAkhir: 70, bulanTerendah: 1, defisit: true },
      },
      { description: 'Tanpa bulan', input: [500, []], expected: { saldoAkhir: 500, bulanTerendah: 0, defisit: false }, hidden: true },
      {
        description: 'Saldo terendah sama, pilih bulan paling awal',
        input: [10, [{ masuk: 0, keluar: 5 }, { masuk: 5, keluar: 0 }, { masuk: 0, keluar: 0 }]],
        expected: { saldoAkhir: 10, bulanTerendah: 1, defisit: false },
        hidden: true,
      },
    ],
    rewards: { reputation: 40, xp: 720, coins: 290 },
    debrief: {
      keyTakeaway: 'Saldo berjalan lebih informatif daripada saldo akhir, karena risiko kas terjadi di tengah periode.',
      pitfallAvoided: 'Hanya melaporkan saldo akhir sehingga bulan defisit di tengah periode tidak terlihat.',
      industryContext: 'Perusahaan yang untung di atas kertas tetap bisa gagal bayar bila kasnya kosong di bulan yang salah.',
    },
  }),

  // ---------------------------------------------------------------- Web tier 5 dan 7
  {
    id: 'case-t5-web-formulir',
    title: 'Formulir Pendaftaran yang Aksesibel dan Responsif',
    industry: 'Layanan Publik Digital',
    tier: 5,
    module: 'web',
    channel: 'email',
    deadlineHours: 8,
    clientName: 'Bu Laras (Kepala Layanan Digital)',
    character: 'maya',
    summary: 'Bangun formulir pendaftaran dengan label terhubung ke tiap kolom, struktur semantik, dan tata letak yang menyesuaikan layar kecil.',
    emails: [
      {
        from: 'laras.layanan@example.org',
        subject: 'Formulir Pendaftaran Layanan',
        timestamp: '09:00 WIB',
        body: 'Warga akan mendaftar dari ponsel, sebagian memakai pembaca layar. Saya mau formulir dengan nama, nomor ponsel, dan keperluan, plus tombol kirim. Setiap kolom harus punya label yang jelas, bukan hanya teks bayangan.',
      },
    ],
    chats: [
      { sender: 'Kak Intan', role: 'IT Lead', time: '09:15', message: 'Pakai form, label yang menunjuk id input, dan button bertipe submit. Susun kolom dengan flexbox dan sediakan satu breakpoint untuk layar sempit.' },
    ],
    clarifyingQuestions: [
      {
        id: 'q1',
        question: 'Bu Laras ingin formulir terlihat ringkas, dan usul menghapus label karena sudah ada teks bayangan. Apa jawabanmu?',
        options: [
          { id: 'opt-a', text: 'Pertahankan label yang terlihat dan jelaskan bahwa teks bayangan hilang saat mengetik dan tidak dibaca semua pembaca layar', isOptimal: true, bossResponse: 'Tepat. Ringkas boleh, tetapi tidak dengan mengorbankan warga yang membutuhkan label.' },
          { id: 'opt-b', text: 'Hapus label sesuai permintaan karena klien yang memutuskan', isOptimal: false, bossResponse: 'Formulir publik yang tidak bisa dipakai pembaca layar melanggar prinsip layanan untuk semua warga.' },
        ],
      },
    ],
    initialData: {
      html: '<h1>Pendaftaran Layanan</h1>\n<p>Isi data berikut untuk membuat antrean.</p>',
      css: 'body { font-family: sans-serif; margin: 0; padding: 16px; color: #0f172a; }',
    },
    webRequirements: { requiredTags: ['form', 'label', 'input', 'button'], requireSemantic: true, requireFlexbox: true, minMediaQueries: 1 },
    checkSolution: {
      html: '<header><p>Layanan Digital Warga</p></header><main><form action="#" method="post"><div class="field"><label for="nama">Nama lengkap</label><input id="nama" name="nama" type="text" autocomplete="name" required></div><div class="field"><label for="ponsel">Nomor ponsel</label><input id="ponsel" name="ponsel" type="tel" autocomplete="tel" required></div><div class="field"><label for="keperluan">Keperluan</label><input id="keperluan" name="keperluan" type="text" required></div><button type="submit">Kirim pendaftaran</button></form></main><footer><p>Data hanya dipakai untuk membuat antrean.</p></footer>',
      css: 'form { display: flex; flex-direction: row; flex-wrap: wrap; gap: 16px; align-items: flex-end; }\n.field { display: flex; flex-direction: column; gap: 4px; flex: 1 1 200px; }\ninput { padding: 10px; border: 1px solid #475569; border-radius: 6px; font-size: 1rem; }\nbutton { padding: 12px 20px; background: #1d4ed8; color: #ffffff; border: 0; border-radius: 6px; font-size: 1rem; }\n@media (max-width: 560px) { form { flex-direction: column; align-items: stretch; } }',
    },
    referenceSolutions: ['form dengan label for/id, input bertipe sesuai, tombol submit, flexbox, dan media query'],
    reputationReward: 35,
    xpReward: 600,
    coinsReward: 240,
    mentorDebrief: {
      keyTakeaway: 'Label yang terhubung ke kolom menjadikan formulir dapat dipakai pembaca layar dan menambah area ketuk di ponsel.',
      pitfallAvoided: 'Mengganti label dengan teks bayangan yang hilang saat pengguna mulai mengetik.',
      industryContext: 'Layanan publik harus bisa dipakai semua warga, sehingga aksesibilitas bagian dari syarat kerja dan bukan hiasan.',
    },
  },
  {
    id: 'case-t7-web-dasbor',
    title: 'Dasbor Operasional Responsif dan Siap Cetak',
    industry: 'Operasional Korporat',
    tier: 7,
    module: 'web',
    channel: 'email',
    deadlineHours: 10,
    clientName: 'Dewan Komisaris (diwakili Bu Sari)',
    character: 'sari',
    summary: 'Bangun dasbor dengan navigasi, panel metrik, tabel rincian, gambar beralt teks, dan gaya khusus untuk dicetak.',
    emails: [
      {
        from: 'sari.operasional@example.org',
        subject: 'Dasbor untuk Rapat Komisaris',
        timestamp: '06:45 WIB',
        body: 'Komisaris membaca dari tablet dan sebagian mencetak. Saya butuh dasbor dengan navigasi antar bagian, panel metrik, tabel rincian cabang, dan satu grafik sebagai gambar. Hasil cetaknya tidak boleh menampilkan navigasi.',
      },
    ],
    chats: [
      { sender: 'Kak Intan', role: 'IT Lead', time: '07:00', message: 'Panel pakai class panel di dalam grid, header baris pakai flexbox. Siapkan tiga media query: tablet, ponsel, dan print. Gambar wajib beralt teks yang bermakna.' },
    ],
    clarifyingQuestions: [
      {
        id: 'q1',
        question: 'Grafik hanya berupa gambar. Bagaimana kamu memastikan isinya sampai ke pembaca layar dan hasil cetak?',
        options: [
          { id: 'opt-a', text: 'Beri alt yang menyebut kesimpulan grafik dan tetap sertakan tabel angkanya', isOptimal: true, bossResponse: 'Tepat. Kesimpulan dan data tetap tersedia tanpa melihat gambar.' },
          { id: 'opt-b', text: 'Isi alt dengan kata "grafik"', isOptimal: false, bossResponse: 'Alt yang hanya menyebut jenis gambar tidak memberi tahu apa isinya.' },
        ],
      },
    ],
    initialData: {
      html: '<h1>Dasbor Operasional</h1>\n<p>Halaman menunggu data resmi.</p>',
      css: 'body { font-family: sans-serif; margin: 0; padding: 16px; background: #f8fafc; color: #0f172a; }',
    },
    webRequirements: { requiredTags: ['nav', 'table', 'img'], requiredClasses: ['panel'], requireGrid: true, requireFlexbox: true, requireSemantic: true, requireImgAlt: true, minMediaQueries: 3 },
    checkSolution: {
      html: '<header><nav><a href="#ringkasan">Ringkasan</a> <a href="#cabang">Cabang</a></nav></header><main><section id="ringkasan" class="panel-grid"><article class="panel"><h2>Pendapatan</h2><p>[DATA CONTOH]</p></article><article class="panel"><h2>Biaya</h2><p>[DATA CONTOH]</p></article><article class="panel"><h2>Laba</h2><p>[DATA CONTOH]</p></article></section><section id="cabang"><h2>Rincian cabang</h2><table><thead><tr><th>Cabang</th><th>Laba</th></tr></thead><tbody><tr><td>Cabang A</td><td>[DATA CONTOH]</td></tr></tbody></table><img src="grafik-laba.png" alt="Grafik laba per cabang: data contoh, belum menunjukkan angka resmi"></section></main><footer><p>Data menunggu konfirmasi tim keuangan.</p></footer>',
      css: '.panel-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }\n.panel { display: flex; flex-direction: column; gap: 6px; padding: 16px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; }\nnav { display: flex; gap: 16px; }\nimg { max-width: 100%; height: auto; }\n@media (max-width: 900px) { .panel-grid { grid-template-columns: repeat(2, 1fr); } }\n@media (max-width: 560px) { .panel-grid { grid-template-columns: 1fr; } }\n@media print { nav { display: none; } body { background: #ffffff; } }',
    },
    referenceSolutions: ['panel-grid dengan display: grid, panel flexbox, nav, tabel, gambar beralt, dan media query tablet, ponsel, serta print'],
    reputationReward: 45,
    xpReward: 760,
    coinsReward: 300,
    mentorDebrief: {
      keyTakeaway: 'Dasbor untuk pembaca senior harus bekerja di tablet, di layar kecil, dan di kertas, dengan kesimpulan yang tidak hanya hidup di dalam gambar.',
      pitfallAvoided: 'Alt gambar yang kosong makna dan hasil cetak yang memuat menu navigasi.',
      industryContext: 'Bahan rapat komisaris sering dicetak. Gaya cetak yang benar membuat dokumen siap dibaca tanpa penyuntingan ulang.',
    },
  },

  // ---------------------------------------------------------------- Word dan Akademik, tier 6
  {
    id: 'case-t6-word-penelitian',
    title: 'Naskah Penelitian Terapan Kepuasan Layanan',
    industry: 'Akademik: Penelitian Terapan',
    tier: 6,
    module: 'word',
    channel: 'email',
    deadlineHours: 12,
    clientName: 'Dr. Wulan (Dosen Pembimbing)',
    character: 'maya',
    summary: 'Susun naskah ringkas bergaya akademik dengan latar belakang, rumusan masalah, metode, tabel hasil, catatan kaki, dan daftar pustaka.',
    emails: [
      {
        from: 'wulan.pembimbing@example.ac.id',
        subject: 'Naskah Ringkas Penelitian',
        timestamp: '13:00 WIB',
        body: 'Mohon susun naskah ringkas untuk penelitian kepuasan layanan perpustakaan kampus. Struktur wajib: Latar Belakang, Rumusan Masalah, Metode, Hasil dengan tabel, dan Daftar Pustaka. Sumber harus ditandai dengan catatan kaki. Data hasil pakai contoh dan tandai jelas sebagai contoh.',
      },
    ],
    chats: [
      { sender: 'Maya', role: 'Pendamping Akademik', time: '13:20', message: 'Jangan mengarang kutipan atau angka responden. Tandai data contoh dan pakai sumber yang memang ada. Bila belum ada, tulis bahwa sumber menunggu dari pembimbing.' },
    ],
    clarifyingQuestions: [
      {
        id: 'q1',
        question: 'Dr. Wulan belum memberi daftar sumber, padahal naskah butuh catatan kaki. Apa yang kamu lakukan?',
        options: [
          { id: 'opt-a', text: 'Beri penanda catatan kaki dengan keterangan bahwa sumber menunggu dari pembimbing, dan minta daftarnya', isOptimal: true, bossResponse: 'Tepat. Struktur siap dan tidak ada sumber yang dikarang.' },
          { id: 'opt-b', text: 'Tulis nama penulis dan tahun yang terdengar masuk akal', isOptimal: false, bossResponse: 'Kutipan fiktif adalah pelanggaran integritas akademik, sekalipun hanya draf.' },
        ],
      },
    ],
    initialData: {
      word: '<h1>Kepuasan Layanan Perpustakaan Kampus</h1><p>Naskah ringkas penelitian terapan.</p>',
    },
    wordRequirements: {
      scale: 'akademik', academicPreset: true, requireH1: true, requireH2: true, requireTable: true, minTableRows: 3, requireFootnote: true, requireBold: true,
      minWords: 200, requiredKeywords: ['Latar Belakang', 'Rumusan Masalah', 'Metode', 'Daftar Pustaka'],
    },
    checkSolution: {
      word: '<h2>Latar Belakang</h2><p>Perpustakaan kampus melayani mahasiswa dari berbagai program studi. Pengelola membutuhkan gambaran kepuasan pengguna agar keputusan jam layanan, koleksi, dan ruang baca berdasar pada data, bukan pada kesan sesaat[1].</p><h2>Rumusan Masalah</h2><p>Penelitian ini menjawab dua pertanyaan: seberapa puas mahasiswa terhadap layanan perpustakaan, dan aspek layanan mana yang paling perlu dibenahi.</p><h2>Metode</h2><p>Penelitian memakai survei kuesioner dengan skala satu sampai lima kepada mahasiswa yang dipilih acak dari tiap program studi. Analisis menggunakan rata-rata skor per aspek layanan. <strong>Data pada tabel berikut adalah data contoh</strong> dan akan diganti dengan data lapangan setelah pengumpulan selesai.</p><h2>Hasil</h2><table><thead><tr><th>Aspek layanan</th><th>Rata-rata skor (data contoh)</th><th>Keterangan</th></tr></thead><tbody><tr><td>Koleksi buku</td><td>[DATA CONTOH]</td><td>Menunggu data lapangan</td></tr><tr><td>Jam layanan</td><td>[DATA CONTOH]</td><td>Menunggu data lapangan</td></tr><tr><td>Ruang baca</td><td>[DATA CONTOH]</td><td>Menunggu data lapangan</td></tr></tbody></table><p>Interpretasi hasil akan ditulis setelah data lapangan tersedia. Keterbatasan penelitian ini mencakup jumlah responden yang belum final dan kemungkinan bias pada mahasiswa yang lebih sering berkunjung. Tindak lanjut disusun bersama pengelola perpustakaan berdasarkan aspek dengan skor terendah. Setiap temuan akan dibahas dengan membandingkan skor antarprogram studi, kemudian dirumuskan menjadi rekomendasi singkat yang dapat dijalankan pengelola pada semester berikutnya.</p><h2>Daftar Pustaka</h2><p>[1] Sumber menunggu daftar dari dosen pembimbing; penulis tidak mencantumkan rujukan yang belum diverifikasi.</p>',
    },
    referenceSolutions: ['Struktur Latar Belakang, Rumusan Masalah, Metode, Hasil bertabel, catatan kaki, dan Daftar Pustaka dengan data yang ditandai contoh'],
    reputationReward: 40,
    xpReward: 700,
    coinsReward: 280,
    mentorDebrief: {
      keyTakeaway: 'Naskah akademik dinilai dari kejujuran sumber dan kejelasan metode lebih dulu, baru kemudian dari gaya bahasanya.',
      pitfallAvoided: 'Mengarang kutipan atau angka responden demi terlihat lengkap.',
      industryContext: 'Draf yang menandai data contoh dan sumber tertunda memudahkan pembimbing menilai, dan tidak berisiko menjadi plagiarisme atau fabrikasi data.',
    },
  },
];
