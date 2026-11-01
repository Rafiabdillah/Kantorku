/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D11: Manajemen Proyek & Produktivitas - Cheatsheets
 */

export interface CheatSheetItem {
  id: string;
  title: string;
  description: string;
  category: string;
  points: string[];
}

export const D11_CHEATSHEET: CheatSheetItem[] = [
  {
    id: 'cs-d11-01',
    title: 'Lembar Contekan Matriks Prioritas Eisenhower & Timeboxing',
    description: 'Panduan kilat membedakan urgensi vs kepentingan dan mengunci blok fokus kerja harian.',
    category: 'Produktivitas',
    points: [
      'Kuadran I (Mendesak & Penting): Eksekusi langsung. Ini krisis dan batas waktu terdekat.',
      'Kuadran II (Tidak Mendesak & Penting): Kunci waktu di kalender. Ini area inovasi dan kualitas tinggi.',
      'Kuadran III (Mendesak & Tidak Penting): Delegasikan ke orang lain atau tolak dengan sopan.',
      'Kuadran IV (Tidak Mendesak & Tidak Penting): Hapus total dari daftar aktivitas harian.',
      'Timeboxing: Buat blok 60-90 menit fokus penuh, beri jeda penyangga 15 menit untuk membalas chat.',
    ],
  },
  {
    id: 'cs-d11-02',
    title: 'Lembar Contekan Dekomposisi WBS & Aturan 100%',
    description: 'Panduan menyusun paket kerja hierarkis proyek tanpa meloloskan pekerjaan yang terlewat.',
    category: 'Manajemen Proyek',
    points: [
      'Aturan 100%: Total seluruh paket kerja turunan harus tepat sama dengan deliverable induknya.',
      'Gunakan penamaan berorientasi hasil (kata benda/frasa deliverable), bukan sekadar kata kerja.',
      'Setiap paket kerja terbawah (Work Package) harus memiliki pemilik tunggal dan estimasi durasi pasti.',
      'Jalur Kritis (Float = 0): Prioritaskan sumber daya utama pada aktivitas di jalur kritis.',
      'Perubahan lingkup wajib melalui formulir Change Request resmi untuk menyesuaikan waktu dan biaya.',
    ],
  },
];
