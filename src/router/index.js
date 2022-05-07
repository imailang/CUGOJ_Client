import {createRouter, createWebHistory} from "vue-router";
import ojRouters from "@/router/ojRouters";
import adminRouters from "@/router/adminRouters";
import {ElMessage} from "element-plus";
import store from "@/store";
import api from "@/api/api";
import cookie from "js-cookie";


const routers = new Set([...ojRouters, ...adminRouters])

const router = createRouter({
    history: createWebHistory('/cugoj'),
    routes: routers
})

/**
 * 会话检查
 * @returns {Promise<void>}
 */
const checkSession = async () => {
    await api.user.checkSession()
        .then(res => {
            if (res.code === 200) {
                store.dispatch("changeIsLogin", true);
                store.dispatch("changeUserToken", cookie.get("cugtoken"));
            } else if (res.code === 500) {  //
                ElMessage.error(res.msg)
                store.dispatch("changeUserToken", undefined);
                store.dispatch("changeUserInfo", undefined);
                store.dispatch("changeIsLogin", false);
            } else if (res.code === 300) {  //
                store.dispatch("changeUserToken", undefined);
                store.dispatch("changeUserInfo", undefined);
                store.dispatch("changeIsLogin", false);
            }
        })
}

router.beforeEach((to, from, next) => {
    const beforeIs = store.getters.getIsLogin
    if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
        checkSession().then(() => {
            const is = store.getters.getIsLogin
            if (!is) {
                //管理
                if (to.path.split('/')[1] === 'admin') {
                    if (beforeIs) {
                        ElMessage.error('账号已在其他地方登录！')
                    } else {
                        ElMessage.error("未登录")
                    }
                    next({
                        path: '/admin/login'
                    })
                } else {
                    if (beforeIs) {
                        ElMessage.error('账号已在其他地方登录！')
                    } else {
                        ElMessage.error("请先登录")
                    }
                    next({
                        path: '/home'
                    })
                    store.commit('changeLoginVisible', true)
                }
            } else {
                if (to.matched.some(record => record.meta.requireAdminAuth)) { // 判断该路由是否需要管理员权限
                    if (store.getters.getUserInfo.Admin==2) {
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
        })
    } else {
        next()
    }
})

export default router