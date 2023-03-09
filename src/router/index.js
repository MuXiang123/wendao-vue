import { createRouter, createWebHashHistory } from "vue-router"
import Index from '../pages/index.vue';
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
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router