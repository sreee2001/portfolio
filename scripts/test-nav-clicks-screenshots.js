const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1200, height: 900 } });
  const page = await context.newPage();
  page.on('console', msg => console.log('PAGE:', msg.text()));
  await page.goto('http://localhost:8000/', { waitUntil: 'networkidle' });

  const navIds = ['#about', '#portfolio', '#contact'];
  const outDir = path.join(process.cwd(), 'assets', 'screenshots', 'nav-tests');
  const fs = require('fs');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const id of navIds) {
    const selector = `.nav-link[href="${id}"]`;
    console.log('Clicking', selector);
    try {
      await page.click(selector);
    } catch (e) {
      console.log('Click failed, trying JS dispatch', e.message);
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (el) el.click();
      }, selector);
    }
    // wait for smooth scroll to settle
    await page.waitForTimeout(900);
    const file = path.join(outDir, id.replace('#','') + '.png');
    await page.screenshot({ path: file, fullPage: true });
    const scrollY = await page.evaluate(() => window.scrollY || window.pageYOffset);
    console.log('Saved', file, 'scrollY=', scrollY);
  }

  console.log('Finished nav screenshot test. Files saved to', outDir);
  await browser.close();
})();