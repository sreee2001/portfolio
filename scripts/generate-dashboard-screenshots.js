const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Function to start a local HTTP server
function startServer(port = 3003) {
    return new Promise((resolve, reject) => {
        const server = spawn('python', ['-m', 'http.server', port.toString()], {
            cwd: process.cwd(),
            stdio: 'pipe',
            shell: true
        });
        
        server.stdout.on('data', (data) => {
            console.log('Server output:', data.toString());
        });
        
        server.stderr.on('data', (data) => {
            console.log('Server stderr:', data.toString());
        });
        
        server.on('error', (error) => {
            console.error('Server spawn error:', error);
        });
        
        // Give server time to start
        console.log(`Starting server on port ${port}...`);
        setTimeout(() => {
            console.log(`Server should be running on http://localhost:${port}`);
            resolve(server);
        }, 3000);
    });
}

async function generateDashboardScreenshots() {
    console.log('Starting dashboard screenshot generation...');
    
    // Start local server to avoid CORS issues
    const server = await startServer(3003);
    
    let browser;
    try {
        browser = await chromium.launch({ 
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        
        // Set viewport size for consistent screenshots
        await page.setViewportSize({ width: 1200, height: 800 });
        
        // Set longer timeout for slow loading pages
        page.setDefaultTimeout(30000);
        
        // Only process the 3 new dashboard directories
        const dashboardDirs = [
            '08_Project_Management_Dashboard',
            '09_Financial_Analytics_Dashboard',
            '10_CRM_Pipeline_Dashboard'
        ];
        
        console.log(`Processing ${dashboardDirs.length} dashboard directories\n`);
        
        let successCount = 0;
        let errorCount = 0;
        
        for (const mockDir of dashboardDirs) {
            console.log(`Processing ${mockDir}...`);
            const mockPath = path.join('mocks', mockDir);
            
            if (!fs.existsSync(mockPath)) {
                console.log(`  Directory ${mockPath} does not exist, skipping`);
                continue;
            }
            
            // Get all variant subdirectories
            const variants = fs.readdirSync(mockPath, { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name);
            
            console.log(`  Found ${variants.length} variants: ${variants.join(', ')}`);
            
            for (const variant of variants) {
                const indexPath = path.join(mockPath, variant, 'index.html');
                
                if (fs.existsSync(indexPath)) {
                    const url = `http://localhost:3003/${mockPath}/${variant}/index.html`;
                    
                    try {
                        console.log(`    Taking screenshot: ${variant}`);
                        
                        await page.goto(url, { 
                            waitUntil: 'networkidle',
                            timeout: 15000
                        });
                        
                        // Wait for page to be fully rendered
                        await page.waitForTimeout(2000);
                        
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
                        
                        console.log(`    ✓ Generated: ${screenshotPath}`);
                        successCount++;
                        
                    } catch (error) {
                        console.error(`    ✗ Error generating screenshot for ${mockDir}/${variant}:`, error.message);
                        errorCount++;
                    }
                } else {
                    console.log(`    - No index.html found in ${variant}`);
                }
            }
            console.log(''); // Empty line between directories
        }
        
        console.log(`=== Dashboard Screenshot Generation Complete ===`);
        console.log(`✓ Successful: ${successCount}`);
        console.log(`✗ Errors: ${errorCount}`);
        
    } catch (error) {
        console.error('Fatal error during screenshot generation:', error);
    } finally {
        // Clean up
        if (browser) {
            await browser.close();
        }
        if (server) {
            server.kill();
            console.log('Server stopped');
        }
    }
}

generateDashboardScreenshots().catch(console.error);
