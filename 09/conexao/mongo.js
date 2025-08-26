// Importando a classe MongoClient do pacote 'mongodb'.
const { MongoClient } = require('mongodb');

// Conexão com o MongoDB, usando o MongoDB Atlas (nuvem).
const uri = 'mongodb+srv://gebhsantos:YPYS8bRSD7NPbRKp@cluster0.kblbkig.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Criando uma instância do MongoClient, que será usada para estabelecer a conexão com o banco de dados.
const client = new MongoClient(uri);

// Variável para armazenar a coleção 'produtos' que será usada nas operações CRUD.
let produtosCollection;

// Função assíncrona para conectar ao MongoDB.
async function conectarMongo() {
  try {
    // Usando o `await` para aguardar a conexão do MongoDB ser estabelecida através da URI fornecida.
    await client.connect();
    
    // Após a conexão bem-sucedida, acessamos o banco de dados 'api_db'.
    const db = client.db('api_db');

    // Agora que temos o banco de dados, acessamos a coleção 'produtos' e armazenamos em `produtosCollection` para uso posterior.
    produtosCollection = db.collection('produtos');
    
    // Exibimos uma mensagem no console caso a conexão seja bem-sucedida.
    console.log('MongoDB conectado com sucesso!');
  } catch (err) {
    // Se houver algum erro durante a conexão com o MongoDB, ele será capturado aqui.
    console.error('Erro ao conectar com o MongoDB:', err);
  }
}

// Função para obter a coleção 'produtos' após a conexão com o MongoDB.
function getprodutosCollection() {
  // Se a coleção não foi definida (caso a conexão não tenha ocorrido com sucesso),
  if (!produtosCollection) {
    throw new Error('Coleção não conectada.');
  }
  
  // Se a coleção foi conectada, retornamos o objeto da coleção 'produtos',
  return produtosCollection;
}

// Exportando as funções para que possam ser usadas em outras partes do código.
module.exports = { conectarMongo, getprodutosCollection };
