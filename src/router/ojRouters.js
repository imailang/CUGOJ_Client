const Oj  =()=>import ( '@/views/Oj')
const OjHome  =()=>import ( '@/views/oj/OjHome')
const OjAbout  =()=>import ( '@/views/oj/about/OjAbout')
const OjCompetition  =()=>import ( '@/views/oj/competition/OjCompetition')
const OjTeam  =()=>import ( '@/views/oj/team/OjTeam')
const OjRank  =()=>import ( '@/views/oj/rank/OjRank')
const OjProblem =()=>import ('@/views/oj/problem/OjProblem')
const OjPractice =()=>import( '@/views/oj/practice/OjPractice')
const OjEvaluation=()=> import('@/views/oj/evaluation/OjEvaluation')
const OjDiscuss =()=>import("@/views/oj/discuss/OjDiscuss");
const OjProblemDetails=()=>import("@/views/oj/problem/OjProblemDetails")
const OjNotFound=()=>import("@/views/OjNotFound")

const ojRouters = [
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
export default ojRouters