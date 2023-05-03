<template>
    <div class="page-header" v-if="article">
        <div class="page-title">
            <h1 class="article-title">{{ article.articleTitle }}</h1>
            <div class="article-meta">
                <div class="first-meta">
                    <span class="item" v-if="article.updateTime"><svg-icon icon-class="update"
                            style="margin-right:0.15rem;"></svg-icon>
                        <span class="text">发表于 </span>{{ formatDate(article.updateTime) }}
                    </span>
                    <span class="item"><svg-icon icon-class="eye" style="margin-right:0.15rem;"></svg-icon>
                        <span class="text">阅读量 </span>{{ article.articleViewCount }}</span>
                </div>
                <div class="second-meta">
                    <span><svg-icon icon-class="edit" size="0.9rem" style="margin-right:0.15rem;"></svg-icon>
                        <span class="text">字数统计 </span>{{ count(wordNum) }} 字
                    </span>
                    <span class="item"><svg-icon icon-class="clock" style="margin-right:0.15rem;"></svg-icon>
                        <span class="text">阅读时长 </span>{{ readTime }} 分钟
                    </span>
                    <span class="item">
                        <svg-icon icon-class="category" style="margin-right:0.15rem;"></svg-icon>{{
                            article.articleCategoryName
                        }}
                    </span>
                </div>
            </div>
        </div>
        <!-- 波浪 -->
        <Waves></Waves>
    </div>
    <div class="bg">
        <div class="main-container" v-if="article">

            <div class="left-container">

                <div class="article-container">
                    <v-md-preview ref="articleRef" class="md" v-viewer :text="article.articleContent"></v-md-preview>
                    <div class="article-post">
                        <div class="tag-share">
                            <router-link :to="`/tag/${tag.id}`" class="article-tag" v-for="tag in article.tagVOList"
                                :key="tag.id">
                                <svg-icon icon-class="tag" size="0.8rem"></svg-icon>
                                {{ tag.tagName }}
                            </router-link>
                            <Share class="share-info" :url="articleHref" :title="article.articleTitle"></Share>
                        </div>
                        <div class="reward">
                            <button class="btn" :class="isLike(article.id)" @click="like">
                                <svg-icon icon-class="like" size="0.9rem"></svg-icon>
                                <span v-text="article.isLiked == 0 ? '取消':'点赞' "></span>
                                <span>{{ article.articleLikeCount }}</span>
                            </button>
                        </div>
                        <div class="copyright">
                            <ul>
                                <li class="author">
                                    <svg-icon icon-class="author" size="0.9rem" style="margin-right:0.3rem"></svg-icon>
                                    <strong>本文作者：{{ article.nickname }} </strong>
                                </li>
                                <li class="link">
                                    <svg-icon icon-class="article_link" size="0.9rem"
                                        style="margin-right:0.3rem"></svg-icon>
                                    <strong>本文链接：</strong>
                                    <a :href="articleHref">{{ articleHref }}</a>
                                </li>
                                <li class="license">
                                    <svg-icon icon-class="article_share" size="0.8rem"
                                        style="margin-right:0.3rem"></svg-icon>
                                    <strong>版权声明： </strong>本站所有文章除特别声明外，均采用
                                    <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh" target="_blank">CC
                                        BY-NC-SA 4.0</a>
                                    许可协议。转载请注明文章出处！
                                </li>
                            </ul>
                        </div>
                        <CommentList></CommentList>
                    </div>
                </div>
            </div>
            <div class="right-container">
                <div class="side-card">
                    <Catalog v-if="articleLoaded" :domRef="articleRef"></Catalog>
                </div>
            </div>
            <el-backtop :right="100" :bottom="100" />
        </div>
    </div>
</template>

<script setup >
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Waves from '../components/article/waves.vue'
import CommentList from '../components/article/CommentList.vue'
import Catalog from '../components/article/Catalog.vue';
import { Share } from 'vue3-social-share';
import 'vue3-social-share/lib/index.css';
import axios from 'axios';
import { ElMessage } from 'element-plus';
const store = useStore();
const route = useRoute();
const router = useRouter();

