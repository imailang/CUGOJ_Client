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
        isLogin:false,
    },
    /**
     * 提供用来获取state数据的方法
     */
    getters:{
        getIsLogin:(state) =>{
            return state.isLogin
        }
    },
    /**
     * 提供跟后台接口打交道的方法，并调用mutations提供的方法
     */
    actions:{
        changeIsLogin({commit},val){
            commit("changeIsLogin",val)
        }
    },
    /**
     * 提供存储设置state数据的方法
     */
    mutations:{
        changeIsLogin(state,val)
        {
            state.isLogin=val
        }
    }
})

export default store;