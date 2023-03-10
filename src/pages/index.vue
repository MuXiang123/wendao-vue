<template>
  <div id="index">
    <el-container >
      <el-header style="padding: 0">
        <Banner></Banner>
      </el-header>
      <el-container class="container_content">
        <el-main class="container_main">
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
.container_main{
  padding: 0;
}
</style>>

