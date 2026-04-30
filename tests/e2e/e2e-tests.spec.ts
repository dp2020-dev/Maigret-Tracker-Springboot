import { test, expect } from '../fixtures/base.fixture';
import { execSync } from 'child_process';
import path from 'path';

test.beforeAll(() => {
  const seed = path.resolve(process.cwd(), 'test-seed.db');
  const target = path.resolve(process.cwd(), 'test.db');
  execSync(`cp ${seed} ${target}`);
});

test.afterAll(() => {
  const seed = path.resolve(process.cwd(), 'test-seed.db');
  const target = path.resolve(process.cwd(), 'test.db');
  execSync(`cp ${seed} ${target}`);
});

test('visual comparison after marking book as read', async ({ indexPage, page }) => {
    // Take screenshot of initial state
    await indexPage.goto();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('before-mark-as-read.png');

    // Search for a book
    await indexPage.performSearch("Cat")
    
    // Mark it as read
    await indexPage.markAsRead("The Yellow Cat");

    // Take screenshot of new state and expect it to differ from before
    await expect(page).toHaveScreenshot('after-mark-as-read.png');
});