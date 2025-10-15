const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Function to start a local HTTP server
function startServer(port = 3002) {
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

async function generateScreenshots() {
    console.log('Starting screenshot generation...');
    
        // Start local server to avoid CORS issues
        const server = await startServer(3002);    let browser;
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
        
        // Find all mock directories
        const mockDirs = fs.readdirSync('mocks', { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
            .filter(name => !name.startsWith('_')); // Skip template directories
        
        console.log(`Found ${mockDirs.length} mock directories`);
        
        let successCount = 0;
        let errorCount = 0;
        
        for (const mockDir of mockDirs) {
            console.log(`\nProcessing ${mockDir}...`);
            const mockPath = path.join('mocks', mockDir);
            
            if (!fs.existsSync(mockPath)) {
                console.log(`  Directory ${mockPath} does not exist, skipping`);
                continue;
            }
            
            let variants;
            
            // Handle sentinelbridge directory differently (HTML files, not subdirectories)
            if (mockDir === 'sentinelbridge') {
                variants = fs.readdirSync(mockPath, { withFileTypes: true })
                    .filter(dirent => dirent.isFile() && dirent.name.endsWith('.html'))
                    .map(dirent => dirent.name.replace('.html', ''));
            } else {
                variants = fs.readdirSync(mockPath, { withFileTypes: true })
                    .filter(dirent => dirent.isDirectory())
                    .map(dirent => dirent.name);
            }
            
            console.log(`  Found ${variants.length} variants: ${variants.join(', ')}`);
            
            for (const variant of variants) {
                let indexPath = path.join(mockPath, variant, 'index.html');
                let htmlFileName = 'index.html';
                
                // Check for index.html first
                if (!fs.existsSync(indexPath)) {
                    // For personal-biography, check for specific HTML files
                    if (mockDir === 'personal-biography') {
                        const specificFiles = {
                            'bio': 'personal_biography.html',
                            'portfolio': 'personal_portfolio.html',
                            'freelance': 'freelance_services.html'
                        };
                        
                        if (specificFiles[variant]) {
                            indexPath = path.join(mockPath, variant, specificFiles[variant]);
                            htmlFileName = specificFiles[variant];
                        }
                    }
                    
                    // For sentinelbridge, files are directly in the variant directory
                    if (mockDir === 'sentinelbridge') {
                        indexPath = path.join(mockPath, `${variant}.html`);
                        htmlFileName = `${variant}.html`;
                    }
                    
                    // For dashboards (08, 09, 10), check for variant-named HTML files
                    const variantHtmlPath = path.join(mockPath, variant, `${variant}.html`);
                    if (fs.existsSync(variantHtmlPath)) {
                        indexPath = variantHtmlPath;
                        htmlFileName = `${variant}.html`;
                    }
                }
                
                if (fs.existsSync(indexPath)) {
                    // Use HTTP URL instead of file:// to avoid CORS
                    let url;
                    if (mockDir === 'sentinelbridge') {
                        url = `http://localhost:3002/${mockPath}/${variant}.html`;
                    } else {
                        url = `http://localhost:3002/${mockPath}/${variant}/${htmlFileName}`;
                    }
                    
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
                        
                        // Take screenshot - use proper naming convention
                        let screenshotName = variant;
                        
                        // Map variant names to expected screenshot names for personal-biography
                        if (mockDir === 'personal-biography') {
                            const nameMapping = {
                                'bio': 'personal_biography',
                                'portfolio': 'personal_portfolio', 
                                'freelance': 'freelance_services'
                            };
                            screenshotName = nameMapping[variant] || variant;
                        }
                        
                        const screenshotPath = path.join(screenshotDir, `${screenshotName}.png`);
                        await page.screenshot({ 
                            path: screenshotPath, 
                            fullPage: false,
                            clip: { x: 0, y: 0, width: 1200, height: 800 }
                            // Note: quality option not supported for PNG
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
        }
        
        console.log(`\n=== Screenshot Generation Complete ===`);
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

generateScreenshots().catch(console.error);