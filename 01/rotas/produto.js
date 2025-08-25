// Importar o Express
const express = require('express');

// Criar o objeto router, responsável por gerenciar nossas rotas
const router = express.Router(); 

// VETOR, ÍNDICE PARA CADASTRO E ROTAS






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

 
// Índice cadastro
let indiceCadastro = 11;

router.get('/', (req, res) => {
  res.status(200).json(produtos);
});

// Rota para exibir uma produto específica através do código
router.get('/:codigo', (req, res) => {
  // Obter o código
  const codigo = parseInt(req.params.codigo);

  // Localizar o objeto
  const produto = produtos.find(obj => obj.codigo == codigo);

  // Exibir produto
  if(produto){
    res.status(200).json(produto);
  }else{
    res.status(404).json({mensagem:'Produto não encontrado.'});
  }
});

// Rota para cadastrar produtos   
router.post('/', (req, res) => {
  // Extrair as características do objeto
  const { nome, preco, cpreco } = req.body;

  // Caso o nome, preco ou cpreco não sejam informados, retorna um status 400
  if (!nome || !preco || !cpreco) {
    return res.status(400).json({ mensagem: "Nome, preço e cidade são obrigatórios." });
  }

  // Criar nova produto
  const novaproduto = {
    codigo: indiceCadastro,
    nome,
    preco,
    cpreco
  };

  // Incrementar variável indiceCadastro
  indiceCadastro++;

  // Adicionar ao vetor
  produtos.push(novaproduto);

  // Retornar a nova produto
  res.status(201).json(novaproduto);
});

// Rota para atualizar todas as informações de uma produto
router.put('/:codigo', (req, res) => {
  // Extrair o código enviado via parâmetro
  const codigo = parseInt(req.params.codigo);

  // Localizar o indice da produto com o código recebido via parâmetro
  const indiceproduto = produtos.findIndex(p => p.codigo === codigo);

  // Caso não encontrar a produto
  if (indiceproduto == -1) {
    return res.status(404).json({ mensagem: 'Produto não encontrado.' });
  }

  // Extrair as características do objeto enviado
  const { nome, preco, cpreco } = req.body;

  // Caso o nome, preco ou cpreco não sejam informados, retorna um status 400
  if (!nome || !preco || !cpreco) {
    return res.status(400).json({ mensagem: 'Nome, preço e cidade são obrigatórios para PUT.' });
  }

  // Criar nova produto
  produtos[indiceproduto] = {
    codigo,
    nome,
    preco,
    cpreco
  };

  // Retorna a produto com todas as características atualizadas
  res.status(200).json(produtos[indiceproduto]);
});

// Rota para atualizar pacialmente as informações de uma produto
router.patch('/:codigo', (req, res) => {
  // Extrair o código enviado via parâmetro
  const codigo = parseInt(req.params.codigo);

  // Localizar a produto através do código
  const produto = produtos.find(p => p.codigo === codigo);

  // Caso não encontrar a produto
  if (!produto) {
    return res.status(404).json({ mensagem: 'produto não encontrada.' });
  }

  // Extrair as características do objeto enviado
  const { nome, preco, cpreco } = req.body;

  // As características que não forem informadas, manteremos as atuais
  if (nome !== undefined)   produto.nome = nome;
  if (preco !== undefined)  produto.preco = preco;
  if (cpreco !== undefined) produto.cpreco = cpreco;

  // Retorna um objeto do tipo produto
  res.status(200).json(produto);
});

// Rota DELETE - Remover produto pelo código
router.delete('/:codigo', (req, res) => {
  // Extrair o código enviado via parâmetro
  const codigo = parseInt(req.params.codigo);

  // Localizar o indice da produto com o código recebido via parâmetro
  const indiceproduto = produtos.findIndex(p => p.codigo === codigo);

  // Caso não encontrar a produto
  if (indiceproduto == -1) {
    return res.status(404).json({ mensagem: 'Produto não encontrado.' });
  }

  // Remover produto
  produtos.splice(indiceproduto, 1);

  // Retornar mensagem, informando que a produto foi removida
  res.status(200).json({ mensagem: 'Produto removido com sucesso.'});
});






// Exportar rotas
module.exports = router;
