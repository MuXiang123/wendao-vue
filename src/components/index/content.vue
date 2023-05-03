<template>
    <div class="app">
        <el-container class="container">
            <el-aside class="aside">
                <div class="left">
                    <el-menu default-active="1" class="el-menu-vertical" @open="handleOpen" @close="handleClose"
                        text-color="#999999" active-text-color="#409eff" router="true">
                        <el-sub-menu index="artical">
                            <template #title>
                                <el-icon>
                                    <Files />
                                </el-icon>
                                <span>文章</span>
                            </template>
                            <el-menu-item :key="i" item="id" v-for="(item, i) in categoryList"
                                :index="'/index/article/' + item.id">
                                {{ item.category }}
                            </el-menu-item>
                        </el-sub-menu>
                        <el-menu-item index="/video/index">
                            <el-icon>
                                <VideoPause />
                            </el-icon>
                            <span>视频</span>
                        </el-menu-item>
                        <el-menu-item index="/chat">
                            <el-icon>
                                <ChatDotRound />
                            </el-icon>
                            <span>私信</span>
                        </el-menu-item>
                        <el-menu-item index="/article/edit">
                            <el-icon>
                                <Plus />
                            </el-icon>
                            <span>发布</span>
                        </el-menu-item>
                        <el-menu-item index="/article/hot">
                            <el-icon>
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-fire"></use>
                                </svg>
                            </el-icon>
                            <span>热门文章</span>
                        </el-menu-item>
                    </el-menu>
                </div>
            </el-aside>
            <el-main class="el-main">
                <div class="right">
                    <router-view></router-view>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script setup>
import axios from "axios";
import { getCurrentInstance, ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
const store = useStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
    init()
})
//加载用户数据
const init = () => {
    axios.get('/userInfo')
        .then((resp) => {
            console.log(resp.data)
            store.commit('setUserInfo', resp.data)
        })
        .catch((error) => {
            ElMessage({
                message: error.msg,
                type: 'error'
            })
        })
}
const categoryList = ref([
    {
        category: '考研交流',
        id: 1
    },
    {
        category: '找工作交流',
        id: 2
    },
    {
        category: '寻物启事',
        id: 3
    },
    {
        category: '拼单拼车',
        id: 4
    }, {
        category: '日常学习',
        id: 5
    }, {
        category: '表白墙',
        id: 6
    }, {
        category: '生活趣事',
        id: 7
    }, {
        category: '竞赛组队',
        id: 8
    }, {
        category: '编程技术',
        id: 9
    }
])

</script>
<style scoped>
.container {
    background-color: #fafafa;
    height: calc(100vh - 64px);
}

.aside {
    width: 37%;
    display: flex;
}

.aside ::-webkit-scrollbar {
    width: 0;
}

.left {
    margin-left: 280px;
    margin-top: 20px;
    overflow-y: scroll;
}

.el-main {
    padding: 0;
    margin-top: 20px;
}

.right {
    height: 100%;
}

.el-menu-vertical {
    width: 263px;
    opacity: 1;
    box-shadow: 0px 2px 5px 0px #d2d2d2;
    overflow-y: scroll;
}
</style>