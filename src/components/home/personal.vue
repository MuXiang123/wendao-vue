<template>
    <div>
        <div class="top">
            <div class="top_img">
                <el-avatar :size="130" :src="user.avatar" />
            </div>
            <div class="text">
                <div class="user_text">
                    <div class="user_name">
                        <span>{{ user.nickname }} </span>
                    </div>
                    <div class="user-school" v-if="user.school != ''">
                        <el-icon color="#F18F1C">
                            <Flag />
                        </el-icon>
                        <span class="user-school-font">{{ user.school }} </span>
                    </div>
                    <div class="signature">
                        <span>{{ user.signature }} </span>
                    </div>
                    <div class="user_anniu">
                        <el-button class="el-icon-edit"
                            v-if="router.currentRoute.value.params.id == store.state.userInfo.userId" type="primary"
                            size="medium" plain @click="logout" icon="CircleClose">
                            退出登录
                        </el-button>
                        <el-button v-else @click="follow" type="primary" size="medium" icon="Check"
                            v-text="isfollow ? '已关注' : '关注'">
                        </el-button>
                    </div>
                </div>
                <div class="user_num">
                    <div style="cursor: pointer" @click="myfans">
                        <div class="num_number">{{ userData.fansCount }}</div>
                        <span class="num_text">粉丝</span>
                    </div>
                    <div style="cursor: pointer" @click="myfollow">
                        <div class="num_number">{{ userData.followCount }}</div>
                        <span class="num_text">关注</span>
                    </div>
                    <div>
                        <div class="num_number">{{ userData.likeCount }}</div>
                        <span class="num_text">获赞</span>
                    </div>

                </div>
            </div>
        </div>

        <div class="person_body">

            <div class="person_body_left">
                <el-affix :offset="80">
                    <el-card class="box-card" :body-style="{ padding: '0px' }">
                        <template #header class="clearfix">
                            <span class="person_body_list" style="border-bottom: none">个人中心</span>
                        </template>
                        <el-menu router class="el-menu-vertical-demo" :default-active="router.currentRoute.value.path">
                            <el-menu-item index="info"
                                :route="{ name: 'info', params: router.currentRoute.value.params.id }">
                                <el-icon color="#999999">
                                    <User />
                                </el-icon>
                                <span>个人资料</span>
                            </el-menu-item>
                            <el-menu-item index="myArticle"
                                :route="{ name: 'myArticle', params: router.currentRoute.value.params.id }">
                                <el-icon color="#999999">
                                    <Document />
                                </el-icon>
                                <span slot="title">文章</span>
                            </el-menu-item>
                            <el-menu-item index="myFans"
                                :route="{ name: 'myFans', params: router.currentRoute.value.params.id }">
                                <el-icon color="#999999">
                                    <Bowl />
                                </el-icon>
                                <span slot="title">粉丝</span>
                            </el-menu-item>
                            <el-menu-item index="myFollow"
                                :route="{ name: 'myFollow', params: router.currentRoute.value.params.id }">
                                <el-icon color="#999999">
                                    <CirclePlus />
                                </el-icon>
                                <span slot="title">关注</span>
                            </el-menu-item>
                        </el-menu>
                    </el-card>
                </el-affix>
            </div>

            <div class="person_body_right">
                <router-view ref="rightRef" @refresh="edit" :userInfo="user" v-slot="{ Component }">

                    <keep-alive>
                        <component :is="Component" v-if="route.meta.keepAlive" />
                    </keep-alive>
                    <component :is="Component" v-if="!$route.meta.keepAlive" />
                </router-view>
            </div>

        </div>

        <PersonalDia ref="dia" />
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import PersonalDia from "./personalDia.vue";
import Cookies from 'js-cookie'
import axios from 'axios';
const store = useStore();
const route = useRoute();
const router = useRouter();
const user = ref({})
let userData = ref({})
let isfollow = ref()
let dia = ref(false)
const followData = ref({
    fanId: "",
    followId: ""
})

