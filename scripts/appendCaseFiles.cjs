/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
const fs = require('fs');

const path = 'src/content/caseFiles.ts';
let content = fs.readFileSync(path, 'utf-8');

const newCases = `  {
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
      html: '<header class="portal-nav">\\n  <div class="logo"><strong>Layanan Digital Sejahtera</strong></div>\\n  <nav><ul><li><a href="#fitur">Fitur</a></li><li><a href="#kontak">Bantuan</a></li></ul></nav>\\n</header>\\n<main>\\n  <section class="hero-box">\\n    <h1>Solusi Bantuan Kantor 24 Jam</h1>\\n    <p>Layanan konsultasi operasional dan IT terpadu.</p>\\n    <button class="cta-btn">Ajukan Tiket Sekarang</button>\\n  </section>\\n</main>\\n<footer><p>&copy; 2026 PT Maju Sejahtera</p></footer>',
      css: '.portal-nav { display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; background: #0f172a; color: white; }\\n.portal-nav ul { display: flex; gap: 14px; list-style: none; margin: 0; padding: 0; }\\n.portal-nav a { color: #38bdf8; text-decoration: none; }\\n.hero-box { padding: 40px 20px; text-align: center; background: #f8fafc; }\\n.cta-btn { background: #10b981; color: white; padding: 12px 24px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }\\n@media (max-width: 768px) {\\n  .portal-nav { flex-direction: column; gap: 10px; }\\n}',
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
`;

content = content.replace(/\];\s*$/, newCases);
fs.writeFileSync(path, content, 'utf-8');
console.log('Successfully appended 3 realistic Case Files!');
