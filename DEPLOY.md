# Instruções para Deploy do Projeto "NOSSO CARDÁPIO"

## 1. Preparação do Projeto para Deploy

Antes de fazer o deploy da aplicação, certifique-se de que:

1. Todas as dependências estão instaladas corretamente
2. A aplicação está funcionando localmente sem erros
3. As variáveis de ambiente estão configuradas corretamente

> **Nota Importante**: O Dockerfile está configurado para incluir todas as dependências (incluindo as de desenvolvimento) para garantir compatibilidade em ambiente de produção. Isso evita problemas como a falta de pacotes como `@vitejs/plugin-react` que são necessários em tempo de execução.

## 2. Deploy com Docker

### 2.1. Construindo a imagem Docker

1. Certifique-se de ter o Docker instalado em sua máquina
2. Construa a imagem Docker:
   ```
   docker build -t nosso-cardapio .
   ```

3. Execute o container localmente para testar:
   ```
   docker run -p 5000:5000 nosso-cardapio
   ```

4. Acesse http://localhost:5000 para verificar se a aplicação está funcionando

### 2.2. Deploy no EasyPanel

1. Acesse o painel do EasyPanel e faça login
2. Crie um novo aplicativo e selecione a opção "Docker"
3. Configure o aplicativo para usar a imagem do Docker Hub ou de um registro privado
4. Configure as variáveis de ambiente necessárias:

   **Variáveis de ambiente obrigatórias para o banco de dados PostgreSQL:**
   ```
   DATABASE_URL=postgresql://username:password@host:port/database
   PGUSER=username
   PGPASSWORD=password
   PGHOST=host
   PGPORT=port
   PGDATABASE=database
   ```
   
   Substitua os valores acima pelos dados de conexão do seu banco de dados PostgreSQL.
   
   **Variáveis de ambiente opcionais:**
   ```
   NODE_ENV=production
   PORT=5000
   ```

5. Inicie o aplicativo

## 3. Deploy no GitHub Pages

1. Instale o pacote gh-pages:
   ```
   npm install --save-dev gh-pages
   ```

2. Adicione os seguintes scripts no seu package.json:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist/client"
   ```

3. Adicione a propriedade "homepage" no seu package.json:
   ```json
   "homepage": "https://seu-usuario.github.io/nosso-cardapio"
   ```

4. Execute o comando de deploy:
   ```
   npm run deploy
   ```

## 4. Deploy na Vercel

1. Crie uma conta na Vercel (https://vercel.com)
2. Instale a CLI da Vercel:
   ```
   npm install -g vercel
   ```

3. Faça login pela CLI:
   ```
   vercel login
   ```

4. Deploy do projeto:
   ```
   vercel
   ```

5. Para fazer o deploy em produção:
   ```
   vercel --prod
   ```

## 5. Deploy na Netlify

1. Crie uma conta na Netlify (https://netlify.com)
2. Instale a CLI da Netlify:
   ```
   npm install -g netlify-cli
   ```

3. Faça login pela CLI:
   ```
   netlify login
   ```

4. Inicialize o projeto com Netlify:
   ```
   netlify init
   ```

5. Deploy do projeto:
   ```
   netlify deploy
   ```

6. Para fazer o deploy em produção:
   ```
   netlify deploy --prod
   ```

## 6. Deploy no Heroku com Docker

1. Instale a CLI do Heroku e faça login:
   ```
   heroku login
   heroku container:login
   ```

2. Crie uma aplicação no Heroku:
   ```
   heroku create nosso-cardapio
   ```

3. Construa e envie a imagem para o Heroku:
   ```
   heroku container:push web -a nosso-cardapio
   ```

4. Publique a imagem:
   ```
   heroku container:release web -a nosso-cardapio
   ```

5. Acesse a aplicação:
   ```
   heroku open -a nosso-cardapio
   ```

## 7. Deploy na AWS Fargate

1. Instale e configure a AWS CLI
2. Crie um repositório no ECR (Elastic Container Registry):
   ```
   aws ecr create-repository --repository-name nosso-cardapio
   ```

3. Faça login no ECR:
   ```
   aws ecr get-login-password | docker login --username AWS --password-stdin [seu-id-aws].dkr.ecr.[regiao].amazonaws.com
   ```

4. Construa e envie a imagem para o ECR:
   ```
   docker build -t [seu-id-aws].dkr.ecr.[regiao].amazonaws.com/nosso-cardapio:latest .
   docker push [seu-id-aws].dkr.ecr.[regiao].amazonaws.com/nosso-cardapio:latest
   ```

5. Crie uma definição de tarefa para o Fargate, um cluster e um serviço usando o AWS Management Console ou a AWS CLI

## 8. Configuração de Domínio Personalizado

Após o deploy, você pode configurar um domínio personalizado em qualquer uma das plataformas:

1. Adquira um domínio (GoDaddy, Namecheap, etc.)
2. Configure os registros DNS para apontar para o serviço onde você hospedou a aplicação
3. Configure o domínio personalizado no painel da plataforma de hospedagem

## 9. Manutenção e Atualizações

Para atualizar a aplicação após o deploy:

1. Faça as alterações no código
2. Teste localmente
3. Faça o commit e push para o repositório
4. Execute novamente o comando de deploy para a plataforma escolhida

## 10. Monitoramento

Considere configurar ferramentas de monitoramento para acompanhar o desempenho da aplicação:

- Google Analytics para monitoramento de usuários
- Sentry para monitoramento de erros
- UptimeRobot para monitoramento de disponibilidade