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
    if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
        const is = store.getters.getIsLogin
        if (!is) {
            //管理
            if (to.path.split('/')[1] === 'admin') {
                ElMessage.error("未登录")
                next({
                    path: '/admin/login'
                })
            } else {
                ElMessage.error("请先登录")
                next({
                    path: '/home'
                })
                store.commit('changeLoginVisible', true)
            }
        } else {
            if (to.matched.some(record => record.meta.requireAdminAuth)) { // 判断该路由是否需要管理员权限
                if (store.getters.getUserInfo.Title.split(';').includes('管理员')) {
                    next()  //头衔是管理员
                } else {
                    ElMessage.error("需要管理员权限")
                    next({
                        path: '/home'
                    })
                }
            } else {
                next()
            }
        }
    } else {
        next()
    }
})

export default router