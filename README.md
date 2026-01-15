# Automação de Testes com Playwright para a Aplicação ServeRest

Este projeto demonstra uma suíte completa de testes de automação para a aplicação [ServeRest](https://github.com/ServeRest/ServeRest), utilizando Playwright e TypeScript. Inclui testes tanto de interface de usuário (UI) quanto de API (REST).

## ✨ Funcionalidades Principais

- **Testes de UI com Playwright:** Testes robustos e rápidos que simulam a interação do usuário com a aplicação.
- **Testes de API:** Testes de endpoints REST para validar a lógica do backend.
- **Escrito em TypeScript:** Código tipado, mais seguro e com excelente suporte de IDEs.
- **Padrão Page Object Model (POM):** Arquitetura limpa e de fácil manutenção para testes de UI.
- **Services Pattern:** Serviços reutilizáveis para chamadas de API.
- **Geração de Dados com Faker:** Utiliza a biblioteca `@faker-js/faker` para criar dados de teste únicos e realistas a cada execução.
- **Setup Global:** Configuração centralizada de variáveis de ambiente e inicialização de contextos.
- **CI/CD Integrado:** Pipeline GitHub Actions configurado para executar testes automaticamente.

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de que você tem o seguinte instalado:

- Node.js (versão 20.x ou superior)
- NPM
- A aplicação **ServeRest** deve estar em execução e acessível.

## 🚀 Instalação e Configuração

1. **Clone o repositório:**
   ```bash
   git clone <url-do-seu-repositorio>
   cd serverest-playwright
   ```

2. **Instale as dependências do projeto:**
   ```bash
   npm install
   ```

3. **Instale os navegadores do Playwright:**
   ```bash
   npx playwright install --with-deps
   ```

4. **Configure as variáveis de ambiente:**
   Crie um arquivo chamado `.env` na raiz do projeto e adicione as seguintes variáveis:

   ```env
   # URL base da API ServeRest
   API_BASE_URL="https://serverest.dev"

   # URL base da aplicação web ServeRest
   WEB_BASE_URL="https://front.serverest.dev"
   ```

## 🧪 Executando os Testes

Você pode executar os testes de várias maneiras:

- **Executar todos os testes:**
  ```bash
  npm test
  ```

- **Executar apenas testes de API:**
  ```bash
  npm run test:api
  ```

- **Executar apenas testes de UI:**
  ```bash
  npm run test:ui
  ```

- **Executar testes específicos de admin:**
  ```bash
  npm run test:admin
  ```

- **Executar os testes com a interface gráfica do Playwright (UI Mode):**
  ```bash
  npx playwright test --ui
  ```

- **Executar um arquivo de teste específico:**
  ```bash
  npx playwright test tests/api/products.api.spec.ts
  ```

- **Visualizar o relatório de testes:**
  ```bash
  npm run report
  ```

## 📂 Estrutura do Projeto

```
serverest-playwright/
├── .github/
│   └── workflows/
│       └── ci.yml                 # Pipeline de CI/CD do GitHub Actions
├── pages/                         # Page Object Model para testes UI
│   ├── admin/
│   │   ├── home.page.ts
│   │   └── product/
│   │       ├── listProduct.page.ts
│   │       └── product.page.ts
│   ├── user/
│   │   ├── home.page.ts
│   │   └── listProduct.page.ts
│   └── authentication.page.ts
├── services/                      # Serviços para testes de API
│   ├── product.api.service.ts
│   ├── user.api.service.ts
│   └── login.api.service.ts
├── tests/                         # Testes automatizados
│   ├── api/
│   │   ├── products.api.spec.ts
│   │   └── users.api.spec.ts
│   └── ui/
│       ├── admin/
│       │   ├── login.spec.ts
│       │   └── product.spec.ts
│       └── user/
│           └── listProduct.spec.ts
├── utils/                         # Funções de utilidade
│   ├── data.factory.ts            # Fábrica para gerar dados de teste
│   ├── driver.factory.ts          # Configuração do driver do Playwright
│   └── pictures/
│       └── fogao.jpg              # Imagem para upload de testes
├── setup/
│   └── global.setup.ts            # Setup global de testes
├── playwright-report/             # Relatórios dos testes (gerado após execução)
├── .env                           # Variáveis de ambiente (criado localmente)
├── .github/workflows/ci.yml       # Pipeline do GitHub Actions
├── playwright.config.ts           # Configuração do Playwright
├── package.json
└── README.md
```

## 🧩 Componentes-Chave

### Data Factory (`utils/data.factory.ts`)

Responsável pela geração de dados de teste realistas:

- **`generateFakeUser(isAdmin)`**: Gera um objeto de usuário com nome, email, senha e flag de administrador usando a biblioteca Faker.
- **`generateFakeProduct()`**: Gera um objeto de produto com nome, preço, descrição, quantidade e imagem (usando arquivo local).

### Services (`services/`)

Serviços para comunicação com a API:

- **`UserService`**: Gerencia operações de usuários (create, get, list).
- **`ProductService`**: Gerencia operações de produtos (create, get, list, update, delete).
- **`LoginService`**: Gerencia autenticação e obtenção de tokens.

### Page Object Model (`pages/`)

Seguindo as melhores práticas de automação, cada página tem sua própria classe que encapsula:

- **Seletores (locators):** Elementos da página de forma reutilizável.
- **Métodos de interação:** Ações que o usuário pode fazer (ex: `registerUser()`, `loginUser()`).

Páginas disponíveis:
- `AuthenticationPage`: Login e registro
- `AdminHomePage`: Dashboard do administrador
- `AdminProductPage`: Gerenciamento de produtos (admin)
- `AdminListProductPage`: Listagem de produtos (admin)
- `UserHomePage`: Dashboard do usuário
- `UserListProductPage`: Listagem de produtos (usuário)

### Setup Global (`setup/global.setup.ts`)

Configuração executada uma vez antes de todos os testes:

- Carrega variáveis de ambiente
- Configura URLs base da API e web
- Inicializa contextos para testes

## 🔄 Fluxo de CI/CD

O projeto está configurado com GitHub Actions:

1. **Trigger:** Testes executam em push para `main` e `develop`, e em pull requests para essas branches.
2. **Ambiente:** Ubuntu latest com Node.js 20
3. **Passos:**
   - Checkout do código
   - Setup do Node.js com cache npm
   - Instalação de dependências
   - Instalação de browsers do Playwright
   - Execução dos testes
   - Upload do relatório de testes como artifact

## 🛡️ Boas Práticas Implementadas

- ✅ **Separação de concerns:** UI, API e dados em módulos distintos
- ✅ **Reutilização:** Services e Page Objects para evitar duplicação
- ✅ **Tipagem:** TypeScript para mais segurança
- ✅ **Fixtures do Playwright:** Uso de `beforeAll` e `afterAll` para setup/teardown
- ✅ **APIRequestContext:** Contextos separados para testes de API
- ✅ **Dados dinâmicos:** Geração de dados com Faker para cada execução

## 📊 Scripts Disponíveis

```json
{
  "test": "playwright test",                    // Todos os testes
  "test:ui": "playwright test --project ui",    // Apenas UI
  "test:api": "playwright test --project api",  // Apenas API
  "test:admin": "playwright test tests/ui/admin/", // Admin
  "report": "playwright show-report"            // Ver relatório
}
```

## 🐛 Troubleshooting

### Erro de conexão com a API
- Verifique se a URL em `API_BASE_URL` está correta
- Verifique se a ServeRest API está acessível

### Erro de autenticação
- Certifique-se de que o usuário criado no `beforeAll` é um administrador (`administrador: "true"`)
- Verifique se o token está sendo gerado corretamente

### Erro de timeout
- Aumente o valor de `timeout` no `playwright.config.ts` se necessário
- Verifique a velocidade da sua conexão de internet

---

*Projeto de automação robusta e escalável combinando Playwright, TypeScript e best practices de teste.*
