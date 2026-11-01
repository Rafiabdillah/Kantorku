/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D8: Operasional & Rantai Pasok - Numerical Constants & Formula Helpers
 * Strictly defined according to operations management models (Heizer & Render; Chopra & Meindl).
 */

export const D8_INVENTORY_CONSTANTS = {
  // 1. Parameter Model Economic Order Quantity (EOQ)
  annualDemandUnits: 10_000, // D: Kebutuhan barang tahunan = 10.000 unit/tahun
  orderCostPerOrder: 50_000, // S: Biaya pemesanan per order = Rp50.000
  holdingCostPerUnitPerYear: 1_000, // H: Biaya simpan per unit per tahun = Rp1.000
  // EOQ = sqrt((2 * D * S) / H) = sqrt((2 * 10.000 * 50.000) / 1.000) = sqrt(1.000.000) = 1.000 unit

  // 2. Frekuensi Pemesanan Tahunan & Hari Kerja
  workingDaysPerYear: 250, // 250 hari kerja operasional per tahun
  // Permintaan harian (d) = 10.000 / 250 = 40 unit/hari
  // Frekuensi pesanan per tahun = 10.000 / 1.000 = 10 kali pemesanan per tahun
  // Siklus antar pesanan = 250 / 10 = 25 hari kerja

  // 3. Lead Time & Buffer Safety Stock (Stok Pengaman)
  normalLeadTimeDays: 5, // Lead time pengiriman normal dari vendor = 5 hari kerja
  maxLeadTimeDays: 8, // Lead time terlama jika terjadi keterlambatan vendor = 8 hari kerja
  // Safety Stock (SS) = (maxLeadTime - normalLeadTime) * dailyDemand = (8 - 5) * 40 = 3 * 40 = 120 unit

  // 4. Titik Pesan Ulang (Reorder Point / ROP)
  // ROP = (dailyDemand * normalLeadTime) + Safety Stock = (40 * 5) + 120 = 200 + 120 = 320 unit

  // 5. Total Biaya Persediaan Tahunan (Total Annual Inventory Cost / TIC)
  // Biaya Pesan = (D / Q) * S = 10 * 50.000 = Rp500.000
  // Biaya Simpan = (Q / 2) * H = (1.000 / 2) * 1.000 = 500 * 1.000 = Rp500.000
  // TIC = Rp500.000 + Rp500.000 = Rp1.000.000 (Pada titik EOQ, Biaya Pesan persis sama dengan Biaya Simpan!)
} as const;

export function calculateEOQ(annualDemand: number, orderCost: number, holdingCost: number): number {
  if (holdingCost <= 0) return 0;
  return Math.round(Math.sqrt((2 * annualDemand * orderCost) / holdingCost));
}

export function calculateDailyDemand(annualDemand: number, workingDays: number): number {
  if (workingDays <= 0) return 0;
  return Math.round(annualDemand / workingDays);
}

export function calculateSafetyStock(maxLeadTime: number, normalLeadTime: number, dailyDemand: number): number {
  return Math.round((maxLeadTime - normalLeadTime) * dailyDemand);
}

export function calculateROP(dailyDemand: number, normalLeadTime: number, safetyStock: number): number {
  return Math.round(dailyDemand * normalLeadTime + safetyStock);
}

export function calculateOrderFrequency(annualDemand: number, eoq: number): number {
  if (eoq <= 0) return 0;
  return Math.round(annualDemand / eoq);
}

export function formatRupiahD8(amount: number): string {
  return 'Rp' + amount.toLocaleString('id-ID');
}
