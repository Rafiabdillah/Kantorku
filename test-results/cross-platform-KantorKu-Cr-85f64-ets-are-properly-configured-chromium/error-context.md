# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cross-platform.spec.ts >> KantorKu Cross-Platform & Device Robustness Suite >> PWA Compliance: Web App Manifest and offline assets are properly configured
- Location: tests/e2e/cross-platform.spec.ts:129:3

# Error details

```
SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e11] [cursor=pointer]:
        - generic [ref=e12]: KantorKu
        - generic [ref=e13]: PT Maju Sejahtera
      - navigation [ref=e14]:
        - button "Kantor" [ref=e15] [cursor=pointer]
        - button "Belajar" [ref=e20] [cursor=pointer]
        - button "Peta Karier" [ref=e25] [cursor=pointer]
        - button "Kasus Nyata" [ref=e29] [cursor=pointer]
        - button "Portofolio" [ref=e34] [cursor=pointer]
        - button "Toko" [ref=e40] [cursor=pointer]
        - button "Lencana" [ref=e45] [cursor=pointer]
        - button "Kamus" [ref=e53] [cursor=pointer]
        - button "Catatan" [ref=e57] [cursor=pointer]
        - button "Pengaturan" [ref=e62] [cursor=pointer]
      - generic [ref=e67]:
        - generic [ref=e69]:
          - generic [ref=e70]: 🌱 Magang
          - generic [ref=e71]: (0 XP)
        - generic "Koin Kantor" [ref=e73] [cursor=pointer]: "100"
        - generic "Streak Harian" [ref=e80] [cursor=pointer]: "1"
        - button "Matikan Suara" [ref=e84] [cursor=pointer]
        - button "Pusat Pengaturan & Profil" [ref=e89] [cursor=pointer]
  - main [ref=e93]:
    - generic [ref=e94]:
      - generic [ref=e96]:
        - generic [ref=e118]:
          - generic [ref=e119]:
            - generic [ref=e120]: 🌱 Magang
            - generic [ref=e121]: 1 Hari Streak
          - heading "Selamat Datang, Karyawan Baru!" [level=1] [ref=e124]
          - paragraph [ref=e125]: Kantor Pusat PT Maju Sejahtera. Selesaikan tugas hari ini untuk meningkatkan reputasimu di hadapan jajaran pimpinan!
        - generic [ref=e126]:
          - button "Inbox Kantor" [ref=e127] [cursor=pointer]
          - button "Tantangan Harian" [ref=e133] [cursor=pointer]
      - generic [ref=e137]:
        - generic [ref=e138]:
          - generic [ref=e139]:
            - heading "Denah Interaktif Kantor PT Maju Sejahtera" [level=2] [ref=e144]
            - generic [ref=e145]: Klik ruangan untuk memulai aktivitas
          - generic [ref=e146]:
            - generic [ref=e147] [cursor=pointer]:
              - generic [ref=e148]: Meja Utama
              - generic [ref=e154]:
                - heading "Meja Kerjamu" [level=3] [ref=e155]
                - paragraph [ref=e156]: Lanjutkan jalur karier utama (12 level misi) & cek tugas aktif.
            - generic [ref=e157] [cursor=pointer]:
              - generic [ref=e158]: Finance
              - generic [ref=e183]:
                - heading "Meja Pak Reza (Finance)" [level=3] [ref=e184]
                - paragraph [ref=e185]: "Praktik rumus Excel: SUM, VLOOKUP, hingga model audit laporan."
            - generic [ref=e186] [cursor=pointer]:
              - generic [ref=e187]: Lab IT
              - generic [ref=e212]:
                - heading "Ruang IT Kak Intan" [level=3] [ref=e213]
                - paragraph [ref=e214]: "Tantangan coding JavaScript: variabel, filter, dan algoritma."
            - generic [ref=e215] [cursor=pointer]:
              - generic [ref=e216]: HR & Arsip
              - generic [ref=e238]:
                - heading "Ruang Maya (HR & Word)" [level=3] [ref=e239]
                - paragraph [ref=e240]: Penyusunan surat resmi, notulen rapat, dan dokumen standar.
            - generic [ref=e241] [cursor=pointer]:
              - generic [ref=e242]: Kasus Nyata
              - generic [ref=e267]:
                - heading "Ruang Briefing Kasus" [level=3] [ref=e268]
                - paragraph [ref=e269]: "Kerjakan 3 studi kasus nyata: UMKM, klinik, kargo, & perhotelan."
            - generic [ref=e270] [cursor=pointer]:
              - generic [ref=e271]: Pantry
              - generic [ref=e293]:
                - heading "Pantry & Zona Santai" [level=3] [ref=e294]
                - paragraph [ref=e295]: Ngopi bareng Dimas, latihan Zen tanpa timer, atau duel asinkron!
            - generic [ref=e296] [cursor=pointer]:
              - generic [ref=e297]: Ruang Pelatihan
              - generic [ref=e303]:
                - heading "Akademi & Pusat Belajar" [level=3] [ref=e304]
                - paragraph [ref=e305]: Pelajari 39 modul terstruktur dari nol, latihan bebas, & lembar contekan.
        - generic [ref=e306]:
          - generic [ref=e307]:
            - generic [ref=e308]:
              - generic [ref=e309]: Jadwal Kantor Hari Ini
              - generic [ref=e313]: Senin, Standup Mingguan
            - generic [ref=e314]:
              - generic [ref=e317]:
                - generic [ref=e318]: 09.00 - Standup Divisi Operasional
                - generic [ref=e319]: Laporan mingguan inventaris barang bersama Bu Sari.
              - generic [ref=e322]:
                - generic [ref=e323]: 14.00 - Audit Berkas Keuangan
                - generic [ref=e324]: Pemeriksaan selisih rumus Excel dengan Pak Reza.
          - generic [ref=e325]:
            - heading "Mode Game Lainnya" [level=3] [ref=e326]
            - generic [ref=e327]:
              - button "Detektif" [ref=e328] [cursor=pointer]
              - button "Mentor" [ref=e333] [cursor=pointer]
              - button "Kilat" [ref=e340] [cursor=pointer]
              - button "Ujian & Sertif" [ref=e344] [cursor=pointer]
              - button "Duel Asinkron" [ref=e349] [cursor=pointer]
              - button "Kreator Level" [ref=e357] [cursor=pointer]
```

