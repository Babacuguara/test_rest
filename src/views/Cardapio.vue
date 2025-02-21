<template>
  <div>
    <!-- Menu Horizontal de Categorias -->
    <nav class="menu-horizontal">
      <button
        v-for="categoria in categorias"
        :key="categoria.id"
        @click="selecionarCategoria(categoria.id)"
        :class="{ ativo: categoriaSelecionada === categoria.id }"
      >
        {{ categoria.nome }}
      </button>
    </nav>

    <!-- Lista de Produtos por Categoria -->
    <div v-if="categoriaSelecionada !== null">
      <h2 v-if="categoriaAtual">{{ categoriaAtual.nome }}</h2>
      
      <div v-if="categoriaAtual.produtos.length === 0">
        Nenhum produto encontrado nesta categoria.
      </div>
      <div class="produtos-container">
        <div v-for="produto in categoriaAtual.produtos" :key="produto.id" class="produto-card">
          <div class="card">
            <h3>{{ produto.nome }}</h3>
            <p>{{ produto.descricao }}</p>
            <p><strong>Preço:</strong> R$ {{ produto.preco.toFixed(2) }}</p>
          </div>
          <div class="img">
            <img v-if="produto.foto" :src="getImagemUrl(produto.foto)" alt="Foto do Produto" class="produto-imagem" />
            <p class="pessoa">Serve <br> {{ produto.qtpessoas }} <br> Pessoas</p>
          </div>
        </div>
      </div>

      
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categorias: [],
      categoriaSelecionada: null
    };
  },
  computed: {
    categoriaAtual() {
      return this.categorias.find(cat => cat.id === this.categoriaSelecionada) || null;
    }
  },
  mounted() {
    this.carregarCategoriasComProdutos();
  },
  methods: {
    carregarCategoriasComProdutos() {
      axios.get('http://localhost:3000/categorias-com-produtos')
        .then(response => {
          this.categorias = response.data;
          if (this.categorias.length > 0) {
            this.categoriaSelecionada = this.categorias[0].id; // Seleciona a primeira categoria por padrão
          }
        })
        .catch(error => {
          console.error('Erro ao carregar categorias e produtos:', error);
        });
    },
    selecionarCategoria(id) {
      this.categoriaSelecionada = id;
    },
    getImagemUrl(foto) {
      return foto ? `http://localhost:3000${foto}` : 'https://via.placeholder.com/150';
    }
  }
};
</script>

<style scoped>
/* Estilizando o Menu Horizontal */
.menu-horizontal {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding: 10px;
  background-color: #f8f8f8;
  border-bottom: 2px solid #ddd;
}

.menu-horizontal button {
  padding: 10px 15px;
  margin-right: 10px;
  border: none;
  background: #ddd;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
}

.menu-horizontal button.ativo {
  background: #007bff;
  color: white;
}

/* Estilizando os produtos */

  /* Container de produtos */
.produtos-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}
.produto-card {
  border: 1px solid #ddd;
  /* padding: 10px;
  margin: 10px; */
  border-radius: 8px;

  max-width: 450px;
  display: flex;
}

.produto-imagem {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
}
h3 {
    background-color: #e2e6ea;
    padding: 5px;
    color:red;
    font-size: large;
    text-align: center;
  }
  p {
    padding: 5px;
  }
  .card {
    width: 75%;
    border: 1px solid #ddd;
    padding: 5px;
    margin: 5px;
    border-radius: 8px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    max-width: 450px;
    
  }
  .img {
    padding: 5px;
    width: 25%;
    justify-items: center;
  }
  .pessoa {
    background-color: black;
    color: #e2e6e4;
    text-align: center;
    margin-top: 3px;
    justify-content: center;
    align-items: center;
    width: 45%;
    border-radius: 5px;
    font-size: xx-small;
  }
</style>
