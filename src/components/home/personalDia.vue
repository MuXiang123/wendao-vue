<template>
  <div>
    <el-dialog title="修改个人信息" v-model="visitDia" width="60%" :before-close="handleClose" append-to-body center
      align-center>
      <el-form :model="form" :rules="rules" ref="ruleFormsss" label-width="150px">
        <div class="updateinfo">
          <el-form-item label="头像" prop="avatar">
            <el-upload class="avatar-uploader" :show-file-list="false" :on-success="handleAvatarSuccess"
              action='http://localhost:8081/upload/images' :before-upload="beforeAvatarUpload" auto-upload="true">
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
            <el-input v-model="form.password" show-password type="password" ></el-input>
          </el-form-item>
          <el-form-item label="个性签名" prop="signature">
            <el-input v-model="form.signature"></el-input>
          </el-form-item>
          <el-form-item label="学校" prop="school">
            <el-input v-model="form.school"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="submit(ruleFormsss)">提 交</el-button>
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
import axios from 'axios';
import { ElMessage } from 'element-plus';
import Cookies from 'js-cookie'
const store = useStore();
const route = useRoute();
const router = useRouter();
const form = reactive({
  avatar:'',
  nickname:'',
  sex:Number,
  userId:store.state.userInfo.userId,
  password:'',
  signature:'',
  school:'',
})
const ruleFormsss = ref(null);
onMounted(() => {
  loadMsg()
})
const loadMsg = () => {
  axios.get('/userInfo')
    .then((res) => {
      form.avatar = res.data.avatar
      form.nickname = res.data.nickname
      form.sex = res.data.sex
      form.signature = res.data.signature
      form.school = res.data.school
      console.log(form.userId);
    }).catch((error) => {
      ElMessage({
        message: error,
        type: 'error'
      })
    })

}

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

const handleAvatarSuccess = (res, file) => {
  console.log(res);
  form.avatar = res.data.url
}

const beforeAvatarUpload = (rawFile) => {
  console.log(rawFile.type)
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('请提交JPG格式的文件!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error('图片大小不能超过4MB!')
    return false
  }
  return true
}

const submit = (ruleFormsss) => {
  if (!ruleFormsss) return
  ruleFormsss.validate((valid) => {
    console.log(form);
    if (valid) {
      axios.post('/update/userInfo', {
        userId:form.userId,
        avatar:form.avatar,
        password:form.password,
        sex:form.sex,
        nickname:form.nickname,
        signature:form.signature,
        school:form.school
      }).then((res) => {
        if (res.msg == 'success') {
          let a = document.cookie
          let b = a.split('=')
          Cookies.set(b[0], b[1], '30d')
          console.log(Cookies.get('token'))
          store.commit('setId', form.userId)

          axios.get('/userInfo')
            .then((resp) => {
              console.log(resp.data)
              store.commit('setUserInfo', resp.data)
            })
            .catch((error) => {
              ElMessage({
                message: error.msg,
                type: 'error'
              })
            })
            
          ElMessage({
            type: 'success',
            message: '修改成功',
            onClose: () => {
              window.location.reload()
            }
          })
        }
      }).catch(error => {
        ElMessage.error(error)
      })
    }
  })
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