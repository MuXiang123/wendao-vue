import { createRouter, createWebHashHistory } from "vue-router"
import Index from '../pages/index.vue';
import Login from '../pages/login.vue';
import Register from '../pages/register.vue';
const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'index',
        component: Index
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
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router