<template>
    <div class="index">
        <el-container>
            <el-header class="head">
                <Header></Header>
            </el-header>
            <el-container class="container_content">
                <el-main class="container_main" style="overflow:hidden">
                    <Main></Main>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Header from '../components/banner.vue';
import Main from '../components/home/personal.vue';
const store = useStore();
const route = useRoute();
const router = useRouter();
defineProps({
  id:String
})
</script>

<style scoped>

.container_content {
    width: 100%;
    margin: 0px auto 0;
    background-color: #fafafa;
  }
  
  .container_main {
    position: absolute;
    padding: 0;
    left: 0;
    right: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
    background-color: #fafafa;
  }
  .index{
    overflow:visible;
  }
  .head{
    position: relative;
    width: 100%;
    height: 60px;
  }
</style>