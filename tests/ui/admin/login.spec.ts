import { test, expect } from '@playwright/test';
import { AuthenticationPage } from '../../../pages/authentication.page';
import { generateFakeUser } from '../../../utils/data.factory';

test.describe('Cenários de acesso ao sistema', () => {
  test('Validar cadastramento de usuário com sucesso', async ({ page }) => {
    // Arrange
    const authPage = new AuthenticationPage(page);
    const fakeUser = generateFakeUser(true); // Gerar usuário administrador

    // Act
    const signUpPage = await authPage.goToSignUpPage();
    const homePage = await signUpPage
      .registerAdminUser(fakeUser.email, fakeUser.password, fakeUser.name);
    
    // Assert
    await expect(page.getByText('Cadastro realizado com sucesso')).toBeVisible();
    await expect(homePage.logoutButton).toBeVisible();
  });

  test('Validar erro ao cadastrar um usuário com email inválido', async ({ page }) => {
    // Arrange
    const authPage = new AuthenticationPage(page);

    // Act
    const signUpPage = await authPage.goToSignUpPage();
    await signUpPage.submitRegistrationForm(
        "",
        'senha123',
        'Fulano de Tal',
        true
      );

    await expect(page.getByText('Email é obrigatório')).toBeVisible();
  });
});
