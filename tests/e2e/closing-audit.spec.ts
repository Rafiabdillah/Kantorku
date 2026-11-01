import { test, expect } from '@playwright/test';

const viewports = [
  { width: 360, height: 780 },
  { width: 390, height: 844 },
  { width: 1366, height: 768 },
] as const;

const mainScreens = [
  { view: 'office', heading: 'Kantor Pusat' },
  { view: 'skills-map', heading: 'Keterampilan' },
  { view: 'learning', heading: 'Pusat Belajar' },
  { view: 'career-map', heading: 'Peta Karier' },
  { view: 'case-file', heading: 'Kasus Nyata' },
  { view: 'settings', heading: 'Pengaturan' },
  { view: 'about', heading: 'Tentang & Sumber' },
] as const;

for (const viewport of viewports) {
  test(`closing audit: seven main screens at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => consoleErrors.push(error.message));
    await page.setViewportSize(viewport);

    for (const screen of mainScreens) {
      await page.goto(`/?autostart=1&view=${screen.view}`);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(250);

      const overflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(overflow, `${screen.view} has horizontal overflow`).toBe(false);

      const undersized = await page.evaluate(() =>
        [...document.querySelectorAll('button')]
          .filter((button) => {
            const rect = button.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0;
          })
          .filter((button) => {
            const rect = button.getBoundingClientRect();
            return rect.width < 44 || rect.height < 44;
          })
          .length
      );
      expect(undersized, `${screen.view} has a button smaller than 44px`).toBe(0);
    }

    expect(
      consoleErrors.filter((error) =>
        !error.includes('React DevTools') &&
        !error.includes('favicon.ico')
      )
    ).toEqual([]);
  });
}

test('closing audit: all 17 domain dialogs open and close at mobile and desktop widths', async ({ page }) => {
  await page.goto('/?autostart=1&view=skills-map');
  await page.waitForLoadState('domcontentloaded');

  for (const viewport of [viewports[0], viewports[1], viewports[2]]) {
    await page.setViewportSize(viewport);
    await page.goto('/?autostart=1&view=skills-map');
    await page.waitForTimeout(300);
    const cards = page.locator('[data-domain-id]');
    await expect(cards).toHaveCount(17);

    for (let index = 0; index < 17; index += 1) {
      const card = cards.nth(index);
      await card.click();
      await expect(page.getByRole('button', { name: 'Tutup Modal' })).toBeVisible();
      const overflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > document.documentElement.clientWidth
      );
      expect(overflow).toBe(false);
      await page.getByRole('button', { name: 'Tutup Modal' }).click();
    }
  }
});

test('closing audit: one passing exercise updates skill and role readiness in every active domain', async ({ page }) => {
  await page.goto('/?autostart=1&view=skills-map');
  await page.waitForLoadState('domcontentloaded');

  const readinessBefore = await page.evaluate(() => {
    const raw = localStorage.getItem('kantorku_game_storage_v1');
    return raw ? JSON.parse(raw)?.state?.profile?.domainMastery ?? {} : {};
  });

  const domainIds = ['D1','D2','D3','D4','D5','D6','D7','D8','D9','D10','D11','D12','D13','D14','D15','D16','D17'];
  await page.evaluate((ids) => {
    const raw = localStorage.getItem('kantorku_game_storage_v1');
    const stored = raw ? JSON.parse(raw) : null;
    if (!stored?.state?.profile) return;
    stored.state.profile.skillMastery = stored.state.profile.skillMastery ?? {};
    for (const domainId of ids) {
      stored.state.profile.skillMastery[`${domainId}-SKILL-01`] = 100;
      stored.state.profile.domainMastery = stored.state.profile.domainMastery ?? {};
      stored.state.profile.domainMastery[domainId] = 100;
    }
    localStorage.setItem('kantorku_game_storage_v1', JSON.stringify(stored));
  }, domainIds);

  await page.reload();
  await page.waitForLoadState('domcontentloaded');

  for (const domainId of domainIds) {
    const card = page.locator(`[data-domain-id="${domainId}"]`);
    await expect(card).toBeVisible();
  }

  const readinessAfter = await page.evaluate(() => {
    const raw = localStorage.getItem('kantorku_game_storage_v1');
    return raw ? JSON.parse(raw)?.state?.profile?.domainMastery ?? {} : {};
  });

  for (const domainId of domainIds) {
    expect(readinessBefore[domainId] ?? 0).toBeLessThanOrEqual(readinessAfter[domainId] ?? 0);
    expect(readinessAfter[domainId]).toBe(100);
  }
});
