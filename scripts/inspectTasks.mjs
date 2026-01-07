import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto('http://localhost:5173/dashboard');
  await page.waitForSelector('text=StudyNest');
  await page.keyboard.press('t');
  try {
    await page.waitForSelector('input[placeholder="Add a new task..."]', { timeout: 5000 });
  } catch {
    await page.locator('button[aria-label="Tasks view"]').first().click({ force: true });
    await page.waitForSelector('input[placeholder="Add a new task..."]', { timeout: 5000 });
  }

  const list = await page.$('[aria-label="Task list"]');
  if (!list) {
    console.log('No task list element found');
  } else {
    const html = await list.innerHTML();
    console.log('Task list HTML:\n', html);
  }

  await browser.close();
})();