# Test source

```ts
  44  | 
  45  |     let hasOverflow = await page.evaluate(() => {
  46  |       return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  47  |     });
  48  |     expect(hasOverflow).toBe(false);
  49  | 
  50  |     // Check header brand and quick navigation
  51  |     await expect(page.locator('text=KantorKu').first()).toBeVisible();
  52  | 
  53  |     // Mission play on mobile 360px
  54  |     await page.goto('/?autostart=1&view=mission');
  55  |     await page.waitForLoadState('domcontentloaded');
  56  |     await page.waitForTimeout(400);
  57  | 
  58  |     hasOverflow = await page.evaluate(() => {
  59  |       return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  60  |     });
  61  |     expect(hasOverflow).toBe(false);
  62  | 
  63  |     // Tabs should be interactive and switch cleanly
  64  |     const editorTab = page.locator('button:has-text("Editor")').first();
  65  |     const briefTab = page.locator('button:has-text("Brief")').first();
  66  |     const checkTab = page.locator('button:has-text("Cek")').first();
  67  | 
  68  |     await expect(editorTab).toBeVisible();
  69  |     await briefTab.click();
  70  |     await expect(page.locator('text=Konsep Inti').first()).toBeVisible();
  71  |     await checkTab.click();
  72  |     await expect(page.locator('text=Target Pekerjaan').first()).toBeVisible();
  73  | 
  74  |     expect(errors).toEqual([]);
  75  |   });
  76  | 
  77  |   test('P2.2 TipTap Word Editor: Formats headings, tables, and synchronizes document structure', async ({ page }) => {
  78  |     const errors: string[] = [];
  79  |     page.on('pageerror', (err) => errors.push(`[PageError]: ${err.message}`));
  80  | 
  81  |     // Navigate to Word mission level
  82  |     await page.goto('/?autostart=1&view=mission&level=word-t1-01');
  83  |     await page.waitForLoadState('domcontentloaded');
  84  |     await page.waitForTimeout(500);
  85  | 
  86  |     // Check TipTap wrapper is mounted
  87  |     const tiptapContainer = page.locator('.tiptap-doc-wrapper');
  88  |     await expect(tiptapContainer).toBeVisible();
  89  | 
  90  |     // Check ribbon buttons are visible and accessible
  91  |     const h1Button = page.locator('button[title*="Heading 1"]').first();
  92  |     const boldButton = page.locator('button[title*="Tebal"]').first();
  93  |     const tableButton = page.locator('button[title*="Sisipkan Tabel"]').first();
  94  |     const citationButton = page.locator('button[title*="Sitasi"]').first();
  95  | 
  96  |     await expect(h1Button).toBeVisible();
  97  |     await expect(boldButton).toBeVisible();
  98  |     await expect(tableButton).toBeVisible();
  99  |     await expect(citationButton).toBeVisible();
  100 | 
  101 |     // Insert footnote / citation
  102 |     await citationButton.click();
  103 | 
  104 |     expect(errors).toEqual([]);
  105 |   });
  106 | 
  107 |   test('P2.3 CodeMirror 6 Editor: Renders syntax container, line numbers, and runs sandbox', async ({ page }) => {
  108 |     const errors: string[] = [];
  109 |     page.on('pageerror', (err) => errors.push(`[PageError]: ${err.message}`));
  110 | 
  111 |     // Navigate to JavaScript mission level
  112 |     await page.goto('/?autostart=1&view=mission&level=code-t1-01');
  113 |     await page.waitForLoadState('domcontentloaded');
  114 |     await page.waitForTimeout(500);
  115 | 
  116 |     // CodeMirror editor is present on JS mission
  117 |     const cmEditor = page.locator('.cm-editor');
  118 |     await expect(cmEditor).toBeVisible();
  119 |     const cmGutters = page.locator('.cm-gutters');
  120 |     await expect(cmGutters).toBeVisible();
  121 | 
  122 |     // Test running code
  123 |     const runButton = page.locator('button:has-text("Jalankan")').first();
  124 |     await expect(runButton).toBeVisible();
  125 | 
  126 |     expect(errors).toEqual([]);
  127 |   });
  128 | 
  129 |   test('PWA Compliance: Web App Manifest and offline assets are properly configured', async ({ page }) => {
  130 |     await page.goto('/');
  131 |     await page.waitForLoadState('domcontentloaded');
  132 | 
  133 |     // Verify viewport and meta tags
  134 |     const metaThemeColor = await page.locator('meta[name="theme-color"]').getAttribute('content');
  135 |     expect(metaThemeColor).toBe('#0f172a');
  136 | 
  137 |     const appleTouchIcon = await page.locator('link[rel="apple-touch-icon"]').getAttribute('href');
  138 |     expect(appleTouchIcon).toBe('/apple-touch-icon.png');
  139 | 
  140 |     // Verify manifest route is accessible and contains valid JSON
  141 |     const manifestResponse = await page.request.get('/manifest.webmanifest');
  142 |     expect(manifestResponse.status()).toBe(200);
  143 | 
> 144 |     const manifest = await manifestResponse.json();
      |                      ^ SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON
  145 |     expect(manifest.id).toBe('/');
  146 |     expect(manifest.short_name).toBe('KantorKu');
  147 |     expect(manifest.display).toBe('standalone');
  148 |     expect(manifest.icons.length).toBeGreaterThanOrEqual(3);
  149 | 
  150 |     // Verify icon files return 200 OK
  151 |     const icon192 = await page.request.get('/pwa-192x192.png');
  152 |     expect(icon192.status()).toBe(200);
  153 | 
  154 |     const icon512 = await page.request.get('/pwa-512x512.png');
  155 |     expect(icon512.status()).toBe(200);
  156 |   });
  157 | });
  158 | 
```