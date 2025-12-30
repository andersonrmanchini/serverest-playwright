# Automação de Testes com Playwright e IA para a Aplicação ServeRest

Este projeto demonstra uma suíte de testes de automação de interface de usuário (UI) para a aplicação [ServeRest](https://github.com/ServeRest/ServeRest), utilizando Playwright, TypeScript e uma integração inovadora com a API da OpenAI para geração dinâmica de dados de teste.

## ✨ Funcionalidades Principais

- **Automação de UI com Playwright:** Testes robustos e rápidos que simulam a interação do usuário com a aplicação.
- **Escrito em TypeScript:** Código tipado, mais seguro e com excelente suporte de IDEs.
- **Padrão Page Object Model (POM):** Arquitetura limpa e de fácil manutenção, separando a lógica de interação da página dos testes em si.
- **Geração de Dados com Inteligência Artificial:** Utiliza a API da OpenAI (GPT-3.5 Turbo) para criar dados de teste únicos e realistas (usuários e produtos) a cada execução.
- **Manipulação Dinâmica de Imagens:** A fábrica de dados de IA busca uma URL de imagem gerada pela IA, faz o download e a utiliza no teste de upload de produto.
- **Mecanismo de Fallback:** Em caso de falha na API da OpenAI (quota excedida, instabilidade), o sistema recorre a um gerador de dados local para não interromper os testes.
- **Configuração Centralizada:** Uma `DriverFactory` gerencia a inicialização e configuração do navegador, facilitando ajustes e a manutenção.

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de que você tem o seguinte instalado:

- Node.js (versão 18.x ou superior)
- NPM ou Yarn
- A aplicação **ServeRest** deve estar em execução e acessível.
- Uma chave de API da **OpenAI**.

## 🚀 Instalação e Configuração

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-seu-repositorio>
    cd serverest-playwright
    ```

2.  **Instale as dependências do projeto:**
    ```bash
    npm install
    ```

3.  **Instale os navegadores do Playwright:**
    ```bash
    npx playwright install
    ```

4.  **Configure as variáveis de ambiente:**
    Crie um arquivo chamado `.env` na raiz do projeto e adicione as seguintes variáveis:

    ```env
    # URL base da aplicação ServeRest que será testada
    WEB_BASE_URL="http://localhost:3000"

    # Sua chave de API secreta da OpenAI
    OPENAI_API_KEY="sk-..."
    ```

## 🧪 Executando os Testes

Você pode executar os testes de várias maneiras:

- **Executar todos os testes em modo headless (padrão):**
  ```bash
  npx playwright test
  ```

- **Executar os testes com a interface gráfica do Playwright (UI Mode):**
  ```bash
  npx playwright test --ui
  ```

- **Executar um arquivo de teste específico:**
  ```bash
  npx playwright test tests/ui/admin/product.spec.ts
  ```

- **Executar os testes em um navegador específico:**
  ```bash
  npx playwright test --project=chromium
  ```

## 📂 Estrutura do Projeto

```
serverest-playwright/
├── pages/                  # Contém as classes do Page Object Model (POM)
│   ├── admin/              # Páginas específicas da área de administrador
│   ├── user/               # Páginas específicas da área de usuário comum
│   └── authentication.page.ts
├── tests/                  # Contém os arquivos de teste (.spec.ts)
│   └── ui/
│       ├── admin/
│       └── user/
├── utils/                  # Funções de utilidade e helpers
│   ├── ai.data.factory.ts  # Fábrica para gerar dados de teste com IA e fallback local
│   ├── driver.factory.ts   # Fábrica para criar e configurar a instância do navegador
│   ├── openai.helper.ts    # Helper para chamadas à API da OpenAI
│   └── pictures/           # Imagens estáticas para o fallback
├── playwright/.cache/      # Diretório para imagens baixadas pela IA (gerado em tempo de execução)
├── .env                    # Arquivo para variáveis de ambiente (deve ser criado localmente)
├── package.json
└── playwright.config.ts
```

## 🧩 Componentes-Chave

### AI Data Factory (`utils/ai.data.factory.ts`)

Este é o coração da geração de dados dinâmicos.

- **`generateFakeUser()`**: Envia um prompt para a OpenAI solicitando um objeto JSON com dados de um novo usuário (nome, email, senha, etc.).
- **`generateFakeProduct()`**: Solicita à OpenAI os dados de um produto, incluindo uma `imageUrl`. Em seguida, faz o download dessa imagem, a salva no diretório `playwright/.cache/` e retorna o caminho local do arquivo para ser usado no teste de upload.
- **Funções de Fallback**: Se a chamada à API falhar, as funções `generateLocalFakeUser()` e `generateLocalFakeProduct()` são acionadas, gerando dados locais com um *timestamp* para garantir a unicidade e evitar que os testes quebrem.

### Driver Factory (`utils/driver.factory.ts`)

Abstrai a criação da instância do Playwright (`Browser`, `Context`, `Page`). É configurado para iniciar o navegador em modo `headed` (`headless: false`) para facilitar a depuração visual durante o desenvolvimento.

### Page Object Model (`/pages`)

Seguindo as melhores práticas de automação, cada página da aplicação tem sua própria classe (ex: `AuthenticationPage`, `ProductPage`). Essas classes encapsulam os seletores (locators) e os métodos que representam as interações do usuário (ex: `registerUser()`, `goToSignUpPage()`), tornando os testes mais legíveis e fáceis de manter.

---

*Este projeto serve como um exemplo avançado de como combinar a robustez do Playwright com o poder da inteligência artificial para criar testes de automação mais inteligentes e resilientes.*

```

<!--
[PROMPT_SUGGESTION]Crie um novo teste para validar a exclusão de um produto recém-cadastrado.[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]Refatore o `ai.data.factory.ts` para que a inicialização do cliente da OpenAI seja feita apenas uma vez (padrão Singleton).[/PROMPT_SUGGESTION]
