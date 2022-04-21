const AdminLogin = () => import('@/views/admin/AdminLogin')
const AdminHome = () => import('@/views/admin/AdminHome')
const AdminProblemCreate = () => import('@/views/admin/problem/AdminProblemCreate')
const AdminProblems = () => import('@/views/admin/problem/AdminProblems')
const Oj = () => import('@/views/Oj')
const AdminUsers = () => import('@/views/admin/user/AdminUsers')
const AdminCompetitions = () => import('@/views/admin/competition/AdminCompetitions')
const AdminCompetitionCreate = () => import('@/views/admin/competition/AdminCompetitionCreate')
const AdminProblemEdit = () => import('@/views/admin/problem/AdminProblemEdit')
const AdminCasesEdit = () => import('@/views/admin/problem/AdminCasesEdit')

const adminRouters = [
    {
        path: '/admin',
        component: Oj,
        children: [
            {
                path: '/admin/login',
                component: AdminLogin,
                meta: { title: '登录' }
            },
            {
                path: '/admin/home',
                component: AdminHome,
                children: [
                    {
                        path: '/admin/problem/create',
                        component: AdminProblemCreate,
                        meta: { title: '创建题目' },
                    },
                    {
                        path: '/admin/problem/edit/:problemId',
                        component: AdminProblemEdit,
                        meta: { title: '编辑题目' },
                    },
                    {
                        path: '/admin/problem/cases/:problemId',
                        component: AdminCasesEdit,
                        meta: { title: '测试用例编辑' }
                    },
                    {
                        path: '/admin/problems',
                        component: AdminProblems,
                        meta: { title: '题目列表' },
                    },
                    {
                        path: '/admin/users',
                        component: AdminUsers,
                        meta: { title: '用户列表' },
                    },
                    {
                        path: '/admin/competitions',
                        component: AdminCompetitions,
                        meta: { title: '竞赛列表' },

                    },
                    {
                        path: '/admin/competition/create',
                        component: AdminCompetitionCreate,
                        meta: { title: '创建竞赛' },
                    }
                ]
            }
        ],
        redirect: '/admin/login'
    },

]

export default adminRouters