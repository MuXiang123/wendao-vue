<template>
    <!-- 顶部菜单栏 -->
    <div class="header">
        <el-menu mode="horizontal" :default-active="router.currentRoute.value.path" class="el-menu-demo"
            active-text-color="#409eff" text-color="#999999" router="true" :ellipsis="false">
            <router-link to="/">
                <div class="wendao">
                    <img src="src\assets\logo.png" alt="logo">
                    <span class="wendao_title">问道</span>
                </div>
            </router-link>

            <el-menu-item index="/index/article/0">
                首页
            </el-menu-item>
            <el-menu-item index="/video/index">
                视频
            </el-menu-item>
            <div class="flex-grow" />

            <div class="search-bar">
                <el-input v-model="keyword" placeholder="请输入问题" prefix-icon="Search" clearable></el-input>
                <el-button class="el-button" type="primary" @click="onEnterSearch()" round>
                    搜索
                </el-button>
            </div>
            <div class="flex-grow" />
            <el-menu-item index="/article/edit">
                发布
            </el-menu-item>
            <el-menu-item index="/message">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bell"></use>
                </svg>

            </el-menu-item>
            <el-menu-item index="/chat">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-message"></use>
                </svg>
            </el-menu-item>
            <el-sub-menu class="el-sub-menu" router>
                <template #title>
                    <el-avatar :size="50" :src="circleUrl" :fit="fit" @error="errorHandler">
                        <img :src="store.state.userInfo.avatar" alt="">
                    </el-avatar>
                </template>
                <el-menu-item :route="{ name: 'info', params: { id: `${store.state.userInfo.userId}` } }">
                    <el-icon>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-home"></use>
                        </svg>
                    </el-icon>
                    <span class="span">我的主页</span>
                </el-menu-item>
            </el-sub-menu>
        </el-menu>

        <el-dialog class="dialog-wrapper bg" v-model="dialogVisible" align-center>
            <template #header>
                <span class="title">本地搜索</span>
            </template>
            <!-- 输入框 -->
            <div class="search-input-wrapper">
                <label for="search">
                    <svg-icon icon-class="search"></svg-icon>
                </label>
                <input id="search" placeholder="输入文章标题或内容..." v-model="keyword" />
            </div>
            <!-- 搜索结果 -->
            <div class="search-result-wrapper">
                <hr class="divider" />
                <ul v-if="articleList.length">
                    <li class="search-result" v-for="article in articleList" :key="article.articleId">
                        <!-- 文章标题 -->
                        <router-link class="search-title" :to="`/article/detail/${article.articleId}`">
                            <span @click="dialogVisible = false" v-html="article.articleTitle"></span>
                        </router-link>
                        <!-- 文章内容 -->
                        <p class="search-content" v-html="article.articleContent"></p>
                    </li>
                </ul>
                <!-- 搜索结果不存在提示 -->
                <div v-else-if="keyword" class="colorFlag" style="font-size: 0.875rem;margin-top: 1rem;">
                    找不到您查询的内容：{{ keyword }}
                </div>
            </div>
        </el-dialog>
    </div>
</template>
  
<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ref, watchEffect } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useDebounceFn, debouncedWatch } from "@vueuse/core";
import axios from 'axios';
const store = useStore();
const router = useRouter();
const errorHandler = () => false //头像加载失败
const keyword = ref("")
const dialogVisible = ref(false)
const onEnterSearch = () => {
    dialogVisible.value = true
}
const articleList = ref([]);
// useDebounceFn((keyword)=>{
//     keyword.value ? handleSearch() : articleList.value = []
// }, 500)
debouncedWatch(
    keyword,
    () => keyword.value ? handleSearch() : articleList.value = [],
    { debounce: 500 },
);
const handleSearch = () => {
    axios.get('/article/search', {
        params: {
            keyword: keyword.value
        }
    }).then((res) => {
        console.log(res);
        articleList.value = res.data
    })
}
</script>
  
<style scoped>
.title {
    color: var(--color-blue);
    font-size: 1.25rem;
}

.search-input-wrapper {
    display: flex;
    align-items: center;
    padding: 5px;
    height: 35px;
    width: 100%;
    border: 2px solid #409EFF;
    color: var(--text-color);
    border-radius: 2rem;
}

.search-input-wrapper #search {
    width: 100%;
    font-size: 1rem;
    margin-left: 5px;
    color: var(--text-color);
    outline: none;
}

@media (min-width: 960px) {
    .search-result-wrapper {
        padding: 0 3px;
        height: 390px;
        overflow: auto;
    }
}

@media (max-width: 959px) {
    .search-result-wrapper {
        height: calc(100vh - 190px);
        overflow: auto;
    }
}

.search-result {
    margin-top: 1rem;
    font-size: 1rem;
    color: var(--text-color);
}

.search-title {
    font-weight: 700;
    border-bottom: 1px solid #999;
    text-decoration: none;
}

.search-content {
    cursor: pointer;
    border-bottom: 1px dashed #ccc;
    padding: 5px 0;
    line-height: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.divider {
    margin-top: 1.2rem;
    border: 2px dashed var(--color-pink-light-a7);
}

.header {
    display: flex;
    justify-content: center;
}

.wendao {
    display: flex;
    align-items: center;
    margin-right: 20px;
}

.flex-grow {
    flex-grow: 1;
}

.wendao img {
    width: 40px;
    margin-right: 10px;
    margin-top: 10px;
}

.wendao_title {
    color: #409eff;
    font-weight: 600;
    font-size: 20px;
    margin-left: 5px;
    margin-top: 10px;
}

.el-icon {
    color: #999999;
}

.icon-home {
    margin-right: 5px;
}

.search-bar {
    margin-top: 10px;
    color: #999999;
}

.el-button {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 3px;
}

.span {
    color: #999999;
    font-size: 12px;
}

.el-menu-demo {
    background-color: #FFFFFF;
    border: none;
    color: #999999;
    line-height: 20px;
    width: 100%;
}

.el-menu-demo .el-menu-item {
    font-size: 16px;
    padding: 0 20px;
}

.el-menu-demo .el-menu-item.is-active {
    color: #409eff;
    background-color: transparent;
}

.el-menu-demo .el-input {
    width: 400px;
    margin-top: 5px;
}
</style>