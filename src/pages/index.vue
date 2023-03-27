<template>
  <div id="index">
    <div>
      <div class="container_content">
        <div class="container_main">
          <Content></Content>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Content from "../components/index/content.vue";

</script>

<style lang="scss" scoped>
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
</style>>

