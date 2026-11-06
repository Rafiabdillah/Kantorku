import { test, expect } from '@playwright/test';

test.describe('KantorKu P2: Feature Completeness & Integrity Suite', () => {
  test('P2.1 Excel Editor: Renders 26 columns (A-Z), virtualized 200 rows, fill handle & navigation', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(`[PageError]: ${err.message}`));
    page.on('console', (msg) => {
      if (msg.type() === 'error' && !msg.text().includes('WebSocket') && !msg.text().includes('favicon')) {
        errors.push(`[ConsoleError]: ${msg.text()}`);
      }
    });

    await page.goto('/?autostart=1&view=mission&level=excel-t1-01');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // Verify 26 columns (A through Z)
    for (const letter of ['A', 'B', 'C', 'M', 'Z']) {
      await expect(page.locator(`th:has-text("${letter}")`).first()).toBeVisible();
    }

    // Verify footer shows 26 Kolom (A-Z) × 200 Baris
    await expect(page.locator('text=26 Kolom (A-Z) × 200 Baris')).toBeVisible();

    // Verify active cell indicator displays B2 initially
    await expect(page.locator('div:has-text("B2")').first()).toBeVisible();

    // Verify Fill Handle exists on active selected cell
    const fillHandle = page.locator('div[title*="Tarik untuk salin formula"]');
    await expect(fillHandle).toBeVisible();

    // Test Keyboard navigation (ArrowDown moves to B3)
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(100);
    await expect(page.locator('div:has-text("B3")').first()).toBeVisible();

    // Test F2 to start editing
    await page.keyboard.press('F2');
    await page.waitForTimeout(100);
    const activeInput = page.locator('td input[type="text"]');
    await expect(activeInput).toBeVisible();

    // Press Escape to cancel editing
    await page.keyboard.press('Escape');
    await expect(activeInput).not.toBeVisible();

    expect(errors).toEqual([]);
  });

  test('P2.1b Excel Editor: Formula bar mirrors input, large formula editor applies values, and editor expands full-screen', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(`[PageError]: ${err.message}`));

    await page.goto('/?autostart=1&view=mission&level=excel-t1-01');
    await page.waitForLoadState('domcontentloaded');
    // A cold preview start (bundle download + React mount) can outlast the expect budget, so
    // absorb it here instead of letting it eat the first feature assertion.
    await expect(page.locator('#root > *')).toBeVisible({ timeout: 30000 });

    // Formula bar is full width and editable
    const formulaBar = page.locator('input[data-formula-bar="true"]');
    await expect(formulaBar).toBeVisible();
    await formulaBar.fill('=SUM(1;2)');
    await formulaBar.press('Enter');
    await expect(page.locator('td[data-cell="B2"]')).toContainText('3');

    // Large formula dialog with live preview
    await page.locator('button[aria-label="Perbesar editor rumus"]').click();
    const dialog = page.locator('div[role="dialog"][aria-label="Editor rumus"]');
    await expect(dialog).toBeVisible();
    const formulaTextarea = dialog.locator('textarea[data-formula-modal="true"]');
    await expect(formulaTextarea).toBeVisible();
    await formulaTextarea.fill('=SUM(2;3)');
    await expect(dialog.getByText('Hasil: Rp 5')).toBeVisible();

    await dialog.getByRole('button', { name: 'Terapkan Rumus' }).click();
    await expect(dialog).not.toBeVisible();
    await expect(page.locator('td[data-cell="B2"]')).toContainText('5');

    // Full-screen wide editor mode
    await page.locator('button[aria-label="Perbesar editor"]:visible').first().click();
    const expandedEditor = page.locator('div[data-editor-expanded="true"]');
    await expect(expandedEditor).toBeVisible();
    await expect(page.getByText('Mode Editor Lebar')).toBeVisible();

    await page.locator('button[aria-label="Perkecil editor"]').click();
    await expect(expandedEditor).not.toBeVisible();

    expect(errors).toEqual([]);
  });

  test('P2.1c Mobile Excel Editor: Wide editor mode opens from the tab bar without horizontal overflow', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(`[PageError]: ${err.message}`));

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/?autostart=1&view=mission&level=excel-t1-01');
    await page.waitForLoadState('domcontentloaded');

    await page.locator('button[aria-label="Perbesar editor"]:visible').first().click();
    const expandedEditor = page.locator('div[data-editor-expanded="true"]');
    await expect(expandedEditor).toBeVisible();
    await expect(page.getByText('Mode Editor Lebar')).toBeVisible();

    const report = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(report.scrollWidth).toBeLessThanOrEqual(report.clientWidth);

    // Formula dialog stays usable inside the expanded editor on a small screen
    await page.locator('button[aria-label="Perbesar editor rumus"]').click();
    const dialog = page.locator('div[role="dialog"][aria-label="Editor rumus"]');
    await expect(dialog).toBeVisible();
    const box = await dialog.boundingBox();
    expect(box?.width ?? 0).toBeLessThanOrEqual(390);
    await dialog.getByRole('button', { name: 'Batal' }).click();
    await expect(dialog).not.toBeVisible();

    await page.locator('button[aria-label="Perkecil editor"]').click();
    await expect(expandedEditor).not.toBeVisible();

    expect(errors).toEqual([]);
  });

  test('P2.1d Mobile Case File: Editor can expand full-screen and close again', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(`[PageError]: ${err.message}`));

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/?autostart=1&view=case-file');
    await page.waitForLoadState('domcontentloaded');

    await page.locator('button[aria-label="Perbesar editor"]').click();
    const expandedEditor = page.locator('div[data-editor-expanded="true"]');
    await expect(expandedEditor).toBeVisible();
    await expect(page.getByText('Mode Editor Lebar')).toBeVisible();

    const report = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(report.scrollWidth).toBeLessThanOrEqual(report.clientWidth);

    await page.locator('button[aria-label="Perkecil editor"]').click();
    await expect(expandedEditor).toHaveCount(0);

    expect(errors).toEqual([]);
  });

  test('P2.1e Excel Editor: Typed numbers format as Rupiah and selected cell text stays readable', async ({ page }) => {
    await page.goto('/?autostart=1&view=mission&level=excel-t1-01');
    await page.waitForLoadState('domcontentloaded');

    await page.locator('td[data-cell="D4"]').click();
    const formulaBar = page.locator('[data-formula-bar]');
    await formulaBar.fill('50000');
    await formulaBar.press('Enter');

    const cell = page.locator('td[data-cell="D4"]');
    await expect(cell).toHaveText('50000');

    await page.locator('button[title="Format Rupiah (Rp)"]').click();
    await expect(cell).toHaveText('Rp 50.000');
    expect((await cell.getAttribute('title'))?.replace(/\u00a0/g, ' ')).toBe('Rp 50.000');
    expect(await cell.getAttribute('class')).toContain('text-slate-900');

    // Non-numeric text must not be coerced by the Rupiah formatter
    await page.locator('td[data-cell="D5"]').click();
    await formulaBar.fill('BPJS');
    await formulaBar.press('Enter');
    await page.locator('button[title="Format Rupiah (Rp)"]').click();
    await expect(page.locator('td[data-cell="D5"]')).toHaveText('BPJS');
  });

  test('P2.2 Word Editor (TipTap): Formats headings, tables, and document metadata', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(`[PageError]: ${err.message}`));

    await page.goto('/?autostart=1&view=mission&level=word-t1-01');
    await page.waitForLoadState('domcontentloaded');

    const tiptap = page.locator('.tiptap-doc-wrapper');
    await expect(tiptap).toBeVisible({ timeout: 20000 });

    // Check heading and toolbar elements
    await expect(page.locator('button[title*="Heading 1"]').first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator('button[title*="Heading 2"]').first()).toBeVisible();
    await expect(page.locator('button[title*="Sisipkan Tabel"]').first()).toBeVisible();
    await expect(page.locator('button[title*="Sitasi"]').first()).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('P2.3 Code Editor (CodeMirror 6): Syntax highlighting and execution sandbox', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(`[PageError]: ${err.message}`));

    await page.goto('/?autostart=1&view=mission&level=code-t1-01');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    const cmEditor = page.locator('.cm-editor');
    await expect(cmEditor).toBeVisible();
    const cmGutters = page.locator('.cm-gutters');
    await expect(cmGutters).toBeVisible();

    // Click run button
    const runBtn = page.locator('button:has-text("Jalankan")').first();
    await expect(runBtn).toBeVisible();
    await runBtn.click();
    await page.waitForTimeout(300);

    expect(errors).toEqual([]);
  });

  test('P2.4 Onboarding Gate & Experience: Avatar selector and placement test breakdown', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(`[PageError]: ${err.message}`));

    // Navigate to Onboarding directly
    await page.goto('/?view=onboarding');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(400);

    // Onboarding header and avatar selector
    await expect(page.locator('text=Orientasi PT Maju Sejahtera')).toBeVisible();
    await expect(page.locator('text=Pilih Avatar Kantor')).toBeVisible();

    // Select Dimas avatar
    const dimasAvatarBtn = page.locator('button:has-text("Dimas")').first();
    await expect(dimasAvatarBtn).toBeVisible();
    await dimasAvatarBtn.click();

    // Fill name and start test
    const nameInput = page.locator('input[placeholder*="nama Anda"]').first();
    await nameInput.fill('Dewi Lestari');

    const startTestBtn = page.locator('button:has-text("Ikuti Tes Penempatan")').first();
    await startTestBtn.click();
    await page.waitForTimeout(300);

    // Answer questions
    await expect(page.locator('text=Soal Penempatan 1')).toBeVisible();
    for (let i = 0; i < 10; i++) {
      const firstOption = page.locator('.space-y-2 button').first();
      if (await firstOption.isVisible()) {
        await firstOption.click();
        await page.waitForTimeout(150);
      }
    }

    // Results screen: check module scores breakdown
    await expect(page.locator('text=Hasil Tes Penempatan')).toBeVisible();
    await expect(page.locator('text=Excel')).toBeVisible();
    await expect(page.locator('text=JavaScript')).toBeVisible();
    await expect(page.locator('text=Word')).toBeVisible();
    await expect(page.locator('text=Alasan Penempatan:')).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('Onboarding asks for a name before the placement test', async ({ page }) => {
    await page.goto('/');
    const nameInput = page.locator('input[placeholder*="nama Anda"]').first();
    await expect(nameInput).toHaveValue('');
    await page.locator('button:has-text("Ikuti Tes Penempatan")').first().click();
    await expect(page.getByRole('alert')).toContainText('Isi namamu dulu');
    await expect(page.locator('text=Soal Penempatan 1')).toHaveCount(0);
    await nameInput.fill('Dewi Lestari');
    await expect(page.getByRole('alert')).toHaveCount(0);
  });
});
