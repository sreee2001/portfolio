const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function generatePersonalBiographyScreenshots() {
    console.log('Generating personal-biography screenshots...');
    
    let browser;
    try {
        browser = await chromium.launch({ 
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        
        // Set viewport size for consistent screenshots
        await page.setViewportSize({ width: 1200, height: 800 });
        
        const projects = [
            {
                variant: 'bio',
                filename: 'personal_biography.html', 
                screenshotName: 'personal_biography'
            },
            {
                variant: 'portfolio',
                filename: 'personal_portfolio.html',
                screenshotName: 'personal_portfolio'
            },
            {
                variant: 'freelance', 
                filename: 'freelance_services.html',
                screenshotName: 'freelance_services'
            }
        ];
        
        // Create screenshot directory
        const screenshotDir = 'assets/screenshots/personal-biography';
        if (!fs.existsSync(screenshotDir)) {
            fs.mkdirSync(screenshotDir, { recursive: true });
        }
        
        for (const project of projects) {
            const filePath = `mocks/personal-biography/${project.variant}/${project.filename}`;
            
            if (fs.existsSync(filePath)) {
                try {
                    // Use file:// URL since we're only doing a few files
                    const url = `file://${path.resolve(filePath)}`;
                    
                    console.log(`Taking screenshot: ${project.variant} -> ${project.screenshotName}.png`);
                    
                    await page.goto(url, { 
                        waitUntil: 'networkidle',
                        timeout: 10000
                    });
                    
                    // Wait for page to be fully rendered
                    await page.waitForTimeout(2000);
                    
                    // Take screenshot
                    const screenshotPath = path.join(screenshotDir, `${project.screenshotName}.png`);
                    await page.screenshot({ 
                        path: screenshotPath, 
                        fullPage: false,
                        clip: { x: 0, y: 0, width: 1200, height: 800 }
                    });
                    
                    console.log(`✓ Generated: ${screenshotPath}`);
                    
                } catch (error) {
                    console.error(`✗ Error generating screenshot for ${project.variant}:`, error.message);
                }
            } else {
                console.log(`- File not found: ${filePath}`);
            }
        }
        
    } catch (error) {
        console.error('Fatal error:', error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

generatePersonalBiographyScreenshots().catch(console.error);