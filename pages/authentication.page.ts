import { type Locator, type Page } from '@playwright/test';
import { SignUpPage } from './admin/user/user.page';

export class AuthenticationPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('senha');
    this.loginButton = page.getByTestId('entrar' );
    this.signUpButton = page.getByTestId('cadastrar');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async goToSignUpPage() {
    // Navega para a página de login primeiro, se ainda não estiver lá
    await this.goto();
    
    const signUpPage = new SignUpPage(this.page);
    await this.signUpButton.click();
    
    // Aguarda o elemento da página de signup estar visível
    await this.page.waitForURL('**/cadastrarusuarios');
    
    return signUpPage;
  }

  async goToLogin() {
    await this.goto();
    return this;
  }
}