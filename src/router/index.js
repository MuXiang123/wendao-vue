import { createRouter, createWebHashHistory } from "vue-router"
import Index from '../pages/index.vue';
import Login from '../pages/login.vue';
import Register from '../pages/register.vue';
import Home from '../pages/home.vue';
import Info from '../components/home/info.vue'
import MyFans from '../components/home/myFans.vue';
import MyFollow from '../components/home/myFollow.vue';
import MyArticle from '../components/home/myArticle.vue';
import Video from "../pages/videoIndex.vue"
import VideoCenter from "../components/video/videoCenter.vue"
import VideoArea from "../components/video/subarea.vue"
import VideoAction from "../pages/videoAction.vue"
import ArticleEdit from "../pages/edit.vue"
import CategoryArticle from "../components/index/center.vue"
import ArticleDetail from "../pages/articleDetail.vue"
import Message from "../pages/message.vue"
import HotArticle from "../pages/hotArticle.vue"
import Chat from "../pages/chat.vue"
import Cookies from 'js-cookie'
const routes = [
    {
        path: '/',
        redirect: '/index/article/0'
    },
    {
        path: '/index', // 首页
        name: 'index',
        component: Index,
        redirect:'/index/article/0',
        children: [
            {
                path: '/index/article/:id',
                name: 'CategoryArticle',
                component: CategoryArticle
            },{
                path:'/article/hot',
                name:'HotArrticle',
                component: HotArticle
            }
        ]
    },

    {
        path: '/login',  // 登录
        name: 'login',
        component: Login
    },
    {
        path: '/register',  // 注册
        name: 'register',
        component: Register
    }, {
        path: '/home', // 个人主页
        name: 'home',
        component: Home,
        meta: {
            requireLogin: true
        },
        children: [
            {
                path: '/home/info/:id',
                name: 'info',
                component: Info,
            },
            {
                path: '/home/myArticle/:id',
                name: 'myArticle',
                component: MyArticle,
            },
            {
                path: '/home/myFollow/:id',
                name: 'myFollow',
                component: MyFollow,
            },
            {
                path: '/home/myFans/:id',
                name: 'myFans',
                component: MyFans,
            }
        ]
    }, 
    {
        path: '/video',
        name: 'video',
        component: Video,
        children: [
            {
                path: '/video/index',
                name: 'VideoCenter',
                component: VideoCenter
            }, {
                path: '/video/area/:tid',
                name: 'VideoArea',
                component: VideoArea,
            }
        ]
    },
    {
        path: '/video/action',
        name: 'VideoAction',
        component: VideoAction
    },
    {
        path: '/article/edit',
        name: 'ArticleEdit',
        component: ArticleEdit
    },
    {
        path:'/article/detail/:id',
        name:'ArticleDetail',
        component: ArticleDetail
    },{
        path:'/message',
        name:'Message',
        component: Message
    },{
        path:'/chat',
        name:'Chat',
        component: Chat
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})


export default router