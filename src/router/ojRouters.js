const Oj = () => import('@/views/Oj')
const OjHome = () => import('@/views/oj/OjHome')
const OjAbout = () => import('@/views/oj/about/OjAbout')
const OjContestList = () => import('@/views/oj/contest/OjContestList')
const OjTeam = () => import('@/views/oj/team/OjTeam')
const OjRank = () => import('@/views/oj/rank/OjRank')
const OjProblem = () => import('@/views/oj/problem/OjProblem')
const OjPractice = () => import('@/views/oj/practice/OjPractice')
const OjEvaluation = () => import('@/views/oj/evaluation/OjEvaluation')
const OjEvaluationDetails = () => import('@/views/oj/evaluation/OjEvaluationDetails')
const OjDiscuss = () => import("@/views/oj/discuss/OjDiscuss");
const OjProblemDetails = () => import("@/views/oj/problem/OjProblemDetails")
const OjNotFound = () => import("@/views/OjNotFound")
const OjContestDetail = () => import("@/views/oj/contest/OjContestDetail")
const OjUserHome = () => import('@/views/oj/user/OjUserHome')
const OjTeamEdit = () => import('@/views/oj/team/OjTeamEdit')
const OjUserSet = () => import('@/views/oj/user/OjUserSet')

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
        children: [
            {
                path: '/home',
                component: OjHome,
            },
            {
                path: '/about',
                component: OjAbout,
            },
            {
                path: '/team/:teamId',
                component: OjTeam,
            },
            {
                path: '/rank',
                component: OjRank
            },
            {
                path: '/problem',
                component: OjProblem

            },
            {
                path: '/problem/:problemId',
                component: OjProblemDetails,
            },
            {
                path: '/practice',
                component: OjPractice
            },
            {
                path: '/evaluation',
                component: OjEvaluation,
                meta: { requireAuth: true },
            },
            {
                path: '/evaluation/:evaluationId',
                component: OjEvaluationDetails,
                meta: { requireAuth: true },
            },
            {
                path: '/discuss',
                component: OjDiscuss
            },
            {
                path: '/contest',
                component: OjContestList
            },
            {
                path: '/contest/:contestId',
                component: OjContestDetail,
            },
            {
                path: '/user-home',
                component: OjUserHome,
                meta: { requireAuth: true },
            },
            {

                path: 'team/edit/:teamId',
                component: OjTeamEdit,
            },
            {
                path: '/user-set',
                component: OjUserSet,
                meta: { requireAuth: true },
            }
        ],
        redirect: '/home'
    }
]
export default ojRouters