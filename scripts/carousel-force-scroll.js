const { chromium } = require('playwright');
(async ()=>{
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('http://localhost:8000', { waitUntil: 'networkidle' });
  await p.waitForSelector('#about-cards-carousel');
  const sel = '#about-cards-carousel';
  const before = await p.$eval(sel, el => ({ sl: el.scrollLeft }));
  console.log('before', before);
  await p.evaluate(() => {
    const el = document.querySelector('#about-cards-carousel');
    el.scrollLeft = el.scrollLeft + 200;
    // also try scrollBy
    el.scrollBy(200,0);
  });
  // wait a moment
  await p.waitForTimeout(200);
  const after = await p.$eval(sel, el => ({ sl: el.scrollLeft }));
  console.log('after', after);
  await b.close();
})();