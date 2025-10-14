const { chromium } = require('playwright');
(async ()=>{
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', m => console.log('PAGE:', m.text()));
  try {
    await page.goto('http://localhost:8000', { waitUntil: 'networkidle' });
    // wait for carousels to initialize
    await page.waitForSelector('#about-cards-carousel');
    await page.waitForSelector('#skills-cards-carousel');

  // choose the actual scrolling element: either the element itself or its .cards-carousel child
  const aboutScrollSel = await page.$eval('#about-cards-carousel', el => el.classList.contains('cards-carousel') ? '#about-cards-carousel' : '#about-cards-carousel .cards-carousel');
  const skillsScrollSel = await page.$eval('#skills-cards-carousel', el => el.classList.contains('cards-carousel') ? '#skills-cards-carousel' : '#skills-cards-carousel .cards-carousel');

    console.log('Sampling scrollLeft for 5 seconds (every 500ms)');
    for (let i=0;i<10;i++){
  const aboutScroll = await page.$eval(aboutScrollSel, el => el.scrollLeft);
  const skillsScroll = await page.$eval(skillsScrollSel, el => el.scrollLeft);
      console.log(`t=${i*500}ms about=${aboutScroll.toFixed(2)} skills=${skillsScroll.toFixed(2)}`);
      await page.waitForTimeout(500);
    }

    // Also dump computed styles relevant to pointer-events and overflow
    const aboutStyles = await page.$eval('#about-cards-carousel', el => window.getComputedStyle(el).cssText);
    const skillsStyles = await page.$eval('#skills-cards-carousel', el => window.getComputedStyle(el).cssText);
    console.log('ABOUT CSS:', aboutStyles);
    console.log('SKILLS CSS:', skillsStyles);
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();