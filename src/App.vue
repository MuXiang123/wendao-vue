<script setup>
import Banner from './components/banner.vue'
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue';
import Cookies from 'js-cookie'
import './assets/icon/iconfont.js'

const store = useStore()
const router = useRouter()
const noMenu = ['/login', '/register']
const state = reactive({
  showMenu: true,
})
router.afterEach((to, from) => {
  state.showMenu = !noMenu.includes(to.path)
})
router.beforeEach((to, from, next) => {
  const userInfo = Cookies.get('token')
  if (to.name === 'login' || to.name==='register') {
    //如果存在用户信息，或者进入的页面是登录页面，则直接进入
    next()
  } else {
    if (!userInfo) {
      next('/login')
    } else {
      //不存在用户信息则说明用户未登录，跳转到登录页面，带上当前的页面地址，登录完成后做回跳，
      //如未登录用户进入用户中心的页面地址，检测到未登录，
      //自动跳转到登录页面，并且带上用户中心的页面地址，登录完成后重新跳到个人中心页面。
      next()
    }
  }
})
</script>

<template>
  <div class="app">
    <el-container v-if="state.showMenu">
      <el-header class="head">
        <Banner></Banner>
      </el-header>
      <el-container class="el-container">
        <el-main class="el-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <el-container v-else class="container">
      <router-view />
    </el-container>
  </div>
</template>

<style scoped>
.app{
  margin: 0;
  padding: 0;
}
.el-container{
  height: 100%;
  margin: 0;
  padding: 0;
}
.el-main{
  height: 100%;
  margin: 0;
  padding: 0;
}


</style>
