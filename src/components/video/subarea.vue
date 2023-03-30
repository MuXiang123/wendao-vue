<template>
    <!-- 显示子分区 -->
    <div class="top">
        <el-button v-for="button in buttons" :key="button.tid" :type="plain" text bg class="top-button">{{ button.name
        }}</el-button>
    </div>
    <div class="center">
        <el-row :gutter="5" v-for="(row, index) in computedRows" :key="index">
            <el-col v-for="(col, colIndex) in row" :key="colIndex" :span="8">
                <videoItem :msg="col"></videoItem>
            </el-col>
        </el-row>
        <div class="footer">
            <el-pagination :page-size="changePage.pageSize" layout="prev, pager, next" background :total="changePage.total"
                @current-change="handleCurrentChange" :current-page="changePage.currentPage" />
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import videoItem from './videoItem.vue'
import axios from '../../api/axios.js'
import { ElMessage } from 'element-plus';
import { bottom } from '@popperjs/core';
const store = useStore();
const route = useRoute();
const router = useRouter();
//全部
const buttons = ref([
    {
        name: '全部',
        tid: router.currentRoute.value.params.tid
    },
])
const msg = ref([])
const changePage = reactive({
    currentPage: 1,
    total: 0,
    pageSize: 24,
})
//初始化
onMounted(() => {
    onload()
    loadCategory()
})
//监听路由参数变化
watchEffect(() => {
    // 重新加载视频列表
    const path = router.currentRoute.value.params.tid
    if(path == null){
        return
    }
    axios.post("/video/category/feed", {
        pageNum: 1,
        pageSize: 24,
        tid: path
    }).then((res) => {
        if (res.data.archives.length == 0) {
            ElMessage({
                message: '当前目录没有信息',
                type: 'error'
            })
        } else {
            msg.value = []
            msg.value = res.data.archives
            changePage.total = res.data.page.count
            changePage.currentPage = 1
            console.log(msg.value)
        }
    }).catch((error) => {
        ElMessage({
            message: error,
            type: 'error'
        })
    })
    //重新加载子分区
    axios.get("/video/category/child", {
        params: {
            parentId: router.currentRoute.value.params.tid
        }
    }).then((res) => {
        if (res.msg == 'success') {
            buttons.value = []
            for (var i = 0; i < res.data.length; i++) {
                buttons.value.push(res.data[i])
            }
        }
    }).catch((error) => {
        ElMessage({
            message: error,
            type: 'error'
        })
    })
})
//加载视频列表信息
const onload = () => {
    //   获取分区推荐
    axios.post("/video/category/feed", {
        pageNum: changePage.currentPage,
        pageSize: 24,
        tid: router.currentRoute.value.params.tid
    }).then((res) => {
        if (res.data.archives.length == 0) {
            ElMessage({
                message: '当前目录没有信息',
                type: 'error'
            })
        } else {
            msg.value = []
            msg.value = res.data.archives
            changePage.total = res.data.page.count
            console.log(msg.value)
        }
    }).catch((error) => {
        ElMessage({
            message: error,
            type: 'error'
        })
    })
}
//加载子分类列表
const loadCategory = () => {
    axios.get("/video/category/child", {
        params: {
            parentId: router.currentRoute.value.params.tid
        }
    }).then((res) => {
        if (res.msg == 'success') {
            buttons.value = []
            for (var i = 0; i < res.data.length; i++) {
                buttons.value.push(res.data[i])
            }
        }
    }).catch((error) => {
        ElMessage({
            message: error,
            type: 'error'
        })
    })
}

//分页后重新加载数据
const handleCurrentChange = (value) => {
    changePage.currentPage = value;
    onload()
}
//对分页数据进行取整
const computedRows = computed(() => {
    const rows = [];
    const rowCount = Math.ceil(msg.value.length / 3);
    for (let i = 0; i < rowCount; i++) {
        const cols = [];
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            if (index < msg.value.length) {
                cols.push(msg.value[index]);
                continue
            }
        }
        rows.push(cols);
    }
    console.log(rows.length)
    console.log(rows)
    return rows;
});
</script>

<style scoped>
.top-button {
    border-radius: 10px;
}

.center {
    margin-top: 20px;
}

.el-row {
    margin-bottom: 20px;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.el-row {
    margin-bottom: 90px;
}

.footer {
    padding-top: 20px;
    padding-bottom: 10px;
}
</style>