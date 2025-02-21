<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const produto = ref({ codigo: '', id_cat: '', unidade: '', quantidade: '', nome: '', descricao: '', preco: '', qpessoas: '', foto: null });
const produtos = ref([]);


const carregarProdutos = async () => {
  const res = await axios.get('http://localhost:3000/produtos');
  produtos.value = res.data;
};

const cadastrarProduto = async () => {
  const formData = new FormData();
  Object.keys(produto.value).forEach(key => formData.append(key, produto.value[key]));
  
  await axios.post('http://localhost:3000/produtos', formData);
  produto.value = { codigo: '', id_cat: '', unidade: '', quantidade: '', nome: '', descricao: '', preco: '', qpessoas,foto: null };
  carregarProdutos();
};

const removerProduto = async (id) => {
  await axios.delete(`http://localhost:3000/produtos/${id}`);
  carregarProdutos();
};

const editandoId = ref(null);

const editarProduto = (produto) => {
  editandoId.value = produto.id;
  produtoAtual.value = { ...produto };
};

const salvarProduto = async () => {
  const formData = new FormData();
  Object.keys(produtoAtual.value).forEach(key => formData.append(key, produtoAtual.value[key]));

  if (editandoId.value) {
    await axios.put(`http://localhost:3000/produtos/${editandoId.value}`, formData);
    editandoId.value = null; // Resetar edição
  } else {
    await axios.post('http://localhost:3000/produtos', formData);
  }

  produtoAtual.value = { codigo: '', id_cat: '', unidade: '', quantidade: '', nome: '', descricao: '', valor: '', foto: null };
  carregarProdutos();
};


onMounted(carregarProdutos);
</script>

<template>
  <div class="container">
    <h1>Cadastro de Produtos</h1>
    <hr class="linha">
    <div class="subcontainer">
      <form @submit.prevent="cadastrarProduto">
        <div class="cadastro">
          <label for="">Código</label>
          <input v-model="produto.codigo" placeholder="Código" required />
        </div>
        <div class="cadastro">
          <label for="">Categoria</label>
          <input v-model="produto.id_cat" placeholder="Categoria" required />
        </div>
        <div class="cadastro">
          <label for="">Unidade</label>
          <input v-model="produto.unidade" placeholder="Unidade" />
        </div>
        <div class="cadastro">
          <label for="">Quantidade</label>
          <input v-model.number="produto.quantidade" type="number" placeholder="Quantidade" />
        </div>
        <div class="cadastro">
          <label for="">Nome</label>
          <input v-model="produto.nome" placeholder="Nome do Produto" required />
        </div>
        <div class="cadastro">
          <label for="">Descrição</label>
          <textarea v-model="produto.descricao" placeholder="Descrição"></textarea>
        </div>
        <div class="cadastro">
          <label for="">Valor</label>
          <input v-model.number="produto.preco" type="number" step="0.01" placeholder="Valor" required />
        </div>
        <div class="cadastro">
          <label for="">Pessoas</label>
          <input v-model.number="produto.qpessoas" type="number" step="0.01" placeholder="Quantidade Pessoas" required />
        </div>
        <div class="cadastro">
          <label for="">Foto</label>
          <input type="file" @change="e => produto.foto = e.target.files[0]"/>
        </div>
        <div class="cadastro">
          <button type="submit">Adicionar Produto</button>
        </div>
        <hr>
      </form>
    </div>
    

    <ul v-if="produtos.length">
      <div class="lista1">
        <p>Produtos</p>
        <p>Códigos</p>
        <p>Preço</p>
        <p>Foto</p>
        <p>Ações</p>
      </div>
      <li v-for="p in produtos" :key="p.id">
        <br>
        <div class="lista3">
          <div class="lista4"><strong>{{ p.nome }}</strong></div>
          <div class="lista4">{{ p.codigo }}</div>
          <div class="lista4">R$ {{ p.preco }} </div>
          <div class="lista4">
            <img v-if="p.foto" :src="'http://localhost:3000/produtos/' + p.foto" alt="Foto do Produto" width="50">
          </div>
          <div class="lista4">
            <button @click="editarProduto(p)">Editar</button>
            <button @click="removerProduto(p.id)">Remover</button>
          </div>
        </div>
        
        
      </li>
    </ul>
    <p v-else>Nenhum produto cadastrado.</p>
  </div>
</template>

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
button {
  background: blue;
  color: white;
  padding: 8px;
  border: none;
  cursor: pointer;
}
button:hover {
  background: darkblue;
}
.cadastro {
  display: flex;
  align-items: center;
  text-align: center;
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
