import Vuex from 'vuex';

// state (类似存储全局变量的数据)
// getters (提供用来获取state数据的方法)
// actions (提供跟后台接口打交道的方法，并调用mutations提供的方法)
// mutations (提供存储设置state数据的方法)

let store = new Vuex.Store({
    /**
     * 类似存储全局变量的数据
     */
    state:{
        isLogin:false,   //是否登录标识
        role:'user',   //用户身份
        loginVisible:false,   //登录窗口显示
        registerVisible:false,   //注册窗口显示
        leftDrawerVisible:false,   //左弹窗显示
    },
    /**
     * 提供用来获取state数据的方法
     */
    getters:{
        getIsLogin:(state) =>{
            return state.isLogin
        },
        getRole:(state)=>{
            return state.role
        },
        getLoginVisible:(state)=>{
            return state.loginVisible
        },
        getRegisterVisible:(state)=>{
            return state.registerVisible
        },
        getLeftDrawerVisible:(state)=>{
            return state.leftDrawerVisible
        }
    },
    /**
     * 提供跟后台接口打交道的方法，并调用mutations提供的方法
     */
    actions:{
        changeIsLogin({commit},val){
            commit("changeIsLogin",val)
        },
        changeRole({commit},val)
        {
            commit("changeRole",val)
        },
        changeLoginVisible({commit},val)
        {
            commit("changeLoginVisible",val)
        },
        changeRegisterVisible({commit},val)
        {
            commit("changeRegisterVisible",val)
        },
        changeLeftDrawerVisible({commit},val)
        {
            commit("changeLeftDrawerVisible",val)
        }
    },
    /**
     * 提供存储设置state数据的方法
     */
    mutations:{
        changeIsLogin(state,val)
        {
            state.isLogin=val
        },
        changeRole(state,val)
        {
            state.role=val
        },
        changeLoginVisible(state,val)
        {
            state.loginVisible=val
        },
        changeRegisterVisible(state,val)
        {
            state.registerVisible=val
        },
        changeLeftDrawerVisible(state,val)
        {
            state.leftDrawerVisible=val
        }
    }
})

export default store;