<template>
  <div class="app">
    <el-container class="el-container">
      <el-aside width="250px" class="aside">
        <el-menu default-active="/video/index" class="aside-menu" :default-active="router.currentRoute.value.path"
          router="true">
          <el-menu-item index="/video/index" class="el-menu-item">
            <el-icon>
              <HomeFilled />
            </el-icon>
            <span>首页</span>
          </el-menu-item>
<!-- 根据不同页面传入不同分区参数 -->
          <el-divider />
          <span>分区</span>
          <el-menu-item index="/video/area/36">
            <el-icon>
              <Notebook />
            </el-icon>
            <span>知识</span>
          </el-menu-item>
          <el-menu-item index="/video/area/188">
            <el-icon>
              <Cpu />
            </el-icon>
            <span>科技</span>
          </el-menu-item>
          <el-menu-item index="/video/area/202">
            <el-icon>
              <DataAnalysis />
            </el-icon>
            <span>资讯</span>
          </el-menu-item>
          <el-menu-item index="/video/area/177">
            <el-icon>
              <VideoCamera />
            </el-icon>
            <span>纪录片</span>
          </el-menu-item>
          <el-menu-item index="/video/area/234">
            <el-icon>
              <Bicycle />
            </el-icon>
            <span>运动</span>
          </el-menu-item>
          <el-menu-item index="/video/area/160">
            <el-icon>
              <Sunrise />
            </el-icon>
            <span>生活</span>
          </el-menu-item>
          <el-divider />
          <div class="tishi">
            <p>
              提示：
            </p>
            <p>
              该网站视频信息，视频内容均来源于
              <el-link type="primary" href="https://www.bilibili.com/">bilibili</el-link>
              相关信息通过爬虫获取，仅用于学习。
            </p>
          </div>
        </el-menu>
      </el-aside>
      <el-main class="el-main">
        <router-view ref="rightRef"></router-view>
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
const showParent = ref(true)
</script>

<style scoped>

.app {
  height: 100%;

}

.el-container {
  height: calc(100vh - 64px);
}

.aside {
  height: 100%;
  overflow-y: scroll;
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

.tishi {
  font-size: small;
  font-weight: 100;
}
</style>