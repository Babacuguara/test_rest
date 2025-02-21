<template>
  <div class="container">
      <h2>Produtos</h2>
      <table>
          <thead>
              <tr>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Ações</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="produto in produtos" :key="produto.id">
                  <td>{{ produto.nome }}</td>
                  <td>{{ produto.preco }}</td>
                  <td>
                      <button class="btnEditar" @click="editarProduto(produto.id)">Editar</button> |
                      <button class="btnApagar" @click="deletarProduto(produto.id)">Deletar</button>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
      return {
          produtos: []
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
      editarProduto(id) {
          // Implementar lógica para editar produto
      },
      deletarProduto(id) {
          axios.delete(`http://localhost:3000/produtos/${id}`)
              .then(() => {
                  this.listarProdutos();
              })
              .catch(error => {
                  console.error('Erro ao deletar produto', error);
              });
      }
  }
};
</script>
<style scoped>
h1 {
  font-size:xx-large;
}
.container {
  max-width: 600px;
  margin: auto;
  text-align: center;
  border: 100px;
}
.subcontainer {
  background-color: rgba(255, 208, 196, 0.637);
  border-bottom-width: 60px;
}
li{
  padding: 0px 0px;
  /* background-color: darkgreen; */
}
form{
  display: block;
  border-block-end-color: blue;
}
input, textarea {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 8px;
}
.btnEditar {
  background: blue;
  color: white;
  padding: 1px;
  border: none;
  cursor: pointer;
}

.btnApagar {
    background-color: red;
    color: white;
    padding: 1px;
    border: none;
    cursor: pointer;
}.
button:hover {
  background: darkblue;
}
.cadastro {
  display: block;
  /* align-items: center; */
  text-align: left;
}
.lista3 {
  padding: 0px;
  display: flex;
  align-items: center;
  /* background-color: chartreuse; */
}
.lista4{
  /* border: 5px solid blue; */
  width: 250px;
  display: block;
  padding: 0px 50px;
  /* background-color: aquamarine; */
  grid: 10px;
}
.lista1 {
  display: flex;
  padding: 0px 30px;
}
p{
  padding: 0px 50px;
  width: 250px;
  text-align: center;
}
.linha {
  border: 80px;
  background-color: rgb(255, 115, 0);
}
</style>
