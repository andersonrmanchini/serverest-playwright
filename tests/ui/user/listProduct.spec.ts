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

  test('Validar visualização de produtos cadastrados como usuário comum', async () => {
    // Arrange
    const authPage = new AuthenticationPage(page);
    const fakeAdmUser = await generateFakeUser(true);
    const fakeUser = await generateFakeUser(false);
    const fakeProduct = await generateFakeProduct();

    // Act
    // Cria uma conta de usuário administrador
    const signUpPage = await authPage.goToSignUpPage();
    const homePage = await signUpPage
      .registerUser(fakeAdmUser.email, fakeAdmUser.password, fakeAdmUser.nome, true);  
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
    // Logout do usuário administrador
    await homePage.logout();

    // Cria uma conta de usuário comum
    const signUpPageUser = await authPage.goToSignUpPage();
    const userHomePage = await signUpPageUser
      .registerUser(fakeUser.email, fakeUser.password, fakeUser.nome, false);
    await userHomePage.validateLoginSuccess();

    // Procura pelo produto cadastrado
    await userHomePage.searchProduct(fakeProduct.name);

    // Assert
    await expect(page.getByText(fakeProduct.name)).toBeVisible();
    await expect(page.getByText(fakeProduct.price)).toBeVisible();
  });

  test.afterEach(async () => {
    // Fecha o navegador após cada teste
    if (browser) {
      await browser.close();
    }
  });
});