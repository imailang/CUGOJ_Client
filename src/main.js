import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import locale from "element-plus/lib/locale/lang/zh-cn";

import 'element-plus/dist/index.css'
import router from "@/router";
import store from '@/router'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import VueParticles from 'vue-particles'
import mavonEditor from 'mavon-editor'
import "mavon-editor/dist/css/index.css";

const app = createApp(App)

app
    .use(mavonEditor)
    .use(VueParticles)
    .use(VXETable)
    .use(store)
    .use(router)
    .use(ElementPlus, { locale })
    .mount('#app')



