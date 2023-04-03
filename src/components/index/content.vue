<template>
    <div class="app">
        <el-container class="container">
            <el-aside class="aside">
                <div class="left">
                    <leftVue></leftVue>
                </div>
            </el-aside>
            <el-main class="el-main">
                <div class="right">
                    <centertVue></centertVue>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script setup>
import centertVue from './center.vue'
import leftVue from './left.vue'
import axios from "axios";
import { getCurrentInstance, ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
const store = useStore()
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
</script>
<style scoped>
.container {
    background-color: #fafafa;
    height: calc(100vh - 64px);
}
.aside{
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
.el-main{
    padding: 0;
    margin-top: 20px;
}
.right {
    height: 100%;
}
</style>