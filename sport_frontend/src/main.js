import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import NavBar from './components/NavBar.vue'


const app = createApp(App)
const pinia = createPinia()

app.use(pinia)  // 順序很重要: 先使用 pinia, 再使用 router
app.use(router)
app.component('NavBar', NavBar)

app.mount('#app')
