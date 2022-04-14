import {createRouter, createWebHistory} from "vue-router";
import ojRouters from "@/router/ojRouters";
import adminRouters from "@/router/adminRouters";

const routers=new Set([...ojRouters,...adminRouters])

const router = createRouter({
    history: createWebHistory('/cugoj'),
    routes: routers
})

export default router