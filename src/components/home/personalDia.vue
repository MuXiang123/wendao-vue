<template>
  <div>
    <el-dialog title="修改个人信息" v-model="props.dialogVisible" width="60%" :before-close="handleClose">
      <el-form :model="form" :rules="rules" ref="form" label-width="150px">
        <div class="updateinfo">
          <div class="left">
            <el-form-item label="头像" prop="avatar">
              <img style="width:150px;height:110px" :src="form.avatar"/>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="form.nickname"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="form.sex" class="ml-4">
                <el-radio label="1" size="large">男</el-radio>
                <el-radio label="0" size="large">女</el-radio>
              </el-radio-group>
            </el-form-item>

          </div>
          <div class="right">
            <el-form-item label="手机号" prop="userId">
              <el-input v-model="form.userId" disabled></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="个性签名" prop="signature">
              <el-input v-model="form.signature"></el-input>
            </el-form-item>
            <el-form-item label="学校" prop="school">
              <el-input v-model="form.school"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
const store = useStore();
const route = useRoute();
const router = useRouter();

const props = defineProps(['dialogVisible'])
const form = ref({
  avatar: "https://img.js.design/assets/img/61515b3a543d3e0d6e043adb.png",
  password: "123",
  nickname: "",
  sex: Number,
  userId: "",
  signature: "",
  school: ""
})

</script>
<style scoped lang='sass'>
</style>