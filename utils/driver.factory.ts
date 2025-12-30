import { chromium, Browser, BrowserContext, Page } from '@playwright/test';

/**
 * Factory para criação manual da sessão do navegador.
 * Implementa o padrão Factory para abstrair a inicialização do driver.
 */
export async function createDriver(): Promise<{ browser: Browser; context: BrowserContext; page: Page }> {
  const browser = await chromium.launch({
    channel: 'chrome', // Força o uso do Google Chrome instalado
    headless: false    // Abre o navegador visível (headed) para facilitar o debug
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // Usa a variável de ambiente ou um fallback seguro para evitar erros de navegação
  await page.goto(process.env.WEB_BASE_URL || 'about:blank');

  return { browser, context, page };
}