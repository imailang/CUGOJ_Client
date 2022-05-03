import {createRouter, createWebHistory} from "vue-router";
import ojRouters from "@/router/ojRouters";
import adminRouters from "@/router/adminRouters";
import {ElMessage} from "element-plus";
import store from "@/store";
import api from "@/api/api";


const routers = new Set([...ojRouters, ...adminRouters])

const router = createRouter({
    history: createWebHistory('/cugoj'),
    routes: routers
})

/**
 * 是否登录
 */
const isLogin = async () => {
    await api.user.getLoginIdByToken({
        cugtoken: store.getters.getToken
    }).then(res => {
        if (res.data === null) {
            store.commit('changeUserToken', undefined)
            store.commit('changeIsLogin', false)
        } else {
            store.commit('changeIsLogin', true)
        }
    })
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
        isLogin().then(() => {
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
                next()
            }
        })
    }
    else {
        next()
    }
})

export default router