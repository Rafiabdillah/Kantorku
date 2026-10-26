/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
const fs = require('fs');

const path = 'src/content/levelsCoding.ts';
let code = fs.readFileSync(path, 'utf-8');

const replacements = [
  {
    target: `    hints: [
      'Hitung pajak: const ppn = Math.round(subtotal * 0.11);',
      'Kembalikan subtotal + ppn;',
    ],`,
    replace: `    hints: [
      'Hitung pajak: const ppn = Math.round(subtotal * 0.11);',
      'Jumlahkan subtotal awal dengan nominal pajak.',
      'Kembalikan subtotal + ppn;',
    ],`,
  },
  {
    target: `    hints: [
      'Gunakan backtick (\`) di awal dan akhir teks.',
      'Sisipkan \${noTrx} dan \${total} di posisi yang sesuai.',
    ],`,
    replace: `    hints: [
      'Gunakan backtick (\`) di awal dan akhir teks.',
      'Sisipkan \${noTrx} dan \${total} di posisi yang sesuai.',
      'Pastikan teks diawali format TRX- secara presisi.',
    ],`,
  },
  {
    target: `    hints: [
      'Gunakan if (skor >= 75) { return "LULUS"; }',
      'Tambahkan else { return "PERPANJANG"; }',
    ],`,
    replace: `    hints: [
      'Gunakan if (skor >= 75) { return "LULUS"; }',
      'Tambahkan else { return "PERPANJANG"; }',
      'Pastikan teks huruf kapital persis sama.',
    ],`,
  },
  {
    target: `    hints: [
      'Gunakan ekspresi: totalBelanja >= 100000 && isMember === true',
      'Kembalikan langsung hasil ekspresi dengan return.',
    ],`,
    replace: `    hints: [
      'Gunakan ekspresi: totalBelanja >= 100000 && isMember === true',
      'Operator && memastikan kedua kondisi wajib benar.',
      'Kembalikan langsung hasil ekspresi dengan return.',
    ],`,
  },
  {
    target: `    hints: [
      'Panggil daftar.push(itemBaru);',
      'Kembalikan daftar dengan return daftar;',
    ],`,
    replace: `    hints: [
      'Panggil daftar.push(itemBaru);',
      'Metode push menyisipkan item di urutan terakhir.',
      'Kembalikan daftar dengan return daftar;',
    ],`,
  },
  {
    target: `    hints: [
      'Gunakan daftarAngka.map(x => "Rp " + x);',
      'Kembalikan array hasil pemetaan.',
    ],`,
    replace: `    hints: [
      'Gunakan daftarAngka.map(x => "Rp " + x);',
      'Fungsi callback mengembalikan string baru berawalan Rp.',
      'Kembalikan array hasil pemetaan.',
    ],`,
  },
  {
    target: `    hints: [
      'Panggil daftarBarang.filter(...)',
      'Uji kondisi: b.status === "SIAP"',
    ],`,
    replace: `    hints: [
      'Panggil daftarBarang.filter(...)',
      'Uji kondisi predikat: b.status === "SIAP"',
      'Item yang lolos akan dimasukkan ke array baru.',
    ],`,
  },
  {
    target: `    hints: [
      'Panggil daftarNilai.reduce((acc, curr) => acc + curr, 0);',
      'Jangan lupa angka 0 sebagai parameter kedua .reduce.',
    ],`,
    replace: `    hints: [
      'Panggil daftarNilai.reduce((acc, curr) => acc + curr, 0);',
      'Nilai acc bertambah seiring iterasi berjalan.',
      'Jangan lupa angka 0 sebagai nilai awal akumulator.',
    ],`,
  },
];

for (const r of replacements) {
  if (!code.includes(r.target)) {
    console.error('Target not found for a replacement!');
  } else {
    code = code.replace(r.target, r.replace);
  }
}

fs.writeFileSync(path, code, 'utf-8');
console.log('Fixed coding hints successfully!');
