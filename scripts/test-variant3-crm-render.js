const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  const filePath = path.resolve(__dirname, '../claude_sonnet_mocks/Mocks/Batch01/03_CRM_Pipeline_Dashboard/variant_3_marketing_vibrant.html');
  await page.goto(`file:///${filePath.replace(/\\/g, '/')}`);

  console.log('\n=== Testing variant_3_marketing_vibrant.html ===\n');

  // Test 1: Campaigns View (default)
  console.log('Test 1: Campaigns View');
  await page.waitForTimeout(500);
  
  const campaignCards = await page.locator('.campaign-card').count();
  console.log(`  ✓ Campaign cards: ${campaignCards} (expected: 6)`);
  
  const topCampaigns = await page.locator('.top-campaign-item').count();
  console.log(`  ✓ Top campaigns: ${topCampaigns} (expected: 4)`);
  
  await page.screenshot({ 
    path: path.resolve(__dirname, '../assets/screenshots/nav-tests/variant3-marketing-campaigns.png'),
    fullPage: true 
  });

  // Test 2: Analytics View
  console.log('\nTest 2: Analytics View');
  await page.click('text=Analytics');
  await page.waitForTimeout(500);
  
  const analyticsMetrics = await page.locator('#analytics-overview .stat-card').count();
  console.log(`  ✓ Analytics metrics: ${analyticsMetrics} (expected: 4)`);
  
  const channelRows = await page.locator('#channel-performance tbody tr').count();
  console.log(`  ✓ Channel performance rows: ${channelRows} (expected: 3)`);
  
  const monthlyRows = await page.locator('#monthly-trend tbody tr').count();
  console.log(`  ✓ Monthly trend rows: ${monthlyRows} (expected: 4)`);
  
  await page.screenshot({ 
    path: path.resolve(__dirname, '../assets/screenshots/nav-tests/variant3-marketing-analytics.png'),
    fullPage: true 
  });

  // Test 3: Audience View
  console.log('\nTest 3: Audience View');
  await page.click('text=Audience');
  await page.waitForTimeout(500);
  
  const segments = await page.locator('#audience-segments > div > div').count();
  console.log(`  ✓ Audience segments: ${segments} (expected: 5)`);
  
  const demographics = await page.locator('#demographics-breakdown > div > div').count();
  console.log(`  ✓ Demographics bars: ${demographics} (expected: 5)`);
  
  const locations = await page.locator('#location-breakdown tbody tr').count();
  console.log(`  ✓ Location rows: ${locations} (expected: 6)`);
  
  await page.screenshot({ 
    path: path.resolve(__dirname, '../assets/screenshots/nav-tests/variant3-marketing-audience.png'),
    fullPage: true 
  });

  // Test 4: Content View
  console.log('\nTest 4: Content View');
  await page.click('text=Content');
  await page.waitForTimeout(500);
  
  const contentItems = await page.locator('#content-library tbody tr').count();
  console.log(`  ✓ Content library items: ${contentItems} (expected: 8)`);
  
  await page.screenshot({ 
    path: path.resolve(__dirname, '../assets/screenshots/nav-tests/variant3-marketing-content.png'),
    fullPage: true 
  });

  // Summary
  console.log('\n=== Test Summary ===');
  const allTestsPassed = 
    campaignCards === 6 &&
    topCampaigns === 4 &&
    analyticsMetrics === 4 &&
    channelRows === 3 &&
    monthlyRows === 4 &&
    segments === 5 &&
    demographics === 5 &&
    locations === 6 &&
    contentItems === 8;

  if (allTestsPassed) {
    console.log('✅ ALL TESTS PASSED');
  } else {
    console.log('❌ SOME TESTS FAILED - Check counts above');
  }

  console.log('\n📸 Screenshots saved to assets/screenshots/nav-tests/');
  console.log('   - variant3-marketing-campaigns.png');
  console.log('   - variant3-marketing-analytics.png');
  console.log('   - variant3-marketing-audience.png');
  console.log('   - variant3-marketing-content.png');

  await page.waitForTimeout(2000);
  await browser.close();
})();
