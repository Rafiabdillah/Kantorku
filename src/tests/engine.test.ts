import test from 'node:test';
import assert from 'node:assert/strict';
import { ExcelFormulaEngine } from '../engine/formula';
import { runCodeWithTests } from '../engine/codeSandbox';
import { validateWordDocument } from '../engine/wordValidator';
import { validateWebContent } from '../engine/webValidator';
import { SheetGrid } from '../types';

test('ExcelFormulaEngine evaluates basic arithmetic and SUM function', () => {
  const grid: SheetGrid = {
    A1: { raw: '10' },
    A2: { raw: '25' },
    A3: { raw: '15' },
    B1: { raw: '=SUM(A1:A3)' },
    B2: { raw: '=A1 * 2 + 5' },
  };

  const engine = new ExcelFormulaEngine(grid);
  assert.equal(engine.getCellValue('B1'), 50);
  assert.equal(engine.getCellValue('B2'), 25);
});

test('ExcelFormulaEngine supports semicolon argument separator and IF logic', () => {
  const grid: SheetGrid = {
    A1: { raw: '85' },
    B1: { raw: '=IF(A1 >= 75; "Lulus"; "Remedial")' },
    A2: { raw: '60' },
    B2: { raw: '=IF(A2 >= 75; "Lulus"; "Remedial")' },
  };

  const engine = new ExcelFormulaEngine(grid);
  assert.equal(engine.getCellValue('B1'), 'Lulus');
  assert.equal(engine.getCellValue('B2'), 'Remedial');
});

test('ExcelFormulaEngine returns friendly error for division by zero', () => {
  const grid: SheetGrid = {
    A1: { raw: '100' },
    A2: { raw: '0' },
    A3: { raw: '=A1 / A2' },
  };

  const engine = new ExcelFormulaEngine(grid);
  const res = engine.evaluateFormula('A1 / A2');
  assert.equal(res.value, '#DIV/0!');
  assert.match(res.friendlyError || '', /pembagian dengan angka nol/i);
});

test('ExcelFormulaEngine evaluates VLOOKUP and XLOOKUP', () => {
  const grid: SheetGrid = {
    A1: { raw: 'ID' },
    B1: { raw: 'Nama' },
    A2: { raw: '101' },
    B2: { raw: 'Budi' },
    A3: { raw: '102' },
    B3: { raw: 'Siti' },
    D1: { raw: '=VLOOKUP(102, A2:B3, 2)' },
    D2: { raw: '=XLOOKUP(101, A2:A3, B2:B3)' },
  };

  const engine = new ExcelFormulaEngine(grid);
  assert.equal(engine.getCellValue('D1'), 'Siti');
  assert.equal(engine.getCellValue('D2'), 'Budi');
});

test('ExcelFormulaEngine detects hardcoding via mutation test', () => {
  const dynamicGrid: SheetGrid = {
    A1: { raw: '10' },
    A2: { raw: '20' },
    A3: { raw: '=SUM(A1:A2)' },
  };

  const mutationResult = ExcelFormulaEngine.testDynamicMutation(dynamicGrid, 'A3', [{ cell: 'A1', delta: 5 }]);
  assert.equal(mutationResult.isDynamic, true);
  assert.equal(mutationResult.originalVal, 30);
  assert.equal(mutationResult.mutatedVal, 35);

  const hardcodedGrid: SheetGrid = {
    A1: { raw: '10' },
    A2: { raw: '20' },
    A3: { raw: '30' }, // hardcoded!
  };
  const hardcodedResult = ExcelFormulaEngine.testDynamicMutation(hardcodedGrid, 'A3', [{ cell: 'A1', delta: 5 }]);
  assert.equal(hardcodedResult.isDynamic, false);
});

test('CodeSandbox executes JavaScript and validates test cases', async () => {
  const code = `
    function hitungDiskon(harga, persen) {
      return harga - (harga * (persen / 100));
    }
  `;

  const testCases = [
    { description: 'Diskon 10% dari 100000', input: [100000, 10], expected: 90000 },
    { description: 'Diskon 0% dari 50000', input: [50000, 0], expected: 50000 },
  ];

  const result = await runCodeWithTests(code, testCases, 'hitungDiskon');
  assert.equal(result.success, true);
  assert.equal(result.testResults.length, 2);
  assert.equal(result.testResults[0].passed, true);
});

test('CodeSandbox translates JavaScript runtime error to friendly Indonesian', async () => {
  const brokenCode = `
    function solution() {
      const data = undefined;
      return data.nama;
    }
  `;

  const result = await runCodeWithTests(brokenCode, [{ description: 'Test', expected: 'Budi' }], 'solution');
  assert.equal(result.success, false);
  assert.match(result.friendlyError || '', /Mencoba membaca properti/i);
});

