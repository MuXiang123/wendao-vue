<template>
  <!-- 显示推荐分区 -->
  <div class="top">
    <el-button v-for="button in buttons" :key="button.text" :type="plain" text bg class="top-button">{{ button.text
    }}</el-button>
  </div>
  <div class="center">
    <el-row :gutter="20">
      <el-col :span="8">    <videoItem :msg="msg"></videoItem></el-col>
      <el-col :span="8">    <videoItem :msg="msg"></videoItem>></el-col>
      <el-col :span="8">    <videoItem :msg="msg"></videoItem></el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import  videoItem from './videoItem.vue'
const store = useStore();
const route = useRoute();
const router = useRouter();
const buttons = ref([
  { text: '校园学习' },
  { text: '计算机技术' },
  { text: '软件应用' },
  { text: '热点' },
])
const msg = ref({
  bvid: 'BV1MY4y117GJ',
  copyright: 1,
  videos: 1,
  pic: 'http://i2.hdslb.com/bfs/archive/7c4819d6b2074de8556be64d41030aaf9ef4623e.jpg',
  title: '建议出台反网络暴力法，建立网暴黑名单机制',
  tid: 203,
  ctime: 1677733534,
  dimension: {
    rotate: 0,
    width: 1920,
    height: 1080
  },
  pubdate: 1677733534,
  owner: {
    face: 'https://i0.hdslb.com/bfs/face/26ba4fbc996b05be9aa6c883d1f64c734f6ef313.jpg',
    name: '四川观察',
    mid: 487614876
  },
  stat: {
    now_rank: 0,
    vv: 273827,
    like: 64300,
    dislike: 0,
    his_rank: 0,
    view: 273827,
    danmaku: 925,
    share: 1384,
    reply: 1316,
    aid: 652786928,
    favorite: 2993,
    vt: 0,
    coin: 4190
  },
  pub_location: '四川',
  tname: '热点',
  aid: 652786928,
  desc: '近日，全国人大代表李东生认为，网络暴力屡禁不绝，法律层面缺乏精确定义，造成了违法成本低、维权成本高的难题。李东生建议：①尽快出台《反网络暴力法》，以明确的法律条文指导司法实践；②构建网暴技术识别模型，建立快速举报通道，降低取证难度；③建议建立网暴黑名单，对个人或机构采取长期限流、禁言、关闭账号等处理措施。',
  cid: 1034607703,
  first_frame: 'http://i1.hdslb.com/bfs/storyff/n230302a21ois7l5d7cqha3qlp28h7n9_firsti.jpg'
})
</script>
<style scoped>
.top-button {
  border-radius: 10px;
}
.center{
  margin-top: 20px;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>