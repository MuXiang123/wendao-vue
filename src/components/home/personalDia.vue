<template>
  <div>
    <el-dialog title="修改个人信息" v-model="visitDia" width="60%" :before-close="handleClose" append-to-body center
      align-center>
      <el-form :model="form" :rules="rules" ref="ruleFormsss" label-width="150px">
        <div class="updateinfo">
          <el-form-item label="头像" prop="avatar">
            <el-upload class="avatar-uploader" action="localhost:8081/upload/images" :show-file-list="false"
              :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :http-request="upload"
              list-type="picture">
              <img v-if="form.avatar" :src="form.avatar" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="form.nickname"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex" class="sex">
              <el-radio v-model="form.sex" :label="1" size="large">男</el-radio>
              <el-radio v-model="form.sex" :label="0" size="large">女</el-radio>
            </el-radio-group>
          </el-form-item>
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
          <el-form-item>
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="submit">提 交</el-button>
          </el-form-item>
        </div>
      </el-form>
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
const form = ref({
  avatar: "",
  password: "",
  nickname: "",
  sex: '',
  userId: "",
  signature: "",
  school: ""
})
const ruleFormsss = ref(null);
const rules = ref({
  nickname: [
    { required: true, message: "昵称不能为空", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
  ],
  sex: [
    { required: true, message: '请选择性别', trigger: 'blur' }
  ]
})
let visitDia = ref(false)
const handleClose = () => {
  visitDia.value = false
}
const upload = (file) => {

}
const handleAvatarSuccess = (res, file) => {
  form.avatar = res.data.url
}
const beforeAvatarUpload = (file) => {
  const isPNG = file.type === 'image/png/img/gif/jpg'
  const isLt2M = file.size / 1024 / 1024 < 4
  if (!isPNG) {
    this.$message.error('上传头像图片只能是 image/png/img/gif/jpg 格式!')
  }
  if (!isLt2M) {
    this.$message.error('上传头像图片大小不能超过 4MB!')
  }
  return isPNG && isLt2M
}
const submit = async () => {
  const form = unref(ruleFormsss);
  if (!form) return
  try {
    await form.validate()
    const { username, password, region } = ruleForm
    console.log(username, password, region)
  } catch (error) {
  }
}


defineExpose({
  visitDia,
})

</script>
<style scoped>
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>