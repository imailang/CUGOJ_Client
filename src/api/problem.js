import axios from './http'

/**
 * 获取题目列表
 */
function getProblemList(params)
{
    return axios.post("/problem/getproblemlist",params)
}

/**
 * 获取题目
 */
function getProblem(params)
{
    return axios.post('/problem/getproblem',params)
}

export default {
    getProblemList,
    getProblem
}