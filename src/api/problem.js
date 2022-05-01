import axios from './http'

/**
 * 获取题目列表
 */
function getProblemList(params) {
    return axios.post("/problem/getproblemlist", params)
}

/**
 * 获取题目总数
 */
function getProblemCount(params) {
    return axios.post('/problem/getproblemcount', params)
}

/**
 * 获取题目
 */
function getProblem(params) {
    return axios.post('/problem/getproblem', params)
}

/**
 * 获取题目模板
 */
function getBaseProblem() {
    return axios.post('/problem/getbaseproblem')
}

/**
 * 添加题目
 */
function addProblem(params) {
    return axios.post('/problem/addproblem', params)
}

/**
 * 修改题目
 */
function changeProblem(params) {
    return axios.post('/problem/changeproblem', params)
}

/**
 * 删除题目
 */
function deleteProblem(params) {
    return axios.post('/problem/deleteproblem', params)
}

/**
 * 通过题目编号获取题目标题 
 */
function getTitleByID(params) {
    return axios.post('/problem/gettitlebyid', params)
}


export default {
    getProblemList,
    getProblem,
    getBaseProblem,
    addProblem,
    getProblemCount,
    changeProblem,
    deleteProblem,
    getTitleByID,
}