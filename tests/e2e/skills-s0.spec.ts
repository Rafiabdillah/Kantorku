import { test, expect } from '@playwright/test';

test.describe('KantorKu F7: Skills S0 E2E Acceptance Suite', () => {
  test('Skills S0 Full Flow: Viewports, 17 Domains, 16 Roles, D12 Practice, and Persistence', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', (err) => {
      consoleErrors.push(err.message);
    });

    // 1. Desktop 1566: Peta Keterampilan loads with zero horizontal overflow
    await page.setViewportSize({ width: 1566, height: 768 });
    await page.goto('/?autostart=1&view=skills-map');
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('text=Peta Keterampilan Profesional')).toBeVisible({ timeout: 10000 });

    const desktopOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(desktopOverflow).toBe(false);

    // 2. Mobile 390x844: Zero horizontal overflow
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(300);
    const mobileOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(mobileOverflow).toBe(false);

    // Reset back to standard desktop for interaction tests
    await page.setViewportSize({ width: 1566, height: 768 });
    await page.waitForTimeout(200);

    // 3. Verify 17 domain cards: 17 active, 0 segera-hadir from DOMAIN_CATALOG
    await expect(page.getByTestId('active-domain-count')).toHaveText('17');
    await expect(page.getByTestId('upcoming-domain-count')).toHaveText('0');

    const domainCards = page.locator('[data-domain-id]');
    await expect(domainCards).toHaveCount(17);

    // Verify dynamic filter counters: Aktif (17) and Segera Hadir (0)
    const aktifFilterBtn = page.getByRole('button', { name: 'Aktif (17)' });
    const segeraHadirFilterBtn = page.getByRole('button', { name: 'Segera Hadir (0)' });
    await expect(aktifFilterBtn).toBeVisible();
    await expect(segeraHadirFilterBtn).toBeVisible();

    // Filtering by Aktif yields exactly 17 cards
    await aktifFilterBtn.click();
    await page.waitForTimeout(200);
    await expect(page.locator('[data-domain-id]')).toHaveCount(17);

    // Filtering by Segera Hadir yields exactly 0 cards
    await segeraHadirFilterBtn.click();
    await page.waitForTimeout(200);
    await expect(page.locator('[data-domain-id]')).toHaveCount(0);

    // Reset to Semua (17)
    await page.getByRole('button', { name: 'Semua (17)' }).click();
    await page.waitForTimeout(200);
    await expect(page.locator('[data-domain-id]')).toHaveCount(17);

    // 4. D13 is active and exposes practice exercise buttons
    const d13Card = page.locator('[data-domain-id="D13"]');
    await expect(d13Card).toBeVisible();
    await d13Card.click();
    await page.waitForTimeout(300);

    await expect(page.locator('text=Ruang Latihan Interaktif')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Mulai Latihan' })).not.toHaveCount(0);

    await page.getByRole('button', { name: 'Tutup Modal' }).click();
    await page.waitForTimeout(300);

    // 5. Select role from 16 choices; readiness panel shows "belum tersedia" > 0%
    const toggleRolesBtn = page.getByRole('button', { name: /Lihat Semua 16 Peran/ });
    await expect(toggleRolesBtn).toBeVisible();
    await toggleRolesBtn.click();
    await page.waitForTimeout(300);

    // Select Pemilik UMKM (0% belum ada after S3b)
    const umkmBtn = page.locator('button:has-text("Pemilik UMKM")').filter({ hasText: '0% belum ada' });
    await expect(umkmBtn).toBeVisible();
    await umkmBtn.click();
    await page.waitForTimeout(300);

    await expect(page.locator('text=0% bobot peran ini ada di domain yang belum tersedia')).toBeVisible();

    // 6. Open D12 and complete practice exercises
    const d12Card = page.locator('[data-domain-id="D12"]');
    await d12Card.click();
    await page.waitForTimeout(300);

    // Level 1: Email Editor
    const startLvl1Btn = page.getByRole('button', { name: 'Mulai Latihan' }).nth(0);
    await startLvl1Btn.click();
    await page.waitForTimeout(300);

    // Send without changes -> fails with "Ubah draf dulu"
    const sendBtn = page.getByRole('button', { name: 'Kirim & Evaluasi Email' });
    await sendBtn.click();
    await page.waitForTimeout(200);
    await expect(page.locator('text=Ubah draf dulu — ada yang perlu diperbaiki')).toBeVisible();

    // Now fill valid professional email to pass
    const subjectInput = page.locator('input[placeholder*="Klarifikasi Perubahan Jadwal"]');
    await subjectInput.fill('Konfirmasi Penyesuaian Jadwal Pertemuan Presentasi Proyek');
    const bodyTextarea = page.locator('textarea[placeholder*="Tuliskan email profesional"]');
    await bodyTextarea.fill(
      'Yth. Ibu Ratna,\n\nSehubungan dengan permohonan penyesuaian jadwal presentasi proyek, kami sangat memahami agenda Ibu. Kami bermaksud mengusulkan dua alternatif waktu pengganti yaitu Kamis atau Jumat.\n\nBersama email ini kami juga melampirkan draf revisi proposal untuk ditinjau. Mohon konfirmasi jadwal yang paling sesuai sebelum hari Rabu besok.\n\nTerima kasih atas kerja samanya.\n\nHormat kami,\nBudi Pratama\nAdmin Operasional'
    );
    const attachCheckbox = page.locator('input[type="checkbox"]');
    await attachCheckbox.check();
    await sendBtn.click();
    await page.waitForTimeout(300);

    // Close Level 1
    await page.getByRole('button', { name: 'Tutup Latihan ✕' }).click();
    await page.waitForTimeout(200);

    // Level 2: Simulation Engine
    const startLvl2Btn = page.getByRole('button', { name: 'Mulai Latihan' }).nth(1);
    await startLvl2Btn.click();
    await page.waitForTimeout(300);

    const empathicChoice = page.getByRole('button', { name: /Selamat siang Ibu Ratna\. Kami sangat memahami kepanikan Ibu/ });
    await empathicChoice.click();
    await page.waitForTimeout(300);

    // Simulation assembly starts empty; submit is disabled before any block is selected.
    await expect(page.getByRole('button', { name: 'Kirim Rangkaian Pesan' })).toBeDisabled();

    // Sentence assembly
    await page.getByRole('button', { name: /armada darurat kami saat ini sudah berada 3 km/ }).click();
    await page.getByRole('button', { name: /Kurir khusus kami pastikan tiba paling lambat pukul 11\.05/ }).click();
    await page.getByRole('button', { name: /Sebagai bentuk kompensasi atas ketidaknyamanan ini/ }).click();
    await page.getByRole('button', { name: /Saya pribadi akan mengawal panggilan telepon/ }).click();

    await page.getByRole('button', { name: 'Kirim Rangkaian Pesan' }).click();
    await page.waitForTimeout(300);
    await expect(page.locator('text=Simulasi Selesai & Terevaluasi')).toBeVisible();

    // Close Level 2
    await page.getByRole('button', { name: 'Tutup Latihan ✕' }).click();
    await page.waitForTimeout(200);

    // 7. Verify persistence in localStorage after reload
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    const storedMastery = await page.evaluate(() => {
      const raw = localStorage.getItem('kantorku_game_storage_v1');
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return {
        d12Skill01: parsed?.state?.profile?.skillMastery?.['D12-SKILL-01'],
        d12Skill02: parsed?.state?.profile?.skillMastery?.['D12-SKILL-02'],
        d12Domain: parsed?.state?.profile?.domainMastery?.['D12'],
      };
    });

    expect(storedMastery?.d12Skill01).toBe(100);
    expect(storedMastery?.d12Skill02).toBeGreaterThanOrEqual(70);
    expect(storedMastery?.d12Domain).toBeGreaterThan(0);

    // 8. Ensure no uncaught console errors
    const fatalErrors = consoleErrors.filter(
      (err) => !err.includes('Download the React DevTools') && !err.includes('favicon.ico')
    );
    expect(fatalErrors.length).toBe(0);
  });

  test('D17 disclaimer appears on panel, lessons, case, cheatsheet, and practice', async ({ page }) => {
    await page.goto('/?autostart=1&view=skills-map');
    await page.waitForLoadState('domcontentloaded');

    const d17Card = page.locator('[data-domain-id="D17"]');
    await expect(d17Card).toBeVisible();
    await d17Card.click();

    await expect(page.getByTestId('d17-disclaimer-panel')).toContainText('bukan nasihat hukum');
    await expect(page.getByTestId('d17-disclaimer-lessons')).toContainText('bukan nasihat hukum');
    await expect(page.getByTestId('d17-disclaimer-case')).toContainText('bukan nasihat hukum');
    await expect(page.getByTestId('d17-disclaimer-cheatsheet')).toContainText('bukan nasihat hukum');

    await page.getByRole('button', { name: 'Mulai Latihan' }).first().click();
    await expect(page.getByTestId('d17-disclaimer-practice')).toContainText('bukan nasihat hukum');
  });

  test('SQL practice starts empty, rejects empty submission, and accepts a correct query', async ({ page }) => {
    await page.goto('/?autostart=1&view=skills-map');
    await page.waitForLoadState('domcontentloaded');

    await page.locator('[data-domain-id="D4"]').click();
    await page.getByRole('button', { name: 'Mulai Latihan' }).first().click();

    const sqlEditor = page.getByLabel('Kueri SQL');
    await expect(sqlEditor).toBeVisible();
    await expect(sqlEditor).toHaveValue('');

    await page.getByRole('button', { name: 'Jalankan dan Bandingkan' }).click();
    await expect(page.getByText('Tulis kueri dulu')).toBeVisible();

    await sqlEditor.fill("SELECT sale_date, product, amount FROM sales WHERE sale_date >= '2026-01-01' AND sale_date < '2026-02-01' ORDER BY sale_date ASC");
    await page.getByRole('button', { name: 'Jalankan dan Bandingkan' }).click();
    await expect(page.getByText(/Benar\. Hasil kueri sama dengan kunci/)).toBeVisible();
  });

  test('Advanced quiz blank submission fails', async ({ page }) => {
    await page.goto('/?autostart=1&view=skills-map');
    await page.waitForLoadState('domcontentloaded');

    await page.locator('[data-domain-id="D12"]').click();
    await page.getByRole('button', { name: 'Mulai Latihan' }).nth(2).click();
    await page.getByRole('button', { name: 'Cek Jawaban' }).click();
    await expect(page.getByText('Perlu Diperbaiki')).toBeVisible();
  });
});
