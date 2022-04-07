import {createRouter, createWebHistory} from "vue-router";
import OjHome from '@/views/oj/OjHome'
import OjAbout from '@/views/oj/about/OjAbout'
import OjCompetition from '@/views/oj/competition/OjCompetition'
import OjTeam from '@/views/oj/team/OjTeam'
import OjRank from '@/views/oj/rank/OjRank'
import OjProblem from '@/views/oj/problem/OjProblem'
import OjPractice from '@/views/oj/practice/OjPractice'
import OjEvaluation from '@/views/oj/evaluation/OjEvaluation'
import OjDiscuss from '@/views/oj/discuss/OjDiscuss'
import CUG404 from '@/views/CUG404'
import OJ from '@/views/OJ'
const routers =[
    {
        path: '/:catchAll(.*)',
        component: CUG404
    },
    {
        path:'/',
        component: OJ,
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
    },

]

const router = createRouter({
    history:createWebHistory('/OJ'),
    routes:routers
})

export default router