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

function getContestProblems(params) {
    return axios.post('contest/getcontestproblems', params)
}

function setContestProblems(params) {
    return axios.post('contest/setcontestproblems', params)
}

function addContest(params) {
    return axios.post('contest/addcontest', params)
}

function changeContest(params) {
    return axios.post('contest/changecontest', params)
}

function getFullContest(params) {
    return axios.post('contest/getfullcontest', params)
}

function deleteContest(params) {
    return axios.post('contest/deletecontest', params)
}

function getRunningContestProblems(params) {
    return axios.post('/contest/getrunningtimecontest', params)
}
export default {
    getUserContestList,
    registerContest,
    getUserContestCount,
    getContestDetail,
    getContestProblems,
    setContestProblems,
    addContest,
    changeContest,
    getFullContest,
    deleteContest,
    getRunningContestProblems,
}