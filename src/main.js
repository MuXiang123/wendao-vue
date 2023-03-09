import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import "./assets/reset.css"
import './assets/css/iconfont.css'
import './assets/css/iconfont.eot'
import './assets/css/iconfont.svg'
import './assets/css/iconfont.ttf'
import './assets/css/iconfont.woff'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
    app.use(store)
    app.use(router)
    app.mount('#app')

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
