const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const messages = [];
  page.on('console', msg => messages.push({ type: msg.type(), text: msg.text() }));
  page.on('pageerror', err => messages.push({ type: 'pageerror', text: err.message }));
  try {
    await page.goto('http://localhost:8000', { waitUntil: 'networkidle' });
    // give scripts a moment
    await page.waitForTimeout(500);
    const exists = await page.$('#skills-card-grid');
    const content = exists ? await page.$eval('#skills-card-grid', el => el.innerHTML) : null;
    console.log('SKILLGRID_HTML_START');
    console.log(content);
    console.log('SKILLGRID_HTML_END');
    console.log('CONSOLE_MESSAGES_START');
    console.log(JSON.stringify(messages, null, 2));
    console.log('CONSOLE_MESSAGES_END');
  } catch (e) {
    console.error('ERR', e.stack || e.message);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();