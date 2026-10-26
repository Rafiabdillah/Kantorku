# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cross-platform.spec.ts >> KantorKu Cross-Platform & Device Robustness Suite >> P2.3 CodeMirror 6 Editor: Renders syntax container, line numbers, and runs sandbox
- Location: tests/e2e/cross-platform.spec.ts:107:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.cm-editor')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('.cm-editor') with timeout 5000ms
  - waiting for locator('.cm-editor')

```

```yaml
- banner:
  - text: KantorKu PT Maju Sejahtera
  - navigation:
    - button "Kantor"
    - button "Belajar"
    - button "Peta Karier"
    - button "Kasus Nyata"
    - button "Portofolio"
    - button "Toko"
    - button "Lencana"
    - button "Kamus"
    - button "Catatan"
    - button "Pengaturan"
  - text: 🌱 Magang (0 XP) 100 1
  - button "Matikan Suara"
  - button "Pusat Pengaturan & Profil"
- main:
  - button "Kembali ke Peta Karier"
  - text: Tier 1 • EXCEL | Input Data & Format Rupiah
  - button "Riwayat Dialog"
  - button "Pengaturan"
  - img
  - text: dimas PT Maju Sejahtera
  - paragraph: "\"Halo! Selamat datang di tim operasional. Bos Sari minta rekap harga ATK ini diformat rapi dalam Rupiah.\""
  - text: "Pilih Responsmu:"
  - button "Siap Dimas, saya rapikan dan format angka ke Rupiah sekarang juga."
  - button "Kenapa tidak langsung diformat dari sistem kasir sebelumnya?"
  - text: Konsep Inti
  - paragraph: Format Rupiah membuat angka moneter mudah dibaca tanpa mengubah nilai numerik aslinya. Di Excel, gunakan format mata uang Currency/Accounting.
  - text: Contoh Dikerjakan Angka "15000" bila diberi format Rupiah akan tampil sebagai "Rp 15.000".
  - button "Belum paham? Buka Pelajarannya"
  - button "Rp"
  - button "Format Persen (%)"
  - button "Format Angka Ribuan"
  - text: B2 fx
  - 'textbox "Ketik rumus (misal: =SUM(B2:B4)) atau angka"'
  - table:
    - rowgroup:
      - row "# A B C D E F G":
        - columnheader "#"
        - columnheader "A"
        - columnheader "B"
        - columnheader "C"
        - columnheader "D"
        - columnheader "E"
        - columnheader "F"
        - columnheader "G"
    - rowgroup:
      - row "1":
        - cell "1"
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
      - row "2":
        - cell "2"
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
      - row "3":
        - cell "3"
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
      - row "4":
        - cell "4"
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
      - row "5":
        - cell "5"
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
      - row "6":
        - cell "6"
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
      - row "7":
        - cell "7"
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
      - row "8":
        - cell "8"
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
      - row "9":
        - cell "9"
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
      - row "10":
        - cell "10"
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
      - row "11":
        - cell "11"
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
      - row "12":
        - cell "12"
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
        - cell
  - text: "Sheet1 (Aktif) | Pemisah: Titik Koma (;) Sel Kosong Target Pekerjaan 0/3 Selesai Ketik harga Kertas HVS (55000) pada sel B2 Ketik harga Spidol Whiteboard (12000) pada sel B3 Ketik harga Ordner Binder (35000) pada sel B4 Bantuan (Hint) Level 0/3"
  - button "Buka Hint 1 (20 Koin)"
  - button "Kirim & Periksa Jawaban"
```

# Test source

```ts
  18  |     let hasOverflow = await page.evaluate(() => {
  19  |       return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  20  |     });
  21  |     expect(hasOverflow).toBe(false);
  22  | 
  23  |     // Test Windows laptop at 150% DPI (1280x720)
  24  |     await page.setViewportSize({ width: 1024, height: 600 });
  25  |     await page.goto('/?autostart=1&view=office');
  26  |     await page.waitForLoadState('domcontentloaded');
  27  | 
  28  |     hasOverflow = await page.evaluate(() => {
  29  |       return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  30  |     });
  31  |     expect(hasOverflow).toBe(false);
  32  | 
  33  |     expect(errors).toEqual([]);
  34  |   });
  35  | 
  36  |   test('Mobile Device (360x780 Android & 390x844 iPhone): Zero horizontal scroll and touch navigation', async ({ page }) => {
  37  |     const errors: string[] = [];
  38  |     page.on('pageerror', (err) => errors.push(`[PageError]: ${err.message}`));
  39  | 
  40  |     // Budget Android viewport 360x780
  41  |     await page.setViewportSize({ width: 360, height: 780 });
  42  |     await page.goto('/?autostart=1&view=office');
  43  |     await page.waitForLoadState('domcontentloaded');
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
> 118 |     await expect(cmEditor).toBeVisible();
      |                            ^ Error: expect(locator).toBeVisible() failed
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
  144 |     const manifest = await manifestResponse.json();
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