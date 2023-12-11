import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.locator('body').click();
  await page.locator('body').press('F12');
  await page.goto('about:blank');
  await page.goto('chrome-error://chromewebdata/');
});