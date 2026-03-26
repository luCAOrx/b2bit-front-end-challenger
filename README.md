# Processo seletivo b2bit (Frontend)

Essa é uma aplicação que simula algumas funcionalidades básicas do twitter

<div align="center">
    <h2>Modo escuro</h2>
    <img src="./.github/assets/dark-mode-logged-in.jpg" width="400" alt="Modo escuro do feed com usuário deslogado"/>
    <img src="./.github/assets/dark-mode-logged-out.jpg" width="400" alt="Modo escuro do feed com usuário deslogado"/>
    <img src="./.github/assets/dark-mode-login.jpg" width="400" alt="Modo da página de login"/>
    <img src="./.github/assets/dark-mode-register.jpg" width="400" alt="Modo escuro da página de cadastro"/>
    <img src="./.github/assets/dark-mode-scrolling-feed.jpg" width="400" alt="Modo escuro da página de cadastro"/>
    <img src="./.github/assets/dark-mode-search-post.jpg" width="400" alt="Modo escuro da página de cadastro"/>
</div>

<div align="center">
    <h2>Modo claro</h2>
    <img src="./.github/assets/light-mode-logged-in.jpg" width="400" alt="Modo claro da página de venda"/>
    <img src="./.github/assets/light-mode-logged-out.jpg" width="400" alt="Modo claro para criação da venda"/>
    <img src="./.github/assets/light-mode-login.jpg" width="400" alt="Modo claro para criação da compra"/>
    <img src="./.github/assets/light-mode-register.jpg" width="400" alt="Modo claro da página de compra"/>
    <img src="./.github/assets/light-mode-scrolling-feed.jpg" width="400" alt="Modo escuro da página de cadastro"/>
    <img src="./.github/assets/light-mode-search-post.jpg" width="400" alt="Modo escuro da página de cadastro"/>
</div>

## Tecnologias utilizadas

- React
- Typescript
- Axios
- TanStack Query
- React Hook Form
- Zod
- Tailwind CSS

## Funcionalidades da aplicação

### Autenticação e Gestão de Acesso

- [x] Registro de Novo Usuário
- [x] Login de Usuário
- [x] Logout (Sair do Sistema)

### Gestão de Conteúdo (Posts)

- [x] Visualização da Timeline
- [x] Busca de Posts
- [x] Criação de Post com Imagem
- [x] Edição e Exclusão de Posts Próprios
- [x] Curtir e Descurtir Posts

## Funcionalidades extras

- [ ] Testes Unitários
- [ ] Testes E2E (Ponta a Ponta)
- [x] Modo Dark/Light
- [x] Scroll infinito
- [x] Estado Global

## Executando a aplicação

crie um arquivo na raiz do projeto chamado `.env` e dentro dele cole o conteúdo do [arquivo](./.env-example) `.env-example` ou utilize o comando `touch .env && cat .env.example > .env`, **altere se necessário a URL da API**.

Agora basta executar o comando: `npm run dev` para iniciar o servidor web. Por padrão a porta é 5173. Clique aqui para ir direto ao [site](http://localhost:5173/).

## Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](../LICENSE.md) para mais detalhes.
