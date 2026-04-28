import { test, expect } from '../fixtures/base.fixture';

test("verify 'No books found' on screen when a book not found", async ({ indexPage, page }) => {

    // 1. Mock before navigation
    await page.route('**/api/books/search**', async route => {
        await route.fulfill({ 
            status: 200, 
            contentType: 'application/json', 
            body: JSON.stringify([]) 
        });
    });

    // 2. Then navigate
    await page.goto('http://localhost:8080/index.html');

    // 3. Interact
    await indexPage.performSearch('green');

    // 4. Assert
    await expect(indexPage.noResultsMessage).toHaveText('No books found.');
});

test('book with readStatus false displays as Unread', async ({ page }) => {
  await page.route('*/**/api/books', async route => {
    await route.fulfill({
      json: [
        { title: 'Pietr the Latvian', readStatus: false }
      ]
    });
  });

  await page.goto('http://localhost:8080/index.html');

  await expect(page.getByText('Pietr the Latvian', { exact: true })).toBeVisible();
  await expect(page.locator('span.badge-unread')).toHaveText('Unread');
});

test('index page still renders if books fail to load', async ({ indexPage, page, request }) => {

    // Fetch real data first
    const response = await request.get('http://localhost:8080/api/books');
    const books = await response.json();
  
    // Intercept and abort the loading of books
    await page.route('**/api/books', route => route.abort());

    //assert index page loads and 0 books have been loaded
    await indexPage.goto();
    await expect(indexPage.totalBooks).toHaveText('0');

});

// test('visual comparison after image fails to load', async ({ indexPage, page, request }) => {

//     // Fetch real data first
//     const response = await request.get('http://localhost:8080/api/index.html');
//     const books = await response.json();
  
//     // Intercept and abort the loading of books
//     await page.route('**/headerImg.png', route => route.abort());
//     await indexPage.goto();
//     await expect(page).toHaveScreenshot();
// });