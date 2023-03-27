<template>
    <!-- 显示推荐分区 -->
  <div class="top">
    <el-button
    v-for="button in buttons"
    :key="button.text"
    :type="plain"
    text
    bg
    >{{ button.text }}</el-button>
  </div>
  <div class="main">
    <router-view ref="rightRef" @refresh="edit"></router-view>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
const store = useStore();
const route = useRoute();
const router = useRouter();
const button = ref([
    {text:'校园学习'},
    {text:'计算机技术'},
    {text:'软件应用'},
    {text:'热点'},
])

</script>
<style scoped>
</style>