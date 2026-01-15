import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Lê as variáveis de ambiente do arquivo .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  // Diretório onde os testes estão localizados
  testDir: './tests',
  testMatch: /.*\.spec\.(ts|js)/,

  // Arquivo de setup global (executa uma vez antes de todos os testes)
  globalSetup: require.resolve('./setup/global.setup.ts'),
  
  // Timeout global para cada teste (em milissegundos)
  timeout: 60 * 1000,
  
  // Timeout para asserções (ex: expect(locator).toBeVisible())
  expect: {
    timeout: 10000,
  },
  
  // Executar testes em paralelo
  fullyParallel: true,
  
  // Número de tentativas para testes que falham
  retries: process.env.CI ? 2 : 0,
  
  // Número de workers para execução paralela
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter a ser usado. 'html' gera um relatório navegável.
  reporter: 'html',
  
  // Configurações globais para todos os projetos
  use: {
    // Captura screenshots e vídeos em caso de falha
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Projetos: permite configurar e executar grupos de testes de forma diferente
  projects: [
    // --- PROJETO PARA TESTES DE UI ---
    {
      name: 'ui',
      // Procura por testes em tests/ui que terminam com .spec.ts, excluindo .api.spec.ts
      testMatch: /tests\/ui\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.WEB_BASE_URL,
        channel: 'chrome', // Força o uso do Google Chrome instalado localmente
        headless: true, // Modo visível para depuração local
      },
    },

    // --- PROJETO PARA TESTES DE API ---
    {
      name: 'api',
      // Procura apenas por arquivos que terminam com .api.spec.ts
      testMatch: /.*\.api\.spec\.ts/,
      use: {
        // Contexto de requisição de API, já configurado
        baseURL: process.env.API_BASE_URL,
        headless: true, // Testes de API não precisam de interface gráfica
      },
    },
  ],
});