test('Word structural validator checks headings and tables', () => {
  const validDoc = `
    <h1>Laporan Bulanan PT Maju Sejahtera</h1>
    <h2>Ringkasan Eksekutif</h2>
    <p>Penjualan produk makanan meningkat secara signifikan bulan ini dengan pertumbuhan <strong>15%</strong>.</p>
    <table>
      <tr><th>Kategori</th><th>Total</th></tr>
      <tr><td>Makanan</td><td>Rp 50.000.000</td></tr>
      <tr><td>Minuman</td><td>Rp 30.000.000</td></tr>
    </table>
    <ul>
      <li>Stok mencukupi</li>
      <li>Distribusi lancar</li>
    </ul>
  `;

  const result = validateWordDocument(validDoc, {
    minWords: 10,
    requiredKeywords: ['Laporan', 'Penjualan'],
    requireH1: true,
    requireH2: true,
    requireTable: true,
    requireList: true,
    requireBold: true,
  });

  assert.equal(result.passed, true);
  assert.ok(result.score.total >= 80);
});

test('WebValidator checks semantic HTML5 tags, alt attribute, and CSS flexbox/media query', () => {
  const validHtml = `
    <header>
      <h1>Portal HR PT Maju Sejahtera</h1>
    </header>
    <main>
      <div class="card-grid">
        <div class="card">
          <img src="/avatar.png" alt="Foto Karyawan" />
          <p>Profil Karyawan</p>
        </div>
      </div>
    </main>
    <footer>
      <p>&copy; 2026 PT Maju Sejahtera</p>
    </footer>
  `;

  const validCss = `
    .card-grid {
      display: flex;
      flex-direction: row;
      gap: 16px;
    }
    @media (max-width: 768px) {
      .card-grid {
        flex-direction: column;
      }
    }
  `;

  const res = validateWebContent(validHtml, validCss, {
    requireSemantic: true,
    requireImgAlt: true,
    requireFlexbox: true,
    minMediaQueries: 1,
  });

  assert.equal(res.passed, true);
  assert.ok(res.score.total >= 85);
  assert.equal(res.score.correctness, 100);
});

test('Word validator checks academic preset and footnote requirements', () => {
  const academicDoc = `
    <h1>BAB 1 PENDAHULUAN</h1>
    <h2>1.1 Latar Belakang</h2>
    <p>Transformasi digital administrasi perkantoran modern memerlukan standarisasi format dokumen yang terstruktur [1].</p>
    <h2>1.2 Rumusan Masalah</h2>
    <p>Bagaimana efektivitas otomatisasi alur kerja perkantoran terhadap produktivitas tim divisi operasional?</p>
  `;

  const result = validateWordDocument(academicDoc, {
    academicPreset: true,
    requireFootnote: true,
    requireH1: true,
    requireH2: true,
    requiredKeywords: ['Transformasi', 'Efektivitas'],
  });

  assert.equal(result.passed, true);
  assert.ok(result.score.communication >= 85);
  assert.ok(result.score.maintainability >= 85);
});

test('CodeSandbox rejects malicious or invalid functionNameToTest', async () => {
  const maliciousFnNames = [
    'solution; process.exit(1);',
    'foo.bar',
    'test()',
    'bad-name',
    'function()',
  ];

  for (const name of maliciousFnNames) {
    const res = await runCodeWithTests('function solution() { return 1; }', [], name);
    assert.equal(res.success, false);
    assert.match(res.friendlyError || '', /Nama fungsi tidak valid/i);
  }
});

test('CodeSandbox isolates environment and prevents localStorage / DOM access', async () => {
  const code = `
    function solution() {
      if (typeof localStorage !== 'undefined' && localStorage !== null) {
        localStorage.setItem('leaked', 'true');
      }
      if (typeof window !== 'undefined' && window !== null) {
        window.leaked = true;
      }
      return 'isolated';
    }
  `;

  const res = await runCodeWithTests(code, [{ description: 'Isolation check', expected: 'isolated' }], 'solution');
  assert.equal(res.success, true);
  assert.equal(res.testResults[0].passed, true);
});

test('CodeSandbox handles infinite recursion gracefully with error translation', async () => {
  const code = `
    function solution() {
      return solution();
    }
  `;

  const res = await runCodeWithTests(code, [{ description: 'Recursion test', expected: 10 }], 'solution');
  assert.equal(res.success, false);
  assert.match(res.friendlyError || '', /loop yang tidak berhenti|perulangan tanpa henti|terlalu lama/i);
});

test('CodeSandbox terminates infinite loops after timeout with friendly message', async () => {
  const infiniteLoopCode = `
    function solution() {
      while (true) {}
      return 42;
    }
  `;

  const start = Date.now();
  const res = await runCodeWithTests(infiniteLoopCode, [{ description: 'Hang test', expected: 42 }], 'solution');
  const elapsed = Date.now() - start;

  assert.equal(res.success, false);
  assert.ok(elapsed >= 2800, `Expected elapsed >= 2800ms, got ${elapsed}ms`);
  assert.match(res.friendlyError || '', /Kodemu berjalan terlalu lama, cek apakah ada loop yang tidak berhenti/i);
});

