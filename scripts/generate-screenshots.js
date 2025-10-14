const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function generateScreenshots() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    // Set viewport size
    await page.setViewportSize({ width: 1200, height: 800 });
    
    // Find all mock index.html files
    const mockDirs = fs.readdirSync('mocks', { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    
    for (const mockDir of mockDirs) {
        const mockPath = path.join('mocks', mockDir);
        const variants = fs.readdirSync(mockPath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
        
        for (const variant of variants) {
            const indexPath = path.join(mockPath, variant, 'index.html');
            if (fs.existsSync(indexPath)) {
                const url = `file://${path.resolve(indexPath)}`;
                
                try {
                    await page.goto(url, { waitUntil: 'networkidle' });
                    
                    // Create screenshot directory
                    const screenshotDir = path.join('assets', 'screenshots', mockDir);
                    if (!fs.existsSync(screenshotDir)) {
                        fs.mkdirSync(screenshotDir, { recursive: true });
                    }
                    
                    // Take screenshot
                    const screenshotPath = path.join(screenshotDir, `${variant}.png`);
                    await page.screenshot({ 
                        path: screenshotPath, 
                        fullPage: false,
                        clip: { x: 0, y: 0, width: 1200, height: 800 }
                    });
                    
                    console.log(`Generated screenshot: ${screenshotPath}`);
                } catch (error) {
                    console.error(`Error generating screenshot for ${mockDir}/${variant}:`, error);
                }
            }
        }
    }
    
    await browser.close();
}

generateScreenshots().catch(console.error);