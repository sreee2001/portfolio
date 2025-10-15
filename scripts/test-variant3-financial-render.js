const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  const filePath = path.resolve(__dirname, '../claude_sonnet_mocks/Mocks/Batch01/02_Financial_Analytics_Dashboard/variant_3_cfo_executive.html');
  await page.goto(`file:///${filePath.replace(/\\/g, '/')}`);

  console.log('✓ Loaded variant_3_cfo_executive.html');

  // Wait for page to load
  await page.waitForTimeout(1000);

  // Test 1: Check Overview metrics table
  const metricsRows = await page.locator('#metrics-table .metric-row').count();
  console.log(`✓ Overview view: ${metricsRows} metric rows (expected 7 including header)`);

  // Test 2: Navigate to P&L and check content
  await page.click('text=P&L');
  await page.waitForTimeout(500);
  const plRows = await page.locator('#pl-statement .statement-row').count();
  console.log(`✓ P&L view: ${plRows} statement rows rendered`);
  const plRevenue = await page.locator('#pl-statement .statement-row .statement-label:has-text("Product Revenue")').count();
  console.log(`  - Revenue line items: ${plRevenue > 0 ? 'Found' : 'NOT FOUND'}`);
  const plTotal = await page.locator('#pl-statement .statement-row.total:has-text("Total Revenue")').count();
  console.log(`  - Total Revenue row: ${plTotal > 0 ? 'Found' : 'NOT FOUND'}`);

  // Test 3: Navigate to Balance Sheet and check content
  await page.click('text=Balance Sheet');
  await page.waitForTimeout(500);
  const balanceRows = await page.locator('#balance-sheet-container .statement-row').count();
  console.log(`✓ Balance Sheet view: ${balanceRows} statement rows rendered`);
  const assets = await page.locator('#balance-sheet-container .statement-label:has-text("Current Assets")').count();
  console.log(`  - Current Assets section: ${assets > 0 ? 'Found' : 'NOT FOUND'}`);
  const liabilities = await page.locator('#balance-sheet-container .statement-label:has-text("Current Liabilities")').count();
  console.log(`  - Current Liabilities section: ${liabilities > 0 ? 'Found' : 'NOT FOUND'}`);
  const equity = await page.locator('#balance-sheet-container .statement-label:has-text("Shareholders\' Equity")').count();
  console.log(`  - Shareholders Equity section: ${equity > 0 ? 'Found' : 'NOT FOUND'}`);

  // Test 4: Navigate to Cash Flow and check content
  await page.click('text=Cash Flow');
  await page.waitForTimeout(500);
  const cashflowCategories = await page.locator('#cashflow-container .cashflow-category').count();
  console.log(`✓ Cash Flow view: ${cashflowCategories} categories rendered (expected 4)`);
  const operatingActivities = await page.locator('#cashflow-container .cashflow-category-header:has-text("Operating Activities")').count();
  console.log(`  - Operating Activities: ${operatingActivities > 0 ? 'Found' : 'NOT FOUND'}`);
  const investingActivities = await page.locator('#cashflow-container .cashflow-category-header:has-text("Investing Activities")').count();
  console.log(`  - Investing Activities: ${investingActivities > 0 ? 'Found' : 'NOT FOUND'}`);
  const financingActivities = await page.locator('#cashflow-container .cashflow-category-header:has-text("Financing Activities")').count();
  console.log(`  - Financing Activities: ${financingActivities > 0 ? 'Found' : 'NOT FOUND'}`);
  const netCashFlow = await page.locator('#cashflow-container .cashflow-category-header:has-text("Net Cash Flow")').count();
  console.log(`  - Net Cash Flow: ${netCashFlow > 0 ? 'Found' : 'NOT FOUND'}`);

  // Test 5: Navigate to Forecasting and check content
  await page.click('text=Forecasting');
  await page.waitForTimeout(500);
  const forecastCards = await page.locator('#forecast-container .forecast-card').count();
  console.log(`✓ Forecasting view: ${forecastCards} forecast cards (expected 4)`);
  const q1Forecast = await page.locator('#forecast-container .forecast-header:has-text("Q1 2026")').count();
  console.log(`  - Q1 2026 forecast: ${q1Forecast > 0 ? 'Found' : 'NOT FOUND'}`);
  const q4Forecast = await page.locator('#forecast-container .forecast-header:has-text("Q4 2026")').count();
  console.log(`  - Q4 2026 forecast: ${q4Forecast > 0 ? 'Found' : 'NOT FOUND'}`);
  const confidenceIndicators = await page.locator('#forecast-container .forecast-confidence').count();
  console.log(`  - Confidence indicators: ${confidenceIndicators}`);

  // Summary
  console.log('\n========================================');
  if (metricsRows >= 7 && plRows > 10 && balanceRows > 20 && cashflowCategories === 4 && forecastCards === 4) {
    console.log('✅ ALL TESTS PASSED - variant_3 fully implemented!');
    console.log(`   - Overview: ${metricsRows} metrics`);
    console.log(`   - P&L: ${plRows} line items`);
    console.log(`   - Balance Sheet: ${balanceRows} line items`);
    console.log(`   - Cash Flow: ${cashflowCategories} categories`);
    console.log(`   - Forecasting: ${forecastCards} quarterly forecasts`);
  } else {
    console.log('❌ SOME TESTS FAILED - Check implementation');
  }
  console.log('========================================\n');

  // Keep browser open for inspection
  console.log('Browser will stay open for inspection. Close manually when done.');
  // await browser.close();
})();
