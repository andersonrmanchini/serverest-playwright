import { expect, type Locator, type Page } from '@playwright/test';

export class ListProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/listarprodutos');
  }
}