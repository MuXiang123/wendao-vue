<template>
  <div class="app">
    <el-container class="el-container">
      <el-aside width="250px" class="aside">
        <el-menu default-active="/video/index" class="aside-menu" @open="handleOpen" @close="handleClose" router="true">
          <el-menu-item index="VideoIndex"
          :route="{ name: 'VideoCenter'}" class="el-menu-item">
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
        </el-menu>
      </el-aside>
      <el-main>
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

.aside-menu {
  font-size: large;
  font-weight: 500;
  height: 100%;
  text-align: center;

}

.el-menu-item {
  border-radius: 10px;
  padding: 5px;
}</style>