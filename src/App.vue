<script setup>
import Banner from './components/banner.vue'
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue';
import Cookies from 'js-cookie'
import './assets/icon/iconfont.js'
import { EaseChatSDK, EaseChatClient } from '@/IM/initwebsdk'
EaseChatSDK.logger.disableAll()
/* connect 相关监听 */
EaseChatClient.addEventHandler('connection', {
    onConnected: () => {
        console.log('>>>>>环信连接成功')
        store.commit('CHANGE_LOGIN_STATUS', true)
        if (isOpenPlayRing.value) clickRing()
        fetchLoginUsersInitData()
        router.replace('/chat')
    },
    onDisconnected: () => {
        router.push('/login')
        store.commit('CHANGE_LOGIN_STATUS', false)
    },
    onOnline: () => {
        store.commit('CHANGE_NETWORK_STATUS', true)
    },                  // 本机网络连接成功。
    onOffline: () => {
        store.commit('CHANGE_NETWORK_STATUS', false)
    },                 // 本机网络掉线。
    onError: (error) => {
        console.log('on error', error)
        handleSDKErrorNotifi(error.type, error.message)
    },
})
//fetch 登陆用户的初始数据
const fetchLoginUsersInitData = () => {
    getMyUserInfos()
    fetchFriendList()
    fetchTheLoginUserBlickList()
    fetchGroupList()
    //初始化vuex中的会话列表相关数据
    store.commit('INIT_CONVERSATION_STATE')
}
//获取好友列表
const fetchFriendList = () => {
    // const { value = {} } = useLocalStorage('friendList')
    // if (Object.values(JSON.parse(value)).length > 0) return
    store.dispatch('fetchFriendList')
}
//获取黑名单列表
const fetchTheLoginUserBlickList = () => store.dispatch('fetchBlackList')
//获取加入的群组列表
const fetchGroupList = () => {
    //如果本地存储里不存在群组列表则调用获取群组列表
    // const { value = {} } = useLocalStorage('groupList')
    // if (Object.values(JSON.parse(value)).length > 0) return
    const pageParams = {
        pageNum: 1,
        pageSize: 20,
    }
    store.dispatch('fetchGroupList', pageParams)
}
//在线状态订阅相关
const presenceStatus = (type, user) => {
    type === 'sub' && store.dispatch('subFriendsPresence', [user])
    type === 'unsub' && store.dispatch('unsubFriendsPresence', [user])
}

/* presence 相关监听 */
EaseChatClient.addEventHandler('presenceStatusChange', {
    onPresenceStatusChange: (status) => {
        console.log('>>>>>presenceStatusChange', status)
        getUserPresence(...status)
    },

})
//处理登陆用户状态的变更
const getUserPresence = (status) => {
    store.dispatch('handlePresenceChanges', status)
}
/* message 相关监听 */
EaseChatClient.addEventHandler('messageListen', {
    onTextMessage: function (message) {
        console.log('>>>>>>>App mesage', message)
        console.log('setMessageKey', setMessageKey(message))
        pushNewMessage(message)
    },    // 收到文本消息。
    onEmojiMessage: function (message) {
        pushNewMessage(message)
    },   // 收到表情消息。
    onImageMessage: function (message) {
        pushNewMessage(message)
    },   // 收到图片消息。
    onCmdMessage: function (message) {
        console.log('>>>>>收到命令消息', message)
    },     // 收到命令消息。
    onAudioMessage: function (message) {
        pushNewMessage(message)
    },   // 收到音频消息。
    onLocationMessage: function (message) {
        pushNewMessage(message)
    },// 收到位置消息。
    onFileMessage: function (message) {
        pushNewMessage(message)
    },    // 收到文件消息。
    onCustomMessage: function (message) {
        pushNewMessage(message)
    },  // 收到自定义消息。
    onVideoMessage: function (message) {
        pushNewMessage(message)
    },     // 收到视频消息。
    onRecallMessage: function (message) {
        otherRecallMessage(message)
    },    // 收到消息撤回回执。
})
//接收的消息往store中push
const pushNewMessage = (message) => {
    store.dispatch('createNewMessage', message)
}
//收到他人的撤回指令
const otherRecallMessage = (message) => {
    console.log('>>>>>收到他人撤回', message)
    const { from, to, mid } = message
    //单对单的撤回to必然为登陆的用户id，群组发起撤回to必然为群组id 所以key可以这样来区分群组或者单人。
    const key = to === EaseChatClient.user ? from : to
    console.log('>>>>>收到他人撤回', key)
    store.commit('CHANGE_MESSAGE_BODAY', { type: 'recall', key, mid })
    store.dispatch('gatherConversation', key)
}
/* 群组相关监听 */
EaseChatClient.addEventHandler('groupEvent', {
    onGroupEvent: (groupevent) => {
        console.log('>>>>>>>收到群组事件', groupevent)
        submitInformData(INFORM_FROM.GROUP, groupevent)
    }
})
const submitInformData = (fromType, informContent) => {
    console.log('>>>submitInformData>>>', fromType, informContent)
    store.dispatch('createNewInform', { fromType, informContent })

}
/* 重新登陆 */
//读取本地EASEIM_loginUser
const EASEIM_loginUser = window.localStorage.getItem('EASEIM_loginUser')
const loginUserFromStorage = JSON.parse(EASEIM_loginUser) || {}
const handleRelogin = () => {
    console.log('重新登陆')
    EaseChatClient.open({
        user: loginUserFromStorage.user,
        accessToken: loginUserFromStorage.accessToken
    })

}
if (loginUserFromStorage?.user && loginUserFromStorage?.accessToken) {
    handleRelogin()
}
const store = useStore()
const router = useRouter()
const noMenu = ['/login', '/register']
const state = reactive({
  showMenu: true,
})
router.afterEach((to, from) => {
  state.showMenu = !noMenu.includes(to.path)
})
router.beforeEach((to, from, next) => {
  const userInfo = Cookies.get('token')
  if (to.name === 'login' || to.name==='register') {
    //如果存在用户信息，或者进入的页面是登录页面，则直接进入
    next()
  } else {
    if (!userInfo) {
      next('/login')
    } else {
      //不存在用户信息则说明用户未登录，跳转到登录页面，带上当前的页面地址，登录完成后做回跳，
      //如未登录用户进入用户中心的页面地址，检测到未登录，
      //自动跳转到登录页面，并且带上用户中心的页面地址，登录完成后重新跳到个人中心页面。
      next()
    }
  }
})
</script>

<template>
  <div class="app">
    <el-container v-if="state.showMenu">
      <el-header class="head">
        <Banner></Banner>
      </el-header>
      <el-container class="el-container">
        <el-main class="el-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
    <el-container v-else class="container">
      <router-view />
    </el-container>
  </div>
</template>

<style scoped>
.app{
  margin: 0;
  padding: 0;
}
.el-container{
  height: 100%;
  margin: 0;
  padding: 0;
}
.el-main{
  height: 100%;
  margin: 0;
  padding: 0;
}


</style>
