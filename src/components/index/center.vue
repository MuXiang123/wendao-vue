<template>
    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <li v-for="(article, i) in articleList" :key="i" class="infinite-list-item">
            <el-card class="box-card" shadow="always">
                <template #header>
                    <div class="card-header" @click="personal(article.articleUserId)">
                        <el-avatar class="avatar" :size="50" :src="article.avatar" />
                        <div class="ch1">
                            <p class="username">{{ article.nickname }} </p>
                            <p class="time">{{ article.createdTime }} </p>
                        </div>
                    </div>
                </template>
                <div @click="detail(article.articleId)">
                    <h3 class="title">{{ article.articleTitle }} </h3>
                    <p class="detail">{{ article.articleSummary }} </p>
                    <el-divider border-style="dotted" />
                    <el-row :gutter="20">
                        <el-col :span="5">
                            <div class="like">
                                <el-button type="primary" text>
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-like"></use>
                                    </svg>
                                    <span class="bottom_font">
                                        <span v-text="article.articleLikeCount > 9999 ? '9999+' : article.articleLikeCount">
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
                                        <span
                                            v-text="article.articleCommentCount > 9999 ? '9999+' : article.articleCommentCount">
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
                </div>
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
const articleList = ref([])
const pageNum = ref(1)
const id = ref(0)
const flag = ref(false)
watchEffect(() => {
    const path = router.currentRoute.value.params.id
    if (path == null || flag.value == false) {
        flag.value = true
        return
    }
    if (path !== id.value & path < 1000000) {
        console.log('path=' + path);
        id.value = path
        pageNum.value = 1
        articleList.value = []
        if (path == 0) {
            axios.get('/article/index/list', {
                params: {
                    userId: store.state.userInfo.userId,
                    pageNum: pageNum.value,
                    pageSize: 10
                }
            }).then((res) => {
                console.log("watch: " + res)
                pageNum.value += 1
                for (var i = 0, len = res.data.length; i < len; i++) {
                    articleList.value.push(res.data[i])
                }
            })
        } else if (path > 0) {
            axios.get('/article/category/list', {
                params: {
                    category: path,
                    pageNum: pageNum.value,
                    pageSize: 10
                }
            }).then((res) => {
                console.log("watch: " + res)
                pageNum.value += 1
                for (var i = 0, len = res.data.length; i < len; i++) {
                    articleList.value.push(res.data[i])
                }
            })
        }
    }

})

const load = () => {
    id.value = router.currentRoute.value.params.id
    console.log('id=' + id.value);
    if (id.value == 0) {
        axios.get('/article/index/list', {
            params: {
                userId: store.state.userInfo.userId,
                pageNum: pageNum.value,
                pageSize: 10
            }
        }).then((res) => {
            console.log("load: " + res.data.length)

            pageNum.value += 1
            console.log('pageNum.value' + pageNum.value);
            for (var i = 0, len = res.data.length; i < len; i++) {
                articleList.value.push(res.data[i])
            }
        })
    } else {
        axios.get('/article/category/list', {
            params: {
                category: id.value,
                pageNum: pageNum.value,
                pageSize: 10
            }
        }).then((res) => {
            console.log("load: " + res.data)

            pageNum.value += 1
            console.log('pageNum.value' + pageNum.value);
            for (var i = 0, len = res.data.length; i < len; i++) {
                // console.log(res.data[i]);
                articleList.value.push(res.data[i])
            }
        })
    }

}

const detail = (aid) => {
    router.push('/article/detail/' + aid)
}
const personal = (uid) => {
  router.push({
    path: '/home/info/' + `${uid}`,
  })
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

.infinite-list-item {
    display: flex;
    align-items: center;
    margin: 10px;
    height: 260px;
    cursor: pointer;
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
    margin-bottom: 1rem;
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
}
</style>
