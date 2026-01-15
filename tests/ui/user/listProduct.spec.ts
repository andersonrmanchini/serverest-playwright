import { test, expect } from '@playwright/test';
import { AuthenticationPage } from '../../../pages/authentication.page';
import { generateFakeProduct, generateFakeUser } from '../../../utils/data.factory';
import { AdministratorHomePage } from '../../../pages/admin/home.page';

test.describe('Cenários de cadastro de produto', () => {
  test('Validar visualização de produtos cadastrados como usuário comum', async ({ page }) => {
    // Arrange
    const authPage = new AuthenticationPage(page);
    const fakeAdmUser = await generateFakeUser(true);
    const fakeUser = await generateFakeUser(false);
    const fakeProduct = await generateFakeProduct();

    // Act
    // Cria uma conta de usuário administrador
    const signUpPage = await authPage.goToSignUpPage();
    const homePage: AdministratorHomePage = await signUpPage
      .registerAdminUser(fakeAdmUser.email, fakeAdmUser.password, fakeAdmUser.name);
    await homePage.validateLoginSuccess();

    // Navega até a página de cadastro de produtos
    const productPage = await homePage.goToNewProductPage();
    await productPage.registerProduct(
      fakeProduct.name,
      fakeProduct.price.toString(),
      fakeProduct.description,
      fakeProduct.quantity.toString(),
      fakeProduct.image
    );
    // Logout do usuário administrador
    await homePage.logout();

    // Cria uma conta de usuário comum e faz login
    const signUpPageUser = await authPage.goToSignUpPage();
    const userHomePage = await signUpPageUser
      .registerUser(
        fakeUser.email,
        fakeUser.password,
        fakeUser.name)
    await userHomePage.validateLoginSuccess();

    // Procura pelo produto cadastrado
    
    await userHomePage.searchProduct(fakeProduct.name);

    // Assert
    await expect(page.getByText(fakeProduct.name)).toBeVisible();
    await expect(page.getByText(fakeProduct.price.toString())).toBeVisible();
  });
});