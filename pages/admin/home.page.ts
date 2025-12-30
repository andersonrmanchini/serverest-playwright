import { type Locator, type Page, expect } from "@playwright/test";
import { ProductPage } from "../product.page";

export class AdministratorHomePage {
  readonly page: Page;
  readonly logoutButton: Locator;
  readonly productButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.getByTestId("logout");
    this.productButton = page.getByTestId("cadastrar-produto");
  }

  async logout() {
    await this.logoutButton.click();
  }

  async validateLoginSuccess() {
    await expect(this.logoutButton).toBeVisible();
  }

  async goToNewProductPage() {
    await this.productButton.click();
    return new ProductPage(this.page);
  }
}
