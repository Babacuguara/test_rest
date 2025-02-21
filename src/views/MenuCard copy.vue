<template>
    <div class="menucard"> 
        <router-link to="/menucard/refeicoes" class="baixo">Refeições</router-link>
        <router-link to="/menucard/petiscos">Petiscos</router-link>
        <router-link to="/menucard/bebidas">Bebidas</router-link>
        <!-- <router-link to="/menucard/bebidas">Bebidas</router-link> -->
        <router-view></router-view>

    </div>
   
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';



</script>
<style scoped>
.menucard{
    /* width: 90%; */
    padding: 20px;
    justify-items: center;
    z-index: 100;
    
    
}
.menucard a {

    position: sticky;
    top: 5px;
    padding: 75px;
    background-color: bisque;
    color: black;
    padding: 15px;
    align-items: center
    
}
.baixo{
    z-index: 1;
}

</style>