<template>
    <div class="header">
        <el-menu mode="horizontal" :default-active="activeIndex" class="el-menu-demo" @select="handleSelect">
            <router-link to="/">
                <div class="logo">
                    <img src="src\assets\logo.png" alt="logo">
                    <span class="title">问道</span>
                </div>
            </router-link>

            <el-menu-item index="1">
                <router-link to="/">首页</router-link>
            </el-menu-item>
            <el-menu-item index="2">
                <router-link to="/about">视频</router-link>
            </el-menu-item>
            <el-menu-item index="3" class="search-bar">
                <el-input placeholder="请输入问题" prefix-icon="Search" clearable ></el-input>
            </el-menu-item>
            <el-menu-item index="4">
                <el-button
                :type="info"
                round=true
                >提问</el-button>
            </el-menu-item>
            <el-menu-item index="5">
                <el-button type="info" icon="Bell" color="#24292e" />
            </el-menu-item>
            <el-menu-item index="6">
                <el-button type="info" icon="Message" color="#24292e"/>
            </el-menu-item>
            <el-menu-item index="7">
                <el-avatar :size="50" :src="circleUrl" :fit="fit" @error="errorHandler">
                    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" alt="">
                </el-avatar>
            </el-menu-item>
            
        </el-menu>
    </div>
</template>
  
<script>
import { useRouter } from 'vue-router';

export default {
    name: 'Header',
    setup() {
        const router = useRouter();
        const activeIndex = router.currentRoute.value.path;
        const errorHandler = () => false //头像加载失败
        const handleSelect = (index) => {
            router.push(index);
        };

        return {
            activeIndex,
            handleSelect,
        };
    },
};
</script>
  
<style scoped>
.flex-grow {
    flex-grow: 1;
}

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
    color: #fff;
}

.el-menu-demo .el-menu-item.is-active {
    color: #409eff;
    background-color: transparent;
}

.el-menu-demo .el-input {
    width: 400px;
    margin-top: 5px;
}

.el-menu-demo .el-input__inner {
    border-radius: 20px;
    background-color: #3b424a;
    color: #fff;
    font-size: 14px;
    padding: 6px 10px;
}

.el-menu-demo .el-input__icon {
    color: #fff;
}

.el-menu-demo .el-input__suffix {
    color: #666;
}

.el-menu-demo .el-button--primary {
    background-color: #409eff;
    border-color: white
}
</style>