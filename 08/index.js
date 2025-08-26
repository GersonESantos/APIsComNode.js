// Importa o módulo Express para usar suas funcionalprecos 
const express = require("express");

const cors = require('cors');

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




// Executa o projeto na porta especificada 
app.listen(8080, () => {
    console.log('Servidor rodando em http://localhost:8080');
});
