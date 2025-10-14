const { chromium } = require('playwright');
(async ()=>{
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8000', { waitUntil: 'networkidle' });
  await page.waitForSelector('#about-cards-carousel');
  await page.waitForSelector('#skills-cards-carousel');
  const selA = await page.$eval('#about-cards-carousel', el => el.classList.contains('cards-carousel') ? '#about-cards-carousel' : '#about-cards-carousel .cards-carousel');
  const selS = await page.$eval('#skills-cards-carousel', el => el.classList.contains('cards-carousel') ? '#skills-cards-carousel' : '#skills-cards-carousel .cards-carousel');
  const info = await page.evaluate(({a,b})=>{
    const A = document.querySelector(a);
    const S = document.querySelector(b);
    return {
      about: { scrollLeft: A.scrollLeft, scrollWidth: A.scrollWidth, clientWidth: A.clientWidth },
      skills: { scrollLeft: S.scrollLeft, scrollWidth: S.scrollWidth, clientWidth: S.clientWidth }
    };
  }, { a: selA, b: selS });
  console.log(info);
  await browser.close();
})();
