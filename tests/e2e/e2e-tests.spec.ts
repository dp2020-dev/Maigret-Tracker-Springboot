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

// test('visual regression catches subtle font change invisible to manual testers', async ({ page }) => {
//     // 1. Establish a known baseline (this must already exist as a committed snapshot)
//     await page.goto('/');
//     await page.waitForLoadState('networkidle');

//     // 2. This assertion compares against the committed .png snapshot on disk.
//     // If no snapshot exists yet, Playwright creates one on first run.
//     await expect(page).toHaveScreenshot('homepage-baseline.png', {
//         // Tight threshold - we WANT this to fail on subtle changes
//         maxDiffPixelRatio: 0.001
//     });
// });

// test('font change is detected - would pass manual QA but fails visual regression', async ({ page }) => {
//     // Simulate what happens after a developer changes the font in CSS
//     await page.goto('/');
//     await page.waitForLoadState('networkidle');

//     // Inject the "accidental" font change a developer might make
//     await page.addStyleTag({
//         content: `body { font-family: 'Georgia', serif !important; }`
//     });

//     // This SHOULD fail - the injected font differs from the committed baseline.
//     // A manual tester might not notice Georgia vs the original sans-serif,
//     // but Playwright's pixel comparison will catch it.
//     await expect(page).toHaveScreenshot('homepage-baseline.png', {
//         maxDiffPixelRatio: 0.001
//     });
// });