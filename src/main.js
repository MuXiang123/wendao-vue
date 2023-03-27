import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "@/assets/css/main.css"
// 引入自定义全局字体样式表
import '@/assets/font/font.css'
// 引入iconfont的样式（iconfont的使用参照iconfont官网）
import '@/assets/icon/iconfont.css'

import utils from "./utils/utils.js"
import mavonEditor from 'mavon-editor' //markdown插件
import 'mavon-editor/dist/css/index.css'
import VueClipboards from 'vue-clipboard3'  //剪切板插件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueCookies from 'js-cookie'
import axios from "./api/axios.js";
//引入Elmessage和Elloading的css样式文件
import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';
const app = createApp(App)
app.use(store)
app.use(router)
app.use(mavonEditor)
app.use(VueClipboards)
app.use(VueCookies)
app.config.globalProperties.$utils = utils
app.config.globalProperties.$axios = axios;
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
