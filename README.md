# NOSSO CARDÁPIO

Um aplicativo SaaS para gerenciamento de cardápio online de restaurantes, desenvolvido com React.

## Descrição

NOSSO CARDÁPIO é uma aplicação web moderna que permite aos restaurantes exibirem seus produtos de forma atraente e interativa. Com design responsivo e uma interface amigável, os clientes podem navegar facilmente pelo menu, visualizar detalhes dos produtos e adicionar itens ao carrinho.

## Funcionalidades

- Exibição de produtos por categorias
- Seção de produtos em destaque
- Detalhes do produto em modal
- Seleção de opções (tamanhos, variações)
- Carrinho de compras com gerenciamento de quantidade
- Design responsivo para mobile, tablet e desktop

## Tecnologias Utilizadas

- React.js
- TailwindCSS
- Framer Motion (para animações)
- Express (backend)
- Context API
- React Query

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## Instalação e Execução

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/nosso-cardapio.git
   cd nosso-cardapio
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` baseado no arquivo `.env.example`
   - Preencha as informações do banco de dados PostgreSQL

4. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```

5. Acesse a aplicação no navegador

## Variáveis de Ambiente

As seguintes variáveis de ambiente são necessárias para o funcionamento do aplicativo:

### Banco de Dados PostgreSQL
```
DATABASE_URL=postgresql://username:password@host:port/database
PGUSER=username
PGPASSWORD=password
PGHOST=host
PGPORT=port
PGDATABASE=database
```

### Configurações da Aplicação
```
NODE_ENV=development (ou production)
PORT=5000
```

**Importante**: Ao implantar no EasyPanel ou outras plataformas, certifique-se de configurar corretamente todas estas variáveis de ambiente.

## Instruções para Deploy

### Deploy com Docker

1. Certifique-se de ter o Docker instalado em sua máquina
2. Construa a imagem Docker:
   ```
   docker build -t nosso-cardapio .
   ```

3. Execute o container localmente para testar:
   ```
   docker run -p 5000:5000 nosso-cardapio
   ```

4. Acesse a aplicação em http://localhost:5000

### Deploy no EasyPanel

1. Acesse o painel do EasyPanel e faça login
2. Crie um novo aplicativo e selecione a opção "Docker"
3. Configure o aplicativo para usar a imagem do Docker ou GitHub
4. Configure as variáveis de ambiente necessárias
5. Inicie o aplicativo

## Personalização

Você pode personalizar o NOSSO CARDÁPIO modificando:

- Cores e estilos em `client/src/styles/global.css`
- Produtos e categorias em `client/src/data/products.ts` e `client/src/data/categories.ts`
- Componentes visuais conforme necessário

## Estrutura do Projeto

```
nosso-cardapio/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── index.html
├── server/
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── vite.ts
├── shared/
│   └── schema.ts
├── Dockerfile
├── package.json
└── README.md
```

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.