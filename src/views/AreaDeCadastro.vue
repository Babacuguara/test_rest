<template>
    <div class="menucard"> 
        <router-link to="/areadecadastro/cadastroemail">Criar Usuário</router-link>
        <router-link to="/areadecadastro/cadastroprodutos">Cadastrar Produtos</router-link>
        <router-link to="/areadecadastro/cadastrocategoria">Cadastrar Categoria</router-link>
        <router-link to="/areadecadastro/listarprodutos">Listar Produtos</router-link>
    </div>
    <router-view></router-view>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';



</script>
<style scoped>
.menucard{
    padding: 20px;
    align-items: center;
}
.menucard a {
    background-color: rgba(255, 208, 196, 0.637);
    width: 200px;
    display: flex;
    padding: 75px;
    /* background-color: bisque; */
    padding: 0px;
    /* justify-content: space-evenly; */
    /* text-align: center; */
}

</style>