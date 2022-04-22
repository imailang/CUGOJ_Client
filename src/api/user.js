import axios  from "./http";


/**
 * 邮箱验证
 */
function emailVerification(params)
{
    return axios.post('/ojLogin/userInfo/emailVerification',params)
}

/**
 * 注册
 */
function register(params)
{
    return axios.post('/ojLogin/userInfo/register',params)
}

/**
 * 登录
 */
function login(params)
{
    return axios.post('/ojLogin/userInfo/login',params)
}

/**
 * 检查用户名可用性
 */
function checkUserName(params)
{
    return axios.post('/user/checkusername',params)
}

/**
 * 检查邮箱可用性
 */
function checkEmail(params)
{
    return axios.post('/user/checkemail',params)
}

/**
 * 获取用户列表
 */
function getUserList(params)
{
    return axios.post('/user/getuserlist',params)
}

/**
 * 获取用户数量
 */
function getUserCount(params)
{
    return axios.post('/user/getusercount',params)
}

export default {
    emailVerification,
    register,
    checkUserName,
    checkEmail,
    getUserList,
    getUserCount,
    login
}