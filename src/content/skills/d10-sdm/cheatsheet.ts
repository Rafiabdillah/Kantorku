/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D10: SDM & Kepemimpinan - Cheatsheet
 */

export interface CheatsheetItem {
  id: string;
  title: string;
  category: string;
  points: string[];
}

export const D10_CHEATSHEET: CheatsheetItem[] = [
  {
    id: 'd10-cs-formula-payroll',
    title: 'Formula Resmi Lembur & THR (PP 35/2021 & Permenaker 6/2016)',
    category: 'Penggajian & Remunerasi',
    points: [
      'Upah Per Jam = 1/173 * Upah Sebulan (Upah Pokok + Tunjangan Tetap)',
      'Lembur Hari Kerja: Jam ke-1 = 1.5x upah sejam; Jam ke-2 dst = 2.0x upah sejam',
      'Batas Maksimal Lembur: 4 jam per hari dan 18 jam per minggu (di luar hari libur)',
      'THR Masa Kerja >= 12 Bulan = 1 bulan upah penuh',
      'THR Masa Kerja < 12 Bulan (Prorata) = (Masa Kerja dalam bulan / 12) * 1 bulan upah',
      'Uang Kompensasi PKWT = (Masa Kerja dalam bulan / 12) * 1 bulan upah (minimal 1 bulan kerja)',
      'Iuran BPJS Kesehatan: 4% ditanggung perusahaan, 1% dipotong dari pekerja',
    ],
  },
  {
    id: 'd10-cs-kepatuhan-pkwt-sp',
    title: 'Pedoman Kepatuhan Kontrak PKWT & Prosedur SP',
    category: 'Regulasi & Disiplin Kerja',
    points: [
      'PKWT tidak boleh mensyaratkan masa percobaan (probation) — batal demi hukum',
      'Jangka waktu PKWT maksimal 5 tahun akumulatif termasuk perpanjangan',
      'Wajib dibuat tertulis dalam Bahasa Indonesia dan dicatatkan ke dinas tenaga kerja',
      'Model Konseling Kinerja: Situation (waktu/konteks), Behavior (fakta tindakan), Impact (dampak)',
      'Surat Peringatan Berjenjang: SP 1, SP 2, dan SP 3 masing-masing berlaku selama 6 bulan',
      'Cuti Tahunan: Minimal 12 hari kerja setelah bekerja 12 bulan terus-menerus',
    ],
  },
];
