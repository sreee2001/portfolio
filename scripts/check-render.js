const fs = require('fs');
const path = require('path');
const playwright = require('playwright');

(async () => {
  const outDir = path.join(__dirname, '..', 'assets', 'tmp');
  try { fs.mkdirSync(outDir, { recursive: true }); } catch (e) {}

  const screenshotPath = path.join(outDir, 'render-check.png');

  // Start a minimal static file server so the script is self-contained
  const http = require('http');
  const url = require('url');
  const root = path.join(__dirname, '..');

  const server = http.createServer((req, res) => {
    const parsed = url.parse(req.url);
    let pathname = decodeURIComponent(parsed.pathname);
    if (pathname === '/') pathname = '/index.html';
    const filePath = path.join(root, pathname.replace(/^\//, ''));
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('Not found');
        return;
      }
      // Basic content-type detection
      const ext = path.extname(filePath).toLowerCase();
      const map = { '.html':'text/html', '.js':'application/javascript', '.css':'text/css', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.svg':'image/svg+xml', '.json':'application/json' };
      res.setHeader('Content-Type', map[ext] || 'application/octet-stream');
      res.end(data);
    });
  });

  const port = 8001;
  await new Promise((resolve, reject) => server.listen(port, err => err ? reject(err) : resolve()));

  const browser = await playwright.chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1200, height: 900 } });
  const page = await context.newPage();

  try {
  await page.goto(`http://localhost:${port}`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    // wait for portfolio grid or a short timeout
    try { await page.waitForSelector('.portfolio-card', { timeout: 8000 }); } catch (e) {
      // no cards found in time
    }

    // allow any client-side rendering to finish
    await page.waitForTimeout(800);

    const cards = await page.$$eval('.portfolio-card', (nodes) => {
      return nodes.map(n => {
        const title = (n.querySelector('.portfolio-title') && n.querySelector('.portfolio-title').textContent || '').trim();
        const img = n.querySelector('img');
        if (!img) return { title, hasImg: false, src: null };
        const style = window.getComputedStyle(img);
        const visible = img.naturalWidth > 0 && style.display !== 'none' && style.visibility !== 'hidden' && img.getAttribute('aria-hidden') !== 'true';
        return { title, hasImg: visible, src: img.getAttribute('src') };
      });
    });

    // capture screenshot of the portfolio grid area if available, otherwise full page
    const gridEl = await page.$('#portfolio-grid');
    if (gridEl) {
      await gridEl.screenshot({ path: screenshotPath });
    } else {
      await page.screenshot({ path: screenshotPath, fullPage: true });
    }

    console.log('RESULTS_JSON_START');
    console.log(JSON.stringify({ screenshot: screenshotPath, cards }, null, 2));
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
