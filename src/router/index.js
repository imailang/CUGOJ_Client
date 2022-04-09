import {createRouter, createWebHistory} from "vue-router";
import Oj from '@/views/Oj'
import OjNotFound from '@/views/OjNotFound'
import OjHome from '@/views/oj/OjHome'

const routers = [
    {
        path: '/:catchAll(.*)',
        component: OjNotFound
    },
    {
        path: '/',
        component: Oj,
        children:[
            {
                path:'/home',
                component:OjHome,
            }
        ],
        redirect:'/home'
    }
]

const router = createRouter({
    history: createWebHistory('/oj'),
    routes: routers
})

export default router