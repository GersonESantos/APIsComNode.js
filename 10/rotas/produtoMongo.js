// Importar a dependência do Express
const express = require('express');

// Criar um objeto de rota
const router = express.Router();

// Importa o ObjectId, necessário para trabalhar com os _id dos documentos do MongoDB
const { ObjectId } = require('mongodb');

// Ter acesso a função responsável por obter os dados via MongoDB
const { getprodutosCollection } = require('../conexao/mongo');

// Função auxiliar para validar o ObjectId
function validarObjectId(codigo, res) {
  if (!ObjectId.isValid(codigo)) {
    res.status(400).json({ mensagem: 'Código inválido.' });
    return null;
  }
  return new ObjectId(codigo);
}

// GET /produtos - Lista todas as produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await getprodutosCollection().find().toArray();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar produtos' });
  }
});

// GET /produtos/:codigo - Busca uma produto por ID (_id)
router.get('/:codigo', async (req, res) => {
  const objectId = validarObjectId(req.params.codigo, res);
  if (!objectId) return;

  try {
    const produto = await getprodutosCollection().findOne({ _id: objectId });
    if (!produto) {
      return res.status(404).json({ mensagem: 'produto não encontrada.' });
    }
    res.json(produto);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar a produto' });
  }
});

// POST /produtos - Cadastra uma nova produto
router.post('/', async (req, res) => {
  const { nome, preco, cpreco } = req.body;

  if (!nome || !preco || !cpreco) {
    return res.status(400).json({ mensagem: 'Nome, preco e cpreco são obrigatórios.' });
  }

  try {
    const resultado = await getprodutosCollection().insertOne({ nome, preco, cpreco });
    res.status(201).json({ id: resultado.insertedId, nome, preco, cpreco });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao cadastrar produto' });
  }
});

// PUT /produtos/:codigo - Atualiza todos os campos de uma produto
router.put('/:codigo', async (req, res) => {
  const objectId = validarObjectId(req.params.codigo, res);
  if (!objectId) return;

  const { nome, preco, cpreco } = req.body;

  if (!nome || !preco || !cpreco) {
    return res.status(400).json({ mensagem: 'Nome, preco e cpreco são obrigatórios.' });
  }

  try {
    const resultado = await getprodutosCollection().updateOne(
      { _id: objectId },
      { $set: { nome, preco, cpreco } }
    );

    if (resultado.matchedCount === 0) {
      return res.status(404).json({ mensagem: 'produto não encontrada.' });
    }

    res.status(200).json({ id: req.params.codigo, nome, preco, cpreco });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar produto', detalhes: err.message });
  }
});

// PATCH /produtos/:codigo - Atualiza parcialmente os campos de uma produto
router.patch('/:codigo', async (req, res) => {
  const objectId = validarObjectId(req.params.codigo, res);
  if (!objectId) return;

  const { nome, preco, cpreco } = req.body;
  const updateFields = {};

  if (nome !== undefined) updateFields.nome = nome;
  if (preco !== undefined) updateFields.preco = preco;
  if (cpreco !== undefined) updateFields.cpreco = cpreco;

  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({ mensagem: 'Nenhum campo informado para atualização.' });
  }

  try {
    const resultado = await getprodutosCollection().updateOne(
      { _id: objectId },
      { $set: updateFields }
    );

    if (resultado.matchedCount === 0) {
      return res.status(404).json({ mensagem: 'produto não encontrada.' });
    }

    res.status(200).json({ id: req.params.codigo, ...updateFields });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar parcialmente a produto', detalhes: err.message });
  }
});

// DELETE /produtos/:codigo - Remove uma produto pelo ID
router.delete('/:codigo', async (req, res) => {
  const objectId = validarObjectId(req.params.codigo, res);
  if (!objectId) return;

  try {
    const resultado = await getprodutosCollection().deleteOne({ _id: objectId });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ mensagem: 'produto não encontrada.' });
    }

    res.status(200).json({ mensagem: 'produto removida com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover produto', detalhes: err.message });
  }
});

// Exporta todas as rotas para uso no app principal
module.exports = router;
