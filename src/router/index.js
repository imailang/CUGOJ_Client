import {createRouter, createWebHistory} from "vue-router";
import ojRouters from "@/router/ojRouters";
import adminRouters from "@/router/adminRouters";
import {ElMessage} from "element-plus";
import store from "@/store";


const routers = new Set([...ojRouters, ...adminRouters])

const router = createRouter({
    history: createWebHistory('/cugoj'),
    routes: routers
})

router.beforeEach((to, from, next) => {
    const token = store.getters.getToken
    if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
        if (token) {
            next()
        } else {
            //管理
            if (to.path.split('/')[1] === 'admin') {
                ElMessage.error("未登录")
                next({
                    path: '/admin/login'
                })
                next()
            } else {
                ElMessage.error("请先登录")
                next({
                    path: '/home'
                })
                next()
                store.commit('changeLoginVisible', true)
            }
        }
    } else {
        next()
    }
})

export default router