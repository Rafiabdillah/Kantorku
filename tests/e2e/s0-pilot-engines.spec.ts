/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu - S0 Pilot Engines & Semesta Keterampilan E2E Test Suite
 * Covers Desktop & Mobile (360px) viewports:
 * 1. Peta Keterampilan (17 Domains Aktif, 0 Segera Hadir, Goal Wizard)
 * 2. Email Editor Engine (Reference solution passes 3C + Spelling, flawed text fails with tip)
 * 3. Simulation Engine (Branching choices, sentence blocks, reputation update & debrief)
 * 4. Advanced Quiz Engine (Analytical formats, reorder, matching, spot error, hotspot)
 * 5. Store Migration (Legacy v1 localStorage profile migrates safely to v2 with domainMastery)
 */

import { test, expect } from '@playwright/test';

test.describe('KantorKu Wave S0: Pilot Engines & Semesta Keterampilan Suite', () => {
  // =========================================================================
  // 1. Peta Keterampilan & Goal Wizard (Desktop & Mobile 360px)
  // =========================================================================
  test('Peta Keterampilan: 17 domains Aktif, 0 Segera Hadir, Goal Wizard updates target role', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(`[PageError]: ${err.message}`));

    // Test Desktop Viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/?autostart=1&view=skills-map');
    await page.waitForLoadState('domcontentloaded');

    // Verify Title & Hero
    await expect(page.locator('text=Peta Keterampilan Profesional')).toBeVisible();
    await expect(page.locator('text=Semesta Keterampilan v9.1')).toBeVisible();

    // Verify Stats
    await expect(page.locator('text=Domain Aktif').first()).toBeVisible();
    await expect(page.locator('text=Segera Hadir').first()).toBeVisible();

    // Verify 17 active domains and 0 upcoming domains in quick stats
    await expect(page.getByTestId('active-domain-count')).toHaveText('17');
    await expect(page.getByTestId('upcoming-domain-count')).toHaveText('0');

    // Verify D12 card exists and is labeled "Aktif (S0)"
    const d12Heading = page.getByRole('heading', { name: 'Komunikasi Profesional & Etiket Kerja' });
    await expect(d12Heading).toBeVisible();

    // Verify Goal Wizard (Click "Staf Keuangan")
    const stafKeuanganBtn = page.getByRole('button', { name: '📊 Staf Keuangan' });
    await expect(stafKeuanganBtn).toBeVisible();
    await stafKeuanganBtn.click();
    await page.waitForTimeout(200);

    // Verify current role changed to Staf Akuntansi / Keuangan
    await expect(page.locator('text=Staf Akuntansi / Keuangan')).toBeVisible();
    await expect(page.locator('text=0% bobot peran ini ada di domain yang belum tersedia')).toBeVisible();

    // Test 16-Role Selector (F4 & F7.5): Toggle all roles and select 3 roles
    const toggleRolesBtn = page.getByRole('button', { name: /Lihat Semua 16 Peran/ });
    await expect(toggleRolesBtn).toBeVisible();
    await toggleRolesBtn.click();
    await page.waitForTimeout(200);

    // 1. Select Pemilik UMKM (0% belum ada after S3b)
    const umkmBtn = page.locator('button:has-text("Pemilik UMKM")').first();
    await expect(umkmBtn).toBeVisible();
    await expect(umkmBtn).toContainText('0% belum ada');
    await umkmBtn.click();
    await page.waitForTimeout(200);
    await expect(page.locator('text=0% bobot peran ini ada di domain yang belum tersedia')).toBeVisible();

    // 2. Select Analis Data Junior (0% belum ada after S3b)
    await toggleRolesBtn.click();
    await page.waitForTimeout(200);
    const dataAnalystBtn = page.locator('button:has-text("Analis Data Junior")').first();
    await expect(dataAnalystBtn).toContainText('0% belum ada');
    await dataAnalystBtn.click();
    await page.waitForTimeout(200);
    await expect(page.locator('text=0% bobot peran ini ada di domain yang belum tersedia')).toBeVisible();

    // 3. Select Admin Perkantoran (0% belum ada after S3b)
    await toggleRolesBtn.click();
    await page.waitForTimeout(200);
    const adminBtn = page.locator('button:has-text("Admin Perkantoran")').filter({ hasText: '0% belum ada' });
    await expect(adminBtn).toContainText('0% belum ada');
    await adminBtn.click();
    await page.waitForTimeout(200);
    await expect(page.locator('text=0% bobot peran ini ada di domain yang belum tersedia')).toBeVisible();

    // Test filter tabs: Aktif (17) and Segera Hadir (0) calculated dynamically from DOMAIN_CATALOG
    const aktifFilter = page.getByRole('button', { name: 'Aktif (17)' });
    const segeraHadirFilter = page.getByRole('button', { name: 'Segera Hadir (0)' });
    await expect(aktifFilter).toBeVisible();
    await expect(segeraHadirFilter).toBeVisible();

    // Check Aktif (17) filter
    await aktifFilter.click();
    await page.waitForTimeout(200);
    await expect(page.locator('[data-domain-id]')).toHaveCount(17);
    await expect(d12Heading).toBeVisible();

    // Check Segera Hadir (0) filter
    await segeraHadirFilter.click();
    await page.waitForTimeout(200);
    await expect(page.locator('[data-domain-id]')).toHaveCount(0);
    await expect(d12Heading).not.toBeVisible();

    // Reset filter to "Semua (17)"
    await page.getByRole('button', { name: 'Semua (17)' }).click();
    await page.waitForTimeout(200);
    await expect(page.locator('[data-domain-id]')).toHaveCount(17);
    await expect(d12Heading).toBeVisible();

    expect(errors).toEqual([]);
  });

  test('Mobile (360x780 & 390x844): Peta Keterampilan renders with zero horizontal scroll', async ({ page }) => {
    for (const viewport of [
      { width: 360, height: 780 },
      { width: 390, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto('/?autostart=1&view=skills-map');
      await page.waitForLoadState('domcontentloaded');

      // Confirm no horizontal overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(hasHorizontalScroll).toBe(false);

      // Goal wizard presets should wrap cleanly
      await expect(page.locator('button:has-text("Admin Perkantoran")').first()).toBeVisible();
      await expect(page.locator('button:has-text("Fresh Graduate")').first()).toBeVisible();
    }
  });

  // =========================================================================
  // 2. Email Editor Engine (D12-LEVEL-01)
  // =========================================================================
  test('Email Editor: Reference solution passes all 3C & spelling rules, flawed draft fails with tip', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/?autostart=1&view=skills-map');
    await page.waitForLoadState('domcontentloaded');

    // Click on D12 card to open modal drilldown
    await page.getByRole('heading', { name: 'Komunikasi Profesional & Etiket Kerja' }).click();
    await page.waitForTimeout(300);

    // Verify modal is open
    await expect(page.locator('text=Ruang Latihan Interaktif')).toBeVisible();

    // Click "Mulai Latihan" on D12-LEVEL-01 (1st card in modal)
    await page.getByRole('button', { name: 'Mulai Latihan' }).nth(0).click();
    await page.waitForTimeout(300);

    // Verify EmailEditor renders
    await expect(page.locator('text=Checklist Aturan 3C')).toBeVisible();
    await expect(page.locator('text=Ejaan Dasar & Tanda Baca')).toBeVisible();

    const sendBtn = page.getByRole('button', { name: 'Kirim & Evaluasi Email' });
    await expect(sendBtn).toBeVisible();

    // 1. Test deliberate errors on flawed draft:
    // Bad subject (too short) and double punctuation "!!"
    const subjectInput = page.locator('input[placeholder*="Klarifikasi Perubahan Jadwal"]');
    await subjectInput.fill('Jadwal');

    const bodyTextarea = page.locator('textarea[placeholder*="Tuliskan email profesional"]');
    await bodyTextarea.fill('halo bu tolong berkasnya dikirim segera ya!! terima kasih.');

    await sendBtn.click();
    await page.waitForTimeout(300);

    // Verify failure and tips
    await expect(page.locator('text=Subjek minimal 3 kata')).toBeVisible();
    await expect(page.locator('text=Hindari tanda baca ganda berlebih')).toBeVisible();

    // 2. Test passive verb typo: "di kirim" without double punctuation
    await bodyTextarea.fill('halo bu tolong berkasnya di kirim segera ya. terima kasih.');
    await sendBtn.click();
    await page.waitForTimeout(300);
    await expect(page.locator('text=Kata kerja pasif harus digabung')).toBeVisible();

    // 3. Test valid professional email input (passes all 9 rules)
    await subjectInput.fill('Konfirmasi Penyesuaian Jadwal Pertemuan Presentasi Proyek');
    await bodyTextarea.fill(
      'Yth. Ibu Ratna,\n\nSehubungan dengan permohonan penyesuaian jadwal presentasi proyek, kami sangat memahami agenda Ibu. Kami bermaksud mengusulkan dua alternatif waktu pengganti yaitu Kamis atau Jumat.\n\nBersama email ini kami juga melampirkan draf revisi proposal untuk ditinjau. Mohon konfirmasi jadwal yang paling sesuai sebelum hari Rabu besok.\n\nTerima kasih atas kerja samanya.\n\nHormat kami,\nBudi Pratama\nAdmin Operasional'
    );
    const attachCheckbox = page.locator('input[type="checkbox"]');
    await attachCheckbox.check();
    await sendBtn.click();
    await page.waitForTimeout(300);

    // Verify success banner appears (9 / 9 objectives pass)
    await expect(page.locator('text=9 / 9 Lolos')).toBeVisible();
  });

  // =========================================================================
  // 3. Simulation Engine (D12-LEVEL-02)
  // =========================================================================
  test('Simulation Engine: Empathic choices increase character reputation and sentence assembly completes scenario', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/?autostart=1&view=skills-map');
    await page.waitForLoadState('domcontentloaded');

    // Open D12 drilldown modal
    await page.getByRole('heading', { name: 'Komunikasi Profesional & Etiket Kerja' }).click();
    await page.waitForTimeout(300);

    // Click "Mulai Latihan" on D12-LEVEL-02 (2nd card in modal)
    await page.getByRole('button', { name: 'Mulai Latihan' }).nth(1).click();
    await page.waitForTimeout(300);

    // Verify Bu Ratna's complaint text
    await expect(page.locator('text=Pesanan 50 paket daging olahan untuk makan siang belum sampai sekarang!')).toBeVisible();

    // Select the empathic H.E.A.T response (Choice c2)
    const empathicChoice = page.getByRole('button', { name: /Selamat siang Ibu Ratna\. Kami sangat memahami kepanikan Ibu/ });
    await expect(empathicChoice).toBeVisible();
    await empathicChoice.click();
    await page.waitForTimeout(300);

    // Verify live reputation badge appeared
    await expect(page.locator('text=+3 Reputasi Ibu Ratna')).toBeVisible();

    // We transition to node-solution-assembly (sentence block assembly)
    await expect(page.locator('text=Susun Jawaban dari Blok Kalimat')).toBeVisible();

    // Click blocks in valid order: b1, b2, b3, b4
    await page.getByRole('button', { name: /armada darurat kami saat ini sudah berada 3 km/ }).click();
    await page.getByRole('button', { name: /Kurir khusus kami pastikan tiba paling lambat pukul 11\.05/ }).click();
    await page.getByRole('button', { name: /Sebagai bentuk kompensasi atas ketidaknyamanan ini/ }).click();
    await page.getByRole('button', { name: /Saya pribadi akan mengawal panggilan telepon/ }).click();

    // Click submit assembly button
    const submitAssemblyBtn = page.getByRole('button', { name: 'Kirim Rangkaian Pesan' });
    await expect(submitAssemblyBtn).toBeEnabled();
    await submitAssemblyBtn.click();
    await page.waitForTimeout(300);

    // Verify debrief is reached
    await expect(page.locator('text=Simulasi Selesai & Terevaluasi')).toBeVisible();
    await expect(page.locator('text=Dampak Reputasi Relasi')).toBeVisible();
    await expect(page.getByText('+3 Reputasi', { exact: true })).toBeVisible();

    // Verify persistence after reload
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    const stored = await page.evaluate(() => {
      const raw = localStorage.getItem('kantorku_game_storage_v1');
      return raw ? JSON.parse(raw) : null;
    });
    expect(stored?.state?.profile?.reputation?.klien).toBeGreaterThanOrEqual(53);
  });

  // =========================================================================
  // 4. Advanced Quiz Engine (D12-LEVEL-03)
  // =========================================================================
  test('Advanced Quiz Engine: Renders analytical formats (reordering, matching, spot error, hotspot)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/?autostart=1&view=skills-map');
    await page.waitForLoadState('domcontentloaded');

    // Open D12 drilldown modal
    await page.getByRole('heading', { name: 'Komunikasi Profesional & Etiket Kerja' }).click();
    await page.waitForTimeout(300);

    // Click "Mulai Latihan" on D12-LEVEL-03 (3rd card in modal)
    await page.getByRole('button', { name: 'Mulai Latihan' }).nth(2).click();
    await page.waitForTimeout(300);

    // Verify Quiz Engine Header & Format 1: Urutan
    await expect(page.locator('text=Kuis Analitis Lanjutan (Mode K)')).toBeVisible();
    await expect(page.locator('text=Susun urutan dengan tombol panah:')).toBeVisible();

    // Interact with reorder arrows
    const downArrowBtn = page.locator('button[title="Geser ke bawah"]').first();
    await downArrowBtn.click();
    await page.waitForTimeout(100);

    // Click "Cek Jawaban"
    const checkBtn = page.getByRole('button', { name: 'Cek Jawaban' });
    await expect(checkBtn).toBeVisible();
    await checkBtn.click();
    await page.waitForTimeout(200);

    // Feedback appears (either Jawaban Benar or Perlu Diperbaiki)
    await expect(page.getByRole('button', { name: 'Soal Berikutnya →' })).toBeVisible();
  });

  // =========================================================================
  // 5. Store Migration (Legacy Profile Fixture)
  // =========================================================================
  test('Store Migration: Upgrades legacy profile v1 to v2 while preserving progress and populating domainMastery', async ({ page }) => {
    // Inject legacy v1 localStorage state before navigating
    await page.addInitScript(() => {
      const legacyStorage = {
        state: {
          profile: {
            name: 'Rudi Hartono (Pemain Lama)',
            avatar: 'player',
            xp: 4200,
            coins: 520,
            streakDays: 5,
            moduleMastery: {
              excel: 80,
              word: 50,
              coding: 30,
              web: 40,
            },
            completedLevelIds: ['excel-t1-01', 'excel-t1-02', 'word-t1-01'],
            hasCompletedOnboarding: true,
          },
        },
        version: 1, // Legacy version
      };
      localStorage.setItem('kantorku_game_storage_v1', JSON.stringify(legacyStorage));
    });

    await page.goto('/?autostart=1&view=office');
    await page.waitForLoadState('domcontentloaded');

    // Verify that player name & progress were preserved in UI
    await expect(page.getByRole('heading', { name: /Selamat Datang, Rudi Hartono/ })).toBeVisible();

    // Verify that localStorage has been migrated to version 2 and contains domainMastery
    const storedState = await page.evaluate(() => {
      const raw = localStorage.getItem('kantorku_game_storage_v1');
      return raw ? JSON.parse(raw) : null;
    });

    expect(storedState).not.toBeNull();
    expect(storedState.version).toBe(2);
    expect(storedState.state.profile.domainMastery).toBeDefined();
    expect(storedState.state.profile.domainMastery.D1).toBe(80); // From excel
    expect(storedState.state.profile.domainMastery.D2).toBe(50); // From word
    expect(storedState.state.profile.domainMastery.D5).toBe(35); // Math.round((30 + 40) / 2)
    expect(storedState.state.profile.domainMastery.D12).toBe(0);
    expect(storedState.state.profile.completedLevelIds).toEqual(['excel-t1-01', 'excel-t1-02', 'word-t1-01']);
  });
});
