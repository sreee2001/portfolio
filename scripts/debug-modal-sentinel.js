const fs = require('fs');
const path = require('path');
const playwright = require('playwright');

(async () => {
  const outDir = path.join(__dirname, '..', 'assets', 'tmp');
  try { fs.mkdirSync(outDir, { recursive: true }); } catch (e) {}
  const screenshotPath = path.join(outDir, 'debug-modal-check-sentinel.png');

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

  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await context.newPage();

  page.on('console', msg => console.log('PAGE_LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE_ERROR:', err.message));

  try {
    await page.goto(`http://localhost:${port}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForSelector('.portfolio-card', { timeout: 20000 });

    const found = await page.$$eval('.portfolio-card', (cards) => {
      for (const c of cards) {
        const title = c.querySelector('.portfolio-title')?.textContent?.trim() || '';
        if (title.includes('SentinelBridge') && title.includes('Angel')) {
          c.scrollIntoView();
          return { index: Array.from(c.parentElement.children).indexOf(c), title };
        }
      }
      return null;
    });

    if (!found) {
      throw new Error('SentinelBridge angel card not found');
    }

    console.log('Found card:', found);
    await page.click(`.portfolio-card:nth-child(${found.index + 1})`);
    await page.waitForTimeout(800);

    const modalState = await page.$eval('#project-modal', modal => ({ aria: modal.getAttribute('aria-hidden'), innerHTML: modal.innerHTML.slice(0,2000) }));
    console.log('MODAL_STATE:', modalState.aria);
    console.log('MODAL_HTML_SNIPPET:', modalState.innerHTML);

    await page.screenshot({ path: screenshotPath, fullPage: false });

    console.log('DEBUG_RESULTS_JSON_START');
    console.log(JSON.stringify({ screenshot: screenshotPath, modalState }, null, 2));
    console.log('DEBUG_RESULTS_JSON_END');

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
