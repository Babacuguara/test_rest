<template>
    <div class="container">
        <h3>Registro de usuário!</h3>    
        <hr>

        <div class="columns is-centered">
            <div class="column is-half">
                <div v-if="error != undefined">
                    <div class="notification is-danger">
                        {{error}}
                    </div>
                </div>
                <p>Nome</p>
                <input type="text" placeholder="Nome do usuário" class="input" v-model="name">
                <p>E-mail</p>
                <input type="email" placeholder="email@email.com" class="input" v-model="email">
                <p>Senha</p>
                <input type="password" placeholder="******" class="input" v-model="password">
                <hr>
                <button class="button is-success" @click="register">Cadastrar</button>
            </div>
        </div>
    </div>    
</template>

<script>
import axios from 'axios';

export default {

    data(){
        return {
            name: '',
            password: '',
            email: 'Cadastre o Email',
            error: undefined,
        }
    },
    methods: {
        register(){
            axios.post("http://localhost:8686/user",{
                name: this.name,
                password: this.password,
                email: this.email
            }).then(res => {
                console.log(res);
                this.$router.push({name: 'home'});
            }).catch(err => {
                var msgErro = err.response.data.err;
                this.error = msgErro;
            })
        }
    }
}
</script>

<style scoped>
.container {
    text-align: center;
}
.columns {
  max-width: 600px;
  margin: auto;
  /* text-align: center; */
  border: 100px;
  background-color: rgba(255, 208, 196, 0.637);
}


</style>