<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="ziliao">个人资料</span>
          <el-button type="primary" :if="router.currentRoute.value.params.id === store.state.id" @click="edit">编辑</el-button>
        </div>
      </template>
      <el-descriptions class="margin-top" :column="4" :size="size" border direction="vertical">
        <el-descriptions-item label="头像"> 
          <el-avatar class="avatar" :size="100" :src="form.avatar" shape="square" /> 
        </el-descriptions-item>
        <el-descriptions-item label="昵称">{{ form.nickname }} </el-descriptions-item>
        <el-descriptions-item label="手机号">{{ form.userId }} </el-descriptions-item>
  
        <el-descriptions-item label="学校">
          {{ form.school }}
        </el-descriptions-item>
        <el-descriptions-item label="性别"><p v-text="form.sex == 1 ? '男性' : '女性'"></p></el-descriptions-item>
        <el-descriptions-item label="个性签名">
          {{ form.signature }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
const store = useStore();
const route = useRoute();
const router = useRouter();
const emit = defineEmits(['refresh'])
const form = ref({})
const props = defineProps({
  userInfo:Object
})
onMounted(()=>{
  loadMsg()
})
const loadMsg = () => {
    axios.get('/userInfo')
        .then((res) => {
            form.value = res.data
        }).catch((error) => {
            ElMessage({
                message: error,
                type: 'error'
            })
        })

}
const edit=()=>{
    emit('refresh')
}
</script>
<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ziliao{
  font-size: 22px;
  color: #333;
}
</style>