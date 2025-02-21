<template>
  <div class="container">
    <h2>Adicionar Categoria</h2>
    <form @submit.prevent="adicionarCategoria">
      <div>
        <label for="nome">Nome da Categoria:</label>
        <input type="text" id="nome" v-model="categoria.nome" required />
      </div>
      <button type="submit">Adicionar Categoria</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categoria: {
        nome: ''
      }
    };
  },
  methods: {
    adicionarCategoria() {
      // Enviar a categoria para o backend
      axios.post('http://localhost:3000/categorias', this.categoria)
        .then(response => {
          alert('Categoria adicionada com sucesso!');
          // Limpar o campo após sucesso
          this.categoria.nome = '';
        })
        .catch(error => {
          console.error('Erro ao adicionar categoria', error);
          alert('Ocorreu um erro ao adicionar a categoria.');
        });
    }
  }
};
</script>
<style scoped>
.container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
}
h2 {
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-top: 10px;
}
input, textarea {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  margin-top: 15px;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: #0056b3;
}
</style>