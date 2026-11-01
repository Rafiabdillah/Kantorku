import { test, expect } from '@playwright/test';

test.describe('KantorKu Smoke & Robustness Test Suite', () => {
  test('Desktop: Loads OfficeHubView cleanly without console or page errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(`[PageError]: ${err.message}`));
    page.on('console', (msg) => {
      if (msg.type() === 'error' && !msg.text().includes('WebSocket') && !msg.text().includes('favicon')) {
        errors.push(`[ConsoleError]: ${msg.text()}`);
      }
    });

    await page.goto('/?autostart=1&view=office');
    await page.waitForLoadState('networkidle');

    // Confirm Office Hub view elements are present
    await expect(page.locator('img[alt="KantorKu"], [aria-label="KantorKu"], .font-black:has-text("KantorKu")').first()).toBeAttached();
    await expect(page.locator('text=Denah Interaktif Kantor')).toBeVisible();
    await expect(page.locator('text=Meja Kerjamu')).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('Desktop: Navigates through all core views cleanly', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(`[PageError]: ${err.message}`));
    page.on('console', (msg) => {
      if (msg.type() === 'error' && !msg.text().includes('WebSocket') && !msg.text().includes('favicon')) {
        errors.push(`[ConsoleError]: ${msg.text()}`);
      }
    });

    const viewsToTest = [
      { view: 'career-map', indicator: 'Peta Karier' },
      { view: 'mission', indicator: 'Target Pekerjaan' },
      { view: 'case-file', indicator: 'Kasus Nyata' },
      { view: 'learning', indicator: 'Pusat Belajar' },
      { view: 'dictionary', indicator: 'Kamus' },
      { view: 'settings', indicator: 'Pengaturan' },
    ];

    for (const item of viewsToTest) {
      await page.goto(`/?autostart=1&view=${item.view}`);
      await page.waitForLoadState('domcontentloaded');
      // Wait briefly for lazy components
      await page.waitForTimeout(300);
      await expect(page.locator(`text=${item.indicator}`).first()).toBeVisible();
    }

    expect(errors).toEqual([]);
  });

  test('Mobile: Viewport 390x844 has no horizontal overflow and tabs function properly', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(`[PageError]: ${err.message}`));

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/?autostart=1&view=office');
    await page.waitForLoadState('domcontentloaded');

    // Check no horizontal scroll on office page
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);

    // Test Mission view mobile tabs
    await page.goto('/?autostart=1&view=mission');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(300);

    const briefTab = page.locator('button:has-text("Brief")').first();
    const editorTab = page.locator('button:has-text("Editor")').first();
    const checkTab = page.locator('button:has-text("Cek")').first();

    await expect(editorTab).toBeVisible();
    await briefTab.click();
    await expect(page.locator('text=Konsep Inti')).toBeVisible();

    await checkTab.click();
    await expect(page.locator('text=Target Pekerjaan')).toBeVisible();

    // Test Case File mobile tabs
    await page.goto('/?autostart=1&view=case-file');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(300);

    const caseBriefTab = page.locator('button:has-text("Briefing")').first();
    const caseEditorTab = page.locator('button:has-text("Editor")').first();
    await expect(caseBriefTab).toBeVisible();
    await expect(caseEditorTab).toBeVisible();

    expect(errors).toEqual([]);
  });
});
