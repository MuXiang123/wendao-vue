<template>
    <div class="content">
        <div style="display: flex; justify-content: space-between">
            <div class="left">
                <div class="tit">
                    <i class="el-icon-chat-line-round" style="color: #409eff; font-size: 28px"></i>
                    {{ listData.articleTitle }}
                </div>
                <div>
                    <el-button @click="changeArt1">编辑文章</el-button>
                    <el-button style="margin-left:30px" @click="deleteArt">删除文章</el-button>
                </div>
                <div class="info">
                    <el-avatar :size="55" :src="listData.avatar" style="
                            display: inline-block;
                            position: absolute;
                            left: 10px;
                            top: 20px;
                          "></el-avatar>
                    <p style="
                            position: absolute;
                            left: 80px;
                            top: 20px;
                            font-size: 14px;
                            color: red;
                          ">
                        {{ listData.nickname }}
                    </p>
                    <p style="
                            position: absolute;
                            left: 80px;
                            top: 65px;
                            font-size: 14px;
                            color: #666565;
                          ">
                        编辑于 {{ listData.createdTime }}
                    </p>
                    <p style="
                            position: absolute;
                            right: 170px;
                            top: 65px;
                            font-size: 14px;
                            color: #666565;
                          ">
                        赞 {{ listData.articleLikeCount }}
                    </p>

                    <p style="
                            position: absolute;
                            right: 145px;
                            top: 65px;
                            font-size: 14px;
                            color: #666565;
                          ">
                        |
                    </p>
                    <p style="
                            position: absolute;
                            right: 62px;
                            top: 65px;
                            font-size: 14px;
                            color: #666565;
                          ">
                        |
                    </p>

                    <p style="
                            position: absolute;
                            right: 85px;
                            top: 65px;
                            font-size: 14px;
                            color: #666565;
                          ">
                        评论 {{ listData.articleCommentCount }}
                    </p>
                </div>
                <div style="
                          text-align: left;
                          padding-left: 30px;
                          padding-top: 20px;
                          padding-right: 30px;
                          padding-bottom: 50px;
                          font-size: 14px;
                        ">
                    {{ listData.articleContent }}
                </div>
                <div>
                    <el-row>
                        <el-col :span="24" style="text-align: left; padding-left: 30px; display: flex">
                            <el-button style="background: #fff; color: #409eff" type="primary" @click="zan()"><i
                                    class="iconfont">&#xe65d;{{ listData.articleLikeCount }}</i></el-button>
                            <el-button style="background: #fff; color: #409eff" type="primary"
                                @click="nozan()">取消点赞</el-button>
                            <!-- <el-button type="primary" v-else @click="zan()"
                    ><i class="iconfont">&#xe65d;(2)</i></el-button
                  > -->
                            <div style="
                                height: 40px;
                                line-height: 45px;
                                margin-left: 20px;
                                cursor: pointer;
                              ">
                                <i style="font-size: 18px" class="el-icon-chat-line-round"></i>
                                <span style="font-size: 14px; margin-left: 2px" @click="reply">回复</span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="right">
                <div class="head">实时热点</div>
                <div class="list" v-for="(item, index) in hotData" :key="index" @click="goHot(item.articleId)">
                    <p style="
                            height: 40px;
                            line-height: 40px;
                            font-size: 14px;
                            text-align: left;
                            padding-left: 15px;
                            width: 287px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                          ">
                        {{ item.articleTitle }}
                    </p>

                </div>
            </div>
        </div>
        <div class="commentArea">
            <div class="h2">评论区</div>
            <div class="commentUl">
                <div class="commentLi" v-for="(item, index) in commentList" :key="index">

                    <div class="content">
                        {{ item.commentContent }}
                    </div>
                    <div class="time">
                        {{ item.commentCreatedTime }}
                    </div>

                </div>
            </div>

        </div>
        <el-dialog title="评论" :visible.sync="dialogFormVisible">
            <textarea name="" id="" cols="30" rows="10" placeholder="发表你的评论" v-model="textarea"></textarea>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitComment">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
const store = useStore();
const route = useRoute();
const router = useRouter();
const listData = ref({
    id: '123',
    nickname: 'username11111111111111',
    avatar: 'https://img.js.design/assets/img/61515b3a543d3e0d6e043adb.png',
    title: '标题',
    articleContent: 'When you enter into any new area of science, you almost always find yourself with a baffling new language of technical terms to learn',
    articleLikeCount: 123,
    articleCommentCount: 0,
    createdTime:'2023年3月6日'
})
const hotData = ref([
    {
        articleTitle:'asfgdf'
    },
    {
        articleTitle:'asfgdf'
    },
    {
        articleTitle:'asfgdf'
    },
    {
        articleTitle:'asfgdf'
    },
    {
        articleTitle:'asfgdf'
    },
    {
        articleTitle:'asfgdf'
    },

])
const commentList = ref([
    {
        commentContent:'123',
        commentCreatedTime:'2023年3月6日'
    }
])
    const textarea = ref('')
    const imgSrc = ref('https://img.js.design/assets/img/61515b3a543d3e0d6e043adb.png')
    const artId = ref('')
    const display=ref(true)
    const dialogFormVisible = ref(false)
</script>
<style scoped lang="scss">
.content {
    width: 1100px;
    margin: 30px auto;
    height: 470px;

    // background: #fff;
    .left {
        width: 69%;
        // border: 1px solid #d6d3d3;
        border-radius: 4px;
        height: 470px;
        background: #fff;

        .tit {
            font-size: 18px;
            color: #3f3e3e;
            text-align: left;
            margin-left: 15px;
            margin-top: 15px;
        }

        .info {
            width: 100%;
            height: 100px;
            border-bottom: 1px solid #d6d3d3;
            position: relative;
        }
    }

    .right {
        width: 29%;
        height: 470px;
        // border: 1px solid #d6d3d3;
        overflow-y: scroll;
        background: #fff;

        .head {
            width: 95%;
            height: 60px;
            border-bottom: 1px #eee solid;
            font-size: 19px;
            color: #4e4e4e;
            text-align: left;
            padding-left: 15px;
            line-height: 65px;
            font-weight: 700;

            &:before {
                content: "";
                display: inline-block;
                width: 8px;
                height: 8px;
                background: red;
                margin-right: 10px;
            }
        }

        .list {
            width: 95%;
            height: 70px;
            // background: pink;
            position: relative;
            // border-bottom: 1px solid #eee;
            margin-bottom: 10px;
        }

    }

    .commentArea {
        //padding-top:50px;
        position: relative;

        .h2 {
            //float:left;
            font-size: 25px;
            left: 40px;
            position: absolute;
            top: 0px;
        }

        .commentUl {
            width: 758px;
            // background-color:#d6d3d3;
            border: 0.5px solid #dcdfe6;
            padding-top: 50px;

            .commentLi {
                position: relative;
                height: 70px;
                border-bottom: 0.5px solid #dcdfe6;

                .content {
                    font-size: 18px;
                    position: absolute;
                    left: -400px;
                    top: -10px;
                }

                .time {
                    font-size: 12px;
                    position: absolute;
                    right: 10px;
                    bottom: 5px //float:right
                }
            }
        }

    }
}

.iconfont {
    font-family: "iconfont";
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    // padding-left: 10px;
}

:deep.el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    padding: 7px 15px;
    font-size: 14px;
    border-radius: 4px;
}

:deep.el-button--primary {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
}
</style>