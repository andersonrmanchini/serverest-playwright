import { type Locator, type Page } from '@playwright/test';
import { ListProductPage } from './listProduct.page';

export class ProductPage {
  readonly page: Page;
  readonly productNameInput: Locator;
  readonly productPriceInput: Locator;
  readonly productDescriptionInput: Locator;
  readonly productAmountInput: Locator;
  readonly productImageInput: Locator;
  readonly productButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productNameInput = page.getByTestId('nome');
    this.productPriceInput = page.getByTestId('preco');
    this.productDescriptionInput = page.getByTestId('descricao');
    this.productAmountInput = page.getByTestId('quantity');
    this.productImageInput = page.getByTestId('imagem');
    this.productButton = page.getByTestId('cadastarProdutos');
  }

  async goto() {
    await this.page.goto('/cadastrarprodutos');
  }

  async registerProduct(
    name: string,
    price: string,
    description: string,
    amount: string,
    image: string
  ): Promise<ListProductPage> {
    if (name) await this.productNameInput.fill(name);
    if (price) await this.productPriceInput.fill(price);
    if (description) await this.productDescriptionInput.fill(description);
    if (amount) await this.productAmountInput.fill(amount);
    if (image) await this.productImageInput.setInputFiles(image);
    await this.productButton.click();

    return new ListProductPage(this.page);
  }
}