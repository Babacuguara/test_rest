<template>
    <div>
        <h2 class="title titulo">Login</h2>    
        <hr>
        <div class="columns is-centered">
            <div class="column is-half">
                <div v-if="error != undefined">
                    <div class="notification is-danger">
                        {{error}}
                    </div>
                </div>
                <p>E-mail</p>
                <input type="email" placeholder="email@email.com" class="input" v-model="email">
                <p>Senha</p>
                <input type="password" placeholder="******" class="input" v-model="password">
                <hr>
                <button class="button is-success" @click="login">Logar</button>
            </div>
        </div>
    </div>    
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            password: '',
            email: 'Cadastre  email',
            error: undefined,
        }
    },
    methods: {
        login(){
            axios.post("http://localhost:8686/login",{
                password: this.password,
                email: this.email
            }).then(res => {
                console.log(res);
                localStorage.setItem('token',res.data.token);
                this.$router.push({name: 'areadecadastro'});
            }).catch(err => {
                var msgErro = err.response.data.err;
                this.error = msgErro;
            })
        }
    }
}
</script>



<style scoped>
.titulo {
    padding: 50px 0px 0px 0px;
    text-align: center;
}
</style>