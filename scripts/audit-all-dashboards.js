const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const dashboards = [
  {
    folder: '01_Project_Management_Dashboard',
    files: [
      'variant_1_startup_bright.html',
      'variant_2_enterprise_dark.html',
      'variant_3_agency_minimal.html'
    ]
  },
  {
    folder: '02_Financial_Analytics_Dashboard',
    files: [
      'variant_1_freelancer_colorful.html',
      'variant_2_smb_professional.html',
      'variant_3_cfo_executive.html'
    ]
  },
  {
    folder: '03_CRM_Pipeline_Dashboard',
    files: [
      'variant_1_sales_modern.html',
      'variant_2_support_clean.html',
      'variant_3_marketing_vibrant.html'
    ]
  }
];

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  console.log('\n' + '='.repeat(80));
  console.log('COMPREHENSIVE DASHBOARD FILES AUDIT');
  console.log('='.repeat(80) + '\n');

  let allPassed = true;
  const results = [];

  for (const dashboard of dashboards) {
    console.log(`\n📁 ${dashboard.folder}`);
    console.log('-'.repeat(80));

    for (const file of dashboard.files) {
      const filePath = path.resolve(__dirname, `../claude_sonnet_mocks/Mocks/Batch01/${dashboard.folder}/${file}`);
      
      if (!fs.existsSync(filePath)) {
        console.log(`\n  ❌ ${file} - FILE NOT FOUND`);
        results.push({ dashboard: dashboard.folder, file, status: 'MISSING' });
        allPassed = false;
        continue;
      }

      try {
        const page = await context.newPage();
        await page.goto(`file:///${filePath.replace(/\\/g, '/')}`);
        await page.waitForTimeout(1000);

        // Check for JavaScript errors
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        page.on('console', msg => {
          if (msg.type() === 'error') errors.push(msg.text());
        });

        // Count views
        const views = await page.locator('[id$="-view"]').count();
        
        // Check if buttons exist
        const buttons = await page.locator('button, .btn').count();
        
        // Check for render functions
        const content = fs.readFileSync(filePath, 'utf8');
        const renderFuncs = (content.match(/function render\w+/g) || []).length;
        const showViewFunc = content.includes('function showView');

        const status = {
          file,
          views,
          buttons,
          renderFuncs,
          hasShowView: showViewFunc,
          errors: errors.length
        };

        if (views > 0 && showViewFunc && errors.length === 0) {
          console.log(`\n  ✅ ${file}`);
          console.log(`     Views: ${views} | Buttons: ${buttons} | Render funcs: ${renderFuncs}`);
          results.push({ dashboard: dashboard.folder, file, status: 'PASS', details: status });
        } else {
          console.log(`\n  ⚠️  ${file}`);
          console.log(`     Views: ${views} | Buttons: ${buttons} | Render funcs: ${renderFuncs}`);
          if (!showViewFunc) console.log(`     ⚠️  Missing showView() function`);
          if (errors.length > 0) console.log(`     ⚠️  ${errors.length} JavaScript errors`);
          results.push({ dashboard: dashboard.folder, file, status: 'WARN', details: status });
          allPassed = false;
        }

        await page.close();

      } catch (error) {
        console.log(`\n  ❌ ${file} - ERROR: ${error.message}`);
        results.push({ dashboard: dashboard.folder, file, status: 'ERROR', error: error.message });
        allPassed = false;
      }
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('AUDIT SUMMARY');
  console.log('='.repeat(80));
  
  const passed = results.filter(r => r.status === 'PASS').length;
  const warned = results.filter(r => r.status === 'WARN').length;
  const failed = results.filter(r => r.status === 'ERROR' || r.status === 'MISSING').length;
  const total = results.length;

  console.log(`\n  ✅ Passed: ${passed}/${total}`);
  console.log(`  ⚠️  Warnings: ${warned}/${total}`);
  console.log(`  ❌ Failed: ${failed}/${total}`);
  
  if (allPassed) {
    console.log(`\n  🎉 ALL DASHBOARD FILES ARE WORKING!\n`);
  } else {
    console.log(`\n  ⚠️  Some files need attention.\n`);
  }

  await browser.close();
})();
