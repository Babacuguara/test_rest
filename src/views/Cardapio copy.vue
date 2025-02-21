<template>
    <div>
      <h2>Cardápio</h2>
      
      <!-- Menu de Categorias -->
      <div class="menu-horizontal">
        <button 
          v-for="categoria in categorias" 
          :key="categoria.id" 
          @click="selecionarCategoria(categoria.id)"
          :class="{ ativo: categoria.id === categoriaSelecionada }"
        >
          {{ categoria.nome }}
        </button>
      </div>
  
      <!-- Listagem de Produtos -->
      <div class="produtos-container">
        <div v-if="produtos.length === 0">Nenhum produto encontrado nesta categoria.</div>
  
        <div v-for="produto in produtos" :key="produto.id" class="produto-card">
          <div>
            <h3>{{ produto.nome }}</h3>
            <p><strong>Descrição:</strong> {{ produto.descricao }}</p>
            <p><strong>Preço:</strong> R$ {{ produto.preco.toFixed(2) }}</p>
          </div>
          <div>
            <img v-if="produto.foto" :src="getImagemUrl(produto.foto)" alt="Foto do Produto" class="produto-imagem" />
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
        produtos: [],
        categoriaSelecionada: null
      };
    },
    mounted() {
      this.listarCategorias();
    },
    methods: {
      listarCategorias() {
        axios.get('http://localhost:3000/categorias')
          .then(response => {
            this.categorias = response.data;
            if (this.categorias.length > 0) {
              this.selecionarCategoria(this.categorias[0].id); // Seleciona a primeira categoria por padrão
            }
          })
          .catch(error => {
            console.error('Erro ao buscar categorias', error);
          });
      },
      selecionarCategoria(categoria_id) {
        this.categoriaSelecionada = categoria_id;
        axios.get(`http://localhost:3000/produtos/categoria/${categoria_id}`)
          .then(response => {
            this.produtos = response.data;
          })
          .catch(error => {
            console.error('Erro ao buscar produtos', error);
          });
      },
      getImagemUrl(foto) {
        return `http://localhost:3000${foto}`;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Menu horizontal */
  .menu-horizontal {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    overflow-x: auto;
    white-space: nowrap;
  }
  
  .menu-horizontal button {
    padding: 10px 15px;
    border: none;
    background-color: #ddd;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    transition: 0.3s;
  }
  
  .menu-horizontal button.ativo {
    background-color: #007bff;
    color: white;
  }
  
  /* Container de produtos */
  .produtos-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .produto-card {
    display: flex;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    width: 600px;
    /* text-align: center; */
  }
  
  .produto-imagem {
    width: 100%;
    height: 150px;
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
  </style>
  