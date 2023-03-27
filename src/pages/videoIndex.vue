<template>
  <div class="app">
    <el-container class="el-container">
      <el-aside width="250px" class="aside">
        <el-menu default-active="/video/index" class="aside-menu" :default-active="router.currentRoute.value.path" router="true">
          <el-menu-item index="/video/index" class="el-menu-item">
            <el-icon>
              <HomeFilled />
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-divider />
          <span>分区</span>
          <el-menu-item index="/knowledge">
            <el-icon>
              <Notebook />
            </el-icon>
            <span>知识</span>
          </el-menu-item>
          <el-menu-item index="/science">
            <el-icon>
              <Cpu />
            </el-icon>
            <span>科技</span>
          </el-menu-item>
          <el-menu-item index="/information">
            <el-icon>
              <DataAnalysis />
            </el-icon>
            <span>资讯</span>
          </el-menu-item>
          <el-menu-item index="/sport">
            <el-icon>
              <Monitor />
            </el-icon>
            <span>运动</span>
          </el-menu-item>
          <el-divider />
          <el-menu-item index="/subarea">
            <el-icon>
              <CirclePlusFilled />
            </el-icon>
            <span>浏览分区</span>
          </el-menu-item>
          <el-divider />
          <div class="tishi">
            <p>
              提示：
            </p>
            <p>
              该网站视频信息，视频内容均来源于
              <a src="www.bilibili.com">bilibili</a>
              相关信息通过爬虫获取，仅用于学习。
            </p>
          </div>
        </el-menu>
      </el-aside>
      <el-main class="el-main">
        <router-view ref="rightRef" @refresh="edit"></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
const store = useStore();
const route = useRoute();
const router = useRouter();
</script>

<style scoped>
.app {
  height: 100%;

}

.el-container {
  height: 100%;
}

.aside {
  height: 100%;
}

.el-menu-item {
  border-radius: 10px;
}

.aside-menu {
  font-size: large;
  font-weight: 500;
  text-align: center;
  padding: 5px;
}
.tishi{
  font-size: small;
  font-weight: 100;
}
.el-main{
  overflow-y: scroll;
}
</style>