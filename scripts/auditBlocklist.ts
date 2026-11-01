/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu - Skills & Content Audit Prohibited Blocklist
 * Strictly ensures no real-world brand names, real public figures, or unethical promises exist in simulation content.
 */

export const PROHIBITED_REAL_BRANDS = [
  'bca',
  'bank mandiri',
  'bni',
  'bri',
  'cimb niaga',
  'bank permata',
  'shopee',
  'tokopedia',
  'bukalapak',
  'lazada',
  'blibli',
  'tiktok shop',
  'jne',
  'j&t',
  'sicepat',
  'anteraja',
  'tiki',
  'pos indonesia',
  'wahana',
  'ninja xpress',
  'mitra express',
  'fedex',
  'dhl',
];

export const PROHIBITED_PROMISES = [
  'pasti diterima kerja',
  'pasti untung',
  'jaminan kaya',
  'pasti kaya',
  'garansi lulus kerja',
  'pasti cuan',
  'dijamin dapat kerja',
];

export const PROHIBITED_REAL_PERSONS = [
  'jokowi',
  'joko widodo',
  'prabowo',
  'gibran',
  'megawati',
  'soeharto',
  'elon musk',
  'mark zuckerberg',
  'bill gates',
  'steve jobs',
  'jeff bezos',
];

/**
 * Checks a given text for any prohibited words or real entities.
 * Returns an array of violations found.
 */
export function checkContentBlocklist(
  text: string,
  options: { checkBrands?: boolean; checkPromises?: boolean; checkPersons?: boolean } = {
    checkBrands: true,
    checkPromises: true,
    checkPersons: true,
  }
): string[] {
  const violations: string[] = [];
  const lower = text.toLowerCase();

  if (options.checkPromises) {
    for (const phrase of PROHIBITED_PROMISES) {
      if (lower.includes(phrase)) {
        violations.push(`Klaim terlarang: "${phrase}"`);
      }
    }
  }

  if (options.checkBrands) {
    for (const brand of PROHIBITED_REAL_BRANDS) {
      // Use word boundary check so substrings don't give false positives (e.g. "bni" in "kombinasi")
      const regex = new RegExp(`\\b${brand.replace(/\s+/g, '\\s+')}\\b`, 'i');
      if (regex.test(lower)) {
        violations.push(`Merek nyata terlarang: "${brand}"`);
      }
    }
  }

  if (options.checkPersons) {
    for (const person of PROHIBITED_REAL_PERSONS) {
      const regex = new RegExp(`\\b${person.replace(/\s+/g, '\\s+')}\\b`, 'i');
      if (regex.test(lower)) {
        violations.push(`Nama tokoh nyata terlarang: "${person}"`);
      }
    }
  }

  return violations;
}
