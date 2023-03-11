<template>
    <el-menu 
    default-active="1" 
    class="el-menu-vertical"
     @open="handleOpen" 
     @close="handleClose"
     text-color="#999999"
     active-text-color="#409eff"
     router
     >
        <el-sub-menu index="artical">
            <template #title>
                <el-icon>
                    <Files />
                </el-icon>
                <span>文章</span>
            </template>
            <el-menu-item :key="i" :index="item.path" v-for="item, i in categoryList">{{ item.category }} </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="video">
            <el-icon>
                <VideoPlay />
            </el-icon>
            <span>视频</span>
        </el-menu-item>
        <el-menu-item index="chat">
            <el-icon>
                <ChatDotRound />
            </el-icon>
            <span>私信</span>
        </el-menu-item>
        <el-menu-item index="publish">
            <el-icon>
                <Plus />
            </el-icon>
            <span>发布</span>
        </el-menu-item>
    </el-menu>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
const store = useStore();
const route = useRoute();
const router = useRouter();
const categoryList = ref([
    {
        category: '考研交流',
        path: 'kaoyan'
    },
    {
        category: '找工作交流',
        path: 'work'
    },
    {
        category: '寻物启事',
        path: 'find'
    },
    {
        category: '拼单拼车',
        path: 'pin'
    },
])
</script>
<style scoped>
.el-menu-vertical {
    width: 263px;
    opacity: 1;
    box-shadow: 0px 2px 5px 0px #d2d2d2;
}</style>