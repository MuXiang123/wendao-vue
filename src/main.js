import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "@/assets/font/font.css";
import "@/assets/styles/index.scss";
import '@/assets/icon/iconfont.css'

import utils from "./utils/utils.js"

import VueClipboards from 'vue-clipboard3'  //剪切板插件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueCookies from 'js-cookie'
import axios from "./api/axios.js";
//引入Elmessage和Elloading的css样式文件
import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

import { TUIComponents, TUICore, genTestUserSig } from './TUIKit';
// import TUICallKit
import { TUICallKit } from '@tencentcloud/call-uikit-vue';

const SDKAppID = 1400807520; // Your SDKAppID

// init TUIKit
const TUIKit = TUICore.init({
  SDKAppID,
});
// TUIKit add TUIComponents
TUIKit.use(TUIComponents);
// TUIKit add TUICallKit
TUIKit.use(TUICallKit);

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});
const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueClipboards)
app.use(VueCookies)
app.use(VMdPreview)
app.use(TUIKit)
app.config.globalProperties.$utils = utils
app.config.globalProperties.$axios = axios;
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
