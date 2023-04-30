<template>
    <el-row>
        <el-col :span="11" class="left">
            <img src="../assets/login/register.png">
        </el-col>
        <el-col :span="13" class="right">
            <div class="wellcome">注册新的账号</div>
            <br>
            <div class="register">
                <span class="register1">前往登录账号</span>
                <span class="register2" @click="goLogin()">登录</span>
            </div>
            <el-form class="form" label-position="top" label-width="100px" :model="formLabelAlign" size="large"
                ref="registerForm" :rules="rules">
                <el-form-item label="昵称" prop="nickName">
                    <el-input v-model="formLabelAlign.nickName" />
                </el-form-item>
                <el-form-item label="手机号" prop="userId">
                    <el-input v-model="formLabelAlign.userId" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formLabelAlign.password" show-password type="password" />
                </el-form-item>
                <el-form-item>
                    <el-button class="button" type="info" dark=true @click="onSubmit">注册</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from '../api/axios.js'
import { ElMessage, ElNotification } from 'element-plus'
import { genTestUserSig, EXPIRETIME } from '../TUIKit/debug/GenerateTestUserSig'
const router = useRouter()
const route = useRoute()
const registerForm = ref();
const formLabelAlign = reactive({
    userId: '',
    password: '',
    nickName: ''
})

const goLogin = () => {
    router.push({
        name: 'login'
    })
}
const rules = reactive({
    userId: [
        { required: true, message: '手机号不能为空', trigger: 'blur' },
        { min: 11, max: 11, message: '请输入长度为11位的手机号', trigger: 'blur' },
    ],
    password: [
        { required: 'true', message: '密码不能为空', trigger: 'blur' }
    ],
    nickName: [
        { required: 'true', message: '昵称不能为空', trigger: 'blur' }
    ]
})
const onSubmit = async () => {
    await registerForm.value.validate((valid) => {
        if (valid) {
            axios.post('/register/verifyRegisterInfo', {
                nickName: formLabelAlign.nickName || '',
                userId: formLabelAlign.userId || '',
                password: formLabelAlign.password
            }).then(res => {
                if (res.code == 0) {
                    ElMessage({
                        message: '注册成功',
                        type: 'success',
                        onClose: () => {
                            router.push({
                                name: 'login'
                            })
                        }
                    })
                } else {
                    ElMessage({
                        message: res.msg,
                        type: 'error',
                    })
                }
            })



        } else {
            console.log('提交错误!!')
            return false;
        }
    })
}
</script>

<style scoped>
.left {
    left: 0px;
    top: 0px;
    height: 100%;
    opacity: 1;
    background: rgba(240, 245, 255, 1);
}

.left img {
    display: block;
    max-height: 100vh;
    width: auto;
}

.right {
    height: 100%;
    position: relative;
}

.wellcome {
    /** 文本1 */
    font-size: 40px;
    font-weight: 500;
    letter-spacing: 5px;
    line-height: 10px;
    margin-top: 149px;
    margin-left: 140px;
    color: rgba(63, 102, 255, 1);
    vertical-align: middle;
    font-family: PingFang SC;
}

.register {
    padding-top: 15px;
    text-align: left;
    margin-left: 140px;
}

.register1 {
    font-size: 8px;
    font-weight: 500;
    letter-spacing: 2px;
    line-height: 2px;
    color: rgba(176, 183, 208, 1);
    text-align: left;
    vertical-align: middle;
}

.register2 {
    margin-left: 5px;
    font-size: 8px;
    font-weight: 300;
    letter-spacing: 2px;
    line-height: 2px;
    color: rgba(63, 102, 255, 1);
    text-align: left;
    vertical-align: middle;
    cursor: pointer;
}

.form {
    max-width: 460px;
    margin-left: 140px;
    margin-top: 20px;
    height: 70px;
    font-size: 14px;
    font-weight: 500;
}

.button {
    left: 960px;
    margin-top: 20px;
    width: 460px;
    height: 40px;
    opacity: 0.4;
    border-radius: 6px;
    background: rgba(63, 102, 255, 1);
}
</style>