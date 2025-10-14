const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE:', msg.text()));
  await page.goto('http://localhost:8000/', { waitUntil: 'networkidle' });

  const navIds = ['#about', '#portfolio', '#contact'];
  const results = [];

  for (const id of navIds) {
    // Click the nav link
    const selector = `.nav-link[href="${id}"]`;
    console.log('Clicking', selector);
    await page.click(selector);
    // Wait a bit for smooth scroll to happen
    await page.waitForTimeout(800);
    // Evaluate scroll position relative to document
    const rect = await page.$eval(id, el => {
      const r = el.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height };
    });
    // Also capture window.scrollY
    const scrollY = await page.evaluate(() => window.scrollY || window.pageYOffset);
    results.push({ id, rect, scrollY });
    console.log('Result for', id, rect, 'scrollY=', scrollY);
  }

  console.log('NAV TEST RESULTS:\n', JSON.stringify(results, null, 2));

  await browser.close();
})();