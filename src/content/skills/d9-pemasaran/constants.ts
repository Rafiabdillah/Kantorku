/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D9: Pemasaran & Penjualan - Numerical Constants & Formula Helpers
 * Strictly defined as constants to power lesson examples, levels, and quizzes dynamically.
 */

export const D9_MARKETING_CONSTANTS = {
  // 1. Digital Ads Campaign (Meta & Google Ads)
  adSpend: 5_000_000, // Rp5.000.000 belanja iklan digital
  adRevenue: 25_000_000, // Rp25.000.000 omzet atribusi langsung dari iklan
  // ROAS = adRevenue / adSpend = 25M / 5M = 5.0x (500%)

  // 2. Customer Acquisition Cost (CAC) & Total Monthly Marketing
  totalMarketingCost: 15_000_000, // Rp15.000.000 (iklan + gaji tim konten + software)
  totalNewCustomersAcquired: 75, // 75 pelanggan baru terakuisisi
  // CAC = totalMarketingCost / totalNewCustomersAcquired = 15.000.000 / 75 = Rp200.000 / pelanggan

  // 3. Customer Lifetime Value (LTV / CLV)
  averageOrderValue: 400_000, // Rp400.000 rata-rata belanja per transaksi
  annualPurchaseFrequency: 3, // 3 kali transaksi per tahun
  expectedTenureYears: 2, // rata-rata loyalitas 2 tahun
  // LTV = averageOrderValue * annualPurchaseFrequency * expectedTenureYears = 400k * 3 * 2 = Rp2.400.000
  // LTV / CAC Ratio = 2.400.000 / 200.000 = 12.0x (Sangat sehat, standar bisnis sehat >= 3x)

  // 4. Overall Marketing ROI
  totalCampaignRevenue: 30_000_000, // Rp30.000.000 total pendapatan kotor kampanye
  // Net Profit = 30.000.000 - 15.000.000 = Rp15.000.000
  // ROI = ((30.000.000 - 15.000.000) / 15.000.000) * 100% = 100%

  // 5. Digital Funnel Conversion
  websiteVisitors: 10_000, // 10.000 kunjungan landing page
  leadsGenerated: 500, // 500 prospek mengisi formulir kontak
  payingCustomers: 100, // 100 transaksi berhasil
  // Lead Conversion Rate = (500 / 10.000) * 100% = 5.0%
  // Sales Conversion Rate dari Leads = (100 / 500) * 100% = 20.0%
  // Overall Conversion Rate = (100 / 10.000) * 100% = 1.0%
} as const;

export function calculateROAS(revenue: number, spend: number): number {
  if (spend <= 0) return 0;
  return revenue / spend;
}

export function calculateCAC(totalCost: number, newCustomers: number): number {
  if (newCustomers <= 0) return 0;
  return Math.round(totalCost / newCustomers);
}

export function calculateLTV(aov: number, freq: number, tenure: number): number {
  return aov * freq * tenure;
}

export function calculateROI(revenue: number, cost: number): number {
  if (cost <= 0) return 0;
  return ((revenue - cost) / cost) * 100;
}

export function formatRupiah(amount: number): string {
  return 'Rp' + amount.toLocaleString('id-ID');
}
