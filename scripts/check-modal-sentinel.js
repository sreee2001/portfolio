const fs = require('fs');
const path = require('path');
const playwright = require('playwright');

(async () => {
  const outDir = path.join(__dirname, '..', 'assets', 'tmp');
  try { fs.mkdirSync(outDir, { recursive: true }); } catch (e) {}
  const screenshotPath = path.join(outDir, 'modal-check-sentinel.png');

  // Start a quick static server
  const http = require('http');
  const url = require('url');
  const root = path.join(__dirname, '..');
  const server = http.createServer((req, res) => {
    const parsed = url.parse(req.url);
    let pathname = decodeURIComponent(parsed.pathname);
    if (pathname === '/') pathname = '/index.html';
    const filePath = path.join(root, pathname.replace(/^\//, ''));
    fs.readFile(filePath, (err, data) => {
      if (err) { res.statusCode = 404; res.end('Not found'); return; }
      const ext = path.extname(filePath).toLowerCase();
      const map = { '.html':'text/html', '.js':'application/javascript', '.css':'text/css', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.svg':'image/svg+xml', '.json':'application/json' };
      res.setHeader('Content-Type', map[ext] || 'application/octet-stream');
      res.end(data);
    });
  });
  const port = 8003;
  await new Promise((resolve, reject) => server.listen(port, err => err ? reject(err) : resolve()));

  const browser = await playwright.chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await context.newPage();

  try {
    await page.goto(`http://localhost:${port}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForSelector('.portfolio-card', { timeout: 10000 });

    // Find the card with the SentinelBridge angel pitch title and click it
    const found = await page.$$eval('.portfolio-card', (cards) => {
      for (const c of cards) {
        const title = c.querySelector('.portfolio-title')?.textContent?.trim() || '';
        if (title.includes('SentinelBridge') && title.includes('Angel')) {
          c.scrollIntoView();
          const rect = c.getBoundingClientRect();
          return { index: Array.from(c.parentElement.children).indexOf(c), title };
        }
      }
      return null;
    });

    if (!found) {
      throw new Error('SentinelBridge angel card not found');
    }

    // Click the matching card via nth-child
    await page.click(`.portfolio-card:nth-child(${found.index + 1})`);

    await page.waitForSelector('#project-modal[aria-hidden="false"]', { timeout: 7000 });
    await page.waitForTimeout(300);

    const modalData = await page.$eval('#project-modal', modal => {
      const title = modal.querySelector('.modal-title')?.textContent || '';
      const desc = modal.querySelector('.modal-description')?.textContent || '';
      const challenge = modal.querySelector('.modal-challenge')?.textContent || '';
      const approach = modal.querySelector('.modal-approach')?.textContent || '';
      const outcome = modal.querySelector('.modal-outcome')?.textContent || '';
      const img = modal.querySelector('.modal-body-img');
      const src = img ? img.getAttribute('src') : null;
      return { title, desc, challenge, approach, outcome, src };
    });

    await page.screenshot({ path: screenshotPath, fullPage: false });

    console.log('RESULTS_JSON_START');
    console.log(JSON.stringify({ screenshot: screenshotPath, modalData }, null, 2));
    console.log('RESULTS_JSON_END');

    await browser.close();
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('ERROR:', err && err.message ? err.message : err);
    try { await browser.close(); } catch (e) {}
    try { server.close(); } catch (e) {}
    process.exit(2);
  }
})();
