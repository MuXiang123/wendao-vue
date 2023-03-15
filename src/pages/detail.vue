<template>
    <ArticleDetail @initLabelIds="initLabelIds" style="background: #fff;" />
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import ArticleDetail from "../components/article/ArticleDetail.vue";
const store = useStore();
const route = useRoute();
const router = useRouter();
const articleHtml = ref('')
const finishArticleDetail = ref(false)
const labelIdsc = ref([])
// 当前文章的作者
const userId = ref(0)
// 文章总的评论数
const articleCommentCount = ref(0)
const initLabelIds = (labelIds, finishArticleDetail, userId, articleHtml) => {
    this.labelIds = labelIds;
    this.finishArticleDetail = finishArticleDetail;
    this.userId = userId;
    this.articleHtml = articleHtml;
}
</script>
<style scoped lang='sass'>
</style>