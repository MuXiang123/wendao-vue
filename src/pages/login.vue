<template>
    <el-row>
        <el-col :span="11" class="left">
            <img class="img" src="../assets/login/left.png">
        </el-col>
        <el-col :span="13" class="right">
            <div class="wellcome">欢迎登录问道</div>
            <br>
            <div class="register">
                <span class="register1">注册你的账号</span>
                <span class="register2" @click="goRegister()">注册</span>
            </div>
            <el-form class="form" 
             label-position="top" 
             label-width="100px" 
             :model="formLabelAlign"
                size="large">
                <el-form-item label="手机号">
                    <el-input v-model="formLabelAlign.userId" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="formLabelAlign.password" show-password type="password" />
                </el-form-item>
                <el-form-item>
                    <el-button class="button" type="info" dark="isDark" @click="onSubmit()">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
import { reactive, ref } from 'vue';
import { useRouter,useRoute } from 'vue-router';

export default {

    name: "login",
    setup() {
        const router = useRouter()
        const route = useRoute()
        const formLabelAlign = reactive({
            userId: '',
            password: ''
        })

        const onSubmit = () => {
            
        }
        const goRegister = () =>{
            router.push({
                name:'register'
            })
        }
        const rules = reactive({
            username: [
                { required: true, message: '手机号不能为空', trigger: 'blur' },
                { type: 'number', message: '请输入正确的手机号' },
                { min: 11, max: 11, message: '请输入长度为11位的手机号', trigger: 'blur' },
            ]
        })
        return {
            formLabelAlign,
            rules,
            onSubmit,
            goRegister,
        }
    }
}
</script>
<style scoped>
.left {
    margin-left: 0px;
    margin-top: 0px;
    height: 100%;
    opacity: 1;
}
.left .img{
    width: 100%;
}

.right {
    height: 100%;
    width: 100%;
    position: relative;
}

.wellcome {
    /** 文本1 */
    font-size: 40px;
    font-weight: 500;
    letter-spacing: 5px;
    line-height: 10px;
    margin-top: 149px;
    margin-right: 288px;
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
