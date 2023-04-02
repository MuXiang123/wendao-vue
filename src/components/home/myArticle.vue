<template>
  <div class="myart1">
    <Article v-if=""/>
        <el-empty
        :image-size="250"
        description="暂未发表任何文章额"
      ></el-empty>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Article from '../index/center.vue'
import axios from 'axios';
const store = useStore();
const route = useRoute();
const router = useRouter();
onMounted({
  load()
})
const load = (()=>{
  axios.get
})
</script>
<style scoped>
</style>