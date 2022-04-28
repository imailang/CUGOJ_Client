import axios from './http'

function getUserContestList(params) {
    return axios.post('/contest/getusercontestlist', params)
}

function getUserContestCount(params) {
    return axios.post('/contest/getusercontestcount', params)
}

function registerContest(params) {
    return axios.post('/contest/registercontest', params)
}

function getContestDetail(params) {
    return axios.post('/contest/getcontestdetail', params)
}
export default {
    getUserContestList,
    registerContest,
    getUserContestCount,
    getContestDetail,
}