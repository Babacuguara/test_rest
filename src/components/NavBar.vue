<template>
    <nav>
        <img src="../assets/logo001-pqqq.png" alt="">
        <ul>
            <li v-for="menu in menus" :key="menu.id">
                <router-link :to="menu.path">{{ menu.nome }}</router-link>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { RouterLink} from 'vue-router';


const menus = [
    {id: 1, nome: "Home", path: "/"},
    {id: 2, nome: "Cardápio", path: "/cardapio"},
    {id: 3, nome: "Sobre", path: "/sobre"},
    {id: 4, nome: "Login", path: "/login"},
]

</script>

<style scoped>
span {
    color: white;
}
nav {
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: red;
    
}
ul {
    display: flex;
    list-style-type: none;

}
ul li {
    padding: 0 5px ;
    
}
ul li a {
    text-decoration: none;
    color: white;
    
}

</style>