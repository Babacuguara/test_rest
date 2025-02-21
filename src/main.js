import "./css/style.css"
import "./assets/global.css"
import "./assets/cardapio.css"
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '../node_modules/bulma/css/bulma.css'
import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
