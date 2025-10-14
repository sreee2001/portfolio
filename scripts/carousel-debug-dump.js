const { chromium } = require('playwright');
(async ()=>{
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8000', { waitUntil: 'networkidle' });
  await page.waitForSelector('#about-cards-carousel');
  await page.waitForSelector('#skills-cards-carousel');
  const selA = await page.$eval('#about-cards-carousel', el => el.classList.contains('cards-carousel') ? '#about-cards-carousel' : '#about-cards-carousel .cards-carousel');
  const selS = await page.$eval('#skills-cards-carousel', el => el.classList.contains('cards-carousel') ? '#skills-cards-carousel' : '#skills-cards-carousel .cards-carousel');
  const dump = await page.evaluate(({a,b})=>{
    const A = document.querySelector(a);
    const S = document.querySelector(b);
    function info(el){
      const cs = window.getComputedStyle(el);
      return {
        outerHTML: el.outerHTML.substring(0,1000),
        display: cs.display,
        overflowX: cs.overflowX,
        scrollSnapType: cs.scrollSnapType || cs['-webkit-overflow-scrolling'],
        clientWidth: el.clientWidth,
        scrollWidth: el.scrollWidth,
        scrollLeft: el.scrollLeft,
        rect: el.getBoundingClientRect(),
        pointerEvents: cs.pointerEvents
      };
    }
    return { about: info(A), skills: info(S) };
  }, { a: selA, b: selS });
  console.log(JSON.stringify(dump, null, 2));
  await browser.close();
})();