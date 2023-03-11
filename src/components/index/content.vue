<template>
    <div class="container">
        <el-row :gutter="30"> 
            <el-col span="10" class="left">
                <leftVue></leftVue>
            </el-col>
            <el-col span="14" class="right">
                <centertVue></centertVue>
            </el-col>
        </el-row >
    </div>
</template>
<script setup>
import { ref } from 'vue'
import centertVue from './center.vue'
import leftVue from './left.vue'

</script>
<style scoped>
.container {
    background-color: #fafafa;
}
.left{
    margin-left: 260px;
    margin-top: 20px;
    background-color: #fafafa !important;
}
.right{
    margin-top: 20px;
}

</style>