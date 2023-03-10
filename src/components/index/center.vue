<template>
    <ul v-infinite-scroll="load()" class="infinite-list" style="overflow: auto">
        <li v-for="article in articleList" :key="article" class="infinite-list-item">
            <el-card class="box-card" shadow="always">
                <template #header>
                    <div class="card-header">
                        <el-avatar :size="50" :src="article.avatar" />
                        <span class="username">{{ article.username }} </span>
                        <span class="time">{{ article.time }} </span>
                        <el-button class="more" icon="MoreFilled" text>
                        </el-button>
                    </div>
                </template>
                <div class="detail">
                    When you enter into any new area of science, you almost always find yourself with a baffling new
                    language of technical terms to learn.
                </div>
                <el-divider border-style="dotted" />
                <div class="bottom">
                    <div class="like">
                        <img src="../../assets/dianzan.svg"/>
                        <span>点赞</span>
                    </div>
                    <div class="comment">
                        <el-icon><Comment /></el-icon>
                        <span>评论</span>
                    </div>
                    <div class="share">
                        <el-icon><Share /></el-icon>
                        <span>分享</span>
                    </div>
                </div>
            </el-card>
        </li>
    </ul>
</template>

<script>
import { ref } from 'vue'
export default {
    name: 'IndexContent',
    setup() {
        const articleList = ref([
            {
                username: 'username',
                avatar: 'https://img.js.design/assets/img/61515b3a543d3e0d6e043adb.png',
                time: '2022-2-21'
            }
        ])
        const load = () => {
            // articleList.push(articleList[0])
        }
        return {
            articleList,
            load
        }
    }
}

</script>
<style>
.infinite-list {
    height: 700px;
    margin: 0;
    list-style: none;
    
}

.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}
.box-card{
    width: 711px;
}
.bottom{
    text-align: center;
    width: 100%;
    float: left;
}
</style>