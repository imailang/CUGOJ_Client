import axios from "./http";


/**
 * 邮箱验证
 */
function emailVerification(params) {
    return axios.post('/ojLogin/userInfo/emailVerification', params)
}

/**
 * 注册
 */
function register(params) {
    return axios.post('/ojLogin/userInfo/register', params)
}

/**
 * 登录
 */
function login(params) {
    return axios.post('/ojLogin/userInfo/login', params)
}

/**
 * 注销
 */
function logout(params) {
    return axios.post('/ojLogin/userInfo/logout', params)
}

/**
 * 根据token查询用户名
 */
function getLoginIdByToken(params) {
    return axios.post('/ojLogin/userInfo/getLoginIdByToken', params)
}

/**
 * 检查用户名可用性
 */
function checkUserName(params) {
    return axios.post('/user/checkusername', params)
}

/**
 * 检查邮箱可用性
 */
function checkEmail(params) {
    return axios.post('/user/checkemail', params)
}

/**
 * 获取用户列表
 */
function getUserList(params) {
    return axios.post('/user/getuserlist', params)
}

/**
 * 获取用户数量
 */
function getUserCount(params) {
    return axios.post('/user/getusercount', params)
}

/**
 * 根据用户查询信息
 */
function getUserByUsername(params) {
    return axios.post('/user/getuserbyusername', params)
}
/**
 * 根据用户ID获取用户近七日、三十日以及全部提交数
 */
function getSubmitCount(params) {
    return axios.post('/user/getsubmitcount', params)
}

export default {
    emailVerification,
    register,
    checkUserName,
    checkEmail,
    getUserList,
    getUserCount,
    login,
    logout,
    getLoginIdByToken,
    getUserByUsername,
    getSubmitCount,
}