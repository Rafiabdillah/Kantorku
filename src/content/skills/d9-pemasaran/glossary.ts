/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D9: Pemasaran & Penjualan - Glossary Definitions
 */

export interface GlossaryItem {
  id: string;
  term: string;
  definition: string;
  category: string;
}

export const D9_GLOSSARY: GlossaryItem[] = [
  {
    id: 'd9-term-cac',
    term: 'Customer Acquisition Cost (CAC)',
    definition:
      'Total biaya yang dikeluarkan untuk mendapatkan satu pelanggan baru, dihitung dari total biaya pemasaran dibagi jumlah pelanggan baru yang didapat.',
    category: 'Metrik Finansial',
  },
  {
    id: 'd9-term-roas',
    term: 'Return on Ad Spend (ROAS)',
    definition:
      'Rasio efisiensi belanja iklan spesifik, dihitung dari total pendapatan penjualan yang diatribusikan ke iklan dibagi total biaya belanja iklan.',
    category: 'Metrik Iklan',
  },
  {
    id: 'd9-term-ltv',
    term: 'Customer Lifetime Value (LTV)',
    definition:
      'Estimasi total pendapatan kotor atau laba yang akan disumbangkan oleh seorang pelanggan selama kurun waktu hubungannya dengan perusahaan.',
    category: 'Metrik Finansial',
  },
  {
    id: 'd9-term-buyer-persona',
    term: 'Buyer Persona',
    definition:
      'Representasi semi-fiktif dari pelanggan ideal yang dibangun berdasarkan riset pasar dan data riil pembeli, mencakup demografi, motivasi, dan tantangannya.',
    category: 'Riset Pasar',
  },
  {
    id: 'd9-term-uvp',
    term: 'Unique Value Proposition (UVP)',
    definition:
      'Pernyataan jelas yang menjelaskan manfaat unik dari solusi produk, bagaimana produk menyelesaikan masalah pelanggan, dan pembedanya dari pesaing.',
    category: 'Strategi Merek',
  },
  {
    id: 'd9-term-aida',
    term: 'Formula AIDA',
    definition:
      'Kerangka kerja copywriting klasik yang memandu pembaca melalui empat tahapan psikologis: Attention (Atensi), Interest (Minat), Desire (Keinginan), dan Action (Aksi).',
    category: 'Copywriting',
  },
  {
    id: 'd9-term-4p',
    term: 'Bauran Pemasaran (Marketing Mix 4P)',
    definition:
      'Kombinasi empat variabel operasional pemasaran: Product (Produk), Price (Harga), Place (Distribusi), dan Promotion (Promosi) untuk memenuhi kebutuhan pasar.',
    category: 'Strategi Pemasaran',
  },
];
