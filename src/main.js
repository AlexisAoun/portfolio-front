import { createApp } from 'vue'
import App from './App.vue'
import { router } from "./router";

import './assets/app.css'

const app = createApp(App)

app.use(router)
app.config.globalProperties.apiUrl = "http://localhost:8000"
app.mount('#app')
