import { test, expect } from './fixtures/base.fixture';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Maigret Tracker/);
});

test('search word not found, returns no results', async ({ page, indexPage }) => {
  await page.goto('/');
  await indexPage.performSearch('green');
  await expect(indexPage.noResultsMessage).toBeVisible();
  await expect(indexPage.noResultsMessage).toHaveText('No books found.');
});

test('search word found, returns expected book', async ({ page, indexPage }) => {
  await page.goto('/');
  await indexPage.performSearch('yellow');
  await indexPage.getBookCardByTitle("The Yellow Cat")
});

//TODO: verify % complete

//TODO: verify books read + to read = total books
