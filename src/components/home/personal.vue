<template>
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
                    <el-button class="el-icon-edit" v-if="router.currentRoute.value.params.id === store.state.id"
                        type="primary" size="medium" plain @click="edit" icon="EditPen">
                        编辑
                    </el-button>
                    <el-button v-else @click="follow" type="primary" size="medium" icon="Check"
                        v-text="true ? '已关注' : '关注'">
                    </el-button>
                </div>
            </div>
            <div class="user_num">
                <div style="cursor: pointer" @click="myfans">
                    <div class="num_number">{{ fanCounts }}</div>
                    <span class="num_text">粉丝</span>
                </div>
                <div style="cursor: pointer" @click="myfollow">
                    <div class="num_number">{{ followCounts }}</div>
                    <span class="num_text">关注</span>
                </div>
                <div>
                    <div class="num_number">{{ goodCounts }}</div>
                    <span class="num_text">获赞</span>
                </div>
            </div>
        </div>
    </div>
    <div class="person_body">
        <div class="person_body_left">
            <el-card class="box-card" :body-style="{ padding: '0px' }">
                <template #header class="clearfix">
                    <span class="person_body_list" style="border-bottom: none">个人中心</span>
                </template>
                <el-menu router 
                class="el-menu-vertical-demo"
                 :default-active="info" 
                 active-text-color="#409eff">
                    <el-menu-item index="info" :route="{ name: 'info', params: router.currentRoute.value.params.id }">
                        <i class="el-icon-user"></i>
                        <span slot="title">个人资料</span>
                    </el-menu-item>
                    <el-menu-item index="myArticle"
                        :route="{ name: 'myArticle', params: router.currentRoute.value.params.id }">
                        <i class="el-icon-edit-outline"></i>
                        <span slot="title">文章</span>
                    </el-menu-item>
                    <el-menu-item index="myFans" :route="{ name: 'myFans', params: router.currentRoute.value.params.id }">
                        <i class="el-icon-tableware"></i>
                        <span slot="title">粉丝</span>
                    </el-menu-item>
                    <el-menu-item index="myFollow"
                        :route="{ name: 'myFollow', params: router.currentRoute.value.params.id }">
                        <i class="el-icon-circle-plus-outline"></i>
                        <span slot="title">关注</span>
                    </el-menu-item>
                </el-menu>
            </el-card>
        </div>
        <div class="person_body_right">
            <router-view></router-view>
        </div>
    </div>
    <PersonalDia :dialogVisible="dia"/>   

</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import PersonalDia from "./personalDia.vue";
const store = useStore();
const route = useRoute();
const router = useRouter();
const user = ref({
    avatar: 'https://img.js.design/assets/img/61515b3a543d3e0d6e043adb.png',
    nickname: '木香上升',
    school: '东莞城市学院',
    signature: '123456789werewqerertasdfadfga'
})
const fanCounts = ref(123)
const followCounts = ref(456)
const goodCounts = ref(456457)
const isfollow = ref()
let dia = ref(false)
let currentInstance = ''
const followData = ref({
    fanId: "",
    followId: ""
})
const isfollowid = ref()

onMounted(() => {
    currentInstance = getCurrentInstance()
    console.log('onMounted')
    // userInfo(router.currentRoute.value.params.id)
    //     .then((res) => {
    //         user = res;
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     });
    // myfollow(store.state.id)
    //     .then((res) => {
    //         res.data.forEach((res) => {
    //             isfollowid.push(res.id);
    //         });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    // followAndFanCount(router.currentRoute.value.params.id)
    //     .then((res) => {
    //         followCounts = res.data.followCounts;
    //         fanCounts = res.data.fanCounts;
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    // goodCounts(router.currentRoute.value.params.id)
    //     .then((res) => {
    //         goodCounts = res.data.goodCounts;
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
})
watchEffect(() => {
    // useRouter.beforeEach(to =>{
    //     if (to.path == `/home/${store.state.id}`) {
    //         to.fullPath
    //   } else if (to.path == `/home/${router.currentRoute.value.params.id}`) {
    //         to.fullPath
    //   }
    // })
})
const edit = () => {
    dia = true;
}
const follow = () => {
    if (!store.state.id) {
        ElMessage({
            showClose: true,
            message: "请登录后再进行操作哦",
            type: "warning",
        });
    } else {
        followData.followId = router.currentRoute.value.params.id;
        followData.fanId = store.state.id;
        if (isfollowid.indexOf(followData.followId) > -1) {
            isfollow = true;
        } else {
            isfollow = false;
        }
        if (isfollow) {
            deleteFollow(followData)
                .then((res) => {
                    isfollow = false;
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
        } else if (!isfollow) {
            addFollow(followData)
                .then((res) => {
                    isfollow = true;
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
      path:`/myFollow/${router.currentRoute.value.params.id}`,
      });
}
</script>
<style scoped>
.top {
    width: 1000px;
    height: 140px;
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

.el-menu-item>span {
    font-size: 16px;
    color: #999;
}

/*下面部分样式*/
.person_body {
    width: 1000px;
    margin-top: 210px;
    display: flex;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
}

.person_body_left {
    width: 27%;
    height: 600px;
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
    /* height: 500px; */
    border-radius: 5px;
    background-color: white;
}

.box-card {
    height: 100%
}

/*ui样式*/
.el-button {
    width: 84px;
}</style>