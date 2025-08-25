// const API_URL = 'https://front-produto-et5n.onrender.com/';
const API_URL = 'http://localhost:5500/produtosMongo';
// Carrega as produtos automaticamente ao iniciar
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('listarBtn').addEventListener('click', carregarprodutos);
});

async function carregarprodutos() {
  try {
    const res = await fetch(API_URL);
    const produtos = await res.json();
    const tbody = document.querySelector('#tabelaprodutos tbody');
    tbody.innerHTML = '';

    if (produtos.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5">Nenhuma produto encontrada.</td></tr>';
      return;
    }

    produtos.forEach(p => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${p._id}</td>
        <td>${p.nome}</td>
        <td>${p.preco}</td>
        <td>${p.cpreco}</td>
        <td>
          <button onclick="editarproduto('${p._id}')">Editar</button>
          <button onclick="excluirproduto('${p._id}')">Excluir</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    alert('Erro ao carregar produtos.');
    console.error(err);
  }
}

async function editarproduto(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const produto = await res.json();

    document.getElementById('id').value = produto._id;
    document.getElementById('nome').value = produto.nome;
    document.getElementById('preco').value = produto.preco;
    document.getElementById('cpreco').value = produto.cpreco;
  } catch (err) {
    alert('Erro ao carregar dados da produto.');
    console.error(err);
  }
}

async function excluirproduto(id) {
  if (!confirm('Tem certeza que deseja excluir esta produto?')) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (res.ok) {
      carregarprodutos();
    } else {
      alert('Erro ao excluir produto.');
    }
  } catch (err) {
    alert('Erro ao excluir produto.');
    console.error(err);
  }
}

document.getElementById('produtoForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('id').value;
  const nome = document.getElementById('nome').value.trim();
  const preco = parseInt(document.getElementById('preco').value.trim());
  const cpreco = document.getElementById('cpreco').value.trim();

  const produto = { nome, preco, cpreco };

  try {
    let res;

    if (id) {
      // Atualizar
      res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
      });
    } else {
      // Criar
      res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
      });
    }

    if (res.ok) {
      document.getElementById('produtoForm').reset();
      document.getElementById('id').value = '';
      carregarprodutos(); // Atualiza a tabela após salvar
    } else {
      alert('Erro ao salvar produto.');
    }
  } catch (err) {
    alert('Erro ao salvar produto.');
    console.error(err);
  }
});