/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D11: Manajemen Proyek & Produktivitas - Lessons
 */

export interface LessonSection {
  title: string;
  content: string;
  keyPoints: string[];
}

export interface D11Lesson {
  id: string;
  domainId: 'D11';
  title: string;
  summary: string;
  estimatedMinutes: number;
  lastReviewed: string;
  sources: string[];
  disclaimer: string;
  workedExample: {
    bad: string;
    good: string;
    explanation: string;
  };
  sections: LessonSection[];
}

export const D11_LESSONS: D11Lesson[] = [
  {
    id: 'D11-LES-01',
    domainId: 'D11',
    title: 'Matriks Eisenhower, Timeboxing & Manajemen Prioritas Kerja',
    summary:
      'Teknik klasifikasi 4 kuadran urgensi vs kepentingan, strategi alokasi waktu kalender terfokus, dan penghapusan tugas tidak produktif.',
    estimatedMinutes: 15,
    lastReviewed: '2026-10-29',
    sources: [
      'Project Management Institute: A Guide to the Project Management Body of Knowledge (PMBOK Guide – 7th Edition, 2021)',
      'Covey, S. R. (2020). The 7 Habits of Highly Effective People: Habit 3 Put First Things First (Simon & Schuster)',
    ],
    disclaimer:
      'Materi latihan produktivitas kantor. Bukan pengganti sertifikasi profesional PMP/CAPM.',
    workedExample: {
      bad: 'Daftar kerja harian hanya berupa daftar to-do tak berurutan: membalas semua email masuk pagi hari selama 3 jam, lalu terburu-buru mengerjakan laporan anggaran tender yang jatuh tempo sore ini sambil stres.',
      good: 'Menerapkan Matriks Eisenhower:\n1. Kuadran I (Mendesak & Penting): Finalisasi Laporan Anggaran Tender (blok waktu 08.30-11.00).\n2. Kuadran II (Tidak Mendesak & Penting): Merancang SOP Onboarding Karyawan Baru (blok waktu 13.00-14.30).\n3. Kuadran III (Mendesak tapi Tidak Penting): Membalas konfirmasi logistik rutin (delegasikan ke staf admin).\n4. Kuadran IV (Tidak Mendesak & Tidak Penting): Membaca obrolan grup non-kerja (hapus dari jam kerja).',
      explanation:
        'Contoh yang baik memprioritaskan tugas berbobot strategis tinggi (Kuadran I & II) dan mengalokasikan blok waktu fokus sebelum terdistraksi hal remeh.',
    },
    sections: [
      {
        title: '1. Empat Kuadran Matriks Prioritas Eisenhower',
        content:
          'Kunci produktivitas sejati bukanlah mengerjakan semua hal secepat mungkin, melainkan membedakan antara "Urgensi" (tekanan waktu sesaat) dan "Kepentingan" (dampak nyata terhadap sasaran kerja). Kuadran 1 adalah krisis dan tenggat terdekat. Kuadran 2 adalah investasi jangka panjang, pencegahan risiko, dan pembelajaran. Orang berkinerja tinggi memaksimalkan porsi waktu di Kuadran 2 agar tidak selalu terjebak memadamkan kebakaran di Kuadran 1.',
        keyPoints: [
          'Kuadran I (Penting & Mendesak): Kerjakan sekarang dengan fokus tinggi.',
          'Kuadran II (Penting & Tidak Mendesak): Jadwalkan blok waktu khusus kalender.',
          'Kuadran III (Tidak Penting & Mendesak): Delegasikan bila memungkinkan atau batasi waktunya.',
          'Kuadran IV (Tidak Penting & Tidak Mendesak): Pangkas dan eliminasi tanpa rasa bersalah.',
        ],
      },
      {
        title: '2. Metode Timeboxing: Melindungi Jam Emas Fokus Kerja',
        content:
          'Timeboxing adalah teknik menetapkan batas durasi pasti (misalnya 90 menit) untuk menyelesaikan suatu paket pekerjaan tanpa membuka notifikasi atau menerima panggilan non-darurat. Bila waktu habis, evaluasi progres sebelum memulai blok berikutnya. Ini mencegah fenomena Parkinson’s Law—di mana pekerjaan cenderung molor memenuhi seluruh waktu yang tersedia.',
        keyPoints: [
          'Bagi hari kerja menjadi 3-4 blok fokus terstruktur.',
          'Matikan notifikasi email dan obrolan instan selama sesi timebox berlangsung.',
          'Sediakan jeda penyangga (buffer 15-30 menit) antar-blok untuk merespons pesan tertunda.',
        ],
      },
    ],
  },
  {
    id: 'D11-LES-02',
    domainId: 'D11',
    title: 'Work Breakdown Structure (WBS) & Jadwal Proyek Gantt',
    summary:
      'Dekomposisi ruang lingkup proyek berprinsip aturan 100%, penetapan milestone pencapaian, dan analisis jalur kritis (Critical Path).',
    estimatedMinutes: 18,
    lastReviewed: '2026-10-29',
    sources: [
      'ISO 21500:2021 Project, programme and portfolio management — Context and concepts (ISO, 2021)',
      'Kerzner, H. (2017). Project Management: A Systems Approach to Planning, Scheduling, and Controlling (Wiley)',
    ],
    disclaimer:
      'Panduan edukatif manajemen proyek kantor untuk simulasi alur kerja tim profesional.',
    workedExample: {
      bad: 'Rencana Peluncuran Kantor Cabang Baru hanya ditulis satu baris: "Buka kantor cabang baru tanggal 15 November" tanpa rincian siapa mengerjakan apa, kapan renovasi fisik selesai, dan kapan izin terbit.',
      good: 'Menyusun WBS Hierarkis berjenjang:\n1.0 Proyek Pembukaan Kantor Cabang\n  1.1 Legalitas & Perizinan (Milestone: NIB terbit 10 Okt)\n  1.2 Fasilitas Fisik (Renovasi, Kelistrikan, Furnitur - 11 Okt s.d. 25 Okt)\n  1.3 Infrastruktur IT & Jaringan (Pengadaan router, LAN, Server - 26 Okt s.d. 2 Nov)\n  1.4 Rekrutmen Staf Lokal (Wawancara & Pelatihan - 15 Okt s.d. 5 Nov)\n  1.5 Grand Opening & Operasional Perdana (Milestone: 15 Nov)',
      explanation:
        'Contoh yang baik memecah proyek besar menjadi paket kerja terukur dengan milestone tegas sehingga mudah dimonitor dan dianalisis keterkaitannya.',
    },
    sections: [
      {
        title: '1. Aturan 100% (The 100% Rule) dalam WBS',
        content:
          'Work Breakdown Structure (WBS) wajib mencakup 100% seluruh pekerjaan yang disepakati dalam ruang lingkup proyek—tidak kurang dan tidak lebih. Anak elemen dari setiap paket kerja jika dijumlahkan harus tepat sama dengan induknya. Bila suatu tugas tidak ada di WBS, maka tugas itu berada di luar lingkup (out of scope) dan tidak boleh menyedot anggaran tanpa persetujuan perubahan resmi (change request).',
        keyPoints: [
          'Tingkat terbawah WBS disebut "Work Package" yang memiliki pemilik tugas dan estimasi durasi terukur.',
          'Gunakan kata benda (deliverable) atau frase hasil kerja pada WBS, bukan sekadar kata kerja kabur.',
          'Cegah penambahan ruang lingkup liar (scope creep) dengan berpegang teguh pada dokumen WBS yang disetujui.',
        ],
      },
      {
        title: '2. Bagan Gantt & Jalur Kritis (Critical Path Method)',
        content:
          'Bagan Gantt memvisualisasikan jadwal proyek secara horizontal di atas garis waktu. Jalur kritis (Critical Path) adalah rangkaian aktivitas berurutan terpanjang yang menentukan tanggal paling cepat proyek dapat diselesaikan. Keterlambatan satu hari saja pada aktivitas di jalur kritis akan langsung memundurkan tanggal akhir seluruh proyek.',
        keyPoints: [
          'Aktivitas pada jalur kritis memiliki kelonggaran waktu (float/slack) sebesar 0 hari.',
          'Aktivitas non-kritis memiliki batas kelonggaran sehingga dapat digeser tanpa mengganggu tenggat akhir proyek.',
          'Pantau milestone kunci sebagai tonggak verifikasi keberhasilan fase sebelum melangkah ke fase berikutnya.',
        ],
      },
    ],
  },
  {
    id: 'D11-LES-03',
    domainId: 'D11',
    title: 'Papan Visual Kanban, WIP Limits & Manajemen Risiko Proyek',
    summary:
      'Transparansi alur kerja dengan papan Kanban, pembatasan kerja berjalan (WIP), koordinasi harian tim, dan pemetaan register risiko.',
    estimatedMinutes: 16,
    lastReviewed: '2026-10-29',
    sources: [
      'Anderson, D. J., & Carmichael, A. (2016). Essential Kanban Condensed (Lean-Kanban University Press)',
      'ISO 31000:2018 Risk Management — Guidelines (ISO, 2018)',
    ],
    disclaimer:
      'Praktik tangkas (Agile/Kanban) untuk efisiensi tim perkantoran dan mitigasi risiko operasional.',
    workedExample: {
      bad: 'Papan tugas tim memiliki 20 kartu pekerjaan menumpuk di kolom "In Progress" yang semuanya dikerjakan setengah jadi oleh 3 anggota staf, tanpa ada satupun yang selesai tepat waktu.',
      good: 'Menetapkan Batas Kerja Berjalan (WIP Limit = 4) pada kolom "In Progress". Bila sudah ada 4 kartu aktif, staf dilarang menarik kartu baru dari "To Do" sebelum menuntaskan salah satu kartu yang ada ke kolom "Review" atau "Done". Jika terjadi sumbatan, seluruh tim membantu mengatasi kendala (swarming).',
      explanation:
        'Membatasi WIP mempercepat waktu siklus penyelesaian tugas (lead time) dan mencegah anggota tim kelebihan beban kognitif multi-tasking.',
    },
    sections: [
      {
        title: '1. Prinsip Utama Kanban: Visualisasi & Pembatasan WIP',
        content:
          'Kanban adalah sistem penarik (pull system) yang mengalirkan pekerjaan dari kiri ke kanan. Tujuannya adalah mengidentifikasi titik kemacetan (bottleneck) secara visual. Dengan menetapkan batas WIP (Work in Progress Limit), tim dipaksa untuk fokus menuntaskan pekerjaan yang sedang berlangsung daripada memulai pekerjaan baru (Stop starting, start finishing).',
        keyPoints: [
          'Visualisasikan alur kerja nyata: Backlog -> Siap Dikerjakan -> Dalam Proses -> Tinjauan Kualitas -> Selesai.',
          'WIP limit menjaga ritme kerja yang stabil (sustainable pace) bagi seluruh anggota tim.',
          'Gunakan daily standup 15 menit untuk mengecek hambatan (blocker), bukan untuk sesi perdebatan teknis panjang.',
        ],
      },
      {
        title: '2. Risk Register: Menghitung Probabilitas & Dampak Risiko',
        content:
          'Manajemen risiko proaktif mengidentifikasi potensi kendala sebelum menjadi masalah nyata. Setiap potensi ancaman dinilai berdasarkan dua variabel: Tingkat Kemungkinan (Probabilitas 1-5) dan Tingkat Kerugian (Dampak 1-5). Perkalian keduanya menghasilkan Tingkat Keparahan (Severity Score). Risiko berbobot merah wajib memiliki penanggung jawab (risk owner) dan rencana aksi mitigasi konkret.',
        keyPoints: [
          'Skor Risiko = Probabilitas x Dampak (Skala 1 s.d. 25).',
          'Empat strategi penanganan risiko: Hindari (Avoid), Mitigasi (Mitigate), Alihkan (Transfer), Terima (Accept).',
          'Perbarui Risk Register secara berkala setiap kali terjadi perubahan kondisi atau ruang lingkup proyek.',
        ],
      },
    ],
  },
];
