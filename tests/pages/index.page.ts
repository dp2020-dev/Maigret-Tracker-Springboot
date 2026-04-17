import { Page, Locator } from '@playwright/test';



export class IndexPage {
  readonly page: Page;
  readonly readTab: Locator;
  readonly unreadTab: Locator;
  readonly messageList: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly noResultsMessage: Locator;
  readonly bookCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.readTab = page.getByRole('button', { name: 'Read' });
    this.unreadTab = page.getByRole('button', { name: 'Unread' });
    this.messageList = page.locator('.message-item');
    this.searchInput = page.getByPlaceholder('e.g. yellow, crossroads...');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.noResultsMessage = page.locator('p.no-results');
    this.bookCards = page.locator('.book-card');
    
  }

  async viewReadMessages() {
    await this.readTab.click();
    // Best practice: wait for a state change so the test is stable
    await this.page.waitForURL(/.*filter=read/); 
  }

  async performSearch(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async getNoResultsText() {
    return await this.noResultsMessage.textContent();
  }

  getBookCardByTitle(title: string): Locator {
    return this.bookCards.filter({ hasText: title });
  }

  // You can also create helper actions
  async markAsRead(title: string) {
    const card = this.getBookCardByTitle(title);
    await card.getByRole('button', { name: 'Mark as Read' }).click();
  }

  
}