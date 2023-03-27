<template>
  <!-- <meta name="referrer" content="no-referrer"> -->
  <meta name="referrer" content="origin ">
  <div>
    <video class="iframe_video"
      src="https://xy60x168x250x177xy.mcdn.bilivideo.cn:4483/upgcxcode/62/87/556558762/556558762-1-16.mp4?e=ig8euxZM2rNcNbRVhwdVhwdlhWdVhwdVhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1679482212&gen=playurlv2&os=mcdn&oi=992470965&trid=0000e27046280aa84271982d813b8ea0871au&mid=0&platform=pc&upsig=d00d2029bd7e2072f7670b6a9bf1f70b&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&mcdnid=11000205&bvc=vod&nettype=0&orderid=0,3&buvid=&build=0&agrr=1&bw=50240&logo=A0000400"
> </video>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute()
const router = useRouter()
const props = ({
  aid: String,
  cid: String,
  page: Number
})
let src = ref("https//player.bilibili.com/player.html?aid=" + props.aid + "&cid=" + props.cid + "&page=" + props.page)

</script>  