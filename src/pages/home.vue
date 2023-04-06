<template>
  <div class="index">
    <div class="container_content" >
      <div class="container_main">
        <Main></Main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Main from '../components/home/personal.vue';
const store = useStore();
const route = useRoute();
const router = useRouter();
defineProps({
  id: String
})
</script>

<style scoped>
.container_content {
  width: 100%;
  margin: 0px auto 0;
}

.container_main {
  position: absolute;
  padding: 0;
  left: 0;
  right: 0;
  top: 60px;
  bottom: 0;
  background-color: #fafafa;
  overflow-x: hidden;
}

.head {
  position: relative;
  width: 100%;
  height: 60px;
}
</style>