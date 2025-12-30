import { FullConfig } from '@playwright/test';

/**
 * Este arquivo é executado uma única vez antes de toda a suíte de testes.
 * É o local ideal para tarefas de configuração global que não devem ser repetidas
 * para cada teste, como:
 * 
 * - Fazer login em uma aplicação e salvar o estado de autenticação (storageState).
 * - Preparar (seed) um banco de dados com dados de teste.
 * - Iniciar serviços ou servidores externos necessários para os testes.
 * 
 * @param config A configuração completa do Playwright.
 */
async function globalSetup(config: FullConfig) {
  console.log('Executando Global Setup...');

  // A configuração do dotenv já está no seu `playwright.config.ts`,
  // então as variáveis de ambiente (process.env) já estão disponíveis aqui.
  console.log(`API Base URL: ${process.env.API_BASE_URL}`);
  console.log(`Web Base URL: ${process.env.WEB_BASE_URL}`);

  console.log('Global Setup concluído com sucesso.');
}

export default globalSetup;