<template>
  <div class="myart">
    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto" v-if="articleList.length">
      <li v-for="(article, i) in articleList" :key="i" class="infinite-list-item">
        <el-card class="box-card" shadow="always" @click="detail(article.articleId)">
          <template #header>
            <div class="card-header">
                <span>{{ article.articleTitle }} </span>
                <span class="time">{{ article.createdTime }} </span>
              <div class="ch2" v-if="router.currentRoute.value.params.id == store.state.userInfo.userId">
                <el-dropdown>
                  <el-button class="more" icon="MoreFilled" text>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="editArticle(article.articleId)">编辑</el-dropdown-item>
                      <el-dropdown-item @click="deleteArticle(article.articleId)">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
          </template>
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
                    <span v-text="article.articleCommentCount > 9999 ? '9999+' : article.articleCommentCount">
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
    <el-empty v-else :image-size="250" description="暂未发表任何文章"></el-empty>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ElMessage } from 'element-plus';
const store = useStore();
const route = useRoute();
const router = useRouter();
const articleList = ref([])
const pageNum = ref(1)
const id = ref(0)
const deleteArticle = (id) => {
  axios.get('/article/delete',{
    params:{
      articleId: id
    }
  }).then((res)=>{
    if(res.data == true){
      ElMessage({
        type:'success',
        message:'删除成功'
      })
    }else{
      ElMessage({
        type:'error',
        message:'删除失败'
      })
    }
  })
}

const editArticle = (id) =>{
  router.push({
    name:'ArticleEdit',
    query:{
      id:id
    }
  })
}

const flag = ref(false)
const load = () => {
  axios.get("/article/user/list", {
    params: {
      userId: router.currentRoute.value.params.id,
      pageNum: pageNum.value,
      pageSize: 10
    }
  }).then((res) => {
    console.log(res);
    articleList.value.push(...res.data)
    pageNum.value+=1
  })
}
onMounted(()=>{
  load()
})

const detail = (aid) =>{
    router.push('/article/detail/'+aid)
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
  cursor: pointer;
}

.infinite-list-item {
  display: flex;
  align-items: center;
  height: 260px;
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
  margin-left: 2rem;
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
