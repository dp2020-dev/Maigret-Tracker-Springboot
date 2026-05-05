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


test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Maigret Tracker/);
  });

test('search word not found, returns no results', async ({ indexPage }) => {
  await indexPage.goto();
  await indexPage.performSearch('green');
  await expect(indexPage.noResultsMessage).toBeVisible();
  await expect(indexPage.noResultsMessage).toHaveText('No books found.');
  });

test('search word found, returns expected book', async ({ indexPage }) => {
  await indexPage.goto();
  await indexPage.performSearch('yellow');
  await indexPage.getBookCardByTitle("The Yellow Cat")
  });

test('verify books read + unread books = total books', async ({ indexPage }) => {
  await indexPage.goto();
  await indexPage.countBooks();
  });

test('verify progress percentage.', async ({ indexPage }) => {
  await indexPage.goto();
  await indexPage.percentComplete();
  });

test('visual comparison example test', async ({ indexPage, page }) => {
  await indexPage.goto();
  await expect(page).toHaveScreenshot();
});

test('updating a book from unread to read', async ({ indexPage}) => {
  await indexPage.goto();
  await indexPage.getBookCardByTitle("The Yellow Cat")
  await expect(indexPage.statusBadge('The Yellow Cat', 'unread')).toBeVisible();
  await indexPage.markAsRead('The Yellow Cat');
  await expect(indexPage.statusBadge('The Yellow Cat', 'read')).toBeVisible();
});

test('opening the Open Library info for a selected book', async ({ indexPage, page }) => {
  await indexPage.goto();
  await indexPage.libraryBtn("Olaf the Lithuanian", 'Open').click();

  // set const to get the iframe for the selected book
  const iframeLocator = page.locator('iframe[id="library-frame-Olaf the Lithuanian"]');

  // Wait until Open Library src is loaded into the iframe
  await expect(iframeLocator).toHaveAttribute('src', /openlibrary\.org/, { timeout: 10000 });

  // contentFrame() returns a FrameLocator — gives full Playwright locator access inside the iframe
  const openLibraryFrame = iframeLocator.contentFrame();

  // verifies the book card has loaded the Open Library logo
  await openLibraryFrame
    .locator('img.logo-icon[alt="Open Library logo"]')
    .waitFor({ state: 'visible', timeout: 15000 });

  // verifies able to use elements within the iframe to interact, click and change tabs 
  await openLibraryFrame
    .getByRole('link', { name: 'Details' })
    .click();

  await openLibraryFrame
    .getByTitle('Book Details');
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

    // Take screenshot of new state and expects it to differ from before
    await expect(page).toHaveScreenshot('after-mark-as-read.png');
});

