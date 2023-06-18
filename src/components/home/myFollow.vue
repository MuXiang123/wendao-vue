<template>
  <div class="fanorfollow_box">
    <div class="fanorfollow" v-for="(item, index) in allData">
      <div class="fanorfollow_left">
        <img class="fanorfollow_img" v-image-preview :src="item.avatar" />
      </div>
      <div class="fanorfollow_info">
        <div class="fanorfollow_info_top">
          <span style="color: #666; max-width: 180px" @click="personal(item.userId)">{{ item.userId }}</span>
        </div>
        <div class="fanorfollow_info_bottom">
          <span @click="personal(item.userId)">{{ item.signature }}</span>
        </div>
      </div>
      <div class="fanorfollow_botton" v-if="currentUser">
        <el-button @click="follow(item.userId, index)" type="primary" size="small" round icon="el-icon-check"
          v-text="isFollow[index] == 0 ? '取消关注' : '关注'"></el-button>
      </div>
    </div>
    <div>
      <el-empty v-if="allData.length == 0" :image-size="250" description="你还没有关注哦"></el-empty>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ElMessage } from 'element-plus';
const store = useStore();
const route = useRoute();
const router = useRouter();
const allData = ref([])
const isFollow = ref([])
const currentUser = ref(true)
const personal = (tid) => {
  router.push({
    path: '/home/info/' + `${tid}`,
  })
}
const follow = (id, index) => {
  if (id == 0 || id == undefined) {
    return
  }
  if (id !== store.state.userInfo.userId) {
    if (isFollow.value[index] == 0) {
      axios.get('/follow/cancel', {
        params: {
          followId: id
        }
      }).then((res) => {
        isFollow.value[index] = 1
        ElMessage({
          type: 'success',
          message: '取消成功'
        })
      })
    } else {
      axios.get('/follow/add', {
        params: {
          followId: id
        }
      }).then((res) => {
        isFollow.value[index] = 0
        ElMessage({
          type: 'success',
          message: '关注成功'
        })
      })
    }
  }
}
const load = () => {
  if (router.currentRoute.value.params.id == store.state.userInfo.userId) {
    currentUser.value = true
  } else {
    currentUser.value = false
  }
  axios.get('/follow/list', {
    params: {
      userId: router.currentRoute.value.params.id
    }
  })
    .then((res) => {
      console.log(res);
      for (var i = 0; i < res.data.length; i++) {
        allData.value[i] = res.data[i]
        isFollow.value[i] = 0
      }
      console.log(allData);
    })
}
onMounted(() => {
  load()
})
</script>
<style scoped >
.fanorfollow_box :hover {
  border-width: 1px;
  border-color: deepskyblue;
}

.fanorfollow_box {
  background-color: white;
  margin-bottom: 20px;
}

.fanorfollow {
  padding: 15px 40px 15px 30px;
  display: flex;
  align-items: center;
  border: 1px solid #ebebeb;
}

.fanorfollow :hover {
  border-width: 1px;
  border-color: deepskyblue;
}

.fanorfollow_left {
  width: 60px;
  height: 60px;
}

.fanorfollow_img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #ebebeb;
  vertical-align: top;
}

.fanorfollow_info {
  display: inline-block;
  margin-left: 25px;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  overflow: hidden;
  text-align: left;
}

.fanorfollow_info_top {
  display: inline-block;
  font-size: 10;
  line-height: 14px;
  vertical-align: top;
  cursor: pointer;
}

.fanorfollow_info_top :hover {
  color: deepskyblue;
}

.fanorfollow_info_bottom {
  line-height: 14px;
  color: #999;
  margin-top: 5px;
  cursor: pointer;
}

.fanorfollow_info_bottom :hover {
  color: deepskyblue;
}
</style>