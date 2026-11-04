import { test, expect, Page } from '@playwright/test';
import fs from 'fs';

const IGNORED_CONSOLE = ['WebSocket', 'favicon', 'Download the React DevTools'];

function watchErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(`[PageError]: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const text = msg.text();
    if (IGNORED_CONSOLE.some((noise) => text.includes(noise))) return;
    errors.push(`[ConsoleError]: ${text}`);
  });
  return errors;
}

async function openView(page: Page, view: string) {
  await page.goto(`/?autostart=1&view=${view}`);
  await page.waitForLoadState('domcontentloaded');
}

async function fillCell(page: Page, addr: string, value: string) {
  await page.locator(`td[data-cell="${addr}"]`).click();
  const formulaBar = page.locator('[data-formula-bar]');
  await formulaBar.fill(value);
  await formulaBar.press('Enter');
}

test.describe('KantorKu full feature simulation', () => {
  test('SIM.01 Office hub: rooms, inbox dialog, and daily challenge navigation', async ({ page }) => {
    const errors = watchErrors(page);
    await openView(page, 'office');

    await expect(page.getByRole('heading', { name: /Selamat Datang, Budi Pratama/ })).toBeVisible();
    await expect(page.getByText('Denah Interaktif Kantor PT Maju Sejahtera')).toBeVisible();

    await page.getByRole('button', { name: /Inbox Kantor/ }).click();
    await expect(page.getByRole('dialog', { name: 'Kotak Masuk Email Kantor' })).toBeVisible();
    await expect(page.getByText('Tugas Evaluasi Laporan Bulanan')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog', { name: 'Kotak Masuk Email Kantor' })).toHaveCount(0);

    await page.getByRole('button', { name: 'Mulai latihan Excel di meja Pak Reza' }).click();
    await expect(page.getByText('Target Pekerjaan')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Input Data & Format Rupiah')).toBeVisible();
    await openView(page, 'office');

    await page.getByRole('button', { name: /Tantangan Harian/ }).click();
    await expect(page.getByRole('heading', { name: 'Daily Office Sprint' })).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('SIM.02 Excel mission: fill cells, submit, and earn the success debrief', async ({ page }) => {
    const errors = watchErrors(page);
    await openView(page, 'mission&level=excel-t1-01');

    await expect(page.getByText('Target Pekerjaan')).toBeVisible({ timeout: 15000 });
    await fillCell(page, 'B2', '55000');
    await fillCell(page, 'B3', '12000');
    await fillCell(page, 'B4', '35000');

    await expect(page.locator('td[data-cell="B2"]')).toContainText('55.000');
    await expect(page.locator('td[data-cell="B4"]')).toContainText('35.000');

    await page.getByRole('button', { name: /Kirim & Periksa Jawaban/ }).click();
    await expect(page.getByText('Tugas Berhasil Diselesaikan!')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Skor 4 Dimensi')).toBeVisible();

    await page.getByRole('button', { name: 'Lanjut ke Peta Karier' }).click();
    await expect(page.getByRole('heading', { name: 'Jalur Pembelajaran Profesional' })).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('SIM.03 Case file: clarification reply and handover debrief', async ({ page }) => {
    const errors = watchErrors(page);
    await openView(page, 'case-file');

    await expect(page.getByText(/Kasus Nyata v2\.0/)).toBeVisible({ timeout: 15000 });
    await page.getByRole('button', { name: /Keluarkan transaksi Retur/ }).click();
    await expect(page.getByText(/Tepat sekali! Omzet bersih/)).toBeVisible();

    await page.locator('textarea[placeholder*="ringkasan hasil pekerjaan"]').fill('Rekap sayur selesai, retur dikeluarkan dari omzet bersih.');
    await page.getByRole('button', { name: 'Kirim Serah Terima' }).click();

    await expect(page.getByRole('heading', { name: 'Serah Terima Kasus Disetujui!' })).toBeVisible();
    await expect(page.getByText('Debrief: Catatan Mentor Portofolio')).toBeVisible();
    await page.getByRole('button', { name: 'Kembali ke Denah Kantor' }).click();
    await expect(page.getByText('Denah Interaktif Kantor PT Maju Sejahtera')).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('SIM.04 Speed attack: answer correctly, keep combo, and return to office', async ({ page }) => {
    const errors = watchErrors(page);
    await openView(page, 'speed');

    await page.getByRole('button', { name: 'Mulai Time Attack' }).click();
    await expect(page.getByText('Soal #1')).toBeVisible();
    await page.getByRole('button', { name: '=SUM(A1:A10)' }).click();

    await expect(page.getByText('Soal #2')).toBeVisible();
    await expect(page.getByText('1x Combo')).toBeVisible();
    await expect(page.locator('text=Skor:').first()).toContainText('100');

    await page.getByRole('button', { name: 'Kembali ke kantor' }).click();
    await expect(page.getByText('Denah Interaktif Kantor PT Maju Sejahtera')).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('SIM.05 Duel: deterministic win versus Dimas awards coins', async ({ page }) => {
    const errors = watchErrors(page);
    await openView(page, 'duel');

    await page.getByRole('button', { name: /Mulai Duel Asinkron/ }).click();
    await expect(page.getByText('Duel Sedang Berlangsung...')).toBeVisible();
    await expect(page.getByText('Kamu Memenangkan Duel!')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('+200 Koin & +300 XP')).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('SIM.06 Detective: hint then find the culprit cell', async ({ page }) => {
    const errors = watchErrors(page);
    await openView(page, 'detective');

    await expect(page.getByText('Kasus Selisih Kasir Toko Cabang')).toBeVisible();
    await page.getByRole('button', { name: 'Lihat Hint' }).click();
    await expect(page.getByText('Petunjuk Detektif:')).toBeVisible();

    await page.locator('td').filter({ hasText: '=SUM(B2:B3)' }).first().click();
    await expect(page.getByText(/Sel Dipilih: B5.*TEPAT/)).toBeVisible();
    await expect(page.getByText('Audit Berhasil! Sel B5 Terbukti Bermasalah')).toBeVisible();
    await expect(page.getByText('Selesai: 1/3 Kasus')).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('SIM.07 Mentor: identify both real issues and pass evaluation', async ({ page }) => {
    const errors = watchErrors(page);
    await openView(page, 'mentor');

    await expect(page.getByText('Review Hasil Kerja Karyawan Magang')).toBeVisible();
    await page.getByText('Angka di-hardcode secara statis tanpa rumus =SUM(D2:D9)').click();
    await page.getByText('Jika ada penambahan karyawan atau kenaikan gaji, total di D10 tidak akan ikut berubah').click();
    await page.getByRole('button', { name: 'Beri Evaluasi & Nilai Magang' }).click();

    await expect(page.getByText(/Ketajaman Review Mentor: 100%/)).toBeVisible();
    await expect(page.getByText('✅ Lulus Evaluasi')).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('SIM.08 Zen mode: switch Excel, Coding, and Word editors', async ({ page }) => {
    const errors = watchErrors(page);
    await openView(page, 'zen');

    await expect(page.locator('td[data-cell="D2"]')).toContainText('7.000.000', { timeout: 15000 });

    await page.getByRole('button', { name: 'Coding', exact: true }).click();
    await expect(page.locator('.cm-editor')).toBeVisible({ timeout: 20000 });
    await page.getByRole('button', { name: /Jalankan/ }).first().click();

    await page.getByRole('button', { name: 'Word', exact: true }).click();
    await expect(page.locator('.tiptap-doc-wrapper')).toBeVisible({ timeout: 20000 });

    await page.getByRole('button', { name: 'Excel', exact: true }).click();
    await page.locator('button[aria-label="Reset dataset contoh"]').click();
    await expect(page.locator('td[data-cell="D2"]')).toContainText('7.000.000');

    expect(errors).toEqual([]);
  });

  test('SIM.09 Exam: web track serves web questions and issues a certificate', async ({ page }) => {
    const errors = watchErrors(page);
    await openView(page, 'exam');

    const webTrack = page.getByRole('button', { name: /Web Frontend/ });
    await webTrack.click();
    await expect(webTrack).toHaveAttribute('aria-pressed', 'true');

    await page.getByRole('button', { name: 'Mulai Ujian' }).first().click();
    await expect(page.getByText(/Soal Ujian 1 dari 5 .*Web Frontend/)).toBeVisible();
    await expect(page.getByRole('heading', { name: /Tag HTML semantik/ })).toBeVisible();

    const answers = [
      '<main>',
      'display: flex;',
      '.menu { }',
      /name="viewport"/,
      'Gaya di dalamnya diterapkan saat lebar viewport 600px atau kurang',
    ];
    for (const answer of answers) {
      await page.getByRole('button', { name: answer }).click();
    }

    await expect(page.getByText('SERTIFIKAT KELULUSAN KOMPETENSI')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/Nomor Registrasi: KTK-2026-/)).toBeVisible();
    await expect(page.getByText('Web Frontend (HTML & CSS)').first()).toBeVisible();
    await expect(page.getByText(/nilai keunggulan 100%/)).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('SIM.10 Daily challenge: answering always returns feedback with explanation', async ({ page }) => {
    const errors = watchErrors(page);
    await openView(page, 'daily');

    await expect(page.getByRole('heading', { name: 'Daily Office Sprint' })).toBeVisible();
    const questionCard = page.locator('div.rounded-3xl').filter({ hasText: 'Soal Hari Ini' }).last();
    await questionCard.locator('button').first().click();
    await expect(page.getByText(/Benar Sekali!|Belum Tepat\./)).toBeVisible();
    await expect(page.getByText('Pembeku Streak:')).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('SIM.11 Settings: preset applies and search reports empty state', async ({ page }) => {
    const errors = watchErrors(page);
    await openView(page, 'settings');

    await page.getByRole('heading', { name: /Preset Konfigurasi 1-Klik/ }).scrollIntoViewIfNeeded();
    await page.getByText('Pemula Santai', { exact: true }).click();
    await expect(page.getByText(/berhasil diterapkan/)).toBeVisible();

    const search = page.getByPlaceholder('Cari pengaturan (cth: margin, koma, font)...');
    await search.fill('zzz-pengaturan-tidak-ada');
    await expect(page.getByText('Tidak ada pengaturan yang cocok')).toBeVisible();
    await search.fill('margin');
    await expect(page.getByText('Tidak ada pengaturan yang cocok')).toHaveCount(0);

    expect(errors).toEqual([]);
  });

  test('SIM.12 Learning center: tabs, catalog search, cheatsheet, glossary', async ({ page }) => {
    const errors = watchErrors(page);
    await openView(page, 'learning');

    await expect(page.getByRole('heading', { name: 'Pusat Belajar & Akademi Kantor' })).toBeVisible();

    await page.getByRole('tab', { name: /Katalog Pelajaran/ }).click();
    await page.getByPlaceholder('Cari pelajaran, skill, atau rumus...').fill('VLOOKUP');
    await expect(page.getByText(/VLOOKUP/i).first()).toBeVisible();

    await page.getByRole('tab', { name: /Lembar Contekan/ }).click();
    await expect(page.getByRole('heading', { name: 'Lembar Contekan Siap Cetak' })).toBeVisible();

    await page.getByRole('tab', { name: /Kamus & Glosarium/ }).click();
    await expect(page.getByPlaceholder(/Cari fungsi Excel/)).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('SIM.13 Dictionary: search and copy formula feedback', async ({ page, context }) => {
    const errors = watchErrors(page);
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await openView(page, 'dictionary');

    await expect(page.getByRole('heading', { name: 'Referensi Cepat KantorKu' })).toBeVisible();
    await page.getByPlaceholder(/Cari rumus/).fill('VLOOKUP');
    const firstCopy = page.getByRole('button', { name: 'Salin Rumus' }).first();
    await expect(firstCopy).toBeVisible();
    await firstCopy.click();
    await expect(page.getByRole('button', { name: 'Disalin!' }).first()).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('SIM.14 Portfolio: CSV, JS, and DOC exports download real files', async ({ page }) => {
    const errors = watchErrors(page);
    await openView(page, 'portfolio');

    await expect(page.getByRole('heading', { name: 'Bukti Kompetensi & Ekspor CV' })).toBeVisible();

    const csvPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Ekspor CSV' }).click();
    const csv = await csvPromise;
    expect(csv.suggestedFilename()).toBe('rekap_anggaran_atk_portfolio.csv');

    const jsPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Ekspor Script JS' }).click();
    const js = await jsPromise;
    expect(js.suggestedFilename()).toBe('engine_diskon_transaksi.js');

    const docPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Ekspor DOC' }).click();
    const doc = await docPromise;
    expect(doc.suggestedFilename()).toBe('notulen_rapat_pic.doc');

    expect(errors).toEqual([]);
  });

  test('SIM.15 Shop economy: default wallet locks premium items, mission rewards unlock a purchase', async ({ page }) => {
    const errors = watchErrors(page);
    await openView(page, 'shop');

    await expect(page.getByRole('heading', { name: 'Dekorasi Meja & Fasilitas Kerja' })).toBeVisible();
    await expect(page.getByText('100 Koin').first()).toBeVisible();

    // Default inventory is already equipped and premium items stay locked at 100 coins.
    const cactusCard = page.locator('div.rounded-3xl').filter({ hasText: 'Kaktus Meja Anti Radiasi' }).last();
    await expect(cactusCard.getByText('Sedang Dipakai')).toBeVisible();
    const freezeCard = page.locator('div.rounded-3xl').filter({ hasText: 'Pembeku Streak (Streak Freeze)' }).last();
    await expect(freezeCard.getByRole('button', { name: 'Beli (150 Koin)' })).toBeDisabled();

    // Complete a mission to earn the missing 50 coins.
    await openView(page, 'mission&level=excel-t1-01');
    await expect(page.getByText('Target Pekerjaan')).toBeVisible({ timeout: 15000 });
    await fillCell(page, 'B2', '55000');
    await fillCell(page, 'B3', '12000');
    await fillCell(page, 'B4', '35000');
    await page.getByRole('button', { name: /Kirim & Periksa Jawaban/ }).click();
    await expect(page.getByText('Tugas Berhasil Diselesaikan!')).toBeVisible({ timeout: 15000 });

    // Spend the earned coins on a streak freeze.
    await openView(page, 'shop');
    await expect(page.getByText('150 Koin').first()).toBeVisible();
    const unlockedFreezeCard = page.locator('div.rounded-3xl').filter({ hasText: 'Pembeku Streak (Streak Freeze)' }).last();
    await unlockedFreezeCard.getByRole('button', { name: 'Beli (150 Koin)' }).click();
    await expect(page.getByText('0 Koin').first()).toBeVisible();
    await expect(page.getByText('2 Freeze Tersedia')).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('SIM.16 Achievements, errors notebook, career map, and about', async ({ page }) => {
    const errors = watchErrors(page);

    await openView(page, 'achievements');
    await expect(page.getByRole('heading', { name: 'Daftar Rekor Kinerja Kantor' })).toBeVisible();
    await expect(page.getByText(/Terbuka/)).toBeVisible();
    await page.getByRole('button', { name: 'Excel', exact: true }).click();
    await expect(page.getByText('Semua Lencana')).toBeVisible();

    await openView(page, 'errors');
    await expect(page.getByRole('heading', { name: 'Evaluasi & Refleksi Mandiri' })).toBeVisible();
    await expect(page.getByText('Buku Catatanmu Masih Bersih!')).toBeVisible();

    await openView(page, 'career-map');
    await expect(page.getByRole('heading', { name: 'Jalur Pembelajaran Profesional' })).toBeVisible();
    await page.getByRole('button', { name: 'Track Web', exact: true }).click();
    await expect(page.getByText('Struktur Dasar HTML5 & Profil Usaha')).toBeVisible();
    await page.getByRole('button', { name: /Mulai Tugas/ }).first().click();
    await expect(page.getByText('Target Pekerjaan')).toBeVisible({ timeout: 15000 });

    await openView(page, 'about');
    await expect(page.getByRole('heading', { name: 'Tentang & Sumber' })).toBeVisible();
    const externalLink = page.locator('a[target="_blank"]').first();
    await expect(externalLink).toHaveAttribute('href', /^https?:\/\//);

    expect(errors).toEqual([]);
  });

  test('SIM.17 Mobile: core job flows stay usable at 390x844', async ({ page }) => {
    const errors = watchErrors(page);
    await page.setViewportSize({ width: 390, height: 844 });

    await openView(page, 'office');
    await page.getByRole('button', { name: 'Mulai latihan Excel di meja Pak Reza' }).click();
    await expect(page.getByText('Input Data & Format Rupiah').first()).toBeVisible({ timeout: 15000 });

    await page.locator('button[aria-label="Perbesar editor"]:visible').first().click();
    await expect(page.locator('div[data-editor-expanded="true"]')).toBeVisible();
    await page.locator('button[aria-label="Perkecil editor"]').click();

    await fillCell(page, 'B2', '55000');
    await fillCell(page, 'B3', '12000');
    await fillCell(page, 'B4', '35000');
    await page.getByRole('button', { name: 'Cek', exact: true }).click();
    await page.getByRole('button', { name: /Kirim & Periksa Jawaban/ }).click();
    await expect(page.getByText('Tugas Berhasil Diselesaikan!')).toBeVisible({ timeout: 15000 });

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth
    );
    expect(overflow).toBe(true);

    expect(errors).toEqual([]);
  });

  test('SIM.18 Save file: export downloads JSON, invalid import rejected, valid import restores progress', async ({
    page,
  }) => {
    const errors = watchErrors(page);
    await openView(page, 'settings');

    await page.getByRole('button', { name: 'Data & Privasi' }).click();
    await expect(page.getByText('Cadangkan & Pulihkan Progres')).toBeVisible();

    // Export current (default) progress and verify the JSON payload
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Ekspor Progres', exact: true }).click(),
    ]);
    expect(download.suggestedFilename()).toMatch(/^kantorku_progres_.*\.json$/);
    const downloadPath = await download.path();
    const exported = JSON.parse(fs.readFileSync(downloadPath!, 'utf-8'));
    expect(exported.kind).toBe('save-game-progress');
    expect(exported.profile.name).toBe('Budi Pratama');

    // Invalid import is rejected with a friendly toast
    await page.locator('input[type="file"]').setInputFiles({
      name: 'rusak.json',
      mimeType: 'application/json',
      buffer: Buffer.from('bukan json'),
    });
    await expect(page.getByText('Berkas bukan JSON yang valid.')).toBeVisible();

    // Valid import restores profile after confirmation dialog
    page.on('dialog', (d) => d.accept());
    const savePayload = {
      app: 'kantorku',
      kind: 'save-game-progress',
      storageVersion: 2,
      exportedAt: '2026-11-03T00:00:00.000Z',
      profile: {
        ...exported.profile,
        name: 'Toni Uji Simulasi',
        coins: 777,
        xp: 4321,
        currentTier: 4,
        hasCompletedOnboarding: true,
      },
    };
    await page.locator('input[type="file"]').setInputFiles({
      name: 'kantorku_progres_toni.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(savePayload)),
    });
    await expect(page.getByText('Progres "Toni Uji Simulasi" berhasil dipulihkan!')).toBeVisible();

    await openView(page, 'office');
    await expect(page.getByRole('heading', { name: 'Selamat Datang, Toni Uji Simulasi' })).toBeVisible();

    await openView(page, 'shop');
    await expect(page.getByText('777 Koin')).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('SIM.19 Career map: tier ribbon filters, locked cards show XP requirement, no unlock leak', async ({
    page,
  }) => {
    const errors = watchErrors(page);
    await openView(page, 'career-map');

    // Default view: player tier 1, Excel track — tier-1 levels visible and startable
    await expect(page.getByText('Menghitung Jumlah Transaksi dengan COUNT & COUNTA')).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole('button', { name: /Mulai Tugas/ }).first()).toBeVisible();

    // Switch to Tier 2 via the ribbon: list filters and everything is locked with an XP hint
    await page.getByRole('button', { name: /Tier 2: Staf Junior/ }).click();
    await expect(page.getByText('Referensi Mutlak').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Mulai Tugas/ })).toHaveCount(0);
    await expect(page.getByText('Terkunci').first()).toBeVisible();
    await expect(page.getByText(/kurang/).first()).toContainText('500 XP');

    // Back to Tier 1: levels are startable again
    await page.getByRole('button', { name: /Tier 1: Magang/ }).click();
    await expect(page.getByText('Menghitung Jumlah Transaksi dengan COUNT & COUNTA')).toBeVisible();
    await expect(page.getByRole('button', { name: /Mulai Tugas/ }).first()).toBeVisible();

    // Other modules respect the same rule: Web tier 1 first level is startable
    await page.getByRole('button', { name: 'Track Web', exact: true }).click();
    await expect(page.getByText('Struktur Dasar HTML5 & Profil Usaha')).toBeVisible();
    await expect(page.getByRole('button', { name: /Mulai Tugas/ }).first()).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('SIM.20 XP total is visible and updated on desktop, mobile, and in the mobile drawer', async ({ page }) => {
    const errors = watchErrors(page);

    // Desktop: earn XP through a mission, then check both the header capsule and office chip
    await page.setViewportSize({ width: 1280, height: 800 });
    await openView(page, 'mission&level=excel-t1-01');
    await fillCell(page, 'B2', '55000');
    await fillCell(page, 'B3', '12000');
    await fillCell(page, 'B4', '35000');
    await page.getByRole('button', { name: /Kirim & Periksa Jawaban/ }).click();
    await expect(page.getByText('Tugas Berhasil Diselesaikan!')).toBeVisible({ timeout: 15000 });

    await openView(page, 'office');
    await expect(page.getByText('(100 XP)').first()).toBeVisible();
    await expect(page.getByRole('main').getByText('100 XP').first()).toBeVisible();

    // Mobile: office greeting chip shows XP without opening any menu
    await page.setViewportSize({ width: 390, height: 844 });
    await openView(page, 'office');
    await expect(page.getByRole('main').getByText('100 XP').first()).toBeVisible();
    await expect(page.getByLabel('Total XP: 100')).toBeVisible();

    // Mobile drawer quick stats include XP
    await page.getByRole('button', { name: 'Toggle navigation menu' }).click();
    const drawer = page.getByRole('dialog', { name: 'Navigasi utama' });
    await expect(drawer).toBeVisible();
    await expect(drawer.getByText('XP', { exact: true })).toBeVisible();
    await expect(drawer.getByText('100', { exact: true })).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('SIM.21 Blank submissions are rejected: no free pass when nothing was edited', async ({ page }) => {
    const errors = watchErrors(page);

    for (const levelId of ['excel-t1-01', 'web-t1-01', 'code-t1-01', 'word-t1-01']) {
      await page.goto(`/?autostart=1&level=${levelId}`);
      await page.waitForLoadState('domcontentloaded');
      await page.getByRole('button', { name: /Kirim & Periksa Jawaban/ }).click();

      await expect(page.getByRole('heading', { name: 'Masih Ada Kesalahan' })).toBeVisible({ timeout: 15000 });
      await expect(page.getByText('Kamu belum mengubah apa pun')).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Tugas Berhasil Diselesaikan!' })).toHaveCount(0);

      await page.getByRole('button', { name: 'Coba Perbaiki Lagi' }).click();
      await expect(page.getByRole('heading', { name: 'Masih Ada Kesalahan' })).toHaveCount(0);
    }

    // None of the four rejected submissions awarded XP
    await openView(page, 'office');
    await expect(page.getByRole('main').getByText('0 XP').first()).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('SIM.22 Incomplete drafts are still winnable: authored web, code, and word work passes', async ({ page }) => {
    const errors = watchErrors(page);

    await page.goto('/?autostart=1&level=web-t1-01');
    await expect(page.getByText('Target Pekerjaan')).toBeVisible({ timeout: 15000 });
    await page.locator('.cm-content').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await page.keyboard.insertText(
      '<header><h1>PT Maju Sejahtera</h1></header><main><p>Pusat solusi digital, operasional kantor, dan kemitraan UMKM terpercaya sejak 2020.</p></main><footer><p>Hak cipta 2026 PT Maju Sejahtera</p></footer>'
    );
    await page.getByRole('button', { name: /Kirim & Periksa Jawaban/ }).click();
    await expect(page.getByText('Tugas Berhasil Diselesaikan!')).toBeVisible({ timeout: 15000 });

    await page.goto('/?autostart=1&level=code-t1-01');
    await expect(page.getByText('Target Pekerjaan')).toBeVisible({ timeout: 15000 });
    await page.locator('.cm-content').click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await page.keyboard.insertText('function sapaKaryawan(nama) { return "Halo, " + nama + "! Selamat datang."; }');
    await page.getByRole('button', { name: /Kirim & Periksa Jawaban/ }).click();
    await expect(page.getByText('Tugas Berhasil Diselesaikan!')).toBeVisible({ timeout: 15000 });

    await page.goto('/?autostart=1&level=word-t1-01');
    await expect(page.getByText('Target Pekerjaan')).toBeVisible({ timeout: 15000 });
    const doc = page.locator('.ProseMirror');
    await doc.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await page.getByRole('button', { name: 'Judul Heading 1' }).click();
    await page.keyboard.insertText('UNDANGAN RAPAT KOORDINASI PT MAJU SEJAHTERA');
    await page.keyboard.press('Enter');
    await page.keyboard.insertText(
      'Sehubungan dengan evaluasi kerja kuartal ini, kami mengundang Bapak/Ibu Kepala Divisi untuk hadir pada '
    );
    await page.keyboard.press('Control+B');
    await page.keyboard.insertText('Senin, 2 November 2026 pukul 09.00 WIB di Ruang Meeting Utama Lantai 2');
    await page.keyboard.press('Control+B');
    await page.keyboard.insertText(
      '. Rapat membahas capaian tiap divisi dan rencana kerja bulan depan. Demikian undangan ini kami sampaikan, atas perhatian Bapak/Ibu kami ucapkan terima kasih.'
    );
    await expect(doc).toContainText('UNDANGAN RAPAT KOORDINASI PT MAJU SEJAHTERA');
    await page.getByRole('button', { name: /Kirim & Periksa Jawaban/ }).click();
    await expect(page.getByText('Tugas Berhasil Diselesaikan!')).toBeVisible({ timeout: 15000 });

    // All three missions paid out: 150 XP each
    await openView(page, 'office');
    await expect(page.getByRole('main').getByText('450 XP').first()).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('SIM.23 Save file: minimal restore survives reload and out-of-range tier is rejected', async ({ page }) => {
    const errors = watchErrors(page);
    page.on('dialog', (d) => d.accept());
    await openView(page, 'settings');
    await page.getByRole('button', { name: 'Data & Privasi' }).click();

    // A hand-edited save with only the required fields must not be wiped by the autostart boot path
    const minimal = {
      app: 'kantorku',
      kind: 'save-game-progress',
      storageVersion: 2,
      exportedAt: '2026-11-04T00:00:00.000Z',
      profile: { name: 'QA Minimal', coins: 3210, xp: 25000, currentTier: 7, completedLevelIds: ['web-t1-01'] },
    };
    await page.locator('input[type="file"]').setInputFiles({
      name: 'minimal.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(minimal)),
    });
    await expect(page.getByText('Progres "QA Minimal" berhasil dipulihkan!')).toBeVisible();

    await openView(page, 'office');
    await expect(page.getByRole('heading', { name: 'Selamat Datang, QA Minimal' })).toBeVisible();
    await expect(page.getByText('25.000 XP').first()).toBeVisible();

    await openView(page, 'settings');
    await page.getByRole('button', { name: 'Data & Privasi' }).click();

    // A save claiming a job level that does not exist is refused instead of poisoning the profile
    const ghost = { ...minimal, profile: { ...minimal.profile, name: 'QA Hantu', currentTier: 99 } };
    await page.locator('input[type="file"]').setInputFiles({
      name: 'ghost.json',
      mimeType: 'application/json',
      buffer: Buffer.from(JSON.stringify(ghost)),
    });
    await expect(page.getByText(/Tier karier pada berkas berada di luar jabatan/)).toBeVisible();
    await expect(page.getByText('Progres "QA Hantu" berhasil dipulihkan!')).toHaveCount(0);

    expect(errors).toEqual([]);
  });

  test('SIM.24 Accessibility: mission and case views expose a heading, settings shows the real version', async ({
    page,
  }) => {
    const errors = watchErrors(page);
    const { version } = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

    await openView(page, 'mission&level=excel-t1-01');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible({ timeout: 15000 });

    await openView(page, 'case-file');
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();

    await openView(page, 'settings');
    await page.getByRole('button', { name: 'Lanjutan & Bantuan' }).click();
    await expect(page.getByText(`Versi KantorKu v${version}`)).toBeVisible();
    await expect(page.getByRole('button', { name: `v${version} (0/5)` })).toBeVisible();

    expect(errors).toEqual([]);
  });
});
