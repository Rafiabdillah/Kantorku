import { test, expect } from '@playwright/test';

const VIEWS = [
  'office',
  'skills-map',
  'career-map',
  'mission',
  'case-file',
  'learning',
  'dictionary',
  'settings',
  'achievements',
  'portfolio',
  'shop',
  'duel',
  'speed',
  'detective',
  'mentor',
  'zen',
  'exam',
  'errors',
  'daily',
  'about',
];

async function captureOverflow(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const root = document.documentElement;
    const scrollW = root.scrollWidth;
    const offenders: string[] = [];

    const isClippedAncestor = (el: Element): boolean => {
      let p = el.parentElement;
      while (p) {
        const cs = getComputedStyle(p);
        const ox = cs.overflowX;
        const isScroller = ox === 'auto' || ox === 'scroll' || ox === 'hidden' || ox === 'clip';
        if (isScroller && p.clientWidth > 0 && p.scrollWidth > p.clientWidth) return true;
        if (isScroller && p.clientWidth >= p.scrollWidth) return true;
        p = p.parentElement;
      }
      return false;
    };

    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 && r.width > 0 && !isClippedAncestor(el)) {
        const cls = (el.className && el.className.toString ? el.className.toString() : '').slice(0, 90);
        offenders.push(`${el.tagName.toLowerCase()}.${cls} right=${Math.round(r.right)} w=${Math.round(r.width)}`);
      }
    });
    return { scrollW, clientW: vw, offenders: offenders.slice(0, 25) };
  });
}

test.describe('KantorKu Mobile Overflow Diagnostic (390x844)', () => {
  for (const view of VIEWS) {
    test(`view=${view} has no page-level horizontal overflow`, async ({ page }) => {
      page.on('pageerror', (err) => console.log(`[PageError ${view}] ${err.message}`));

      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`/?autostart=1&view=${view}`);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(600);

      const report = await captureOverflow(page);
      console.log(
        `>>> ${view}: scrollWidth=${report.scrollW} clientWidth=${report.clientW} ` +
          `${report.scrollW > report.clientW ? 'OVERFLOW' : 'ok'} offenders=${report.offenders.length}`
      );
      for (const o of report.offenders) console.log(`    ${o}`);

      expect(report.scrollW, `view ${view} overflows`).toBeLessThanOrEqual(report.clientW);
    });
  }
});

test.describe('KantorKu Mobile Overflow Diagnostic (360x800 small phone)', () => {
  for (const view of ['office', 'mission', 'case-file', 'learning', 'career-map', 'settings']) {
    test(`view=${view} (360px) has no page-level horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 800 });
      await page.goto(`/?autostart=1&view=${view}`);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(600);

      const report = await captureOverflow(page);
      console.log(
        `>>> [360] ${view}: scrollWidth=${report.scrollW} clientWidth=${report.clientW} ` +
          `${report.scrollW > report.clientW ? 'OVERFLOW' : 'ok'}`
      );
      for (const o of report.offenders) console.log(`    ${o}`);

      expect(report.scrollW, `view ${view} overflows at 360px`).toBeLessThanOrEqual(report.clientW);
    });
  }
});
