import playwright from 'playwright';

const browser = await playwright.chromium.launch();
const context = await browser.createContext();
const page = await context.newPage();

// Capture all console messages
page.on('console', (msg) => {
  console.log(`[${msg.type().toUpperCase()}] ${msg.text()}`);
  if (msg.args().length) {
    msg.args().forEach((arg, i) => {
      console.log(`  arg[${i}]:`, arg);
    });
  }
});

// Capture page errors
page.on('pageerror', (err) => {
  console.error('[PAGE ERROR]', err);
});

// Capture request failures
page.on('requestfailed', (req) => {
  console.error('[REQUEST FAILED]', req.url(), req.failure());
});

try {
  console.log('Navigating to http://localhost:5173...');
  const response = await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 10000 });
  console.log('Navigation response status:', response?.status());

  // Wait a bit for React to render
  await page.waitForTimeout(2000);

  // Check the root element content
  const rootContent = await page.evaluate(() => {
    const root = document.getElementById('root');
    return {
      exists: !!root,
      html: root?.innerHTML || 'N/A',
      children: root?.children.length || 0,
      text: root?.textContent?.substring(0, 200) || 'N/A',
    };
  });

  console.log('\n=== Root Element State ===');
  console.log('Root exists:', rootContent.exists);
  console.log('Root children:', rootContent.children);
  console.log('Root text preview:', rootContent.text);
  if (rootContent.html.length < 500) {
    console.log('Root HTML:', rootContent.html);
  } else {
    console.log('Root HTML (first 500 chars):', rootContent.html.substring(0, 500));
  }

  // Check for any errors in the page
  const errors = await page.evaluate(() => {
    return window.__errors__ || [];
  });
  console.log('\nWindow errors:', errors);

  // Take a screenshot
  await page.screenshot({ path: '/tmp/app-debug.png' });
  console.log('\nScreenshot saved to /tmp/app-debug.png');

  // Check what modules are loaded
  const modules = await page.evaluate(() => {
    const moduleKeys = Object.keys(window).filter(k => k.includes('module') || k.includes('Module'));
    return moduleKeys.slice(0, 20);
  });
  console.log('\nWindow module keys:', modules);

} catch (error) {
  console.error('Navigation error:', error);
} finally {
  await browser.close();
}
