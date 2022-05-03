import axios from './http'

function getTeamList(params) {
    return axios.post('/team/getteamlist', params)
}

function getSelfTeamList(params) {
    return axios.post('/team/getselfteamlist', params)
}

function getTeam(params) {
    return axios.post('/team/getteam', params)
}

function createTeam(params) {
    return axios.post('team/createteam', params)
}

function changeTeam(params) {
    return axios.post('team/changeteam', params)
}

function getMember(params) {
    return axios.post('team/getmember', params)
}

function deleteTeam(params) {
    return axios.post('team/deleteTeam', params)
}

export default {
    getTeamList,
    getSelfTeamList,
    getTeam,
    createTeam,
    changeTeam,
    getMember,
    deleteTeam,
}
