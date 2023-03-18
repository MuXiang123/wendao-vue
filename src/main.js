import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "@/assets/css/main.css"
// 引入自定义全局字体样式表
import '@/assets/font/font.css'
// 引入iconfont的样式（iconfont的使用参照iconfont官网）
import '@/assets/icon/iconfont.css'

import utils from "./utils/utils"
import mavonEditor from 'mavon-editor' //markdown插件
import 'mavon-editor/dist/css/index.css' 
import VueClipboards from 'vue-clipboard3'  //剪切板插件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
    app.use(store)
    app.use(router)
    app.use(mavonEditor)
    app.use(VueClipboards)
    app.mount('#app')
    app.config.globalProperties.$utils = utils
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
