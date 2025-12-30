import { type Locator, type Page } from '@playwright/test';
import { AdministratorHomePage } from '../home.page';

export class SignUpPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signUpButton: Locator;
  readonly name: Locator;
  readonly isAdministrator: Locator


  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.signUpButton = page.getByTestId('cadastrar');
    this.name = page.getByTestId('nome');
    this.isAdministrator = page.getByTestId('checkbox');
  }

  async goto() {
    await this.page.goto('/cadastrarusuarios');
  }

  async submitRegistrationForm(
    email: string, 
    password: string, 
    name: string, 
    isAdministrator: boolean = false) {
      if (name) await this.name.fill(name);
      if (email) await this.emailInput.fill(email);
      if (password) await this.passwordInput.fill(password);
      if (isAdministrator) {
        await this.isAdministrator.check();
      }
      await this.signUpButton.click();
  }

  async registerUser(
    email: string, 
    password: string, 
    name: string, 
    isAdministrator: boolean = false): Promise<AdministratorHomePage> {
      await this.submitRegistrationForm(email, password, name, isAdministrator);
      // Após o cadastro, o sistema redireciona para a home,
      // então retornamos uma nova instância da HomePage.
      return new AdministratorHomePage(this.page);
  }
}