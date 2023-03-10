<template>
    <div class="header">
        <el-menu mode="horizontal" 
            :default-active="activeIndex"
             class="el-menu-demo"
            @select="handleSelect"
            background-color="#24292e"
            text-color="#fff"
            ellipsis="false"
            router>
            
            <router-link to="/">
                <div class="logo">
                    <img src="src\assets\logo.png" alt="logo">
                    <span class="title">问道</span>
                </div>
            </router-link>

            <el-menu-item index="/index">
                首页
            </el-menu-item>
            <el-menu-item index="/video">
                视频
            </el-menu-item>
            <div class="search-bar">
                <el-input v-model="inputSearch" placeholder="请输入问题" prefix-icon="Search" clearable ></el-input>
                <el-button class="el-button" type="info" @click="onEnterSearch()">
                    搜索
                </el-button>
            </div>
            <el-menu-item index="/writeArticle">
                <el-button
                :type="info"
                round=true
                >写文章</el-button>
            </el-menu-item>
            <el-menu-item index="/message">
                <el-icon class="el-icon"><Bell/></el-icon>
            </el-menu-item>
            <el-menu-item index="6">
                <el-icon class="/chat"><Message/></el-icon>
            </el-menu-item>
            <el-sub-menu class="el-sub-menu" >
                <template #title>
                    <el-avatar :size="50" :src="circleUrl" :fit="fit" @error="errorHandler">
                        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" alt="">
                    </el-avatar>
                </template>
                <el-menu-item index="/personal">
                        <el-icon><House /></el-icon>
                        <span class="span">我的主页</span>
                </el-menu-item>
                <el-menu-item index="/login" @click="logout()">
                        <el-icon><CircleClose /></el-icon>
                        <span class="span">退出登录</span>
                </el-menu-item>
                
            </el-sub-menu>
            
        </el-menu>
    </div>
</template>
  
<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {ref} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
    name: 'Header',
    setup() {
        const store = useStore();
        const router = useRouter();
        const activeIndex = router.currentRoute.value.path;
        const errorHandler = () => false //头像加载失败
        const handleSelect = (index) => {
            router.push(index);
        };
        const inputSearch = ref("")
        
        const onEnterSearch = () => {
            console.log(inputSearch.value)
            const _self = this;
            const url = "http://38617112yi.zicp.vip/article/search";
            // _self.$axios
            //     .get(url, { params: { keyword: inputSearch } })
            //     .then((res) => {
            //         console.log("搜索的数据", res);
            //         router.push({
            //             name: 'searchDetail',
            //             params: {
            //                 search: res.data.data
            //             }
            //         })
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
        }

        const logout = ()=>{
            router.push({ name: "/login" });
            localStorage.removeItem("password");
            display.value = true;
        }
        return {
            activeIndex,
            inputSearch,
            logout,
            handleSelect,
            onEnterSearch
        };
    },
};
</script>
  
<style scoped>

.header {
    background-color: #24292e;
    display: flex;
    justify-content: center;
}


.logo {
    display: flex;
    align-items: center;
    margin-right: 20px;
}

.logo img {
    width: 40px;
    margin-right: 10px;
    margin-top: 10px;
}

.title {
    color: #fff;
    font-weight: 600;
    font-size: 20px;
    margin-left: 5px;
    margin-top: 10px;
}
.el-icon{
    color: #fff;
}
.search-bar{
    margin-top: 10px;
    margin-left: 10px;
}
.el-button{
    background-color: #24292e;
    color: #fff;
    margin-left: 10px;
    margin-top: 3px;
}
 .span{
    color: #fff;
    font-size: 12px;
}
.el-menu-demo {
    background-color: #24292e;
    border: none;
    color: #fff;
    line-height: 20px;
    width: 90%;
    margin-left: 250px;
}

.el-menu-demo .el-menu-item {
    font-size: 16px;
    padding: 0 20px;
}

.el-menu-demo .el-menu-item.is-active {
    color: #409eff;
    background-color: transparent;
}

.el-menu-demo .el-input {
    width: 400px;
    margin-top: 5px;
}

</style>