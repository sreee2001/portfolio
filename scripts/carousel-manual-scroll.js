const { chromium } = require('playwright');
(async ()=>{
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8000', { waitUntil: 'networkidle' });
  await page.waitForSelector('#about-cards-carousel');
  const before = await page.$eval('#about-cards-carousel', el => ({ sl: el.scrollLeft, sw: el.scrollWidth, cw: el.clientWidth }));
  console.log('before', before);
  await page.evaluate(() => { const el = document.querySelector('#about-cards-carousel'); el.scrollLeft += 120; });
  const after = await page.$eval('#about-cards-carousel', el => ({ sl: el.scrollLeft, sw: el.scrollWidth, cw: el.clientWidth }));
  console.log('after', after);
  await browser.close();
})();
