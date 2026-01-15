import { test, expect } from '@playwright/test';
import { AuthenticationPage } from '../../../pages/authentication.page';
import { generateFakeProduct, generateFakeUser } from '../../../utils/data.factory';

test.describe('Cenários de cadastro de produto', () => {
  test('Validar cadastramento de um produto com sucesso', async ({ page }) => {
    // Arrange
    const authPage = new AuthenticationPage(page);
    const fakeUser = generateFakeUser(true); // Gerar usuário administrador
    const fakeProduct = generateFakeProduct();

    // Act
    // Cria uma conta de usuário administrador
    const signUpPage = await authPage.goToSignUpPage();
    const homePage = await signUpPage
      .registerAdminUser(fakeUser.email, fakeUser.password, fakeUser.name);
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

    // Assert
    await expect(page.getByText(fakeProduct.name)).toBeVisible();
    await expect(page.getByText(fakeProduct.price.toString())).toBeVisible()
    await expect(page.getByText(fakeProduct.description)).toBeVisible();
    //await expect(page.getByLabel(fakeProduct.quantity.toString())).toBeVisible();
  });
});
