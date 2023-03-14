<template>
    <ul v-infinite-scroll="load" class="infinite-list">
        <li v-for="article in articleList" :key="article" class="infinite-list-item">
            <el-card class="box-card" shadow="always">
                <template #header>
                    <div class="card-header">
                        <el-avatar class="avatar" :size="50" :src="article.avatar" />
                        <div class="ch1">
                            <p class="username">{{ article.username }} </p>
                            <p class="time">{{ article.time }} </p>
                        </div>
                        <div class="ch2">
                            <el-button class="more" icon="MoreFilled" text>
                            </el-button>
                        </div>
                    </div>
                </template>
                <h3 class="title">{{ article.title }} </h3>
                <p class="detail">{{ article.detail }} </p>
                <el-divider border-style="dotted" />
                <el-row :gutter="20">
                    <el-col :span="5">
                        <div class="like">
                            <img src="../../assets/dianzan.svg" />
                            <span class="bottom_font">点赞
                                <span v-text="article.like > 9999 ? '9999+' : article.like">
                                </span>
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div class="comment">
                            <el-icon size="20px" color="#E6E6E6">
                                <Comment />
                            </el-icon>
                            <span class="bottom_font">评论
                                <span v-text="article.comment > 9999 ? '9999+' : article.comment">
                                </span>
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div class="share">
                            <el-icon size="20px" color="#E6E6E6">
                                <Share />
                            </el-icon>
                            <span class="bottom_font">分享</span>
                        </div>
                    </el-col>
                </el-row>
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
                username: 'username11111111111111',
                avatar: 'https://img.js.design/assets/img/61515b3a543d3e0d6e043adb.png',
                time: '2022-2-21',
                title: '标题',
                detail: 'When you enter into any new area of science, you almost always find yourself with a baffling new language of technical terms to learn',
                like: 123,
                comment: 0
            },
            {
                username: 'e',
                avatar: 'https://img.js.design/assets/img/61515b3a543d3e0d6e043adb.png',
                time: '2022-2-21',
                title: '标题',
                detail: 'When you enter into any new area of science, you almost always find yourself with a baffling new language of technical terms to learn',
                like: 123,
                comment: 11111111
            },
            {
                username: 'username',
                avatar: 'https://img.js.design/assets/img/61515b3a543d3e0d6e043adb.png',
                time: '2022-2-21',
                title: '标题',
                detail: 'When you enter into any new area of science, you almost always find yourself with a baffling new language of technical terms to learn',
                like: 1231111111,
                comment: 0
            },
            {
                username: 'username',
                avatar: 'https://img.js.design/assets/img/61515b3a543d3e0d6e043adb.png',
                time: '2022-2-21',
                title: '标题',
                detail: 'When you enter into any new area of science, you almost always find yourself with a baffling new language of technical terms to learn',
                like: 123,
                comment: 0
            },

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
<style scoped>
::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
}

.infinite-list {
    margin: 0;
    list-style: none;
    overflow: auto;
}

.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;

}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}

.box-card {
    width: 711px;
}

.like img {
    width: 20px;
}

.bottom_font {
    margin: auto;
    margin-left: 7px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1px;
    color: rgba(179, 179, 179, 1);
    font-family: Roboto;
}

.card-header {
    display: flex;
    align-items: left;
    position: relative;
}

.ch1 {
    position: absolute;
    margin-left: 80px;
}

.ch2 {
    position: absolute;
    margin-left: 600px;
}

.username {
    /** 文本1 */
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 1px;
    line-height: 30px;
    color: rgba(102, 102, 102, 1);
    text-align: left;
    vertical-align: top;
}

.time {
    /** 文本1 */
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 30px;
    color: rgba(182, 182, 182, 1);
    text-align: left;
    vertical-align: top;
}

.title {

    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 30px;
    color: rgba(102, 102, 102, 1);
    text-align: left;
    vertical-align: top;

}

.detail {

    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 25px;
    color: rgba(128, 128, 128, 1);
    text-align: left;
    vertical-align: top;

}

.like {
    display: flex;
}

.share {
    display: flex;
}

.comment {
    display: flex;
}</style>