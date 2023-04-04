<template>
    <div class="app">
        <div class="top">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input class="title" v-model="title" maxlength="30" placeholder="请输入标题" show-word-limit
                        type="textarea" />
                </el-col>
                <el-col :span="8">
                    <el-input class="summary" v-model="summary" maxlength="100" placeholder="请输入文章摘要" show-word-limit
                        type="textarea" />
                </el-col>
                <el-col :span="4">
                    <el-select v-model="value" class="category" placeholder="选择文章分区" size="large">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="submit">发布</el-button>
                </el-col>
            </el-row>
        </div>

        <MdEditor v-model="state.text" class="editior" @onUploadImg="onUploadImg" :codeTheme="aton">
        </MdEditor>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import axios from 'axios'
const store = useStore();
const route = useRoute();
const router = useRouter();
const state = reactive({
    text: '',
    catalogList: [],
    emojiVisible: true
});


const title = ref('')
const summary = ref('')
const value = ref('')
const options = [
    {
        value: '考研交流',
        label: '考研交流'
    },
    {
        value: '找工作交流',
        label: '找工作交流'
    },
    {
        value: '寻物启事',
        label: '寻物启事'
    },
    {
        value: '拼单拼车',
        label: '拼单拼车'
    }, {
        value: '日常学习',
        label: '日常学习'
    }, {
        value: '表白墙',
        label: '表白墙'
    }, {
        value: '生活趣事',
        label: '生活趣事'
    }, {
        value: '竞赛组队',
        label: '竞赛组队'
    }, {
        value: '编程技术',
        label: '编程技术'
    }
]
const submit = () => {
    axios.post('/article/insert', {
        articleTitle: title.value,
        articleSummary: summary.value,
        articleContent: state.text,
        articleCategoryName: value.value
    }).then((res) => {
        if (res.msg == 'success') {
            ElMessage({
                type: 'success',
                message: '文章发布成功',
                onClose: () => {
                    router.push({ path: "/" });
                    window.location.reload()
                }
            })
        }
    })
}

const onUploadImg = async (files, callback) => {
    const res = await Promise.all(
        files.map((file) => {
            return new Promise((rev, rej) => {
                const form = new FormData();
                form.append('file', file);
                axios.post('/upload/images', form, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then((res) => rev(res))
                    .catch((error) => rej(error));
            });
        })
    );
    callback(res.map((item) => item.data.url));
}
const onGetCatalog = (list) => {
    state.catalogList = list;
};
const DropdownToolbar = MdEditor.DropdownToolbar;

const emojis = ['😀', '😃']

const emojiVisibleChanged = () => {
  state.emojiVisible = !state.emojiVisible;
};

const emojiHandler = () => {};

</script>
<style scoped>
.app {
    overflow: hidden;
}

.top {
    margin-left: 100px;
    margin-top: 10px;
}

.editior {
    margin-top: 20px;
    width: 85%;
    margin-left: 100px;
    height: calc(100vh - 155px);
}
</style>