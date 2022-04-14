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

/**
 * 获取题目模板
 */
function getBaseProblem()
{
    return axios.post('/problem/getbaseproblem')
}

/**
 * 添加题目
 */
function addProblem(params)
{
    return axios.post('/problem/addproblem',params)
}
export default {
    getProblemList,
    getProblem,
    getBaseProblem,
    addProblem
}