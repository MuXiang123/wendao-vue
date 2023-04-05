<template>
    <!-- 顶部菜单栏 -->
    <div class="header">
        <el-menu mode="horizontal" :default-active="router.currentRoute.value.path" class="el-menu-demo"
            active-text-color="#409eff" text-color="#999999" ellipsis="false" router="true">
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
            <div class="search-bar">
                <el-input v-model="inputSearch" placeholder="请输入问题" prefix-icon="Search" clearable></el-input>
                <el-button class="el-button" type="primary" @click="onEnterSearch()" round>
                    搜索
                </el-button>
            </div>
            <el-menu-item index="/article/edit">
                发布
            </el-menu-item>
            <el-menu-item index="message">
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
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-home"></use>
                    </svg>
                    <span class="span">我的主页</span>
                </el-menu-item>
            </el-sub-menu>

        </el-menu>
    </div>
</template>
  
<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const store = useStore();
const router = useRouter();
const activeIndex = ref('/index');
const errorHandler = () => false //头像加载失败
const inputSearch = ref("")
const onEnterSearch = () => {
    console.log(inputSearch.value)
    const _self = this;
    const url = "http://38617112yi.zicp.vip/article/search";
    // _self.$axios
    //     .get(url, { params: { keyword: inputSearch } })
    //     .then((res) => {
    //         console.log("搜索的数据", res);
    //         router.push({
    //             name: 'searchDetail',
    //             params: {
    //                 search: res.data.data
    //             }
    //         })
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
}

</script>
  
<style scoped>
.header {
    display: flex;
    justify-content: center;
}

.wendao {
    display: flex;
    align-items: center;
    margin-right: 20px;
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

.icon-home{
    margin-right:5px ;
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
    margin-left: 250px;
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