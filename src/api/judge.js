import axios from "./http";

/**
 * 获取评测模板
 */
function getBaseJudge()
{
    return axios.post('/judge/getbasejudge');

}

/**
 * 添加评测
 */
function addJudge(params)
{
    return axios.post('/judge/addjudge',params)
}

export default {
    getBaseJudge,
    addJudge
}