const D4_SALE_SEED = [
  ['2026-01-10', 'Laptop', 12_000_000, 'Jakarta'], ['2026-01-18', 'Keyboard', 3_000_000, 'Bandung'],
  ['2026-02-05', 'Mouse', 2_000_000, 'Jakarta'], ['2026-02-20', 'Laptop', 15_000_000, 'Surabaya'],
  ['2026-03-03', 'Keyboard', 4_000_000, 'Jakarta'], ['2026-03-27', 'Mouse', 3_000_000, 'Bandung'],
  ['2026-01-22', 'Mouse', 2_500_000, 'Surabaya'], ['2026-02-08', 'Keyboard', 3_500_000, 'Jakarta'],
  ['2026-03-12', 'Laptop', 13_000_000, 'Bandung'], ['2026-01-05', 'Keyboard', 3_200_000, 'Jakarta'],
  ['2026-02-14', 'Mouse', 2_800_000, 'Bandung'], ['2026-03-19', 'Laptop', 16_000_000, 'Surabaya'],
  ['2026-01-27', 'Mouse', 2_200_000, 'Jakarta'], ['2026-02-26', 'Keyboard', 4_200_000, 'Surabaya'],
  ['2026-03-09', 'Mouse', 3_200_000, 'Jakarta'], ['2026-01-12', 'Laptop', 11_500_000, 'Bandung'],
  ['2026-02-17', 'Keyboard', 3_800_000, 'Bandung'], ['2026-03-24', 'Mouse', 2_700_000, 'Surabaya'],
  ['2026-01-30', 'Keyboard', 3_900_000, 'Surabaya'], ['2026-02-11', 'Laptop', 14_000_000, 'Jakarta'],
  ['2026-03-06', 'Keyboard', 4_500_000, 'Bandung'], ['2026-01-16', 'Mouse', 2_400_000, 'Jakarta'],
  ['2026-02-23', 'Mouse', 3_100_000, 'Surabaya'], ['2026-03-31', 'Laptop', 17_000_000, 'Jakarta'],
  ['2026-01-19', 'Keyboard', 3_600_000, 'Bandung'], ['2026-02-28', 'Laptop', 14_500_000, 'Bandung'],
  ['2026-03-15', 'Mouse', 2_900_000, 'Jakarta'], ['2026-01-08', 'Mouse', 2_600_000, 'Surabaya'],
  ['2026-02-03', 'Keyboard', 3_300_000, 'Jakarta'], ['2026-03-21', 'Laptop', 12_500_000, 'Surabaya'],
  ['2026-01-24', 'Laptop', 13_500_000, 'Jakarta'], ['2026-02-16', 'Mouse', 2_700_000, 'Bandung'],
  ['2026-03-02', 'Keyboard', 4_100_000, 'Surabaya'], ['2026-01-14', 'Mouse', 2_300_000, 'Bandung'],
  ['2026-02-09', 'Laptop', 15_500_000, 'Jakarta'], ['2026-03-28', 'Mouse', 3_400_000, 'Bandung'],
] as const;

export const D4_SQL_CONSTANTS = {
  months: ['Jan', 'Feb', 'Mar'] as const,
  products: ['Laptop', 'Keyboard', 'Mouse'] as const,
  sales: D4_SALE_SEED.map((row, index) => ({
    saleId: index + 1,
    saleDate: row[0],
    product: row[1],
    amount: row[2],
    region: row[3],
  })),
  minimumJanuaryAmount: 10_000_000,
} as const;
