import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import zhCn from "element-plus/es/locale/lang/zh-cn";
import 'element-plus/dist/index.css'
import router from "@/router";
import store from '@/router'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'




const app = createApp(App)

app
    .use(VXETable)
    .use(store)
    .use(router)
    .use(ElementPlus,{local:zhCn})
    .mount('#app')



