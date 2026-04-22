import { test, expect } from '../fixtures/base.fixture';

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
