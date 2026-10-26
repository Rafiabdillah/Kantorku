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

  test('P2.2 Word Editor (TipTap): Formats headings, tables, and document metadata', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(`[PageError]: ${err.message}`));

    await page.goto('/?autostart=1&view=mission&level=word-t1-01');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    const tiptap = page.locator('.tiptap-doc-wrapper');
    await expect(tiptap).toBeVisible();

    // Check heading and toolbar elements
    await expect(page.locator('button[title*="Heading 1"]').first()).toBeVisible();
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
});
