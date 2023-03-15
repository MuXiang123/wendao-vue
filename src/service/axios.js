import axios from "axios";
import store from "../store/index.js";


if (process.env.NODE_ENV === "production") {
  // axios.defaults.baseURL = "http://bbs.nanshengbbs.top";
}
// 设置xhr请求超时时间和baseURL（毫秒）
let http = axios.create({
	timeout: 15000,
  headers: {
    "Content-Type": 'application/json;charset:utf-8'
  }
})

// 每次请求前处理
// axios.interceptors.request.use(
//   function (config) {
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// 每次请求回来的处理
// axios.interceptors.response.use(
//   function (response) {
    // 后台会在响应头带上用户头像链接，每次和存在store中的比较，不同就替换，实现头像更新
    // if (response.headers["x-user-picture"]) {
    //   store.state.picture = response.headers["x-user-picture"];
    // }
    // // 后台会在响应头带上用户任务提醒和消息通知的数量，存在store里面，
    // if (response.headers["x-system-notify-count"]) {
    //   store.state.systemNotifyCount = response.headers["x-system-notify-count"];
    // }
    // if (response.headers["x-task-notify-count"]) {
    //   store.state.taskNotifyCount = response.headers["x-task-notify-count"];
    // }
    // 和后台约定好响应码为200且响应体的code字段为0的时候才算成功
    // if (response.status === 200) {
    //   if (response.data) {
        // if (response.data.code === 0) {
        //   return Promise.resolve(response.data);

        //   // 如果code是302，代表需要跳转到切页面
        // } else if (response.data.code === 302 && response.config.url !== '/api/bbs/user/getCurrentUserRights') {
        //   // window.location.href = response.data.data.target;
        //   store.state.isLogin = false;
        //   store.state.loginVisible = true;
        //   return Promise.reject(response.data);
        // } else {
        //   throw response.data;
        // }
//         return Promise.resolve(response.data);
//       } else {
//         throw response;
//       }
//     } else {
//       // 响应码不是200则返回一个失败的Promise
//       return Promise.reject(response);
//     }
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

let loadingInstance;

// 拦截器的添加
http.interceptors.request.use(config => {
	loadingInstance = ElLoading.service("加载中")

	return config
}, err => {
	//请求错误(前端操作是，取消loading圈，并会弹出一个网络异常的提示)
	loadingInstance?.close()
	ElMessage.error("网络异常")
	return Promise.reject(err)
})

//响应拦截器
http.interceptors.response.use(res => {
	loadingInstance?.close()
	return res.data
}, err => {
	//请求失败(前端做法是取消loading圈给提示)
	loadingInstance?.close()
	ElMessage.error("请求失败")
	return Promise.reject(err)
})

export default http;

