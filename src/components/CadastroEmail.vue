<template>
    <div class="cadastro-container">
      <h2>Cadastrar Usuário</h2>
  
      <form @submit.prevent="cadastrarUsuario">
        <label>Nome:</label>
        <input v-model="nome" type="text" required />
  
        <label>Email:</label>
        <input v-model="email" type="email" required />
  
        <label>Senha:</label>
        <input v-model="senha" type="password" required />
  
        <label>Confirmar Senha:</label>
        <input v-model="confirmarSenha" type="password" required />
  
        <button type="submit">Cadastrar</button>
      </form>
  
      <p v-if="mensagem" :class="erro ? 'erro' : 'sucesso'">{{ mensagem }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        mensagem: '',
        erro: false
      };
    },
    methods: {
      cadastrarUsuario() {
        if (this.senha !== this.confirmarSenha) {
          this.mensagem = 'As senhas não coincidem!';
          this.erro = true;
          return;
        }
  
        axios.post('http://localhost:3000/cadastroemail', {
          nome: this.nome,
          email: this.email,
          senha: this.senha
        })
        .then(response => {
          this.mensagem = response.data.message;
          this.erro = false;
          this.nome = '';
          this.email = '';
          this.senha = '';
          this.confirmarSenha = '';
        })
        .catch(error => {
          this.mensagem = error.response?.data?.message || 'Erro ao cadastrar';
          this.erro = true;
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .cadastro-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  button {
    background-color: #007bff;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
  }
  
  .sucesso {
    color: green;
  }
  
  .erro {
    color: red;
  }
  </style>
  