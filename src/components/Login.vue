<template>
    <div class="login-container">
      <h2>Login</h2>
  
      <form @submit.prevent="fazerLogin">
        <label>Email:</label>
        <input v-model="email" type="email" required />
  
        <label>Senha:</label>
        <input v-model="senha" type="password" required />
  
        <button type="submit">Entrar</button>
      </form>
  
      <p v-if="mensagemErro" class="erro">{{ mensagemErro }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        senha: '',
        mensagemErro: ''
      };
    },
    methods: {
      fazerLogin() {
        axios.post('http://localhost:3000/login', { email: this.email, senha: this.senha })
          .then(response => {
            localStorage.setItem('token', response.data.token); // Salva o token no navegador
            alert(`Bem-vindo, ${response.data.usuario.nome}!`);
            this.$router.push('/AreaDeCadastro'); // Redireciona para outra página após login
          })
          .catch(error => {
            this.mensagemErro = error.response?.data?.message || 'Erro ao fazer login';
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
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
  
  .erro {
    color: red;
    margin-top: 10px;
  }
  </style>
  