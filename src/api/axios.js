import axios from "axios";
import store from "../store/index.js";
import { ElMessage,ElLoading  } from 'element-plus'

axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://127.0.0.1:8081";
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 设置xhr请求超时时间和baseURL（毫秒）
axios.create({
	timeout: 15000,
  headers: {
    "Content-Type": 'application/json;charset:utf-8'
  }
})

let loadingInstance;
axios.defaults.withCredentials = true;
// 拦截器的添加
axios.interceptors.request.use(config => {
	loadingInstance = ElLoading.service("加载中")
	return config
}, err => {
	//请求错误(前端操作是，取消loading圈，并会弹出一个网络异常的提示)
	loadingInstance?.close()
	ElMessage.error("网络异常")
	return Promise.reject(err)
})

//响应拦截器
axios.interceptors.response.use(res => {
	loadingInstance?.close()
	return res.data
}, err => {
	//请求失败(前端做法是取消loading圈给提示)
	loadingInstance?.close()
	ElMessage.error("请求失败")
	return Promise.reject(err)
})

export default axios;

