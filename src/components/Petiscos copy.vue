<template>
  <div>
    <h2>Filtrar Produtos por Categoria</h2>

    <!-- Dropdown para selecionar a categoria -->
    <select v-model="categoriaSelecionada" @change="listarProdutosPorCategoria">
      <option value="">Todas as Categorias</option>
      <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
        {{ categoria.nome }}
      </option>
    </select>

    <div v-if="produtos.length === 0">Nenhum produto encontrado.</div>

    <!-- Lista de produtos filtrados -->
    <div v-for="produto in produtos" :key="produto.id" class="produto-card">
      <img v-if="produto.foto" :src="getImagemUrl(produto.foto)" alt="Foto do Produto" class="produto-imagem" />
      <h3>{{ produto.nome }}</h3>
      <p><strong>Categoria:</strong> {{ produto.categoria_nome }}</p>
      <p><strong>Descrição:</strong> {{ produto.descricao }}</p>
      <p><strong>Preço:</strong> R$ {{ produto.preco.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categorias: [],
      produtos: [],
      categoriaSelecionada: ''
    };
  },
  mounted() {
    this.listarCategorias();
    this.listarTodosProdutos();
  },
  methods: {
    listarCategorias() {
      axios.get('http://localhost:3000/categorias')
        .then(response => {
          this.categorias = response.data;
        })
        .catch(error => {
          console.error('Erro ao buscar categorias', error);
        });
    },
    listarTodosProdutos() {
      axios.get('http://localhost:3000/produtos')
        .then(response => {
          this.produtos = response.data;
        })
        .catch(error => {
          console.error('Erro ao buscar produtos', error);
        });
    },
    listarProdutosPorCategoria() {
      if (!this.categoriaSelecionada) {
        this.listarTodosProdutos();
        return;
      }

      axios.get(`http://localhost:3000/produtos/categoria/${this.categoriaSelecionada}`)
        .then(response => {
          this.produtos = response.data;
        })
        .catch(error => {
          console.error('Erro ao buscar produtos por categoria', error);
        });
    },
    getImagemUrl(foto) {
      return `http://localhost:3000${foto}`;
    }
  }
};
</script>

<style scoped>
.produto-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
}

.produto-imagem {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}
</style>
