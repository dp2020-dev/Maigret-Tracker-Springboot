import { test, expect } from '@playwright/test';

// test('Pietr the Latvian shows as unread via mocked API', async ({ page }) => {
//   // Get the response and add to it
//   await page.route('*/**/api/books/pietr the latvian/read', async route => {
//     const response = await route.fetch();
//     const json = await response.json();
//     json.readStatus = false;
//     // Fulfill using the original response, while patching the response body
//     // with the given JSON object.
//     await route.fulfill({ response, json });
//   });

//   // Go to the page
//   await page.goto('http://mafonpi:8080/books/search?keyword=latvian');

//   // Assert that the new fruit is visible
//   await expect(page.getByText('Pietr the Latvian', { exact: true })).toBeVisible();
//   await expect(page.locator('span.badge.badge-unread')).toBeVisible();un
// });

test('book with readStatus false displays as Unread', async ({ page }) => {
  await page.route('*/**/api/books', async route => {
    await route.fulfill({
      json: [
        { title: 'Pietr the Latvian', readStatus: false }
      ]
    });
  });

  await page.goto('http://mafonpi:8080/books/all');

  await expect(page.getByText('Pietr the Latvian', { exact: true })).toBeVisible();
  await expect(page.locator('span.badge-unread')).toHaveText('Unread');
});