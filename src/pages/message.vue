<template>
    <div class="page-header">
        <h1 class="page-title">共有{{ talkList.length }}个通知</h1>
    </div>
    <div class="bg">
        <div class="page-container">
            <div class="center" v-for="(talk, index) in talkList" :key="talk.id">
                <el-card class="talk-item">
                    <div class="talk-info" v-html="talk.content"> </div>
                    <div class="talk-time"> {{ formatDate(talk.createdDate) }} </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
const store = useStore();
const route = useRoute();
const router = useRouter();

const data = reactive({
    count: 0,
    talkList: []
});
const {
    count,
    queryParams,
    talkList,
} = toRefs(data);
const getList = () => {
    axios.get('/notice/list')
        .then((res) => {
            talkList.value.push(...res.data)
        })
};
onMounted(() => {
    getList();
})
const formatDate = (timeStamp) => {
    timeStamp * 1000
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
        // timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        timeSpanStr = year + '-' + month + '-' + day
    } else {
        // timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        timeSpanStr = year + '-' + month + '-' + day
    }

    return timeSpanStr;
}
</script>

<style lang="scss" scoped>
.page-header {
    left: 0;
    right: 0;
    width: 100%;
    height: 20rem;
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

.talk-item {
    display: flex;
    flex-direction: column;
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    animation-duration: 0.5s;
    transition: all 0.2s ease-in-out 0s;
    margin-bottom: 10px;
    text-align: left;

    &:hover {
        box-shadow: 0 0 2rem var(--box-bg-shadow);
    }

    &:not(:first-child) {
        margin-top: 1.25rem;
    }
}

.talk-info {
    display: flex;
    flex-direction: column;
}

</style>