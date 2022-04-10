import axios from './http'

/**
 * 获取题目
 */
function getProblemList(params)
{
    return axios.post("/problem/getproblemlist",params)
}

export default {
    getProblemList
}