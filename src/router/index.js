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
import Cookies from 'js-cookie'
const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index', // 首页
        name: 'index',
        component: Index,
        children: [
            {
                path: '/index/article/:id',
                name: 'CategoryArticle',
                component: CategoryArticle
            },
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
        path: '/home/:id', // 个人主页
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
                meta: { keepAlive: true }
            },
            {
                path: '/home/myArticle/:id',
                name: 'myArticle',
                component: MyArticle
            },
            {
                path: '/home/myFollow/:id',
                name: 'myFollow',
                component: MyFollow
            },
            {
                path: '/home/myFans/:id',
                name: 'myFans',
                component: MyFans
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
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
// router.beforeEach((to, from, next) => {
//     const userInfo = Cookies.get('token')
//     if (userInfo || to.name === 'login') {
//         //如果存在用户信息，或者进入的页面是登录页面，则直接进入
//         next()
//     } else {
//         //不存在用户信息则说明用户未登录，跳转到登录页面，带上当前的页面地址，登录完成后做回跳，
//         //如未登录用户进入用户中心的页面地址，检测到未登录，
//         //自动跳转到登录页面，并且带上用户中心的页面地址，登录完成后重新跳到个人中心页面。
//         next('/login')
//     }
// })


export default router