//引入环信SDK
import EaseChatSDK from 'easemob-websdk'
// 读取自定义配置（因demo需要自定义配置，非必须）
// const webimConfig = window.localStorage.getItem('webimConfig')
// const CUSTOM_CONFIG = (webimConfig && JSON.parse(webimConfig)) || {}
// console.log('>>>>>>webimConfig', CUSTOM_CONFIG)
//环信appKey默认配置项
const DEFAULT_APPKEY = '1117230307209281#demo'
const DEFAULT_URL = '//im-api-v2.easemob.com/ws'
const DEFAULT_APIURL = '//a1.easemob.com'
//存放实例化后所有的方法
// let EaseIMClient = {};
// window.EaseIM = EaseIM = Easemob_SDK;
//实例化环信SDK
/*
 * isHttpDNS： isPrivate为true开启私有化配置则走自有配置的url以及apiUrl，
 * 否则为true就SDK自助获取DNS地址。
 * 【特别注意】如果不需要私有化配置，也就是自己定义url以及apiUrl。isHttpDNS、url、apiUrl，均可不用填写只用填入appKey！SDK内部会进行自动获取！
 **/
const EaseChatClient = new EaseChatSDK.connection({
    appKey:  DEFAULT_APPKEY,
})
console.log('EaseIMClient', EaseChatClient)
export { EaseChatSDK, EaseChatClient }
