<template>
  <div id="index">
    <el-container>
      <el-header class="head">
        <Banner></Banner>
      </el-header>
      <el-container class="container_content">
        <el-main class="container_main" style="overflow:hidden">
          <Content></Content>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Banner from "../components/banner.vue";
import Content from "../components/index/content.vue";

</script>

<style lang="scss" scoped>
.container_content {
  width: 100%;
  margin: 0px auto 0;
  background: #fff
}

.container_main {
  position: absolute;
  padding: 0;
  left: 0;
  right: 0;
  top: 60px;
  bottom: 0;
}
.index{
  overflow:visible;
}
.head{
  position: relative;
  width: 100%;
  height: 60px;
}
</style>>

