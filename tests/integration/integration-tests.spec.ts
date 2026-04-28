import { test, expect } from '../fixtures/base.fixture';
import { execSync } from 'child_process';
import { IndexPage } from '../pages/index.page';

test.beforeAll(() => {
  execSync('cp test-seed.db test.db');
});

test.afterAll(() => {
  execSync('cp test-seed.db test.db');
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

test('visual comparison after screen change', async ({ indexPage, page, request }) => {

    // Fetch real data first
    const response = await request.get('http://localhost:8080/api/books');
    const books = await response.json();
    
    // Modify the first book title
    books[0].title = '%Pieter^The L@tvian';
    
    // Intercept and return modified data
    await page.route('**/api/books', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            json: books
        });
    });

    await indexPage.goto();
    await expect(page).toHaveScreenshot();
});
