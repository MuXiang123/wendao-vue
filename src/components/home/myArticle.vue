<template>
  <div class="myart1">
    <Article/>
        <!-- <el-empty
        :image-size="250"
        description="暂未发表任何新闻额"
      ></el-empty> -->
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Article from '../index/center.vue'
const store = useStore();
const route = useRoute();
const router = useRouter();
</script>
<style scoped>
</style>