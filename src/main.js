import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
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
    .use(ElementPlus)
    .mount('#app')



