<template>

  <div class="container">
    <div class="subcontainer">
      <h2>Adicionar Produto</h2>
      <hr class="linha">
      <form @submit.prevent="adicionarProduto" class="cadastro">
        <div class="img">
          <label for="categoria" class="img">Categoria:</label>
          <select v-model="produto.categoria_id" id="categoria" class="cadastro">
            <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
              {{ categoria.nome }}
            </option>
          </select>
        </div>
        
        <div>
          <label for="nome">Nome:</label>
          <input type="text" id="nome" v-model="produto.nome" required />
        </div>
        
        <div>
          <label for="descricao">Descrição:</label>
          <textarea id="descricao" v-model="produto.descricao"></textarea>
        </div>
        
        <div>
          <label for="unidade">Unidade:</label>
          <input type="text" id="unidade" v-model="produto.unidade" />
        </div>
        
        <div>
          <label for="quantidade">Quantidade:</label>
          <input type="number" id="quantidade" v-model="produto.quantidade" required />
        </div>
        
        <div>
          <label for="preco">Preço:</label>
          <input type="number" id="preco" v-model="produto.preco" required />
        </div>
        
        <div>
          <label for="qtPessoas">Quantidade de Pessoas:</label>
          <input type="number" id="qtPessoas" v-model="produto.qtPessoas" />
        </div>
        
        <!-- <div>
          <label for="foto">Foto (URL):</label>
          <input type="text" id="foto" v-model="produto.foto" />
        </div> -->
        <!-- <div>
          <label for="foto">Foto:</label>
          <input type="file" id="foto" @change="uploadFoto" accept="image/*" />
          <img v-if="produto.foto" :src="produto.foto" alt="Preview" width="100" />
        </div> -->
        <div>
          <label for="foto">Foto:</label>
          <input type="file" id="foto" @change="uploadFoto" accept="image/*" />
          
          <!-- Prévia da imagem -->
          <div v-if="imagemPreview">
            <h4>Prévia da Imagem:</h4>
            <img v-if="produto.foto" :src="imagemPreview" class="imagem-preview" alt="Prévia da Foto" />
          </div>
          
          <!-- <img v-if="produto.foto" :src="produto.foto" alt="Preview" width="100" /> -->
        </div>
        
        <button type="submit">Adicionar Produto</button>
      </form>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      produto: {
        categoria_id: '',
        nome: '',
        descricao: '',
        unidade: '',
        quantidade: '',
        preco: '',
        qtPessoas: '',
        foto: ''
      },
      categorias: [],
      imagemPreview: null
    };
  },
  mounted() {
    // Buscar as categorias ao carregar o componente
    this.listarCategorias();
  },
  methods: {
    listarCategorias() {
      axios.get('http://localhost:3000/categorias') // Rota para buscar as categorias
        .then(response => {
          this.categorias = response.data;
        })
        .catch(error => {
          console.error('Erro ao buscar categorias', error);
        });
    },
    uploadFoto(event) {
      const file = event.target.files[0];
      if (!file) return;

      
    // uploadFoto(event) {
    //   const file = event.target.files[0];
    //   if (file) {
   
    //   }
    // },

      const formData = new FormData();
      formData.append('foto', file);

      axios.post('http://localhost:3000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(response => {
        this.produto.foto = file;
        this.imagemPreview = URL.createObjectURL(file); // Gera uma URL temporária para exibição
        this.produto.foto = response.data.filePath; // Armazena o caminho da imagem no backend
      })
      .catch(error => {
        console.error('Erro ao enviar imagem', error);
        alert('Erro ao enviar imagem.');
      });
    },


    adicionarProduto() {
      // Enviar os dados do produto para o backend
      axios.post('http://localhost:3000/produtos', this.produto)
        .then(response => {
          alert('Produto adicionado com sucesso!');
          // Limpar os campos após sucesso
          this.produto = {
            categoria_id: '',
            nome: '',
            descricao: '',
            unidade: '',
            quantidade: '',
            preco: '',
            qtPessoas: '',
            foto: '',
            imagemPreview: ''
            
          };
      
        })
        .catch(error => {
          console.error('Erro ao adicionar produto', error);
          alert('Ocorreu um erro ao adicionar o produto.');
        });
        
    },
    
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