const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE:', msg.text()));
  await page.goto('http://localhost:8000/', { waitUntil: 'networkidle' });

  const selectors = ['.nav-link[href="#about"]', '.nav-link[href="#portfolio"]', '.nav-link[href="#contact"]'];
  const results = [];

  for (const sel of selectors) {
    const exists = await page.$(sel) !== null;
    if (!exists) {
      results.push({ selector: sel, error: 'not found' });
      continue;
    }
    const box = await page.$eval(sel, el => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width/2, y: r.top + r.height/2, left: r.left, top: r.top, width: r.width, height: r.height };
    });
    const hit = await page.evaluate(({x,y}) => {
      const el = document.elementFromPoint(x, y);
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        id: el.id || null,
        class: el.className || null,
        pointerEvents: cs.pointerEvents,
        zIndex: cs.zIndex,
        outerHTML: el.outerHTML.slice(0,200)
      };
    }, { x: Math.round(box.x), y: Math.round(box.y) });
    results.push({ selector: sel, box, hit });
  }

  console.log('HIT TEST RESULTS:\n', JSON.stringify(results, null, 2));
  await browser.close();
})();