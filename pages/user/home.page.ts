import { type Locator, type Page, expect } from '@playwright/test';

export class UserHomePage {
  readonly page: Page;
  readonly logoutButton: Locator;
  readonly searchField: Locator; 
  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.getByTestId('logout');
    this.searchField = page.getByTestId('pesquisar');
  }

  async logout() {
    await this.logoutButton.click();
  }

  async searchProduct(productName: string) {
    await this.searchField.fill(productName);
    await this.searchField.press('Enter');
  } 

  async validateLoginSuccess() {
    await expect(this.logoutButton).toBeVisible();
  }  
}