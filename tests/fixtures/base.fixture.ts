import { test as base } from '@playwright/test';
import { IndexPage } from '../pages/index.page';

// Exporting 'test' here allows us to use indexPage in any spec file
export const test = base.extend<{ indexPage: IndexPage }>({
  indexPage: async ({ page }, use) => {
    await use(new IndexPage(page));
  },
});

export { expect } from '@playwright/test';