import axios from "./http";

/**
 * 获取所有评测
 */
function getJudgeList(params) {
    return axios.post('/judge/getjudgelist', params)
}

/**
 * 获取评测总数
 */
function getJudgeCount(params) {
    return axios.post('/judge/getjudgecount', params)
}
/**
 * 获取评测模板
 */
function getBaseJudge() {
    return axios.post('/judge/getbasejudge');

}
/**
 * 添加评测
 */
function addJudge(params) {
    return axios.post('/judge/addjudge', params)

}

export default {
    getBaseJudge,
    addJudge,
    getJudgeList,
    getJudgeCount
}