import { test, expect, type Page, type Browser } from '@playwright/test';
import { AuthenticationPage } from '../../../pages/authentication.page';
import { createDriver } from '../../../utils/driver.factory';
import { generateFakeUser } from '../../../utils/ai.data.factory';

test.describe('Cenários de acesso ao sistema', () => {
  let browser: Browser;
  let page: Page;
  
  test.beforeEach(async () => {
    // Inicializa o driver antes de cada teste
    const driver = await createDriver();
    browser = driver.browser;
    page = driver.page;
  });
  
  test('Validar cadastramento de usuário com sucesso', async () => {
    // Arrange
    const authPage = new AuthenticationPage(page);
    const fakeUser = await generateFakeUser();

    // Act
    const signUpPage = await authPage.goToSignUpPage();
    const homePage = await signUpPage
      .registerUser(fakeUser.email, fakeUser.password, fakeUser.nome, true);
    
    // Assert
    await expect(page.getByText('Cadastro realizado com sucesso')).toBeVisible();
    await expect(homePage.logoutButton).toBeVisible();
  });

  test('Validar erro ao cadastrar um usuário com email inválido', async () => {
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

  test.afterEach(async () => {
    // Fecha o navegador após cada teste
    if (browser) {
      await browser.close();
    }
  });
});
