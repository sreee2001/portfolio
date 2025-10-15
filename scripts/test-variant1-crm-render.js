const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  const filePath = path.resolve(__dirname, '../claude_sonnet_mocks/Mocks/Batch01/03_CRM_Pipeline_Dashboard/variant_1_sales_modern.html');
  await page.goto(`file:///${filePath.replace(/\\/g, '/')}`);

  console.log('✓ Loaded variant_1_sales_modern.html');

  // Wait for page to load
  await page.waitForTimeout(1000);

  // Test 1: Check Pipeline view
  const pipelineColumns = await page.locator('#pipeline-board .pipeline-column').count();
  console.log(`✓ Pipeline view: ${pipelineColumns} stages rendered (expected 4)`);

  // Test 2: Navigate to Deals and check content
  await page.click('text=Deals');
  await page.waitForTimeout(500);
  const dealRows = await page.locator('#deals-table tbody tr').count();
  console.log(`✓ Deals view: ${dealRows} deals rendered (expected 8)`);
  
  // Test 3: Navigate to Contacts and check content
  await page.click('text=Contacts');
  await page.waitForTimeout(500);
  const contactCards = await page.locator('#contacts-grid > div > div').count();
  console.log(`✓ Contacts view: ${contactCards} contact cards rendered (expected 8)`);
  const emailIcons = await page.locator('#contacts-grid .fa-envelope').count();
  console.log(`  - Email icons: ${emailIcons}`);
  const phoneIcons = await page.locator('#contacts-grid .fa-phone').count();
  console.log(`  - Phone icons: ${phoneIcons}`);

  // Test 4: Navigate to Reports and check content
  await page.click('text=Reports');
  await page.waitForTimeout(500);
  const summaryMetrics = await page.locator('#reports-summary .card').count();
  console.log(`✓ Reports view: ${summaryMetrics} summary metrics (expected 4)`);
  const performanceRows = await page.locator('#monthly-performance tbody tr').count();
  console.log(`  - Monthly performance rows: ${performanceRows} (expected 4)`);

  // Summary
  console.log('\n========================================');
  if (pipelineColumns === 4 && dealRows === 8 && contactCards === 8 && summaryMetrics === 4 && performanceRows === 4) {
    console.log('✅ ALL TESTS PASSED - variant_1 CRM fully implemented!');
    console.log(`   - Pipeline: ${pipelineColumns} stages`);
    console.log(`   - Deals: ${dealRows} deals`);
    console.log(`   - Contacts: ${contactCards} contacts`);
    console.log(`   - Reports: ${summaryMetrics} metrics + ${performanceRows} months`);
  } else {
    console.log('❌ SOME TESTS FAILED - Check implementation');
  }
  console.log('========================================\n');

  console.log('Browser will stay open for inspection. Close manually when done.');
})();
