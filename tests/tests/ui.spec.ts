import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://mafonpi:8080/books');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Maigret Tracker/);
});

test('search function', async ({ page }) => {
  await page.goto('http://mafonpi:8080/books');

  // Click the get started link.
  await page.getByRole('button', { name: 'Search' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Maigret Book Search' })).toBeVisible();
});
