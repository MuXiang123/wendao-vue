<template>
  <meta name="referrer" content="no-referrer">
  <div class="app">
    <iframe class="iframe_video" :src="src" scrolling="no" border="0" frameborder="no" framespacing="0"
      allowfullscreen="true"> </iframe>

    <div class="recommend">
      <el-col>
        <el-row v-for="(rem, item) in recommend" :key="index">
          <div class="recommend-item" @click="action(rem.aid, rem.cid)">
            <el-image :src="rem.pic" :fit="fit" />
            <div class="detail">
              <div class="title">{{ rem.title }} </div>
              <div class="name">{{ rem.owner.name }} </div>
              <span class="view" v-text="bigNumberTransform(rem.stat.vv)"></span>
              <span class="view">次观看 • </span>
              <span class="time" v-text="getFormatTime(rem.ctime * 1000)"></span>
            </div>
          </div>
        </el-row>
      </el-col>
    </div>

    <h3 class="video_title">{{ msg.title }} </h3>

    <div class="owner" v-if="msg.owner">
      <el-avatar :size="50" :src="msg.owner.face"></el-avatar>
      <h4 class="owner_name">{{ msg.owner.name }} </h4>
      <div class="icon_button">
        <el-button type="primary" bg size="large">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-like"></use>
          </svg>
          {{ bigNumberTransform(msg.stat.like) }}
        </el-button>
        <el-button type="primary" bg size="large">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-message"></use>
          </svg>
          {{ bigNumberTransform(msg.stat.reply) }}
        </el-button>
        <el-button type="primary" bg size="large">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-share"></use>
          </svg>
          {{ bigNumberTransform(msg.stat.share) }}
        </el-button>
        <el-button type="primary" bg size="large">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-star"></use>
          </svg>
          收藏
        </el-button>
      </div>
    </div>
    <div class="dynamic">
      <span >{{bigNumberTransform( msg.stat.view )}}次观看 </span>
      <span>{{ getFormatTime(msg.ctime * 1000) }}发布 </span>
      <span style="color:#409EFF;"> #{{ msg.tname }} </span>
      <p class="content" v-if="msg.dynamic">
        {{ msg.dynamic }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ElMessage } from 'element-plus';
const route = useRoute()
const router = useRouter()

let actionInfo = reactive({
  avid: router.currentRoute.value.query.avid,
  cid: router.currentRoute.value.query.cid
})
onBeforeMount(() => {
  loadMsg()
  loadRecommend()
})
const recommend = ref([])
let msg = ref()

const loadMsg = () => {
  axios.get('/video/information', {
    params: {
      aid: actionInfo.avid
    }
  }).then((res) => {
    msg.value = res.data
    console.log(msg.owner)
  }).catch((error) => {
    ElMessage({
      message: '请求错误',
      type: 'error'
    })
  })
}
const loadRecommend = () => {
  axios.get('/video/recommend', {
    params: {
      aid: actionInfo.avid
    }
  }).then((res) => {
    if (res.msg == 'success') {
      recommend.value = res.data
    }
  }).catch((error) => {
    ElMessage({
      message: '请求错误',
      type: 'error'
    })
  })
}
const action = (aid, cid) => {
  router.replace({
    path: '/video/action',
    query: {
      avid: aid,
      cid: cid
    }
  }).then(() => {
    location.reload()
  })

}
let src = ref("//player.bilibili.com/player.html?aid=" + actionInfo.avid + "&cid=" + actionInfo.cid + "&page=" + 1)

//大数转换
const bigNumberTransform = (value) => {
  if (typeof value == 'string') {
    value = Number(value);
  }
  let unit = '';
  let k = 10000;
  let sizes = ['', '万', '亿', '万亿'];
  let i;
  if (value < k) {
    value = value;
  } else {
    i = Math.floor(Math.log(value) / Math.log(k));
    value = ((value / Math.pow(k, i))).toFixed(0);
    unit = sizes[i];
  }
  return value + unit;
}
//时间戳转换
const getFormatTime = (timeStamp) => {
  var dateTime = new Date(timeStamp);
  var no1new = dateTime.valueOf();
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  var second = dateTime.getSeconds();
  var now = new Date();
  var now_new = now.valueOf();
  var milliseconds = 0;
  var timeSpanStr;

  milliseconds = now_new - no1new;

  if (milliseconds <= 1000 * 60 * 1) {
    timeSpanStr = '刚刚';
  } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
    timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
  } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
  } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
  } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
    // timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    timeSpanStr = year + '-' + month + '-' + day
  } else {
    // timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    timeSpanStr = year + '-' + month + '-' + day
  }

  return timeSpanStr;
}
</script>

<style scoped>
.app {
  position: relative;
  margin-left: 70px;
  margin-right: 70px;
  margin-top: 10px;
  height: calc(100vh - 70px);
}

.icon_button {
  margin-left: 28%;
}

.iframe_video {
  margin-left: 10px;
  margin-right: 10px;
  height: 70.5%;
  width: 62%;
  border-radius: 10px;
}


.el-image {
  width: 168px;
  height: 94px;
  border-radius: 10px;

}

.video_title {
  margin-left: 10px;
  width: 900px;
}

.owner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  width: 62%;
}

.owner_name {
  margin-left: -10%;
}

.recommend {
  position: absolute;
  top: 0;
  left: calc(70%);
  display: flex;
  align-items: center;
}

.recommend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  cursor: pointer;
}

.detail {
  flex-grow: 1;
  margin-top: -15px;
}

.title {
  width: 225px;
  height: 44px;
  margin-top: 15px;
  margin-bottom: 5px;
  font-weight: 600;
  line-height: 21px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.name {
  font-size: 10px;
  margin-top: 10px;
  line-height: 2px;
  font-weight: 400;
}

.view,
.time {
  font-size: 10px;
  line-height: 2px;
  font-weight: 400;
}

.icon {
  margin-right: 5px;
}

.dynamic{
  width: 62%;
  height: auto;
  margin-top: 15px;
  margin-left: 10px;
  margin-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 20px;
  padding-bottom: 10px;
  font-weight: 600;
  font-size: 15px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: auto;
  background-color:  #e9e9eb;
  color: #303133;
  border-radius: 10px;
}
</style>

<style>
.icon {
  width: 1rem;
  height: 1rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
