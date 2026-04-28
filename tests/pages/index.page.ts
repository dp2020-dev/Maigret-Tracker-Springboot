import { Page, Locator, expect } from '@playwright/test';
import { assert } from 'node:console';



export class IndexPage {
  readonly page: Page;
  readonly readTab: Locator;
  readonly unreadTab: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly noResultsMessage: Locator;
  readonly bookCards: Locator;
  readonly readCount: Locator;
  readonly unreadCount: Locator;
  readonly totalBooks: Locator;
  readonly progressLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.readTab = page.getByRole('button', { name: 'Books Read' });
    this.unreadTab = page.getByRole('button', { name: 'To Read' });
    this.searchInput = page.getByPlaceholder('e.g. yellow, crossroads...');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.noResultsMessage = page.locator('p.no-results');
    this.bookCards = page.locator('.book-card');
    this.readCount = page.locator('#read-count');
    this.unreadCount = page.locator('#unread-count');
    this.totalBooks = page.locator('#total-count');
    this.progressLabel = page.locator('#progress-label');
  }

  async goto() {
    await this.page.goto('/');
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

  async bookIsRead(title: string) {
    const card = this.getBookCardByTitle(title);
    return await card.locator('.badge-read').isVisible();


    // await expect(card.locator('.badge-read')).toBeVisible();
    // if 

    // const bookIsRead = await.card.locator('.badge-read')).isVisible();
    
  }

  async markAsRead(title: string) {
    const card = this.getBookCardByTitle(title);
    await card.getByRole('button', { name: 'Mark as Read' }).click();
  }

  statusBadge(title: string, status: 'read' | 'unread') {
  const className = status === 'read' ? '.badge-read' : '.badge-unread';
  return this.getBookCardByTitle(title).locator(className);
}

  async countBooks() {
    const totalCount = parseInt(await this.totalBooks.textContent() || '0');
    const readCount = parseInt(await this.readCount.textContent() || '0');
    const unreadCount = parseInt(await this.unreadCount.textContent() || '0');

    expect(readCount + unreadCount).toBe(totalCount);
  }

  async getProgressPercentage(): Promise<number> {
    const text = await this.progressLabel.textContent() || '0';
    return parseInt(text);
    }

    async percentComplete() {
    const totalCount = parseInt(await this.totalBooks.textContent() || '0');
    const readCount = parseInt(await this.readCount.textContent() || '0');
    const percentageUnread = Math.floor((readCount / totalCount) * 100);

    expect(await this.getProgressPercentage()).toBe(percentageUnread);
  }

  
}