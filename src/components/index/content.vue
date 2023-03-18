<template>
    <div class="container">
        <el-row :gutter="10">
            <div class="left">
                <el-affix :offset="80">
                    <leftVue></leftVue>
                </el-affix>
            </div>
            <div class="right">
                <centertVue></centertVue>
            </div>
        </el-row>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import centertVue from './center.vue'
import leftVue from './left.vue'
import axios from "axios";

onMounted(() => {
    axios.get('/user')
        .then(function (response) {
            // 处理成功情况
            console.log(response);
        })
        .catch(function (error) {
            // 处理错误情况
            console.log(error);
        })
        .then(function () {
            // 总是会执行
        });
})
</script>
<style scoped>
.container {
    background-color: #fafafa;
    height: 100%;
}

.left {
    margin-left: 260px;
    margin-top: 20px;
    background-color: #fafafa !important;
}

.right {
    margin-top: 20px;
    height: 100%;
}
</style>