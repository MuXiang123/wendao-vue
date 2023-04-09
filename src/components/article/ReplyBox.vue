<template>
    <div class="reply-box" v-if="show">
        <div class="box-normal">
            <div class="reply-box-avatar">
                <img class="shoka-avatar" v-if="store.state.userInfo.avatar" :src="store.state.userInfo.avatar" alt="" />
            </div>
            <div class="reply-box-warp">
                <textarea class="reply-box-textarea" v-model="commentContent" :style="sendActive ? lineStyle : ''"
                    @input.prevent="inputActive" :placeholder="placeholderText"></textarea>
            </div>
            <div class="reply-box-send" :class="sendActive ? 'send-active' : ''" @click="handleAdd">评论</div>
        </div>
        <div class="box-expand">
            <Emoji @add-emoji="handleEmoji"></Emoji>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ElMessage, ElLoading } from 'element-plus'
import emojiList from "../../utils/emoji.js";
import Emoji from "./Emoji.vue"
const router = useRouter()
const route = useRoute()
// const { user, blog, app } = useStore();
const store = useStore()
const lineStyle = {
    lineHeight: "normal",
    borderColor: "#ed6ea0",
    backgroundColor: "var(--grey-0)",
};
const emit = defineEmits(["reload"]);
const props = defineProps({
    show: {
        type: Boolean,
        default: true,
    },
});
const data = reactive({
    nickname: '',
    sendActive: false,
    show: props.show,
    commentContent: "",
    commentForm: {
        parentId: undefined,
        replyId: undefined,
        commentContent: "",
    }
});
const { nickname, sendActive, show, commentContent, commentForm } = toRefs(data);
const placeholderText = computed(() =>
    nickname.value ? `回复 @${nickname.value}：` : "发一条友善的评论"
);
const inputActive = () => {
    if (commentContent.value.length == 0) {
        sendActive.value = false;
    } else {
        sendActive.value = true;
    }
};
const handleEmoji = (key) => {
    commentContent.value += key;
    sendActive.value = true;
};
const handleAdd = () => {
    if (!store.state.userInfo.userId) {
        return;
    }
    if (commentContent.value.trim() == "") {
        ElMessage({
            type: 'error',
            message: '评论不能为空'
        })
        return;
    }
    // 解析表情
    commentForm.value.commentContent = commentContent.value.replace(/\[.+?\]/g, (str) => {
        return (
            "<img src= '" +
            emojiList[str] +
            "' width='21' height='21' style='margin: 0 1px;vertical-align: text-bottom'/>"
        );
    });
    const parentId = commentForm.value.replyId === undefined ? -1 : commentForm.value.replyId
    axios.post('/insert/comment', {
        content: commentForm.value.commentContent,
        parentId: parentId,
        articleId: router.currentRoute.value.params.id
    }).then((res) => {
        console.log(res);
        if (res.data == true) {
            ElMessage({
                type: 'success',
                message: '评论成功'
            })
            emit("reload")
        }
    })
};
const setReply = (flag) => {
    show.value = flag;
};
defineExpose({ commentForm, nickname, setReply });
</script>

<style scoped></style>