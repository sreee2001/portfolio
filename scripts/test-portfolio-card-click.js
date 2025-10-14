const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on('console', msg => console.log('PAGE:', msg.text()));
  await page.goto('http://localhost:8000/', { waitUntil: 'networkidle' });

  // Wait for portfolio cards to render
  await page.waitForSelector('.portfolio-card');
  const first = await page.$('.portfolio-card');
  if (!first) { console.error('No portfolio card found'); await browser.close(); process.exit(1); }

  // Prepare to catch a new page
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    first.click()
  ]);

  await newPage.waitForLoadState('load');
  console.log('New page URL:', newPage.url());
  await browser.close();
})();