const { app, blog, user } = useStore();
const articleRef = ref();
const articleHref = window.location.href;
const data = reactive({
    articleLoaded: false,
    wordNum: 0,
    readTime: 0,
    article: {
        articleTitle: "",
        articleContent: "",
        category: {},
        tagVOList: [],
        createTime: "",
        lastArticle: {},
        nextArticle: {},
        updateTime: "",
        isLiked: 0
    },
});
const { articleLoaded, wordNum, readTime, article } = toRefs(data);
const isLike = computed(() => () => article.value.isLiked != 1 ? "like-btn-active" : "like-btn");
const count = (value) => {
    if (value >= 1000) {
        return (value / 1000).toFixed(1) + "k";
    }
    return value;
};
const deleteHTMLTag = (content) => {
    return content
        .replace(/<\/?[^>]*>/g, "")
        .replace(/[|]*\n/, "")
        .replace(/&npsp;/gi, "");
};
const like = () => {
    let id = article.value.articleId;
    if (article.value.isLiked == 0) {
        axios.get('/dislike', {
            params: {
                articleId: article.value.articleId
            }
        }).then((res) => {
            article.value.isLiked = 1
            article.value.articleLikeCount -= 1
            ElMessage({
                type: 'success',
                message: '取消成功'
            })
        })
    } else {
        axios.get('/like', {
            params: {
                articleId: article.value.articleId
            }
        }).then((res) => {
            article.value.isLiked = 0
            article.value.articleLikeCount += 1
            ElMessage({
                type: 'success',
                message: '点赞成功'
            })
        })
    }
};
onMounted(() => {
    axios.get('/article/detail', {
        params: {
            articleId: router.currentRoute.value.params.id,
            userId: store.state.userInfo.userId
        }
    }).then((res) => {
        console.log(res.data);
        article.value = res.data
        wordNum.value = deleteHTMLTag(article.value.articleContent).length;
        readTime.value = Math.round(wordNum.value / 400);
        articleLoaded.value = true;
    })
})
const formatDate = (timeStamp) => {
    var dateTime = new Date(timeStamp);
    var no1new = dateTime.valueOf();
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    var hour = dateTime.getHours();
    var minute = dateTime.getMinutes();
    var second = dateTime.getSeconds();
    var now = new Date();
    var now_new = now.valueOf();
    var milliseconds = 0;
    var timeSpanStr;

    milliseconds = now_new - no1new;

    if (milliseconds <= 1000 * 60 * 1) {
        timeSpanStr = '刚刚';
    } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
    } else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
    } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
    } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
        timeSpanStr = year + '-' + month + '-' + day
    } else {
        timeSpanStr = year + '-' + month + '-' + day
    }

    return timeSpanStr;
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";

.page-header {
    left: 0;
    right: 0;
    width: 100%;
    padding: 1.5rem 0;
    text-align: center;
    background: var(--footer-bg);
    background-size: 300% 300%;
    -webkit-animation: gradientBG 10s ease infinite;
    animation: gradientBG 10s ease infinite;
}

@keyframes gradientBG {
    0% {
        background-position: 0 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0 50%;
    }
}

.article-container {
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 0 1rem var(--box-bg-shadow);
}

.article-post {
    margin: 0 2rem;
}

.article-title {
    font-weight: 500;
    font-size: 2.5rem;
    letter-spacing: 0.125rem;
    text-align: center;
    color: var(--header-text-color);
}

.article-meta {
    @include flex;
    flex-direction: column;
    font-size: 0.875rem;

    .item {
        margin-left: 0.625rem;
    }
}

.tag-share {
    display: flex;
    align-items: center;

    .share-info {
        margin-left: auto;
    }
}

.reward {
    margin: 1.25rem auto;
    padding: 0.625rem 0;
    text-align: center;

    .btn {
        border-radius: 0.3125rem;
        color: var(--grey-0);
        cursor: pointer !important;
        padding: 0 0.9375rem;
        font: inherit;
    }

    .like-btn-active {
        background: var(--primary-color);
    }

    .like-btn {
        background: #999;
    }

    .reward-btn {
        position: relative;
        margin-left: 1rem;
        background: var(--primary-color);
    }

    .tea {
        font-size: 0.8125em;
        color: var(--grey-5);
        margin-top: 0.5rem;
    }
}

.reward-all {
    display: flex;
    align-items: center;
}

.reward-img {
    width: 130px;
    height: 130px;
    display: block;
}

.reward-desc {
    margin: -5px 0;
    color: #858585;
    text-align: center;
}

.copyright {
    font-size: 0.75em;
    padding: 1rem 2rem;
    margin-bottom: 2.5rem;
    border-radius: 0.625rem;
    background: var(--grey-2);
    color: var(--grey-6);
}

.post-nav {
    display: flex;
    margin-bottom: 2.5rem;
    border-radius: 0.625rem;
    overflow: hidden;

    .item {
        width: 50%;
    }

    .post-cover {
        display: flex;
        flex-direction: column;
        color: var(--header-text-color);
        padding: 1.25rem 2.5rem;
        background-size: cover;
        animation: blur 0.8s ease-in-out forwards;

        &:before {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #434343, #000);
            opacity: 0.5;
            transition: all 0.2s ease-in-out 0s;
            z-index: -1;
            top: 0;
            left: 0;
        }
    }

    .post-last-next {
        font-size: 0.8125rem;
    }
}

.post-cover:hover::before {
    opacity: 0.4;
}

@media (max-width: 767px) {
    .article-title {
        font-size: 1.5rem;
    }

    .article-meta .text {
        display: none;
    }

    .article-post {
        margin: 0 0.5rem;
    }

    .post-nav {
        flex-direction: column;
    }

    .post-nav .item {
        width: 100%;
    }

    .reward-img {
        width: 105px;
        height: 105px;
    }

}
</style>
