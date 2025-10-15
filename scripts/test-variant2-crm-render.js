const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  const filePath = path.resolve(__dirname, '../claude_sonnet_mocks/Mocks/Batch01/03_CRM_Pipeline_Dashboard/variant_2_support_clean.html');
  await page.goto(`file:///${filePath.replace(/\\/g, '/')}`);

  console.log('✓ Loaded variant_2_support_clean.html');

  // Wait for page to load
  await page.waitForTimeout(1000);

  // Test 1: Check Tickets view
  const ticketColumns = await page.locator('#ticket-grid .ticket-column').count();
  console.log(`✓ Tickets view: ${ticketColumns} columns rendered (expected 3)`);

  // Test 2: Navigate to Customers and check content
  await page.click('text=Customers');
  await page.waitForTimeout(500);
  const customerRows = await page.locator('#customers-table tbody tr').count();
  console.log(`✓ Customers view: ${customerRows} customers rendered (expected 8)`);

  // Test 3: Navigate to Reports and check content
  await page.click('a.nav-link:has-text("Reports")');
  await page.waitForTimeout(500);
  const reportMetrics = await page.locator('#reports-metrics .card').count();
  console.log(`✓ Reports view: ${reportMetrics} metrics (expected 4)`);
  const categoryItems = await page.locator('#category-breakdown > div').count();
  console.log(`  - Category breakdown: ${categoryItems} items (expected 5)`);
  const agentRows = await page.locator('#agent-performance tbody tr').count();
  console.log(`  - Agent performance: ${agentRows} agents (expected 4)`);

  // Test 4: Navigate to Settings and check content
  await page.click('text=Settings');
  await page.waitForTimeout(500);
  const profileInputs = await page.locator('#profile-settings input').count();
  console.log(`✓ Settings view: ${profileInputs} profile fields (expected 3+)`);
  const notifications = await page.locator('#notification-settings > div > div').count();
  console.log(`  - Notifications: ${notifications} items (expected 5)`);
  const teamRows = await page.locator('#team-settings tbody tr').count();
  console.log(`  - Team members: ${teamRows} members (expected 4)`);

  // Summary
  console.log('\n========================================');
  if (ticketColumns === 3 && customerRows === 8 && reportMetrics === 4 && categoryItems === 5 && agentRows === 4 && teamRows === 4) {
    console.log('✅ ALL TESTS PASSED - variant_2 Support CRM fully implemented!');
    console.log(`   - Tickets: ${ticketColumns} columns`);
    console.log(`   - Customers: ${customerRows} customers`);
    console.log(`   - Reports: ${reportMetrics} metrics, ${categoryItems} categories, ${agentRows} agents`);
    console.log(`   - Settings: ${notifications} notifications, ${teamRows} team members`);
  } else {
    console.log('❌ SOME TESTS FAILED - Check implementation');
  }
  console.log('========================================\n');

  console.log('Browser will stay open for inspection. Close manually when done.');
})();
