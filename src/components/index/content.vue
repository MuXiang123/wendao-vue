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
import centertVue from './center.vue'
import leftVue from './left.vue'
import axios from "axios";
import { getCurrentInstance, ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, defineProps } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
const store = useStore()
onMounted(() => {
    init()
})
const init = () => {
    axios.get('/userInfo')
        .then((resp)=> {
            console.log(resp.data)
            store.commit('setUserInfo', resp.data)     
        })
        .catch((error)=>{
            ElMessage({
                message:error.msg,
                type: 'error'
            })
        })
}
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