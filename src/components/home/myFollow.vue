<template>
  <div class="fanorfollow_box">
    <div class="fanorfollow" v-for="(item, index) in allData">
      <div class="fanorfollow_left">
        <img class="fanorfollow_img" v-image-preview :src="item.avatar" />
      </div>
      <div class="fanorfollow_info">
        <div class="fanorfollow_info_top">
          <span style="color: #666; max-width: 180px" @click="personal(item.id)">{{ item.nickname }}</span>
        </div>
        <div class="fanorfollow_info_bottom">
          <span @click="personal(item.id)">{{ item.signature }}</span>
        </div>
      </div>
      <div class="fanorfollow_botton">
        <el-button @click="follow(item.id)" type="primary" size="small" round icon="el-icon-check"
          v-text="123 > -1 ? '取消关注' : '关注'"></el-button>
      </div>
    </div>
    <div>
      <el-empty v-if="allData.length == 0" :image-size="250" description="这里什么都没有哟"></el-empty>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
const store = useStore();
const route = useRoute();
const router = useRouter();
const allData = ref([
  // {
  //   id: '1231',
  //   nickname:'muxiang',
  //   avatar: 'https://img.js.design/assets/img/61515b3a543d3e0d6e043adb.png',
  //   signature: 'asdfsdfadf'
  // },
])
const personal = (id) => ({

})
const follow = (id) =>({
  
})
</script>
<style scoped >
.fanorfollow_box :hover {
  border-width: 1px;
  border-color: deepskyblue;
}
.fanorfollow_box{
  background-color: white;
  margin-bottom: 20px;
}
.fanorfollow {
  padding: 15px 40px 15px 30px;
  height: 50px;
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