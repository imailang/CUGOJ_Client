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
export default {
    getUserContestList,
    registerContest,
    getUserContestCount,
}