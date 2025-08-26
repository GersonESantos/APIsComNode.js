// Importa o módulo Express para usar suas funcionalprecos 
const express = require("express");

const cors = require('cors');

// Importando a função `conectarMongo` do arquivo `conexao/mongo.js`
const { conectarMongo } = require('./conexao/mongo');

// Cria uma instância do aplicativo Express
const app = express();

app.use(cors());


// Ter acesso ao body (json) nas requisições POST, PUT e PATCH
app.use(express.json());

//[ESTRUTURA DO INDEX.JS]

// Importa as rotas definidas em produto.js
const produtoRouter = require('./rotas/produto');

// Usa o router definido para o caminho "/produto"
app.use('/produto', produtoRouter);


// Chamar a função `conectarMongo()` para estabelecer a conexão
conectarMongo().then(() => {
  
  // Após a conexão com o MongoDB ser bem-sucedida, o servidor Express é iniciado
  app.listen(8080, () => console.log('Servidor rodando na porta 8080'));
  
}).catch(err => {
  // Caso ocorra algum erro durante a conexão com o MongoDB ou ao iniciar o servidor,
  console.error('Erro ao conectar ao MongoDB ou iniciar o servidor:', err);
});

// Executa o projeto na porta especificada 

