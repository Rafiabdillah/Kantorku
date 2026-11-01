/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D10: SDM & Kepemimpinan - Numerical Constants & Formula Helpers
 * Strictly defined in accordance with:
 * - PP No. 35 Tahun 2021 (Perhitungan Upah Lembur & Waktu Kerja)
 * - Permenaker No. 6 Tahun 2016 (Tunjangan Hari Raya Keagamaan)
 * - UU BPJS (BPJS Kesehatan & Ketenagakerjaan)
 */

export const D10_PAYROLL_CONSTANTS = {
  // 1. Upah Bulanan Standar (Upah Pokok + Tunjangan Tetap)
  // Dipilih 5.190.000 agar habis dibagi 173 (konstanta resmi PP No. 35/2021)
  monthlySalary: 5_190_000, // Rp5.190.000
  overtimeDivisor: 173, // Pembagi resmi per jam kerja sebulan
  // Upah per jam = 5.190.000 / 173 = Rp30.000 per jam

  // 2. Skenario Lembur Hari Kerja Biasa: 3 Jam Lembur (Pasal 31 ayat 2 PP 35/2021)
  overtimeHoursWorked: 3, // 3 jam lembur
  hour1Multiplier: 1.5, // Jam lembur pertama: 1.5x upah per jam = Rp45.000
  hourNextMultiplier: 2.0, // Jam lembur ke-2 dan ke-3: 2.0x upah per jam = 2 x Rp60.000 = Rp120.000
  // Total Uang Lembur 3 Jam = 45.000 + 120.000 = Rp165.000

  // 3. Skenario Tunjangan Hari Raya (THR Keagamaan - Permenaker No. 6/2016)
  // Karyawan A: Masa kerja 18 bulan (>= 12 bulan)
  tenureMonthsWorkerA: 18,
  // THR Karyawan A = 1 x upah sebulan = Rp5.190.000

  // Karyawan B: Masa kerja 8 bulan (prorata: masa kerja / 12 * upah sebulan)
  tenureMonthsWorkerB: 8,
  // THR Karyawan B = (8 / 12) * 5.190.000 = Rp3.460.000

  // 4. Potongan Iuran BPJS Kesehatan (Sesuai Perpres No. 64/2020)
  bpjsKesehatanCompanyPercent: 4, // 4% ditanggung pemberi kerja = Rp207.600
  bpjsKesehatanEmployeePercent: 1, // 1% dipotong dari gaji karyawan = Rp51.900

  // 5. Take-Home Pay Karyawan Dasar (Bulan Biasa tanpa lembur, dengan potongan BPJS Kesehatan)
  // Gaji Bersih = 5.190.000 - 51.900 = Rp5.138.100
} as const;

export function calculateHourlyWage(monthlySalary: number): number {
  return Math.round(monthlySalary / D10_PAYROLL_CONSTANTS.overtimeDivisor);
}

export function calculateWeekdayOvertimePay(hourlyWage: number, hours: number): number {
  if (hours <= 0) return 0;
  if (hours <= 1) {
    return Math.round(hourlyWage * D10_PAYROLL_CONSTANTS.hour1Multiplier * hours);
  }
  const firstHourPay = Math.round(hourlyWage * D10_PAYROLL_CONSTANTS.hour1Multiplier);
  const remainingHours = hours - 1;
  const nextHoursPay = Math.round(hourlyWage * D10_PAYROLL_CONSTANTS.hourNextMultiplier * remainingHours);
  return firstHourPay + nextHoursPay;
}

export function calculateTHR(monthlySalary: number, tenureMonths: number): number {
  if (tenureMonths < 1) return 0;
  if (tenureMonths >= 12) return monthlySalary;
  return Math.round((tenureMonths / 12) * monthlySalary);
}

export function calculateBpjsKesehatanEmployeeDeduction(monthlySalary: number): number {
  return Math.round((monthlySalary * D10_PAYROLL_CONSTANTS.bpjsKesehatanEmployeePercent) / 100);
}

export function formatRupiahD10(amount: number): string {
  return 'Rp' + amount.toLocaleString('id-ID');
}
