<template>
  <div>
    <iframe class="iframe_video" src="//player.bilibili.com/player.html?aid=455956933&cid=199198887&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed} from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute()
const router = useRouter()
const props = defineProps({
  aid:String,
  cid:String,
  page:Number
})
let src = ref("https//player.bilibili.com/player.html?aid="+props.aid+"&cid="+props.cid+"&page="+props.page)

</script>  