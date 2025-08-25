// Importa o módulo Express para usar suas funcionalprecos 
const express = require("express");

// Cria uma instância do aplicativo Express
const app = express();

// Vetor de produtos com código, nome, preco e cpreco
let produtos = [
  { "codigo": 1, "nome": "Ana Souza", "preco": 28, "cpreco": "São Paulo" },
  { "codigo": 2, "nome": "Bruno Oliveira", "preco": 34, "cpreco": "Rio de Janeiro" },
  { "codigo": 3, "nome": "Carla Mendes", "preco": 22, "cpreco": "Belo Horizonte" },
  { "codigo": 4, "nome": "Diego Lima", "preco": 40, "cpreco": "Curitiba" },
  { "codigo": 5, "nome": "Eduarda Costa", "preco": 30, "cpreco": "Porto Alegre" },
  { "codigo": 6, "nome": "Felipe Rocha", "preco": 26, "cpreco": "Brasília" },
  { "codigo": 7, "nome": "Gabriela Martins", "preco": 31, "cpreco": "Recife" },
  { "codigo": 8, "nome": "Henrique Silva", "preco": 29, "cpreco": "Fortaleza" },
  { "codigo": 9, "nome": "Isabela Ferreira", "preco": 25, "cpreco": "Salvador" },
  { "codigo": 10, "nome": "João Pedro Ramos", "preco": 33, "cpreco": "Natal" }
];

 


app.get('/', (req, res) => {
  res.status(200).json(produtos);
});

// Rota para exibir uma produto específica através do código
app.get('/:codigo', (req, res) => {
  // Obter o código
  const codigo = parseInt(req.params.codigo);

  // Localizar o objeto
  const produto = produtos.find(obj => obj.codigo == codigo);

  // Exibir produto
  if(produto){
    res.status(200).json(produto);
  }else{
    res.status(404).json({mensagem:'produto não encontrada.'});
  }
});
// Executa o projeto na porta especificada 
app.listen(8080, () => {
    console.log('Servidor rodando em http://localhost:8080');
});
