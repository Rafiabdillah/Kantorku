/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D7: Keuangan Pribadi & Wirausaha - Cheat Sheets
 */

export interface D7CheatSheet {
  id: string;
  title: string;
  description: string;
  items: {
    label: string;
    description: string;
    example?: string;
  }[];
}

export const D7_CHEATSHEET: D7CheatSheet[] = [
  {
    id: 'cs-d7-01',
    title: 'Formula Kalkulasi Harga Jual & Titik Impas (BEP)',
    description: 'Rumus baku penentuan harga produk dan batas minimal penjualan usaha:',
    items: [
      {
        label: '1. Hitung HPP per Unit',
        description: 'HPP = Biaya Bahan Baku + Biaya Kemasan + Alokasi Biaya Variabel per Unit.',
        example: 'Rp 10.000 (bahan) + Rp 2.000 (kemasan) = Rp 12.000',
      },
      {
        label: '2. Tetapkan Harga Jual Berdasar Target Margin',
        description: 'Harga Jual = HPP / (1 - Target Margin %).',
        example: 'Target Margin 25%: Rp 12.000 / (1 - 0.25) = Rp 16.000',
      },
      {
        label: '3. Titik Impas Unit (BEP Unit)',
        description: 'BEP Unit = Total Biaya Tetap Bulanan / (Harga Jual per Unit - Biaya Variabel per Unit).',
        example: 'Sewa Rp 1.500.000 / (Rp 16.000 - Rp 12.000) = 375 unit per bulan',
      },
    ],
  },
  {
    id: 'cs-d7-02',
    title: 'Checklist Kesehatan Finansial Bulanan',
    description: 'Panduan evaluasi rutin arus kas dan kewajiban utang pribadi:',
    items: [
      {
        label: 'Debt-to-Income < 30%',
        description: 'Pastikan total cicilan utang bulanan Anda tidak melebihi 30% dari penghasilan bersih bulanan.',
      },
      {
        label: 'Dana Darurat Berjenjang',
        description: 'Lajang: 3x pengeluaran | Menikah: 6x pengeluaran | Usaha/Lepas: 9-12x pengeluaran.',
      },
      {
        label: 'Pemisahan Kas Usaha',
        description: 'Dilarang keras memakai uang kas usaha untuk keperluan konsumsi pribadi tanpa pencatatan penarikan dividen (prive) yang jelas.',
      },
    ],
  },
];
