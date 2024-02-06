# KeyWallet

O KeyWallet é um sistema de armazenamento seguro para suas contas e senhas, desenvolvido para ajudar a manter suas informações confidenciais organizadas e acessíveis apenas para você. Este projeto foi construído utilizando Node.js, Express, Prisma no backend e React no frontend.

## Funcionalidades Principais

1. **Cadastro de Contas e Senhas:** Armazene suas contas e senhas de forma segura no sistema.
2. **Organização Intuitiva:** Organize suas informações de maneira intuitiva e fácil de usar.

## Pré-requisitos

Antes de começar, certifique-se de ter o Node.js instalado. Para o gerenciamento de dependências no backend e frontend, utilizamos o npm, mas também pode ser utilizado o yarn.

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Utilização

### Uso remoto do KeyWallet

1. Acesse o link a seguir: [KeyWallet](https://keywallet.vercel.app/)

### Uso local do KeyWallet

1. Clone este repositório:

```bash
git clone https://github.com/Jonathaannn/KeyWallet-API.git
```

2. Acesse o diretório do projeto:

```bash
cd keywallet
```

### Backend

3. Navegue até o diretório do backend:

```bash
cd backend
```

4. Instale as dependências:

```bash
npm install
```

5. Execute as migrações do banco de dados:

```bash
npx prisma migrate dev --name init
```

6. Crie as variáveis de ambiente

DATABASE_URL="Link de conexão com seu banco"
SECRET="Sua secret"
KEY_WALLET="Hash de criptografia"

7. Inicie o servidor:

```bash
npm run start
```

### Frontend

7. Abra um novo terminal e navegue até o diretório do frontend:

```bash
cd frontend
```

8. Instale as dependências:

```bash
npm install
```

9. Inicie o aplicativo:

```bash
npm start
```

10. Crie as variáveis de ambiente

REACT_APP_BASE_URL=http://localhost:3000

Acesse [http://localhost:3000](http://localhost:3000) em seu navegador para utilizar o KeyWallet.
