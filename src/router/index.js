import { createRouter, createWebHashHistory } from "vue-router"
import Index from '../pages/index.vue';
import Login from '../pages/login.vue';
import Register from '../pages/register.vue';
import Home from '../pages/home.vue';
import Info from '../components/home/info.vue'
import MyFans from '../components/home/myFans.vue';
import MyFollow from '../components/home/myFollow.vue';
import MyArticle from '../components/home/myArticle.vue';
const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'index',
        component: Index,
        meta: {
            requireLogin: true
        }
    },
    {
        path:'/login',
        name:'login',
        component: Login
    },
    {
        path:'/register',
        name:'register',
        component: Register
    },{
        path:'/home/:id',
        name:'home',
        component: Home,
        meta: {
            requireLogin: true
        },
        children: [
            {
                path: '/home/info/:id',
                name:'info',
                component: Info,
            },
            {
                path:'/home/myArticle/:id',
                name:'myArticle',
                component: MyArticle
              },
              {
                path:'/home/myFollow/:id',
                name:'myFollow',
                component: MyFollow
              },
              {
                path:'/home/myFans/:id',
                name:'myFans',
                component: MyFans
              }
        ]
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router