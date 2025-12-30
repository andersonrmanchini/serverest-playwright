import { test, expect, type Page, type Browser } from '@playwright/test';
import { AuthenticationPage } from '../../../pages/authentication.page';
import { createDriver } from '../../../utils/driver.factory';
import { generateFakeProduct, generateFakeUser } from '../../../utils/ai.data.factory';

test.describe('Cenários de cadastro de produto', () => {
  let browser: Browser;
  let page: Page;
  
  test.beforeEach(async () => {
    // Inicializa o driver antes de cada teste
    const driver = await createDriver();
    browser = driver.browser;
    page = driver.page;
  });
  
  test('Validar cadastramento de um produto com sucesso', async () => {
    // Arrange
    const authPage = new AuthenticationPage(page);
    const fakeUser = await generateFakeUser();
    const fakeProduct = await generateFakeProduct();

    // Act
    // Cria uma conta de usuário administrador
    const signUpPage = await authPage.goToSignUpPage();
    const homePage = await signUpPage
      .registerUser(fakeUser.email, fakeUser.password, fakeUser.nome, true);  
    await homePage.validateLoginSuccess();

    // Navega até a página de cadastro de produtos
    const productPage = await homePage.goToNewProductPage();
    await productPage.registerProduct(
      fakeProduct.name,
      fakeProduct.price,
      fakeProduct.description,
      fakeProduct.amount,
      fakeProduct.image
    );

    // Assert
    await expect(page.getByText(fakeProduct.name)).toBeVisible();
    await expect(page.getByText(fakeProduct.price)).toBeVisible();
    await expect(page.getByText(fakeProduct.description)).toBeVisible();
    await expect(page.getByText(fakeProduct.amount)).toBeVisible();
  });
  
  test.afterEach(async () => {
    // Fecha o navegador após cada teste
    if (browser) {
      await browser.close();
    }
  });
});
