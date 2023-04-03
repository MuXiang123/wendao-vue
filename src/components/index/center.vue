<template>
    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <li v-for="(article, i) in articleList" :key="i" class="infinite-list-item">
            <el-card class="box-card" shadow="always">
                <template #header>
                    <div class="card-header">
                        <el-avatar class="avatar" :size="50" :src="article.avatar" />
                        <div class="ch1">
                            <p class="username">{{ article.username }} </p>
                            <p class="time">{{ article.time }} </p>
                        </div>
                        <div class="ch2">
                            <el-dropdown>
                                <el-button class="more" icon="MoreFilled" text>
                                </el-button>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item @click="deleteArticle(article.id)">删除</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                    </div>
                </template>
                <h3 class="title">{{ article.title }} </h3>
                <p class="detail">{{ article.detail }} </p>
                <el-divider border-style="dotted" />
                <el-row :gutter="20">
                    <el-col :span="5">
                        <div class="like">
                            <el-button type="primary" text>
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-like"></use>
                                </svg>
                                <span class="bottom_font">
                                    <span v-text="article.like > 9999 ? '9999+' : article.like">
                                    </span>点赞
                                </span>
                            </el-button>
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div class="comment">
                            <el-button type="primary" text>
                                <el-icon size="20px">
                                    <Comment />
                                </el-icon>
                                <span class="bottom_font">
                                    <span v-text="article.comment > 9999 ? '9999+' : article.comment">
                                    </span>条评论
                                </span>
                            </el-button>
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <div class="share">
                            <el-button type="primary" text>
                                <el-icon size="20px">
                                    <Share />
                                </el-icon>
                                <span class="bottom_font">分享</span>
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </li>
    </ul>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
const store = useStore();
const route = useRoute();
const router = useRouter();
const props = defineProps({
    articleList: Array
})
const articleList = ref([
    {
        id: '123',
        username: 'username11111111111111',
        avatar: 'https://img.js.design/assets/img/61515b3a543d3e0d6e043adb.png',
        time: '2022-2-21',
        title: '标题',
        detail: 'When you enter into any new area of science, you almost always find yourself with a baffling new language of technical terms to learn',
        like: 123,
        comment: 0
    },
    {
        id: '123',
        username: 'username11111111111111',
        avatar: 'https://img.js.design/assets/img/61515b3a543d3e0d6e043adb.png',
        time: '2022-2-21',
        title: '标题',
        detail: 'When you enter into any new area of science, you almost always find yourself with a baffling new language of technical terms to learn',
        like: 123,
        comment: 0
    },
    {
        id: '123',
        username: 'username11111111111111',
        avatar: 'https://img.js.design/assets/img/61515b3a543d3e0d6e043adb.png',
        time: '2022-2-21',
        title: '标题',
        detail: 'When you enter into any new area of science, you almost always find yourself with a baffling new language of technical terms to learn',
        like: 123,
        comment: 0
    },
    {
        id: '123',
        username: 'username11111111111111',
        avatar: 'https://img.js.design/assets/img/61515b3a543d3e0d6e043adb.png',
        time: '2022-2-21',
        title: '标题',
        detail: 'When you enter into any new area of science, you almost always find yourself with a baffling new language of technical terms to learn',
        like: 123,
        comment: 0
    },
])

const deleteArticle = (id) => {
    console.log(id)
}
const i1 = ref(1)
const load = () => {
    console.log(1);
    articleList.value.push(articleList.value[0])
}

</script>
<style scoped>
::-webkit-scrollbar {
    width: 0;
}

.infinite-list {
    height: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    margin: 10px;
}

.infinite-list .infinite-list-item+.list-item {
    margin-bottom: 10px;
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
    right: 20px;
}

.username {
    /** 文本1 */
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 1px;
    line-height: 1px;
    color: rgba(102, 102, 102, 1);
    text-align: left;
    vertical-align: top;
    margin-bottom: 1rem;
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
    font-weight: 600;
    letter-spacing: 0px;
    color: rgba(102, 102, 102, 1);
    text-align: left;
    vertical-align: top;
    margin-top: 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
}

.detail {
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0px;
    line-height: 25px;
    color: rgba(128, 128, 128, 1);
    text-align: left;
    vertical-align: top;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.el-divider {
    margin-top: 0;
    margin-bottom: 1rem;
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
