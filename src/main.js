import { createApp } from 'vue'
import App from './App.vue'
import { router } from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLinkedin,
  faGithub
} from "@fortawesome/free-brands-svg-icons";
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './assets/app.css'

library.add(faGithub, faLinkedin)
const app = createApp(App)

app.use(router)
app.config.globalProperties.apiUrl = "http://localhost:8000"
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
