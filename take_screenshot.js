const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 820, height: 650 });
  await page.goto('file:///home/user/zydo/family_drawing.html');
  await page.waitForTimeout(1000); // Wait for canvas to render
  await page.screenshot({ path: 'family_drawing_screenshot.png' });
  await browser.close();
  console.log('Screenshot saved as family_drawing_screenshot.png');
})();
