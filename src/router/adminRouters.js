const AdminLogin =()=>import('@/views/admin/AdminLogin')
const AdminHome =()=>import('@/views/admin/AdminHome')
const AdminProblemCreate =()=>import('@/views/admin/problem/AdminProblemCreate')
const AdminProblems =()=>import('@/views/admin/problem/AdminProblems')
const Oj  =()=>import ( '@/views/Oj')
const adminRouters = [
    {
        path: '/admin',
        component: Oj,
        children:[
            {
                path:'/admin/login',
                component:AdminLogin
            },
            {
                path:'/admin/home',
                component:AdminHome,
                children:[
                    {
                        path:'/admin/problem/create',
                        component:AdminProblemCreate
                    },
                    {
                        path:'/admin/problems',
                        component:AdminProblems
                    },
                ]
            }
        ],
        redirect:'/admin/login'
    },

]

export default adminRouters