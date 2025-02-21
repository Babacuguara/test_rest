import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

import Sobre from '@/views/Sobre.vue'
import Login from '@/components/Login.vue'
import Refeicoes from '@/components/Refeicoes.vue'
import Petiscos from '@/components/Petiscos.vue'
import Bebidas from '@/components/Bebidas.vue'
import Cadastro from '@/components/CadastroEmail.vue'
import Users from '@/components/Users.vue'
import Edit from '@/components/Edit.vue'
import axios from 'axios'
import AreaDeCadastro from '@/views/AreaDeCadastro.vue'
import CadastroProdutos from '@/components/CadastroProdutos.vue'
import CadastroEmail from '@/components/CadastroEmail.vue'
import CadastroCategoria from '@/components/CadastroCategoria.vue'
import ListarProdutos from '@/components/ListarProdutos.vue'
import Cardapio from '@/views/Cardapio.vue'



// function AdminAuth(to, from, next){
//   if(localStorage.getItem('token') != undefined){

//     var req = {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem('token')
//       }
//     }

//     axios.post("http://localhost:3000/validate",{},req).then(res => {
//       console.log(res);
//       next();
//     }).catch(err => {
//       console.log(err.response);
//       next("/login");
//     });
//   }else{
//     next("/login");
//   }
// }

//NOVA FUNÇÃO
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token');
  
//   if (to.meta.requiresAuth && !token) {
//     next('/login');
//   } else {
//     next();
//   }
// });


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,

    },
    {
      path: '/cardapio',
      name: 'cardapio',
      component: Cardapio,
    },
    // {
    //   path: '/menucard',
    //   name: 'menucard',
    //   component: () => import ('../views/Cardapio.vue'),
    //   children:[
    //     {
    //       path: 'refeicoes',
    //       name: 'refeicoes',
    //       component: Refeicoes
    //     },
    //     {
    //       path: 'petiscos',
    //       name: 'petiscos',
    //       component: Petiscos
    //     },
    //     {
    //       path: 'bebidas',
    //       name: 'bebidas',
    //       component: Bebidas
    //     }        
    //   ]
    // },
    {
      path: '/areadecadastro',
      name: 'areadecadastro',
      component: () => import ('../views/AreaDeCadastro.vue'),
      children:[
        {
          path: 'cadastroprodutos',
          name: 'cadastroprodutos',
          component: CadastroProdutos
        },
        {
          path: 'cadastroemail',
          name: 'cadastroemail',
          component: CadastroEmail
        },
        {
          path: 'cadastrocategoria',
          name: 'cadastrocategoria',
          component: CadastroCategoria
        },
        {
          path: 'listarprodutos',
          name: 'listarprodutos',
          component: ListarProdutos
        }

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: Sobre,
    },
    // {
    //   path: '/admin/users',
    //   name: 'users',
    //   component: Users,
    //   beforeEnter: AdminAuth
    // },
    // {
    //   path: '/admin/users/edit/:id',
    //   name: 'userEdit',
    //   component: Edit,
    //   beforeEnter: AdminAuth
    // },
    
  ],
})

export default router
