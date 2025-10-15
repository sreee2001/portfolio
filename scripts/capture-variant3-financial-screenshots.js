const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  const filePath = path.resolve(__dirname, '../claude_sonnet_mocks/Mocks/Batch01/02_Financial_Analytics_Dashboard/variant_3_cfo_executive.html');
  await page.goto(`file:///${filePath.replace(/\\/g, '/')}`);

  console.log('Capturing screenshots for variant_3_cfo_executive.html...');

  const screenshotDir = path.resolve(__dirname, '../assets/screenshots/02_Financial_Analytics_Dashboard');

  // Wait for page to load
  await page.waitForTimeout(1000);

  // Capture Overview
  await page.screenshot({ 
    path: `${screenshotDir}/variant_3_cfo_executive_overview.png`,
    fullPage: true 
  });
  console.log('✓ Captured: variant_3_cfo_executive_overview.png');

  // Capture P&L
  await page.click('text=P&L');
  await page.waitForTimeout(500);
  await page.screenshot({ 
    path: `${screenshotDir}/variant_3_cfo_executive_pl.png`,
    fullPage: true 
  });
  console.log('✓ Captured: variant_3_cfo_executive_pl.png');

  // Capture Balance Sheet
  await page.click('text=Balance Sheet');
  await page.waitForTimeout(500);
  await page.screenshot({ 
    path: `${screenshotDir}/variant_3_cfo_executive_balance.png`,
    fullPage: true 
  });
  console.log('✓ Captured: variant_3_cfo_executive_balance.png');

  // Capture Cash Flow
  await page.click('text=Cash Flow');
  await page.waitForTimeout(500);
  await page.screenshot({ 
    path: `${screenshotDir}/variant_3_cfo_executive_cashflow.png`,
    fullPage: true 
  });
  console.log('✓ Captured: variant_3_cfo_executive_cashflow.png');

  // Capture Forecasting
  await page.click('text=Forecasting');
  await page.waitForTimeout(500);
  await page.screenshot({ 
    path: `${screenshotDir}/variant_3_cfo_executive_forecasting.png`,
    fullPage: true 
  });
  console.log('✓ Captured: variant_3_cfo_executive_forecasting.png');

  console.log('\n✅ All screenshots captured successfully!');
  await browser.close();
})();
