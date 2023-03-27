<template>
<meta name="referrer" content="no-referrer">
  <div class="app">
    <el-image  class="img" :src="msg.pic" fit="fill" />
    <div class="text">
        <el-avatar size="36px" :src="msg.owner.face" class="avatar"/>
        <!-- <el-tag
        v-for="item in items"
        :key="item.label"
        :type="item.type"
        class="mx-1"
        effect="dark"
        closable
      > 
      </el-tag>-->
      <div class="detail">
        <p class="title">{{ msg.title }} </p>
        <p class="name">{{ msg.owner.name }} </p>
        <span class="view">{{ bigView }}次观看 • </span>
        <span class="time">{{ time }} </span>
      </div>

    </div>
</div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
const store = useStore();
const route = useRoute();
const router = useRouter();
const props = defineProps({
    msg:Object,
})
const msg = ref(props.msg)
let bigView = ref('')
let time = ref('')
onMounted(()=>{
    bigView.value = bigNumberTransform(props.msg.stat.view)
    time.value = getFormatTime(props.msg.ctime * 1000)
})
//大数转换
const bigNumberTransform = (value)=>{
    if (typeof value == 'string') {
		value = Number(value);
	}
	let unit = '';
	let k = 10000;
	let sizes = ['', '万', '亿', '万亿'];
	let i;
	if(value < k){
	    value =value;
	}else{
	    i = Math.floor(Math.log(value) / Math.log(k));
	    value = ((value / Math.pow(k, i))).toFixed(0);
	    unit = sizes[i];
	}
	return value + unit;
}
//时间戳转换
const getFormatTime = (timeStamp) =>{
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
	}else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
		timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
	}else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
		timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
	}else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
		timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
	}else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
		// timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
		timeSpanStr = year + '-' + month + '-' + day
	}else {
		// timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
		timeSpanStr = year + '-' + month + '-' + day
	}
	
	return timeSpanStr;
	}
</script>
<style scoped>
.img{
    width: 360px;
    height: 203px;
    border-radius: 10px;
}
.text{
    position: relative;
    margin-top: 5px;
}
.avatar{
    position: absolute;
    left: 5px;
    top: 7px;
}
.detail{
    position: absolute;
    left: 55px;
    top: -10px;
}
.title{
    width: 288px;
    height: 44px;
    font-weight: 600;
}
.name{
    font-size: 10px;
    line-height: 1px;
    font-weight: 400;
}
.view, .time{
    font-size: 10px;
    line-height: 1px;
    font-weight: 400;
}
</style>