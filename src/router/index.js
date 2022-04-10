import {createRouter, createWebHistory} from "vue-router";
import Oj from '@/views/Oj'
import OjNotFound from '@/views/OjNotFound'
import OjHome from '@/views/oj/OjHome'
import OjAbout from '@/views/oj/about/OjAbout'
import OjCompetition from '@/views/oj/competition/OjCompetition'
import OjTeam from '@/views/oj/team/OjTeam'
import OjRank from '@/views/oj/rank/OjRank'
import OjProblem from '@/views/oj/problem/OjProblem'
import OjPractice from '@/views/oj/practice/OjPractice'
import OjEvaluation from '@/views/oj/evaluation/OjEvaluation'
import OjDiscuss from '@/views/oj/discuss/OjDiscuss'

import OjProblemDetails from '@/views/oj/problem/OjProblemDetails'

const routers = [
    {
        path: '/404',
        name: '404',
        component: OjNotFound
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404'
    },
    {
        path: '/',
        component: Oj,
        children:[
            {
                path:'/home',
                component:OjHome,
            },
            {
                path:'/about',
                component:OjAbout,
            },
            {
                path:'/team',
                component:OjTeam,
            },
            {
                path:'/rank',
                component:OjRank
            },
            {
                path:'/problem',
                component:OjProblem

            },
            {
                path:'/problem/:problemId',
                component: OjProblemDetails,
            },
            {
                path:'/practice',
                component: OjPractice
            },
            {
                path: '/evaluation',
                component: OjEvaluation
            },
            {
                path: '/discuss',
                component: OjDiscuss
            },
            {
                path: '/competition',
                component: OjCompetition
            }
        ],
        redirect:'/home'
    }
]

const router = createRouter({
    history: createWebHistory('/oj'),
    routes: routers
})

export default router