onMounted(() => {
    loadMsg()
})
watchEffect(() => {
    let id = router.currentRoute.value.params.id
    let path = router.currentRoute.value.path
    console.log(id);
    if (id == undefined || id == 0) {
        return
    }
    if (path.substring(0, 5) == "/home") {
        axios.get('/userInfoId', {
            params: {
                userId: id
            }
        })
            .then((res) => {
                user.value = res.data
                axios.get('/userData', {
                    params: {
                        userId: user.value.userId
                    }
                }).then((res) => {
                    console.log(res)
                    userData.value = res.data
                })
            }).catch((error) => {
                ElMessage({
                    message: error,
                    type: 'error'
                })
            })
    } else {
        axios.get('/userInfo')
            .then((res) => {
                user.value = res.data
                axios.get('/userData', {
                    params: {
                        userId: user.value.userId
                    }
                }).then((res) => {
                    userData.value = res.data
                })
            }).catch((error) => {
                ElMessage({
                    message: '请求错误',
                    type: 'error'
                })
            })
    }
})
const loadMsg = () => {
    let id = router.currentRoute.value.params.id
    console.log(id);
    if (id == undefined || id == 0) {
        return
    }
    if (id !== store.state.userInfo.userId) {
        axios.get('/userInfoId', {
            params: {
                userId: id
            }
        })
            .then((res) => {
                user.value = res.data
                console.log(user.value.userId);

                axios.get('/userData', {
                    params: {
                        userId: user.value.userId
                    }
                }).then((res) => {
                    userData.value = res.data
                })
                axios.get('/follow/isFollow', {
                    params: {
                        userId: store.state.userInfo.userId,
                        followId: user.value.userId
                    }
                }).then((res) => {
                    isfollow.value = res.data
                })
            }).catch((error) => {
                ElMessage({
                    message: error,
                    type: 'error'
                })
            })
    } else {
        axios.get('/userInfo')
            .then((res) => {
                user.value = res.data
                console.log(user.value.userId);

                axios.get('/userData', {
                    params: {
                        userId: user.value.userId
                    }
                }).then((res) => {
                    console.log(res)
                    userData.value = res.data
                })
            }).catch((error) => {
                ElMessage({
                    message: '请求错误',
                    type: 'error'
                })
            })
    }
}

const logout = () => {
    axios.get('/login/logout').then((res) => {
        window.localStorage.clear()
        Cookies.remove('token')
        window.location.reload()
        router.push({ path: "/login" });
    })

}
const edit = () => {
    dia.value.visitDia = true
}
const follow = () => {
    if (!store.state.userInfo.userId) {
        ElMessage({
            showClose: true,
            message: "请登录后再进行操作哦",
            type: "warning",
        });
    } else {
        followData.value.followId = router.currentRoute.value.params.id;
        followData.value.fanId = store.state.userInfo;
        if (isfollow.value) {
            axios.get('/follow/cancel', {
                params: {
                    followId: followData.value.followId
                }
            })
                .then((res) => {
                    isfollow.value = false;
                    ElMessage({
                        showClose: true,
                        message: "已取消关注",
                        type: "success",
                    });
                    reload();
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (!isfollow.value) {
            axios.get('/follow/add', {
                params: {
                    followId: followData.value.followId
                }
            })
                .then((res) => {
                    isfollow.value = true;
                    ElMessage({
                        showClose: true,
                        message: "已成功关注",
                        type: "success",
                    });
                    reload();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}
const myfans = () => {
    console.log(`${router.currentRoute.value.params.id}`)
    router.push({
        path: `/myFans/${router.currentRoute.value.params.id}`,
    });
}
const myfollow = () => {
    router.push({
        path: `/myFollow/${router.currentRoute.value.params.id}`,
    });
}
</script>
<style scoped>
.top {
    width: 1000px;
    height: auto;
    padding-top: 20px;
    background-color: white;
    margin-top: 30px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    border-radius: 5px;
}

.top_img {
    margin-right: 40px;
    margin-left: 40px;

}

.top_img img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
}

.text {
    height: 120px;
    width: 880px;
    display: flex;
}

.user_text {
    width: 60%;
    height: 100%;
    line-height: 30px;
    text-align: left;
}

.user_name {
    font-weight: 700;
    font-size: 20px;
}

.user-school {
    margin-bottom: -5px;
}

.user-school-font {
    font-size: 15px;
    color: #00c3ff;
}

.signature {
    font-size: 14px;
    color: #999;
}

.user_num {
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
}

.user_num>div {
    text-align: center;
    border-right: 1px dotted #999;
    box-sizing: border-box;
    width: 80px;
    height: 40px;
    line-height: 20px;
}

.num_text {
    color: #999;
}

.num_number {
    font-size: 20px;
    color: #333;
}

.el-menu-item span {
    font-size: 16px;
    color: #999;
}

/*下面部分样式*/
.person_body {
    width: 1000px;
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 210px;
    margin: auto;
    border-radius: 5px;
    /**
        使用left:50%
        transform: translateX(-50%); 进行剧中会影响固钉的效果
    **/
}

.person_body_left {
    width: 27%;
    border-radius: 5px;
    margin-right: 3%;
    text-align: center;
}

.person_body_list {
    width: 100%;
    margin-top: 25px;
    font-size: 22px;
    border-bottom: 1px solid #f0f0f0;
    color: #333;
}

.el-menu-item {
    margin-top: 22px;
}

.person_body_right {
    width: 70%;
    height: auto;
    border-radius: 5px;
}

/*ui样式*/
.el-button {
    width: 84px;
}
</style>