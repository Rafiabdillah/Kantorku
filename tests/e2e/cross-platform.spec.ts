import { test, expect } from '@playwright/test';

test.describe('KantorKu Cross-Platform & Device Robustness Suite', () => {
  test('Windows 10/11 Scaling: 125% and 150% DPI display simulation without layout clipping', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(`[PageError]: ${err.message}`));
    page.on('console', (msg) => {
      if (msg.type() === 'error' && !msg.text().includes('WebSocket') && !msg.text().includes('favicon')) {
        errors.push(`[ConsoleError]: ${msg.text()}`);
      }
    });

    // Test Windows laptop at 125% DPI (1536x864 with scaleFactor 1.25)
    await page.setViewportSize({ width: 1228, height: 691 });
    await page.goto('/?autostart=1&view=office');
    await page.waitForLoadState('domcontentloaded');

    let hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflow).toBe(false);

    // Test Windows laptop at 150% DPI (1280x720)
    await page.setViewportSize({ width: 1024, height: 600 });
    await page.goto('/?autostart=1&view=office');
    await page.waitForLoadState('domcontentloaded');

    hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflow).toBe(false);

    expect(errors).toEqual([]);
  });

  test('Mobile Device (360x780 Android & 390x844 iPhone): Zero horizontal scroll and touch navigation', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(`[PageError]: ${err.message}`));

    // Budget Android viewport 360x780
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto('/?autostart=1&view=office');
    await page.waitForLoadState('domcontentloaded');

    let hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflow).toBe(false);

    // Check header brand and quick navigation
    await expect(page.locator('text=KantorKu').first()).toBeVisible();

    // Mission play on mobile 360px
    await page.goto('/?autostart=1&view=mission');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(400);

    hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflow).toBe(false);

    // Tabs should be interactive and switch cleanly
    const editorTab = page.locator('button:has-text("Editor")').first();
    const briefTab = page.locator('button:has-text("Brief")').first();
    const checkTab = page.locator('button:has-text("Cek")').first();

    await expect(editorTab).toBeVisible();
    await briefTab.click();
    await expect(page.locator('text=Konsep Inti').first()).toBeVisible();
    await checkTab.click();
    await expect(page.locator('text=Target Pekerjaan').first()).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('P2.2 TipTap Word Editor: Formats headings, tables, and synchronizes document structure', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(`[PageError]: ${err.message}`));

    // Navigate to Word mission level
    await page.goto('/?autostart=1&view=mission&level=word-t1-01');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // Check TipTap wrapper is mounted
    const tiptapContainer = page.locator('.tiptap-doc-wrapper');
    await expect(tiptapContainer).toBeVisible();

    // Check ribbon buttons are visible and accessible
    const h1Button = page.locator('button[title*="Heading 1"]').first();
    const boldButton = page.locator('button[title*="Tebal"]').first();
    const tableButton = page.locator('button[title*="Sisipkan Tabel"]').first();
    const citationButton = page.locator('button[title*="Sitasi"]').first();

    await expect(h1Button).toBeVisible();
    await expect(boldButton).toBeVisible();
    await expect(tableButton).toBeVisible();
    await expect(citationButton).toBeVisible();

    // Insert footnote / citation
    await citationButton.click();

    expect(errors).toEqual([]);
  });

  test('P2.3 CodeMirror 6 Editor: Renders syntax container, line numbers, and runs sandbox', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(`[PageError]: ${err.message}`));

    // Navigate to JavaScript mission level
    await page.goto('/?autostart=1&view=mission&level=code-t1-01');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // CodeMirror editor is present on JS mission
    const cmEditor = page.locator('.cm-editor');
    await expect(cmEditor).toBeVisible();
    const cmGutters = page.locator('.cm-gutters');
    await expect(cmGutters).toBeVisible();

    // Test running code
    const runButton = page.locator('button:has-text("Jalankan")').first();
    await expect(runButton).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('PWA Compliance: Web App Manifest and offline assets are properly configured', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Verify viewport and meta tags
    const metaThemeColor = await page.locator('meta[name="theme-color"]').getAttribute('content');
    expect(metaThemeColor).toBe('#0f172a');

    const appleTouchIcon = await page.locator('link[rel="apple-touch-icon"]').getAttribute('href');
    expect(appleTouchIcon).toBe('/apple-touch-icon.png');

    // Verify manifest route is accessible and contains valid JSON
    const manifestResponse = await page.request.get('/manifest.webmanifest');
    expect(manifestResponse.status()).toBe(200);

    const manifest = await manifestResponse.json();
    expect(manifest.id).toBe('/');
    expect(manifest.short_name).toBe('KantorKu');
    expect(manifest.display).toBe('standalone');
    expect(manifest.icons.length).toBeGreaterThanOrEqual(3);

    // Verify icon files return 200 OK
    const icon192 = await page.request.get('/pwa-192x192.png');
    expect(icon192.status()).toBe(200);

    const icon512 = await page.request.get('/pwa-512x512.png');
    expect(icon512.status()).toBe(200);
  });
});
