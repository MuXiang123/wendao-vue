<template>
  <!-- 显示推荐分区 -->
  <div class="top">
    <el-button v-for="button in buttons" :key="button.text" :type="plain" text bg class="top-button">{{ button.text
    }}</el-button>
  </div>
  <div class="center">
    <el-row :gutter="5" v-for="(row, index) in computedRows" :key="index">
      <el-col v-for="(col, colIndex) in row" :key="colIndex" :span="8">
        <videoItem :msg="col"></videoItem>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import videoItem from './videoItem.vue'
import axios from '../../api/axios.js'
import { ElMessage } from 'element-plus';
const store = useStore();
const route = useRoute();
const router = useRouter();
//全部
const buttons = ref([
  { text: '校园学习' },
  { text: '计算机技术' },
  { text: '软件应用' },
  { text: '热点' },
])
const msg = ref([])
onMounted(() => {
  onload()
})
//加载首页数据
const onload = () => {
  //获取热门推荐
  axios.get("/video/popular", {
    params: {
      pageNum: changePage.currentPage,
      pageSize: 24,
    }
  }).then((res) => {
    if (res.data.list.length == 0) {
      ElMessage({
        message: '当前目录没有信息',
        type: 'error'
      })
    } else {
      msg.value = res.data.list
      changePage.total = res.data.list.length
      console.log(msg.value)
    }
  }).catch((error) => {
    ElMessage({
      message: '请求错误',
      type: 'error'
    })
  })
}

const changePage = reactive({
  currentPage: 1,
  total: 0,
  pageSize: 24,
})
//对分页数据取整
const computedRows = computed(() => {
  const rows = [];
  const rowCount = Math.ceil(msg.value.length / 3);
  for (let i = 0; i < rowCount; i++) {
    const cols = [];
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      if (index < msg.value.length) {
        cols.push(msg.value[index]);
        continue
      }
    }
    rows.push(cols);
  }
  return rows;
});
</script>

<style scoped>
.top-button {
  border-radius: 10px;
}

.center {
  margin-top: 20px;
}

.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.el-row {
  margin-bottom: 90px;
}

.footer {
  padding-top: 20px;
  padding-bottom: 10px;
}
</style>