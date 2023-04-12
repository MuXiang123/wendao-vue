<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span class="ziliao">个人资料</span>
          <el-button type="primary" v-if="router.currentRoute.value.params.id == store.state.userInfo.userId"
            @click="edit">编辑</el-button>
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
        <el-descriptions-item label="性别">
          <p v-text="form.sex == 1 ? '男性' : '女性'"></p>
        </el-descriptions-item>
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
  userInfo: Object
})
watchEffect(() => {
  let id = router.currentRoute.value.params.id
  let path = router.currentRoute.value.path
  console.log(path.substring(0, 5));

  if (path.substring(0, 5) == "/home") {
    axios.get('/userInfoId', {
      params: {
        userId: id
      }
    })
      .then((res) => {
        console.log(res);
        form.value = res.data
      }).catch((error) => {
        ElMessage({
          message: error,
          type: '请求用户数据错误'
        })
      })
  } else {
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
})
onMounted(() => {
  loadMsg()
})
const loadMsg = () => {
  let id = router.currentRoute.value.params.id
  if (id == 0 || id == undefined) {
    return
  }
  if (id !== store.state.userInfo.userId) {
    axios.get('/userInfoId', {
      params: {
        userId: id
      }
    })
      .then((res) => {
        console.log(res);
        form.value = res.data
      }).catch((error) => {
        ElMessage({
          message: error,
          type: 'error'
        })
      })
  } else {
    if (id == 0) {
      return
    }
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
}
const edit = () => {
  emit('refresh')
}
</script>
<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ziliao {
  font-size: 22px;
  color: #333;
}
</style>