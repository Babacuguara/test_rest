<template>
  <div>
    <h2>Lista de Produtos</h2>
    <div v-if="produtos.length === 0">Nenhum produto encontrado.</div>

    <div v-for="produto in produtos" :key="produto.id" class="produto-card">
      <img v-if="produto.foto" :src="getImagemUrl(produto.foto)" alt="Foto do Produto" class="produto-imagem" />
      <h3>{{ produto.nome }}</h3>
      <p>{{ produto.descricao }}</p>
      <p><strong>Preço:</strong> R$ {{ produto.preco.toFixed(2) }}</p>

      <button @click="editarProduto(produto)">✏️ Editar</button>
      <button @click="deletarProduto(produto.id)">🗑️ Excluir</button>
    </div>

    <!-- Modal de Edição -->
    <div v-if="showModal" class="modal">
      
      <h3>Editar Produto</h3>
      <input v-model="produtoEditando.nome" placeholder="Nome" />
      <input v-model="produtoEditando.descricao" placeholder="Descrição" />
      <input v-model.number="produtoEditando.preco" placeholder="Preço" type="number" step="0.01" />
      <input type="file" @change="selecionarImagem" />

      <button @click="salvarEdicao">Salvar</button>
      <button @click="fecharModal">Cancelar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      produtos: [],
      produtoEditando: null,
      novaFoto: null,
      showModal: false, // Controle do modal
    };
  },
  mounted() {
    this.listarProdutos();
  },
  methods: {
    listarProdutos() {
      axios.get('http://localhost:3000/produtos')
        .then(response => {
          this.produtos = response.data;
        })
        .catch(error => {
          console.error('Erro ao buscar produtos', error);
        });
    },
    getImagemUrl(foto) {
      return `http://localhost:3000${foto}`;
    },
    editarProduto(produto) {
      console.log("Produto para edição:", produto); // Depuração
      this.produtoEditando = { ...produto }; // Clona o objeto para evitar mudanças diretas
      this.$nextTick(() => {
        this.showModal = true; // Agora garantimos que o Vue detecte a mudança
        console.log("showModal:", this.showModal); // Depuração
      });
    },
    fecharModal() {
      this.showModal = false;
      this.produtoEditando = null;
      this.novaFoto = null;
    },
    selecionarImagem(event) {
      this.novaFoto = event.target.files[0];
    },
    salvarEdicao() {
      const formData = new FormData();
      formData.append('nome', this.produtoEditando.nome);
      formData.append('descricao', this.produtoEditando.descricao);
      formData.append('preco', this.produtoEditando.preco);
      formData.append('categoria_id', this.produtoEditando.categoria_id);

      if (this.novaFoto) {
        formData.append('foto', this.novaFoto);
      }

      axios.put(`http://localhost:3000/produtos/${this.produtoEditando.id}`, formData)
        .then(() => {
          this.fecharModal();
          this.listarProdutos();
        })
        .catch(error => {
          console.error('Erro ao salvar edição', error);
        });
    },
    deletarProduto(id) {
      if (confirm('Tem certeza que deseja excluir este produto?')) {
        axios.delete(`http://localhost:3000/produtos/${id}`)
          .then(() => {
            this.listarProdutos();
          })
          .catch(error => {
            console.error('Erro ao excluir produto', error);
          });
      }
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

button {
  margin-right: 10px;
  padding: 5px 10px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

/* .modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
} */

.modal {
  display: block !important; /* Força o modal a aparecer */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}


.modal h3 {
  margin-bottom: 10px;
}
</style>
